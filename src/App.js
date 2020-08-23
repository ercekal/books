import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import List from "./components/List"
import "./App.scss"
import "./scss/custom.scss"

function App() {
  return (
    <div className="App bg-primary">
      <Router>
        <Route exact path="/">
          <List />
        </Route>
      </Router>
    </div>
  )
}

export default App
