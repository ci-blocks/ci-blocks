import type { CIBBlock } from '@cib/block-sdk';
import { 取沙箱, type 沙箱积木描述 } from './沙箱';

/** 描述 → 一个「代理积木」，在主线程只保留 schema / keyword / meta，
 *  调用 生成IR 时异步转到沙箱去算。 */
export interface 沙箱代理积木 extends Omit<CIBBlock<any>, '生成IR'> {
    生成IR: (输入: any) => any[];   // 同步签名保持，但内部其实是异步代理
    在沙箱中: true;
}

/** 单条加载（沙箱版） */
export async function 加载单个外部积木(url: string): Promise<{
    积木: CIBBlock<any>[];
    错误?: string;
}> {
    try {
        const 沙箱 = 取沙箱();
        const 描述列表 = await 沙箱.从URL加载积木(url);
        const 积木 = 描述列表.map((d) => 描述转代理积木(d, url));
        return { 积木 };
    } catch (e) {
        return { 积木: [], 错误: (e as Error).message };
    }
}

/** 批量 */
export async function 加载外部积木(urls: string[]) {
    const 积木: CIBBlock<any>[] = [];
    const 错误: { url: string; 消息: string }[] = [];
    for (const url of urls) {
        const r = await 加载单个外部积木(url);
        if (r.错误) 错误.push({ url, 消息: r.错误 });
        else 积木.push(...r.积木);
    }
    return { 积木, 错误 };
}

export function 从URL取名字(url: string): string {
    try {
        const u = new URL(url, window.location.href);
        const 末段 = u.pathname.split('/').filter(Boolean).pop() ?? url;
        return 末段.replace(/\.(m?js|ts|cjs)$/i, '') || url;
    } catch {
        return url.slice(0, 60);
    }
}

export function 从URL读取积木参数(): string[] {
    try {
        const p = new URLSearchParams(window.location.search);
        const raw = p.get('blocks');
        return raw ? raw.split(',').map((s) => s.trim()).filter(Boolean) : [];
    } catch {
        return [];
    }
}

/** 沙箱积木描述 → 主线程可用的代理积木 */
function 描述转代理积木(d: 沙箱积木描述, url: string): 沙箱代理积木 {
    const 积木: 沙箱代理积木 = {
        id: d.id,
        keyword: d.keyword,
        version: d.version ?? '0.0.0',
        category: d.category as any,
        meta: d.meta,
        schema: d.schema,
        在沙箱中: true,
        生成IR: (输入: any) => {
            // 同步返回空数组占位，真正计算是异步的。
            // 现有的工作区转IR 是同步流程，所以这里需要一个策略。
            // 见下文「同步/异步取舍」。
            return 生成IR缓存.get(d.id + ':' + JSON.stringify(输入)) ?? [];
        },
    };
    // 触发一次预计算，把结果塞进缓存
    触发异步计算(d.id, 输入未指定()); // 见下
    return 积木;
}

const 生成IR缓存 = new Map<string, any[]>();

// ⚠️ 下面这块需要跟你现有「工作区转IR」对接，见「同步/异步取舍」一节
function 输入未指定(): any { return {}; }
function 触发异步计算(_id: string, _输入: any) { /* 略 */ }