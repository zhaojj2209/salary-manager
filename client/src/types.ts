/* eslint-disable no-unused-vars */
export enum SortBy {
  ID = 'id',
  LOGIN = 'login',
  NAME = 'name',
  SALARY = 'salary',
}

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface User {
  id: string,
  login: string,
  name: string,
  salary: number,
}

export interface GetUsersResponse {
  results: User[],
  count: number,
  limit: number,
  offset: number
}