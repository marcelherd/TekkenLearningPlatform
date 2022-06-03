import React from 'react';
import Image from 'next/image';

import LogoSvg from '@/public/Logo.svg';

export interface BrandLogoProps {
  width?: number;
}

export default function BrandLogo({ width }: BrandLogoProps) {
  return <Image src={LogoSvg} alt="Tekken Learning Platform Logo" width={width ?? 350} />;
}
