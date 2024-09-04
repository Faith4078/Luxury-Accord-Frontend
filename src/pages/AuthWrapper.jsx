import React from 'react';

import styled from 'styled-components';

function AuthWrapper({ children }) {
  // if (isLoading) {
  //   return (
  //     <Wrapper>
  //       <h1>Loading....</h1>
  //     </Wrapper>
  //   );
  // }
  // if (error) {
  //   return (
  //     <Wrapper>
  //       <h1>{error}</h1>
  //     </Wrapper>
  //   );
  // }
  return <>{children}</>;
}

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
`;

export default AuthWrapper;
