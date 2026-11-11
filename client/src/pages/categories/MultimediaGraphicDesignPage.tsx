import React from 'react';
import { getCategoryBySlug } from '../../data/coursesData';
import { CategoryDetailPage } from './CategoryDetailPage';

export const MultimediaGraphicDesignPage: React.FC = () => {
  const category = getCategoryBySlug('multimedia-graphic-design');
  if (!category) return null;
  return <CategoryDetailPage category={category} />;
};

