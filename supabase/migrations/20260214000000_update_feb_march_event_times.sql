-- Update event times for February and March 2026 events to 8:00 AM

UPDATE public.events
SET event_date = DATE_TRUNC('day', event_date) + INTERVAL '8 hours'
WHERE event_date >= '2026-02-01T00:00:00Z'
  AND event_date < '2026-04-01T00:00:00Z'
  AND EXTRACT(HOUR FROM event_date) != 8;
