type User = {
  id: string;
  fullName: string;
  cpf: string;
  balance: number;
  password: string;
  createdAt: Date;
  SentTransactions?: Transaction[];
  ReceivedTransactions?: Transaction[];
};
