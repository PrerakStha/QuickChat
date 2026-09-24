
import './App.css'
import { SignInButton, SignUpButton, UserButton, Show } from '@clerk/react'
import { Button } from "@heroui/react"

function App() {
  return (
    <div>
      <h1>QuickChat</h1>


      <header class="text-4xl">
        <Show when="signed-out">
          <SignInButton mode="modal" />
          <SignUpButton mode="modal" />
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </header>
    </div>
  );
}

export default App
