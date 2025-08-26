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
    readonly count?: number;
  }): CommonResponse<T> {
    return new CommonResponse<T>({
      data: payload?.data,
      statusCode: payload.statusCode,
      message: payload.message,
      count: payload?.count,
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
      data: payload.data,
      statusCode: payload.statusCode,
      message: payload.message,
      count: payload.count,
      page: payload.page,
      limit: payload.limit,
    });
  }
}

export const createServerExceptionResponse = () => {
  return {
    status: 500,
    description: '서버 오류가 발생했습니다.',
    schema: {
      example: {
        status: 500,
        message: '서버 에러가 발생했습니다.',
        error: 'Internal Server Error',
      },
    },
  };
};
