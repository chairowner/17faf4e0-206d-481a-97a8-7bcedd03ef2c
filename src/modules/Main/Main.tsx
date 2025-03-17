import { FC, useEffect, useState } from 'react';
import { ListItemCreateType, ListItemType, printList, titleItems } from '../../components/ListItem';
import s from './Main.module.scss';

const Main: FC = () => {
  const [levelHovered, setLevelHovered] = useState<boolean>(false);
  const [list, setList] = useState<ListItemType[]>([]);
  const [createRow, setCreateRow] = useState<ListItemCreateType | null>(null);

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
    fetch(`/api/${id}/delete`, { method: 'DELETE' })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json?.status) return;
      });
  };

  useEffect(() => {
    fetch('/api/list')
      .then((res) => res.json())
      .then((json) => setList(json));
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
            printList({ deleteRowHandler, levelHovered, changeLevelHovered, list })}
        </tbody>
      </table>
    </main>
  );
};

export default Main;
