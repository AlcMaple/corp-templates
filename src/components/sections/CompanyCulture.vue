<template>
  <section class="culture-section">
    <div class="container">
      <SectionHeader
        title="企业文化"
        subtitle="Our Culture"
        description="以人为本的企业文化，激发创新活力，共创美好未来"
        align="center"
      />

      <!-- 企业价值观 -->
      <div class="values-section">
        <el-row :gutter="30">
          <el-col
            v-for="value in companyValues"
            :key="value.id"
            :xs="24"
            :sm="12"
            :md="6"
            class="value-col"
          >
            <div class="value-card" @click="showValueDetail(value)">
              <div class="value-icon-wrapper">
                <div
                  class="value-icon-bg"
                  :style="{ backgroundColor: value.color + '20' }"
                >
                  <el-icon class="value-icon" :color="value.color">
                    <component :is="value.icon" />
                  </el-icon>
                </div>
              </div>

              <el-text class="value-title">{{ value.title }}</el-text>
              <el-text class="value-description">{{
                value.description
              }}</el-text>

              <!-- 悬浮时显示更多信息 -->
              <div class="value-overlay">
                <el-text class="overlay-text">{{ value.detail }}</el-text>
                <el-button type="primary" size="small" text>
                  了解更多
                </el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>

      <!-- 企业使命愿景 -->
      <div class="mission-vision">
        <el-row :gutter="40" class="mission-vision-content">
          <el-col :xs="24" :md="12">
            <div class="mission-card">
              <div class="card-header">
                <el-icon class="header-icon" color="#409eff">
                  <Flag />
                </el-icon>
                <el-text class="card-title">企业使命</el-text>
              </div>
              <el-text class="card-content">
                {{ missionVision.mission }}
              </el-text>
              <div class="card-features">
                <div
                  v-for="feature in missionVision.missionFeatures"
                  :key="feature"
                  class="feature-item"
                >
                  <el-icon class="feature-icon"><Check /></el-icon>
                  <span>{{ feature }}</span>
                </div>
              </div>
            </div>
          </el-col>

          <el-col :xs="24" :md="12">
            <div class="vision-card">
              <div class="card-header">
                <el-icon class="header-icon" color="#67c23a">
                  <View />
                </el-icon>
                <el-text class="card-title">企业愿景</el-text>
              </div>
              <el-text class="card-content">
                {{ missionVision.vision }}
              </el-text>
              <div class="card-features">
                <div
                  v-for="feature in missionVision.visionFeatures"
                  :key="feature"
                  class="feature-item"
                >
                  <el-icon class="feature-icon"><Star /></el-icon>
                  <span>{{ feature }}</span>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>

      <!-- 企业文化活动 -->
      <div class="culture-activities">
        <el-text tag="h3" class="activities-title">文化活动</el-text>

        <!-- 原生轮播 -->
        <div class="custom-carousel">
          <div class="carousel-wrapper">
            <div
              class="carousel-track"
              :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
            >
              <div
                v-for="activity in cultureActivities"
                :key="activity.id"
                class="carousel-slide"
              >
                <img
                  :src="activity.image"
                  :alt="activity.title"
                  class="slide-image"
                />
                <div class="slide-content">
                  <h4 class="slide-title">{{ activity.title }}</h4>
                  <p class="slide-description">{{ activity.description }}</p>
                  <div class="slide-tags">
                    <el-tag
                      v-for="tag in activity.tags"
                      :key="tag"
                      :type="activity.tagType"
                      size="small"
                    >
                      {{ tag }}
                    </el-tag>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 左右箭头 -->
          <button class="carousel-arrow carousel-arrow-left" @click="prev">
            <el-icon><ArrowLeft /></el-icon>
          </button>
          <button class="carousel-arrow carousel-arrow-right" @click="next">
            <el-icon><ArrowRight /></el-icon>
          </button>

          <!-- 指示器 -->
          <div class="carousel-indicators">
            <button
              v-for="(activity, index) in cultureActivities"
              :key="activity.id"
              :class="['indicator', { active: index === currentIndex }]"
              @click="goToSlide(index)"
            ></button>
          </div>
        </div>
      </div>

      <!-- 员工福利 -->
      <div class="employee-benefits">
        <el-text tag="h3" class="benefits-title">员工福利</el-text>

        <div class="benefits-grid">
          <div
            v-for="benefit in employeeBenefits"
            :key="benefit.id"
            class="benefit-item"
            @click="showBenefitDetail(benefit)"
          >
            <el-card class="benefit-card" shadow="never">
              <div class="benefit-content">
                <el-text class="benefit-title">{{ benefit.title }}</el-text>
                <el-text class="benefit-description">{{
                  benefit.description
                }}</el-text>

                <!-- 福利详情列表 -->
                <ul class="benefit-list">
                  <li
                    v-for="item in benefit.items"
                    :key="item"
                    class="benefit-list-item"
                  >
                    <el-icon class="list-icon"><Check /></el-icon>
                    {{ item }}
                  </li>
                </ul>
              </div>
            </el-card>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from "vue";
