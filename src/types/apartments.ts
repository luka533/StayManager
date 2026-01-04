export interface Apartments {
  created_at: string;
  description: string;
  discount: number;
  id: number;
  image: string;
  image2?: string;
  image3?: string;
  image4?: string;
  location: string;
  maxCapacity: number;
  name: string;
  regularPrice: number;
}

export interface FormData {
  description: string;
  discount: number;
  image: string;
  image2?: string;
  image3?: string;
  image4?: string;
  location: string;
  maxCapacity: number;
  name: string;
  regularPrice: number;
}
