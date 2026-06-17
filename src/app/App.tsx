import { useState, useMemo } from 'react';
import { Plus, Filter, ChevronDown, Search, X } from 'lucide-react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { EventCard } from './components/EventCard';
import { EventDetailModal, ShareModal } from './components/AzadariModals';
import { AddEventModal } from './components/AddEventModal';
import {
  AzadariEvent,
  MOCK_EVENTS,
  ProgramType,
  PartOfDay,
  PROGRAM_TYPE_URDU,
  PART_OF_DAY_URDU,
  PROGRAM_TYPE_ORDER,
  PROGRAM_TYPE_COLORS,
  PART_OF_DAY_ORDER,
  ALL_CITIES,
  ALL_STATES,
  getWeekDates,
  formatDateUrdu,
} from './components/azadari-data';

// ─── Constants ────────────────────────────────────────────────────────────────

const TODAY = '2026-06-17';
const urduFont = { fontFamily: "'Noto Nastaliq Urdu', serif" };

type WhenFilter = 'today' | 'tomorrow' | 'thisWeek' | 'nextWeek';

const WHEN_LABELS: Record<WhenFilter, string> = {
  today: 'آج',
  tomorrow: 'کل',
  thisWeek: 'اس ہفتہ',
  nextWeek: 'اگلے ہفتہ',
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getDateRange(when: WhenFilter): string[] {
  const base = new Date(TODAY + 'T00:00:00');
  if (when === 'today') return [TODAY];
  if (when === 'tomorrow') {
    const d = new Date(base);
    d.setDate(d.getDate() + 1);
    return [d.toISOString().split('T')[0]];
  }
  if (when === 'thisWeek') return getWeekDates(base, 0);
  if (when === 'nextWeek') return getWeekDates(base, 1);
  return [TODAY];
}

function groupByProgramType(events: AzadariEvent[]): Array<{ type: ProgramType; events: AzadariEvent[] }> {
  const map = new Map<ProgramType, AzadariEvent[]>();
  PROGRAM_TYPE_ORDER.forEach(t => map.set(t, []));
  events.forEach(e => map.get(e.programType)!.push(e));
  return PROGRAM_TYPE_ORDER
    .filter(t => (map.get(t) ?? []).length > 0)
    .map(t => ({ type: t, events: map.get(t)! }));
}

function shouldSubGroupByMasjid(events: AzadariEvent[], type: ProgramType, partOfDay: PartOfDay): boolean {
  return events.filter(e => e.programType === type && e.partOfDay === partOfDay).length > 3;
}

function groupByMasjid(events: AzadariEvent[]): Array<{ masjid: string; events: AzadariEvent[] }> {
  const map = new Map<string, AzadariEvent[]>();
  events.forEach(e => {
    if (!map.has(e.masjidImambada)) map.set(e.masjidImambada, []);
    map.get(e.masjidImambada)!.push(e);
  });
  return [...map.entries()].map(([masjid, evts]) => ({ masjid, events: evts }));
}

function groupByDate(events: AzadariEvent[]): Array<{ date: string; events: AzadariEvent[] }> {
  const map = new Map<string, AzadariEvent[]>();
  events.forEach(e => {
    if (!map.has(e.date)) map.set(e.date, []);
    map.get(e.date)!.push(e);
  });
  return [...map.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, evts]) => ({ date, events: evts }));
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SelectFilter({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="appearance-none h-8 pl-7 pr-3 rounded-full border border-gray-300 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-red-800 cursor-pointer"
        style={{ ...urduFont, lineHeight: '2', direction: 'rtl', minWidth: '100px' }}
      >
        <option value="All">{label}</option>
        {options.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      <ChevronDown className="absolute left-2 top-1/2 -translate-y-1/2 size-3 text-gray-500 pointer-events-none" />
    </div>
  );
}

// ─── Main App ────────────────────────────────────────────────────────────────

export default function App() {
  const [events, setEvents] = useState<AzadariEvent[]>(MOCK_EVENTS);
  const [when, setWhen] = useState<WhenFilter>('today');
  const [showFilters, setShowFilters] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [detailEvent, setDetailEvent] = useState<AzadariEvent | null>(null);
  const [shareEvent, setShareEvent] = useState<AzadariEvent | null>(null);
  const [masjidSearch, setMasjidSearch] = useState('');

  // Filters
  const [filterProgramType, setFilterProgramType] = useState<string>('All');
  const [filterCity, setFilterCity] = useState<string>('All');
  const [filterState, setFilterState] = useState<string>('All');
  const [filterPartOfDay, setFilterPartOfDay] = useState<string>('All');

  const dateRange = useMemo(() => getDateRange(when), [when]);
  const hasActiveFilters =
    filterProgramType !== 'All' || filterCity !== 'All' ||
    filterState !== 'All' || filterPartOfDay !== 'All' || masjidSearch !== '';

  const filteredEvents = useMemo(() => {
    return events.filter(e => {
      if (!dateRange.includes(e.date)) return false;
      if (filterProgramType !== 'All' && e.programType !== filterProgramType) return false;
      if (filterCity !== 'All' && e.city !== filterCity) return false;
      if (filterState !== 'All' && e.state !== filterState) return false;
      if (filterPartOfDay !== 'All' && e.partOfDay !== filterPartOfDay) return false;
      if (masjidSearch && !e.masjidImambada.toLowerCase().includes(masjidSearch.toLowerCase()) &&
          !e.city.toLowerCase().includes(masjidSearch.toLowerCase())) return false;
      return true;
    });
  }, [events, dateRange, filterProgramType, filterCity, filterState, filterPartOfDay, masjidSearch]);

  const clearFilters = () => {
    setFilterProgramType('All');
    setFilterCity('All');
    setFilterState('All');
    setFilterPartOfDay('All');
    setMasjidSearch('');
  };

  // Grouped for multi-day display (This Week / Next Week)
  const isMultiDay = when === 'thisWeek' || when === 'nextWeek';
  const dateGroups = useMemo(() => groupByDate(filteredEvents), [filteredEvents]);

  return (
    <div
      className="min-h-screen"
      style={{ background: '#faf5f0', fontFamily: "'Noto Nastaliq Urdu', serif" }}
      dir="rtl"
    >
      {/* MARKER-MAKE-KIT-INVOKED */}
      {/* MARKER-MAKE-KIT-DISCOVERY-READ */}

      {/* ─── Header ─────────────────────────────────────────────────── */}
      <header style={{ background: 'linear-gradient(135deg, #3d0000 0%, #6b1a1a 100%)' }} className="text-white">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          

          {/* CTA - Add Event */}
          <Button
            onClick={() => setShowAddModal(true)}
            className="gap-2 bg-amber-500 hover:bg-amber-400 text-black shadow-lg"
            style={{ fontFamily: "'Noto Nastaliq Urdu', serif", lineHeight: '2' }}
          >
            <Plus className="size-4 shrink-0" style={{ order: 1 }} />
            <span>ازادری تفصیل شامل کریں</span>
          </Button>
        </div>

        {/* When tabs */}
        <div className="max-w-7xl mx-auto px-4 pb-0">
          <div className="flex gap-0 overflow-x-auto" dir="rtl">
            {(Object.entries(WHEN_LABELS) as Array<[WhenFilter, string]>).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setWhen(key)}
                className={`px-5 py-3 text-sm whitespace-nowrap transition-colors border-b-2 ${
                  when === key
                    ? 'border-amber-400 text-amber-300 bg-white/10'
                    : 'border-transparent text-white/70 hover:text-white hover:bg-white/5'
                }`}
                style={{ fontFamily: "'Noto Nastaliq Urdu', serif", lineHeight: '2' }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ─── Filters Bar ────────────────────────────────────────────── */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Filters toggle on mobile */}
            <button
              onClick={() => setShowFilters(v => !v)}
              className={`flex items-center gap-1.5 h-8 px-3 rounded-full border text-xs transition-colors ${
                hasActiveFilters
                  ? 'bg-red-900 border-red-900 text-white'
                  : 'border-gray-300 text-gray-700 hover:border-red-800'
              }`}
              style={{ fontFamily: "'Noto Nastaliq Urdu', serif", lineHeight: '2' }}
            >
              <Filter className="size-3.5" />
              <span>فلٹر</span>
              {hasActiveFilters && (
                <span className="size-4 rounded-full bg-white text-red-900 text-xs flex items-center justify-center font-bold">
                  !
                </span>
              )}
            </button>

            {/* Masjid/city search */}
            <div className="relative flex-1 min-w-[160px] max-w-xs">
              <Search className="absolute right-2 top-1/2 -translate-y-1/2 size-3.5 text-gray-400" />
              <Input
                value={masjidSearch}
                onChange={e => setMasjidSearch(e.target.value)}
                placeholder="مسجد یا شہر تلاش کریں"
                className="h-8 text-xs pr-7 pl-3 rounded-full border-gray-300"
                style={{ fontFamily: "'Noto Nastaliq Urdu', serif", lineHeight: '2', direction: 'rtl' }}
              />
            </div>

            {/* Desktop filters - always visible */}
            <div className="hidden md:flex items-center gap-2 flex-wrap">
              <SelectFilter
                label="پروگرام"
                value={filterProgramType}
                onChange={setFilterProgramType}
                options={PROGRAM_TYPE_ORDER.map(t => ({ value: t, label: PROGRAM_TYPE_URDU[t] }))}
              />
              <SelectFilter
                label="شہر"
                value={filterCity}
                onChange={setFilterCity}
                options={ALL_CITIES.map(c => ({ value: c, label: c }))}
              />
              <SelectFilter
                label="صوبہ"
                value={filterState}
                onChange={setFilterState}
                options={ALL_STATES.map(s => ({ value: s, label: s }))}
              />
              <SelectFilter
                label="وقت"
                value={filterPartOfDay}
                onChange={setFilterPartOfDay}
                options={PART_OF_DAY_ORDER.map(p => ({ value: p, label: PART_OF_DAY_URDU[p] }))}
              />
            </div>

            {/* Clear filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 h-8 px-2 rounded-full text-xs text-red-800 hover:bg-red-50"
                style={{ fontFamily: "'Noto Nastaliq Urdu', serif", lineHeight: '2' }}
              >
                <X className="size-3" />
                <span>صاف</span>
              </button>
            )}
          </div>

          {/* Mobile expanded filters */}
          {showFilters && (
            <div className="flex md:hidden flex-wrap gap-2 pt-2 pb-1">
              <SelectFilter
                label="پروگرام"
                value={filterProgramType}
                onChange={setFilterProgramType}
                options={PROGRAM_TYPE_ORDER.map(t => ({ value: t, label: PROGRAM_TYPE_URDU[t] }))}
              />
              <SelectFilter
                label="شہر"
                value={filterCity}
                onChange={setFilterCity}
                options={ALL_CITIES.map(c => ({ value: c, label: c }))}
              />
              <SelectFilter
                label="صوبہ"
                value={filterState}
                onChange={setFilterState}
                options={ALL_STATES.map(s => ({ value: s, label: s }))}
              />
              <SelectFilter
                label="وقت"
                value={filterPartOfDay}
                onChange={setFilterPartOfDay}
                options={PART_OF_DAY_ORDER.map(p => ({ value: p, label: PART_OF_DAY_URDU[p] }))}
              />
            </div>
          )}
        </div>
      </div>

      {/* ─── Main Content ────────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {filteredEvents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
            <span className="text-6xl">🌙</span>
            <p
              className="text-gray-500"
              style={{ fontFamily: "'Noto Nastaliq Urdu', serif", lineHeight: '2.5', fontSize: '1.1rem' }}
            >
              اس وقت کے لیے کوئی پروگرام دستیاب نہیں ہے
            </p>
            <Button
              onClick={() => setShowAddModal(true)}
              className="bg-red-900 hover:bg-red-800 text-white gap-2"
              style={{ fontFamily: "'Noto Nastaliq Urdu', serif", lineHeight: '2' }}
            >
              <Plus className="size-4" />
              پروگرام شامل کریں
            </Button>
          </div>
        ) : isMultiDay ? (
          // Multi-day view (This Week / Next Week) — group by date first, then program type
          <div className="space-y-10">
            {dateGroups.map(({ date, events: dayEvents }) => (
              <section key={date}>
                {/* Date heading */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-px flex-1 bg-gray-200" />
                  <h2
                    className="text-gray-700 px-3 py-1 rounded-full bg-white border border-gray-200 shadow-sm"
                    style={{
                      fontFamily: "'Noto Nastaliq Urdu', serif",
                      lineHeight: '2.2',
                      fontWeight: '600',
                      fontSize: '0.9rem',
                    }}
                  >
                    {formatDateUrdu(date)}
                  </h2>
                  <div className="h-px flex-1 bg-gray-200" />
                </div>
                <ProgramTypeSections
                  events={dayEvents}
                  onDetail={setDetailEvent}
                  onShare={setShareEvent}
                />
              </section>
            ))}
          </div>
        ) : (
          // Single-day view (Today / Tomorrow) — group by program type directly
          <ProgramTypeSections
            events={filteredEvents}
            onDetail={setDetailEvent}
            onShare={setShareEvent}
          />
        )}
      </main>

      {/* ─── Floating Add Button (mobile) ───────────────────────────── */}
      <button
        onClick={() => setShowAddModal(true)}
        className="fixed bottom-6 left-6 z-30 flex items-center gap-2 px-4 py-3 rounded-full text-black shadow-xl md:hidden"
        style={{ background: '#f59e0b' }}
        aria-label="Add Event"
      >
        <Plus className="size-5" />
        <span style={{ fontFamily: "'Noto Nastaliq Urdu', serif", lineHeight: '2', fontSize: '0.85rem' }}>
          پروگرام شامل
        </span>
      </button>

      {/* ─── Modals ─────────────────────────────────────────────────── */}
      <AddEventModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={e => setEvents(prev => [e, ...prev])}
      />
      <EventDetailModal
        event={detailEvent}
        open={!!detailEvent}
        onClose={() => setDetailEvent(null)}
        onShare={setShareEvent}
      />
      <ShareModal
        event={shareEvent}
        open={!!shareEvent}
        onClose={() => setShareEvent(null)}
      />
    </div>
  );
}

