"use client"
import React, { useState } from "react";
import { toast } from "react-toastify";
import { CiLocationOn, CiSearch } from "react-icons/ci";

interface InputsProps {
  setQuery: React.Dispatch<React.SetStateAction<{ q?: string; lat?: number; lon?: number }>>;
  units: string;
  setUnits: React.Dispatch<React.SetStateAction<string>>;
}

const Inputs: React.FC<InputsProps> = ({ setQuery, units, setUnits }) => {
  const [city, setCity] = useState<string>("");

  const handleUnitsChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    const selectedUnit = e.currentTarget.name;
    if (units !== selectedUnit) setUnits(selectedUnit);
  };

  const handleSearchClick = () => {
    if (city !== "") setQuery({ q: city });
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      toast.info("Fetching user's location.");
      navigator.geolocation.getCurrentPosition((position) => {
        toast.success("Location fetched!");
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        setQuery({
          lat,
          lon,
        });
      });
    }
  };

  return (
    <div className="flex flex-row justify-center my-6">
      <div className="flex flex-row w-3/4 items-center justify-center md:space-x-4">
        <input
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          type="text"
          placeholder="Search for city...."
          className="bg-transparent/60 text-white text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase placeholder:text-white/40"
        />
        <CiSearch
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={handleSearchClick}
        />
        <CiLocationOn
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={handleLocationClick}
        />
      </div>

      <div className="flex flex-row w-1/4 items-center justify-center">
        <button
          name="metric"
          className="text-xl text-white font-light transition ease-out hover:scale-125"
          onClick={handleUnitsChange}
        >
          °C
        </button>
        <p className="text-xl text-white mx-1">|</p>
        <button
          name="imperial"
          className="text-xl text-white font-light transition ease-out hover:scale-125"
          onClick={handleUnitsChange}
        >
          °F
        </button>
      </div>
    </div>
  );
};

export default Inputs;
