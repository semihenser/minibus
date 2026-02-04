import React, { useState, useEffect } from 'react';
import { Line, SubRoute, ViewState } from '../types';
import { Plus, Trash2, Upload } from 'lucide-react';

interface LineFormProps {
  mode: 'NEW' | 'EDIT' | 'REVISE';
  initialData?: Line;
  onSave: (line: Line) => void;
  onCancel: () => void;
}

const LineForm: React.FC<LineFormProps> = ({ mode, initialData, onSave, onCancel }) => {
  const [name, setName] = useState('');
  const [subRoutes, setSubRoutes] = useState<SubRoute[]>([]);
  
  // UKOME Decision Data
  const [ukomeNumber, setUkomeNumber] = useState('');
  const [ukomeDate, setUkomeDate] = useState('');
  const [ukomeSummary, setUkomeSummary] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setSubRoutes(initialData.subRoutes);
      // If Editing, we can show previous decision info, if Revising, user enters new decision
      if (mode === 'EDIT') {
        setUkomeNumber(initialData.lastDecision.number);
        setUkomeDate(initialData.lastDecision.date);
        setUkomeSummary(initialData.lastDecision.summary);
      }
    } else {
      // Default empty subroute
      setSubRoutes([{ id: Date.now().toString(), name: '', isActive: true }]);
    }
  }, [initialData, mode]);

  const addSubRoute = () => {
    setSubRoutes([...subRoutes, { id: Date.now().toString(), name: '', isActive: true }]);
  };

  const removeSubRoute = (id: string) => {
    setSubRoutes(subRoutes.filter(sr => sr.id !== id));
  };

  const updateSubRoute = (id: string, field: keyof SubRoute, value: any) => {
    setSubRoutes(subRoutes.map(sr => sr.id === id ? { ...sr, [field]: value } : sr));
  };

  const handleSave = () => {
    if (!name || !ukomeNumber) {
        alert("Lütfen zorunlu alanları doldurunuz.");
        return;
    }

    const newLine: Line = {
      id: initialData ? initialData.id : Date.now().toString(),
      name,
      status: 'AKTİF',
      subRoutes,
      minibusCount: initialData ? initialData.minibusCount : 0,
      minibusPlateCount: initialData ? initialData.minibusPlateCount : 0,
      lastDecision: {
        number: ukomeNumber,
        date: ukomeDate,
        summary: ukomeSummary,
        type: mode === 'REVISE' ? 'REVISE' : 'NEW'
      },
      history: initialData ? initialData.history : []
    };

    onSave(newLine);
  };

  const title = mode === 'NEW' ? 'YENİ HAT EKLE' : mode === 'REVISE' ? 'YENİ HAT EKLE (REVİZE)' : 'HAT DÜZENLE';

  return (
    <div className="w-full max-w-4xl mx-auto bg-white border border-gray-300 shadow-md">
      <div className="bg-white border-b border-gray-200 p-4">
        <h2 className="text-center text-lg font-bold underline">{title}</h2>
      </div>

      <div className="p-6">
        <table className="w-full border-collapse border border-gray-300">
          <tbody>
            {/* Line Name */}
            <tr>
              <td className="border border-gray-300 p-3 bg-gray-50 font-bold w-1/4">HAT ADI</td>
              <td className="border border-gray-300 p-3 w-3/4" colSpan={3}>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                  placeholder="Manuel Giriş Yapılacak"
                />
              </td>
            </tr>

            {/* Sub Routes Header */}
            <tr>
                <td className="border border-gray-300 p-3 bg-gray-50 font-bold align-top pt-6" rowSpan={subRoutes.length + 2}>
                    HATTIN ALT GÜZERGAHLARI
                    <div className="text-xs font-normal mt-2 text-gray-500">
                        * (Varsa eklenecek, her hatta alt güzergah yok)
                    </div>
                    <button onClick={addSubRoute} className="mt-4 text-xs bg-blue-50 text-blue-600 border border-blue-200 px-2 py-1 rounded flex items-center gap-1 mx-auto">
                        <Plus size={14}/> Ekle
                    </button>
                </td>
            </tr>

            {/* Sub Routes Rows */}
            {subRoutes.map((route, index) => (
                <tr key={route.id}>
                    <td className="border border-gray-300 p-2">
                         <input 
                            type="text" 
                            value={route.name}
                            onChange={(e) => updateSubRoute(route.id, 'name', e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded"
                            placeholder="Güzergah Adı"
                        />
                    </td>
                    <td className="border border-gray-300 p-2 w-32 text-center">
                        <select 
                            value={route.isActive ? 'true' : 'false'}
                            onChange={(e) => updateSubRoute(route.id, 'isActive', e.target.value === 'true')}
                            className="border border-gray-300 p-1 rounded text-sm w-full"
                        >
                            <option value="true">Aktif</option>
                            <option value="false">Pasif</option>
                        </select>
                    </td>
                    <td className="border border-gray-300 p-2 w-32 text-center relative">
                        <label className="cursor-pointer text-blue-600 hover:underline text-sm flex items-center justify-center gap-1">
                            <input type="file" className="hidden" />
                            <Upload size={14} /> Kmz Ekle
                        </label>
                        {/* Delete Button for row */}
                        {subRoutes.length > 1 && (
                             <button onClick={() => removeSubRoute(route.id)} className="absolute right-0 top-0 mt-3 mr-1 text-red-500 hover:text-red-700">
                                <Trash2 size={14} />
                             </button>
                        )}
                    </td>
                </tr>
            ))}
            {/* Empty row filler if needed for visuals, but dynamic is better */}
            
            {/* UKOME Section */}
            <tr>
                <td className="border border-gray-300 p-3 bg-gray-50 font-bold">UKOME KARAR NO</td>
                <td className="border border-gray-300 p-3" colSpan={3}>
                     <input 
                        type="text" 
                        value={ukomeNumber}
                        onChange={(e) => setUkomeNumber(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded"
                        placeholder="MANUEL GİRİŞ"
                    />
                </td>
            </tr>
            <tr>
                <td className="border border-gray-300 p-3 bg-gray-50 font-bold">UKOME KARAR TARİHİ</td>
                <td className="border border-gray-300 p-3" colSpan={3}>
                     <input 
                        type="date" 
                        value={ukomeDate}
                        onChange={(e) => setUkomeDate(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                </td>
            </tr>
             <tr>
                <td className="border border-gray-300 p-3 bg-gray-50 font-bold">UKOME KARAR ÖZETİ</td>
                <td className="border border-gray-300 p-3" colSpan={3}>
                     <textarea 
                        value={ukomeSummary}
                        onChange={(e) => setUkomeSummary(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded"
                        rows={3}
                        placeholder="MANUEL GİRİŞ"
                    />
                </td>
            </tr>
          </tbody>
        </table>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-6">
            <button 
                onClick={handleSave}
                className="bg-blue-300 hover:bg-blue-400 text-slate-800 font-bold py-2 px-12 rounded border border-blue-400"
            >
                KAYDET
            </button>
            <button 
                onClick={onCancel}
                className="bg-gray-200 hover:bg-gray-300 text-slate-800 font-bold py-2 px-12 rounded border border-gray-400"
            >
                İPTAL
            </button>
        </div>
      </div>
    </div>
  );
};

export default LineForm;