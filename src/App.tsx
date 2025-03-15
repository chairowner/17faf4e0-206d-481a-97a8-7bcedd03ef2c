import { Nav, Header } from './components';
import './App.style.scss';
import s from './App.module.scss';

export function App() {
  return (
    <div className={s.App}>
      <Header />
      <div className={s.Main}>
        <Nav />
        <main>
          <strong>app</strong>
        </main>
      </div>
    </div>
  );
}
