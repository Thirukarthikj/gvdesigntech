import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { SoftwareMarqueeStrip } from '../components/home/SoftwareMarqueeStrip';
import { MethodologySection } from '../components/home/MethodologySection';
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

      {/* 02 — METHODOLOGY */}
      <MethodologySection />

      {/* 03 — ALL 6 CURATED DISCIPLINES */}
      <DisciplinesSection />

      {/* 04 — FIVE PEDAGOGICAL PILLARS */}
      <PedagogicalPillarsSection />

      {/* 05 — TRAINING FORMATS (LIVE ONLINE SCHEDULES) */}
      <TrainingFormatsSection />

      {/* 06 — HIGH-CONTRAST INTEGRITY PROMISE BANNER */}
      <IntegrityBannerSection />

      {/* 07 — ENROLMENT CONVERSATION & APPLICATION FORM */}
      <EnrolmentConversationSection />

      {/* 08 — FREQUENTLY ANSWERED QUERIES (FAQ) */}
      <FAQAccordionSection />

      {/* 09 — FINAL NEXT SKILL CTA */}
      <FinalNextSkillCTA />
    </div>
  );
};
