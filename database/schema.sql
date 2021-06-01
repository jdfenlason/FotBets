set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

create table "weekGames" (
    "leagueId" int  not null,
    "firstDay" date not null,
    "fixtures"    json
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
  "matchDetails" json
);
