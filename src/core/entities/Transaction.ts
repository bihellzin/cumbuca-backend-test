type Transaction = {
  id: string;
  sender?: User;
  senderId: string;
  recipient?: User;
  recipientId: string;
  processedAt: Date;
  createdAt: Date;
  amount: number;
};
