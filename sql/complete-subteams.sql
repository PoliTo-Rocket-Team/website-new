

create or replace function get_complete_subteams()
returns table (
  name text,
  code text,
  chief chief_info,
  coordinator1 coordinator_info,
  coordinator2 coordinator_info,
  leads lead_info[]
)
language sql
stable
as $$
  with st as (
    select subteams.*
    from subteams
    where subteams.end is null
  )
  select 
    st.name, 
    st.code, 
    (
       p1.first_name,
       p1.last_name,
       p1.linkedin,
       case when p1.has_pp then p1.id else null end,
       st.title_name
    )::chief_info as chief,
    case 
      when p2 is null
      then null
      else row(
         p2.first_name,
         p2.last_name,
         p2.linkedin,
         case when p2.has_pp then p2.id else null end
      )::coordinator_info
    end as coordinator1,
    case 
      when p3 is null
      then null
      else row(
         p3.first_name,
         p3.last_name,
         p3.linkedin,
       case when p3.has_pp then p3.id else null end
      )::coordinator_info
    end as coordinator2,
    leads.col as leads
  from st
  cross join lateral (
    select array (
      select a::lead_info
      from (
        select 
          people.first_name, 
          people.last_name, 
          people.linkedin, 
          (case when people.has_pp then people.id else null end) as "id4pp",
          div.lead_acting as acting, 
          div.name as division
        from (
          select divisions.*
          from divisions
          where (divisions.subteam = st.id) and (divisions.end is null)
        ) as div
        inner join people on people.id = div.lead
        order by div.name
      ) as a
    ) as col
  ) as leads
  inner join people as p1 on p1.id = st.chief
  left join people as p2 on p2.id = st.coordinator1
  left join people as p3 on p3.id = st.coordinator2
  order by st.id desc
$$;