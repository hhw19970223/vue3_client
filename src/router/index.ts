import { createRouter, createWebHashHistory, useRouter, Router, RouteRecordRaw } from 'vue-router';

const routesList: any[] = [
    ["/center", "center", () => import('../pages/center.vue'), {}]
];

const routesChirdObj: {[key: string]: any[]} = {
    "center": [
       
    ],
}


const redirectList: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/center'
    },
]


function _analysis(rList?: any[]): Array<RouteRecordRaw> {
    rList = rList || routesList;
    let list: Array<RouteRecordRaw> = [];
    for (let i = 0; i < rList.length; i++) {
        let cfgList = rList[i];

        if (!cfgList[0] || !cfgList[2]) {
            console.error("路由配置有误,请检测");
            continue;
        }

        let cfg: RouteRecordRaw = {
            path: cfgList[0],
            component: cfgList[2],
        };

        if (cfgList[3]) cfg.meta = cfgList[3];
        if (cfgList[1]) {
            cfg.name = cfgList[1];
            if (routesChirdObj[cfgList[1]]) {
                cfg.children = _analysis(routesChirdObj[cfgList[1]]);
            }
        }
        if (cfgList[4]) cfg.redirect = cfgList[4];
        list.push(cfg);
    }
    return list;
}

let _routesList: Array<RouteRecordRaw> = _analysis();

const router: Router = createRouter({
    history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
    routes: redirectList.concat(_routesList)
})

router.beforeEach((to, from, next) => {
    // console.log("路由跳转了");
    if (from && from.path === "/" && to && to.path !== "/center") {
        next({
            path: "/center",
        })
    } else {
        next();
    }
});
router.afterEach(() => {
    window.scrollTo(0, 0);
});

export default router


