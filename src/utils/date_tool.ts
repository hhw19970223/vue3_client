import moment from 'moment'
export default {
    /**
     * 时间格式转换成英文
     * @param date 
     * @param fmt 时间转换格式
     */
    fmt(date?: Date | string, fmt: string = 'yyyy-MM-DD hh:mm:ss') {
        return moment(date).format(fmt);
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
                        rst[col] = this.fmt(rst[col]);
                    }
                }
            }
        }
    },
}