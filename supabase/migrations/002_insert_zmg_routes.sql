INSERT INTO route_alternatives (line_name, total_time_minutes, departure_offset_minutes, route_type, is_fastest, status, delay_minutes, walk_time_minutes) VALUES
  ('C01 Centro', 35, 4, 'bus', false, 'on_time', NULL, 5),
  ('Z01 Zapopan', 25, 3, 'bus', true, 'on_time', NULL, 3),
  ('T01 Tlaquepaque', 40, 7, 'bus', false, 'on_time', NULL, 4),
  ('TL01 Tonalá', 50, 10, 'bus', false, 'on_time', NULL, 6),
  ('A01 Andares', 20, 2, 'bus', false, 'on_time', NULL, 2),
  ('U01 Universidad', 30, 5, 'train', false, 'on_time', NULL, 4),
  ('P01 Agua Azul', 35, 6, 'bus', false, 'on_time', NULL, 3),
  ('AP01 Aeropuerto', 55, 15, 'bus', false, 'delayed', 8, 5),
  ('S01 Plaza del Sol', 30, 4, 'bus', false, 'on_time', NULL, 3),
  ('J01 Jalisco', 32, 6, 'bus', false, 'on_time', NULL, 4),
  ('N01 Periférico', 28, 5, 'bus', false, 'on_time', NULL, 3);
