import React from 'react';
import ReactDOM from 'react-dom';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import App from './app/App';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

(async () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        refetchOnMount: true,
      },
    },
  });

  const rootEl = document.getElementById('root');

  const render = (Component: any, el: HTMLElement | null) => {
    ReactDOM.render(
      <QueryClientProvider client={queryClient}>
        <Component />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>,
      el
    );
  };

  render(App, rootEl);
})();
