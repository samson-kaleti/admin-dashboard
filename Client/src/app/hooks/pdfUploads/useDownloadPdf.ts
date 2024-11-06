import { useState } from 'react'

export function useDownloadPdf() {
  const [isDownloading, setIsDownloading] = useState(false)

  const downloadPdf = async (id: number, fileIndex: number) => {
    setIsDownloading(true)
    try {
      const response = await fetch(`http://localhost:5001/api/pdfs/download/${id}/${fileIndex}`)
      if (!response.ok) {
        throw new Error('Failed to download PDF')
      }
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      const contentDisposition = response.headers.get('Content-Disposition')
      let fileName = 'download.pdf'
      if (contentDisposition) {
        const fileNameMatch = contentDisposition.match(/filename="?(.+)"?/);
        if (fileNameMatch && fileNameMatch.length === 2) {
          fileName = fileNameMatch[1];
        }
      }
      a.download = fileName
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading PDF:', error)
      throw error
    } finally {
      setIsDownloading(false)
    }
  }

  return { downloadPdf, isDownloading }
}