(function() {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var accent3 = style.getPropertyValue('--accent3').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();
  var bg3 = style.getPropertyValue('--bg3').trim();

  // --- Chart 1: AI Funding Trend ---
  var chart1 = echarts.init(document.getElementById('chart-funding'), null, { renderer: 'svg' });
  chart1.setOption({
    animation: false,
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      appendToBody: true,
      backgroundColor: bg3,
      borderColor: rule,
      textStyle: { color: ink },
      formatter: function(params) {
        var result = params[0].axisValue + '<br/>';
        params.forEach(function(item) {
          result += item.marker + item.seriesName + ': <strong>$' + item.value + 'B</strong><br/>';
        });
        return result;
      }
    },
    grid: { top: 40, right: 20, bottom: 30, left: 50 },
    xAxis: {
      type: 'category',
      data: ['2024 H2', '2025 H1', '2025 H2', '2026 H1'],
      axisLine: { lineStyle: { color: rule } },
      axisLabel: { color: muted, fontSize: 12 }
    },
    yAxis: {
      type: 'value',
      name: '金额 (十亿美元)',
      nameTextStyle: { color: muted, fontSize: 11 },
      axisLine: { show: false },
      splitLine: { lineStyle: { color: rule, type: 'dashed' } },
      axisLabel: { color: muted, fontSize: 12, formatter: '${value}B' }
    },
    series: [{
      name: '全球创投总额',
      type: 'bar',
      data: [180, 220, 250, 510],
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: accent },
          { offset: 1, color: accent2 }
        ]),
        borderRadius: [4, 4, 0, 0]
      },
      barWidth: '40%',
      label: {
        show: true,
        position: 'top',
        color: ink,
        fontSize: 12,
        fontWeight: 600,
        formatter: '${c}B'
      }
    }, {
      name: 'AI领域占比',
      type: 'line',
      yAxisIndex: 0,
      data: [72, 110, 140, 357],
      smooth: true,
      lineStyle: { color: accent3, width: 2 },
      itemStyle: { color: accent3 },
      symbol: 'circle',
      symbolSize: 6
    }],
    legend: {
      data: ['全球创投总额', 'AI领域金额'],
      textStyle: { color: muted, fontSize: 11 },
      top: 0,
      right: 0
    }
  });
  window.addEventListener('resize', function() { chart1.resize(); });

  // --- Chart 2: Web3 Q2 Funding by Sector ---
  var chart2 = echarts.init(document.getElementById('chart-web3'), null, { renderer: 'svg' });
  chart2.setOption({
    animation: false,
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      appendToBody: true,
      backgroundColor: bg3,
      borderColor: rule,
      textStyle: { color: ink },
      formatter: '{b}: <strong>${c}亿</strong> ({d}%)'
    },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 'center',
      textStyle: { color: muted, fontSize: 11 },
      itemWidth: 12,
      itemHeight: 12
    },
    series: [{
      name: '融资金额',
      type: 'pie',
      radius: ['45%', '70%'],
      center: ['35%', '50%'],
      avoidLabelOverlap: true,
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
        { value: 22.5, name: '交易所', itemStyle: { color: accent } },
        { value: 18.2, name: 'RWA代币化', itemStyle: { color: accent2 } },
        { value: 12.8, name: 'AI+Web3', itemStyle: { color: accent3 } },
        { value: 10.5, name: 'DeFi/LSD', itemStyle: { color: '#ffa940' } },
        { value: 7.8, name: '基础设施', itemStyle: { color: '#9254de' } },
        { value: 5.5, name: '其他', itemStyle: { color: muted } }
      ]
    }]
  });
  window.addEventListener('resize', function() { chart2.resize(); });

})();
