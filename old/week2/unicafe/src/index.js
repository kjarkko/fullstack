import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({click, text}) => {
  return (<button onClick={click}>
    {text}
  </button>)
}

const Feedback = ({buttons}) => {
  let id = 0
  const bts = buttons.map(
    b => <Button key={id++} click={b.click} text={b.text}/>
  )
	return (<div>
    <h1>Anna palautetta</h1>
    {bts}
	</div>)
}

const Stats = ({good, neutral, bad}) => {
  const sum = good + neutral + bad
  if(sum === 0)
    return (
      <div>
        <h1>statistiikka</h1>
        <p>Ei yhtään palautetta annettu</p>
      </div>
    )

	return (<div>
		<h1>statistiikka</h1>
    <table>
      <tbody>
      <tr><td>hyvä        </td><td>{good}               </td></tr>
      <tr><td>neutraali   </td><td>{neutral}            </td></tr>
      <tr><td>huono       </td><td>{bad}                </td></tr>
      <tr><td>yhteensä    </td><td>{sum}                </td></tr>
      <tr><td>keskiarvo   </td><td>{(good - bad) / sum} </td></tr>
      <tr><td>positiivisia</td><td>{100*(good / sum)}%  </td></tr>
	    </tbody>
    </table>
  </div>)
}

const getRandom = (arr) => arr[Math.floor((Math.random() * arr.length))]
const getBest = (arr) => arr.reduce(
  (acc,val)=>{
    if(val.votes >= acc.votes){
      acc.text = val.text
      acc.votes = val.votes
    }
    return acc
  },
  {text:'', votes:0}
)

const Anecdote = ({anecdotes}) => {
  const [random, setRandom] = useState(getRandom(anecdotes))
  const [best, setBest] = useState(getBest(anecdotes))

  return <div>
    <h1>Anecdote of the day</h1>
    <p>{random.text}</p>
    <br/>
    <p>votes: {random.votes}</p>
    <Button click={()=>{random.votes++;setBest(getBest(anecdotes))}} text='vote'/>
    <Button click={()=>setRandom(getRandom(anecdotes))} text='next anecdote'/>
    
    <h1>Anecdote with most votes</h1>
    <p>{best.text}</p>
    <br/>
    <p>votes: {best.votes}</p>
  </div>
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const anecdotes = [ // {anecdote, votes}
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ].map(a => ({text:a, votes:0}))
  const buttons = [
    {
      click: ()=>{setGood(good+1)},
      text: 'hyvä'
    },
    {
      click: ()=>{setNeutral(neutral+1)},
      text: 'neutraali'
    },
    {
      click: ()=>{setBad(bad+1)},
      text: 'huono'
    }
  ]

  return (
    <div>
	    <Feedback buttons={buttons}/>
	    <Stats good={good} neutral={neutral} bad={bad}/>
      <Anecdote anecdotes={anecdotes}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)