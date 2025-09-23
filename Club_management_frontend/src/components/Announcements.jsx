// components/Announcements.jsx
import React from "react";
import Slider from "react-slick";

const Announcements = ({ settings }) => {
  const announcements = [
    {
      id: 1,
      title: "Semester Break Notice",
      image: "https://source.unsplash.com/600x400/?announcement,notice",
      description: "University closed from 15th–20th Oct.",
    },
    {
      id: 2,
      title: "New Lab Opening",
      image: "https://source.unsplash.com/600x400/?laboratory,science",
      description: "IoT & AI research lab opening soon!",
    },
  ];

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Announcements</h2>
      <Slider {...settings}>
        {announcements.map((a) => (
          <div key={a.id} className="p-4">
            <div className="bg-white shadow-md rounded-xl overflow-hidden">
              <img
                src={a.image}
                alt={a.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{a.title}</h3>
                <p className="text-sm text-gray-600">{a.description}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Announcements;
