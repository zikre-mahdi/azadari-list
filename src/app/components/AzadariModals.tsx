import { useState } from 'react';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose,
} from './ui/dialog';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import {
  AzadariEvent,
  PROGRAM_TYPE_URDU, PART_OF_DAY_URDU, PROGRAM_TYPE_COLORS,
  formatDateUrdu,
} from './azadari-data';
import {
  MapPin, Clock, Phone, User, Building2, Calendar,
  Copy, Check, MessageCircle, Facebook, Twitter, Send,
} from 'lucide-react';

// ─── Event Detail Modal ─────────────────────────────────────────────────────

interface EventDetailModalProps {
  event: AzadariEvent | null;
  open: boolean;
  onClose: () => void;
  onShare: (event: AzadariEvent) => void;
}

export function EventDetailModal({ event, open, onClose, onShare }: EventDetailModalProps) {
  if (!event) return null;
  const colors = PROGRAM_TYPE_COLORS[event.programType];

  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent className="max-w-lg p-0 overflow-hidden" dir="rtl">
        {/* Thumbnail */}
        <div className="relative aspect-[16/9] bg-gray-100">
          {event.thumbnail ? (
            <ImageWithFallback src={event.thumbnail} alt={event.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #2c0a0a 0%, #6b1a1a 100%)' }}>
              <span className="text-white/50 text-5xl">☪</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute top-3 right-3">
            <span className={`px-3 py-1 rounded-full text-sm ${colors.pill}`}
              style={{ fontFamily: "'Noto Nastaliq Urdu', serif", lineHeight: '2' }}>
              {PROGRAM_TYPE_URDU[event.programType]}
            </span>
          </div>
          <div className="absolute bottom-3 right-3 left-3">
            <h2
              className="text-white leading-loose"
              style={{ fontFamily: "'Noto Nastaliq Urdu', serif", fontWeight: '700', lineHeight: '2.2', fontSize: '1.1rem' }}
            >
              {event.title}
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          <div className="grid grid-cols-1 gap-2.5 text-sm">
            <DetailRow icon={<User className="size-4 text-red-800 shrink-0" />} label="خطابت">
              <span style={{ fontFamily: "'Noto Nastaliq Urdu', serif", lineHeight: '2', fontWeight: '700' }}>
                {event.khitabat}
              </span>
            </DetailRow>
            <DetailRow icon={<Calendar className="size-4 text-red-800 shrink-0" />} label="تاریخ">
              <span style={{ fontFamily: "'Noto Nastaliq Urdu', serif", lineHeight: '2' }}>
                {formatDateUrdu(event.date)}
              </span>
            </DetailRow>
            <DetailRow icon={<Clock className="size-4 text-red-800 shrink-0" />} label="وقت">
              <span dir="ltr">{event.time}</span>
              <span className="mx-1 text-gray-400">·</span>
              <span style={{ fontFamily: "'Noto Nastaliq Urdu', serif", lineHeight: '2' }}>
                {PART_OF_DAY_URDU[event.partOfDay]}
              </span>
            </DetailRow>
            <DetailRow icon={<Building2 className="size-4 text-red-800 shrink-0" />} label="مقام">
              <span style={{ fontFamily: "'Noto Nastaliq Urdu', serif", lineHeight: '2' }}>
                {event.masjidImambada}
              </span>
            </DetailRow>
            <DetailRow icon={<MapPin className="size-4 text-red-800 shrink-0" />} label="پتہ">
              <span style={{ fontFamily: "'Noto Nastaliq Urdu', serif", lineHeight: '2' }}>
                {event.address}، {event.city}، {event.state}
              </span>
            </DetailRow>
            {event.contact && (
              <DetailRow icon={<Phone className="size-4 text-red-800 shrink-0" />} label="رابطہ">
                <span dir="ltr">{event.contact}</span>
              </DetailRow>
            )}
            {event.organizer && (
              <DetailRow icon={<Building2 className="size-4 text-red-800 shrink-0" />} label="منتظم">
                <span style={{ fontFamily: "'Noto Nastaliq Urdu', serif", lineHeight: '2' }}>
                  {event.organizer}
                </span>
              </DetailRow>
            )}
          </div>

          {event.description && (
            <div className="pt-2 border-t border-gray-100">
              <p
                className="text-gray-700 leading-loose text-sm"
                style={{ fontFamily: "'Noto Nastaliq Urdu', serif", lineHeight: '2.4' }}
              >
                {event.description}
              </p>
            </div>
          )}

          <div className="flex gap-2 pt-1" dir="ltr">
            <Button
              className="flex-1 gap-2 bg-red-900 hover:bg-red-800 text-white"
              onClick={() => { onClose(); onShare(event); }}
            >
              <span style={{ fontFamily: "'Noto Nastaliq Urdu', serif", lineHeight: '2', direction: 'rtl' }}>
                شیئر کریں
              </span>
            </Button>
            <DialogClose asChild>
              <Button variant="outline" className="flex-1">
                <span style={{ fontFamily: "'Noto Nastaliq Urdu', serif", lineHeight: '2', direction: 'rtl' }}>
                  بند کریں
                </span>
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function DetailRow({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="mt-1">{icon}</span>
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="text-xs text-gray-400"
          style={{ fontFamily: "'Noto Nastaliq Urdu', serif", lineHeight: '2' }}>
          {label}
        </span>
        <div className="text-gray-800 leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

// ─── Share Modal ─────────────────────────────────────────────────────────────

interface ShareModalProps {
  event: AzadariEvent | null;
  open: boolean;
  onClose: () => void;
}

export function ShareModal({ event, open, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  if (!event) return null;

  const shareText = `${event.title}\n${PROGRAM_TYPE_URDU[event.programType]} - ${event.masjidImambada}، ${event.city}\n${event.time} (${PART_OF_DAY_URDU[event.partOfDay]})\nخطابت: ${event.khitabat}`;
  const shareUrl = `${window.location.href.split('#')[0]}#event-${event.id}`;
  const encodedText = encodeURIComponent(shareText);
  const encodedUrl = encodeURIComponent(shareUrl);

  const platforms = [
    {
      name: 'WhatsApp',
      icon: <MessageCircle className="size-5" />,
      color: 'bg-green-500 hover:bg-green-600',
      url: `https://wa.me/?text=${encodedText}%0A${encodedUrl}`,
    },
    {
      name: 'Facebook',
      icon: <Facebook className="size-5" />,
      color: 'bg-blue-600 hover:bg-blue-700',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
    },
    {
      name: 'Twitter / X',
      icon: <Twitter className="size-5" />,
      color: 'bg-black hover:bg-gray-800',
      url: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
    },
    {
      name: 'Telegram',
      icon: <Send className="size-5" />,
      color: 'bg-sky-500 hover:bg-sky-600',
      url: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
    },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({ title: event.title, text: shareText, url: shareUrl });
    }
  };

  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent className="max-w-sm" dir="rtl">
        <DialogHeader>
          <DialogTitle style={{ fontFamily: "'Noto Nastaliq Urdu', serif", lineHeight: '2', direction: 'rtl' }}>
            شیئر کریں
          </DialogTitle>
        </DialogHeader>

        {/* Preview card */}
        <div className="rounded-lg border border-gray-200 p-3 bg-gray-50 text-sm" dir="rtl">
          <p className="font-semibold text-gray-800"
            style={{ fontFamily: "'Noto Nastaliq Urdu', serif", lineHeight: '2' }}>
            {event.title}
          </p>
          <p className="text-gray-500 text-xs mt-1"
            style={{ fontFamily: "'Noto Nastaliq Urdu', serif", lineHeight: '2' }}>
            {event.masjidImambada}، {event.city} · {event.time}
          </p>
        </div>

        {/* Platform buttons */}
        <div className="grid grid-cols-2 gap-2" dir="ltr">
          {platforms.map(p => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-white text-sm font-medium transition-colors ${p.color}`}
            >
              {p.icon}
              {p.name}
            </a>
          ))}
        </div>

        {/* Copy link */}
        <Button
          variant="outline"
          className="w-full gap-2"
          onClick={handleCopy}
        >
          {copied ? <Check className="size-4 text-green-600" /> : <Copy className="size-4" />}
          <span style={{ fontFamily: "'Noto Nastaliq Urdu', serif", lineHeight: '2', direction: 'rtl' }}>
            {copied ? 'کاپی ہو گیا!' : 'لنک کاپی کریں'}
          </span>
        </Button>

        {typeof navigator !== 'undefined' && 'share' in navigator && (
          <Button
            className="w-full bg-red-900 hover:bg-red-800 text-white gap-2"
            onClick={handleNativeShare}
          >
            <span style={{ fontFamily: "'Noto Nastaliq Urdu', serif", lineHeight: '2', direction: 'rtl' }}>
              مزید آپشن
            </span>
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
}
