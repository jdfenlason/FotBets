set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

create table "weekGames" (
    "leagueId" int  not null,
    "firstDay" date not null,
    "fixtures"    json not null
);

create table "teamForm" (
  "date" date not null,
  "leagueId" int not null,
  "fixtureId" int not null,
  "homeId" int not null,
  "homeOdds" numeric not null,
  "awayId" int not null,
  "awayOdds" numeric not null,
  "teamDetails" json
);

create table "users" (
  "userId"           serial,
  "userName"         text    not null,
  "hashedPassword"   text    not null,
  "tokenAmount"   int   not null,
  "createdAt"   timestamptz(6) not null default now(),
  "updatedAt"   timestamptz(6) not null default now(),
  primary key ("userId"),
  unique ("userName")
);


create table "wagerInputs" (
  "betId" serial,
  "userId"  int not null,
  "fixtureId" int not null,
  "wagerAmount" int not null,
  "profitAmount" int not null,
  "betTeamId" int not null,
  "teamLogo" text not null,
  "betResult" boolean not null,
  "date" text not null,
  "createdAt" timestamptz(6) not null default now(),
  "betEvaluated" boolean not null,
  primary Key ("betId")
);

create table "pastResults" (
  "date" text not null,
  "leagueId" int not null,
  "yesterdayGames" json
);

create table "betValidation" (
  "date" text not null,
  "leagueId" int not null,
  "fixtureId" int not null,
  "betResult" boolean not null,
  "winningTeamId" int not null
)
