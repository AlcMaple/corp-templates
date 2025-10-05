<template>
  <div class="about-page">
    <!-- 导航栏 -->
    <Navbar />

    <!-- 页面头部 -->
    <PageHeader
      title="关于我们"
      subtitle="About Us"
      description="深入了解我们的企业故事、价值理念和发展愿景"
      :breadcrumb="breadcrumbItems"
      background-image="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
    />

    <!-- 公司概览 -->
    <section class="company-overview">
      <div class="container">
        <el-row :gutter="40" class="overview-content">
          <el-col :xs="24" :md="12">
            <div class="overview-text">
              <SectionHeader
                title="我们的故事"
                subtitle="Our Story"
                align="left"
              />

              <div class="story-content">
                <el-text class="story-paragraph">
                  自2008年成立以来，我们始终坚持"创新驱动、质量为本"的发展理念，
                  专注于为客户提供高质量的技术解决方案。从最初的几人小团队，
                  发展成为拥有500多名专业人员的现代化企业。
                </el-text>

                <el-text class="story-paragraph">
                  十五年来，我们见证了技术的快速发展，也经历了市场的风云变幻。
                  但不变的是我们对技术创新的执着追求，对客户服务的专业态度，
                  以及对员工发展的用心培养。
                </el-text>

                <el-text class="story-paragraph">
                  今天，我们的产品和服务已经覆盖全球30多个国家和地区，
                  累计为1000多家企业提供了专业的技术支持。
                  我们不仅是技术的提供者，更是客户成功路上的可靠伙伴。
                </el-text>
              </div>
            </div>
          </el-col>

          <el-col :xs="24" :md="12">
            <div class="overview-visual">
              <el-image
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="团队合作"
                class="overview-image"
                fit="cover"
              />

              <!-- 数据展示 -->
              <div class="data-cards">
                <div class="data-card">
                  <el-statistic :value="15" suffix="+" title="发展历程" />
                  <span class="data-unit">年</span>
                </div>
                <div class="data-card">
                  <el-statistic :value="500" suffix="+" title="专业团队" />
                  <span class="data-unit">人</span>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </section>

    <!-- 核心价值观 -->
    <section class="core-values">
      <div class="container">
        <SectionHeader
          title="核心价值观"
          subtitle="Core Values"
          description="指引我们前进的价值理念和行为准则"
        />

        <el-row :gutter="30" class="values-grid">
          <el-col
            v-for="value in coreValues"
            :key="value.id"
            :xs="24"
            :sm="12"
            :md="6"
          >
            <el-card class="value-card" shadow="hover">
              <div class="value-content">
                <div class="value-icon">
                  <el-icon :color="value.color">
                    <component :is="value.icon" />
                  </el-icon>
                </div>
                <el-text class="value-title">{{ value.title }}</el-text>
                <el-text class="value-description">{{
                  value.description
                }}</el-text>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </section>

    <!-- 发展历程 -->
    <CompanyMilestones />

    <!-- 组织架构 -->
    <section class="organization">
      <div class="container">
        <SectionHeader
          title="组织架构"
          subtitle="Organization"
          description="高效的组织结构，确保各部门协调配合"
        />

        <div class="org-chart">
          <div class="org-level org-level-1">
            <div class="org-item org-ceo">
              <div class="org-content">
                <el-icon class="org-icon"><UserFilled /></el-icon>
                <span class="org-title">董事会</span>
                <span class="org-subtitle">Board of Directors</span>
              </div>
            </div>
          </div>

          <div class="org-level org-level-2">
            <div class="org-item">
              <div class="org-content">
                <el-icon class="org-icon"><Management /></el-icon>
                <span class="org-title">总经理</span>
                <span class="org-subtitle">General Manager</span>
              </div>
            </div>
          </div>

          <div class="org-level org-level-3">
            <div class="org-item">
              <div class="org-content">
                <el-icon class="org-icon"><Setting /></el-icon>
                <span class="org-title">技术部</span>
                <span class="org-subtitle">Tech Dept.</span>
              </div>
            </div>
            <div class="org-item">
              <div class="org-content">
                <el-icon class="org-icon"><ShoppingCart /></el-icon>
                <span class="org-title">市场部</span>
                <span class="org-subtitle">Marketing</span>
              </div>
            </div>
            <div class="org-item">
              <div class="org-content">
                <el-icon class="org-icon"><Service /></el-icon>
                <span class="org-title">客服部</span>
                <span class="org-subtitle">Support</span>
              </div>
            </div>
            <div class="org-item">
              <div class="org-content">
                <el-icon class="org-icon"><User /></el-icon>
                <span class="org-title">人事部</span>
                <span class="org-subtitle">HR</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 资质荣誉 -->
    <section class="certifications">
      <div class="container">
        <SectionHeader
          title="资质荣誉"
          subtitle="Certifications"
          description="我们获得的专业认证和行业荣誉"
        />

        <el-row :gutter="20" class="cert-grid">
          <el-col
            v-for="cert in certifications"
            :key="cert.id"
            :xs="12"
            :sm="8"
            :md="6"
            :lg="4"
          >
            <div class="cert-item">
              <el-card class="cert-card" shadow="hover">
                <div class="cert-content">
                  <el-icon class="cert-icon" :color="cert.color">
                    <component :is="cert.icon" />
                  </el-icon>
                  <el-text class="cert-name">{{ cert.name }}</el-text>
                  <el-text class="cert-year">{{ cert.year }}</el-text>
                </div>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </div>
    </section>

    <!-- 底部 -->
    <Footer />
  </div>
