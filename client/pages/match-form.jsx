import React from 'react';

const MatchForm = props => {

  return (
<>
        <div className="row column-full center fixture-card">
        <div className="outer-card column-full">
          <div className="match-card row center">
            <h3>Team Facts</h3>
            <div className="row column-full">
       <div className="location column-half margin-bottom">

        <h4>Home Form</h4>
      {props.matchForm[0].form}
       </div>
<div className="location column-half margin-bottom">
              <h4>Away Form</h4>
              <span>{props.matchForm[1].form}</span>
            </div>
</div>

    </div>
</div>
</div>
</>
  );
};

export default MatchForm;
