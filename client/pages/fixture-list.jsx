import React from 'react';
import FixtureDetails from './fixture-details';
import Fixture from './fixture';
import WagerDetails from './wager-details';

const FixtureList = props => {
  return !props.teamDetails.length
    ? (
    <>
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
            <FixtureDetails fixtures={fixtures} activeId={props.activeId} matchesBetOn = {props.matchesBetOn}/>
            <WagerDetails
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
