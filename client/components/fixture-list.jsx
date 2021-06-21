import React, { Fragment } from 'react';
import FixtureDetails from './fixture-details';
import Fixture from './fixture';
import WagerDetails from './wager-details';
import SubmitWager from './submit-wager';
import { useMediaQuery } from 'react-responsive';
const FixtureList = props => {
  const isDesktop = useMediaQuery({ minWidth: 1224 });
  const { checkProfit, script, handleChange, setOdds, teamLogo, wagerAmount, userTokens, handleSubmit, betTeamId, toggleMatchDetails, activeId, teamDetails, loading, homeOdds, awayOdds, betOn, betId, addWagerTeam, matchesBetOn, fixtures } = props;
  if (!teamDetails.length) {
    return (
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
    );
  }
  if (teamDetails.length && !isDesktop) {
    return (
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
            <Fixture fixtures={fixtures} toggleMatchDetails = {toggleMatchDetails} />
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
              betTeamId = {betTeamId}
            />
              <SubmitWager
          checkProfit={checkProfit}
          script={script}
          handleChange={handleChange}
          setOdds={setOdds}
          teamLogo={teamLogo}
          betTeamId={betTeamId}
          activeId={activeId}
          matchesBetOn={matchesBetOn}
          wagerAmount={wagerAmount}
          userTokens={userTokens}
          handleSubmit={handleSubmit}
          fixtures = {fixtures}
        />
          </div>
        );
      })}
    </>
    );
  }
  if (isDesktop) {
    return (
    <>

<div className = "columns-count">

    <div className =
  " block">
      {fixtures.map(fixtures => {
        const { id } = fixtures.fixture;
        return (
          <div
          key={id}
          id={id}
          onClick={event => {
            props.click(id);
          }}>
            <Fixture fixtures={fixtures} toggleMatchDetails = {toggleMatchDetails}/>
          </div>
        );
      })}
      </div>
<div className="block">
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
              betTeamId = {betTeamId}
              />
              <SubmitWager
          checkProfit={checkProfit}
          script={script}
          handleChange={handleChange}
          setOdds={setOdds}
          teamLogo={teamLogo}
          betTeamId={betTeamId}
          activeId={activeId}
          matchesBetOn={matchesBetOn}
          wagerAmount={wagerAmount}
          userTokens={userTokens}
          handleSubmit={handleSubmit}
          fixtures = {fixtures}
          />
          </div>
   );
 })}
</div>
  </div>
 </>
    );

  }

};
export default FixtureList;
