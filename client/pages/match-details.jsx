import React from 'react';
import formatDate from './format-date';
// import MatchForm from './matchForm';
// import formatTime from './format-time';
const MatchDetails = props => {
  return (
    <div className = {props.className} id={props.id}>
     <div className="row column-full center fixture-card">

        <div className="outer-card column-full">
      <div className ="match-card row center" >
                <h2>Match Details</h2>
             <h5 className="sub-head">{props.matchdetails.league.name}</h5>
           <h6 className="sub-head">{props.matchdetails.league.round}</h6>
           <img className="league-logo" src={props.matchdetails.league.logo} alt="" />

             <div className ="sub-details column-full">

           <div className = "location column-thirds">

           <h5>{props.matchdetails.fixture.venue.city}</h5>

           <h5>{props.matchdetails.fixture.venue.name}</h5>

           </div>
 <div className="location column-thirds1">
    <h4>
      {formatDate(props.matchdetails.fixture.date)}
      </h4>
           </div>

           <div className= "location column-thirds">

            <h4>Referee:</h4>
           <h4>{props.matchdetails.fixture.referee}</h4>

 </div>
         </div>
</div>
</div>
     </div>

    </div>

  );

};
export default MatchDetails;
