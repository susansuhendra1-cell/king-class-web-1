
import React from 'react';
import { FileBarChart, Download, Printer, Filter } from 'lucide-react';
import { Student, AttendanceRecord, Payment, Permit, HomeVisit } from '../types';

interface ReportsProps {
  students: Student[];
  attendance: AttendanceRecord[];
  payments: Payment[];
  permits: Permit[];
  visits: HomeVisit[];
}

const Reports: React.FC<ReportsProps> = ({ students, attendance, payments, permits, visits }) => {
  const reportTypes = [
    { title: 'Laporan Kehadiran', description: 'Rekap absensi harian, bulanan, dan per semester.', count: attendance.length },
    { title: 'Laporan Keuangan', description: 'Rekapitulasi iuran kas, SPP, dan kegiatan siswa.', count: payments.length },
    { title: 'Laporan Home Visit', description: 'Data tindak lanjut hasil kunjungan rumah siswa.', count: visits.length },
    { title: 'Data Izin Siswa', description: 'Kumpulan surat izin sakit dan keperluan lainnya.', count: permits.length },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {reportTypes.map((report, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:border-indigo-200 transition-all group cursor-pointer">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-all">
              <FileBarChart size={24} />
            </div>
            <h3 className="font-bold text-slate-800 mb-2">{report.title}</h3>
            <p className="text-sm text-slate-500 mb-4">{report.description}</p>
            <div className="flex justify-between items-center pt-4 border-t border-slate-50">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{report.count} Data</span>
              <button className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg"><Download size={18} /></button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-800">Preview Laporan Terintegrasi</h3>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-slate-600 font-bold hover:bg-slate-50">
              <Filter size={18} />
              Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700">
              <Printer size={18} />
              Cetak Semua
            </button>
          </div>
        </div>
        <div className="p-8 text-center py-20">
           <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
              <FileBarChart size={40} className="text-slate-300" />
           </div>
           <h4 className="text-xl font-bold text-slate-800 mb-2">Pilih kategori di atas</h4>
           <p className="text-slate-500 max-w-sm mx-auto">Gunakan dashboard filter untuk mengenerate laporan otomatis berdasarkan rentang waktu atau kategori tertentu.</p>
        </div>
      </div>
    </div>
  );
};

export default Reports;
