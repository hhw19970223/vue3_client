export default {
    /**
     * 去除字符串内中括号的字符串
     * @param str 
     * @param type '{}' | '[]' | '()'
     * @returns 
     */
    delKuoHao(str: string, type?: string) {
        var m = `/\[.*?\]/g`;
        if (type == '()') {
            m = `/\(.*?\)/g`
        } else if (type == '{}') {
            m = `/\{.*?\}/g`
        }
        return str.replace(m, '');
    },
    /**
     * 获得字符串内中括号的值
     * @param str
     * @param type '{}' | '[]' | '()'
     * @returns
     */
    getKuoHao(str: string, type?: string) {
        var s = '';
        var m = `/\[.*?\]/g`;
        if (type == '()') {
            m = `/\(.*?\)/g`
        } else if (type == '{}') {
            m = `/\{.*?\}/g`
        }
        try {
            s = str.match(m)!.join();
        } catch (err) {
            return '';
        }
        return s.substring(1, s.length - 1);
    },
}