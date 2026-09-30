import { useEffect, useRef, useState } from 'react';
import * as Blockly from 'blockly';
import { 画布 } from './画布';
import { 预览栏 } from './预览栏';
import { 菜单栏 } from './菜单栏';
import {
    时间铡刀,
    次数铡刀,
    分支条件,
    行为条件,
    越权控制,
    异地容灾,
    工作流判定条件,
    自动编译,
    成品校验,
    行为记录,
    追根溯源,
    契约对应,
    部署GitHubPages,
    文本框,
} from '@cib/blocks-official';
import { use编辑器 } from '../store/编辑器状态';
import { use语言 } from '../store/语言状态';
import {
    加载单个外部积木,
    从URL取名字,
    从URL读取积木参数,
} from '../blocks/加载器';

const 内置积木 = [
    行为条件,
    分支条件,
    工作流判定条件,
    文本框,
    时间铡刀,
    次数铡刀,
    越权控制,
    异地容灾,
    自动编译,
    成品校验,
    行为记录,
    追根溯源,
    契约对应,
    部署GitHubPages,
];

export function 三栏布局() {
    const 工作区 = useRef<Blockly.WorkspaceSvg | null>(null);
    const 语言包 = use语言((s) => s.语言包);
    const [工作流名称, 设置工作流名称] = useState(语言包.通用.未命名工作流);
    const 用户改过 = useRef(false);
    const [加载状态, set加载状态] = useState('');

    const 设置积木箱 = use编辑器((s) => s.设置积木箱);
    const 添加外部积木 = use编辑器((s) => s.添加外部积木);
    const 更新外部积木 = use编辑器((s) => s.更新外部积木);

    useEffect(() => {
        if (!用户改过.current) {
            设置工作流名称(语言包.通用.未命名工作流);
        }
    }, [语言包]);

    useEffect(() => {
        const 初始化 = async () => {
            // 先注册内置积木
            设置积木箱(内置积木);

            const urls = 从URL读取积木参数();
            if (urls.length === 0) return;

            set加载状态(
                `正在加载 ${urls.length} 个外部积木…`,
            );

            for (const url of urls) {
                const id = `url-${url}`;
                添加外部积木({
                    id,
                    名称: 从URL取名字(url),
                    url,
                    来源: 'URL',
                    状态: '加载中',
                    积木: [],
                    积木数量: 0,
                });

                const { 积木, 错误 } = await 加载单个外部积木(url);
                if (错误 || 积木.length === 0) {
                    更新外部积木(id, {
                        状态: '失败',
                        错误: 错误 ?? '未导出积木',
                        积木: [],
                        积木数量: 0,
                    });
                } else {
                    更新外部积木(id, {
                        状态: '成功',
                        积木,
                        积木数量: 积木.length,
                        名称: 积木[0]?.keyword ?? 从URL取名字(url),
                    });
                }
            }

            set加载状态('');
        };

        初始化();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const 包装设置工作流名称 = (n: string) => {
        用户改过.current = true;
        设置工作流名称(n);
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                width: '100vw',
            }}
        >
            <菜单栏
                工作区={工作区}
                工作流名称={工作流名称}
                设置工作流名称={包装设置工作流名称}
            />
            {加载状态 && (
                <div
                    style={{
                        background: '#f39c12',
                        color: '#ddddddaa',
                        padding: '4px 16px',
                        fontSize: 12,
                    }}
                >
                    {加载状态}
                </div>
            )}
            <div
                style={{
                    flex: 1,
                    display: 'grid',
                    gridTemplateColumns: '1fr 480px',
                    gap: '1px',
                    background: '#ffffff',
                    overflow: 'hidden',
                }}
            >
                <div
                    style={{
                        position: 'relative',
                        overflow: 'hidden',
                        height: '100%',
                        minHeight: 0,
                    }}
                >
                    <画布 工作区={工作区} />
                </div>
                <div
                    style={{
                        position: 'relative',
                        overflow: 'auto',
                        height: '100%',
                        minHeight: 0,
                        background: '#dddddd',
                    }}
                >
                    <预览栏 工作流名称={工作流名称} />
                </div>
            </div>
        </div>
    );
}