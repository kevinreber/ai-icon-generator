import React from "react";
import { useFetcher } from "@remix-run/react";

type Options = {
  /**
   * @description
   * Called after a remix `loader`  or `action` has succesfully completed.
   */
  onSuccess?: (loaderData: any) => void;
  /**
   * @description
   * Called after a remix `loader` or `action` has succesfully completed.
   */
  onError?: (loaderData: any) => void;
};

/**
 * @description
 * A superset of remix's `useFetcher` hook.
 * To determine if a `fetcher` call is successful, this currently
 * expects our loaders to return a JSON object of this shape:  { status: 'success | "error"; data: .. };
 * The `status` keyword in the JSON response is used to determin if an API call was successful or not.
 *
 * @example
 * const {fetcher} = useRemixFetcher((onSuccess: () => {..}, onError: () => {...}))
 */
export const useRemixFetcher = ({ onError, onSuccess }: Options = {}) => {
  const fetcher = useFetcher();
  const isLoadingFetcher = fetcher.state !== "idle";

  /**
   * @description
   * Monitor fetcher.state in order to determine when to fire `onSuccess`, `onError` callbacks
   *
   * 1.['idle']
   * 2.['idle'. 'loading'] --------------------------------------------> we are in a loading state
   * 3.['idle'. 'loading'] && transition.state === 'idle'  ------------> we've finished a submission
   *
   * NOTE:
   * After a fetcher has completed, `fetcher.type` value will be 'done' indefinetely.
   * If we do a any sort of `setState` call in our lifecyle methods (onSuccess, onError etc)
   * that triggers a component re-render and thereby our `useRemixFetcher` hook would get called again
   * and our lifecycle method's could get called again, when we don't want them to, due to re-rendering
   * from a setState call inside of any of the lifecycle hooks (onSuccess,onError etc).
   * Thus we need to keep the concept of a transition log to ensure our lifecycle hooks don't get called
   * again after the first time they are called.
   */
  React.useEffect(() => {
    // Handle calling onSuccess onError callcbacks
    // @ts-ignore
    if (onSuccess && fetcher?.data?.success === true) {
      onSuccess(fetcher.data);
      // @ts-ignore
    } else if (onError && fetcher?.data?.success === false) {
      onError(fetcher.data);
    }
  }, [fetcher.state]);

  return {
    fetcher,
    isLoadingFetcher,
  };
};
