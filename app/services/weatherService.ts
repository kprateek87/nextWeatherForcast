import { DateTime } from "luxon";

const API_KEY = process.env.API_KEY;
const BASE_URL = process.env.BASE_URL;

interface WeatherData {
  coord: {
    lat: number;
    lon: number;
  };
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  name: string;
  dt: number;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  weather: {
    main: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
}

interface ForecastData {
  timezone: string;
  daily: {
    dt: number;
    temp: {
      day: number;
    };
    weather: {
      icon: string;
    }[];
  }[];
  hourly: {
    dt: number;
    temp: number;
    weather: {
      icon: string;
    }[];
  }[];
}

interface CurrentWeather {
  lat: number;
  lon: number;
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  name: string;
  dt: number;
  country: string;
  sunrise: number;
  sunset: number;
  details: string;
  icon: string;
  speed: number;
}

interface DailyForecast {
  title: string;
  temp: number;
  icon: string;
}

interface HourlyForecast {
  title: string;
  temp: number;
  icon: string;
}

interface FormattedWeatherData extends CurrentWeather {
  timezone: string;
  daily: DailyForecast[];
  hourly: HourlyForecast[];
}

const getWeatherData = (infoType: string, searchParams: Record<string, string | number>): Promise<any> => {
  const url = new URL(BASE_URL + "/" + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY } as any).toString();

  return fetch(url.toString()).then((res) => res.json());
};

const formatCurrentWeather = (data: WeatherData): CurrentWeather => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;

  const { main: details, icon } = weather[0];

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    details,
    icon,
    speed,
  };
};

const formatForecastWeather = (data: ForecastData): { timezone: string; daily: DailyForecast[]; hourly: HourlyForecast[] } => {
  const { timezone, daily, hourly } = data;
  
  const formattedDaily = daily.slice(1, 6).map((d) => ({
    title: formatToLocalTime(d.dt, timezone, "ccc"),
    temp: d.temp.day,
    icon: d.weather[0].icon,
  }));

  const formattedHourly = hourly.slice(1, 6).map((d) => ({
    title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
    temp: d.temp,
    icon: d.weather[0].icon,
  }));

  return { timezone, daily: formattedDaily, hourly: formattedHourly };
};

const getFormattedWeatherData = async (searchParams: Record<string, string | number>): Promise<FormattedWeatherData> => {
  const formattedCurrentWeather = await getWeatherData("weather", searchParams).then(formatCurrentWeather);

  const { lat, lon } = formattedCurrentWeather;

  const formattedForecastWeather = await getWeatherData("onecall", {
    lat,
    lon,
    exclude: "current,minutely,alerts",
    units: searchParams.units,
  }).then(formatForecastWeather);

  return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

const formatToLocalTime = (secs: number, zone: string, format: string = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"): string =>
  DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconFromUrl = (code: string): string => `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;

export { formatToLocalTime, iconFromUrl };
