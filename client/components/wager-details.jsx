import React from 'react';
import Loading from './loading';
import TeamResults from './team-results';
import { teamResultsFormat } from '../lib';
import { isToday, isPast, parseISO } from 'date-fns';
import { useMediaQuery } from 'react-responsive';

const WagerDetails = props => {
  const adjustTitle = useMediaQuery({ maxWidth: 510 });
  const { activeId, homeOdds, awayOdds, matchesBetOn, addWagerTeam, betTeamId, selectedDay } = props;
  const { id } = props.fixtures.fixture;
  const { home, away } = props.fixtures.teams;
  const checkBet = matchesBetOn.includes(id);
  const homeImageArray = teamResultsFormat(props.teamDetails[0].form);
  const awayImageArray = teamResultsFormat(props.teamDetails[1].form);
  const isInPast = isPast(parseISO(selectedDay));
  const isNotToday = !isToday(parseISO(selectedDay));
  let checkDay;
  if (isInPast && isNotToday) {
    checkDay = true;
  }
  return props.loading
    ? (
    <Loading/>
      )
    : (
    <>
      <div className={activeId === id ? '' : 'hidden'} >
        <div className="row column-full center fixture-card">
          <div className="outer-card column-full">
            <div className="match-card row center">
              <h2 className = "lg">Wager Details</h2>

              <h3 className = {!checkDay ? 'lg' : 'hidden'}>Pick a Team:</h3>
              <div className="row column-full">
                <div className={adjustTitle ? 'location column-half margin-bottom flex-end' : 'location column-half margin-bottom'}>
                  <h4 className ="head lg">{home.name}</h4>

                  <div className={!checkBet || checkDay ? 'logo-button' : ''}>
                    <div className = {betTeamId === home.id.toString() && !checkDay ? 'active logo-button' : ''}>

                    <img
                      className="small-logo"
                      onClick={() => addWagerTeam(event, homeOdds, activeId)}
                      id={home.id}
                      src={home.logo}
                      alt={home.name}
                      />
                      </div>
                  </div>
                  <h3 className = "head lg">Past Results:</h3>
                  <TeamResults teamForm = {homeImageArray}/>
                  <h3 className = "head lg">Odds:</h3>
                  <h4 className="sub-head">{homeOdds}</h4>
                </div>
                <div className={adjustTitle ? 'location column-half margin-bottom flex-end' : 'location column-half margin-bottom'}>
                  <h4 className = "head lg">{away.name}</h4>
                  <div className={!checkBet ? 'logo-button' : ''}>
                        <div className = {betTeamId === away.id.toString() && !checkDay ? 'active logo-button' : ''}>

                    <img
                      onClick={() => addWagerTeam(event, awayOdds, activeId)}
                      id={away.id}
                      className="small-logo"
                      src={away.logo}
                      alt={away.name}
                      />
                      </div>
                  </div>
                  <h3 className ="head lg">Past Results:</h3>
                  <TeamResults teamForm = {awayImageArray}

                  />
                  <h3 className = "head lg">Odds:</h3>
                  <h4 className="sub-head">{awayOdds}</h4>
                </div>
              </div>
              <h2 className={!checkBet ? 'none' : 'text-center'}>
                You have an active wager for this fixture
              </h2>
            </div>
          </div>
        </div>
      </div>
      </>
      );
};
export default WagerDetails;
