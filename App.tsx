import React, { useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import LineForm from './components/LineForm';
import LineView from './components/LineView';
import PlateOperations from './components/PlateOperations';
import { Line, Plate, ViewState, SubRoute } from './types';

// Mock Initial Data
const INITIAL_LINES: Line[] = [
  {
    id: '1',
    name: 'KARŞIYAKA - EVKA 5',
    status: 'AKTİF',
    subRoutes: [
        { id: '101', name: 'Karşıyaka - EVKA 6 (Cumhuriyet Mah Yolu İle)', isActive: true },
        { id: '102', name: 'Karşıyaka - EVKA 6 (EVKA 2 Yolu İle)', isActive: true },
        { id: '103', name: 'Karşıyaka - Balatçık - Katip Çelebi', isActive: true },
    ],
    minibusCount: 28,
    minibusPlateCount: 28,
    lastDecision: { number: '2026/670', date: '2026-01-15', summary: 'ALT GÜZERGAH REVİZE EDİLDİ', type: 'REVISE' },
    history: [
        { date: '2020-10-10', decisionNumber: '2020/123', summary: 'HAT REVİZE EDİLDİ' },
        { date: '2022-05-04', decisionNumber: '2022/444', summary: 'HAT REVİZE EDİLDİ' }
    ]
  },
  {
    id: '2',
    name: 'KARŞIYAKA - ŞEMİKLER - MAVİŞEHİR',
    status: 'AKTİF',
    subRoutes: [],
    minibusCount: 23,
    minibusPlateCount: 23,
    lastDecision: { number: '2023/100', date: '2023-01-01', summary: 'Hat Açılışı', type: 'NEW' },
    history: []
  },
   {
    id: '3',
    name: 'KARŞIYAKA - ÖRNEKKÖY',
    status: 'AKTİF',
    subRoutes: [
        { id: '301', name: 'Normal Güzergah', isActive: true },
        { id: '302', name: 'Pazar Yeri Güzergahı', isActive: true }
    ],
    minibusCount: 7,
    minibusPlateCount: 7,
    lastDecision: { number: '2023/102', date: '2023-01-05', summary: 'Hat Açılışı', type: 'NEW' },
    history: []
  }
];

const INITIAL_PLATES: Plate[] = [
    {
        plateNumber: '35 M 1234',
        currentLineId: '1',
        history: [
             { ukomeNumber: '2020/125', ukomeDate: '2020-10-10', lineName: 'XX HATTI', action: 'ADD_TO_LINE' }
        ]
    }
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.DASHBOARD);
  const [selectedLineId, setSelectedLineId] = useState<string | undefined>(undefined);
  
  const [lines, setLines] = useState<Line[]>(INITIAL_LINES);
  const [plates, setPlates] = useState<Plate[]>(INITIAL_PLATES);

  const handleNavigate = (view: ViewState, lineId?: string) => {
    setSelectedLineId(lineId);
    setCurrentView(view);
  };

  const handleDeleteLine = (lineId: string) => {
    if (confirm('Bu hattı silmek istediğinize emin misiniz?')) {
        setLines(lines.filter(l => l.id !== lineId));
    }
  };

  const handleSaveLine = (newLine: Line) => {
    // If it's a new line
    if (currentView === ViewState.NEW_LINE) {
        setLines([...lines, newLine]);
    } 
    // If Editing existing line
    else if (currentView === ViewState.EDIT_LINE) {
        setLines(lines.map(l => l.id === newLine.id ? newLine : l));
    } 
    // If Revising (Archive old state to history, update current)
    else if (currentView === ViewState.REVISE_LINE) {
        setLines(lines.map(l => {
            if (l.id === newLine.id) {
                const oldHistoryItem = {
                    date: l.lastDecision.date,
                    decisionNumber: l.lastDecision.number,
                    summary: l.lastDecision.summary
                };
                return {
                    ...newLine,
                    history: [...l.history, oldHistoryItem]
                };
            }
            return l;
        }));
    }
    setCurrentView(ViewState.DASHBOARD);
  };

  const handleUpdatePlate = (plateNumber: string, action: 'ADD' | 'CHANGE', ukomeNo: string, ukomeDate: string, newLineId: string) => {
    const existingPlateIndex = plates.findIndex(p => p.plateNumber === plateNumber);
    const newLine = lines.find(l => l.id === newLineId);
    if (!newLine) return;

    const newHistory: any = {
        ukomeNumber: ukomeNo,
        ukomeDate: ukomeDate,
        lineName: newLine.name,
        action: action === 'ADD' ? 'ADD_TO_LINE' : 'CHANGE_LINE'
    };

    if (existingPlateIndex >= 0) {
        // Update existing
        const updatedPlates = [...plates];
        updatedPlates[existingPlateIndex] = {
            ...updatedPlates[existingPlateIndex],
            currentLineId: newLineId,
            history: [...updatedPlates[existingPlateIndex].history, newHistory]
        };
        setPlates(updatedPlates);
    } else {
        // Create new
        const newPlate: Plate = {
            plateNumber: plateNumber,
            currentLineId: newLineId,
            history: [newHistory]
        };
        setPlates([...plates, newPlate]);
    }
  };

  // Render Logic
  let content;
  const selectedLine = lines.find(l => l.id === selectedLineId);

  switch (currentView) {
    case ViewState.NEW_LINE:
        content = <LineForm mode="NEW" onSave={handleSaveLine} onCancel={() => setCurrentView(ViewState.DASHBOARD)} />;
        break;
    case ViewState.EDIT_LINE:
        content = selectedLine ? <LineForm mode="EDIT" initialData={selectedLine} onSave={handleSaveLine} onCancel={() => setCurrentView(ViewState.DASHBOARD)} /> : null;
        break;
    case ViewState.REVISE_LINE:
        content = selectedLine ? <LineForm mode="REVISE" initialData={selectedLine} onSave={handleSaveLine} onCancel={() => setCurrentView(ViewState.DASHBOARD)} /> : null;
        break;
    case ViewState.VIEW_LINE:
        content = selectedLine ? <LineView line={selectedLine} onClose={() => setCurrentView(ViewState.DASHBOARD)} /> : null;
        break;
    case ViewState.PLATE_OPERATIONS:
        content = <PlateOperations plates={plates} lines={lines} onUpdatePlate={handleUpdatePlate} onClose={() => setCurrentView(ViewState.DASHBOARD)} />;
        break;
    case ViewState.DASHBOARD:
    default:
        content = <Dashboard lines={lines} onNavigate={handleNavigate} onDelete={handleDeleteLine} />;
        break;
  }

  return (
    <div className="min-h-screen pb-10">
      <Header />
      <main className="container mx-auto px-4">
        {content}
      </main>
    </div>
  );
};

export default App;