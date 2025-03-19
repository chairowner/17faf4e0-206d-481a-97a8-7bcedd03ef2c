import { FC, useEffect, useState } from 'react';
import {
  deleteRowQuery,
  getListQuery,
  InputValues,
  ListItemCreateTemp,
  ListItemType,
  printList,
  titleItems,
} from '../../components/ListItem';
import s from './Main.module.scss';

const defaultNewRow: ListItemCreateTemp = {
  tempId: 0,
  payload: {
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
    parentId: null,
  },
};

const Main: FC = () => {
  const [list, setList] = useState<ListItemType[]>([]);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [createMode, setCreateMode] = useState<ListItemCreateTemp | null>(null);
  const [levelHovered, setLevelHovered] = useState<boolean>(false);
  const inputValues: InputValues = {
    level: useState<string>(''),
    rowName: useState<string>(''),
    salary: useState<string>(''),
    equipmentCosts: useState<string>(''),
    overheads: useState<string>(''),
    estimatedProfit: useState<string>(''),
  };

  const changeEditById = (
    list: ListItemType[],
    id: number,
    mode: boolean,
    values?: InputValues,
  ): ListItemType[] =>
    list.map((item) => {
      const newItem: ListItemType = {
        ...item,
        edit: item.id === id ? mode : false,
        child: changeEditById(item.child, id, mode, values),
      };
      if (item.id === id && values) {
        newItem.rowName = values.rowName[0];
        newItem.salary = Number(values.salary[0]);
        newItem.equipmentCosts = Number(values.equipmentCosts[0]);
        newItem.overheads = Number(values.overheads[0]);
        newItem.estimatedProfit = Number(values.estimatedProfit[0]);
      }
      return newItem;
    });

  const changeRowEditHandler = (id: number, mode: boolean, values?: InputValues) => {
    setList((list) => changeEditById(list, id, mode, values));
    setEditMode(mode);
  };

  const changeLevelHovered = (state: boolean): void => setLevelHovered(state);

  const addEditRowByParentId = (
    list: ListItemType[],
    parentId: number | null = null,
  ): ListItemType[] => {
    const tempId: number = new Date().getTime();
    const newRow: ListItemCreateTemp = { ...defaultNewRow, tempId };
    newRow.payload.parentId = parentId;
    const newList: ListItemType[] = list.map((item) => {
      if (item.id === parentId)
        return {
          ...item,
          child: [
            ...item.child,
            {
              id: tempId,
              rowName: newRow.payload.rowName,
              total: 0,
              salary: newRow.payload.salary,
              mimExploitation: newRow.payload.mimExploitation,
              machineOperatorSalary: newRow.payload.machineOperatorSalary,
              materials: newRow.payload.materials,
              mainCosts: newRow.payload.mainCosts,
              supportCosts: newRow.payload.supportCosts,
              equipmentCosts: newRow.payload.equipmentCosts,
              overheads: newRow.payload.overheads,
              estimatedProfit: newRow.payload.estimatedProfit,
              child: [],
            },
          ],
        };
      return {
        ...item,
        child: addEditRowByParentId(item.child, parentId),
      };
    });
    setCreateMode(newRow);
    inputValues.level[1]('0');
    inputValues.rowName[1](String(newRow.payload.rowName));
    inputValues.salary[1](String(newRow.payload.salary));
    inputValues.equipmentCosts[1](String(newRow.payload.equipmentCosts));
    inputValues.overheads[1](String(newRow.payload.overheads));
    inputValues.estimatedProfit[1](String(newRow.payload.estimatedProfit));
    return newList;
  };

  const addEditRowHandler = (parentId: number | null = null) => {
    setList((list) => addEditRowByParentId(list, parentId));
  };

  const removeRowById = (list: ListItemType[], id: number): ListItemType[] => {
    return list
      .filter((item) => item.id !== id)
      .map((item) => ({ ...item, child: removeRowById(item.child, id) }));
  };

  const deleteRowHandler = (id: number, query: boolean): void => {
    setList((list) => removeRowById(list, id));
    if (query) deleteRowQuery(id);
  };

  const updateList = (list: ListItemType[], changed: ListItemType[]): ListItemType[] =>
    list.map((item) => {
      const newItem: ListItemType = {
        ...item,
        child: updateList(item.child, changed),
      };
      changed.map((changedItem) => {
        if (changedItem.id !== item.id) return;
        newItem.rowName = changedItem.rowName;
        newItem.salary = changedItem.salary;
        newItem.equipmentCosts = changedItem.equipmentCosts;
        newItem.overheads = changedItem.overheads;
        newItem.estimatedProfit = changedItem.estimatedProfit;
      });
      return newItem;
    });

  const updateListData = (changed: ListItemType[]): void => {
    console.log('updateListData', changed);
    setList((list) => updateList(list, changed));
  };

  useEffect(() => {
    getListQuery().then((json: ListItemType[]) => setList(json));
  }, []);

  useEffect(() => {
    console.log({ createMode });
    if (!createMode) return;
    changeRowEditHandler(createMode.tempId, true, inputValues);
  }, [createMode]);

  return (
    <main className={s.main}>
      <table className={s.table}>
        <thead>
          <tr>
            {titleItems.map((titleItem) => (
              <th key={titleItem.key}>{titleItem.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {list?.length > 0 &&
            printList({
              updateListData,
              createMode,
              inputValues,
              editMode,
              addEditRowHandler,
              changeRowEditHandler,
              deleteRowHandler,
              levelHovered,
              changeLevelHovered,
              list,
            })}
        </tbody>
      </table>
    </main>
  );
};

export default Main;
