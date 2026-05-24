import {
  FaAmbulance,
  FaLaptopMedical,
  FaHome,
  FaMicroscope,
  FaHeartbeat,
  FaPills,
  FaBriefcaseMedical,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

export default function TechMarquee() {
  const navigate = useNavigate();

  const services = [
    {
      icon: <FaAmbulance />,
      name: "Emergency Care",
      category: "24/7 Support",
      path: "/services/emergency",
    },
    {
      icon: <FaLaptopMedical />,
      name: "Video Consultation",
      category: "Online Doctor",
      path: "/services/video-consultation",
    },
    {
      icon: <FaHome />,
      name: "Home Care",
      category: "At Home Service",
      path: "/services/home-care",
    },
    {
      icon: <FaMicroscope />,
      name: "Diagnostics",
      category: "Lab Tests",
      path: "/services/diagnostics",
    },
    {
      icon: <FaHeartbeat />,
      name: "Health Checkups",
      category: "Preventive Care",
      path: "/services/health-checkup",
    },
    {
      icon: <FaPills />,
      name: "Pharmacy Delivery",
      category: "Medicines at Doorstep",
      path: "/services/pharmacy",
    },
    {
      icon: <FaBriefcaseMedical />,
      name: "Career Opportunities",
      category: "Join Us",
      path: "/careers",
    },
  ];

  const duplicated = [...services, ...services];

  return (
    <div className="relative overflow-hidden w-full py-4 bg-white">

      {/* Fade Left */}
      <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>

      {/* Fade Right */}
      <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

      {/* Marquee */}
      <div className="flex w-max animate-marquee gap-6">

        {duplicated.map((item, index) => (
          <div
            key={`${item.name}-${index}`}
            onClick={() => navigate(item.path)}
            className="flex items-center gap-3 px-5 py-3 rounded-2xl
            bg-gradient-to-br from-teal-50 to-white
            border border-teal-100 shadow-sm
            hover:shadow-teal-300/40 hover:scale-105
            transition-all duration-300 cursor-pointer"
          >
            <span className="text-2xl text-teal-600">
              {item.icon}
            </span>

            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-800">
                {item.name}
              </span>
              <span className="text-[11px] text-gray-500">
                {item.category}
              </span>
            </div>
          </div>
        ))}

      </div>

      {/* Animation */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .animate-marquee {
          display: flex;
          animation: marquee 20s linear infinite;
          will-change: transform;
        }

        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}