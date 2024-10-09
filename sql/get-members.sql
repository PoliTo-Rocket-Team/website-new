CREATE OR REPLACE FUNCTION get_members()
RETURNS TABLE(first_name text, last_name text, title_name text, linkedin text) AS $$
BEGIN
  RETURN QUERY SELECT members.first_name, members.last_name, members.title_name, members.linkedin FROM members;
END;
$$ LANGUAGE plpgsql;