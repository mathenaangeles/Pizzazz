import * as React from "react";
import "./App.css";
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import PizzaForm from "./components/PizzaForm";
import Menu from "./components/Menu";
import NotFound from "./components/NotFound";

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Router>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="#home">PIZZAZZ</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ml-auto">
                <Link to="/">Home</Link>
                <Link to="/menu">Menu</Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <Switch>
            <Route exact path="/" component={PizzaForm} />
            <Route path="/menu" component={Menu} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
