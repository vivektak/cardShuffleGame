/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable indent */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-indent */
/* eslint linebreak-style: ["error", "windows"] */

import React from 'react';
import ReactCardFlip from 'react-card-flip';
import CardBack from '../../assets/card-back.png';

const Deck = (props) => {
    const { deckNumber, deck } = props;

    return (
        <div className="col-6">
            <h3 className="text-center">DECK {deckNumber}</h3>
            <div className="row">
                {deck.map((card) => (
                    <>
                        <div className="col-4" key={card.code} onClick={() => { props.handleCardClick(card.code, deckNumber); }}>
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
                    </>

                ))}
            </div>
        </div>
    );
};

export default Deck;
