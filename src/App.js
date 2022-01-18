import './App.css';
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import { createBrowserHistory } from "history";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from "./pages/Home";
import Movie from './pages/Movie';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ReservationPage from './pages/ReservationPage';
import Notifications from './pages/Notifications';
import authHeader from './authHeader';
import AdminPage from './pages/AdminPage';

function App() {
  const [user, setUser] = useState({});
  const history = createBrowserHistory();

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      axios
        .get("http://localhost:8080/user/account", { headers: authHeader(), })
        .then((res) => {
          if (res.data.error) {
            console.log(res.data);
            alert("Something went wrong");
          } else {
            setUser(res.data);
          }
        });
    }
  })

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
            localStorage.getItem('accessToken') && user.role === "USER" ?
              <>
                <Route exact path='/profile' exact component={Profile} />
                <Route exact path='/reserve' exact component={ReservationPage} />
                <Route exact path='/discussion' exact component={Notifications} />

              </>
              : localStorage.getItem('accessToken') && user.role === "ADMIN" ?
                <>
                  <Route exact path='/profile' exact component={Profile} />
                  <Route exact path='/reserve' exact component={ReservationPage} />
                  <Route exact path='/discussion' exact component={Notifications} />
                  <Route exact path='/admin-settings' exact component={AdminPage} />
                </>
                :
                <>
                  <Route path="/register"> <Register register={register} /> </Route>
                  <Route path="/login"> <Login /> </Route>
                </>
          }
        </Switch>
      </Router>
    </div>

  );
}

export default App;