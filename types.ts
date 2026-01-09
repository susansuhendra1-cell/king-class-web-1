
export enum AttendanceStatus {
  HADIR = 'Hadir',
  IZIN = 'Izin',
  SAKIT = 'Sakit',
  ALPHA = 'Alpha'
}

export enum Gender {
  L = 'Laki-laki',
  P = 'Perempuan'
}

export interface Student {
  id: string;
  nisn: string;
  name: string;
  class: string;
  gender: Gender;
  address: string;
  parentName: string;
  parentPhone: string;
  isActive: boolean;
  photoUrl?: string;
}

export interface AttendanceRecord {
  date: string;
  studentId: string;
  status: AttendanceStatus;
}

export interface Permit {
  id: string;
  studentId: string;
  type: 'Sakit' | 'Izin' | 'Keperluan Keluarga';
  startDate: string;
  endDate: string;
  reason: string;
  createdAt: string;
}

export interface Payment {
  id: string;
  studentId: string;
  type: string;
  amount: number;
  date: string;
  method: string;
}

export interface HomeVisit {
  id: string;
  studentId: string;
  date: string;
  reason: 'Absensi' | 'Akademik' | 'Perilaku' | 'Ekonomi' | 'Lainnya';
  findings: string;
  followUp: string;
  isCompleted: boolean;
}

export interface TeacherProfile {
  name: string;
  nip: string;
  class: string;
  academicYear: string;
  signatureUrl?: string;
}
