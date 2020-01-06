const helper = {
  checkFound: (deckParam, cardId) => {
    let count = 0;
    deckParam.forEach((card) => {
      if (card.code === cardId && card.show) {
        count = 1;
      }
    });
    return count;
  },
  checkDeck: (deckParam, cardId) => {
    const deckCopy = [...deckParam];
    deckCopy.forEach((card) => {
      if (card.code === cardId) {
        card.show = card.show ? 0 : true;
      }
    });
    return deckCopy;
  }
};

export default helper;