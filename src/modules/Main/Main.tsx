import { FC, useEffect, useState } from 'react';
import {
  deleteRowQuery,
  getListQuery,
  InputValues,
  ListItemType,
  printList,
  titleItems,
} from '../../components/ListItem';
import s from './Main.module.scss';

const Main: FC = () => {
  const [levelHovered, setLevelHovered] = useState<boolean>(false);
  const [list, setList] = useState<ListItemType[]>([]);

  const changeEditById = (
    list: ListItemType[],
    id: number,
    values?: InputValues,
  ): ListItemType[] => {
    return list.map((item) => {
      const newItem: ListItemType = {
        ...item,
        edit: item.id === id ? !item.edit : false,
        child: changeEditById(item.child, id, values),
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
  };

  const changeRowEditHandler = (id: number, values: InputValues) => {
    setList((list) => changeEditById(list, id, values));
  };

  const changeLevelHovered = (state: boolean): void => setLevelHovered(state);

  const removeRowById = (list: ListItemType[], id: number): ListItemType[] => {
    return list
      .filter((item) => item.id !== id)
      .map((item) => ({ ...item, child: removeRowById(item.child, id) }));
  };

  const deleteRowHandler = (id: number): void => {
    setList((list) => removeRowById(list, id));
    deleteRowQuery(id);
  };

  useEffect(() => {
    getListQuery().then((json) => setList(json));
  }, []);

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
