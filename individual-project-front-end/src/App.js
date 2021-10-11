import './App.css';
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";

import Navbar from './components/Navbar';
import Home from "./pages/Home";
import Movie from './pages/Movie';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/movies/:id' exact component={Movie}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
