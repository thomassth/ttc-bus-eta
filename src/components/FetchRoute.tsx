import { Text } from "@fluentui/react";
import { useEffect, useState } from "react";
import { boldStyle } from "../styles/fluent";
const { XMLParser } = require('fast-xml-parser');
function RouteInfo(props: any): JSX.Element {
  const [data, setData] = useState<any>()
  const [lineNum] = useState(props.line)

  const fetchBus = (line: any = lineNum) => {
    // let ans: Document;
    fetch(`https://webservices.umoiq.com/service/publicXMLFeed?command=routeConfig&a=ttc&r=${line}`, {
      method: "GET",
    }).then(response => {
      response.text()
        .then(str => {
          const parser = new XMLParser({
            ignoreAttributes: false,
            attributeNamePrefix: "@_",
          });
          const dataJson = parser.parse(str)
          setData(dataJson);
          console.log(dataJson)
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
          return (
          <div className="direction list" key={`${index}`}>
          <Text>{element["@_title"]}</Text>
          </div>)
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
export default RouteInfo