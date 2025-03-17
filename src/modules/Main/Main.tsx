import { FC, useEffect, useState } from 'react';
import {
  deleteRowQuery,
  getListQuery,
  ListItemCreateType,
  ListItemType,
  printList,
  Title,
  titleItems,
} from '../../components/ListItem';
import s from './Main.module.scss';

const Main: FC = () => {
  const [levelHovered, setLevelHovered] = useState<boolean>(false);
  const [list, setList] = useState<ListItemType[]>([]);
  const [createRow, setCreateRow] = useState<ListItemCreateType | null>(null);

  const changeEditById = (
    list: ListItemType[],
    id: number,
    text?: string,
    titleItemKey?: string,
  ): ListItemType[] => {
    return list.map((item) => {
      const newItem: ListItemType = {
        ...item,
        edit: item.id === id ? !item.edit : false,
        child: changeEditById(item.child, id),
      };
      if (item.id === id && text && titleItemKey) {
        if (titleItemKey === 'rowName') newItem[titleItemKey] = text;
        if (titleItemKey === 'salary') newItem[titleItemKey] = Number(text);
        if (titleItemKey === 'equipmentCosts') newItem[titleItemKey] = Number(text);
        if (titleItemKey === 'overheads') newItem[titleItemKey] = Number(text);
        if (titleItemKey === 'estimatedProfit') newItem[titleItemKey] = Number(text);
      }
      return newItem;
    });
  };

  const changeRowEditHandler = (id: number, text?: string, titleItemKey?: keyof ListItemType) => {
    setList((list) => changeEditById(list, id, text, titleItemKey));
  };

  const changeLevelHovered = (state: boolean): void => setLevelHovered(state);

  /* создаётся состояние, нажимается enter, ставим null */
  const changeCreateRow = (state: ListItemCreateType | null): void => setCreateRow(state);

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
