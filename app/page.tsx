"use client";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TopMenu from "./components/TopMenu";
import Inputs from "./components/Inputs";
import getFormattedWeatherData from "./services/weatherService";
import TimeAndLocation from "./components/TimeAndLocation";
import TemperatureAndDetails from "./components/TemperatureAndDetails";
import Forecast from "./components/Forcast";
import { DetailsProps } from "./types/data";

const Home: React.FC = () => {
  const [query, setQuery] = useState<{
    q?: string;
    lat?: number;
    lon?: number;
  }>({ q: "New Delhi" });
  const [units, setUnits] = useState<string>("metric");
  const [weather, setWeather] = useState<DetailsProps["weather"] | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : "current location.";

      toast.info("Fetching weather for " + message);

      await getFormattedWeatherData({ ...query, units }).then((data) => {
        toast.success(
          `Successfully fetched weather for ${data.name}, ${data.country}.`
        );
        setWeather(data);
      });
    };

    fetchWeather();
  }, [query, units]);

  const formatBackground = (): string => {
    if (!weather) return "from-cyan-700 to-blue-700";
    const threshold = units === "metric" ? 38 : 100;
    if (weather.temp <= threshold) return "from-cyan-700 to-blue-700";

    return "from-yellow-700 to-orange-700";
  };

  return (
    <div
      className={`mx-auto max-w-screen-md md:mt-4 py-5 md:px-32 h-screen px-10 bg-gradient-to-br md:h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}
    >
      <TopMenu setQuery={setQuery} />
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

      {weather && (
        <div>
          <TimeAndLocation weather={weather} />
          <TemperatureAndDetails weather={weather} />
          <div className="flex flex-col gap-10">
            <Forecast title="hourly forecast" items={weather.hourly} />
            <Forecast title="daily forecast" items={weather.daily} />
          </div>
        </div>
      )}

      <ToastContainer autoClose={5000} theme="colored" newestOnTop={true} />
    </div>
  );
};

export default Home;
