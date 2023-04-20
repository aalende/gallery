
import CharacterSearchList from './components/charactersSearch';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CharacterDetail from './components/characterDetail';

function App() {

  return (
    <div className="App">
      <div className='header'>
        <h1 className="title">
              Marvel's Characters
        </h1>
      </div>
      <div>
      <BrowserRouter>
      <Routes>
          <Route path="/" element={ <CharacterSearchList/> }/> 
          <Route path="/characters/:id" element={ <CharacterDetail/> }/>
      </Routes>
      </BrowserRouter>
          {/* routes  y crear component details y pasar route*/}
       
      </div>
    </div>
  );
}

export default App;
