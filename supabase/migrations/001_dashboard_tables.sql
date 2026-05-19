/*
╔══════════════════════════════════════════════════════════════════════════════╗
║  MiRutaGdl — City Control Center Dashboard                                 ║
║  Supabase Migration: Dashboard tables + seed data                          ║
║  Run:  supabase migration up                                              ║
║  Or:   paste into Supabase SQL Editor                                      ║
╚══════════════════════════════════════════════════════════════════════════════╝
*/

-- ─── 1. KPI Real-time snapshot (single-row) ─────────────────────────────────
create table if not exists dashboard_kpi (
  id            bigint primary key default 1,
  total_flow    integer   not null default 0,
  saturation    text      not null default 'Bajo',
  active_routes integer   not null default 0,
  updated_at    timestamptz not null default now(),
  constraint single_row check (id = 1)
);

-- ─── 2. Heatmap points (crowd / traffic weight) ─────────────────────────────
create table if not exists heatmap_points (
  id      bigint generated always as identity primary key,
  lng     double precision not null,
  lat     double precision not null,
  weight  real not null default 1,
  zone    text
);

-- Index for spatial queries
create index if not exists idx_heatmap_coords on heatmap_points (lng, lat);

-- ─── 3. Zone flow (volume per zone) ─────────────────────────────────────────
create table if not exists zone_flow (
  id    bigint generated always as identity primary key,
  label text    not null,
  value integer not null default 0
);

-- ─── 4. Transport mode split ────────────────────────────────────────────────
create table if not exists transport_mode (
  id         bigint generated always as identity primary key,
  name       text not null,
  percentage real not null,
  color      text not null
);

-- ─── 5. Enable Realtime for the KPI table ───────────────────────────────────
-- (Run this separately if the supabase_realtime publication doesn't exist)
-- alter publication supabase_realtime add table dashboard_kpi;

-- ═════════════════════════════════════════════════════════════════════════════
--  SEED DATA
-- ═════════════════════════════════════════════════════════════════════════════

-- KPI row (upsert)
insert into dashboard_kpi (id, total_flow, saturation, active_routes)
values (1, 24530, 'Moderado', 18)
on conflict (id) do update set
  total_flow    = excluded.total_flow,
  saturation    = excluded.saturation,
  active_routes = excluded.active_routes,
  updated_at    = now();

-- Zone flow
insert into zone_flow (label, value) values
  ('Centro',      8500),
  ('Zapopan',     6200),
  ('Tlaquepaque', 4100),
  ('Tonalá',      2800),
  ('Aeropuerto',  1900)
on conflict do nothing;

-- Transport mode
insert into transport_mode (name, percentage, color) values
  ('Transporte público', 45, '#FF6B00'),
  ('Automóvil',          28, '#6200EE'),
  ('Peatonal',           15, '#026948'),
  ('Bicicleta',          12, '#CCB9FF')
on conflict do nothing;

-- Heatmap points (example — Guadalajara metro area)
insert into heatmap_points (lng, lat, weight) values
  (-103.418, 20.676, 0.9),
  (-103.420, 20.680, 0.7),
  (-103.425, 20.678, 0.5),
  (-103.415, 20.674, 0.8),
  (-103.430, 20.682, 0.6),
  (-103.408, 20.672, 0.4),
  (-103.422, 20.685, 0.3),
  (-103.435, 20.670, 0.7),
  (-103.410, 20.688, 0.5),
  (-103.428, 20.675, 0.8),
  (-103.405, 20.690, 0.2),
  (-103.438, 20.668, 0.6),
  (-103.412, 20.670, 0.4),
  (-103.424, 20.672, 0.9),
  (-103.432, 20.678, 0.5)
on conflict do nothing;
