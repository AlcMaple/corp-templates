<template>
  <div class="home-page">
    <!-- 导航栏 -->
    <Navbar />

    <!-- Hero 区域 -->
    <HeroSection />

    <!-- 公司介绍模块 -->
    <CompanyIntro />

    <!-- 公司里程碑 -->
    <CompanyMilestones />

    <!-- 企业文化 -->
    <CompanyCulture />

    <!-- 团队介绍 -->
    <TeamSection />

    <!-- 底部 -->
    <Footer />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import Navbar from "@/components/layout/Navbar.vue";
import Footer from "@/components/layout/Footer.vue";
import HeroSection from "@/components/sections/HeroSection.vue";
import CompanyIntro from "@/components/sections/CompanyIntro.vue";
import CompanyMilestones from "@/components/sections/CompanyMilestones.vue";
import CompanyCulture from "@/components/sections/CompanyCulture.vue";
import TeamSection from "@/components/sections/TeamSection.vue";

onMounted(() => {
  // 页面加载完成后的处理
  console.log("Home page mounted");
});
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  overflow-x: hidden;
}

/* 确保页面滚动平滑 */
html {
  scroll-behavior: smooth;
}

/* 全局样式重置 */
* {
  box-sizing: border-box;
}

/* 响应式图片 */
img {
  max-width: 100%;
  height: auto;
}

/* 链接样式 */
a {
  text-decoration: none;
  transition: all 0.3s ease;
}

/* 按钮悬停效果 */
.el-button {
  transition: all 0.3s ease;
}

/* 卡片悬停效果 */
.el-card {
  transition: all 0.3s ease;
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .home-page {
    font-size: 14px;
  }
}

/* 页面动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.home-page {
  animation: fadeIn 0.6s ease-out;
}

/* 性能优化 */
.home-page * {
  will-change: auto;
}

/* 减少重绘 */
.home-page img,
.home-page video {
  transform: translateZ(0);
}
</style>