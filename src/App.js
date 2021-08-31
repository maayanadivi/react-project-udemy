import React, { useState, useEffect } from "react";
import "./App.css";
import Card from "./Card";
import { ThemeProvider } from "styled-components";
import axios from "axios";
const theme = {
  primary: "#ffc6c6",
  mango: "yellow",
};

function App() {
  const [cards, setCards] = useState([]);
  const [card, setCard] = useState({});
  const [id, setId] = useState();

  useEffect(() => {
    if (id) {
      axios
        .get(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((res) => {
          setCard(res.data);
        });
    } else {
      axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
        setCards(res.data);
      });
    }
  }, [id]);

  const deleteCardHandler = (cardIndex) => {
    const cards_copy = [...cards];
    cards_copy.splice(cardIndex, 1);
    setCards(cards_copy);
  };

  const changeNameHandler = (event, id) => {
    //1. which card
    const cardIndex = cards.findIndex((card) => card.id === id);
    //2. make a copy of the cards
    const cards_copy = [...cards];
    //3. change the name of the specific card
    cards_copy[cardIndex].name = event.target.value;
    //4. set the cards with the latest version of card copy
    setCards(cards_copy);
  };

  const cardsMarkup = cards.map((card, index) => (
    <Card
      name={card.name}
      phone={card.phone}
      key={card.id}
      onDelete={() => deleteCardHandler(index)}
      onChangeName={(event) => changeNameHandler(event, card.id)}
    />
  ));

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <input
          type="text"
          placeholder="Enter ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          style={{ marginBottom: 30, backgroundColor: theme.primary }}
        />

        {id && card ? (
          <Card
            name={card.name}
            phone={card.phone}
            key={card.id}
            onDelete={() => setCard()}
            onChangeName={(event) => changeNameHandler(event, card.id)}
          />
        ) : (
          cardsMarkup
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
