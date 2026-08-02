// assets/charts.js
(function() {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var accent3 = style.getPropertyValue('--accent3').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();

  // --- Chart 1: BTC / ETH 价格对比 ---
  var chartPrice = echarts.init(document.getElementById('chart-price'), null, { renderer: 'svg' });
  chartPrice.setOption({
    animation: false,
    tooltip: {
      trigger: 'axis',
      appendToBody: true,
      backgroundColor: bg2,
      borderColor: rule,
      textStyle: { color: ink }
    },
    legend: {
      data: ['BTC 价格', 'ETH 价格'],
      textStyle: { color: muted, fontSize: 12 },
      top: 0,
      right: 0
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['7/27', '7/28', '7/29', '7/30', '7/31', '8/1', '8/2'],
      axisLine: { lineStyle: { color: rule } },
      axisLabel: { color: muted, fontSize: 11 }
    },
    yAxis: [
      {
        type: 'value',
        name: 'BTC ($)',
        nameTextStyle: { color: muted, fontSize: 10 },
        axisLine: { show: false },
        splitLine: { lineStyle: { color: rule, type: 'dashed' } },
        axisLabel: { color: muted, fontSize: 11, formatter: function(v) { return (v/1000) + 'K'; } }
      },
      {
        type: 'value',
        name: 'ETH ($)',
        nameTextStyle: { color: muted, fontSize: 10 },
        axisLine: { show: false },
        splitLine: { show: false },
        axisLabel: { color: muted, fontSize: 11 }
      }
    ],
    series: [
      {
        name: 'BTC 价格',
        type: 'line',
        smooth: true,
        data: [64200, 63800, 63100, 62900, 63250, 63050, 62768],
        lineStyle: { color: accent, width: 2 },
        itemStyle: { color: accent },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: accent + '33' },
              { offset: 1, color: accent + '05' }
            ]
          }
        }
      },
      {
        name: 'ETH 价格',
        type: 'line',
        smooth: true,
        yAxisIndex: 1,
        data: [1920, 1905, 1880, 1870, 1885, 1872, 1855],
        lineStyle: { color: accent2, width: 2 },
        itemStyle: { color: accent2 },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: accent2 + '33' },
              { offset: 1, color: accent2 + '05' }
            ]
          }
        }
      }
    ]
  });
  window.addEventListener('resize', function() { chartPrice.resize(); });

  // --- Chart 2: 今日新闻分类分布 ---
  var chartCategory = echarts.init(document.getElementById('chart-category'), null, { renderer: 'svg' });
  chartCategory.setOption({
    animation: false,
    tooltip: {
      trigger: 'item',
      appendToBody: true,
      backgroundColor: bg2,
      borderColor: rule,
      textStyle: { color: ink }
    },
    legend: {
      orient: 'vertical',
      right: '5%',
      top: 'center',
      textStyle: { color: muted, fontSize: 12 },
      itemGap: 12
    },
    series: [
      {
        name: '新闻分类',
        type: 'pie',
        radius: ['45%', '70%'],
        center: ['35%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 6,
          borderColor: bg2,
          borderWidth: 2
        },
        label: { show: false },
        emphasis: {
          label: {
            show: true,
            fontSize: 13,
            fontWeight: 'bold',
            color: ink
          }
        },
        labelLine: { show: false },
        data: [
          { value: 4, name: 'AI 技术突破', itemStyle: { color: accent } },
          { value: 3, name: 'AI 公司与融资', itemStyle: { color: accent3 } },
          { value: 3, name: 'AI 监管与治理', itemStyle: { color: '#ec4899' } },
          { value: 3, name: 'Web3 行业动态', itemStyle: { color: accent2 } }
        ]
      }
    ]
  });
  window.addEventListener('resize', function() { chartCategory.resize(); });
})();
