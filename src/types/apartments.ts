export interface Apartments {
  created_at: string;
  description: string;
  discount: number;
  id: number;
  image: string;
  maxCapacity: number;
  name: string;
  regularPrice: number;
}

export interface FormData {
  description: string;
  discount: number;
  image: string;
  maxCapacity: number;
  name: string;
  regularPrice: number;
}
