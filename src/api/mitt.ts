import mitt from 'mitt'
export const gmMitt = mitt();

/**
   通知类型
*/
export const enum gmMittType {
    /** webSocket链接成功 */
    connectSuccess = "connectSuccess",
}


