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
};

export type ListItemCreateType = Omit<ListItemType, 'id' | 'total' | 'child'> & {
  parentId: number | null;
};
