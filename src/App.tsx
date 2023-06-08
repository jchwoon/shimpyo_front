import { RecoilRoot } from 'recoil';
import './App.css';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <RecoilRoot>
        <Outlet />
      </RecoilRoot>
    </>
  );
}

export default App;
