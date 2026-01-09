
import React, { useState } from 'react';
import { Settings, Save, User, BookOpen, GraduationCap, CheckCircle } from 'lucide-react';
import { TeacherProfile } from '../types';

interface SettingsProps {
  profile: TeacherProfile;
  setProfile: React.Dispatch<React.SetStateAction<TeacherProfile>>;
}

const SettingsPage: React.FC<SettingsProps> = ({ profile, setProfile }) => {
  const [formData, setFormData] = useState<TeacherProfile>(profile);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -mr-10 -mt-10 -z-10"></div>
        <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-3">
          <Settings className="text-indigo-600" />
          Pengaturan Akun & Kelas
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-slate-700 flex items-center gap-2 border-b pb-2">
                <User size={18} /> Profil Wali Kelas
              </h3>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-500">Nama Lengkap & Gelar</label>
                  <input className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-500">NIP / Identitas Pegawai</label>
                  <input className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500" value={formData.nip} onChange={e => setFormData({ ...formData, nip: e.target.value })} />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-bold text-slate-700 flex items-center gap-2 border-b pb-2">
                <GraduationCap size={18} /> Informasi Akademik
              </h3>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-500">Kelas Binaan</label>
                  <input className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500" value={formData.class} onChange={e => setFormData({ ...formData, class: e.target.value })} />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-500">Tahun Ajaran</label>
                  <input className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500" value={formData.academicYear} onChange={e => setFormData({ ...formData, academicYear: e.target.value })} />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-700 flex items-center gap-2 border-b pb-2">
              Tanda Tangan Digital
            </h3>
            <div className="flex items-center gap-8">
               <div className="w-32 h-32 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center bg-slate-50">
                  {formData.signatureUrl ? <img src={formData.signatureUrl} /> : <span className="text-xs text-slate-400 text-center px-4">Upload Tanda Tangan</span>}
               </div>
               <div className="flex-1 space-y-2">
                 <button type="button" className="px-6 py-2 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50">Ganti Foto</button>
                 <p className="text-xs text-slate-400">Gunakan format PNG transparan untuk hasil terbaik pada cetak struk dan surat izin.</p>
               </div>
            </div>
          </div>

          <div className="pt-8 flex justify-end">
            <button type="submit" className="flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100">
              {saveSuccess ? <CheckCircle size={20} /> : <Save size={20} />}
              {saveSuccess ? 'Berhasil Disimpan' : 'Simpan Semua Pengaturan'}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-slate-900 text-slate-400 p-8 rounded-3xl">
         <div className="flex justify-between items-center">
            <div>
              <p className="text-white font-bold text-lg mb-1">Backup Data Aplikasi</p>
              <p className="text-sm">Simpan cadangan data Anda ke komputer lokal dalam format JSON.</p>
            </div>
            <button className="px-6 py-2 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 transition-all border border-slate-700">Export JSON</button>
         </div>
      </div>
    </div>
  );
};

export default SettingsPage;
