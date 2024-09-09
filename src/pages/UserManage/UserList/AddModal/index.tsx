/**
 * @description: 用户新增
 */
import { useEffect, useState } from 'react'
import { Button, Form, Input, message, Modal, Select } from 'antd'
import { addUser } from '@/service/userService'

const { Option } = Select

const UserAdd = ({
  visible,
  onCancel,
  onSuccess,
  rolesList
}: {
  visible: boolean
  onCancel: () => void
  onSuccess: () => void
  rolesList: any[]
}) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const onFinish = (values: any) => {
    console.log(values, 'values')

    addUser(values).then((res: any) => {
      const { data, code } = res || {}
      console.log(res, 'res')
      if (code === 200) {
        message.success('新增成功')
        onSuccess()
      } else {
        message.error(res?.message || '新增失败')
      }
    })
  }

  useEffect(() => {
    console.log(rolesList)
  }, [])

  return (
    <Modal
      title='新增'
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={800}
    >
      <Form
        form={form}
        name='basic'
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        onFinish={onFinish}
        autoComplete='off'
      >
        <Form.Item
          label='用户名'
          name='username'
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input placeholder='请输入用户名' />
        </Form.Item>
        <Form.Item
          label='密码'
          name='password'
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password placeholder='请输入密码' />
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
        <Form.Item wrapperCol={{ offset: 19, span: 5 }}>
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

export default UserAdd
