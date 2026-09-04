SELECT 
    U.id,
    U.email,
    U.username,
    U.name,
    R.name AS role,
    U.description,
    COUNT(DISTINCT UG.game_id) AS game_count,
    COUNT(DISTINCT GM.group_id) AS group_count,
    COUNT(DISTINCT EP.event_id) AS events_count
FROM users U
JOIN roles R
    ON U.role_id = R.id
LEFT JOIN user_games UG
    ON U.id = UG.user_id
LEFT JOIN group_members GM
    ON U.id = GM.user_id
LEFT JOIN event_players EP
    ON U.id = EP.user_id 
WHERE U.id = 4
GROUP BY
    U.id,
    U.email,
    U.username,
    U.name,
    R.name;