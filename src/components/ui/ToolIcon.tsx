import React from 'react';
import {
  Braces,
  FileSpreadsheet,
  FileJson,
  Code2,
  Minimize2,
  Fingerprint,
  KeyRound,
  Hash,
  ShieldAlert,
  Binary,
  Link,
  Code,
  Clock,
  CalendarClock,
  Globe,
  Network,
  GitCompare,
  FileCode,
  Database,
  FileCode2,
  ShieldCheck,
  Search,
  Sparkles,
  Terminal,
  Cpu,
  Layers,
  ArrowRight,
  Check,
  Copy,
  Download,
  Trash2,
  RotateCcw,
  Sliders,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Sun,
  Moon,
  Info,
} from 'lucide-react';

interface ToolIconProps {
  name: string;
  className?: string;
}

export const ToolIcon: React.FC<ToolIconProps> = ({ name, className = 'w-5 h-5' }) => {
  switch (name) {
    case 'Braces':
      return <Braces className={className} />;
    case 'FileSpreadsheet':
      return <FileSpreadsheet className={className} />;
    case 'FileJson':
      return <FileJson className={className} />;
    case 'Code2':
      return <Code2 className={className} />;
    case 'Minimize2':
      return <Minimize2 className={className} />;
    case 'Fingerprint':
      return <Fingerprint className={className} />;
    case 'KeyRound':
      return <KeyRound className={className} />;
    case 'Hash':
      return <Hash className={className} />;
    case 'ShieldAlert':
      return <ShieldAlert className={className} />;
    case 'Binary':
      return <Binary className={className} />;
    case 'Link':
      return <Link className={className} />;
    case 'Code':
      return <Code className={className} />;
    case 'Clock':
      return <Clock className={className} />;
    case 'CalendarClock':
      return <CalendarClock className={className} />;
    case 'Globe':
      return <Globe className={className} />;
    case 'Network':
      return <Network className={className} />;
    case 'GitCompare':
      return <GitCompare className={className} />;
    case 'Regex':
      return <FileCode2 className={className} />;
    case 'Database':
      return <Database className={className} />;
    case 'FileCode':
      return <FileCode className={className} />;
    case 'ShieldCheck':
      return <ShieldCheck className={className} />;
    default:
      return <Terminal className={className} />;
  }
};
