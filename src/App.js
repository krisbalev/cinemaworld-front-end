import './App.css';
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";

import Navbar from './components/Navbar';
import Home from "./pages/Home";
import Movie from './pages/Movie';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="spacer"></div>
        <Switch>
          <Route exact path='/' exact component={Home} />
          <Route exact path='/movies/:id' exact component={Movie}/>
          <Route exact path='/login' exact component={Login}/>
          <Route exact path='/register' exact component={Register}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
