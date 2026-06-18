# The Genius Institute - Datacamp-Style Learning Platform MVP

## Project: GeniusLearn HBC Phase 1 (Rebranded from Stratify Consulting)

**Goal:** Build a Datacamp-style learning platform for The Genius Institute with landing page, authentication, and role-based dashboards (student/teacher/parent).

---

## Phase 1: Design System & Rebranding

- [x] Update project name to "The Genius Institute" in package.json and config
- [x] Update color palette: Navy Blue (#001F3F), Gold (#D4AF37), White (#FFFFFF), Light Gray (#F5F5F5)
- [x] Configure Tailwind CSS with new color tokens
- [x] Integrate GeniusLearn HBC logo (/manus-storage/geniuslearn-logo_5e5739f4.jpg)
- [x] Update global styling in index.css with Datacamp-style design tokens
- [x] Create Datacamp-inspired component library (cards, buttons, progress bars, badges)
- [x] Set up Google Fonts (Poppins for UI, Merriweather for headings)

---

## Phase 2: Landing Page

- [x] Hero section with logo, tagline "Aim Higher In Christ", and value proposition
- [x] Features overview (4 key features: Live Lessons, Interactive Quizzes, AI Tutor, Progress Tracking)
- [x] Pricing section ($2/month for students, school licenses available)
- [x] Subject offerings showcase (Math, Science, Chemistry, Physics, Agriculture, Commerce, Heritage Studies)
- [x] Academic levels display (Primary, Form 1-6, O-Level, A-Level)
- [x] CTA buttons (Start Free / Request Demo / Sign In)
- [x] Footer with contact info (hello@thegeniusinstitute.co.zw, +263 788 335945)
- [x] Responsive design (mobile, tablet, desktop)

---

## Phase 3: Authentication System

- [x] Signup page with role selection (Student / Teacher / Parent)
- [ ] Email verification system
- [x] Login page with "Remember me" option
- [ ] Password reset flow
- [x] Database schema for users with role-based access control
- [x] tRPC procedures: auth.signup, auth.login, auth.logout
- [ ] Session management and cookie handling
- [ ] Redirect logic based on user role

---

## Phase 4: Student Dashboard (Datacamp-Style)

- [x] Dashboard home with personalized greeting and quick stats
- [x] Course catalog with filter by subject and level
- [x] Enrolled courses section with progress bars and completion percentage
- [ ] Current lesson player (video placeholder, notes, quiz)
- [ ] Interactive quiz interface (MCQ, T/F, Fill-in-the-blank)
- [x] Achievement badges and certificates
- [ ] Learning streak tracker
- [ ] Upcoming lessons/assessments calendar
- [x] Student profile page (name, school, current level, subjects, progress)
- [x] Settings (preferences, notifications, password change)

---

## Phase 5: Teacher Dashboard

- [x] Dashboard home with class overview and student statistics
- [x] Class management (create/edit classes, manage students)
- [x] Content upload form (lesson title, subject, level, description, video/PDF)
- [ ] Quiz builder (create MCQ, T/F, fill-in-the-blank questions)
- [x] Student performance analytics (grades, completion rates, time spent)
- [ ] Assignment management (create, grade, provide feedback)
- [ ] Class messaging (communicate with students)
- [x] Teacher profile page (name, school, subjects, classes)
- [ ] Settings

---

## Phase 6: Parent Dashboard

- [x] Dashboard home with child overview
- [x] Child progress reports (subjects, grades, completion rates)
- [x] Learning activity feed (recent lessons, quizzes, achievements)
- [x] Attendance tracker (login frequency, time spent)
- [x] Upcoming assessments for child
- [x] Communication section (messages from teacher, notifications)
- [x] Parent profile page (name, contact info, children linked)
- [ ] Settings

---

## Database Schema

- [x] Users table with role-based access control (user, admin, student, teacher, parent)
- [x] Courses table (id, title, subject, level, description, difficulty, totalLessons)
- [x] Lessons table (id, courseId, title, description, videoUrl, duration, content)
- [x] Enrollments table (id, userId, courseId, status: active/completed/dropped)
- [x] StudentProgress table (userId, courseId, lessonId, isCompleted, quizScore, timeSpent)
- [x] StudentProfiles table (userId, school, currentLevel, subjects, bio, avatar)
- [x] TeacherProfiles table (userId, school, subjects, bio, avatar)
- [x] ParentProfiles table (userId, childrenIds, bio, avatar)
- [x] Database migrations applied successfully
- [x] Sample data seeded (6 courses, 11 lessons)

---

## tRPC Procedures

### Authentication (Existing)
- [x] auth.me (get current user)
- [x] auth.logout

### Courses
- [x] courses.getAll (fetch all available courses)
- [x] courses.getById (fetch single course)

### Lessons
- [x] lessons.getByCourseId (fetch lessons for a course)

### Enrollments
- [x] enrollments.getByUserId (fetch user enrollments)

### Student Profiles
- [x] studentProfile.getProfile (fetch student profile)
- [x] studentProfile.updateProfile (update student profile)

### Security Enhancements
- [x] enrollments.getByUserId secured with protectedProcedure and ownership check
- [x] studentProfile.getProfile secured with protectedProcedure and ownership check
- [x] studentProfile.updateProfile secured with protectedProcedure and ownership check
- [x] teacherProfile.getProfile secured with protectedProcedure and ownership check
- [x] parentProfile.getProfile secured with protectedProcedure and ownership check

### To Implement
- [ ] courses.create (teacher creates course)
- [ ] lessons.create (teacher uploads lesson)
- [ ] enrollments.create (student enrolls in course)
- [ ] studentProgress.update (track lesson completion)
- [ ] Quiz submission and grading procedures

---

## Testing & Quality Assurance

- [ ] Write vitest tests for all auth procedures
- [ ] Test form validation and error handling
- [ ] Test responsive design (mobile 375px, tablet 768px, desktop 1280px)
- [ ] Test cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- [ ] Accessibility audit (WCAG 2.1 AA compliance)
- [ ] Performance optimization (lazy loading, code splitting)
- [ ] End-to-end testing of authentication flow
- [ ] End-to-end testing of course enrollment and quiz submission

---

## Deployment & Launch

- [ ] Create final checkpoint
- [ ] Verify all features working in production
- [ ] Set up analytics tracking
- [ ] Prepare for beta testing (100 users)
- [ ] Create user onboarding guide
- [ ] Set up support email and contact form

---

## Notes

- **Logo:** /manus-storage/geniuslearn-logo_5e5739f4.jpg
- **Tagline:** "Aim Higher In Christ"
- **Contact:** hello@thegeniusinstitute.co.zw | +263 788 335945
- **Subjects:** Math, Science, Chemistry, Physics, Agriculture, Commerce, Heritage Studies
- **Levels:** Primary, Form 1-6 (O-Level, A-Level)
- **Pricing:** $2/month for students, school licenses available
- **Design Inspiration:** Datacamp, Udemy, Coursera
- **Tech Stack:** React 19, Express 4, tRPC 11, MySQL, Tailwind CSS 4
