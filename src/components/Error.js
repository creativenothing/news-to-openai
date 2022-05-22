import { useNavigate } from 'react-router-dom'

const Error = props => {
  const navigate = useNavigate()
  return (
    <dialog open>
      <article>
        <button
          aria-label="Close"
          className="close"
          onClick={() => navigate('/')}></button>
        <p>Something went wrong. Please try again.</p>
      </article>
    </dialog>
  )
}

export default Error
