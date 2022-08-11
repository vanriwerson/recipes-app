import React from 'react';
import Routes from './routes/Routes';
import RecipeProvider from './context/RecipeProvider';

function App() {
  return (
    <div className="app">
      <RecipeProvider>
        <Routes />
      </RecipeProvider>
    </div>
  );
}

export default App;
