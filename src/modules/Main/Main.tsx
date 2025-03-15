import { FC, useEffect, useState } from 'react';
import { ListItemType, printList, titleItems } from '../../components/ListItem';
import s from './Main.module.scss';

const Main: FC = () => {
  const [list, setList] = useState<ListItemType[]>([]);

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
        <tbody>{list?.length > 0 && printList(list)}</tbody>
      </table>
    </main>
  );
};

export default Main;
