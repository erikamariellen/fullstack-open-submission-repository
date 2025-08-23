const Course = ({courses}) => {
    return(
      <div>
        <h1>Web development curriculum</h1>
        {courses.map(course => <div key={course.id}>
          <h2>{course.name}</h2>
          <div>
            {course.parts.map(part => <p key={part.id}> {part.name} {part.exercises} </p>)}
          </div>
          <h3> total of {course.parts.reduce((a, s) => a + s.exercises, 0)} exercises </h3>
        </div>)}
      </div>
    ) 
  }

export default Course
