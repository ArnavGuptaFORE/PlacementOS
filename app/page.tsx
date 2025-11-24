import Image from 'next/image';
import Link from 'next/link';
import ModuleCard from '@/components/ModuleCard';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-navy">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <Image
              src="/logo.png"
              alt="PlacementOS Logo"
              width={120}
              height={120}
              className="rounded-2xl"
            />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-cream mb-6">
            Welcome to <span className="text-gold">PlacementOS</span>
          </h1>
          <p className="text-xl text-cream/80 mb-8 max-w-3xl mx-auto">
            Your complete AI-powered platform for placement preparation. Master resumes, ace case interviews, 
            and land your dream job with intelligent guidance.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-gold text-navy font-semibold px-8 py-4 rounded-lg text-lg hover:bg-gold-light transition-all hover:scale-105"
          >
            Get Started →
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-navy-light">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-cream mb-12 text-center">
            Powerful Tools for Your Success
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ModuleCard
              title="Resume + JD Matcher"
              description="Analyze your resume against job descriptions. Get ATS optimization tips and match scores."
              icon="📄"
              href="/resume-matcher"
            />
            <ModuleCard
              title="PPT Frameworks"
              description="Generate business frameworks for presentations. SWOT, Porter's 5, BCG Matrix, and more."
              icon="📊"
              href="/ppt-frameworks"
            />
            <ModuleCard
              title="Case Study Solver"
              description="Break down complex case studies into structured, solvable components with frameworks."
              icon="🧩"
              href="/case-solver"
            />
            <ModuleCard
              title="Guesstimate Helper"
              description="Master market sizing problems with step-by-step guidance and structured calculations."
              icon="🔢"
              href="/guesstimate"
            />
            <ModuleCard
              title="Company Intelligence"
              description="Deep-dive company research with interview questions and role expectations."
              icon="🏢"
              href="/company-intel"
            />
            <ModuleCard
              title="AI Mentor Chat"
              description="24/7 AI mentor for resume reviews, case practice, and career guidance."
              icon="💬"
              href="/chat"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-cream mb-4">
            Ready to dominate your placements?
          </h2>
          <p className="text-cream/70 mb-8">
            Join thousands of students accelerating their placement preparation with AI
          </p>
          <Link
            href="/signup"
            className="inline-block bg-gold text-navy font-semibold px-8 py-4 rounded-lg text-lg hover:bg-gold-light transition-all"
          >
            Sign Up Now
          </Link>
        </div>
      </section>
    </main>
  );
}


