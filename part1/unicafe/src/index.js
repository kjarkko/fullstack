import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({text}) => <h1>{text}</h1>

const Button = ({text, value, setValue}) => (
  <button text={text} onClick={() => setValue(value + 1)}>
    {text}
  </button>
)


const Buttons = ({buttons}) => <div>
  {buttons.map(
    (button) => <Button {...button} />
  )}
</div>

const StatisticsLine = ({name, value}) => <tr><td>{name}</td> <td>{value}</td></tr>

const Statistics = ({stats}) => {
  const good = stats.filter((stat) => stat.name === 'good')[0].value
  const neutral = stats.filter((stat) => stat.name === 'neutral')[0].value
  const bad = stats.filter((stat) => stat.name === 'bad')[0].value
  const sum = good + neutral + bad
  const avg = (good - bad) / sum
  const pct = good / sum
  return <table>
    {stats.map((stat) => <StatisticsLine {...stat} />)}
    <StatisticsLine name='all' value={sum} />
    <StatisticsLine name='average' value={avg} />
    <StatisticsLine name='positive' value={pct} />
  </table>
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const buttons = [
    {
      text: 'good',
      value: good,
      setValue: setGood
    },{
      text: 'neutral',
      value: neutral,
      setValue: setNeutral
    },{
      text: 'bad',
      value: bad,
      setValue: setBad
    }
  ]

  const stats = [
    {
      name: 'good',
      value: good
    },{
      name: 'neutral',
      value: neutral
    },{
      name: 'bad',
      value: bad
    }
  ]

  return (
    <div>
      <Header text='give feedback' />
      <Buttons buttons={buttons} />
      <Header text='statistics' />
      {(good+neutral+bad===0) ? 
        <p>no feedback given</p> : <Statistics stats={stats} />}
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
