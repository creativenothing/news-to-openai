import { BrowserRouter as Router } from 'react-router-dom'

import Navbar from './components/Navbar'
import Content from './components/Content'

const App = () => {
  return (
    <Router>
      <main className="container-fluid">
        <Navbar />
        <Content />
        <footer>
          &#9398; <small>anti-copyright</small>
        </footer>
      </main>
    </Router>
  )
}

export default App
