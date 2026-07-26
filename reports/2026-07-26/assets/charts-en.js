// assets/charts-en.js
// Exchange rate: 1 USD = 6.7939 CNY (CFETS central parity, July 24, 2026)
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

  // ===== Chart 1: Parameter Scale Comparison of Chinese Trillion-Parameter Models =====
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
        return p.name + '<br/>Parameter scale: ' + p.value + ' trillion';
      }
    },
    grid: { left: '8%', right: '8%', top: '12%', bottom: '12%', containLabel: true },
    xAxis: Object.assign({ type: 'category', data: ['Kimi K3', 'Qwen3.8 Max', 'DeepSeek V4*'] }, axisStyle()),
    yAxis: Object.assign({ type: 'value', name: 'Parameters (trillion)', nameTextStyle: { color: muted, fontSize: 11 } }, axisStyle()),
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
        formatter: '{c}T'
      },
      itemStyle: { borderRadius: [6, 6, 0, 0] }
    }]
  });
  window.addEventListener('resize', function() { chart1.resize(); });

  // ===== Chart 2: Major AI Funding Rounds This Week (USD Billion) =====
  // CNY amounts converted at 1 USD = 6.7939 CNY (CFETS, July 24, 2026)
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
        return p.name + '<br/>Funding: $' + p.value + 'B';
      }
    },
    grid: { left: '8%', right: '12%', top: '8%', bottom: '20%', containLabel: true },
    xAxis: Object.assign({ type: 'category', data: ['DeepSeek', 'Kling AI', 'Aishi Tech', 'HiDream', 'LimX Dynamics', 'Galaxy Universal'], axisLabel: { interval: 0, rotate: 15, color: muted, fontSize: 11 } }, axisStyle()),
    yAxis: Object.assign({ type: 'value', name: '$B', nameTextStyle: { color: muted, fontSize: 11 } }, axisStyle()),
    series: [{
      type: 'bar',
      data: [
        { value: 7.36, itemStyle: { color: accent } },
        { value: 2.80, itemStyle: { color: accent2 } },
        { value: 0.44, itemStyle: { color: accent3 } },
        { value: 0.22, itemStyle: { color: accent3 } },
        { value: 0.21, itemStyle: { color: muted } },
        { value: 0.15, itemStyle: { color: muted } }
      ],
      barWidth: '50%',
      label: {
        show: true,
        position: 'top',
        color: ink,
        fontSize: 11,
        fontWeight: 600,
        formatter: '${c}B'
      },
      itemStyle: { borderRadius: [6, 6, 0, 0] }
    }]
  });
  window.addEventListener('resize', function() { chart2.resize(); });

  // ===== Chart 3: Monthly Crypto VC Funding Trend (USD Million) =====
  // Original data in hundred-million USD (亿美元), converted to $M
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
        return p.name + '<br/>VC Funding: $' + p.value + 'M';
      }
    },
    grid: { left: '8%', right: '8%', top: '12%', bottom: '12%', containLabel: true },
    xAxis: Object.assign({ type: 'category', data: ['Mar', 'Apr', 'May', 'Jun', 'Jul*'], boundaryGap: false }, axisStyle()),
    yAxis: Object.assign({ type: 'value', name: '$M', nameTextStyle: { color: muted, fontSize: 11 } }, axisStyle()),
    series: [{
      type: 'line',
      data: [2850, 3120, 3890, 2210, 1220],
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
        formatter: '${c}M'
      }
    }]
  });
  window.addEventListener('resize', function() { chart3.resize(); });

  // ===== Chart 4: BTC Spot ETF Fund Flows (Last 30 Days, USD Million) =====
  // Original data in hundred-million USD (亿美元), converted to $M
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
        return p.name + '<br/>Net flow: ' + sign + '$' + p.value + 'M';
      }
    },
    grid: { left: '8%', right: '8%', top: '12%', bottom: '12%', containLabel: true },
    xAxis: Object.assign({ type: 'category', data: ['Jul 1', 'Jul 5', 'Jul 10', 'Jul 15', 'Jul 18', 'Jul 22', 'Jul 24'], axisLabel: { color: muted, fontSize: 10 } }, axisStyle()),
    yAxis: Object.assign({ type: 'value', name: '$M', nameTextStyle: { color: muted, fontSize: 11 } }, axisStyle()),
    series: [{
      type: 'bar',
      data: [
        { value: 320, itemStyle: { color: accent2 } },
        { value: -180, itemStyle: { color: danger } },
        { value: 150, itemStyle: { color: accent2 } },
        { value: -240, itemStyle: { color: danger } },
        { value: -110, itemStyle: { color: danger } },
        { value: 80, itemStyle: { color: accent2 } },
        { value: -240, itemStyle: { color: danger } }
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
