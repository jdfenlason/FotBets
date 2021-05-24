set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

create table "public"."fixtures" (
  "matchId"         serial,
  "fixtureId"       integer      not null,
  "fixtureRef"      text         not null,
  "fixtureDate"     text         not null,
  "fixtureTime"     integer      not null,
  "fixtureVenue"    text         not null,
  "fixtureStatus"   text         not null,
  "leagueId"        text         not null,
  "leagueName"      text         not null,
  "teamsHomeId"     integer      not null,
  "teamsAwayId"     integer      not null,
  "teamsHomeName"   text         not null,
  "teamsAwayName"   text         not null,
  "teamsHomeLogo"   text         not null,
  "teamsAwayLogo"   text         not null,
  "teamsHomeWinner" boolean      not null,
  "teamsAwayWinner" boolean      not null,
  "createdAt"       timestamptz(6) not null default now(),
  "updatedAt"       timestamptz(6) not null default now(),
  primary key ("matchId")
);

create table "public"."users" (
  "userId"           serial,
  "username"         text    not null,
  "hashedPassword"   text    not null,
  "name"             text    not null,
  "tokenAmount"   integer   not null,
  "createdAt"   timestamptz(6) not null default now(),
  "updatedAt"   timestamptz(6) not null default now(),
  primary key ("userId"),
  unique ("username")
);
