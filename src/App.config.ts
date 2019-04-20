export const DECK_SIZE = 52;
export const SUIT_LENGTH = 13;
export const USER_SHARE = DECK_SIZE / 2;
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

export interface IAppProps {
  computerPlayWaitTime: number;
  computerSnapWaitTime: number;
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
