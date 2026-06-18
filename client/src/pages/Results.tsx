import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';

const AnimatedCounter = ({ target, label }: { target: number; label: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 30);
    return () => clearInterval(timer);
  }, [target]);

  return (
    <div>
      <div className="text-5xl md:text-6xl font-bold text-[#D4AF37] mb-2">
        {count}
        {label.includes('%') ? '%' : '+'}
      </div>
      <p className="text-gray-600 text-lg">{label}</p>
    </div>
  );
};

const beforeAfterMetrics = [
  {
    subject: 'Mathematics',
    before: 'Struggling with algebra',
    after: 'Advanced calculus mastery',
    improvement: '87%',
  },
  {
    subject: 'Physics',
    before: 'Difficulty with concepts',
    after: 'Confident problem solver',
    improvement: '92%',
  },
  {
    subject: 'Chemistry',
    before: 'Lab work challenges',
    after: 'Experimental proficiency',
    improvement: '85%',
  },
  {
    subject: 'Science',
    before: 'Average performance',
    after: 'Top-tier grades',
    improvement: '89%',
  },
];

export default function Results() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="gradient-premium text-white py-20">
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-6">
            Proven Results
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Our students consistently achieve exceptional academic outcomes. See the impact of personalized coaching.
          </p>
        </div>
      </section>

      {/* KPI Dashboard */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <AnimatedCounter target={500} label="Students Coached" />
            </Card>
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <AnimatedCounter target={95} label="Success Rate %" />
            </Card>
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <AnimatedCounter target={10} label="Years Experience" />
            </Card>
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <AnimatedCounter target={4} label="Subjects Offered" />
            </Card>
          </div>
        </div>
      </section>

      {/* Before & After Metrics */}
      <section className="py-20">
        <div className="container">
          <h2 className="font-playfair text-4xl font-bold text-center mb-16">
            Student Transformation Stories
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {beforeAfterMetrics.map((metric, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-xl transition-all"
              >
                <div className="bg-gradient-to-r from-[#2D1B4E] to-[#3A3A3A] text-white p-6">
                  <h3 className="font-playfair text-2xl font-bold">
                    {metric.subject}
                  </h3>
                </div>

                <div className="p-8">
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                      <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold mb-2">
                        Before
                      </p>
                      <p className="text-gray-700">{metric.before}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold mb-2">
                        After
                      </p>
                      <p className="text-gray-700">{metric.after}</p>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 font-medium">
                        Improvement
                      </span>
                      <span className="text-3xl font-bold text-[#D4AF37]">
                        {metric.improvement}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <h2 className="font-playfair text-4xl font-bold text-center mb-16">
            What Our Students Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah M.',
                subject: 'Advanced Mathematics',
                quote:
                  'The personalized approach helped me finally understand calculus. My grades went from C to A+ in just 6 months!',
              },
              {
                name: 'James K.',
                subject: 'Physics',
                quote:
                  'Expert coaching made complex concepts simple. I now feel confident tackling any physics problem.',
              },
              {
                name: 'Emma L.',
                subject: 'Chemistry',
                quote:
                  'The structured learning plan and regular feedback transformed my approach to studying. Highly recommended!',
              },
            ].map((testimonial, index) => (
              <Card key={index} className="p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-[#D4AF37] text-lg">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.subject}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
