import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import './index.css'


const Filter = ({filterName, handleFilterChange}) => (
      <div> 
        filter shown with <input value={filterName} onChange={handleFilterChange} /> 
      </div>
)

const Persons = ({ personsToShow, deletePerson}) => {
  return (
    <div>
      {personsToShow.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}
          <button onClick={() => deletePerson({id:person.id, name:person.name})}>delete</button>
        </div>
      ))}
    </div>
  )
}


const PersonForm = ({addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => (
        <div>
          <form onSubmit={addPerson}>
            <div> 
              name: <input 
              value={newName} 
              onChange={handleNameChange} /> 
            </div>
            <div>
              number: <input 
              value={newNumber}
              onChange={handleNumberChange}/>
            </div>
            <div>
            <button type="submit">add</button>
            </div> 
          </form>
        </div>
)

  const Notification = ({ message, type }) => {
  if (message === null) return null

  return (
    <div className={type}>
      {message}
    </div>
  )
}



const App = () => {
  const [persons, setPersons] = useState([])
  const [filterName, setFilterName] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilterName(event.target.value)
  }
    const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
    const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  } 


  // Busca os dados do servidor apenas UMA vez
  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])


  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {name: newName, number: newNumber}
    persons.find(person => person.name === newName)
       ? updatePerson({id: persons.find(person => person.name === newName).id, name: newName})
       : 
        personService
        .create(personObject)
        .then(response => {
          console.log(response)
          setPersons(persons.concat(response.data))
          
          setSuccessMessage(`Added ${newName}`)
          setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
     })
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = ({id, name}) => {
    if (window.confirm(`Delete ${name}?`)) {
      axios
        .delete(`http://localhost:3001/persons/${id}`)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
            setErrorMessage(
              `Information of ${name} has already been removed from server`
            )
            setTimeout(() => {
            setErrorMessage(null)
            }, 5000)
              })
    }
  }

  const  updatePerson = ({id, name}) => {
    if (window.confirm(`Update ${name}?`)) {
      personService
        .update({id:id, newObject:{name: name, number: newNumber}})
        .then(response => {
          setPersons(persons.map(person => person.id !== id ? person : response.data
          ))
          setSuccessMessage(`The number of '${name}' was updated!`)
          setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)

        })    
    }
  }


  return (
    <div>
      <h2>Phonebook </h2>
      <Notification message={errorMessage} type="error" />
      <Notification message={successMessage} type="success" />
      <Filter filterName={filterName} handleFilterChange={handleFilterChange} />        
      <h2>add a new </h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson = {deletePerson}/>
    </div>
  )
}


export default App