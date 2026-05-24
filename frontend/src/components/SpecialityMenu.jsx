// frontend/src/components/SpecialityMenu.jsx
import React, { useState, useCallback, useMemo, memo } from 'react';
import { useNavigate } from 'react-router-dom';

const SpecialtyCard = memo(({ specialty, index, onViewSpecialists }) => {
 // eslint-disable-next-line no-unused-vars
const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2"
      style={{
        animation: `fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.08}s both`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onViewSpecialists(specialty.id, specialty.name)}
    >
      <div className="p-6 md:p-8">
        <div className={`${specialty.bgColor} rounded-2xl w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mb-6 
          transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}>
          <div className={`${specialty.iconColor} transition-colors duration-300`}>
            {specialty.icon}
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900">
            {specialty.name}
          </h3>
          
          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
            {specialty.description}
          </p>

          <div className="flex items-center gap-4 pt-2">
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-sm text-gray-700 font-medium">{specialty.doctors}+ Experts</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm text-gray-700 font-medium">{specialty.satisfaction}% Satisfaction</span>
            </div>
          </div>

          <button 
            onClick={(e) => {
              e.stopPropagation();
              onViewSpecialists(specialty.id, specialty.name);
            }}
            className="w-full mt-4 bg-gradient-to-r from-teal-600 to-teal-500 text-white py-2.5 rounded-xl 
              text-sm font-semibold hover:from-teal-700 hover:to-teal-600 transition-all duration-300"
          >
            View Specialists
          </button>
        </div>
      </div>
    </div>
  );
});

SpecialtyCard.displayName = 'SpecialtyCard';

const SpecialityMenu = () => {
  const navigate = useNavigate();

  const specialities = useMemo(() => [
    {
      id: "cardiology",
      name: "Cardiology",
      icon: (
        <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      description: "Comprehensive cardiac care with state-of-the-art interventional cardiology.",
      doctors: 15,
      satisfaction: 97,
      bgColor: "bg-gradient-to-br from-red-50 to-rose-50",
      iconColor: "text-red-600"
    },
    {
      id: "neurology",
      name: "Neurology",
      icon: (
        <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      description: "Advanced neurological treatments for brain, spine, and nervous system disorders.",
      doctors: 12,
      satisfaction: 96,
      bgColor: "bg-gradient-to-br from-purple-50 to-indigo-50",
      iconColor: "text-purple-600"
    },
    {
      id: "orthopedics",
      name: "Orthopedics",
      icon: (
        <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.143 5.857a5 5 0 00-7.071 0l-4.243 4.243a5 5 0 000 7.071 5 5 0 007.071 0l2.122-2.122m-4.243-4.243l2.122 2.122m1.414-4.243l5.657-5.657a2 2 0 012.828 0l1.414 1.414a2 2 0 010 2.828l-5.657 5.657" />
        </svg>
      ),
      description: "Complete musculoskeletal care including joint replacements and sports medicine.",
      doctors: 18,
      satisfaction: 98,
      bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
      iconColor: "text-blue-600"
    },
    {
      id: "pediatrics",
      name: "Pediatrics",
      icon: (
        <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      description: "Specialized child healthcare from newborns to adolescents.",
      doctors: 14,
      satisfaction: 99,
      bgColor: "bg-gradient-to-br from-green-50 to-teal-50",
      iconColor: "text-green-600"
    },
    {
      id: "dermatology",
      name: "Dermatology",
      icon: (
        <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      description: "Advanced dermatological treatments for all skin conditions.",
      doctors: 10,
      satisfaction: 95,
      bgColor: "bg-gradient-to-br from-orange-50 to-red-50",
      iconColor: "text-orange-600"
    },
    {
      id: "ophthalmology",
      name: "Ophthalmology",
      icon: (
        <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      description: "Advanced eye care with latest diagnostic and surgical technologies.",
      doctors: 9,
      satisfaction: 97,
      bgColor: "bg-gradient-to-br from-indigo-50 to-blue-50",
      iconColor: "text-indigo-600"
    }
  ], []);

  const handleViewSpecialists = useCallback((specialtyId, specialtyName) => {
    // IMPORTANT: Ye line Cardiology click karne pe doctors page pe le jayegi with filter
    navigate(`/doctors?speciality=${specialtyId}`);
    console.log(`Viewing specialists for: ${specialtyName}`);
  }, [navigate]);

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gray-900">World-Class </span>
            <span className="bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent">
              Medical Specialties
            </span>
          </h1>
          <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto">
            Experience exceptional healthcare across multiple specialties with cutting-edge technology
            and internationally trained physicians.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {specialities.map((specialty, index) => (
            <SpecialtyCard
              key={specialty.id}
              specialty={specialty}
              index={index}
              onViewSpecialists={handleViewSpecialists}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default SpecialityMenu;