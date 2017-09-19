<template>
  <div class="container">
      <div class="cart">
        <div class="title">
          <span>购物车</span>
        </div>

        <!-- table -->
        <div class="table">
          <div class="cart-table">

            <div class="cart-head">
              <ul>
                <li>商品信息</li>
                <li>商品金额</li>
                <li>商品数量</li>
                <li>总金额</li>
                <li>编辑</li>
              </ul>
            </div>

            <ul class="cart-item-list">
              <li v-for="(item,index) in productList">
                <div class="cart-tab-1">
                  <div class="cart-item-check">
						<div class="circle" v-bind:class="{'check':item.checked}" @click="selectProduct(item)"></div>
                  </div>	
                  <div class="cart-item-pic">
                    <img v-bind:src="item.productImage">
                  </div>

                  <div class="cart-item-title">
                    <div class="item-name">{{item.productName}}</div>
                  </div>

                  <div class="item-include">
                    <dl>
                      <dt>赠送:</dt>
                      <dd >
                        <span v-for="part in item.parts">{{part.partsName}}</span> 
                      </dd>
                    </dl>
                  </div>
                </div>

                <div class="cart-tab-2">
                  <div class="item-price">{{item.productPrice | moneyFormat("元")}}</div>
                </div>

                <div class="cart-tab-3">
                  <div class="item-quantity">
                    <div class="select-self select-self-open">
                      <div class="quantity">
                        <a href="javascript:void 0" v-on:click="changeQuantity(item,-1)">-</a>
                        <input type="text"  disabled v-bind:value="item.productQuentity">
                        <a href="javascript:void 0" v-on:click="changeQuantity(item,1)">+</a>
                      </div>
                    </div>
                    <div class="item-stock">有货</div>
                  </div>
                </div>

                <div class="cart-tab-4">
                  <div class="item-price-total">{{item.productPrice*item.productQuentity | moneyFormat("元")}}</div>
                </div>
                <div class="cart-tab-5">
                  <div class="cart-item-operation" @click="deleteProduct(index)">删除</div>
                </div>
              </li>
            </ul>

          </div>
        </div>

        <!-- footer -->
        <div class="cart-foot-wrap">
          <div class="cart-foot-l">
            <div class="item-all-check">
              <a href="javascript:void 0" :class="{'checkall':isCheckAll}" @click="selectAll(true)">
                <span>全选</span>
              </a>
            </div>
            <div class="item-all-del">
              <a href="javascript:void 0" class="item-del-btn" @click="selectAll(false)">
                <span>取消全选</span>
              </a>
            </div>
          </div>
          <div class="cart-foot-r">
            <div class="item-total">
              Item total: <span class="total-price">{{totalMoney | moneyFormat("元")}}</span>
            </div>
            <div class="next-btn-wrap">
              <router-link to="/address" tag="button" class="btn">配 送</router-link>
              <router-link to="/pay" tag="button" class="btn">结 账</router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="vuex">
		<span class="vuexone">{{getdataone}}</span><span class="vuextwo">{{getdatatwo}}</span>
      </div>
      <div class="router">
			<router-view></router-view>
      </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
	data(){
		return {
			productList:[],
			totalMoney:0,
			isCheckAll:true
		}
	},
	computed:{
		getdataone(){
			return this.$store.getters.dataone;
		},
		getdatatwo(){
			return this.$store.getters.datatwo;
		}
	},
	filters:{
		moneyFormat(value,type){
			return "￥" + value.toFixed(2) + type;
		}
	},
	mounted () {
	    this.$nextTick(() => {
	      this.dataInit();
	    });
  	},
	methods:{
		// 页面表格初始化
		dataInit(){
			axios.get('../static/data/cart.json').then((res)=>{
				this.productList = res.data.result.list;
				this.productList.forEach((v,i) => {
					this.$set(v,"checked",true);
					
				})
				this.refreshTotalMoeny();
			});
		},
		// 商品增减功能
		changeQuantity(pro,num){
			if(num > 0){
				pro.productQuentity++;
			}else{
				pro.productQuentity--;
				if(pro.productQuentity < 1){
					pro.productQuentity = 1;
				}
			}
			this.refreshTotalMoeny();
		},
		// 更新商品总金额
		refreshTotalMoeny(){
			this.totalMoney = 0;
			this.productList.forEach((v,i) => {
				if(v.checked){
					this.totalMoney += v.productPrice * v.productQuentity;
				}
			})
		},
		// 选择/去选择某个商品
		selectProduct(product){
			product.checked = !product.checked;
			let alltrue = 0;
			this.productList.forEach((v,i) => {
				if(v.checked === false){
					this.isCheckAll = false;
				}else{
					alltrue++;
					if(alltrue === this.productList.length){
						this.isCheckAll = true;
					}
				}
			});
			this.refreshTotalMoeny();
		},
		// 全选和取消全选功能
		selectAll(flag){
			this.isCheckAll = flag;
			this.productList.forEach((v,i) => {
				v.checked = this.isCheckAll;
			});
			this.refreshTotalMoeny();
		},
		// 删除功能
		deleteProduct(num){
			this.productList.splice(num,1);
			this.refreshTotalMoeny();
		}
	}
}
</script>

