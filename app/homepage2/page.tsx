"use client";

import React, { useEffect, useState } from "react";
import NavBar from "../componets/navBar";

const HomePage2 = () => {
  const [teamPlace, setTeamPlace] = useState("");

  useEffect(() => {
    const fetchTeamPlace = async () => {
      try {
        const response = await fetch("/api/homepage");
        if (!response.ok) {
          throw new Error("Failed to fetch team place");
        }
        const data = await response.json();
        setTeamPlace(data.toString()); // Assuming data is already a string
      } catch (error) {
        console.error("Error fetching team place:", error);
        setTeamPlace("N/A");
      }
    };

    fetchTeamPlace();
  }, []);

  return (
    <div className="bg-blue-200 flex flex-col h-screen justify-evenly">
      <NavBar />

      <div className="m-auto">
        <div>
          <div className="bg-[#93c5fd] max-h-full rounded-lg">
            <ul className="flex flex-col">
              {teamPlace !== "N/A" && (
                <li className="p-4 bg-blue-700 m-2 rounded-lg">
                  <span className="text-white space-evenly">
                    Your team's place: {teamPlace}
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage2;
