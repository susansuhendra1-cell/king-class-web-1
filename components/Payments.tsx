
import React, { useState } from 'react';
import { CreditCard, Plus, Receipt, Search, Filter, ArrowUpRight } from 'lucide-react';
import { Student, Payment } from '../types';

interface PaymentsProps {
  students: Student[];
  payments: Payment[];
  setPayments: React.Dispatch<React.SetStateAction<Payment[]>>;
}

const Payments: React.FC<PaymentsProps> = ({ students, payments, setPayments }) => {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [formData, setFormData] = useState<Partial<Payment>>({
    studentId: '',
    type: 'SPP',
    amount: 0,
    date: new Date().toISOString().split('T')[0],
    method: 'Tunai'
  });

  const filteredPayments = payments.filter(p => {
    const student = students.find(s => s.id === p.studentId);
    return student?.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.type.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPayment: Payment = {
      ...formData,
      id: 'TXN' + Math.random().toString(36).substr(2, 6).toUpperCase(),
    } as Payment;
    
    setPayments(prev => [newPayment, ...prev]);
    setShowModal(false);
    setFormData({ studentId: '', type: 'SPP', amount: 0, date: new Date().toISOString().split('T')[0], method: 'Tunai' });
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 p-8 rounded-3xl text-white shadow-xl shadow-indigo-100 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">Kas & Keuangan Kelas</h2>
          <p className="text-indigo-100 opacity-90">Kelola iuran dan pembayaran siswa secara transparan</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
            <p className="text-xs uppercase font-bold tracking-wider opacity-80 mb-1">Total Terkumpul</p>
            <p className="text-2xl font-bold">Rp {payments.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}</p>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="px-6 py-4 bg-white text-indigo-600 font-bold rounded-2xl hover:bg-slate-50 transition-all shadow-lg flex items-center gap-2"
          >
            <Plus size={20} />
            Catat Bayar
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari transaksi..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
             <button className="flex-1 sm:flex-none p-2.5 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50">
               <Filter size={20} />
             </button>
             <button className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-2">
               <ArrowUpRight size={18} />
               Export
             </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 font-bold text-slate-500 text-sm uppercase">ID Transaksi</th>
                <th className="px-6 py-4 font-bold text-slate-500 text-sm uppercase">Siswa</th>
                <th className="px-6 py-4 font-bold text-slate-500 text-sm uppercase">Jenis</th>
                <th className="px-6 py-4 font-bold text-slate-500 text-sm uppercase">Nominal</th>
                <th className="px-6 py-4 font-bold text-slate-500 text-sm uppercase">Metode</th>
                <th className="px-6 py-4 font-bold text-slate-500 text-sm uppercase text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPayments.map(p => {
                const student = students.find(s => s.id === p.studentId);
                return (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-sm text-indigo-600 font-semibold">{p.id}</td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-800">{student?.name || 'Unknown'}</p>
                      <p className="text-xs text-slate-500">{p.date}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold">
                        {p.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-800">Rp {p.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-slate-600 text-sm">{p.method}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg" title="Cetak Struk">
                        <Receipt size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filteredPayments.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">Belum ada riwayat pembayaran</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-800">Catat Pembayaran Baru</h3>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-slate-100 rounded-full">
                 <Plus size={24} className="text-slate-500 rotate-45" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Pilih Siswa</label>
                <select 
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.studentId}
                  onChange={e => setFormData({ ...formData, studentId: e.target.value })}
                >
                  <option value="">Cari Siswa...</option>
                  {students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-700">Jenis Pembayaran</label>
                  <select 
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none"
                    value={formData.type}
                    onChange={e => setFormData({ ...formData, type: e.target.value })}
                  >
                    <option value="SPP">SPP</option>
                    <option value="Uang Kas">Uang Kas</option>
                    <option value="Kegiatan">Kegiatan</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-700">Nominal (Rp)</label>
                  <input 
                    type="number"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none"
                    value={formData.amount}
                    onChange={e => setFormData({ ...formData, amount: Number(e.target.value) })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-700">Tanggal</label>
                  <input 
                    type="date"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none"
                    value={formData.date}
                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-700">Metode</label>
                  <select 
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none"
                    value={formData.method}
                    onChange={e => setFormData({ ...formData, method: e.target.value })}
                  >
                    <option value="Tunai">Tunai</option>
                    <option value="Transfer">Transfer</option>
                  </select>
                </div>
              </div>
              <div className="pt-4">
                <button type="submit" className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                  Konfirmasi Pembayaran
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payments;
