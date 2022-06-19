import { PrimaryButton, Text, TextField } from '@fluentui/react';
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
        <TextField
          value={input}
          onChange={(e) => setInput(e.currentTarget.value)}
          ariaLabel="enter a line number" placeholder="enter a line number"
        />
        <PrimaryButton type='submit' onClick={() => goto(input)}>Search</PrimaryButton>
      </form>
    </main>
  )
}
