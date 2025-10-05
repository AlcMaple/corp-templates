<template>
  <section class="company-intro" id="company-intro">
    <div class="container">
      <!-- 章节标题 -->
      <SectionHeader
        title="关于我们"
        subtitle="About Us"
        description="深耕行业多年，以专业技术和优质服务赢得客户信赖"
      />

      <!-- 公司概览 -->
      <div class="company-overview">
        <el-row :gutter="40" class="overview-content">
          <el-col :xs="24" :md="12" class="overview-text">
            <div class="text-content">
              <el-text tag="h3" class="section-title"> 企业简介 </el-text>
              <el-text class="description">
                我们是一家专注于创新技术解决方案的现代化企业，成立于2008年。
                十五年来，我们始终坚持"客户至上、技术领先"的经营理念，
                为全球客户提供高质量的产品和服务。
              </el-text>
              <el-text class="description">
                公司拥有一支经验丰富的专业团队，涵盖研发、设计、销售、服务等各个环节。
                我们持续投入研发创新，已获得多项专利和行业认证，
                在业界享有良好声誉。
              </el-text>

              <!-- 核心优势 -->
              <div class="advantages">
                <div
                  class="advantage-item"
                  v-for="advantage in advantages"
                  :key="advantage.id"
                >
                  <el-icon class="advantage-icon" :color="advantage.color">
                    <component :is="advantage.icon" />
                  </el-icon>
                  <div class="advantage-content">
                    <el-text class="advantage-title">{{
                      advantage.title
                    }}</el-text>
                    <el-text class="advantage-desc">{{
                      advantage.description
                    }}</el-text>
                  </div>
                </div>
              </div>
            </div>
          </el-col>

          <el-col :xs="24" :md="12" class="overview-visual">
            <!-- 公司图片展示 -->
            <div class="image-gallery">
              <el-image
                v-for="(image, index) in companyImages"
                :key="index"
                :src="image.url"
                :alt="image.alt"
                class="gallery-image"
                :class="`image-${index + 1}`"
                fit="cover"
                loading="lazy"
                @click="previewImage(image)"
              >
                <template #error>
                  <div class="image-slot">
                    <el-icon><Picture /></el-icon>
                  </div>
                </template>
              </el-image>
            </div>
          </el-col>
        </el-row>
      </div>

      <!-- 企业数据展示 -->
      <div class="company-data">
        <el-row :gutter="30">
          <el-col
            v-for="stat in companyStats"
            :key="stat.id"
            :xs="12"
            :sm="6"
            :md="6"
            class="stat-col"
          >
            <el-card class="stat-card" shadow="never">
              <div class="stat-content">
                <el-statistic
                  :value="stat.value"
                  :suffix="stat.suffix"
                  :title="stat.title"
                  class="stat-number"
                />
                <el-text class="stat-description">{{
                  stat.description
                }}</el-text>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>

      <!-- 发展历程时间线 -->
      <div class="company-timeline">
        <el-text tag="h3" class="timeline-title">发展历程</el-text>
        <el-timeline class="timeline-content">
          <el-timeline-item
            v-for="milestone in milestones"
            :key="milestone.id"
            :timestamp="milestone.year"
            :color="milestone.color"
            size="large"
            placement="top"
          >
            <el-card class="milestone-card" shadow="never">
              <div class="milestone-content">
                <el-text class="milestone-title">{{ milestone.title }}</el-text>
                <el-text class="milestone-description">{{
                  milestone.description
                }}</el-text>
                <div
                  v-if="milestone.achievements"
                  class="milestone-achievements"
                >
                  <el-tag
                    v-for="achievement in milestone.achievements"
                    :key="achievement"
                    type="success"
                    size="small"
                    class="achievement-tag"
                  >
                    {{ achievement }}
                  </el-tag>
                </div>
              </div>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>

      <!-- 资质认证 -->
      <div class="certifications">
        <el-text tag="h3" class="cert-title">资质荣誉</el-text>
        <el-row :gutter="20" class="cert-grid">
          <el-col
            v-for="cert in certifications"
            :key="cert.id"
            :xs="12"
            :sm="8"
            :md="6"
            :lg="4"
          >
            <div class="cert-item" @click="showCertDetail(cert)">
              <el-image
                :src="cert.image"
                :alt="cert.name"
                class="cert-image"
                fit="contain"
                loading="lazy"
              >
                <template #error>
                  <div class="cert-placeholder">
                    <el-icon><Medal /></el-icon>
                    <span>{{ cert.name }}</span>
                  </div>
                </template>
              </el-image>
              <el-text class="cert-name">{{ cert.name }}</el-text>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <!-- 图片预览弹窗 -->
    <el-dialog
      v-model="imagePreviewVisible"
      :title="currentImage?.alt"
      width="80%"
      center
    >
      <el-image
        v-if="currentImage"
        :src="currentImage.url"
        :alt="currentImage.alt"
        class="preview-image"
        fit="contain"
      />
    </el-dialog>
  </section>
