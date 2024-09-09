/**
 * 接口配置文件
 */

export const PUBLIC = {
  // 登录
  LOGIN: '/login',
  // 获取用户信息
  GET_USER_INFO: userId => '/admin/users/findUserById/${userId}',
  // 获取用户列表
  GET_USER_LIST: '/admin/users/findUserList',
  // 删除用户
  DELETE_USER: userId => `/admin/users/del/${userId}`,
  // 新增用户
  ADD_USER: '/admin/users/add',
  // 编辑用户
  EDIT_USER: 'admin/users/update',
  // 获取角色列表
  GET_ROLE_LIST: '/user/role/search'
}

export default {
  PUBLIC
}
