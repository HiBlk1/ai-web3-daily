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
  function axisStyle(){return {axisLine:{lineStyle:{color:rule}},axisTick:{show:false},axisLabel:{color:muted,fontSize:11},splitLine:{lineStyle:{color:rule,type:'dashed'}}};}
  function tooltip(){return {appendToBody:true,backgroundColor:bg2,borderColor:rule,textStyle:{color:ink,fontSize:12}};}
  var c1 = echarts.init(document.getElementById('chart-ai-capital'), null, {renderer:'svg'});
  c1.setOption({animation:false,color:[accent,accent2,accent3,danger],tooltip:Object.assign({trigger:'axis',axisPointer:{type:'shadow'},formatter:function(p){return p[0].name+'<br/>规模：'+p[0].value+' 十亿美元';}},tooltip()),grid:{left:'8%',right:'8%',top:'8%',bottom:'18%',containLabel:true},xAxis:Object.assign({type:'category',data:['英伟达→SSI\n股权投资','SSI此前\n累计融资','英伟达→OpenAI\n潜在担保','英伟达AI基建\n相关交易'],axisLabel:{interval:0,color:muted,fontSize:10,lineHeight:14}},axisStyle()),yAxis:Object.assign({type:'log',name:'十亿美元（log）',nameTextStyle:{color:muted}},axisStyle()),series:[{type:'bar',barWidth:'48%',data:[{value:5,itemStyle:{color:accent3}},{value:3,itemStyle:{color:muted}},{value:250,itemStyle:{color:accent}},{value:750,itemStyle:{color:danger}}],label:{show:true,position:'top',color:ink,fontSize:11,formatter:'${c}B'},itemStyle:{borderRadius:[6,6,0,0]}}]});
  var c2 = echarts.init(document.getElementById('chart-crypto-moves'), null, {renderer:'svg'});
  c2.setOption({animation:false,tooltip:Object.assign({trigger:'axis',axisPointer:{type:'shadow'},formatter:function(p){return p[0].name+'<br/>24h：'+p[0].value+'%';}},tooltip()),grid:{left:'8%',right:'8%',top:'8%',bottom:'12%',containLabel:true},xAxis:Object.assign({type:'category',data:['KAITO','PUMP','ZRO','BTC','ETH','XRP','SOL','SHIB'],axisLabel:{color:muted,fontSize:11}},axisStyle()),yAxis:Object.assign({type:'value',name:'涨跌幅 (%)',nameTextStyle:{color:muted}},axisStyle()),series:[{type:'bar',barWidth:'52%',data:[11.96,3.44,1.99,-2.86,-3.59,-4.44,-4.08,-12.45].map(function(v){return {value:v,itemStyle:{color:v>=0?accent2:danger}}}),label:{show:true,position:function(p){return p.value>=0?'top':'bottom'},color:ink,fontSize:11,formatter:'{c}%'},itemStyle:{borderRadius:[6,6,0,0]}}]});
  var c3 = echarts.init(document.getElementById('chart-liquidations'), null, {renderer:'svg'});
  c3.setOption({animation:false,color:[danger,accent2],tooltip:Object.assign({trigger:'item',formatter:function(p){return p.name+'<br/>爆仓：$'+p.value+'M ('+p.percent+'%)';}},tooltip()),legend:{bottom:'2%',left:'center',textStyle:{color:muted,fontSize:11}},series:[{type:'pie',radius:['42%','68%'],center:['50%','45%'],itemStyle:{borderColor:bg2,borderWidth:3},label:{show:true,color:ink,fontSize:11,formatter:'{b}\n{d}%'},data:[{value:542,name:'多单爆仓',itemStyle:{color:danger}},{value:145,name:'空单爆仓',itemStyle:{color:accent2}}]}]});
  var c4 = echarts.init(document.getElementById('chart-lido'), null, {renderer:'svg'});
  c4.setOption({animation:false,color:[accent,accent2,danger],tooltip:Object.assign({trigger:'axis',axisPointer:{type:'shadow'}},tooltip()),legend:{top:'2%',right:'5%',textStyle:{color:muted,fontSize:11}},grid:{left:'10%',right:'10%',top:'16%',bottom:'12%',containLabel:true},xAxis:Object.assign({type:'category',data:['0x02 占比：迁移前','0x02 占比：迁移后','验证者总数变化'],axisLabel:{interval:0,color:muted,fontSize:10}},axisStyle()),yAxis:Object.assign({type:'value',name:'百分比 / 变化',nameTextStyle:{color:muted}},axisStyle()),series:[{name:'影响',type:'bar',barWidth:'45%',data:[{value:32,itemStyle:{color:accent}},{value:52,itemStyle:{color:accent2}},{value:-33,itemStyle:{color:danger}}],label:{show:true,position:function(p){return p.value>=0?'top':'bottom'},color:ink,fontSize:11,formatter:'{c}%'}}]});
  [c1,c2,c3,c4].forEach(function(c){window.addEventListener('resize',function(){c.resize();});});
})();