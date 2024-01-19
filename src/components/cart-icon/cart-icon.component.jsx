import { ReactComponent as BagIcon } from "../../assets/shopping-bag.svg";
import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import "./cart-icon.styles.scss";

const CartIcon = () => {

  const {isCartOpen, setIsCartOpen, cartItems} = useContext(CartContext);
  const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const toggleisCartOpen = () => {setIsCartOpen(!isCartOpen)}

  return (
    <div className="cart-icon-container" onClick={toggleisCartOpen}>
      <BagIcon className="bag-icon"/>
      <span className="item-count">{count}</span>
    </div>
  );
};

export default CartIcon;
