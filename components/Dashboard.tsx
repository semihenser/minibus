import React, { useState } from 'react';
import { Eye, Edit, FileInput, Trash2, Search } from 'lucide-react';
import { Line, ViewState } from '../types';

interface DashboardProps {
  lines: Line[];
  onNavigate: (view: ViewState, lineId?: string) => void;
  onDelete: (lineId: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ lines, onNavigate, onDelete }) => {
  const [searchName, setSearchName] = useState('');
  const [searchStatus, setSearchStatus] = useState('');
  const [searchSubRouteCount, setSearchSubRouteCount] = useState('');
  const [searchMinibusCount, setSearchMinibusCount] = useState('');

  const filteredLines = lines.filter(line => 
    line.name.toLowerCase().includes(searchName.toLowerCase()) &&
    (searchStatus === '' || line.status === searchStatus) &&
    line.subRoutes.length.toString().includes(searchSubRouteCount) &&
    line.minibusCount.toString().includes(searchMinibusCount)
  );

  return (
    <div className="w-full">
      {/* Top Action Bar */}
      <div className="flex justify-between mb-2">
        <div className="flex gap-2">
          <button 
            onClick={() => onNavigate(ViewState.NEW_LINE)}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded shadow-sm text-sm"
          >
            YENİ HAT EKLE
          </button>
          <button 
            onClick={() => onNavigate(ViewState.PLATE_OPERATIONS)}
            className="bg-lime-400 hover:bg-lime-500 text-slate-900 font-medium py-2 px-6 rounded shadow-sm text-sm"
          >
            PLAKA İŞLEMLERİ
          </button>
        </div>
        <button className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded shadow-sm text-sm">
          ÇIKIŞ
        </button>
      </div>

      {/* Table Container */}
      <div className="border border-gray-300 bg-white shadow-sm overflow-hidden rounded-sm">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-blue-100 text-slate-700">
            <tr>
              <th className="border p-2 w-64 text-center">İŞLEMLER</th>
              <th className="border p-2">HAT ADI</th>
              <th className="border p-2 w-32 text-center">ALT GÜZERGAH SAYISI</th>
              <th className="border p-2 w-32 text-center">HATTA ÇALIŞAN MİNİBÜS SAYISI</th>
              <th className="border p-2 w-32 text-center">DURUM</th>
            </tr>
            {/* Search Row */}
            <tr className="bg-blue-50">
              <th className="border p-1"></th>
              
              {/* Hat Adı Arama */}
              <th className="border p-1">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                    <Search size={14} className="text-gray-400" />
                  </div>
                  <input 
                    type="text" 
                    className="w-full border border-gray-300 p-1 pl-8 text-xs rounded focus:outline-none focus:border-blue-400"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                  />
                </div>
              </th>

              {/* Alt Güzergah Sayısı Arama */}
              <th className="border p-1 text-center">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                    <Search size={14} className="text-gray-400" />
                  </div>
                  <input 
                    type="text" 
                    className="w-full border border-gray-300 p-1 pl-8 text-xs rounded focus:outline-none focus:border-blue-400"
                    value={searchSubRouteCount}
                    onChange={(e) => setSearchSubRouteCount(e.target.value)}
                  />
                </div>
              </th>

              {/* Minibüs Sayısı Arama */}
              <th className="border p-1 text-center">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                    <Search size={14} className="text-gray-400" />
                  </div>
                  <input 
                    type="text" 
                    className="w-full border border-gray-300 p-1 pl-8 text-xs rounded focus:outline-none focus:border-blue-400"
                    value={searchMinibusCount}
                    onChange={(e) => setSearchMinibusCount(e.target.value)}
                  />
                </div>
              </th>

              {/* Durum Filtreleme */}
              <th className="border p-1">
                <select 
                   className="w-full border border-gray-300 p-1 text-xs rounded focus:outline-none focus:border-blue-400"
                   value={searchStatus}
                   onChange={(e) => setSearchStatus(e.target.value)}
                >
                  <option value="">HEPSİ</option>
                  <option value="AKTİF">AKTİF</option>
                  <option value="PASİF">PASİF</option>
                </select>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredLines.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">Kayıt bulunamadı.</td>
              </tr>
            ) : (
              filteredLines.map((line) => (
                <tr key={line.id} className="hover:bg-gray-50 border-b">
                  <td className="border p-2">
                    <div className="flex justify-center gap-1">
                      <button 
                        title="Görüntüle"
                        onClick={() => onNavigate(ViewState.VIEW_LINE, line.id)}
                        className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs flex items-center"
                      >
                         Görüntüle
                      </button>
                      <button 
                         title="Düzenle"
                         onClick={() => onNavigate(ViewState.EDIT_LINE, line.id)}
                         className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs flex items-center"
                      >
                         Düzenle
                      </button>
                      <button 
                         title="Revize Et"
                         onClick={() => onNavigate(ViewState.REVISE_LINE, line.id)}
                         className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs flex items-center"
                      >
                         Revize Et
                      </button>
                      <button 
                         title="Sil"
                         onClick={() => onDelete(line.id)}
                         className="bg-white border border-gray-300 hover:bg-red-50 text-red-600 px-2 py-1 rounded text-xs flex items-center"
                      >
                         Sil
                      </button>
                    </div>
                  </td>
                  <td className="border p-2 font-medium">{line.name}</td>
                  <td className="border p-2 text-center">{line.subRoutes.length}</td>
                  <td className="border p-2 text-center">{line.minibusCount}</td>
                  <td className="border p-2 text-center">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${line.status === 'AKTİF' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {line.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;