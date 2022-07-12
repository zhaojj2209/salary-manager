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
  salary: string,
}

export interface GetUsersResponse {
  results: User[],
  limit: string,
  offset: string
}