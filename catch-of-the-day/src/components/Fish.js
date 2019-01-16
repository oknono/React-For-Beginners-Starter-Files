import React from "react";
import { formatPrice } from "../helpers";

class Fish extends React.Component {
  handleClick = () => {
    this.props.addOrder(this.props.index);
  };
  render() {
    const { name, price, status, desc, image } = this.props.details;
    const isAvailable = status === "available";
    return (
      <li className="menu-fish">
        <img src={image} alt={name} />
        <h3 className="fish-name">
          {name}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <button disabled={!isAvailable} onClick={this.handleClick}>
          {isAvailable ? "Add to Cart" : "Sold out!"}
        </button>
      </li>
    );
  }
}

export default Fish;