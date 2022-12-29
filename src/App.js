import React from 'react';
import './App.css';
import Chat from './Chat';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2 style={{ marginTop: '-20px' }}>Top G Bot</h2>
          <Chat />
        </header>
      </div>
    );
  }
}

export default App;
