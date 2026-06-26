export type WhitelabelStatus = "active" | "inactive";

export type Whitelabel = {
  id: string;
  name: string;
  company: string;
  key: string;
  whitelistedIp: string;
  status: WhitelabelStatus;
  rateLimit: number;
  email: string;
  createdAt: string;
};

export type WhitelabelFormValues = Omit<Whitelabel, "id" | "createdAt">;
