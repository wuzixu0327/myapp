<template>
	<view class="color">
		<view class="jianju"></view>
		<view class="shopbox" v-for="(book, index) in books" :key="index">
			<view class="shop">
				<image class="shopimage" src="http://wuzixu.oss-cn-beijing.aliyuncs.com/images/hot1.png"></image>
				<view class="shopmsg">云上书城</view>
			</view>
			<view class="bookmsg">
				<image :src="book.bookimage"></image>
				<view class="book">
					<li>{{ book.bookname }}</li>
					<li>{{ book.bookprice }}</li>
				</view>
				<view class="radio" @click="deleteBookByName(index)">
					移除购物车
				</view>
			</view>
			<view class="nums">
				<view class="cost">小计：{{ subtotal(index) }}</view>
				<view class="num">
					<button @click="decrement(index)" class="downbutton">-</button>
					<span>{{ book.count }}</span>
					<button @click="increment(index)" class="downbutton">+</button>
				</view>
			</view>
		</view>
		<view class="container">
			<!-- 这里放其他内容 -->
			<view class="bottomCart">
				<view class="countnums">合计：￥{{ totalCost }}</view>
				<!-- 这里放购物车相关的内容，比如加入购物车按钮等 -->
				<view class="gopay" @click="goToPay">去支付</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		computed
	} from "vue";

	export default {
		data() {
			return {
				books: [],
				isBookSelected: false,
			};
		},
		computed: {
			subtotal() {
				return (index) => {
					const result = this.books[index].bookprice * this.books[index].count;
					console.log("Subtotal:", result);
					return result;
				};
			},
			totalCost() {
				return this.books.reduce((total, book) => {
					return total + (book.count * book.bookprice);
				}, 0);
			},
		},
		onShow() {
			this.callCloudFunction(); // 使用 onShow 生命周期钩子
		},
		async created() {
			await this.callCloudFunction();
		},
		methods: {
			handleRadioChange(value) {
				this.isBookSelected = value;
			},
			increment(index) {
				this.books[index].count++;
				this.$nextTick(() => {
					console.log("Subtotal:", this.books[index].bookprice * this.books[index].count);
				});
			},
			decrement(index) {
				if (this.books[index].count > 0) {
					this.books[index].count--;
					this.$nextTick(() => {
						console.log("Subtotal:", this.books[index].bookprice * this.books[index].count);
					});
				}
			},
			async callCloudFunction() {
				try {
					const res = await uniCloud.callFunction({
						name: 'getshopcar',
					});

					console.log('云函数调用结果：', res.result);

					const booksFromCloud = res.result.data;

					this.books = booksFromCloud.map(book => ({
						bookimage: book.bookuri,
						bookname: book.bookname,
						bookprice: book.bookprice,
						count: book.count,
					}));

					console.log('获取到的书籍信息：', this.books);
				} catch (error) {
					console.error('云函数调用失败：', error);
				}
			},
			// 在需要调用云函数的地方，例如一个 Vue 组件的 methods 中
			async deleteBookByName(index) {
				try {
					const bookName = this.books[index].bookname; // 从 books 数组中获取书名
					const res = await uniCloud.callFunction({
						name: 'deleteshop', // 替换为您实际的云函数名称
						data: {
							bookName: bookName, // 将正确的参数传递给云函数
						},
					});

					console.log('云函数调用结果：', res.result);

					// 更新 books 数组，移除被删除的书籍
					this.books.splice(index, 1);
					uni.showToast({
						title: '成功移除购物车',
						icon: 'success',
						duration: 2000,
					});
					// 处理云函数调用结果
				} catch (error) {
					console.error('云函数调用失败：', error);
					// 处理调用失败的情况
				}
			},
			async goToPay() {
				// 获取所有 count 大于 0 的书籍信息
				const booksToPay = this.books.filter(book => book.count > 0);

				// 打印符合条件的书籍信息
				const booksInfoToPay = booksToPay.map(book => ({
					name: book.bookname,
					price: book.bookprice,
					count: book.count,
					uri: book.bookimage,
				}));
				  uni.navigateTo({
				     url: '/pages/paybook/paybook?booksInfoToPay=' + JSON.stringify(booksInfoToPay),
				   });
				// 打印提取的书籍信息
				console.log('待支付的书籍信息：', booksInfoToPay);
				// 在这里你可以进行支付操作或其他相关逻辑
			},
		},
	};
</script>




<style>
	.jianju {
		width: 750rpx;
		height: 40rpx;
	}

	.color {
		width: 750rpx;
		height: 1500rpx;
		background: whitesmoke;
	}

	.shopbox {
		margin-top: 30rpx;
		margin-left: 20rpx;
		/* 左边距离 */
		margin-right: 20rpx;
		/* 右边距离 */
		width: 710rpx;
		height: 400rpx;
		background: white;
		border-radius: 10rpx;
	}

	.shopimage {
		margin-left: 50rpx;
		width: 80rpx;
		height: 80rpx;
		border-radius: 40rpx;
	}

	.shop {
		background: radial-gradient(circle, #F5F5F5, #E1FFFF);
		width: 710rpx;
		height: 100rpx;
		display: flex;

	}

	.shopmsg {
		height: 70rpx;
		display: flex;
		align-items: center;
	}

	.bookmsg {
		width: 710rpx;
		height: 200rpx;
		display: flex;
	}

	.bookmsg image {
		margin-left: 50rpx;
		margin-top: 12.5rpx;
		width: 180rpx;
		height: 180rpx;
		border-radius: 20rpx;
	}

	.radio {
		margin-top: 90rpx;
		width: 100rpx;
		height: 40rpx;
		display: flex;
		align-items: center;
		font-size: 20rpx;
		color: red;
	}

	.book {
		margin-left: 30rpx;
		height: 100rpx;
		width: 220rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.book li {
		width: 220rpx;
		margin-top: 20rpx;
	}

	.radio {
		margin-left: 100rpx;
		display: flex;
		align-items: center;
	}

	.nums {
		width: 710rpx;
		height: 100rpx;
		display: flex;
	}

	.cost {
		color: red;
		margin-left: 30rpx;
		width: 250rpx;
		height: 100rpx;
		display: flex;
		align-items: center;
	}

	.num {
		margin-left: 250rpx;
		width: 150rpx;
		height: 100rpx;
		display: flex;
		align-items: center;
	}

	.downbutton {
		height: 60rpx;
		width: 60rpx;
		display: flex;
		align-items: center;
		justify-content: center;
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