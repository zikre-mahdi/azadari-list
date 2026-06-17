import { Clock, Share2, Info } from 'lucide-react';
import { AzadariEvent, PROGRAM_TYPE_COLORS, PROGRAM_TYPE_URDU, PART_OF_DAY_URDU } from './azadari-data';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface EventCardProps {
  event: AzadariEvent;
  onDetail: (event: AzadariEvent) => void;
  onShare: (event: AzadariEvent) => void;
}

export function EventCard({ event, onDetail, onShare }: EventCardProps) {
  const colors = PROGRAM_TYPE_COLORS[event.programType];

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-200 border border-gray-100">
      {/* Thumbnail */}
      <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
        {event.thumbnail ? (
          <ImageWithFallback
            src={event.thumbnail}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #2c0a0a 0%, #6b1a1a 100%)' }}
          >
            <span className="text-white/60 text-4xl">☪</span>
          </div>
        )}
        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* Event title pill on thumbnail */}
        <div className="absolute bottom-0 right-0 left-0 p-2">
          <span
            className="inline-block px-3 py-1 rounded-full text-white text-sm leading-relaxed max-w-full"
            style={{
              fontFamily: "'Noto Nastaliq Urdu', serif",
              background: 'rgba(0,0,0,0.75)',
              lineHeight: '2',
              direction: 'rtl',
            }}
          >
            {event.title}
          </span>
        </div>

        {/* Program type badge top-right */}
        <div className="absolute top-2 left-2">
          <span className={`inline-block px-2 py-0.5 rounded-full text-xs ${colors.pill}`}
            style={{ fontFamily: "'Noto Nastaliq Urdu', serif", lineHeight: '2' }}>
            {PROGRAM_TYPE_URDU[event.programType]}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-3 flex flex-col gap-2 flex-1" dir="rtl">
        {/* Masjid name */}
        <p
          className="text-gray-500 text-xs leading-loose truncate"
          style={{ fontFamily: "'Noto Nastaliq Urdu', serif", lineHeight: '2' }}
        >
          {event.masjidImambada} — {event.city}
        </p>

        {/* Khitabat - bold and prominent */}
        <p
          className="text-gray-900 leading-loose line-clamp-2"
          style={{
            fontFamily: "'Noto Nastaliq Urdu', serif",
            fontWeight: '700',
            lineHeight: '2.2',
            fontSize: '0.95rem',
          }}
        >
          {event.khitabat}
        </p>

        {/* Time + Part of day */}
        <div className="flex items-center gap-1.5 text-gray-600" dir="ltr">
          <Clock className="size-3.5 shrink-0 text-red-800" />
          <span className="text-sm">{event.time}</span>
          <span className="text-gray-400">·</span>
          <span
            className="text-sm"
            style={{ fontFamily: "'Noto Nastaliq Urdu', serif", lineHeight: '2', direction: 'rtl' }}
          >
            {PART_OF_DAY_URDU[event.partOfDay]}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-auto pt-1" dir="ltr">
          <Button
            size="sm"
            variant="outline"
            className="flex-1 gap-1.5 border-red-800 text-red-800 hover:bg-red-50 hover:text-red-900"
            onClick={() => onDetail(event)}
          >
            <Info className="size-3.5" />
            <span style={{ fontFamily: "'Noto Nastaliq Urdu', serif", lineHeight: '2', direction: 'rtl' }}>
              تفصیل
            </span>
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="gap-1.5 border-gray-300 text-gray-600 hover:bg-gray-50"
            onClick={() => onShare(event)}
          >
            <Share2 className="size-3.5" />
            <span style={{ fontFamily: "'Noto Nastaliq Urdu', serif", lineHeight: '2', direction: 'rtl' }}>
              شیئر
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
