import React from 'react';

function TeamItem({ team }: any) {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 hover:bg-gray-700 transition duration-300 transform hover:scale-105">
      <div className="flex flex-col items-center">
        <img
          src={`/teams/${team.pagename}.png`}
          alt={`${team.name} logo`}
          className="w-24 h-24 mb-4 rounded-full object-cover border-2 border-gray-700"
        />
        <h2 className="text-xl font-semibold text-gray-200 mb-2 text-center">{team.name}</h2>
      </div>
      <div className="flex items-center justify-between mt-4">
        <span className="text-sm text-gray-400 bg-gray-700 px-2 py-1 rounded">
          Region: {team.region || "N/A"}
        </span>
        <span className="text-sm text-gray-400 bg-gray-700 px-2 py-1 rounded">
          Earnings: {team.earnings ? `${team.earnings}$` : "N/A"}
        </span>
      </div>
    </div>
  );
}

export default TeamItem;