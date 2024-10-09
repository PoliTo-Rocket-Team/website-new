CREATE OR REPLACE FUNCTION get_latest_president()
RETURNS TABLE (
    first_name text,
    last_name text,
    linkedin text,
    id4pp bigint
) AS $$
declare
    president_id constant int8 := get_president_id();
BEGIN
    RETURN QUERY (
        SELECT
            p.first_name,
            p.last_name,
            p.linkedin,
            case when p.has_pp then p.id else null end as id4pp
        FROM
            people p
        WHERE
            p.id = president_id
    );
END;
$$ LANGUAGE plpgsql;