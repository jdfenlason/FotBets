import React from 'react';
import MatchDetails from './match-details';
import TodayFixtures from './today-fixtures';
import Fixture from './fixture';
import TeamDetails from './team-details';
import OddsHandler from './odds-handler';

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

   <OddsHandler id= {fixtures.fixture.id} fixtures={fixtures } activeId={props.activeId} wagerAmount={props.wagerAmount} homeOdds={props.homeOdds} awayOdds = {props.awayOdds} userTokens = {props.UserTokens} betOn = {props.betOn}/>
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

    <MatchDetails fixtures={fixtures} activeId={props.activeId} />

    <TeamDetails fixtures={fixtures } activeId={props.activeId} teamDetails ={props.teamDetails} loading= {props.loading}/>

    <OddsHandler id= {fixtures.fixture.id} fixtures ={fixtures} activeId={props.activeId} wagerAmount={props.wagerAmount} homeOdds={props.homeOdds} awayOdds = {props.awayOdds} userTokens = {props.UserTokens} betOn = {props.betOn} />
      </div>
      );
    })}
    </>
  );

};
export default FixtureList;
