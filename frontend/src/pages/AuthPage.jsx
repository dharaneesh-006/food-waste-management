import React, { useState } from "react";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "volunteer",
  });

  const toggleMode = () => setIsLogin(!isLogin);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log("Logging in with", formData);
      // TODO: Call backend login API
    } else {
      console.log("Registering with", formData);
      // TODO: Call backend register API
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900 font-sans overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      
      <div className="relative bg-slate-800/50 backdrop-blur-sm shadow-2xl shadow-cyan-500/20 rounded-2xl p-8 w-full max-w-md border border-cyan-500/30">
        <h2 className="text-3xl font-bold text-center mb-6 text-cyan-400 tracking-wider">
          {isLogin ? "SIGN IN" : "CREATE ACCOUNT"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 bg-slate-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 bg-slate-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 bg-slate-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
            required
          />

          {!isLogin && (
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-3 bg-slate-700/50 border-0 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
            >
              <option className="bg-slate-800" value="restaurant">Restaurant</option>
              <option className="bg-slate-800" value="ngo">NGO</option>
              <option className="bg-slate-800" value="volunteer">Volunteer</option>
            </select>
          )}

          <button
            type="submit"
            className="w-full bg-cyan-500 text-slate-900 font-bold p-3 rounded-lg hover:bg-cyan-400 transition-all duration-300 shadow-md shadow-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/60 transform hover:scale-105"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-gray-400">
          {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
          <button
            onClick={toggleMode}
            className="font-semibold text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
      
      {/* Adding animation keyframes to style for the blobs */}
      <style jsx global>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.2);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.8);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 8s infinite;
        }
      `}</style>
    </div>
  );
};

export default AuthPage;

