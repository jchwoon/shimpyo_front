import Main from "./components/Main/Main";
import "./fonts.css"
import "./reset.css"
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <Main />
    </RecoilRoot>
  );
}

export default App;
