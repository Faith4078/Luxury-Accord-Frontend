import React, { useState, useEffect } from 'react';

const Cancel = () => {
  const [message, setMessage] = useState('');
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get('canceled')) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);
  return (
    <main className="h-screen  ">
      <p className="text-xl mt-22 font-bold text-center  md:text-2xl lg:text-4xl 2xl:text-9xl">
        {message}
      </p>
    </main>
  );
};

export default Cancel;
