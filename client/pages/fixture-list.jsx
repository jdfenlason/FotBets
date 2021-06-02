import React from 'react';
import MatchDetails from './match-details';
import TodayFixtures from './today-fixtures';
import Fixture from './fixture';
import TeamDetails from './team-details';
const FixtureList = props => {
  return (
    (!props.teamDetails.length)
      ? <>
  <TodayFixtures />
    {props.fixtures.map(fixtures => {
      return (
        <div key={fixtures.fixture.id} id={fixtures.fixture.id} onClick={event => { props.click(fixtures.fixture.id); }} >
    <Fixture fixtures={fixtures}/>
    <MatchDetails fixtures={fixtures } toggleMatchDetails={props.toggleMatchDetails} activeId={props.activeId} />
    </div>
      );

    })}
    </>
      : <>
        <TodayFixtures />

    {props.fixtures.map(fixtures => {
      return (
        <div key={fixtures.fixture.id} id={fixtures.fixture.id} onClick={event => { props.click(fixtures.fixture.id); }} >
    <Fixture fixtures={fixtures}/>
    <MatchDetails fixtures={fixtures} toggleMatchDetails={props.toggleMatchDetails} activeId={props.activeId} />
    <TeamDetails toggleMatchDetails={props.toggleMatchDetails} fixtures={fixtures } activeId={props.activeId} teamDetails ={props.teamDetails} loading= {props.loading}/>
      </div>
      );
    })}
    </>
  );

};
export default FixtureList;
