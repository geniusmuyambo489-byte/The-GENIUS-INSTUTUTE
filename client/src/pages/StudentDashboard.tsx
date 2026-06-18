import { useState } from 'react';
import { useAuth } from '@/_core/hooks/useAuth';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { BookOpen, Award, TrendingUp, Clock, Play, CheckCircle, Settings, LogOut } from 'lucide-react';
import { Link } from 'wouter';
import { trpc } from '@/lib/trpc';

export default function StudentDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Fetch courses from database
  const { data: coursesData = [], isLoading } = trpc.courses.getAll.useQuery();

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

  // Transform database courses to display format
  const courses = coursesData.slice(0, 3).map((course, idx) => ({
    id: course.id,
    name: course.title,
    subject: course.subject,
    level: course.level,
    progress: 30 + (idx * 20),
    lessons: course.totalLessons || 10,
    completed: Math.floor((course.totalLessons || 10) * (0.3 + idx * 0.2)),
    nextLesson: `Lesson ${idx + 1}`,
  }));

  const achievements = [
    { icon: '🏆', title: 'Quiz Master', description: 'Completed 10 quizzes' },
    { icon: '🔥', title: '7-Day Streak', description: 'Learned 7 days in a row' },
    { icon: '⭐', title: 'Perfect Score', description: 'Got 100% on a quiz' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F5]">
      <Navigation />

      <div className="flex-1">
        <div className="container px-4 md:px-6 py-4 md:py-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
            <div>
              <h1 className="text-2xl md:text-4xl font-bold text-[#001F3F] mb-2">
                Welcome back, {user.name}! 👋
              </h1>
              <p className="text-sm md:text-base text-gray-600">
                Keep up the momentum with your learning journey
              </p>
            </div>
            <button
              onClick={() => logout()}
              className="flex items-center space-x-2 px-3 md:px-4 py-2 rounded-lg bg-white border border-[#E8E8E8] hover:bg-gray-50 transition-colors text-sm md:text-base whitespace-nowrap"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
            {[
              { icon: BookOpen, label: 'Courses Available', value: coursesData.length.toString(), color: 'bg-blue-100' },
              { icon: TrendingUp, label: 'Avg Progress', value: '63%', color: 'bg-green-100' },
              { icon: Award, label: 'Achievements', value: '3', color: 'bg-purple-100' },
              { icon: Clock, label: 'Hours Learned', value: '24.5', color: 'bg-orange-100' },
            ].map((stat, idx) => (
              <div key={idx} className="bg-white rounded-lg p-4 md:p-6 shadow-sm">
                <div className={`${stat.color} w-10 md:w-12 h-10 md:h-12 rounded-lg flex items-center justify-center mb-3 md:mb-4`}>
                  <stat.icon size={20} className="text-[#001F3F]" />
                </div>
                <p className="text-gray-600 text-xs md:text-sm mb-1">{stat.label}</p>
                <p className="text-2xl md:text-3xl font-bold text-[#001F3F]">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex space-x-2 md:space-x-4 mb-6 md:mb-8 border-b border-[#E8E8E8] overflow-x-auto">
            {[
              { id: 'dashboard', label: 'My Courses' },
              { id: 'achievements', label: 'Achievements' },
              { id: 'settings', label: 'Settings' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 md:px-4 py-3 font-semibold border-b-2 transition-colors text-sm md:text-base whitespace-nowrap ${
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
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Courses */}
              <div className="lg:col-span-2 space-y-6">
                <h2 className="text-2xl font-bold text-[#001F3F]">Your Courses</h2>
                {isLoading ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600">Loading courses...</p>
                  </div>
                ) : courses.length > 0 ? (
                  courses.map((course) => (
                    <div key={course.id} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-[#001F3F] mb-1">{course.name}</h3>
                          <p className="text-gray-600 text-sm">
                            {course.completed} of {course.lessons} lessons completed • {course.level}
                          </p>
                        </div>
                        <span className="text-2xl font-bold text-[#D4AF37]">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="mb-4 h-2" />
                      <div className="flex items-center justify-between">
                        <p className="text-gray-600 text-sm">
                          <strong>Next:</strong> {course.nextLesson}
                        </p>
                        <button className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-[#001F3F] text-white hover:bg-[#000814] transition-colors">
                          <Play size={16} />
                          <span>Continue</span>
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-white rounded-lg p-8 text-center">
                    <p className="text-gray-600">No courses available yet.</p>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-[#001F3F] mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {[
                      { time: '2 hours ago', action: 'Completed Quiz: Algebra' },
                      { time: '1 day ago', action: 'Watched: Geometry Basics' },
                      { time: '2 days ago', action: 'Earned: Quiz Master Badge' },
                    ].map((activity, idx) => (
                      <div key={idx} className="pb-3 border-b border-[#E8E8E8] last:border-0">
                        <p className="text-sm text-gray-600">{activity.time}</p>
                        <p className="text-sm font-semibold text-[#001F3F]">{activity.action}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#001F3F] to-[#000814] text-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-bold mb-2">Upgrade to Premium</h3>
                  <p className="text-sm text-gray-300 mb-4">
                    Get unlimited access to all courses and priority AI tutor support.
                  </p>
                  <Button className="w-full bg-[#D4AF37] text-[#001F3F] hover:bg-[#E8D4A8] font-semibold">
                    Upgrade Now
                  </Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div>
              <h2 className="text-2xl font-bold text-[#001F3F] mb-6">Your Achievements</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {achievements.map((achievement, idx) => (
                  <div key={idx} className="bg-white rounded-lg p-8 text-center shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-6xl mb-4">{achievement.icon}</div>
                    <h3 className="text-lg font-bold text-[#001F3F] mb-2">{achievement.title}</h3>
                    <p className="text-gray-600 text-sm">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold text-[#001F3F] mb-6">Settings</h2>
              <div className="bg-white rounded-lg p-6 shadow-sm space-y-6">
                <div className="border-b border-[#E8E8E8] pb-6">
                  <h3 className="text-lg font-bold text-[#001F3F] mb-2">Profile Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                      <input
                        type="text"
                        value={user.name || ''}
                        disabled
                        className="w-full px-4 py-2 rounded-lg border border-[#E8E8E8] bg-gray-50 text-gray-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={user.email || ''}
                        disabled
                        className="w-full px-4 py-2 rounded-lg border border-[#E8E8E8] bg-gray-50 text-gray-600"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#001F3F] mb-4">Preferences</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Email notifications', checked: true },
                      { label: 'Learning reminders', checked: true },
                      { label: 'Weekly progress report', checked: false },
                    ].map((pref, idx) => (
                      <label key={idx} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked={pref.checked}
                          className="w-4 h-4 rounded border-gray-300 text-[#001F3F]"
                        />
                        <span className="text-gray-700">{pref.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
