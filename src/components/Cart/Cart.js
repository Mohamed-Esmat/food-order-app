import { useContext } from 'react';
import { nanoid } from 'nanoid';

import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';

import classes from './Cart.module.css';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${Math.abs(cartCtx.totalAmount).toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (itemId) => {
    cartCtx.removeItem(itemId);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => {
        const id = nanoid();
        return (
          <CartItem
            key={id}
            {...item}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
          />
        );
      })}
    </ul>
  );

  return (
    <Modal onCloseCart={props.onCloseCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onCloseCart}>
          Close
        </button>
        {hasItems && <button className={classes['button']}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
