CREATE OR REPLACE FUNCTION get_latest_president()
RETURNS TABLE (
    id bigint,
    first_name text,
    last_name text,
    linkedin text
) AS $$
BEGIN
    RETURN QUERY (
        SELECT
            p.id,
            p.first_name,
            p.last_name,
            p.linkedin
        FROM
            people p
        WHERE
            p.id = (get_president_id())
    );
END;
$$ LANGUAGE plpgsql;
