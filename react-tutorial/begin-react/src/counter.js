import React, {useReducer} from 'react'

function reducer(state, action) {
  switch (action.type){
    case 'increment':
      return state + 1;
    case 'decrement':
      return state - 1;
    default: 
     throw new Error('Unhandled action');
  }
}
function Counter(){

  const [number, dispatch] = useReducer(reducer, 0);


  const onIncrease = () => {
    dispatch({
      type : 'increment'
    })
  }
  const onDecrease = () => {
    dispatch({
      type : 'decrement'
    })
  }

  return (
    <div>
      <h1>{number}</h1>
      <button onClick = {onIncrease}>+1</button>
      <button onClick = {onDecrease}>-1</button>
    </div>
  )
}

export default Counter;