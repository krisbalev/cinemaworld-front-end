import './App.css';
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";

import Navbar from './components/Navbar';
import Home from "./pages/Home";
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    const getData = () => {
      axios
        .get("http://localhost:8080/movies")
        .then((res) => {
          if (res.data.error) {
            console.log(res.data);
            alert("Something went wrong");
          } else {
            setMovies(res.data);
          }
        });
    }
    getData();
  }, []);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
        </Switch>
      </Router>
      <div>
      {movies && (
        <div className="movies">

          {movies.map((movie, index) => (
            <div key={index}>
              <h2>{movie.title}</h2>
            </div>
          ))}


        </div>
      )}
      </div>
    </div>
  );
}

export default App;
