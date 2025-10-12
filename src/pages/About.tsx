import { Link } from 'react-router-dom';
import { Users, HeartPulse, Eye, Award, Stethoscope } from 'lucide-react';
import Layout from '../components/Layout';

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-800 via-blue-900 to-blue-950 text-white py-24">
        <div className="absolute inset-0 bg-[url('/lovable-uploads/eyecare-banner.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About EyeWell Vision Care</h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Committed to protecting your sight and improving lives through compassionate, state-of-the-art eye care.
          </p>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-10">
            Our Mission & Vision
          </h2>
          <div className="grid md:grid-cols-2 gap-10 text-slate-700">
            <div className="p-8 rounded-xl shadow-md bg-blue-50 hover:shadow-lg transition">
              <HeartPulse className="w-12 h-12 text-blue-700 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
              <p>
                To deliver comprehensive, accessible, and affordable eye care
                that empowers every patient to see the world clearly and live fully.
              </p>
            </div>
            <div className="p-8 rounded-xl shadow-md bg-blue-50 hover:shadow-lg transition">
              <Eye className="w-12 h-12 text-blue-700 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Our Vision</h3>
              <p>
                A world where healthy vision is within everyone’s reach — supported by innovation, empathy, and excellence in every patient experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-blue-50 border-t border-blue-100">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Our Story</h2>
          <p className="text-slate-700 leading-relaxed max-w-3xl mx-auto mb-8">
            Founded in 2020 by a team of dedicated optometrists and healthcare professionals,
            <strong> EyeWell Vision Care</strong> began with one simple belief — 
            that good vision changes lives. 
            <br /><br />
            From our humble beginnings as a local eye clinic, we’ve grown into a trusted name in
            digital vision care, offering not just checkups, but holistic solutions for modern eye health —
            from prescription lenses to blue light protection, and everything in between.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-10">Our Core Values</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 text-slate-700">
            <div className="p-6 rounded-lg shadow-sm hover:shadow-md transition bg-blue-50">
              <Stethoscope className="w-10 h-10 text-blue-700 mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-2">Care</h3>
              <p>Every patient is treated with compassion, dignity, and respect.</p>
            </div>
            <div className="p-6 rounded-lg shadow-sm hover:shadow-md transition bg-blue-50">
              <Award className="w-10 h-10 text-blue-700 mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-2">Excellence</h3>
              <p>We pursue the highest standards in eye care, technology, and service.</p>
            </div>
            <div className="p-6 rounded-lg shadow-sm hover:shadow-md transition bg-blue-50">
              <Users className="w-10 h-10 text-blue-700 mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-2">Community</h3>
              <p>We build lasting relationships with the people we serve.</p>
            </div>
            <div className="p-6 rounded-lg shadow-sm hover:shadow-md transition bg-blue-50">
              <HeartPulse className="w-10 h-10 text-blue-700 mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-2">Integrity</h3>
              <p>Honesty and transparency guide every decision we make.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20 bg-blue-50 border-t border-blue-100">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Meet Our Specialists</h2>
          <p className="text-slate-700 max-w-2xl mx-auto mb-12">
            Our certified team of ophthalmologists, optometrists, and vision experts are dedicated to delivering personalized eye care that makes a difference.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
            {[
              { name: 'Dr. Anjali Mehta', title: 'Chief Ophthalmologist', img: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&h=400&fit=crop&crop=face' },
              { name: 'Dr. Rohan Sinha', title: 'Senior Optometrist', img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&crop=face' },
              { name: 'Dr. Meera Joshi', title: 'Pediatric Vision Specialist', img: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop&crop=face' },
            ].map((person, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition text-center">
                <img
                  src={person.img}
                  alt={person.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  loading="lazy"
                />
                <h3 className="font-semibold text-lg text-slate-900">{person.name}</h3>
                <p className="text-blue-700 text-sm">{person.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-700 to-blue-800 text-blue-50 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">We’re Here to Protect Your Vision</h2>
          <p className="text-blue-100 mb-8">
            Schedule your next eye exam today and experience world-class care tailored to your unique needs.
          </p>
          <Link
            to="/book-appointment"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition-all"
          >
            Book an Appointment
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default About;
