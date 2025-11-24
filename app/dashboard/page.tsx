'use client';

import Image from 'next/image';
import Sidebar from '@/components/Sidebar';
import ReadinessWidget from '@/components/ReadinessWidget';
import ModuleCard from '@/components/ModuleCard';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-navy">
        <Sidebar />
        <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center space-x-4 mb-8">
            <Image
              src="/logo.png"
              alt="PlacementOS"
              width={60}
              height={60}
              className="rounded-lg"
            />
            <div>
              <h1 className="text-3xl font-bold text-cream">Dashboard</h1>
              <p className="text-cream/60">Your placement preparation hub</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <div className="grid md:grid-cols-2 gap-6">
                <ModuleCard
                  title="Resume Matcher"
                  description="Optimize your resume for ATS"
                  icon="📄"
                  href="/resume-matcher"
                />
                <ModuleCard
                  title="PPT Frameworks"
                  description="Business framework generator"
                  icon="📊"
                  href="/ppt-frameworks"
                />
                <ModuleCard
                  title="Case Solver"
                  description="Structured case solutions"
                  icon="🧩"
                  href="/case-solver"
                />
                <ModuleCard
                  title="Guesstimate"
                  description="Market sizing made easy"
                  icon="🔢"
                  href="/guesstimate"
                />
                <ModuleCard
                  title="Company Intel"
                  description="Deep company research"
                  icon="🏢"
                  href="/company-intel"
                />
                <ModuleCard
                  title="AI Mentor"
                  description="Chat with your AI coach"
                  icon="💬"
                  href="/chat"
                />
              </div>
            </div>

            <div>
              <ReadinessWidget />
            </div>
          </div>

          <div className="bg-navy-light rounded-xl border border-gold/20 p-6">
            <h2 className="text-xl font-semibold text-cream mb-4">Quick Tips</h2>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <span className="text-gold">•</span>
                <span className="text-cream/80 text-sm">
                  Start with Resume Matcher to ensure your resume is ATS-optimized
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-gold">•</span>
                <span className="text-cream/80 text-sm">
                  Practice at least 3 case studies per week for consulting roles
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-gold">•</span>
                <span className="text-cream/80 text-sm">
                  Research companies 48 hours before interviews using Company Intel
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-gold">•</span>
                <span className="text-cream/80 text-sm">
                  Use the AI Mentor for personalized guidance and mock interviews
                </span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
    </ProtectedRoute>
  );
}


