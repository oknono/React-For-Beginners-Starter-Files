import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { formatPrice } from "../helpers";

class Order extends React.Component {
  renderOrder = fishKey => {
    const fish = this.props.fishes[fishKey];
    const count = this.props.order[fishKey];
    const transitionOptions = {
      classNames: "order",
      key: fishKey,
      timeout: { enter: 250, exit: 250 }
    };
    if (!fish) return null;
    const isAvailable = fish.status === "available";
    if (!isAvailable) {
      return (
        <CSSTransition {...transitionOptions}>
          <li key={fishKey}>Sorry, {fish.name} not available</li>
        </CSSTransition>
      );
    } else {
      return (
        <CSSTransition {...transitionOptions}>
          <li key={fishKey}>
            <span>
              <TransitionGroup component="span" className="count">
                <CSSTransition
                  classNames="count"
                  key={count}
                  timeout={{ enter: 250, exit: 250 }}
                >
                  <span>{count}</span>
                </CSSTransition>
              </TransitionGroup>
              &nbsp;lbs {fish.name}@ {formatPrice(fish.price)}/lbs
              <button onClick={() => this.props.removeOrder(fishKey)}>X</button>
            </span>
          </li>
        </CSSTransition>
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
        <TransitionGroup component="ul" className="order">
          {orderIds.map(this.renderOrder)}
        </TransitionGroup>
        <div className="total">
          Total:
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
}

export default Order;
