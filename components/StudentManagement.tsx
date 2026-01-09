
import React, { useState } from 'react';
import { Search, Plus, UserPlus, Filter, MoreVertical, Edit2, Trash2, Download } from 'lucide-react';
import { Student, Gender } from '../types';

interface StudentManagementProps {
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
}

const StudentManagement: React.FC<StudentManagementProps> = ({ students, setStudents }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.nisn.includes(searchTerm)
  );

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus data siswa ini?')) {
      setStudents(prev => prev.filter(s => s.id !== id));
    }
  };

  const StudentForm = ({ student }: { student?: Student }) => {
    const [formData, setFormData] = useState<Partial<Student>>(student || {
      name: '',
      nisn: '',
      class: 'XII RPL 1',
      gender: Gender.L,
      address: '',
      parentName: '',
      parentPhone: '',
      isActive: true,
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (student) {
        setStudents(prev => prev.map(s => s.id === student.id ? { ...s, ...formData } as Student : s));
      } else {
        const newStudent = {
          ...formData,
          id: Math.random().toString(36).substr(2, 9),
        } as Student;
        setStudents(prev => [...prev, newStudent]);
      }
      setIsModalOpen(false);
      setEditingStudent(null);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">Nama Lengkap</label>
            <input 
              required
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">NISN</label>
            <input 
              required
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
              value={formData.nisn}
              onChange={e => setFormData({ ...formData, nisn: e.target.value })}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">Jenis Kelamin</label>
            <select 
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
              value={formData.gender}
              onChange={e => setFormData({ ...formData, gender: e.target.value as Gender })}
            >
              <option value={Gender.L}>Laki-laki</option>
              <option value={Gender.P}>Perempuan</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">Kelas</label>
            <input 
              required
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
              value={formData.class}
              onChange={e => setFormData({ ...formData, class: e.target.value })}
            />
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-sm font-semibold text-slate-700">Alamat</label>
          <textarea 
            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
            value={formData.address}
            onChange={e => setFormData({ ...formData, address: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">Nama Orang Tua</label>
            <input 
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
              value={formData.parentName}
              onChange={e => setFormData({ ...formData, parentName: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">HP Orang Tua</label>
            <input 
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
              value={formData.parentPhone}
              onChange={e => setFormData({ ...formData, parentPhone: e.target.value })}
            />
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <button 
            type="button" 
            onClick={() => {setIsModalOpen(false); setEditingStudent(null);}}
            className="px-6 py-2 rounded-lg border border-slate-200 font-semibold hover:bg-slate-50 transition-colors"
          >
            Batal
          </button>
          <button 
            type="submit" 
            className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
          >
            {student ? 'Simpan Perubahan' : 'Tambah Siswa'}
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Cari nama atau NISN..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 font-semibold hover:bg-slate-50 transition-colors">
            <Download size={18} />
            Import
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100"
          >
            <UserPlus size={18} />
            Siswa Baru
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 font-bold text-slate-500 text-sm uppercase tracking-wider">Foto</th>
                <th className="px-6 py-4 font-bold text-slate-500 text-sm uppercase tracking-wider">Nama & NISN</th>
                <th className="px-6 py-4 font-bold text-slate-500 text-sm uppercase tracking-wider">Jenis Kelamin</th>
                <th className="px-6 py-4 font-bold text-slate-500 text-sm uppercase tracking-wider">Orang Tua</th>
                <th className="px-6 py-4 font-bold text-slate-500 text-sm uppercase tracking-wider text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <img src={student.photoUrl || `https://picsum.photos/seed/${student.id}/40`} className="w-10 h-10 rounded-full object-cover border-2 border-slate-100" alt="" />
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-800">{student.name}</p>
                    <p className="text-sm text-slate-500">{student.nisn}</p>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{student.gender}</td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-slate-700">{student.parentName}</p>
                    <p className="text-xs text-slate-500">{student.parentPhone}</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => {setEditingStudent(student); setIsModalOpen(true);}}
                        className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(student.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-800">
                {editingStudent ? 'Edit Data Siswa' : 'Tambah Siswa Baru'}
              </h3>
              <button onClick={() => {setIsModalOpen(false); setEditingStudent(null);}} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X size={20} className="text-slate-500" />
              </button>
            </div>
            <div className="p-6">
              <StudentForm student={editingStudent || undefined} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const X = ({ size, className }: { size: number, className: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export default StudentManagement;
