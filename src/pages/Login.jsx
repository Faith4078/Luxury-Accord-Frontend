import { SignIn } from '@clerk/clerk-react';
import React from 'react';

function Login() {
  return (
    <main className="flex flex-col items-center">
      <SignIn />;
    </main>
  );
}

export default Login;
