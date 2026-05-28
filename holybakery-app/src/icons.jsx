import React from 'react';

// Lucide-style stroke icons. Pass size + color via props.
const Ic = ({ d, size = 18, stroke = "currentColor", fill = "none", strokeWidth = 1.8, children, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke}
       strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
       aria-hidden="true" {...rest}>
    {d ? <path d={d} /> : children}
  </svg>
);

const Icons = {
  Truck: (p) => <Ic {...p}><path d="M2 17h12V5H2zM14 9h4l3 3v5h-7"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></Ic>,
  Globe: (p) => <Ic {...p}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></Ic>,
  Heart: (p) => <Ic {...p}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/></Ic>,
  Send: (p) => <Ic {...p}><path d="m22 2-7 20-4-9-9-4 20-7z"/><path d="M22 2 11 13"/></Ic>,
  Pin: (p) => <Ic {...p}><path d="M20 10c0 7-8 12-8 12s-8-5-8-12a8 8 0 1 1 16 0z"/><circle cx="12" cy="10" r="3"/></Ic>,
  Calendar: (p) => <Ic {...p}><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></Ic>,
  Users: (p) => <Ic {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></Ic>,
  ArrowRight: (p) => <Ic {...p}><path d="M5 12h14M13 5l7 7-7 7"/></Ic>,
  ArrowLeft: (p) => <Ic {...p}><path d="M19 12H5M11 19l-7-7 7-7"/></Ic>,
  Shield: (p) => <Ic {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></Ic>,
  Search: (p) => <Ic {...p}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></Ic>,
  Phone: (p) => <Ic {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></Ic>,
  Home: (p) => <Ic {...p}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2h-4v-7H9v7H5a2 2 0 0 1-2-2z"/></Ic>,
  Save: (p) => <Ic {...p}><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><path d="M17 21v-8H7v8M7 3v5h8"/></Ic>,
  Layers: (p) => <Ic {...p}><path d="m12 2 9 5-9 5-9-5 9-5z"/><path d="m3 12 9 5 9-5M3 17l9 5 9-5"/></Ic>,
  Bookmark: (p) => <Ic {...p}><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></Ic>,
  Settings: (p) => <Ic {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></Ic>,
  Banknote: (p) => <Ic {...p}><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></Ic>,
  Map: (p) => <Ic {...p}><path d="M9 4 3 7v13l6-3 6 3 6-3V4l-6 3z"/><path d="M9 4v13M15 7v13"/></Ic>,
  Star: (p) => <Ic {...p}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></Ic>,
  Plus: (p) => <Ic {...p}><path d="M12 5v14M5 12h14"/></Ic>,
  Trash: (p) => <Ic {...p}><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></Ic>,
  Check: (p) => <Ic {...p}><path d="M20 6 9 17l-5-5"/></Ic>,
  X: (p) => <Ic {...p}><path d="M18 6 6 18M6 6l12 12"/></Ic>,
  Edit: (p) => <Ic {...p}><path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"/></Ic>,
  Image: (p) => <Ic {...p}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/></Ic>,
  Paperclip: (p) => <Ic {...p}><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 1 1 5.66 5.66l-9.2 9.19a2 2 0 1 1-2.83-2.83l8.49-8.48"/></Ic>,
  ChevronDown: (p) => <Ic {...p}><path d="m6 9 6 6 6-6"/></Ic>,
  ChevronRight: (p) => <Ic {...p}><path d="m9 18 6-6-6-6"/></Ic>,
  Clock: (p) => <Ic {...p}><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></Ic>,
  WhatsApp: (p) => <Ic {...p}><path d="M3 21l1.65-3.8A8.95 8.95 0 0 1 3 12a9 9 0 1 1 9 9 8.96 8.96 0 0 1-5.2-1.65z"/><path d="M9 9c0 4 3 7 7 7l1.5-2.5-2-1.5-1.5 1c-1-.5-1.5-1-2-2l1-1.5L11.5 7.5z"/></Ic>,
  AlertTriangle: (p) => <Ic {...p}><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4M12 17h.01"/></Ic>,
  Info: (p) => <Ic {...p}><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></Ic>,
  Filter: (p) => <Ic {...p}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></Ic>,
  Download: (p) => <Ic {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></Ic>,
  Building: (p) => <Ic {...p}><path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4"/><path d="M9 9v.01M9 12v.01M9 15v.01M9 18v.01"/></Ic>,
  Cake: (p) => <Ic {...p}><path d="M20 21v-8H4v8M4 17l3-2 3 2 4-3 6 3M12 5v3M9 5a3 3 0 1 0 6 0 3 3 0 0 0-6 0z"/></Ic>,
  DollarSign: (p) => <Ic {...p}><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></Ic>,
  TrendingUp: (p) => <Ic {...p}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></Ic>,
  CreditCard: (p) => <Ic {...p}><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></Ic>,
  RefreshCcw: (p) => <Ic {...p}><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 0 0 14.85 3.36L23 14"/><polyline points="23 20 23 14 17 14"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10"/></Ic>,
  LogOut: (p) => <Ic {...p}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></Ic>,
  Lock: (p) => <Ic {...p}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 1 1 10 0v4"/></Ic>,
  Bell: (p) => <Ic {...p}><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></Ic>,
  Eye: (p) => <Ic {...p}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></Ic>,
  Copy: (p) => <Ic {...p}><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></Ic>,
  ListChecks: (p) => <Ic {...p}><path d="M3 17l2 2 4-4M3 7l2 2 4-4M13 6h8M13 12h8M13 18h8"/></Ic>,
  PackagePlus: (p) => <Ic {...p}><path d="M16 16h6M19 13v6"/><path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"/><path d="M16.5 9.4 7.5 4.21M3.27 6.96 12 12l8.73-5.04"/></Ic>,
  ShieldX: (p) => <Ic {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 9 6 6M15 9l-6 6"/></Ic>,
  ChevronLeft: (p) => <Ic {...p}><path d="m15 18-6-6 6-6"/></Ic>,
  Sparkles: (p) => <Ic {...p}><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/></Ic>,
};

window.Icons = Icons;
