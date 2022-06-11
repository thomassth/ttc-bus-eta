import { Text } from '@fluentui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home(props: any) {

  const [input, setInput] = useState('')
  let navigate = useNavigate();

  const goto = (input: string) => {
    navigate("lines/" + input)
  }

  return (
    <main style={{ padding: "1rem" }}>
      <Text>Saved lists will go here </Text>
    </main>
  )
}
