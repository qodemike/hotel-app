export interface PaymentIntentResponse {
  paymentIntentId: string;
  clientSecret: string;
  totalCost: number;
}
