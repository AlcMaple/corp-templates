<template>
  <footer class="footer">
    <!-- 主要内容区域 -->
    <div class="footer-main">
      <div class="container">
        <el-row :gutter="40">
          <!-- 公司信息 -->
          <el-col :xs="24" :sm="12" :md="6">
            <div class="footer-section">
              <div class="footer-logo">
                <img src="/logo.jpg" alt="Company Logo" class="logo-image" />
                <span class="logo-text">企业名称</span>
              </div>

              <el-text class="company-description">
                专注于创新技术解决方案的现代化企业，
                以专业技术和优质服务赢得客户信赖。
              </el-text>

              <!-- 社交媒体链接 -->
              <div class="social-links">
                <el-button
                  v-for="social in socialLinks"
                  :key="social.name"
                  :icon="social.icon"
                  circle
                  size="large"
                  class="social-btn"
                  @click="openSocialLink(social.url)"
                />
              </div>
            </div>
          </el-col>

          <!-- 快速链接 -->
          <el-col :xs="24" :sm="12" :md="6">
            <div class="footer-section">
              <el-text class="footer-title">快速链接</el-text>
              <ul class="footer-links">
                <li v-for="link in quickLinks" :key="link.name">
                  <el-link
                    :href="link.url"
                    class="footer-link"
                    @click="handleLinkClick(link)"
                  >
                    {{ link.name }}
                  </el-link>
                </li>
              </ul>
            </div>
          </el-col>

          <!-- 产品服务 -->
          <el-col :xs="24" :sm="12" :md="6">
            <div class="footer-section">
              <el-text class="footer-title">产品服务</el-text>
              <ul class="footer-links">
                <li v-for="service in services" :key="service.name">
                  <el-link
                    :href="service.url"
                    class="footer-link"
                    @click="handleLinkClick(service)"
                  >
                    {{ service.name }}
                  </el-link>
                </li>
              </ul>
            </div>
          </el-col>

          <!-- 联系信息 -->
          <el-col :xs="24" :sm="12" :md="6">
            <div class="footer-section">
              <el-text class="footer-title">联系我们</el-text>

              <div class="contact-info">
                <div class="contact-item">
                  <el-icon class="contact-icon"><Location /></el-icon>
                  <div class="contact-content">
                    <el-text class="contact-label">地址</el-text>
                    <el-text class="contact-value">{{
                      contactInfo.address
                    }}</el-text>
                  </div>
                </div>

                <div class="contact-item">
                  <el-icon class="contact-icon"><Phone /></el-icon>
                  <div class="contact-content">
                    <el-text class="contact-label">电话</el-text>
                    <el-text class="contact-value">{{
                      contactInfo.phone
                    }}</el-text>
                  </div>
                </div>

                <div class="contact-item">
                  <el-icon class="contact-icon"><Message /></el-icon>
                  <div class="contact-content">
                    <el-text class="contact-label">邮箱</el-text>
                    <el-text class="contact-value">{{
                      contactInfo.email
                    }}</el-text>
                  </div>
                </div>

                <div class="contact-item">
                  <el-icon class="contact-icon"><Clock /></el-icon>
                  <div class="contact-content">
                    <el-text class="contact-label">工作时间</el-text>
                    <el-text class="contact-value">{{
                      contactInfo.workTime
                    }}</el-text>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>

        <!-- 新闻订阅 -->
        <div class="newsletter-section">
          <el-card class="newsletter-card" shadow="never">
            <div class="newsletter-content">
              <div class="newsletter-text">
                <el-icon class="newsletter-icon"><Bell /></el-icon>
                <div class="newsletter-info">
                  <el-text class="newsletter-title">订阅我们的新闻</el-text>
                  <el-text class="newsletter-description">
                    获取最新的产品更新、行业动态和技术资讯
                  </el-text>
                </div>
              </div>

              <div class="newsletter-form">
                <el-input
                  v-model="newsletterEmail"
                  placeholder="请输入您的邮箱地址"
                  size="large"
                  class="newsletter-input"
                >
                  <template #append>
                    <el-button
                      type="primary"
                      @click="handleNewsletterSubscribe"
                      :loading="subscribing"
                    >
                      订阅
                    </el-button>
                  </template>
                </el-input>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </div>

    <!-- 底部版权信息 -->
    <div class="footer-bottom">
      <div class="container">
        <el-row :gutter="20" class="bottom-content">
          <el-col :xs="24" :md="12">
            <div class="copyright">
              <el-text class="copyright-text">
                © {{ currentYear }} 企业名称. 保留所有权利.
              </el-text>
            </div>
          </el-col>

          <el-col :xs="24" :md="12">
            <div class="legal-links">
              <el-link
                v-for="link in legalLinks"
                :key="link.name"
                :href="link.url"
                class="legal-link"
                @click="handleLinkClick(link)"
              >
                {{ link.name }}
              </el-link>
            </div>
          </el-col>
        </el-row>

        <!-- 备案信息  -->
        <div class="filing-info">
          <el-text class="filing-text">
            ICP备案号: 京ICP备12345678号-1 | 公安备案号:
            京公网安备11010802012345号
          </el-text>
        </div>
      </div>
    </div>
    <!-- 回到顶部按钮 -->
    <el-backtop :right="50" :bottom="50" :visibility-height="300">
      <div class="backtop-button">
        <el-icon><CaretTop /></el-icon>
      </div>
    </el-backtop>
  </footer>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import {
  Location,
  Phone,
  Message,
  Clock,
  Bell,
  CaretTop,
} from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";

