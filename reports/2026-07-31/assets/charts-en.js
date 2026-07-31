// assets/charts-en.js
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
  c1.setOption({animation:false,tooltip:Object.assign({trigger:'axis',axisPointer:{type:'shadow'},formatter:function(p){return p[0].name+'<br/>YoY: '+p[0].value+'%';}},tooltip()),grid:{left:'8%',right:'8%',top:'8%',bottom:'18%',containLabel:true},xAxis:Object.assign({type:'category',data:['China AI\nGrowth','Azure\nCloud','AWS\nRevenue','Compute\nCapacity'],axisLabel:{interval:0,color:muted,fontSize:10,lineHeight:14}},axisStyle()),yAxis:Object.assign({type:'value',name:'YoY Growth (%)',nameTextStyle:{color:muted}},axisStyle()),series:[{type:'bar',barWidth:'48%',data:[{value:30,itemStyle:{color:accent2}},{value:43,itemStyle:{color:accent}},{value:28,itemStyle:{color:accent3}},{value:180,itemStyle:{color:danger}}],label:{show:true,position:'top',color:ink,fontSize:11,formatter:'{c}%'},itemStyle:{borderRadius:[6,6,0,0]}}]});
  var c2 = echarts.init(document.getElementById('chart-crypto-moves'), null, {renderer:'svg'});
  c2.setOption({animation:false,tooltip:Object.assign({trigger:'axis',axisPointer:{type:'shadow'},formatter:function(p){return p[0].name+'<br/>24h: '+p[0].value+'%';}},tooltip()),grid:{left:'8%',right:'8%',top:'8%',bottom:'12%',containLabel:true},xAxis:Object.assign({type:'category',data:['UNI','ADA','BNB','BTC','ETH','SOL','MIM'],axisLabel:{color:muted,fontSize:11}},axisStyle()),yAxis:Object.assign({type:'value',name:'24h Change (%)',nameTextStyle:{color:muted}},axisStyle()),series:[{type:'bar',barWidth:'52%',data:[13.14,3.72,3.00,1.25,0.70,-0.10,-74.00].map(function(v){return {value:v,itemStyle:{color:v>=0?accent2:danger}};}),label:{show:true,position:function(p){return p.value>=0?'top':'bottom';},color:ink,fontSize:11,formatter:'{c}%'},itemStyle:{borderRadius:[6,6,0,0]}}]});
  var c3 = echarts.init(document.getElementById('chart-market-cap'), null, {renderer:'svg'});
  c3.setOption({animation:false,color:[accent,accent2,accent3,danger,muted],tooltip:Object.assign({trigger:'item',formatter:function(p){return p.name+'<br/>Mkt Cap: $'+p.value+'T ('+p.percent+'%)';}},tooltip()),legend:{bottom:'2%',left:'center',textStyle:{color:muted,fontSize:11}},series:[{type:'pie',radius:['42%','68%'],center:['50%','45%'],itemStyle:{borderColor:bg2,borderWidth:3},label:{show:true,color:ink,fontSize:11,formatter:'{b}\n{d}%'},data:[{value:1.30,name:'BTC',itemStyle:{color:accent}},{value:0.23,name:'ETH',itemStyle:{color:accent2}},{value:0.30,name:'Stablecoins',itemStyle:{color:accent3}},{value:0.06,name:'DeFi',itemStyle:{color:danger}},{value:0.41,name:'Others',itemStyle:{color:muted}}]}]});
  var c4 = echarts.init(document.getElementById('chart-h1-crypto'), null, {renderer:'svg'});
  c4.setOption({animation:false,tooltip:Object.assign({trigger:'axis',axisPointer:{type:'shadow'},formatter:function(p){return p[0].name+'<br/>Amount: $'+p[0].value+'B';}},tooltip()),grid:{left:'10%',right:'10%',top:'8%',bottom:'12%',containLabel:true},xAxis:Object.assign({type:'category',data:['H1 Total Funding','H1 Total M&A','Q2 Funding'],axisLabel:{interval:0,color:muted,fontSize:11}},axisStyle()),yAxis:Object.assign({type:'value',name:'USD Billions',nameTextStyle:{color:muted}},axisStyle()),series:[{type:'bar',barWidth:'45%',data:[{value:133,itemStyle:{color:accent}},{value:93.7,itemStyle:{color:accent2}},{value:77.3,itemStyle:{color:accent3}}],label:{show:true,position:'top',color:ink,fontSize:11,formatter:'${c}B'},itemStyle:{borderRadius:[6,6,0,0]}}]});
  [c1,c2,c3,c4].forEach(function(c){window.addEventListener('resize',function(){c.resize();});});
})();
