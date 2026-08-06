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
      data: ['HappyRobot', 'Moove Seed', 'Wayve', 'Moove C轮', 'Anthropic DC', 'Waymo'],
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
        { value: 1.5, itemStyle: { color: '#80cbc4' }, name: 'HappyRobot' },
        { value: 2.5, itemStyle: { color: '#4dd0e1' }, name: 'Moove' },
        { value: 12, itemStyle: { color: '#ba68c8' }, name: 'Wayve' },
        { value: 25, itemStyle: { color: '#f0b86e' }, name: 'Moove C 轮' },
        { value: 150, itemStyle: { color: '#ff6b6b' }, name: 'Anthropic DC' },
        { value: 150, itemStyle: { color: '#6ea8fe' }, name: 'Waymo' }
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
      data: ['SHIB', 'XRP', 'DOGE', 'SOL', 'BNB', 'BTC', 'ETH', 'AVAX', 'ARB', 'INJ'],
      axisLine: { lineStyle: { color: colors.rule } },
      axisLabel: { color: colors.muted, fontSize: 11 }
    },
    series: [{
      type: 'bar',
      data: [
        { value: -3.2, itemStyle: { color: colors.danger } },
        { value: -1.8, itemStyle: { color: colors.danger } },
        { value: -0.9, itemStyle: { color: colors.danger } },
        { value: 0.8, itemStyle: { color: colors.accent2 } },
        { value: 1.5, itemStyle: { color: colors.accent2 } },
        { value: 2.4, itemStyle: { color: colors.accent2 } },
        { value: 2.2, itemStyle: { color: colors.accent2 } },
        { value: 3.1, itemStyle: { color: colors.accent2 } },
        { value: 4.2, itemStyle: { color: colors.accent2 } },
        { value: 5.8, itemStyle: { color: colors.accent2 } }
      ],
      barWidth: '55%',
      label: { show: true, position: 'right', color: colors.ink, fontSize: 11, formatter: '{c}%' }
    }]
  });

  // ---- 图表3：AI模型ECI能力指数与每百万Token成本对比（新内容）----
  var c3 = echarts.init(document.getElementById('chart-ai-capex'), null, { renderer: 'svg' });
  c3.setOption({
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(31,35,48,.95)',
      borderColor: colors.rule,
      textStyle: { color: colors.ink, fontSize: 12 },
      formatter: function(params) {
        var s = params[0].name + '<br/>';
        params.forEach(function(p) {
          s += p.marker + p.seriesName + ': ' + p.value + (p.seriesName.indexOf('价格') >= 0 ? ' $/M' : '') + '<br/>';
        });
        return s;
      }
    },
    legend: { data: ['ECI能力指数', '每百万Token价格($)'], textStyle: { color: colors.muted, fontSize: 11 }, top: 0 },
    grid: { left: '3%', right: '8%', bottom: '3%', top: '15%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['DeepSeek V4 Flash', 'GPT-5.6 Luna', 'GLM-5.2', 'Kimi K3', 'Claude Opus 5', 'GPT-5.6 Sol'],
      axisLine: { lineStyle: { color: colors.rule } },
      axisLabel: { color: colors.muted, fontSize: 10, interval: 0, rotate: 15 }
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
        name: '价格 ($/M)',
        nameTextStyle: { color: colors.muted, fontSize: 10 },
        axisLine: { show: false },
        axisLabel: { color: colors.muted, fontSize: 11, formatter: '${value}' },
        splitLine: { show: false }
      }
    ],
    series: [
      {
        name: 'ECI能力指数',
        type: 'bar',
        data: [
          { value: 153, itemStyle: { color: colors.accent2 } },
          { value: 156, itemStyle: { color: colors.accent } },
          { value: 153, itemStyle: { color: colors.accent3 } },
          { value: 160, itemStyle: { color: '#ba68c8' } },
          { value: 158, itemStyle: { color: colors.danger } },
          { value: 157, itemStyle: { color: '#80cbc4' } }
        ],
        barWidth: '35%'
      },
      {
        name: '每百万Token价格($)',
        type: 'line',
        yAxisIndex: 1,
        smooth: true,
        data: [0.14, 0.20, 1.40, 0.55, 9.00, 5.00],
        lineStyle: { color: colors.accent3, width: 2.5 },
        itemStyle: { color: colors.accent3 },
        symbol: 'circle',
        symbolSize: 7,
        label: { show: true, position: 'top', color: colors.accent3, fontSize: 10, formatter: '${c}' }
      }
    ]
  });

  // ---- 图表4：本周AI融资领域分布（更新为8.6数据）----
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
        { value: 150, name: '自动驾驶/Robotaxi', itemStyle: { color: colors.accent } },
        { value: 150, name: 'AI基础设施/数据中心', itemStyle: { color: colors.accent2 } },
        { value: 12, name: '具身AI/Embodied AI', itemStyle: { color: colors.accent3 } },
        { value: 2.5, name: '自动驾驶基建', itemStyle: { color: '#ba68c8' } },
        { value: 1.5, name: 'AI Agent/企业应用', itemStyle: { color: colors.danger } },
        { value: 0.3, name: '客服/垂直应用', itemStyle: { color: '#b388ff' } }
      ]
    }]
  });

  // ---- 图表5：OpenRouter周榜Top10模型Token用量（更新数据）----
  var c4b = echarts.init(document.getElementById('chart-ai-kol-models'), null, { renderer: 'svg' });
  c4b.setOption({
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: 'rgba(31,35,48,.95)',
      borderColor: colors.rule,
      textStyle: { color: colors.ink, fontSize: 12 },
      formatter: function(params) {
        var growth = {
          'Poolside Laguna S 2.1': '+583%',
          'GPT-5.6 Luna': '+848%',
          'MiniMax M3': '+11%',
          'Nemotron 3 Ultra': '+14%',
          'DeepSeek V4 Pro': '+21%',
          'GLM 5.2': '+4%',
          'DeepSeek V4 Flash 0731': 'NEW',
          'MiMo-V2.5 (Xiaomi)': '+47%',
          'Tencent Hy3': '+9%',
          'DeepSeek V4 Flash 0423': '+10%'
        };
        var g = growth[params[0].name] || '';
        return params[0].name + '<br/>Token: ' + params[0].value + ' 万亿' + (g ? ' (' + g + ')' : '');
      }
    },
    grid: { left: '3%', right: '12%', bottom: '3%', top: '5%', containLabel: true },
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
      data: ['Poolside Laguna S 2.1', 'MiniMax M3', 'Nemotron 3 Ultra', 'DeepSeek V4 Pro', 'GLM 5.2', 'GPT-5.6 Luna', 'DeepSeek V4 Flash 0731', 'MiMo-V2.5 (Xiaomi)', 'Tencent Hy3', 'DeepSeek V4 Flash 0423'],
      axisLine: { lineStyle: { color: colors.rule } },
      axisLabel: { color: colors.muted, fontSize: 10 }
    },
    series: [{
      type: 'bar',
      data: [
        { value: 1.66, itemStyle: { color: '#b388ff' } },
        { value: 1.81, itemStyle: { color: '#81d4fa' } },
        { value: 2.33, itemStyle: { color: colors.accent3 } },
        { value: 2.81, itemStyle: { color: '#4dd0e1' } },
        { value: 3.00, itemStyle: { color: '#80cbc4' } },
        { value: 3.54, itemStyle: { color: colors.danger } },
        { value: 4.71, itemStyle: { color: '#ba68c8' } },
        { value: 5.22, itemStyle: { color: colors.accent3 } },
        { value: 5.36, itemStyle: { color: colors.accent2 } },
        { value: 6.60, itemStyle: { color: colors.accent } }
      ],
      barWidth: '55%',
      label: { show: true, position: 'right', color: colors.ink, fontSize: 11, formatter: '{c}T' }
    }]
  });

  // ---- 图表6：LLM Stats数学推理能力排行榜Top10（新内容）----
  var c6 = echarts.init(document.getElementById('chart-ai-kol-leaderboard'), null, { renderer: 'svg' });
  c6.setOption({
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: 'rgba(31,35,48,.95)',
      borderColor: colors.rule,
      textStyle: { color: colors.ink, fontSize: 12 },
      formatter: function(params) {
        var prices = {
          'Claude Mythos Preview': '$15/M',
          'Qwen3.7 Max': '$1.75/M',
          'Gemini 3.1 Pro': '$5.00/M',
          'Claude Opus 5': '$9.00/M',
          'Claude Fable 5': '$18/M',
          'GPT-5.6 Sol': '$5.00/M',
          'Grok 4': '$3.00/M',
          'Kimi K3': '$0.55/M',
          'DeepSeek V4 Flash': '$0.14/M',
          'GLM-5.2': '$1.40/M'
        };
        var p = prices[params[0].name] || '';
        return params[0].name + '<br/>数学评分: ' + params[0].value + (p ? '<br/>价格: ' + p : '');
      }
    },
    grid: { left: '3%', right: '10%', bottom: '3%', top: '5%', containLabel: true },
    xAxis: {
      type: 'value',
      name: '数学推理评分',
      nameTextStyle: { color: colors.muted, fontSize: 10 },
      axisLine: { show: false },
      axisLabel: { color: colors.muted, fontSize: 11 },
      splitLine: { lineStyle: { color: colors.rule } },
      max: 50
    },
    yAxis: {
      type: 'category',
      data: ['GLM-5.2', 'DeepSeek V4 Flash', 'Kimi K3', 'Grok 4', 'Claude Fable 5', 'Claude Opus 5', 'Gemini 3.1 Pro', 'GPT-5.6 Sol', 'Qwen3.7 Max', 'Claude Mythos Preview'],
      axisLine: { lineStyle: { color: colors.rule } },
      axisLabel: { color: colors.muted, fontSize: 10 }
    },
    series: [{
      type: 'bar',
      data: [
        { value: 38.5, itemStyle: { color: '#b388ff' } },
        { value: 39.0, itemStyle: { color: '#81d4fa' } },
        { value: 40.2, itemStyle: { color: '#ba68c8' } },
        { value: 40.8, itemStyle: { color: colors.accent3 } },
        { value: 41.5, itemStyle: { color: '#4dd0e1' } },
        { value: 42.4, itemStyle: { color: colors.accent2 } },
        { value: 43.0, itemStyle: { color: '#80cbc4' } },
        { value: 43.5, itemStyle: { color: colors.danger } },
        { value: 44.0, itemStyle: { color: colors.accent } },
        { value: 47.1, itemStyle: { color: colors.accent2 } }
      ],
      barWidth: '55%',
      label: { show: true, position: 'right', color: colors.ink, fontSize: 11, formatter: '{c}' }
    }]
  });

  // ---- 图表7：EpochAI MirrorCode代码基准排行榜（新内容）----
  var c7 = echarts.init(document.getElementById('chart-ai-kol-compute'), null, { renderer: 'svg' });
  c7.setOption({
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: 'rgba(31,35,48,.95)',
      borderColor: colors.rule,
      textStyle: { color: colors.ink, fontSize: 12 },
      formatter: function(params) { return params[0].name + '<br/>解决率: ' + params[0].value + '%'; }
    },
    grid: { left: '3%', right: '8%', bottom: '3%', top: '5%', containLabel: true },
    xAxis: {
      type: 'value',
      name: '代码解决率 (%)',
      nameTextStyle: { color: colors.muted, fontSize: 10 },
      axisLine: { show: false },
      axisLabel: { color: colors.muted, fontSize: 11, formatter: '{value}%' },
      splitLine: { lineStyle: { color: colors.rule } },
      max: 70
    },
    yAxis: {
      type: 'category',
      data: ['GPT-5.6 Sol', 'Gemini 3 Pro', 'GLM-5.2', 'Grok 4', 'Claude Opus 4.7', 'Kimi K3', 'Claude Opus 5', 'Claude Fable 5'],
      axisLine: { lineStyle: { color: colors.rule } },
      axisLabel: { color: colors.muted, fontSize: 10 }
    },
    series: [{
      type: 'bar',
      data: [
        { value: 20, itemStyle: { color: colors.danger } },
        { value: 28, itemStyle: { color: '#b388ff' } },
        { value: 35, itemStyle: { color: '#81d4fa' } },
        { value: 38, itemStyle: { color: colors.accent3 } },
        { value: 42, itemStyle: { color: '#4dd0e1' } },
        { value: 48, itemStyle: { color: '#ba68c8' } },
        { value: 56, itemStyle: { color: colors.accent } },
        { value: 64, itemStyle: { color: colors.accent2 } }
      ],
      barWidth: '55%',
      label: { show: true, position: 'right', color: colors.ink, fontSize: 11, formatter: '{c}%' }
    }]
  });

  // ---- 图表7：比特币现货ETF近7日资金流向（修复：只保留ETF数据，不再被覆盖）----
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
        { value: 98, itemStyle: { color: '#5fd6a8' } },
        { value: 156, itemStyle: { color: '#5fd6a8' } },
        { value: 244, itemStyle: { color: '#5fd6a8' } },
        { value: 180, itemStyle: { color: '#5fd6a8' } }
      ],
      barWidth: '40%',
      label: { show: true, position: 'top', color: colors.muted, fontSize: 10, formatter: '{c}M' }
    }]
  });

  // 响应式
  function resizeAll() { c1.resize(); c2.resize(); c3.resize(); c4.resize(); c4b.resize(); c6.resize(); c7.resize(); c8.resize(); c5.resize(); }
  window.addEventListener('resize', resizeAll);
})();
