
import React, { useState, useEffect, useMemo } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  CalendarCheck, 
  FileText, 
  CreditCard, 
  Home, 
  PieChart, 
  Archive, 
  Settings,
  Menu,
  X,
  ChevronRight,
  LogOut,
  Bell
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import StudentManagement from './components/StudentManagement';
import Attendance from './components/Attendance';
import Permits from './components/Permits';
import Payments from './components/Payments';
import HomeVisits from './components/HomeVisits';
import Reports from './components/Reports';
import Documents from './components/Documents';
import SettingsPage from './components/SettingsPage';
import { Student, AttendanceRecord, Permit, Payment, HomeVisit, TeacherProfile } from './types';
import { INITIAL_STUDENTS } from './constants';

type Tab = 'dashboard' | 'students' | 'attendance' | 'permits' | 'payments' | 'visits' | 'reports' | 'archive' | 'settings';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Data State - Persistence in LocalStorage
  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('kc_students');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  const [attendance, setAttendance] = useState<AttendanceRecord[]>(() => {
    const saved = localStorage.getItem('kc_attendance');
    return saved ? JSON.parse(saved) : [];
  });

  const [permits, setPermits] = useState<Permit[]>(() => {
    const saved = localStorage.getItem('kc_permits');
    return saved ? JSON.parse(saved) : [];
  });

  const [payments, setPayments] = useState<Payment[]>(() => {
    const saved = localStorage.getItem('kc_payments');
    return saved ? JSON.parse(saved) : [];
  });

  const [visits, setVisits] = useState<HomeVisit[]>(() => {
    const saved = localStorage.getItem('kc_visits');
    return saved ? JSON.parse(saved) : [];
  });

  const [profile, setProfile] = useState<TeacherProfile>(() => {
    const saved = localStorage.getItem('kc_profile');
    return saved ? JSON.parse(saved) : {
      name: 'Bapak/Ibu Wali Kelas',
      nip: '19850101 201001 1 001',
      class: 'XII RPL 1',
      academicYear: '2023/2024',
    };
  });

  useEffect(() => {
    localStorage.setItem('kc_students', JSON.stringify(students));
    localStorage.setItem('kc_attendance', JSON.stringify(attendance));
    localStorage.setItem('kc_permits', JSON.stringify(permits));
    localStorage.setItem('kc_payments', JSON.stringify(payments));
    localStorage.setItem('kc_visits', JSON.stringify(visits));
    localStorage.setItem('kc_profile', JSON.stringify(profile));
  }, [students, attendance, permits, payments, visits, profile]);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'students', label: 'Data Siswa', icon: Users },
    { id: 'attendance', label: 'Absensi', icon: CalendarCheck },
    { id: 'permits', label: 'Izin Siswa', icon: FileText },
    { id: 'payments', label: 'Pembayaran', icon: CreditCard },
    { id: 'visits', label: 'Home Visit', icon: Home },
    { id: 'reports', label: 'Laporan', icon: PieChart },
    { id: 'archive', label: 'Arsip Dokumen', icon: Archive },
    { id: 'settings', label: 'Pengaturan', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard students={students} attendance={attendance} permits={permits} payments={payments} visits={visits} />;
      case 'students': return <StudentManagement students={students} setStudents={setStudents} />;
      case 'attendance': return <Attendance students={students} attendance={attendance} setAttendance={setAttendance} />;
      case 'permits': return <Permits students={students} permits={permits} setPermits={setPermits} />;
      case 'payments': return <Payments students={students} payments={payments} setPayments={setPayments} />;
      case 'visits': return <HomeVisits students={students} visits={visits} setVisits={setVisits} />;
      case 'reports': return <Reports students={students} attendance={attendance} payments={payments} permits={permits} visits={visits} />;
      case 'archive': return <Documents permits={permits} payments={payments} visits={visits} students={students} />;
      case 'settings': return <SettingsPage profile={profile} setProfile={setProfile} />;
      default: return <Dashboard students={students} attendance={attendance} permits={permits} payments={payments} visits={visits} />;
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } transition-all duration-300 bg-white border-r border-slate-200 flex flex-col h-screen no-print`}
      >
        <div className="p-6 flex items-center gap-3 border-b border-slate-100 h-16 shrink-0">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shrink-0">
            <span className="text-white font-bold">K</span>
          </div>
          {isSidebarOpen && <span className="font-bold text-xl tracking-tight text-indigo-900">King Class</span>}
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as Tab)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                activeTab === item.id 
                  ? 'bg-indigo-50 text-indigo-600' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
              }`}
              title={item.label}
            >
              <item.icon size={20} strokeWidth={activeTab === item.id ? 2.5 : 2} />
              {isSidebarOpen && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100 h-20 shrink-0">
          <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-500 hover:text-rose-600 transition-colors">
            <LogOut size={20} />
            {isSidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 no-print">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1.5 text-slate-500 hover:bg-slate-50 rounded-md transition-colors"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <h1 className="text-lg font-semibold text-slate-800 capitalize">
              {menuItems.find(i => i.id === activeTab)?.label}
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-1.5 text-slate-500 hover:bg-slate-50 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-800">{profile.name}</p>
                <p className="text-xs text-slate-500">Wali Kelas {profile.class}</p>
              </div>
              <div className="w-10 h-10 bg-indigo-100 rounded-full border-2 border-white shadow-sm flex items-center justify-center text-indigo-700 font-bold">
                {profile.name.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
