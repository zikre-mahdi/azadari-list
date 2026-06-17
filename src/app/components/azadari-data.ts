export type ProgramType = 'Majlis' | 'Matam' | 'Shab-bedari' | 'Juloos-e-Aza';
export type PartOfDay = 'Morning' | 'Afternoon' | 'Evening' | 'Night';

export interface AzadariEvent {
  id: string;
  title: string;
  programType: ProgramType;
  khitabat: string;
  time: string;
  partOfDay: PartOfDay;
  date: string; // YYYY-MM-DD
  masjidImambada: string;
  city: string;
  state: string;
  address: "محفلِ محبان حسینی، فرنڈس کالونی، ممبرا",
  thumbnail?: string;
  description: string;
  contact?: string;
  organizer?: string;
}

export const PROGRAM_TYPE_URDU: Record<ProgramType, string> = {
  Majlis: 'مجلس',
  Matam: 'ماتم',
  'Shab-bedari': 'شب بیداری',
  'Juloos-e-Aza': 'جلوس عزا',
};

export const PART_OF_DAY_URDU: Record<PartOfDay, string> = {
  Morning: 'صبح',
  Afternoon: 'دوپہر',
  Evening: 'شام',
  Night: 'رات',
};

export const PART_OF_DAY_ORDER: PartOfDay[] = ['Morning', 'Afternoon', 'Evening', 'Night'];
export const PROGRAM_TYPE_ORDER: ProgramType[] = ['Majlis', 'Matam', 'Shab-bedari', 'Juloos-e-Aza'];

export const PROGRAM_TYPE_COLORS: Record<ProgramType, { pill: string; header: string; dot: string }> = {
  Majlis: { pill: 'bg-red-900 text-white', header: 'bg-red-900', dot: 'bg-red-700' },
  Matam: { pill: 'bg-blue-900 text-white', header: 'bg-blue-900', dot: 'bg-blue-700' },
  'Shab-bedari': { pill: 'bg-purple-900 text-white', header: 'bg-purple-900', dot: 'bg-purple-700' },
  'Juloos-e-Aza': { pill: 'bg-green-800 text-white', header: 'bg-green-800', dot: 'bg-green-600' },
};

// Today = 2026-06-17
const D0 = '2026-06-17'; // Today
const D1 = '2026-06-18'; // Tomorrow
const D2 = '2026-06-14'; // This week - Sunday before
const D3 = '2026-06-15'; // This week - Monday
const D4 = '2026-06-16'; // This week - Tuesday
const D5 = '2026-06-19'; // This week - Friday
const D6 = '2026-06-20'; // This week - Saturday
const D7 = '2026-06-21'; // Next week - Sunday
const D8 = '2026-06-22'; // Next week - Monday
const D9 = '2026-06-23'; // Next week - Tuesday
const D10 = '2026-06-24'; // Next week - Wednesday

