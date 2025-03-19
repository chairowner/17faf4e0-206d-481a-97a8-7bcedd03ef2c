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

export type ListItemCreateType = Omit<ListItemType, 'id' | 'total' | 'child' | 'edit'> & {
  parentId: number | null;
  send?: boolean;
};
export type ListItemCreateTemp = {
  tempId: number;
  payload: ListItemCreateType;
};

export type ListItemUpdateType = Omit<ListItemCreateType, 'parentId'>;

export type InputValues = {
  level: [string, React.Dispatch<React.SetStateAction<string>>];
  rowName: [string, React.Dispatch<React.SetStateAction<string>>];
  salary: [string, React.Dispatch<React.SetStateAction<string>>];
  equipmentCosts: [string, React.Dispatch<React.SetStateAction<string>>];
  overheads: [string, React.Dispatch<React.SetStateAction<string>>];
  estimatedProfit: [string, React.Dispatch<React.SetStateAction<string>>];
};

type ListItemPropsMain = {
  updateListData(changed: ListItemType[]): void;
  inputValues: InputValues;
  createMode: ListItemCreateTemp | null;
  editMode: boolean;
  addEditRowHandler(parentId: number | null): void;
  changeRowEditHandler(id: number, mode: boolean, values?: InputValues): void;
  levelHovered: boolean;
  deleteRowHandler(id: number, query: boolean): void;
  changeLevelHovered(state: boolean): void;
  level?: number;
};

export type IListItemProps = ListItemPropsMain & {
  levelRowIndex: number;
  item: ListItemType;
};

export type PrintListProps = ListItemPropsMain & {
  list: ListItemType[];
};
