import { useState, useMemo } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const caseStudiesData = [
  {
    id: 1,
    title: 'From Struggling to Excellence in Mathematics',
    subject: 'Mathematics',
    level: 'Advanced Level',
    outcome: 'Grade Improvement',
    description:
      'Student improved from D grade to A* in Advanced Mathematics through structured problem-solving sessions.',
    improvement: '+45%',
    timeframe: '6 months',
    studentType: 'Individual',
  },
  {
    id: 2,
    title: 'Physics Mastery Program',
    subject: 'Physics',
    level: 'Advanced Level',
    outcome: 'Confidence Building',
    description:
      'Group of 5 students gained confidence in experimental physics and improved practical exam scores.',
    improvement: '+38%',
    timeframe: '4 months',
    studentType: 'Group',
  },
  {
    id: 3,
    title: 'Chemistry Lab Excellence',
    subject: 'Chemistry',
    level: 'Ordinary Level',
    outcome: 'Practical Skills',
    description:
      'Students mastered laboratory techniques and safety protocols, achieving top marks in practical exams.',
    improvement: '+52%',
    timeframe: '3 months',
    studentType: 'Group',
  },
  {
    id: 4,
    title: 'Science Foundations Breakthrough',
    subject: 'Science',
    level: 'Ordinary Level',
    outcome: 'Foundation Building',
    description:
      'Comprehensive science coaching helped struggling student understand core concepts and pass with distinction.',
    improvement: '+41%',
    timeframe: '5 months',
    studentType: 'Individual',
  },
  {
    id: 5,
    title: 'Advanced Physics Preparation',
    subject: 'Physics',
    level: 'Advanced Level',
    outcome: 'Exam Preparation',
    description:
      'Intensive exam preparation program resulted in students achieving top university entrance scores.',
    improvement: '+48%',
    timeframe: '6 months',
    studentType: 'Group',
  },
  {
    id: 6,
    title: 'Mathematics Confidence Restoration',
    subject: 'Mathematics',
    level: 'Ordinary Level',
    outcome: 'Confidence Building',
    description:
      'Student overcame math anxiety and developed strong foundational skills for Advanced Level studies.',
    improvement: '+35%',
    timeframe: '4 months',
    studentType: 'Individual',
  },
];

export default function CaseStudies() {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedOutcome, setSelectedOutcome] = useState<string | null>(null);

  const subjects = ['Mathematics', 'Science', 'Chemistry', 'Physics'];
  const levels = ['Ordinary Level', 'Advanced Level'];
  const outcomes = [
    'Grade Improvement',
    'Confidence Building',
    'Practical Skills',
    'Foundation Building',
    'Exam Preparation',
  ];

  const filteredCaseStudies = useMemo(() => {
    return caseStudiesData.filter((study) => {
      if (selectedSubject && study.subject !== selectedSubject) return false;
      if (selectedLevel && study.level !== selectedLevel) return false;
      if (selectedOutcome && study.outcome !== selectedOutcome) return false;
      return true;
    });
  }, [selectedSubject, selectedLevel, selectedOutcome]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="gradient-premium text-white py-20">
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-6">
            Case Studies
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Real success stories from our students. Explore how personalized coaching transformed academic journeys.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-12 bg-gray-50 border-b border-gray-200">
        <div className="container">
          <h3 className="font-semibold text-gray-900 mb-6">Filter Results</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Subject Filter */}
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-3">
                Subject
              </p>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedSubject === null ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedSubject(null)}
                  className={
                    selectedSubject === null
                      ? 'bg-[#2D1B4E] text-white'
                      : ''
                  }
                >
                  All
                </Button>
                {subjects.map((subject) => (
                  <Button
                    key={subject}
                    variant={
                      selectedSubject === subject ? 'default' : 'outline'
                    }
                    size="sm"
                    onClick={() => setSelectedSubject(subject)}
                    className={
                      selectedSubject === subject
                        ? 'bg-[#2D1B4E] text-white'
                        : ''
                    }
                  >
                    {subject}
                  </Button>
                ))}
              </div>
            </div>

            {/* Level Filter */}
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-3">Level</p>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedLevel === null ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedLevel(null)}
                  className={
                    selectedLevel === null
                      ? 'bg-[#2D1B4E] text-white'
                      : ''
                  }
                >
                  All
                </Button>
                {levels.map((level) => (
                  <Button
                    key={level}
                    variant={selectedLevel === level ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedLevel(level)}
                    className={
                      selectedLevel === level
                        ? 'bg-[#2D1B4E] text-white'
                        : ''
                    }
                  >
                    {level}
                  </Button>
                ))}
              </div>
            </div>

            {/* Outcome Filter */}
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-3">
                Outcome
              </p>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedOutcome === null ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedOutcome(null)}
                  className={
                    selectedOutcome === null
                      ? 'bg-[#2D1B4E] text-white'
                      : ''
                  }
                >
                  All
                </Button>
                {outcomes.map((outcome) => (
                  <Button
                    key={outcome}
                    variant={
                      selectedOutcome === outcome ? 'default' : 'outline'
                    }
                    size="sm"
                    onClick={() => setSelectedOutcome(outcome)}
                    className={
                      selectedOutcome === outcome
                        ? 'bg-[#2D1B4E] text-white'
                        : ''
                    }
                  >
                    {outcome}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20">
        <div className="container">
          <p className="text-gray-600 mb-8">
            Showing {filteredCaseStudies.length} of {caseStudiesData.length}{' '}
            case studies
          </p>

          {filteredCaseStudies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCaseStudies.map((study) => (
                <Card
                  key={study.id}
                  className="overflow-hidden hover:shadow-xl transition-all hover:scale-105 cursor-pointer"
                >
                  <div className="bg-gradient-to-r from-[#2D1B4E] to-[#3A3A3A] text-white p-6">
                    <div className="flex items-start justify-between mb-3">
                      <Badge className="bg-[#D4AF37] text-[#2D1B4E]">
                        {study.subject}
                      </Badge>
                      <span className="text-2xl font-bold text-[#D4AF37]">
                        {study.improvement}
                      </span>
                    </div>
                    <h3 className="font-playfair text-xl font-bold">
                      {study.title}
                    </h3>
                  </div>

                  <div className="p-6">
                    <p className="text-gray-700 mb-6 line-clamp-3">
                      {study.description}
                    </p>

                    <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Level</span>
                        <span className="font-semibold text-gray-900">
                          {study.level}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Timeframe</span>
                        <span className="font-semibold text-gray-900">
                          {study.timeframe}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Type</span>
                        <span className="font-semibold text-gray-900">
                          {study.studentType}
                        </span>
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-[#2D1B4E] to-[#3A3A3A] hover:shadow-lg">
                      Read Full Story
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No case studies match your filters. Try adjusting your selection.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
