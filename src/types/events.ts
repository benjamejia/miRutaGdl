export interface Match {
  id: string;
  teamA: string;
  teamB: string;
  title: string;
  stadium: string;
  timeLabel: string;
  isLive: boolean;
}

export interface FanFestEvent {
  id: string;
  title: string;
  description: string;
  dateLabel: string;
  location: string;
}