const newsletterEmail = ref("");
const subscribing = ref(false);

const currentYear = computed(() => new Date().getFullYear());

// 社交媒体链接
const socialLinks = reactive([
  { name: "WeChat", icon: "ChatDotRound", url: "#" },
  { name: "Weibo", icon: "Share", url: "#" },
  { name: "LinkedIn", icon: "Connection", url: "#" },
  { name: "Email", icon: "Message", url: "mailto:info@company.com" },
]);

// 快速链接
const quickLinks = reactive([
  { name: "关于我们", url: "/about" },
  { name: "新闻资讯", url: "/news" },
  { name: "招聘信息", url: "/careers" },
  { name: "投资者关系", url: "/investors" },
  { name: "联系我们", url: "/contact" },
  { name: "网站地图", url: "/sitemap" },
]);

// 产品服务
const services = reactive([
  { name: "技术咨询", url: "/services/consulting" },
  { name: "软件开发", url: "/services/development" },
  { name: "系统集成", url: "/services/integration" },
  { name: "运维服务", url: "/services/maintenance" },
  { name: "培训服务", url: "/services/training" },
  { name: "技术支持", url: "/services/support" },
]);

// 联系信息
const contactInfo = reactive({
  address: "北京市朝阳区科技园区创新大厦A座15层",
  phone: "+86 400-123-4567",
  email: "info@company.com",
  workTime: "周一至周五 9:00-18:00",
});

// 法律链接
const legalLinks = reactive([
  { name: "隐私政策", url: "/privacy" },
  { name: "服务条款", url: "/terms" },
  { name: "免责声明", url: "/disclaimer" },
  { name: "法律声明", url: "/legal" },
]);

const openSocialLink = (url) => {
  if (url.startsWith("mailto:")) {
    window.location.href = url;
  } else {
    window.open(url, "_blank");
  }
};

const handleLinkClick = (link) => {
  console.log("Navigate to:", link.url);
  // 这里可以添加路由跳转逻辑
};

const handleNewsletterSubscribe = async () => {
  if (!newsletterEmail.value) {
    ElMessage.warning("请输入邮箱地址");
    return;
  }

  // 简单邮箱格式验证
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(newsletterEmail.value)) {
    ElMessage.error("请输入有效的邮箱地址");
    return;
  }

  subscribing.value = true;

  try {
    // 模拟API调用
    await new Promise((resolve) => setTimeout(resolve, 1000));

    ElMessage.success("订阅成功！您将收到最新的资讯更新");
    newsletterEmail.value = "";
  } catch (error) {
    ElMessage.error("订阅失败，请稍后重试");
  } finally {
    subscribing.value = false;
  }
};
</script>

