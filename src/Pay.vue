<template>
  	<div class="add">
      <button @click="changedatatwo" class="buttontwo">change datatwo</button>结账付款路由
  	</div>
</template>

<script>
export default {
	methods:{
		changedatatwo(){
			this.$store.dispatch("dispatchtwo");
		}
	}
}
</script>

<style>
	.buttontwo{
		height: 30px;
		line-height: 25px;
		margin-right: 50px;
		background: green;
	}
</style>
