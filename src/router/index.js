import { createRouter, createWebHistory } from "vue-router";

// 异步导入组件 - 路由懒加载
const HomePage = () => import("@/views/index.vue");
const AboutPage = () => import("@/views/about.vue");
const ProductsPage = () => import("@/views/products.vue");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
      meta: {
        title: "首页",
        description: "专注于创新技术解决方案的现代化企业",
      },
    },
    {
      path: "/about",
      name: "about",
      component: AboutPage,
      meta: {
        title: "关于我们",
        description: "了解我们的企业文化、发展历程和团队介绍",
      },
    },
    {
      path: "/products",
      name: "products",
      component: ProductsPage,
      meta: {
        title: "产品服务",
        description: "为客户提供专业的技术解决方案",
      },
    },
  ],
  // 滚动行为配置
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    } else {
      return { top: 0 };
    }
  },
});

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  if (to.meta.title) {
    document.title = to.meta.title;
  }

  // 设置页面描述
  if (to.meta.description) {
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", to.meta.description);
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = to.meta.description;
      document.getElementsByTagName("head")[0].appendChild(meta);
    }
  }

  // 页面访问统计
  if (typeof gtag !== "undefined") {
    gtag("config", "GA_MEASUREMENT_ID", {
      page_path: to.path,
      page_title: to.meta.title,
    });
  }

  next();
});

// 全局后置守卫
router.afterEach((to, from) => {
  // 页面加载完成后的处理
  console.log(`Navigation from ${from.path} to ${to.path}`);
});

export default router;
