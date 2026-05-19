CREATE TABLE fanfest_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date_label TEXT NOT NULL,
  location TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE fanfest_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "FanFest events are viewable by everyone"
  ON fanfest_events FOR SELECT
  USING (true);

INSERT INTO fanfest_events (title, description, date_label, location) VALUES
  ('FIFA Fan Festival', 'Música, pantallas gigantes y la mejor atmósfera mundialista.', '12 Jun - 13 Jul | 12:00 - 22:00 hrs', 'Parque de las Niñas y Niños');
