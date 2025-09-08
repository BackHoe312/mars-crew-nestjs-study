export interface Response {
  fakeCode?: number;
  statusCode: number;
  message: string;
  description?: string;
}
export interface SuccessResponse extends Response {
  data?: any;
  statusCode: 201 | 200;
}
export interface SuccessPagingResponse extends Response {
  data: any[];
  count: number;
  page: number;
  limit: number;
  statusCode: 201 | 200;
}

export interface ErrorResponse extends Response {
  error: 'BAD REQUEST' | 'NOT FOUND';
}

export const createServerExceptionResponse = () => {
  return {
    status: 500,
    description: '서버 오류가 발생했습니다.',
    schema: {
      properties: {
        statusCode: {
          type: 'number',
          example: 500,
        },
        message: {
          type: 'string',
          example: 'Internal server Error',
        },
      },
    },
  };
};

export const createUnauthorizedResponse = () => {
  return {
    status: 401,
    description: 'Token이 유효하지 않습니다.',
    schema: {
      properties: {
        statusCode: {
          type: 'number',
          example: 401,
        },
        message: {
          type: 'string',
          example: 'Unauthorized',
        },
      },
    },
  };
};

export const createResponse = (data: SuccessResponse) => {
  return {
    status: data.statusCode,
    description: data.description ? data.description : data.message,
    schema: {
      properties: {
        statusCode: {
          type: 'number',
          example: data.statusCode,
        },
        message: {
          type: 'string',
          example: data.message,
        },
        data: {
          type: 'object',
          example: data.data ? data.data : undefined,
        },
      },
    },
  };
};

export const createPagingResponse = (data: SuccessPagingResponse) => {
  return {
    status: data.statusCode,
    description: data.description ? data.description : data.message,
    schema: {
      properties: {
        statusCode: {
          type: 'number',
          example: data.statusCode,
        },
        message: {
          type: 'string',
          example: data.message,
        },
        data: {
          type: 'array',
          example: data?.data,
        },
        count: {
          type: 'number',
          example: data.count,
        },
        page: {
          type: 'number',
          example: data.page,
        },
        limit: {
          type: 'number',
          example: data.limit,
        },
      },
    },
  };
};

export const createErrorResponse = (data: ErrorResponse) => {
  return {
    status: data.fakeCode ? data.fakeCode : data.statusCode,
    description: data.description ? data.description : data.message,
    schema: {
      properties: {
        statusCode: {
          type: 'number',
          example: data.statusCode,
        },
        message: {
          type: 'string',
          example: data.message,
        },
        error: {
          type: 'string',
          example: data.error,
        },
      },
    },
  };
};
