const formatTime = (iso: string): string => {
  const pastMilliseconds = new Date(iso).getTime();
  const time = new Date(pastMilliseconds).toLocaleTimeString("ko-KR", {
    hour: "numeric", minute: "2-digit", second: undefined,
  });

  return time;
}

export default formatTime;