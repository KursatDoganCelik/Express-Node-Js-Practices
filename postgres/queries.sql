-- Changing table name
ALTER TABLE peoples RENAME TO users;

-- Changing column type
ALTER TABLE peoples ALTER COLUMN name TYPE VARCHAR(20); 

-- Adding new columns for users table
ALTER TABLE users ADD surname TEXT;

-- Dropping column from users table
ALTER TABLE users DROP COLUMN surname;

-- Deleting table
DROP TABLE world_food;

-- Updating color to pink which is 'id = 4' user
UPDATE users SET color = 'pink' WHERE id = 4;

-- Deleting rows from 'users' table 
DELETE FROM users WHERE id = 1 AND color = 'blue';

-- Getting the table ASCending order to 'color'
SELECT * FROM users ORDER BY color ASC;
