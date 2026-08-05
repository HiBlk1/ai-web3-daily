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

  // ---- Chart 1: This Week's Largest AI Funding Deals ----
  var c1 = echarts.init(document.getElementById('chart-ai-funding'), null, { renderer: 'svg' });
  c1.setOption({
    backgroundColor: 'transparent',
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, backgroundColor: 'rgba(31,35,48,.95)', borderColor: colors.rule, textStyle: { color: colors.ink, fontSize: 12 } },
    grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['xAI', 'Meta-Scale AI', 'Horizon3', 'Encore AI', 'Ode (Anthropic)'],
      axisLine: { lineStyle: { color: colors.rule } },
      axisLabel: { color: colors.muted, fontSize: 11, interval: 0 }
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
        { value: 10.0, itemStyle: { color: colors.accent } },
        { value: 14.3, itemStyle: { color: colors.accent2 } },
        { value: 0.25, itemStyle: { color: colors.accent3 } },
        { value: 0.03, itemStyle: { color: '#b388ff' } },
        { value: 0.02, itemStyle: { color: '#81d4fa' } }
      ],
      barWidth: '45%',
      label: { show: true, position: 'top', color: colors.ink, fontSize: 11, formatter: '${c}B' }
    }]
  });

  // ---- Chart 2: Major Crypto Assets 24h Price Change ----
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

  // ---- Chart 3: AI Capital Expenditure Trend ----
  var c3 = echarts.init(document.getElementById('chart-ai-capex'), null, { renderer: 'svg' });
  c3.setOption({
    backgroundColor: 'transparent',
    tooltip: { trigger: 'axis', backgroundColor: 'rgba(31,35,48,.95)', borderColor: colors.rule, textStyle: { color: colors.ink, fontSize: 12 } },
    legend: { data: ['Top 4 Cloud Total', 'Google'], textStyle: { color: colors.muted, fontSize: 11 }, top: 0 },
    grid: { left: '3%', right: '4%', bottom: '3%', top: '18%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['2024', '2025', '2026E', '2027E'],
      axisLine: { lineStyle: { color: colors.rule } },
      axisLabel: { color: colors.muted, fontSize: 11 }
    },
    yAxis: {
      type: 'value',
      name: 'USD Billion',
      nameTextStyle: { color: colors.muted, fontSize: 10 },
      axisLine: { show: false },
      axisLabel: { color: colors.muted, fontSize: 11 },
      splitLine: { lineStyle: { color: colors.rule } }
    },
    series: [
      {
        name: 'Top 4 Cloud Total',
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

  // ---- Chart 4: This Week's AI Funding by Sector ----
  var c4 = echarts.init(document.getElementById('chart-h1-crypto'), null, { renderer: 'svg' });
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
        { value: 14.3, name: 'Data Labeling / AI Infra', itemStyle: { color: colors.accent2 } },
        { value: 10.0, name: 'Foundation Models', itemStyle: { color: colors.accent } },
        { value: 0.25, name: 'AI Security / Cybersecurity', itemStyle: { color: colors.danger } },
        { value: 0.05, name: 'AI Agents / Enterprise', itemStyle: { color: colors.accent3 } },
        { value: 0.03, name: 'Customer Service / Vertical', itemStyle: { color: '#b388ff' } }
      ]
    }]
  });

  // Responsive
  function resizeAll() { c1.resize(); c2.resize(); c3.resize(); c4.resize(); }
  window.addEventListener('resize', resizeAll);
})();
