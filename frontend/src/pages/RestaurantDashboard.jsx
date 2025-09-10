import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const RestaurantDashboard = () => {
  const cardsRef = useRef([]);
  const listRef = useRef([]);
  const [showModal, setShowModal] = useState(false);
  const [donations, setDonations] = useState([
    {
      id: 1,
      item: "Rice & Curry",
      qty: "20 plates",
      status: "Awaiting Pickup",
    },
    {
      id: 2,
      item: "Sandwich Packets",
      qty: "50 packs",
      status: "Volunteer Assigned",
    },
    { id: 3, item: "Pasta Boxes", qty: "15 boxes", status: "Awaiting Pickup" },
  ]);

  const [newDonation, setNewDonation] = useState({
    item: "",
    qty: "",
    time: "",
  });

  // Animate stats and lists
  // Animate stats and lists
  useEffect(() => {
    gsap.from(cardsRef.current, {
      opacity: 1,
      y: 10, // move a bit further down for visibility
      duration: 1.2, // slower animation
      stagger: 0.3, // bigger gap between cards
      ease: "power2.out", // smoother easing
    });

    gsap.from(listRef.current, {
      opacity: 1,
      x: 0, // slide in further from the left
      duration: 1.2, // smoother entry
      stagger: 0.25, // more noticeable stagger
      delay: 0.8, // start after stats
      ease: "power2.out",
    });
  }, [donations]);

  const stats = [
    { title: "Total Donations", value: "85" },
    { title: "Meals Served", value: "2,340" },
    { title: "Pending Pickups", value: donations.length.toString() },
    { title: "Completed Pickups", value: "79" },
  ];

  const history = [
    { id: 1, item: "Veg Biriyani", qty: "30 plates", date: "Sept 2, 2025" },
    { id: 2, item: "Soup Bowls", qty: "25 bowls", date: "Aug 28, 2025" },
    { id: 3, item: "Fruit Salad", qty: "40 packs", date: "Aug 20, 2025" },
  ];

  const notifications = [
    "Volunteer John assigned for Sandwich Packets",
    "Pickup completed for Veg Biriyani",
    "Your donation ‘Fruit Salad’ has been delivered successfully",
  ];

  // Handle form input
  const handleChange = (e) => {
    setNewDonation({ ...newDonation, [e.target.name]: e.target.value });
  };

  // Submit new donation
  const handleSubmit = (e) => {
    e.preventDefault();
    const donation = {
      id: donations.length + 1,
      item: newDonation.item,
      qty: newDonation.qty,
      status: "Awaiting Pickup",
    };
    setDonations([...donations, donation]);
    setShowModal(false);
    setNewDonation({ item: "", qty: "", time: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Navbar */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">🍴 Restaurant Dashboard</h1>
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

        {/* Active Donations */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Active Donations</h2>
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              + Add Donation
            </button>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-4">
            {donations.map((donation, i) => (
              <div
                key={donation.id}
                ref={(el) => (listRef.current[i] = el)}
                className="flex justify-between p-3 border-b last:border-none hover:bg-gray-50 transition"
              >
                <div>
                  <p className="font-medium">{donation.item}</p>
                  <p className="text-sm text-gray-500">{donation.qty}</p>
                </div>
                <span className="text-sm text-blue-600 font-medium">
                  {donation.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Donation History */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Donation History</h2>
          <div className="bg-white shadow-lg rounded-xl p-4">
            {history.map((h) => (
              <div
                key={h.id}
                className="flex justify-between p-3 border-b last:border-none hover:bg-gray-50 transition"
              >
                <div>
                  <p className="font-medium">{h.item}</p>
                  <p className="text-sm text-gray-500">{h.qty}</p>
                </div>
                <span className="text-sm text-gray-400">{h.date}</span>
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

      {/* Add Donation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500/50 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Add New Donation</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="item"
                value={newDonation.item}
                onChange={handleChange}
                placeholder="Food Item Name"
                required
                className="w-full border rounded p-2"
              />
              <input
                type="text"
                name="qty"
                value={newDonation.qty}
                onChange={handleChange}
                placeholder="Quantity (e.g., 20 plates)"
                required
                className="w-full border rounded p-2"
              />
              <input
                type="time"
                name="time"
                value={newDonation.time}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantDashboard;
