import { useState } from 'react'

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text} </td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  console.log(props)
  const all = props.good + props.neutral + props.bad
  const average = (props.good - props.bad) / all
  const positive = (props.good / all)   * 100 + ' %'
  
  if (all === 0) {
    return (
      <div>
        <h2>statistics</h2>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <StatisticLine text='good' value={props.good} />
          <StatisticLine text='neutral' value={props.neutral} />
          <StatisticLine text='bad' value={props.bad} />
          <StatisticLine text='all' value={all} />
          <StatisticLine text='average' value={average} />
          <StatisticLine text='positive' value={positive} />
        </tbody>
      </table>
    </div>

  ) 
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
 
  
  const handleGoodClick = () => {
    setGood(good + 1)
  }
  const handleBadClick = () => {
    setBad(bad + 1)
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleBadClick} text='bad' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App