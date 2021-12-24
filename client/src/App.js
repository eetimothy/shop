import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { DataProvider } from './GlobalState'
import MainPages from './components/mainpages/Pages'
import TopDrawer from './components/headers/TopDrawer';
import Footer from './components/footer/Footer';


function App() {
  return (
    <DataProvider>
      <Router>
             
        <TopDrawer/>
        <div className="App">  
          <MainPages />
          <Footer/>
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
