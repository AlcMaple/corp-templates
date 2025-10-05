<template>
  <section class="hero-section">
    <div class="hero-container">
      <div class="hero-content">
        <!-- 左侧内容 -->
        <div class="hero-text">
          <el-text tag="h1" class="hero-title" size="large">
            创新引领未来
            <br />
            <span class="hero-highlight">科技改变世界</span>
          </el-text>

          <el-text class="hero-subtitle" type="info">
            我们致力于为客户提供最先进的技术解决方案，
            通过持续创新和卓越服务，成为行业领导者。
          </el-text>

          <!-- CTA 按钮组 -->
          <div class="hero-actions">
            <el-button type="primary" size="large" @click="handleExplore">
              了解更多
            </el-button>
            <el-button size="large" @click="handleContact">
              联系我们
            </el-button>
          </div>

          <!-- 统计数据 -->
          <div class="hero-stats">
            <div class="stat-item">
              <el-statistic
                :value="statisticsData.years"
                suffix="+"
                title="发展历程"
              />
              <span class="stat-unit">年</span>
            </div>
            <div class="stat-item">
              <el-statistic
                :value="statisticsData.clients"
                suffix="+"
                title="服务客户"
              />
              <span class="stat-unit">家</span>
            </div>
            <div class="stat-item">
              <el-statistic
                :value="statisticsData.projects"
                suffix="+"
                title="成功项目"
              />
              <span class="stat-unit">个</span>
            </div>
          </div>
        </div>

        <!-- 右侧图片/视频 -->
        <div class="hero-media">
          <el-image
            :src="heroImage"
            alt="Company Hero Image"
            class="hero-image"
            fit="cover"
            loading="lazy"
          >
            <template #error>
              <div class="image-slot">
                <el-icon><Picture /></el-icon>
                <span>加载失败</span>
              </div>
            </template>
          </el-image>

          <!-- 装饰元素 -->
          <div class="hero-decoration">
            <div class="decoration-circle decoration-circle-1"></div>
            <div class="decoration-circle decoration-circle-2"></div>
            <div class="decoration-square"></div>
          </div>
        </div>
      </div>

      <!-- 滚动指示器 -->
      <div class="scroll-indicator" @click="scrollToNext">
        <el-icon class="scroll-icon"><ArrowDown /></el-icon>
        <span class="scroll-text">了解更多</span>
      </div>
    </div>

    <!-- 背景装饰 -->
    <div class="hero-background">
      <div class="bg-pattern bg-pattern-1"></div>
      <div class="bg-pattern bg-pattern-2"></div>
      <div class="bg-gradient"></div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { View, Phone, Picture, ArrowDown } from "@element-plus/icons-vue";

const heroImage = ref(
  "https://images.unsplash.com/photo-1560472355-536de3962603?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
);

const statisticsData = reactive({
  years: 0,
  clients: 0,
  projects: 0,
});

// 数字动画效果
const animateNumbers = () => {
  const targets = { years: 15, clients: 500, projects: 1000 };
  const duration = 2000;
  const steps = 60;
  const interval = duration / steps;

  let step = 0;
  const timer = setInterval(() => {
    step++;
    const progress = step / steps;

    statisticsData.years = Math.floor(targets.years * progress);
    statisticsData.clients = Math.floor(targets.clients * progress);
    statisticsData.projects = Math.floor(targets.projects * progress);

    if (step >= steps) {
      clearInterval(timer);
      statisticsData.years = targets.years;
      statisticsData.clients = targets.clients;
      statisticsData.projects = targets.projects;
    }
  }, interval);
};

const handleExplore = () => {
  // 滚动到公司介绍部分
  scrollToNext();
};

const handleContact = () => {
  // 跳转到联系页面或打开联系弹窗
  console.log("Contact us");
};

const scrollToNext = () => {
  const nextSection = document.querySelector(".company-intro");
  if (nextSection) {
    nextSection.scrollIntoView({ behavior: "smooth" });
  }
};

onMounted(() => {
  // 页面加载后启动数字动画
  setTimeout(() => {
    animateNumbers();
  }, 500);
});
</script>

<style scoped>
.hero-section {
  @apply relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100;
  padding-top: 80px; /* 为固定导航栏留空间 */
}

.hero-container {
  @apply relative max-w-7xl mx-auto px-4 py-20 z-10;
}

.hero-content {
  @apply grid grid-cols-1 lg:grid-cols-2 gap-12 items-center;
}

.hero-text {
  @apply space-y-8;
}

.hero-title {
  @apply text-4xl md:text-6xl font-bold text-gray-900 leading-tight;
}

.hero-highlight {
  @apply text-blue-600 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent;
}

.hero-subtitle {
  @apply text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg;
}

.hero-actions {
  @apply flex flex-col sm:flex-row gap-4;
}

.hero-stats {
  @apply grid grid-cols-3 gap-8 pt-8 border-t border-gray-200;
}

.stat-item {
  @apply text-center;
}

.stat-unit {
  @apply block text-sm text-gray-500 mt-1;
}

.hero-media {
  @apply relative;
}

.hero-image {
  @apply w-full h-96 lg:h-[500px] rounded-2xl shadow-2xl;
}

.image-slot {
  @apply flex flex-col items-center justify-center h-full text-gray-400;
}

.hero-decoration {
  @apply absolute inset-0 pointer-events-none;
}

.decoration-circle {
  @apply absolute rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-20;
}

.decoration-circle-1 {
  @apply w-20 h-20 -top-4 -right-4 animate-pulse;
}

.decoration-circle-2 {
  @apply w-12 h-12 -bottom-10 -left-12 animate-bounce;
}

.decoration-square {
  @apply absolute w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 opacity-20 top-1/2 -left-8 transform rotate-45 animate-pulse;
}

.scroll-indicator {
  @apply absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2 cursor-pointer text-gray-600 hover:text-blue-600 transition-colors;
}

.scroll-icon {
  @apply text-xl animate-bounce;
}

.scroll-text {
  @apply text-sm font-medium;
}

.hero-background {
  @apply absolute inset-0 overflow-hidden;
}

.bg-pattern {
  @apply absolute rounded-full bg-gradient-to-r opacity-10;
}

.bg-pattern-1 {
  @apply w-96 h-96 from-blue-400 to-purple-400 -top-48 -right-48 animate-pulse;
}

.bg-pattern-2 {
  @apply w-80 h-80 from-purple-400 to-pink-400 -bottom-40 -left-40 animate-pulse;
  animation-delay: 1s;
}

.bg-gradient {
  @apply absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .hero-title {
    @apply text-3xl;
  }

  .hero-stats {
    @apply gap-4;
  }

  .hero-actions {
    @apply flex-col;
  }
}
</style>