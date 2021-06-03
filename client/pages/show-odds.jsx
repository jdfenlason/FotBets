import React from 'react';

const ShowOdds = props => {

  return (
    (!props.showOdds.length)
      ? <>
       <div className= {props.toggleMatchDetails && props.activeId === props.fixtures.fixture.id ? '' : 'hidden'}>
         <div className="row column-full center fixture-card">
         <div className="outer-card column-full">
           <div className="match-card row center">
             <h3>Odds Table:</h3>
             <div className="row column-full">
        <div className="location column-thirds margin-bottom">
          <img className="small-logo"src={props.fixtures.teams.home.logo} alt={props.fixtures.teams.home.name} />
         <h4>{props.fixtures.teams.home.name}</h4>
             <h5>Odds:</h5>
              <h4>{3.25}</h4>
        </div>
 <div className="location column-thirds margin-bottom">
                <img className="small-logo"src={props.fixtures.teams.away.logo} alt={props.fixtures.teams.away.name} />
               <h4>{props.fixtures.teams.away.name}</h4>
                 <h5>Odds:</h5>
               <h4>{3.25}</h4>
             </div>
 </div>

     </div>
 </div>
 </div>
</div>
</>

      : <>
     <div className= {props.toggleMatchDetails && props.activeId === props.fixtures.fixture.id ? '' : 'hidden'}>
         <div className="row column-full center fixture-card">
         <div className="outer-card column-full">
           <div className="match-card row center">
             <h3>Odds Table:</h3>
             <div className="row column-full">
        <div className="location column-thirds margin-bottom">
          <img className="small-logo"src={props.fixtures.teams.home.logo} alt={props.fixtures.teams.home.name} />
         <h4>{props.fixtures.teams.home.name}</h4>
             <h5>Odds:</h5>
              <h4>{3.25}</h4>
        </div>
 <div className="location column-thirds margin-bottom">
                <img className="small-logo"src={props.fixtures.teams.away.logo} alt={props.fixtures.teams.away.name} />
               <h4>{props.fixtures.teams.away.name}</h4>
                 <h5>Odds:</h5>
               <h4>{3.25}</h4>
             </div>
 </div>

     </div>
 </div>
 </div>
</div>
 </>
  );
};
export default ShowOdds;
