(function() {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();
  var good = style.getPropertyValue('--good').trim();
  var warn = style.getPropertyValue('--warn').trim();

  function makeChart(id) {
    var el = document.getElementById(id);
    if (!el || !window.echarts) return null;
    return echarts.init(el, null, { renderer: 'svg' });
  }

  function commonText() {
    return {
      color: muted,
      fontFamily: getComputedStyle(document.body).fontFamily
    };
  }

  var categoryChart = makeChart('chart-category');
  if (categoryChart) {
    categoryChart.setOption({
      animation: false,
      color: [accent, accent2, good],
      tooltip: { trigger: 'item', appendToBody: true },
      legend: {
        bottom: 0,
        textStyle: commonText()
      },
      series: [{
        name: 'Included stories',
        type: 'pie',
        radius: ['48%', '72%'],
        center: ['50%', '44%'],
        avoidLabelOverlap: true,
        itemStyle: {
          borderColor: bg2,
          borderWidth: 2
        },
        label: {
          color: ink,
          formatter: '{b}\n{c} stories'
        },
        data: [
          { value: 4, name: 'AI companies & compute' },
          { value: 4, name: 'AI technology & regulation' },
          { value: 2, name: 'Web3 & markets' }
        ]
      }]
    });
    window.addEventListener('resize', function() { categoryChart.resize(); });
  }

  var cryptoChart = makeChart('chart-crypto');
  if (cryptoChart) {
    cryptoChart.setOption({
      animation: false,
      color: [good],
      tooltip: {
        trigger: 'axis',
        appendToBody: true,
        valueFormatter: function(value) { return value + '%'; }
      },
      grid: { left: 46, right: 20, top: 28, bottom: 38 },
      xAxis: {
        type: 'category',
        data: ['BTC', 'ETH'],
        axisLabel: commonText(),
        axisLine: { lineStyle: { color: rule } },
        axisTick: { show: false }
      },
      yAxis: {
        type: 'value',
        name: '24h change',
        nameTextStyle: commonText(),
        axisLabel: {
          color: muted,
          formatter: '{value}%'
        },
        splitLine: { lineStyle: { color: rule } }
      },
      series: [{
        name: '24h change',
        type: 'bar',
        barWidth: 42,
        itemStyle: {
          borderRadius: [8, 8, 0, 0],
          color: function(params) {
            return params.value >= 1 ? accent : good;
          }
        },
        label: {
          show: true,
          position: 'top',
          color: ink,
          formatter: '{c}%'
        },
        data: [0.40, 1.83]
      }]
    });
    window.addEventListener('resize', function() { cryptoChart.resize(); });
  }

  var capitalChart = makeChart('chart-capital');
  if (capitalChart) {
    var capitalData = [
      { name: 'OpenAI data-center guarantee\nunder negotiation', value: 250, source: 'Bloomberg' },
      { name: 'Meta Texas AI data center\nbonds', value: 12.5, source: 'Bloomberg' },
      { name: 'SSI investment commitment\nmedia-reported', value: 5, source: 'Sina/Bloomberg' },
      { name: 'Orange-Morrison\nFrench data centers', value: 3.41, source: 'Reuters' },
      { name: 'Alpaca equity financing', value: 0.135, source: 'Alpaca' }
    ];
    capitalChart.setOption({
      animation: false,
      color: [accent],
      tooltip: {
        trigger: 'axis',
        appendToBody: true,
        axisPointer: { type: 'shadow' },
        formatter: function(params) {
          var p = params[0];
          var item = capitalData[p.dataIndex];
          return item.name.replace('\n', ' ') + '<br/>Scale: ' + item.value + ' USD billions<br/>Source: ' + item.source;
        }
      },
      grid: { left: 150, right: 34, top: 24, bottom: 36 },
      xAxis: {
        type: 'log',
        name: 'USD billions (log scale)',
        nameTextStyle: commonText(),
        axisLabel: {
          color: muted,
          formatter: function(value) { return value; }
        },
        splitLine: { lineStyle: { color: rule } }
      },
      yAxis: {
        type: 'category',
        inverse: true,
        data: capitalData.map(function(item) { return item.name; }),
        axisLabel: {
          color: muted,
          width: 128,
          overflow: 'break'
        },
        axisLine: { lineStyle: { color: rule } },
        axisTick: { show: false }
      },
      series: [{
        name: 'Scale',
        type: 'bar',
        barWidth: 24,
        data: capitalData.map(function(item) { return item.value; }),
        itemStyle: {
          borderRadius: [0, 8, 8, 0],
          color: function(params) {
            return params.dataIndex === 0 ? accent2 : (params.dataIndex === 4 ? warn : accent);
          }
        },
        label: {
          show: true,
          position: 'right',
          color: ink,
          formatter: function(params) {
            return params.value + 'B';
          }
        }
      }]
    });
    window.addEventListener('resize', function() { capitalChart.resize(); });
  }
})();
