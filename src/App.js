import './App.css'

import {Switch, Route, Redirect} from 'react-router-dom'

import Login from './components/Login/index'
import Home from './components/Home/index'
import Jobs from './components/Jobs/index'
import JobDetails from './components/JobDetails/index'
import NotFound from './components/NotFound/index'

const Cookies = require('js-cookie')

const App = () => {
  const token = Cookies.get('jwt_token')
  return (
    <div className="main__div">
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route path="/home" component={Home} />
        <Route exact path="/jobs" component={Jobs} />
        <Route exact path="/jobs/:id" component={JobDetails} />

        <Route exact path="/">
          {token ? <Redirect to="/home" /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/login">
          {token ? <Redirect to="/home" /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/jobs">
          {token ? <Redirect to="/jobs" /> : <Redirect to="/login" />}
        </Route>

        <Route exact path="/jobs/:id">
          {token ? <Redirect to="/jobs/:id" /> : <Redirect to="/login" />}
        </Route>
        <Route component={NotFound} />

        <Route>
          <Redirect to="/not-found" />
        </Route>
      </Switch>
    </div>
  )
}

export default App