import {
  Trophy,
  UserFilled,
  Promotion,
  Star,
  Flag,
  View,
  Check,
  Picture,
  Money,
  Reading,
  House,
  MagicStick,
  Coffee,
  ArrowLeft,
  ArrowRight,
} from "@element-plus/icons-vue";
import SectionHeader from "@/components/common/SectionHeader.vue";
// 轮播图
import banner1 from "@/assets/01.jpg";
import banner2 from "@/assets/02.jpg";
import banner3 from "@/assets/03.jpg";
import banner4 from "@/assets/04.png";

const selectedValue = ref(null);
const valueDetailVisible = ref(false);

// 轮播图逻辑
const currentIndex = ref(0);
let autoPlayTimer = null;

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % cultureActivities.length;
};

const prev = () => {
  currentIndex.value =
    currentIndex.value === 0
      ? cultureActivities.length - 1
      : currentIndex.value - 1;
};

const goToSlide = (index) => {
  currentIndex.value = index;
};

const startAutoPlay = () => {
  autoPlayTimer = setInterval(() => {
    next();
  }, 5000);
};

const stopAutoPlay = () => {
  if (autoPlayTimer) {
    clearInterval(autoPlayTimer);
    autoPlayTimer = null;
  }
};

onMounted(() => {
  startAutoPlay();
});

onUnmounted(() => {
  stopAutoPlay();
});

// 企业价值观
const companyValues = reactive([
  {
    id: 1,
    icon: Trophy,
    color: "#409eff",
    title: "卓越品质",
    description: "追求完美，精益求精",
  },
  {
    id: 2,
    icon: UserFilled,
    color: "#67c23a",
    title: "团队协作",
    description: "携手共进，共创辉煌",
  },
  {
    id: 3,
    icon: Promotion,
    color: "#e6a23c",
    title: "持续创新",
    description: "拥抱变化，引领未来",
  },
  {
    id: 4,
    icon: Star,
    color: "#f56c6c",
    title: "诚信负责",
    description: "言行一致，勇于担当",
  },
]);

// 企业使命愿景
const missionVision = reactive({
  mission:
    "通过先进的技术和优质的服务，为客户创造价值，为社会贡献力量，让科技改善生活，让创新引领未来。",
  missionFeatures: [
    "为客户提供一流的技术解决方案",
    "推动行业技术进步和发展",
    "创造就业机会，促进社会发展",
    "保护环境，实现可持续发展",
  ],
  vision:
    "成为全球领先的科技创新企业，在核心技术领域达到国际先进水平，成为客户信赖、员工自豪、社会尊敬的百年企业。",
  visionFeatures: [
    "技术创新能力全球领先",
    "产品服务覆盖全球市场",
    "企业品牌享誉国际",
    "可持续发展模式典范",
  ],
});

// 企业文化活动
const cultureActivities = reactive([
  {
    id: 1,
    title: "年度团建活动",
    description:
      "增进员工感情，增强团队凝聚力，在轻松愉快的氛围中加深彼此了解。",
    image: banner1,
    tags: ["团队建设", "户外活动", "员工关怀"],
    tagType: "primary",
  },
  {
    id: 2,
    title: "技术分享大会",
    description: "邀请行业专家分享前沿技术，促进员工技能提升和知识更新。",
    image: banner2,
    tags: ["技术交流", "知识分享", "职业发展"],
    tagType: "success",
  },
  {
    id: 3,
    title: "创新项目大赛",
    description: "鼓励员工发挥创意，提出创新想法，优秀项目获得资金支持。",
    image: banner3,
    tags: ["创新激励", "项目孵化", "奖励机制"],
    tagType: "warning",
  },
  {
    id: 4,
    title: "公益志愿活动",
    description: "组织员工参与社会公益，践行企业社会责任，传递正能量。",
    image: banner4,
    tags: ["社会责任", "志愿服务", "公益慈善"],
    tagType: "danger",
  },
]);

