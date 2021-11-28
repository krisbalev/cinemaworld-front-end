import './App.css';
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import { createBrowserHistory } from "history";
import axios from 'axios';

import Navbar from './components/Navbar';
import Home from "./pages/Home";
import Movie from './pages/Movie';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

function App() {

  const history = createBrowserHistory();

  const register = (username, password, email, firstName, lastName) => {
    axios
      .post("http://localhost:8080/user/register", {
        username,
        email,
        password,
        firstName,
        lastName
      })
      .then((res) => {
        if (res.data.error) {
          alert(res.data);
          history.push("/login");
          window.location.reload();
        }
      })
      .catch((error) => {
        if (error.response.status === 409) {
          console.log(error.res);
          alert(error.res.data);
        } else {
          alert("Something went wrong");
        }
      });
  };

  const login = (username, password) => {
    axios
        .post("http://localhost:8080/login", { username, password })
        .then((res) => {
            if (res.data.error) {
                console.log(res.data);
                alert("Invalid credentials");
            } else {
                console.log(res.data);

                localStorage.setItem('accessToken', JSON.stringify(res.data));

                history.push("/")
                window.location.reload();
            }
        });

};

  const logout = () => {
    localStorage.removeItem('accessToken');
    history.push("/login")
    window.location.reload();
  }

  return (
    <div className="App">
      <Router>
        <Navbar logout={logout} />
        <div className="spacer" id="home"></div>
        <Switch>
          <Route exact path='/' exact component={Home} />
          <Route exact path='/movies/:id' exact component={Movie} />
          {
            localStorage.getItem('accessToken') ?
              <>
                <Route exact path='/profile' exact component={Profile} />
              </>
              :
              <>
                <Route path="/register"> <Register register={register} /> </Route>
                <Route path="/login"> <Login login={login} /> </Route>
              </>
          }
        </Switch>
      </Router>
    </div>

  );
}

export default App;
