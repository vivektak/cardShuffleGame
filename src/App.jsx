/* eslint linebreak-style: ["error", "windows"] */

import React, { useEffect, useState } from 'react';
import './App.css';
import Controls from './components/controls/Controls';
import http from './services/httpService';
import Deck from './components/deck/Deck';
import helper from './helpers/helper';


function App() {
  const [deckOne, setDeckOne] = useState([]);
  const [deckTwo, setDeckTwo] = useState([]);
  const [matchedIds, setMetchedIds] = useState([]);
  const [openCardId, setOpenCardId] = useState('');
  const [totalTurn, setTotalTurn] = useState(0);

  const getRandomCards = () => {
    try {
      http.get('getRandomCards')
        .then((res) => {
          if (res && res.data && res.data.data) {
            setDeckOne(res.data.data.deckOne);
            setDeckTwo(res.data.data.deckTwo);
          }
        });
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert('Something went wrong', error);
    }
  };

  useEffect(() => {
    getRandomCards();
  }, []);


  const shuffle = () => {
    getRandomCards();
    setTotalTurn(0);
  };

  const reset = () => {
    getRandomCards();
    setTotalTurn(0);
  };

  const deckTimeout = (openCardIdParam, cardId, deckNumber) => {
    if (openCardId) {
      setTimeout(() => {
        setDeckTwo(helper.checkDeck(deckTwo, deckNumber ? openCardIdParam : cardId));
        setDeckOne(helper.checkDeck(deckOne, deckNumber ? cardId : openCardIdParam));
        setOpenCardId('');
      }, 1000);
    }
  };

  const updateTurn = () => {
    if (!openCardId) {
      setTotalTurn(totalTurn + 1);
    }
  };

  const matched = (cardId) => {
    const matchedIdsCopy = [...matchedIds, cardId];
    setMetchedIds(matchedIdsCopy);
    setOpenCardId('');
  };

  const setDeck = (deckNumber, cardId) => {
    if (deckNumber) {
      setDeckOne(helper.checkDeck(deckOne, cardId));
    } else {
      setDeckTwo(helper.checkDeck(deckTwo, cardId));
    }
  };

  const handleDeck = (cardId, deckParam, deckNumber) => {
    setOpenCardId(cardId);
    setDeck(deckNumber, cardId);
    const found = helper.checkFound(deckParam, cardId);
    if (found) {
      matched(cardId);
    } else {
      deckTimeout(openCardId, cardId, deckNumber);
    }
  };

  const handleCardClick = (cardId, deck) => {
    if (deck === 1) {
      handleDeck(cardId, deckTwo, true);
    } else if (deck === 2) {
      handleDeck(cardId, deckOne, false);
    }
    updateTurn();
  };

  return (
    <div className="container-fluid">
      <Controls shuffle={shuffle} reset={reset} />
      <div className="text-right mr-10">
        <span>
          Turn so Far: {totalTurn}
        </span>
      </div>
      <div className="row mt-5">
        <Deck deck={deckOne} handleCardClick={handleCardClick} deckNumber={1} />
        <Deck deck={deckTwo} handleCardClick={handleCardClick} deckNumber={2} />
      </div>
    </div>
  );
}

export default App;
