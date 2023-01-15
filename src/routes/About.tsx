import { Link, Text, Title2 } from "@fluentui/react-components";

export default function About() {
  return (
    <main className="aboutPage">
      <Title2>What is this?</Title2>
      <Text>
        A extremely fast and simple website, sending TTC&#39;s ETA data straight
        to you.
      </Text>
      <Title2>Where do they come from?</Title2>
      <Text>From City of Toronto&#39;s Open Data Catalogue:</Text>{" "}
      <Link href="https://open.toronto.ca/dataset/ttc-real-time-next-vehicle-arrival-nvas/">
        https://open.toronto.ca/dataset/ttc-real-time-next-vehicle-arrival-nvas/
      </Link>
      <Text>(It is way harder to parse than it looks)</Text>
      <Title2>But it&#39;s not accurate! / it&#39;s missing a bus!</Title2>
      <Text>Well tell that to TTC! I&#39;m just the messenger.</Text>
      <Title2>Why do all this?</Title2>
      <Text>
        Basically I don&#39;t like how most apps function. I just want to know
        when my bus arrive and nothing else.
      </Text>
      <Text>Also, it&#39;s fun to try out the latest code stuff I learnt!</Text>
      <Text>
        Huge thanks to <Link href="https://hkbus.app/en">HKBus ETA</Link> for
        inspiring me to do this.
      </Text>
      <Title2>Can I help?</Title2>
      <Text>
        Yes please! Head{" "}
        <Link href="https://github.com/thomassth/ttc-bus-eta">here</Link> and
        leave a pull request / feature request / give me a million dollar
        buyout.
      </Text>
    </main>
  );
}
