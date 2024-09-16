// CyberSecurityServices.tsx
import { Shield, Lock, Eye, AlertCircle, Cloud, UserCheck } from 'lucide-react';

const services = [
  { title: "Network Security", icon: Shield, description: "Our team of experienced professionals is passionate about cyber security, and we have a proven track record of delivering top-notch services to businesses of all sizes." },
  { title: "Data Encryption", icon: Lock, description: "Team of experienced professionals is passionate about cyber security, and we have a proven track record of delivering top-notch services to businesses of all sizes." },
  { title: "Threat Intelligence", icon: Eye, description: "Professionals are passionate about cyber security and have a proven track record of delivering top-notch services to businesses of all sizes." },
  { title: "Cybersecurity Consulting", icon: UserCheck, description: "Our team of experienced professionals is passionate about cyber security, and we have a proven track record of delivering top-notch services to businesses of all sizes." },
  { title: "Incident Response", icon: AlertCircle, description: "Team of experienced professionals is passionate about cyber security, and we have a proven track record of delivering top-notch services to businesses of all sizes." },
  { title: "Cloud Security", icon: Cloud, description: "Professionals are passionate about cyber security and have a proven track record of delivering top-notch services to businesses of all sizes." },
];

const CyberSecurityServices = () => {
  return (
    <section className="bg-services-gradien py-16 px-4">
      {/* <iframe
       src="https://www.google.com/webhp?igu=1"
        title="Google Search"
        className="w-[500px] h-[500px] border-0"
      /> */}
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className='text-purple-300 font-extrabold text-base opacity-70'>SERVICES</h2>
        <h2 className="text-3xl font-semibold text-white mt-2 mb-4">
          Our comprehensive range of cyber<br/> security services includes
        </h2>
        <p className="text-gray-400">
          Passionate about cyber security, we have a proven track record of delivering top-notch services to businesses of all sizes.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {services.map((service, index) => (
          <div key={index} className="bg-transparent p-6  text-center">
            <service.icon className="mx-auto mb-4 text-purple-500" size={40} />
            <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
            <p className="text-gray-400">{service.description}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-10 space-x-4">
        <button className="bg-transparent border border-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg transition-all">
          Read More
        </button>
        <button className="bg-transparent hover:border hover:border-purple-500  text-white px-6 py-2 rounded-lg transition-all">
          Contact Us
        </button>
      </div>
    </section>
  );
};

export default CyberSecurityServices;
