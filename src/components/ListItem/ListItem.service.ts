import { ListItemCreateType, ListItemType } from './';
import { ListItemUpdateType } from './ListItem.types';

export const getListQuery = async (): Promise<ListItemType[]> =>
  await fetch('/api/list').then((res) => res.json());

export const createRowQuery = async (
  data: ListItemCreateType = {
    parentId: null,
    rowName: '',
    salary: 0,
    mimExploitation: 0,
    machineOperatorSalary: 0,
    materials: 0,
    mainCosts: 0,
    supportCosts: 0,
    equipmentCosts: 0,
    overheads: 0,
    estimatedProfit: 0,
  },
): Promise<any> =>
  await fetch(`/api/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((json) => json);

export const updateRowQuery = async (
  id: number,
  data: ListItemUpdateType = {
    rowName: '',
    salary: 0,
    mimExploitation: 0,
    machineOperatorSalary: 0,
    materials: 0,
    mainCosts: 0,
    supportCosts: 0,
    equipmentCosts: 0,
    overheads: 0,
    estimatedProfit: 0,
  },
): Promise<any> =>
  await fetch(`/api/${id}/update`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((json) => json);

export const deleteRowQuery = async (id: number): Promise<any> =>
  await fetch(`/api/${id}/delete`, { method: 'DELETE' })
    .then((res) => res.json())
    .then((json) => json);
