import shuffle from 'lodash.shuffle';

const SUIT_LENGTH = 13;
const DECK_SIZE = 52;
const USER_SHARE = DECK_SIZE / 2;
export const COMPUTER = 'Computer';
export const PLAYER = 'Player';

export enum CARD_SUIT {
  club = 'club',
  diamond = 'diamond',
  heart = 'heart',
  spade = 'spade',
}

export interface ICard {
  cardSuit: CARD_SUIT,
  cardRank: string | number,
}

export interface IDealtCards {
  playerCards: ICard[],
  computerCards: ICard[],
}

export interface IAppState extends IDealtCards {
  openCards: ICard[],
  waitForComputer: boolean;
  snapWaitTime: number;
  cardMatched: boolean;
  finalWinner: string;
  currentRoundResult: string;
  nextTurn: string;
}
const cardRanks = ['A', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];

const createDeckForSuit = (cardSuit: CARD_SUIT): ICard[] => {
  const cardSuitCollection: ICard[] = [];
  for (var i = 0; i < SUIT_LENGTH; i++) {
    cardSuitCollection.push({ cardRank: cardRanks[i] , cardSuit })
  }
  return cardSuitCollection;
};

export function dealCards(): IDealtCards {
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

export interface ICardDeckStyle {
  boxShadow: string;
  backgroundColor: string;
}

export function getCardStackStyle(availableCardCount: number, openCard?: boolean): ICardDeckStyle {
  const shadowThickness = Math.floor(availableCardCount/3);
  const boxShadow = `${shadowThickness}px ${shadowThickness}px 5px darkgrey`;
  const backgroundColor = !availableCardCount || openCard ? 'white' : 'cornflowerblue';

  return { boxShadow, backgroundColor };
}
