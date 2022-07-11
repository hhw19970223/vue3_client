<template>
    <el-select v-model="value" :placeholder="title" multiple remote filterable
        :remote-method="remote_method" v-lazy-load="loadMore">
        <el-option v-for="item in itemList" :key="item[0]" :value="item[0]" :label="eval(item)">
            
        </el-option>
    </el-select>`
</template>

<script>
export default {
    directives: {
        'lazy-load': {
            mounted: function(el, binding, vnode) {
                window.el = el;
                const SELECTWRAP_DOM = document.querySelector('.el-select-dropdown .el-select-dropdown__wrap');
                // SELECTWRAP_DOM.addEventListener('scroll', function () {
                //     /**
                //     * scrollHeight 获取元素内容高度(只读)
                //     * scrollTop 获取或者设置元素的偏移值,常用于, 计算滚动条的位置, 当一个元素的容器没有产生垂直方向的滚动条, 那它的scrollTop的值默认为0.
                //     * clientHeight 读取元素的可见高度(只读)
                //     * 如果元素滚动到底, 下面等式返回true, 没有则返回false:
                //     * ele.scrollHeight - ele.scrollTop === ele.clientHeight;
                //     */
                //     console.log(this.scrollHeight + "+" + this.scrollTop);

                //     const condition = this.scrollHeight - this.scrollTop <= this.clientHeight + 100;
                //     if (condition) {
                //         console.log(this.scrollHeight - this.scrollTop);
                //         binding.value();//执行v-lazy-load的方法
                //     }
                // })
            }
        }
    },
    props: {
        modelValue: {
            type: Array,
            default: [],
        },
        title: {
            type: String,
            default: '请选择',
        },
        options: {
            type: Array,
            default: []
        },
        eval: {
            type: Function,
            default: (itemList) => {
                return itemList[1] + "[" + itemList[0] + "]";
            },
        },
        filterFuc: {
            type: Function,
            default: (itemList, query) => {
                const a = (item, query) => {            
                    if (typeof item == "number") {
                        return item.toString().indexOf(query) > -1;
                    } else {
                        return item.indexOf(query) > -1;
                    }
                } 
                if (itemList) {
                    for (let i = 0; i < itemList.length; i++) {
                        if (a(itemList[i], query)) {
                            return true;
                        }
                    }
                } 
                return false
            },
        }
            
    },
    data() {
        return {
            query: '',
            queryList: [],
            itemList: [],
            itemSum: 0,

            value: [],
        };
    },
        
    methods: {
        getMaxLen(max) {
            return max > this.queryList.length ? this.queryList.length : max;
        },
        loadMore() {
            for (let i = 0; i < 10; i++) {
                if (this.queryList[this.itemSum]) {
                    this.itemList.push(this.queryList[this.itemSum]);
                    this.itemSum++;
                }
            }
        },
        remote_method(query) {
            let self = this;
            self.itemList = [];
            self.itemSum = 0;
            self.query = query;
            self.queryList = [];
            if (query) {
                self.queryList = self.options.filter(itemList => {
                    return self.filterFuc(itemList, query);
                });
                self.itemSum = self.getMaxLen(20);//默认20
                for (let i = 0; i < self.itemSum; i++) {
                    self.itemList.push(self.queryList[i]);
                }
            }
        },
    },
    watch: {
        value(a, b){
            this.$emit("update:modelValue", a);
        }
    },
}
</script>

<style>

</style>