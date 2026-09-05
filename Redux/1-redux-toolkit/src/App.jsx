import React, { useActionState, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increment, decrement} from './redux/features/CounterSlice'
const App = () => {
  

  const count = useSelector((state) => state.counter.value)

  const dispatch = useDispatch()

  


  return (
    <div>
      <h1>Counter App</h1>
      <h2>Count: {count}</h2>
      <button onClick={() => {
        dispatch(increment())
      }}>Increment</button>
      <button onClick={() => {
        dispatch(decrement())
      }}>Decrement</button>

    </div>
  )
}

export default App