// 员工福利
const employeeBenefits = reactive([
  {
    id: 1,
    icon: Money,
    color: "#409eff",
    title: "薪酬福利",
    description: "具有竞争力的薪酬体系和完善的福利保障",
    items: [
      "具有市场竞争力的基本薪资",
      "年终奖金和绩效奖励",
      "五险一金+补充商业保险",
      "年度体检和健康管理",
      "带薪年假和病假",
    ],
  },
  {
    id: 2,
    icon: Reading,
    color: "#67c23a",
    title: "学习发展",
    description: "多元化的培训体系和职业发展通道",
    items: [
      "新员工入职培训",
      "专业技能提升培训",
      "领导力发展项目",
      "外部培训和会议支持",
      "学历教育资助",
    ],
  },
  {
    id: 3,
    icon: House,
    color: "#e6a23c",
    title: "工作环境",
    description: "现代化的办公环境和人性化的工作设施",
    items: [
      "现代化办公设备",
      "舒适的工作环境",
      "灵活的工作时间",
      "远程办公支持",
      "员工休闲区域",
    ],
  },
  {
    id: 4,
    icon: MagicStick,
    color: "#f56c6c",
    title: "生活关怀",
    description: "全方位的生活关怀和员工支持服务",
    items: [
      "员工餐厅和下午茶",
      "生日祝福和节日礼品",
      "员工困难帮扶基金",
      "子女教育支持",
      "员工家属关怀",
    ],
  },
]);

const showValueDetail = (value) => {
  selectedValue.value = value;
  valueDetailVisible.value = true;
};

const showBenefitDetail = (benefit) => {
  // 显示福利详情
  console.log("Show benefit detail:", benefit);
};
</script>

<style scoped>
.culture-section {
  @apply py-20 bg-gradient-to-br from-gray-50 to-blue-50;
}

.container {
  @apply max-w-7xl mx-auto px-4;
}

/* 价值观部分 */
.values-section {
  @apply mb-20;
}

.value-col {
  @apply mb-8;
}

.value-card {
  @apply relative bg-white rounded-xl p-6 cursor-default overflow-hidden text-center;
}

.value-icon-wrapper {
  @apply mb-4;
}

.value-icon-bg {
  @apply w-16 h-16 rounded-full flex items-center justify-center mx-auto;
}

.value-icon {
  @apply text-2xl;
}

.value-title {
  @apply block text-lg font-semibold text-gray-900 mb-2 text-center;
}

.value-description {
  @apply text-gray-600 text-center text-sm;
}

.value-overlay {
  @apply absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col items-center justify-end p-6 text-white transform translate-y-full transition-transform duration-300;
}

.overlay-text {
  @apply text-sm text-center mb-4 leading-relaxed;
}

/* 使命愿景部分 */
.mission-vision {
  @apply mb-20;
}

.mission-vision-content {
  @apply items-stretch;
}

.mission-card,
.vision-card {
  @apply bg-white rounded-xl p-8 h-full;
}

.card-header {
  @apply flex items-center space-x-3 mb-6;
}

.header-icon {
  @apply text-2xl;
}

.card-title {
  @apply text-xl font-bold text-gray-900;
}

.card-content {
  @apply text-gray-700 leading-relaxed mb-6;
}

.card-features {
  @apply space-y-3;
}

.feature-item {
  @apply flex items-center space-x-2 text-gray-600;
}

.feature-icon {
  @apply text-green-500;
}

/* 文化活动部分 */
.culture-activities {
  @apply mb-20;
}

.activities-title {
  @apply text-2xl font-bold text-gray-900 text-center mb-12;
}

