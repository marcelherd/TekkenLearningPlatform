import React from 'react';
import { ColorScheme } from '@mantine/core';
import LogoSvg from '@/public/Logo.svg';
import Image from 'next/image';

export function Logo({ colorScheme }: { colorScheme: ColorScheme }) {
  return <Image src={LogoSvg} width={350} />;
}
