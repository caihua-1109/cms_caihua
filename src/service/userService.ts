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

/**
 * 删除用户
 */
export const deleteUser = (params: any) => {
  const { userId } = params || {}
  return request({
    url: PUBLIC.DELETE_USER(userId),
    method: 'delete'
  })
}
/**
 * 新增用户
 */
export const addUser = (data: any) => {
  return request({
    url: PUBLIC.ADD_USER,
    method: 'post',
    data
  })
}

/**
 * 编辑用户
 */
export const editUser = (data: any) => {
  return request({
    url: PUBLIC.EDIT_USER,
    method: 'put',
    data
  })
}

/**
 * 获取角色列表
 */
export const getRoleList = (params?: any) => {
  return request({
    url: PUBLIC.GET_ROLE_LIST,
    method: 'get',
    params
  })
}
