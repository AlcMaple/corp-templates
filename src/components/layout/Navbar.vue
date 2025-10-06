<template>
  <el-header class="navbar" height="80px">
    <div class="navbar-container">
      <!-- Logo -->
      <div class="logo">
        <img src="/logo.jpg" alt="Company Logo" class="logo-image" />
        <span class="logo-text">企业名称</span>
      </div>

      <!-- 桌面端菜单 -->
      <el-menu
        mode="horizontal"
        class="desktop-menu"
        :default-active="activeIndex"
        @select="handleSelect"
      >
        <el-menu-item index="1">首页</el-menu-item>
        <el-menu-item index="2">关于我们</el-menu-item>
        <el-menu-item index="3">产品服务</el-menu-item>
        <el-menu-item index="4">新闻资讯</el-menu-item>
        <el-menu-item index="5">联系我们</el-menu-item>
      </el-menu>

      <!-- 移动端菜单按钮 -->
      <el-button
        class="mobile-menu-btn md:hidden"
        :icon="Menu"
        @click="toggleMobileMenu"
      />

      <!-- 联系按钮 -->
      <div class="contact-actions hidden md:flex">
        <el-button type="primary" @click="handleContact"> 联系我们 </el-button>
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
        <el-menu-item index="1"> 首页 </el-menu-item>
        <el-menu-item index="2"> 关于我们 </el-menu-item>
        <el-menu-item index="3"> 产品服务 </el-menu-item>
        <el-menu-item index="4"> 新闻资讯 </el-menu-item>
        <el-menu-item index="5"> 联系我们 </el-menu-item>
      </el-menu>

      <div class="mobile-contact mt-6">
        <el-button type="primary" size="large" block @click="handleContact">
          立即联系
        </el-button>
      </div>
    </el-drawer>
  </el-header>
</template>

<script setup>
import { ref } from "vue";

const activeIndex = ref("1");
const mobileMenuVisible = ref(false);

const handleSelect = (key) => {
  activeIndex.value = key;
  // 处理路由跳转
  console.log("Navigate to:", key);
};

const handleMobileSelect = (key) => {
  activeIndex.value = key;
  mobileMenuVisible.value = false;
  // 处理路由跳转
  console.log("Navigate to:", key);
};

const toggleMobileMenu = () => {
  mobileMenuVisible.value = !mobileMenuVisible.value;
};

const handleContact = () => {
  // 处理联系逻辑
  console.log("Contact us");
};
</script>

<style scoped>
.navbar {
  @apply bg-white shadow-lg fixed top-0 left-0 right-0 z-50;
}

.navbar-container {
  @apply max-w-7xl mx-auto px-4 h-full flex items-center justify-between;
}

.logo {
  @apply flex items-center space-x-3;
}

.logo-image {
  @apply h-10 w-10 object-contain;
}

.logo-text {
  @apply text-xl font-bold text-gray-800;
}

.desktop-menu {
  @apply hidden md:flex border-none bg-transparent;
}

.desktop-menu .el-menu-item {
  @apply text-gray-700 font-medium;
}

.desktop-menu .el-menu-item:hover {
  @apply text-blue-600 bg-transparent;
}

.desktop-menu .el-menu-item.is-active {
  @apply text-blue-600 border-blue-600;
}

.mobile-menu-btn {
  @apply border-none bg-transparent text-gray-700;
}

.contact-actions {
  @apply space-x-3;
}

.drawer-header {
  @apply flex items-center;
}

.mobile-menu {
  @apply border-none;
}

.mobile-menu .el-menu-item {
  @apply text-gray-700 my-2;
}

.mobile-contact {
  @apply px-4;
}
</style>