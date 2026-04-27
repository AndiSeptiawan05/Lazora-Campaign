'use client'

import { useState } from 'react'
import { User, Phone, Mail, MapPin, Building, GraduationCap, Award, ChevronRight, ChevronLeft, FileText, FileCheck } from 'lucide-react'
import { toast } from 'react-hot-toast'
import DocumentUpload from './DocumentUpload'

interface WorkExperience {
  companyName: string
  position: string
  duration: string
}

interface FormData {
  fullName: string
  birthPlace: string
  birthDate: string
  phone: string
  email: string
  address: string
  workExperiences: WorkExperience[]
  schoolName: string
  major: string
  graduationYear: string
  skills: string
  certificates: string
  hobby1: string
  hobby2: string
  hobby3: string
}

interface OrderFormProps {
  plan: 'cv' | 'complete'
  onChangePlan: (plan: 'cv' | 'complete') => void
}


export default function OrderForm({ plan, onChangePlan }: OrderFormProps) {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    birthPlace: '',
    birthDate: '',
    phone: '',
    email: '',
    address: '',
    workExperiences: [{ companyName: '', position: '', duration: '' }],
    schoolName: '',
    major: '',
    graduationYear: '',
    skills: '',
    certificates: '',
    hobby1: '',
    hobby2: '',
    hobby3: '',
  })
  const [documents, setDocuments] = useState<Record<string, File | null>>({})

  const totalSteps = plan === 'complete' ? 3 : 2

  const update = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const updateWork = (index: number, field: keyof WorkExperience, value: string) => {
    setFormData(prev => {
      const updated = [...prev.workExperiences]
      updated[index] = { ...updated[index], [field]: value }
      return { ...prev, workExperiences: updated }
    })
  }

  const addWork = () => {
    setFormData(prev => ({
      ...prev,
      workExperiences: [...prev.workExperiences, { companyName: '', position: '', duration: '' }],
    }))
  }

  const removeWork = (index: number) => {
    setFormData(prev => ({
      ...prev,
      workExperiences: prev.workExperiences.filter((_, i) => i !== index),
    }))
  }

  const validateStep1 = () => {
    if (!formData.fullName || !formData.birthPlace || !formData.birthDate || !formData.phone || !formData.email || !formData.address) {
      toast.error('Harap isi semua field yang wajib diisi.')
      return false
    }
    return true
  }

  const handleNext = () => {
    if (step === 1 && !validateStep1()) return
    setStep(s => Math.min(s + 1, totalSteps))
    window.scrollTo({ top: document.getElementById('order-form')?.offsetTop ?? 0, behavior: 'smooth' })
  }

  const handleBack = () => {
    setStep(s => Math.max(s - 1, 1))
    window.scrollTo({ top: document.getElementById('order-form')?.offsetTop ?? 0, behavior: 'smooth' })
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const fd = new FormData()
      fd.append('plan', plan)
      fd.append('formData', JSON.stringify(formData))
      Object.entries(documents).forEach(([key, file]) => {
        if (file) fd.append(key, file)
      })

      const res = await fetch('/api/order', { method: 'POST', body: fd })
      if (res.ok) {
        toast.success('Pesanan berhasil dikirim! Kami akan segera menghubungi kamu. 🎉')
        setStep(totalSteps + 1)
      } else {
        toast.error('Terjadi kesalahan. Coba lagi ya.')
      }
    } catch {
      toast.error('Koneksi bermasalah. Coba lagi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Success screen
  if (step === totalSteps + 1) {
    return (
      <div className="glass-card rounded-3xl p-12 text-center animate-slide-up">
        <div className="text-6xl mb-6">🎉</div>
        <h2 className="font-outfit font-black text-3xl gradient-text mb-4">Pesanan Diterima!</h2>
        <p className="text-white/60 mb-2">Terima kasih, <strong className="text-white">{formData.fullName}</strong>!</p>
        <p className="text-white/50 text-sm max-w-md mx-auto leading-relaxed">
          Kami akan segera memproses pesanan kamu dan menghubungi kamu melalui WhatsApp/Email dalam waktu 1×24 jam.
        </p>
        <div className="mt-8 glass-card rounded-2xl p-4 inline-block">
          <p className="text-white text-sm font-semibold">📦 {plan === 'cv' ? 'Paket CV Only — Rp 10.000' : 'Paket CV + Dokumen Lengkap — Rp 20.000'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="glass-card rounded-3xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-white/10" style={{ background: 'linear-gradient(135deg, rgba(234,179,8,0.15), rgba(234,179,8,0.05))' }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {plan === 'cv'
              ? <FileText className="w-5 h-5 text-white" />
              : <FileCheck className="w-5 h-5 text-white" />}
            <span className="font-outfit font-bold text-white">
              {plan === 'cv' ? 'Paket CV Only — Rp 10.000' : 'Paket CV + Dokumen Lengkap — Rp 20.000'}
            </span>
          </div>
          <button
            onClick={() => onChangePlan(plan === 'cv' ? 'complete' : 'cv')}
            className="text-xs text-white/40 hover:text-yellow-400 transition-colors underline"
          >
            Ganti Paket
          </button>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-2">
          {Array.from({ length: totalSteps }, (_, i) => i + 1).map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div 
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 transition-all ${
                  s === step 
                    ? 'bg-gradient-to-br from-yellow-400 to-yellow-500 text-black shadow-[0_0_20px_rgba(234,179,8,0.5)]' 
                    : s < step 
                      ? 'bg-green-500/20 border-2 border-green-500/50 text-green-500' 
                      : 'bg-white/5 border-2 border-white/10 text-white/30'
                }`}
              >
                {s < step ? '✓' : s}
              </div>
              {s < totalSteps && (
                <div className={`h-0.5 flex-1 min-w-8 rounded-full transition-all ${s < step ? 'bg-yellow-500' : 'bg-white/10'}`} />
              )}
            </div>
          ))}
          <span className="text-xs text-white/40 ml-2">Langkah {step} dari {totalSteps}</span>
        </div>
      </div>

      <div className="p-6 md:p-8">
        {/* STEP 1: Personal Info */}
        {step === 1 && (
          <div className="animate-fade-in space-y-6">
            <div>
              <h3 className="font-outfit font-bold text-xl text-white mb-1">Data Pribadi</h3>
              <p className="text-white/40 text-sm">Isi informasi diri kamu dengan lengkap dan benar.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Nama Lengkap *</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input className="form-input !pl-11" placeholder="Nama sesuai KTP" value={formData.fullName} onChange={e => update('fullName', e.target.value)} />
                </div>
              </div>
              <div>
                <label className="form-label">Tempat Lahir *</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input className="form-input !pl-11" placeholder="Kota kelahiran" value={formData.birthPlace} onChange={e => update('birthPlace', e.target.value)} />
                </div>
              </div>
              <div>
                <label className="form-label">Tanggal Lahir *</label>
                <input className="form-input" type="date" value={formData.birthDate} onChange={e => update('birthDate', e.target.value)} />
              </div>
              <div>
                <label className="form-label">Nomor HP / WhatsApp *</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input className="form-input !pl-11" placeholder="08xxxxxxxxxx" value={formData.phone} onChange={e => update('phone', e.target.value)} />
                </div>
              </div>
              <div>
                <label className="form-label">Email *</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input className="form-input !pl-11" type="email" placeholder="email@kamu.com" value={formData.email} onChange={e => update('email', e.target.value)} />
                </div>
              </div>
              <div>
                <label className="form-label">Alamat Lengkap *</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input className="form-input !pl-11" placeholder="Jl. Contoh No.1, Kota" value={formData.address} onChange={e => update('address', e.target.value)} />
                </div>
              </div>
            </div>

            {/* Hobbies Section */}
            <div>
              <label className="form-label">Hobi (Maksimal 3)</label>
              <div className="grid grid-cols-3 gap-3">
                <input className="form-input text-center" placeholder="Hobi 1" value={formData.hobby1} onChange={e => update('hobby1', e.target.value)} />
                <input className="form-input text-center" placeholder="Hobi 2" value={formData.hobby2} onChange={e => update('hobby2', e.target.value)} />
                <input className="form-input text-center" placeholder="Hobi 3" value={formData.hobby3} onChange={e => update('hobby3', e.target.value)} />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Work Experience + Education + Skills */}
        {step === 2 && (
          <div className="animate-fade-in space-y-8">
            {/* Work Experience */}
            <div>
              <h3 className="font-outfit font-bold text-xl text-white mb-1">Pengalaman Kerja</h3>
              <p className="text-white/40 text-sm mb-4">Boleh dikosongkan jika belum punya pengalaman kerja.</p>

              <div className="space-y-4">
                {formData.workExperiences.map((exp, i) => (
                  <div key={i} className="glass-card rounded-2xl p-4 border border-white/10">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-white uppercase tracking-widest">
                        Pengalaman {i + 1}
                      </span>
                      {formData.workExperiences.length > 1 && (
                        <button onClick={() => removeWork(i)} className="text-xs text-red-400 hover:text-red-300 transition-colors">
                          Hapus
                        </button>
                      )}
                    </div>
                    <div className="grid md:grid-cols-3 gap-3">
                      <div>
                        <label className="form-label">Nama Perusahaan</label>
                        <div className="relative">
                          <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                          <input className="form-input !pl-10" placeholder="PT. Contoh" value={exp.companyName} onChange={e => updateWork(i, 'companyName', e.target.value)} />
                        </div>
                      </div>
                      <div>
                        <label className="form-label">Posisi / Jabatan</label>
                        <input className="form-input" placeholder="Staff Produksi" value={exp.position} onChange={e => updateWork(i, 'position', e.target.value)} />
                      </div>
                      <div>
                        <label className="form-label">Lama Bekerja</label>
                        <input className="form-input" placeholder="Jan 2022 – Des 2023" value={exp.duration} onChange={e => updateWork(i, 'duration', e.target.value)} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={addWork}
                className="mt-3 flex items-center gap-2 text-sm text-white hover:text-yellow-400 font-semibold transition-colors"
              >
                <div className="w-6 h-6 rounded-full border border-white/50 flex items-center justify-center text-lg leading-none">+</div>
                Tambah Pengalaman Kerja
              </button>
            </div>

            {/* Education */}
            <div>
              <h3 className="font-outfit font-bold text-xl text-white mb-1">Pendidikan Terakhir</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="form-label">Nama Sekolah / Universitas *</label>
                  <div className="relative">
                    <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input className="form-input !pl-11" placeholder="SMK Negeri 1 / Universitas..." value={formData.schoolName} onChange={e => update('schoolName', e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="form-label">Jurusan / Prodi</label>
                  <input className="form-input" placeholder="Teknik Mesin / Manajemen..." value={formData.major} onChange={e => update('major', e.target.value)} />
                </div>
                <div>
                  <label className="form-label">Tahun Lulus *</label>
                  <div className="relative">
                    <input className="form-input" placeholder="2023" value={formData.graduationYear} onChange={e => update('graduationYear', e.target.value)} />
                  </div>
                </div>
              </div>
            </div>

            {/* Skills & Certificates */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Keahlian / Skills *</label>
                <div className="relative">
                  <Award className="absolute left-4 top-3.5 w-4 h-4 text-white/30" />
                  <textarea
                    className="form-input !pl-11 resize-none"
                    rows={4}
                    placeholder="Contoh: MS. Office, AutoCAD, Komunikasi, Kerja Tim..."
                    value={formData.skills}
                    onChange={e => update('skills', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="form-label">Sertifikat / Penghargaan</label>
                <textarea
                  className="form-input resize-none"
                  rows={4}
                  placeholder="Contoh: Sertifikat K3, Juara 1 Lomba Desain 2022..."
                  value={formData.certificates}
                  onChange={e => update('certificates', e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Document Upload (complete plan only) */}
        {step === 3 && plan === 'complete' && (
          <DocumentUpload
            workCount={formData.workExperiences.filter(w => w.companyName).length}
            documents={documents}
            onDocumentsChange={setDocuments}
          />
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
          <button
            onClick={handleBack}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-white/60 hover:text-white font-medium transition-all hover:bg-white/5 ${step === 1 ? 'invisible' : ''}`}
          >
            <ChevronLeft className="w-4 h-4" />
            Kembali
          </button>

          {step < totalSteps ? (
            <button onClick={handleNext} className="bg-gradient-to-br from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-black font-bold py-3 px-8 rounded-2xl transition-all shadow-[0_16px_40px_rgba(234,179,8,0.2)] hover:-translate-y-0.5 flex items-center gap-2">
              Lanjut
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-gradient-to-br from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold py-3 px-8 rounded-2xl transition-all shadow-[0_16px_40px_rgba(234,179,8,0.2)] hover:-translate-y-0.5 flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Mengirim...
                </>
              ) : (
                <>
                  🚀 Kirim Pesanan
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
