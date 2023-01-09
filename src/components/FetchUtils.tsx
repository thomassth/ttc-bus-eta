import { xmlParser } from "./parser/parserUtils";

export async function FetchXMLWithCancelToken(
  url: string,
  options: RequestInit
) {
  try {
    const response = await fetch(url, options);
    const data = await response.text();
    const parsedData = xmlParser.parse(data);
    return { data, parsedData };
  } catch (e: any) {
    return { data: "", parsedData: undefined, error: Error(e) };
  }
}
