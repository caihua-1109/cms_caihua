import { MenuItem } from '@/utils/interface'
import ImgIcon from '@/components/ImgIcon'
import dot from '@/assets/images/menuIcon/dot.svg'
import company from '@/assets/images/menuIcon/company.svg'
import bill from '@/assets/images/menuIcon/bill.svg'
import {
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined
} from '@ant-design/icons'

const Menu: MenuItem[] = [
  {
    label: '首页',
    key: '/home',
    icon: <ImgIcon icon={company} />
  },
  {
    key: '/chart',
    label: '图表',
    icon: <ImgIcon icon={bill} />,
    children: [
      {
        key: '/water',
        label: '水型图',
        icon: <ImgIcon icon={dot} />
      },
      {
        key: '/columan',
        label: '柱形图',
        icon: <ImgIcon icon={dot} />
      }
    ]
  },
  {
    key: '/exception',
    label: '异常页',
    icon: <ClockCircleOutlined />,
    children: [
      {
        key: '/a',
        label: '403',
        icon: <InfoCircleOutlined />
      },
      {
        key: '/b',
        label: 'other',
        icon: <ExclamationCircleOutlined />,
        children: [
          {
            key: '/404',
            label: '404页',
            icon: <InfoCircleOutlined />
          },
          {
            key: '/500',
            label: '500页',
            icon: <InfoCircleOutlined />
          }
        ]
      }
    ]
  },
  {
    key: '/userManage',
    label: '用户管理',
    icon: <ImgIcon icon={dot} />,
    children: [
      {
        key: '/user',
        label: '用户列表',
        icon: <ImgIcon icon={dot} />
      }
      // {
      //   key: '/user/role',
      //   label: '角色列表',
      //   icon: <ImgIcon icon={dot} />
      // },
      // {
      //   key: '/user/permission',
      //   label: '权限列表',
      //   icon: <ImgIcon icon={dot} />
      // }
    ]
  }
]
export default Menu
