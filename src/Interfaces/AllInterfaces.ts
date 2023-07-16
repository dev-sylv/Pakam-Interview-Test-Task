export interface UserData {
  name: string;
  email: string;
  password: string;
  accountNumber: number;
  phoneNumber: number;
  userName: string;
  verified: boolean;
  Amount: string;
  NotificationType: string;
  WalletBalance: string;
  OTP: string;
  TOKEN: string;
  wallet: {}[];
  history: {}[];
}

export interface WalletData {
  Owner: string;
  Date: string;
  Balance: number;
  credit: number;
  debit: number;
}

export interface HistoryData {
  message: string;
  transactionReference: number;
  transactionType: string;
}
