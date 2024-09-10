/**
 * @description: 编辑
 */
import { useEffect, useState } from 'react'
import { Button, Form, Input, message, Modal, Select } from 'antd'
import { addUser, editRole, editUser } from "@/service/userService"

const { Option } = Select

const Edit = ({
  visible,
  onCancel,
  onSuccess,
  data
}: {
  visible: boolean
  onCancel: () => void
  onSuccess: () => void
  data?: any
}) => {
  const [form, setForm] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const onFinish = (values: any) => {
    // const newRole = {
    //   ...data,
    //   ...values
    // }
    const newRole = {
      ...values,
      roleId: data?.roleId
    }
    editRole(newRole).then((res: any) => {
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

export default Edit
