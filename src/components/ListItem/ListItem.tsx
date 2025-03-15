import { FC, Fragment } from 'react';
import classNames from 'classnames';
import { ListItemType, TitleItem } from './ListItem.types';
import s from './ListItem.module.scss';

export const titleItems: TitleItem[] = [
  { key: 'level', title: 'Уровень' },
  { key: 'rowName', title: 'Наименование работ' },
  { key: 'salary', title: 'Основная з/п' },
  { key: 'equipmentCosts', title: 'Оборудование' },
  { key: 'overheads', title: 'Накладные расходы' },
  { key: 'estimatedProfit', title: 'Сметная прибыль' },
];

export interface IListItemProps {
  levelRowIndex: number;
  levelHovered: boolean;
  changeLevelHovered(state: boolean): void;
  item: ListItemType;
  level?: number;
}

interface PrintListProps {
  levelHovered: boolean;
  changeLevelHovered(state: boolean): void;
  list: ListItemType[];
  level?: number;
}

export const printList = ({
  levelHovered,
  changeLevelHovered,
  list,
  level = 0,
}: PrintListProps): JSX.Element => {
  return (
    <>
      {list.map((item, index) => {
        const props: IListItemProps = {
          levelRowIndex: index,
          levelHovered,
          changeLevelHovered,
          item,
          level,
        };
        return <ListItem key={item.id} {...props} />;
      })}
    </>
  );
};

const ListItem: FC<IListItemProps> = ({
  levelRowIndex,
  levelHovered,
  changeLevelHovered,
  item,
  level = 0,
}) => {
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
            <td
              key={key}
              onMouseOver={() => changeLevelHovered(true)}
              onMouseLeave={() => changeLevelHovered(false)}
              style={level > 0 ? { paddingLeft: `${level * 32}px` } : {}}
            >
              <div className={classNames(s.level, levelHovered && s.hovered)}>
                <div className={classNames(s.item, s.add)}>
                  <img src="/icons/document.svg" alt="add row" />
                </div>
                <div className={classNames(s.item, s.delete)}>
                  <img src="/icons/trash.svg" alt="delete row" />
                </div>
                {level > 0 && (
                  <div className={classNames(s.hasChild, levelRowIndex === 0 && s.first)} />
                )}
              </div>
            </td>
          );
        })}
      </tr>
      {hasChild &&
        printList({
          levelHovered,
          changeLevelHovered,
          list: item.child,
          level: level + 1,
        })}
    </Fragment>
  );
};

export default ListItem;
