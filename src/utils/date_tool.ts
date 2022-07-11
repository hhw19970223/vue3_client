import moment from 'moment'
export default {
    /**
     * 时间格式转换成英文
     * @param date 
     * @param fmt 时间转换格式
     */
    fmt(date?: Date | string, fmt: string = 'yyyy-MM-DD hh:mm:ss') {
        return moment(date).format(fmt);
    }
}