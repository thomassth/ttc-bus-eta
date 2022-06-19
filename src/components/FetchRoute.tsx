import { DetailsRow, GroupedList, IColumn, IconButton, IGroup, initializeIcons, Text } from "@fluentui/react";
import { useEffect, useState } from "react";
import { boldStyle } from "../styles/fluent";
initializeIcons();
const { XMLParser } = require('fast-xml-parser');

function RouteInfo(props: any): JSX.Element {
  const [data, setData] = useState<any>()
  const [lineNum] = useState(props.line)
  const [stopDb, setStopDb] = useState<{ id: any; name: any; latlong: any[]; stopId: any; }[]>([])

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
          console.log(dataJson);
          setStopDb(createStopDb(dataJson))
          console.log(stopDb)
        });
    })
  }

  function createStopList(json: any) {
    let result: { id: any; name: any; latlong: any | undefined; stopId: any; }[] = []
    json.stop.map((element: any, index: number) => {
      const matchingStop = stopDb.find(searching =>
        parseInt(element["@_tag"]) === parseInt(searching["id"])
      )
      result.push({
        id: matchingStop?.id,
        name: matchingStop?.name,
        latlong: <IconButton
          // menuProps={menuProps}
          iconProps={{ iconName: "MapPin" }}
          title="MapPin"
          ariaLabel="Emoji"
          href={`http://maps.google.com/maps?z=12&t=m&q=loc:${matchingStop?.latlong[0]}+${matchingStop?.latlong[1]}`}
        // disabled={disabled}
        // checked={checked}
        />
        ,
        stopId: <IconButton
          iconProps={{ iconName: "View" }}
          href={`../stops/${matchingStop?.stopId}`}
        />
      })
      return element
    })
    return result
  }

  useEffect(() => {
    fetchBus()
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function fetchBusClick(): void {
    fetchBus()
  }

  if (data != null) {
    if (data.body.Error === undefined) {
      return (
        <div className="directionList list">
          {data.body.route.direction.map((element: any, index: number) => {
            const list = createStopList(element)

            return (
              <div className="direction list" key={`${index}`}>
                <GroupedList
                  items={list}
                  // eslint-disable-next-line react/jsx-no-bind
                  onRenderCell={stopRow}
                  groups={[{
                    name: element["@_title"],
                    key: `group${index}`,
                    startIndex: 0,
                    count: list.length
                  }]}
                  compact={true}
                />
                {/* <Text>{element["@_title"]}</Text>
                {element.stop.map((element: any, index2: number) => {
                  return (
                    <Text key={`${index}-${index2}`}>
                      {element["@_tag"]}
                    </Text>
                  )
                })} */}
              </div>)
          })}
        </div>
      )
    }
    else
    // if(data.body.Error !== undefined)
    {
      return (
        <div onClick={fetchBusClick}>
          <Text variant="xxLarge" styles={boldStyle}>
            Cannot locate this route.
          </Text>
        </div>)
    }
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

function createStopDb(json: any): { id: any; name: any; latlong: any[]; stopId: any; }[] {
  let result: { id: any; name: any; latlong: any[]; stopId: any; }[] = []
  json.body.route.stop.map((element: any) => {

    if(element["@_stopId"]===undefined){
      console.log(element)
    } else 
    result.push({
      id: element["@_tag"],
      name: element["@_title"],
      latlong: [element["@_lat"], element["@_lon"]],
      stopId: element["@_stopId"]
    })
    return element
  })
  return result
}

const stopRow = (
  nestingDepth?: number,
  item?: any,
  itemIndex?: number,
  group?: IGroup,
): React.ReactNode => {
  return item && typeof itemIndex === 'number' && itemIndex > -1 ? (
    <DetailsRow
      id={item["id"]}
      columns={stopItems}
      item={item}
      itemIndex={itemIndex}
      compact={true}
      group={group}
    />
  ) : null;
};

const stopItems = Object.keys({
  latlong: [0, 0],
  stopId: 0,
  name: '',
}).map(
  (key: string): IColumn => ({
    key: key,
    name: key,
    fieldName: key,
    minWidth: 300,
  }),
);