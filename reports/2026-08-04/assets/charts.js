(function() {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var accent3 = style.getPropertyValue('--accent3').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();
  var bg = style.getPropertyValue('--bg').trim();
  var danger = style.getPropertyValue('--danger').trim();

  // --- Chart: AI 融资分布 ---
  var chartFunding = echarts.init(document.getElementById('chart-funding'), null, { renderer: 'svg' });
  chartFunding.setOption({
    animation: false,
    tooltip: {
      trigger: 'axis',
      appendToBody: true,
      axisPointer: { type: 'shadow' },
      formatter: function(params) {
        var p = params[0];
        return p.name + '<br/>融资金额: <strong>$' + p.value + '亿</strong>';
      },
      backgroundColor: bg2,
      borderColor: rule,
      textStyle: { color: ink }
    },
    grid: { left: '3%', right: '8%', bottom: '3%', top: '5%', containLabel: true },
    xAxis: {
      type: 'value',
      name: '亿美元',
      nameTextStyle: { color: muted, fontSize: 12 },
      axisLabel: { color: muted, fontSize: 12 },
      axisLine: { lineStyle: { color: rule } },
      splitLine: { lineStyle: { color: rule } }
    },
    yAxis: {
      type: 'category',
      data: ['爱诗智能（约$4.1亿）', 'OLIX光子芯片（$3.12亿）', 'Horizon3（$2.5亿）', 'Valar Atomics（$10亿）'],
      axisLabel: { color: ink, fontSize: 12 },
      axisLine: { lineStyle: { color: rule } },
      axisTick: { show: false }
    },
    series: [{
      type: 'bar',
      data: [
        { value: 4.1, itemStyle: { color: accent3 } },
        { value: 3.12, itemStyle: { color: accent2 } },
        { value: 2.5, itemStyle: { color: accent } },
        { value: 10, itemStyle: { color: accent + 'dd' } }
      ],
      barWidth: '55%',
      label: {
        show: true,
        position: 'right',
        color: ink,
        fontSize: 12,
        fontWeight: 600,
        formatter: '${c}亿'
      }
    }]
  });
  window.addEventListener('resize', function() { chartFunding.resize(); });

  // --- Chart: 7月加密ETF资金净流入 ---
  var chartEtf = echarts.init(document.getElementById('chart-etf'), null, { renderer: 'svg' });
  chartEtf.setOption({
    animation: false,
    tooltip: {
      trigger: 'axis',
      appendToBody: true,
      axisPointer: { type: 'shadow' },
      formatter: function(params) {
        var p = params[0];
        return p.name + ' ETF<br/>净流入: <strong>$' + p.value + '亿</strong>';
      },
      backgroundColor: bg2,
      borderColor: rule,
      textStyle: { color: ink }
    },
    grid: { left: '3%', right: '8%', bottom: '3%', top: '5%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['BTC', 'ETH', 'XRP', 'SOL'],
      axisLabel: { color: ink, fontSize: 12 },
      axisLine: { lineStyle: { color: rule } },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      name: '亿美元',
      nameTextStyle: { color: muted, fontSize: 11 },
      axisLabel: { color: muted, fontSize: 11 },
      axisLine: { lineStyle: { color: rule } },
      splitLine: { lineStyle: { color: rule } }
    },
    series: [{
      type: 'bar',
      data: [
        { value: 1.7243, itemStyle: { color: accent2 } },
        { value: 3.65, itemStyle: { color: accent + 'dd' } },
        { value: 0.2729, itemStyle: { color: accent3 } },
        { value: 0.1462, itemStyle: { color: muted } }
      ],
      barWidth: '50%',
      label: {
        show: true,
        position: 'top',
        color: ink,
        fontSize: 11,
        fontWeight: 600,
        formatter: '${c}亿'
      }
    }]
  });
  window.addEventListener('resize', function() { chartEtf.resize(); });

  // --- Chart: BTC/ETH 价格快照（仪表盘） ---
  var chartPrice = echarts.init(document.getElementById('chart-price'), null, { renderer: 'svg' });
  chartPrice.setOption({
    animation: false,
    tooltip: {
      appendToBody: true,
      backgroundColor: bg2,
      borderColor: rule,
      textStyle: { color: ink }
    },
    series: [
      {
        type: 'gauge',
        center: ['30%', '55%'],
        radius: '70%',
        min: 50000,
        max: 80000,
        splitNumber: 6,
        axisLine: {
          lineStyle: {
            width: 10,
            color: [
              [0.3, danger + '88'],
              [0.7, accent2 + '88'],
              [1, accent3 + '88']
            ]
          }
        },
        pointer: {
          icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
          length: '60%',
          width: 8,
          offsetCenter: [0, '-10%'],
          itemStyle: { color: accent2 }
        },
        axisTick: { show: false },
        splitLine: {
          length: 6,
          lineStyle: { color: rule, width: 2 }
        },
        axisLabel: {
          color: muted,
          fontSize: 10,
          distance: -20,
          formatter: function(v) {
            if (v === 50000) return '50K';
            if (v === 80000) return '80K';
            return '';
          }
        },
        title: {
          offsetCenter: [0, '70%'],
          fontSize: 13,
          color: ink,
          fontWeight: 600
        },
        detail: {
          fontSize: 18,
          offsetCenter: [0, '40%'],
          valueAnimation: false,
          formatter: '${value}',
          color: accent2,
          fontWeight: 700
        },
        data: [{ value: 63700, name: 'BTC' }]
      },
      {
        type: 'gauge',
        center: ['75%', '55%'],
        radius: '70%',
        min: 1500,
        max: 3000,
        splitNumber: 5,
        axisLine: {
          lineStyle: {
            width: 10,
            color: [
              [0.3, danger + '88'],
              [0.7, accent2 + '88'],
              [1, accent3 + '88']
            ]
          }
        },
        pointer: {
          icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
          length: '60%',
          width: 8,
          offsetCenter: [0, '-10%'],
          itemStyle: { color: accent }
        },
        axisTick: { show: false },
        splitLine: {
          length: 6,
          lineStyle: { color: rule, width: 2 }
        },
        axisLabel: {
          color: muted,
          fontSize: 10,
          distance: -20,
          formatter: function(v) {
            if (v === 1500) return '1.5K';
            if (v === 3000) return '3K';
            return '';
          }
        },
        title: {
          offsetCenter: [0, '70%'],
          fontSize: 13,
          color: ink,
          fontWeight: 600
        },
        detail: {
          fontSize: 18,
          offsetCenter: [0, '40%'],
          valueAnimation: false,
          formatter: '${value}',
          color: accent,
          fontWeight: 700
        },
        data: [{ value: 1858, name: 'ETH' }]
      }
    ]
  });
  window.addEventListener('resize', function() { chartPrice.resize(); });

})();
