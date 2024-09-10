/**
 * @description: 用户新增
 */
import { useEffect, useState } from 'react'
import { Button, Form, Input, message, Modal, Select } from 'antd'
import { addRole, addUser } from "@/service/userService"

const { Option } = Select

const Add = ({
  visible,
  onCancel,
  onSuccess
}: {
  visible: boolean
  onCancel: () => void
  onSuccess: () => void
}) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const onFinish = (values: any) => {

    addRole(values).then((res: any) => {
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
          label='角色码'
          name='roleCode'
          rules={[{ required: true, message: '请输入角色码' }]}
        >
          <Input placeholder='请输入角色码' />
        </Form.Item>
        <Form.Item
          label='角色名'
          name='roleName'
          rules={[{ required: true, message: '请输入角色名' }]}
        >
          <Input placeholder='请输入角色名' />
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

export default Add
