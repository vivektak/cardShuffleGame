import React from 'react';
import ReactCardFlip from 'react-card-flip';
import CardBack from '../../src/assets/card-back.png';

const Deck = (props) => {
    return (
        <div className="col-6">
            <h3 className="text-center">DECK {props.deckNumber}</h3>
            <div className="row">
                {props.deck.map((card) => {
                    return (

                        <div
                            className="col-4"
                            key={card.code}
                            onClick={() => {
                                props.handleCardClick(card.code, props.deckNumber);
                            }}
                        >
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
                    );
                })}
            </div>
        </div>
    );
}

export default Deck;