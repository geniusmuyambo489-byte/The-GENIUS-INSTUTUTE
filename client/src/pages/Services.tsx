import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

const services = [
  {
    id: 'math',
    name: 'Mathematics',
    description: 'From algebra fundamentals to advanced calculus',
    icon: '∑',
    levels: ['Ordinary Level', 'Advanced Level'],
    topics: ['Algebra', 'Geometry', 'Trigonometry', 'Calculus', 'Statistics'],
    color: 'from-purple-500 to-purple-600',
  },
  {
    id: 'science',
    name: 'Science',
    description: 'Comprehensive coverage of general science principles',
    icon: '⚗️',
    levels: ['Ordinary Level', 'Advanced Level'],
    topics: ['Biology', 'Physics Basics', 'Chemistry Basics', 'Earth Science'],
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    description: 'Deep dive into chemical reactions and molecular structures',
    icon: '🧪',
    levels: ['Ordinary Level', 'Advanced Level'],
    topics: ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry', 'Laboratory Techniques'],
    color: 'from-green-500 to-green-600',
  },
  {
    id: 'physics',
    name: 'Physics',
    description: 'Master mechanics, waves, electricity, and modern physics',
    icon: '⚡',
    levels: ['Ordinary Level', 'Advanced Level'],
    topics: ['Mechanics', 'Thermodynamics', 'Waves & Sound', 'Electricity & Magnetism', 'Modern Physics'],
    color: 'from-orange-500 to-orange-600',
  },
];

export default function Services() {
  const [expandedService, setExpandedService] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="gradient-premium text-white py-20">
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-6">
            Our Services
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Comprehensive academic coaching across all subjects and levels. Expert instruction tailored to your needs.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {services.map((service) => (
              <Card
                key={service.id}
                className="overflow-hidden hover:shadow-lg transition-all cursor-pointer"
                onClick={() =>
                  setExpandedService(
                    expandedService === service.id ? null : service.id
                  )
                }
              >
                <div className={`bg-gradient-to-r ${service.color} p-8 text-white`}>
                  <div className="text-5xl mb-4">{service.icon}</div>
                  <h3 className="font-playfair text-3xl font-bold mb-2">
                    {service.name}
                  </h3>
                  <p className="text-white/90">{service.description}</p>
                </div>

                {/* Expandable Content */}
                {expandedService === service.id && (
                  <div className="p-8 bg-gray-50 border-t border-gray-200 animate-in fade-in slide-in-from-top-2">
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Academic Levels
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {service.levels.map((level) => (
                          <span
                            key={level}
                            className="px-3 py-1 bg-[#D4AF37]/20 text-[#2D1B4E] rounded-full text-sm font-medium"
                          >
                            {level}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Key Topics
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {service.topics.map((topic) => (
                          <div
                            key={topic}
                            className="flex items-center text-gray-700"
                          >
                            <span className="w-2 h-2 bg-[#D4AF37] rounded-full mr-2"></span>
                            {topic}
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full mt-6 bg-gradient-to-r from-[#2D1B4E] to-[#3A3A3A] hover:shadow-lg">
                      Learn More
                    </Button>
                  </div>
                )}

                {/* Collapsed state indicator */}
                {expandedService !== service.id && (
                  <div className="p-4 bg-gray-50 flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Click to expand
                    </span>
                    <ChevronDown size={20} className="text-gray-400" />
                  </div>
                )}
              </Card>
            ))}
          </div>

          {/* Process Flow */}
          <div className="mt-20 pt-20 border-t border-gray-200">
            <h2 className="font-playfair text-4xl font-bold text-center mb-16">
              Our Coaching Process
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  step: '01',
                  title: 'Assessment',
                  description:
                    'We evaluate your current level and identify specific areas for improvement.',
                },
                {
                  step: '02',
                  title: 'Customized Plan',
                  description:
                    'Create a personalized learning roadmap tailored to your goals.',
                },
                {
                  step: '03',
                  title: 'Expert Coaching',
                  description:
                    'Receive one-on-one or group sessions with experienced instructors.',
                },
                {
                  step: '04',
                  title: 'Progress Tracking',
                  description:
                    'Regular assessments and feedback to monitor your advancement.',
                },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#2D1B4E] to-[#D4AF37] text-white rounded-full font-playfair text-2xl font-bold mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-playfair text-xl font-bold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
