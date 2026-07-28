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
        name: '收录新闻',
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
          formatter: '{b}\n{c} 条'
        },
        data: [
          { value: 4, name: 'AI 公司与算力' },
          { value: 4, name: 'AI 技术与监管' },
          { value: 2, name: 'Web3 与行情' }
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
        name: '24h 涨跌幅',
        nameTextStyle: commonText(),
        axisLabel: {
          color: muted,
          formatter: '{value}%'
        },
        splitLine: { lineStyle: { color: rule } }
      },
      series: [{
        name: '24h 涨跌幅',
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
      { name: 'OpenAI 数据中心担保\n谈判中', value: 250, source: 'Bloomberg' },
      { name: 'Meta 德州 AI 数据中心\n债券', value: 12.5, source: 'Bloomberg' },
      { name: 'SSI 投资承诺\n媒体口径', value: 5, source: 'Sina/Bloomberg' },
      { name: 'Orange-Morrison\n法国数据中心', value: 3.41, source: 'Reuters' },
      { name: 'Alpaca 股权融资', value: 0.135, source: 'Alpaca' }
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
          return item.name.replace('\n', ' ') + '<br/>规模：' + item.value + ' 十亿美元<br/>来源：' + item.source;
        }
      },
      grid: { left: 150, right: 34, top: 24, bottom: 36 },
      xAxis: {
        type: 'log',
        name: '十亿美元（对数刻度）',
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
        name: '规模',
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
