// 最多2级菜单,key值唯一不可重复
const sidebarMenu = [
    {
        key: '#',  // url，必选
        name: '仪表盘',  // name,必选
        icon: 'dashboard',  // 图标，1级必选，其他可选
    },
    {
        key: 'community',  // url，必选
        name: '小区',  // name,必选
        icon: 'deployment-unit',  // 图标，1级必选，其他可选
    },
    {
        key: 'house',  // url，必选
        name: '房屋',  // name,必选
        icon: 'home',  // 图标，1级必选，其他可选
    },
];

export default sidebarMenu;
