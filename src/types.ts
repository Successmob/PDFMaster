export type ToolCategory = 
  | 'organize'
  | 'optimize'
  | 'convert-to-pdf'
  | 'convert-from-pdf'
  | 'edit-security'
  | 'security';

export interface ToolDefinition {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  detailedDesc: string;
  description?: string;
  category: ToolCategory;
  badge?: 'Popular' | 'New' | 'Pro' | 'Essential';
  icon: string;
  accentColor: string; // Tailwind color token or hex
  color?: string;
  accept: string;
  acceptLabel: string;
  multiple: boolean;
  multiFile?: boolean;
  maxFileSizeMb: number;
  howToSteps: { title: string; desc: string }[];
  faq: { q: string; a: string }[];
  faqs?: { q: string; a: string }[];
  seoTitle: string;
  metaDesc: string;
}

export interface ProcessedFileRecord {
  id: string;
  toolId: string;
  toolName?: string;
  toolTitle?: string;
  inputFileName?: string;
  fileName: string;
  outputFileName?: string;
  fileSizeBytes?: number;
  originalSizeBytes?: number;
  outputSizeBytes: number;
  pageCount?: number;
  timestamp: number;
  downloadUrl?: string;
  blobUrl?: string;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  plan: 'free' | 'pro' | 'business';
  operationsToday: number;
  maxDailyOperations: number;
  storageUsedBytes: number;
  maxStorageBytes: number;
  favorites: string[];
  isVerified: boolean;
}

export interface SignatureData {
  type: 'draw' | 'type' | 'upload';
  dataUrl: string;
  text?: string;
  font?: string;
}

export interface WatermarkOptions {
  type: 'text' | 'image';
  text: string;
  fontSize: number;
  opacity: number;
  rotation: number;
  color: string;
  position: 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'tile';
}

export interface PageNumberOptions {
  position: 'bottom-center' | 'bottom-right' | 'bottom-left' | 'top-center' | 'top-right';
  format: 'n' | 'page-n' | 'n-of-total' | 'page-n-of-total';
  startNumber: number;
  fontSize: number;
  color: string;
  margin: number;
}
