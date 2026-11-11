import React from 'react';
import { getCategoryBySlug } from '../../data/coursesData';
import { CategoryDetailPage } from './CategoryDetailPage';

export const ArtsMultimediaPage: React.FC = () => {
  const category = getCategoryBySlug('arts-multimedia');
  if (!category) return null;
  return <CategoryDetailPage category={category} />;
};

