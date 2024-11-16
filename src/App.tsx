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
  ]);
  return (
    <ApolloProvider client={client}>
      <div className="bg-background min-h-screen">
        <RouterProvider router={router} />
      </div>
    </ApolloProvider>
  );
}

export default App;