</template>

<script setup>
import { ref, reactive } from "vue";
import {
  Trophy,
  UserFilled,
  Promotion,
  Star,
  Picture,
  Medal,
  TrendCharts,
  Shop,
  Connection,
  Setting,
} from "@element-plus/icons-vue";
import SectionHeader from "@/components/common/SectionHeader.vue";

// 核心优势数据
const advantages = reactive([
  {
    id: 1,
    icon: "Trophy",
    color: "#409eff",
    title: "技术领先",
    description: "拥有业界顶尖的技术团队和先进的研发设备",
  },
  {
    id: 2,
    icon: "UserFilled",
    color: "#67c23a",
    title: "专业团队",
    description: "经验丰富的专业人员，为您提供一对一服务",
  },
  {
    id: 3,
    icon: "Promotion",
    color: "#e6a23c",
    title: "快速响应",
    description: "7x24小时服务支持，快速响应客户需求",
  },
  {
    id: 4,
    icon: "Star",
    color: "#f56c6c",
    title: "品质保证",
    description: "严格的质量管控体系，确保产品和服务品质",
  },
]);

// 公司统计数据
const companyStats = reactive([
  {
    id: 1,
    icon: "TrendCharts",
    color: "#409eff",
    title: "年营业额",
    value: 2.5,
    suffix: "亿",
    description: "持续增长",
  },
  {
    id: 2,
    icon: "UserFilled",
    color: "#67c23a",
    title: "员工数量",
    value: 500,
    suffix: "+",
    description: "专业团队",
  },
  {
    id: 3,
    icon: "Shop",
    color: "#e6a23c",
    title: "服务客户",
    value: 1000,
    suffix: "+",
    description: "遍布全球",
  },
  {
    id: 4,
    icon: "Connection",
    color: "#f56c6c",
    title: "合作伙伴",
    value: 200,
    suffix: "+",
    description: "战略联盟",
  },
]);

// 公司图片
const companyImages = reactive([
  {
    url: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "现代化办公环境",
  },
  {
    url: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "团队协作会议",
  },
  {
    url: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "先进生产设备",
  },
]);

// 发展里程碑
const milestones = reactive([
  {
    id: 1,
    year: "2008",
    color: "#409eff",
    title: "公司成立",
    description: "正式成立，开始专业化服务",
    achievements: ["获得营业执照", "组建核心团队"],
  },
  {
    id: 2,
    year: "2012",
    color: "#67c23a",
    title: "业务拓展",
    description: "业务范围扩大，客户群体增长",
    achievements: ["首个大型项目", "员工突破50人"],
  },
  {
    id: 3,
    year: "2016",
    color: "#e6a23c",
    title: "技术突破",
    description: "核心技术获得重大突破",
    achievements: ["获得专利认证", "ISO质量认证"],
  },
  {
    id: 4,
    year: "2020",
    color: "#f56c6c",
    title: "规模扩张",
    description: "进入快速发展期，规模大幅扩张",
    achievements: ["新总部启用", "员工突破300人"],
  },
  {
    id: 5,
    year: "2023",
    color: "#909399",
    title: "国际化发展",
    description: "业务拓展至海外市场，国际化布局",
    achievements: ["海外分公司", "国际合作伙伴"],
  },
]);

