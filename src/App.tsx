import { Ribbon } from '@/sections/Ribbon'
import { Nav } from '@/sections/Nav'
import { Hero } from '@/sections/Hero'
import { ClosingCta } from '@/sections/ClosingCta'
import { Footer } from '@/sections/Footer'
import { StickyCta } from '@/sections/StickyCta'

export default function App() {
  return (
    <>
      <Ribbon />
      <Nav />
      <main>
        <Hero />
        <ClosingCta />
      </main>
      <Footer />
      <StickyCta />
    </>
  )
}
