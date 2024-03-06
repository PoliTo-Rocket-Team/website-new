create or replace function get_open_positions()
returns table(
  name text,
  description text,
  required text[],
  desirable text[],
  form text,
  division text,
  subteam text,
  code text
)
language sql
as $$
  select 
    r.name, 
    r.description, 
    r.required, 
    r.desirable, 
    r.form, 
    d.name as division, 
    s.name as subteam, 
    (s.code || '-' ||   d.code || '-' || lpad(r.number::text, 3, '0')) as code   
  from (
    select p.name, p.description, p.required, p.desirable, p.form, p.number, p.division
    from positions as p
    where p.open and p.form is not null
  ) as r
  inner join divisions as d on r.division = d.id
  inner join subteams as s on d.subteam = s.id
  order by s.id, d.name, r.number  
$$;