import { BrowserRouter as Router } from 'react-router-dom'

import Navbar from './components/Navbar'
import Content from './components/Content'

const App = () => {
  return (
    <Router>
      <Navbar />
      <main>
        <Content />
      </main>
      <footer>
        &#9398; <small>anti-copyright</small>
      </footer>
    </Router>
  )
}

export default App
