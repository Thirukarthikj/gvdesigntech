import React from 'react';
import { getCategoryBySlug } from '../../data/coursesData';
import { CategoryDetailPage } from './CategoryDetailPage';

export const ComputerSciencePage: React.FC = () => {
  const category = getCategoryBySlug('computer-science-it');
  if (!category) return null;
  return <CategoryDetailPage category={category} />;
};

