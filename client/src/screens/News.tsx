import { Link } from "react-router-dom";

const News = () => {
  return (
    <section className="bg-gray-900 text-gray-100 min-h-screen flex flex-col items-center justify-center space-y-8 p-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
          Welcome to the News
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl">
          Stay updated with the latest news, updates, and tournament information. This page is still under development, but you can explore the available sections below.
        </p>
      </div>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
        <Link
          to="/news/updates"
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center"
        >
          <span className="font-semibold text-lg">Updates</span>
        </Link>
        <Link
          to="/news/tournaments"
          className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-800 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center"
        >
          <span className="font-semibold text-lg">Tournaments</span>
        </Link>
        <Link
          to="/news/teams"
          className="px-8 py-3 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-xl hover:from-red-600 hover:to-red-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center"
        >
          <span className="font-semibold text-lg">Teams</span>
        </Link>
      </div>
    </section>
  );
};

export default News;