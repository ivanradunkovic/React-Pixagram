import React, { Component } from 'react';
import Header from './components/Header';
import Post from './components/Post';
import './App.css';

    class App extends Component {
      render() {
        return (
          <div>
            <Header />
          <div>
            <Post />
          </div>
          </div>
        );
      }
    }
    
    export default App;