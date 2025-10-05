<template>
  <div class="section-header" :class="alignmentClass">
    <!-- 副标题（英文） -->
    <el-text v-if="subtitle" class="subtitle" type="info">
      {{ subtitle }}
    </el-text>

    <!-- 主标题 -->
    <el-text tag="h2" class="title" size="large">
      {{ title }}
    </el-text>

    <!-- 标题装饰线 -->
    <div class="title-decoration">
      <div class="decoration-line"></div>
      <div class="decoration-dot"></div>
      <div class="decoration-line"></div>
    </div>

    <!-- 描述文字 -->
    <el-text v-if="description" class="description">
      {{ description }}
    </el-text>
  </div>
</template>

<script setup>
import { computed } from "vue";

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
  align: {
    type: String,
    default: "center",
    validator: (value) => ["left", "center", "right"].includes(value),
  },
});

const alignmentClass = computed(() => {
  return `align-${props.align}`;
});
</script>

<style scoped>
.section-header {
  @apply mb-16 space-y-4;
}

.section-header.align-center {
  @apply text-center;
}

.section-header.align-left {
  @apply text-left;
}

.section-header.align-right {
  @apply text-right;
}

.subtitle {
  @apply text-sm font-medium tracking-widest uppercase;
  color: #409eff;
}

.title {
  @apply text-3xl md:text-4xl font-bold text-gray-900;
}

.title-decoration {
  @apply flex items-center justify-center space-x-2;
}

.align-left .title-decoration {
  @apply justify-start;
}

.align-right .title-decoration {
  @apply justify-end;
}

.decoration-line {
  @apply h-0.5 w-8 bg-gradient-to-r from-blue-500 to-purple-500;
}

.decoration-dot {
  @apply w-2 h-2 rounded-full bg-blue-500;
}

.description {
  @apply text-lg text-gray-600 max-w-2xl leading-relaxed;
}

.align-center .description {
  @apply mx-auto;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .section-header {
    @apply mb-12 space-y-3;
  }

  .title {
    @apply text-2xl md:text-3xl;
  }

  .description {
    @apply text-base;
  }

  .decoration-line {
    @apply w-6;
  }
}
</style>