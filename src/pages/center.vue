<template>
	<div>
        {{ haha }}
		<el-button @click="get">测试请求get</el-button>
        <el-button @click="post">测试请求post</el-button>
        <el-button @click="socket">测试请求socket</el-button>
        <hhw-load-select v-model="v" :options="c_item" title="请选择要道具"></hhw-load-select>  
        <el-button @click="push(2)">2</el-button>
        <el-button @click="push(3)">3</el-button>  
	</div>
</template>
<script setup>
import { reactive, watch, ref, onMounted, onUnmounted, computed } from 'vue';
import vue_tool from '../utils/vue_tool';
import date_tool from '../utils/date_tool';
import { gmGet, gmPost} from '../api/axios';
import { bulidSocket } from '../api/socket';
import { gmMitt, gmMittType } from '../api/mitt';

onMounted(() => {
    console.log(2);
    document.querySelector('.el-select-dropdown .el-select-dropdown__wrap').addEventListener('scroll', function(){console.log(1)})
})

gmMitt.on(gmMittType.connectSuccess, function() {
    vue_tool.showSuccess("socket连接成功");
})

let v = ref([]);
setTimeout(function() {
    v.value.push(1);
}, 1000)
function push(val) {
    v.value.push(val);
    console.log(v.value);
}
let c_item = [[1,"haha"],[2,"hehe"],[3,"hehe1"],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14],[15],[16],[17],[18],[19],[20],[21],[111],[112],[113],[114],[115],[116],[117],[118],[119],[120],[121]];

let haha = ref('');
haha.value = date_tool.fmt();
function get() {
    gmGet("hhw.hhw.get", {"hhw": 123}, function(rst) {
        vue_tool.showSuccess(JSON.stringify(rst));
    })
}

function post() {
    gmPost("hhw.hhw.get", {"hhw": 123}, function(rst) {
        vue_tool.showSuccess(JSON.stringify(rst));
    })
}

function k(item) {
    return item;
}

function socket() {
    bulidSocket();
}

</script>
    

<style scoped>
    .center_container {
        border: 1px solid #eee;
    }

    .center_header {
        background-color:#545c64;
        overflow: hidden;
        user-select: none;
    }

    .center_header div {
        position: relative;
        color: white;
        top: -10px; 
        width: 100%;
    }
</style>