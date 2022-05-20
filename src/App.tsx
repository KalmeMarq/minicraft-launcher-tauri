import { invoke } from '@tauri-apps/api';
import { useEffect, useState } from 'react';

function App() {
  const [a, setA] = useState('');

  const aa = {
    a: ''
  };

  useEffect(() => {
    invoke('get_launcher_path').then((d) => {
      setA(d as string);
    });
  }, []);

  return (
    <>
      <h1>Updater Test Version 0.0.1</h1>
      <div className="notification">
        <div className="notif-icon"></div>
        <div className="notif-content">
          <div className="notif-text">{a} The update was released</div>
          <div className="notif-buttons">
            <button>Restart now</button>
            <button>Later</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
