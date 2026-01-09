
import React from 'react';
import { Users, UserCheck, UserPlus, Home, TrendingUp, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Student, AttendanceRecord, Permit, Payment, HomeVisit, AttendanceStatus } from '../types';

interface DashboardProps {
  students: Student[];
  attendance: AttendanceRecord[];
  permits: Permit[];
  payments: Payment[];
  visits: HomeVisit[];
}

const Dashboard: React.FC<DashboardProps> = ({ students, attendance, permits, payments, visits }) => {
  const today = new Date().toISOString().split('T')[0];
  const activeStudents = students.filter(s => s.isActive).length;
  const todayAttendance = attendance.filter(a => a.date === today);
  const presentToday = todayAttendance.filter(a => a.status === AttendanceStatus.HADIR).length;
  const absentToday = todayAttendance.filter(a => a.status === AttendanceStatus.ALPHA).length;
  
  const pendingVisits = visits.filter(v => !v.isCompleted).length;
  const recentPayments = payments.slice(-5).reverse();

  // Chart Data
  const attendancePieData = [
    { name: 'Hadir', value: presentToday || 0 },
    { name: 'Alpha', value: absentToday || 0 },
    { name: 'Izin/Sakit', value: todayAttendance.length - presentToday - absentToday || 0 },
    { name: 'Belum Absen', value: activeStudents - todayAttendance.length || 0 },
  ].filter(d => d.value > 0);

  if (attendancePieData.length === 0) {
    attendancePieData.push({ name: 'Belum Ada Data', value: 1 });
  }

  const COLORS = ['#4f46e5', '#f43f5e', '#fbbf24', '#e2e8f0'];

  const stats = [
    { label: 'Total Siswa', value: activeStudents, icon: Users, color: 'bg-indigo-500' },
    { label: 'Hadir Hari Ini', value: presentToday, icon: UserCheck, color: 'bg-emerald-500' },
    { label: 'Siswa Izin/Sakit', value: permits.length, icon: UserPlus, color: 'bg-amber-500' },
    { label: 'Pending Home Visit', value: pendingVisits, icon: Home, color: 'bg-rose-500' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className={`${stat.color} p-3 rounded-xl text-white`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Attendance Summary Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm lg:col-span-1 flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <AlertCircle size={20} className="text-indigo-600" />
            Kehadiran Hari Ini
          </h3>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={attendancePieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {attendancePieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {attendancePieData.map((d, i) => (
              <div key={i} className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></span>
                  {d.name}
                </span>
                <span className="font-bold">{d.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity / Payments */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <TrendingUp size={20} className="text-indigo-600" />
              Transaksi Terakhir
            </h3>
            <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">Lihat Semua</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="pb-4 font-semibold text-slate-500 text-sm">Siswa</th>
                  <th className="pb-4 font-semibold text-slate-500 text-sm">Jenis</th>
                  <th className="pb-4 font-semibold text-slate-500 text-sm">Nominal</th>
                  <th className="pb-4 font-semibold text-slate-500 text-sm">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {recentPayments.length > 0 ? recentPayments.map((p, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 font-medium text-slate-700">
                      {students.find(s => s.id === p.studentId)?.name || 'Unknown'}
                    </td>
                    <td className="py-4 text-slate-500 text-sm">{p.type}</td>
                    <td className="py-4 font-bold text-slate-800">Rp {p.amount.toLocaleString()}</td>
                    <td className="py-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                        Success
                      </span>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-slate-400">Belum ada transaksi pembayaran</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
