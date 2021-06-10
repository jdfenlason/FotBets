import React from 'react';
import Header from './header';
import Footer from './footer';
import FixturesContainer from './fixtures-container';
import Profile from './user-profile';

const Home = props => {
  const {
    userTokens,
    userName,
    profileOn,
    fixturesOn,
    handleProfile,
    handleFixtures
  } = props;
  return (
    <>
      <div className="container">
        <div className="header">
          <Header userTokens={userTokens} />
        </div>
        <div className="main">
          <div className={!profileOn && fixturesOn ? 'hidden' : ''}>
            <Profile userTokens={userTokens} userName={userName} />
          </div>
          <div className={profileOn && !fixturesOn ? 'hidden' : ''}>
            <FixturesContainer userTokens={userTokens} />
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
