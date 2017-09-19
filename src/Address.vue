<template>
  	<div class="add">
      <button @click="changedataone" class="buttonone">change dataone</button>配送地址路由
  	</div>
</template>

<script>

export default {
	methods:{
		changedataone(){
			this.$store.dispatch("dispatchone");
		}
	}
}
</script>

<style>
	.buttonone{
		height: 30px;
		line-height: 25px;
		margin-right: 50px;
		background: orange;
	}
</style>
