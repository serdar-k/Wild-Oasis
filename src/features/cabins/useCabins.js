import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    // QUERYFN İÇİN VERİLEN FONKSİYON, BİR PROMISE DÖNMELİDİR
    queryFn: getCabins,
  });

  return { isLoading, cabins, error };
}
