import { useState } from "react";


const usePagination = (moviesCount: number) => {

  console.log('[MOVIES COUNT]', moviesCount)
  const [skip, setSkip] = useState<number>(0);
  const [take, setTake] = useState<number>(10);

  const disablePrev = skip - take < 0;

  const disableNext = skip + take >= moviesCount;
  const nextPage = () => {
    if (disableNext) return;
    setSkip(skip + take);
  }

  const prevPage = () => {
    if (disablePrev) return;
    setSkip(skip - take);
  }

  return {
    skip,
    take,
    nextPage,
    prevPage,
    disablePrev,
    disableNext
  }
}

export default usePagination;