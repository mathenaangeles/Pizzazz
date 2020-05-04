import * as React from "react";
import axios from "axios";
import { Card } from "react-bootstrap";

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
      <div>
        {this.state.pizzas.map((pizza) => (
          <Card>
            <Card.Body>
              {pizza.size}
              {pizza.crust}
              {pizza.toppings.map((topping) => {
                return topping;
              })}
              {pizza.total}
            </Card.Body>
          </Card>
        ))}
      </div>
    );
  }
}

export default Menu;
