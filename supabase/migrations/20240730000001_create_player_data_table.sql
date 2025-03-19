-- Create player_data table if it doesn't exist
CREATE TABLE IF NOT EXISTS player_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_name TEXT NOT NULL,
  position TEXT NOT NULL,
  age INTEGER,
  height TEXT,
  weight TEXT,
  team TEXT,
  goals INTEGER DEFAULT 0,
  assists INTEGER DEFAULT 0,
  matches_played INTEGER DEFAULT 0,
  highlight_video_url TEXT,
  profile_image_url TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable realtime for the table
alter publication supabase_realtime add table player_data;

-- Insert sample data if the table is empty
INSERT INTO player_data (player_name, position, age, height, weight, team, goals, assists, matches_played, highlight_video_url, profile_image_url, bio)
SELECT 
  'Ronaldo Silva', 
  'Atacante', 
  25, 
  '1.85m', 
  '80kg', 
  'FC Barcelona', 
  120, 
  45, 
  200, 
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 
  'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80', 
  'Ronaldo Silva é um atacante brasileiro conhecido por sua velocidade e habilidade técnica. Começou sua carreira no Brasil antes de se transferir para a Europa.'
WHERE NOT EXISTS (SELECT 1 FROM player_data LIMIT 1);