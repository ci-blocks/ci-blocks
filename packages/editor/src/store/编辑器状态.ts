import { create } from 'zustand';
import type { CIBBlock } from '@cib/block-sdk';
import type { IRNode } from '@cib/core';

export interface 外部积木条目 {
    id: string;
    名称: string;
    url: string;
    来源: 'URL' | '本地';
    状态: '加载中' | '成功' | '失败';
    错误?: string;
    积木: CIBBlock<any>[];
    积木数量: number;
}

interface 编辑器状态 {
    IR: IRNode[];
    setIR: (n: IRNode[]) => void;

    内置积木: CIBBlock<any>[];
    设置积木箱: (b: CIBBlock<any>[]) => void;

    外部积木列表: 外部积木条目[];
    添加外部积木: (项: 外部积木条目) => void;
    更新外部积木: (id: string, 补丁: Partial<外部积木条目>) => void;
    移除外部积木: (id: string) => void;
    清空外部积木: () => void;

    积木箱: CIBBlock<any>[];
}

function 取外部成功积木(列表: 外部积木条目[]): CIBBlock<any>[] {
    return 列表.filter((e) => e.状态 === '成功').flatMap((e) => e.积木);
}

export const use编辑器 = create<编辑器状态>((set) => ({
    IR: [],
    setIR: (n) => set({ IR: n }),

    内置积木: [],
    设置积木箱: (b) =>
        set((s) => ({
            内置积木: b,
            积木箱: [...b, ...取外部成功积木(s.外部积木列表)],
        })),

    外部积木列表: [],
    添加外部积木: (项) =>
        set((s) => {
            const 新列表 = [...s.外部积木列表, 项];
            return {
                外部积木列表: 新列表,
                积木箱: [...s.内置积木, ...取外部成功积木(新列表)],
            };
        }),
    更新外部积木: (id, 补丁) =>
        set((s) => {
            const 新列表 = s.外部积木列表.map((e) =>
                e.id === id ? { ...e, ...补丁 } : e,
            );
            return {
                外部积木列表: 新列表,
                积木箱: [...s.内置积木, ...取外部成功积木(新列表)],
            };
        }),
    移除外部积木: (id) =>
        set((s) => {
            const 新列表 = s.外部积木列表.filter((e) => e.id !== id);
            return {
                外部积木列表: 新列表,
                积木箱: [...s.内置积木, ...取外部成功积木(新列表)],
            };
        }),
    清空外部积木: () =>
        set((s) => ({
            外部积木列表: [],
            积木箱: [...s.内置积木],
        })),

    积木箱: [],
}));

/** 兼容旧 API：全局导出 设置积木箱 */
export const 设置积木箱 = (b: CIBBlock<any>[]) =>
    use编辑器.getState().设置积木箱(b);