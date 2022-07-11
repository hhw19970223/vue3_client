import date_tool from './date_tool';
export default {
    /**
     * 判断是否是NaN
     * @param v 
     * @returns 
     */
    isNAN(v) {
        return (typeof (v) === "number" && isNaN(v));
    },

    /**
     * 判断是否是为空
     * @param v
     * @returns
     */
    isNull(v) {
        return v ?? '' == '';
    },


    //支持1-4,6转换成1，2，3，4，6
    exchangeServerList(serverListStr: string, isArr: boolean = false): number[] | string {
        if (!serverListStr) {
            if (isArr) return [];
            else return "";
        }
        serverListStr.replace(/，/g, ",");
        let grp = serverListStr.split(",");
        let serverList: number[] = [];
        for (let i = 0; i < grp.length; i++) {
            if (grp[i].indexOf("-") == -1) {
                let num = parseInt(grp[i].replace(/[^0-9]/ig, ""));
                if (serverList.indexOf(num) == -1) serverList.push(num);
            }
            else {
                let num = grp[i].split("-");
                num[0] = num[0].replace(/[^0-9]/ig, "");
                num[1] = num[1].replace(/[^0-9]/ig, "");
                for (let j = parseInt(num[0]); j <= parseInt(num[1]); j++) {
                    if (serverList.indexOf(j) == -1) serverList.push(j);
                }
            }
        }
        if (isArr) return serverList.sort((a, b) => a - b);
        return serverList.sort((a, b) => a - b).join(",");

    },

    /**
     * 处理服务端返回数据
     * @param list 
     * @param isExport 
     */
    dealListToExport(list: any[], isExport: boolean = false) {//解决导出数据错乱问题
        for (let i = 0; i < list.length; i++) {
            let rst = list[i];
            for (let col in rst) {
                if (rst[col] && typeof rst[col] == "object") {//null返回的也是object
                    rst[col] = JSON.stringify(rst[col]);
                }
                if (isExport) {
                    if (rst[col] && typeof rst[col] == 'string') {
                        if (rst[col].indexOf(',') > -1 || rst[col].indexOf("\n") > -1) {
                            rst[col] = rst[col].replace(new RegExp("\"", 'g'), "\"\"");
                            rst[col] = '"' + rst[col] + '"';
                        }
                    }
                }
            }
        }
    },

    /**
     * 处理时间格式
     * @param list 
     */
    fmtTimeStr(list: any) {
        for (let i = 0; i < list.length; i++) {
            let rst = list[i];
            for (let col in rst) {
                if (rst[col] && typeof rst[col] == "object") {//null返回的也是object
                    rst[col] = JSON.stringify(rst[col]);
                }
                if (rst[col] && typeof rst[col] == 'string') {
                    let Str = rst[col].replace(/"/g, '');
                    if (Str[4] == '-' && Str[7] == '-' && Str[10] == 'T'
                        && Str[13] == ':' && Str[16] == ':'
                        && Str[19] == '.' && Str[23] == 'Z') {
                        rst[col] = date_tool.fmt(rst[col]);
                    }
                }
            }
        }
    },

    oneOf(value, validList) {
        for (let i = 0; i < validList.length; i++) {
            if (value === validList[i]) {
                return true;
            }
        }
        return false;
    },

    //密码校验
    pwdCheck(str, cb) {
        if (!(/(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?]/.test(str))) {
            return cb("至少包括一个数字、大小写字母、特殊字符中的两种")
        }
        else {
            return cb();
        }
    }


}
