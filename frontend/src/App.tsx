import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const arr=[10,20,30];

  const func=arr.map(num=>num*2);
 
  const task=['one','two','three'];

  return (
    <>


    <div>
      <ol>
      {task.map((task,index:number)=>
      (
        <li  key={index}>{task}</li>
      ))}
      </ol>
    </div>
    
      
    </>
  )
}

export default App
