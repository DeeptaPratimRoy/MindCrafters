import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Overview = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1 className="text-2xl font-bold">Overview</h1>

      {user ? (
        <div className="mt-6 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold">Welcome, {user.email} 🎉</h2>
          <p className="mt-2 text-gray-600">
            Here’s a quick glance at your personalized career dashboard.
          </p>

          <div className="grid grid-cols-2 gap-6 mt-6">
            <div className="p-4 bg-blue-50 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold">Career Paths</h3>
              <p className="text-gray-500">Explore AI-powered suggestions.</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold">AI Advisor</h3>
              <p className="text-gray-500">Chat with your AI mentor anytime.</p>
            </div>
          </div>
        </div>
      ) : (
        <p className="mt-4 text-gray-600">Loading profile...</p>
      )}
    </div>
  );
};

export default Overview;
