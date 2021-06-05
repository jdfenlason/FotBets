import React from 'react';
import Header from './header';
import Footer from './footer';
import FixturesContainer from './fixtures-container';
import Profile from './user-profile';

const Home = props => {
  return (
    <>
      <div className="container">
        <div className="header">
          <Header userTokens={props.userTokens} />
        </div>
        <div className="main">
          <Profile className= "hidden" userTokens={props.userTokens} userName={props.userName} />
          <FixturesContainer />
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </>
  );

};
export default Home;
