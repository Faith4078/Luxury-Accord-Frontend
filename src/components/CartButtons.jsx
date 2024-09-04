import React from 'react';
import { FaShoppingCart, FaUserMinus, FaUserPlus } from 'react-icons/fa';
import { Link, redirect } from 'react-router-dom';
import styled from 'styled-components';
import { useProductsContext } from '../context/products_context';
import { useCartContext } from '../context/cart_context';
import { useUserContext } from '../context/user_context';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  SignUpButton,
} from '@clerk/clerk-react';
import { Button } from 'antd';
import { Bounce, toast } from 'react-toastify';

const CartButtons = () => {
  const { closeSidebar } = useProductsContext();
  const { total_items, clearCart, dispatch } = useCartContext();
  const { user } = useUserContext();
  return (
    <Wrapper className="cart-btn-wrapper">
      {user ? (
        <Link to="/cart" className="cart-btn" onClick={closeSidebar}>
          <span className="cart-container">
            <FaShoppingCart />
            <span className="cart-value">{total_items}</span>
          </span>
        </Link>
      ) : (
        <div className="cart-btn">
          <SignInButton>
            <span className="cart-container">
              <FaShoppingCart />
              <span className="cart-value">0</span>
            </span>
          </SignInButton>
        </div>
      )}
      {/* {user ? (
   
      ) : (
    
      )} */}
      {/* {myUser ? (
        <button
          type="button"
          className="auth-btn"
          onClick={() => {
            clearCart();
            localStorage.removeItem('user');
            logout();
          }}
        >
          Logout
        </button>
      ) : (
        <div className="flex gap-2">
          <Link
            to="/login"
            className="auth-btn capitalize"
            onClick={closeSidebar}
          >
            login
          </Link>
          <Link
            to="/register"
            className="auth-btn capitalize"
            onClick={closeSidebar}
          >
            register <FaUserPlus />
          </Link>
        </div>
      )} */}

      <SignedIn>
        <SignOutButton>
          <Button
            type="text"
            size="middle"
            onClick={() => {
              toast('logout out successful', {
                position: 'bottom-right',
                autoClose: 8000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
                transition: Bounce,
              });
              // redirect('/');
            }}
          >
            Sign Out
          </Button>
        </SignOutButton>
      </SignedIn>
      <SignedOut>
        <div className="flex items-center w-full gap-1">
          <SignInButton mode="modal">
            <Button type="text" size="middle" className="hover:bg-amber-800">
              Sign In
            </Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button type="text" size="middle" className="hover:bg-amber-800">
              Sign Up
            </Button>
          </SignUpButton>
        </div>
      </SignedOut>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  gap: 15px;
  align-items: center;
  width: 225px;
  .flex-btn {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .cart-btn {
    color: var(--clr-grey-1);
    font-size: 1.5rem;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-1);
    display: flex;

    align-items: center;
  }
  .cart-container {
    display: flex;
    align-items: center;
    position: relative;
    svg {
      height: 1.6rem;
      margin-left: 5px;
    }
  }
  .cart-value {
    position: absolute;
    top: -10px;
    right: -16px;
    background: var(--clr-primary-5);
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 0.75rem;
    color: var(--clr-white);
    padding: 12px;
  }
  .auth-btn {
    display: flex;
    align-items: center;
    background: transparent;
    border-color: transparent;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--clr-grey-1);
    letter-spacing: var(--spacing);
    svg {
      margin-left: 5px;
    }
  }
`;
export default CartButtons;
