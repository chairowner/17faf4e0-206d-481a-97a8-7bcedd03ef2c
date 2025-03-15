import { FC, Fragment } from 'react';
import s from './ListItem.module.scss';
import { ListItemType, TitleItem } from './ListItem.types';

export const titleItems: TitleItem[] = [
  { key: 'level', title: 'Уровень' },
  { key: 'rowName', title: 'Наименование работ' },
  { key: 'salary', title: 'Основная з/п' },
  { key: 'equipmentCosts', title: 'Оборудование' },
  { key: 'overheads', title: 'Накладные расходы' },
  { key: 'estimatedProfit', title: 'Сметная прибыль' },
];

export interface IListItemProps {
  item: ListItemType;
  level?: number;
}

export const printList = (list: ListItemType[], level = 0): JSX.Element => {
  return (
    <>
      {list.map((item) => (
        <ListItem key={item.id} item={item} level={level} />
      ))}
    </>
  );
};

const ListItem: FC<IListItemProps> = ({ item, level = 0 }) => {
  const hasChild: boolean = item?.child?.length > 0;
  return (
    <Fragment key={item.id}>
      <tr>
        {titleItems.map((titleItem) => {
          const key: string = item.id + titleItem.key;

          if (titleItem.key !== 'level')
            return (
              <td key={key}>
                <span>{item[titleItem.key]}</span>
              </td>
            );

          /* level */
          return (
            <td key={key} style={level > 0 ? { paddingLeft: `${level * 32}px` } : {}}>
              <div className={s.level}>
                <div className={s.item}>
                  <img src="/icons/document.svg" alt="add row" />
                </div>
                <div className={s.item}>
                  <img src="/icons/trash.svg" alt="delete row" />
                </div>
                {level > 0 && <div className={s.hasChild} />}
              </div>
            </td>
          );
        })}
      </tr>
      {hasChild && printList(item.child, level + 1)}
    </Fragment>
  );
};

export default ListItem;
