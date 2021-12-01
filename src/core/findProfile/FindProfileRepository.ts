export interface FindProfileRepository {
  getAllProfile(): Promise<any>;
  getProfile(username: string): Promise<any>;
}
