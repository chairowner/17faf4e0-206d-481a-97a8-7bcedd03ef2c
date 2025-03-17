import { FC, Fragment, useState } from 'react';
import classNames from 'classnames';
import { IListItemProps, InputValues, PrintListProps, TitleItem } from './ListItem.types';
import s from './ListItem.module.scss';

export const titleItems: TitleItem[] = [
  { key: 'level', title: 'Уровень' },
  { key: 'rowName', title: 'Наименование работ' },
  { key: 'salary', title: 'Основная з/п' },
  { key: 'equipmentCosts', title: 'Оборудование' },
  { key: 'overheads', title: 'Накладные расходы' },
  { key: 'estimatedProfit', title: 'Сметная прибыль' },
];

export const printList = ({
  levelHovered,
  changeRowEditHandler,
  deleteRowHandler,
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
          changeRowEditHandler,
          deleteRowHandler,
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
  deleteRowHandler,
  changeLevelHovered,
  changeRowEditHandler,
  item,
  level = 0,
}) => {
  const inputValues: InputValues = {
    level: useState<string>(''),
    rowName: useState<string>(''),
    salary: useState<string>(''),
    equipmentCosts: useState<string>(''),
    overheads: useState<string>(''),
    estimatedProfit: useState<string>(''),
  };
  const hasChild: boolean = item?.child?.length > 0;
  return (
    <Fragment key={item.id}>
      <tr
        onDoubleClick={() => {
          if (item.edit) return;
          inputValues.rowName[1](item.rowName);
          inputValues.salary[1](String(item.salary));
          inputValues.equipmentCosts[1](String(item.equipmentCosts));
          inputValues.overheads[1](String(item.overheads));
          inputValues.estimatedProfit[1](String(item.estimatedProfit));
          changeRowEditHandler(item.id);
        }}
      >
        {titleItems.map((titleItem) => {
          const key: string = item.id + titleItem.key;

          if (titleItem.key !== 'level') {
            return (
              <td key={key}>
                {item.edit ? (
                  <input
                    type={titleItem.key === 'rowName' ? 'text' : 'number'}
                    value={inputValues[titleItem.key][0]}
                    onChange={(e) => inputValues[titleItem.key][1](e.target.value)}
                    onKeyUp={(e) => {
                      e.preventDefault();
                      if (e.key !== 'Enter') return;
                      changeRowEditHandler(item.id, inputValues[titleItem.key][0], titleItem.key);
                    }}
                  />
                ) : (
                  <span>{item[titleItem.key]}</span>
                )}
              </td>
            );
          }

          /* level */
          return (
            <td
              key={key}
              onMouseOver={() => changeLevelHovered(true)}
              onMouseLeave={() => changeLevelHovered(false)}
              style={level > 0 ? { paddingLeft: `${level * 32}px` } : {}}
            >
              <div className={classNames(s.level, levelHovered && s.hovered)}>
                <div
                  className={classNames(s.item, s.add)}
                  onClick={() => console.log('try to add')}
                >
                  <img src="/icons/document.svg" alt="add row" />
                </div>
                <div
                  className={classNames(s.item, s.delete)}
                  onClick={() => deleteRowHandler(item.id)}
                >
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
          changeRowEditHandler,
          levelHovered,
          deleteRowHandler,
          changeLevelHovered,
          list: item.child,
          level: level + 1,
        })}
    </Fragment>
  );
};

export default ListItem;
