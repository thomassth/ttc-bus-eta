import { Text } from "@fluentui/react";
import { useEffect, useState } from "react";


export default function CountdownGroup(props: any) {
    return (
        <div className="line" style={{ display: 'flex', flexDirection: 'column' ,padding:"1rem 0"}}>
            <Text variant="large">{props.obj.line}</Text>
            {props.obj.etas.map((el2: any,in2:number) =>
                <CountdownItem key={in2} obj={el2} />
            )}
        </div>
    )
}

function CountdownItem(props: any) {
    const [sec, setSec] = useState(props.obj.second)
    const [expired, setExpired] = useState(false)
    useEffect(() => {
        const timer = setTimeout(() => {
            setSec(sec - 1)
        }, 1000);
        if (sec < 0) {
            setExpired(true)
        }
        //Cleanup
        return () => clearTimeout(timer);
    }, [sec])
    return (
        <Text style={expired ? expiredStyle : {}}>{sec}s</Text>
    )
}


const expiredStyle = {
    color: 'red'
}