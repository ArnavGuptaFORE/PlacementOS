'use client';

import Image from 'next/image';
import Sidebar from '@/components/Sidebar';
import ChatUI from '@/components/ChatUI';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function ChatPage() {
  return (
    <ProtectedRoute>
    <div className="flex min-h-screen bg-navy">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <div className="border-b border-gold/20 p-6">
          <div className="max-w-4xl mx-auto flex items-center space-x-4">
            <Image
              src="/logo.png"
              alt="PlacementOS Mentor"
              width={48}
              height={48}
              className="rounded-lg"
            />
            <div>
              <h1 className="text-2xl font-bold text-cream">AI Mentor Chat</h1>
              <p className="text-cream/60 text-sm">
                Your 24/7 placement coach for resumes, cases, and career advice
              </p>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="max-w-4xl mx-auto h-full">
            <ChatUI />
          </div>
        </div>
      </main>
    </div>
    </ProtectedRoute>
  );
}


