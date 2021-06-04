
// import React from 'react';

// import axios from 'axios';
// export default class OddsHandler extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       wagerAmount: '',
//       homeOdds: '',
//       awayOdds: '',
//       teamId: '',
//       userTokens: 300,
//       betOn: false,
//       userId: 1,
//       oddsPicked: '',
//       teamLogo: ''
//     };

//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange(event) {
//     this.setState({
//       wagerAmount: event.target.value
//     });
//   }

//   addWagerInput(newWager) {
//     axios.post('/api/wager-input', { newWager });

//   }

//   handleSubmit(event) {
//     event.preventDefault();
//     const newWager = {
//       userId: this.state.userId,
//       fixtureId: this.state.filterId,
//       wagerAmount: this.state.wagerAmount,
//       betOn: true,
//       oddsPicked: this.state.oddsPicked,
//       teamLogo: this.state.teamLogo
//     };
//     this.Onsubmit(newWager);
//     this.addWagerInput(newWager);
//     this.setState({ wagerAmount: '' });
//   }

//   render() {
//     const value = this.state.wagerAmount;
//     console.log(this.state.homeOdds);
//     return (
//       <>
//      <div className = {(!this.state.betOn) ? 'row' : 'hidden'}>
//       <div className = "input-container column-full">
//         <form onSubmit={() => this.handle} className="column-full" >
//         <input
//         className = "wager-input"
//         type="number"
//         max = {this.state.userTokens}
//         required
//         autoFocus
//         value = {value}
//         placeholder= "WAGER HERE"
//         onChange={this.handleChange}/>
//         <div className = {(!this.state.betOn) ? 'row' : 'hidden'}>
//       {/* <h4 className={!wagerAmount ? 'hidden' : 'row payout center'}>{makeBets(Number(wagerAmount), Number(homeOdds))}</h4> */}
//           </div>
//         <div className = "button-container row">
//       <button className = "enter-button" type="button" >Check Profit</button>
//       <button className = "enter-button" type="submit" >ENTER</button>
//         </div>
//         </form>
//       </div>
//         </div>

//       </>
//     );
//   }
// }