// 资质认证
const certifications = reactive([
  {
    id: 1,
    name: "ISO 9001",
    image: "/cert-iso9001.png",
  },
  {
    id: 2,
    name: "ISO 14001",
    image: "/cert-iso14001.png",
  },
  {
    id: 3,
    name: "高新技术企业",
    image: "/cert-hightech.png",
  },
  {
    id: 4,
    name: "专利证书",
    image: "/cert-patent.png",
  },
  {
    id: 5,
    name: "行业奖项",
    image: "/cert-award.png",
  },
]);

// 图片预览
const imagePreviewVisible = ref(false);
const currentImage = ref(null);

const previewImage = (image) => {
  currentImage.value = image;
  imagePreviewVisible.value = true;
};

const showCertDetail = (cert) => {
  // 显示资质详情
  console.log("Show certification detail:", cert);
};
</script>

<style scoped>
.company-intro {
  @apply py-20 bg-gray-50;
}

.container {
  @apply max-w-7xl mx-auto px-4;
}

.company-overview {
  @apply mb-20;
}

.overview-content {
  @apply items-center;
}

.text-content {
  @apply space-y-6;
}

.section-title {
  @apply text-2xl font-bold text-gray-900;
}

.description {
  @apply text-gray-600 leading-relaxed;
}

.advantages {
  @apply space-y-4 mt-8;
}

.advantage-item {
  @apply flex items-start space-x-4 p-4 bg-white rounded-lg;
}

.advantage-icon {
  @apply text-2xl mt-1;
}

.advantage-content {
  @apply flex-1;
}

.advantage-title {
  @apply block font-semibold text-gray-900 mb-1;
}

.advantage-desc {
  @apply text-gray-600 text-sm;
}

.overview-visual {
  @apply relative;
}

.image-gallery {
  @apply relative grid grid-cols-2 gap-4 h-96;
}

.gallery-image {
  @apply rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow;
}

.image-1 {
  @apply col-span-2 h-48;
}

.image-2,
.image-3 {
  @apply h-44;
}

.image-slot {
  @apply flex flex-col items-center justify-center h-full text-gray-400;
}

.company-data {
  @apply mb-20;
}

.stat-card {
  @apply text-center border-none flex flex-col justify-center items-center;
}

.stat-content {
  @apply space-y-3;
}

.stat-icon {
  @apply text-3xl;
}

.stat-description {
  @apply text-gray-500 text-sm;
}

.company-timeline {
  @apply mb-20;
}

.timeline-title {
  @apply text-2xl font-bold text-gray-900 text-center mb-12;
}

.timeline-content {
  @apply max-w-4xl mx-auto;
}

.milestone-card {
  @apply border-none;
}

.milestone-content {
  @apply space-y-3;
}

.milestone-title {
  @apply block font-semibold text-gray-900;
}

.milestone-description {
  @apply text-gray-600;
}

.milestone-achievements {
  @apply space-x-2;
}

.achievement-tag {
  @apply mb-1;
}

.certifications {
  @apply text-center;
}

.cert-title {
  @apply text-2xl font-bold text-gray-900 mb-12;
}

.cert-grid {
  @apply justify-center;
}

.cert-item {
  @apply cursor-default hover:transform hover:scale-105 transition-transform;
}

.cert-image {
  @apply w-full h-24 mb-3;
}

.cert-placeholder {
  @apply flex flex-col items-center justify-center h-full text-gray-400;
}

.cert-name {
  @apply block text-sm text-gray-600 font-medium;
}

.preview-image {
  @apply w-full max-h-96;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .company-intro {
    @apply py-12;
  }

  .overview-content {
    @apply gap-8;
  }

  .advantages {
    @apply mt-6;
  }

  .advantage-item {
    @apply p-3;
  }

  .image-gallery {
    @apply h-64 gap-2;
  }

  .image-1 {
    @apply h-32;
  }

  .image-2,
  .image-3 {
    @apply h-28;
  }
}
</style>