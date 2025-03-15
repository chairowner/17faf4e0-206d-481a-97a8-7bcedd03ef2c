import s from './Nav.module.scss';

const titles: string[] = [
  'По проекту',
  'Объекты',
  'РД',
  'МТО',
  'СМР',
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
        <div className={s.item} key={index}>
          <img src="/icons/project-item.svg" alt="project-item" />
          <span>{title}</span>
        </div>
      ))}
    </nav>
  );
};

export default Nav;
