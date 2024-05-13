CREATE TYPE division_info AS (
  id int,
  code text,
  name text,
  acting boolean
);
CREATE TYPE subteam_info AS (
  id int,
  code text,
  name text,
  title text
);
CREATE TYPE chief_info AS (
  first_name text,
  last_name text,
  linkedin text,
  id4pp int,
  title text
);
CREATE TYPE coordinator_info AS (
  first_name text,
  last_name text,
  linkedin text,
  id4pp int
  
);
CREATE TYPE lead_info AS (
  first_name text,
  last_name text,
  linkedin text,
  id4pp int,
  acting boolean,
  division text

);