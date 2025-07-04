import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Test',
        href: '/test',
    },
];

export default function Testing() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Testing" />
    </AppLayout>
  )
}
