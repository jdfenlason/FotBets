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

create table "users" (
  "userId"           serial,
  "userName"         text    not null,
  "hashedPassword"   text    not null,
  "tokenAmount"   integer   not null,
  "createdAt"   timestamptz(6) not null default now(),
  "updatedAt"   timestamptz(6) not null default now(),
  primary key ("userId"),
  unique ("userName")
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

create table "weekOdds" (
  "date" text not null,
  "oddsDetails" json not null
);

create table "wagerInputs" (
  "betId" serial,
  "userId"  int not null,
  "fixtureId" int not null,
  "wagerAmount" int not null,
  "profitAmount" int not null,
  "betTeamId" int not null,
  "teamLogo" text not null,
  "betResult" text not null,
  "date" text not null,
  "createdAt" timestamptz(6) not null default now(),
  primary Key ("betId")
);

create table "pastResults" (
  "date" text not null,
  "leagueId" int not null,
  "yesterdayGames" json
)
