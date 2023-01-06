interface Response {
  data: string;
  error: Error | null;
}

export function FetchWithCancelToken(
  url: string,
  signal: AbortSignal
): Response {
  let data: string = "";
  let error: Error | null = null;
  fetch(url, {
    signal,
    method: "GET",
  })
    .then((response) => {
      response.text().then((str) => {
        data = str;
      });
    })
    .catch((e: Error) => {
      console.log("failed: ", error);
      error = e;
    });

  return { data, error };
}
