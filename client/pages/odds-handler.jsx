import React from 'react';
import BetSlip from './bet-slip';
const OddsHandler = props => {
  const value = props.wagerAmount;
  return (

  <>
  <div className="row column-full center" >
         <div className="outer-card column-full">
           <div className="match-card row center">
             <h3>Bet Slip</h3>
           </div>
  <BetSlip fixtures ={props.fixtures} activeId={props.activeId} wagerAmount={props.wagerAmount} homeOdds={props.homeOdds} awayOdds = {props.awayOdds} userTokens = {props.UserTokens} betOn = {props.betOn} />

     <div className = {(!props.betOn) ? 'row' : 'hidden'}>
      <div className = "input-container column-full">
        <form onSubmit={event => props.onSubmit} className="column-full" >
          <input
        className = "wager-input"
        type="number"
        max = {props.userTokens}
        required
        autoFocus
        value = {value}
        placeholder= "WAGER HERE"
        onChange={() => props.handleChange(event)}/>
        <div className = {(!props.betOn) ? 'row' : 'hidden'}>
          {/* <h4 className={!wagerAmount ? 'hidden' : 'row payout center'}>{makeBets(Number(wagerAmount), Number(homeOdds))}</h4> */}
          </div>
        <div className = "button-container row">
      <button className = "enter-button" type="button" >Check Profit</button>
      <button className = "enter-button" type="submit" >ENTER</button>
        </div>
        </form>
      </div>
        </div>
    </div>
        </div>

      </>
  );
};
export default OddsHandler;
