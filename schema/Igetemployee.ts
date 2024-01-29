export interface Igeteducationacc {
  userName: string | null;
  fullName: string | null;
  profileImage: string | null;
  accountType: string | null;
  accountId: string | null;
}

export interface Igetcompany {
  userName: string | null;
}
export interface Apiresponse<T> {
  status: number;
  msg: string;
  data: T | null;
}
