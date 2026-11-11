import React from 'react';
import { getCategoryBySlug } from '../../data/coursesData';
import { CategoryDetailPage } from './CategoryDetailPage';

export const MechanicalAutomobilePage: React.FC = () => {
  const category = getCategoryBySlug('mechanical-automobile');
  if (!category) return null;
  return <CategoryDetailPage category={category} />;
};

