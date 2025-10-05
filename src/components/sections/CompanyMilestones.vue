<template>
  <section class="milestones-section">
    <div class="container">
      <SectionHeader
        title="发展历程"
        subtitle="Our Journey"
        description="十五年砥砺前行，见证企业成长的每一个重要时刻"
        align="center"
      />

      <!-- 里程碑时间线 -->
      <div class="milestones-timeline">
        <!-- 桌面端时间线 -->
        <div class="desktop-timeline hidden md:block">
          <div class="timeline-line"></div>
          <div class="milestones-grid">
            <div
              v-for="(milestone, index) in milestones"
              :key="milestone.id"
              class="milestone-item"
              :class="index % 2 === 0 ? 'milestone-top' : 'milestone-bottom'"
              @click="selectMilestone(milestone)"
            >
              <!-- 时间点 -->
              <div
                class="timeline-point"
                :style="{ backgroundColor: milestone.color }"
              >
                <el-icon class="point-icon">
                  <component :is="milestone.icon" />
                </el-icon>
              </div>

              <!-- 里程碑卡片 -->
              <el-card class="milestone-card" shadow="never">
                <div class="card-content">
                  <div class="milestone-year">{{ milestone.year }}</div>
                  <el-text class="milestone-title">{{
                    milestone.title
                  }}</el-text>
                  <el-text class="milestone-desc">{{
                    milestone.description
                  }}</el-text>

                  <!-- 成就标签 -->
                  <div v-if="milestone.achievements" class="achievements">
                    <el-tag
                      v-for="achievement in milestone.achievements"
                      :key="achievement"
                      :type="milestone.tagType"
                      size="small"
                      class="achievement-tag"
                    >
                      {{ achievement }}
                    </el-tag>
                  </div>

                  <!-- 详细数据 -->
                  <div v-if="milestone.stats" class="milestone-stats">
                    <div
                      v-for="stat in milestone.stats"
                      :key="stat.label"
                      class="stat-item"
                    >
                      <el-statistic
                        :value="stat.value"
                        :suffix="stat.suffix"
                        :title="stat.label"
                        class="stat-number"
                      />
                    </div>
                  </div>
                </div>
              </el-card>
            </div>
          </div>
        </div>

        <!-- 移动端时间线 -->
        <div class="mobile-timeline md:hidden">
          <el-timeline class="mobile-timeline-content">
            <el-timeline-item
              v-for="milestone in milestones"
              :key="milestone.id"
              :timestamp="milestone.year"
              :color="milestone.color"
              size="large"
              placement="top"
            >
              <el-card class="mobile-milestone-card" shadow="hover">
                <div class="mobile-card-content">
                  <div class="mobile-milestone-header">
                    <el-icon
                      class="mobile-milestone-icon"
                      :color="milestone.color"
                    >
                      <component :is="milestone.icon" />
                    </el-icon>
                    <el-text class="mobile-milestone-title">{{
                      milestone.title
                    }}</el-text>
                  </div>

                  <el-text class="mobile-milestone-desc">{{
                    milestone.description
                  }}</el-text>

                  <div
                    v-if="milestone.achievements"
                    class="mobile-achievements"
                  >
                    <el-tag
                      v-for="achievement in milestone.achievements"
                      :key="achievement"
                      :type="milestone.tagType"
                      size="small"
                      class="mobile-achievement-tag"
                    >
                      {{ achievement }}
                    </el-tag>
                  </div>

                  <div v-if="milestone.stats" class="mobile-milestone-stats">
                    <div
                      v-for="stat in milestone.stats"
                      :key="stat.label"
                      class="mobile-stat-item"
                    >
                      <el-statistic
                        :value="stat.value"
                        :suffix="stat.suffix"
                        :title="stat.label"
                        class="mobile-stat-number"
                      />
                    </div>
                  </div>
                </div>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from "vue";
import {
  Flag,
  TrendCharts,
  Trophy,
  Promotion,
  Star,
  Check,
} from "@element-plus/icons-vue";
import SectionHeader from "@/components/common/SectionHeader.vue";

const selectedMilestone = ref(null);
const milestoneDetailVisible = ref(false);

