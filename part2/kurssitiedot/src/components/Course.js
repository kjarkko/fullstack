import React from 'react'

const CourseHeader = ({text}) => <h2>{text}</h2>

const Part = ({name, exercises}) => <p>{name} {exercises}</p>

const Total = ({parts}) => {
  const exercises = parts
    .map((part) => part.exercises)
    .reduce((acc, val) => acc + val)
  return <b>
    Total of {exercises} exercises 
  </b>
}

const Content = ({parts}) => <div>
  <ul>{parts.map((part) => <li key={part.id}> <Part {...part} /> </li> )}</ul>
  <Total parts={parts} />
</div>

const Course = ({course}) => <div>
  <CourseHeader text={course.name} />
  <Content parts={course.parts} />
</div>

export default Course
