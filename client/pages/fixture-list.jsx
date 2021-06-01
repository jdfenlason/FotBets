import React from 'react';
import MatchDetails from './match-details';
import TodayFixtures from './today-fixtures';
import Fixtures from './fixtures';
import MatchForm from './match-form';

const FixtureList = props => {

  return (
    <>
        <TodayFixtures />
    {props.fixtures.map((fixtures, event) => {
      return (
        <div key={fixtures.fixture.id} onClick={() => (fixtures.fixture.id)} id={fixtures.fixture.id}>
    <Fixtures fixtures={fixtures}/>
    <MatchDetails fixtures={fixtures } />
    <MatchForm matchForm = {props.matchForm}/>
      </div>
      );

    })}
    </>
  );
};
export default FixtureList;
