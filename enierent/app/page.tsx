import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/home/HeroSection'
import FeaturedCategories from '@/components/home/FeaturedCategories'
import FeaturedProperties from '@/components/home/FeaturedProperties'
import Testimonials from '@/components/home/Testimonials'
import CTASection from '@/components/home/CTASection'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturedCategories />
        <FeaturedProperties />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}