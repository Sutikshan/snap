import { IAppState, dealCards, ICard, COMPUTER, PLAYER } from "./App.config";

const addToTop = (card: ICard, cards: ICard[]) => [card, ...cards];
const removeFromTop = (cards: ICard[]) => cards.slice(1, cards.length);
const isCardMatched = (prevCard: ICard, currentCard: ICard) =>
  prevCard.cardRank === currentCard.cardRank;

export const getInitialState = (): IAppState => {
  const { userCards, computerCards } = dealCards();

  return {
    userCards,
    computerCards,
    openCards: [],
    waitForComputer: false,
    snapWaitTime: 5,
    cardMatched: false,
    finalWinner: '',
    currentRoundResult: '',
    nextTurn: PLAYER,
  };
};

export const onPlayerMove = (prevState: IAppState) => {
  if (prevState.finalWinner) {
    return prevState;
  }
  let cardMatched = false;
  const currentPlayedCard = prevState.userCards[0];
  const lastPlayedCard = prevState.openCards[0];
  if (!currentPlayedCard) {
    return {
      finalWinner: COMPUTER,
    };
  }
  if (lastPlayedCard) {
    cardMatched = isCardMatched(lastPlayedCard, currentPlayedCard);
  }
  let finalWinner = '';
  if (prevState.computerCards.length === 0) {
    finalWinner = PLAYER;
  }
  return {
    openCards: addToTop(currentPlayedCard, prevState.openCards),
    userCards: removeFromTop(prevState.userCards),
    waitForComputer: true,
    cardMatched,
    finalWinner,
    nextTurn: COMPUTER,
  };
};

export const onComputerMove = (prevState: IAppState) => {
  if (prevState.finalWinner) {
    return prevState;
  }
  let cardMatched = false;
  const lastPlayedCard = prevState.openCards[0];
  const currentPlayedCard = prevState.computerCards[0];

  if (!currentPlayedCard) {
    return { finalWinner: PLAYER };
  }

  if (lastPlayedCard) {
    cardMatched = isCardMatched(lastPlayedCard, currentPlayedCard);
  }
  let finalWinner = '';
  if (prevState.userCards.length === 0) {
    finalWinner = COMPUTER;
  }
  return {
    openCards: addToTop(currentPlayedCard, prevState.openCards),
    computerCards: removeFromTop(prevState.computerCards),
    waitForComputer: false,
    cardMatched,
    finalWinner,
    nextTurn: PLAYER,
  };
};

export const onComputerSnap = (prevState: IAppState) => {
  return {
    computerCards: [...prevState.computerCards, ...prevState.openCards],
    openCards: [],
    cardMatched: false,
    currentRoundResult: COMPUTER,
  }
};

export const onPlayerSnap = (prevState: IAppState) => {
  return {
    userCards: [...prevState.userCards, ...prevState.openCards],
    openCards: [],
    cardMatched: false,
    currentRoundResult: PLAYER,
  }
};
