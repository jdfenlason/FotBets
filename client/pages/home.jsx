import React from 'react';
import Header from './header';
import Footer from './footer';
import FixturesContainer from './fixtures-container';
import Profile from './user-profile';
import DateStrip from './date-strip';

const Home = props => {
  return (
    <>
      <div className="container">
        <div className="header">
          <Header userTokens={props.userTokens} />
        </div>
        <div className="main">
          <div className={!props.profileOn && props.fixturesOn ? 'hidden' : ''}>
            <Profile userTokens={props.userTokens} userName={props.userName} />
          </div>
          <div className={props.profileOn && !props.fixturesOn ? 'hidden' : ''}>
            <DateStrip/>
            <FixturesContainer />
          </div>
        </div>
        <div className="footer">
          <Footer handleProfile={props.handleProfile}
            handleFixtures = {props.handleFixtures}
          />
        </div>
      </div>
    </>
  );
};
export default Home;
