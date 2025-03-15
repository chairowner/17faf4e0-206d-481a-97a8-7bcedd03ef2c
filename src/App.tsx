import { Nav, Header, Main } from './components';
import './App.style.scss';
import s from './App.module.scss';

export function App() {
  return (
    <div className={s.app}>
      <Header />
      <div className={s.main}>
        <Nav />
        <Main />
      </div>
    </div>
  );
}
