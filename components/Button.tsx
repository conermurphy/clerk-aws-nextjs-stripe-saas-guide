'use client';

import useSWR from 'swr';
import { useEffect, useState } from 'react';
import { fetcher } from '@/config';
import { IPlan } from '@/types';

interface IProps {
  plan: IPlan;
  current: number;
}

export default function Button({ plan, current }: IProps) {
  const [isLimitReached, setIsLimitReached] = useState(false);

  const { BUTTON_CLICKS: BUTTON_CLICKS_LIMIT } = plan.LIMITATIONS;

  const limitReachedMessage =
    plan.TIER === 'PRO'
      ? 'You have reached the limit of clicks for the pro plan, please upgrade to the premium plan below to keep clicking.'
      : 'You have reached the limit of clicks for the free plan, please upgrade to a paid plan below to keep clicking.';

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
    if (currentClicks >= BUTTON_CLICKS_LIMIT) {
      setIsLimitReached(true);
    }
  }, [currentClicks, BUTTON_CLICKS_LIMIT]);

  const limitLabel =
    BUTTON_CLICKS_LIMIT === -1 ? 'Unlimited' : BUTTON_CLICKS_LIMIT;

  return (
    <>
      <p>
        Current Clicks Used: {currentClicks}/{limitLabel}
      </p>
      <button
        type="button"
        onClick={handleClick}
        disabled={
          BUTTON_CLICKS_LIMIT !== -1 && currentClicks >= BUTTON_CLICKS_LIMIT
        }
        className="disabled:text-red-400"
      >
        Click Me
      </button>
      {isLimitReached ? <p>{limitReachedMessage}</p> : null}
    </>
  );
}
