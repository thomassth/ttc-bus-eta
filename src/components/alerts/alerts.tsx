import { useQuery } from "@tanstack/react-query";
import { formatDistanceStrict } from "date-fns";

export default function TtcAlertList() {
  const query = useQuery({
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
  });

  const dataArray = query.data?.feed.map((skeet) => (
    <li key={skeet.cid}>
      <p className="time">
        {formatDistanceStrict(new Date(), skeet.post.record.createdAt, {
          includeSeconds: true,
        })}{" "}
        ago:
      </p>
      <p className="content">{skeet.post.record.text}</p>
    </li>
  ));

  return (
    <div>
      <h1>Recent Service Alerts</h1>
      <p>
        Source:{" "}
        <a href="https://bsky.app/profile/ttcalerts.bsky.social">
          https://bsky.app/profile/ttcalerts.bsky.social
        </a>
      </p>
      <ul>{dataArray}</ul>
    </div>
  );
}
