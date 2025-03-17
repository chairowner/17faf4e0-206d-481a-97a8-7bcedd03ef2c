export type Title =
  | 'level'
  | 'rowName'
  | 'salary'
  | 'equipmentCosts'
  | 'overheads'
  | 'estimatedProfit';
export type TitleItem = { key: Title; title: string };

export type ListItemType = {
  id: number;
  rowName: string;
  total: number;
  salary: number;
  mimExploitation: number;
  machineOperatorSalary: number;
  materials: number;
  mainCosts: number;
  supportCosts: number;
  equipmentCosts: number;
  overheads: number;
  estimatedProfit: number;
  child: ListItemType[];
  edit?: boolean;
};

export type ListItemCreateType = Omit<ListItemType, 'id' | 'total' | 'child'> & {
  parentId: number | null;
};

export type InputValues = {
  level: [string, React.Dispatch<React.SetStateAction<string>>];
  rowName: [string, React.Dispatch<React.SetStateAction<string>>];
  salary: [string, React.Dispatch<React.SetStateAction<string>>];
  equipmentCosts: [string, React.Dispatch<React.SetStateAction<string>>];
  overheads: [string, React.Dispatch<React.SetStateAction<string>>];
  estimatedProfit: [string, React.Dispatch<React.SetStateAction<string>>];
};
