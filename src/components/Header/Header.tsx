import classNames from 'classnames';
import s from './Header.module.scss';

const Header = () => {
  return (
    <header className={s.header}>
      <div className={classNames(s.headerRow, s.headerRowTop)}>
        <div className={s.actions}>
          <img src="/icons/menu.svg" alt="menu" />
          <img src="/icons/back.svg" alt="back" />
        </div>
        <div className={s.modeSelector}>
          <div className={classNames(s.item, s.selected)}>Просмотр</div>
          <div className={s.item}>Управление</div>
        </div>
      </div>
      <div className={s.headerRow}>
        <div className={s.projectInfo}>
          <div className={s.data}>
            <span>Название проекта</span>
            <span className={s.abbr}>Аббревиатура</span>
          </div>
          <img className={s.arrow} src="/icons/arrow.svg" alt="arrow" />
        </div>
        <div>
          <div className={s.title}>Строительно-монтажные работы</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
