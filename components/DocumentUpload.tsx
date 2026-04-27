'use client'

import { useRef } from 'react'
import { Upload, CheckCircle, X, Plus } from 'lucide-react'

interface DocumentUploadProps {
  workCount: number
  documents: Record<string, File | null>
  onDocumentsChange: (docs: Record<string, File | null>) => void
}

interface DocField {
  key: string
  label: string
  description: string
  required: boolean
  accept?: string
}

function UploadField({
  docKey,
  label,
  description,
  required,
  accept = 'image/*,.pdf',
  file,
  onFile,
}: {
  docKey: string
  label: string
  description: string
  required: boolean
  accept?: string
  file: File | null
  onFile: (key: string, file: File | null) => void
}) {
  const ref = useRef<HTMLInputElement>(null)

  return (
    <div>
      <label className="form-label">
        {label} {required && <span className="text-yellow-500">*</span>}
      </label>
      <p className="text-xs text-white/30">{description}</p>
      <div
        className={`upload-zone ${file ? 'has-file' : ''}`}
        onClick={() => ref.current?.click()}
      >
        <input
          ref={ref}
          type="file"
          accept={accept}
          className="hidden"
          onChange={e => onFile(docKey, e.target.files?.[0] ?? null)}
        />
        {file ? (
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
              <div className="text-left">
                <p className="text-sm text-green-400 font-semibold truncate max-w-[200px]">{file.name}</p>
                <p className="text-xs text-white/30">{(file.size / 1024).toFixed(0)} KB</p>
              </div>
            </div>
            <button
              onClick={e => { e.stopPropagation(); onFile(docKey, null) }}
              className="text-white/30 hover:text-red-400 transition-colors p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div>
            <Upload className="w-7 h-7 text-white/20 mx-auto mb-2" />
            <p className="text-sm text-white/40 font-medium">Klik untuk upload</p>
            <p className="text-xs text-white/20 mt-1">JPG, PNG, atau PDF — maks 10 MB</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function DocumentUpload({ workCount, documents, onDocumentsChange }: DocumentUploadProps) {
  const handleFile = (key: string, file: File | null) => {
    onDocumentsChange({ ...documents, [key]: file })
  }

  const mandatoryDocs: DocField[] = [
    { key: 'photo', label: 'Foto Pas Foto Terbaru', description: 'Foto formal background merah/biru, ukuran 3×4 atau 4×6.', required: true },
    { key: 'ktp', label: 'KTP (Kartu Tanda Penduduk)', description: 'Scan atau foto KTP yang jelas dan terbaca.', required: true },
    { key: 'ijazah_smk', label: 'Ijazah / SKHUN SMK', description: 'Ijazah atau Surat Keterangan Hasil Ujian Nasional.', required: true },
  ]

  const optionalDocs: DocField[] = [
    { key: 'npwp', label: 'NPWP (Nomor Pokok Wajib Pajak)', description: 'Kartu NPWP jika sudah memiliki.', required: false },
    { key: 'health_cert', label: 'Surat Keterangan Sehat', description: 'Dari dokter atau puskesmas setempat.', required: false },
    { key: 'skck', label: 'SKCK (Surat Keterangan Catatan Kepolisian)', description: 'Surat bebas catatan kriminal dari kepolisian.', required: false },
    { key: 'transcript', label: 'Transkrip Nilai', description: 'Transkrip nilai akademik jika tersedia.', required: false },
    { key: 'diploma_univ', label: 'Ijazah Universitas', description: 'Untuk yang melanjutkan ke perguruan tinggi.', required: false },
    { key: 'internship_cert', label: 'Sertifikat Magang', description: 'Sertifikat magang jika pernah mengikuti magang.', required: false },
    { key: 'vaccine_cert', label: 'Sertifikat Vaksinasi', description: 'Bukti vaksin COVID-19 atau vaksin lainnya.', required: false },
    { key: 'driving_license_a', label: 'SIM A', description: 'Surat Izin Mengemudi A jika dimiliki.', required: false },
    { key: 'driving_license_b', label: 'SIM B', description: 'Surat Izin Mengemudi B jika dimiliki.', required: false },
    { key: 'driving_license_c', label: 'SIM C', description: 'Surat Izin Mengemudi C jika dimiliki.', required: false },
    { key: 'other_cert', label: 'Sertifikat / Penghargaan Lainnya', description: 'Piagam, medali, atau penghargaan lain yang relevan.', required: false },
  ]

  // Dynamic work experience reference letters
  const workRefDocs: DocField[] = Array.from(
    { length: Math.max(workCount, 1) },
    (_, i) => ({
      key: `work_ref_${i + 1}`,
      label: `Surat Referensi Kerja ${workCount > 1 ? `#${i + 1}` : ''}`,
      description: `Surat keterangan pengalaman kerja dari perusahaan ${i + 1}.`,
      required: false,
    })
  )

  return (
    <div className="animate-fade-in space-y-8">
      <div>
        <h3 className="font-outfit font-bold text-xl text-white mb-1">Upload Dokumen Pendukung</h3>
        <p className="text-white/40 text-sm leading-relaxed">
          Upload dokumen-dokumen yang kamu miliki. Dokumen bertanda <span className="text-yellow-500 font-semibold">*</span> wajib disertakan.
          Yang lain bersifat opsional — upload jika kamu punya.
        </p>
      </div>

      {/* Mandatory */}
      <div>
        <div className="section-badge mb-5">
          <span>📋</span> Dokumen Wajib
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {mandatoryDocs.map(doc => (
            <UploadField
              key={doc.key}
              docKey={doc.key}
              label={doc.label}
              description={doc.description}
              required={doc.required}
              file={documents[doc.key] ?? null}
              onFile={handleFile}
            />
          ))}
        </div>
      </div>

      {/* Work Reference Letters */}
      <div>
        <div className="section-badge mb-5">
          <span>💼</span> Surat Referensi Kerja
        </div>
        <p className="text-xs text-white/30 mb-4">
          {workCount > 0
            ? `Berdasarkan ${workCount} pengalaman kerja yang kamu isi, upload surat referensi masing-masing.`
            : 'Jika belum ada pengalaman kerja, bagian ini bisa dilewati.'}
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {workRefDocs.map(doc => (
            <UploadField
              key={doc.key}
              docKey={doc.key}
              label={doc.label}
              description={doc.description}
              required={false}
              file={documents[doc.key] ?? null}
              onFile={handleFile}
            />
          ))}
        </div>
      </div>

      {/* Optional Docs */}
      <div>
        <div className="section-badge mb-5">
          <span>📎</span> Dokumen Opsional
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {optionalDocs.map(doc => (
            <UploadField
              key={doc.key}
              docKey={doc.key}
              label={doc.label}
              description={doc.description}
              required={false}
              file={documents[doc.key] ?? null}
              onFile={handleFile}
            />
          ))}
        </div>
      </div>

      <div className="glass-card rounded-2xl p-4 border border-yellow-500/20 bg-yellow-500/5">
        <p className="text-xs text-yellow-400/80 leading-relaxed">
          💡 <strong>Tips:</strong> Pastikan file yang kamu upload jelas dan terbaca. Format yang diterima adalah JPG, PNG, dan PDF. Ukuran maksimal per file adalah 10 MB.
        </p>
      </div>
    </div>
  )
}
