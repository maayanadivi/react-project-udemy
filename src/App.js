import React, { useState, useEffect} from 'react';
import './App.css';
import Card from './Card';
import { ThemeProvider } from 'styled-components'
import axios from 'axios'
const theme = {
  primary: '#4CAF50',
  mango: 'yellow'
}

function App() {
 
  const [card, setCard] = useState([])
  const [id, setId] = useState(1)
  useEffect(() => {
    axios.get(`http://jsonplaceholder.typicode.com/users/${id}`)
      .then(res=>{
      console.log(res.data)
      setCard(res.data)
    })
  }, [id])
  
 
  const changeNameHandler = (event, id) => {
    //1. make a copy of the cards
    const card_copy = {...card}
    //2. change the name of the specific card
    card_copy.name = event.target.value
    //3. set the cards with the latest version of card copy
    setCard(card_copy)
  }
  
  

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <input type="text" value={id} onChange={e=>setId(e.target.value)}/>
        <Card
          name={card.name}
          phone={card.phone}
          key={card.id}
          onChangeName={(event) => changeNameHandler(event, card.id)}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
