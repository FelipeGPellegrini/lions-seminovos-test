import React from 'react';
import { HeroSlider } from '../components/HeroSlider';
import { CategoryGrid } from '../components/CategoryGrid';
import { VideoHighlight } from '../components/VideoHighlight';
import { FinanceSection } from '../components/FinanceSection';

export const Home = () => {
  return (
    <div className="bg-dark min-h-screen">
      <HeroSlider />
      <CategoryGrid />
      <VideoHighlight />
      <FinanceSection />
    </div>
  );
};