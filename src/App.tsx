import React, { useState, useEffect, useCallback, useRef } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import MembershipView from './components/MembershipView';
import TrainersView from './components/TrainersView';
import RegistrationView from './components/RegistrationView';
import ContactView from './components/ContactView';
import EnrollModal from './components/EnrollModal';
import LoadingScreen from './components/LoadingScreen';

type Tab = 'home' | 'membership' | 'trainers' | 'register' | 'contact' | 'gallery';

export default function App() {
  const [currentTab, setCurrentTab] = useState<Tab>('home');
  const [visibleTab, setVisibleTab] = useState<Tab>('home');
  const [isEnrollOpen, setIsEnrollOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<string | undefined>(undefined);
  const [selectedProgramId, setSelectedProgramId] = useState<string | undefined>(undefined);
  const [loaderVisible, setLoaderVisible] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Initial page-load loader: show for 1.0s then hide
  useEffect(() => {
    // Smoothly fade out the fast HTML preloader on React mount to prevent visual jumps
    const preloader = document.getElementById('html-preloader');
    let preloaderTimer: ReturnType<typeof setTimeout> | null = null;
    if (preloader) {
      preloader.style.opacity = '0';
      preloader.style.transform = 'scale(1.02)';
      preloaderTimer = setTimeout(() => {
        preloader.remove();
      }, 600);
    }

    timerRef.current = setTimeout(() => {
      setLoaderVisible(false);
      setVisibleTab('home');
      window.scrollTo(0, 0);
    }, 1000);

    return () => {
      if (preloaderTimer) clearTimeout(preloaderTimer);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Tab-change loader: show loader, swap content midway, hide loader after 1.0s
  const handleSetTab = useCallback((tab: Tab) => {
    if (tab === currentTab) return;
    // Show loader
    setLoaderVisible(true);
    setCurrentTab(tab);
    // After 1.0s, swap the visible content and hide loader
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setVisibleTab(tab);
      window.scrollTo({ top: 0, behavior: 'instant' });
      // Give a tiny extra frame so the new view is painted before loader fades
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setLoaderVisible(false);
        });
      });
    }, 1000);
  }, [currentTab]);

  const handleOpenEnroll = (planId?: string, programId?: string) => {
    setSelectedPlanId(planId);
    setSelectedProgramId(programId);
    setIsEnrollOpen(true);
  };

  const handleCloseEnroll = () => {
    setIsEnrollOpen(false);
    setSelectedPlanId(undefined);
    setSelectedProgramId(undefined);
  };

  return (
    <>
      {/* Premium Loading Screen — sits above everything */}
      <LoadingScreen isVisible={loaderVisible} />

      <div className="flex flex-col min-h-screen bg-neutral-950 text-white selection:bg-amber-500 selection:text-neutral-950 overflow-x-hidden">
        {/* Dynamic Header / Navigation */}
        <Navbar
          currentTab={currentTab}
          setCurrentTab={handleSetTab as any}
          onOpenEnroll={handleOpenEnroll}
        />

        {/* Main Core Screen Section */}
        <main className="flex-grow">
          {visibleTab === 'home' && (
            <HomeView
              setCurrentTab={handleSetTab as any}
              onOpenEnroll={handleOpenEnroll}
            />
          )}

          {visibleTab === 'membership' && (
            <MembershipView
              onOpenEnroll={handleOpenEnroll}
              setCurrentTab={handleSetTab as any}
            />
          )}

          {visibleTab === 'trainers' && (
            <TrainersView
              onOpenEnroll={handleOpenEnroll}
            />
          )}

          {visibleTab === 'register' && (
            <RegistrationView
              setCurrentTab={handleSetTab as any}
            />
          )}

          {visibleTab === 'contact' && (
            <ContactView
              setCurrentTab={handleSetTab as any}
            />
          )}

          {visibleTab === 'gallery' && (
            <HomeView
              setCurrentTab={handleSetTab as any}
              onOpenEnroll={handleOpenEnroll}
            />
          )}
        </main>

        {/* Premium Dark Footer */}
        <Footer setCurrentTab={handleSetTab as any} />

        {/* Interactive Enrollment / Pass Claiming Modal */}
        <EnrollModal
          isOpen={isEnrollOpen}
          onClose={handleCloseEnroll}
          initialPlanId={selectedPlanId}
          initialProgramId={selectedProgramId}
        />
      </div>
    </>
  );
}
