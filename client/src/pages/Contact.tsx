import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';
import { CheckCircle2, Loader2, ArrowRight } from 'lucide-react';

type FormStep = 1 | 2 | 3 | 4;

interface FormData {
  studentName: string;
  institution: string;
  currentLevel: string;
  subject: string;
  challenges: string;
  preferredStart: string;
  budgetRange: string;
  email: string;
  phone: string;
  preferredContact: string;
}

export default function Contact() {
  const [currentStep, setCurrentStep] = useState<FormStep>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    studentName: '',
    institution: '',
    currentLevel: '',
    subject: '',
    challenges: '',
    preferredStart: '',
    budgetRange: '',
    email: '',
    phone: '',
    preferredContact: '',
  });

  const submitFormMutation = trpc.forms.submitLeadForm.useMutation();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateStep = (step: FormStep): boolean => {
    switch (step) {
      case 1:
        if (!formData.studentName.trim()) {
          toast.error('Please enter your name');
          return false;
        }
        if (!formData.institution.trim()) {
          toast.error('Please enter your institution');
          return false;
        }
        if (!formData.currentLevel) {
          toast.error('Please select your current level');
          return false;
        }
        return true;
      case 2:
        if (!formData.subject) {
          toast.error('Please select a subject');
          return false;
        }
        if (formData.challenges.trim().length < 10) {
          toast.error('Please describe your challenges in more detail');
          return false;
        }
        return true;
      case 3:
        if (!formData.preferredStart) {
          toast.error('Please select your preferred start date');
          return false;
        }
        if (!formData.budgetRange) {
          toast.error('Please select your budget range');
          return false;
        }
        return true;
      case 4:
        if (!formData.email.includes('@')) {
          toast.error('Please enter a valid email');
          return false;
        }
        if (formData.phone.trim().length < 7) {
          toast.error('Please enter a valid phone number');
          return false;
        }
        if (!formData.preferredContact) {
          toast.error('Please select your preferred contact method');
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((currentStep + 1) as FormStep);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as FormStep);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(4)) return;

    setIsSubmitting(true);
    try {
      // Map form values to match backend expectations
      const submissionData = {
        studentName: formData.studentName,
        institution: formData.institution,
        currentLevel: formData.currentLevel === 'ordinary' ? 'Ordinary Level' : 'Advanced Level',
        subject: formData.subject.charAt(0).toUpperCase() + formData.subject.slice(1),
        challenges: formData.challenges,
        preferredStart: formData.preferredStart.charAt(0).toUpperCase() + formData.preferredStart.slice(1),
        budgetRange: formData.budgetRange,
        email: formData.email,
        phone: formData.phone,
        preferredContact: formData.preferredContact,
      };

      await submitFormMutation.mutateAsync(submissionData);
      setSubmitted(true);
      toast.success('Form submitted successfully! We will contact you soon.');
    } catch (error: any) {
      toast.error(error.message || 'Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const progressPercentage = ((currentStep - 1) / 4) * 100;

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navigation />
        <div className="flex-1 flex items-center justify-center py-20">
          <div className="container max-w-2xl">
            <Card className="p-12 text-center">
              <div className="flex justify-center mb-6">
                <CheckCircle2 size={64} className="text-[#D4AF37]" />
              </div>
              <h1 className="font-playfair text-4xl font-bold text-gray-900 mb-4">
                Thank You!
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Your inquiry has been received. Our team will contact you shortly to discuss your academic goals and create a personalized coaching plan.
              </p>
              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <p className="text-gray-700 mb-2">
                  <strong>Phone:</strong> 0788335945
                </p>
                <p className="text-gray-700">
                  <strong>Email:</strong> thegeniusinstitutecozw@gmail.com
                </p>
              </div>
              <Button
                onClick={() => window.location.href = '/'}
                className="bg-gradient-to-r from-[#2D1B4E] to-[#3A3A3A]"
              >
                Return to Home
              </Button>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#2D1B4E] via-[#3A3A3A] to-[#1A1A1A] text-white py-20">
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-6">
            Get Started Today
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Tell us about your academic goals and let's create a personalized coaching plan.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20">
        <div className="container max-w-2xl">
          {/* Progress Indicator */}
          <div className="mb-12">
            <div className="flex justify-between mb-4">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-all ${
                    step <= currentStep
                      ? 'bg-[#D4AF37] text-[#2D1B4E]'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-[#2D1B4E] to-[#D4AF37] h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          <Card className="p-8">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Student Info */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                  <div>
                    <h2 className="font-playfair text-2xl font-bold mb-6 text-gray-900">
                      Student Information
                    </h2>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Student Name *
                    </label>
                    <Input
                      type="text"
                      name="studentName"
                      value={formData.studentName}
                      onChange={handleInputChange}
                      placeholder="Enter full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Institution/School *
                    </label>
                    <Input
                      type="text"
                      name="institution"
                      value={formData.institution}
                      onChange={handleInputChange}
                      placeholder="Enter school or institution name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Current Academic Level *
                    </label>
                    <Select
                      value={formData.currentLevel}
                      onValueChange={(value) =>
                        handleSelectChange('currentLevel', value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ordinary">Ordinary Level</SelectItem>
                        <SelectItem value="advanced">Advanced Level</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Step 2: Subject & Challenges */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                  <div>
                    <h2 className="font-playfair text-2xl font-bold mb-6 text-gray-900">
                      Academic Challenges
                    </h2>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject of Interest *
                    </label>
                    <Select
                      value={formData.subject}
                      onValueChange={(value) =>
                        handleSelectChange('subject', value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mathematics">Mathematics</SelectItem>
                        <SelectItem value="science">Science</SelectItem>
                        <SelectItem value="chemistry">Chemistry</SelectItem>
                        <SelectItem value="physics">Physics</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Describe Your Challenges *
                    </label>
                    <Textarea
                      name="challenges"
                      value={formData.challenges}
                      onChange={handleInputChange}
                      placeholder="Tell us about specific topics or areas where you need help..."
                      rows={5}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {formData.challenges.length}/10 characters minimum
                    </p>
                  </div>
                </div>
              )}

              {/* Step 3: Timeline & Budget */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                  <div>
                    <h2 className="font-playfair text-2xl font-bold mb-6 text-gray-900">
                      Timeline & Budget
                    </h2>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Preferred Start Date *
                    </label>
                    <Select
                      value={formData.preferredStart}
                      onValueChange={(value) =>
                        handleSelectChange('preferredStart', value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select start date" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediately">Immediately</SelectItem>
                        <SelectItem value="next week">Within 1 week</SelectItem>
                        <SelectItem value="next month">Within 1 month</SelectItem>
                        <SelectItem value="flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Budget Range *
                    </label>
                    <Select
                      value={formData.budgetRange}
                      onValueChange={(value) =>
                        handleSelectChange('budgetRange', value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="$50-100 per session">
                          $50-100 per session
                        </SelectItem>
                        <SelectItem value="$100-200 per session">
                          $100-200 per session
                        </SelectItem>
                        <SelectItem value="$200-300 per session">
                          $200-300 per session
                        </SelectItem>
                        <SelectItem value="$300+ per session">
                          $300+ per session
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Step 4: Contact Details */}
              {currentStep === 4 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                  <div>
                    <h2 className="font-playfair text-2xl font-bold mb-6 text-gray-900">
                      Contact Information
                    </h2>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Your phone number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Preferred Contact Method *
                    </label>
                    <Select
                      value={formData.preferredContact}
                      onValueChange={(value) =>
                        handleSelectChange('preferredContact', value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select preference" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="phone">Phone</SelectItem>
                        <SelectItem value="whatsapp">WhatsApp</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-12 pt-8 border-t border-gray-200">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrev}
                  disabled={currentStep === 1}
                  className="border-2 border-[#2D1B4E] text-[#2D1B4E] hover:bg-[#2D1B4E] hover:text-white disabled:opacity-50"
                >
                  Previous
                </Button>

                {currentStep < 4 ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="bg-gradient-to-r from-[#2D1B4E] to-[#3A3A3A] hover:shadow-lg"
                  >
                    Next
                    <ArrowRight className="ml-2" size={18} />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#D4AF37] text-[#2D1B4E] hover:bg-[#E8D4A8] font-semibold"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 animate-spin" size={18} />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit
                        <ArrowRight className="ml-2" size={18} />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </form>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
