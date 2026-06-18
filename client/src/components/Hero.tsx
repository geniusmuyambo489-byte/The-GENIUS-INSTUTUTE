import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-premium opacity-95"></div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-[#D4AF37] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-[#E8D4A8] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>

      {/* Content */}
      <div className="relative z-10 container max-w-4xl mx-auto px-4 py-20 text-center">
        {/* Tagline */}
        <div className="inline-block mb-6">
          <span className="text-[#D4AF37] font-semibold text-sm tracking-widest uppercase">
            Excellence in Academic Coaching
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="font-playfair text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Transform Your Academic
          <span className="block text-[#D4AF37]">Excellence</span>
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-2xl mx-auto leading-relaxed">
          Master Math, Science, Chemistry, and Physics with personalized coaching from Ordinary Level to Advanced Level. Proven results. Expert instructors. Your success, guaranteed.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-[#D4AF37] text-[#2D1B4E] hover:bg-[#E8D4A8] font-semibold text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              Book a Call
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
          <Link href="/case-studies">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#2D1B4E] font-semibold text-lg px-8 py-6 transition-all"
            >
              View Case Studies
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-20 pt-16 border-t border-white/20">
          <div>
            <div className="text-4xl font-bold text-[#D4AF37] mb-2">500+</div>
            <p className="text-gray-300">Students Coached</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#D4AF37] mb-2">95%</div>
            <p className="text-gray-300">Success Rate</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#D4AF37] mb-2">10+</div>
            <p className="text-gray-300">Years Experience</p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-[#D4AF37] rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-[#D4AF37] rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
