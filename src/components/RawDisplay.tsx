import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Text,
} from "@fluentui/react-components";

export default function RawDisplay(props: { data: string }) {
  return (
    <Accordion collapsible>
      <AccordionItem value="raw">
        <AccordionHeader>View raw response</AccordionHeader>
        <AccordionPanel>
          <Text>{JSON.stringify(props.data, null, 4)}</Text>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
