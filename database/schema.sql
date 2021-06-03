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
  "username"         text    not null,
  "hashedPassword"   text    not null,
  "tokenAmount"   integer   not null,
  "createdAt"   timestamptz(6) not null default now(),
  "updatedAt"   timestamptz(6) not null default now(),
  primary key ("userId"),
  unique ("username")
);

create table "teamForm" (
  "date" date not null,
  "leagueId" int not null,
  "fixtureId" int not null,
  "homeId" int not null,
  "awayId" int not null,
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
  "createdAt" timestamptz(6) not null default now(),
  "fixtureId" int not null
  primary Key ("betId"),
)
