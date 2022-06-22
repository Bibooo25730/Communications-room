import './App.css';
import HeaderComponent from "./components/header/HeaderComponent";
import FooterComponent from "./components/footer/FooterComponent";
import "../src/assets/font/iconfont"
function App() {
  return (
    <div className="App" >
        <HeaderComponent></HeaderComponent>
        <FooterComponent></FooterComponent>
    </div>
  );
}

export default App;
