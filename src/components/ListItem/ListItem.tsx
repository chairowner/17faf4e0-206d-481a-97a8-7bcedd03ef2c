import { FC, Fragment, useState } from 'react';
import classNames from 'classnames';
import {
  IListItemProps,
  InputValues,
  ListItemType,
  ListItemUpdateType,
  PrintListProps,
  TitleItem,
} from './ListItem.types';
import s from './ListItem.module.scss';
import { createRowQuery, updateRowQuery } from './ListItem.service';

export const titleItems: TitleItem[] = [
  { key: 'level', title: 'Уровень' },
  { key: 'rowName', title: 'Наименование работ' },
  { key: 'salary', title: 'Основная з/п' },
  { key: 'equipmentCosts', title: 'Оборудование' },
  { key: 'overheads', title: 'Накладные расходы' },
  { key: 'estimatedProfit', title: 'Сметная прибыль' },
];

export const printList = ({
  updateListData,
  createMode,
  inputValues,
  editMode,
  addEditRowHandler,
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
          createMode,
          updateListData,
          inputValues,
          editMode,
          addEditRowHandler,
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
  updateListData,
  createMode,
  inputValues,
  levelRowIndex,
  levelHovered,
  deleteRowHandler,
  changeLevelHovered,
  changeRowEditHandler,
  addEditRowHandler,
  editMode,
  item,
  level = 0,
}) => {
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
          changeRowEditHandler(item.id, true);
        }}
      >
        {titleItems.map((titleItem) => {
          const key: string = item.id + titleItem.key;
          if (titleItem.key !== 'level')
            return (
              <td key={key}>
                {item.edit ? (
                  <input
                    className={s.input}
                    type={titleItem.key === 'rowName' ? 'text' : 'number'}
                    step={titleItem.key === 'rowName' ? undefined : 0.01}
                    value={inputValues[titleItem.key][0]}
                    onChange={(e) => inputValues[titleItem.key][1](e.target.value)}
                    onKeyUp={(e) => {
                      e.preventDefault();
                      if (createMode) {
                        if (e.key === 'Escape') {
                          changeRowEditHandler(item.id, false);
                          return deleteRowHandler(item.id, false);
                        }
                        if (e.key !== 'Enter') return;
                        changeRowEditHandler(item.id, false, inputValues);
                        return createMode
                          ? createRowQuery({
                              rowName: inputValues.rowName[0],
                              salary: Number(inputValues.salary[0]),
                              equipmentCosts: Number(inputValues.equipmentCosts[0]),
                              overheads: Number(inputValues.overheads[0]),
                              estimatedProfit: Number(inputValues.estimatedProfit[0]),
                              mimExploitation: 0,
                              machineOperatorSalary: 0,
                              materials: 0,
                              mainCosts: 0,
                              supportCosts: 0,
                              parentId: createMode.payload.parentId,
                            }).then((res: { changed: ListItemType[] }) => {
                              console.log('createRowQuery', res);
                              updateListData(res.changed);
                            })
                          : null;
                      } else {
                        if (e.key === 'Escape') return changeRowEditHandler(item.id, false);
                        if (e.key !== 'Enter') return;
                        changeRowEditHandler(item.id, false, inputValues);
                        const data: ListItemUpdateType = {
                          rowName: inputValues['rowName'][0],
                          salary: Number(inputValues['salary'][0]),
                          equipmentCosts: Number(inputValues['equipmentCosts'][0]),
                          overheads: Number(inputValues['overheads'][0]),
                          estimatedProfit: Number(inputValues['estimatedProfit'][0]),
                          mimExploitation: item.mimExploitation,
                          machineOperatorSalary: item.machineOperatorSalary,
                          materials: item.materials,
                          mainCosts: item.mainCosts,
                          supportCosts: item.supportCosts,
                        };
                        updateRowQuery(item.id, data).then((res: { changed: ListItemType[] }) => {
                          console.log('updateRowQuery', res);
                          updateListData(res.changed);
                        });
                      }
                    }}
                  />
                ) : (
                  <span>{item[titleItem.key].toLocaleString('ru-RU')}</span>
                )}
              </td>
            );

          /* level */
          return (
            <td
              key={key}
              onMouseOver={() => changeLevelHovered(true)}
              onMouseLeave={() => changeLevelHovered(false)}
              style={
                level > 0
                  ? { paddingLeft: `${level * (level === 1 || levelHovered ? 32 : 26)}px` }
                  : {}
              }
            >
              <div className={classNames(s.level, levelHovered && s.hovered)}>
                <div
                  className={classNames(s.item, s.add)}
                  onClick={() => {
                    if (editMode) return;
                    addEditRowHandler(item.id);
                  }}
                >
                  <img src="/icons/document.svg" alt="add row" />
                </div>
                <div
                  className={classNames(s.item, s.delete)}
                  onClick={() => {
                    if (item.id === 117453 || editMode) return;
                    deleteRowHandler(item.id, true);
                  }}
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
          updateListData,
          createMode,
          inputValues,
          editMode,
          addEditRowHandler,
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
