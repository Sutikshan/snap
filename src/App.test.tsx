import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import HiddenCardStack from './HiddenCardStack';
import { shallow } from 'enzyme';
import { IAppState, COMPUTER, PLAYER } from './App.config';

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App
      computerPlayWaitTime={1000}
      computerSnapWaitTime={1000}
    />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('on click of player it move card from player stack to open-stack and computer plays afterwards', () => {
    const app = shallow(<App computerPlayWaitTime={0} computerSnapWaitTime={0} />);
    // find player stack
    const playerHiddenStack = app.find('.cardSetup').first()
    .find(HiddenCardStack).last().dive();

    playerHiddenStack.find('.hiddenCardContainer').first().simulate('click');

    const appState = app.instance().state as IAppState;

    expect(appState.playerCards.length).toBe(25);
    expect(appState.openCards.length).toBe(1);
    expect(appState.nextTurn).toBe(COMPUTER);
    expect(appState.cardMatched).toBeFalsy;


    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const appStateAfterComputerPlays = app.instance().state as IAppState;

        expect(appStateAfterComputerPlays.computerCards.length).toBe(25);
        expect(appStateAfterComputerPlays.openCards.length).toBe(2);
        expect(appStateAfterComputerPlays.nextTurn).toEqual(PLAYER);
        resolve();
      }, 0);
    });
  });
});
