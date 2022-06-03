import { Title } from '@mantine/core';

export interface PageTitleProps {
  children: React.ReactNode;
}

export default function PageTitle({ children }: PageTitleProps) {
  return (
    <Title order={2} mb={12}>
      {children}
    </Title>
  );
}
