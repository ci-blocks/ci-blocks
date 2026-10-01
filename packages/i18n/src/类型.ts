export type 语言 = 'zh-CN' | 'zh-HK' | 'zh-MO' | 'zh-TW' | 'en-US' | 'ja-JP';

export interface 语言包 {
    语言: 语言;
    名称: string;

    品牌: {
        名称: string;
        出品: string;
        slogan: string;
    };

    通用: {
        删除: string;
        添加: string;
        取消: string;
        确定: string;
        加载中: string;
        未命名工作流: string;

        // 新增
        年: string;
        月: string;
        日: string;
        时: string;
        分: string;
        秒: string;
        执行: string;
    },

    工具栏: {
        品牌: string;
        文件: string;
        编辑: string;
        视图: string;
        工具: string;
        帮助: string;
        新建: string;
        打开: string;
        保存: string;
        另存为: string;
        导出为: string;
        导出GitHubYAML: string;
        导出GitLabYAML: string;
        导出CircleCI: string;
        导出Jenkinsfile: string;
        导出通用YAML: string;
        导出积木JSON: string;
        撤销: string;
        重做: string;
        复制: string;
        剪切: string;
        粘贴: string;
        删除: string;
        全选: string;
        清空画布: string;
        清空确认: string;
        已清空: string;
        语言: string;
        工作流名称占位: string;
        新建确认: string;
        模板新建确认: string;
        已新建: string;
        已保存: string;
        已另存为: string;
        已导出: string;
        保存失败: string;
        暂未实现: string;
        取消保存: string;
        打开失败: string;
        已打开: string;
        未选中积木: string;
        已复制: string;
        已剪切: string;
        已粘贴: string;
        粘贴失败: string;
        已删除: string;
        已选中: string;
        右键菜单: {
            复制为JSON: string;
            清空画布: string;
            清空确认: string;
        };
        视图菜单: {
            放大: string;
            缩小: string;
            重置缩放: string;
            折叠所有: string;
            展开所有: string;
            整理积木: string;
            已整理: string;
        };
        工具菜单: {
            加载外部积木: string;
            加载外部积木标题: string;
            加载外部积木说明: string;
            加载: string;
            导出YAML: string;
            复制YAML: string;
            已复制YAML: string;
            已加载外部积木: string;
            加载失败: string;
            无YAML: string;
            从模板新建: string;
            无模板: string;
            已加载模板: string;
            加载模板失败: string;

            外部积木管理: string;
            外部积木输入提示: string;
            未导出积木: string;
            已加载列表: string;
            暂无外部积木: string;
            清空: string;
            清空外部积木确认: string;
            重试: string;
            状态成功: string;
            状态失败: string;
            状态加载中: string;
            加载中: string;
        };
        帮助菜单: {
            文档: string;
            快捷键: string;
            关于: string;
            GitHub仓库: string;
            关于标题: string;
            关于描述: string;
            版本: string;
            快捷键标题: string;
            分组编辑器: string;
            分组画布: string;
            分组缩放: string;
            快捷键保存: string;
            快捷键打开: string;
            快捷键新建: string;
            快捷键撤销: string;
            快捷键重做: string;
            快捷键复制: string;
            快捷键剪切: string;
            快捷键粘贴: string;
            快捷键删除: string;
            快捷键全选: string;
            快捷键滚轮缩放: string;
            快捷键放大: string;
            快捷键缩小: string;
        };
    };

    预览栏: {
        标题: string;
        平台GitHub: string;
        平台GitLab: string;
        平台CircleCI: string;
        平台Jenkins: string;
        生成失败: string;
    };

    分类: {
        基础: string;
        门禁: string;
        构建: string;
        校验: string;
        科研: string;
        项目: string;
        审计: string;
        环境: string;
        部署: string;
    };

    积木: Record<string, {
        keyword: string;
        描述: string;
        字段: Record<string, string>;
        选项?: Record<string, string>;
    }>;

    CI日志: {
        // 步骤名（Actions UI 显示）
        时间检查: string;              // "时间检查（%1）"
        次数检查: string;              // "次数检查（%1）"
        越权检查: string;              // "越权检查（%1）（%2）"
        异地容灾: string;              // "异地容灾（%1）"
        门禁: string;                  // "门禁（%1）：%2"
        检出代码: string;              // "检出代码"
        未知门禁: string;              // "未实现的门禁 %1"
        未知条件: string;              // "未知条件（%1）"

        // run 脚本里的日志
        时间之前: string;              // "当前时间在基准时间之前"
        时间之后: string;              // "当前时间在基准时间之后"
        条件不成立跳过: string;        // "%1 不成立，跳过"
        无法解析基准时间: string;      // "无法解析基准时间：%1（时区 %2）"
        次数检查通过: string;          // "次数检查通过"
        次数检查未通过: string;        // "次数检查未通过（%1 %2 %3）"
        次数条件成立: string;          // "次数条件成立"
        次数条件不成立: string;        // "次数条件不成立，跳过"
        次数仅告警: string;            // "次数检查未通过（%1 %2 %3），仅告警"
        越权检查通过: string;          // "越权检查通过"
        越权不在负责人表: string;      // "%1 不在负责人表中"
        越权无权修改: string;          // "%1 无权修改 %2"
        越权豁免: string;              // "豁免者 %1，跳过越权检查"
        越权仅告警: string;            // "越权但仅告警"
        分支不在保护列表: string;      // "分支 %1 不在保护列表，跳过"
        分支受保护开始检查: string;    // "分支 %1 受保护，开始检查"
        检测直接push: string;          // "检测到 %1 直接 push 到保护分支 %2"
        PR需要review: string;          // "PR 需要至少 %1 个 review，当前 %2"
        分支保护提醒: string;          // "提醒：请在仓库 Settings → Branches 配置分支保护规则"
        分支保护检查通过: string;      // "保护分支检查通过"
    }
}

export function 取积木名(包: 语言包, blockId: string, 回退: string): string {
    return 包.积木[blockId]?.keyword ?? 回退;
}

export function 取积木描述(包: 语言包, blockId: string, 回退: string): string {
    return 包.积木[blockId]?.描述 ?? 回退;
}

export function 取字段名(
    包: 语言包,
    blockId: string,
    字段键: string,
    回退: string,
): string {
    return 包.积木[blockId]?.字段[字段键] ?? 回退;
}

export function 取选项名(
    包: 语言包,
    blockId: string,
    原值: string,
    回退: string,
): string {
    return 包.积木[blockId]?.选项?.[原值] ?? 回退;
}

