export interface MenuItem {
  id: string;
  category: string;
  nameAz: string;
  nameEn: string;
  descriptionAz: string;
  descriptionEn: string;
  price: number;
  image: string;
  isPopular?: boolean;
  tags?: string[];
  weight?: string;   // e.g. "250q" or "350ml"
  calories?: number; // e.g. 320
}