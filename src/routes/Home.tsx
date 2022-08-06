import { Button, Input, Text } from '@fluentui/react-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home(props: any) {

  const [input, setInput] = useState('')
  let navigate = useNavigate();

  const goto = (input: string) => {
    navigate("lines/" + input)
  }

  return (
    <main style={{ padding: "1rem", display: "flex", flexDirection: "column" }}>
      <Text>You'll see saved lists here, in the FUTURE.</Text>
      <Text>For now, bookmark any pages with your line(s) on it.</Text>
      <form className='searchBlock'>
        <Input
          value={input}
          onChange={(e) => setInput(e.currentTarget.value)}
          aria-label="enter a line number" 
          placeholder="enter a line number"
        />
        <Button appearance='primary' type='submit' onClick={() => goto(input)}>Search</Button>
      </form>
    </main>
  )
}
