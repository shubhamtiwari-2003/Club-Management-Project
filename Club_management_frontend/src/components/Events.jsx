// components/Events.jsx
import React from "react";
import Slider from "react-slick";

const Events = ({ settings }) => {
  const events = [
    {
      id: 1,
      title: "AI Hackathon",
      image: "/images/ai-hackathon-poster.jpg",
      date: "12th Oct 2025",
    },
    {
      id: 2,
      title: "Music Fest",
      image: "/images/music-fest-poster.jpg",
      date: "20th Oct 2025",
    },
    {
      id: 3,
      title: "Drone Racing",
      image: "/images/drone-racing-poster.jpg",
      date: "25th Oct 2025",
    },
  ];

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Events</h2>
      <Slider {...settings}>
        {events.map((event) => (
          <div key={event.id} className="p-4">
            <div className="bg-white shadow-md rounded-xl overflow-hidden">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{event.title}</h3>
                <p className="text-sm text-gray-600">{event.date}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Events;
