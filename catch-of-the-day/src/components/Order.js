import React from "react";
import { formatPrice } from "../helpers";

class Order extends React.Component {
  renderOrder = fishKey => {
    const fish = this.props.fishes[fishKey];
    const count = this.props.order[fishKey];
    if (!fish) return null;
    const isAvailable = fish.status === "available";
    if (!isAvailable) {
      return <li key={fishKey}>Sorry, {fish.name} not available</li>;
    } else {
      return (
        <li key={fishKey}>
          {count} lbs {fish.name}@ {formatPrice(fish.price)}/lbs
        </li>
      );
    }
  };

  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevTotal, fishKey) => {
      const fish = this.props.fishes[fishKey];
      const count = this.props.order[fishKey];
      const isAvailable = fish && fish.status === "available";
      if (isAvailable) {
        return prevTotal + count * fish.price;
      }
      return prevTotal;
    }, 0);

    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <ul className="order">{orderIds.map(this.renderOrder)}</ul>
        <div className="total">
          Total:
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
}

export default Order;
