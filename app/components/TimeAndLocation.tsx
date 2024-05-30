import React from "react";
import { formatToLocalTime } from "../services/weatherService";
import { DetailsProps } from "../types/data";

const TimeAndLocation: React.FC<DetailsProps> = ({ weather: { dt, timezone, name, country } }) => {
  return (
    <div>
      <div className="flex items-center justify-center my-6">
        <p className="text-white md:text-xl text-lg font-extralight">
          {formatToLocalTime(dt, timezone)}
        </p>
      </div>

      <div className="flex items-center justify-center my-3">
        <p className="text-white md:text-3xl text-xl font-medium">{`${name}, ${country}`}</p>
      </div>
    </div>
  );
};

export default TimeAndLocation;
