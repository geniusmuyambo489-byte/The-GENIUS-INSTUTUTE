import { useState } from 'react';
import { useAuth } from '@/_core/hooks/useAuth';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Users, BookOpen, BarChart3, Settings, LogOut, Menu, X } from 'lucide-react';
import { toast } from 'sonner';
import { trpc } from '@/lib/trpc';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

type AdminTab = 'overview' | 'users' | 'courses' | 'analytics' | 'settings';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Redirect if not admin
  if (user && user.role !== 'admin') {
    setLocation('/');
    return null;
  }

  const handleLogout = async () => {
    await logout();
    setLocation('/');
  };

  const menuItems = [
    { id: 'overview' as AdminTab, label: 'Overview', icon: BarChart3 },
    { id: 'users' as AdminTab, label: 'Users', icon: Users },
    { id: 'courses' as AdminTab, label: 'Courses', icon: BookOpen },
    { id: 'analytics' as AdminTab, label: 'Analytics', icon: BarChart3 },
    { id: 'settings' as AdminTab, label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />

      <div className="flex flex-1 bg-gray-100 pt-16">
        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40 mt-16"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          } fixed lg:static w-64 h-screen bg-[#001F3F] text-white transition-transform duration-300 z-50 lg:z-auto overflow-y-auto`}
        >
          <div className="p-4 flex items-center justify-between sticky top-0 bg-[#001F3F]">
            <h2 className="text-lg font-bold">Admin Panel</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 hover:bg-[#D4AF37] hover:text-[#001F3F] rounded"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="mt-8 space-y-2 px-2 pb-20">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left ${
                    activeTab === item.id
                      ? 'bg-[#D4AF37] text-[#001F3F]'
                      : 'hover:bg-[#003d7a]'
                  }`}
                >
                  <Icon size={20} className="flex-shrink-0" />
                  <span className="text-sm md:text-base">{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="absolute bottom-4 left-2 right-2">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-red-600 transition-colors"
            >
              <LogOut size={20} className="flex-shrink-0" />
              <span className="text-sm md:text-base">Logout</span>
            </button>
          </div>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden fixed top-20 left-4 z-40 p-2 bg-[#001F3F] text-white rounded-lg hover:bg-[#D4AF37] hover:text-[#001F3F]"
        >
          <Menu size={24} />
        </button>

        {/* Main Content */}
        <div className="flex-1 overflow-auto w-full">
          <div className="p-4 md:p-8 ml-0 lg:ml-0">
            {activeTab === 'overview' && <OverviewTab />}
            {activeTab === 'users' && <UsersTab />}
            {activeTab === 'courses' && <CoursesTab />}
            {activeTab === 'analytics' && <AnalyticsTab />}
            {activeTab === 'settings' && <SettingsTab />}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

// Overview Tab
function OverviewTab() {
  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-[#001F3F] mb-6 md:mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
        <Card className="p-4 md:p-6 bg-white shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-xs md:text-sm font-semibold">Total Users</p>
              <p className="text-2xl md:text-3xl font-bold text-[#001F3F] mt-2">1,234</p>
            </div>
            <Users className="w-8 md:w-12 h-8 md:h-12 text-[#D4AF37] flex-shrink-0" />
          </div>
        </Card>

        <Card className="p-4 md:p-6 bg-white shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-xs md:text-sm font-semibold">Active Courses</p>
              <p className="text-2xl md:text-3xl font-bold text-[#001F3F] mt-2">24</p>
            </div>
            <BookOpen className="w-8 md:w-12 h-8 md:h-12 text-[#D4AF37] flex-shrink-0" />
          </div>
        </Card>

        <Card className="p-4 md:p-6 bg-white shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-xs md:text-sm font-semibold">Enrollments</p>
              <p className="text-2xl md:text-3xl font-bold text-[#001F3F] mt-2">5,678</p>
            </div>
            <BarChart3 className="w-8 md:w-12 h-8 md:h-12 text-[#D4AF37] flex-shrink-0" />
          </div>
        </Card>

        <Card className="p-4 md:p-6 bg-white shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-xs md:text-sm font-semibold">Revenue</p>
              <p className="text-2xl md:text-3xl font-bold text-[#001F3F] mt-2">$12.5K</p>
            </div>
            <BarChart3 className="w-8 md:w-12 h-8 md:h-12 text-[#D4AF37] flex-shrink-0" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <Card className="p-4 md:p-6 bg-white shadow-sm">
          <h2 className="text-base md:text-lg font-bold text-[#001F3F] mb-4">Recent Users</h2>
          <div className="space-y-3">
            {[
              { name: 'John Doe', email: 'john@example.com', role: 'student' },
              { name: 'Jane Smith', email: 'jane@example.com', role: 'teacher' },
              { name: 'Bob Johnson', email: 'bob@example.com', role: 'parent' },
            ].map((user, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div className="min-w-0">
                  <p className="font-semibold text-[#001F3F] text-sm md:text-base truncate">{user.name}</p>
                  <p className="text-xs md:text-sm text-gray-600 truncate">{user.email}</p>
                </div>
                <span className="px-2 md:px-3 py-1 bg-[#D4AF37] text-[#001F3F] text-xs font-semibold rounded flex-shrink-0 ml-2">
                  {user.role}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4 md:p-6 bg-white shadow-sm">
          <h2 className="text-base md:text-lg font-bold text-[#001F3F] mb-4">Popular Courses</h2>
          <div className="space-y-3">
            {[
              { name: 'Mathematics O-Level', students: 234 },
              { name: 'Physics A-Level', students: 189 },
              { name: 'Chemistry O-Level', students: 156 },
            ].map((course, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <p className="font-semibold text-[#001F3F] text-sm md:text-base truncate">{course.name}</p>
                <span className="text-xs md:text-sm text-gray-600 flex-shrink-0 ml-2">{course.students}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// Users Tab
function UsersTab() {
  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#001F3F]">User Management</h1>
        <Button className="w-full sm:w-auto bg-[#001F3F] hover:bg-[#D4AF37] hover:text-[#001F3F] text-white text-sm md:text-base">
          Add New User
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Card className="bg-white shadow-sm">
          <table className="w-full min-w-max">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-3 md:px-6 py-3 text-left text-xs md:text-sm font-semibold text-[#001F3F]">Name</th>
                <th className="px-3 md:px-6 py-3 text-left text-xs md:text-sm font-semibold text-[#001F3F] hidden sm:table-cell">Email</th>
                <th className="px-3 md:px-6 py-3 text-left text-xs md:text-sm font-semibold text-[#001F3F]">Role</th>
                <th className="px-3 md:px-6 py-3 text-left text-xs md:text-sm font-semibold text-[#001F3F]">Status</th>
                <th className="px-3 md:px-6 py-3 text-left text-xs md:text-sm font-semibold text-[#001F3F]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { name: 'John Doe', email: 'john@example.com', role: 'student', status: 'Active' },
                { name: 'Jane Smith', email: 'jane@example.com', role: 'teacher', status: 'Active' },
                { name: 'Bob Johnson', email: 'bob@example.com', role: 'parent', status: 'Inactive' },
                { name: 'Alice Brown', email: 'alice@example.com', role: 'student', status: 'Active' },
              ].map((user, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-gray-900 font-medium">{user.name}</td>
                  <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-gray-600 hidden sm:table-cell">{user.email}</td>
                  <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm">
                    <span className="px-2 md:px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded inline-block">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm">
                    <span
                      className={`px-2 md:px-3 py-1 text-xs font-semibold rounded inline-block ${
                        user.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm space-x-1 md:space-x-2">
                    <button className="text-[#D4AF37] hover:text-[#001F3F] font-semibold">Edit</button>
                    <button className="text-red-600 hover:text-red-800 font-semibold">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}

// Courses Tab
function CoursesTab() {
  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#001F3F]">Course Management</h1>
        <Button className="w-full sm:w-auto bg-[#001F3F] hover:bg-[#D4AF37] hover:text-[#001F3F] text-white text-sm md:text-base">
          Create New Course
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
        {[
          { title: 'Mathematics O-Level', students: 234, lessons: 45 },
          { title: 'Physics A-Level', students: 189, lessons: 38 },
          { title: 'Chemistry O-Level', students: 156, lessons: 42 },
          { title: 'Biology A-Level', students: 123, lessons: 35 },
          { title: 'English Literature', students: 98, lessons: 28 },
          { title: 'History O-Level', students: 87, lessons: 32 },
        ].map((course, idx) => (
          <Card key={idx} className="p-4 md:p-6 bg-white shadow-sm hover:shadow-lg transition-shadow">
            <h3 className="text-sm md:text-lg font-bold text-[#001F3F] mb-4 line-clamp-2">{course.title}</h3>
            <div className="space-y-2 mb-4 text-xs md:text-sm">
              <p className="text-gray-600">
                <strong>Students:</strong> {course.students}
              </p>
              <p className="text-gray-600">
                <strong>Lessons:</strong> {course.lessons}
              </p>
            </div>
            <div className="flex gap-2">
              <Button className="flex-1 bg-[#001F3F] hover:bg-[#D4AF37] hover:text-[#001F3F] text-white text-xs md:text-sm py-2">
                Edit
              </Button>
              <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs md:text-sm py-2">
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Analytics Tab
function AnalyticsTab() {
  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-[#001F3F] mb-6 md:mb-8">Analytics</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <Card className="p-4 md:p-6 bg-white shadow-sm">
          <h2 className="text-base md:text-lg font-bold text-[#001F3F] mb-4">User Growth</h2>
          <div className="h-48 md:h-64 bg-gray-100 rounded flex items-center justify-center">
            <p className="text-xs md:text-sm text-gray-500">Chart placeholder</p>
          </div>
        </Card>

        <Card className="p-4 md:p-6 bg-white shadow-sm">
          <h2 className="text-base md:text-lg font-bold text-[#001F3F] mb-4">Course Enrollment</h2>
          <div className="h-48 md:h-64 bg-gray-100 rounded flex items-center justify-center">
            <p className="text-xs md:text-sm text-gray-500">Chart placeholder</p>
          </div>
        </Card>

        <Card className="p-4 md:p-6 bg-white shadow-sm">
          <h2 className="text-base md:text-lg font-bold text-[#001F3F] mb-4">Student Engagement</h2>
          <div className="h-48 md:h-64 bg-gray-100 rounded flex items-center justify-center">
            <p className="text-xs md:text-sm text-gray-500">Chart placeholder</p>
          </div>
        </Card>

        <Card className="p-4 md:p-6 bg-white shadow-sm">
          <h2 className="text-base md:text-lg font-bold text-[#001F3F] mb-4">Revenue Trends</h2>
          <div className="h-48 md:h-64 bg-gray-100 rounded flex items-center justify-center">
            <p className="text-xs md:text-sm text-gray-500">Chart placeholder</p>
          </div>
        </Card>
      </div>
    </div>
  );
}

// Settings Tab
function SettingsTab() {
  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-[#001F3F] mb-6 md:mb-8">Settings</h1>

      <Card className="p-4 md:p-6 bg-white shadow-sm max-w-2xl">
        <div className="space-y-6">
          <div>
            <label className="block text-xs md:text-sm font-semibold text-[#001F3F] mb-2">
              Platform Name
            </label>
            <input
              type="text"
              defaultValue="The Genius Institute"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#D4AF37] text-sm md:text-base"
            />
          </div>

          <div>
            <label className="block text-xs md:text-sm font-semibold text-[#001F3F] mb-2">
              Support Email
            </label>
            <input
              type="email"
              defaultValue="support@thegeniusinstitute.co.zw"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#D4AF37] text-sm md:text-base"
            />
          </div>

          <div>
            <label className="block text-xs md:text-sm font-semibold text-[#001F3F] mb-2">
              Max Students Per Class
            </label>
            <input
              type="number"
              defaultValue="50"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#D4AF37] text-sm md:text-base"
            />
          </div>

          <Button className="w-full bg-[#001F3F] hover:bg-[#D4AF37] hover:text-[#001F3F] text-white text-sm md:text-base">
            Save Settings
          </Button>
        </div>
      </Card>
    </div>
  );
}
