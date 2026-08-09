// const BASE_URL = 'https://paylo-service.onrender.com/api/v1';
const BASE_URL = 'https://paylo-service-vqtc.onrender.com/api/v1';
// const BASE_URL = 'http://172.31.224.1:8080/api/v1';

export interface LoginResponse {
  successMessage: string;
  token: string;
  user: {
    id: number;
    otp: string | null;
    isverified: boolean;
    name: string | null;
    profile_image: string | null;
    user_type: string;
    phone: string;
    pin: string;
    last_otp_sent_at: string | null;
    fcm_token: string | null;
  };
  wallet: {
    id: number;
    user_id: number;
  };
}

export interface SignupResponse {
  successMessage: string;
}

export interface VerifyOTPResponse {
  successMessage: string;
  token: string;
  user: {
    id: number;
    phone: string;
    name: string;
    profile_image?: string;
  };
  wallet: {
    id: number;
    balance: number;
  };
}

export interface Notification {
  id: number;
  title: string;
  description: string;
  image_url: string | null;
  created_at: string;
}

export interface PublicNotificationsResponse {
  successMessage: string;
  notifications: Notification[];
}

export interface BalanceResponse {
  successMessage: string;
  balance: string;
  status: string;
}

export interface CheckReceiverResponse {
  message: string;
  receiver: {
    id: number;
    phone: string;
    name: string | null;
    profile_image: string | null;
    user_type: string;
  };
}

export interface SendMoneyResponse {
  message: string;
  amount: string;
  receiverPhone: string;
  receiverName: string | null;
}

export interface AddMoneyResponse {
  success: boolean;
  transactionId: number;
  sslcommerzTransactionId: string;
  paymentUrl: string;
  message: string;
}

export interface ErrorResponse {
  errorMessage?: string;
  error?: string;
}

class APIService {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw data as ErrorResponse;
    }

    return data as T;
  }

  async login(phone: string, pin: string): Promise<LoginResponse> {
    return this.request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ phone, pin }),
    });
  }

  async signup(name: string, phone: string, pin: string): Promise<SignupResponse> {
    return this.request<SignupResponse>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ name, phone, pin }),
    });
  }

  async verifyOTP(phone: string, otp: string): Promise<VerifyOTPResponse> {
    return this.request<VerifyOTPResponse>('/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ phone, otp }),
    });
  }

  async getBalance(token: string): Promise<BalanceResponse> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    const response = await fetch(`${this.baseURL}/wallet/balance`, {
      method: 'GET',
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw data as ErrorResponse;
    }

    return data as BalanceResponse;
  }

  async checkReceiver(token: string, phone: string): Promise<CheckReceiverResponse> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    const body = { phone };
    console.log('Check Receiver API Body:', body);

    const response = await fetch(`${this.baseURL}/transaction/check-receiver`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      throw data as ErrorResponse;
    }

    return data as CheckReceiverResponse;
  }

  async sendMoney(token: string, receiverPhone: string, pin: string, amount: string): Promise<SendMoneyResponse> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    const body = { receiverPhone, pin, amount };
    console.log('Send Money API Body:', body);

    const response = await fetch(`${this.baseURL}/transaction/send-money`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      throw data as ErrorResponse;
    }

    return data as SendMoneyResponse;
  }

  async saveFcmToken(token: string, fcmToken: string): Promise<{ successMessage: string }> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    const body = { fcmToken };
    console.log('Save FCM Token API URL:', `${this.baseURL}/auth/save-fcm-token`);
    console.log('Save FCM Token API Body:', body);

    const response = await fetch(`${this.baseURL}/auth/save-fcm-token`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    const responseText = await response.text();
    console.log('Save FCM Token API Status:', response.status);
    console.log('Save FCM Token API Response:', responseText);

    let data: any;
    try {
      data = JSON.parse(responseText);
    } catch (e ) {
      data = { successMessage: responseText, errorMessage: responseText };
    }

    if (!response.ok) {
      throw (typeof data === 'object' ? data : { errorMessage: responseText }) as ErrorResponse;
    }

    return data as { successMessage: string };
  }

  async getPublicNotifications(token?: string): Promise<PublicNotificationsResponse> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${this.baseURL}/public/notifications`, {
      method: 'GET',
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw data as ErrorResponse;
    }

    return data as PublicNotificationsResponse;
  }

  async addMoney(token: string, amount: number | string): Promise<AddMoneyResponse> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    const parsedAmount = typeof amount === 'string' ? parseFloat(amount.replace(/,/g, '')) : amount;
    const body = { amount: parsedAmount };

    console.log('Add Money API URL:', `${this.baseURL}/wallet/add-money`);
    console.log('Add Money API Body:', body);

    const response = await fetch(`${this.baseURL}/wallet/add-money`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      throw data as ErrorResponse;
    }

    return data as AddMoneyResponse;
  }
}


export const apiService = new APIService(BASE_URL);
