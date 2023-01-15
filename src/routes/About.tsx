import { Button, Link, Text, Title2 } from "@fluentui/react-components";

export default function About() {
  return (
    <main className="aboutPage">
      <Title2>What is this?</Title2>
      <Text>
        A extremely fast and simple website, sending TTC&#39;s ETA data straight
        to you.
      </Text>
      <br />
      <Title2>Where do they come from?</Title2>
      <Text>From City of Toronto&#39;s Open Data Catalogue:</Text>{" "}
      <Link href="https://open.toronto.ca/dataset/ttc-real-time-next-vehicle-arrival-nvas/">
        https://open.toronto.ca/dataset/ttc-real-time-next-vehicle-arrival-nvas/
      </Link>
      <Text>(It is way harder to parse than it looks)</Text>
      <br />
      <Title2>But it&#39;s not accurate! / it&#39;s missing a bus!</Title2>
      <Text>Well tell that to TTC! I&#39;m just the messenger.</Text> <br />
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
      <br />
      <Title2>Can I help?</Title2>
      <Text>
        Yes please! Head{" "}
        <Link href="https://github.com/thomassth/ttc-bus-eta">here</Link> and
        leave a pull request / feature request / give me a million dollar
        buyout.
      </Text>
      <br />
      <Title2>Who made this?</Title2>
      <Text>
        Concepts, main dev: @thomassth
        <a
          className="linkButton"
          title="GitHub"
          href="https://github.com/thomassth"
        >
          <Button
            icon={
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="var(--colorNeutralForeground1)"
              >
                <title>GitHub</title>
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            }
            href="https://github.com/thomassth"
          />
        </a>
      </Text>
      <Text>
        Code and visual improvement, feedback: @HoiPangCHEUNG
        <a
          className="linkButton"
          title="GitHub"
          href="https://github.com/HoiPangCHEUNG"
        >
          <Button
            icon={
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="var(--colorNeutralForeground1)"
              >
                <title>GitHub</title>
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            }
          />
        </a>
      </Text>
      <Text>
        Code improvement: @vincentho13hk
        <a
          className="linkButton"
          title="GitHub"
          href="https://github.com/vincentho13hk"
        >
          <Button
            icon={
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="var(--colorNeutralForeground1)"
              >
                <title>GitHub</title>
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            }
          />
        </a>
      </Text>
      <Text>
        Especially useful tool:{" "}
        <Link href="https://deepsource.io/gh/thomassth/ttc-bus-eta">
          deepsource.io
        </Link>
      </Text>
    </main>
  );
}
