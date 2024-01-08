<template>
	<view class="color">
		<view>
			<swiper circular :indicator-dots="true" :autoplay="true" :interval="5000" :duration="500" class="swperbox">
				<swiper-item>
					<image class="swiper-item" :src="msg.url1"></image>
				</swiper-item>
				<swiper-item>
					<image class="swiper-item" :src="msg.url2"></image>
				</swiper-item>
				<swiper-item>
					<image class="swiper-item" :src="msg.url3"></image>
				</swiper-item>
				<swiper-item>
					<image class="swiper-item" :src="msg.url4"></image>
				</swiper-item>
				<swiper-item>
					<image class="swiper-item" :src="msg.url5"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="bookmassage">
			<ul>
				<li class="title">
					书名: {{msg.name}}
				</li>
				<li class="money">
					价格： {{msg.money}}
				</li>
			</ul>
			<view class="notice">
				<view class="noticetop">
					<image class="logo"></image>云上书店经过认证，保证书源正宗
				</view>
				<view class="noticeziti">服务：7天无理由（部分不支持）·退换免运费·防伪二维码</view>
				<view class="noticeziti">地址：轻化工大学A6328强志王</view>
				<view class="noticeziti">参数：书本尺寸：18cm*32cm,2021年发布</view>
				<view class="noticeziti">作者信息：王不强</view>
				<view class="noticeziti">书本供应商：云上书城</view>
			</view>
		</view>
		<view class="information">
			<image :src="msg.url1"></image>
			<image :src="msg.url2"></image>
			<image :src="msg.url3"></image>
			<image :src="msg.url4"></image>
			<image :src="msg.url5"></image>
		</view>
		<view class="bookmsg">简介：
			{{msg.msg}}
		</view>
		<view class="another">
			<image :src="msg.anotherimage"></image>
			<ul>
				<li>{{msg.another}}</li>
				<li>“{{msg.anothermsg}}”</li>
			</ul>
		</view>
		<view class="container">
			<!-- 这里放其他内容 -->
			<view class="bottomCart">
				<button @click="addToCart">查看评价</button>
				<!-- 这里放购物车相关的内容，比如加入购物车按钮等 -->
				<button @click="uploadBook(msg)">加入购物车</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(query) {
			// 获取传递的参数
			const bookMsg = query.msg;
			this.fetchData(bookMsg);
		},
		data() {
			return {
				bookInfo: {},
				msg: {
					name: '',
					msg: '',
					url1: '',
					url2: '',
					url3: '',
					url4: '',
					url5: '',
					money: '',
					another: '',
					anothermsg: '',
					anotherimage: '',
				}
			};
		},
		methods: {
			async fetchData(bookName) {
				try {
					const res = await uniCloud.callFunction({
						name: 'getbookmsg', // 替换为你的云函数名
						data: {
							bookName: bookName,
						},
					});

					const resultData = res.result.data;

					// 假设返回的数据数组长度大于等于 1
					const firstItem = resultData[0];

					// 将处理后的数据存储在组件的 data 中
					this.msg = {
						name: firstItem.name,
						msg: firstItem.Msg,
						url1: firstItem.url1,
						url2: firstItem.url2,
						url3: firstItem.url3,
						url4: firstItem.url4,
						url5: firstItem.url5,
						money: firstItem.money, // 请根据实际需要添加字段
						another: firstItem.another,
						anothermsg: firstItem.anothermsg,
						anotherimage: firstItem.anotherimage

					};

					return this.msg; // 返回处理后的数据
				} catch (error) {
					console.error('调用云函数失败:', error);
					return null; // 或者返回其他值，表示调用失败
				}
			},
			async uploadBook(msg) {
				this.bookInfo = {
					bookname: msg.name,
					bookuri: msg.url1,
					bookprice: msg.money,
					count: 1
				};
				try {
					const res = await uniCloud.callFunction({
						name: 'addbookshop',
						data: this.bookInfo, // 使用 this.bookInfo 而不是 bookInfo
					});

					console.log('云函数调用结果：', res.result);
					uni.showToast({
						title: '成功加入购物车',
						icon: 'success',
						duration: 2000,
					});
					// 处理云函数调用结果
				} catch (error) {
					console.error('云函数调用失败：', error);
					// 处理调用失败的情况
				}
			}
		},
	};
</script>




<style>
	.swperbox {
		width: 750rpx;
		height: 400rpx;
		background-size: cover;

	}

	.swiper-item {
		width: 100%;
		height: 100%;

	}

	.bookmassage {
		margin-top: 20rpx;
		width: 750rpx;
		height: 600rpx;

	}

	.bookmassage li {
		margin-top: 10rpx;
		height: 70rpx;
		display: flex;
		align-items: center;
		margin-left: 10rpx;
		margin-right: 10rpx;
		border-radius: 5rpx;

	}

	.information {
		margin-top: 10rpx;
		height: 2000rpx;

	}

	.information image {
		width: 100%;
		height: 400rpx;
		margin-left: 10rpx;
		margin-right: 10rpx;
		border-radius: 5rpx;

	}

	.container {
		position: relative;
		min-height: 20vh;
		/* 设置容器的最小高度为视口高度 */
	}

	.bottomCart {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: #fff;
		padding: 5px;
		box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);
		display: flex;
		/* 将子盒子之间的空间平均分配 */
		justify-content: end;
	}

	.bottomCart button {
		background: radial-gradient(circle, #F5F5F5, #E1FFFF);
		width: 35%;
		height: 80%;
	}

	.title {
		color: #000;
		margin-top: 30rpx;
		background: white;
	}

	.money {
		margin-top: 40rpx;
		color: #000;
		background: white;
		font-size: 30rpx;
		font-weight: bold;
	}

	.color {
		background: whitesmoke;
		height: 100%;
	}

	.notice {
		margin-top: 30rpx;
		width: 750rpx;
		height: 400rpx;
		background: white;
		margin-left: 10rpx;
		margin-right: 10rpx;
		border-radius: 5rpx;
	}

	.noticetop {
		height: 100rpx;
		width: 750rpx;
		background: radial-gradient(circle, #F5F5F5, #E1FFFF);
		display: flex;
		align-items: center;
		color: #000;
	}

	.logo {
		margin-left: 20rpx;
		height: 80rpx;
		width: 80rpx;
		background-image: url("/static/logo.png");
		background-size: cover;
	}

	.noticeziti {
		margin-top: 20rpx;
		display: flex;
		align-items: center;
		font-size: 25rpx;
	}

	.bookmsg {
		background: #fff;
		margin-top: 50rpx;
		margin-left: 10rpx;
		margin-right: 10rpx;
		border-radius: 5rpx;
	}

	.another {
		background: #fff;
		margin-top: 30rpx;
		width: 750rpx;
		height: 200rpx;
		display: flex;
		align-items: center;
	}

	.another image {
		width: 150rpx;
		height: 150rpx;
		border-radius: 150rpx;
		background-size: cover;
	}

	.another ul {
		margin-left: 30rpx;
		width: 600rpx;
	}
</style>