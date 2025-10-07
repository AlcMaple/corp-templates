<template>
  <div class="products-page">
    <!-- 导航栏 -->
    <Navbar />

    <!-- 页面头部 -->
    <PageHeader
      title="产品服务"
      subtitle="Products & Services"
      description="为客户提供专业的技术解决方案"
      background-image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
    />

    <!-- 产品列表 -->
    <section class="products-section">
      <div class="container">
        <SectionHeader
          title="我们的产品"
          subtitle="Our Products"
          description="满足不同行业需求的专业解决方案"
        />

        <el-row :gutter="30">
          <el-col
            v-for="product in products"
            :key="product.id"
            :xs="24"
            :sm="12"
            :md="8"
          >
            <el-card class="product-card" shadow="never">
              <el-image
                :src="product.image"
                :alt="product.name"
                fit="cover"
                class="product-image"
              />

              <div class="product-content">
                <el-text tag="h3" class="product-name">
                  {{ product.name }}
                </el-text>

                <el-text class="product-description">
                  {{ product.description }}
                </el-text>

                <el-button
                  type="primary"
                  text
                  @click="handleLearnMore(product)"
                >
                  了解更多 →
                </el-button>
              </div>
            </el-card>
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
import { ElMessage } from "element-plus";
import Navbar from "@/components/layout/Navbar.vue";
import Footer from "@/components/layout/Footer.vue";
import PageHeader from "@/components/common/PageHeader.vue";
import SectionHeader from "@/components/common/SectionHeader.vue";

// 产品数据
const products = reactive([
  {
    id: 1,
    name: "企业管理系统",
    description: "帮助企业实现数字化转型，提升管理效率",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "数据分析平台",
    description: "强大的数据处理和可视化分析工具",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "移动办公应用",
    description: "随时随地高效办公，提升团队协作能力",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
]);

// 了解更多
const handleLearnMore = (product) => {
  ElMessage.info(`了解更多关于 ${product.name} 的信息`);
};
</script>

<style scoped>
.products-page {
  min-height: 100vh;
}

.products-section {
  @apply py-20 bg-gray-50;
}

.container {
  @apply max-w-7xl mx-auto px-4;
}

.product-card {
  @apply mb-6 transition-all duration-300 cursor-default;
  border-radius: 12px;
  overflow: hidden;
}

.product-image {
  @apply w-full;
  height: 200px;
}

.product-content {
  @apply p-6 space-y-4;
}

.product-name {
  @apply text-xl font-semibold text-gray-800;
}

.product-description {
  @apply text-gray-600 block;
  line-height: 1.6;
}

.product-content .el-button--primary:hover {
  background-color: #fff !important;
}
</style>