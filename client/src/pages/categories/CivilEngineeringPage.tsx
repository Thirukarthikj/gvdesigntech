import React from 'react';
import { getCategoryBySlug } from '../../data/coursesData';
import { CategoryDetailPage } from './CategoryDetailPage';

export const CivilEngineeringPage: React.FC = () => {
  const category = getCategoryBySlug('civil-engineering');
  if (!category) return null;
  return <CategoryDetailPage category={category} />;
};

