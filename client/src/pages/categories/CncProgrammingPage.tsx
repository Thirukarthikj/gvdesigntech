import React from 'react';
import { getCategoryBySlug } from '../../data/coursesData';
import { CategoryDetailPage } from './CategoryDetailPage';

export const CncProgrammingPage: React.FC = () => {
  const category = getCategoryBySlug('cnc-programming');
  if (!category) return null;
  return <CategoryDetailPage category={category} />;
};

