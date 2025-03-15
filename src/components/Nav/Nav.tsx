import classNames from 'classnames';
import s from './Nav.module.scss';

const selectedTitle: string = 'СМР';
const titles: string[] = [
  'По проекту',
  'Объекты',
  'РД',
  'МТО',
  selectedTitle,
  'График',
  'МиМ',
  'Рабочие',
  'Капвложения',
  'Бюджет',
  'Финансирование',
  'Панорамы',
  'Камеры',
  'Поручения',
  'Контрагенты',
];

const Nav = () => {
  return (
    <nav className={s.nav}>
      {titles.map((title, index) => (
        <div className={classNames(s.item, title === selectedTitle && s.selected)} key={index}>
          <img src="/icons/project-item.svg" alt="project-item" />
          <span>{title}</span>
        </div>
      ))}
    </nav>
  );
};

export default Nav;
