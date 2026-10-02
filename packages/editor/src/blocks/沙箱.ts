/** 沙箱积木的描述（无函数），主页面用这个来注册 UI 和表单 */
export interface 沙箱积木描述 {
    id: string;
    keyword: string;
    version?: string;
    category: string;
    meta: any;
    schema: any[];
}

interface 待回 {
    resolve: (v: any) => void;
    reject: (e: Error) => void;
    timer: number;
}

export class 沙箱 {
    private iframe: HTMLIFrameElement | null = null;
    private 就绪 = false;
    private 待回表 = new Map<string, 待回>();
    private 序号 = 0;
    private 就绪Promise: Promise<void> | null = null;
    private 超时毫秒 = 10000;

    constructor(private 沙箱URL = '/sandbox.html') {}

    /** 创建 iframe 并等它 ready */
    async 启动(): Promise<void> {
        if (this.就绪) return;
        if (this.就绪Promise) return this.就绪Promise;

        this.就绪Promise = new Promise((resolve, reject) => {
            const iframe = document.createElement('iframe');
            iframe.src = this.沙箱URL;
            iframe.setAttribute('sandbox', 'allow-scripts');
            iframe.style.display = 'none';
            iframe.setAttribute('aria-hidden', 'true');

            window.addEventListener('message', this.收消息);
            iframe.onload = () => {
                this.就绪 = true;
                resolve();
            };
            iframe.onerror = () => reject(new Error('沙箱加载失败'));

            document.body.appendChild(iframe);
            this.iframe = iframe;
        });

        return this.就绪Promise;
    }

    /** 关闭沙箱 */
    销毁() {
        window.removeEventListener('message', this.收消息);
        this.iframe?.remove();
        this.iframe = null;
        this.就绪 = false;
        this.就绪Promise = null;
        for (const p of this.待回表.values()) p.reject(new Error('沙箱已销毁'));
        this.待回表.clear();
    }

    /** 加载一段积木源码，返回描述列表 */
    async 加载积木(源码: string, url?: string): Promise<沙箱积木描述[]> {
        await this.启动();
        const r = await this.发('加载积木', { 源码, url });
        if (!r.ok) throw new Error(r.错误 || '加载失败');
        return r.积木列表 as 沙箱积木描述[];
    }

    /** 从 URL 加载（沙箱内部 fetch） */
    async 从URL加载积木(url: string): Promise<沙箱积木描述[]> {
        await this.启动();
        const r = await this.发('加载积木', { url });
        if (!r.ok) throw new Error(r.错误 || '加载失败');
        return r.积木列表 as 沙箱积木描述[];
    }

    /** 调用某积木的 生成IR */
    async 调用生成IR(积木id: string, 输入: Record<string, unknown>): Promise<any[]> {
        await this.启动();
        const r = await this.发('调用生成IR', { 积木id, 输入 });
        if (!r.ok) throw new Error(r.错误 || '调用失败');
        return r.ir as any[];
    }

    /** 卸载某积木 */
    async 卸载积木(积木id: string): Promise<void> {
        await this.启动();
        await this.发('卸载积木', { 积木id });
    }

    private 收消息 = (e: MessageEvent) => {
        const d = e.data;
        if (!d || typeof d !== 'object' || typeof d.id !== 'string') return;
        const p = this.待回表.get(d.id);
        if (!p) return;
        clearTimeout(p.timer);
        this.待回表.delete(d.id);
        p.resolve(d);
    };

    private 发(type: string, payload: any): Promise<any> {
        if (!this.iframe?.contentWindow) {
            return Promise.reject(new Error('沙箱未就绪'));
        }
        const id = `cib-${++this.序号}-${Date.now()}`;
        return new Promise((resolve, reject) => {
            const timer = window.setTimeout(() => {
                this.待回表.delete(id);
                reject(new Error(`沙箱超时：${type}`));
            }, this.超时毫秒);
            this.待回表.set(id, { resolve, reject, timer });
            this.iframe!.contentWindow!.postMessage({ id, type, payload }, '*');
        });
    }
}

/** 单例 */
let 全局沙箱: 沙箱 | null = null;
export function 取沙箱(): 沙箱 {
    if (!全局沙箱) 全局沙箱 = new 沙箱();
    return 全局沙箱;
}