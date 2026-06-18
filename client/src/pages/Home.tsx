import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Users, TrendingUp, Award, Play, CheckCircle, Star } from 'lucide-react';
import { Link } from 'wouter';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />

      {/* Hero Section - Datacamp Style */}
      <section className="gradient-navy-to-dark text-white py-24 md:py-32">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 flex justify-center">
              <img 
                src="/manus-storage/genius-logo-shield-cropped_9229f373.png" 
                alt="The Genius Institute" 
                className="h-24 w-24 drop-shadow-lg"
              />
            </div>
            <div className="mb-8 inline-block">
              <span className="text-[#D4AF37] font-semibold text-sm uppercase tracking-wider">
                Heritage-Based Curriculum Learning
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Master Your Subjects with Human + AI Powered Learning
            </h1>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              Learn Math, Science, Chemistry, Physics, and more from Ordinary Level to Advanced Level. Expert human teachers combined with 24/7 AI tutoring, interactive quizzes, and personalized insights—all in one platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/signup">
                <Button className="datacamp-button-primary text-lg px-8 py-4">
                  Start Free Today <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <button className="datacamp-button-secondary text-lg px-8 py-4">
                Watch Demo <Play className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { stat: '500+', label: 'Students Learning' },
              { stat: '95%', label: 'Success Rate' },
              { stat: '10+', label: 'Years Experience' },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#001F3F] mb-2">
                  {item.stat}
                </div>
                <p className="text-gray-600 text-lg">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Datacamp Style */}
      <section className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#001F3F] mb-4">
              Why Choose The Genius Institute?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We combine expert human teachers with cutting-edge AI technology to unlock your academic potential. The best of both worlds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: BookOpen,
                title: 'Expert Live Teachers',
                description: 'Interactive video lessons with qualified human instructors covering all Heritage-Based Curriculum subjects and levels.',
              },
              {
                icon: Users,
                title: 'AI Tutor Support',
                description: '24/7 AI-powered tutor providing step-by-step solutions, personalized explanations, and instant homework help.',
              },
              {
                icon: TrendingUp,
                title: 'Progress Tracking',
                description: 'Real-time analytics showing your learning progress, strengths, and areas for improvement.',
              },
              {
                icon: Award,
                title: 'Certificates',
                description: 'Earn verified certificates upon course completion to showcase your achievements.',
              },
            ].map((feature, idx) => (
              <div key={idx} className="datacamp-card">
                <feature.icon className="h-8 w-8 text-[#001F3F] mb-4" />
                <h3 className="text-xl font-bold text-[#001F3F] mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section className="py-24 bg-[#F5F5F5]">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#001F3F] mb-4">
              Subjects We Teach
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive coverage of all Heritage-Based Curriculum subjects from Primary to Advanced Level.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Mathematics', icon: '∑', color: 'bg-blue-100' },
              { name: 'Science', icon: '⚗️', color: 'bg-green-100' },
              { name: 'Chemistry', icon: '⚛️', color: 'bg-purple-100' },
              { name: 'Physics', icon: '⚡', color: 'bg-yellow-100' },
              { name: 'Agriculture', icon: '🌾', color: 'bg-orange-100' },
              { name: 'Commerce', icon: '💼', color: 'bg-red-100' },
            ].map((subject, idx) => (
              <div key={idx} className="bg-white rounded-lg p-8 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className={`${subject.color} w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto mb-4`}>
                  {subject.icon}
                </div>
                <h3 className="text-xl font-bold text-[#001F3F]">{subject.name}</h3>
                <p className="text-gray-600 mt-2">O-Level & A-Level</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#001F3F] mb-4">
              How It Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: 1, title: 'Sign Up', description: 'Create your account and select your subjects and level.' },
              { step: 2, title: 'Learn from Teachers', description: 'Attend live lessons with expert instructors or watch recorded sessions.' },
              { step: 3, title: 'Get AI Support', description: 'Get homework help, practice problems, and personalized explanations from AI tutor 24/7.' },
              { step: 4, title: 'Track Progress', description: 'Monitor your learning journey with detailed analytics and earn certificates.' },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-12 h-12 rounded-full bg-[#001F3F] text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-[#001F3F] mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-[#F5F5F5]">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#001F3F] mb-4">
              Simple, Affordable Pricing
            </h2>
            <p className="text-xl text-gray-600">Start learning today with our flexible plans.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: 'Student',
                price: '$2',
                period: '/month',
                features: ['Unlimited course access', 'Interactive quizzes', 'AI tutor support', 'Progress tracking', 'Certificates'],
                cta: 'Start Free',
              },
              {
                name: 'School License',
                price: 'Custom',
                period: 'pricing',
                features: ['Multiple student accounts', 'Teacher dashboard', 'Parent portal', 'Analytics & reports', 'Priority support'],
                cta: 'Request Demo',
                featured: true,
              },
              {
                name: 'Premium',
                price: '$5',
                period: '/month',
                features: ['All Student features', 'Priority support', 'Offline downloads', 'Advanced analytics', 'Exam prep mode'],
                cta: 'Upgrade Now',
              },
            ].map((plan, idx) => (
              <div
                key={idx}
                className={`rounded-lg p-8 ${
                  plan.featured
                    ? 'bg-[#001F3F] text-white shadow-lg transform scale-105'
                    : 'bg-white border-2 border-[#E8E8E8]'
                }`}
              >
                <h3 className={`text-2xl font-bold mb-2 ${plan.featured ? 'text-white' : 'text-[#001F3F]'}`}>
                  {plan.name}
                </h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className={plan.featured ? 'text-gray-300' : 'text-gray-600'}>{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact">
                  <Button
                    className={`w-full py-3 font-semibold ${
                      plan.featured
                        ? 'bg-[#D4AF37] text-[#001F3F] hover:bg-[#E8D4A8]'
                        : 'bg-[#001F3F] text-white hover:bg-[#000814]'
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#001F3F] mb-4">
              What Students Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah M.',
                level: 'Form 4 Student',
                text: 'The Genius Institute helped me improve my Math grade from C to A. The live teacher lessons are excellent, and the AI tutor helps me with homework anytime!',
                rating: 5,
              },
              {
                name: 'James K.',
                level: 'A-Level Student',
                text: 'Best investment for my studies. Expert teachers + AI support = perfect combination. The lessons are clear and I can get help 24/7.',
                rating: 5,
              },
              {
                name: 'Amara T.',
                level: 'Form 2 Student',
                text: 'I love how the human teachers make concepts clear, and the AI tutor helps me practice. Learning Science has never been this effective!',
                rating: 5,
              },
            ].map((testimonial, idx) => (
              <div key={idx} className="datacamp-card">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-[#D4AF37] fill-[#D4AF37]" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-bold text-[#001F3F]">{testimonial.name}</p>
                  <p className="text-gray-600 text-sm">{testimonial.level}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-navy-to-dark text-white py-20">
        <div className="container text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Learning?</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Join 500+ students already achieving their academic goals with The Genius Institute.
          </p>
          <Link href="/contact">
            <Button className="datacamp-button-primary text-lg px-8 py-4">
              Start Your Free Trial <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
