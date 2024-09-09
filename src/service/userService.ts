import { PUBLIC } from '@/api/apiConfig'
import request from '@/utils/request'

/**
 * 登录验证
 */
export const login = (data: any) => {
  return request({
    url: PUBLIC.LOGIN,
    method: 'post',
    data
  })
}

/**
 * 获取用户列表
 */
export const getUserList = (params: any) => {
  return request({
    url: PUBLIC.GET_USER_LIST,
    method: 'get',
    params
  })
}
