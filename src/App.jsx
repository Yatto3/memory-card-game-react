import { useRef, useState } from 'react'
import CardTemplate from './assets/components/CardsTemplate/CardTemplate'
import styles from "./assets/components/CardsTemplate/CardTemplate.module.css"
import "./App.css"
import Timer from './assets/components/Timer/Timer'


function App() {
  let cardsListRow1 ;
  let cardsListRow2;

  const cardsImgSrc = [
    "src/assets/cards-svg/ace-casino-svgrepo-com.svg",
    "src/assets/cards-svg/chip-casino-svgrepo-com (1).svg",
    "src/assets/cards-svg/chip-casino-svgrepo-com.svg",
    "src/assets/cards-svg/cube-svgrepo-com.svg",
    "src/assets/cards-svg/dice-svgrepo-com.svg",
  ]
  let userSequence = [];
  let cardAnimation = {
    rotate : "rotateY(360deg)",
    initial : "rotateY(720deg)",
  }

  let id = 0 ;
  

  const shuffleCardsSrc = () => {
      for (let i = cardsImgSrc.length - 1 ; i > 0  ; i--){
        let rand_index = Math.floor(Math.random() * cardsImgSrc.length);
        let temp_index = cardsImgSrc[i];

        cardsImgSrc[i] = cardsImgSrc[rand_index];
        cardsImgSrc[rand_index] = temp_index; 
      }

  };

  const rotateCard = (img,container) => {
    
    img.classList.remove(styles.visuallyHidden);
    container.style.transform = cardAnimation.rotate;
    container.id = "";
  }

  const markCards = (cardsList) => {
    cardsList.map(card => card.classList.toggle(styles.marked));
    userSequence.length = 0;
  }

  const handleClick = (e) => {
   if(e.target.tagName === "DIV" && e.target.getAttribute("src")){
    let img = e.target.querySelector("img");
    let container = e.target;
   
    userSequence.push({"container" : container, containerSrc : container.getAttribute("src")});
    if (userSequence.length <= 2) rotateCard(img,container);
 
    if (userSequence.length === 2){
      if(userSequence[0].containerSrc === userSequence[1].containerSrc){
        markCards([userSequence[0].container,userSequence[1].container]);
      } else{
        userSequence.map(card => {
          setTimeout(() => {
            setTimeout(() => {
              let img = card.container.querySelector("img")
              card.container.style.transform = cardAnimation.initial;
              card.container.id = styles.background;
              img.classList.toggle(styles.visuallyHidden);
            },500)
            userSequence.length = 0 ;
          },1000)
        })
       
      }
    }
   }
  }


    shuffleCardsSrc();
    cardsListRow1 = cardsImgSrc.map(card => <CardTemplate src = {card}  key={id++}  />);

    shuffleCardsSrc();
    cardsListRow2 = cardsImgSrc.map(card => <CardTemplate src = {card} key={id++}  />);


  return(
     <>
      <h1><span>React</span> Memory-Cards Game</h1><br />
      <div className='cards-container'> 
        <div onClick={ (e) => handleClick(e)  } className='card-row' >{cardsListRow1}</div>
        <div onClick={ (e) => handleClick(e) } className='card-row'>{cardsListRow2}</div>
      </div>
     </>
  )
}
export default App
