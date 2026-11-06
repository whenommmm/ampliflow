import { MotionConfig } from 'motion/react'
import { Ribbon } from '@/sections/Ribbon'
import { Nav } from '@/sections/Nav'
import { Hero } from '@/sections/Hero'
import { ProductDemo } from '@/sections/ProductDemo'
import { ProofStrip } from '@/sections/ProofStrip'
import { Safety } from '@/sections/Safety'
import { Personas } from '@/sections/Personas'
import { Features } from '@/sections/Features'
import { HowItWorks } from '@/sections/HowItWorks'
import { Pricing } from '@/sections/Pricing'
import { Testimonials } from '@/sections/Testimonials'
import { Integrations } from '@/sections/Integrations'
import { Faq } from '@/sections/Faq'
import { Founder } from '@/sections/Founder'
import { ClosingCta } from '@/sections/ClosingCta'
import { Footer } from '@/sections/Footer'
import { StickyCta } from '@/sections/StickyCta'
import { NotesCorner } from '@/notes/NotesCorner'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Ribbon />
      <Nav />
      <main>
        <Hero />
        <ProductDemo />
        <ProofStrip />
        <Safety />
        <Personas />
        <Features />
        <HowItWorks />
        <Pricing />
        <Testimonials />
        <Integrations />
        <Faq />
        <Founder />
        <ClosingCta />
      </main>
      <Footer />
      <StickyCta />
      <NotesCorner />
    </MotionConfig>
  )
}
