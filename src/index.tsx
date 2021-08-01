import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

async function bootstrap() {
  if (process.env.NODE_ENV === 'development') {
    const { worker } = require('./servers/dev-server');
    await worker.start({
      onUnhandledRequest: 'bypass',
    });
  }

  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root'),
  );
}

bootstrap();
