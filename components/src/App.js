import React from 'react';
import logo from './logo.svg';
import './App.css';
import ClassComponent from './components/ClassComponent';
import FunctionalComponent from './components/FunctionalComponent';

function App() {
  return (
    <div className="App">
      {/* {name: Daniel, age = 22, children = undefined} => props */}
      <ClassComponent name ='Daniel' age={22} isFemale = {true}/>
      <FunctionalComponent name = 'HyunSeok' age={55} isFemale = {false}>고양이</FunctionalComponent>
    </div>
  );
}

export default App;
