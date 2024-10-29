create or replace function get_subteam_of(_user uuid)
returns int4
language sql
stable
as $$
  select subteams.id
  from subteams
  where subteams.chief = (
    select people.id
    from people
    where people.user = $1
    limit 1
  )
  limit 1
$$;



create or replace function get_division_of(_user uuid)
returns setof int4
language sql
stable
as $$
  select divisions.id
  from divisions
  where divisions.lead = (
    select people.id
    from people
    where people.user = $1
    limit 1
  )
$$;



create or replace function get_all_divisions_of(_user uuid)
returns setof int4
language plpgsql
stable
as $$
declare 
  person constant int8 := get_person_id_from_user($1);
begin
  return query
  with _st as (
    select subteams.id 
    from subteams
    where (subteams.chief = person) or (subteams.coordinator1 = person) or (subteams.coordinator2 = person)
  )
  select divisions.id
  from divisions
  where (
    divisions.lead = person
    or
    divisions.subteam in (select _st.id from _st)
  );
end $$;