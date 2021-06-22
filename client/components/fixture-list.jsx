import React, { Fragment } from 'react';
import FixtureDetails from './fixture-details';
import Fixture from './fixture';
import WagerDetails from './wager-details';
import SubmitWager from './submit-wager';
import { useMediaQuery } from 'react-responsive';
const FixtureList = props => {
  const isNotMobile = useMediaQuery({ minWidth: 900 });
  const {
    today,
    handleId,
    checkProfit,
    script,
    handleChange,
    setOdds,
    teamLogo,
    wagerAmount,
    userTokens,
    handleSubmit,
    betTeamId,
    activeId,
    teamDetails,
    loading,
    homeOdds,
    awayOdds,
    betOn,
    betId,
    addWagerTeam,
    matchesBetOn,
    fixtures
  } = props;
  if (!teamDetails.length) {
    return (
      <>
        {fixtures.map(fixtures => {
          const { id } = fixtures.fixture;
          return (
            <div
              key={id}

              onClick={() => {
                handleId(event);
              }}
            >
              <Fixture
                onClick={() => {
                  handleId(event);
                }}
                fixtures={fixtures}
              />
            </div>
          );
        })}
      </>
    );
  }
  if (teamDetails.length && !isNotMobile) {
    return (
      <>
        {fixtures.map(fixtures => {
          const { id } = fixtures.fixture;
          return (
            <div
              key={id}
            >
              <div onClick={() => {
                handleId(event);
              }} >
              <Fixture fixtures={fixtures} onClick={() => {
                handleId(event);
              }}/>
              </div>
              <FixtureDetails
                fixtures={fixtures}
                activeId={activeId}
                matchesBetOn={matchesBetOn}
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
                betTeamId={betTeamId}
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
                fixtures={fixtures}
                today ={today}
                />
            </div>
          );
        })}
      </>
    );
  }
  if (isNotMobile) {
    return (
      <>
        <div className={activeId ? 'columns-count' : ''}>
          <div className={activeId ? ' block' : ''}>
            {fixtures.map(fixtures => {
              const { id } = fixtures.fixture;
              return (
                <div
                  key={id}
                  onClick={() => {
                    handleId(event);
                  }}
                >
                  <Fixture
                    fixtures={fixtures}
                  />
                </div>
              );
            })}
          </div>
          <div className="block">
            {fixtures.map(fixtures => {
              const { id } = fixtures.fixture;
              return (
                <div key={id} id={id} >
                  <FixtureDetails
                    fixtures={fixtures}
                    activeId={activeId}
                    matchesBetOn={matchesBetOn}
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
                    betTeamId={betTeamId}
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
                    fixtures={fixtures}
                    today= {today}
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
