// import React, { useState } from 'react';
// import makeBets from './payouts';
// const WagerInput = props => {
//   console.log(() => props.handleSubmit());
//   console.log(props);
//   const [homeOdds, setHomeOdds] = useState();
//   const [awayOdds, setAwayOdds] = useState();
//   const [userId, setUserId] = useState();
//   const [userTokens, setUserTokens] = useState('');
//   const [wagerAmount, setWagerAmount] = useState('');
//   const [value, setValue] = useState('');
//   const [betOn, setBetOn] = useState('');
//   const onChange = event => setWagerAmount(event.target.value);
//   // const onClick = event =>
//   // const onSubmit = event => {}
//   return (
//     <div className = {(!props.betOn) ? 'row' : 'hidden'}>
//       <div className = "input-container column-full">
//         <form onSubmit={this.props.onHandleSubmit()} className="column-full" >
//         <input
//         className = "wager-input"
//         type="number"
//         max = {userTokens}
//         required
//         autoFocus
//         value = {wagerAmount}
//         placeholder= "WAGER HERE"
//         onChange={onChange}/>
//         <div className = {(!betOn) ? 'row' : 'hidden'}>

//       {/* <h4 className={!wagerAmount ? 'hidden' : 'row payout center'}>{makeBets(Number(wagerAmount), Number(homeOdds))}</h4> */}

//           </div>
//         <div className = "button-container row">
//       <button className = "enter-button" type="button" >Check Profit</button>
//       <button className = "enter-button" type="submit" >ENTER</button>
//         </div>
//         </form>
//       </div>
//         </div>
//   );
// };
// export default WagerInput;
