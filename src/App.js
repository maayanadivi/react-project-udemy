import React, {  Component} from 'react';
import './App.css';
import Card from './Card';
import { ThemeProvider } from 'styled-components';
import Button from './element/Button';


const theme = {
  primary: '#4CAF50',
  mango:'yellow'
}

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      cards:[
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
      ],
      showCard:true
    }
  }

  toggleShowCard = () => this.setState({showCard:!this.state.showCard})
  deleteCardHandler = (cardIndex)=>{
    const cards_copy = [...this.state.cards]
    cards_copy.splice(cardIndex,1)
    this.setState({cards:cards_copy})
  }
  changeNameHandler= (event,id) => {
    //1. which card
    const cardIndex= this.state.cards.findIndex(card=>card.id === id)
    //2.make a copy of the cards
    const cards_copy = [...this.state.cards]
    //3. change the name of the specific card
    cards_copy[cardIndex].name=event.target.value
    //4. set the cards with the latest version of the card copy
    this.setState({cards:cards_copy})
    
  }
  //const buttonStyle = {
  //  backgroundColor: null
  //}
  
  render(){
    const classes = ['button']
    if(this.state.cards.length<3) classes.push('pink');
    if(this.state.cards.length<2) classes.push('red text');
    const cardsMarKup = this.state.showCard &&(
      this.state.cards.map((card,index)=><Card 
        avatar={card.avatar}
        name={card.name} 
        title={card.title}
        key={card.id}
        onDelete={() => this.deleteCardHandler(index)}
        onChangeName = {(event)=>this.changeNameHandler(event,card.id)}
    />))

    return (
      <ThemeProvider theme={theme}>
      <div className="App">
      <Button color="mango" length={this.state.cards.length} onClick={this.toggleShowCard}>Toggle</Button>
        <button className={classes.join(' ')} onClick={this.toggleShowCard}>Show/Hide</button>
        {cardsMarKup} 
      </div></ThemeProvider>
      
    );
  }
    
  
  
}

export default App;