export const MOCK_EVENTS: AzadariEvent[] = [
  // ─── TODAY ────────────────────────────────────────────────
  {
    id: '1',
    title: 'مجلس عزائے حسینی',
    programType: 'Majlis',
    khitabat: 'مولانا سید علی نقی نقوی',
    time: '8:00 PM',
    partOfDay: 'Evening',
    date: D0,
    masjidImambada: 'امام بارگاہ علی رضا',
    city: 'Mumbai',
    state: 'Maharashtra',
    address: "محفلِ محبان حسینی، فرنڈس کالونی، ممبرا",
    thumbnail: 'https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=400&h=225&fit=crop',
    description: 'ذکر شہادت سید الشہداء امام حسین علیہ السلام اور یاران باوفا کربلا۔ تمام عزاداران خاندان رسالت کو مدعو کیا جاتا ہے۔ مجلس کے بعد تبرک تقسیم ہوگا۔',
    contact:"",
    organizer: 'مرکزی انجمن حسینیہ',
  },
  {
    id: '2',
    title: 'مجلس شہدائے کربلا',
    programType: 'Majlis',
    khitabat: 'مولانا ظفر عباس ناصری',
    time: '8:30 PM',
    partOfDay: 'Evening',
    date: D0,
    masjidImambada: 'امام بارگاہ حسینیہ',
    city: 'Mumbai',
    state: 'Maharashtra',
    address: "محفلِ محبان حسینی، فرنڈس کالونی، ممبرا",
    thumbnail: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=400&h=225&fit=crop',
    description: 'مجلس عزا بمناسبت یاد شہدائے کربلا۔ ذاکر اہل بیتؑ مولانا ظفر عباس ناصری ذکر مصیبت کریں گے۔',
    contact:"",
    organizer: 'خدام الحسین ٹرسٹ',
  },
  {
    id: '3',
    title: 'مجلس یاد سید الشہداء',
    programType: 'Majlis',
    khitabat: 'مولانا راجہ ناصر عباس جعفری',
    time: '7:30 PM',
    partOfDay: 'Evening',
    date: D0,
    masjidImambada: 'امام بارگاہ فاطمیہ',
    city: 'Mumbai',
    state: 'Maharashtra',
    address: "محفلِ محبان حسینی، فرنڈس کالونی، ممبرا",
    thumbnail: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&h=225&fit=crop',
    description: 'بزرگداشت شہادت حضرت امام حسین علیہ السلام۔ پروگرام مغرب نماز کے بعد شروع ہوگا۔',
    contact:"",
    organizer: 'انجمن امامیہ لانڈھی',
  },
  {
    id: '4',
    title: 'مجلس برائے خواتین',
    programType: 'Majlis',
    khitabat: 'محترمہ سیدہ فاطمہ نقوی',
    time: '6:00 PM',
    partOfDay: 'Evening',
    date: D0,
    masjidImambada: 'امام بارگاہ زینبیہ',
    city: 'Mumbai',
    state: 'Maharashtra',
    address: "محفلِ محبان حسینی، فرنڈس کالونی، ممبرا",
    thumbnail: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=225&fit=crop',
    description: 'خواتین کی مخصوص مجلس عزا۔ صرف خواتین و بچوں کے لیے۔ ذاکرہ محترمہ سیدہ فاطمہ نقوی ذکر مصیبت کریں گی۔',
    contact:"",
    organizer: 'بزم زینبیہ',
  },
  {
    id: '5',
    title: 'مجلس شب عاشور',
    programType: 'Majlis',
    khitabat: 'مولانا محمد رضا صادقی',
    time: '9:00 PM',
    partOfDay: 'Night',
    date: D0,
    masjidImambada: 'امام بارگاہ پنجتن پاک',
    city: 'Mumbai',
    state: 'Maharashtra',
    address: "محفلِ محبان حسینی، فرنڈس کالونی، ممبرا",
    thumbnail: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=400&h=225&fit=crop',
    description: 'مجلس شب عاشور۔ ذکر مصیبت شہادت امام حسین اور اصحاب باوفا۔',
    contact:"",
    organizer: 'شب بیداری کمیٹی ممبئی',
  },
  {
    id: '6',
    title: 'مجلس صبح کاذب',
    programType: 'Majlis',
    khitabat: 'مولانا عون علی نقوی',
    time: '9:30 AM',
    partOfDay: 'Morning',
    date: D0,
    masjidImambada: 'امام بارگاہ عسکریہ',
    city: 'Mumbai',
    state: 'Maharashtra',
    address: "محفلِ محبان حسینی، فرنڈس کالونی، ممبرا",
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=225&fit=crop',
    description: 'صبح کی مجلس عزا۔ فجر نماز کے بعد مجلس ہوگی۔',
    contact:"",
    organizer: 'امام بارگاہ عسکریہ انتظامیہ',
  },
  {
    id: '7',
    title: 'ماتم داری',
    programType: 'Matam',
    khitabat: 'انجمن حیدریہ ممبئی',
    time: '7:00 PM',
    partOfDay: 'Evening',
    date: D0,
    masjidImambada: 'انجمن حیدریہ',
    city: 'Mumbai',
    state: 'Maharashtra',
    address: "محفلِ محبان حسینی، فرنڈس کالونی، ممبرا",
    thumbnail: 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=400&h=225&fit=crop',
    description: 'سالانہ ماتم داری پروگرام۔ نوحہ خوانی اور ماتم۔',
    contact:"",
    organizer: 'انجمن حیدریہ',
  },
  {
    id: '8',
    title: 'ماتم و نوحہ',
    programType: 'Matam',
    khitabat: 'انجمن عباسیہ ممبئی',
    time: '8:00 PM',
    partOfDay: 'Evening',
    date: D0,
    masjidImambada: 'انجمن عباسیہ',
    city: 'Mumbai',
    state: 'Maharashtra',
    address: "محفلِ محبان حسینی، فرنڈس کالونی، ممبرا",
    thumbnail: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=225&fit=crop',
    description: 'ماتم و نوحہ پروگرام بمناسبت شہادت امام حسین علیہ السلام۔',
    contact:"",
    organizer: 'انجمن عباسیہ ممبئی',
  },
  {
    id: '9',
    title: 'شب بیداری عاشورہ',
    programType: 'Shab-bedari',
    khitabat: 'مولانا سید جواد نقوی',
    time: '10:30 PM',
    partOfDay: 'Night',
    date: D0,
    masjidImambada: 'امام بارگاہ جعفریہ',
    city: 'Mumbai',
    state: 'Maharashtra',
    address: "محفلِ محبان حسینی، فرنڈس کالونی، ممبرا",
    thumbnail: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=225&fit=crop',
    description: 'رات بھر کی شب بیداری۔ مجلس، ماتم اور نوحہ خوانی۔ سحری کا انتظام بھی ہوگا۔',
    contact:"",
    organizer: 'شب بیداری کمیٹی اسلام آباد',
  },
  {
    id: '10',
    title: 'جلوس عزا',
    programType: 'Juloos-e-Aza',
    khitabat: 'مرکزی تنظیم عزاداران',
    time: '8:00 AM',
    partOfDay: 'Morning',
    date: D0,
    masjidImambada: 'حسین آباد گراؤنڈ',
    city: 'Mumbai',
    state: 'Maharashtra',
    address: "محفلِ محبان حسینی، فرنڈس کالونی، ممبرا",
    thumbnail: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=225&fit=crop',
    description: 'سالانہ جلوس عزا۔ حسین آباد گراؤنڈ سے شروع ہو کر نشتر پارک تک جائے گا۔',
    contact:"",
    organizer: 'مرکزی تنظیم عزاداران ممبئی',
  },

  // ─── TOMORROW ────────────────────────────────────────────
  {
    id: '11',
    title: 'مجلس عزا',
    programType: 'Majlis',
    khitabat: 'مولانا عباس کمیلی',
    time: '8:00 PM',
    partOfDay: 'Evening',
    date: D1,
    masjidImambada: 'امام بارگاہ شاہ عالم',
    city: 'Mumbai',
    state: 'Maharashtra',
    address: "محفلِ محبان حسینی، فرنڈس کالونی، ممبرا",
    thumbnail: 'https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=400&h=225&fit=crop',
    description: 'مجلس عزا بمناسبت یاد شہدائے کربلا۔',
    contact:"",
    organizer: 'امام بارگاہ شاہ عالم انتظامیہ',
  },
  {
    id: '12',
    title: 'صبح کی مجلس',
    programType: 'Majlis',
    khitabat: 'مولانا انصار حسینی',
    time: '10:00 AM',
    partOfDay: 'Morning',
    date: D1,
    masjidImambada: 'امام بارگاہ حیدریہ',
    city: 'Mumbai',
    state: 'Maharashtra',
    address: "محفلِ محبان حسینی، فرنڈس کالونی، ممبرا",
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=225&fit=crop',
    description: 'صبح کی مجلس۔ ذاکر مولانا انصار حسینی ذکر مصیبت کریں گے۔',
    contact:"",
    organizer: 'انجمن حیدریہ پی ای سی ایچ ایس',
  },
  {
    id: '13',
    title: 'مجلس ذکر مصیبت',
    programType: 'Majlis',
    khitabat: 'مولانا محمد علی غروی',
    time: '7:00 PM',
    partOfDay: 'Evening',
    date: D1,
    masjidImambada: 'امام بارگاہ امام علی',
    city: 'Mumbai',
    state: 'Maharashtra',
    address: "محفلِ محبان حسینی، فرنڈس کالونی، ممبرا",
    thumbnail: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&h=225&fit=crop',
    description: 'مجلس ذکر مصیبت۔ عزاداران کو مدعو کیا جاتا ہے۔',
    contact:"",
    organizer: 'خدام الزہراء ٹرسٹ',
  },
  {
    id: '14',
    title: 'ماتم و عزاداری',
    programType: 'Matam',
    khitabat: 'انجمن علویہ اسلام آباد',
    time: '7:30 PM',
    partOfDay: 'Evening',
    date: D1,
    masjidImambada: 'امام بارگاہ علوی',
    city: 'Mumbai',
    state: 'Maharashtra',
    address: "محفلِ محبان حسینی، فرنڈس کالونی، ممبرا",
    thumbnail: 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=400&h=225&fit=crop',
    description: 'ماتم و عزاداری پروگرام۔',
    contact:"",
    organizer: 'انجمن علویہ اسلام آباد',
  },
  {
    id: '15',
    title: 'شب بیداری',
    programType: 'Shab-bedari',
    khitabat: 'مولانا سید حسن نقوی',
    time: '11:00 PM',
    partOfDay: 'Night',
    date: D1,
    masjidImambada: 'امام بارگاہ جعفریہ ممبئی',
    city: 'Mumbai',
    state: 'Maharashtra',
    address: "محفلِ محبان حسینی، فرنڈس کالونی، ممبرا",
    thumbnail: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=225&fit=crop',
    description: 'رات بھر کی شب بیداری۔ تلاوت قرآن، ذکر اور مجلس۔',
    contact:"",
    organizer: 'امام بارگاہ جعفریہ انتظامیہ',
  },

  // ─── THIS WEEK (June 14-16, 19-20) ─────────────────────
  {
    id: '16',
    title: 'مجلس عزائے حسینی',
    programType: 'Majlis',
    khitabat: 'مولانا احمد اقبال',
    time: '8:00 PM',
    partOfDay: 'Evening',
    date: D3,
    masjidImambada: 'امام بارگاہ رضویہ',
    city: 'Mumbai',
    state: 'Maharashtra',
    address: "محفلِ محبان حسینی، فرنڈس کالونی، ممبرا",
    thumbnail: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=400&h=225&fit=crop',
    description: 'مجلس عزا بمناسبت یاد شہدائے کربلا۔',
    contact:"",
    organizer: 'امام بارگاہ رضویہ انتظامیہ',
  },
  {
    id: '17',
    title: 'مجلس شب بیداری',
    programType: 'Majlis',
    khitabat: 'مولانا باقر زیدی',
    time: '9:30 PM',
    partOfDay: 'Night',
    date: D4,
    masjidImambada: 'امام بارگاہ مدینۃ العلم',
    city: 'Mumbai',
    state: 'Maharashtra',
    address: "محفلِ محبان حسینی، فرنڈس کالونی، ممبرا",
    thumbnail: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=400&h=225&fit=crop',
    description: 'رات کی مجلس۔ ذکر مصیبت اور نوحہ خوانی۔',
    contact:"",
    organizer: 'مجلس علماء جعفریہ',
  },
  {
    id: '18',
    title: 'مجلس بزرگداشت شہادت',
    programType: 'Majlis',
    khitabat: 'مولانا علی حیدر الموسوی',
    time: '8:00 PM',
    partOfDay: 'Evening',
    date: D5,
    masjidImambada: 'امام بارگاہ صادقیہ',
    city: 'Mumbai',
    state: 'Maharashtra',
    address: "محفلِ محبان حسینی، فرنڈس کالونی، ممبرا",
    thumbnail: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=225&fit=crop',
    description: 'مجلس بزرگداشت شہادت امام حسین علیہ السلام۔',
    contact:"",
    organizer: 'امام بارگاہ صادقیہ پشاور',
  },
  {
    id: '19',
    title: 'جلوس عزا',
    programType: 'Juloos-e-Aza',
    khitabat: 'انجمن شبیریہ ممبئی',
    time: '7:00 AM',
    partOfDay: 'Morning',
    date: D5,
    masjidImambada: 'مال روڈ جلوس گاہ',
    city: 'Mumbai',
    state: 'Maharashtra',
    address: "محفلِ محبان حسینی، فرنڈس کالونی، ممبرا",
    thumbnail: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=225&fit=crop',
    description: 'سالانہ جلوس عزا بمناسبت یوم عاشورہ۔',
    contact:"",
    organizer: 'انجمن شبیریہ ممبئی',
  },
  {
    id: '20',
    title: 'مجلس عزا',
    programType: 'Majlis',
    khitabat: 'مولانا زین العابدین شیرازی',
    time: '9:00 PM',
    partOfDay: 'Night',
    date: D6,
    masjidImambada: 'امام بارگاہ امامیہ',
    city: 'Mumbai',
    state: 'Maharashtra',
    address: "محفلِ محبان حسینی، فرنڈس کالونی، ممبرا",
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=225&fit=crop',
    description: 'مجلس عزا۔ تمام عزاداران مدعو ہیں۔',
    contact:"",
    organizer: 'امام بارگاہ امامیہ انتظامیہ',
  },

  // ─── NEXT WEEK ───────────────────────────────────────────
  {
    id: '21',
    title: 'مجلس عزائے حسینی',
    programType: 'Majlis',
    khitabat: 'مولانا سید علی نقی نقوی',
    time: '8:00 PM',
    partOfDay: 'Evening',
    date: D7,
    masjidImambada: 'امام بارگاہ علی رضا',
    city: 'Mumbai',
    state: 'Maharashtra',
    address: "محفلِ محبان حسینی، فرنڈس کالونی، ممبرا",
    thumbnail: 'https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=400&h=225&fit=crop',
    description: 'ہفتہ وار مجلس عزا۔',
    contact:"",
    organizer: 'مرکزی انجمن حسینیہ',
  },
  {
    id: '22',
    title: 'مجلس شہدا',
    programType: 'Majlis',
    khitabat: 'مولانا ظفر عباس ناصری',
    time: '7:30 PM',
    partOfDay: 'Evening',
    date: D8,
    masjidImambada: 'امام بارگاہ کاظمیہ',
    city: 'Mumbai',
    state: 'Maharashtra',
    address: "محفلِ محبان حسینی، فرنڈس کالونی، ممبرا",
    thumbnail: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=400&h=225&fit=crop',
    description: 'مجلس شہدائے کربلا۔',
    contact:"",
    organizer: 'امام بارگاہ کاظمیہ انتظامیہ',
  },
  {
    id: '23',
    title: 'شب بیداری',
    programType: 'Shab-bedari',
    khitabat: 'مولانا سید جواد نقوی',
    time: '10:00 PM',
    partOfDay: 'Night',
    date: D9,
    masjidImambada: 'امام بارگاہ جعفریہ',
    city: 'Mumbai',
    state: 'Maharashtra',
    address: "محفلِ محبان حسینی، فرنڈس کالونی، ممبرا",
    thumbnail: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=225&fit=crop',
    description: 'ہفتہ وار شب بیداری پروگرام۔',
    contact:"",
    organizer: 'شب بیداری کمیٹی اسلام آباد',
  },
  {
    id: '24',
    title: 'ماتم و نوحہ',
    programType: 'Matam',
    khitabat: 'انجمن شبیریہ',
    time: '6:30 PM',
    partOfDay: 'Evening',
    date: D10,
    masjidImambada: 'انجمن شبیریہ',
    city: 'Mumbai',
    state: 'Maharashtra',
    address: "محفلِ محبان حسینی، فرنڈس کالونی، ممبرا",
    thumbnail: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=225&fit=crop',
    description: 'ہفتہ وار ماتم و نوحہ پروگرام۔',
    contact:"",
    organizer: 'انجمن شبیریہ',
  },
];

export function getWeekDates(baseDate: Date, weekOffset: number): string[] {
  const dates: string[] = [];
  const startOfWeek = new Date(baseDate);
  const day = startOfWeek.getDay(); // 0=Sun
  startOfWeek.setDate(startOfWeek.getDate() - day + weekOffset * 7);
  for (let i = 0; i < 7; i++) {
    const d = new Date(startOfWeek);
    d.setDate(d.getDate() + i);
    dates.push(d.toISOString().split('T')[0]);
  }
  return dates;
}

export function formatDateUrdu(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  const days = ['اتوار', 'پیر', 'منگل', 'بدھ', 'جمعرات', 'جمعہ', 'سنیچر'];
  const months = [
    'جنوری', 'فروری', 'مارچ', 'اپریل', 'مئی', 'جون',
    'جولائی', 'اگست', 'ستمبر', 'اکتوبر', 'نومبر', 'دسمبر',
  ];
  return `${days[date.getDay()]}، ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

export const ALL_CITIES = [...new Set(MOCK_EVENTS.map(e => e.city))].sort();
export const ALL_STATES = [...new Set(MOCK_EVENTS.map(e => e.state))].sort();
