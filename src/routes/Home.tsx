import { Button, Input } from "@fluentui/react-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Bookmark from "../features/bookmarks/bookmark";

export default function Home() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const goto = (input: string) => {
    navigate("lines/" + input);
  };

  return (
    <main>
      <form className="searchBlock">
        <Input
          value={input}
          onChange={(e) => setInput(e.currentTarget.value)}
          aria-label="enter a line number"
          placeholder="enter a line number"
        />
        <Button appearance="primary" type="submit" onClick={() => goto(input)}>
          Search
        </Button>
      </form>
      <Bookmark />
    </main>
  );
}
