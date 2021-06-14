import React from 'react';
import FixturesContainer from '../components/fixtures-container';

const Home = props => {
  const {
    handleTokenChange,
    userTokens,
    handlePastBets
  } = props;
  return (
    <>
          <FixturesContainer
            userTokens={userTokens}
            handleTokenChange={handleTokenChange}
            handlePastBets={handlePastBets}
            />
</>
  );
};
export default Home;
