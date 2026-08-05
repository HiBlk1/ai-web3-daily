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
      data: ['xAI', 'Meta-Scale AI', 'Horizon3', 'Encore AI', 'Ode (Anthropic)'],
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
        { value: 100, itemStyle: { color: colors.accent } },
        { value: 143, itemStyle: { color: colors.accent2 } },
        { value: 2.5, itemStyle: { color: colors.accent3 } },
        { value: 0.3, itemStyle: { color: '#b388ff' } },
        { value: 0.2, itemStyle: { color: '#81d4fa' } }
      ],
      barWidth: '45%',
      label: { show: true, position: 'top', color: colors.ink, fontSize: 11, formatter: '{c}亿' }
    }]
  });

  // ---- 图表2：主要加密资产24h涨跌幅 ----
  var c2 = echarts.init(document.getElementById('chart-crypto-moves'), null, { renderer: 'svg' });
  c2.setOption({
    backgroundColor: 'transparent',
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, backgroundColor: 'rgba(31,35,48,.95)', borderColor: colors.rule, textStyle: { color: colors.ink, fontSize: 12 } },
    grid: { left: '3%', right: '8%', bottom: '3%', top: '5%', containLabel: true },
    xAxis: {
      type: 'value',
      axisLine: { show: false },
      axisLabel: { color: colors.muted, fontSize: 11, formatter: '{value}%' },
      splitLine: { lineStyle: { color: colors.rule } }
    },
    yAxis: {
      type: 'category',
      data: ['CYS', 'ATOM', 'ALGO', 'ENA', 'SOL', 'BNB', 'BTC', 'ETH', 'XRP', 'KAS'],
      axisLine: { lineStyle: { color: colors.rule } },
      axisLabel: { color: colors.muted, fontSize: 11 }
    },
    series: [{
      type: 'bar',
      data: [
        { value: 93.0, itemStyle: { color: colors.accent2 } },
        { value: 4.2, itemStyle: { color: colors.accent2 } },
        { value: 2.8, itemStyle: { color: colors.accent2 } },
        { value: 1.8, itemStyle: { color: colors.accent2 } },
        { value: 0.9, itemStyle: { color: colors.accent2 } },
        { value: 0.6, itemStyle: { color: colors.accent2 } },
        { value: 0.6, itemStyle: { color: colors.accent2 } },
        { value: 0.8, itemStyle: { color: colors.accent2 } },
        { value: -0.2, itemStyle: { color: colors.danger } },
        { value: -1.5, itemStyle: { color: colors.danger } }
      ],
      barWidth: '55%',
      label: { show: true, position: 'right', color: colors.ink, fontSize: 11, formatter: '{c}%' }
    }]
  });

  // ---- 图表3：AI资本开支趋势 ----
  var c3 = echarts.init(document.getElementById('chart-ai-capex'), null, { renderer: 'svg' });
  c3.setOption({
    backgroundColor: 'transparent',
    tooltip: { trigger: 'axis', backgroundColor: 'rgba(31,35,48,.95)', borderColor: colors.rule, textStyle: { color: colors.ink, fontSize: 12 } },
    legend: { data: ['四大云厂商合计', 'Google'], textStyle: { color: colors.muted, fontSize: 11 }, top: 0 },
    grid: { left: '3%', right: '4%', bottom: '3%', top: '18%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['2024', '2025', '2026E', '2027E'],
      axisLine: { lineStyle: { color: colors.rule } },
      axisLabel: { color: colors.muted, fontSize: 11 }
    },
    yAxis: {
      type: 'value',
      name: '十亿美元',
      nameTextStyle: { color: colors.muted, fontSize: 10 },
      axisLine: { show: false },
      axisLabel: { color: colors.muted, fontSize: 11 },
      splitLine: { lineStyle: { color: colors.rule } }
    },
    series: [
      {
        name: '四大云厂商合计',
        type: 'line',
        smooth: true,
        data: [280, 420, 730, 1000],
        lineStyle: { color: colors.accent, width: 2 },
        itemStyle: { color: colors.accent },
        areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(110,168,254,0.25)' },
          { offset: 1, color: 'rgba(110,168,254,0.02)' }
        ]) },
        symbol: 'circle',
        symbolSize: 6
      },
      {
        name: 'Google',
        type: 'line',
        smooth: true,
        data: [65, 95, 200, 260],
        lineStyle: { color: colors.accent2, width: 2 },
        itemStyle: { color: colors.accent2 },
        symbol: 'circle',
        symbolSize: 6
      }
    ]
  });

  // ---- 图表4：本周AI融资领域分布 ----
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
        { value: 143, name: '数据标注/AI基础设施', itemStyle: { color: colors.accent2 } },
        { value: 100, name: '大模型/通用AI', itemStyle: { color: colors.accent } },
        { value: 2.5, name: 'AI安全/网络安全', itemStyle: { color: colors.danger } },
        { value: 0.5, name: 'AI Agent/企业应用', itemStyle: { color: colors.accent3 } },
        { value: 0.3, name: '客服/垂直应用', itemStyle: { color: '#b388ff' } }
      ]
    }]
  });

  // ---- 图表4：OpenRouter周榜Top10模型Token用量 ----
  var c4b = echarts.init(document.getElementById('chart-ai-kol-models'), null, { renderer: 'svg' });
  c4b.setOption({
    backgroundColor: 'transparent',
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, backgroundColor: 'rgba(31,35,48,.95)', borderColor: colors.rule, textStyle: { color: colors.ink, fontSize: 12 }, formatter: function(params) { return params[0].name + '<br/>Token: ' + params[0].value + ' 万亿'; } },
    grid: { left: '3%', right: '6%', bottom: '3%', top: '5%', containLabel: true },
    xAxis: {
      type: 'value',
      name: '万亿 tokens',
      nameTextStyle: { color: colors.muted, fontSize: 10 },
      axisLine: { show: false },
      axisLabel: { color: colors.muted, fontSize: 11 },
      splitLine: { lineStyle: { color: colors.rule } }
    },
    yAxis: {
      type: 'category',
      data: ['Kimi K3', 'Step 3.7 Flash', 'GPT-5.6 Luna', 'MiniMax M3', 'Nemotron 3 Ultra', 'GLM 5.2', 'DeepSeek V4 Pro', 'Hy3 (Tencent)', 'MiMo-V2.5 (Xiaomi)', 'DeepSeek V4 Flash'],
      axisLine: { lineStyle: { color: colors.rule } },
      axisLabel: { color: colors.muted, fontSize: 10 }
    },
    series: [{
      type: 'bar',
      data: [
        { value: 1.42, itemStyle: { color: '#b388ff' } },
        { value: 1.66, itemStyle: { color: '#81d4fa' } },
        { value: 1.95, itemStyle: { color: colors.danger } },
        { value: 1.96, itemStyle: { color: '#ba68c8' } },
        { value: 2.43, itemStyle: { color: colors.accent3 } },
        { value: 2.89, itemStyle: { color: '#4dd0e1' } },
        { value: 3.28, itemStyle: { color: colors.accent2 } },
        { value: 4.82, itemStyle: { color: colors.accent3 } },
        { value: 6.30, itemStyle: { color: colors.accent2 } },
        { value: 7.22, itemStyle: { color: colors.accent } }
      ],
      barWidth: '55%',
      label: { show: true, position: 'right', color: colors.ink, fontSize: 11, formatter: '{c}T' }
    }]
  });

  // ---- 图表5：链上加密卡平台交易量与市场份额 ----
  // ---- 图表5：LLM Stats综合智能指数Top10 ----
  var c6 = echarts.init(document.getElementById('chart-ai-kol-leaderboard'), null, { renderer: 'svg' });
  c6.setOption({
    backgroundColor: 'transparent',
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, backgroundColor: 'rgba(31,35,48,.95)', borderColor: colors.rule, textStyle: { color: colors.ink, fontSize: 12 } },
    grid: { left: '3%', right: '10%', bottom: '3%', top: '5%', containLabel: true },
    xAxis: {
      type: 'value',
      name: '综合评分',
      nameTextStyle: { color: colors.muted, fontSize: 10 },
      axisLine: { show: false },
      axisLabel: { color: colors.muted, fontSize: 11 },
      splitLine: { lineStyle: { color: colors.rule } },
      max: 65
    },
    yAxis: {
      type: 'category',
      data: ['GLM-5.2', 'Gemini 3 Pro', 'Grok 4', 'Kimi K3', 'GPT-5.5', 'Claude Sonnet 5', 'Gemini 3.1 Pro', 'Claude Opus 4.7', 'GPT-5.6 Sol', 'Claude Opus 5'],
      axisLine: { lineStyle: { color: colors.rule } },
      axisLabel: { color: colors.muted, fontSize: 10 }
    },
    series: [{
      type: 'bar',
      data: [
        { value: 51, itemStyle: { color: '#b388ff' } },
        { value: 52, itemStyle: { color: '#81d4fa' } },
        { value: 53, itemStyle: { color: '#ba68c8' } },
        { value: 55.7, itemStyle: { color: colors.accent3 } },
        { value: 55, itemStyle: { color: '#4dd0e1' } },
        { value: 53, itemStyle: { color: colors.accent2 } },
        { value: 54, itemStyle: { color: '#80cbc4' } },
        { value: 54, itemStyle: { color: colors.danger } },
        { value: 57.7, itemStyle: { color: colors.accent } },
        { value: 57.8, itemStyle: { color: colors.accent2 } }
      ],
      barWidth: '55%',
      label: { show: true, position: 'right', color: colors.ink, fontSize: 11, formatter: '{c}' }
    }]
  });

  // ---- 图表6：全球AI算力指数ECI趋势 ----
  var c7 = echarts.init(document.getElementById('chart-ai-kol-compute'), null, { renderer: 'svg' });
  c7.setOption({
    backgroundColor: 'transparent',
    tooltip: { trigger: 'axis', backgroundColor: 'rgba(31,35,48,.95)', borderColor: colors.rule, textStyle: { color: colors.ink, fontSize: 12 } },
    legend: { data: ['ECI算力指数', '等效芯片数(百万)'], textStyle: { color: colors.muted, fontSize: 11 }, top: 0 },
    grid: { left: '3%', right: '8%', bottom: '3%', top: '18%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['2024 Q1', '2024 Q3', '2025 Q1', '2025 Q3', '2026 Q1', '2026 Q3'],
      axisLine: { lineStyle: { color: colors.rule } },
      axisLabel: { color: colors.muted, fontSize: 11 }
    },
    yAxis: [
      {
        type: 'value',
        name: 'ECI指数',
        nameTextStyle: { color: colors.muted, fontSize: 10 },
        axisLine: { show: false },
        axisLabel: { color: colors.muted, fontSize: 11 },
        splitLine: { lineStyle: { color: colors.rule } }
      },
      {
        type: 'value',
        name: '芯片(M)',
        nameTextStyle: { color: colors.muted, fontSize: 10 },
        axisLine: { show: false },
        axisLabel: { color: colors.muted, fontSize: 11 },
        splitLine: { show: false }
      }
    ],
    series: [
      {
        name: 'ECI算力指数',
        type: 'line',
        smooth: true,
        data: [100, 145, 210, 310, 460, 620],
        lineStyle: { color: colors.accent, width: 2.5 },
        itemStyle: { color: colors.accent },
        areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(110,168,254,0.2)' },
          { offset: 1, color: 'rgba(110,168,254,0.01)' }
        ]) },
        symbol: 'circle',
        symbolSize: 6
      },
      {
        name: '等效芯片数(百万)',
        type: 'line',
        yAxisIndex: 1,
        smooth: true,
        data: [2.8, 4.1, 5.9, 8.2, 10.5, 12.5],
        lineStyle: { color: colors.accent2, width: 2 },
        itemStyle: { color: colors.accent2 },
        symbol: 'circle',
        symbolSize: 6
      }
    ]
  });

  // ---- 图表7：五大科技巨头AI资本开支与股价涨幅对比 ----
  var c8 = echarts.init(document.getElementById('chart-ai-kol-marketmind'), null, { renderer: 'svg' });
  c8.setOption({
    backgroundColor: 'transparent',
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, backgroundColor: 'rgba(31,35,48,.95)', borderColor: colors.rule, textStyle: { color: colors.ink, fontSize: 12 } },
    legend: { data: ['AI资本开支(亿美元)', '股价涨幅(%)'], textStyle: { color: colors.muted, fontSize: 11 }, top: 0 },
    grid: { left: '3%', right: '8%', bottom: '3%', top: '15%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['Microsoft', 'Google', 'Amazon', 'Meta', 'Apple'],
      axisLine: { lineStyle: { color: colors.rule } },
      axisLabel: { color: colors.muted, fontSize: 10, interval: 0 }
    },
    yAxis: [
      {
        type: 'value',
        name: '资本开支($B)',
        nameTextStyle: { color: colors.muted, fontSize: 10 },
        axisLine: { show: false },
        axisLabel: { color: colors.muted, fontSize: 11 },
        splitLine: { lineStyle: { color: colors.rule } }
      },
      {
        type: 'value',
        name: '涨幅(%)',
        nameTextStyle: { color: colors.muted, fontSize: 10 },
        axisLine: { show: false },
        axisLabel: { color: colors.muted, fontSize: 11, formatter: '{value}%' },
        splitLine: { show: false }
      }
    ],
    series: [
      {
        name: 'AI资本开支(亿美元)',
        type: 'bar',
        data: [
          { value: 110, itemStyle: { color: colors.accent } },
          { value: 200, itemStyle: { color: colors.accent } },
          { value: 85, itemStyle: { color: colors.accent } },
          { value: 143, itemStyle: { color: colors.accent } },
          { value: 25, itemStyle: { color: colors.accent } }
        ],
        barWidth: '30%'
      },
      {
        name: '股价涨幅(%)',
        type: 'line',
        yAxisIndex: 1,
        smooth: true,
        data: [38, 42, 25, 67, 18],
        lineStyle: { color: colors.accent2, width: 2.5 },
        itemStyle: { color: colors.accent2 },
        symbol: 'circle',
        symbolSize: 7
      }
    ]
  });

  var c5 = echarts.init(document.getElementById('chart-kol-cards'), null, { renderer: 'svg' });
  c5.setOption({
    backgroundColor: 'transparent',
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, backgroundColor: 'rgba(31,35,48,.95)', borderColor: colors.rule, textStyle: { color: colors.ink, fontSize: 12 } },
    legend: { data: ['交易量（十亿美元）', '市场份额（%）'], textStyle: { color: colors.muted, fontSize: 11 }, top: 0 },
    grid: { left: '3%', right: '8%', bottom: '3%', top: '15%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['RedotPay', 'ether.fi', 'Cypher', 'Gnosis Pay', 'Holyheld', 'MetaMask'],
      axisLine: { lineStyle: { color: colors.rule } },
      axisLabel: { color: colors.muted, fontSize: 10, interval: 0, rotate: 0 }
    },
    yAxis: [
      {
        type: 'value',
        name: '交易量 ($B)',
        nameTextStyle: { color: colors.muted, fontSize: 10 },
        axisLine: { show: false },
        axisLabel: { color: colors.muted, fontSize: 11 },
        splitLine: { lineStyle: { color: colors.rule } }
      },
      {
        type: 'value',
        name: '份额 (%)',
        nameTextStyle: { color: colors.muted, fontSize: 10 },
        axisLine: { show: false },
        axisLabel: { color: colors.muted, fontSize: 11, formatter: '{value}%' },
        splitLine: { show: false }
      }
    ],
    series: [
      {
        name: '交易量（十亿美元）',
        type: 'bar',
        data: [5.1, 0.405, 0.297, 0.167, 0.137, 0.067],
        itemStyle: { color: colors.accent },
        barWidth: '30%'
      },
      {
        name: '市场份额（%）',
        type: 'line',
        yAxisIndex: 1,
        smooth: true,
        data: [80.7, 6.4, 4.7, 2.6, 2.1, 1.0],
        lineStyle: { color: colors.accent2, width: 2 },
        itemStyle: { color: colors.accent2 },
        symbol: 'circle',
        symbolSize: 6
      }
    ]
  });

  // 响应式
  function resizeAll() { c1.resize(); c2.resize(); c3.resize(); c4.resize(); c4b.resize(); c6.resize(); c7.resize(); c8.resize(); c5.resize(); }
  window.addEventListener('resize', resizeAll);
})();
