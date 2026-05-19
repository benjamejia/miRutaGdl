CREATE TABLE matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_a_label TEXT NOT NULL,
  team_b_label TEXT NOT NULL,
  title TEXT NOT NULL,
  stadium TEXT NOT NULL,
  time_label TEXT NOT NULL,
  is_live BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE matches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Matches are viewable by everyone"
  ON matches FOR SELECT
  USING (true);

INSERT INTO matches (team_a_label, team_b_label, title, stadium, time_label, is_live) VALUES
  ('🇲🇽', '🇿🇦', 'México vs Sudáfrica', 'Estadio Akron', '18:00 hrs | 14 Junio', false),
  ('🇦🇷', '🇧🇷', 'Argentina vs Brasil', 'Estadio Akron', '15:00 hrs | 18 Junio', false),
  ('🇩🇪', '🇫🇷', 'Alemania vs Francia', 'Estadio Akron', '20:00 hrs | 21 Junio', true);
