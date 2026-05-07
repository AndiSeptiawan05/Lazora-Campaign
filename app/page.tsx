'use client'

import { useState } from 'react'
import { FileText, FileCheck, Star, ChevronRight, Zap, Shield, Clock } from 'lucide-react'
import OrderForm from '@/components/OrderForm'

export default function HomePage() {
  const [selectedPlan, setSelectedPlan] = useState<'cv' | 'complete' | null>(null)
  const [showForm, setShowForm] = useState(false)

  const handleSelectPlan = (plan: 'cv' | 'complete') => {
    setSelectedPlan(plan)
    setTimeout(() => {
      setShowForm(true)
      document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' })
    }, 200)
  }

  return (
    <main
      className="relative min-h-screen overflow-x-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url("https://i.imgur.com/97IsGN4.jpeg")' }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      <div className="relative z-10">
        {/* Hero Section — Image */}
        <section className="px-4 pt-10 pb-8 max-w-4xl mx-auto">
          <div className="animate-slide-up flex justify-center">
            <img
              src="https://i.imgur.com/WS9nrTG.png"
              alt="Profesional CV ATS Lamaran Kerja"
              className="w-[80%] object-contain"
            />
          </div>

          {/* Animated Marquee Image */}
          <div className="whitespace-nowrap mb-8 mt-2">
            <div className="inline-block animate-marquee">
              <img
                src="https://i.imgur.com/Puh0nxX.png"
                alt="Scrolling logos"
                className="h-12 object-contain"
              />
            </div>
          </div>

          {/* Feature Badges */}
          <div
            className="flex flex-wrap justify-center gap-4 mb-16 animate-slide-up"
            style={{ animationDelay: '0.3s' }}
          >
            {[
              { text: 'Proses Cepat' },
              { text: 'ATS Friendly' },
              { text: 'Revisi Gratis' },
              { text: 'Terpercaya' },
            ].map(({ text }) => (
              <div key={text} className="flex items-center gap-2 glass-card rounded-full px-4 py-2">
                <span className="text-sm text-white/80 font-semibold">{text}</span>
              </div>
            ))}
          </div>

          {/* Pricing Cards */}
          <div
            id="pricing"
            className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto animate-slide-up"
            style={{ animationDelay: '0.4s' }}
          >
            {/* Card 1 — CV Only */}
            <div
              onClick={() => handleSelectPlan('cv')}
              className={`pricing-card p-8 text-left ${selectedPlan === 'cv' ? 'selected' : ''}`}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(244, 242, 248, 0.3), rgba(247, 246, 250, 0.1))', border: '1px solid rgba(245, 225, 5, 0.3)' }}>
                  <FileText className="w-7 h-7 text-white" />
                </div>
                {selectedPlan === 'cv' && (
                  <div className="section-badge text-xs">
                    <Star className="w-3 h-3" />
                    Dipilih
                  </div>
                )}
              </div>

              <div className="mb-1">
                <span className="text-xs font-semibold text-white uppercase tracking-widest">Paket 1</span>
              </div>
              <h2 className="font-outfit font-bold text-2xl text-yellow-500 mb-2">Hanya CV</h2>
              <p className="text-white/80 text-sm mb-6 leading-relaxed">
                Kami buatkan CV profesional kamu yang rapi, menarik, dan siap dikirim ke rekruter mana pun.
              </p>

              <ul className="space-y-3 mb-8">
                {['CV profesional 1 halaman', 'Desain modern & ATS-friendly', 'Format PDF', 'Revisi 2x gratis', 'Surat lamaran kerja', 'Pengerjaan 1-2 hari kerja'].map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm text-white/70">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)' }}>
                      <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {f}
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-between">
                <div>
                  <span className="font-outfit font-black text-4xl text-white">Rp 10.000</span>
                </div>
                <div className="flex items-center gap-2 text-white font-semibold text-sm">
                  Pilih Paket <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Card 2 — CV + Complete Documents */}
            <div
              onClick={() => handleSelectPlan('complete')}
              className={`pricing-card p-8 text-left ${selectedPlan === 'complete' ? 'selected-premium' : ''}`}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1))', border: '1px solid rgba(255,255,255,0.3)' }}>
                  <FileCheck className="w-7 h-7 text-white" />
                </div>
                {selectedPlan === 'complete' && (
                  <div className="section-badge text-xs" style={{ background: 'rgba(255,255,255,0.15)', borderColor: 'rgba(255,255,255,0.3)', color: '#ffffff' }}>
                    <Star className="w-3 h-3" />
                    Dipilih
                  </div>
                )}
              </div>

              <div className="mb-1">
                <span className="text-xs font-semibold text-white uppercase tracking-widest">Paket 2</span>
              </div>
              <h2 className="font-outfit font-bold text-2xl text-yellow-500 mb-2">CV + Dokumen Lengkap</h2>
              <p className="text-white/80 text-sm mb-6 leading-relaxed">
                Paket komplit CV + semua dokumen pendukung lamaran kerja kamu disiapkan dengan rapi & profesional.
              </p>

              <ul className="space-y-3 mb-8">
                {['Semua yang ada di Paket 1', 'Kelengkapan berkas lamaran', 'Pengumpulan & sortir dokumen', 'Surat lamaran kerja', 'Revisi 3x gratis', 'Pengerjaan 1-3 hari kerja'].map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm text-white/70">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)' }}>
                      <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {f}
                  </li>
                ))}
              </ul>

              <div className="flex items-end justify-between">
                <div className="flex flex-col items-start gap-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)' }}>
                    ⭐ Paling Populer
                  </div>
                  <span className="font-outfit font-black text-4xl text-white leading-none">Rp 25.000</span>
                </div>
                <div className="flex items-center gap-2 text-white font-semibold text-sm mb-1">
                  Pilih Paket <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Order Form Section */}
        {showForm && selectedPlan && (
          <section id="order-form" className="px-4 py-12 max-w-4xl mx-auto animate-slide-up">
            <OrderForm plan={selectedPlan} onChangePlan={(p) => setSelectedPlan(p)} />
          </section>
        )}

        {/* Footer */}
        <footer className="text-center py-10 text-white/100 text-sm border-t border-white/5 mt-16">
          <p className="font-outfit">© 2026 Andi — Semua hak dilindungi.</p>
          <p className="mt-1">Dibuat dengan ❤️ untuk membantu karirmu.</p>
        </footer>
      </div>
    </main >
  )
}
