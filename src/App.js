import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import Navbar from './components/Navbar'
import Content from './components/Content'

const App = () => {
  const [component, setComponent] = useState('home')
  return (
    <Router>
      <main className="container-fluid">
        <Navbar setComponent={setComponent} />
        <Content component={component} setComponent={setComponent} />
        <footer>
          &#9398; <small>anti-copyright</small>
        </footer>
      </main>
    </Router>
  )
}

export default App
