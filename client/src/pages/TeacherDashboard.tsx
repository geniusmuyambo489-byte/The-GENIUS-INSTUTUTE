import { useState } from 'react';
import { useAuth } from '@/_core/hooks/useAuth';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Users, BookOpen, BarChart3, Plus, LogOut, Settings, Trash2 } from 'lucide-react';
import { Link } from 'wouter';

export default function TeacherDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('classes');
  const [showUploadForm, setShowUploadForm] = useState(false);

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

  const classes = [
    {
      id: 1,
      name: 'Mathematics O-Level',
      subject: 'Mathematics',
      level: 'O-Level',
      students: 24,
      lessons: 12,
      avgScore: 78,
    },
    {
      id: 2,
      name: 'Chemistry A-Level',
      subject: 'Chemistry',
      level: 'A-Level',
      students: 18,
      lessons: 15,
      avgScore: 82,
    },
  ];

  const lessons = [
    {
      id: 1,
      title: 'Quadratic Equations',
      subject: 'Mathematics',
      students: 24,
      completed: 18,
      avgScore: 76,
    },
    {
      id: 2,
      title: 'Algebra Basics',
      subject: 'Mathematics',
      students: 24,
      completed: 22,
      avgScore: 81,
    },
    {
      id: 3,
      title: 'Organic Chemistry',
      subject: 'Chemistry',
      students: 18,
      completed: 12,
      avgScore: 79,
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
                Teacher Dashboard
              </h1>
              <p className="text-gray-600">
                Manage your classes, lessons, and track student progress
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

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[
              { icon: Users, label: 'Total Students', value: '42', color: 'bg-blue-100' },
              { icon: BookOpen, label: 'Classes', value: '2', color: 'bg-green-100' },
              { icon: BarChart3, label: 'Avg Score', value: '79%', color: 'bg-purple-100' },
              { icon: Plus, label: 'Lessons Created', value: '8', color: 'bg-orange-100' },
            ].map((stat, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6 shadow-sm">
                <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  <stat.icon size={24} className="text-[#001F3F]" />
                </div>
                <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-[#001F3F]">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex space-x-4 mb-8 border-b border-[#E8E8E8]">
            {[
              { id: 'classes', label: 'My Classes' },
              { id: 'lessons', label: 'Lessons' },
              { id: 'students', label: 'Students' },
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
          {activeTab === 'classes' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#001F3F]">My Classes</h2>
                <Button className="bg-[#001F3F] hover:bg-[#000814] text-white flex items-center space-x-2">
                  <Plus size={18} />
                  <span>Create Class</span>
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {classes.map((cls) => (
                  <div key={cls.id} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-[#001F3F] mb-1">{cls.name}</h3>
                        <p className="text-gray-600 text-sm">{cls.subject} • {cls.level}</p>
                      </div>
                      <span className="text-2xl font-bold text-[#D4AF37]">{cls.avgScore}%</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-gray-600 text-sm">Students</p>
                        <p className="text-2xl font-bold text-[#001F3F]">{cls.students}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Lessons</p>
                        <p className="text-2xl font-bold text-[#001F3F]">{cls.lessons}</p>
                      </div>
                    </div>
                    <Button className="w-full bg-[#001F3F] hover:bg-[#000814] text-white">
                      Manage Class
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'lessons' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#001F3F]">Lessons</h2>
                <Button
                  onClick={() => setShowUploadForm(!showUploadForm)}
                  className="bg-[#001F3F] hover:bg-[#000814] text-white flex items-center space-x-2"
                >
                  <Plus size={18} />
                  <span>Upload Lesson</span>
                </Button>
              </div>

              {showUploadForm && (
                <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
                  <h3 className="text-lg font-bold text-[#001F3F] mb-4">Upload New Lesson</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Lesson Title</label>
                      <input
                        type="text"
                        placeholder="e.g., Quadratic Equations"
                        className="w-full px-4 py-2 rounded-lg border border-[#E8E8E8] focus:outline-none focus:ring-2 focus:ring-[#001F3F]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                        <select className="w-full px-4 py-2 rounded-lg border border-[#E8E8E8] focus:outline-none focus:ring-2 focus:ring-[#001F3F]">
                          <option>Mathematics</option>
                          <option>Chemistry</option>
                          <option>Physics</option>
                          <option>Science</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Level</label>
                        <select className="w-full px-4 py-2 rounded-lg border border-[#E8E8E8] focus:outline-none focus:ring-2 focus:ring-[#001F3F]">
                          <option>O-Level</option>
                          <option>A-Level</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Video/PDF File</label>
                      <input
                        type="file"
                        className="w-full px-4 py-2 rounded-lg border border-[#E8E8E8] focus:outline-none focus:ring-2 focus:ring-[#001F3F]"
                      />
                    </div>
                    <div className="flex space-x-4">
                      <Button className="flex-1 bg-[#001F3F] hover:bg-[#000814] text-white">
                        Upload
                      </Button>
                      <Button
                        onClick={() => setShowUploadForm(false)}
                        className="flex-1 bg-white border border-[#E8E8E8] text-[#001F3F] hover:bg-gray-50"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {lessons.map((lesson) => (
                  <div key={lesson.id} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-[#001F3F] mb-1">{lesson.title}</h3>
                        <p className="text-gray-600 text-sm">{lesson.subject}</p>
                      </div>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Trash2 size={18} className="text-red-500" />
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-gray-600 text-sm">Students</p>
                        <p className="text-xl font-bold text-[#001F3F]">{lesson.students}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Completed</p>
                        <p className="text-xl font-bold text-[#001F3F]">{lesson.completed}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Avg Score</p>
                        <p className="text-xl font-bold text-[#D4AF37]">{lesson.avgScore}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'students' && (
            <div>
              <h2 className="text-2xl font-bold text-[#001F3F] mb-6">Student Management</h2>
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <table className="w-full">
                  <thead className="bg-[#F5F5F5] border-b border-[#E8E8E8]">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-[#001F3F]">Name</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-[#001F3F]">Class</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-[#001F3F]">Progress</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-[#001F3F]">Avg Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'Sarah M.', class: 'Mathematics O-Level', progress: 75, score: 82 },
                      { name: 'James K.', class: 'Chemistry A-Level', progress: 60, score: 78 },
                      { name: 'Amara T.', class: 'Mathematics O-Level', progress: 85, score: 88 },
                    ].map((student, idx) => (
                      <tr key={idx} className="border-b border-[#E8E8E8] hover:bg-[#F5F5F5] transition-colors">
                        <td className="px-6 py-4 text-sm font-semibold text-[#001F3F]">{student.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{student.class}</td>
                        <td className="px-6 py-4 text-sm">
                          <div className="w-24 bg-[#E8E8E8] rounded-full h-2">
                            <div
                              className="bg-[#001F3F] h-2 rounded-full"
                              style={{ width: `${student.progress}%` }}
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm font-bold text-[#D4AF37]">{student.score}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
