import { NextResponse } from 'next/server'


export async function POST(request: Request) {
  try {
    const formData = await request.formData()

    const plan = formData.get('plan') as string
    const rawData = formData.get('formData') as string
    const parsed = JSON.parse(rawData)

    // Token dari input pengguna
    const token = process.env.TELEGRAM_BOT_TOKEN || '8503061433:AAGBzt5mscQHnh7TgzXYwKngIFx3TGC-wJA';
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!chatId || chatId === '[ISI_DENGAN_CHAT_ID_KAMU]') {
      console.error('TELEGRAM_CHAT_ID is missing or not configured');
      return NextResponse.json({ 
        success: false, 
        message: 'Gagal! Kamu belum memasukkan TELEGRAM_CHAT_ID di file .env.local.' 
      }, { status: 500 });
    }

    // Build a summary text for logging/notification
    const summary = `📦 *PESANAN BARU — Lazora CV Service*
━━━━━━━━━━━━━━━━━━━━━━━━
*Paket:* ${plan === 'cv' ? 'CV Only (Rp 10.000)' : 'CV + Dokumen Lengkap (Rp 20.000)'}
*Nama:* ${parsed.fullName}
*TTL:* ${parsed.birthPlace}, ${parsed.birthDate}
*HP/WA:* ${parsed.phone}
*Email:* ${parsed.email}
*Alamat:* ${parsed.address}
*Sekolah:* ${parsed.schoolName} — ${parsed.major} (${parsed.graduationYear})
*Hobi:* ${[parsed.hobby1, parsed.hobby2, parsed.hobby3].filter(Boolean).join(', ') || '-'}
*Skills:* ${parsed.skills}
*Sertifikat:* ${parsed.certificates || '-'}

*Pengalaman Kerja:*
${parsed.workExperiences.map((w: { companyName: string; position: string; duration: string }, i: number) =>
  `${i + 1}. ${w.companyName || '-'} | ${w.position || '-'} | ${w.duration || '-'}`
).join('\n')}
━━━━━━━━━━━━━━━━━━━━━━━━`;

    console.log('Sending message to Telegram...');

    // 1. Send text summary
    const textResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: summary,
        parse_mode: 'Markdown',
      }),
    });

    if (!textResponse.ok) {
      console.error('Failed to send text summary to Telegram:', await textResponse.text());
    }

    // 2. Send uploaded documents
    const docKeys = Array.from(formData.keys()).filter(k => k !== 'plan' && k !== 'formData');
    console.log(`Sending ${docKeys.length} documents...`);

    for (const key of docKeys) {
      const file = formData.get(key);
      if (file && typeof file === 'object' && 'name' in file) {
        // Prepare multipart form data for file upload
        const fileForm = new FormData();
        fileForm.append('chat_id', chatId);
        fileForm.append('document', file as any);
        fileForm.append('caption', `Dokumen: ${key}`);

        const docResponse = await fetch(`https://api.telegram.org/bot${token}/sendDocument`, {
          method: 'POST',
          body: fileForm as any,
        });

        if (!docResponse.ok) {
          console.error(`Failed to send document ${key}:`, await docResponse.text());
        }
      }
    }

    return NextResponse.json({ success: true, message: 'Pesanan berhasil dikirim ke Telegram.' })
  } catch (error) {
    console.error('Order API error:', error)
    return NextResponse.json({ success: false, message: 'Terjadi kesalahan server.' }, { status: 500 })
  }
}