<style scoped>
.footer {
  @apply bg-gray-900 text-white;
}

.footer-main {
  @apply py-16;
}

.container {
  @apply max-w-7xl mx-auto px-4;
}

.footer-section {
  @apply space-y-6;
}

/* 公司信息 */
.footer-logo {
  @apply flex items-center space-x-3 mb-4;
}

.logo-image {
  @apply h-10 w-10 object-contain;
}

.logo-text {
  @apply text-xl font-bold text-white;
}

.company-description {
  @apply text-gray-300 leading-relaxed;
}

.social-links {
  @apply flex space-x-3;
}

.social-btn {
  @apply bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white;
}

/* 链接区域 */
.footer-title {
  @apply block text-lg font-semibold text-white mb-4;
}

.footer-links {
  @apply space-y-3;
}

.footer-link {
  @apply text-gray-300 hover:text-white transition-colors;
}

/* 联系信息 */
.contact-info {
  @apply space-y-4;
}

.contact-item {
  @apply flex items-start space-x-3;
}

.contact-icon {
  @apply text-blue-400 mt-1 flex-shrink-0;
}

.contact-content {
  @apply space-y-1;
}

.contact-label {
  @apply block text-sm text-gray-400;
}

.contact-value {
  @apply block text-gray-300;
}

/* 新闻订阅 */
.newsletter-section {
  @apply mt-12 pt-8 border-t border-gray-800;
}

.newsletter-card {
  @apply bg-gray-800 border-gray-700;
}

.newsletter-content {
  @apply flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0;
}

.newsletter-text {
  @apply flex items-center space-x-4;
}

.newsletter-icon {
  @apply text-2xl text-blue-400;
}

.newsletter-info {
  @apply space-y-1;
}

.newsletter-title {
  @apply block text-lg font-semibold text-white;
}

.newsletter-description {
  @apply text-gray-300;
}

.newsletter-form {
  @apply w-full lg:w-96;
}

.newsletter-input {
  @apply w-full;
}

/* 底部版权 */
.footer-bottom {
  @apply py-6 bg-gray-950 border-t border-gray-800;
}

.bottom-content {
  @apply items-center;
}

.copyright {
  @apply text-center lg:text-left;
}

.copyright-text {
  @apply text-gray-400;
}

.legal-links {
  @apply flex flex-wrap justify-center lg:justify-end space-x-6;
}

.legal-link {
  @apply text-gray-400 hover:text-white transition-colors text-sm;
}

.filing-info {
  @apply text-center mt-4 pt-4 border-t border-gray-800;
}

.filing-text {
  @apply text-gray-500 text-xs;
}

/* 回到顶部按钮 */
.backtop-button {
  @apply w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-blue-700 transition-colors;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .footer-main {
    @apply py-12;
  }

  .footer-section {
    @apply mb-8 space-y-4;
  }

  .newsletter-content {
    @apply text-center;
  }

  .newsletter-text {
    @apply flex-col space-x-0 space-y-3;
  }

  .legal-links {
    @apply mt-4 space-x-4;
  }

  .legal-link {
    @apply mb-2;
  }
}

/* 深色模式样式 */
.footer-link:hover {
  @apply text-blue-400;
}

.newsletter-input :deep(.el-input__wrapper) {
  @apply bg-gray-700 border-gray-600;
}

.newsletter-input :deep(.el-input__inner) {
  @apply text-white placeholder-gray-400;
}

.newsletter-input :deep(.el-input__wrapper):hover {
  @apply border-gray-500;
}

.newsletter-input :deep(.el-input__wrapper.is-focus) {
  @apply border-blue-500;
}
</style>