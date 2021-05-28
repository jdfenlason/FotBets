import React from 'react';
import formatDate from './format-date';
import formatTime from './format-time';
export default function MatchDetails(props) {
  return (
     <>
            {props.matchdetails.map(matchDetails =>
      <div className ="row center" key= {matchDetails.fixture.id}>
          <div className = "outer-card column-full">
              <div className="match-details column-full center">

               <h2>Match Details</h2>
            <h5 className="sub-head">{matchDetails.league.name}</h5>
          <h6 className="sub-head">{matchDetails.league.round}</h6>
          <img className="league-logo" src={matchDetails.league.logo} alt="" />
            <div className ="sub-details column-thirds">

          <div className = "location">
          <h6>{matchDetails.fixture.venue.city}</h6>
          <h6>{matchDetails.fixture.venue.name}</h6>

          </div>
<div className="location">
  <h6>
    {formatTime(matchDetails.fixture.timestamp)}
    </h6>
   <h6>
     {formatDate(matchDetails.fixture.date)}
     </h6>
          </div>

          <div className= "location">
         <span>
           <h6>Referee:</h6>
          <h6>{matchDetails.fixture.referee}</h6>
           </span>
</div>
        </div>

            </div>

          </div>
        </div>

            )}
        </>
  );

}
