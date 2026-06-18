import { useState } from 'react';
import { useAuth } from '@/_core/hooks/useAuth';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { User, TrendingUp, BookOpen, AlertCircle, LogOut, MessageSquare } from 'lucide-react';
import { Link } from 'wouter';

export default function ParentDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#001F3F] mb-4">Please log in to continue</h1>
          <Link href="/">
            <Button className="bg-[#001F3F] hover:bg-[#000814] text-white">
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const children = [
    {
      id: 1,
      name: 'Sarah M.',
      level: 'Form 4',
      courses: [
        { name: 'Mathematics', progress: 75, grade: 'A' },
        { name: 'Chemistry', progress: 68, grade: 'B+' },
        { name: 'Physics', progress: 82, grade: 'A' },
      ],
      lastActive: '2 hours ago',
      attendance: 95,
    },
    {
      id: 2,
      name: 'James M.',
      level: 'Form 2',
      courses: [
        { name: 'Mathematics', progress: 60, grade: 'B' },
        { name: 'Science', progress: 72, grade: 'B+' },
      ],
      lastActive: '1 day ago',
      attendance: 88,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F5]">
      <Navigation />

      <div className="flex-1">
        <div className="container py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-[#001F3F] mb-2">
                Parent Portal
              </h1>
              <p className="text-gray-600">
                Monitor your children's learning progress and achievements
              </p>
            </div>
            <button
              onClick={() => logout()}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white border border-[#E8E8E8] hover:bg-gray-50 transition-colors"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex space-x-4 mb-8 border-b border-[#E8E8E8]">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'progress', label: 'Progress Reports' },
              { id: 'communication', label: 'Communication' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 font-semibold border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-[#001F3F] text-[#001F3F]'
                    : 'border-transparent text-gray-600 hover:text-[#001F3F]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {children.map((child) => (
                <div key={child.id} className="bg-white rounded-lg p-8 shadow-sm">
                  {/* Child Header */}
                  <div className="flex items-center justify-between mb-6 pb-6 border-b border-[#E8E8E8]">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#001F3F] to-[#D4AF37] flex items-center justify-center">
                        <User size={32} className="text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-[#001F3F]">{child.name}</h2>
                        <p className="text-gray-600">{child.level}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 mb-1">Last Active</p>
                      <p className="font-semibold text-[#001F3F]">{child.lastActive}</p>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-[#F5F5F5] rounded-lg p-4">
                      <p className="text-gray-600 text-sm mb-2">Attendance</p>
                      <p className="text-3xl font-bold text-[#001F3F]">{child.attendance}%</p>
                    </div>
                    <div className="bg-[#F5F5F5] rounded-lg p-4">
                      <p className="text-gray-600 text-sm mb-2">Active Courses</p>
                      <p className="text-3xl font-bold text-[#001F3F]">{child.courses.length}</p>
                    </div>
                    <div className="bg-[#F5F5F5] rounded-lg p-4">
                      <p className="text-gray-600 text-sm mb-2">Avg Progress</p>
                      <p className="text-3xl font-bold text-[#D4AF37]">
                        {Math.round(child.courses.reduce((sum, c) => sum + c.progress, 0) / child.courses.length)}%
                      </p>
                    </div>
                  </div>

                  {/* Courses */}
                  <h3 className="text-lg font-bold text-[#001F3F] mb-4">Course Progress</h3>
                  <div className="space-y-4">
                    {child.courses.map((course, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex justify-between mb-2">
                            <span className="font-semibold text-[#001F3F]">{course.name}</span>
                            <span className="text-sm font-bold text-[#D4AF37]">Grade: {course.grade}</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                          <p className="text-xs text-gray-600 mt-1">{course.progress}% Complete</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'progress' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[#001F3F]">Progress Reports</h2>
              {children.map((child) => (
                <div key={child.id} className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-[#001F3F] mb-4">{child.name} - {child.level}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-[#E8E8E8] rounded-lg p-4">
                      <h4 className="font-semibold text-[#001F3F] mb-3">Weekly Summary</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>✓ Completed 5 lessons</li>
                        <li>✓ Took 3 quizzes</li>
                        <li>✓ Avg quiz score: 82%</li>
                        <li>✓ Study time: 12.5 hours</li>
                      </ul>
                    </div>
                    <div className="border border-[#E8E8E8] rounded-lg p-4">
                      <h4 className="font-semibold text-[#001F3F] mb-3">Areas to Focus</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Geometry (70% - Needs improvement)</li>
                        <li>• Organic Chemistry (65% - Practice more)</li>
                        <li>• Algebra (85% - Good progress!)</li>
                      </ul>
                    </div>
                  </div>
                  <Button className="mt-4 bg-[#001F3F] hover:bg-[#000814] text-white w-full">
                    Download Full Report
                  </Button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'communication' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[#001F3F]">Messages from Teachers</h2>
              {[
                {
                  teacher: 'Mr. Johnson',
                  subject: 'Mathematics Progress',
                  message: 'Sarah has been doing exceptionally well in Mathematics. Her recent quiz score was 92%!',
                  date: '2 days ago',
                  type: 'positive',
                },
                {
                  teacher: 'Ms. Smith',
                  subject: 'Chemistry - Needs Support',
                  message: 'James would benefit from additional practice in Organic Chemistry. I recommend 2-3 extra sessions per week.',
                  date: '1 day ago',
                  type: 'warning',
                },
              ].map((msg, idx) => (
                <div key={idx} className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-[#D4AF37]">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-[#001F3F]">{msg.teacher}</h3>
                      <p className="text-sm text-gray-600">{msg.subject}</p>
                    </div>
                    <span className="text-xs text-gray-500">{msg.date}</span>
                  </div>
                  <p className="text-gray-700 mb-4">{msg.message}</p>
                  <Button className="bg-[#001F3F] hover:bg-[#000814] text-white flex items-center space-x-2">
                    <MessageSquare size={16} />
                    <span>Reply</span>
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
