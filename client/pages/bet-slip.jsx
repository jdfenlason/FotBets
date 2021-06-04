import React from 'react';

const BetSlip = props => {

  return (
      <>
             <div className="row column-full">
        <div className="location column-thirds margin-bottom">
          <img className="small-logo" id={props.fixtures.teams.home.id} src={props.fixtures.teams.home.logo} alt={props.fixtures.teams.home.name} />
         <h4>{props.fixtures.teams.home.name}</h4>
             <h5>Odds:</h5>
              <h4></h4>
        </div>
 <div className="location column-thirds margin-bottom">
                <img id= {props.fixtures.teams.away.id}className="small-logo"src={props.fixtures.teams.away.logo} alt={props.fixtures.teams.away.name}/>
               <h4>{props.fixtures.teams.away.name}</h4>
                 <h5>Decimal Odds:</h5>
               <h4></h4>
             </div>
 </div>
 </>
  );
};
export default BetSlip;
