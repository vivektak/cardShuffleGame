/* eslint-disable react/prop-types */
/* eslint linebreak-style: ["error", "windows"] */

import React from 'react';
import ReactCardFlip from 'react-card-flip';
import CardBack from '../../assets/card-back.png';

const Deck = (props) => {
  const { deckNumber, deck } = props;

  return (
    <div className="col-6">
      <h3 className="text-center">DECK {deckNumber}</h3>
      <div className="row" style={{ border: '1px solid grey', padding: '10px' }}>
        {deck.map((card) => (
          <div key={card.code} className="col-4">
            <div onClick={() => { props.handleCardClick(card.code, deckNumber); }}>
              <ReactCardFlip isFlipped={card.show} flipDirection="vertical">
                <div className="m-2 text-center">
                  <img
                    src={CardBack}
                    className="rounded"
                    alt="card"
                    style={{ width: '150px', height: '150px' }}
                  />
                </div>
                <div className="m-2 text-center">
                  <img
                    src={card.image}
                    className="rounded"
                    alt="card"
                    style={{ width: '150px', height: '150px' }}
                  />
                </div>
              </ReactCardFlip>
            </div>
          </div>

        ))}
      </div>
    </div>
  );
};

export default Deck;
