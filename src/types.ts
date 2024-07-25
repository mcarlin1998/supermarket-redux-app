export interface ProductProps {
  description: string;
  id: number;
  name: string;
  price: number;
}
export interface BasketProps {
  description: string;
  id: number;
  name: string;
  price: number;
  quantity?: number | undefined;
  totalPrice?: number | undefined;
}
