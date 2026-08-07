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

  // ---- Chart 1: This Week's Major AI Funding Deals ----
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
      name: 'USD Billion',
      nameTextStyle: { color: colors.muted, fontSize: 10 },
      axisLine: { show: false },
      axisLabel: { color: colors.muted, fontSize: 11 },
      splitLine: { lineStyle: { color: colors.rule } }
    },
    series: [{
      type: 'bar',
      data: [
        { value: 0.035, itemStyle: { color: '#b388ff' }, name: 'Sapiom' },
        { value: 0.067, itemStyle: { color: '#80cbc4' }, name: 'Omilia' },
        { value: 1.37, itemStyle: { color: colors.accent3 }, name: 'Hadrian' },
        { value: 40, itemStyle: { color: colors.accent }, name: 'Oracle' }
      ],
      barWidth: '45%',
      label: { show: true, position: 'top', color: colors.ink, fontSize: 11, formatter: '${c}B' }
    }]
  });

  // ---- Chart 2: AI Model Terminal-Bench 2.1 / ARC-AGI-3 Score Comparison ----
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
        return params[0].name + '<br/>Benchmark: ' + b + '<br/>Score: ' + params[0].value + '%';
      }
    },
    grid: { left: '3%', right: '8%', bottom: '3%', top: '5%', containLabel: true },
    xAxis: {
      type: 'value',
      name: 'Score (%)',
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

  // ---- Chart 3: This Week's AI Funding by Sector ----
  var c4 = echarts.init(document.getElementById('chart-ai-sector'), null, { renderer: 'svg' });
  c4.setOption({
    backgroundColor: 'transparent',
    tooltip: { trigger: 'item', backgroundColor: 'rgba(31,35,48,.95)', borderColor: colors.rule, textStyle: { color: colors.ink, fontSize: 12 }, formatter: '{b}: ${c}B ({d}%)' },
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
        { value: 40, name: 'AI Infrastructure / Compute', itemStyle: { color: colors.accent } },
        { value: 1.37, name: 'Defense Tech', itemStyle: { color: colors.accent2 } },
        { value: 0.067, name: 'Voice AI', itemStyle: { color: colors.accent3 } },
        { value: 0.035, name: 'Model Routing', itemStyle: { color: '#ba68c8' } }
      ]
    }]
  });

  // ---- Chart 4: OpenRouter Weekly Model Usage Top 8 ----
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
        return params[0].name + '<br/>Usage Share: ' + params[0].value + '%';
      }
    },
    grid: { left: '3%', right: '10%', bottom: '3%', top: '5%', containLabel: true },
    xAxis: {
      type: 'value',
      name: 'Usage Share (%)',
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

  // ---- Chart 5: Global AI Compute Investment Comparison ----
  var c7 = echarts.init(document.getElementById('chart-ai-kol-compute'), null, { renderer: 'svg' });
  c7.setOption({
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: 'rgba(31,35,48,.95)',
      borderColor: colors.rule,
      textStyle: { color: colors.ink, fontSize: 12 },
      formatter: function(params) { return params[0].name + '<br/>Investment: $' + params[0].value + 'B'; }
    },
    grid: { left: '3%', right: '8%', bottom: '3%', top: '5%', containLabel: true },
    xAxis: {
      type: 'value',
      name: 'USD Billion',
      nameTextStyle: { color: colors.muted, fontSize: 10 },
      axisLine: { show: false },
      axisLabel: { color: colors.muted, fontSize: 11 },
      splitLine: { lineStyle: { color: colors.rule } }
    },
    yAxis: {
      type: 'category',
      data: ['Wayve', 'Waymo', 'Anthropic DC', 'EU Gigafactories', 'Oracle-OpenAI'],
      axisLine: { lineStyle: { color: colors.rule } },
      axisLabel: { color: colors.muted, fontSize: 11 }
    },
    series: [{
      type: 'bar',
      data: [
        { value: 1.2, itemStyle: { color: '#b388ff' } },
        { value: 15, itemStyle: { color: '#81d4fa' } },
        { value: 15, itemStyle: { color: colors.accent3 } },
        { value: 33, itemStyle: { color: colors.accent2 } },
        { value: 40, itemStyle: { color: colors.accent } }
      ],
      barWidth: '50%',
      label: { show: true, position: 'right', color: colors.ink, fontSize: 11, formatter: '${c}B' }
    }]
  });

  // ---- Chart 6: Global AI Chip HBM Supply Gap Forecast (2026-2027) ----
  var c8 = echarts.init(document.getElementById('chart-ai-kol-marketmind'), null, { renderer: 'svg' });
  c8.setOption({
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(31,35,48,.95)',
      borderColor: colors.rule,
      textStyle: { color: colors.ink, fontSize: 12 },
      formatter: function(params) { return params[0].name + '<br/>HBM Demand Gap: ' + params[0].value + '%'; }
    },
    legend: { data: ['HBM Demand Gap (%)'], textStyle: { color: colors.muted, fontSize: 11 }, top: 0 },
    grid: { left: '3%', right: '5%', bottom: '3%', top: '12%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['2026 Q1', '2026 Q2', '2026 Q3', '2026 Q4', '2027 Q1', '2027 Q2'],
      axisLine: { lineStyle: { color: colors.rule } },
      axisLabel: { color: colors.muted, fontSize: 10 }
    },
    yAxis: {
      type: 'value',
      name: 'Gap (%)',
      nameTextStyle: { color: colors.muted, fontSize: 10 },
      axisLine: { show: false },
      axisLabel: { color: colors.muted, fontSize: 11, formatter: '{value}%' },
      splitLine: { lineStyle: { color: colors.rule } }
    },
    series: [{
      name: 'HBM Demand Gap (%)',
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

  // ---- Chart 7: Bitcoin & Ethereum Spot ETF 4-Day Flow Comparison ----
  var c2 = echarts.init(document.getElementById('chart-crypto-moves'), null, { renderer: 'svg' });
  c2.setOption({
    backgroundColor: 'transparent',
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, backgroundColor: 'rgba(31,35,48,.95)', borderColor: colors.rule, textStyle: { color: colors.ink, fontSize: 12 } },
    legend: { data: ['BTC ETF Inflow', 'ETH ETF Inflow'], textStyle: { color: colors.muted, fontSize: 11 }, top: 0 },
    grid: { left: '3%', right: '5%', bottom: '3%', top: '12%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['8/3', '8/4', '8/5', '8/6'],
      axisLine: { lineStyle: { color: colors.rule } },
      axisLabel: { color: colors.muted, fontSize: 11 }
    },
    yAxis: {
      type: 'value',
      name: 'USD Million',
      nameTextStyle: { color: colors.muted, fontSize: 10 },
      axisLine: { show: false },
      axisLabel: { color: colors.muted, fontSize: 11 },
      splitLine: { lineStyle: { color: colors.rule } }
    },
    series: [
      {
        name: 'BTC ETF Inflow',
        type: 'bar',
        data: [140, 212, 244, 138],
        barWidth: '30%',
        itemStyle: { color: colors.accent },
        label: { show: true, position: 'top', color: colors.muted, fontSize: 9, formatter: '{c}M' }
      },
      {
        name: 'ETH ETF Inflow',
        type: 'bar',
        data: [40, 43, 61, 92],
        barWidth: '30%',
        itemStyle: { color: colors.accent2 },
        label: { show: true, position: 'top', color: colors.muted, fontSize: 9, formatter: '{c}M' }
      }
    ]
  });

  // ---- Chart 8: Bitcoin Spot ETF 7-Day Flow ----
  var c5 = echarts.init(document.getElementById('chart-kol-cards'), null, { renderer: 'svg' });
  c5.setOption({
    backgroundColor: 'transparent',
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, backgroundColor: 'rgba(31,35,48,.95)', borderColor: colors.rule, textStyle: { color: colors.ink, fontSize: 12 } },
    legend: { data: ['Net Inflow ($M)'], textStyle: { color: colors.muted, fontSize: 11 }, top: 0 },
    grid: { left: '3%', right: '5%', bottom: '3%', top: '12%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['7/31', '8/1', '8/2', '8/3', '8/4', '8/5', '8/6'],
      axisLine: { lineStyle: { color: colors.rule } },
      axisLabel: { color: colors.muted, fontSize: 10 }
    },
    yAxis: {
      type: 'value',
      name: 'Million USD',
      nameTextStyle: { color: colors.muted, fontSize: 10 },
      axisLine: { show: false },
      axisLabel: { color: colors.muted, fontSize: 11 },
      splitLine: { lineStyle: { color: colors.rule } }
    },
    series: [{
      name: 'Net Inflow ($M)',
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

  // Responsive
  function resizeAll() { c1.resize(); c3.resize(); c4.resize(); c4b.resize(); c7.resize(); c8.resize(); c2.resize(); c5.resize(); }
  window.addEventListener('resize', resizeAll);
})();
