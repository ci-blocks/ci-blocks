// 此文件由 scripts/gen-index.mjs 自动生成，请勿手动修改

import { 行为记录 } from './audit/block';
import { 异地容灾 } from './branch-protect/block';
import { 自动编译 } from './build/block';
import { 契约对应 } from './contract/block';
import { 次数铡刀 } from './count-gate/block';
import { 部署GitHubPages } from './deploy-gh-pages/block';
import { 行为条件 } from './if-action/block';
import { 分支条件 } from './if-branch/block';
import { 工作流判定条件 } from './if-workflow/block';
import { 越权控制 } from './ownership-guard/block';
import { 追根溯源 } from './provenance/block';
import { 成品校验 } from './test/block';
import { 文本框 } from './text-note/block';
import { 时间铡刀 } from './time-gate/block';

export { 行为记录 };
export type { 行为记录输入 } from './audit/block';
export { 异地容灾 };
export type { 异地容灾输入 } from './branch-protect/block';
export { 自动编译 };
export type { 自动编译输入 } from './build/block';
export { 契约对应 };
export type { 契约对应输入 } from './contract/block';
export { 次数铡刀 };
export type { 次数铡刀输入 } from './count-gate/block';
export { 部署GitHubPages };
export type { 部署GitHubPages输入 } from './deploy-gh-pages/block';
export { 行为条件 };
export type { 行为条件输入 } from './if-action/block';
export { 分支条件 };
export type { 分支条件输入 } from './if-branch/block';
export { 工作流判定条件 };
export type { 工作流判定条件输入 } from './if-workflow/block';
export { 越权控制 };
export type { 越权控制输入 } from './ownership-guard/block';
export { 追根溯源 };
export type { 追根溯源输入 } from './provenance/block';
export { 成品校验 };
export type { 成品校验输入 } from './test/block';
export { 文本框 };
export type { 文本框输入 } from './text-note/block';
export { 时间铡刀 };
export type { 时间铡刀输入 } from './time-gate/block';

// 所有官方积木
export const 所有积木 = [
  行为记录,
  异地容灾,
  自动编译,
  契约对应,
  次数铡刀,
  部署GitHubPages,
  行为条件,
  分支条件,
  工作流判定条件,
  越权控制,
  追根溯源,
  成品校验,
  文本框,
  时间铡刀,
];
