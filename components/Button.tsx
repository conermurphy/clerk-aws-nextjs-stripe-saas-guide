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
    if (BUTTON_CLICKS_LIMIT !== -1 && currentClicks >= BUTTON_CLICKS_LIMIT) {
      setIsLimitReached(true);
    }
  }, [currentClicks, BUTTON_CLICKS_LIMIT]);

  const limitLabel =
    BUTTON_CLICKS_LIMIT === -1 ? 'Unlimited' : BUTTON_CLICKS_LIMIT;

  return (
    <>
      <div className="flex flex-col-reverse md:flex-row justify-between items-center text-xl gap-4 md:gap-0">
        <p>
          Current Clicks Used:{' '}
          <span className="font-bold">
            {currentClicks}/{limitLabel}
          </span>
        </p>
        <button
          type="button"
          onClick={handleClick}
          disabled={isLimitReached}
          className="border-blue-400 text-blue-600 hover:bg-blue-200 duration-150 ease-in-out border-2 px-3 py-2 rounded-md font-bold disabled:text-red-600 disabled:border-red-600 disabled:bg-red-200 disabled:cursor-not-allowed"
        >
          Click Me
        </button>
      </div>
      {isLimitReached ? (
        <p className="bg-amber-200 border-amber-400 border-2 text-amber-600 p-4 rounded-md md:text-lg font-bold">
          {limitReachedMessage}
        </p>
      ) : null}
    </>
  );
}
