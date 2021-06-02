import React from 'react';
const MatchForm = props => {

  return (
    (!props.loading)
      ? <p className = 'hidden'>Loading</p>
      : <>
       <div className={props.toggleMatchDetails && props.activeId === props.fixtures.fixture.id ? '' : 'hidden'} id={props.fixtures.fixture.id} >
         <div className="row column-full center fixture-card">
         <div className="outer-card column-full">
           <div className="match-card row center">
             <h3>Team Facts</h3>
             <div className="row column-full">
        <div className="location column-half margin-bottom">

         <h4>{props.matchForm[0].matchDetails[0].team.name}</h4>
              <h4>{props.matchForm[0].matchDetails[0].form} </h4>
        </div>
 <div className="location column-half margin-bottom">
               <h4>{props.matchForm[0].matchDetails[1].team.name}</h4>
               <span>{props.matchForm[0].matchDetails[1].form}</span>
             </div>
 </div>

     </div>
 </div>
 </div>
</div>
 </>

  );
};
export default MatchForm;
