import React from "react";

interface City {
  id: number;
  title: string;
  mobile: boolean;
}

interface TopButtonsProps {
  setQuery: React.Dispatch<React.SetStateAction<{ q?: string; lat?: number; lon?: number }>>;
}

const TopButtons: React.FC<TopButtonsProps> = ({ setQuery }) => {
  const cities: City[] = [
    {
      id: 1,
      title: "Mumbai",
      mobile: true,
    },
    {
      id: 2,
      title: "New Delhi",
      mobile: true,
    },
    {
      id: 3,
      title: "Kolkata",
      mobile: true,
    },
    {
      id: 4,
      title: "Bangalore",
      mobile: false,
    },
    {
      id: 5,
      title: "Chennai",
      mobile: false,
    },
  ];

  return (
    <div className="flex items-center justify-around my-6">
      {cities.map((city) => (
        <button
          key={city.id}
          className={`text-white text-lg font-medium md:block ${city.mobile ? "" : "hidden"}`}
          onClick={() => setQuery({ q: city.title })}
        >
          {city.title}
        </button>
      ))}
    </div>
  );
};

export default TopButtons;
