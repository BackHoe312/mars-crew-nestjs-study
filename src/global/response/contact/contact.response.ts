import {
  createErrorResponse,
  createPagingResponse,
  createResponse,
  createServerExceptionResponse,
} from 'src/global/response/common/index';

export const ContactResponse = {
  save: {
    201: createResponse({
      statusCode: 201,
      description: '연락처 등록',
      message: '연락처가 등록되었습니다.',
      data: {
        contactId: 1,
      },
    }),

    409: createErrorResponse({
      fakeCode: 409,
      statusCode: 400,
      message: '이미 등록된 전화번호입니다.',
      error: 'BAD REQUEST',
    }),

    500: createServerExceptionResponse(),
  },

  findAll: {
    200: createPagingResponse({
      statusCode: 200,
      description: '연락처 조회',
      message: '연락처가 조회되었습니다.',
      data: [
        {
          createAt: '2025-08-26T11:58:57.464Z',
          updateAt: '2025-08-26T11:58:57.464Z',
          deleteAt: null,
          contactId: 1,
          name: '홍길동',
          phone: '010-1234-5678',
          not_archived: true,
        },
        {
          createAt: '2025-09-07T14:42:38.588Z',
          updateAt: '2025-09-07T14:42:38.588Z',
          deleteAt: null,
          contactId: 2,
          name: '김철수',
          phone: '010-1234-5678',
          not_archived: true,
        },
      ],
      count: 20,
      page: 1,
      limit: 10,
    }),

    500: createServerExceptionResponse(),
  },

  findByContactId: {
    200: createResponse({
      statusCode: 200,
      description: '연락처 단일 조회',
      message: '조회되었습니다.',
      data: {
        createAt: '2025-08-26T11:58:57.464Z',
        updateAt: '2025-08-26T11:58:57.464Z',
        deleteAt: null,
        contactId: 1,
        name: '홍길동',
        phone: '010-1234-5678',
        not_archived: true,
      },
    }),

    404: createErrorResponse({
      statusCode: 404,
      message: '존재하지 않는 연락처입니다.',
      error: 'NOT FOUND',
    }),

    500: createServerExceptionResponse(),
  },

  deleteByContactId: {
    200: createResponse({
      statusCode: 200,
      description: '연락처 단일 삭제',
      message: '삭제되었습니다.',
      data: {
        count: 1,
      },
    }),

    404: createErrorResponse({
      statusCode: 404,
      message: '존재하지 않는 연락처입니다.',
      error: 'NOT FOUND',
    }),

    500: createServerExceptionResponse(),
  },

  deleteByContactIds: {
    200: createResponse({
      statusCode: 200,
      description: '연락처 다중 삭제',
      message: '삭제되었습니다.',
      data: {
        count: 3,
      },
    }),

    404: createErrorResponse({
      statusCode: 404,
      message: '존재하지 않는 연락처입니다.',
      error: 'NOT FOUND',
    }),

    500: createServerExceptionResponse(),
  },

  update: {
    200: createResponse({
      statusCode: 200,
      description: '연락처 수정',
      message: '수정되었습니다.',
    }),

    404: createErrorResponse({
      statusCode: 404,
      message: '존재하지 않는 전화번호입니다.',
      error: 'NOT FOUND',
    }),

    409: createErrorResponse({
      fakeCode: 409,
      statusCode: 400,
      message: '이미 존재하는 전화번호로 수정할 수 없습니다.',
      error: 'BAD REQUEST',
    }),

    500: createServerExceptionResponse(),
  },
};
