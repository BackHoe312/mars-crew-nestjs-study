import { HttpStatus } from '@nestjs/common';

export class CommonResponse<T> {
  private constructor(payload: {
    readonly data?: T;
    readonly statusCode: number;
    readonly message: string;
    readonly count?: number;
    readonly page?: number;
    readonly limit?: number;
  }) {
    this.data = payload?.data;
    this.statusCode = payload.statusCode;
    this.message = payload.message;
    this.count = payload?.count;
    this.page = payload?.page;
    this.limit = payload?.limit;
  }

  public readonly data?: T;
  public readonly statusCode: HttpStatus;
  public readonly message: string;
  public readonly count?: number;
  public readonly page?: number;
  public readonly limit?: number;

  static createResponse<T>(payload: {
    readonly data?: T;
    readonly statusCode: number;
    readonly message: string;
  }): CommonResponse<T> {
    return new CommonResponse<T>({
      statusCode: payload.statusCode,
      message: payload.message,
      data: payload?.data,
    });
  }

  static createPaginationResponse<T>(payload: {
    readonly data: T;
    readonly statusCode: number;
    readonly message: string;
    readonly count: number;
    readonly page: number;
    readonly limit: number;
  }): CommonResponse<T> {
    return new CommonResponse<T>({
      statusCode: payload.statusCode,
      message: payload.message,
      data: payload.data,
      count: payload.count,
      page: payload.page,
      limit: payload.limit,
    });
  }
}