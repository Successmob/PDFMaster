import React, { useState, useRef, useEffect } from 'react';
import { 
  Upload, 
  FileText, 
  Trash2, 
  RotateCw, 
  RotateCcw, 
  Download, 
  CheckCircle2, 
  ArrowLeft, 
  Sparkles, 
  Lock, 
  Key, 
  Eye, 
  EyeOff, 
  FileCode, 
  Type, 
  Copy, 
  Check, 
  Layers, 
  Sliders, 
  Star, 
  RefreshCw, 
  AlertCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  MoveHorizontal,
  PenTool,
  Eraser
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ToolDefinition, ProcessedFileRecord, UserAccount } from '../types';
import { TOOLS } from '../data/tools';
import { createSamplePdf } from '../utils/samplePdf';
import * as pdfEngine from '../services/pdfEngine';
import { PDFDocument } from 'pdf-lib';

interface ToolInterfaceProps {
  tool: ToolDefinition;
  user: UserAccount | null;
  onBack: () => void;
  onSaveRecord: (record: ProcessedFileRecord) => void;
  onSelectTool: (toolId: string) => void;
  onToggleFavorite: (toolId: string) => void;
}

export const ToolInterface: React.FC<ToolInterfaceProps> = ({
  tool,
  user,
  onBack,
  onSaveRecord,
  onSelectTool,
  onToggleFavorite
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressStatus, setProgressStatus] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState<{
    blob: Blob;
    name: string;
    originalSize?: number;
    newSize?: number;
    ratio?: number;
    extraText?: string;
    images?: { name: string; dataUrl: string; blob: Blob; pageNumber: number }[];
  } | null>(null);

  // Tool specific states
  // Split
  const [splitRange, setSplitRange] = useState('1-2');
  // Compress
  const [compressLevel, setCompressLevel] = useState<'extreme' | 'recommended' | 'less'>('recommended');
  // Rotate
  const [rotateAngle, setRotateAngle] = useState(90);
  // Watermark
  const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL');
  const [watermarkOpacity, setWatermarkOpacity] = useState(0.25);
  const [watermarkRotation, setWatermarkRotation] = useState(45);
  // Protect / Unlock
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  // Page Numbers
  const [numPosition, setNumPosition] = useState<'bottom-center' | 'bottom-right' | 'bottom-left' | 'top-right'>('bottom-center');
  const [numFormat, setNumFormat] = useState<'n' | 'page-n' | 'n-of-total' | 'page-n-of-total'>('page-n-of-total');
  // Crop
  const [cropMargins, setCropMargins] = useState({ top: 30, right: 30, bottom: 30, left: 30 });
  // Text & HTML to PDF
  const [textContent, setTextContent] = useState('Hello World!\n\nThis is a sample document generated with PDF Master.\nYou can customize this text and generate a clean PDF instantly.');
  const [htmlContent, setHtmlContent] = useState('<div style="font-family: Arial, sans-serif; padding: 20px;">\n  <h1 style="color: #4f46e5;">PDF Master Generated Report</h1>\n  <p>This HTML snippet will be rendered directly into a high quality PDF document.</p>\n  <table border="1" cellpadding="8" style="border-collapse: collapse; width: 100%; margin-top: 15px;">\n    <tr style="background-color: #f3f4f6;"><th>Item</th><th>Description</th><th>Status</th></tr>\n    <tr><td>PDF Processing</td><td>Client-side browser engine</td><td>Active</td></tr>\n    <tr><td>Security</td><td>Zero permanent server retention</td><td>Verified</td></tr>\n  </table>\n</div>');
  // Delete / Extract
  const [pagesToDelete, setPagesToDelete] = useState('1');
  const [pagesToExtract, setPagesToExtract] = useState('1');
  // Sign PDF Canvas state
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [signatureType, setSignatureType] = useState<'draw' | 'type'>('draw');
  const [typedSigName, setTypedSigName] = useState('John Doe');
  const [hasSignature, setHasSignature] = useState(false);

  // Copied text state for OCR
  const [isCopied, setIsCopied] = useState(false);

  // FAQ toggle state
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const isFavorite = user?.favorites?.includes(tool.id) || false;

  // Clear state when switching tools
  useEffect(() => {
    setFiles([]);
    setResult(null);
    setError('');
    setProgress(0);
    setIsProcessing(false);
  }, [tool.id]);

  // Handle Drag & Drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFilesSelected(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFilesSelected(Array.from(e.target.files));
    }
  };

  const handleFilesSelected = (newFiles: File[]) => {
    setError('');
    if (tool.multiFile) {
      setFiles(prev => [...prev, ...newFiles]);
    } else {
      setFiles([newFiles[0]]);
    }
  };

  const handleLoadSample = async () => {
    try {
      setError('');
      const sample = await createSamplePdf(`Sample_${tool.title.replace(/\s+/g, '_')}`, 4);
      setFiles([sample]);
    } catch (err: any) {
      setError('Could not generate sample PDF: ' + err.message);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Signature canvas handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    setIsDrawing(true);
    setHasSignature(true);
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#1e1b4b';
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  const getSignatureDataUrl = (): string => {
    if (signatureType === 'type') {
      const canvas = document.createElement('canvas');
      canvas.width = 400;
      canvas.height = 120;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#0f172a';
        ctx.font = 'italic 36px "Brush Script MT", cursive, sans-serif';
        ctx.fillText(typedSigName || 'Signature', 40, 75);
      }
      return canvas.toDataURL('image/png');
    } else {
      return canvasRef.current?.toDataURL('image/png') || '';
    }
  };

  // MAIN PROCESS TRIGGER
  const handleProcess = async () => {
    if (files.length === 0 && tool.id !== 'html-to-pdf' && tool.id !== 'text-to-pdf') {
      setError('Please upload at least one file to process.');
      return;
    }

    setError('');
    setIsProcessing(true);
    setProgress(15);
    setProgressStatus('Initializing PDF engine...');

    try {
      let outputBlob: Blob;
      let outputName: string;
      let originalSize = files[0]?.size || 0;
      let newSize = 0;
      let ratio = 0;
      let extraText = '';
      let imagesResult: any[] = [];

      // Switch through tools
      switch (tool.id) {
        case 'merge-pdf': {
          setProgress(40);
          setProgressStatus('Merging document streams...');
          const res = await pdfEngine.mergePdf(files, (p: number) => setProgress(40 + p * 0.5));
          outputBlob = res.blob;
          outputName = res.name;
          break;
        }

        case 'split-pdf': {
          setProgress(50);
          setProgressStatus('Extracting requested page range...');
          const res = await pdfEngine.splitPdf(files[0], splitRange);
          outputBlob = res.blob;
          outputName = res.name;
          break;
        }

        case 'compress-pdf': {
          setProgress(45);
          setProgressStatus('Optimizing content streams and metadata...');
          const res = await pdfEngine.compressPdf(files[0], compressLevel);
          outputBlob = res.blob;
          outputName = res.name;
          originalSize = res.originalSize;
          newSize = res.compressedSize;
          ratio = res.ratioPercent;
          break;
        }

        case 'pdf-to-jpg':
        case 'pdf-to-png': {
          const format = tool.id === 'pdf-to-png' ? 'png' : 'jpg';
          setProgress(40);
          setProgressStatus(`Rendering PDF pages to ${format.toUpperCase()}...`);
          const res = await pdfEngine.pdfToImages(files[0], format, 1.5, p => setProgress(40 + p * 0.5));
          imagesResult = res.images;
          if (res.images.length > 0) {
            outputBlob = res.images[0].blob;
            outputName = res.images[0].name;
          } else {
            throw new Error('No pages could be rendered.');
          }
          break;
        }

        case 'jpg-to-pdf':
        case 'png-to-pdf':
        case 'images-to-pdf': {
          setProgress(45);
          setProgressStatus('Embedding images into PDF pages...');
          const res = await pdfEngine.imagesToPdf(files, { orientation: 'auto' });
          outputBlob = res.blob;
          outputName = res.name;
          break;
        }

        case 'pdf-to-word': {
          setProgress(50);
          setProgressStatus('Converting PDF structure to Word document...');
          const res = await pdfEngine.pdfToWord(files[0]);
          outputBlob = res.blob;
          outputName = res.name;
          break;
        }

        case 'word-to-pdf': {
          setProgress(50);
          setProgressStatus('Parsing Word document layout to PDF...');
          const res = await pdfEngine.wordToPdf(files[0]);
          outputBlob = res.blob;
          outputName = res.name;
          break;
        }

        case 'pdf-to-excel': {
          setProgress(50);
          setProgressStatus('Extracting tabular data to Excel spreadsheet...');
          const res = await pdfEngine.pdfToExcel(files[0]);
          outputBlob = res.blob;
          outputName = res.name;
          break;
        }

        case 'excel-to-pdf': {
          setProgress(50);
          setProgressStatus('Formatting Excel sheets into PDF pages...');
          const res = await pdfEngine.excelToPdf(files[0]);
          outputBlob = res.blob;
          outputName = res.name;
          break;
        }

        case 'pdf-to-powerpoint': {
          setProgress(50);
          setProgressStatus('Generating PowerPoint presentation slides...');
          const res = await pdfEngine.pdfToPowerPoint(files[0]);
          outputBlob = res.blob;
          outputName = res.name;
          break;
        }

        case 'powerpoint-to-pdf': {
          setProgress(50);
          setProgressStatus('Rendering presentation slides into PDF...');
          const res = await pdfEngine.powerPointToPdf(files[0]);
          outputBlob = res.blob;
          outputName = res.name;
          break;
        }

        case 'rotate-pdf': {
          setProgress(50);
          setProgressStatus(`Rotating document pages by ${rotateAngle}°...`);
          const res = await pdfEngine.rotatePdf(files[0], rotateAngle);
          outputBlob = res.blob;
          outputName = res.name;
          break;
        }

        case 'organize-pdf': {
          setProgress(50);
          setProgressStatus('Re-indexing and reorganizing page order...');
          // default reversal or identity order
          const arrBuffer = await files[0].arrayBuffer();
          const doc = await PDFDocument.load(arrBuffer, { ignoreEncryption: true });
          const total = doc.getPageCount();
          const reversed = Array.from({ length: total }, (_, i) => total - 1 - i);
          const res = await pdfEngine.organizePdf(files[0], reversed);
          outputBlob = res.blob;
          outputName = res.name;
          break;
        }

        case 'delete-pdf-pages': {
          setProgress(50);
          setProgressStatus('Removing specified pages...');
          const pageNums = pagesToDelete.split(',').map(n => parseInt(n.trim(), 10)).filter(n => !isNaN(n));
          const res = await pdfEngine.deletePdfPages(files[0], pageNums);
          outputBlob = res.blob;
          outputName = res.name;
          break;
        }

        case 'extract-pdf-pages': {
          setProgress(50);
          setProgressStatus('Extracting chosen pages...');
          const pageNums = pagesToExtract.split(',').map(n => parseInt(n.trim(), 10)).filter(n => !isNaN(n));
          const res = await pdfEngine.extractPdfPages(files[0], pageNums);
          outputBlob = res.blob;
          outputName = res.name;
          break;
        }

        case 'watermark-pdf': {
          setProgress(50);
          setProgressStatus('Applying diagonal text watermark...');
          const res = await pdfEngine.watermarkPdf(files[0], {
            text: watermarkText,
            opacity: watermarkOpacity,
            rotation: watermarkRotation
          });
          outputBlob = res.blob;
          outputName = res.name;
          break;
        }

        case 'protect-pdf': {
          setProgress(50);
          setProgressStatus('Securing document with password...');
          const res = await pdfEngine.protectPdf(files[0], password || 'password123');
          outputBlob = res.blob;
          outputName = res.name;
          break;
        }

        case 'unlock-pdf': {
          setProgress(50);
          setProgressStatus('Removing document restrictions...');
          const res = await pdfEngine.unlockPdf(files[0], password);
          outputBlob = res.blob;
          outputName = res.name;
          break;
        }

        case 'sign-pdf': {
          setProgress(50);
          setProgressStatus('Affixing digital signature onto page...');
          const sigUrl = getSignatureDataUrl();
          if (!sigUrl) {
            throw new Error('Please draw or enter your signature first.');
          }
          const res = await pdfEngine.signPdf(files[0], sigUrl, 1, { x: 55, y: 75, width: 35, height: 15 });
          outputBlob = res.blob;
          outputName = res.name;
          break;
        }

        case 'add-page-numbers': {
          setProgress(50);
          setProgressStatus('Numbering all pages...');
          const res = await pdfEngine.addPageNumbers(files[0], {
            position: numPosition,
            format: numFormat
          });
          outputBlob = res.blob;
          outputName = res.name;
          break;
        }

        case 'crop-pdf': {
          setProgress(50);
          setProgressStatus('Trimming page margins...');
          const res = await pdfEngine.cropPdf(files[0], cropMargins);
          outputBlob = res.blob;
          outputName = res.name;
          break;
        }

        case 'repair-pdf': {
          setProgress(50);
          setProgressStatus('Diagnosing and repairing PDF xref streams...');
          const res = await pdfEngine.repairPdf(files[0]);
          outputBlob = res.blob;
          outputName = res.name;
          break;
        }

        case 'ocr-pdf': {
          setProgress(40);
          setProgressStatus('Running OCR text extraction...');
          const res = await pdfEngine.ocrPdf(files[0], (_status: string, p: number) => setProgress(40 + p * 0.5));
          outputBlob = res.textBlob;
          outputName = res.name;
          extraText = res.text;
          break;
        }

        case 'html-to-pdf': {
          setProgress(50);
          setProgressStatus('Rendering HTML to PDF...');
          const res = await pdfEngine.htmlToPdf(htmlContent, 'document.pdf');
          outputBlob = res.blob;
          outputName = res.name;
          break;
        }

        case 'text-to-pdf': {
          setProgress(50);
          setProgressStatus('Formatting text into PDF document...');
          const res = await pdfEngine.textToPdf(textContent, 'text_document.pdf');
          outputBlob = res.blob;
          outputName = res.name;
          break;
        }

        default: {
          throw new Error('Tool operation not supported yet.');
        }
      }

      setProgress(100);
      setProgressStatus('Complete!');

      // Save processed file record
      const record: ProcessedFileRecord = {
        id: `rec_${Date.now()}`,
        toolId: tool.id,
        toolTitle: tool.title,
        fileName: outputName,
        originalSizeBytes: originalSize,
        outputSizeBytes: outputBlob.size,
        timestamp: Date.now(),
        blobUrl: URL.createObjectURL(outputBlob)
      };
      onSaveRecord(record);

      setResult({
        blob: outputBlob,
        name: outputName,
        originalSize,
        newSize: newSize || outputBlob.size,
        ratio,
        extraText,
        images: imagesResult
      });

      // Confetti burst for satisfaction!
      try {
        confetti({
          particleCount: 75,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (_) {}

    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred while processing the PDF file.');
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadFile = (blob: Blob, name: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyOcrText = () => {
    if (result?.extraText) {
      navigator.clipboard.writeText(result.extraText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const resetTool = () => {
    setFiles([]);
    setResult(null);
    setError('');
    setProgress(0);
    setIsProcessing(false);
  };

  const formatBytes = (bytes: number) => {
    if (!bytes) return '0 B';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const relatedTools = TOOLS.filter(t => t.category === tool.category && t.id !== tool.id).slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Top Navigation & Tool Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>All PDF Tools</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleFavorite(tool.id)}
            className={`p-2 rounded-xl border transition-colors flex items-center gap-1.5 text-xs font-bold ${
              isFavorite
                ? 'bg-amber-50 border-amber-200 text-amber-600'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${isFavorite ? 'fill-amber-500' : ''}`} />
            <span className="hidden sm:inline">{isFavorite ? 'Favorited' : 'Favorite'}</span>
          </button>
        </div>
      </div>

      {/* Tool Title Block */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-500 to-indigo-700 text-white shadow-lg shadow-indigo-500/25 mb-4">
          <FileText className="w-7 h-7" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {tool.title}
        </h1>
        <p className="mt-3 text-sm text-slate-600 leading-relaxed">
          {tool.detailedDesc || tool.shortDesc}
        </p>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Workspace Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden mb-16">
        {/* State 1: Result Screen */}
        {result ? (
          <div className="p-8 sm:p-12 text-center animate-in fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mb-4 ring-8 ring-emerald-50">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">Your Document is Ready!</h2>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              Your task was processed successfully with privacy-first client execution.
            </p>

            {/* Compression or Size badge */}
            {result.ratio && result.ratio > 0 ? (
              <div className="inline-flex items-center gap-2 px-4 py-2 mt-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                <Sparkles className="w-4 h-4" />
                <span>Reduced by {result.ratio}% ({formatBytes(result.originalSize || 0)} → {formatBytes(result.newSize || 0)})</span>
              </div>
            ) : (
              <p className="text-xs text-slate-400 font-mono mt-2">{formatBytes(result.blob.size)}</p>
            )}

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8 max-w-md mx-auto">
              <button
                id="download-result-btn"
                onClick={() => downloadFile(result.blob, result.name)}
                className="w-full sm:w-auto flex-1 py-3 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-xs font-bold transition-all shadow-md shadow-indigo-500/25 flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download {result.name.endsWith('.pdf') ? 'PDF' : 'File'}</span>
              </button>
              <button
                onClick={resetTool}
                className="w-full sm:w-auto py-3 px-5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all"
              >
                Start Over
              </button>
            </div>

            {/* Extra Output for OCR */}
            {result.extraText && (
              <div className="mt-8 text-left max-w-2xl mx-auto bg-slate-50 border border-slate-200 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-700">Extracted Text</span>
                  <button
                    onClick={copyOcrText}
                    className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="text-xs font-mono text-slate-800 whitespace-pre-wrap max-h-60 overflow-y-auto bg-white p-3 rounded-xl border border-slate-200">
                  {result.extraText}
                </pre>
              </div>
            )}

            {/* Rendered Images list if PDF to Images */}
            {result.images && result.images.length > 1 && (
              <div className="mt-8 pt-8 border-t border-slate-100 text-left">
                <h4 className="font-bold text-xs text-slate-900 mb-3">All Generated Pages ({result.images.length})</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {result.images.map((img, idx) => (
                    <div key={idx} className="border border-slate-200 rounded-xl p-2 text-center bg-slate-50">
                      <img src={img.dataUrl} alt={`Page ${img.pageNumber}`} className="w-full h-32 object-contain bg-white rounded-lg shadow-xs mb-2" />
                      <button
                        onClick={() => downloadFile(img.blob, img.name)}
                        className="w-full py-1 text-[11px] font-bold text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                      >
                        Download Page {img.pageNumber}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* State 2: Upload & Settings Screen */
          <div className="p-6 sm:p-8">
            {/* Input file upload area (unless pure text/html editor) */}
            {tool.id !== 'html-to-pdf' && tool.id !== 'text-to-pdf' ? (
              <div>
                {files.length === 0 ? (
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all ${
                      isDragging
                        ? 'border-indigo-500 bg-indigo-50/50 scale-[0.99]'
                        : 'border-slate-300 hover:border-indigo-400 bg-slate-50/50'
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept={tool.accept}
                      multiple={tool.multiFile}
                      onChange={handleFileInputChange}
                      className="hidden"
                    />

                    <div className="w-14 h-14 mx-auto rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                      <Upload className="w-6 h-6" />
                    </div>

                    <h3 className="text-base font-bold text-slate-900">
                      Drag & Drop your {tool.acceptLabel} here
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      or browse from your local device storage
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
                      <button
                        type="button"
                        id="select-file-btn"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full sm:w-auto py-2.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-500/20 transition-all active:scale-95"
                      >
                        Select {tool.acceptLabel}
                      </button>

                      {/* Try with Sample PDF button */}
                      {tool.accept.includes('.pdf') && (
                        <button
                          type="button"
                          id="sample-pdf-btn"
                          onClick={handleLoadSample}
                          className="w-full sm:w-auto py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-white text-slate-700 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                          <span>Try with Sample PDF</span>
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  /* File selected list */
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Selected Files ({files.length})
                      </span>
                      {tool.multiFile && (
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="text-xs text-indigo-600 font-bold hover:underline"
                        >
                          + Add More Files
                        </button>
                      )}
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept={tool.accept}
                      multiple={tool.multiFile}
                      onChange={handleFileInputChange}
                      className="hidden"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {files.map((file, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                              <FileText className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <p className="font-semibold text-slate-800 truncate">{file.name}</p>
                              <p className="text-[11px] text-slate-400">{formatBytes(file.size)}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFile(idx)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition-colors"
                            title="Remove file"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : null}

            {/* Tool specific configurations */}
            <div className="mt-6 pt-6 border-t border-slate-100">
              {/* Split PDF controls */}
              {tool.id === 'split-pdf' && (
                <div className="max-w-md mx-auto space-y-3">
                  <label className="block text-xs font-bold text-slate-800">
                    Page Range to Extract (e.g. "1-3, 5")
                  </label>
                  <input
                    type="text"
                    value={splitRange}
                    onChange={e => setSplitRange(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 font-mono outline-hidden"
                  />
                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <span>Quick presets:</span>
                    <button onClick={() => setSplitRange('1')} className="px-2 py-0.5 bg-slate-100 rounded hover:bg-slate-200">First page</button>
                    <button onClick={() => setSplitRange('1-2')} className="px-2 py-0.5 bg-slate-100 rounded hover:bg-slate-200">1 to 2</button>
                    <button onClick={() => setSplitRange('all')} className="px-2 py-0.5 bg-slate-100 rounded hover:bg-slate-200">All pages</button>
                  </div>
                </div>
              )}

              {/* Compress PDF controls */}
              {tool.id === 'compress-pdf' && (
                <div className="max-w-lg mx-auto space-y-3">
                  <label className="block text-xs font-bold text-slate-800 text-center mb-2">
                    Select Compression Level
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'extreme', title: 'Extreme', desc: 'Maximum compression' },
                      { id: 'recommended', title: 'Recommended', desc: 'Good quality & size' },
                      { id: 'less', title: 'Less', desc: 'High visual quality' }
                    ].map(opt => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setCompressLevel(opt.id as any)}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          compressLevel === opt.id
                            ? 'bg-indigo-50 border-indigo-600 text-indigo-700 shadow-xs'
                            : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className="font-bold text-xs">{opt.title}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Rotate PDF controls */}
              {tool.id === 'rotate-pdf' && (
                <div className="text-center space-y-3">
                  <p className="text-xs font-bold text-slate-800">Rotation Angle</p>
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => setRotateAngle(90)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border ${
                        rotateAngle === 90 ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'bg-white border-slate-200'
                      }`}
                    >
                      <RotateCw className="w-4 h-4" />
                      <span>90° Right</span>
                    </button>
                    <button
                      onClick={() => setRotateAngle(180)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border ${
                        rotateAngle === 180 ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'bg-white border-slate-200'
                      }`}
                    >
                      <RotateCw className="w-4 h-4" />
                      <span>180° Flip</span>
                    </button>
                    <button
                      onClick={() => setRotateAngle(270)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border ${
                        rotateAngle === 270 ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'bg-white border-slate-200'
                      }`}
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>90° Left</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Watermark controls */}
              {tool.id === 'watermark-pdf' && (
                <div className="max-w-md mx-auto space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Watermark Text</label>
                    <input
                      type="text"
                      value={watermarkText}
                      onChange={e => setWatermarkText(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:bg-white focus:border-indigo-500 font-semibold"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">
                        Opacity: {Math.round(watermarkOpacity * 100)}%
                      </label>
                      <input
                        type="range"
                        min="0.1"
                        max="0.8"
                        step="0.05"
                        value={watermarkOpacity}
                        onChange={e => setWatermarkOpacity(parseFloat(e.target.value))}
                        className="w-full accent-indigo-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">
                        Rotation: {watermarkRotation}°
                      </label>
                      <input
                        type="range"
                        min="-90"
                        max="90"
                        step="15"
                        value={watermarkRotation}
                        onChange={e => setWatermarkRotation(parseInt(e.target.value, 10))}
                        className="w-full accent-indigo-600"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Protect PDF controls */}
              {tool.id === 'protect-pdf' && (
                <div className="max-w-md mx-auto space-y-3">
                  <label className="block text-xs font-bold text-slate-800">Set Document Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter security password..."
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="w-full px-3.5 py-2.5 pr-10 text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:bg-white focus:border-indigo-500 font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Unlock PDF controls */}
              {tool.id === 'unlock-pdf' && (
                <div className="max-w-md mx-auto space-y-3">
                  <label className="block text-xs font-bold text-slate-800">Document Password (if known)</label>
                  <input
                    type="password"
                    placeholder="Enter PDF password to unlock..."
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:bg-white focus:border-indigo-500 font-medium"
                  />
                </div>
              )}

              {/* Sign PDF controls */}
              {tool.id === 'sign-pdf' && (
                <div className="max-w-md mx-auto space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">Create Your Signature</span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setSignatureType('draw')}
                        className={`px-2.5 py-1 text-xs font-semibold rounded-lg ${
                          signatureType === 'draw' ? 'bg-indigo-100 text-indigo-700' : 'text-slate-500'
                        }`}
                      >
                        Draw
                      </button>
                      <button
                        type="button"
                        onClick={() => setSignatureType('type')}
                        className={`px-2.5 py-1 text-xs font-semibold rounded-lg ${
                          signatureType === 'type' ? 'bg-indigo-100 text-indigo-700' : 'text-slate-500'
                        }`}
                      >
                        Type
                      </button>
                    </div>
                  </div>

                  {signatureType === 'draw' ? (
                    <div>
                      <div className="border border-slate-300 rounded-2xl overflow-hidden bg-white shadow-inner">
                        <canvas
                          ref={canvasRef}
                          width={400}
                          height={140}
                          onMouseDown={startDrawing}
                          onMouseMove={draw}
                          onMouseUp={stopDrawing}
                          onMouseLeave={stopDrawing}
                          onTouchStart={startDrawing}
                          onTouchMove={draw}
                          onTouchEnd={stopDrawing}
                          className="w-full h-36 bg-white cursor-crosshair touch-none"
                        />
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[11px] text-slate-400">Sign with mouse or stylus finger</span>
                        <button
                          type="button"
                          onClick={clearSignature}
                          className="text-xs text-rose-600 font-semibold hover:underline flex items-center gap-1"
                        >
                          <Eraser className="w-3.5 h-3.5" />
                          <span>Clear</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <input
                        type="text"
                        placeholder="Type your name..."
                        value={typedSigName}
                        onChange={e => setTypedSigName(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:bg-white focus:border-indigo-500 font-semibold mb-2"
                      />
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center font-serif italic text-2xl text-indigo-900">
                        {typedSigName || 'Your Signature'}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Add Page Numbers controls */}
              {tool.id === 'add-page-numbers' && (
                <div className="max-w-md mx-auto space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Position</label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {[
                        { id: 'bottom-center', title: 'Bottom Center' },
                        { id: 'bottom-right', title: 'Bottom Right' },
                        { id: 'bottom-left', title: 'Bottom Left' },
                        { id: 'top-right', title: 'Top Right' }
                      ].map(pos => (
                        <button
                          key={pos.id}
                          type="button"
                          onClick={() => setNumPosition(pos.id as any)}
                          className={`p-2.5 rounded-xl border text-center font-semibold ${
                            numPosition === pos.id ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'bg-white border-slate-200 text-slate-700'
                          }`}
                        >
                          {pos.title}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Numbering Format</label>
                    <select
                      value={numFormat}
                      onChange={e => setNumFormat(e.target.value as any)}
                      className="w-full px-3.5 py-2 text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl outline-hidden"
                    >
                      <option value="page-n-of-total">Page 1 of 10</option>
                      <option value="n-of-total">1 of 10</option>
                      <option value="page-n">Page 1</option>
                      <option value="n">1 (Number only)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* HTML to PDF Editor */}
              {tool.id === 'html-to-pdf' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-800">HTML Source Code</label>
                    <button
                      onClick={() => setHtmlContent('<h1>Custom Heading</h1><p>Type your own HTML structure here.</p>')}
                      className="text-xs text-indigo-600 font-bold hover:underline"
                    >
                      Load Basic Template
                    </button>
                  </div>
                  <textarea
                    rows={8}
                    value={htmlContent}
                    onChange={e => setHtmlContent(e.target.value)}
                    className="w-full p-3 font-mono text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:bg-white focus:border-indigo-500"
                  />
                </div>
              )}

              {/* Text to PDF Editor */}
              {tool.id === 'text-to-pdf' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-800">Document Text Content</label>
                  </div>
                  <textarea
                    rows={8}
                    value={textContent}
                    onChange={e => setTextContent(e.target.value)}
                    className="w-full p-3 text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:bg-white focus:border-indigo-500"
                  />
                </div>
              )}
            </div>

            {/* Processing Progress Indicator */}
            {isProcessing && (
              <div className="mt-8 p-6 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-center animate-in fade-in">
                <div className="flex items-center justify-between text-xs font-bold text-indigo-900 mb-2">
                  <span>{progressStatus}</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-indigo-200 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-[11px] text-indigo-600/80 mt-2">
                  Processing safely in client memory...
                </p>
              </div>
            )}

            {/* Action Process Button */}
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                id="execute-tool-btn"
                onClick={handleProcess}
                disabled={isProcessing || (files.length === 0 && tool.id !== 'html-to-pdf' && tool.id !== 'text-to-pdf')}
                className={`py-3.5 px-8 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 ${
                  isProcessing || (files.length === 0 && tool.id !== 'html-to-pdf' && tool.id !== 'text-to-pdf')
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                    : 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white shadow-indigo-500/20 active:scale-95'
                }`}
              >
                {isProcessing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                    <span>Processing Document...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>{tool.title}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* SEO & Instructional Sections Below Workspace */}
      <div className="border-t border-slate-200 pt-16 space-y-16">
        {/* Step-by-Step Guide */}
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 text-center mb-8">
            How to use {tool.title} in 3 Simple Steps
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 font-extrabold text-xs flex items-center justify-center mb-3">
                1
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">Select your file</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Drag and drop your file or choose from your computer storage.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 font-extrabold text-xs flex items-center justify-center mb-3">
                2
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">Adjust preferences</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Configure your desired options, ranges, compressions, or signatures.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 font-extrabold text-xs flex items-center justify-center mb-3">
                3
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">Download result</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Click {tool.title} and instantly download your processed file.
              </p>
            </div>
          </div>
        </div>

        {/* FAQs */}
        {tool.faq && tool.faq.length > 0 && (
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-extrabold text-slate-900 text-center mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {tool.faq.map((faq, idx) => {
                const isOpen = expandedFaq === idx;
                return (
                  <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
                    <button
                      onClick={() => setExpandedFaq(isOpen ? null : idx)}
                      className="w-full p-4 text-left flex items-center justify-between text-xs font-bold text-slate-900 hover:bg-slate-50 transition-colors"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Related Tools */}
        {relatedTools.length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-4">Related PDF Tools</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedTools.map(t => (
                <button
                  key={t.id}
                  onClick={() => onSelectTool(t.id)}
                  className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-indigo-300 hover:shadow-md transition-all text-left group"
                >
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 group-hover:bg-indigo-600 text-indigo-600 group-hover:text-white flex items-center justify-center mb-2 transition-colors">
                    <FileText className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-xs text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {t.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">
                    {t.shortDesc}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
