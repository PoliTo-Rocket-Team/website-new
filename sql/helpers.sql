create or replace function get_president_id()
returns int8
language sql
stable
as $$
  select presidents.person from presidents order by mandate_start desc limit 1
$$;



create or replace function get_person_id_from_user(_user uuid)
returns bigint
language sql
as $$
select people.id from people where people.user = $1
$$;



create or replace function is_it_related(_user uuid)
returns boolean
language plpgsql
stable
as $$
declare
  person constant int8 := get_person_id_from_user($1);
  it_lead constant int8 := (select divisions.lead from divisions where divisions.id = 1); -- ITC lead
  coo constant int8 := (select subteams.chief from subteams where subteams.id = 1); -- OPS chief
begin
  return (person = it_lead or person = coo or person = get_president_id());
end $$;



create or replace function is_media_related(_user uuid)
returns boolean
language plpgsql
stable
as $$
declare
  person constant int8 := get_person_id_from_user($1);
  media_lead constant int8 := (select divisions.lead from divisions where divisions.id = 4); -- media lead
  coo constant int8 := (select subteams.chief from subteams where subteams.id = 1); -- OPS chief
begin
  return (person = media_lead or person = coo or person = get_president_id());
end $$;



create or replace function is_developer(email text)
returns boolean
language plpgsql
immutable
as $$
begin
  return (($1 like '%@politorocketteam.it') and (($1 like 'it+%') or ($1 like 'it@%'))); 
end
$$;