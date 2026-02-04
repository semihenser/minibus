export interface SubRoute {
  id: string;
  name: string;
  isActive: boolean;
  kmzFileName?: string;
}

export interface UkomeDecision {
  number: string;
  date: string;
  summary: string;
  type: 'NEW' | 'REVISE' | 'CANCEL' | 'CHANGE';
}

export interface LineHistory {
  date: string;
  decisionNumber: string;
  summary: string;
}

export interface Line {
  id: string;
  name: string;
  status: 'AKTİF' | 'PASİF';
  subRoutes: SubRoute[];
  minibusCount: number; // calculated or mocked
  minibusPlateCount: number; // calculated or mocked
  lastDecision: UkomeDecision;
  history: LineHistory[];
}

export interface PlateHistory {
  ukomeNumber: string;
  ukomeDate: string;
  lineName: string;
  action: 'ADD_TO_LINE' | 'CHANGE_LINE';
}

export interface Plate {
  plateNumber: string;
  currentLineId: string | null;
  history: PlateHistory[];
}

export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  NEW_LINE = 'NEW_LINE',
  EDIT_LINE = 'EDIT_LINE', // Correction (Düzenle)
  REVISE_LINE = 'REVISE_LINE', // New Decision (Revize Et)
  VIEW_LINE = 'VIEW_LINE', // Görüntüle
  PLATE_OPERATIONS = 'PLATE_OPERATIONS',
}
