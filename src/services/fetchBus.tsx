export const fetchBus = (line: number = 501) => {
  let ans;
  return fetch(`https://webservices.umoiq.com/service/publicXMLFeed?command=routeConfig&a=ttc&r=${line}`, {
    method: "GET",
  })
    .then(response => {
      response.text()
        .then(str => {
          ans = new window.DOMParser().parseFromString(str, "text/xml")
          console.log(ans)
        })
    })
};