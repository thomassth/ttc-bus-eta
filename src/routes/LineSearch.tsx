// import { DefaultButton, Text, TextField } from '@fluentui/react';
import { Button, Input, Text } from '@fluentui/react-components';
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
        <Input
          value={input}
          onChange={(e) => setInput(e.currentTarget.value)}
        />
        <Button appearance='primary' onClick={() => goto(input)} type='submit'>Search</Button>
      </div>
      </form>
    </main>
  )
}
