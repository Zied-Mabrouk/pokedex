import { ApolloClient, InMemoryCache } from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities';
import { useMemo } from 'react';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const useApollo = () => {
  return useMemo(() => {
    return new ApolloClient({
      uri: BASE_URL,
      cache: new InMemoryCache({
        typePolicies: {
          Query: {
            fields: {
              links: relayStylePagination(),
            },
          },
        },
      }),
    });
  }, []);
};
