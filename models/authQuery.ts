export const fetchUserQuery = `
  SELECT 
    u.name,
    u.email,
    u.provider_id,
    u.battery,
    u.battery_capacity,
    u.phone,
    p.name AS provider_name,
    u.password
  FROM 
    users AS u
  JOIN 
    providers AS p 
  ON 
    p.provider_id = u.provider_id
  WHERE 
    u.email = $1
`;

export const registerUserQuery = ` INSERT INTO users (
    name,
    email,
    provider_id,
    battery,
    battery_capacity,
    phone,
    password
  ) VALUES ($1, $2, $3, $4, $5, $6, $7)
  RETURNING *;`;

  export const fetchProvidersQuery = "SELECT * FROM providers;";