<style>
	*{
		padding: 0;
		margin: 0;
		font-family: "微软雅黑";
	}
	.container{
		width: 100%;
		height: auto;
	}

	.cart{
		width: 100%;
		height: auto;
	}

	.title{
		width: 100%;
		text-align: center;
		font-size: 20px;
		margin-bottom: 20px;
		margin-top: 10px;
	}

	ul li{
		list-style: none;
		float: left;
		width: 20%;
		text-align: center;
	}

	.cart-head ul{
		width: 100%;
		height: 60px;
		line-height: 60px;
		background: gray;
		font-weight: bolder;
		color: white;
	}

	a{
		text-decoration: none;
		color: black;
	}

	.cart-item-list li div{
		float: left;
	}

	.cart-item-list{
		width: 100%;
	}
	
	.cart-item-list li{
		width: 100%;
	}
	.cart-item-list li>div{
		float: left;
		width: 20%;
		height: 100px;
		border: solid 1px black;
		box-sizing:border-box;
	}

	.cart-foot-wrap > div{
		float: left;
	}

	.cart-foot-wrap{
		width: 100%;
		height: 50px;
		line-height: 50px;
		margin-top: 300px;
		background: gray;
	}

	.cart-foot-l div{
		float: left;
		margin-left: 20px;
	}

	.cart-foot-r{
		margin-left: 1200px;
	}

	.btn{
		width: 80px;
		height: 30px;
		line-height: 20px;
		text-align: center;
		background: gray;
		font-weight: bolder;
		font-size: 18px;
	}

	.item-stock{
		margin-left:20px;
	}

	.cart-item-operation,.item-price-total,.item-price{
		width: 100%;
		text-align: center;
		line-height: 100px;
		cursor: pointer;
	}

	.cart-item-operation{
		width: auto;
		height: 20px;
		line-height: 20px;
		margin-left: 142px;
		margin-top: 40px;
	}

	.item-quantity{
		line-height: 100px;
	}

	.cart-tab-1{
		line-height: 100px;
	}

	.select-self{
		margin-left: 85px;
	}

	.car div{
		float: left;
	}

	.cart-item-list li{
		background: rgba(0,0,0,0.1)
	}

	.cart-item-pic{
		margin-top: 20px;
		margin-left: 20px;
	}

	.cart-item-pic img{
		width:80px;
		height: 60px;
	}

	.cart-tab-1>div{
		float: left;
	}

	.cart-item-title,.item-include{
		margin-left: 10px;
	}
	

	dd,dt{
		float: left;
	}

	.item-name{
		cursor: pointer;
		height: 20px;
		line-height: 20px;
		margin-top: 40px;
	}
	
	.cart-item-check{
		width: 10px;
		height: 100%;
	}
	
	.circle{
		width: 15px;
		height: 15px;
		margin-top: 40px;
		border-radius: 10px;
		border:solid 2px orange;
		cursor: pointer;
		margin-left: 5px;
	}
	
	.quantity input{
		width: 50px;
		text-align: center;
	}

	.quantity a{
		display: inline-block;
		width: 20px;
		height: 20px;
		line-height: 20px;
	}
	
	/*商品被选中*/
	.check{
		background: orange;
	}

	.checkall{
		color:orange;
	}

	.router{
		background: rgba(0,0,0,0.1);
		float: left;
		width: 100%;
		text-align: center;
		font-size:25px;
		font-weight: bolder;
		height: 200px;
		line-height: 200px;
	}

	.vuex{
		float: left;
		width: 100%;
		text-align: center;
		font-size: 20px;
		font-weight: bolder;
	}

	.vuexone{
		color: orange;
	}

	.vuextwo{
		color: green;
		margin-left: 20px;
	}
</style>
