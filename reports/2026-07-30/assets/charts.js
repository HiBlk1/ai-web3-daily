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
  function axisStyle(){return {axisLine:{lineStyle:{color:rule}},axisTick:{show:false},axisLabel:{color:muted,fontSize:11},splitLine:{lineStyle:{color:rule,type:'dashed'}}};;}
  function tooltip(){return {appendToBody:true,backgroundColor:bg2,borderColor:rule,textStyle:{color:ink,fontSize:12}};}
  var c1 = echarts.init(document.getElementById('chart-ai-capital'), null, {renderer:'svg'});
  c1.setOption({animation:false,tooltip:Object.assign({trigger:'axis',axisPointer:{type:'shadow'},formatter:function(p){return p[0].name+'<br/>规模：'+p[0].value+' 十亿美元';}},tooltip()),grid:{left:'8%',right:'8%',top:'8%',bottom:'18%',containLabel:true},xAxis:Object.assign({type:'category',data:['Meta\n资本支出','Anthropic\nH轮','可灵AI\n融资','月之暗面'],axisLabel:{interval:0,color:muted,fontSize:10,lineHeight:14}},axisStyle()),yAxis:Object.assign({type:'log',name:'十亿美元（log）',nameTextStyle:{color:muted}},axisStyle()),series:[{type:'bar',barWidth:'48%',data:[{value:140,itemStyle:{color:danger}},{value:65,itemStyle:{color:accent}},{value:30,itemStyle:{color:accent2}},{value:35,itemStyle:{color:accent3}}],label:{show:true,position:'top',color:ink,fontSize:11,formatter:'${c}B'},itemStyle:{borderRadius:[6,6,0,0]}}]});
  var c2 = echarts.init(document.getElementById('chart-crypto-moves'), null, {renderer:'svg'});
  c2.setOption({animation:false,tooltip:Object.assign({trigger:'axis',axisPointer:{type:'shadow'},formatter:function(p){return p[0].name+'<br/>24h：'+p[0].value+'%';}},tooltip()),grid:{left:'8%',right:'8%',top:'8%',bottom:'12%',containLabel:true},xAxis:Object.assign({type:'category',data:['BEAT','PI','JUP','SOL','BTC','ETH','AAVE','ENA'],axisLabel:{color:muted,fontSize:11}},axisStyle()),yAxis:Object.assign({type:'value',name:'涨跌幅 (%)',nameTextStyle:{color:muted}},axisStyle()),series:[{type:'bar',barWidth:'52%',data:[11.63,6.05,3.23,1.12,0.96,0.67,-6.03,-6.04].map(function(v){return {value:v,itemStyle:{color:v>=0?accent2:danger}};}),label:{show:true,position:function(p){return p.value>=0?'top':'bottom';},color:ink,fontSize:11,formatter:'{c}%'},itemStyle:{borderRadius:[6,6,0,0]}}]});
  var c3 = echarts.init(document.getElementById('chart-liquidations'), null, {renderer:'svg'});
  c3.setOption({animation:false,color:[danger,accent2],tooltip:Object.assign({trigger:'item',formatter:function(p){return p.name+'<br/>爆仓：$'+p.value+'M ('+p.percent+'%)';}},tooltip()),legend:{bottom:'2%',left:'center',textStyle:{color:muted,fontSize:11}},series:[{type:'pie',radius:['42%','68%'],center:['50%','45%'],itemStyle:{borderColor:bg2,borderWidth:3},label:{show:true,color:ink,fontSize:11,formatter:'{b}\n{d}%'},data:[{value:520,name:'多单爆仓（估算）',itemStyle:{color:danger}},{value:105,name:'空单爆仓',itemStyle:{color:accent2}}]}]});
  var c4 = echarts.init(document.getElementById('chart-h1-crypto'), null, {renderer:'svg'});
  c4.setOption({animation:false,tooltip:Object.assign({trigger:'axis',axisPointer:{type:'shadow'},formatter:function(p){return p[0].name+'<br/>金额：$'+p[0].value+'B';}},tooltip()),grid:{left:'10%',right:'10%',top:'8%',bottom:'12%',containLabel:true},xAxis:Object.assign({type:'category',data:['H1融资总额','H1并购总额','Q2融资总额'],axisLabel:{interval:0,color:muted,fontSize:11}},axisStyle()),yAxis:Object.assign({type:'value',name:'十亿美元',nameTextStyle:{color:muted}},axisStyle()),series:[{type:'bar',barWidth:'45%',data:[{value:133,itemStyle:{color:accent}},{value:93.7,itemStyle:{color:accent2}},{value:77.3,itemStyle:{color:accent3}}],label:{show:true,position:'top',color:ink,fontSize:11,formatter:'${c}B'},itemStyle:{borderRadius:[6,6,0,0]}}]});
  [c1,c2,c3,c4].forEach(function(c){window.addEventListener('resize',function(){c.resize();});});
})();
