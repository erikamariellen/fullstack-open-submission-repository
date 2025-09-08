import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'


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




const App = () => {
  const [persons, setPersons] = useState([])
  const [filterName, setFilterName] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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
       ? alert(`${newName} is already added to phonebook`)
       : 
        personService
        .create(personObject)
        .then(response => {
          console.log(response)
          setPersons(persons.concat(response.data))
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
      }
   }

  return (
    <div>
      <h2>Phonebook </h2>
      <Filter filterName={filterName} handleFilterChange={handleFilterChange} />        
      <h2>add a new </h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson = {deletePerson}/>
    </div>
  )
}


export default App