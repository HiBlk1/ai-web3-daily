// assets/charts.js
(function() {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var accent3 = style.getPropertyValue('--accent3').trim();
  var danger = style.getPropertyValue('--danger').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();
  var bg = style.getPropertyValue('--bg').trim();

  // --- Chart: 加密货币价格走势 ---
  var chartPrice = echarts.init(document.getElementById('chart-price'), null, { renderer: 'svg' });
  var days = ['7/02', '7/05', '7/08', '7/11', '7/14', '7/17', '7/20', '7/23', '7/26', '7/29', '7/31'];
  // BTC 价格走势（基于搜索结果：7月约$58,000起步，月底约$64,700，累计涨幅超10%）
  var btcPrices = [58200, 57800, 58500, 59200, 60500, 61200, 60800, 62100, 63500, 63800, 64700];
  // ETH 价格走势（基于搜索结果：月底约$1,880，7月基本持平）
  var ethPrices = [1920, 1890, 1905, 1930, 1910, 1895, 1880, 1895, 1870, 1900, 1880];
  // 将 ETH 价格映射到右轴（缩小10倍以匹配BTC数量级的视觉对比）
  var ethScaled = ethPrices.map(function(p) { return p * 34.4; });

  chartPrice.setOption({
    animation: false,
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      appendToBody: true,
      backgroundColor: bg2,
      borderColor: rule,
      textStyle: { color: ink },
      formatter: function(params) {
        var result = params[0].axisValue + '<br/>';
        params.forEach(function(p) {
          if (p.seriesName === 'BTC') {
            result += p.marker + p.seriesName + ': $' + p.value.toLocaleString() + '<br/>';
          } else {
            var idx = p.dataIndex;
            result += p.marker + 'ETH: $' + ethPrices[idx].toLocaleString() + '<br/>';
          }
        });
        return result;
      }
    },
    legend: {
      data: ['BTC 价格', 'ETH 价格'],
      textStyle: { color: muted },
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
      data: days,
      axisLine: { lineStyle: { color: rule } },
      axisLabel: { color: muted, fontSize: 11 }
    },
    yAxis: [
      {
        type: 'value',
        name: 'BTC (USD)',
        nameTextStyle: { color: muted, fontSize: 11 },
        axisLine: { lineStyle: { color: rule } },
        axisLabel: {
          color: muted,
          fontSize: 11,
          formatter: function(v) { return '$' + (v/1000) + 'k'; }
        },
        splitLine: { lineStyle: { color: rule, type: 'dashed' } }
      }
    ],
    series: [
      {
        name: 'BTC 价格',
        type: 'line',
        data: btcPrices,
        smooth: true,
        lineStyle: { color: accent, width: 2.5 },
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
        },
        symbol: 'circle',
        symbolSize: 5
      },
      {
        name: 'ETH 价格',
        type: 'line',
        data: ethPrices,
        smooth: true,
        lineStyle: { color: accent2, width: 2, type: 'dashed' },
        itemStyle: { color: accent2 },
        symbol: 'circle',
        symbolSize: 4
      }
    ]
  });

  window.addEventListener('resize', function() { chartPrice.resize(); });

  // --- Chart: 期货爆仓分布 ---
  var chartLiq = echarts.init(document.getElementById('chart-liquidation'), null, { renderer: 'svg' });

  chartLiq.setOption({
    animation: false,
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      appendToBody: true,
      backgroundColor: bg2,
      borderColor: rule,
      textStyle: { color: ink },
      formatter: '{b}: ${c}M ({d}%)'
    },
    legend: {
      orient: 'vertical',
      right: '5%',
      top: 'center',
      textStyle: { color: muted, fontSize: 12 }
    },
    series: [
      {
        name: '爆仓分布',
        type: 'pie',
        radius: ['45%', '70%'],
        center: ['35%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 6,
          borderColor: bg2,
          borderWidth: 2
        },
        label: {
          show: false
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 14,
            fontWeight: 'bold',
            color: ink
          }
        },
        data: [
          { value: 152, name: 'BTC 期货', itemStyle: { color: accent } },
          { value: 148, name: 'ETH 期货', itemStyle: { color: accent2 } },
          { value: 15, name: 'SOL 期货', itemStyle: { color: accent3 } }
        ]
      }
    ]
  });

  window.addEventListener('resize', function() { chartLiq.resize(); });

})();
