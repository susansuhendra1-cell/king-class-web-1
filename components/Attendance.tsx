
import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Save, CheckCircle2 } from 'lucide-react';
import { Student, AttendanceRecord, AttendanceStatus } from '../types';

interface AttendanceProps {
  students: Student[];
  attendance: AttendanceRecord[];
  setAttendance: React.Dispatch<React.SetStateAction<AttendanceRecord[]>>;
}

const Attendance: React.FC<AttendanceProps> = ({ students, attendance, setAttendance }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [tempRecords, setTempRecords] = useState<Record<string, AttendanceStatus>>({});
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Load existing data for selected date
  const existingDayRecords = attendance.filter(a => a.date === selectedDate);
  
  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    setTempRecords(prev => ({ ...prev, [studentId]: status }));
  };

  const handleSave = () => {
    // Fix: Explicitly cast status to AttendanceStatus to ensure type compatibility as Object.entries may infer it as unknown.
    const newRecords: AttendanceRecord[] = Object.entries(tempRecords).map(([studentId, status]) => ({
      date: selectedDate,
      studentId,
      status: status as AttendanceStatus
    }));

    setAttendance(prev => {
      // Filter out existing records for this date
      const otherDays = prev.filter(a => a.date !== selectedDate);
      return [...otherDays, ...newRecords];
    });

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          <Calendar className="text-indigo-600" />
          <div>
            <p className="text-sm text-slate-500 font-medium">Input Absensi Untuk Tanggal</p>
            <input 
              type="date" 
              className="text-lg font-bold text-slate-800 outline-none cursor-pointer"
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
          >
            {saveSuccess ? <CheckCircle2 size={18} /> : <Save size={18} />}
            {saveSuccess ? 'Tersimpan!' : 'Simpan Absensi'}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 font-bold text-slate-500 text-sm uppercase w-16">No</th>
                <th className="px-6 py-4 font-bold text-slate-500 text-sm uppercase">Nama Siswa</th>
                <th className="px-6 py-4 font-bold text-slate-500 text-sm uppercase text-center">Hadir</th>
                <th className="px-6 py-4 font-bold text-slate-500 text-sm uppercase text-center">Izin</th>
                <th className="px-6 py-4 font-bold text-slate-500 text-sm uppercase text-center">Sakit</th>
                <th className="px-6 py-4 font-bold text-slate-500 text-sm uppercase text-center">Alpha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.filter(s => s.isActive).map((student, idx) => {
                const currentStatus = tempRecords[student.id] || existingDayRecords.find(r => r.studentId === student.id)?.status || AttendanceStatus.HADIR;
                
                return (
                  <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-slate-400 font-medium">{idx + 1}</td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-800">{student.name}</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <input 
                        type="radio" 
                        name={`attendance-${student.id}`} 
                        className="w-5 h-5 text-indigo-600 focus:ring-indigo-500 accent-indigo-600"
                        checked={currentStatus === AttendanceStatus.HADIR}
                        onChange={() => handleStatusChange(student.id, AttendanceStatus.HADIR)}
                      />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <input 
                        type="radio" 
                        name={`attendance-${student.id}`} 
                        className="w-5 h-5 text-amber-500 accent-amber-500"
                        checked={currentStatus === AttendanceStatus.IZIN}
                        onChange={() => handleStatusChange(student.id, AttendanceStatus.IZIN)}
                      />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <input 
                        type="radio" 
                        name={`attendance-${student.id}`} 
                        className="w-5 h-5 text-yellow-500 accent-yellow-500"
                        checked={currentStatus === AttendanceStatus.SAKIT}
                        onChange={() => handleStatusChange(student.id, AttendanceStatus.SAKIT)}
                      />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <input 
                        type="radio" 
                        name={`attendance-${student.id}`} 
                        className="w-5 h-5 text-rose-600 accent-rose-600"
                        checked={currentStatus === AttendanceStatus.ALPHA}
                        onChange={() => handleStatusChange(student.id, AttendanceStatus.ALPHA)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
