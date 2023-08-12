'use client';

import useSWR from 'swr';
import { useEffect, useState } from 'react';
import { fetcher } from '@/config';

interface IProps {
  limit: number;
  current: number;
}

export default function Button({ limit, current }: IProps) {
  const [isLimitReached, setIsLimitReached] = useState(false);

  const { data: currentClicks, mutate } = useSWR(
    '/api/clicks',
    fetcher<number>,
    {
      fallbackData: current,
    }
  );

  async function handleClick() {
    await fetch('/api/clicks', {
      method: 'POST',
    });
    await mutate();
  }

  useEffect(() => {
    if (currentClicks >= limit) {
      setIsLimitReached(true);
    }
  }, [currentClicks, limit]);

  const limitLabel = limit === -1 ? 'Unlimited' : limit;

  return (
    <>
      <p>
        Current Clicks Used: {currentClicks}/{limitLabel}
      </p>
      <button
        type="button"
        onClick={handleClick}
        disabled={limit !== -1 && currentClicks >= limit}
        className="disabled:text-red-400"
      >
        Click Me
      </button>
      {isLimitReached ? (
        <p>
          You have reached the limit of clicks for your plan, please upgrade to
          a paid plan below.
        </p>
      ) : null}
    </>
  );
}
