export interface Jewelry {
  id: number;
  jwelerry_name: string;
  jwelerry_price: string;
  jwelerry_description: string;
  jwelerry_details: string[];
  jwelerry_category: string;
  image_url: string[];
  isNew?: boolean;
}

export interface Category {
  id: number;
  category: string;
}

export interface ShopProps {
  showMorevisible?: boolean;
  category?: string;
}