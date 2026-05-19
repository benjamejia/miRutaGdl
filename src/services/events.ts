import { supabase } from '../lib/supabase';
import type { Match, FanFestEvent } from '../types/events';

export async function fetchMatches(): Promise<Match[]> {
  const { data, error } = await supabase
    .from('matches')
    .select('*')
    .order('time_label', { ascending: true });

  if (error) throw error;
  if (!data) return [];

  return (data as any[]).map((row) => ({
    id: row.id,
    teamA: row.team_a_label,
    teamB: row.team_b_label,
    title: row.title,
    stadium: row.stadium,
    timeLabel: row.time_label,
    isLive: row.is_live ?? false,
  }));
}

export async function fetchFanFestEvents(): Promise<FanFestEvent[]> {
  const { data, error } = await supabase
    .from('fanfest_events')
    .select('*')
    .order('date_label', { ascending: true });

  if (error) throw error;
  if (!data) return [];

  return (data as any[]).map((row) => ({
    id: row.id,
    title: row.title,
    description: row.description,
    dateLabel: row.date_label,
    location: row.location,
  }));
}
