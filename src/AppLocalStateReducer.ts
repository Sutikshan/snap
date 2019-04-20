import { IAppState, ICard, COMPUTER, PLAYER, CARD_SUIT, SUIT_LENGTH, IDealtCards, USER_SHARE, DECK_SIZE } from "./App.config";
import shuffle from 'lodash.shuffle';

const addToTop = (card: ICard, cards: ICard[]) => [card, ...cards];
const removeFromTop = (cards: ICard[]) => cards.slice(1, cards.length);
const isCardMatched = (prevCard: ICard, currentCard: ICard) =>
  prevCard.cardRank === currentCard.cardRank;

const cardRanks = ['A', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];

const createDeckForSuit = (cardSuit: CARD_SUIT): ICard[] => {
  const cardSuitCollection: ICard[] = [];
  for (var i = 0; i < SUIT_LENGTH; i++) {
    cardSuitCollection.push({ cardRank: cardRanks[i] , cardSuit })
  }
  return cardSuitCollection;
};

function dealCards(): IDealtCards {
  const freshDeck:ICard[] = [...createDeckForSuit(CARD_SUIT.club),
    ...createDeckForSuit(CARD_SUIT.diamond),
    ...createDeckForSuit(CARD_SUIT.heart),
    ...createDeckForSuit(CARD_SUIT.spade)
  ];
  const shuffleCards = shuffle(freshDeck);

  return {
    playerCards: shuffleCards.slice(0, USER_SHARE),
    computerCards: shuffleCards.slice(26, DECK_SIZE),
  };
}

export const getInitialState = (): IAppState => {
  const { playerCards: playerCards, computerCards } = dealCards();

  return {
    playerCards,
    computerCards,
    openCards: [],
    waitForComputer: false,
    snapWaitTime: 5,
    cardMatched: false,
    finalWinner: '',
    currentRoundResult: '',
    nextTurn: shuffle([PLAYER, COMPUTER])[0],
  };
};

export const onPlayerMove = (prevState: IAppState) => {
  if (prevState.finalWinner) {
    return prevState;
  }

  const currentPlayedCard = prevState.playerCards[0];
  const lastPlayedCard = prevState.openCards[0];

  let cardMatched = false;
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
