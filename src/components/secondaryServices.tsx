import React from 'react';

// Service data with images, titles, and descriptions
const services = [
  {
    title: 'Cloud Security',
    description: 'Protect your cloud infrastructure with a proactive approach and prevent unauthorized access.',
    image: '/cloud-security.jpg'
  },
  {
    title: 'Threat Intelligence',
    description: 'Identify, understand, and defend against cyber threats in real-time with our intelligence solutions.',
    image: 'threat-intelligence.jpg'
  },
  {
    title: 'Data Encryption',
    description: 'Keep your data secure by encrypting sensitive information to prevent unauthorized access.',
    image: 'data-encryption.jpg'
  },
];

export const SecondaryServices = () => {
  return (
    <section className="bg-gradient-to-r from-black to-indigo-800 text-white py-16 flex flex-col items-center">
      {/* Heading */}
      <div className="flex flex-col justify-center items-center">
        <div className="text-center mb-12 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">
            Discover how we can tailor these services to meet your unique needs.
          </h2>
          <p className="text-gray-400">Our specialized services provide top-level security for your business.</p>
        </div>

        {/* Services Grid */}
        <div className="flex justify-center items-center w-full">
          <div className="grid md:grid-cols-3 grid-cols-1 gap-6 max-w-screen-lg w-full px-4">
            {services.map((service, index) => (
              <div key={index} className="flex justify-center">
                <div
                  className="bg-inherit bg-opacity-20 rounded-lg overflow-hidden shadow-lg flex flex-col"
                  style={{ width: '350px', height: '400px' }} // Increased card size
                >
                  <div className="flex-shrink-0">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-48 md:h-56 object-cover" // Adjusted image height
                    />
                  </div>
                  <div className="p-4 text-center flex-1 flex flex-col justify-center">
                    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-gray-400">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Buttons Section */}
        <div className="mt-12 flex space-x-4">
          <a
            href="#read-more"
            className="px-4 py-1 text-md font-semibold border border-gray-400 text-gray-400 hover:text-white hover:border-white transition-all duration-300 rounded-full"
            style={{ background: 'transparent' }}
          >
            Read More
          </a>
          <a
            href="#contact-us"
            className="px-4 py-1 text-md font-semibold border border-gray-400 text-gray-400 hover:text-white hover:border-white transition-all duration-300 rounded-full"
            style={{ background: 'transparent' }}
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};
