import { useEffect, useState, useCallback } from 'react';
import type { AlternativeRouteData } from '../components/routes/AlternativeRouteCard';
import { fetchRouteAlternatives, type RouteDetail } from '../services/routes';

interface UseRouteAlternativesResult {
  alternatives: AlternativeRouteData[];
  routeDetails: Record<string, RouteDetail>;
  selectedLineName: string;
  selectedDuration: number;
  selectedStatus: 'on_time' | 'delayed';
  loading: boolean;
  error: string | null;
  selectRoute: (lineName: string, duration: number, status: 'on_time' | 'delayed') => void;
}

export function useRouteAlternatives(): UseRouteAlternativesResult {
  const [alternatives, setAlternatives] = useState<AlternativeRouteData[]>([]);
  const [routeDetails, setRouteDetails] = useState<Record<string, RouteDetail>>({});
  const [selectedLineName, setSelectedLineName] = useState('C121');
  const [selectedDuration, setSelectedDuration] = useState(32);
  const [selectedStatus, setSelectedStatus] = useState<'on_time' | 'delayed'>('on_time');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRouteAlternatives()
      .then(({ alternatives: alts, details, fastest }) => {
        setAlternatives(alts);
        const detailMap: Record<string, RouteDetail> = {};
        details.forEach(d => { detailMap[d.id] = d; });
        setRouteDetails(detailMap);
        if (fastest) {
          setSelectedLineName(fastest.line_name);
          setSelectedDuration(fastest.total_time_minutes);
          setSelectedStatus(fastest.status);
        }
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const selectRoute = useCallback((lineName: string, duration: number, status: 'on_time' | 'delayed') => {
    setSelectedLineName(lineName);
    setSelectedDuration(duration);
    setSelectedStatus(status);
  }, []);

  return { alternatives, routeDetails, selectedLineName, selectedDuration, selectedStatus, loading, error, selectRoute };
}
