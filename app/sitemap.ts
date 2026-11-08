import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devup-joel.com' // Remplace par ton futur domaine

  // Récupérer les articles et projets publiés
  const posts = await prisma.post.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } })
  const projects = await prisma.project.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } })

  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt,
  }))

  const projectUrls = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: project.updatedAt,
  }))

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/blog`, lastModified: new Date() },
    ...postUrls,
    ...projectUrls,
  ]
}