import { Button, Input, Text } from "@fluentui/react-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LineSearch() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const goto = (input: string) => {
    navigate(input);
  };

  return (
    <main>
      <form>
        <Text>Enter a line number:</Text>
        <div className="searchBlock">
          <Input
            value={input}
            onChange={(e) => setInput(e.currentTarget.value)}
          />
          <Button
            appearance="primary"
            onClick={() => goto(input)}
            type="submit"
          >
            Search
          </Button>
        </div>
      </form>
    </main>
  );
}
