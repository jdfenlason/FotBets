import React from 'react';
import MatchDetails from './match-details';
import TodayFixtures from './today-fixtures';
import Fixture from './fixture';
import TeamDetails from './team-details';

const FixtureList = props => {
  return !props.teamDetails.length
    ? (
    <>
      <TodayFixtures />
      {props.fixtures.map(fixtures => {
        return (
          <div
            key={fixtures.fixture.id}
            id={fixtures.fixture.id}
            onClick={event => {
              props.click(fixtures.fixture.id);
            }}
          >
            <Fixture
              fixtures={fixtures}
              toggleMatchDetails={props.toggleMatchDetails}
               onClick={event => {
                 props.click(fixtures.fixture.id);
               }}
            />
          </div>
        );
      })}
    </>
      )
    : (
    <>
      <TodayFixtures />
      {props.fixtures.map(fixtures => {
        return (
          <div
            key={fixtures.fixture.id}
            id={fixtures.fixture.id}
            onClick={event => {
              props.click(fixtures.fixture.id);
            }}
          >
            <Fixture fixtures={fixtures} />
            <MatchDetails fixtures={fixtures} activeId={props.activeId} matchesBetOn = {props.matchesBetOn}/>
            <TeamDetails
              fixtures={fixtures}
              activeId={props.activeId}
              teamDetails={props.teamDetails}
              loading={props.loading}
              homeOdds={props.homeOdds}
              awayOdds={props.awayOdds}
              betOn={props.betOn}
              betId={props.betId}
              addWagerTeam={props.addWagerTeam}
              matchesBetOn = {props.matchesBetOn}
            />
          </div>
        );
      })}
    </>
      );
};
export default FixtureList;
