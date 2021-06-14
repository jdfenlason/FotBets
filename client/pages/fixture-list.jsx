import React from 'react';
import FixtureDetails from './fixture-details';
import Fixture from './fixture';
import WagerDetails from './wager-details';

const FixtureList = props => {
  const { toggleMatchDetails, activeId, teamDetails, loading, homeOdds, awayOdds, betOn, betId, addWagerTeam, matchesBetOn, fixtures } = props;
  return !teamDetails.length
    ? (
    <>
      {fixtures.map(fixtures => {
        const { id } = fixtures.fixture;
        return (
          <div
            key={id}
            id={id}
            onClick={event => {
              props.click(id);
            }}
          >
            <Fixture
              fixtures={fixtures}
              toggleMatchDetails={toggleMatchDetails}
              onClick={event => {
                props.click(id);
              }}
            />
          </div>
        );
      })}
    </>
      )
    : (
    <>
      {fixtures.map(fixtures => {
        const { id } = fixtures.fixture;
        return (
          <div
            key={id}
            id={id}
            onClick={event => {
              props.click(id);
            }}
          >
            <Fixture fixtures={fixtures} />
            <FixtureDetails
              fixtures={fixtures}
              activeId={activeId}
              matchesBetOn={matchesBetOn}
              toggleMatchDetails={toggleMatchDetails}
            />
            <WagerDetails
              fixtures={fixtures}
              activeId={activeId}
              teamDetails={teamDetails}
              loading={loading}
              homeOdds={homeOdds}
              awayOdds={awayOdds}
              betOn={betOn}
              betId={betId}
              addWagerTeam={addWagerTeam}
              matchesBetOn={matchesBetOn}
              toggleMatchDetails={toggleMatchDetails}
            />
          </div>
        );
      })}
    </>
      );
};
export default FixtureList;
