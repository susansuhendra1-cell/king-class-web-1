
import React from 'react';
import { Archive, FileText, Receipt, Home, Search, ExternalLink } from 'lucide-react';
import { Student, Permit, Payment, HomeVisit } from '../types';

interface DocumentsProps {
  students: Student[];
  permits: Permit[];
  payments: Payment[];
  visits: HomeVisit[];
}

const Documents: React.FC<DocumentsProps> = ({ students, permits, payments, visits }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
          <Archive className="text-indigo-600" />
          Arsip Dokumen
        </h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Cari dalam arsip..."
            className="pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Permits Archive */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 bg-rose-50 border-b border-rose-100 flex items-center gap-3">
            <FileText className="text-rose-600" />
            <h3 className="font-bold text-rose-800">Surat Izin</h3>
          </div>
          <div className="flex-1 overflow-y-auto max-h-[400px] p-2 space-y-1">
            {permits.map(p => (
              <div key={p.id} className="p-3 hover:bg-slate-50 rounded-xl flex justify-between items-center group cursor-pointer transition-colors">
                <div>
                  <p className="text-sm font-bold text-slate-800">{students.find(s => s.id === p.studentId)?.name}</p>
                  <p className="text-xs text-slate-400">{p.startDate} - {p.type}</p>
                </div>
                <ExternalLink size={16} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
              </div>
            ))}
            {permits.length === 0 && <p className="p-8 text-center text-slate-400 italic text-sm">Kosong</p>}
          </div>
        </div>

        {/* Payments Archive */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 bg-indigo-50 border-b border-indigo-100 flex items-center gap-3">
            <Receipt className="text-indigo-600" />
            <h3 className="font-bold text-indigo-800">Struk Bayar</h3>
          </div>
          <div className="flex-1 overflow-y-auto max-h-[400px] p-2 space-y-1">
            {payments.map(p => (
              <div key={p.id} className="p-3 hover:bg-slate-50 rounded-xl flex justify-between items-center group cursor-pointer transition-colors">
                <div>
                  <p className="text-sm font-bold text-slate-800">{p.id}</p>
                  <p className="text-xs text-slate-400">{p.type} - Rp {p.amount.toLocaleString()}</p>
                </div>
                <ExternalLink size={16} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
              </div>
            ))}
            {payments.length === 0 && <p className="p-8 text-center text-slate-400 italic text-sm">Kosong</p>}
          </div>
        </div>

        {/* Visit Archive */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 bg-emerald-50 border-b border-emerald-100 flex items-center gap-3">
            <Home className="text-emerald-600" />
            <h3 className="font-bold text-emerald-800">Log Home Visit</h3>
          </div>
          <div className="flex-1 overflow-y-auto max-h-[400px] p-2 space-y-1">
            {visits.map(v => (
              <div key={v.id} className="p-3 hover:bg-slate-50 rounded-xl flex justify-between items-center group cursor-pointer transition-colors">
                <div>
                  <p className="text-sm font-bold text-slate-800">{students.find(s => s.id === v.studentId)?.name}</p>
                  <p className="text-xs text-slate-400">{v.date} - {v.reason}</p>
                </div>
                <ExternalLink size={16} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
              </div>
            ))}
            {visits.length === 0 && <p className="p-8 text-center text-slate-400 italic text-sm">Kosong</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documents;
