import './index.css'
import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import LoaderComp from '../Loader/index'

const Cookies = require('js-cookie')

const Login = () => {
  const history = useHistory()
  const [details, setDetails] = useState({
    username: '',
    password: '',
  })
  const [msg, setMsg] = useState({error: false, msg: ''})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (Cookies.get('jwt_token')) {
      history.replace('/home')
    }
  }, [])
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

  const submitHandler = async e => {
    e.preventDefault()
    setIsLoading(true)
    const options = {
      method: 'POST',
      body: JSON.stringify(details),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    if (data.jwt_token) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 1, path: '/'})
      setMsg(prev => ({...prev, error: false, msg: ''}))
      history.replace('/home')
    } else {
      setMsg(prev => ({...prev, error: true, msg: data.error_msg}))
    }
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

      <form onSubmit={submitHandler}>
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
        <button type="submit" className="btn__login">
          Login
        </button>

        {msg.error && <p className="err_msg">{msg.msg}</p>}
      </form>

      {isLoading && <LoaderComp />}
    </div>
  )
}

export default Login
