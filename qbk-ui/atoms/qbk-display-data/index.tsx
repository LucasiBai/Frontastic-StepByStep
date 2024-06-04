'use client';

import React from 'react';

const QbkDisplayData: React.FC<any> = ({ data }) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Data:', data);
  }
  return <></>;
};

export default QbkDisplayData;
