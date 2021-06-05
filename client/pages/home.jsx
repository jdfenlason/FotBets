import React from 'react';
import Header from './header';
import Footer from './footer';
import FixturesContainer from './fixtures-container';
export default function Home(props) {
  return (
    <>
      <div className="container">
        <div className="header">
          <Header />
        </div>
        <div className="main">
          <FixturesContainer />
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </>
  );
}
