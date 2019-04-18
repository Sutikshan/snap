import shuffle from 'lodash.shuffle';

const SUIT_LENGTH = 13;
const DECK_SIZE = 52;
const USER_SHARE = DECK_SIZE / 2;
export const COMPUTER = 'Computer';
export const PLAYER = 'Player';

export enum CARD_SUIT {
  club = 'CLUB',
  diamond = 'DIAMOND',
  heart = 'HEART',
  spade = 'SPADE',
}

export const CARD_SIZE = {
  width: '15em',
  height: '20em',
};

export interface ICard {
  cardSuit: CARD_SUIT,
  cardRank: number,
}

export interface IDealtCards {
  userCards: ICard[],
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

const createDeckForSuit = (cardSuit: CARD_SUIT): ICard[] => {
  const cardSuitCollection: ICard[] = [];
  for (var i = 1; i <= SUIT_LENGTH; i++) {
    cardSuitCollection.push({ cardRank: i + 1, cardSuit })
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
    userCards: shuffleCards.slice(0, USER_SHARE),
    computerCards: shuffleCards.slice(26, DECK_SIZE),
  };
}
