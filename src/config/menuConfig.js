// 项目的配置菜单，以后更改菜单直接在这修改配置。【因为每位用户的权限不同，所以菜单也不同】
import {
    AppstoreOutlined,
    HomeOutlined,
    UnorderedListOutlined,
    ToolOutlined,
    UserOutlined,
    EditOutlined,
    AreaChartOutlined,
    BarChartOutlined,
    LineChartOutlined,
    PieChartOutlined
} from '@ant-design/icons';
let menu = [
    {
        title: 'Admin', 
        key: '/admin/home', 
        icon: <HomeOutlined/>, 
        pathname:'/admin/home'
    },
    {
        title: 'Product',
        key: 'product-about',
        icon: <AppstoreOutlined/>,
        children: [ 
            {
                title: 'Category Management',
                key: '/admin/product-about/category',
                icon: <UnorderedListOutlined/>,
                pathname:'/admin/product-about/category'
            },
            {
                title: 'Product Management',
                key: '/admin/product-about/product',
                icon: <ToolOutlined/>,
                pathname:'/admin/product-about/product'
            },
        ]
    },

    {
        title: 'User Management',
        key:'/admin/user',
        icon: <UserOutlined />,
        pathname:'/admin/user'
    },
    {
        title: 'Role Management',
        key: '/admin/role',
        icon: <EditOutlined />,
        pathname:'/admin/role'
    },

    {
        title: 'Charts',
        key: 'charts',
        icon: <AreaChartOutlined />,
        children: [
            {
                title: 'Bar Chart',
                key: '/admin/charts/bar',
                icon: <BarChartOutlined />,
                pathname:'/admin/charts/bar'
            },
            {
                title: 'Line Chart',
                key: '/admin/charts/line',
                icon: <LineChartOutlined />,
                pathname:'/admin/charts/line'
            }, 
            {
                title: 'Pie Chart',
                key: '/admin/charts/pie',
                icon: <PieChartOutlined />,
                pathname:'/admin/charts/pie'
            },
        ]
    }
]

export default menu