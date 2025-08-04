export interface IClient {
  user_id: number;
  template: string;
  fio: string;
  email: string;
}

export interface IGetClientsRequest {
  search?: string;
  limit: number;
  offest: number;
}

export interface IGetClientsResponse {
  passes: IClient[];
}
