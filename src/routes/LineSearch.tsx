import { DefaultButton, Text, TextField } from '@fluentui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LineSearch(props: any) {

  const [input, setInput] = useState('')
  let navigate = useNavigate();

  const goto = (input: string) => {
    navigate(input)
  }

  return (
    <main style={{ padding: "1rem" }}>
      <form>
      <Text>Enter a line number:</Text>
      <div className='searchBlock'>
        <TextField
          value={input}
          onChange={(e) => setInput(e.currentTarget.value)}
        />
        <DefaultButton onClick={() => goto(input)} type='submit'>Search</DefaultButton>
      </div>
      </form>
    </main>
  )
}
