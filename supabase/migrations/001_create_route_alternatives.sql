CREATE TABLE route_alternatives (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  line_name TEXT NOT NULL,
  total_time_minutes INTEGER NOT NULL,
  departure_offset_minutes INTEGER NOT NULL,
  route_type TEXT NOT NULL CHECK (route_type IN ('bus', 'train')),
  is_fastest BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'on_time' CHECK (status IN ('on_time', 'delayed')),
  delay_minutes INTEGER,
  walk_time_minutes INTEGER DEFAULT 3,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE route_alternatives ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Route alternatives are viewable by everyone"
  ON route_alternatives FOR SELECT
  USING (true);

INSERT INTO route_alternatives (line_name, total_time_minutes, departure_offset_minutes, route_type, is_fastest, status, delay_minutes, walk_time_minutes) VALUES
  ('C121', 32, 5, 'bus', true, 'on_time', NULL, 3),
  ('T01', 28, 8, 'train', false, 'on_time', NULL, 3),
  ('C110 + L3', 45, 3, 'bus', false, 'delayed', 7, 4);
