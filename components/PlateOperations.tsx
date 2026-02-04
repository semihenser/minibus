import React, { useState } from 'react';
import { Plate, Line, PlateHistory } from '../types';

interface PlateOperationsProps {
  plates: Plate[];
  lines: Line[];
  onUpdatePlate: (plateNumber: string, action: 'ADD' | 'CHANGE', ukomeNo: string, ukomeDate: string, newLineId: string) => void;
  onClose: () => void;
}

const PlateOperations: React.FC<PlateOperationsProps> = ({ plates, lines, onUpdatePlate, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlate, setSelectedPlate] = useState<Plate | null>(null);
  const [viewMode, setViewMode] = useState<'SEARCH' | 'DETAIL' | 'ACTION'>('SEARCH');
  const [actionType, setActionType] = useState<'ADD' | 'CHANGE'>('ADD');
  
  // Action Form States
  const [ukomeNo, setUkomeNo] = useState('');
  const [ukomeDate, setUkomeDate] = useState('');
  const [selectedLineId, setSelectedLineId] = useState('');

  const handleSearch = () => {
    // In a real app, this would be an API call. Here we find in prop or create a mock.
    let plate = plates.find(p => p.plateNumber === searchQuery);
    
    // If plate doesn't exist in our mock DB, just create a visual placeholder
    if (!plate) {
      plate = {
        plateNumber: searchQuery,
        currentLineId: null,
        history: []
      };
    }
    setSelectedPlate(plate);
    setViewMode('DETAIL');
  };

  const getLineName = (id: string | null) => {
    if (!id) return null;
    return lines.find(l => l.id === id)?.name || "Bilinmeyen Hat";
  };

  const openAction = (type: 'ADD' | 'CHANGE') => {
    setActionType(type);
    setUkomeNo('');
    setUkomeDate('');
    setSelectedLineId('');
    setViewMode('ACTION');
  };

  const submitAction = () => {
    if (selectedPlate && selectedLineId && ukomeNo) {
        onUpdatePlate(selectedPlate.plateNumber, actionType, ukomeNo, ukomeDate, selectedLineId);
        // Refresh local state logic slightly tricky without full re-fetch, but for demo:
        // We'll just return to search or update local 'selectedPlate' blindly
        const updatedPlate = { ...selectedPlate };
        updatedPlate.currentLineId = selectedLineId;
        updatedPlate.history.push({
            ukomeNumber: ukomeNo,
            ukomeDate: ukomeDate,
            lineName: getLineName(selectedLineId) || '',
            action: actionType === 'ADD' ? 'ADD_TO_LINE' : 'CHANGE_LINE'
        });
        setSelectedPlate(updatedPlate);
        setViewMode('DETAIL');
    }
  };

  if (viewMode === 'SEARCH') {
    return (
      <div className="w-full max-w-2xl mx-auto bg-white border border-gray-300 shadow-md p-6">
        <h2 className="text-center font-bold text-lg mb-6 border-b pb-2">MİNİBÜS PLAKASI SORGULA</h2>
        <div className="flex flex-col gap-4">
          <div className="flex items-center">
            <label className="w-1/3 font-bold text-right pr-4">PLAKA</label>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value.toUpperCase())}
              className="w-2/3 border border-gray-300 p-2 rounded"
              placeholder="35 M 1234"
            />
          </div>
          <div className="text-xs text-gray-500 text-center mb-4">
            SİSTEMDEKİ MİNİBÜS PLAKALARI AÇILIR LİSTEDE GÖSTERİLECEK VE PLAKA SEÇİLECEK
          </div>
          <div className="flex justify-center gap-4">
            <button 
                onClick={handleSearch}
                disabled={!searchQuery}
                className="bg-blue-300 hover:bg-blue-400 px-8 py-2 rounded font-bold border border-blue-400"
            >
                SORGULA
            </button>
            <button onClick={onClose} className="bg-gray-200 px-8 py-2 rounded font-bold border border-gray-400">
                GERİ
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (viewMode === 'DETAIL' && selectedPlate) {
    const currentLineName = getLineName(selectedPlate.currentLineId);

    return (
      <div className="w-full max-w-3xl mx-auto space-y-6">
        <div className="bg-white border border-gray-300 shadow-md">
            <h2 className="text-center font-bold text-lg p-2 border-b bg-gray-50 underline">MİNİBÜS PLAKA ÖZETİ</h2>
            <div className="p-4">
                <table className="w-full border-collapse border border-gray-300 mb-6">
                    <tbody>
                        <tr>
                            <td className="border p-3 font-bold w-1/3">MİNİBÜS PLAKASI</td>
                            <td className="border p-3 font-bold text-lg">{selectedPlate.plateNumber}</td>
                        </tr>
                        <tr>
                            <td className="border p-3 font-bold">MEVCUT HATTI</td>
                            <td className="border p-3">
                                {currentLineName || <span className="text-gray-400 italic">BOŞ (Hatta kayıtlı değil)</span>}
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* History */}
                <h3 className="text-center font-bold underline mb-2">PLAKA HAT GEÇMİŞİ</h3>
                <table className="w-full border-collapse border border-gray-300 text-sm">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">UKOME KARAR NO</th>
                            <th className="border p-2">UKOME KARAR TARİHİ</th>
                            <th className="border p-2">KARAR ÖZETİ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedPlate.history.length === 0 ? (
                            <tr><td colSpan={3} className="p-2 text-center text-gray-500">Geçmiş kaydı yok</td></tr>
                        ) : (
                            selectedPlate.history.map((h, i) => (
                                <tr key={i}>
                                    <td className="border p-2 text-center">{h.ukomeNumber}</td>
                                    <td className="border p-2 text-center">{h.ukomeDate}</td>
                                    <td className="border p-2">{h.action === 'ADD_TO_LINE' ? `${h.lineName} HATTINA EKLENDİ` : `${h.lineName} HATTINA GEÇTİ`}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Action Buttons Footer */}
            <div className="flex border-t border-gray-300">
                <button 
                    onClick={() => openAction('ADD')}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 border-r border-gray-300"
                >
                    HATTA EKLE
                </button>
                <button 
                    onClick={() => openAction('CHANGE')}
                    disabled={!selectedPlate.currentLineId}
                    className={`flex-1 font-bold py-3 ${!selectedPlate.currentLineId ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white'}`}
                >
                    HATTINI DEĞİŞTİR
                </button>
            </div>
        </div>
        <div className="text-center">
            <button onClick={() => setViewMode('SEARCH')} className="text-blue-600 hover:underline">Yeni Sorgu Yap</button>
        </div>
      </div>
    );
  }

  // Action Form (Page 8)
  return (
    <div className="w-full max-w-2xl mx-auto bg-white border border-gray-300 shadow-md">
        <h2 className="text-center font-bold text-lg p-3 border-b underline">
            {actionType === 'ADD' ? 'HATTA EKLE' : 'HATTINI DEĞİŞTİR'}
        </h2>
        <div className="p-6">
            <table className="w-full border-collapse border border-gray-300">
                <tbody>
                     {actionType === 'CHANGE' && (
                         <tr>
                            <td className="border p-3 font-bold bg-gray-50">MEVCUT HATTI</td>
                            <td className="border p-3">{getLineName(selectedPlate?.currentLineId || null)}</td>
                         </tr>
                     )}
                     <tr>
                        <td className="border p-3 font-bold bg-gray-50 w-1/3">UKOME KARAR NO</td>
                        <td className="border p-3">
                            <input type="text" value={ukomeNo} onChange={e => setUkomeNo(e.target.value)} className="w-full border p-2 rounded" placeholder="MANUEL GİRİŞ" />
                        </td>
                     </tr>
                     <tr>
                        <td className="border p-3 font-bold bg-gray-50">UKOME KARAR TARİHİ</td>
                        <td className="border p-3">
                            <input type="date" value={ukomeDate} onChange={e => setUkomeDate(e.target.value)} className="w-full border p-2 rounded" />
                        </td>
                     </tr>
                     <tr>
                        <td className="border p-3 font-bold bg-gray-50">YENİ HATTI</td>
                        <td className="border p-3">
                            <select value={selectedLineId} onChange={e => setSelectedLineId(e.target.value)} className="w-full border p-2 rounded">
                                <option value="">Hat Seçiniz...</option>
                                {lines.map(line => (
                                    <option key={line.id} value={line.id}>{line.name}</option>
                                ))}
                            </select>
                            <div className="text-xs text-gray-500 mt-1">UKOME KARARINDAKİ YENİ HATTIN KAYDINA GEÇECEK</div>
                        </td>
                     </tr>
                </tbody>
            </table>

            <div className="flex justify-center gap-4 mt-6">
                <button 
                    onClick={submitAction}
                    className="bg-blue-300 hover:bg-blue-400 px-8 py-2 rounded font-bold border border-blue-400"
                >
                    KAYDET
                </button>
                <button 
                    onClick={() => setViewMode('DETAIL')}
                    className="bg-gray-200 px-8 py-2 rounded font-bold border border-gray-400"
                >
                    İPTAL
                </button>
            </div>
        </div>
    </div>
  );
};

export default PlateOperations;