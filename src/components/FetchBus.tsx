import { Text } from "@fluentui/react";
import { useEffect, useState } from "react";
import { boldStyle } from "../styles/fluent";
const { XMLParser } = require('fast-xml-parser');
function LineInfo(props: any): JSX.Element {
  const [data, setData] = useState<any>()
  const [lineNum] = useState(props.line)
  const [text,setText]=useState('')

  const fetchBus = (line: any = lineNum) => {
    // let ans: Document;
    fetch(`https://webservices.umoiq.com/service/publicXMLFeed?command=routeConfig&a=ttc&r=${line}`, {
      method: "GET",
    }).then(response => {
      response.text()
        .then(str => {
          // ans = new window.DOMParser().parseFromString(str, "text/xml");
          // setData(str)
          const parser = new XMLParser({
            ignoreAttributes: false,
            attributeNamePrefix: "@_",
          });
          const dataJson = parser.parse(str)
          setData(dataJson);
          console.log(dataJson)
          // setText(`${data.body.route.direction[0]["@_title"] }`)
        });
    })
  }



  useEffect(() => {
    fetchBus()
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function fetchBusClick(): void {
    fetchBus()
  }

  if(data != null && data.body.Error !== undefined){
    return (
      <div onClick={fetchBusClick}>
        <Text variant="xxLarge" styles={boldStyle}>
          Cannot locate this route.
        </Text>
      </div>)
  } else 
  if (data != null && data.body.Error === undefined) {
    return (
      <div className="directionList list">        
        {data.body.route.direction.map((element:any,index:number)=>{
          return (<Text key={`${index}`}>{element["@_title"]}</Text>)
          }) }
      </div>
    )
  } else {
    return (
      <div onClick={fetchBusClick}>
        <Text variant="xxLarge" styles={boldStyle}>
          loading...
        </Text>
      </div>)
  }

};
export default LineInfo