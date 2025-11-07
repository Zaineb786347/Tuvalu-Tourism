import Hero from '@/components/Hero'
import FeaturedListings from '@/components/FeaturedListings'
import CategoryGrid from '@/components/CategoryGrid'
import Testimonials from '@/components/Testimonials'
import CallToAction from '@/components/CallToAction'

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <FeaturedListings />
      <Testimonials />
      <CallToAction />
    </>
  )
}
