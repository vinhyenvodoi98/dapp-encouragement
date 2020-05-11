import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from 'store/actions';

import { activateWebSocket, deactivateWebSocket, doFetch } from 'utils/fetch-websocket';

export default function Application() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const { active } = state;

  useEffect(() => {
    function messageHandler(message) {
      if (!message) return;
      const { type, data } = message;
      if (type === 'walletUpdatePurses') {
        dispatch(actions.updatePurses(JSON.parse(data)));
      } else if (type === 'walletOfferAdded') {
        window.open('http://localhost:8000/wallet/?tipKind=tip');
      }
    }

    function walletGetPurses() {
      return doFetch({ type: 'walletGetPurses' }).then(messageHandler);
    }

    function walletGetOffers() {
      return doFetch({ type: 'walletSubscribeOffers', status: null });
    }

    if (active) {
      activateWebSocket({
        onConnect() {
          dispatch(actions.serverConnected(true));
          walletGetPurses();
          walletGetOffers();
        },
        onDisconnect() {
          dispatch(actions.serverConnected(false));
          dispatch(actions.resetState());
        },
        onMessage(message) {
          messageHandler(JSON.parse(message));
        },
      });
      return deactivateWebSocket;
    } else {
      deactivateWebSocket();
    }
  }, [active, dispatch]);

  const apiMessageHandler = useCallback(
    (message) => {
      if (!message) return;
      console.log('api >', message);
      const { type, data } = message;
      if (type === 'encouragement/getEncouragementResponse') {
        alert(data);
      } else if (type === 'encouragement/encouragedResponse') {
        dispatch(actions.updateNumEncouragements(data.count));
      }
    },
    [dispatch],
  );

  useEffect(() => {
    if (active) {
      activateWebSocket(
        {
          onConnect() {
            console.log('connected to API');
            doFetch(
              {
                type: 'encouragement/subscribeNotifications',
              },
              '/api',
            );
          },
          onDisconnect() {
            console.log('disconnected from API');
            dispatch(actions.serverConnected(false));
            dispatch(actions.resetState());
          },
          onMessage(message) {
            apiMessageHandler(JSON.parse(message));
          },
        },
        '/api',
      );
    } else {
      deactivateWebSocket('/api');
    }
  }, [active, dispatch, apiMessageHandler]);

  return <></>;
}
