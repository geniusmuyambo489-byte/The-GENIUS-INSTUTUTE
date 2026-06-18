import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';
import { ArrowRight, Loader2 } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  description: string;
  image: string;
}

const articles: Article[] = [
  {
    id: '1',
    title: 'The Science Behind Effective Math Learning',
    category: 'Mathematics',
    date: 'Jun 10, 2024',
    readTime: '8 min read',
    description:
      'Discover the cognitive science principles that make math learning effective and how our coaching methods leverage them.',
    image: '📊',
  },
  {
    id: '2',
    title: 'Mastering Chemistry Lab Techniques',
    category: 'Chemistry',
    date: 'Jun 5, 2024',
    readTime: '10 min read',
    description:
      'A comprehensive guide to essential chemistry lab techniques and safety practices for advanced level students.',
    image: '🧪',
  },
  {
    id: '3',
    title: 'Physics Problem-Solving Strategies',
    category: 'Physics',
    date: 'May 28, 2024',
    readTime: '7 min read',
    description:
      'Learn proven strategies for tackling complex physics problems and developing conceptual understanding.',
    image: '⚡',
  },
  {
    id: '4',
    title: 'Building Strong Science Foundations',
    category: 'Science',
    date: 'May 20, 2024',
    readTime: '6 min read',
    description:
      'Why foundational concepts matter and how to build a solid base for advanced science studies.',
    image: '🌍',
  },
  {
    id: '5',
    title: 'Exam Preparation: A Holistic Approach',
    category: 'General',
    date: 'May 12, 2024',
    readTime: '9 min read',
    description:
      'Comprehensive strategies for exam preparation that go beyond memorization to build lasting knowledge.',
    image: '📚',
  },
  {
    id: '6',
    title: 'Time Management for Academic Success',
    category: 'General',
    date: 'May 5, 2024',
    readTime: '5 min read',
    description:
      'Practical time management techniques that help students balance multiple subjects and commitments.',
    image: '⏰',
  },
];

const categories = ['All', 'Mathematics', 'Science', 'Chemistry', 'Physics', 'General'];

export default function Insights() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const subscribeNewsletter = trpc.newsletter.subscribe.useMutation();

  const filteredArticles =
    selectedCategory === 'All'
      ? articles
      : articles.filter((article) => article.category === selectedCategory);

  const handleNewsletterSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.includes('@')) {
      toast.error('Please enter a valid email');
      return;
    }

    setIsSubscribing(true);
    try {
      await subscribeNewsletter.mutateAsync({ email: newsletterEmail });
      toast.success('Successfully subscribed to our newsletter!');
      setNewsletterEmail('');
    } catch (error: any) {
      toast.error(error.message || 'Failed to subscribe. Please try again.');
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-[#2D1B4E] via-[#3A3A3A] to-[#1A1A1A] text-white">
        <div className="container text-center">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
            Insights & Resources
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Expert analysis, research findings, and practical guides to enhance your academic journey.
          </p>
        </div>
      </section>

      {/* Featured Report */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-12">
            Featured Report
          </h2>

          <Card className="overflow-hidden hover:shadow-lg transition-all">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
              <div className="flex items-center justify-center bg-gradient-to-br from-[#2D1B4E] to-[#3A3A3A] rounded-lg p-12">
                <div className="text-8xl">📊</div>
              </div>
              <div className="flex flex-col justify-center">
                <Badge className="w-fit mb-4 bg-[#D4AF37] text-[#2D1B4E]">
                  Mathematics
                </Badge>
                <h3 className="font-playfair text-3xl font-bold text-gray-900 mb-4">
                  The Science Behind Effective Math Learning
                </h3>
                <p className="text-gray-600 mb-6">
                  Discover the cognitive science principles that make math learning effective and how our coaching methods leverage them. This comprehensive report explores memory consolidation, spaced repetition, and active recall techniques.
                </p>
                <div className="flex items-center text-sm text-gray-500 mb-6">
                  <span>Jun 10, 2024</span>
                  <span className="mx-3">•</span>
                  <span>8 min read</span>
                </div>
                <Button className="w-fit bg-[#D4AF37] text-[#2D1B4E] hover:bg-[#E8D4A8] font-semibold">
                  Read Full Report
                  <ArrowRight className="ml-2" size={18} />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-gradient-to-r from-[#2D1B4E] to-[#3A3A3A] text-white">
        <div className="container max-w-2xl mx-auto text-center">
          <h2 className="font-playfair text-3xl font-bold mb-4">
            Stay Updated
          </h2>
          <p className="text-gray-300 mb-8">
            Subscribe to our newsletter for exclusive insights, study tips, and academic resources delivered to your inbox.
          </p>

          <form onSubmit={handleNewsletterSubscribe} className="flex gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="bg-white text-gray-900 placeholder:text-gray-500"
            />
            <Button
              type="submit"
              disabled={isSubscribing}
              className="bg-[#D4AF37] text-[#2D1B4E] hover:bg-[#E8D4A8] font-semibold whitespace-nowrap"
            >
              {isSubscribing ? (
                <>
                  <Loader2 className="mr-2 animate-spin" size={18} />
                  Subscribing...
                </>
              ) : (
                <>
                  Subscribe
                  <ArrowRight className="ml-2" size={18} />
                </>
              )}
            </Button>
          </form>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-20">
        <div className="container">
          <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-8">
            All Articles
          </h2>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-[#D4AF37] text-[#2D1B4E]'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <Card
                key={article.id}
                className="overflow-hidden hover:shadow-lg transition-all hover:scale-105 cursor-pointer"
              >
                <div className="bg-gradient-to-br from-[#2D1B4E] to-[#3A3A3A] p-12 flex items-center justify-center">
                  <div className="text-6xl">{article.image}</div>
                </div>
                <div className="p-6">
                  <Badge className="mb-3 bg-[#D4AF37] text-[#2D1B4E]">
                    {article.category}
                  </Badge>
                  <h3 className="font-playfair text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {article.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span>{article.date}</span>
                    <span>{article.readTime}</span>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#2D1B4E]"
                  >
                    Read More
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No articles found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
