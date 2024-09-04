import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
const brevoAPIKey = import.meta.env.VITE_BREVO_API_KEY;
if (!brevoAPIKey) {
  throw new Error('Missing API Key');
}
const Contact = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const subscribeUser = async (email) => {
    try {
      const response = await axios.post(
        'https://api.brevo.com/v3/contacts',
        {
          email: email,
          listIds: [6],
          updateEnabled: false,
        },
        {
          headers: {
            'api-key': brevoAPIKey,
            'Content-Type': 'application/json',
          },
        }
      );
      navigate('/subscribed');
    } catch (error) {
      if (
        error.response &&
        error.response.data.code === 'duplicate_parameter'
      ) {
        alert('User already subscribed and cannot be subscribed twice.');
        return;
      }
      error.response && alert('Error subscribing user');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    subscribeUser(email);
    e.target.reset();
  };

  return (
    <Wrapper>
      <div className="section-center">
        <h3>Join our newsletter and get 20% off</h3>
        <div className="content">
          <p>
            Stay ahead in luxury living. Join our newsletter for exclusive
            updates on curated collections, design inspirations, and insider
            offers. Elevate your home with our latest arrivals and expert tips
            delivered directly to your inbox
          </p>
          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="enter email"
            />

            <button type="submit" className="submit-btn">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  padding: 5rem 0;
  h3 {
    text-transform: none;
  }
  p {
    line-height: 2;
    max-width: 45em;
    color: var(--clr-grey-5);
  }
  .contact-form {
    width: 90vw;
    max-width: 500px;
    display: grid;
    grid-template-columns: 1fr auto;
  }

  .form-input,
  .submit-btn {
    font-size: 1rem;
    padding: 0.5rem 1rem;
    border: 2px solid var(--clr-black);
  }
  .form-input {
    border-right: none;
    color: var(--clr-grey-3);
    border-top-left-radius: var(--radius);
    border-bottom-left-radius: var(--radius);
  }
  .submit-btn {
    border-top-right-radius: var(--radius);
    border-bottom-right-radius: var(--radius);
  }
  .form-input::placeholder {
    color: var(--clr-black);
    text-transform: capitalize;
  }
  .submit-btn {
    background: var(--clr-primary-5);
    text-transform: capitalize;
    letter-spacing: var(--spacing);
    cursor: pointer;
    transition: var(--transition);
    color: var(--clr-black);
  }
  .submit-btn:hover {
    color: var(--clr-white);
  }
  @media (min-width: 992px) {
    .content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      gap: 8rem;
      margin-top: 2rem;
    }
    p {
      margin-bottom: 0;
    }
  }
  @media (min-width: 1280px) {
    padding: 15rem 0;
  }
`;

export default Contact;
