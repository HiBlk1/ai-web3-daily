(function() {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();

  // --- Chart: AI Funding Comparison ---
  var chartFunding = echarts.init(document.getElementById('chart-funding'), null, { renderer: 'svg' });
  chartFunding.setOption({
    animation: false,
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      appendToBody: true,
      backgroundColor: bg2,
      borderColor: rule,
      textStyle: { color: ink }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '5%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      axisLabel: { color: muted, formatter: '${value}亿' },
      splitLine: { lineStyle: { color: rule, type: 'dashed' } },
      axisLine: { lineStyle: { color: rule } }
    },
    yAxis: {
      type: 'category',
      data: ['Meta/Scale AI', '腾讯/LiblibAI', '月之暗面', 'Anthropic', 'OpenAI'],
      axisLabel: { color: ink, fontWeight: 700 },
      axisLine: { lineStyle: { color: rule } },
      axisTick: { show: false }
    },
    series: [{
      type: 'bar',
      data: [
        { value: 143, itemStyle: { color: accent2 + 'cc' } },
        { value: 3, itemStyle: { color: muted + 'cc' } },
        { value: 20, itemStyle: { color: muted + 'cc' } },
        { value: 650, itemStyle: { color: accent + 'cc' } },
        { value: 1220, itemStyle: { color: accent } }
      ],
      barWidth: '55%',
      label: {
        show: true,
        position: 'right',
        formatter: '${c}亿',
        color: ink,
        fontWeight: 700
      },
      itemStyle: { borderRadius: [0, 6, 6, 0] }
    }]
  });
  window.addEventListener('resize', function() { chartFunding.resize(); });

  // --- Chart: Alibaba AI Investment Returns ---
  var chartAlibaba = echarts.init(document.getElementById('chart-alibaba'), null, { renderer: 'svg' });
  chartAlibaba.setOption({
    animation: false,
    tooltip: {
      trigger: 'axis',
      appendToBody: true,
      backgroundColor: bg2,
      borderColor: rule,
      textStyle: { color: ink }
    },
    legend: {
      data: ['投资额', '浮盈/收益'],
      textStyle: { color: muted },
      bottom: 0
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '12%',
      top: '8%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['长鑫科技', '月之暗面', 'MiniMax', '智谱AI', '其他标的'],
      axisLabel: { color: muted },
      axisLine: { lineStyle: { color: rule } },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: muted, formatter: '{value}亿' },
      splitLine: { lineStyle: { color: rule, type: 'dashed' } },
      axisLine: { lineStyle: { color: rule } }
    },
    series: [
      {
        name: '投资额',
        type: 'bar',
        data: [76, 20, 15, 2, 247],
        itemStyle: { color: accent2 + 'aa', borderRadius: [4, 4, 0, 0] },
        barGap: '20%'
      },
      {
        name: '浮盈/收益',
        type: 'bar',
        data: [1600, 400, 180, 140, 0],
        itemStyle: { color: accent + 'aa', borderRadius: [4, 4, 0, 0] }
      }
    ]
  });
  window.addEventListener('resize', function() { chartAlibaba.resize(); });
})();
