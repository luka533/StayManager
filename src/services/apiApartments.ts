import supabase from "./supabase";

import type { Apartments } from "../types/apartments";
import type { FormData } from "../types/apartments";

export async function getApartments(): Promise<Apartments[]> {
  const { data, error } = await supabase
    .from("apartments")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    throw new Error("Apartments could not be loaded");
  }

  return data;
}

export async function getApartment(id: number): Promise<Apartments> {
  const { data, error } = await supabase
    .from("apartments")
    .select("*")
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Apartment could not be loaded");
  }

  return data[0];
}

export async function deleteApartment(id: number): Promise<void> {
  const { error } = await supabase.from("apartments").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Apartment could not be deleted");
  }
}

export async function duplicateApartment(id: number): Promise<void> {
  const { data, error: errorSelecting } = await supabase
    .from("apartments")
    .select("*")
    .eq("id", id);

  const { description, discount, image, maxCapacity, name, regularPrice } =
    data && data.at(0);

  const newData: {
    created_at: string;
    description: string;
    discount: number;
    image: string;
    maxCapacity: number;
    name: string;
    regularPrice: number;
  } = {
    description,
    discount,
    image,
    maxCapacity,
    name,
    regularPrice,
    created_at: new Date().toISOString(),
    // no need for id (supabase includes it automatically)
  };

  const { error: errorInserting } = await supabase
    .from("apartments")
    .insert([newData]);

  if (errorSelecting || errorInserting) {
    console.error(errorInserting || errorSelecting);
    throw new Error("Apartment could not be duplicated");
  }
}

export async function editApartment(
  id: number,
  newData: Apartments
): Promise<void> {
  const { error } = await supabase
    .from("apartments")
    .update(newData)
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Apartment could not be edited");
  }
}

export async function addApartment(formData: FormData): Promise<void> {
  const { error } = await supabase
    .from("apartments")
    .insert([formData])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Apartment could not be added");
  }
}
