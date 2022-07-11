import { ElMessage} from 'element-plus';
import router from '../router';

export default {
    routerPush(path: string, query: any) {
        router.push({ path: path, query: query });
    },

    routerBack() {
        router.back();
    },

    showErr(message: string, isCenter: boolean = true) {
        ElMessage["error"]({ message: message, type: "error", center: isCenter });
    },

    showWarn(message: string, isCenter: boolean = true) {
        ElMessage({ message: message, type: "warning", center: isCenter });
    },

    showSuccess(message: string, isCenter: boolean = true) {
        ElMessage({ message: message, type: "success", center: isCenter });
    },

    showMess(message: string, isCenter: boolean = true) {
        ElMessage({ message: message, type: "info", center: isCenter });
    },
    /**
       * 确认框的接口
    */
    gmConfirm(msg: string, onOk: () => void, ctx: any) {
        let self = this;
        ctx.$confirm(msg, "提示", {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            onOk();
        }).catch(() => {
            self.showMess('已取消');
        });
    },
    /**
       * 表单校验
    */
    formCheck(form: any, ok: () => void) {
        let self = this;
        form.validate((valid: any) => {
            if (valid) {
                ok();
            } else {
                self.showErr("表单校验失败");
            }
        });
    },

    /**
     * 隐藏数据 添加 overflow属性
     * @param key 
     * @returns 
     */
    registerCol(key) {
        return (h, params) => {
            return h('div', [
                h('span', {
                    style: {
                        display: 'inline-block',
                        width: '100%',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    },
                    domProps: {
                        title: params.row[key],
                    }
                }, params.row[key]),
            ])
        }
    },

}
