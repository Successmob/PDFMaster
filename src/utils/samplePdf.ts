import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { bytesToBlob } from '../services/pdfEngine';

/**
 * Creates a clean multi-page sample PDF file for testing tools immediately
 */
export async function createSamplePdf(
  title: string = 'Sample Document',
  pageCount: number = 3
): Promise<File> {
  const pdfDoc = await PDFDocument.create();
  const fontTitle = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontBody = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const sampleColors = [
    { r: 0.15, g: 0.38, b: 0.92 }, // Blue
    { r: 0.55, g: 0.23, b: 0.84 }, // Purple
    { r: 0.08, g: 0.65, b: 0.52 }  // Teal
  ];

  for (let i = 1; i <= pageCount; i++) {
    const page = pdfDoc.addPage([595.28, 841.89]); // A4
    const { width, height } = page.getSize();
    const color = sampleColors[(i - 1) % sampleColors.length];

    // Decorative top header bar
    page.drawRectangle({
      x: 0,
      y: height - 8,
      width: width,
      height: 8,
      color: rgb(color.r, color.g, color.b)
    });

    // Brand badge
    page.drawText('PDF MASTER SAMPLE', {
      x: 50,
      y: height - 50,
      size: 10,
      font: fontTitle,
      color: rgb(color.r, color.g, color.b)
    });

    // Title
    page.drawText(`${title} — Page ${i}`, {
      x: 50,
      y: height - 85,
      size: 22,
      font: fontTitle,
      color: rgb(0.1, 0.12, 0.18)
    });

    // Subtitle
    page.drawText(`Generated for testing PDF Master processing tools online.`, {
      x: 50,
      y: height - 110,
      size: 12,
      font: fontBody,
      color: rgb(0.4, 0.45, 0.55)
    });

    // Content box
    page.drawRectangle({
      x: 50,
      y: height - 420,
      width: width - 100,
      height: 280,
      color: rgb(0.97, 0.98, 0.99),
      borderColor: rgb(0.88, 0.91, 0.94),
      borderWidth: 1
    });

    const lines = [
      `Section ${i}: Document Content Overview`,
      `This is automated test paragraph text on page ${i} of ${pageCount}.`,
      `You can use this file to test tools like:`,
      `• Merge PDF and Split PDF`,
      `• Compress PDF and Optimize`,
      `• Rotate, Crop, Reorder and Delete Pages`,
      `• Add Page Numbers, Watermark and Signatures`,
      `• Convert to Word, Excel, and Images`,
      ``,
      `Timestamp: ${new Date().toLocaleDateString()} — Status: Verified`
    ];

    let lineY = height - 165;
    for (const line of lines) {
      const isHeader = line.startsWith('Section');
      page.drawText(line, {
        x: 75,
        y: lineY,
        size: isHeader ? 14 : 11,
        font: isHeader ? fontTitle : fontBody,
        color: isHeader ? rgb(0.12, 0.15, 0.22) : rgb(0.35, 0.4, 0.48)
      });
      lineY -= 20;
    }

    // Page footer
    page.drawText(`Page ${i} of ${pageCount}`, {
      x: width / 2 - 30,
      y: 35,
      size: 10,
      font: fontBody,
      color: rgb(0.6, 0.65, 0.72)
    });
  }

  const bytes = await pdfDoc.save();
  const blob = bytesToBlob(bytes);
  return new File([blob], `${title.toLowerCase().replace(/\s+/g, '_')}.pdf`, {
    type: 'application/pdf'
  });
}
