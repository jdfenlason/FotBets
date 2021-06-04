import React from 'react';
import MatchDetails from './match-details';
import TodayFixtures from './today-fixtures';
import Fixture from './fixture';
import TeamDetails from './team-details';
// import OddsHandler from './odds-handler';
import BetSlip from './bet-slip';

const FixtureList = props => {
  return (
    (!props.teamDetails.length)
      ? <>
  <TodayFixtures />
    {props.fixtures.map(fixtures => {
      return (
        <div key={fixtures.fixture.id} id={fixtures.fixture.id} onClick={event => { props.click(fixtures.fixture.id); }} >
    <Fixture fixtures={fixtures} toggleMatchDetails={props.toggleMatchDetails}/>
    <MatchDetails fixtures={fixtures } toggleMatchDetails={props.toggleMatchDetails} onClick={event => { props.click(fixtures.fixture.id); }} activeId={props.activeId} />

  <BetSlip id= {fixtures.fixture.id} fixtures ={fixtures} activeId={props.activeId} wagerAmount={props.wagerAmount} homeOdds={props.homeOdds} awayOdds = {props.awayOdds} userTokens = {props.userTokens} betOn = {props.betOn} handleChange = {props.handleChange} betId = {props.betId}
    addWagerTeam = {props.addWagerTeam} />
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

    <BetSlip id= {fixtures.fixture.id} fixtures ={fixtures} activeId={props.activeId} wagerAmount={props.wagerAmount} homeOdds={props.homeOdds} awayOdds = {props.awayOdds} betOn = {props.betOn} betId = {props.betTeamId}
    addWagerTeam = {props.addWagerTeam} />
      </div>
      );
    })}
    </>
  );

};
export default FixtureList;
