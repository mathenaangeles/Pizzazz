import * as React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { Container, Row, Col } from "reactstrap";
import "../stylesheets/Menu.css";

interface Pizza {
  size: string;
  crust: string;
  toppings: string[];
  total: number;
}

interface State {
  pizzas: Pizza[];
}

class Menu extends React.Component<{}, State> {
  state: State = {
    pizzas: [],
  };
  componentDidMount() {
    axios
      .get("http://localhost:4000/pizza")
      .then((response) => {
        this.setState({ pizzas: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    return (
      <div className="menu">
        <Container>
          <Row> 
            {this.state.pizzas.length===0 &&
              <div>
                <h1 className="no-pizzas">No Pizzas Found...</h1>
                <Link to="/" className="no-pizzas-link">
                  <h5 className="mt-2">Click here to add your own custom pizza to the menu.</h5>
                </Link>
              </div>
            }
            {this.state.pizzas.reverse().map((pizza) => (
              <Col xs="4">
                <Card className="mb-5">
                  <Card.Header>TOTAL = ${pizza.total}</Card.Header>
                  <Card.Body>
                    <Card.Text>
                      This is a <b>{pizza.size}</b> pizza with a{" "}
                      <b>{pizza.crust}</b> crust.
                    </Card.Text>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    {pizza.toppings.map((topping) => {
                      return <ListGroupItem>{topping}</ListGroupItem>;
                    })}
                  </ListGroup>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    );
  }
}

export default Menu;
