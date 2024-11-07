import React from 'react';
import { 
  Home, 
  UserPlus, 
  Users, 
  Stethoscope, 
  ClipboardList, 
  LogOut,
  Settings,
  UserMinus,
  Layout,
  UserCog,
  Calendar,
  Layers,
  Activity
} from 'lucide-react';
import { useUserStore } from '../stores/useUserStore';

type Page = 'dashboard' | 'admission' | 'patient' | 'consultation' | 'reports' | 'settings' | 'discharge' | 'specialties' | 'employees' | 'appointments';

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate, onLogout }) => {
  const { currentUser } = useUserStore();

  const menuGroups = [
    {
      title: 'Overview',
      items: [
        { icon: Home, label: 'Dashboard', id: 'dashboard' },
        { icon: Layout, label: 'Specialties', id: 'specialties' }
      ]
    },
    {
      title: 'Patient Management',
      items: [
        { icon: UserPlus, label: 'New Admission', id: 'admission' },
        { icon: Users, label: 'Patient Profile', id: 'patient' },
        { icon: UserMinus, label: 'Discharge', id: 'discharge' }
      ]
    },
    {
      title: 'Clinical Services',
      items: [
        { icon: Stethoscope, label: 'Consultations', id: 'consultation' },
        { icon: Calendar, label: 'Appointments', id: 'appointments' }
      ]
    },
    {
      title: 'Administration',
      items: [
        { icon: ClipboardList, label: 'Reports', id: 'reports' },
        ...(currentUser?.medical_code === 'M1019' ? [{ icon: UserCog, label: 'Employee Management', id: 'employees' }] : [])
      ]
    }
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col min-h-screen">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-50 rounded-lg">
            <Activity className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <span className="text-xl font-bold text-gray-900">IMD-Care</span>
            <p className="text-sm text-gray-500">Medical Department</p>
          </div>
        </div>
        {currentUser && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
            <p className="text-xs text-gray-600">{currentUser.medical_code}</p>
            <p className="text-xs text-gray-600 capitalize">{currentUser.role}</p>
          </div>
        )}
      </div>

      <nav className="flex-1 px-4 py-4 space-y-6 overflow-y-auto">
        {menuGroups.map((group) => (
          <div key={group.title}>
            <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              {group.title}
            </h3>
            <div className="space-y-1">
              {group.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id as Page)}
                  className={`flex items-center space-x-3 w-full px-4 py-2.5 text-sm rounded-lg transition-colors ${
                    currentPage === item.id
                      ? 'bg-indigo-50 text-indigo-600 font-medium'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon className={`h-5 w-5 ${
                    currentPage === item.id ? 'text-indigo-600' : 'text-gray-400'
                  }`} />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button 
          onClick={onLogout}
          className="flex items-center space-x-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>Sign out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;