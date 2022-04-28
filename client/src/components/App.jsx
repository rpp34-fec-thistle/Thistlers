import React from 'react';
import Widgets from './Widgets.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/'>
          <Route path=':id' element={<Widgets />}/>
          <Route path='' element={<Widgets />}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App;