(function() {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var accent3 = style.getPropertyValue('--accent3').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();
  var danger = style.getPropertyValue('--danger').trim();

  // --- Chart 1: AI 融资规模对比 ---
  var chart1 = echarts.init(document.getElementById('chart-ai-funding'), null, { renderer: 'svg' });
  chart1.setOption({
    animation: false,
    tooltip: { trigger: 'axis', appendToBody: true, axisPointer: { type: 'shadow' } },
    grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['月之暗面 Moonshot', 'Meta-BlackRock 合资', 'Anthropic H轮', 'OpenAI Deployment Co', 'Jump Capital 基金'],
      axisLine: { lineStyle: { color: rule } },
      axisLabel: { color: muted, fontSize: 11, interval: 0, rotate: 15 }
    },
    yAxis: {
      type: 'value',
      name: '十亿美元',
      nameTextStyle: { color: muted, fontSize: 11 },
      axisLine: { lineStyle: { color: rule } },
      splitLine: { lineStyle: { color: rule } },
      axisLabel: { color: muted, fontSize: 11 }
    },
    series: [{
      type: 'bar',
      data: [3.5, 14, 6.5, 4, 0.35],
      itemStyle: {
        color: function(params) {
          var colors = [accent, accent2, accent3, accent + 'cc', muted];
          return colors[params.dataIndex];
        },
        borderRadius: [4, 4, 0, 0]
      },
      barWidth: '50%',
      label: {
        show: true,
        position: 'top',
        color: ink,
        fontSize: 11,
        formatter: '{c}B'
      }
    }]
  });
  window.addEventListener('resize', function() { chart1.resize(); });

  // --- Chart 2: 加密资产 24h 涨跌幅 ---
  var chart2 = echarts.init(document.getElementById('chart-crypto-moves'), null, { renderer: 'svg' });
  chart2.setOption({
    animation: false,
    tooltip: { trigger: 'axis', appendToBody: true, axisPointer: { type: 'shadow' } },
    grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['BTC', 'ETH', 'SOL', '全球市值'],
      axisLine: { lineStyle: { color: rule } },
      axisLabel: { color: muted, fontSize: 12 }
    },
    yAxis: {
      type: 'value',
      name: '24h 涨跌幅 (%)',
      nameTextStyle: { color: muted, fontSize: 11 },
      axisLine: { lineStyle: { color: rule } },
      splitLine: { lineStyle: { color: rule } },
      axisLabel: { color: muted, fontSize: 11, formatter: '{value}%' }
    },
    series: [{
      type: 'bar',
      data: [
        { value: 1.37, itemStyle: { color: accent2 } },
        { value: 1.74, itemStyle: { color: accent2 } },
        { value: -3.6, itemStyle: { color: danger } },
        { value: 1.2, itemStyle: { color: accent2 } }
      ],
      barWidth: '40%',
      label: {
        show: true,
        position: 'top',
        color: ink,
        fontSize: 11,
        formatter: '{c}%'
      }
    }]
  });
  window.addEventListener('resize', function() { chart2.resize(); });

  // --- Chart 3: ETF 资金流向 ---
  var chart3 = echarts.init(document.getElementById('chart-etf-flow'), null, { renderer: 'svg' });
  chart3.setOption({
    animation: false,
    tooltip: { trigger: 'axis', appendToBody: true, axisPointer: { type: 'shadow' } },
    legend: {
      data: ['BTC 现货 ETF', 'ETH 现货 ETF'],
      textStyle: { color: muted, fontSize: 11 },
      top: 0
    },
    grid: { left: '3%', right: '4%', bottom: '3%', top: '18%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['7日累计', '30日累计', '7月28日单日'],
      axisLine: { lineStyle: { color: rule } },
      axisLabel: { color: muted, fontSize: 12 }
    },
    yAxis: {
      type: 'value',
      name: '百万美元',
      nameTextStyle: { color: muted, fontSize: 11 },
      axisLine: { lineStyle: { color: rule } },
      splitLine: { lineStyle: { color: rule } },
      axisLabel: { color: muted, fontSize: 11 }
    },
    series: [
      {
        name: 'BTC 现货 ETF',
        type: 'bar',
        data: [-850, -2300, -49.7],
        itemStyle: { color: danger, borderRadius: [3, 3, 0, 0] },
        barWidth: '30%'
      },
      {
        name: 'ETH 现货 ETF',
        type: 'bar',
        data: [124.9, 380, 9.4],
        itemStyle: { color: accent2, borderRadius: [3, 3, 0, 0] },
        barWidth: '30%'
      }
    ]
  });
  window.addEventListener('resize', function() { chart3.resize(); });

  // --- Chart 4: 新闻分类分布 ---
  var chart4 = echarts.init(document.getElementById('chart-news-cat'), null, { renderer: 'svg' });
  chart4.setOption({
    animation: false,
    tooltip: { trigger: 'item', appendToBody: true, formatter: '{b}: {c} 条 ({d}%)' },
    legend: {
      orient: 'vertical',
      right: '5%',
      top: 'center',
      textStyle: { color: muted, fontSize: 12 }
    },
    series: [{
      type: 'pie',
      radius: ['45%', '70%'],
      center: ['35%', '50%'],
      avoidLabelOverlap: false,
      itemStyle: { borderRadius: 4, borderColor: bg2, borderWidth: 2 },
      label: { show: false },
      emphasis: { label: { show: true, fontSize: 14, fontWeight: 'bold', color: ink } },
      data: [
        { value: 5, name: 'AI 监管政策', itemStyle: { color: danger } },
        { value: 4, name: 'AI 融资并购', itemStyle: { color: accent3 } },
        { value: 2, name: 'AI 技术产品', itemStyle: { color: accent } },
        { value: 3, name: 'Web3 监管', itemStyle: { color: danger } },
        { value: 3, name: 'Web3 市场', itemStyle: { color: accent2 } }
      ]
    }]
  });
  window.addEventListener('resize', function() { chart4.resize(); });
})();
