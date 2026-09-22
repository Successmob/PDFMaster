import { ToolDefinition } from '../types';

export const TOOLS: ToolDefinition[] = [
  // 1. Merge PDF
  {
    id: 'merge-pdf',
    slug: '/merge-pdf',
    title: 'Merge PDF',
    shortDesc: 'Combine multiple PDF files into one document in your chosen order.',
    detailedDesc: 'Merge multiple PDF files into a single consolidated PDF document easily and in seconds. Drag and drop to reorder pages and files before merging.',
    category: 'organize',
    badge: 'Popular',
    icon: 'Layers',
    accentColor: '#3b82f6',
    accept: '.pdf,application/pdf',
    acceptLabel: 'PDF Files',
    multiple: true,
    maxFileSizeMb: 100,
    howToSteps: [
      { title: 'Upload your PDFs', desc: 'Select or drag & drop two or more PDF files from your computer or phone.' },
      { title: 'Arrange order', desc: 'Drag files into the exact sequence you want them to appear in the combined document.' },
      { title: 'Merge & Download', desc: 'Click "Merge PDF" to combine the files and download your unified document instantly.' }
    ],
    faq: [
      { q: 'Can I reorder files before merging?', a: 'Yes! You can drag and drop file cards to change their order before generating the merged file.' },
      { q: 'Are my files safe and private?', a: 'All processing takes place securely in your web browser. No files are stored or exposed to external servers.' },
      { q: 'Is there a limit to how many files I can merge?', a: 'You can merge dozens of PDF documents at once up to 100MB.' }
    ],
    seoTitle: 'Merge PDF Online — Combine Multiple PDF Files Free',
    metaDesc: 'Combine multiple PDF documents into a single file online. Fast, secure, and free with PDF Master.'
  },

  // 2. Split PDF
  {
    id: 'split-pdf',
    slug: '/split-pdf',
    title: 'Split PDF',
    shortDesc: 'Separate one or multiple pages or split into individual documents.',
    detailedDesc: 'Extract individual pages or split your PDF by page ranges into separate standalone PDF documents with high precision.',
    category: 'organize',
    badge: 'Popular',
    icon: 'Scissors',
    accentColor: '#8b5cf6',
    accept: '.pdf,application/pdf',
    acceptLabel: 'PDF File',
    multiple: false,
    maxFileSizeMb: 80,
    howToSteps: [
      { title: 'Choose your PDF', desc: 'Upload the document you want to split or separate.' },
      { title: 'Set page ranges', desc: 'Choose to extract all pages separately or specify exact ranges (e.g. 1-3, 5, 8-10).' },
      { title: 'Split & Download', desc: 'Process the split and download your extracted PDF files right away.' }
    ],
    faq: [
      { q: 'Can I split specific page ranges?', a: 'Yes, choose custom ranges like 1-5, 8, 11-15 to extract only the portions you need.' },
      { q: 'Will the original quality be maintained?', a: 'Absolutely, vector graphics, text clarity, and resolutions remain 100% untouched.' }
    ],
    seoTitle: 'Split PDF Online — Extract and Separate PDF Pages',
    metaDesc: 'Split PDF pages into separate documents or extract specific page ranges instantly.'
  },

  // 3. Compress PDF
  {
    id: 'compress-pdf',
    slug: '/compress-pdf',
    title: 'Compress PDF',
    shortDesc: 'Reduce file size while optimizing for maximum document quality.',
    detailedDesc: 'Shrink your large PDF documents to optimize for email attachments, web uploading, and storage while preserving sharp text and images.',
    category: 'optimize',
    badge: 'Popular',
    icon: 'Minimize2',
    accentColor: '#06b6d4',
    accept: '.pdf,application/pdf',
    acceptLabel: 'PDF File',
    multiple: false,
    maxFileSizeMb: 120,
    howToSteps: [
      { title: 'Upload PDF', desc: 'Select the PDF file whose size you want to reduce.' },
      { title: 'Select Compression Level', desc: 'Choose between Recommended (balanced), Extreme (smallest size), or Less (highest quality).' },
      { title: 'Compress & Save', desc: 'Click Compress PDF to optimize objects and streams, then download your lighter file.' }
    ],
    faq: [
      { q: 'How much smaller will my PDF become?', a: 'Depending on the images and object streams, compression typically reduces file size between 40% and 85%.' },
      { q: 'Does compression alter my text content?', a: 'No, all text elements remain fully searchable and vector-sharp.' }
    ],
    seoTitle: 'Compress PDF Online — Reduce PDF File Size Free',
    metaDesc: 'Compress PDF documents online while maintaining quality. Fast, private, and optimized for sharing.'
  },

  // 4. PDF to JPG
  {
    id: 'pdf-to-jpg',
    slug: '/pdf-to-jpg',
    title: 'PDF to JPG',
    shortDesc: 'Convert PDF pages into high-resolution JPG image files.',
    detailedDesc: 'Transform each page of your PDF document into crisp JPG pictures. Download individual images or all pages in one convenient package.',
    category: 'convert-from-pdf',
    badge: 'Popular',
    icon: 'Image',
    accentColor: '#10b981',
    accept: '.pdf,application/pdf',
    acceptLabel: 'PDF File',
    multiple: false,
    maxFileSizeMb: 60,
    howToSteps: [
      { title: 'Upload PDF', desc: 'Upload the PDF document you want to convert into images.' },
      { title: 'Configure Quality', desc: 'Select high-resolution or standard rendering settings.' },
      { title: 'Convert & Download', desc: 'View rendered page previews and download high-quality JPG files.' }
    ],
    faq: [
      { q: 'What resolution are the extracted JPGs?', a: 'Pages are rendered at up to 300 DPI equivalent for crisp readability and printing.' },
      { q: 'Can I download all pages at once?', a: 'Yes, download pages individually or batch-download all pages.' }
    ],
    seoTitle: 'PDF to JPG Converter — Convert PDF Pages to Images Online',
    metaDesc: 'Extract pages from your PDF file into high-quality JPG images directly in your browser.'
  },

  // 5. JPG to PDF
  {
    id: 'jpg-to-pdf',
    slug: '/jpg-to-pdf',
    title: 'JPG to PDF',
    shortDesc: 'Convert JPG images into a single professional PDF document.',
    detailedDesc: 'Transform individual or multiple JPG photos into a clean, printable PDF document. Customize orientation, margins, and page order.',
    category: 'convert-to-pdf',
    badge: 'Popular',
    icon: 'FileImage',
    accentColor: '#f59e0b',
    accept: '.jpg,.jpeg,image/jpeg',
    acceptLabel: 'JPG Images',
    multiple: true,
    maxFileSizeMb: 50,
    howToSteps: [
      { title: 'Upload JPGs', desc: 'Select one or more JPG images from your device.' },
      { title: 'Adjust layout', desc: 'Choose page orientation (Portrait/Landscape) and margin sizing.' },
      { title: 'Generate PDF', desc: 'Compile your images into a clean PDF document and download instantly.' }
    ],
    faq: [
      { q: 'Can I combine multiple JPGs into one PDF?', a: 'Yes! Select multiple photos and they will be compiled into sequential pages.' }
    ],
    seoTitle: 'JPG to PDF Converter — Turn Images into PDF Online',
    metaDesc: 'Convert JPG pictures into a consolidated PDF document online with custom page layout.'
  },

  // 6. PDF to PNG
  {
    id: 'pdf-to-png',
    slug: '/pdf-to-png',
    title: 'PDF to PNG',
    shortDesc: 'Convert PDF pages into lossless, transparent PNG pictures.',
    detailedDesc: 'Extract pages from your PDF document as high-definition, lossless PNG image files perfect for graphic design and web publishing.',
    category: 'convert-from-pdf',
    icon: 'ImagePlus',
    accentColor: '#14b8a6',
    accept: '.pdf,application/pdf',
    acceptLabel: 'PDF File',
    multiple: false,
    maxFileSizeMb: 60,
    howToSteps: [
      { title: 'Upload PDF', desc: 'Select the PDF file you wish to render as PNG images.' },
      { title: 'Render Pages', desc: 'Our engine renders vector-clear PNG graphics for each document page.' },
      { title: 'Save Images', desc: 'Download your lossless PNG files individually or as a complete bundle.' }
    ],
    faq: [
      { q: 'Why choose PNG over JPG?', a: 'PNG delivers lossless compression without compression artifacts, ideal for documents with graphs and typography.' }
    ],
    seoTitle: 'PDF to PNG Converter — High Quality Lossless PNG Images',
    metaDesc: 'Convert PDF document pages to crisp, lossless PNG images online.'
  },

  // 7. PNG to PDF
  {
    id: 'png-to-pdf',
    slug: '/png-to-pdf',
    title: 'PNG to PDF',
    shortDesc: 'Combine PNG images into a clean and organized PDF file.',
    detailedDesc: 'Convert multiple PNG graphic assets, screenshots, or receipts into a neatly formatted, printable PDF document.',
    category: 'convert-to-pdf',
    icon: 'FileSpreadsheet',
    accentColor: '#3b82f6',
    accept: '.png,image/png',
    acceptLabel: 'PNG Images',
    multiple: true,
    maxFileSizeMb: 50,
    howToSteps: [
      { title: 'Select PNGs', desc: 'Upload your PNG files.' },
      { title: 'Arrange order', desc: 'Order your photos and select page margins.' },
      { title: 'Create PDF', desc: 'Generate and download your combined PDF.' }
    ],
    faq: [
      { q: 'Does PNG transparency get preserved?', a: 'Transparent backgrounds are rendered smoothly on clean white standard page canvases.' }
    ],
    seoTitle: 'PNG to PDF Converter — Turn PNG Images into PDF',
    metaDesc: 'Convert PNG graphics and pictures to PDF documents online.'
  },

  // 8. PDF to Word
  {
    id: 'pdf-to-word',
    slug: '/pdf-to-word',
    title: 'PDF to Word',
    shortDesc: 'Convert PDF documents into editable Microsoft Word (.docx) files.',
    detailedDesc: 'Extract text paragraphs, headers, and document structure from your PDF and generate an editable Word (.docx) document.',
    category: 'convert-from-pdf',
    badge: 'Popular',
    icon: 'FileText',
    accentColor: '#2563eb',
    accept: '.pdf,application/pdf',
    acceptLabel: 'PDF File',
    multiple: false,
    maxFileSizeMb: 50,
    howToSteps: [
      { title: 'Upload PDF', desc: 'Choose the PDF file you want to make editable.' },
      { title: 'Process Text & Layout', desc: 'Our parser extracts structured text blocks, headings, and formatting.' },
      { title: 'Download DOCX', desc: 'Open and edit the converted document directly in Microsoft Word, Google Docs, or Pages.' }
    ],
    faq: [
      { q: 'Is the Word file editable?', a: 'Yes, the output is a standard .docx file that you can edit in any modern word processor.' }
    ],
    seoTitle: 'PDF to Word Converter — Convert PDF to Editable DOCX',
    metaDesc: 'Convert PDF files to editable Microsoft Word (.docx) format online with PDF Master.'
  },

  // 9. Word to PDF
  {
    id: 'word-to-pdf',
    slug: '/word-to-pdf',
    title: 'Word to PDF',
    shortDesc: 'Convert Microsoft Word (.docx) documents into professional PDFs.',
    detailedDesc: 'Convert DOCX files into fixed-layout, universally compatible PDF documents that look consistent across all devices.',
    category: 'convert-to-pdf',
    badge: 'Popular',
    icon: 'FileCheck',
    accentColor: '#1d4ed8',
    accept: '.docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    acceptLabel: 'Word Document (.docx)',
    multiple: false,
    maxFileSizeMb: 50,
    howToSteps: [
      { title: 'Upload DOCX', desc: 'Select the Word file you want to convert.' },
      { title: 'Format & Render', desc: 'Text styling, lists, and formatting are compiled into standard PDF pages.' },
      { title: 'Download PDF', desc: 'Save your ready-to-share PDF document.' }
    ],
    faq: [
      { q: 'Can anyone open the output PDF?', a: 'Yes, PDFs open uniformly on smartphones, tablets, Windows, Mac, and Linux.' }
    ],
    seoTitle: 'Word to PDF Converter — Convert DOCX to PDF Online',
    metaDesc: 'Convert Word documents (.docx) to PDF format online.'
  },

  // 10. PDF to Excel
  {
    id: 'pdf-to-excel',
    slug: '/pdf-to-excel',
    title: 'PDF to Excel',
    shortDesc: 'Extract data and tables from PDF into editable Excel (.xlsx) spreadsheets.',
    detailedDesc: 'Extract data rows, financial statements, and tabular content from PDF files directly into structured Excel (.xlsx) spreadsheets.',
    category: 'convert-from-pdf',
    badge: 'Popular',
    icon: 'Sheet',
    accentColor: '#059669',
    accept: '.pdf,application/pdf',
    acceptLabel: 'PDF File',
    multiple: false,
    maxFileSizeMb: 40,
    howToSteps: [
      { title: 'Upload PDF', desc: 'Select the document containing tables or data rows.' },
      { title: 'Extract Tabular Data', desc: 'The parser identifies text columns and row alignments.' },
      { title: 'Download Spreadsheet', desc: 'Get your structured .xlsx file ready for analysis in Excel or Google Sheets.' }
    ],
    faq: [
      { q: 'Does it work with multi-column tables?', a: 'Yes, columns and rows are parsed and mapped to spreadsheet cells.' }
    ],
    seoTitle: 'PDF to Excel Converter — Extract PDF Tables to XLSX',
    metaDesc: 'Convert PDF tables and reports into editable Microsoft Excel spreadsheets.'
  },

  // 11. Excel to PDF
  {
    id: 'excel-to-pdf',
    slug: '/excel-to-pdf',
    title: 'Excel to PDF',
    shortDesc: 'Convert Excel spreadsheets (.xlsx, .csv) into clean PDF reports.',
    detailedDesc: 'Transform Excel sheets and CSV datasets into formatted, printable PDF tables with clean borders and column headers.',
    category: 'convert-to-pdf',
    icon: 'Table',
    accentColor: '#15803d',
    accept: '.xlsx,.xls,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv',
    acceptLabel: 'Excel / CSV File',
    multiple: false,
    maxFileSizeMb: 30,
    howToSteps: [
      { title: 'Upload Spreadsheet', desc: 'Select your .xlsx, .xls, or .csv workbook.' },
      { title: 'Format Sheets', desc: 'Spreadsheet rows and headers are formatted into structured pages.' },
      { title: 'Download PDF', desc: 'Save your print-ready financial or data summary PDF.' }
    ],
    faq: [
      { q: 'Are cell gridlines included?', a: 'Yes, tables are formatted with crisp borders and clean cell padding for easy reading.' }
    ],
    seoTitle: 'Excel to PDF Converter — Turn Spreadsheets into PDF Online',
    metaDesc: 'Convert Excel workbooks (.xlsx) and CSV files into professional PDF reports.'
  },

  // 12. PDF to PowerPoint
  {
    id: 'pdf-to-powerpoint',
    slug: '/pdf-to-powerpoint',
    title: 'PDF to PowerPoint',
    shortDesc: 'Convert PDF pages into presentation slides.',
    detailedDesc: 'Transform PDF pages into slide deck assets for presentation in Microsoft PowerPoint and Google Slides.',
    category: 'convert-from-pdf',
    icon: 'Presentation',
    accentColor: '#ea580c',
    accept: '.pdf,application/pdf',
    acceptLabel: 'PDF File',
    multiple: false,
    maxFileSizeMb: 50,
    howToSteps: [
      { title: 'Upload PDF', desc: 'Select the PDF slide deck or document.' },
      { title: 'Process Slides', desc: 'Each page is rendered as an optimized presentation slide.' },
      { title: 'Download Deck', desc: 'Open your presentation in PowerPoint or Google Slides.' }
    ],
    faq: [
      { q: 'Is aspect ratio preserved?', a: 'Yes, slide dimensions (4:3 or 16:9) are matched accurately.' }
    ],
    seoTitle: 'PDF to PowerPoint Converter — Turn PDFs into Slide Decks',
    metaDesc: 'Convert PDF documents into presentation slides online.'
  },

  // 13. PowerPoint to PDF
  {
    id: 'powerpoint-to-pdf',
    slug: '/powerpoint-to-pdf',
    title: 'PowerPoint to PDF',
    shortDesc: 'Convert PPTX presentations into easy-to-share PDF decks.',
    detailedDesc: 'Compile presentation slides into a unified, secure PDF document that opens reliably on any projector or audience device.',
    category: 'convert-to-pdf',
    icon: 'MonitorPlay',
    accentColor: '#c2410c',
    accept: '.pptx,application/vnd.openxmlformats-officedocument.presentationml.presentation',
    acceptLabel: 'PowerPoint File (.pptx)',
    multiple: false,
    maxFileSizeMb: 50,
    howToSteps: [
      { title: 'Upload PPTX', desc: 'Select the presentation file from your device.' },
      { title: 'Render Slides', desc: 'Slides and layout are converted into fixed-format PDF pages.' },
      { title: 'Download PDF', desc: 'Save your presentation PDF ready for distribution.' }
    ],
    faq: [
      { q: 'Will fonts look right on other computers?', a: 'Yes! PDF embeds formatting so your slides look identical everywhere.' }
    ],
    seoTitle: 'PowerPoint to PDF Converter — Turn PPTX into PDF Online',
    metaDesc: 'Convert Microsoft PowerPoint presentations into PDF documents.'
  },

  // 14. Rotate PDF
  {
    id: 'rotate-pdf',
    slug: '/rotate-pdf',
    title: 'Rotate PDF',
    shortDesc: 'Rotate individual pages or all pages 90, 180, or 270 degrees.',
    detailedDesc: 'Fix upside down or sideways PDF pages. Rotate specific pages or the entire document clockwise or counterclockwise with visual live preview.',
    category: 'organize',
    badge: 'Popular',
    icon: 'RotateCw',
    accentColor: '#6366f1',
    accept: '.pdf,application/pdf',
    acceptLabel: 'PDF File',
    multiple: false,
    maxFileSizeMb: 80,
    howToSteps: [
      { title: 'Upload PDF', desc: 'Choose the PDF with pages that need rotation.' },
      { title: 'Rotate Pages', desc: 'Click individual rotate icons on each page or rotate all pages at once.' },
      { title: 'Save Document', desc: 'Apply rotations and download your properly oriented PDF.' }
    ],
    faq: [
      { q: 'Can I rotate just one page?', a: 'Yes, each page has independent rotation buttons so you only rotate what needs fixing.' }
    ],
    seoTitle: 'Rotate PDF Online — Rotate PDF Pages 90, 180, 270 Degrees',
    metaDesc: 'Rotate PDF pages online and save permanently. Simple visual page orientation tool.'
  },

  // 15. Organize PDF Pages
  {
    id: 'organize-pdf',
    slug: '/organize-pdf',
    title: 'Organize PDF Pages',
    shortDesc: 'Rearrange, reorder, sort, and organize pages visually.',
    detailedDesc: 'Drag and drop page thumbnails to reorder your document, duplicate pages, or rearrange the flow of your document with ease.',
    category: 'organize',
    icon: 'LayoutGrid',
    accentColor: '#8b5cf6',
    accept: '.pdf,application/pdf',
    acceptLabel: 'PDF File',
    multiple: false,
    maxFileSizeMb: 80,
    howToSteps: [
      { title: 'Upload PDF', desc: 'Upload the document you wish to reorder.' },
      { title: 'Drag & Reorder', desc: 'Drag page thumbnails to your desired position.' },
      { title: 'Save PDF', desc: 'Generate your newly structured PDF with one click.' }
    ],
    faq: [
      { q: 'Can I see page contents before moving them?', a: 'Yes, high-resolution live page thumbnails are rendered for every page.' }
    ],
    seoTitle: 'Organize PDF Pages Online — Sort and Reorder PDF Pages',
    metaDesc: 'Reorder, rearrange, and sort PDF pages visually with drag and drop.'
  },

  // 16. Delete PDF Pages
  {
    id: 'delete-pdf-pages',
    slug: '/delete-pdf-pages',
    title: 'Delete PDF Pages',
    shortDesc: 'Remove unwanted pages, blank sheets, or duplicate content.',
    detailedDesc: 'Click on unnecessary pages to delete them from your PDF document. Preview thumbnails make finding the right pages fast and painless.',
    category: 'organize',
    icon: 'Trash2',
    accentColor: '#ef4444',
    accept: '.pdf,application/pdf',
    acceptLabel: 'PDF File',
    multiple: false,
    maxFileSizeMb: 80,
    howToSteps: [
      { title: 'Upload PDF', desc: 'Select the PDF file you want to edit.' },
      { title: 'Select Pages to Remove', desc: 'Click the delete icon on any thumbnail you want to discard.' },
      { title: 'Save Clean PDF', desc: 'Download your trimmed document without the unwanted pages.' }
    ],
    faq: [
      { q: 'Can I undo a deleted page before downloading?', a: 'Yes, you can toggle pages back and forth before saving.' }
    ],
    seoTitle: 'Delete PDF Pages Online — Remove Pages from PDF',
    metaDesc: 'Remove unwanted or blank pages from your PDF file online in seconds.'
  },

  // 17. Extract PDF Pages
  {
    id: 'extract-pdf-pages',
    slug: '/extract-pdf-pages',
    title: 'Extract PDF Pages',
    shortDesc: 'Extract specific pages into a new customized PDF file.',
    detailedDesc: 'Select key pages or specify custom ranges to extract into a dedicated new PDF document without modifying the original.',
    category: 'organize',
    icon: 'FileOutput',
    accentColor: '#0ea5e9',
    accept: '.pdf,application/pdf',
    acceptLabel: 'PDF File',
    multiple: false,
    maxFileSizeMb: 80,
    howToSteps: [
      { title: 'Upload PDF', desc: 'Upload the source document.' },
      { title: 'Pick Pages', desc: 'Click the specific pages you need or type a page range like 2, 4-7.' },
      { title: 'Extract & Download', desc: 'Create a new PDF containing exclusively your selected pages.' }
    ],
    faq: [
      { q: 'Will this alter my original file?', a: 'No, your original file remains untouched on your device.' }
    ],
    seoTitle: 'Extract PDF Pages Online — Select and Save Specific Pages',
    metaDesc: 'Extract selected pages from any PDF into a new document online.'
  },

  // 18. Watermark PDF
  {
    id: 'watermark-pdf',
    slug: '/watermark-pdf',
    title: 'Watermark PDF',
    shortDesc: 'Add custom text or image watermarks with opacity and rotation control.',
    detailedDesc: 'Stamp confidential labels, company names, copyright notices, or custom logos across all pages of your PDF document.',
    category: 'edit-security',
    icon: 'Stamp',
    accentColor: '#d97706',
    accept: '.pdf,application/pdf',
    acceptLabel: 'PDF File',
    multiple: false,
    maxFileSizeMb: 80,
    howToSteps: [
      { title: 'Upload PDF', desc: 'Select the document you want to brand or protect.' },
      { title: 'Customize Watermark', desc: 'Type your text (e.g. CONFIDENTIAL, DRAFT), set opacity, font size, angle, and position.' },
      { title: 'Apply & Download', desc: 'Download your protected, watermarked PDF.' }
    ],
    faq: [
      { q: 'Can I adjust watermark transparency?', a: 'Yes, you can set opacity between 10% (subtle) and 100% (bold).' }
    ],
    seoTitle: 'Watermark PDF Online — Add Text or Image Watermarks to PDF',
    metaDesc: 'Add custom text watermarks to your PDF documents online with full opacity and positioning control.'
  },

  // 19. Protect PDF
  {
    id: 'protect-pdf',
    slug: '/protect-pdf',
    title: 'Protect PDF with Password',
    shortDesc: 'Encrypt your PDF with a secure password to prevent unauthorized access.',
    detailedDesc: 'Add strong password encryption to confidential contracts, financial records, or personal data before sharing.',
    category: 'edit-security',
    badge: 'Essential',
    icon: 'Lock',
    accentColor: '#dc2626',
    accept: '.pdf,application/pdf',
    acceptLabel: 'PDF File',
    multiple: false,
    maxFileSizeMb: 80,
    howToSteps: [
      { title: 'Upload PDF', desc: 'Select the sensitive document you wish to encrypt.' },
      { title: 'Enter Password', desc: 'Choose a strong password and confirm it.' },
      { title: 'Download Encrypted PDF', desc: 'Your new file will require the password to open in any PDF viewer.' }
    ],
    faq: [
      { q: 'What happens if I forget the password?', a: 'Because encryption is performed securely, always make sure to keep a copy of your password.' }
    ],
    seoTitle: 'Protect PDF with Password Online — Encrypt PDF Free',
    metaDesc: 'Secure your PDF documents with password encryption online.'
  },

  // 20. Unlock PDF
  {
    id: 'unlock-pdf',
    slug: '/unlock-pdf',
    title: 'Unlock PDF',
    shortDesc: 'Remove password and restrictions from unlocked PDF files.',
    detailedDesc: 'Remove user passwords and permission restrictions from your PDFs so you can freely read, edit, and print them without prompts.',
    category: 'edit-security',
    icon: 'Unlock',
    accentColor: '#16a34a',
    accept: '.pdf,application/pdf',
    acceptLabel: 'PDF File',
    multiple: false,
    maxFileSizeMb: 80,
    howToSteps: [
      { title: 'Upload Locked PDF', desc: 'Select the password-protected document.' },
      { title: 'Enter Password once', desc: 'Provide the authorized password to decrypt the file streams.' },
      { title: 'Download Decrypted PDF', desc: 'Save an unrestricted version that opens without any password.' }
    ],
    faq: [
      { q: 'Can I unlock a file if I know the password?', a: 'Yes, entering the password once unlocks the file permanently for subsequent views.' }
    ],
    seoTitle: 'Unlock PDF Online — Remove PDF Password and Restrictions',
    metaDesc: 'Unlock password-protected PDFs and remove security restrictions online.'
  },

  // 21. Sign PDF
  {
    id: 'sign-pdf',
    slug: '/sign-pdf',
    title: 'Sign PDF',
    shortDesc: 'Draw, type, or upload your signature to place onto PDF pages.',
    detailedDesc: 'Sign agreements, invoices, and contracts online. Draw your signature on touchscreen or mouse, choose from stylized signatures, or upload a stamp.',
    category: 'edit-security',
    badge: 'Popular',
    icon: 'PenTool',
    accentColor: '#4f46e5',
    accept: '.pdf,application/pdf',
    acceptLabel: 'PDF File',
    multiple: false,
    maxFileSizeMb: 80,
    howToSteps: [
      { title: 'Upload PDF', desc: 'Upload the document requiring your signature.' },
      { title: 'Create Signature', desc: 'Draw your signature, type your name, or upload an image of your signature.' },
      { title: 'Place & Save', desc: 'Drag and position your signature on the target page, adjust scale, and download.' }
    ],
    faq: [
      { q: 'Can I sign on mobile or tablet?', a: 'Yes! The touch signature canvas works smoothly with fingers and stylus pens.' }
    ],
    seoTitle: 'Sign PDF Online — Electronically Sign PDF Documents Free',
    metaDesc: 'Draw, type, or upload your electronic signature and sign PDF documents online.'
  },

  // 22. Add Page Numbers
  {
    id: 'add-page-numbers',
    slug: '/add-page-numbers',
    title: 'Add Page Numbers',
    shortDesc: 'Insert sequential page numbers with custom position and format.',
    detailedDesc: 'Number pages in your document accurately. Choose from multiple numbering formats (e.g., "1", "Page 1", "1 of N"), positions, fonts, and margins.',
    category: 'organize',
    icon: 'Hash',
    accentColor: '#0284c7',
    accept: '.pdf,application/pdf',
    acceptLabel: 'PDF File',
    multiple: false,
    maxFileSizeMb: 80,
    howToSteps: [
      { title: 'Upload PDF', desc: 'Select the document you want to number.' },
      { title: 'Customize Style', desc: 'Pick location (bottom right, bottom center, top right) and numbering pattern.' },
      { title: 'Download Numbered PDF', desc: 'Apply numbers across all pages and save the updated file.' }
    ],
    faq: [
      { q: 'Can I start numbering from a specific number?', a: 'Yes, you can set the starting index to any page number you require.' }
    ],
    seoTitle: 'Add Page Numbers to PDF Online — Insert Pagination',
    metaDesc: 'Add customizable page numbers and pagination headers to PDF files online.'
  },

  // 23. Crop PDF
  {
    id: 'crop-pdf',
    slug: '/crop-pdf',
    title: 'Crop PDF',
    shortDesc: 'Trim margins and crop PDF pages to custom dimensions.',
    detailedDesc: 'Remove excess margins, headers, or whitespace from your PDF pages for cleaner printing and presentation.',
    category: 'organize',
    icon: 'Crop',
    accentColor: '#7c3aed',
    accept: '.pdf,application/pdf',
    acceptLabel: 'PDF File',
    multiple: false,
    maxFileSizeMb: 60,
    howToSteps: [
      { title: 'Upload PDF', desc: 'Upload the file with margins you want to trim.' },
      { title: 'Adjust Crop Insets', desc: 'Specify margin reductions for top, bottom, left, and right edges.' },
      { title: 'Save Cropped PDF', desc: 'Download your cleanly cropped PDF document.' }
    ],
    faq: [
      { q: 'Does cropping reduce file quality?', a: 'No, cropping adjusts the visible page bounding box without degrading vectors or images.' }
    ],
    seoTitle: 'Crop PDF Online — Trim PDF Page Margins',
    metaDesc: 'Crop PDF pages and trim margins online easily with live preview.'
  },

  // 24. Repair PDF
  {
    id: 'repair-pdf',
    slug: '/repair-pdf',
    title: 'Repair PDF',
    shortDesc: 'Fix damaged, corrupted, or unreadable PDF document files.',
    detailedDesc: 'Analyze and reconstruct damaged PDF headers, broken cross-reference tables, and corrupt object streams to recover your document content.',
    category: 'optimize',
    icon: 'Wrench',
    accentColor: '#e11d48',
    accept: '.pdf,application/pdf',
    acceptLabel: 'PDF File',
    multiple: false,
    maxFileSizeMb: 80,
    howToSteps: [
      { title: 'Upload Damaged PDF', desc: 'Select the file that causes errors when opening.' },
      { title: 'Diagnostic & Rebuild', desc: 'Our repair engine parses readable objects and reconstructs the XREF table.' },
      { title: 'Download Repaired PDF', desc: 'Save a clean, compliant PDF file ready to open in any reader.' }
    ],
    faq: [
      { q: 'Can every corrupt PDF be recovered?', a: 'Most common corruption issues (damaged headers, truncated trailers, bad xrefs) can be successfully restored.' }
    ],
    seoTitle: 'Repair PDF Online — Fix Damaged and Corrupt PDF Files',
    metaDesc: 'Recover and repair damaged, corrupted, or unreadable PDF files online.'
  },

  // 25. OCR PDF
  {
    id: 'ocr-pdf',
    slug: '/ocr-pdf',
    title: 'OCR PDF',
    shortDesc: 'Recognize text from scanned PDF documents and make it searchable.',
    detailedDesc: 'Extract text from scanned PDF pages and images using optical character recognition (OCR) into selectable and searchable text.',
    category: 'convert-from-pdf',
    badge: 'Pro',
    icon: 'ScanText',
    accentColor: '#9333ea',
    accept: '.pdf,application/pdf',
    acceptLabel: 'Scanned PDF',
    multiple: false,
    maxFileSizeMb: 50,
    howToSteps: [
      { title: 'Upload Scanned PDF', desc: 'Select the scanned paper document or photo PDF.' },
      { title: 'OCR Recognition', desc: 'The optical character engine scans characters and paragraphs.' },
      { title: 'Copy or Export Text', desc: 'Copy recognized text directly or download a searchable text document.' }
    ],
    faq: [
      { q: 'Does it recognize printed documents?', a: 'Yes, printed contracts, invoices, letters, and receipts are recognized accurately.' }
    ],
    seoTitle: 'OCR PDF Online — Convert Scanned PDFs to Searchable Text',
    metaDesc: 'Perform Optical Character Recognition (OCR) on scanned PDF files online.'
  },

  // 26. HTML to PDF
  {
    id: 'html-to-pdf',
    slug: '/html-to-pdf',
    title: 'HTML to PDF',
    shortDesc: 'Convert web page code or HTML snippets into formatted PDF.',
    detailedDesc: 'Paste HTML code, web content, or formatted rich text and generate a clean PDF document with preserved CSS styling and typography.',
    category: 'convert-to-pdf',
    icon: 'Code2',
    accentColor: '#0891b2',
    accept: '.html,.htm,text/html',
    acceptLabel: 'HTML File or Text',
    multiple: false,
    maxFileSizeMb: 20,
    howToSteps: [
      { title: 'Paste or Upload HTML', desc: 'Paste your HTML markup or upload an .html file.' },
      { title: 'Preview Document', desc: 'View live rendered layout in the preview box.' },
      { title: 'Generate PDF', desc: 'Render into a high quality PDF ready for print or sharing.' }
    ],
    faq: [
      { q: 'Can I type custom HTML directly?', a: 'Yes, there is an interactive code editor where you can paste or write HTML.' }
    ],
    seoTitle: 'HTML to PDF Converter — Convert HTML Code to PDF Online',
    metaDesc: 'Convert HTML code and web content into clean PDF files online.'
  },

  // 27. Images to PDF
  {
    id: 'images-to-pdf',
    slug: '/images-to-pdf',
    title: 'Images to PDF',
    shortDesc: 'Convert mixed images (JPG, PNG, WebP, GIF) into one PDF.',
    detailedDesc: 'Combine multiple photos, receipts, or screenshots in various formats into a single, beautifully formatted PDF booklet.',
    category: 'convert-to-pdf',
    badge: 'Popular',
    icon: 'Images',
    accentColor: '#2563eb',
    accept: 'image/*',
    acceptLabel: 'Any Images (JPG, PNG, WebP, etc.)',
    multiple: true,
    maxFileSizeMb: 60,
    howToSteps: [
      { title: 'Upload Images', desc: 'Select photos of any format (JPG, PNG, WebP, GIF).' },
      { title: 'Organize & Orient', desc: 'Reorder pictures and pick page fit options.' },
      { title: 'Generate PDF', desc: 'Download your compiled photo album or document collection.' }
    ],
    faq: [
      { q: 'Can I mix different image formats?', a: 'Yes, you can upload PNGs, JPGs, and WebPs together in the same job.' }
    ],
    seoTitle: 'Images to PDF Converter — Turn Multiple Photos into PDF',
    metaDesc: 'Convert and merge multiple image formats into a single PDF document.'
  },

  // 28. Text to PDF
  {
    id: 'text-to-pdf',
    slug: '/text-to-pdf',
    title: 'Text to PDF',
    shortDesc: 'Convert plain text, notes, or Markdown into formatted PDF.',
    detailedDesc: 'Paste or write notes, articles, contracts, or code, and format them into clean, paginated PDF documents with custom typography.',
    category: 'convert-to-pdf',
    icon: 'FileCode',
    accentColor: '#475569',
    accept: '.txt,.md,text/plain,text/markdown',
    acceptLabel: 'Text / Markdown File',
    multiple: false,
    maxFileSizeMb: 20,
    howToSteps: [
      { title: 'Enter Text', desc: 'Type directly in the text editor or upload a .txt / .md file.' },
      { title: 'Customize Styling', desc: 'Choose font size, line spacing, and header titles.' },
      { title: 'Generate PDF', desc: 'Create a clean, reader-friendly PDF ready to print or distribute.' }
    ],
    faq: [
      { q: 'Does it automatically handle pagination?', a: 'Yes, long documents are automatically split into sequentially numbered pages.' }
    ],
    seoTitle: 'Text to PDF Converter — Convert TXT and Notes to PDF',
    metaDesc: 'Convert plain text and Markdown into beautifully paginated PDF documents.'
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'All Tools' },
  { id: 'organize', label: 'Organize & Pages' },
  { id: 'optimize', label: 'Optimize & Compress' },
  { id: 'convert-to-pdf', label: 'Convert to PDF' },
  { id: 'convert-from-pdf', label: 'Convert from PDF' },
  { id: 'edit-security', label: 'Security & Sign' }
] as const;
