(function() {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();
  var success = style.getPropertyValue('--success').trim();
  var danger = style.getPropertyValue('--danger').trim();
  var accent3 = style.getPropertyValue('--accent3').trim();

  // --- Chart: Crypto 加密货币24小时涨跌幅
  var chart1 = echarts.init(document.getElementById('chart-crypto-price'), null, { renderer: 'svg' });
  chart1.setOption({
    animation: false,
    tooltip: {
      trigger: 'axis',
      appendToBody: true,
      backgroundColor: bg2,
      borderColor: rule,
      textStyle: { color: ink },
      formatter: function(params) {
        var item = params[0];
        return item.marker + item.name + '<br/>' +
          '价格: <strong>' + item.value + '%</strong>';
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['BTC', 'ETH', 'SOL', 'XRP', 'UNI'],
      axisLine: { lineStyle: { color: rule } },
      axisLabel: { color: muted, fontSize: 12 },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      name: '涨跌幅 (%)',
      nameTextStyle: { color: muted, fontSize: 11 },
      axisLine: { show: false },
      axisLabel: { color: muted, fontSize: 11 },
      splitLine: { lineStyle: { color: rule, type: 'dashed' } }
    },
    series: [{
      type: 'bar',
      data: [
        { value: 1.14, itemStyle: { color: success } },
        { value: 2.03, itemStyle: { color: success } },
        { value: 2.12, itemStyle: { color: success } },
        { value: 2.14, itemStyle: { color: success } },
        { value: 13.00, itemStyle: { color: accent } }
      ],
      barWidth: '40%',
      itemStyle: {
        borderRadius: [4, 4, 0, 0]
      },
      label: {
        show: true,
        position: 'top',
        color: ink,
        fontSize: 12,
        fontWeight: 600,
        formatter: '+{c}%'
      }
    }]
  });
  window.addEventListener('resize', function() { chart1.resize(); });

  // --- Chart: 新闻分类分布
  var chart2 = echarts.init(document.getElementById('chart-news-category'), null, { renderer: 'svg' });
  chart2.setOption({
    animation: false,
    tooltip: {
      trigger: 'item',
      appendToBody: true,
      backgroundColor: bg2,
      borderColor: rule,
      textStyle: { color: ink },
      formatter: '{b}: {c}条 ({d}%)'
    },
    legend: {
      orient: 'vertical',
      right: '5%',
      top: 'center',
      textStyle: { color: muted, fontSize: 13 },
      itemWidth: 12,
      itemHeight: 12,
      itemGap: 16
    },
    series: [{
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
        show: true,
        position: 'inside',
        color: '#fff',
        fontSize: 14,
        fontWeight: 700,
        formatter: '{c}条'
      },
      labelLine: { show: false },
      data: [
        { value: 5, name: 'AI 公司动态', itemStyle: { color: accent } },
        { value: 5, name: 'AI 技术与监管', itemStyle: { color: accent2 } },
        { value: 5, name: 'Web3 区块链', itemStyle: { color: accent3 } }
      ]
    }]
  });
  window.addEventListener('resize', function() { chart2.resize(); });

})();
