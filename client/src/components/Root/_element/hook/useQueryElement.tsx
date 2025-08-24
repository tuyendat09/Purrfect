import { handleGetElement } from "@/shared/apis/Element";
import { Element, GetELementQueryResponse } from "@/shared/types/ElementAPI";
import { useQuery } from "@tanstack/react-query";

export const useElementQuery = (id: string) => {
  const { data, isLoading, isError } = useQuery<GetELementQueryResponse>({
    queryKey: ["element", id],
    queryFn: () => handleGetElement({ id }),
    enabled: Boolean(id),
  });

  const element: Element | undefined = data?.element?.[0];

  return { element, isLoading, isError };
};
