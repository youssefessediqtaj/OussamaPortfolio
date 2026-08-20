import React, { useState } from 'react';
import { CursorProvider } from './context/CursorContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { CustomCursor } from './components/common/CustomCursor';
import { GrainOverlay } from './components/common/GrainOverlay';
import { FilmRuler } from './components/common/FilmRuler';
import { Preloader } from './components/common/Preloader';
import { Navigation } from './components/common/Navigation';
import { Hero } from './components/hero/Hero';
import { ShowreelSection } from './components/showreel/ShowreelSection';
import { SelectedWork } from './components/work/SelectedWork';
import { ProjectDetailModal } from './components/work/ProjectDetailModal';
import { VideoModal } from './components/common/VideoModal';
import { AboutSection } from './components/about/AboutSection';
import { ExperienceSection } from './components/experience/ExperienceSection';
import { CapabilitiesSection } from './components/capabilities/CapabilitiesSection';
import { StrategicManifesto } from './components/manifesto/StrategicManifesto';
import { ProcessSection } from './components/process/ProcessSection';
import { ContactSection } from './components/contact/ContactSection';
import { ContactModal } from './components/contact/ContactModal';
import { WhatsAppWidget } from './components/common/WhatsAppWidget';
import { Footer } from './components/footer/Footer';
import { getProjects } from './data/projects';
import { Project } from './types/project';
import { useLenis } from './hooks/useLenis';

const AppContent: React.FC = () => {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [videoModalData, setVideoModalData] = useState<{
    isOpen: boolean;
    src?: string;
    title: string;
    category?: string;
    poster?: string;
  }>({
    isOpen: false,
    title: '',
  });

  const { language } = useLanguage();
  const currentProjects = getProjects(language);
  const { scrollTo } = useLenis();

  // Handlers
  const handleOpenContact = () => setContactModalOpen(true);
  const handleCloseContact = () => setContactModalOpen(false);

  const handleOpenProjectDetails = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseProjectDetails = () => {
    setSelectedProject(null);
  };

  const handlePlayShowreel = () => {
    setVideoModalData({
      isOpen: true,
      src: '/videos/showreel.mp4',
      title: language === 'fr' ? 'OUSSAMA MAZROUI — SHOWREEL 2023—2026' : 'OUSSAMA MAZROUI — SHOWREEL 2023—2026',
      category: language === 'fr' ? 'PUBLICITÉ / NARRATIF / STRATÉGIE' : 'COMMERCIAL / NARRATIVE / STRATEGY',
      poster: '/images/press-conference.jpg',
    });
  };

  const handlePlayProjectVideo = (project: Project) => {
    setVideoModalData({
      isOpen: true,
      src: project.video || project.externalVideoUrl,
      title: project.title,
      category: project.category,
      poster: project.poster,
    });
  };

  const handleCloseVideoModal = () => {
    setVideoModalData((prev) => ({ ...prev, isOpen: false }));
  };

  const handleExploreWork = () => {
    scrollTo('#work');
  };

  const handleScrollToTop = () => {
    scrollTo(0);
  };

  return (
    <CursorProvider>
      <div className="relative min-h-screen bg-[#111111] text-[#F1F1F1] selection:bg-[#B93434] selection:text-white">
        {/* Cinematic Noise Overlay */}
        <GrainOverlay />

        {/* Custom Lerp Cursor */}
        <CustomCursor />

        {/* Cinematic Preloader */}
        {!loadingComplete && (
          <Preloader onComplete={() => setLoadingComplete(true)} />
        )}

        {/* Fixed Left Film Ruler (Desktop Only) */}
        <FilmRuler />

        {/* Main Content Layout with Left Indent on Desktop */}
        <div className="lg:pl-[14vw] lg:max-pl-[170px] min-h-screen flex flex-col justify-between">
          {/* Navigation Bar */}
          <Navigation onOpenContact={handleOpenContact} />

          {/* Main Content Sections */}
          <main>
            <Hero
              onOpenContact={handleOpenContact}
              onExploreWork={handleExploreWork}
            />

            <ShowreelSection onPlayShowreel={handlePlayShowreel} />

            <SelectedWork
              projects={currentProjects}
              onOpenDetails={handleOpenProjectDetails}
              onPlayVideo={handlePlayProjectVideo}
            />

            <AboutSection />

            <ExperienceSection />

            <CapabilitiesSection />

            <StrategicManifesto />

            <ProcessSection />

            <ContactSection onOpenContact={handleOpenContact} />
          </main>

          {/* Footer */}
          <Footer onScrollToTop={handleScrollToTop} />
        </div>

        {/* Interactive Modals */}
        <ContactModal
          isOpen={contactModalOpen}
          onClose={handleCloseContact}
        />

        <ProjectDetailModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={handleCloseProjectDetails}
          onSelectProject={setSelectedProject}
          onPlayVideo={handlePlayProjectVideo}
        />

        <VideoModal
          isOpen={videoModalData.isOpen}
          onClose={handleCloseVideoModal}
          videoSrc={videoModalData.src}
          title={videoModalData.title}
          category={videoModalData.category}
          poster={videoModalData.poster}
        />

        {/* Floating WhatsApp Quick Action Desk */}
        <WhatsAppWidget />
      </div>
    </CursorProvider>
  );
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;
