import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { BookOpen, Users, Heart, ArrowRight, Eye, EyeOff, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { trpc } from '@/lib/trpc';

type UserRole = 'student' | 'teacher' | 'parent';

export default function Signup() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState<'role' | 'form'>('role');
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    school: '',
    level: '',
  });

  const signupMutation = trpc.auth.signup.useMutation();

  const roles = [
    {
      id: 'student' as UserRole,
      title: 'I am a Student',
      description: 'Learn from expert teachers and AI tutors',
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 'teacher' as UserRole,
      title: 'I am a Teacher',
      description: 'Create courses and teach students',
      icon: Users,
      color: 'from-purple-500 to-purple-600',
    },
    {
      id: 'parent' as UserRole,
      title: 'I am a Parent',
      description: 'Track your child\'s progress',
      icon: Heart,
      color: 'from-pink-500 to-pink-600',
    },
  ];

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setStep('form');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      toast.error('Please enter your name');
      return;
    }
    if (!formData.email.trim()) {
      toast.error('Please enter your email');
      return;
    }
    if (!formData.password) {
      toast.error('Please enter a password');
      return;
    }
    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (!formData.school.trim()) {
      toast.error('Please enter your school/institution');
      return;
    }
    if (selectedRole === 'student' && !formData.level) {
      toast.error('Please select your current level');
      return;
    }

    setLoading(true);

    try {
      await signupMutation.mutateAsync({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: selectedRole!,
        school: formData.school,
        level: selectedRole === 'student' ? formData.level : undefined,
      });

      toast.success('Account created successfully! Please log in.');
      setTimeout(() => {
        setLocation('/login');
      }, 1500);
    } catch (error: any) {
      const errorMessage = error?.message || 'Failed to create account. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F5]">
      <Navigation />

      <div className="flex-1 py-12">
        <div className="container max-w-4xl">
          {step === 'role' ? (
            <div>
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-[#001F3F] mb-3">Join The Genius Institute</h1>
                <p className="text-lg text-gray-600">Choose your role to get started</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {roles.map((role) => {
                  const Icon = role.icon;
                  return (
                    <button
                      key={role.id}
                      onClick={() => handleRoleSelect(role.id)}
                      className="p-6 bg-white rounded-xl border-2 border-gray-200 hover:border-[#D4AF37] hover:shadow-lg transition-all text-left"
                    >
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${role.color} flex items-center justify-center mb-4`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-[#001F3F] mb-2">{role.title}</h3>
                      <p className="text-gray-600 text-sm">{role.description}</p>
                      <div className="mt-4 flex items-center text-[#D4AF37] font-semibold">
                        Get Started <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-8">
                <button
                  onClick={() => setStep('role')}
                  className="text-[#D4AF37] hover:text-[#001F3F] font-semibold flex items-center"
                >
                  ← Back to Role Selection
                </button>
              </div>

              <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-[#001F3F] mb-6">
                  Create Your Account
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#001F3F] mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#001F3F] mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#001F3F] mb-2">School/Institution</label>
                    <input
                      type="text"
                      name="school"
                      value={formData.school}
                      onChange={handleInputChange}
                      placeholder="Enter your school name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  {selectedRole === 'student' && (
                    <div>
                      <label className="block text-sm font-semibold text-[#001F3F] mb-2">Current Level</label>
                      <select
                        name="level"
                        value={formData.level}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#D4AF37]"
                      >
                        <option value="">Select your level</option>
                        <option value="primary">Primary</option>
                        <option value="form1">Form 1</option>
                        <option value="form2">Form 2</option>
                        <option value="form3">Form 3</option>
                        <option value="form4">Form 4 (O-Level)</option>
                        <option value="form5">Form 5 (A-Level)</option>
                        <option value="form6">Form 6 (A-Level)</option>
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-semibold text-[#001F3F] mb-2">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="At least 8 characters"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#D4AF37]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#001F3F] mb-2">Confirm Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm your password"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading || signupMutation.isPending}
                    className="w-full bg-[#001F3F] hover:bg-[#D4AF37] hover:text-[#001F3F] text-white py-2 rounded-lg font-semibold transition-colors"
                  >
                    {loading || signupMutation.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      'Create Account'
                    )}
                  </Button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-6">
                  Already have an account?{' '}
                  <Link href="/login" className="text-[#D4AF37] hover:text-[#001F3F] font-semibold">
                    Log in
                  </Link>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
