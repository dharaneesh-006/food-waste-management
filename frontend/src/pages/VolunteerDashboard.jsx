import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const VolunteerDashboard = () => {
  const cardsRef = useRef([]);
  const listRef = useRef([]);

  const [tasks, setTasks] = useState([
    { id: 1, task: "Pickup Rice & Curry (20 plates)", status: "Assigned" },
    {
      id: 2,
      task: "Deliver Sandwich Packets (50 packs)",
      status: "In Progress",
    },
    { id: 3, task: "Pickup Pasta Boxes (15 boxes)", status: "Pending" },
  ]);

  const [coins, setCoins] = useState(50); // starting balance
  const [coinHistory, setCoinHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const stats = [
    { title: "Tasks Completed", value: "45" },
    { title: "Active Tasks", value: tasks.length.toString() },
    { title: "Hours Volunteered", value: "120" },
    { title: "Communities Helped", value: "18" },
  ];

  const notifications = [
    "You’ve been assigned a new pickup task for 'Fruit Salad'",
    "NGO confirmed delivery of 'Soup Bowls'",
    "Reminder: Complete task 'Pasta Boxes' before 6 PM",
  ];

  // GSAP animations
  useEffect(() => {
    gsap.from(cardsRef.current, {
      opacity: 1,
      y: 10,
      duration: 1.2,
      stagger: 0.3,
      ease: "power2.out",
    });

    gsap.from(listRef.current, {
      opacity: 1,
      x: 0,
      duration: 1.2,
      stagger: 0.25,
      delay: 0.8,
      ease: "power2.out",
    });
  }, [tasks]);

  // Mark task complete & add coins
  const completeTask = (id) => {
    const now = new Date();
    const updatedTasks = tasks.map((t) =>
      t.id === id ? { ...t, status: "Completed" } : t
    );
    setTasks(updatedTasks);

    setCoins((prev) => prev + 10);
    setCoinHistory((prev) => [
      ...prev,
      {
        job: tasks.find((t) => t.id === id)?.task,
        coins: 10,
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString(),
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 " id="scrollbar">
      {/* Navbar */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">🤝 Volunteer Dashboard</h1>

        <div className="flex items-center space-x-4">
          {/* Coins */}
          <button
            onClick={() => setShowHistory(true)}
            className="px-4 py-2 bg-yellow-200 text-yellow-900 rounded-lg hover:bg-yellow-500 transition font-semibold"
          >
            🪙 {coins}
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
            Logout
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="p-6 space-y-8">
        {/* Stats */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div
                key={i}
                ref={(el) => (cardsRef.current[i] = el)}
                className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition"
              >
                <p className="text-gray-500">{stat.title}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Active Tasks */}
        <section>
          <h2 className="text-xl font-semibold mb-4">My Active Tasks</h2>
          <div className="bg-white shadow-lg rounded-xl p-4">
            {tasks.map((task, i) => (
              <div
                key={task.id}
                ref={(el) => (listRef.current[i] = el)}
                className="flex justify-between items-center p-3 border-b last:border-none hover:bg-gray-50 transition"
              >
                <p className="font-medium">{task.task}</p>
                <div className="flex items-center space-x-4">
                  <span
                    className={`text-sm font-medium ${
                      task.status === "Completed"
                        ? "text-green-600"
                        : task.status === "In Progress"
                        ? "text-blue-600"
                        : "text-orange-600"
                    }`}
                  >
                    {task.status}
                  </span>
                  {task.status !== "Completed" && (
                    <button
                      onClick={() => completeTask(task.id)}
                      className=" p-3 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition"
                    >
                      Complete (+10🪙)
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Notifications */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Notifications</h2>
          <div className="bg-white shadow-lg rounded-xl p-4 space-y-3">
            {notifications.map((note, i) => (
              <p key={i} className="text-sm text-gray-700">
                🔔 {note}
              </p>
            ))}
          </div>
        </section>
      </main>

      {/* Coin History Modal */}
      {showHistory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative">
            <h2 className="text-xl font-bold mb-4">🪙 Coins History</h2>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {coinHistory.length > 0 ? (
                coinHistory.map((entry, i) => (
                  <div
                    key={i}
                    className="flex justify-between text-sm border-b pb-2"
                  >
                    <span>{entry.job}</span>
                    <span className="text-green-600 font-semibold">
                      +{entry.coins}
                    </span>
                    <span className="text-gray-500">
                      {entry.date}, {entry.time}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No coins earned yet.</p>
              )}
            </div>
            <button
              onClick={() => setShowHistory(false)}
              className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VolunteerDashboard;
