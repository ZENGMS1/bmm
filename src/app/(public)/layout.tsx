import { PublicAndUserNavbar } from '@/components/PublicAndUserNavBar'
import { PublicBookmarkController, PublicTagController } from '@/controllers'
import { WEBSITE_NAME } from '@cfg'
import type { Metadata } from 'next'
import { PropsWithChildren } from 'react'
import { PublicProvider } from './ctx'

export const metadata: Metadata = {
  title: {
    default: "曾胖的黑盒",
    template: '%s - ' +  "曾胖的黑盒",
  },
}

export default async function RootLayout({ children }: PropsWithChildren) {
  const [tags, totalBookmarks] = await Promise.all([
    PublicTagController.getAll(),
    PublicBookmarkController.total(),
  ])

  return (
    <PublicProvider tags={tags} totalBookmarks={totalBookmarks}>
      <PublicAndUserNavbar tags={tags} totalBookmarks={totalBookmarks} />
      <div className="h-screen pt-16">{children}</div>
    </PublicProvider>
  )
}
