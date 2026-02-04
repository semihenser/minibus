import React from 'react';
import { Line } from '../types';

interface LineViewProps {
  line: Line;
  onClose: () => void;
}

const LineView: React.FC<LineViewProps> = ({ line, onClose }) => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      
      {/* Current State Table */}
      <div className="bg-white border border-gray-300 shadow-md">
        <div className="bg-white p-4 border-b">
           <h2 className="text-center text-lg font-bold underline mb-1">GÖRÜNTÜLE</h2>
           <p className="text-center text-xs font-bold text-gray-500">(HÜCRELERDE; EN GÜNCEL BİLGİLER GÖZÜKÜR)</p>
        </div>
        <div className="p-4">
            <table className="w-full border-collapse border border-gray-400 text-sm">
                <tbody>
                    <tr>
                        <td className="border border-gray-400 p-3 font-bold w-1/3 text-center">HAT ADI</td>
                        <td className="border border-gray-400 p-3 text-center" colSpan={3}>{line.name}</td>
                    </tr>
                    
                    {/* Sub Routes */}
                    {line.subRoutes.map((route, idx) => (
                        <tr key={route.id}>
                            {idx === 0 && (
                                <td className="border border-gray-400 p-3 font-bold text-center align-middle" rowSpan={line.subRoutes.length}>
                                    HATTIN ALT GÜZERGAHLARI
                                </td>
                            )}
                            <td className="border border-gray-400 p-3">{route.name}</td>
                            <td className="border border-gray-400 p-3 w-32 text-center">{route.isActive ? 'Aktif' : 'Pasif'}</td>
                            <td className="border border-gray-400 p-3 w-20 text-center">KMZ</td>
                        </tr>
                    ))}
                     {line.subRoutes.length === 0 && (
                        <tr>
                             <td className="border border-gray-400 p-3 font-bold text-center">HATTIN ALT GÜZERGAHLARI</td>
                             <td className="border border-gray-400 p-3 text-center text-gray-500" colSpan={3}>Tanımlı alt güzergah yok</td>
                        </tr>
                    )}

                    <tr>
                        <td className="border border-gray-400 p-3 font-bold text-center">HATTA ÇALIŞAN MİNİBÜS SAYISI</td>
                        <td className="border border-gray-400 p-3 text-center" colSpan={3}>{line.minibusCount} (OTOMATİK ÇEKECEK)</td>
                    </tr>
                    <tr>
                        <td className="border border-gray-400 p-3 font-bold text-center">HATTA ÇALIŞAN MİNİBÜS PLAKALARI</td>
                        <td className="border border-gray-400 p-3 text-center" colSpan={3}>{line.minibusPlateCount} (OTOMATİK ÇEKECEK)</td>
                    </tr>
                </tbody>
            </table>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-white border border-gray-300 shadow-md">
        <div className="p-2 border-b bg-gray-50">
           <h3 className="text-center font-bold">HAT GEÇMİŞİ</h3>
        </div>
        <table className="w-full border-collapse text-sm">
            <thead>
                <tr className="bg-gray-100">
                    <th className="border border-gray-400 p-2 w-32">UKOME KARAR NO</th>
                    <th className="border border-gray-400 p-2 w-32">UKOME KARAR TARİHİ</th>
                    <th className="border border-gray-400 p-2">KARAR ÖZETİ</th>
                </tr>
            </thead>
            <tbody>
                {/* Current Decision */}
                <tr>
                    <td className="border border-gray-400 p-2 text-center">{line.lastDecision.number}</td>
                    <td className="border border-gray-400 p-2 text-center">{line.lastDecision.date}</td>
                    <td className="border border-gray-400 p-2">{line.lastDecision.summary}</td>
                </tr>
                {/* Historical Decisions */}
                {line.history.map((hist, index) => (
                    <tr key={index}>
                        <td className="border border-gray-400 p-2 text-center">{hist.decisionNumber}</td>
                        <td className="border border-gray-400 p-2 text-center">{hist.date}</td>
                        <td className="border border-gray-400 p-2">{hist.summary}</td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>

      <div className="flex justify-center pb-8">
        <button 
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-12 rounded"
        >
            GERİ DÖN
        </button>
      </div>

    </div>
  );
};

export default LineView;