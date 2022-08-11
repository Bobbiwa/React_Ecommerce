import React, {useEffect, useState, useRef} from 'react'

export default function Demo() {
  let [count,setCount] = useState(0)
  let preValue = useRef()
  useEffect(()=>{
    preValue.current = count
  })
  
  const add = ()=>{
    setCount(count+1)
  }
 

  return (
    <>
        <button onClick={add}>加1</button>
        <h1>上个值{preValue.current}</h1>
        <h1>当前值{count}</h1>
    </>
  )
}
