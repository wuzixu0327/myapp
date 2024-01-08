<template>
	<view>
		<view class="Lastview"></view>
		<swiper circular :indicator-dots="true" :autoplay="true" :interval="5000" :duration="500" class="swperbox">
			<swiper-item>
				<image class="swiper-item" :src="bookindex"></image>
			</swiper-item>
			<swiper-item>
				<image class="swiper-item" :src="booktwo"></image>
			</swiper-item>
			<swiper-item>
				<image class="swiper-item" :src="bookthree"></image>
			</swiper-item>
		</swiper>
		<view class="search-container">
			<input bindinput="onInput" bindconfirm="onConfirm" placeholder="请输入书名或者作者" />
			<button class="selectbutton">搜索</button>
		</view>
		<view class="hot">
			<view class="indexhot" v-for="(item, index) in items" :key="index">
				<image :src="item.imageUrl"></image>
				<text>{{ item.activityName }}</text>
			</view>
		</view>
		<view class="bookmsg">推荐书籍</view>
		<view class="product-list" @touchstart="handleTouchStart" @touchmove="handleTouchMove">
			<view class="product" v-for="(bookmsg, index) in book" :key="index" @click="handleClick(bookmsg)">
				<image class="bookimage" :src="bookmsg.imageUrl"></image>
				<view class="bookname">{{bookmsg.msg}}</view>
				<view class="money">￥：{{bookmsg.money}}</view>
			</view>
		</view>
		<view class="bookmsg">最近热门</view>
		<view class="product-list">
			<view class="product" v-for="(hot,index) in hot" :key="index">
				<image class="bookimage" :src="hot.imageUrl"></image>
				<view class="bookname">{{hot.msg}}</view>
				<view class="money">￥：{{hot.money}}
				</view>
			</view>
		</view>
		<view class="bookmsg">经典名著</view>
		<view class="product-list">
			<view class="product" v-for="(masterpiece,index) in masterpiece" :key="index">
				<image class="bookimage" :src="masterpiece.imageUrl"></image>
				<view class="bookname">{{masterpiece.msg}}</view>
				<view class="money">￥：{{masterpiece.money}}
				</view>
			</view>
		</view>
		<view class="end">---莫问云深不知处---</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				book: [{
					imageUrl: [],
					msg: [],
					money: []
				}],
				book2: [{
					imageUrl: [],
					msg: [],
					money: []
				}],
				book3: [{
					imageUrl: [],
					msg: [],
					money: []
				}],
				hot: [{
					imageUrl: [],
					msg: [],
					money: []
				}],
				masterpiece: [{
					imageUrl: [],
					msg: [],
					money: []
				}],
				bookindex: "http://wuzixu.oss-cn-beijing.aliyuncs.com/images/bookindex.jpg", // 默认图片路径
				booktwo: "http://wuzixu.oss-cn-beijing.aliyuncs.com/images/booktwo.jpg", // 默认图片路径
				bookthree: "http://wuzixu.oss-cn-beijing.aliyuncs.com/images/boothree.jpg", // 默认图片路径
				items: [{
						imageUrl: '	http://wuzixu.oss-cn-beijing.aliyuncs.com/images/hot1.png',
						activityName: '我的书房'
					},
					{
						imageUrl: 'http://wuzixu.oss-cn-beijing.aliyuncs.com/images/hot2.png',
						activityName: '最新上架'
					},
					{
						imageUrl: '	http://wuzixu.oss-cn-beijing.aliyuncs.com/images/hot3.png',
						activityName: '限时促销'
					},
					{
						imageUrl: 'http://wuzixu.oss-cn-beijing.aliyuncs.com/images/hot4.png',
						activityName: '相关活动'
					}
					// 添加更多活动信息
				],
			};
		},
		async created() {
			await this.fetchData(); // 在 created 钩子中调用 fetchData 函数  
			this.book = this.book2;
		},
		// 在需要的时候，比如在mounted钩子中，可以修改imageSrc的值
		methods: {
			handleClick(bookmsg) {
				uni.navigateTo({
					url: '/pages/bookmassage/bookmassage?msg=' + bookmsg.msg,
				});
			},
			async fetchData() {
				try {
					const res = await uniCloud.callFunction({
						name: 'getBook',
						data: {
							// 传递给云函数的参数  
							// 例如：{ key: 'value' }  
						}
					});
					const res2 = await uniCloud.callFunction({
						name: 'getBook2',
						data: {
							// 传递给云函数的参数  
							// 例如：{ key: 'value' }  
						}
					});
					const hot = await uniCloud.callFunction({
						name: 'gethotbook',
						data: {
							// 传递给云函数的参数  
							// 例如：{ key: 'value' }  
						}
					});
					const Master = await uniCloud.callFunction({
						name: 'getMater',
						data: {
							// 传递给云函数的参数  
							// 例如：{ key: 'value' }  
						}
					});

					// 假设 res.result 是云函数返回的数据  
					if (res.result && res.result.data && res.result.data.length > 0) {
						console.log('成功获取到的数据：', res.result.data);

						// 处理获取到的数据并返回  
						const bookData = res.result.data.map(item => ({
							imageUrl: item.uri,
							msg: item.name,
							money: item.money,
						}));
						this.book2 = bookData; // 返回处理后的数据  
					}
					if (res2.result && res2.result.data && res2.result.data.length > 0) {
						console.log('成功获取到的数据：', res2.result.data);
						// 处理获取到的数据并返回  
						const bookData = res2.result.data.map(item => ({
							imageUrl: item.uri,
							msg: item.name,
							money: item.money,
						}));
						this.book3 = bookData; // 返回处理后的数据  
					}
					if (hot.result && hot.result.data && hot.result.data.length > 0) {
						console.log('成功获取到的数据：', hot.result.data);
						// 处理获取到的数据并返回  
						const bookData = hot.result.data.map(item => ({
							imageUrl: item.uri,
							msg: item.name,
							money: item.money,
						}));
						this.hot = bookData; // 返回处理后的数据  
					}
					if (Master.result && Master.result.data && Master.result.data.length > 0) {
						console.log('成功获取到的数据：', Master.result.data);
						// 处理获取到的数据并返回  
						const bookData = Master.result.data.map(item => ({
							imageUrl: item.uri,
							msg: item.name,
							money: item.money,
						}));
						this.masterpiece = bookData; // 返回处理后的数据  
					} else {
						console.log('未找到相关数据');
						return []; // 返回空数组或根据需要处理的其他值  
					}
				} catch (error) {
					console.error('获取数据失败', error);
					return []; // 返回空数组或根据需要处理的其他值  
				}
			},
			handleTouchStart(event) {
				// 记录触摸起始位置
				this.startX = event.touches[0].clientX;
			},
			handleTouchMove(event) {
				// 计算滑动距离
				const deltaX = event.touches[0].clientX - this.startX;

				// 判断滑动方向，这里以 deltaX 大于某个阈值为右滑动作
				if (deltaX < -100) {
					// 右滑动作
					this.book = this.book3;
				}
				if (deltaX > 100) {
					this.book = this.book2;
				}
			},

		},
	}
