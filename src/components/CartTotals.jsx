import React from 'react';
import styled from 'styled-components';
import { useCartContext } from '../context/cart_context';
import { useUserContext } from '../context/user_context';
import { formatPrice } from '../utils/helpers';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { SignIn, SignInButton } from '@clerk/clerk-react';
import { Button } from 'antd';
import { Bounce, toast } from 'react-toastify';

const CartTotals = () => {
  const { total_amount, shipping_fee, cart } = useCartContext();
  const { user } = useUserContext();
  const handleSubmit = async (e) => {
    toast('your ordered is being placed', {
      position: 'bottom-right',
      autoClose: 2500,
      hideProgressBar: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: Bounce,
    });
    e.preventDefault();
    try {
      const response = await fetch(
        'https://luxury-accord-backend.onrender.com/create-checkout-session',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ cart }),
        }
      );

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe Checkout
      } else {
        console.error('Checkout session failed to create.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };

  return (
    <Wrapper>
      <div>
        <article>
          <h5>
            subtotal :<span>${total_amount}</span>
          </h5>
          <p>
            shipping fee :<span>{formatPrice(shipping_fee)}</span>
          </p>
          <hr />
          <h4>
            order total :<span>${total_amount + shipping_fee}</span>
          </h4>
        </article>
        {user ? (
          // <Link to="/checkout" className="btn">
          //   proceed to checkout
          // </Link>
          // <Link to={'/checkout'} className="btn">
          //   proceed to checkout
          // </Link>
          <form onSubmit={handleSubmit}>
            <button type="submit" className="btn">
              Checkout
            </button>
          </form>
        ) : (
          <SignInButton>
            <button
              type="button"
              className="bg-amber-800 font-mono h-12 w-48 rounded-lg text-white bold mt-4 hover: border border-amber-800"
            >
              Sign In
            </button>
          </SignInButton>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  article {
    border: 1px solid var(--clr-grey-8);
    border-radius: var(--radius);
    padding: 1.5rem 3rem;
  }
  h4,
  h5,
  p {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
  p {
    text-transform: capitalize;
  }
  h4 {
    margin-top: 2rem;
  }
  @media (min-width: 776px) {
    justify-content: flex-end;
  }
  .btn {
    width: 100%;
    margin-top: 1rem;
    text-align: center;
    font-weight: 700;
  }
`;

export default CartTotals;
