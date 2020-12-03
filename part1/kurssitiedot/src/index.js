import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({text}) => <h1>{text}</h1>

const Part = ({name, count}) => <p>{name} {count}</p>

const Content = ({parts}) => <div>
    {parts.map((part) => <Part part />)}
  </div>

const Total = ({num}) => <p>Number of exercises {num}</p>

const App = () => {
  const course = {
    name:'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },{
        name: 'Using props to pass data',
        exercises: 7
      },{
        name: 'State of a component',
        exercises: 14
      }
    ]
}

  return (
    <div>
      <Header text={course.name} />
      <Content parts={course.parts} />
      <Total num={course.parts.reduce((acc, val) => acc + val.exercises)} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
