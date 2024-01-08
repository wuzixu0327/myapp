<template>
	<view id="app">
		<aside class="sidebar">
			<view class="category" v-for="(category, index) in categories" :key="index" @click="selectCategory(index)"
				:class="{ active: selectedCategory === index }">
				<h2>{{ category.name }}</h2>
			</view>
		</aside>
		<main class="content">
			<view v-if="selectedCategory !== null" v-for="(item, itemIndex) in categories[selectedCategory].items"
				:key="itemIndex">
				<ul>
					<image class="Content" :src="item.uri"></image>
					<li>
						{{ item.name }}
					</li>
				</ul>
			</view>
			<view v-else>
				<!-- 默认显示的内容 -->
				<!-- Your default content goes here -->
			</view>
		</main>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				categories: [{
						name: "最新发布",
						items: [{
								name: "科学",
								uri: "http://wuzixu.oss-cn-beijing.aliyuncs.com/F1/book1.jpg"
							},
							{
								name: "名著",
								uri: "http://wuzixu.oss-cn-beijing.aliyuncs.com/F1/book2.jpg"
							},
							{
								name: "文章",
								uri: "http://wuzixu.oss-cn-beijing.aliyuncs.com/F1/book3.jpg"
							},
							{
								name: "历史",
								uri: "http://wuzixu.oss-cn-beijing.aliyuncs.com/F1/book4.jpg"
							},
							{
								name: "杂志",
								uri: "http://wuzixu.oss-cn-beijing.aliyuncs.com/F1/book5.jpg"
							},
						]
					},
					{
						name: "国内名著",
						items: [{
								name: "故事",
								uri: "http://wuzixu.oss-cn-beijing.aliyuncs.com/F2/book1.jpg"
							},
							{
								name: "故事",
								uri: "http://wuzixu.oss-cn-beijing.aliyuncs.com/F2/book2.jpg"
							},
							{
								name: "生活",
								uri: "http://wuzixu.oss-cn-beijing.aliyuncs.com/F2/book3.jpg"
							},
							{
								name: "历史",
								uri: "http://wuzixu.oss-cn-beijing.aliyuncs.com/F2/book4.jpg"
							},
							{
								name: "爱情",
								uri: "http://wuzixu.oss-cn-beijing.aliyuncs.com/F2/book5.jpg"
							},
						]
					},
					{
						name: "国外名著",
						items: [{
								name: "写实",
								uri: "http://wuzixu.oss-cn-beijing.aliyuncs.com/F3/book1.jpg"
							},
							{
								name: "经典",
								uri: "http://wuzixu.oss-cn-beijing.aliyuncs.com/F3/book2.jpg"
							},
							{
								name: "爱情",
								uri: "http://wuzixu.oss-cn-beijing.aliyuncs.com/F3/book3.jpg"
							},
							{
								name: "人生",
								uri: "http://wuzixu.oss-cn-beijing.aliyuncs.com/F3/book4.jpg"
							},
						]
					},
					{
						name: "儿童读物",
						items: [{
								name: "青年",
								uri: "http://wuzixu.oss-cn-beijing.aliyuncs.com/F4/book1.jpg"
							},
							{
								name: "儿童",
								uri: "http://wuzixu.oss-cn-beijing.aliyuncs.com/F4/book2.jpg"
							},
							{
								name: "小学",
								uri: "http://wuzixu.oss-cn-beijing.aliyuncs.com/F4/book3.jpg"
							},
							{
								name: "青少年",
								uri: "http://wuzixu.oss-cn-beijing.aliyuncs.com/F4/book4.jpg"
							},
							{
								name: "睡前读物",
								uri: "http://wuzixu.oss-cn-beijing.aliyuncs.com/F4/book5.jpg"
							}
						]
					},
					{
						name: "科技技术",
						items: [{
								name: "自动化",
								uri: "http://wuzixu.oss-cn-beijing.aliyuncs.com/F5/book1.jpg"
							},
							{
								name: "工业化",
								uri: "http://wuzixu.oss-cn-beijing.aliyuncs.com/F5/book2.jpg"
							},
							{
								name: "建筑学",
								uri: "http://wuzixu.oss-cn-beijing.aliyuncs.com/F5/book3.jpg"
							},
							{
								name: "测绘",
								uri: "http://wuzixu.oss-cn-beijing.aliyuncs.com/F5/book4.jpg"
							},
							{
								name: "现代技术",
								uri: "http://wuzixu.oss-cn-beijing.aliyuncs.com/F5/book5.jpg"
							},
						]
					},
					{
						name: "心理健康",
						items: [{
								name: "内心",
								uri: "	http://wuzixu.oss-cn-beijing.aliyuncs.com/F6/book1.jpg"
							},
							{
								name: "积极",
								uri: "	http://wuzixu.oss-cn-beijing.aliyuncs.com/F6/book2.jpg"
							},
							{
								name: "爱情",
								uri: "	http://wuzixu.oss-cn-beijing.aliyuncs.com/F6/book3.jpg"
							},

						]
					},
					{
						name: "美食食谱",
						items: [{
								name: "川菜",
								uri: "http://wuzixu.oss-cn-beijing.aliyuncs.com/F7/book1.jpg"
							},
							{
								name: "粤菜",
								uri: "http://wuzixu.oss-cn-beijing.aliyuncs.com/F7/book2.jpg"
							},
							{
								name: "湘菜",
								uri: "http://wuzixu.oss-cn-beijing.aliyuncs.com/F7/book3.jpg"
							},
							{
								name: "鲁菜",
								uri: "http://wuzixu.oss-cn-beijing.aliyuncs.com/F7/book4.jpg"
							},
							{
								name: "粤菜",
								uri: "http://wuzixu.oss-cn-beijing.aliyuncs.com/F7/book5.jpg"
							},

						]
					},
					{
						name: "养生理疗",
						items: [{
								name: "养身堂",
								uri: "http://wuzixu.oss-cn-beijing.aliyuncs.com/F8/book1.jpg"
							},
							{
								name: "五禽戏",
								uri: "http://wuzixu.oss-cn-beijing.aliyuncs.com/F8/book2.jpg"
							},
							{
								name: "金石药方",
								uri: "http://wuzixu.oss-cn-beijing.aliyuncs.com/F8/book3.jpg"
							},
							{
								name: "中医",
								uri: "http://wuzixu.oss-cn-beijing.aliyuncs.com/F8/book4.jpg"
							},

						]
					},
					{
						name: "音乐摄影",
						items: [{
								name: "音乐史",
								uri: "	http://wuzixu.oss-cn-beijing.aliyuncs.com/F9/book1.jpg"
							},
							{
								name: "音乐律",
								uri: "	http://wuzixu.oss-cn-beijing.aliyuncs.com/F9/book2.jpg"
							},
							{
								name: "音乐调",
								uri: "	http://wuzixu.oss-cn-beijing.aliyuncs.com/F9/book3.jpg"
							},
							{
								name: "声乐谱",
								uri: "	http://wuzixu.oss-cn-beijing.aliyuncs.com/F9/book4.jpg"
							},
							{
								name: "影视法",
								uri: "	http://wuzixu.oss-cn-beijing.aliyuncs.com/F9/book5.jpg"
							},
							{
								name: "民间音乐",
								uri: "	http://wuzixu.oss-cn-beijing.aliyuncs.com/F9/book6.jpg"
							},

						]
					},
					// Add more categories as needed
				],
				selectedCategory: null,
			};
		},
		methods: {
			selectCategory(index) {
				this.selectedCategory = index;
			},
		},

	};
</script>

<style>
	#app {
		display: flex;
	}

	.sidebar {
		width: 120rpx;
		height: 1214rpx;
		background-color: #f0f0f0;
		padding: 20px;
	}

	.category {
		margin-bottom: 20px;
		cursor: pointer;
		padding: 10px;
		border-radius: 5px;
	}

	.category h2 {
		font-size: 20rpx;
	}

	.category:hover {
		background-color: #ddd;
	}

	.active {
		background-color: #ddd;
	}

	.content {
		flex: 1;
		padding: 20px;
		display: flex;
		flex-wrap: wrap;
		align-content: flex-start;
	}

	.content li {
		margin-left: 30%;
	}

	.Content {
		width: 150rpx;
		height: 150rpx;
		border-radius: 75rpx;
		margin: 5rpx;
	}
</style>