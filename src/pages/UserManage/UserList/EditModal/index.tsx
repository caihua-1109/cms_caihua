/**
 * @description: 用户新增
 */
import { useEffect, useState } from 'react'
import { Button, Form, Input, message, Modal, Select } from 'antd'
import { addUser, editUser } from '@/service/userService'

const { Option } = Select

const UserEdit = ({
  visible,
  onCancel,
  onSuccess,
  data,
  rolesList
}: {
  visible: boolean
  onCancel: () => void
  onSuccess: () => void
  data?: any
  rolesList: any[]
}) => {
  const [form, setForm] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const onFinish = (values: any) => {
    const newUser = {
      ...data,
      ...values
    }
    editUser(newUser).then((res: any) => {
      const { data, code } = res || {}
      if (code === 200) {
        message.success('修改成功')
        onSuccess()
      } else {
        message.error(res?.message || '修改失败')
      }
    })
  }

  useEffect(() => {
    form.setFieldsValue(data)
    form.setFieldsValue({
      roles: data?.roles?.map((item: any) => item.roleId)
    })
  }, [data])

  return (
    <Modal
      title='修改'
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={800}
    >
      <Form
        form={form}
        name='basic'
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        autoComplete='off'
      >
        <Form.Item
          label='用户名'
          name='username'
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='密码'
          name='password'
          rules={[
            {
              required: true,
              message: '请输入密码',
              min: 6,
              max: 12,
              pattern: /^[a-zA-Z0-9]{6,12}$/
            }
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label='角色'
          name='roles'
          rules={[{ required: true, message: '请选择角色' }]}
        >
          <Select placeholder='请选择角色' mode='multiple' allowClear>
            {rolesList.map((item: any) => (
              <Option key={item.roleId} value={item.roleId}>
                {item.roleDesc}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button type='primary' htmlType='submit' loading={loading}>
            提交
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={onCancel}>
            取消
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default UserEdit
