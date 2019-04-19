import { IAppState, dealCards, ICard, COMPUTER, PLAYER } from "./App.config";

const addToTop = (card: ICard, cards: ICard[]) => [card, ...cards];
const removeFromTop = (cards: ICard[]) => cards.slice(1, cards.length);
const isCardMatched = (prevCard: ICard, currentCard: ICard) =>
  prevCard.cardRank === currentCard.cardRank;

export const getInitialState = (): IAppState => {
  const { playerCards: playerCards, computerCards } = dealCards();

  return {
    playerCards,
    computerCards,
    openCards: [],
    waitForComputer: false,
    snapWaitTime: 1,
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
  const currentPlayedCard = prevState.playerCards[0];
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
    playerCards: removeFromTop(prevState.playerCards),
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
  if (prevState.playerCards.length === 0) {
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

export const onComputerSnap = (prevState: IAppState) => ({
    computerCards: [...prevState.computerCards, ...prevState.openCards],
    openCards: [],
    cardMatched: false,
    currentRoundResult: COMPUTER,
  });

export const onPlayerSnap = (prevState: IAppState) => ({
    playerCards: [...prevState.playerCards, ...prevState.openCards],
    openCards: [],
    cardMatched: false,
    currentRoundResult: PLAYER,
  });
