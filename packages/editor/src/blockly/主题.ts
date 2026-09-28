import * as Blockly from 'blockly';

const CIB主题 = Blockly.Theme.defineTheme('cib', {
    base: Blockly.Themes.Classic,
    componentStyles: {
        workspaceBackgroundColour: 'transparent',   // 背景透明
        toolboxBackgroundColour: 'transparent',
        flyoutBackgroundColour: 'transparent',
        flyoutOpacity: 0,
        scrollbarColour: '#bbb',
    },
});

const ws = Blockly.inject(容器.current, {
    toolbox: 生成工具箱(积木箱, 语言包),
    theme: CIB主题,
    grid: { spacing: 20, length: 3, colour: '#d0d0d0', snap: true },
    zoom: { controls: true, wheel: true, startScale: 0.9 },
    trashcan: true,
    renderer: 'zelos',
    media: '/blockly-media/',
});