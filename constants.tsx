
import { Student, Gender } from './types';

export const INITIAL_STUDENTS: Student[] = [
  {
    id: '1',
    nisn: '0012345678',
    name: 'Ahmad Faisal',
    class: 'XII RPL 1',
    gender: Gender.L,
    address: 'Jl. Merdeka No. 10, Jakarta',
    parentName: 'Sutrisno',
    parentPhone: '081234567890',
    isActive: true,
    photoUrl: 'https://picsum.photos/seed/1/200'
  },
  {
    id: '2',
    nisn: '0023456789',
    name: 'Siti Aminah',
    class: 'XII RPL 1',
    gender: Gender.P,
    address: 'Jl. Melati No. 5, Jakarta',
    parentName: 'Budi',
    parentPhone: '081234567891',
    isActive: true,
    photoUrl: 'https://picsum.photos/seed/2/200'
  },
  {
    id: '3',
    nisn: '0034567890',
    name: 'Budi Santoso',
    class: 'XII RPL 1',
    gender: Gender.L,
    address: 'Jl. Mawar No. 8, Jakarta',
    parentName: 'Agus',
    parentPhone: '081234567892',
    isActive: true,
    photoUrl: 'https://picsum.photos/seed/3/200'
  }
];

export const APP_VERSION = '1.0.0';
