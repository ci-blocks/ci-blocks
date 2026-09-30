import { useState } from 'react';
import { use编辑器, type 外部积木条目 } from '../store/编辑器状态';
import { use语言 } from '../store/语言状态';
import { 加载单个外部积木, 从URL取名字 } from '../blocks/加载器';

interface Props {
    on完成?: () => void;
}

export function 外部积木面板({ on完成 }: Props) {
    const 语言包 = use语言((s) => s.语言包);
    const 工具 = 语言包.工具栏.工具菜单;

    const 外部积木列表 = use编辑器((s) => s.外部积木列表);
    const 添加外部积木 = use编辑器((s) => s.添加外部积木);
    const 更新外部积木 = use编辑器((s) => s.更新外部积木);
    const 移除外部积木 = use编辑器((s) => s.移除外部积木);
    const 清空外部积木 = use编辑器((s) => s.清空外部积木);

    const [输入URL, set输入URL] = useState('');
    const [输入中, set输入中] = useState(false);

    const 执行添加 = async (url: string) => {
        const 去空 = url.trim();
        if (!去空) return;

        const id = `ext-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

        添加外部积木({
            id,
            名称: 从URL取名字(去空),
            url: 去空,
            来源: 'URL',
            状态: '加载中',
            积木: [],
            积木数量: 0,
        });

        const { 积木, 错误 } = await 加载单个外部积木(去空);

        if (错误 || 积木.length === 0) {
            更新外部积木(id, {
                状态: '失败',
                错误: 错误 ?? 工具.未导出积木,
                积木: [],
                积木数量: 0,
            });
            return;
        }

        更新外部积木(id, {
            状态: '成功',
            积木,
            积木数量: 积木.length,
            错误: undefined,
            名称: 积木[0]?.keyword || 从URL取名字(去空),
        });
    };

    const 批量添加 = async () => {
        const urls = 输入URL
            .split(/[,\n]/)
            .map((s) => s.trim())
            .filter(Boolean);
        if (urls.length === 0) return;
        set输入中(true);
        set输入URL('');
        for (const url of urls) {
            await 执行添加(url);
        }
        set输入中(false);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* 输入区 */}
            <div>
                <div style={{ fontSize: 13, color: '#666', marginBottom: 6 }}>
                    {工具.外部积木输入提示}
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                    <input
                        value={输入URL}
                        onChange={(e) => set输入URL(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                批量添加();
                            }
                        }}
                        placeholder="https://example.com/my-block.js"
                        disabled={输入中}
                        style={{
                            flex: 1,
                            padding: '8px',
                            border: '1px solid #ccc',
                            borderRadius: 4,
                            boxSizing: 'border-box',
                        }}
                    />
                    <button
                        onClick={批量添加}
                        disabled={输入中 || !输入URL.trim()}
                        style={{
                            padding: '8px 16px',
                            border: 'none',
                            borderRadius: 4,
                            cursor: 输入中 ? 'wait' : 'pointer',
                            background: 输入中 ? '#aaa' : '#637e99',
                            color: 'white',
                        }}
                    >
                        {输入中 ? 工具.加载中 : 工具.加载}
                    </button>
                </div>
            </div>

            {/* 已加载列表 */}
            <div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 6,
                    }}
                >
                    <span style={{ fontSize: 13, color: '#666' }}>
                        {工具.已加载列表}（{外部积木列表.length}）
                    </span>
                    {外部积木列表.length > 0 && (
                        <button
                            onClick={() => {
                                if (confirm(工具.清空外部积木确认)) 清空外部积木();
                            }}
                            style={{
                                padding: '2px 8px',
                                border: '1px solid #ccc',
                                borderRadius: 4,
                                cursor: 'pointer',
                                background: 'white',
                                fontSize: 12,
                            }}
                        >
                            {工具.清空}
                        </button>
                    )}
                </div>

                {外部积木列表.length === 0 ? (
                    <div
                        style={{
                            padding: 16,
                            textAlign: 'center',
                            color: '#999',
                            fontSize: 13,
                            border: '1px dashed #ddd',
                            borderRadius: 4,
                        }}
                    >
                        {工具.暂无外部积木}
                    </div>
                ) : (
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 6,
                            maxHeight: 320,
                            overflowY: 'auto',
                        }}
                    >
                        {外部积木列表.map((项) => (
                            <外部积木项
                                key={项.id}
                                项={项}
                                on移除={() => 移除外部积木(项.id)}
                                on重试={() => 执行添加(项.url)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* 底部按钮 */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: 8,
                    marginTop: 4,
                }}
            >
                <button
                    onClick={() => on完成?.()}
                    style={{
                        padding: '6px 16px',
                        border: 'none',
                        borderRadius: 4,
                        cursor: 'pointer',
                        background: '#637e99',
                        color: 'white',
                    }}
                >
                    {语言包.通用.确定}
                </button>
            </div>
        </div>
    );
}

function 外部积木项({
                        项,
                        on移除,
                        on重试,
                    }: {
    项: 外部积木条目;
    on移除: () => void;
    on重试: () => void;
}) {
    const 语言包 = use语言((s) => s.语言包);
    const 工具 = 语言包.工具栏.工具菜单;

    const 状态色 =
        项.状态 === '成功'
            ? '#2ecc71'
            : 项.状态 === '失败'
                ? '#e74c3c'
                : '#f39c12';

    const 状态文案 =
        项.状态 === '成功'
            ? 工具.状态成功.replace('%1', String(项.积木数量))
            : 项.状态 === '失败'
                ? 工具.状态失败
                : 工具.状态加载中;

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 12px',
                border: '1px solid #eee',
                borderRadius: 4,
                background: '#fafafa',
            }}
        >
            <span
                style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    background: 状态色,
                    flexShrink: 0,
                }}
            />

            <div style={{ flex: 1, minWidth: 0 }}>
                <div
                    style={{
                        fontSize: 13,
                        fontWeight: 'bold',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}
                    title={项.名称}
                >
                    {项.名称}
                </div>
                <div
                    style={{
                        fontSize: 11,
                        color: '#666',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}
                    title={项.url}
                >
                    {项.url}
                </div>
                <div style={{ fontSize: 11, color: 状态色, marginTop: 2 }}>
                    {状态文案}
                    {项.错误 && (
                        <span style={{ color: '#999', marginLeft: 6 }}>
                            — {项.错误}
                        </span>
                    )}
                </div>
            </div>

            {项.状态 === '失败' && (
                <button
                    onClick={on重试}
                    style={{
                        padding: '2px 8px',
                        border: '1px solid #ccc',
                        borderRadius: 4,
                        cursor: 'pointer',
                        background: 'white',
                        fontSize: 12,
                    }}
                >
                    {工具.重试}
                </button>
            )}
            <button
                onClick={on移除}
                title={语言包.通用.删除}
                style={{
                    padding: '2px 8px',
                    border: '1px solid #ccc',
                    borderRadius: 4,
                    cursor: 'pointer',
                    background: 'white',
                    fontSize: 12,
                    color: '#c0392b',
                }}
            >
                ×
            </button>
        </div>
    );
}