import { Anchor, Breadcrumbs as MantineBreadcrumbs } from '@mantine/core';

import { Breadcrumb } from '@/lib/types';

export interface BreadcrumbsProps {
  breadcrumbs: Breadcrumb[];
}

export default function Breadcrumbs({ breadcrumbs }: BreadcrumbsProps) {
  const breadcrumbItems = breadcrumbs.map((item, index) => (
    <Anchor href={item.path} key={index}>
      {item.label}
    </Anchor>
  ));

  return <MantineBreadcrumbs mb={12}>{breadcrumbItems}</MantineBreadcrumbs>;
}
