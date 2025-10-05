<template>
  <el-header class="navbar" height="80px">
    <div class="navbar-container">
      <!-- Logo -->
      <div class="logo">
        <img src="/logo.jpg" alt="Company Logo" class="logo-image" />
        <span class="logo-text">企业名称</span>
      </div>

      <!-- 桌面端菜单 -->
      <nav class="desktop-menu">
        <div class="menu-items" ref="menuContainer">
          <a
            v-for="item in menuItems"
            :key="item.index"
            :ref="(el) => setMenuItemRef(el, item.index)"
            :class="['menu-item', { 'is-active': activeIndex === item.index }]"
            @click="handleSelect(item.index)"
          >
            {{ item.label }}
          </a>
          <!-- 滑动下划线 -->
          <div
            class="menu-underline"
            :style="{
              transform: `translateX(${underlineLeft}px)`,
              width: `${underlineWidth}px`,
            }"
          ></div>
        </div>
      </nav>

      <!-- 移动端菜单按钮 -->
      <el-button
        class="mobile-menu-btn"
        :icon="Menu"
        text
        @click="toggleMobileMenu"
      />

      <!-- 联系按钮 -->
      <div class="contact-actions">
        <el-button type="primary" @click="handleContact">联系我们</el-button>
      </div>
    </div>

    <!-- 移动端菜单抽屉 -->
    <el-drawer
      v-model="mobileMenuVisible"
      direction="rtl"
      size="280px"
      :show-close="false"
    >
      <template #header>
        <div class="drawer-header">
          <span class="logo-text">企业名称</span>
        </div>
      </template>

      <el-menu
        class="mobile-menu"
        :default-active="activeIndex"
        @select="handleMobileSelect"
      >
        <el-menu-item
          v-for="item in menuItems"
          :key="item.index"
          :index="item.index"
        >
          {{ item.label }}
        </el-menu-item>
      </el-menu>

      <div class="mobile-contact">
        <el-button type="primary" size="large" block @click="handleContact">
          立即联系
        </el-button>
      </div>
    </el-drawer>
  </el-header>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from "vue";
import { Menu } from "@element-plus/icons-vue";

// 菜单数据
const menuItems = reactive([
  { index: "1", label: "首页", path: "/" },
  { index: "2", label: "关于我们", path: "/about" },
  { index: "3", label: "产品服务", path: "/products" },
  { index: "4", label: "新闻资讯", path: "/news" },
  { index: "5", label: "联系我们", path: "/contact" },
]);

const activeIndex = ref("1");
const mobileMenuVisible = ref(false);

// 下划线位置和宽度
const underlineLeft = ref(0);
const underlineWidth = ref(0);

// 存储菜单项的DOM引用
const menuItemRefs = ref({});
const menuContainer = ref(null);

// 设置菜单项引用
const setMenuItemRef = (el, index) => {
  if (el) {
    menuItemRefs.value[index] = el;
  }
};

// 更新下划线位置
const updateUnderline = async () => {
  await nextTick();
  const activeEl = menuItemRefs.value[activeIndex.value];
  const containerEl = menuContainer.value;

  if (activeEl && containerEl) {
    const containerRect = containerEl.getBoundingClientRect();
    const activeRect = activeEl.getBoundingClientRect();

    underlineLeft.value = activeRect.left - containerRect.left;
    underlineWidth.value = activeRect.width;
  }
};

// 桌面端菜单选择
const handleSelect = (key) => {
  activeIndex.value = key;
  updateUnderline();
  // TODO: 处理路由跳转
  const item = menuItems.find((item) => item.index === key);
  console.log("Navigate to:", item?.path);
};

// 移动端菜单选择
const handleMobileSelect = (key) => {
  activeIndex.value = key;
  mobileMenuVisible.value = false;
  // TODO: 处理路由跳转
  const item = menuItems.find((item) => item.index === key);
  console.log("Navigate to:", item?.path);
};

// 切换移动端菜单
const toggleMobileMenu = () => {
  mobileMenuVisible.value = !mobileMenuVisible.value;
};

// 联系我们
const handleContact = () => {
  // TODO: 处理联系逻辑
  console.log("Contact us");
};

// 初始化下划线位置
onMounted(() => {
  updateUnderline();
  window.addEventListener("resize", updateUnderline);
});
</script>

<style scoped>
/* 导航栏容器 */
.navbar {
  @apply bg-white shadow-lg fixed top-0 left-0 right-0 z-50;
}

.navbar-container {
  @apply max-w-7xl mx-auto px-4 h-full flex items-center justify-between gap-8;
}

/* Logo 区域 */
.logo {
  @apply flex items-center space-x-3 flex-shrink-0;
}

.logo-image {
  @apply h-10 w-10 object-contain;
}

.logo-text {
  @apply text-xl font-bold text-gray-800 whitespace-nowrap;
}

/* 桌面端菜单 */
.desktop-menu {
  @apply hidden lg:flex flex-1 justify-center;
}

.menu-items {
  @apply flex items-center gap-1 relative;
}

.menu-item {
  @apply px-4 py-2 text-gray-700 font-medium cursor-pointer transition-colors duration-200 whitespace-nowrap;
  @apply hover:text-blue-600;
}

.menu-item.is-active {
  @apply text-blue-600;
}

/* 滑动下划线 */
.menu-underline {
  @apply absolute bottom-0 h-0.5 bg-blue-600;
  transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
    width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

/* 移动端菜单按钮 */
.mobile-menu-btn {
  @apply lg:hidden text-gray-700 text-2xl;
}

/* 联系按钮 */
.contact-actions {
  @apply hidden lg:flex flex-shrink-0;
}

/* 抽屉头部 */
.drawer-header {
  @apply flex items-center;
}

/* 移动端菜单 */
.mobile-menu {
  @apply border-none;
}

.mobile-menu .el-menu-item {
  @apply text-gray-700 my-2;
}

.mobile-menu-btn.el-button.is-text:hover {
  background-color: transparent !important;
}

.mobile-contact {
  @apply px-4 mt-6;
}

@media (max-width: 1024px) {
  .navbar-container {
    @apply gap-4;
  }
}

@media (min-width: 1024px) and (max-width: 1280px) {
  .menu-item {
    @apply px-3 text-sm;
  }
}
</style>