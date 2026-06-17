import { useForm } from 'react-hook-form';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { AzadariEvent, ProgramType, PartOfDay } from './azadari-data';

interface AddEventModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (event: AzadariEvent) => void;
}

type FormValues = {
  title: string;
  programType: ProgramType;
  khitabat: string;
  date: string;
  time: string;
  partOfDay: PartOfDay;
  masjidImambada: string;
  address: string;
  city: string;
  state: string;
  description: string;
  contact: string;
  thumbnail: string;
};

const urduFont = { fontFamily: "'Noto Nastaliq Urdu', serif", lineHeight: '2.2' };

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="text-sm text-gray-600 block mb-1" style={urduFont} dir="rtl">
      {children}
    </label>
  );
}

export function AddEventModal({ open, onClose, onAdd }: AddEventModalProps) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      programType: 'Majlis',
      partOfDay: 'Evening',
    },
  });

  const onSubmit = (data: FormValues) => {
    const newEvent: AzadariEvent = {
      id: `custom-${Date.now()}`,
      title: data.title,
      programType: data.programType,
      khitabat: data.khitabat,
      date: data.date,
      time: data.time,
      partOfDay: data.partOfDay,
      masjidImambada: data.masjidImambada,
      address: data.address,
      city: data.city,
      state: data.state,
      description: data.description,
      contact: data.contact || undefined,
      thumbnail: data.thumbnail || undefined,
    };
    onAdd(newEvent);
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto" dir="rtl">
        <DialogHeader>
          <DialogTitle style={urduFont}>ازادری تفصیل شامل کریں</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* Title */}
          <div>
            <Label>پروگرام کا عنوان *</Label>
            <Input
              {...register('title', { required: true })}
              placeholder="مثال: مجلس عزائے حسینی"
              dir="rtl"
              style={urduFont}
              className={errors.title ? 'border-red-500' : ''}
            />
          </div>

          {/* Program Type */}
          <div>
            <Label>پروگرام کی قسم *</Label>
            <select
              {...register('programType', { required: true })}
              className="w-full h-9 rounded-md border border-gray-200 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-800"
              dir="rtl"
              style={urduFont}
            >
              <option value="Majlis">مجلس</option>
              <option value="Matam">ماتم</option>
              <option value="Shab-bedari">شب بیداری</option>
              <option value="Juloos-e-Aza">جلوس عزا</option>
            </select>
          </div>

          {/* Khitabat */}
          <div>
            <Label>خطابت / ذاکر / منتظم *</Label>
            <Input
              {...register('khitabat', { required: true })}
              placeholder="مثال: مولانا سید علی نقی نقوی"
              dir="rtl"
              style={urduFont}
              className={errors.khitabat ? 'border-red-500' : ''}
            />
          </div>

          {/* Date + Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>تاریخ *</Label>
              <Input
                type="date"
                {...register('date', { required: true })}
                dir="ltr"
                className={errors.date ? 'border-red-500' : ''}
              />
            </div>
            <div>
              <Label>وقت *</Label>
              <Input
                {...register('time', { required: true })}
                placeholder="8:00 PM"
                dir="ltr"
                className={errors.time ? 'border-red-500' : ''}
              />
            </div>
          </div>

          {/* Part of Day */}
          <div>
            <Label>دن کا حصہ *</Label>
            <select
              {...register('partOfDay', { required: true })}
              className="w-full h-9 rounded-md border border-gray-200 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-800"
              dir="rtl"
              style={urduFont}
            >
              <option value="Morning">صبح</option>
              <option value="Afternoon">دوپہر</option>
              <option value="Evening">شام</option>
              <option value="Night">رات</option>
            </select>
          </div>

          {/* Masjid */}
          <div>
            <Label>مسجد / امام بارگاہ *</Label>
            <Input
              {...register('masjidImambada', { required: true })}
              placeholder="مثال: امام بارگاہ علی رضا"
              dir="rtl"
              style={urduFont}
              className={errors.masjidImambada ? 'border-red-500' : ''}
            />
          </div>

          {/* Address */}
          <div>
            <Label>پتہ *</Label>
            <Input
              {...register('address', { required: true })}
              placeholder="مثال: حسین آباد، بلاک نمبر ۳"
              dir="rtl"
              style={urduFont}
              className={errors.address ? 'border-red-500' : ''}
            />
          </div>

          {/* City + State */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>شہر *</Label>
              <Input
                {...register('city', { required: true })}
                placeholder="ممبئی"
                dir="rtl"
                style={urduFont}
                className={errors.city ? 'border-red-500' : ''}
              />
            </div>
            <div>
              <Label>صوبہ *</Label>
              <select
                {...register('state', { required: true })}
                className="w-full h-9 rounded-md border border-gray-200 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-800"
                dir="rtl"
                style={urduFont}
              >
                <option value="">انتخاب کریں</option>
                <option value="Sindh">سندھ</option>
                <option value="Punjab">پنجاب</option>
                <option value="KPK">خیبر پختونخوا</option>
                <option value="Balochistan">بلوچستان</option>
                <option value="Federal Territory">وفاقی دارالحکومت</option>
                <option value="AJK">آزاد کشمیر</option>
                <option value="GB">گلگت بلتستان</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <Label>تفصیل</Label>
            <textarea
              {...register('description')}
              placeholder="پروگرام کی تفصیل..."
              rows={3}
              dir="rtl"
              style={{ ...urduFont, width: '100%' }}
              className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-800 resize-none"
            />
          </div>

          {/* Contact */}
          <div>
            <Label>رابطہ نمبر</Label>
            <Input
              {...register('contact')}
              placeholder="0300-1234567"
              dir="ltr"
            />
          </div>

          {/* Thumbnail */}
          <div>
            <Label>تصویر کا لنک (اختیاری)</Label>
            <Input
              {...register('thumbnail')}
              placeholder="https://..."
              dir="ltr"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2" dir="ltr">
            <Button
              type="submit"
              className="flex-1 bg-red-900 hover:bg-red-800 text-white"
            >
              <span style={{ ...urduFont, direction: 'rtl' }}>شامل کریں</span>
            </Button>
            <Button type="button" variant="outline" className="flex-1" onClick={() => { reset(); onClose(); }}>
              <span style={{ ...urduFont, direction: 'rtl' }}>منسوخ</span>
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
