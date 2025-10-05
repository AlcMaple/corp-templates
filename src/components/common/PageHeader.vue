<template>
  <section class="page-header" :style="headerStyle">
    <!-- 背景遮罩 -->
    <div class="header-overlay"></div>

    <!-- 头部内容 -->
    <div class="header-content">
      <div class="container">
        <!-- 面包屑导航 -->
        <el-breadcrumb
          v-if="breadcrumb && breadcrumb.length > 0"
          separator="/"
          class="header-breadcrumb"
        >
          <el-breadcrumb-item
            v-for="(item, index) in breadcrumb"
            :key="index"
            :to="item.to"
            class="breadcrumb-item"
          >
            {{ item.text }}
          </el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 页面标题 -->
        <div class="header-text">
          <!-- 英文副标题 -->
          <el-text v-if="subtitle" class="header-subtitle">
            {{ subtitle }}
          </el-text>

          <!-- 主标题 -->
          <el-text tag="h1" class="header-title">
            {{ title }}
          </el-text>

          <!-- 标题装饰线 -->
          <div class="title-decoration">
            <div class="decoration-line"></div>
            <div class="decoration-dot"></div>
            <div class="decoration-line"></div>
          </div>

          <!-- 描述文字 -->
          <el-text v-if="description" class="header-description">
            {{ description }}
          </el-text>
        </div>

        <!-- 操作按钮 -->
        <div v-if="actions && actions.length > 0" class="header-actions">
          <el-button
            v-for="action in actions"
            :key="action.text"
            :type="action.type || 'primary'"
            :size="action.size || 'large'"
            :icon="action.icon"
            @click="handleActionClick(action)"
          >
            {{ action.text }}
          </el-button>
        </div>
      </div>
    </div>

    <!-- 滚动指示器 -->
    <div
      v-if="showScrollIndicator"
      class="scroll-indicator"
      @click="scrollToContent"
    >
      <el-icon class="scroll-icon"><ArrowDown /></el-icon>
      <span class="scroll-text">继续浏览</span>
    </div>

    <!-- 装饰元素 -->
    <div class="header-decorations">
      <div class="decoration-shape decoration-shape-1"></div>
      <div class="decoration-shape decoration-shape-2"></div>
      <div class="decoration-shape decoration-shape-3"></div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { ArrowDown } from "@element-plus/icons-vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  backgroundImage: {
    type: String,
    default: "",
  },
  backgroundColor: {
    type: String,
    default: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  height: {
    type: String,
    default: "70vh",
  },
  breadcrumb: {
    type: Array,
    default: () => [],
  },
  actions: {
    type: Array,
    default: () => [],
  },
  showScrollIndicator: {
    type: Boolean,
    default: true,
  },
  overlayOpacity: {
    type: Number,
    default: 0.6,
  },
});

const emit = defineEmits(["action-click"]);

// 计算头部样式
const headerStyle = computed(() => {
  const styles = {
    minHeight: props.height,
  };

  if (props.backgroundImage) {
    styles.backgroundImage = `url(${props.backgroundImage})`;
    styles.backgroundSize = "cover";
    styles.backgroundPosition = "center";
    styles.backgroundRepeat = "no-repeat";
  } else {
    styles.background = props.backgroundColor;
  }

  return styles;
});

// 处理操作按钮点击
const handleActionClick = (action) => {
  if (action.onClick) {
    action.onClick();
  }
  emit("action-click", action);
};

// 滚动到内容区域
const scrollToContent = () => {
  const nextElement = document.querySelector(".page-header").nextElementSibling;
  if (nextElement) {
    nextElement.scrollIntoView({ behavior: "smooth" });
  }
};
</script>

<style scoped>
.page-header {
  @apply relative flex items-center justify-center overflow-hidden;
  padding-top: 80px; /* 为固定导航栏留空间 */
}

.header-overlay {
  @apply absolute inset-0 bg-black;
  opacity: v-bind("props.overlayOpacity");
}

.header-content {
  @apply relative z-10 text-center text-white py-16;
  width: 100%;
}

.container {
  @apply max-w-4xl mx-auto px-4;
}

/* 面包屑导航 */
.header-breadcrumb {
  @apply mb-8;
}

.breadcrumb-item {
  @apply text-white/80;
}

.breadcrumb-item:hover {
  @apply text-white;
}

/* 头部文字 */
.header-text {
  @apply space-y-6;
}

.header-subtitle {
  @apply text-sm font-medium tracking-widest uppercase text-blue-200;
}

.header-title {
  @apply text-4xl md:text-6xl font-bold leading-tight;
}

.title-decoration {
  @apply flex items-center justify-center space-x-3;
}

.decoration-line {
  @apply h-0.5 w-12 bg-gradient-to-r from-blue-400 to-purple-400;
}

.decoration-dot {
  @apply w-3 h-3 rounded-full bg-blue-400;
}

.header-description {
  @apply text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed;
}

/* 操作按钮 */
.header-actions {
  @apply flex flex-col sm:flex-row justify-center items-center gap-4 mt-8;
}

/* 滚动指示器 */
.scroll-indicator {
  @apply absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2 cursor-pointer text-white/80 hover:text-white transition-colors z-10;
}

.scroll-icon {
  @apply text-xl animate-bounce;
}

.scroll-text {
  @apply text-sm font-medium;
}

/* 装饰元素 */
.header-decorations {
  @apply absolute inset-0 overflow-hidden pointer-events-none;
}

.decoration-shape {
  @apply absolute rounded-full opacity-10;
}

.decoration-shape-1 {
  @apply w-96 h-96 bg-gradient-to-r from-blue-400 to-purple-400 -top-48 -right-48 animate-pulse;
}

.decoration-shape-2 {
  @apply w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-400 top-1/4 -left-40 animate-pulse;
  animation-delay: 1s;
}

.decoration-shape-3 {
  @apply w-64 h-64 bg-gradient-to-r from-pink-400 to-red-400 -bottom-32 right-1/4 animate-pulse;
  animation-delay: 2s;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .page-header {
    @apply min-h-screen;
    padding-top: 80px;
  }

  .header-content {
    @apply py-12;
  }

  .header-title {
    @apply text-3xl md:text-4xl;
  }

  .header-description {
    @apply text-base;
  }

  .header-actions {
    @apply flex-col gap-3;
  }

  .decoration-line {
    @apply w-8;
  }

  .decoration-dot {
    @apply w-2 h-2;
  }
}

/* 动画效果 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.header-text > * {
  animation: fadeInUp 0.8s ease-out;
}

.header-subtitle {
  animation-delay: 0.1s;
}

.header-title {
  animation-delay: 0.2s;
}

.title-decoration {
  animation-delay: 0.3s;
}

.header-description {
  animation-delay: 0.4s;
}

.header-actions {
  animation: fadeInUp 0.8s ease-out;
  animation-delay: 0.5s;
}

/* 深色主题兼容 */
@media (prefers-color-scheme: dark) {
  .header-overlay {
    @apply bg-gray-900;
  }
}

/* 高对比度模式支持 */
@media (prefers-contrast: high) {
  .header-title {
    @apply text-white;
  }

  .header-description {
    @apply text-gray-100;
  }
}

/* 减少动画效果（用户偏好） */
@media (prefers-reduced-motion: reduce) {
  .scroll-icon,
  .decoration-shape {
    @apply animate-none;
  }

  .header-text > *,
  .header-actions {
    animation: none;
  }
}
</style>