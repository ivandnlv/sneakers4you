import React, { useState, useEffect } from 'react';
import CompleteOrder from '../CompleteOrder';
import EmptyCart from '../EmptyCart';
import NotEmptyCart from '../NotEmptyCart';
import closeIcon from './close.svg';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { closeCart } from '../../redux/slices/cart';

const Cart: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const { cartSneakers, open, finalPrice } = useTypedSelector((state) => state.cart);
  const [orderComplete, setOrderComplete] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    }
  }, [open]);

  const onCloseCart = () => {
    dispatch(closeCart());
  };

  const onOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target instanceof HTMLDivElement && e.target.classList.contains('overlay')) {
      onClickClose();
    }
  };

  // Animations

  const [cartClosed, setCartClosed] = useState('cart');
  const [overlayHidden, setOverlayHidden] = useState('overlay');

  const onClickClose = () => {
    setCartClosed('cart hide');
    setTimeout(() => setCartClosed('cart hide hidden'), 190);
    setOverlayHidden('overlay hide');
    setTimeout(() => onCloseCart(), 190);
  };

  return (
    <div className={overlayHidden} onClick={(e) => onOverlayClick(e)}>
      <div className={cartClosed}>
        <div className="cart__top">
          <h1>Корзина</h1>
          <button className="cart__close" onClick={onClickClose}>
            <img src={closeIcon} alt="closeIcon" />
          </button>
        </div>
        {(!cartSneakers || !cartSneakers.length) && !orderComplete ? (
          <EmptyCart closeCart={onClickClose} />
        ) : !cartSneakers && orderComplete ? (
          <CompleteOrder setOrderComplete={setOrderComplete} />
        ) : (
          <NotEmptyCart setOrderComplete={setOrderComplete} />
        )}
      </div>
    </div>
  );
};

export default Cart;
