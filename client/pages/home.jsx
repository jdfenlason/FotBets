import React from 'react';

const Home = props => {
  return (
    <>
      <div className="overlay"></div>
      <div className="home-hero-image">
          <div className="title title-row">
            <span className="large">
              <h2>
                F<i className="fas fa-futbol logoSize"></i>tBets
              </h2>
            </span>
            </div>

            <div className="align message-column">
              <h3>
                An interactive competition against your friends to rack up the
                most tokens!
              </h3>
          </div>
        <div className="button-container row button-row">
          <a href="#sign-in">
            <button className="enter-button " type="submit">
              Sign In
            </button>
          </a>
          <a href="#sign-up">
            <button className="enter-button" type="button">
              Sign Up
            </button>
          </a>
        </div>
        </div>
    </>
  );
};
export default Home;
