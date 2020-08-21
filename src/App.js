import React from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import List from './components/List'

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/home">
          <List />
        </Route>
      </Router>
    </div>
  );
}

export default App;