// ─── Program Type Sections ────────────────────────────────────────────────────

function ProgramTypeSections({
  events,
  onDetail,
  onShare,
}: {
  events: AzadariEvent[];
  onDetail: (e: AzadariEvent) => void;
  onShare: (e: AzadariEvent) => void;
}) {
  const groups = groupByProgramType(events);

  return (
    <div className="space-y-8">
      {groups.map(({ type, events: typeEvents }) => {
        const colors = PROGRAM_TYPE_COLORS[type];

        // Check if any partOfDay has >3 events → sub-group by masjid
        const partOfDaySubGroups = PART_OF_DAY_ORDER.filter(pod =>
          shouldSubGroupByMasjid(typeEvents, type, pod)
        );

        // Split events into: those that need sub-grouping vs those that don't
        const podsThatSubGroup = new Set(partOfDaySubGroups);
        const eventsWithSubGroup = typeEvents.filter(e => podsThatSubGroup.has(e.partOfDay));
        const eventsWithoutSubGroup = typeEvents.filter(e => !podsThatSubGroup.has(e.partOfDay));

        return (
          <section key={type}>
            {/* Program Type Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className={`h-8 w-1 rounded-full ${colors.dot}`} />
              <h3
                className="text-gray-800"
                style={{
                  fontFamily: "'Noto Nastaliq Urdu', serif",
                  fontWeight: '700',
                  lineHeight: '2.2',
                  fontSize: '1.05rem',
                }}
              >
                {PROGRAM_TYPE_URDU[type]}
              </h3>
              <span className={`px-2.5 py-0.5 rounded-full text-xs ${colors.pill}`}
                style={{ fontFamily: "'Noto Nastaliq Urdu', serif", lineHeight: '2' }}>
                {typeEvents.length} پروگرام
              </span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            {/* Events without sub-grouping */}
            {eventsWithoutSubGroup.length > 0 && (
              <EventGrid events={eventsWithoutSubGroup} onDetail={onDetail} onShare={onShare} />
            )}

            {/* Sub-groups by Masjid for pods with >3 events */}
            {PART_OF_DAY_ORDER.filter(pod => podsThatSubGroup.has(pod)).map(pod => {
              const podEvents = eventsWithSubGroup.filter(e => e.partOfDay === pod);
              if (podEvents.length === 0) return null;
              const masjidGroups = groupByMasjid(podEvents);
              return (
                <div key={pod} className="mt-4">
                  {/* Part-of-day sub-heading */}
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full"
                      style={{ fontFamily: "'Noto Nastaliq Urdu', serif", lineHeight: '2' }}
                    >
                      {PART_OF_DAY_URDU[pod]}
                    </span>
                    <div className="h-px flex-1 bg-gray-100" />
                  </div>
                  <div className="space-y-4">
                    {masjidGroups.map(({ masjid, events: masjidEvents }) => (
                      <div key={masjid} className="rounded-xl bg-white border border-gray-100 shadow-sm p-3">
                        {/* Masjid sub-group heading */}
                        <p
                          className="text-sm text-gray-600 mb-3 pb-2 border-b border-gray-100"
                          style={{ fontFamily: "'Noto Nastaliq Urdu', serif", lineHeight: '2', fontWeight: '600' }}
                        >
                          {masjid}
                        </p>
                        <EventGrid events={masjidEvents} onDetail={onDetail} onShare={onShare} />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </section>
        );
      })}
    </div>
  );
}

function EventGrid({
  events,
  onDetail,
  onShare,
}: {
  events: AzadariEvent[];
  onDetail: (e: AzadariEvent) => void;
  onShare: (e: AzadariEvent) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {events.map(event => (
        <EventCard
          key={event.id}
          event={event}
          onDetail={onDetail}
          onShare={onShare}
        />
      ))}
    </div>
  );
}
