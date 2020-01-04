/* eslint-disable import/no-named-as-default */
/* eslint-disable no-param-reassign */
/* eslint linebreak-style: ["error", "windows"] */

import React, { useEffect, useState } from 'react';
import './App.css';
import Controls from './components/controls/Controls';
import http from './services/httpService';
import Deck from './components/deck/Deck';


function App() {
  const [deckOne, setDeckOne] = useState([]);
  const [deckTwo, setDeckTwo] = useState([]);
  const [matchedIds, setMetchedIds] = useState([]);
  const [openCardId, setOpenCardId] = useState('');
  const [totalTurn, setTotalTurn] = useState(0);

  const getRandomCards = () => {
    http.get('getRandomCards')
      .then((res) => {
        setDeckOne(res.data.data.deckOne);
        setDeckTwo(res.data.data.deckTwo);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
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

  const checkDeckOne = (deckOneParam, cardId) => {
    const deckOneCopy = [...deckOneParam];
    deckOneCopy.forEach((card) => {
      if (card.code === cardId) {
        card.show = card.show ? 0 : true;
      }
    });
    setDeckOne(deckOneCopy);
  };

  const checkDeckTwo = (deckTwoParam, cardId) => {
    const deckTwoCopy = [...deckTwoParam];
    deckTwoCopy.forEach((card) => {
      if (card.code === cardId) {
        card.show = card.show ? 0 : 1;
      }
    });
    setDeckTwo(deckTwoCopy);
  };

  const deckOneTimeout = (openCardIdParam, cardId) => {
    if (openCardId) {
      setTimeout(() => {
        checkDeckTwo(deckTwo, openCardIdParam);
        checkDeckOne(deckOne, cardId);
        setOpenCardId('');
      }, 1000);
    }
  };

  const deckTwoTimeout = (openCardIdParam, cardId) => {
    if (openCardId) {
      setTimeout(() => {
        checkDeckTwo(deckTwo, cardId);
        checkDeckOne(deckOne, openCardIdParam);
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
    const matchedIdsCopy = [...matchedIds];
    matchedIdsCopy.push(cardId);
    setMetchedIds(matchedIdsCopy);
    setOpenCardId('');
  };

  const handleCardClick = (cardId, deck) => {
    if (deck === 1) {
      setOpenCardId(cardId);
      checkDeckOne(deckOne, cardId);
      let found = 0;
      deckTwo.forEach((card) => {
        if (card.code === cardId && card.show) {
          found = 1;
        }
      });
      if (found) {
        matched(cardId);
      } else {
        deckOneTimeout(openCardId, cardId);
      }
    } else if (deck === 2) {
      setOpenCardId(cardId);
      checkDeckTwo(deckTwo, cardId);
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

  return (
    <div className="container-fluid">
      <Controls shuffle={shuffle} reset={reset} />
      <div className="text-right mr-10">
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
