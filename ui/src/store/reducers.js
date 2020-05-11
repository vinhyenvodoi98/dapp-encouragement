import * as connect from './actions';

import dappConstants from 'conf/dappConstants';

const instanceId = dappConstants.INSTANCE_REG_KEY;

const initialState = {
  active: false,
  connected: false,
  account: null,
  purses: [],
  instanceId,
  numEncouragements: 0,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case connect.SERVER_CONNECTED:
      return {
        ...state,
        connected: action.connected,
      };
    case connect.ACTIVATE_CONNECTION:
      return {
        ...state,
        active: action.active,
      };
    case connect.UPDATE_PURSES:
      return {
        ...state,
        purses: action.purses,
      };
    case connect.UPDATE_NUM_ENCOURAGEMENTS:
      return {
        ...state,
        numEncouragements: action.numEncouragements,
      };
    case connect.RESET_STATE:
      return {
        ...state,
        active: false,
        connected: false,
        account: null,
        purses: [],
        numEncouragements: 0,
      };

    default:
      return state;
  }
};

export default rootReducer;
