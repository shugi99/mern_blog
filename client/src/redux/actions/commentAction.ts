import {Dispatch} from 'redux';

import {ALERT, IAlertType} from '../types/alertType';
import {
  CREATE_COMMENT,
  ICreateCommentType,
  GET_COMMENTS,
  IGetCommentsType,
  REPLY_COMMENT,
  IReplyCommentType,
} from '../types/commentType';

import {IComment} from '../../utils/TypeScript';
import {postAPI, getAPI} from '../../utils/FetchData';

export const createComment =
  (data: IComment, token: string) =>
  async (dispatch: Dispatch<IAlertType | ICreateCommentType>) => {
    try {
      const res = await postAPI('comment', data, token);

      dispatch({
        type: CREATE_COMMENT,
        payload: {...res.data, user: data.user},
      });
    } catch (err: any) {
      dispatch({type: ALERT, payload: {errors: err.response.data.msg}});
    }
  };

export const getComments =
  (id: string, num: number) =>
  async (dispatch: Dispatch<IAlertType | IGetCommentsType>) => {
    try {
      let limit = 4;

      const res = await getAPI(
        `comments/blog/${id}?page=${num}&limit=${limit}`
      );

      dispatch({
        type: GET_COMMENTS,
        payload: {
          data: res.data.comments,
          total: res.data.total,
        },
      });
    } catch (err: any) {
      dispatch({type: ALERT, payload: {errors: err.response.data.msg}});
    }
  };

export const replyComment =
  (data: IComment, token: string) =>
  async (dispatch: Dispatch<IAlertType | IReplyCommentType>) => {
    try {
      const res = await postAPI('reply_comment', data, token);

      dispatch({
        type: REPLY_COMMENT,
        payload: {
          ...res.data,
          user: data.user,
          reply_user: data.reply_user,
        },
      });
    } catch (err: any) {
      dispatch({type: ALERT, payload: {errors: err.response.data.msg}});
    }
  };
