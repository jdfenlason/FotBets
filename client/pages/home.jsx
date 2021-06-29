import React from 'react';

const Home = props => {
  return (
    <>
      <div className="row column-full center fixture-card">
        <div className="outer-card column-full">
          <div className="match-card row center">
           <span className = "bet-item">
            <h2>F
              <i className='fas fa-futbol logoSize'></i>tBets</h2></span>
                <h3 className = "align">Compete against your friends to rack up the most tokens!</h3>
            <img className= "home-image" src="../bigger.jpeg" alt="" />
            </div>

            <div className="button-container row">
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
        </div>

    </>
  );
};
export default Home;
