import { useState } from 'react'
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
