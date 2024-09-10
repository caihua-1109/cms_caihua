/**
 * 角色管理列表
 */
import { useEffect, useState } from 'react'
import {
  Button,
  message,
  Popconfirm,
  Row,
  Space,
  Table,
  TableProps
} from 'antd'
import styles from './index.module.less'
import Search from 'antd/es/input/Search'
import { deleteRole, deleteUser, getRoleList } from '@/service/userService'
import Add from '@/pages/UserManage/RoleList/AddModal'
import Edit from '@/pages/UserManage/RoleList/EditModal'

const defaultPageSize = 10

const RoleList = () => {
  const [dataSource, setDataSource] = useState<any>([])
  const [total, setTotal] = useState(0)
  const [current, setCurrent] = useState<number>(1)
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

  const columns: TableProps<any>['columns'] = [
    {
      title: '序号',
      dataIndex: 'userId',
      key: 'roleId',
      width: 80,
      align: 'center',
      render: (_, record, index) => (
        <>{index + 1 + defaultPageSize * (current - 1)}</>
      )
    },
    {
      title: '角色码',
      dataIndex: 'roleCode',
      key: 'roleCode',
      width: 300,
      ellipsis: true,
      align: 'center',
      render: text => <p>{text}</p>
    },
    {
      title: '角色名',
      dataIndex: 'roleName',
      key: 'username',
      width: 300,
      ellipsis: true,
      align: 'center',
      render: text => <p>{text}</p>
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
    getRoleList(searchParams).then(res => {
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

  const deleteFunction = record => {
    const { roleId } = record || {}
    deleteRole({ roleId }).then((res: any) => {
      if (res?.code === 200) {
        message.success('删除成功')
        getList()
      } else {
        message.error(res?.message || '删除失败')
      }
    })
  }

  useEffect(() => {
    getList()
  }, [searchParams])

  return (
    <div className={styles.List}>
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
        <Add
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
        <Edit
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

export default RoleList
