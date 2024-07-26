import './index.css'
import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import LoaderComp from '../Loader/index'

const Login = () => {
  const history = useHistory()
  const [details, setDetails] = useState({username: '', password: ''})
  const [msg, setMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const detailsHandler = (value, field) => {
    switch (field) {
      case 'name':
        setDetails(prev => ({...prev, username: value}))
        break
      case 'pswd':
        setDetails(prev => ({...prev, password: value}))
        break
      default:
        break
    }
  }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(details),
  }

  const submitHandler = async e => {
    e.preventDefault()
    setIsLoading(true)
    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    console.log(data)
    history.replace('/')
    setIsLoading(false)
  }

  return (
    <div className="login__div">
      <div className="img__div">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="image__login"
        />
      </div>

      <form>
        <div className="username">
          <label htmlFor="userName" className="label">
            USERNAME
          </label>
          <input
            type="text"
            id="userName"
            className="input"
            placeholder="User Name"
            onChange={e => detailsHandler(e.target.value, 'name')}
            value={details.username}
          />
        </div>
        <div className="password">
          <label htmlFor="password" className="label">
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            className="input"
            placeholder="Password"
            onChange={e => detailsHandler(e.target.value, 'pswd')}
          />
        </div>
        <button type="submit" className="btn__login" onClick={submitHandler}>
          Login
        </button>

        <p className="err_msg">{msg}</p>
      </form>

      {isLoading && <LoaderComp />}
    </div>
  )
}

export default Login
