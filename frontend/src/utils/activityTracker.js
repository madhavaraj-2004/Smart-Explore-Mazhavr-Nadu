const ACTIVITY_KEY = 'smart_explorer_activity';

const defaultActivity = {
  viewed_districts: [],
  clicked_places: [],
};

const uniqueRecent = (values, nextValue, limit = 12) => {
  const merged = [nextValue, ...values.filter((item) => item !== nextValue)];
  return merged.slice(0, limit);
};

export const getActivity = () => {
  try {
    const raw = localStorage.getItem(ACTIVITY_KEY);
    if (!raw) {
      return defaultActivity;
    }

    const parsed = JSON.parse(raw);
    return {
      viewed_districts: Array.isArray(parsed.viewed_districts) ? parsed.viewed_districts : [],
      clicked_places: Array.isArray(parsed.clicked_places) ? parsed.clicked_places : [],
    };
  } catch {
    return defaultActivity;
  }
};

const saveActivity = (nextActivity) => {
  localStorage.setItem(ACTIVITY_KEY, JSON.stringify(nextActivity));
};

export const recordDistrictView = (district) => {
  if (!district) {
    return;
  }

  const activity = getActivity();
  const next = {
    ...activity,
    viewed_districts: uniqueRecent(activity.viewed_districts, district),
  };
  saveActivity(next);
};

export const recordPlaceClick = (place) => {
  if (!place) {
    return;
  }

  const activity = getActivity();
  const next = {
    ...activity,
    clicked_places: uniqueRecent(activity.clicked_places, place),
  };
  saveActivity(next);
};

export const getActivitySnapshot = () => getActivity();
