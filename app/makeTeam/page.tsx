"use client";
import React, { useEffect, useState } from "react";
import NavBar from "../componets/navBar";
import Link from "next/link";

const makeTeam = () => {
  const [curTeam, setCurTeam] = useState("");
  const [curSubTeam, setCurSubTeam] = useState("");

  const change = async () => {
    const response = await fetch("/api/makeTeam", {
      method: "POST",
      body: JSON.stringify({ teamColor: curTeam, subTeams: curSubTeam }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <div className="bg-blue-200 flex flex-col h-screen justify-evenly">
      <NavBar />

      <div className=" flex m-auto">
        <div className=" bg-[#93c5fd] max-h-full rounded-lg">
          <div className="bg-blue-200 flex flex-col justify-evenly p-5 m-12 rounded-lg max-h-min	">
            <div>
              Enter Team Color
              <br />
              <input
                type="text"
                name="TeamColor"
                placeholder="Enter Team Color"
                onChange={(e) => setCurTeam(e.target.value)}
              />
            </div>
            <br />
            <div>
              Enter Number of Sub Teams
              <br />
              <input
                type="number"
                name="SubTeams"
                placeholder="Enter # of sub teams"
                onChange={(e) => setCurSubTeam(e.target.value)}
              />
            </div>
            <br />
            <Link id="button1" href="/homepage">
              <button onClick={change}>Comfirm</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default makeTeam;
