import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuthContext';
import Layout from '../components/Layout';
import FeaturedProducts from '../components/FeaturedProducts';
import BannerCarousel from '../components/BannerCarousel';
import TestimonialCard from '../components/TestimonialCard';
import { Eye, HeartPulse, ArrowRight, MessageCircle } from 'lucide-react';

interface FeaturedProduct {
  id: string;
  name: string;
  price: number;
  image_url: string | null;
  description: string | null;
}

interface Review {
  id: string;
  title: string;
  comment: string;
  rating: number;
  created_at: string;
  profiles: {
    full_name: string | null;
    email: string | null;
  } | null;
}

const Index = () => {
  const { isAuthenticated } = useAuth();
  const [featuredProducts, setFeaturedProducts] = useState<FeaturedProduct[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
    fetchReviews();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('id, name, price, image_url, description')
        .eq('is_active', true)
        .eq('featured', true)
        .limit(4)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFeaturedProducts(data || []);
    } catch (error) {
      console.error('Error fetching featured products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          id,
          title,
          comment,
          rating,
          created_at,
          profiles:user_id (
            full_name,
            email
          )
        `)
        .is('product_id', null)
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const fallbackTestimonials = [
    {
      name: 'Dr. Aditi Rao',
      rating: 5,
      comment:
        'The prescription lenses are top quality, and the anti-glare coating really makes a difference. My patients love recommending EyeWell to others!',
      location: 'Pune, Maharashtra',
      image:
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&crop=face',
    },
    {
      name: 'Arjun Patel',
      rating: 5,
      comment:
        'Ordered blue light filter glasses and they’ve completely changed my work-from-home routine. Super comfortable and stylish!',
      location: 'Delhi, India',
      image:
        'https://images.unsplash.com/photo-1502767089025-6572583495b0?w=400&h=400&fit=crop&crop=face',
    },
    {
      name: 'Sneha Verma',
      rating: 4,
      comment:
        'Quick service, excellent consultation experience, and the products arrived well-packed. I love my new frames!',
      location: 'Bangalore, Karnataka',
      image:
        'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop&crop=face',
    },
  ];

  return (
    <Layout>
      {/* Hero Carousel */}
      {/* <BannerCarousel /> */}

      {/* Featured Products */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Our Vision Care Essentials
            </h2>
            <p className="text-lg text-slate-700 max-w-2xl mx-auto">
              Explore our curated collection of lenses, frames, and eye health supplements designed to protect and enhance your vision.
            </p>
          </div>
          <FeaturedProducts />
        </div>
      </section>

      {/* Eye Health Services Section */}
      <section className="py-20 bg-white border-t border-blue-100">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="flex flex-col items-center">
            <Eye className="w-12 h-12 text-blue-700 mb-4" />
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Comprehensive Eye Exams</h3>
            <p className="text-slate-600">
              Regular eye check-ups with our certified optometrists help you maintain crystal-clear vision and detect issues early.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <HeartPulse className="w-12 h-12 text-blue-700 mb-4" />
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Digital Eye Strain Solutions</h3>
            <p className="text-slate-600">
              Specialized lenses and expert advice to relieve eye fatigue caused by screens and digital devices.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <ArrowRight className="w-12 h-12 text-blue-700 mb-4" />
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Advanced Eye Care Products</h3>
            <p className="text-slate-600">
              From contact lenses to hydrating eye drops — find everything you need for everyday eye comfort and protection.
            </p>
          </div>
        </div>
      </section>

      {/* 🩵 Book an Eye Checkup Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 text-blue-50">
        <div className="absolute inset-0 bg-[url('/lovable-uploads/eye-care-bg.jpg')] bg-cover bg-center opacity-10"></div>
        <div className="relative max-w-5xl mx-auto text-center px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Book Your Comprehensive Eye Checkup Today
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Early detection is key to maintaining healthy vision. Schedule an appointment with our expert optometrists and keep your eyes in their best shape.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/book-appointment"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition-all"
            >
              Book an Appointment
            </Link>
            <Link
              to="/contact"
              className="border-2 border-blue-100 text-blue-50 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 hover:text-blue-900 transition-colors"
            >
              Contact Our Team
            </Link>
          </div>
        </div>
      </section>

      {/* Customer Login */}
      {!isAuthenticated && (
        <section className="py-12 bg-gradient-to-r from-blue-800 to-blue-900 text-blue-50">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Already a Patient?</h2>
            <p className="text-lg text-blue-100 mb-6">
              Sign in to your EyeWell account to manage appointments, access prescriptions, and view your vision history.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/auth"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Patient Login
              </Link>
              <Link
                to="/auth"
                className="border-2 border-blue-100 text-blue-50 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 hover:text-blue-900 transition-colors"
              >
                Create Account
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">What Our Patients Say</h2>
          <p className="text-lg text-slate-700 mb-12">
            Real stories from people who trust EyeWell for their vision health
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.length > 0
              ? reviews.map((r) => (
                  <TestimonialCard
                    key={r.id}
                    name={r.profiles?.full_name || 'Anonymous'}
                    rating={r.rating}
                    comment={r.comment}
                    location=""
                    image="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=400&h=400&fit=crop&crop=face"
                  />
                ))
              : fallbackTestimonials.map((t, i) => <TestimonialCard key={i} {...t} />)}
          </div>

          <div className="mt-10">
            <Link
              to="/reviews"
              className="bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-900 transition-colors inline-block"
            >
              Read More Reviews
            </Link>
          </div>
        </div>
      </section>

      {/* 💬 Floating Live Chat Button */}
      <button
        onClick={() => alert('Live chat feature coming soon!')}
        className="fixed bottom-6 right-6 bg-blue-700 hover:bg-blue-800 text-white p-4 rounded-full shadow-lg transition-transform transform hover:scale-110 focus:outline-none"
        aria-label="Ask a Question"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    </Layout>
  );
};

export default Index;
