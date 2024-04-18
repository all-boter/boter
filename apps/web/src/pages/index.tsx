import React from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  const onLogin = ()=>{
    navigate('/login');
  }

  return (
    <div>
      <button onClick={onLogin}>login</button>
    </div>
  );
}

export default App;
