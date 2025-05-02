import { useState } from 'react'
import './App.css'
import { Guard, GuardInformation, GuardAttributes } from './components/Cards/Battle Cards/Guard'
import StackManager from './components/Cards/Card Stacks/StackManager';

function App() {
  let newGuard = new Guard(GuardInformation,GuardAttributes);
  return (
    <>
      <StackManager/>
    </>
  )
}

export default App
