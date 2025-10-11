import Layout from '../components/Layout';

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Story</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-green-100">
            Bringing comfort and tradition to your table.
            <br />
            <span className="block mt-4">
              Mom’s by Goo Goo Foods is a mom-daughter venture inspired by the warmth of a mother’s kitchen.
              What began in 2015 is rooted in generations of home-cooked meals, where love and care were the main ingredients.
            </span>
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-green-800 mb-6">The Beginning of Goo Goo Foods</h2>

            <p className="text-lg text-gray-700 mb-6">
              <strong className="text-green-700">From our home to yours:</strong> Inspired by my mother’s recipes,
              I started Mom’s to share the authentic flavors of Manipur with those craving the taste of home.
              Today, our ready-to-eat dishes help busy women, students, and families enjoy traditional meals without the hassle.
            </p>

            <h2 className="text-3xl font-bold text-green-800 mb-6">Our Mission</h2>

            <p className="text-lg text-gray-700 mb-6">
              <strong className="text-green-700">Real food, rooted in heritage:</strong> We’re here to preserve Manipuri culinary traditions
              while making mealtime easier. Every dish reflects our love for local ingredients, family recipes,
              and simple, honest cooking.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
              <div className="bg-green-50 p-6 rounded-lg border border-green-100">
                <h3 className="text-xl font-bold text-green-800 mb-3">Quality First</h3>
                <p className="text-gray-700">
                  We source only the finest ingredients and follow traditional preparation methods
                  to ensure every product meets our exacting standards.
                </p>
              </div>
              <div className="bg-green-100 p-6 rounded-lg border border-green-200">
                <h3 className="text-xl font-bold text-green-900 mb-3">Authentic Flavors</h3>
                <p className="text-gray-700">
                  Our recipes honor traditional techniques while delivering the rich, complex
                  flavors that make our products truly special.
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-green-800 mb-6">What Makes Us Special</h2>

            <ul className="list-disc list-inside text-lg text-gray-700 space-y-3 mb-8">
              <li>Small-batch, handcrafted products</li>
              <li>Authentic Manipuri flavors</li>
              <li>Indigenous, locally sourced ingredients</li>
              <li>Easy, ready-to-eat convenience</li>
              <li>Made with care, like home</li>
            </ul>

            <div className="bg-green-50 p-8 rounded-lg text-center border border-green-100 shadow-sm">
              <p className="text-xl text-green-900 font-medium mb-4">
                A Taste of Home
                <br />
                When you open a jar from Mom’s, you’re not just tasting food —
                you’re sharing in a legacy of love, tradition, and the rich culture of Manipur.
              </p>
              <p className="text-lg text-green-700">
                – Momita
                <br />Founder, Mom’s by Goo Goo Foods
              </p>
            </div>

            <h2 className="text-3xl font-bold text-green-800 mb-6 mt-12">Legals</h2>

            <p className="text-lg text-gray-700 mb-6">
              We are a registered food business committed to quality and safety. Our details are as follows:
            </p>

            <div className="bg-green-50 border border-green-100 rounded-lg p-6">
              <p className="text-lg text-green-800 leading-relaxed">
                <strong>Registered Business Name:</strong> Goo Goo Foods <br />
                <strong>Address:</strong> Yaiskul Chingakham Leirak, Imphal West, Manipur 795001<br />
                <strong>GSTIN:</strong> 14CAOPM6149J2Z8<br />
                <strong>FSSAI Lic. No.:</strong> 1162401300006<br />
                <strong>MSME Regd.:</strong> UDYAM-MN-05-0003159<br />
                <strong>Email:</strong> googoofoodsmoms@gmail.com<br />
                <strong>Contact:</strong> +91 6009809060
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
