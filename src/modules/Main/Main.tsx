import { FC, useEffect, useRef, useState } from 'react';
import { ListItemType, printList, titleItems } from '../../components/ListItem';
import s from './Main.module.scss';

const Main: FC = () => {
  const [levelHovered, setLevelHovered] = useState<boolean>(false);
  const [list, setList] = useState<ListItemType[]>([]);

  const changeLevelHovered = (state: boolean): void => setLevelHovered(state);

  const levelFieldHoverHandler = () => {
    console.log('checkHover');
    if (false) changeLevelHovered(true);
  };

  useEffect(() => {
    fetch('/api/list')
      .then((res) => res.json())
      .then((json) => setList(json));

    document.addEventListener('mouseover', levelFieldHoverHandler);
    return () => {
      document.removeEventListener('mouseover', levelFieldHoverHandler);
    };
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
        <tbody>{list?.length > 0 && printList({ levelHovered, changeLevelHovered, list })}</tbody>
      </table>
    </main>
  );
};

export default Main;
