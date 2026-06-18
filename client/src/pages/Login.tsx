import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { trpc } from '@/lib/trpc';

export default function Login() {
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const loginMutation = trpc.auth.login.useMutation();
  const utils = trpc.useUtils();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.email.trim()) {
      toast.error('Please enter your email');
      return;
    }
    if (!formData.password) {
      toast.error('Please enter your password');
      return;
    }

    setLoading(true);

    try {
      const result = await loginMutation.mutateAsync({
        email: formData.email,
        password: formData.password,
      });

      // Refresh auth state
      await utils.auth.me.invalidate();

      toast.success('Logged in successfully!');
      
      // Redirect based on role
      setTimeout(() => {
        if (result.role === 'student') {
          setLocation('/student-dashboard');
        } else if (result.role === 'teacher') {
          setLocation('/teacher-dashboard');
        } else if (result.role === 'parent') {
          setLocation('/parent-dashboard');
        } else {
          setLocation('/');
        }
      }, 500);
    } catch (error: any) {
      const errorMessage = error?.message || 'Invalid email or password';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F5]">
      <Navigation />

      <div className="flex-1 py-12">
        <div className="container max-w-md">
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-[#001F3F] mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-600">
                Log in to continue your learning journey
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  className="w-full px-4 py-2 rounded-lg border border-[#E8E8E8] focus:outline-none focus:border-[#001F3F] focus:ring-2 focus:ring-[#001F3F]/10"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className="w-full px-4 py-2 rounded-lg border border-[#E8E8E8] focus:outline-none focus:border-[#001F3F] focus:ring-2 focus:ring-[#001F3F]/10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-gray-500 hover:text-[#001F3F]"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-[#001F3F]"
                  />
                  <span className="text-sm text-gray-700">Remember me</span>
                </label>
                <Link href="/forgot-password">
                  <span className="text-sm text-[#001F3F] hover:text-[#D4AF37] cursor-pointer font-semibold">
                    Forgot password?
                  </span>
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading || loginMutation.isPending}
                className="w-full bg-[#001F3F] hover:bg-[#000814] text-white font-semibold py-2 mt-6"
              >
                {loading || loginMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin inline" />
                    Logging in...
                  </>
                ) : (
                  'Log In'
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E8E8E8]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or</span>
              </div>
            </div>

            {/* Demo Login */}
            <div className="bg-[#F5F5F5] rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-3">
                <strong>Demo Credentials:</strong>
              </p>
              <p className="text-xs text-gray-600 mb-1">
                Email: demo@thegeniusinstitute.com
              </p>
              <p className="text-xs text-gray-600">
                Password: Demo123456
              </p>
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-gray-600 text-sm">
              Don't have an account?{' '}
              <Link href="/signup">
                <span className="text-[#001F3F] font-semibold hover:text-[#D4AF37] cursor-pointer">
                  Sign up here
                </span>
              </Link>
            </p>
          </div>

          {/* Additional Info */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            {[
              { title: 'Expert Teachers', icon: '👨‍🏫' },
              { title: 'AI Tutors', icon: '🤖' },
              { title: 'Live Support', icon: '💬' },
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-2xl mb-2">{item.icon}</div>
                <p className="text-xs font-semibold text-[#001F3F]">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
