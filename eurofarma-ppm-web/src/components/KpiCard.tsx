'use client';

import React from 'react';

interface KpiCardProps {
  title: string;
  value: string | number;
  className?: string;
}

export default function KpiCard({ title, value, className }: KpiCardProps) {
  return (
    <div className={`bg-white p-6 rounded-lg shadow-md ${className}`}>
      <h3 className="text-lg font-semibold text-gray-500">{title}</h3>
      <p className="text-4xl font-bold text-blue-900 mt-2">{value}</p>
    </div>
  );
}