</template>

<script setup>
import { reactive } from "vue";
import {
  UserFilled,
  Trophy,
  Star,
  Promotion,
  Check,
  Setting,
  ShoppingCart,
  Service,
  User,
  Management,
  Medal,
} from "@element-plus/icons-vue";
import Navbar from "@/components/layout/Navbar.vue";
import Footer from "@/components/layout/Footer.vue";
import PageHeader from "@/components/common/PageHeader.vue";
import SectionHeader from "@/components/common/SectionHeader.vue";
import CompanyMilestones from "@/components/sections/CompanyMilestones.vue";

// 面包屑导航
const breadcrumbItems = reactive([
  { text: "首页", to: "/" },
  { text: "关于我们", to: "/about" },
]);

// 核心价值观
const coreValues = reactive([
  {
    id: 1,
    icon: "Trophy",
    color: "#409eff",
    title: "卓越品质",
    description: "追求完美，精益求精，为客户提供最优质的产品和服务",
  },
  {
    id: 2,
    icon: "UserFilled",
    color: "#67c23a",
    title: "以人为本",
    description: "重视员工发展，关注客户需求，构建和谐共赢的生态",
  },
  {
    id: 3,
    icon: "Promotion",
    color: "#e6a23c",
    title: "持续创新",
    description: "拥抱变化，勇于创新，用技术推动行业进步",
  },
  {
    id: 4,
    icon: "Star",
    color: "#f56c6c",
    title: "诚信负责",
    description: "诚实守信，勇于担当，对客户、员工和社会负责",
  },
]);

// 资质认证
const certifications = reactive([
  {
    id: 1,
    name: "ISO 9001",
    year: "2020",
    icon: "Medal",
    color: "#409eff",
  },
  {
    id: 2,
    name: "ISO 14001",
    year: "2021",
    icon: "Medal",
    color: "#67c23a",
  },
  {
    id: 3,
    name: "高新技术企业",
    year: "2019",
    icon: "Award",
    color: "#e6a23c",
  },
  {
    id: 4,
    name: "软件著作权",
    year: "2018",
    icon: "Trophy",
    color: "#f56c6c",
  },
  {
    id: 5,
    name: "发明专利",
    year: "2022",
    icon: "Star",
    color: "#909399",
  },
]);
</script>

<style scoped>
.about-page {
  min-height: 100vh;
}

/* 公司概览 */
.company-overview {
  @apply py-20 bg-white;
}

.container {
  @apply max-w-7xl mx-auto px-4;
}

.overview-content {
  @apply items-center;
}

.overview-text {
  @apply space-y-6;
}

.story-content {
  @apply space-y-4;
}

.story-paragraph {
  @apply block text-gray-600 leading-relaxed;
}

.overview-visual {
  @apply relative;
}

.overview-image {
  @apply w-full h-96 rounded-lg shadow-lg;
}

.data-cards {
  @apply absolute -bottom-6 left-6 right-6 flex space-x-4;
}

.data-card {
  @apply bg-white rounded-lg shadow-lg p-4 text-center flex-1;
}

.data-unit {
  @apply block text-xs text-gray-500 mt-1;
}

/* 核心价值观 */
.core-values {
  @apply py-20 bg-gray-50;
}

.values-grid {
  @apply justify-center;
}

.value-card {
  @apply border-none shadow-md hover:shadow-lg transition-shadow h-full;
}

.value-content {
  @apply text-center space-y-4;
}

.value-icon {
  @apply text-4xl;
}

.value-title {
  @apply block text-lg font-semibold text-gray-900;
}

.value-description {
  @apply text-gray-600 text-sm leading-relaxed;
}

/* 组织架构 */
.organization {
  @apply py-20 bg-white;
}

.org-chart {
  @apply space-y-8;
}

.org-level {
  @apply flex justify-center space-x-8;
}

.org-level-1 .org-item {
  @apply bg-blue-600 text-white;
}

.org-level-2 .org-item {
  @apply bg-green-600 text-white;
}

.org-level-3 .org-item {
  @apply bg-gray-600 text-white;
}

.org-item {
  @apply rounded-lg shadow-lg p-6 min-w-32 cursor-pointer hover:shadow-xl transition-shadow;
}

.org-content {
  @apply text-center space-y-2;
}

.org-icon {
  @apply text-2xl;
}

.org-title {
  @apply block font-semibold;
}

.org-subtitle {
  @apply block text-sm opacity-90;
}

/* 资质荣誉 */
.certifications {
  @apply py-20 bg-gray-50;
}

.cert-grid {
  @apply justify-center;
}

.cert-item {
  @apply mb-6;
}

.cert-card {
  @apply border-none shadow-md hover:shadow-lg transition-shadow;
}

.cert-content {
  @apply text-center space-y-3;
}

.cert-icon {
  @apply text-3xl;
}

.cert-name {
  @apply block font-semibold text-gray-900;
}

.cert-year {
  @apply block text-sm text-gray-500;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .about-page section {
    @apply py-12;
  }

  .overview-content {
    @apply gap-8;
  }

  .data-cards {
    @apply relative bottom-auto left-auto right-auto mt-6 flex-col space-x-0 space-y-4;
  }

  .org-level {
    @apply flex-col items-center space-x-0 space-y-4;
  }

  .values-grid {
    @apply gap-4;
  }
}
</style>