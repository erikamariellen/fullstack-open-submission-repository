import { useState } from 'react'

const App = () => {
  const Course = ({course}) => {
    const Header = ({course}) => <h1>{course.name}</h1>
    const Content = ({course}) => {
      return(
        <div>
          {course.parts.map(part => <p key={part.id}> {part.name} {part.exercises} </p>)}
        </div>
      )}
      const total = course.parts.reduce((a, s) => a + s.exercises, 0) //a is the accumulator, s is the current value
    
    return(
      <div>
        <Header course={course} />
        <Content course={course} />
        <p> total of {total} exercises </p>
        </div>
    )
  }
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id : 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id : 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id : 3
      },
    ],
  }

  return <Course course={course}  />
}
export default App
