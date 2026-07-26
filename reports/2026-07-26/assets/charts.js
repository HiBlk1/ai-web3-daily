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

  // Common axis/text config
  function axisStyle(color) {
    return {
      axisLine: { lineStyle: { color: rule } },
      axisTick: { show: false },
      axisLabel: { color: muted, fontSize: 11 },
      splitLine: { lineStyle: { color: rule, type: 'dashed' } }
    };
  }

  // ===== Chart 1: 国产万亿参数大模型参数规模对比 =====
  var chart1 = echarts.init(document.getElementById('chart-models'), null, { renderer: 'svg' });
  chart1.setOption({
    animation: false,
    color: palette,
    tooltip: {
      trigger: 'axis',
      appendToBody: true,
      backgroundColor: bg2,
      borderColor: rule,
      textStyle: { color: ink, fontSize: 12 },
      formatter: function(params) {
        var p = params[0];
        return p.name + '<br/>参数规模：' + p.value + ' 万亿';
      }
    },
    grid: { left: '8%', right: '8%', top: '12%', bottom: '12%', containLabel: true },
    xAxis: Object.assign({ type: 'category', data: ['Kimi K3', 'Qwen3.8 Max', 'DeepSeek V4*'] }, axisStyle()),
    yAxis: Object.assign({ type: 'value', name: '参数（万亿）', nameTextStyle: { color: muted, fontSize: 11 } }, axisStyle()),
    series: [{
      type: 'bar',
      data: [
        { value: 2.8, itemStyle: { color: accent } },
        { value: 2.4, itemStyle: { color: accent2 } },
        { value: 1.8, itemStyle: { color: accent3 } }
      ],
      barWidth: '42%',
      label: {
        show: true,
        position: 'top',
        color: ink,
        fontSize: 13,
        fontWeight: 600,
        formatter: '{c} 万亿'
      },
      itemStyle: { borderRadius: [6, 6, 0, 0] }
    }]
  });
  window.addEventListener('resize', function() { chart1.resize(); });

  // ===== Chart 2: 本周重点 AI 融资事件规模对比 =====
  var chart2 = echarts.init(document.getElementById('chart-funding'), null, { renderer: 'svg' });
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
        return p.name + '<br/>融资规模：' + p.value + ' 亿元';
      }
    },
    grid: { left: '8%', right: '12%', top: '8%', bottom: '20%', containLabel: true },
    xAxis: Object.assign({ type: 'category', data: ['DeepSeek', '可灵AI', '爱诗科技', '智象未来', '逐际动力', '银河通用'], axisLabel: { interval: 0, rotate: 15, color: muted, fontSize: 11 } }, axisStyle()),
    yAxis: Object.assign({ type: 'value', name: '亿元', nameTextStyle: { color: muted, fontSize: 11 } }, axisStyle()),
    series: [{
      type: 'bar',
      data: [
        { value: 500, itemStyle: { color: accent } },
        { value: 190, itemStyle: { color: accent2 } },
        { value: 29.8, itemStyle: { color: accent3 } },
        { value: 15, itemStyle: { color: accent3 } },
        { value: 14.4, itemStyle: { color: muted } },
        { value: 10, itemStyle: { color: muted } }
      ],
      barWidth: '50%',
      label: {
        show: true,
        position: 'top',
        color: ink,
        fontSize: 11,
        fontWeight: 600
      },
      itemStyle: { borderRadius: [6, 6, 0, 0] }
    }]
  });
  window.addEventListener('resize', function() { chart2.resize(); });

  // ===== Chart 3: 加密市场 VC 融资月度走势 =====
  var chart3 = echarts.init(document.getElementById('chart-crypto-funding'), null, { renderer: 'svg' });
  chart3.setOption({
    animation: false,
    color: palette,
    tooltip: {
      trigger: 'axis',
      appendToBody: true,
      backgroundColor: bg2,
      borderColor: rule,
      textStyle: { color: ink, fontSize: 12 },
      formatter: function(params) {
        var p = params[0];
        return p.name + '<br/>VC 融资：' + p.value + ' 亿美元';
      }
    },
    grid: { left: '8%', right: '8%', top: '12%', bottom: '12%', containLabel: true },
    xAxis: Object.assign({ type: 'category', data: ['3月', '4月', '5月', '6月', '7月*'], boundaryGap: false }, axisStyle()),
    yAxis: Object.assign({ type: 'value', name: '亿美元', nameTextStyle: { color: muted, fontSize: 11 } }, axisStyle()),
    series: [{
      type: 'line',
      data: [28.5, 31.2, 38.9, 22.1, 12.2],
      smooth: true,
      symbol: 'circle',
      symbolSize: 8,
      lineStyle: { width: 3, color: accent2 },
      itemStyle: { color: accent2 },
      areaStyle: {
        color: {
          type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: accent2 + '40' },
            { offset: 1, color: accent2 + '05' }
          ]
        }
      },
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
  window.addEventListener('resize', function() { chart3.resize(); });

  // ===== Chart 4: BTC 现货 ETF 资金流向（正负值柱状） =====
  var chart4 = echarts.init(document.getElementById('chart-etf'), null, { renderer: 'svg' });
  chart4.setOption({
    animation: false,
    color: palette,
    tooltip: {
      trigger: 'axis',
      appendToBody: true,
      backgroundColor: bg2,
      borderColor: rule,
      textStyle: { color: ink, fontSize: 12 },
      formatter: function(params) {
        var p = params[0];
        var sign = p.value >= 0 ? '+' : '';
        return p.name + '<br/>净流向：' + sign + p.value + ' 亿美元';
      }
    },
    grid: { left: '8%', right: '8%', top: '12%', bottom: '12%', containLabel: true },
    xAxis: Object.assign({ type: 'category', data: ['7月1日', '7月5日', '7月10日', '7月15日', '7月18日', '7月22日', '7月24日'], axisLabel: { color: muted, fontSize: 10 } }, axisStyle()),
    yAxis: Object.assign({ type: 'value', name: '亿美元', nameTextStyle: { color: muted, fontSize: 11 } }, axisStyle()),
    series: [{
      type: 'bar',
      data: [
        { value: 3.2, itemStyle: { color: accent2 } },
        { value: -1.8, itemStyle: { color: danger } },
        { value: 1.5, itemStyle: { color: accent2 } },
        { value: -2.4, itemStyle: { color: danger } },
        { value: -1.1, itemStyle: { color: danger } },
        { value: 0.8, itemStyle: { color: accent2 } },
        { value: -2.4, itemStyle: { color: danger } }
      ],
      barWidth: '48%',
      label: {
        show: true,
        position: 'inside',
        color: ink,
        fontSize: 10,
        formatter: function(p) {
          var sign = p.value >= 0 ? '+' : '';
          return sign + p.value;
        }
      },
      markLine: {
        silent: true,
        symbol: 'none',
        lineStyle: { color: rule, type: 'solid', width: 1 },
        data: [{ yAxis: 0 }]
      }
    }]
  });
  window.addEventListener('resize', function() { chart4.resize(); });

})();
