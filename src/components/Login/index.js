import './index.css'
import {useState} from 'react'
import LoaderComp from '../Loader/index'

const Login = () => {
  const [details, setDetails] = useState({name: '', pswd: ''})
  const [msg, setMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const detailsHandler = (value, field) => {
    switch (field) {
      case 'name':
        setDetails(prev => ({...prev, name: value}))
        break
      case 'pswd':
        setDetails(prev => ({...prev, pswd: value}))
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
            User Name
          </label>
          <input
            type="text"
            id="userName"
            className="input"
            placeholder="User Name"
            onChange={e => detailsHandler(e.target.value, 'name')}
          />
        </div>
        <div className="password">
          <label htmlFor="userName" className="label">
            Password
          </label>
          <input
            type="text"
            id="userName"
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
