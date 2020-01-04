/* eslint linebreak-style: ["error", "windows"] */

import React, { useEffect, useState } from 'react';
import './App.css';
import Controls from './components/Controls';
import Deck from './components/Deck';
import http from './services/httpService';

function App() {
  const [deckOne, setDeckOne] = useState([]);
  const [deckTwo, setDeckTwo] = useState([]);
  const [matchedIds, setMetchedIds] = useState([]);
  const [openCardId, setOpenCardId] = useState('');
  const [totalTurn, setTotalTurn] = useState(0);

  useEffect(() => {
    getRandomCards();
  }, []);


  const getRandomCards = () => {

    http.get('getRandomCards')
      .then((res) => {
        setDeckOne(res.data.data.deckOne);
        setDeckTwo(res.data.data.deckTwo);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }


  const shuffle = () => {
    getRandomCards();
    setTotalTurn(0);
  }

  const reset = () => {
    getRandomCards();
    setTotalTurn(0);
  }

  const checkDeckOne = (deckOne, cardId) => {
    const deckOneCopy = [...deckOne];
    deckOneCopy.forEach((card) => {
      if (card.code === cardId) {
        card.show = card.show ? false : true;
      }
    });
    setDeckOne(deckOneCopy);
  }

  const checkDeckTwo = (deckTwo, cardId) => {
    const deckTwoCopy = [...deckTwo];
    deckTwoCopy.forEach((card) => {
      if (card.code === cardId) {
        card.show = card.show ? false : true;
      }
    });
    setDeckTwo(deckTwoCopy);
  }

  const deckOneTimeout = (openCardId, cardId) => {
    if (openCardId) {
      setTimeout(() => {
        checkDeckTwo(deckTwo, openCardId)
        checkDeckOne(deckOne, cardId);
        setOpenCardId('');
      }, 1000);
    }
  }

  const deckTwoTimeout = (openCardId, cardId) => {
    if (openCardId) {
      setTimeout(() => {
        checkDeckTwo(deckTwo, cardId)
        checkDeckOne(deckOne, openCardId);
        setOpenCardId('');
      }, 1000);
    }
  }

  const handleCardClick = (cardId, deck) => {
    if (deck === 1) {
      setOpenCardId(cardId);
      checkDeckOne(deckOne, cardId)
      let found = 0;
      deckTwo.forEach((card) => {
        if (card.code === cardId && card.show) {
          found = 1;
        }
      });
      if (found) {
        matched(cardId);
      } else {
        deckOneTimeout(openCardId, cardId)
      }
    } else if (deck === 2) {
      setOpenCardId(cardId);
      checkDeckTwo(deckTwo, cardId)
      let found = 0;
      deckOne.forEach((card) => {
        if (card.code === cardId && card.show) {
          found = 1;
        }
      });

      if (found) {
        matched(cardId);
      } else {
        deckTwoTimeout(openCardId, cardId);
      }
    }
    updateTurn();
  };

  const matched = (cardId) => {
    const matchedIdsCopy = [...matchedIds];
    matchedIdsCopy.push(cardId);
    setMetchedIds(matchedIdsCopy);
    setOpenCardId('');
  }

  const updateTurn = () => {
    if (!openCardId) {
      setTotalTurn(totalTurn + 1);
    }
  }

  return (
    <div className="container-fluid">
      <Controls shuffle={shuffle} reset={reset} />
      <div className='text-right mr-10'>
        <span>Turn so Far : {totalTurn}</span>
      </div>
      <div className="row mt-5">
        <Deck deck={deckOne} handleCardClick={handleCardClick} deckNumber={1} />
        <Deck deck={deckTwo} handleCardClick={handleCardClick} deckNumber={2} />
      </div>
    </div>
  );
}

export default App;
