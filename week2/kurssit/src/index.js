import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (
	<h1>{props.course.name}</h1>
)

const Part = (props) => (
	<p>{props.name} {props.exercises}</p>
)

const Content = (props) => {
  const data = props.course.parts.map(p => {
    return <Part name={p.name} exercises={p.exercises} />
  })
	return(<div>{data}</div>)
}

const Total = (props) => {
  const sum = props.course.parts.reduce((acc, val) => acc + val.exercises, 0)
  return <p>yhteensä {sum} tehtävää</p>
}

const App = () => {
  const course = {
    name: 'Half Stack -sovelluskehitys',
    parts: [
      {
        name: 'Reactin perusteet',
        exercises: 10
      },
      {
        name: 'Tiedonvälitys propseilla',
        exercises: 7
      },
      {
        name: 'Komponenttien tila',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))