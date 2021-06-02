import React from 'react';
import MatchDetails from './match-details';
import TodayFixtures from './today-fixtures';
import Fixtures from './fixtures';
import MatchForm from './match-form';
const FixtureList = props => {
  return (
    <>
        <TodayFixtures />

    {props.fixtures.map(fixtures => {
      return (
        <div key={fixtures.fixture.id} id={fixtures.fixture.id} onClick={event => { props.click(fixtures.fixture.id); }} >
    <Fixtures fixtures={fixtures}/>
    <MatchDetails fixtures={fixtures } toggleMatchDetails={props.toggleMatchDetails} activeId={props.activeId} />
    <MatchForm toggleMatchDetails={props.toggleMatchDetails} activeId={props.activeId} matchForm ={props.matchForm} homeid={fixtures.teams.home.id} fixtures= {fixtures} loading= {props.loading}/>

      </div>
      );
    })}
    </>
  );
};
export default FixtureList;
