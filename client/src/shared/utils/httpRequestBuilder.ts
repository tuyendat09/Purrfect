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
  let body: B | any = null;
  let path = "";
  let query: Q = {} as Q;
  let revalidate: number | null = null;
  let tags: string[] = []; // 👈 thêm tags

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
    setCache(seconds: number) {
      revalidate = seconds;
      return builder;
    },
    setTags(t: string[]) {
      tags = [...t];
      return builder;
    },
    async send<R>(): Promise<R> {
      const url = new URL(path, baseUrl);
      if (Object.keys(query).length) {
        url.search = new URLSearchParams(query as any).toString();
      }

      const isFormData =
        typeof FormData !== "undefined" && body instanceof FormData;

      const fetchOptions: RequestInit & {
        next?: { revalidate?: number; tags?: string[] };
      } = {
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
      };

      // 👇 nếu có setCache hoặc setTags thì thêm next
      if (revalidate !== null || tags.length) {
        (fetchOptions as any).next = {
          ...(revalidate !== null ? { revalidate } : {}),
          ...(tags.length ? { tags } : {}),
        };
      }

      const response = await fetch(url.toString(), fetchOptions);

      const contentType = response.headers.get("Content-Type");
      const responseData = contentType?.includes("application/json")
        ? await response.json().catch(() => ({}))
        : {};

      if (!response.ok) {
        const error = new Error(
          responseData?.message || "Something went wrong"
        );
        (error as any).status = response.status;
        (error as any).response = responseData;
        throw error;
      }

      return responseData as R;
    },
  };

  return builder;
};
