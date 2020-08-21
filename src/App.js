import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import List from './components/List'
import './App.scss';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/">
          <List />
        </Route>
      </Router>
    </div>
  );
}

export default App;
