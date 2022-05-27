import './App.css';
import { Peer } from "peerjs";
function App() {
    const peer = new Peer("pick-an-id");
    function open(){
        const peer = new Peer('someid', {
            host: 'localhost',
            port: 9000,
            path: '/peerjs/myapp'
        });
    }
  return (
    <div className="App" >
      <header className="App-header">
          <button onClick={open}>连接</button>
      </header>
    </div>
  );
}

export default App;
