import * as React from "react";
import axios from "axios";
import {
  Form,
  Button,
  Card,
  Alert,
  Badge,
  ListGroupItem,
  ListGroup,
} from "react-bootstrap";
import pepperoni from "../images/pepperoni.png";
import mushrooms from "../images/mushroom.png";
import onions from "../images/onions.png";
import sausage from "../images/sausage.png";
import bacon from "../images/bacon.png";
import cheese from "../images/cheese.png";
import olives from "../images/olives.png";
import peppers from "../images/peppers.png";
import pineapple from "../images/pineapple.png";
import spinach from "../images/spinach.png";
import "../stylesheets/PizzaForm.css";
import { Container, Row, Col } from "reactstrap";
import { History, LocationState } from "history";

interface Props {
  history: History<LocationState>;
}

interface State {
  size: string;
  crust: string;
  toppings: string[];
  total: number;
  maximum: number;
  page: number;
  repetitionError: boolean;
  maximumError: boolean;
}

const choices = [
  { name: "Pepperoni", image: pepperoni },
  { name: "Mushrooms", image: mushrooms },
  { name: "Onions", image: onions },
  { name: "Sausage", image: sausage },
  { name: "Bacon", image: bacon },
  { name: "Extra Cheese", image: cheese },
  { name: "Black Olives", image: olives },
  { name: "Green Peppers", image: peppers },
  { name: "Pineapple", image: pineapple },
  { name: "Spinach", image: spinach },
];
const sizePrice = [8, 10, 12];
const crustPrice = [2, 4];

class PizzaForm extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.handleCrustChange = this.handleCrustChange.bind(this);
  }
  state: State = {
    size: "Small",
    crust: "Thin",
    toppings: [],
    total: 0,
    maximum: 5,
    page: 0,
    repetitionError: false,
    maximumError: false,
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const pizza = {
      size: this.state.size,
      crust: this.state.crust,
      toppings: this.state.toppings,
      total: this.state.total,
    };
    axios
      .post("http://localhost:4000/pizza/create", pizza)
      .then((res) => this.props.history.push("/menu"))
      .catch((err) => alert(err));
  };
  handleSizeChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ size: e.target.value });
  }
  handleCrustChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ crust: e.target.value });
  }
  handleAddTopping(e: React.MouseEvent<HTMLButtonElement>) {
    this.setState({ repetitionError: false });
    if (this.state.toppings.length < this.state.maximum) {
      if (this.state.toppings.includes(e.currentTarget.value)) {
        this.setState({ repetitionError: true });
      } else {
        this.setState({
          toppings: [...this.state.toppings, e.currentTarget.value],
        });
      }
    } else {
      this.setState({ maximumError: true });
    }
  }
  next = () => {
    if (this.state.page === 0) {
      if (this.state.size === "Small") {
        this.setState((state) => ({ total: state.total + sizePrice[0] }));
        this.setState((state) => ({ maximum: 5 }));
      } else if (this.state.size === "Medium") {
        this.setState((state) => ({ total: state.total + sizePrice[1] }));
        this.setState((state) => ({ maximum: 7 }));
      } else if (this.state.size === "Large") {
        this.setState((state) => ({ total: state.total + sizePrice[2] }));
        this.setState((state) => ({ maximum: 9 }));
      }
      if (this.state.crust === "Thin") {
        this.setState((state) => ({ total: state.total + crustPrice[0] }));
      } else if (this.state.crust === "Thick") {
        this.setState((state) => ({ total: state.total + crustPrice[1] }));
      }
    } else if (this.state.page === 1) {
      if (this.state.toppings.length > 3) {
        const extraIngredients = this.state.toppings.length - 3;
        this.setState((state) => ({
          total: state.total + 0.5 * extraIngredients,
        }));
      }
    }
    this.setState((state) => ({ page: state.page + 1 }));
  };
  render() {
    switch (this.state.page) {
      case 0:
        return (
          <div className="page-one">
            <div className="page-one-panel">
              <h1>Create your own pizza.</h1>
              <hr />
              <h5>1. Choose the size and crust type.</h5>
              <Form className="mt-3">
                <Form.Group>
                  <Form.Label>Size</Form.Label>
                  <Form.Control as="select" onChange={this.handleSizeChange}>
                    <option>Small</option>
                    <option>Medium</option>
                    <option>Large</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Crust Type</Form.Label>
                  <Form.Control as="select" onChange={this.handleCrustChange}>
                    <option>Thin</option>
                    <option>Thick</option>
                  </Form.Control>
                </Form.Group>
              </Form>
              <Button className="mt-3" onClick={this.next}>
                Next
              </Button>
            </div>
          </div>
        );
      case 1:
        let message;
        if (this.state.repetitionError) {
          message = (
            <Alert variant="dark">You have already added this topping.</Alert>
          );
        } else if (this.state.maximumError) {
          message = (
            <Alert variant="dark">
              You have have reached the maximum capacity of toppings.
            </Alert>
          );
        }
        return (
          <div className="page-two">
            <h5 className="ml-3 mb-3">
              2. Add toppings to your pizza.{" "}
              {this.state.toppings.map((topping) => {
                return (
                  <span>
                    <Badge variant="secondary">{topping}</Badge>&nbsp;
                  </span>
                );
              })}
            </h5>
            {message}
            <Container className="page-two-choices">
              <Row>
                {choices.map((choice) => (
                  <Col xs="4">
                    <Card className="topping-card mb-5">
                      <Card.Img variant="top" src={choice.image} />
                      <Card.Body>
                        <Card.Title>{choice.name}</Card.Title>
                        <Button
                          variant="primary"
                          value={choice.name}
                          onClick={this.handleAddTopping.bind(this)}
                          block
                        >
                          Add Topping
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Container>
            <Button className="ml-3" onClick={this.next}>
              Next
            </Button>
          </div>
        );
      case 2:
        let sPrice;
        if (this.state.size === "Small") {
          sPrice = 8;
        } else if (this.state.size === "Medium") {
          sPrice = 10;
        } else {
          sPrice = 12;
        }
        let cPrice;
        if (this.state.crust === "Thin") {
          cPrice = 2;
        } else {
          cPrice = 4;
        }
        return (
          <div className="page-three container">
            <h5 className="mb-3">3. Check your custom pizza.</h5>
            <Card bg="light">
              <Card.Header>TOTAL = ${this.state.total}</Card.Header>
              <Card.Body>
                <Card.Text>
                  This is a{" "}
                  <b>
                    {this.state.size} (${sPrice})
                  </b>{" "}
                  pizza with a{" "}
                  <b>
                    {this.state.crust} (${cPrice})
                  </b>{" "}
                  crust. You will be charged for every additional topping{" "}
                  <b>(+$0.5) </b>
                  after the third one.
                </Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                {this.state.toppings.map((topping) => {
                  return <ListGroupItem>{topping}</ListGroupItem>;
                })}
              </ListGroup>
              <Card.Footer>
                <Button block onClick={this.handleSubmit}>
                  Submit
                </Button>
              </Card.Footer>
            </Card>
          </div>
        );
    }
  }
}

export default PizzaForm;
