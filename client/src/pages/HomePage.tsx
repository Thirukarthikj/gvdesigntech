import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { SoftwareMarqueeStrip } from '../components/home/SoftwareMarqueeStrip';
import { DisciplinesSection } from '../components/home/DisciplinesSection';
import { PedagogicalPillarsSection } from '../components/home/PedagogicalPillarsSection';
import { TrainingFormatsSection } from '../components/home/TrainingFormatsSection';
import { IntegrityBannerSection } from '../components/home/IntegrityBannerSection';
import { EnrolmentConversationSection } from '../components/home/EnrolmentConversationSection';
import { FAQAccordionSection } from '../components/home/FAQAccordionSection';
import { FinalNextSkillCTA } from '../components/home/FinalNextSkillCTA';

export const HomePage: React.FC = () => {
  return (
    <div className="bg-white text-neutral-900">
      {/* 01 — HERO OPENING */}
      <HeroSection />

      {/* 21st.dev / OriginKit Software Suites Infinite Marquee Ribbon */}
      <SoftwareMarqueeStrip />

      {/* 02 — ALL 6 CURATED DISCIPLINES */}
      <DisciplinesSection />

      {/* 03 — FIVE PEDAGOGICAL PILLARS */}
      <PedagogicalPillarsSection />

      {/* 04 — TRAINING FORMATS (LIVE ONLINE SCHEDULES) */}
      <TrainingFormatsSection />

      {/* 05 — HIGH-CONTRAST INTEGRITY PROMISE BANNER */}
      <IntegrityBannerSection />

      {/* 06 — ENROLMENT CONVERSATION & APPLICATION FORM */}
      <EnrolmentConversationSection />

      {/* 07 — FREQUENTLY ANSWERED QUERIES (FAQ) */}
      <FAQAccordionSection />

      {/* 08 — FINAL NEXT SKILL CTA */}
      <FinalNextSkillCTA />
    </div>
  );
};
