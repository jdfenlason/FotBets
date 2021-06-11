import React from 'react';
import Header from './header';
import Footer from './footer';
import FixturesContainer from './fixtures-container';
import Profile from './user-profile';
import PastBets from './past-bets';

const Home = props => {
  const {
    userTokens,
    userName,
    profileOn,
    fixturesOn,
    handleProfile,
    handleFixtures,
    pastBets,
    handleTokenChange,
    handlePastBets
  } = props;
  return (
    <>
      <div className="container">
        <div className="header">
          <Header userTokens={userTokens} />
        </div>
        <div className="main">
          <div className={!profileOn && fixturesOn ? 'hidden' : ''}>
            <Profile pastBets = {pastBets} userTokens={userTokens} userName={userName} />
            <PastBets pastBets = {pastBets} handlePastBets = {handlePastBets}/>
          </div>
          <div className={profileOn && !fixturesOn ? 'hidden' : ''}>
            <FixturesContainer userTokens={userTokens} handleTokenChange = {handleTokenChange} handlePastBets = {handlePastBets} />
          </div>
        </div>
        <div className="footer">
          <Footer
            handleProfile={handleProfile}
            handleFixtures={handleFixtures}
          />
        </div>
      </div>
    </>
  );
};
export default Home;
