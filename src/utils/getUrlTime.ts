const getUrlTime = () => {
  const searchParams = new URLSearchParams(location.search);
  const minutesParam = searchParams.get("minutes");
  const secondsParam = searchParams.get("seconds");
  const minutes = minutesParam !== null ? parseInt(minutesParam, 10) : 0;
  const seconds = secondsParam !== null ? parseInt(secondsParam, 10) : 0;

  if (minutes !== 0 || seconds !== 0) {
    return { minutes, seconds };
  }
  return { minutes: 0, seconds: 0 };
};

export default getUrlTime;