const milestones = reactive([
  {
    id: 1,
    year: "2008",
    title: "公司成立",
    description: "正式注册成立，开启创业征程",
    icon: "Flag",
    color: "#409eff",
    tagType: "primary",
    achievements: ["获得营业执照", "组建核心团队", "确立发展方向"],
    stats: [
      { label: "初始团队", value: 10, suffix: "人" },
      { label: "注册资本", value: 500, suffix: "万" },
    ],
  },
  {
    id: 2,
    year: "2012",
    title: "业务拓展",
    description: "首个重大项目成功交付，业务快速增长",
    icon: "TrendCharts",
    color: "#67c23a",
    tagType: "success",
    achievements: ["首个大型项目", "员工突破50人", "营收增长300%"],
    stats: [
      { label: "团队规模", value: 50, suffix: "人" },
      { label: "年营收", value: 5000, suffix: "万" },
      { label: "分支机构", value: 2, suffix: "个" },
    ],
  },
  {
    id: 3,
    year: "2016",
    title: "技术突破",
    description: "核心技术获得重大突破，获得多项专利",
    icon: "Trophy",
    color: "#e6a23c",
    tagType: "warning",
    achievements: ["获得15项专利", "ISO质量认证", "技术研发中心成立"],
    stats: [
      { label: "专利数量", value: 15, suffix: "项" },
      { label: "研发投入", value: 15, suffix: "%" },
      { label: "研发人员", value: 80, suffix: "人" },
    ],
  },
  {
    id: 4,
    year: "2020",
    title: "规模扩张",
    description: "新总部启用，进入快速发展期",
    icon: "Promotion",
    color: "#f56c6c",
    tagType: "danger",
    achievements: ["新总部启用", "员工突破300人", "上市准备启动"],
    stats: [
      { label: "总部面积", value: 15000, suffix: "㎡" },
      { label: "员工总数", value: 300, suffix: "人" },
      { label: "年营收", value: 3, suffix: "亿" },
    ],
  },
  {
    id: 5,
    year: "2023",
    title: "国际化发展",
    description: "业务拓展至海外，国际化布局全面展开",
    icon: "Star",
    color: "#909399",
    tagType: "info",
    achievements: ["海外分公司成立", "国际合作伙伴", "全球化布局"],
    stats: [
      { label: "海外分公司", value: 2, suffix: "个" },
      { label: "合作伙伴", value: 20, suffix: "个" },
      { label: "出口国家", value: 30, suffix: "个" },
    ],
  },
]);

const selectMilestone = (milestone) => {
  selectedMilestone.value = milestone;
  milestoneDetailVisible.value = true;
};
</script>

<style scoped>
.milestones-section {
  @apply py-20 bg-white;
}

.container {
  @apply max-w-7xl mx-auto px-4;
}

.milestones-timeline {
  @apply relative;
}

/* 桌面端时间线 */
.desktop-timeline {
  @apply relative;
}

.timeline-line {
  @apply absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform -translate-y-1/2 z-0;
}

.milestones-grid {
  @apply relative grid grid-cols-5 gap-8 z-10;
}

.milestone-item {
  @apply relative cursor-default;
}

.milestone-top {
  @apply flex flex-col items-center;
}

.milestone-bottom {
  @apply flex flex-col-reverse items-center;
}

.timeline-point {
  @apply w-16 h-16 rounded-full flex items-center justify-center shadow-lg z-20 bg-white border-4 border-white hover:scale-110 transition-transform;
}

.point-icon {
  @apply text-white text-xl;
}

.milestone-card {
  @apply mt-6 mb-6 max-w-xs border-none shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1;
}

.milestone-bottom .milestone-card {
  @apply mt-6 mb-6;
}

.card-content {
  @apply space-y-3;
}

.milestone-year {
  @apply text-2xl font-bold text-gray-800;
}

.milestone-title {
  @apply block text-lg font-semibold text-gray-900;
}

.milestone-desc {
  @apply text-gray-600 text-sm leading-relaxed;
}

.achievements {
  @apply space-x-1 space-y-1;
}

.achievement-tag {
  @apply mb-1;
}

.milestone-stats {
  @apply grid grid-cols-2 gap-3 pt-3 border-t border-gray-100;
}

.stat-item {
  @apply text-center;
}

/* 移动端时间线 */
.mobile-timeline-content {
  @apply space-y-0;
}

.mobile-milestone-card {
  @apply border-none shadow-sm hover:shadow-md transition-shadow;
}

.mobile-card-content {
  @apply space-y-4;
}

.mobile-milestone-header {
  @apply flex items-center space-x-3;
}

.mobile-milestone-icon {
  @apply text-2xl;
}

.mobile-milestone-title {
  @apply text-lg font-semibold text-gray-900;
}

.mobile-milestone-desc {
  @apply text-gray-600 leading-relaxed;
}

.mobile-achievements {
  @apply space-x-1 space-y-1;
}

.mobile-achievement-tag {
  @apply mb-1;
}

.mobile-milestone-stats {
  @apply grid grid-cols-2 gap-4;
}

.mobile-stat-item {
  @apply text-center;
}

/* 弹窗样式 */
.milestone-detail {
  @apply space-y-6;
}

.detail-header {
  @apply flex items-center space-x-4 pb-4 border-b border-gray-200;
}

.detail-year {
  @apply text-3xl font-bold text-gray-800;
}

.detail-icon {
  @apply text-3xl;
}

.detail-description {
  @apply text-gray-700 leading-relaxed;
}

.detail-achievements {
  @apply space-y-3;
}

.achievements-title {
  @apply block text-lg font-semibold text-gray-900;
}

.achievements-list {
  @apply space-y-2;
}

.achievement-item {
  @apply flex items-center space-x-2 text-gray-700;
}

.achievement-check {
  @apply text-green-500;
}

.milestone-images {
  @apply grid grid-cols-2 gap-4;
}

.milestone-image {
  @apply w-full h-32 rounded-lg;
}

/* 响应式调整 */
@media (max-width: 1024px) {
  .milestones-grid {
    @apply grid-cols-3 gap-6;
  }

  .milestone-card {
    @apply max-w-sm;
  }
}

@media (max-width: 768px) {
  .milestones-section {
    @apply py-12;
  }

  .mobile-milestone-stats {
    @apply grid-cols-1 gap-2;
  }

  .milestone-images {
    @apply grid-cols-1;
  }
}
</style>