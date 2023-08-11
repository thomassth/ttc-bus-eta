import { Link } from "react-router-dom";
import { fluentStyles } from "../../styles/fluent";
import { Button } from "@fluentui/react-components";
import { Comment24Filled } from "@fluentui/react-icons";

export default function SMSButton(props: { stopId: number }) {
    const fluentStyle = fluentStyles();
    return (
        <Link
            to={`sms://+1898882;?&body=${props.stopId}`}
            title="SMS"
        >
            <Button
                className={fluentStyle.refreshButton}
                icon={<Comment24Filled />}
            >
                use TTC SMS
            </Button></Link>
    );
}