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
import { ScrollBar } from '@/fx/ScrollBar'
import { ChangeSlot } from '@/changes/ChangeSlot'
import { PageLengthCard } from '@/changes/PageLengthCard'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ScrollBar />
      <Ribbon />
      <Nav />
      <main>
        <Hero />
        <ChangeSlot id="signup" />
        <ProductDemo />
        <ChangeSlot id="demo" />
        <ProofStrip />
        <ChangeSlot id="proof" />
        <Safety />
        <ChangeSlot id="safety" />
        <Personas />
        <ChangeSlot id="personas" />
        <Features />
        <ChangeSlot id="features" />
        <HowItWorks />
        <ChangeSlot id="how" />
        <Pricing />
        <ChangeSlot id="pricing" />
        <Testimonials />
        <ChangeSlot id="testimonials" />
        <Integrations />
        <Faq />
        <ChangeSlot id="faq" />
        <Founder />
        <ClosingCta />
        <ChangeSlot id="closing" />
        <PageLengthCard />
      </main>
      <Footer />
      <StickyCta />
      <NotesCorner />
    </MotionConfig>
  )
}
