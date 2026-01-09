
import React, { useState } from 'react';
import { Home, Plus, Calendar, MapPin, CheckCircle2, AlertCircle, Search } from 'lucide-react';
import { Student, HomeVisit } from '../types';

interface HomeVisitsProps {
  students: Student[];
  visits: HomeVisit[];
  setVisits: React.Dispatch<React.SetStateAction<HomeVisit[]>>;
}

const HomeVisits: React.FC<HomeVisitsProps> = ({ students, visits, setVisits }) => {
  const [showModal, setShowModal] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'completed' | 'pending'>('all');

  const [formData, setFormData] = useState<Partial<HomeVisit>>({
    studentId: '',
    date: new Date().toISOString().split('T')[0],
    reason: 'Absensi',
    findings: '',
    followUp: '',
    isCompleted: false
  });

  const filteredVisits = visits.filter(v => {
    if (filterType === 'completed') return v.isCompleted;
    if (filterType === 'pending') return !v.isCompleted;
    return true;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newVisit: HomeVisit = {
      ...formData,
      id: Math.random().toString(36).substr(2, 9),
    } as HomeVisit;
    
    setVisits(prev => [newVisit, ...prev]);
    setShowModal(false);
    setFormData({ studentId: '', date: new Date().toISOString().split('T')[0], reason: 'Absensi', findings: '', followUp: '', isCompleted: false });
  };

  const toggleStatus = (id: string) => {
    setVisits(prev => prev.map(v => v.id === id ? { ...v, isCompleted: !v.isCompleted } : v));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Home Visit</h2>
          <p className="text-slate-500">Pantau dan data kunjungan rumah siswa</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
        >
          <Plus size={20} />
          Catat Kunjungan
        </button>
      </div>

      <div className="flex gap-2 bg-slate-100 p-1 rounded-xl w-fit">
        {(['all', 'pending', 'completed'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilterType(f)}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all capitalize ${
              filterType === f ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {f === 'all' ? 'Semua' : f === 'pending' ? 'Belum Selesai' : 'Selesai'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredVisits.map(visit => {
          const student = students.find(s => s.id === visit.studentId);
          return (
            <div key={visit.id} className={`bg-white p-6 rounded-3xl border ${visit.isCompleted ? 'border-slate-200' : 'border-amber-200 bg-amber-50/20'} shadow-sm relative overflow-hidden group`}>
              {!visit.isCompleted && (
                <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-400"></div>
              )}
              
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center">
                    <Home size={24} className="text-slate-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-slate-800">{student?.name}</h4>
                    <p className="text-sm text-slate-500">{student?.address}</p>
                  </div>
                </div>
                <button 
                  onClick={() => toggleStatus(visit.id)}
                  className={`p-2 rounded-xl transition-colors ${visit.isCompleted ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                >
                  <CheckCircle2 size={24} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Tanggal</p>
                  <div className="flex items-center gap-2 text-slate-700 font-semibold">
                    <Calendar size={14} />
                    {visit.date}
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Alasan</p>
                  <div className="flex items-center gap-2 text-indigo-600 font-semibold">
                    <AlertCircle size={14} />
                    {visit.reason}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-bold text-slate-800 mb-1">Hasil Temuan:</p>
                  <p className="text-sm text-slate-600 italic">"{visit.findings || 'Belum ada catatan temuan'}"</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800 mb-1">Tindak Lanjut:</p>
                  <p className="text-sm text-indigo-600">{visit.followUp || 'Menunggu observasi...'}</p>
                </div>
              </div>
            </div>
          );
        })}
        {filteredVisits.length === 0 && (
          <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-dashed border-slate-300">
            <Home size={48} className="mx-auto text-slate-200 mb-4" />
            <p className="text-slate-400 font-medium italic">Belum ada data home visit yang tercatat</p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-800">Data Home Visit Baru</h3>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-slate-100 rounded-full">
                 <Plus size={24} className="text-slate-500 rotate-45" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Pilih Siswa</label>
                <select 
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none"
                  value={formData.studentId}
                  onChange={e => setFormData({ ...formData, studentId: e.target.value })}
                >
                  <option value="">Pilih Siswa</option>
                  {students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-700">Tanggal Kunjungan</label>
                  <input type="date" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-700">Alasan Utama</label>
                  <select className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none" value={formData.reason} onChange={e => setFormData({ ...formData, reason: e.target.value as any })}>
                    <option value="Absensi">Absensi Bermasalah</option>
                    <option value="Akademik">Nilai / Akademik</option>
                    <option value="Perilaku">Masalah Perilaku</option>
                    <option value="Ekonomi">Keadaan Ekonomi</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Temuan di Lapangan</label>
                <textarea className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none min-h-[100px]" value={formData.findings} onChange={e => setFormData({ ...formData, findings: e.target.value })} />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Rencana Tindak Lanjut</label>
                <input className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none" value={formData.followUp} onChange={e => setFormData({ ...formData, followUp: e.target.value })} />
              </div>
              <div className="pt-4 flex items-center gap-2">
                <input type="checkbox" id="isComp" className="w-5 h-5 accent-indigo-600" checked={formData.isCompleted} onChange={e => setFormData({ ...formData, isCompleted: e.target.checked })} />
                <label htmlFor="isComp" className="text-sm font-semibold text-slate-700">Tandai Kunjungan Selesai</label>
              </div>
              <div className="pt-4">
                <button type="submit" className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                  Simpan Data Kunjungan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeVisits;
