import React from 'react'

const Header = ({course}) => (<h2>{course.name}</h2>)

const Part = ({part}) => (<p>{part.name} {part.exercises}</p>)

const Content = ({course}) => {
  const data = course.parts.map(part => <Part key={part.id} part={part} />)
	return(<div>{data}</div>)
}


const Total = ({course}) => {
  const sum = course.parts.reduce((acc, val) => acc + val.exercises, 0)
  return <p>yhteensä {sum} tehtävää</p>
}

export const Course = ({course}) => (
  <div>
    <Header course={course} />
    <Content course={course} />
    <Total course={course} />
  </div>
)