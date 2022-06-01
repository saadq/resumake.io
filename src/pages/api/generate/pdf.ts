import type { NextApiRequest, NextApiResponse } from 'next'
import latex from 'node-latex'

const template = `
    \\documentclass{article}
    \\begin{document}
    hi REPLACEME
    \\end{document}
  `

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405)
    return
  }

  const fullName = req.body.basics.fullName as string
  const doc = template.replace(/REPLACEME/, fullName)
  const pdf = latex(doc)
  pdf.pipe(res)
  res.setHeader('Content-Type', 'application/pdf')
}
