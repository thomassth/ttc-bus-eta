import { xmlParser } from "../parser/parserUtils";

type RequestInit = globalThis.RequestInit;
export async function FetchXMLWithCancelToken(
  url: string,
  options: RequestInit
) {
  try {
    const response = await fetch(url, options);
    const data = await response.text();
    const parsedData = xmlParser.parse(data);
    console.log("data");
    console.log(parsedData);
    return { data, parsedData };
  } catch (e) {
    return { data: "", parsedData: undefined, error: Error(`${e}`) };
  }
}
