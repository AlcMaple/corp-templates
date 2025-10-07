<template>
  <section class="team-section">
    <div class="container">
      <SectionHeader
        title="团队介绍"
        subtitle="Our Team"
        description="汇聚行业精英，打造专业团队，共同创造卓越价值"
        align="center"
      />

      <!-- 团队统计 -->
      <div class="team-stats">
        <el-row :gutter="30">
          <el-col
            v-for="stat in teamStats"
            :key="stat.id"
            :xs="12"
            :sm="6"
            :md="6"
          >
            <div class="stat-item">
              <el-statistic
                :value="stat.value"
                :suffix="stat.suffix"
                :title="stat.title"
                class="stat-number"
              />
              <el-text class="stat-description">{{ stat.description }}</el-text>
            </div>
          </el-col>
        </el-row>
      </div>

      <!-- 核心团队成员 -->
      <div class="core-team">
        <el-text tag="h3" class="core-team-title">核心团队</el-text>

        <el-row :gutter="30" class="team-grid">
          <el-col
            v-for="member in coreTeamMembers"
            :key="member.id"
            :xs="24"
            :sm="12"
            :md="8"
            :lg="6"
          >
            <div class="member-card" @click="showMemberDetail(member)">
              <el-card class="member-card-inner" shadow="never">
                <div class="member-avatar-wrapper">
                  <el-avatar
                    :src="member.avatar"
                    :size="120"
                    class="member-avatar"
                  >
                    {{ member.name.charAt(0) }}
                  </el-avatar>
                </div>

                <div class="member-info">
                  <el-text class="member-name">{{ member.name }}</el-text>
                  <el-text class="member-position">{{
                    member.position
                  }}</el-text>
                  <el-text class="member-department">{{
                    member.department
                  }}</el-text>

                  <!-- 技能标签 -->
                  <div class="member-skills">
                    <el-tag
                      v-for="skill in member.skills.slice(0, 3)"
                      :key="skill"
                      size="small"
                      type="primary"
                      class="skill-tag"
                    >
                      {{ skill }}
                    </el-tag>
                  </div>

                  <!-- 经验指标 -->
                  <div class="member-metrics">
                    <div class="metric-item">
                      <span class="metric-value">{{ member.experience }}</span>
                      <span class="metric-label">年经验</span>
                    </div>
                    <div class="metric-item">
                      <span class="metric-value">{{ member.projects }}</span>
                      <span class="metric-label">个项目</span>
                    </div>
                  </div>
                </div>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </div>

      <!-- 团队部门 -->
      <div class="team-departments">
        <el-text tag="h3" class="departments-title">团队架构</el-text>

        <div class="departments-grid">
          <div
            v-for="department in departments"
            :key="department.id"
            class="department-card"
            @click="showDepartmentDetail(department)"
          >
            <el-card class="department-card-inner" shadow="never">
              <div class="department-header">
                <div class="department-icon-wrapper">
                  <el-icon class="department-icon" :color="department.color">
                    <component :is="department.icon" />
                  </el-icon>
                </div>
                <div class="department-info">
                  <el-text class="department-name">{{
                    department.name
                  }}</el-text>
                  <el-text class="department-description">{{
                    department.description
                  }}</el-text>
                </div>
              </div>

              <div class="department-stats">
                <div class="department-stat">
                  <span class="stat-value">{{ department.memberCount }}</span>
                  <span class="stat-label">团队成员</span>
                </div>
                <div class="department-stat">
                  <span class="stat-value">{{ department.projectCount }}</span>
                  <span class="stat-label">在研项目</span>
                </div>
              </div>

              <!-- 部门职责 -->
              <div class="department-responsibilities">
                <ul class="responsibility-list">
                  <li
                    v-for="responsibility in department.responsibilities.slice(
                      0,
                      3
                    )"
                    :key="responsibility"
                    class="responsibility-item"
                  >
                    <el-icon class="responsibility-icon"><Check /></el-icon>
                    {{ responsibility }}
                  </li>
                </ul>
              </div>
            </el-card>
          </div>
        </div>
      </div>

      <!-- 加入我们 -->
      <div class="join-us">
        <el-card class="join-us-card" shadow="never">
          <div class="join-us-content">
            <el-icon class="join-us-icon"><UserFilled /></el-icon>
            <el-text class="join-us-title">加入我们的团队</el-text>
            <el-text class="join-us-description">
              我们正在寻找有才华、有激情的人才加入我们的团队。
              如果你想在一个充满挑战和机遇的环境中发展，欢迎投递简历。
            </el-text>
            <div class="join-us-actions">
              <el-button type="primary" size="large" @click="handleJoinUs">
                <el-icon><Plus /></el-icon>
                查看职位
              </el-button>
              <el-button size="large" @click="handleContactHR">
                <el-icon><Message /></el-icon>
                联系HR
              </el-button>
            </div>
          </div>
        </el-card>
      </div>
    </div>

    <!-- 成员详情弹窗 -->
    <el-dialog
      v-model="memberDetailVisible"
      :title="selectedMember?.name"
      width="60%"
      center
    >
      <div v-if="selectedMember" class="member-detail">
        <div class="detail-header">
          <el-avatar
            :src="selectedMember.avatar"
            :size="80"
            class="detail-avatar"
          >
            {{ selectedMember.name.charAt(0) }}
          </el-avatar>

          <div class="detail-info">
            <el-text class="detail-name">{{ selectedMember.name }}</el-text>
            <el-text class="detail-position">{{
              selectedMember.position
            }}</el-text>
            <el-text class="detail-department">{{
              selectedMember.department
            }}</el-text>
          </div>
        </div>

        <div class="detail-content">
          <el-text class="detail-bio">{{ selectedMember.bio }}</el-text>

          <!-- 教育背景 -->
          <div v-if="selectedMember.education" class="detail-section">
            <el-text class="section-title">教育背景</el-text>
            <div class="education-list">
              <div
                v-for="edu in selectedMember.education"
                :key="edu.school"
                class="education-item"
              >
                <el-text class="education-degree">{{ edu.degree }}</el-text>
                <el-text class="education-school">{{ edu.school }}</el-text>
                <el-text class="education-year">{{ edu.year }}</el-text>
              </div>
            </div>
          </div>

          <!-- 专业技能 -->
          <div class="detail-section">
            <el-text class="section-title">专业技能</el-text>
            <div class="skills-list">
              <el-tag
                v-for="skill in selectedMember.skills"
                :key="skill"
                type="primary"
                class="skill-tag-detail"
              >
                {{ skill }}
              </el-tag>
            </div>
          </div>

          <!-- 主要成就 -->
          <div v-if="selectedMember.achievements" class="detail-section">
            <el-text class="section-title">主要成就</el-text>
            <ul class="achievements-list">
              <li
                v-for="achievement in selectedMember.achievements"
                :key="achievement"
                class="achievement-item"
              >
                <el-icon class="achievement-icon"><Trophy /></el-icon>
                {{ achievement }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </el-dialog>
  </section>
</template>

<script setup>
import { ref, reactive } from "vue";
import {
  UserFilled,
  TrendCharts,
  Trophy,
  Star,
  Plus,
  Message,
  Check,
  Setting,
  Monitor,
  ShoppingCart,
  Service,
  Management,
  Connection,
} from "@element-plus/icons-vue";
import SectionHeader from "@/components/common/SectionHeader.vue";

const selectedMember = ref(null);
const memberDetailVisible = ref(false);

// 团队统计数据
const teamStats = reactive([
  {
    id: 1,
    icon: UserFilled,
    color: "#409eff",
    title: "团队成员",
    value: 500,
    suffix: "+",
    description: "专业精英",
  },
  {
    id: 2,
    icon: TrendCharts,
    color: "#67c23a",
    title: "平均经验",
    value: 8,
    suffix: "年",
    description: "行业经验",
  },
  {
    id: 3,
    icon: Trophy,
    color: "#e6a23c",
    title: "项目经验",
    value: 1000,
    suffix: "+",
    description: "成功案例",
  },
  {
    id: 4,
    icon: Star,
    color: "#f56c6c",
    title: "客户满意度",
    value: 99,
    suffix: "%",
    description: "服务评价",
  },
]);

// 核心团队成员
const coreTeamMembers = reactive([
  {
    id: 1,
    name: "张总",
    position: "首席执行官",
    department: "管理层",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    experience: 15,
    projects: 100,
    skills: ["战略规划", "团队管理", "商业洞察", "决策执行"],
    bio: "拥有15年企业管理经验，曾在多家知名企业担任高级管理职位。在战略规划、团队建设、业务拓展方面有着丰富的实战经验。",
    education: [
      { degree: "MBA", school: "清华大学", year: "2010" },
      { degree: "工学学士", school: "北京理工大学", year: "2005" },
    ],
    achievements: [
      "带领团队实现年营收500%增长",
      "获得行业杰出企业家奖",
      "成功融资5轮，总额超过2亿",
      "建立了完善的企业管理体系",
    ],
    socials: [
      { type: "linkedin", icon: "Connection", url: "#" },
      { type: "email", icon: "Message", url: "mailto:ceo@company.com" },
    ],
  },
  {
    id: 2,
    name: "李工",
    position: "技术总监",
    department: "技术部",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    experience: 12,
    projects: 80,
    skills: ["系统架构", "Java开发", "微服务", "云计算"],
    bio: "12年软件开发和架构设计经验，专注于企业级应用架构设计和技术团队管理。曾主导多个大型项目的技术架构设计。",
    education: [
      { degree: "计算机硕士", school: "北京大学", year: "2008" },
      { degree: "软件工程学士", school: "华中科技大学", year: "2006" },
    ],
    achievements: [
      "设计的系统架构支撑千万级用户",
      "获得技术创新奖3次",
      "拥有发明专利8项",
      "培养技术骨干50余人",
    ],
    socials: [
      { type: "github", icon: "Connection", url: "#" },
      { type: "email", icon: "Message", url: "mailto:cto@company.com" },
    ],
  },
  {
    id: 3,
    name: "王经理",
    position: "市场总监",
    department: "市场部",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b89e1e18?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    experience: 10,
    projects: 60,
    skills: ["市场营销", "品牌策划", "客户关系", "数据分析"],
    bio: "10年市场营销经验，在品牌建设、市场推广、客户关系管理方面有着深厚的功底。成功策划了多个影响力广泛的营销活动。",
    education: [
      { degree: "MBA", school: "上海交通大学", year: "2012" },
      { degree: "市场营销学士", school: "复旦大学", year: "2010" },
    ],
    achievements: [
      "品牌知名度提升200%",
      "客户获取成本降低30%",
      "获得最佳营销案例奖",
      "建立了覆盖全国的销售网络",
    ],
    socials: [
      { type: "linkedin", icon: "Connection", url: "#" },
      { type: "email", icon: "Message", url: "mailto:marketing@company.com" },
    ],
  },
  {
    id: 4,
    name: "赵设计师",
    position: "设计总监",
    department: "设计部",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    experience: 8,
    projects: 120,
    skills: ["UI设计", "UX研究", "品牌设计", "用户体验"],
    bio: "8年设计经验，专注于用户体验设计和品牌视觉设计。作品多次获得国际设计奖项，在用户界面设计领域有着独特的见解。",
    education: [
      { degree: "设计学硕士", school: "中央美术学院", year: "2014" },
      { degree: "视觉传达学士", school: "清华美院", year: "2012" },
    ],
    achievements: [
      "设计作品获得Red Dot设计奖",
      "产品用户满意度提升40%",
      "建立了完整的设计规范体系",
      "指导设计团队20余人",
    ],
    socials: [
      { type: "behance", icon: "Connection", url: "#" },
      { type: "email", icon: "Message", url: "mailto:design@company.com" },
    ],
  },
]);

// 团队部门
const departments = reactive([
  {
    id: 1,
    name: "技术研发部",
    description: "负责产品技术研发与创新",
    icon: Setting,
    color: "#409eff",
    memberCount: 150,
    projectCount: 25,
    responsibilities: [
      "产品架构设计与开发",
      "技术创新与专利申请",
      "代码质量与性能优化",
      "技术文档编写与维护",
      "新技术调研与应用",
    ],
  },
  {
    id: 2,
    name: "产品设计部",
    description: "负责产品设计与用户体验",
    icon: Monitor,
    color: "#67c23a",
    memberCount: 80,
    projectCount: 15,
    responsibilities: [
      "产品界面设计",
      "用户体验研究",
      "交互原型制作",
      "视觉品牌设计",
      "设计规范制定",
    ],
  },
  {
    id: 3,
    name: "市场营销部",
    description: "负责市场推广与品牌建设",
    icon: ShoppingCart,
    color: "#e6a23c",
    memberCount: 100,
    projectCount: 20,
    responsibilities: [
      "市场策略制定",
      "品牌推广活动",
      "客户关系维护",
      "销售渠道拓展",
      "数据分析与优化",
    ],
  },
  {
    id: 4,
    name: "客户服务部",
    description: "负责客户支持与售后服务",
    icon: Service,
    color: "#f56c6c",
    memberCount: 120,
    projectCount: 10,
    responsibilities: [
      "客户咨询与支持",
      "售后服务处理",
      "客户满意度调研",
      "服务流程优化",
      "客户培训与指导",
    ],
  },
]);

const showMemberDetail = (member) => {
  selectedMember.value = member;
  memberDetailVisible.value = true;
};

const showDepartmentDetail = (department) => {
  console.log("Show department detail:", department);
};

const openSocialLink = (url) => {
  window.open(url, "_blank");
};

const handleJoinUs = () => {
  console.log("Navigate to careers page");
};

const handleContactHR = () => {
  console.log("Contact HR");
};
</script>

<style scoped>
.team-section {
  @apply py-20 bg-white;
}

.container {
  @apply max-w-7xl mx-auto px-4;
}

/* 团队统计 */
.team-stats {
  @apply mb-20;
}

.stat-item {
  @apply text-center bg-gray-50 rounded-xl p-6;
}

.stat-icon {
  @apply text-4xl mb-4;
}

.stat-description {
  @apply text-gray-500 text-sm mt-2;
}

/* 核心团队 */
.core-team {
  @apply mb-20;
}

.core-team-title {
  @apply text-2xl font-bold text-gray-900 text-center mb-12;
}

.team-grid {
  @apply justify-center;
}

.member-card {
  @apply cursor-default;
}

.member-card-inner {
  @apply border-none;
}

.member-avatar-wrapper {
  @apply relative text-center mb-4;
}

.member-avatar {
  @apply mx-auto shadow-lg;
}

.member-social {
  @apply absolute bottom-0 right-0 flex space-x-1 opacity-0 transition-opacity;
}

.member-card:hover .member-social {
  @apply opacity-100;
}

.member-info {
  @apply text-center space-y-2;
}

.member-name {
  @apply block text-lg font-bold text-gray-900;
}

.member-position {
  @apply block text-blue-600 font-medium;
}

.member-department {
  @apply block text-gray-500 text-sm;
}

.member-skills {
  @apply space-x-1 space-y-1;
}

.skill-tag {
  @apply mb-1;
}

.member-metrics {
  @apply flex justify-center space-x-6 pt-3 border-t border-gray-100;
}

.metric-item {
  @apply text-center;
}

.metric-value {
  @apply block text-lg font-bold text-gray-900;
}

.metric-label {
  @apply text-xs text-gray-500;
}

/* 团队部门 */
.team-departments {
  @apply mb-20;
}

.departments-title {
  @apply text-2xl font-bold text-gray-900 text-center mb-12;
}

.departments-grid {
  @apply grid grid-cols-1 md:grid-cols-2 gap-6;
}

.department-card {
  @apply cursor-default;
}

.department-card-inner {
  @apply border-none h-full;
}

.department-header {
  @apply flex items-start space-x-4 mb-6;
}

.department-icon-wrapper {
  @apply flex-shrink-0;
}

.department-icon {
  @apply text-3xl;
}

.department-info {
  @apply flex-1;
}

.department-name {
  @apply block text-lg font-bold text-gray-900;
}

.department-description {
  @apply text-gray-600;
}

.department-stats {
  @apply flex justify-between mb-6 p-4 bg-gray-50 rounded-lg;
}

.department-stat {
  @apply text-center;
}

.stat-value {
  @apply block text-xl font-bold text-gray-900;
}

.stat-label {
  @apply text-sm text-gray-500;
}

.department-responsibilities {
  @apply space-y-2;
}

.responsibility-list {
  @apply space-y-2;
}

.responsibility-item {
  @apply flex items-center space-x-2 text-gray-600 text-sm;
}

.responsibility-icon {
  @apply text-green-500 flex-shrink-0;
}

/* 加入我们 */
.join-us {
  @apply text-center;
}

.join-us-card {
  @apply bg-gradient-to-r from-blue-50 to-purple-50 border-none;
}

.join-us-content {
  @apply space-y-6;
}

.join-us-icon {
  @apply text-5xl text-blue-600;
}

.join-us-title {
  @apply block text-2xl font-bold text-gray-900;
}

.join-us-description {
  @apply text-gray-600 max-w-2xl mx-auto leading-relaxed;
}

.join-us-actions {
  @apply space-x-4;
}

.join-us-actions .el-button--primary:hover {
  background-color: var(--el-color-primary) !important;
  border-color: var(--el-color-primary) !important;
  color: var(--el-color-white) !important;
}

.join-us-actions .el-button:not(.el-button--primary):hover {
  color: var(--el-button-text-color, var(--el-text-color-regular)) !important;
  border-color: var(
    --el-button-border-color,
    var(--el-border-color)
  ) !important;
  background-color: var(--el-button-bg-color, transparent) !important;
  transition: none !important;
}

/* 成员详情弹窗 */
.member-detail {
  @apply space-y-6;
}

.detail-header {
  @apply flex items-center space-x-4 pb-4 border-b border-gray-200;
}

.detail-avatar {
  @apply shadow-lg;
}

.detail-info {
  @apply space-y-1;
}

.detail-name {
  @apply block text-xl font-bold text-gray-900;
}

.detail-position {
  @apply block text-blue-600 font-medium;
}

.detail-department {
  @apply block text-gray-500;
}

.detail-content {
  @apply space-y-6;
}

.detail-bio {
  @apply text-gray-700 leading-relaxed;
}

.detail-section {
  @apply space-y-3;
}

.section-title {
  @apply block text-lg font-semibold text-gray-900;
}

.education-list {
  @apply space-y-3;
}

.education-item {
  @apply bg-gray-50 p-4 rounded-lg;
}

.education-degree {
  @apply block font-semibold text-gray-900;
}

.education-school {
  @apply block text-gray-600;
}

.education-year {
  @apply block text-sm text-gray-500;
}

.skills-list {
  @apply space-x-2 space-y-2;
}

.skill-tag-detail {
  @apply mb-1;
}

.achievements-list {
  @apply space-y-2;
}

.achievement-item {
  @apply flex items-center space-x-2 text-gray-700;
}

.achievement-icon {
  @apply text-yellow-500 flex-shrink-0;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .team-section {
    @apply py-12;
  }

  .team-stats {
    @apply mb-12;
  }

  .stat-item {
    @apply p-4;
  }

  .team-grid {
    @apply gap-4;
  }

  .departments-grid {
    @apply grid-cols-1;
  }

  .department-header {
    @apply space-x-3;
  }

  .department-stats {
    @apply flex-col space-y-3;
  }

  .join-us-actions {
    @apply flex flex-col space-x-0 space-y-3;
  }

  .detail-header {
    @apply flex-col text-center space-x-0 space-y-3;
  }
}
</style>