export const ttcAlerts = {
  queryKey: ["bsky"],
  queryFn: async () => {
    const response = await fetch(
      "https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed?actor=ttcalerts.bsky.social"
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  },
  staleTime: 60 * 1000,
  refetchInterval: 60 * 1000,
};
