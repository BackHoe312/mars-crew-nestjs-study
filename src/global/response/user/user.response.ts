import {
  createErrorResponse,
  createResponse,
  createServerExceptionResponse,
} from 'src/global/response/common/index';

export const UserResponse = {
  save: {
    201: createResponse({
      statusCode: 201,
      description: '회원가입',
      message: '가입이 완료되었습니다.',
    }),

    409: createErrorResponse({
      fakeCode: 409,
      statusCode: 400,
      message: '이미 등록된 이메일입니다.',
      error: 'BAD REQUEST',
    }),

    500: createServerExceptionResponse(),
  },

  login: {
    200: createResponse({
      statusCode: 200,
      description: '로그인',
      message: '로그인되었습니다.',
      data: {
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJpYXQiOjE3NTcyOTk0NjUsImV4cCI6MTc1NzI5OTc2NX0.2IH5ftzGAqiQzlfXj9iksS28NU486nVcS2fxKY3f1ys',
        refreshToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJpYXQiOjE3NTcyOTk0NjUsImV4cCI6MTc1NzkwNDI2NX0.45jknGa_A1yvm9R3OPs533bNMgzhOTPVGSZoE7Vg4SE',
      },
    }),

    401: createErrorResponse({
      statusCode: 401,
      message: '이메일 또는 비밀번호가 올바르지 않습니다.',
      error: 'BAD REQUEST',
    }),

    404: createErrorResponse({
      statusCode: 404,
      message: '가입되지 않은 이메일입니다.',
      error: 'NOT FOUND',
    }),

    500: createServerExceptionResponse(),
  },

  refresh: {
    200: createResponse({
      statusCode: 200,
      description: 'Token 갱신',
      message: '갱신되었습니다.',
      data: {
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJpYXQiOjE3NTcyOTk5NjgsImV4cCI6MTc1NzMwMDI2OH0.fU1Qy1xJ8gLPD2bmc03TwyVSxsjaK8-bra7-PFNDbFI',
      },
    }),

    401: createErrorResponse({
      statusCode: 401,
      message: 'Refresh Token이 유효하지 않습니다.',
      error: 'BAD REQUEST',
    }),

    500: createServerExceptionResponse(),
  },
};
