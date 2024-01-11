// BU HOOK SADECE SİLME İŞLEMİ İÇİN İŞLEM YAPACAĞINDAN YİNE KENDİNE AİT DOSYADA YER ALIR
// ANCAK DAHA GENEL KULLANIMA SAHİP OLAN BİR HOOK OLSAYDI SRC ALTINDAKİ HOOKS KLASÖRÜNE ALINABİLİRDİ

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinAPI } from "../../services/apiCabins";
import { toast } from "react-hot-toast";

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: (id) => deleteCabinAPI(id),
    // AŞAĞIDAKİ YAZIM DA DOĞRUDUR
    // mutationFn: deleteCabin,
    // MUTATION İŞLEMİ(BURADA SİLME OLUYOR) TAMAMLANDIKTAN SONRA CACHE İÇERİSİNDEKİ VERİYİ INVALIDATE HALE GETİRMEK İÇİN AŞAĞIDAKİ YAPI KULLANILIR
    // VERİ INVALID OLUNCA REACT QUERY TARAFINDAN TEKRAR GÜNCEL VERİ FETCH EDİLECEKTİR, BUNUN İÇİN DE QUERYCLIENT'IN KULLANILMASI GEREKİR, BU NEDENLE USEQUERY HOOK'U KULLANILIR
    onSuccess: () => {
      toast.success("Cabin successfully deleted!");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteCabin };
}
