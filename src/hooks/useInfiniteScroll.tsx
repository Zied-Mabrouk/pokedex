import { useQuery } from '@apollo/client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

type Params<T> = {
  query: any;
  queryVariables?: any;
  items: T[];
  setItems: (items: T[]) => void;
  limit: number;
  offset: number;
  parser: (items: T[]) => T[];
};

export const useInfiniteScroll = <T extends any>({
  query,
  queryVariables,
  items,
  setItems,
  limit,
  offset,
  parser,
}: Params<T>) => {
  const { ref, inView } = useInView();

  const parentRef = useRef<HTMLDivElement>(null);
  const [hasMore, setHasMore] = useState(true);

  const { networkStatus, error, fetchMore, loading, refetch } = useQuery(
    query,
    {
      notifyOnNetworkStatusChange: true,
      variables: {
        ...queryVariables,
        limit,
        offset,
      },
      onCompleted: (data) => {
        setItems(parser(Object.values(data)[0] as any as T[]));
        if ((Object.values(data)[0] as T[]).length < limit) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
      },
      onError: (error) => {
        console.error(error);
      },
    }
  );
  const loadMore = useCallback(async () => {
    if (!hasMore) return;
    const result = await fetchMore({
      variables: {
        offset: items.length,
        limit,
      },
    });
    const resultData = Object.values(result.data)[0] as T[];
    setItems([...items, ...parser(resultData)]);
  }, [fetchMore, items, limit, setItems, hasMore, parser]);

  useEffect(() => {
    if (inView && hasMore) {
      loadMore();
    }
  }, [inView, hasMore, loadMore]);

  // New useEffect hook to monitor height of parent container vs. viewport
  useEffect(() => {
    if (parentRef.current && hasMore) {
      const parentHeight = parentRef.current.getBoundingClientRect().height;
      const viewportHeight = window.innerHeight;

      if (parentHeight < viewportHeight) {
        loadMore();
      }
    }
  }, [items, hasMore, loadMore]); // Re-check every time items change

  return {
    networkStatus,
    error,
    ref,
    loading,
    fetchMore,
    refetch,
    parentRef,
  };
};
