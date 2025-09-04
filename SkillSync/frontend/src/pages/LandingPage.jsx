import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white shadow">
        <h1 className="text-2xl font-bold text-indigo-600">SkillSync</h1>
        <div className="space-x-4">
          <Link to="/login" className="text-gray-700 hover:text-indigo-600">
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 text-center">
        <h1 className="text-6xl font-bold mb-6">AI Career Advisor</h1>
        <p className="text-xl mb-8 max-w-2xl">
          Unlock your potential with AI-driven career paths, skill insights, and
          personalized growth plans.
        </p>
        <Link
          to="/register"
          className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow hover:scale-105 transition"
        >
          Start Free
        </Link>
      </div>

      {/* Features */}
      <section className="py-16 bg-white text-gray-800">
        <h2 className="text-3xl font-bold text-center mb-12">What You Get</h2>
        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto px-6">
          <div className="p-6 shadow rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Skill Mapping</h3>
            <p>Upload your resume and discover strengths & gaps instantly.</p>
          </div>
          <div className="p-6 shadow rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Career Roadmaps</h3>
            <p>AI generates personalized learning paths for your dream job.</p>
          </div>
          <div className="p-6 shadow rounded-lg">
            <h3 className="text-xl font-semibold mb-2">AI Advisor</h3>
            <p>Get answers to your career questions anytime, anywhere.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-6 text-center text-gray-600">
        © {new Date().getFullYear()} SkillSync. All rights reserved.
      </footer>
    </div>
  );
}
