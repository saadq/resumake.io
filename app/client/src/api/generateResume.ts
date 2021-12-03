import { FormValues } from '../types/form'

export async function generateResume(formData: FormValues): Promise<string> {
  const pdfResponse = await fetch('/api/generate/pdf', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })

  const pdfBlob = await pdfResponse.blob()
  const pdfUrl = URL.createObjectURL(pdfBlob)

  return pdfUrl
}
