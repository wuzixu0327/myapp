<template>
	<view class="color">
		<view class="goods" v-for="(book, index) in books" :key="index">
			<!-- Fix the syntax error here -->
			<image class="bookimage" :src="book.bookuri"></image>
			<view class="bookmsg">
				<view class="bookname">{{ book.bookName }}</view>
				<view class="nums">
					<li>￥：{{ book.bookPrice }}</li>
					<li>数量：{{ book.bookCount }}</li>
				</view>
			</view>
		</view>
		<view class="dizi"> 收货地址：默认</view>
		<view class="dizi"> 预计1月10日17:30前收货</view>
		<view class="fuli">
			<view class="topcolor">
				<image class="shopimage" src="http://wuzixu.oss-cn-beijing.aliyuncs.com/images/hot1.png"></image>
				<view class="shopmsg">云上书城</view>
			</view>
			<view class="fulimsg">
				<li>服务：七天无理由，支持货到付款</li>
				<li>赠品：云上书城Logo徽章</li>
			</view>
		</view>
		<view class="ordermsg">
			<view class="pay">
				<image src="../../static/Ali.png"></image>支付宝支付
				<radio class="juli1"></radio>
			</view>
			<view class="pay">
				<image src="../../static/wechat.png"></image>微信支付
				<radio class="juli2"></radio>
			</view>
			<view class="pay">
				其他支付方式
				<radio class="juli1"></radio>
			</view>
		</view>
		<view class="container">
			<!-- 这里放其他内容 -->
			<view class="bottomCart">
				<view class="countnums">合计：￥{{ totalCost }}</view>
				<!-- 这里放购物车相关的内容，比如加入购物车按钮等 -->
				<view class="gopay" @click="goToPay">支付</view>
			</view>
		</view>
	</view>
</template>

<script>
	// PayBookPage.vue
	export default {
		data() {
			return {
				books: [], // Define an empty array to store book information
			};
		},
		computed: {
		  totalCost() {
		    return this.books.reduce((total, book) => {
		      return total + book.bookPrice * book.bookCount;
		    }, 0);
		  },
		},
		onLoad(query) {
			// In the onLoad hook, get the passed parameters
			const booksInfoToPay = JSON.parse(query.booksInfoToPay || '[]');
			this.books = booksInfoToPay.map(book => ({
				bookuri: book.uri, // Fix the missing property and add a comma
				bookName: book.name,
				bookPrice: book.price,
				bookCount: book.count,
				// Adjust the data structure based on your actual data
			}));
			// Handle the received data here
			console.log('Received data in PayBookPage:', booksInfoToPay);
			// You can handle the received data as needed here
		},
	};
</script>


<style>
	.color {
		background: whitesmoke;
		height: 2100rpx;
		width: 750rpx;
	}

	.goods {
		display: flex;
		margin: 20rpx 20rpx;
		width: 710rpx;
		height: 300rpx;
		background: white;
		border: radial-gradient(circle, #F5F5F5, #E1FFFF);

	}

	.bookimage {
		margin: 50rpx 50rpx;
		height: 200rpx;
		width: 200rpx;
		border-radius: 10rpx;
		background: rebeccapurple;
	}

	.bookmsg {
		width: 33rpx;
		height: 220rpx;

	}

	.bookname {
		height: 150rpx;
		width: 300rpx;
		margin-top: 50rpx;

	}

	.nums {
		width: 300rpx;
		height: 100rpx;
		display: flex;
		align-items: center;
	}

	.nums li {
		width: 200rpx;
		height: 100rpx;

	}

	.dizi {
		width: 710rpx;
		height: 60rpx;
		background: white;
		margin: 20rpx 20rpx;
		display: flex;
		align-items: center;
		border-radius: 10rpx;
	}

	.fuli {
		width: 710rpx;
		height: 300rpx;
		background: white;
		margin: 20rpx 20rpx;

	}

	.topcolor {
		width: 100%rpx;
		height: 100rpx;
		background: radial-gradient(circle, #F5F5F5, #E1FFFF);
		display: flex;
	}

	.shopimage {
		margin-left: 50rpx;
		width: 80rpx;
		height: 80rpx;
		border-radius: 40rpx;
	}

	.shopmsg {
		height: 70rpx;
		display: flex;
		align-items: center;
	}

	.fulimsg li {
		margin: 20rpx 20rpx;
		height: 70rpx;
		display: flex;
		align-items: center;
	}

	.ordermsg {
		height: 450rpx;
		width: 710rpx;
		background: white;
		margin: 20rpx 20rpx;
		border-radius: 10rpx;
	}
	.pay image{
		width: 40rpx;
		height: 40rpx;
	}
	.pay{
		margin-left: 100rpx;
		border: #F5F5F5;
		display: flex;
		align-items: center;
		width: 710rpx;
		height: 130rpx;
	}
	.juli1{
		margin-left: 120px;
	}
	.juli2{
		margin-left: 130px;
	}
	.container {
		position: relative;
		min-height: 20vh;
		/* 设置容器的最小高度为视口高度 */
	}
	
	.bottomCart {
		height: 80rpx;
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
	.gopay {
		margin-right: 100rpx;
		width: 200rpx;
		height: 80rpx;
		color: white;
		background: red;
		display: flex;
		border-radius: 50rpx;
		justify-content: center;
		/* 水平居中 */
		align-items: center;
		/* 垂直居中 */
	}
	
	.countnums {
		margin-right: 130rpx;
		width: 200rpx;
		height: 80rpx;
		display: flex;
		align-items: center;
		color: red;
	}
</style>