</script>
<style>
	.Lastview {
		width: 750rpx;
		height: 400rpx;
		background-image: url("https://wuzixu.oss-cn-beijing.aliyuncs.com/index.jpg");
		background-size: cover;
	}

	.swperbox {
		position: relative;
		top: -350rpx;
		left: 25rpx;
		width: 700rpx;
		height: 400rpx;
		border-radius: 30rpx;
	}

	.swiper-item {
		border-radius: 20rpx;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-size: cover;
		/* 使背景图铺满父盒子 */
		background-position: center;
		/* 使背景图居中 */
	}

	.product-list {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 1rpx 20rpx;
	}

	.product {
		position: relative;
		top: -300rpx;
		width: 330rpx;
		height: 450rpx;
		margin-bottom: 20px;
		border-radius: 20rpx;
		background: whitesmoke;
	}

	.bookmsg {
		position: relative;
		top: -280rpx;
		left: 325rpx;
		padding-bottom: 20px;
		font-family: "宋体", sans-serif;
		font-size: 20px;
	}

	.bookimage {
		border-top-left-radius: 20rpx;
		/* 左上角的弧度半径 */
		border-top-right-radius: 20rpx;
		width: 100%;
		height: 65%;
	}

	.bookname {
		width: 95%;
		height: 80rpx;
		overflow: hidden;
		white-space: normal;
		/* 允许换行 */
		word-wrap: break-word;
		margin: 0 10rpx;
		font-family: "宋体", sans-serif;
		font-size: 18rpx;
	}

	.money {
		width: 100%;
		margin: 0 10rpx;
		color: red;
		display: flex;
	}

	.search-container {
		position: relative;
		top: -300rpx;
		display: flex;
		align-items: center;
		padding: 30rpx;
	}

	input {
		flex: 1;
		height: 30rpx;
		border: 1px solid #ccc;
		padding: 15rpx;
	}

	.selectbutton {
		width: 150rpx;
		height: 60rpx;
		background-color: #399;
		color: #fff;
		border-radius: 0;
		text-align: center;
	}

	.hot {
		position: relative;
		top: -300rpx;
		width: 750rpx;
		height: 200rpx;
		display: flex;
		margin-right: 5rpx;
	}

	.indexhot {
		width: 165rpx;
		height: 200rpx;
		margin: 0rpx 12rpx;
	}

	.indexhot image {
		width: 165rpx;
		height: 150rpx;
	}

	.indexhot text {
		margin-left: 15%;
		font-size: 30rpx;
	}

	.end {
		font-family: "宋体", sans-serif;
		margin-left: 35%;
		font-size: 30rpx;
		color: black;
	}
</style>