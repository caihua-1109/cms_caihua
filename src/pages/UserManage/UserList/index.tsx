/**
 * 用户列表
 */
import { useEffect, useState } from 'react'
import {
  Button,
  message,
  Popconfirm,
  Row,
  Space,
  Table,
  TableProps,
  Tag
} from 'antd'
import styles from './index.module.less'
import Search from 'antd/es/input/Search'
import { deleteUser, getRoleList, getUserList } from '@/service/userService'
import UserAdd from '@/pages/UserManage/UserList/AddModal'
import UserEdit from '@/pages/UserManage/UserList/EditModal'

const defaultPageSize = 10

const UserList = () => {
  const [dataSource, setDataSource] = useState<any>([])
  const [total, setTotal] = useState(0)
  const [current, setCurrent] = useState<number>(1)
  // const [pageNum, setPageNum] = useState(1)
  // const [pageSize, setPageSize] = useState(10)
  const [searchParams, setSearchParams] = useState<any>({
    keyword: '',
    pageSize: defaultPageSize,
    pageNum: 1
  })
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [selectedRows, setSelectedRows] = useState([])

  const [addVisible, setAddVisible] = useState<boolean>(false)
  const [editVisible, setEditVisible] = useState<boolean>(false)
  const [editData, setEditData] = useState<any>({})

  const [roles, setRoles] = useState<any[]>([])

  const columns: TableProps<any>['columns'] = [
    {
      title: '序号',
      dataIndex: 'userId',
      key: 'userId',
      width: 80,
      align: 'center',
      render: (_, record, index) => (
        <>{index + 1 + defaultPageSize * (current - 1)}</>
      )
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      width: 300,
      ellipsis: true,
      align: 'center',
      render: text => <p>{text}</p>
    },
    {
      title: '邮箱',
      dataIndex: '邮箱',
      key: 'email',
      align: 'center'
    },
    {
      title: '地址',
      dataIndex: '地址',
      key: 'address',
      align: 'center'
    },
    {
      title: '角色',
      key: 'roles',
      dataIndex: 'roles',
      align: 'center',
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
      width: 300,
      align: 'center',
      render: (_, record) => (
        <Space size='middle'>
          <a
            onClick={() => {
              setEditData(record)
              setEditVisible(true)
            }}
          >
            编辑
          </a>
          <Popconfirm
            title={'是否删除？'}
            onConfirm={() => deleteFunction(record)}
          >
            <a>删除</a>
          </Popconfirm>
        </Space>
      )
    }
  ]

  const getList = () => {
    getUserList(searchParams).then(res => {
      const { list, total } = res?.data || {}

      if (Array.isArray(list)) {
        setDataSource(list)
        setTotal(total)
      }
    })
  }
  // 每当 searchParams 发生变化时，重新获取列表数据
  const onSearch = value => {
    setSearchParams({
      keyword: value,
      pageSize: defaultPageSize,
      pageNum: 1
    })
    setCurrent(1)
  }

  const getRoles = () => {
    getRoleList({
      pageSize: 9998,
      pageNum: 1
    }).then(res => {
      const { list } = res?.data || {}

      if (Array.isArray(list)) {
        setRoles(list)
      }
    })
  }

  const deleteFunction = record => {
    const { userId } = record || {}
    deleteUser({ userId }).then((res: any) => {
      if (res?.code === 200) {
        message.success('删除成功')
        getList()
      } else {
        message.error(res?.message || '删除失败')
      }
    })
  }

  useEffect(() => {
    getRoles()
  }, [])

  useEffect(() => {
    getList()
  }, [searchParams])

  return (
    <div className={styles.userList}>
      <Row style={{ marginBottom: 16 }}>
        <Search
          placeholder='关键字,例如：张三'
          onSearch={onSearch}
          style={{ width: 300 }}
          allowClear
        />
        <Button
          type='primary'
          style={{ marginLeft: 24 }}
          onClick={() => {
            setAddVisible(true)
          }}
        >
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
        rowKey={record => record.userId}
        pagination={{
          current,
          pageSize: defaultPageSize,
          total
        }}
        onChange={pagination => {
          const { current } = pagination || {}
          setCurrent(current)
          setSearchParams({
            ...searchParams,
            pageNum: current
          })
        }}
      />
      {addVisible && (
        <UserAdd
          rolesList={roles}
          visible={addVisible}
          onCancel={() => setAddVisible(false)}
          onSuccess={() => {
            setSearchParams({
              keyword: '',
              pageSize: defaultPageSize,
              pageNum: 1
            })
            setCurrent(1)
            setAddVisible(false)
          }}
        />
      )}

      {editVisible && (
        <UserEdit
          rolesList={roles}
          data={editData}
          visible={editVisible}
          onCancel={() => {
            setEditVisible(false)
            setEditData({})
          }}
          onSuccess={() => {
            setEditVisible(false)
            getList()
          }}
        />
      )}
    </div>
  )
}

export default UserList
