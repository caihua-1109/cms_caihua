/**
 * 用户列表
 */
import { useEffect, useState } from 'react'
import { Button, Empty, Row, Space, Table, TableProps, Tag } from 'antd'
import styles from './index.module.less'
import Search from 'antd/es/input/Search'
import { getUserList } from '@/service/userService'

const UserList = () => {
  const [dataSource, setDataSource] = useState<any>([])
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(50)
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [searchParams, setSearchParams] = useState<any>({
    keyword: '',
    pageSize: 10,
    pageNum: 1
  })
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const columns: TableProps<any>['columns'] = [
    {
      title: '序号',
      dataIndex: 'userId',
      key: 'userId',
      render: (_, record, index) => <>{index + 1}</>
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      key: 'userName',
      render: text => <p>{text}</p>
    },
    {
      title: '邮箱',
      dataIndex: '邮箱',
      key: 'email'
    },
    {
      title: '地址',
      dataIndex: '地址',
      key: 'address'
    },
    {
      title: '角色',
      key: 'roles',
      dataIndex: 'roles',
      render: (_, { roles }) => (
        <>
          {roles.map(role => {
            const { roleName } = role || {}

            let color = roleName.length > 5 ? 'geekblue' : 'green'
            if (roleName === 'loser') {
              color = 'volcano'
            }
            return (
              <Tag color={color} key={roleName}>
                {roleName.toUpperCase()}
              </Tag>
            )
          })}
        </>
      )
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>编辑</a>
          <a>删除</a>
        </Space>
      )
    }
  ]
  const onSearch = () => {
    setLoading(true)
    getUserList(searchParams).then(res => {
      const { list, total } = res?.data || {}

      setLoading(false)
      if (Array.isArray(list)) {
        setDataSource(list)
        setTotal(list.length)
      }
    })
  }

  const add = () => {}

  useEffect(() => {
    onSearch()
  }, [])

  return (
    <div className={styles.userList}>
      <Row style={{ marginBottom: 16 }}>
        <Search
          placeholder="关键字,例如：张三"
          onSearch={onSearch}
          style={{ width: 300 }}
          allowClear
        />
        <Button type="primary" style={{ marginLeft: 24 }}>
          新增
        </Button>
      </Row>
      <Table
        // rowSelection={{
        //   type: 'checkbox',
        //   selectedRowKeys,
        //   onChange: (selectedRowKeys, selectedRows) => {}
        // }}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        rowKey={record => record.userId}
        pagination={{
          current,
          pageSize,
          total
        }}
        onChange={pagination => {}}
        emptyText={<Empty />}
      />
    </div>
  )
}

export default UserList
