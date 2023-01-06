import { XMLParser } from "fast-xml-parser";

interface CustomizedXMLResponse {
  data: string;
  parsedData: unknown;
  error?: Error;
}

export async function FetchXMLWithCancelToken(
  url: string,
  options: RequestInit
): Promise<CustomizedXMLResponse> {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
  });
  try {
    const response = await fetch(url, options);
    const data = await response.text();
    const parsedData = parser.parse(data);
    return { data, parsedData };
  } catch (e: any) {
    return { data: "", parsedData: "", error: Error(e) };
  }
}
