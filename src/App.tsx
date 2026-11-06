import { MotionConfig } from 'motion/react'
import { Ribbon } from '@/sections/Ribbon'
import { Nav } from '@/sections/Nav'
import { Hero } from '@/sections/Hero'
import { ProductDemo } from '@/sections/ProductDemo'
import { ClosingCta } from '@/sections/ClosingCta'
import { Footer } from '@/sections/Footer'
import { StickyCta } from '@/sections/StickyCta'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Ribbon />
      <Nav />
      <main>
        <Hero />
        <ProductDemo />
        <ClosingCta />
      </main>
      <Footer />
      <StickyCta />
    </MotionConfig>
  )
}
