import React from 'react';
export default function TeamResults(props) {

  const { teamForm } = props;
  return (
<span className="">
<img className="team-form"src={teamForm[0]} alt="" />
<img className = "team-form" src={teamForm[1]} alt="" />
<img className = "team-form" src={teamForm[2]} alt="" />
</span>
  );
}
