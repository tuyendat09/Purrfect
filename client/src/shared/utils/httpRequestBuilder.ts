/* eslint-disable @typescript-eslint/no-explicit-any */
type Method = "GET" | "POST" | "PUT" | "DELETE";
type Headers = Record<string, string>;

export const createRequest = <
  B = any, // body
  Q extends Record<string, any> = Record<string, any> // query
>(
  baseUrl = ""
) => {
  let method: Method = "GET";
  let headers: Headers = {};
  let body: B | null = null;
  let path = "";
  let query: Q = {} as Q;

  const builder = { 
    setMethod(m: Method) {
      method = m;
      return builder;
    },
    setPath(p: string) {
      path = p;
      return builder;
    },
    setHeaders(h: Headers) {
      headers = { ...headers, ...h };
      return builder;
    },
    setBody(b: B) {
      body = b;
      return builder;
    },
    setQuery(q: Q) {
      query = { ...query, ...q };
      return builder;
    },
    async send<R>(): Promise<R> {
      const url = new URL(path, baseUrl);
      if (Object.keys(query).length) {
        url.search = new URLSearchParams(query as any).toString();
      }

      const isFormData =
        typeof FormData !== "undefined" && body instanceof FormData;

      const response = await fetch(url.toString(), {
        method,
        headers: isFormData
          ? headers
          : { "Content-Type": "application/json", ...headers },
        credentials: "include",
        body:
          method !== "GET" && body
            ? isFormData
              ? body
              : JSON.stringify(body)
            : undefined,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData?.message || "Something wrong :(";
        throw new Error(errorMessage);
      }

      return response.json() as Promise<R>;
    },
  };

  return builder;
};
