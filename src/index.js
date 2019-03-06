import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './app/App';
import * as serviceWorker from './serviceWorker';
import * as io from 'socket.io-client'
import SocketContext from './app/context/SocketContext'

const socket = io(`${process.env.REACT_APP_SOCKET}`, {
  path: '/live'
})

ReactDOM.render(
  <SocketContext.Provider value={socket}>
    <App />
  </SocketContext.Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
