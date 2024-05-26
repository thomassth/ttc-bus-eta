import { Button } from "@fluentui/react-components";
import { Comment24Filled } from "@fluentui/react-icons";
import { Link } from "react-router-dom";

export default function SMSButton(props: { stopId: number }) {
  return (
    <Link to={`sms://+1898882;?&body=${props.stopId}`} title="SMS">
      <Button icon={<Comment24Filled />}>check via SMS</Button>
    </Link>
  );
}
