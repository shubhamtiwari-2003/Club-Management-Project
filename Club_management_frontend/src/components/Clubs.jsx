// components/Clubs.jsx
import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

const Clubs = ({ settings }) => {
  const clubs = [
    { id: 1, name: "Robotics Club", logo: "/public/images/robotic-logo.jpg" },
    { id: 2, name: "Music Club", logo: "/public/images/music-club-logo.jpg" },
    { id: 3, name: "Drama Club", logo: "/public/images/drama-club-logo.jpg" },
    { id: 4, name: "Coding Club", logo: "/public/images/coding-club-logo.jpg" },
  ];

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Clubs</h2>
      <Slider {...settings}>
        {clubs.map((club) => (
          <div key={club.id} className="p-4">
            <Link to={`/clubs/${club.id}`}>
              <div className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center hover:shadow-lg transition">
                <img
                  src={club.logo}
                  alt={club.name}
                  className="w-20 h-20 object-cover rounded-full mb-4"
                />
                <h3 className="text-lg font-semibold">{club.name}</h3>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Clubs;
