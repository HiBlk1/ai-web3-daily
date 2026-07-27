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
  var danger = style.getPropertyValue('--danger').trim();

  var palette = [accent, accent2, accent3, muted, accent + '99', accent2 + '99'];

  function axisStyle() {
    return {
      axisLine: { lineStyle: { color: rule } },
      axisTick: { show: false },
      axisLabel: { color: muted, fontSize: 11 },
      splitLine: { lineStyle: { color: rule, type: 'dashed' } }
    };
  }

  // ===== Chart 1: 本周重点 AI 融资/投资事件规模对比 =====
  var chart1 = echarts.init(document.getElementById('chart-funding'), null, { renderer: 'svg' });
  chart1.setOption({
    animation: false,
    color: palette,
    tooltip: {
      trigger: 'axis',
      appendToBody: true,
      backgroundColor: bg2,
      borderColor: rule,
      textStyle: { color: ink, fontSize: 12 },
      axisPointer: { type: 'shadow' },
      formatter: function(params) {
        var p = params[0];
        return p.name + '<br/>融资规模：' + p.value + ' 亿美元';
      }
    },
    grid: { left: '8%', right: '8%', top: '10%', bottom: '18%', containLabel: true },
    xAxis: Object.assign({
      type: 'category',
      data: ['Anthropic\nH轮', 'DeepSeek\n首轮融资', 'AMD→Anthropic\n股权投资', '特斯拉\nAI硬件收购', '爱诗科技\nC轮', '逐际动力\nPre-IPO'],
      axisLabel: { interval: 0, color: muted, fontSize: 10, lineHeight: 14 }
    }, axisStyle()),
    yAxis: Object.assign({ type: 'value', name: '亿美元', nameTextStyle: { color: muted, fontSize: 11 } }, axisStyle()),
    series: [{
      type: 'bar',
      data: [
        { value: 65, itemStyle: { color: accent } },
        { value: 74, itemStyle: { color: accent2 } },
        { value: 50, itemStyle: { color: accent3 } },
        { value: 19.5, itemStyle: { color: accent3 } },
        { value: 4.14, itemStyle: { color: muted } },
        { value: 2, itemStyle: { color: muted } }
      ],
      barWidth: '50%',
      label: {
        show: true,
        position: 'top',
        color: ink,
        fontSize: 11,
        fontWeight: 600,
        formatter: '${c}亿'
      },
      itemStyle: { borderRadius: [6, 6, 0, 0] }
    }]
  });
  window.addEventListener('resize', function() { chart1.resize(); });

  // ===== Chart 2: 7 月 26 日加密资产单日涨幅对比 =====
  var chart2 = echarts.init(document.getElementById('chart-altcoins'), null, { renderer: 'svg' });
  chart2.setOption({
    animation: false,
    color: palette,
    tooltip: {
      trigger: 'axis',
      appendToBody: true,
      backgroundColor: bg2,
      borderColor: rule,
      textStyle: { color: ink, fontSize: 12 },
      axisPointer: { type: 'shadow' },
      formatter: function(params) {
        var p = params[0];
        return p.name + '<br/>24h 涨幅：+' + p.value + '%';
      }
    },
    grid: { left: '8%', right: '10%', top: '10%', bottom: '12%', containLabel: true },
    xAxis: Object.assign({
      type: 'category',
      data: ['EUL', 'SHIB', 'PEPE', 'DOGE', 'ETH', 'BTC'],
      axisLabel: { color: muted, fontSize: 12 }
    }, axisStyle()),
    yAxis: Object.assign({ type: 'value', name: '涨幅 (%)', nameTextStyle: { color: muted, fontSize: 11 } }, axisStyle()),
    series: [{
      type: 'bar',
      data: [
        { value: 69.09, itemStyle: { color: accent2 } },
        { value: 36.93, itemStyle: { color: accent } },
        { value: 10.19, itemStyle: { color: accent3 } },
        { value: 5.82, itemStyle: { color: accent3 } },
        { value: 1.56, itemStyle: { color: muted } },
        { value: 0.71, itemStyle: { color: muted } }
      ],
      barWidth: '52%',
      label: {
        show: true,
        position: 'top',
        color: ink,
        fontSize: 11,
        fontWeight: 600,
        formatter: '+{c}%'
      },
      itemStyle: { borderRadius: [6, 6, 0, 0] }
    }]
  });
  window.addEventListener('resize', function() { chart2.resize(); });

  // ===== Chart 3: Robinhood Chain 链上费用分配 =====
  var chart3 = echarts.init(document.getElementById('chart-rhfees'), null, { renderer: 'svg' });
  chart3.setOption({
    animation: false,
    color: [accent, accent2, muted],
    tooltip: {
      trigger: 'item',
      appendToBody: true,
      backgroundColor: bg2,
      borderColor: rule,
      textStyle: { color: ink, fontSize: 12 },
      formatter: function(params) {
        return params.name + '<br/>费用占比：' + params.percent + '%';
      }
    },
    legend: {
      bottom: '2%',
      left: 'center',
      textStyle: { color: muted, fontSize: 11 },
      itemWidth: 12,
      itemHeight: 12
    },
    series: [{
      type: 'pie',
      radius: ['42%', '68%'],
      center: ['50%', '45%'],
      avoidLabelOverlap: true,
      itemStyle: {
        borderColor: bg2,
        borderWidth: 3
      },
      label: {
        show: true,
        color: ink,
        fontSize: 11,
        formatter: '{b}\n{d}%'
      },
      labelLine: {
        lineStyle: { color: rule }
      },
      data: [
        { value: 90.01, name: 'Robinhood Chain 自身', itemStyle: { color: muted } },
        { value: 9.8, name: 'Arbitrum L2', itemStyle: { color: accent2 } },
        { value: 0.19, name: '以太坊主网', itemStyle: { color: accent } }
      ]
    }]
  });
  window.addEventListener('resize', function() { chart3.resize(); });

  // ===== Chart 4: BTC 与 ETH 近期价格走势 =====
  var chart4 = echarts.init(document.getElementById('chart-prices'), null, { renderer: 'svg' });
  chart4.setOption({
    animation: false,
    color: [accent, accent2],
    tooltip: {
      trigger: 'axis',
      appendToBody: true,
      backgroundColor: bg2,
      borderColor: rule,
      textStyle: { color: ink, fontSize: 12 },
      formatter: function(params) {
        var html = params[0].axisValue + '<br/>';
        params.forEach(function(p) {
          html += p.marker + p.seriesName + '：$' + p.value.toLocaleString() + '<br/>';
        });
        return html;
      }
    },
    legend: {
      top: '2%',
      right: '5%',
      textStyle: { color: muted, fontSize: 11 },
      itemWidth: 14,
      itemHeight: 8
    },
    grid: { left: '8%', right: '8%', top: '14%', bottom: '12%', containLabel: true },
    xAxis: Object.assign({
      type: 'category',
      data: ['7月20日', '7月24日', '7月25日', '7月26日', '7月27日'],
      boundaryGap: false,
      axisLabel: { color: muted, fontSize: 11 }
    }, axisStyle()),
    yAxis: [
      Object.assign({
        type: 'value',
        name: 'BTC (USD)',
        nameTextStyle: { color: accent, fontSize: 11 },
        min: 63000,
        max: 67000,
        axisLabel: { color: muted, fontSize: 10, formatter: '${value}' }
      }, { splitLine: { lineStyle: { color: rule, type: 'dashed' } }, axisLine: { lineStyle: { color: rule } }, axisTick: { show: false } }),
      Object.assign({
        type: 'value',
        name: 'ETH (USD)',
        nameTextStyle: { color: accent2, fontSize: 11 },
        min: 1800,
        max: 1920,
        axisLabel: { color: muted, fontSize: 10, formatter: '${value}' }
      }, { splitLine: { show: false }, axisLine: { lineStyle: { color: rule } }, axisTick: { show: false } })
    ],
    series: [
      {
        name: 'BTC',
        type: 'line',
        yAxisIndex: 0,
        data: [64680, 65048, 65400, 64436, 64500],
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: { width: 3, color: accent },
        itemStyle: { color: accent },
        areaStyle: {
          color: {
            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: accent + '30' },
              { offset: 1, color: accent + '05' }
            ]
          }
        }
      },
      {
        name: 'ETH',
        type: 'line',
        yAxisIndex: 1,
        data: [1871, 1871, 1855, 1884, 1843],
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: { width: 3, color: accent2 },
        itemStyle: { color: accent2 },
        areaStyle: {
          color: {
            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: accent2 + '30' },
              { offset: 1, color: accent2 + '05' }
            ]
          }
        }
      }
    ]
  });
  window.addEventListener('resize', function() { chart4.resize(); });

})();
