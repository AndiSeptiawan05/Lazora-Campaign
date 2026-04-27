import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'Lazora — Jasa Pembuatan CV & Dokumen Lamaran Kerja Profesional',
  description: 'Pesan CV dan dokumen lamaran kerja profesional dengan mudah. Lazora siap membantu kamu mendapatkan pekerjaan impian dengan CV yang menarik dan ATS-friendly.',
  keywords: 'jasa CV, buat CV profesional, lamaran kerja, dokumen lamaran, ATS CV',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@400;600;700;800;900&family=Museo+Moderno:wght@400;500;600;700;800;900&family=League+Gothic&family=Pacifico&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'rgba(20, 20, 35, 0.95)',
              color: '#f0f0f5',
              border: '1px solid rgba(234, 179, 8, 0.3)',
              borderRadius: '14px',
              backdropFilter: 'blur(20px)',
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
            },
            success: {
              iconTheme: { primary: '#22c55e', secondary: 'transparent' },
            },
            error: {
              iconTheme: { primary: '#ef4444', secondary: 'transparent' },
            },
          }}
        />
      </body>
    </html>
  )
}
