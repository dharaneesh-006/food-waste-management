import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const NgoDashboard = () => {
  const cardsRef = useRef([]);
  const listRef = useRef([]);
  const [requests, setRequests] = useState([
    {
      id: 1,
      request: "Meals for Homeless Shelter",
      qty: "100 meals",
      status: "Pending",
    },
    {
      id: 2,
      request: "Food Support for Flood Relief",
      qty: "250 meals",
      status: "In Progress",
    },
    {
      id: 3,
      request: "Meals for Orphanage",
      qty: "80 meals",
      status: "Completed",
    },
  ]);

  const stats = [
    { title: "Total Requests", value: requests.length.toString() },
    { title: "Meals Distributed", value: "5,600" },
    { title: "Partner Restaurants", value: "12" },
    { title: "Volunteers Engaged", value: "55" },
  ];

  const notifications = [
    "New donation from 'GreenLeaf Restaurant'",
    "Volunteer team dispatched for 'Flood Relief'",
    "Completed delivery to 'Orphanage'",
  ];

  // Animations
  useEffect(() => {
    gsap.from(cardsRef.current, {
      opacity: 1,
      y: 15,
      duration: 1,
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
  }, [requests]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Navbar */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">🏢 NGO Dashboard</h1>
        <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
          Logout
        </button>
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

        {/* Food Requests */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Food Requests</h2>
          <div className="bg-white shadow-lg rounded-xl p-4">
            {requests.map((req, i) => (
              <div
                key={req.id}
                ref={(el) => (listRef.current[i] = el)}
                className="flex justify-between p-3 border-b last:border-none hover:bg-gray-50 transition"
              >
                <div>
                  <p className="font-medium">{req.request}</p>
                  <p className="text-sm text-gray-500">{req.qty}</p>
                </div>
                <span
                  className={`text-sm font-medium ${
                    req.status === "Completed"
                      ? "text-green-600"
                      : req.status === "In Progress"
                      ? "text-blue-600"
                      : "text-orange-600"
                  }`}
                >
                  {req.status}
                </span>
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
    </div>
  );
};

export default NgoDashboard;
