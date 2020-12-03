import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const Button = ({text, func}) => 
  <button onClick={func}>{text}</button>

const MostVoted = ({anecdotes, votes}) => {
  let max = -1
  let index = -1
  for (let idx = 0; idx < votes.length; idx++) {
    const element = votes[idx];
    if (element > max){
      index = idx
      max = element
    }
  }
  const anecdote = anecdotes[index]
  return <div>
    <h1>Anecdote with most votes</h1>
    <p>{anecdote}</p>
  </div>
}

const App = (props) => {
  const anecdotes = props.anecdotes

  const randomAnecdote = () => 
    Math.floor(Math.random() * anecdotes.length)

  const [selected, setSelected] = useState(randomAnecdote())
  const [votes, setVotes] = useState(anecdotes.map(() => 0))

  const vote = (idx) => {
    const copy = [...votes]
    copy[idx]++
    setVotes(copy)
  }
  const getAnecdote = () => anecdotes[selected]

  return (
    <div>
      <p>{getAnecdote()}</p>
      <p>has {votes[selected]} votes</p>
      <Button text='vote' func={() => vote(selected)} />
      <Button text='new anecdote' func={() => setSelected(randomAnecdote())} />
      <MostVoted anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
