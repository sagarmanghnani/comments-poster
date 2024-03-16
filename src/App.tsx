import React from 'react';
import logo from './logo.svg';
import './App.css';
import PostCreator from './components/PostCreator';
import PostType from './enums';

function App() {
  return (
    <div className="App">
      <PostCreator type={PostType.COMMENT} postHandler={() => {}}/>
    </div>
  );
}

export default App;
