import React, { Component } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Index from './index';
import URI from './NewURI';
import Header from './Header';
import Oracle from './oracle';

class App extends Component {

  render(){
    return(
      <BrowserRouter>
        <container>
          <Header />
          <main>
            <Routes>
              <Route exact path="/" element={<Index />}/>
              <Route exact path="/oracle" element={<Oracle />}/>
              <Route exact path="/NewURI" element={<URI />}/>
            </Routes>
          </main>
        </container>
      </BrowserRouter>
    );
  }

}

export default App;
