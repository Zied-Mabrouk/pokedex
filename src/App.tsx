import React from 'react';
import { useApollo } from './hooks/useApollo';
import { ApolloProvider } from '@apollo/client';
import Home from './components/modules/Home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
  const client = useApollo();
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/:id',
      element: <div />,
    },
  ]);
  return (
    <ApolloProvider client={client}>
      <div className="bg-background">
        <RouterProvider router={router} />
      </div>
    </ApolloProvider>
  );
}

export default App;
