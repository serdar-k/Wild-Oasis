import supabase from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded!");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const supabaseURL = "https://dcsupusieeeicxfqgkwc.supabase.co";
  const hasImagePath = newCabin.image?.startsWith?.(supabaseURL);

  // https://dcsupusieeeicxfqgkwc.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  const imageName = `${Math.random()}-${newCabin.image.name}`.replace("/", "");
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseURL}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");

  // CABIN OLUŞTURULACAKSA ID'NIN OLMADIĞI BLOĞA GİRİLİR
  if (!id) {
    // NEWCABIN OBJESİ FORM ARACILIĞI İLE ALINAN VE BİR CABIN'E AİT BİLGİLERİ İÇEREN BİR OBJEDİR
    // VE BU OBJENİN KEY DEĞERLERİ, SUPABASE'DE TABLO İÇERİSİNDE TUTULAN ALAN İSİMLERİ İLE AYNIDIR, ÇÜNKÜ FORM ÜZERİNDEN BUNA DİKKAT EDİLEREK ALINDI
    // BU NEDENLE INSERT METODU İÇERİSİNDEKİ ARRAY'A SADECE NEWCABIN OBJESİNİN VERİLMESİ YETERLİDİR
    // AKSİ TAKDİRE AŞAĞIDA YORUM SATIRINA ALINMIŞ OLAN INSERT METODUNDA OLDUĞU GİBİ COLUMN İSMİ İLE FORMDAN ALINAN VERİNİN EŞLEŞTİRİLMESİ GEREKECEKTİ
    query = query.insert([{ ...newCabin, image: imagePath }]);
    // .insert([{ some_column: "someValue", other_column: "otherValue" }])
  }

  // CABIN EDIT EDİLECEKSE ID OLAN BLOĞA GİRİLİR
  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }

  const { error, data } = await query.select().single();

  if (hasImagePath) return data;

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be edited!");
  }

  // UPLOAD IMAGE
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // IMAGE UPLOAD EDERKEN BİR HATA OLURSA, ONUNLA İLGİLİ OLAN CABIN SİLİNECEK
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and cabin was not created!"
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted!");
  }

  return data;
}
