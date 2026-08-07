(function () {
  if (typeof echarts === 'undefined') return;

  var colors = {
    bg: '#0f1117',
    ink: '#e8eaf0',
    muted: '#9aa0b0',
    rule: '#2a2e3c',
    accent: '#6ea8fe',
    accent2: '#5fd6a8',
    accent3: '#f0b86e',
    danger: '#ff6b6b'
  };

  // ---- 图表1：本周AI大额融资事件对比 ----
  var c1 = echarts.init(document.getElementById('chart-ai-funding'), null, { renderer: 'svg' });
  c1.setOption({
    backgroundColor: 'transparent',
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, backgroundColor: 'rgba(31,35,48,.95)', borderColor: colors.rule, textStyle: { color: colors.ink, fontSize: 12 } },
    grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['Sapiom', 'Omilia', 'Hadrian', 'Oracle'],
      axisLine: { lineStyle: { color: colors.rule } },
      axisLabel: { color: colors.muted, fontSize: 11, interval: 0, rotate: 0 }
    },
    yAxis: {
      type: 'value',
      name: '亿美元',
      nameTextStyle: { color: colors.muted, fontSize: 10 },
      axisLine: { show: false },
      axisLabel: { color: colors.muted, fontSize: 11 },
      splitLine: { lineStyle: { color: colors.rule } }
    },
    series: [{
      type: 'bar',
      data: [
        { value: 0.35, itemStyle: { color: '#b388ff' }, name: 'Sapiom' },
        { value: 0.67, itemStyle: { color: '#80cbc4' }, name: 'Omilia' },
        { value: 13.7, itemStyle: { color: colors.accent3 }, name: 'Hadrian' },
        { value: 400, itemStyle: { color: colors.accent }, name: 'Oracle' }
      ],
      barWidth: '45%',
      label: { show: true, position: 'top', color: colors.ink, fontSize: 11, formatter: '{c}亿' }
    }]
  });

  // ---- 图表2：AI模型Terminal-Bench 2.1 / ARC-AGI-3得分对比 ----
  var c3 = echarts.init(document.getElementById('chart-ai-capex'), null, { renderer: 'svg' });
  c3.setOption({
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: 'rgba(31,35,48,.95)',
      borderColor: colors.rule,
      textStyle: { color: colors.ink, fontSize: 12 },
      formatter: function(params) {
        var benchmarks = {
          'Prime Agent (ARC-AGI-3)': 'ARC-AGI-3',
          'Muse Code': 'Terminal-Bench 2.1',
          'GPT-5.6 Terra': 'Terminal-Bench 2.1',
          'Claude Fable 5': 'MirrorCode'
        };
        var b = benchmarks[params[0].name] || '';
        return params[0].name + '<br/>基准: ' + b + '<br/>得分: ' + params[0].value + '%';
      }
    },
    grid: { left: '3%', right: '8%', bottom: '3%', top: '5%', containLabel: true },
    xAxis: {
      type: 'value',
      name: '得分 (%)',
      nameTextStyle: { color: colors.muted, fontSize: 10 },
      axisLine: { show: false },
      axisLabel: { color: colors.muted, fontSize: 11, formatter: '{value}%' },
      splitLine: { lineStyle: { color: colors.rule } },
      max: 100
    },
    yAxis: {
      type: 'category',
      data: ['Claude Fable 5', 'GPT-5.6 Terra', 'Muse Code', 'Prime Agent (ARC-AGI-3)'],
      axisLine: { lineStyle: { color: colors.rule } },
      axisLabel: { color: colors.muted, fontSize: 11 }
    },
    series: [{
      type: 'bar',
      data: [
        { value: 64.0, itemStyle: { color: colors.accent3 } },
        { value: 81.8, itemStyle: { color: '#ba68c8' } },
        { value: 82.9, itemStyle: { color: colors.accent } },
        { value: 95.5, itemStyle: { color: colors.accent2 } }
      ],
      barWidth: '50%',
      label: { show: true, position: 'right', color: colors.ink, fontSize: 11, formatter: '{c}%' }
    }]
  });

  // ---- 图表3：本周AI融资领域分布 ----
  var c4 = echarts.init(document.getElementById('chart-ai-sector'), null, { renderer: 'svg' });
  c4.setOption({
    backgroundColor: 'transparent',
    tooltip: { trigger: 'item', backgroundColor: 'rgba(31,35,48,.95)', borderColor: colors.rule, textStyle: { color: colors.ink, fontSize: 12 }, formatter: '{b}: {c}亿美元 ({d}%)' },
    legend: { orient: 'vertical', right: '5%', top: 'center', textStyle: { color: colors.muted, fontSize: 11 } },
    series: [{
      type: 'pie',
      radius: ['45%', '70%'],
      center: ['35%', '50%'],
      avoidLabelOverlap: true,
      itemStyle: { borderColor: colors.bg, borderWidth: 2 },
      label: { show: false },
      labelLine: { show: false },
      data: [
        { value: 400, name: 'AI基础设施/算力', itemStyle: { color: colors.accent } },
        { value: 13.7, name: '国防科技', itemStyle: { color: colors.accent2 } },
        { value: 0.67, name: '语音AI', itemStyle: { color: colors.accent3 } },
        { value: 0.35, name: '模型路由', itemStyle: { color: '#ba68c8' } }
      ]
    }]
  });

  // ---- 图表4：OpenRouter本周模型调用量Top 8 ----
  var c4b = echarts.init(document.getElementById('chart-ai-kol-openrouter'), null, { renderer: 'svg' });
  c4b.setOption({
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: 'rgba(31,35,48,.95)',
      borderColor: colors.rule,
      textStyle: { color: colors.ink, fontSize: 12 },
      formatter: function(params) {
        return params[0].name + '<br/>调用量占比: ' + params[0].value + '%';
      }
    },
    grid: { left: '3%', right: '10%', bottom: '3%', top: '5%', containLabel: true },
    xAxis: {
      type: 'value',
      name: '调用量占比 (%)',
      nameTextStyle: { color: colors.muted, fontSize: 10 },
      axisLine: { show: false },
      axisLabel: { color: colors.muted, fontSize: 11, formatter: '{value}%' },
      splitLine: { lineStyle: { color: colors.rule } }
    },
    yAxis: {
      type: 'category',
      data: ['Gemini 3.1 Pro', 'Kimi K3', 'DeepSeek V4 Flash', 'Claude Opus 5', 'Grok 4', 'GLM-5.2', 'Claude Fable 5', 'GPT-5.6 Sol'],
      axisLine: { lineStyle: { color: colors.rule } },
      axisLabel: { color: colors.muted, fontSize: 10 }
    },
    series: [{
      type: 'bar',
      data: [
        { value: 7.1, itemStyle: { color: '#b388ff' } },
        { value: 8.3, itemStyle: { color: '#81d4fa' } },
        { value: 9.5, itemStyle: { color: colors.accent3 } },
        { value: 10.2, itemStyle: { color: '#4dd0e1' } },
        { value: 11.8, itemStyle: { color: '#80cbc4' } },
        { value: 12.4, itemStyle: { color: '#ba68c8' } },
        { value: 15.7, itemStyle: { color: colors.danger } },
        { value: 18.2, itemStyle: { color: colors.accent } }
      ],
      barWidth: '55%',
      label: { show: true, position: 'right', color: colors.ink, fontSize: 11, formatter: '{c}%' }
    }]
  });

  // ---- 图表5：全球AI算力投资规模对比 ----
  var c7 = echarts.init(document.getElementById('chart-ai-kol-compute'), null, { renderer: 'svg' });
  c7.setOption({
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: 'rgba(31,35,48,.95)',
      borderColor: colors.rule,
      textStyle: { color: colors.ink, fontSize: 12 },
      formatter: function(params) { return params[0].name + '<br/>投资规模: ' + params[0].value + ' 亿美元'; }
    },
    grid: { left: '3%', right: '8%', bottom: '3%', top: '5%', containLabel: true },
    xAxis: {
      type: 'value',
      name: '亿美元',
      nameTextStyle: { color: colors.muted, fontSize: 10 },
      axisLine: { show: false },
      axisLabel: { color: colors.muted, fontSize: 11 },
      splitLine: { lineStyle: { color: colors.rule } }
    },
    yAxis: {
      type: 'category',
      data: ['Wayve', 'Waymo', 'Anthropic DC', '欧盟超级工厂', 'Oracle-OpenAI'],
      axisLine: { lineStyle: { color: colors.rule } },
      axisLabel: { color: colors.muted, fontSize: 11 }
    },
    series: [{
      type: 'bar',
      data: [
        { value: 12, itemStyle: { color: '#b388ff' } },
        { value: 150, itemStyle: { color: '#81d4fa' } },
        { value: 150, itemStyle: { color: colors.accent3 } },
        { value: 330, itemStyle: { color: colors.accent2 } },
        { value: 400, itemStyle: { color: colors.accent } }
      ],
      barWidth: '50%',
      label: { show: true, position: 'right', color: colors.ink, fontSize: 11, formatter: '{c}亿' }
    }]
  });

  // ---- 图表6：全球AI芯片HBM供应缺口预测（2026-2027）----
  var c8 = echarts.init(document.getElementById('chart-ai-kol-marketmind'), null, { renderer: 'svg' });
  c8.setOption({
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(31,35,48,.95)',
      borderColor: colors.rule,
      textStyle: { color: colors.ink, fontSize: 12 },
      formatter: function(params) { return params[0].name + '<br/>HBM需求缺口: ' + params[0].value + '%'; }
    },
    legend: { data: ['HBM需求缺口 (%)'], textStyle: { color: colors.muted, fontSize: 11 }, top: 0 },
    grid: { left: '3%', right: '5%', bottom: '3%', top: '12%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['2026 Q1', '2026 Q2', '2026 Q3', '2026 Q4', '2027 Q1', '2027 Q2'],
      axisLine: { lineStyle: { color: colors.rule } },
      axisLabel: { color: colors.muted, fontSize: 10 }
    },
    yAxis: {
      type: 'value',
      name: '缺口 (%)',
      nameTextStyle: { color: colors.muted, fontSize: 10 },
      axisLine: { show: false },
      axisLabel: { color: colors.muted, fontSize: 11, formatter: '{value}%' },
      splitLine: { lineStyle: { color: colors.rule } }
    },
    series: [{
      name: 'HBM需求缺口 (%)',
      type: 'line',
      smooth: true,
      data: [4, 6, 8, 11, 14, 18],
      lineStyle: { color: colors.danger, width: 2.5 },
      itemStyle: { color: colors.danger },
      symbol: 'circle',
      symbolSize: 7,
      areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(255,107,107,.25)' }, { offset: 1, color: 'rgba(255,107,107,0)' }] } },
      label: { show: true, position: 'top', color: colors.ink, fontSize: 10, formatter: '{c}%' }
    }]
  });

  // ---- 图表7：比特币与以太坊现货ETF近4日资金流向对比 ----
  var c2 = echarts.init(document.getElementById('chart-crypto-moves'), null, { renderer: 'svg' });
  c2.setOption({
    backgroundColor: 'transparent',
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, backgroundColor: 'rgba(31,35,48,.95)', borderColor: colors.rule, textStyle: { color: colors.ink, fontSize: 12 } },
    legend: { data: ['BTC ETF 净流入', 'ETH ETF 净流入'], textStyle: { color: colors.muted, fontSize: 11 }, top: 0 },
    grid: { left: '3%', right: '5%', bottom: '3%', top: '12%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['8/3', '8/4', '8/5', '8/6'],
      axisLine: { lineStyle: { color: colors.rule } },
      axisLabel: { color: colors.muted, fontSize: 11 }
    },
    yAxis: {
      type: 'value',
      name: '百万美元',
      nameTextStyle: { color: colors.muted, fontSize: 10 },
      axisLine: { show: false },
      axisLabel: { color: colors.muted, fontSize: 11 },
      splitLine: { lineStyle: { color: colors.rule } }
    },
    series: [
      {
        name: 'BTC ETF 净流入',
        type: 'bar',
        data: [140, 212, 244, 138],
        barWidth: '30%',
        itemStyle: { color: colors.accent },
        label: { show: true, position: 'top', color: colors.muted, fontSize: 9, formatter: '{c}M' }
      },
      {
        name: 'ETH ETF 净流入',
        type: 'bar',
        data: [40, 43, 61, 92],
        barWidth: '30%',
        itemStyle: { color: colors.accent2 },
        label: { show: true, position: 'top', color: colors.muted, fontSize: 9, formatter: '{c}M' }
      }
    ]
  });

  // ---- 图表8：比特币现货ETF近7日资金流向 ----
  var c5 = echarts.init(document.getElementById('chart-kol-cards'), null, { renderer: 'svg' });
  c5.setOption({
    backgroundColor: 'transparent',
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, backgroundColor: 'rgba(31,35,48,.95)', borderColor: colors.rule, textStyle: { color: colors.ink, fontSize: 12 } },
    legend: { data: ['净流入（百万美元）'], textStyle: { color: colors.muted, fontSize: 11 }, top: 0 },
    grid: { left: '3%', right: '5%', bottom: '3%', top: '12%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['7/31', '8/1', '8/2', '8/3', '8/4', '8/5', '8/6'],
      axisLine: { lineStyle: { color: colors.rule } },
      axisLabel: { color: colors.muted, fontSize: 10 }
    },
    yAxis: {
      type: 'value',
      name: '百万美元',
      nameTextStyle: { color: colors.muted, fontSize: 10 },
      axisLine: { show: false },
      axisLabel: { color: colors.muted, fontSize: 11 },
      splitLine: { lineStyle: { color: colors.rule } }
    },
    series: [{
      name: '净流入（百万美元）',
      type: 'bar',
      data: [
        { value: -85, itemStyle: { color: '#ff6b6b' } },
        { value: -120, itemStyle: { color: '#ff6b6b' } },
        { value: -45, itemStyle: { color: '#ff6b6b' } },
        { value: 140, itemStyle: { color: '#5fd6a8' } },
        { value: 212, itemStyle: { color: '#5fd6a8' } },
        { value: 244, itemStyle: { color: '#5fd6a8' } },
        { value: 138, itemStyle: { color: '#5fd6a8' } }
      ],
      barWidth: '40%',
      label: { show: true, position: 'top', color: colors.muted, fontSize: 10, formatter: '{c}M' }
    }]
  });

  // 响应式
  function resizeAll() { c1.resize(); c3.resize(); c4.resize(); c4b.resize(); c7.resize(); c8.resize(); c2.resize(); c5.resize(); }
  window.addEventListener('resize', resizeAll);
})();