/* 自定义轮播 */
.custom-carousel {
  @apply relative rounded-2xl overflow-hidden shadow-2xl;
  height: 500px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.carousel-wrapper {
  @apply w-full h-full overflow-hidden;
}

.carousel-track {
  @apply flex h-full transition-transform duration-700 ease-in-out;
}

.carousel-slide {
  @apply relative flex-shrink-0 w-full h-full;
}

.slide-image {
  @apply w-full h-full object-cover;
  filter: brightness(0.85);
  transition: filter 0.3s ease;
}

.carousel-slide:hover .slide-image {
  filter: brightness(1);
}

.slide-content {
  @apply absolute inset-0 flex flex-col justify-end p-10;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.6) 40%,
    rgba(0, 0, 0, 0.3) 70%,
    transparent 100%
  );
}

.slide-title {
  @apply text-3xl font-bold mb-4 text-white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  animation: slideUp 0.8s ease-out;
}

.slide-description {
  @apply text-gray-100 leading-relaxed mb-6 text-base;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  max-width: 800px;
  animation: slideUp 1s ease-out;
}

.slide-tags {
  @apply flex gap-2 flex-wrap;
  animation: slideUp 1.2s ease-out;
}

/* 箭头按钮 */
.carousel-arrow {
  @apply absolute top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all duration-300 z-10 border border-white/30;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.carousel-arrow:hover {
  transform: translateY(-50%) scale(1.1);
}

.carousel-arrow-left {
  @apply left-6;
}

.carousel-arrow-right {
  @apply right-6;
}

/* 指示器 */
.carousel-indicators {
  @apply absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10;
}

.indicator {
  @apply h-1 rounded-full bg-white/40 transition-all duration-300 cursor-pointer hover:bg-white/70;
  width: 30px;
  backdrop-filter: blur(4px);
}

.indicator.active {
  @apply bg-white;
  width: 50px;
}

/* 动画 */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 员工福利部分 */
.employee-benefits {
  @apply text-center;
}

.benefits-title {
  @apply text-2xl font-bold text-gray-900 mb-12;
}

.benefits-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6;
}

.benefit-item {
  @apply cursor-default;
}

.benefit-card {
  @apply border-none h-full;
}

.benefit-content {
  @apply space-y-4;
}

.benefit-icon-wrapper {
  @apply text-center;
}

.benefit-icon {
  @apply text-4xl;
}

.benefit-title {
  @apply block text-lg font-semibold text-gray-900 text-center;
}

.benefit-description {
  @apply text-gray-600 text-sm text-center;
}

.benefit-list {
  @apply space-y-2 text-left;
}

.benefit-list-item {
  @apply flex items-start space-x-2 text-gray-600 text-sm;
}

.list-icon {
  @apply text-green-500 mt-0.5 flex-shrink-0;
}

/* 弹窗样式 */
.value-detail {
  @apply space-y-6;
}

.detail-header {
  @apply flex items-center space-x-3 pb-4 border-b border-gray-200;
}

.detail-icon {
  @apply text-3xl;
}

.detail-title {
  @apply text-xl font-bold text-gray-900;
}

.detail-content {
  @apply text-gray-700 leading-relaxed;
}

.detail-examples {
  @apply space-y-3;
}

.examples-title {
  @apply block font-semibold text-gray-900;
}

.examples-list {
  @apply space-y-2;
}

.example-item {
  @apply text-gray-600 pl-4 border-l-2 border-blue-200;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .culture-section {
    @apply py-12;
  }

  .mission-vision-content {
    @apply gap-6;
  }

  .mission-card,
  .vision-card {
    @apply p-6;
  }

  .benefits-grid {
    @apply grid-cols-1 gap-4;
  }

  .custom-carousel {
    height: 400px;
  }

  .slide-content {
    @apply p-6;
  }

  .slide-title {
    @apply text-xl mb-3;
  }

  .slide-description {
    @apply text-sm mb-4;
  }

  .carousel-arrow {
    @apply w-10 h-10;
  }

  .carousel-arrow-left {
    @apply left-3;
  }

  .carousel-arrow-right {
    @apply right-3;
  }

  .carousel-indicators {
    @apply bottom-4;
  }

  .indicator {
    width: 20px;
  }

  .indicator.active {
    width: 35px;
  }
}
</style>