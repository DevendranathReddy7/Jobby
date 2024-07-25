import './App.css'

import {Switch, Route, Redirect} from 'react-router-dom'

import Login from './components/Login/index'
import Home from './components/Home/index'
import Jobs from './components/Jobs/index'
import JobDetails from './components/JobDetails/index'
import NOTFOUND from './components/NotFound/index'

const App = () => {
  console.log('123')
  return (
    <div className="main__div">
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route exact path="/login" component={Login} />
        <Route path="/home" component={Home} />
        <Route exact path="/jobs" component={Jobs} />
        <Route exact path="/jobs/:id" component={JobDetails} />
        <Route component={NOTFOUND} />
      </Switch>
    </div>
  )
}

export default App
