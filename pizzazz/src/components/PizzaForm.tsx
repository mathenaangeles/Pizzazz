import * as React from "react";
import { Form, Button, Card } from "react-bootstrap";
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

class PizzaForm extends React.Component<{}, State> {
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
    let message;
    if (this.state.repetitionError) {
      message = <h1>You have already added this topping.</h1>;
    } else if (this.state.maximumError) {
      message = (
        <h1>You have have reached the maximum capacity of toppings.</h1>
      );
    }
    switch (this.state.page) {
      case 0:
        return (
          <div className="container">
            <Form>
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
            <Button onClick={this.next}>Next</Button>
          </div>
        );
      case 1:
        return (
          <div className="container">
            {message}
            {choices.map((choice) => (
              <Card>
                <Card.Img variant="top" src={choice.image} />
                <Card.Body>
                  <Card.Title>{choice.name}</Card.Title>
                  <Button
                    variant="primary"
                    value={choice.name}
                    onClick={this.handleAddTopping.bind(this)}
                  >
                    Add Topping
                  </Button>
                </Card.Body>
              </Card>
            ))}
            <Button onClick={this.next}>Next</Button>
          </div>
        );
      case 2:
        return (
          <div className="container">
            <h1>SIZE:{this.state.size}</h1>
            <h1>CRUST:{this.state.crust}</h1>
            <h1>TOTAL:{this.state.total}</h1>
            <ul>
              {this.state.toppings.map((topping) => {
                return <li>{topping}</li>;
              })}
            </ul>
            <Button onClick={this.handleSubmit}>Submit</Button>
          </div>
        );
    }
  }
}

export default PizzaForm;
