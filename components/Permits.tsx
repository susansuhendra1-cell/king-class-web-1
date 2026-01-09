
import React, { useState } from 'react';
import { FileText, Plus, Printer, Trash2, Calendar, Clock } from 'lucide-react';
import { Student, Permit } from '../types';

interface PermitsProps {
  students: Student[];
  permits: Permit[];
  setPermits: React.Dispatch<React.SetStateAction<Permit[]>>;
}

const Permits: React.FC<PermitsProps> = ({ students, permits, setPermits }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPermit, setSelectedPermit] = useState<Permit | null>(null);

  const [formData, setFormData] = useState<Partial<Permit>>({
    studentId: '',
    type: 'Sakit',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    reason: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPermit: Permit = {
      ...formData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString()
    } as Permit;
    
    setPermits(prev => [newPermit, ...prev]);
    setShowModal(false);
    setFormData({
      studentId: '',
      type: 'Sakit',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      reason: ''
    });
  };

  const handlePrint = (permit: Permit) => {
    // In a real app, this would open a formatted print view
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Izin Siswa</h2>
          <p className="text-slate-500">Kelola dan cetak surat izin siswa secara otomatis</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
        >
          <Plus size={20} />
          Buat Izin Baru
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {permits.map(permit => {
          const student = students.find(s => s.id === permit.studentId);
          return (
            <div key={permit.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  permit.type === 'Sakit' ? 'bg-rose-100 text-rose-700' :
                  permit.type === 'Izin' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {permit.type}
                </span>
                <div className="flex gap-2 no-print">
                  <button onClick={() => handlePrint(permit)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500"><Printer size={16} /></button>
                  <button onClick={() => setPermits(prev => prev.filter(p => p.id !== permit.id))} className="p-2 hover:bg-rose-50 rounded-lg text-rose-400"><Trash2 size={16} /></button>
                </div>
              </div>
              <h4 className="font-bold text-lg text-slate-800 mb-1">{student?.name || 'Unknown Student'}</h4>
              <p className="text-sm text-slate-500 mb-4">{student?.class}</p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Calendar size={16} className="text-indigo-500" />
                  <span>{permit.startDate} s/d {permit.endDate}</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-slate-600">
                  <FileText size={16} className="text-indigo-500 mt-1 shrink-0" />
                  <p className="italic">"{permit.reason}"</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-50 text-xs text-slate-400 flex items-center gap-2">
                <Clock size={12} />
                Dibuat: {new Date(permit.createdAt).toLocaleDateString()}
              </div>
            </div>
          );
        })}
        {permits.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-400 bg-white rounded-2xl border border-dashed border-slate-300">
            Belum ada arsip surat izin
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-800">Form Izin Siswa</h3>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-slate-100 rounded-full">
                <Trash2 size={20} className="text-slate-500 rotate-45" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Nama Siswa</label>
                <select 
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.studentId}
                  onChange={e => setFormData({ ...formData, studentId: e.target.value })}
                >
                  <option value="">Pilih Siswa</option>
                  {students.map(s => <option key={s.id} value={s.id}>{s.name} ({s.nisn})</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Jenis Izin</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Sakit', 'Izin', 'Keperluan Keluarga'].map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData({ ...formData, type: type as any })}
                      className={`py-2 text-sm font-bold rounded-lg border transition-all ${
                        formData.type === type ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-700">Mulai</label>
                  <input 
                    type="date"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none"
                    value={formData.startDate}
                    onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-700">Selesai</label>
                  <input 
                    type="date"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none"
                    value={formData.endDate}
                    onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Keterangan / Alasan</label>
                <textarea 
                  required
                  placeholder="Misal: Demam tinggi butuh istirahat..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none min-h-[100px]"
                  value={formData.reason}
                  onChange={e => setFormData({ ...formData, reason: e.target.value })}
                />
              </div>
              <div className="pt-4">
                <button type="submit" className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                  Simpan & Cetak
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Permits;
