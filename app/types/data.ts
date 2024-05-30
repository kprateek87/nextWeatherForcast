interface WeatherProps {
  dt: number;
  timezone: string;
  name: string;
  country: string;
  hourly: Array<{ title: string; temp: number; icon: string }>;
  daily: Array<{ title: string; temp: number; icon: string }>;
  details: string;
  icon: string;
  temp: number;
  temp_min: number;
  temp_max: number;
  sunrise: number;
  sunset: number;
  speed: number;
  humidity: number;
  feels_like: number;
}

interface ForecastItem {
  title: string;
  icon: string;
  temp: number;
}

export interface ForecastProps {
  title: string;
  items: ForecastItem[];
}

export interface DetailsProps {
  weather: WeatherProps;
}
