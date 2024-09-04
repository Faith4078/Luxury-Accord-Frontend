import React, { useEffect, useState } from 'react';

const Success = () => {
  const [message, setMessage] = useState('');
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get('success')) {
      setMessage('Order placed! You will receive an email confirmation.');
    }
  }, []);
  return (
    <main className="text-center h-screen">
      <p className="font-bold md:text-4xl 2xl:text-9xl">{message}</p>
    </main>
  );
};

export default Success;
