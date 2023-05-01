import React, { Component } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Index from './index';
import Admin from './Admin';
import Header from './Header';
// import Oracle from './oracle';

class App extends Component {

  render(){
    return(
      <BrowserRouter>
        <container>
          <Header />
          <main>
            <Routes>
              <Route exact path="/" element={<Index />}/>
              <Route exact path="/Admin" element={<Admin />}/>
            </Routes>
          </main>
        </container>
      </BrowserRouter>
    );
  }

}

export default App;
