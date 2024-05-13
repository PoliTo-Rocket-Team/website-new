
create or replace function get_person_data(user_uuid uuid)
returns table (
  id int8,
  first_name text,
  last_name text,
  linkedin text,
  has_pp boolean,
  is_president boolean,
  lead_of division_info[],
  chief_of subteam_info
)
language sql
stable
as $$
  select 
    p.id,
    p.first_name,
    p.last_name,
    p.linkedin,
    p.has_pp,
    (p.id = get_president_id()) as is_president,
    divs.col as lead_of, 
    chiefing::subteam_info as chief_of
  from (
      select *
      from people
      where people.user = $1
    ) as p,
    lateral (
      select array (
        select a::division_info
        from (
          select divisions.id, divisions.code, divisions.name, divisions.lead_acting as acting
          from divisions
          where divisions.lead = p.id
        ) as a
      ) as col
    ) as divs
  left join lateral (
    select 
      subteams.id, subteams.code, subteams.name,
      case 
        when p.id = subteams.chief 
        then subteams.title_name 
        else 'Coordinator (' || subteams.code || ')'
      end as title
    from subteams
    where (p.id = subteams.chief) or (p.id = subteams.coordinator1) or (p.id = subteams.coordinator2)
  ) as chiefing on true
$$;