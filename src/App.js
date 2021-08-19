import React, { useState } from 'react';
import './App.css';
import Card from './Card';
import { ThemeProvider } from 'styled-components';
import Button from './element/Button';

const theme = {
  primary: '#4CAF50',
  mango:'yellow'
}

function App() {
  const [cards, setCards] =useState([
    {
      
      id:'123',
      name: 'Yoni',
      title: 'International Operations Producer',
      avatar:'https://avatars.githubusercontent.com/u/73611785?v=4'
    },
    {
      id:'456',
      name: 'Bar',
      title: 'Future Security Developer',
      avatar:'https://avatars.githubusercontent.com/u/73593736?v=4'
    },
    {
      id:'789',
      name: 'Coral',
      title: 'Forward Metrics AnalystChange Name',
      avatar:'https://avatars.githubusercontent.com/u/73594029?v=4'
    }
  ])
  const [showCard , setShowCard] = useState(true)
  const toggleShowCard = () => setShowCard(!showCard)
  const deleteCardHandler = (cardIndex)=>{
    const cards_copy = [...cards]
    cards_copy.splice(cardIndex,1)
    setCards(cards_copy)
  }
  const changeNameHandler= (event,id) => {
    //1. which card
    const cardIndex= cards.findIndex(card=>card.id === id)
    //2.make a copy of the cards
    const cards_copy = [...cards]
    //3. change the name of the specific card
    cards_copy[cardIndex].name=event.target.value
    //4. set the cards with the latest version of the card copy
    setCards(cards_copy)
    
  }
  //const buttonStyle = {
  //  backgroundColor: null
  //}
  const classes = ['button']
  if(cards.length<3) classes.push('pink');
  if(cards.length<2) classes.push('red text');


  const cardsMarKup = showCard &&(
    cards.map((card,index)=><Card 
      avatar={card.avatar}
      name={card.name} 
      title={card.title}
      key={card.id}
      onDelete={() => deleteCardHandler(index)}
      onChangeName = {(event)=>changeNameHandler(event,card.id)}
  />))
    
  
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
    <Button color="mango" length={cards.length}>Toggle</Button>
      <button className={classes.join(' ')} onClick={toggleShowCard}>Show/Hide</button>
      {cardsMarKup} 
    </div></ThemeProvider>
    
  );
}

export default App;
