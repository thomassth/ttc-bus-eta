export const fetchBus = (line: number = 1) => {
  let ans = "";
  fetch("http://webservices.umoiq.com/service/publicXMLFeed?command=routeConfig&a=ttc&r=501",{
      method: "GET",
      credentials: 'omit',
      headers: {
        'Content-Type': 'text/xml',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .then(response => {
      response.text()
    }).then(str => {
      return new window.DOMParser().parseFromString(str, "text/xml");
    })
    .then(data => {
      return console.log(data);
    });
  return ans;
};