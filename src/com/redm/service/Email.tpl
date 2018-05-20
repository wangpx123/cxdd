<html>
<table align="center" width="751">
	<tbody>
	<tr valign="top">
	<td>
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
		  <tbody id="form2">
		     <tr> 
		       	<td align="center">
		       		<b><font size="4">万诊宝数据采集报告</font></b>
		     	</td>
		   	</tr>
		   	<tr height="15"><td></td> </tr>
		   	<tr> 
		       	<td align="center">
		       		<table style="font-size: 12px" border="0" cellpadding="0" cellspacing="0" width="95%">
				     <tbody>
					     <tr> 
					       	<td align="left" width="80">姓名：</td>
					       	<td align="left">{name}</td>
					       	<td align="left" width="80">性别：</td>
					       	<td align="left">{sex}</td>
					       	<td align="left" width="90">年龄：</td>
					       	<td align="left">{age}</td>
					       	<td align="left" width="90">身份证号：</td>
					       	<td align="left">{cardId}</td>
					   	</tr>
					   	<tr> 
					       	<td align="left" width="80">检测日期：</td>
					       	<td colspan="7" align="left">{checktime}</td>
					   	</tr>
					   	<tr> 
					       	<td align="left" width="80">社保号码：</td>
					       	<td colspan="3" align="left">{insurance}</td>
					       	<td align="left" width="80">手机号码：</td>
					       	<td colspan="3" align="left">{moblie}</td>
					   	</tr>
					   	<tr height="10"><td colspan="8"><hr></td></tr>
				 	</tbody>
				 </table>
		     	</td>
		   	</tr>
		   	<tr> 
		       	<td align="center">
		       		<table style="font-size: 12px" border="0" cellpadding="0" cellspacing="0" width="95%">
				     <tbody>
					     <tr> 
					       	<td align="left" width="90">心电图参数：</td>
					       	<td align="left" width="5"></td>
					       	<td align="left" width="80">心率：</td>
					       	<td align="left">{hr}(次/分)</td>
					       	<td align="left" width="80">呼吸率：</td>
					       	<td align="left">{resp}(次/分)</td>
					       	<td align="left" width="60">ST电率：</td>
					       	<td align="left">{st}(mV)</td>
					       	<td align="left" width="50"></td>
					       	<td align="left"></td>
					   	</tr>
					   	<tr> 
					       	<td align="left">诊断信息：</td>
					       	<td colspan="10" align="left"></td>
					   	</tr>
					   	<tr> 
					       	<td align="left">血压参数：</td>
					       	<td align="left"></td>
					       	<td align="left">测量值1：</td>
					       	<td align="left">{bloodPressure1}</td>
					       	<td align="left">测量值2：</td>
					       	<td align="left">{bloodPressure2}</td>
					       	<td align="left">测量值3：</td>
					       	<td align="left">{bloodPressure3}</td>
					       	<td align="left">平均值：</td>
					       	<td align="left">{bloodPressure}</td>
					   	</tr>
					   	<tr> 
					       	<td align="left">血氧参数：</td>
					       	<td align="left"></td>
					       	<td align="left">血氧饱和度：</td>
					       	<td align="left">{spo2}(%)</td>
					       	<td align="left">脉搏率：</td>
					       	<td align="left">{pr}(次/分)</td>
					       	<td align="left"></td>
					       	<td align="left"></td>
					       	<td align="left"></td>
					       	<td align="left"></td>
					   	</tr>
					   	<tr> 
					       	<td align="left">体温参数：</td>
					       	<td align="left"></td>
					       	<td align="left">体表温度：</td>
					       	<td align="left">{temp}(℃)</td>
					       	<td align="left"></td>
					       	<td align="left"></td>
					       	<td align="left"></td>
					       	<td align="left"></td>
					       	<td align="left"></td>
					       	<td align="left"></td>
					   	</tr>
					   	<tr> 
					       	<td align="left">胎心率参数：</td>
					       	<td align="left"></td>
					       	<td align="left">胎心率：</td>
					       	<td align="left">{fetalHr}(次/分)</td>
					       	<td align="left"></td>
					       	<td align="left"></td>
					       	<td align="left"></td>
					       	<td align="left"></td>
					       	<td align="left"></td>
					       	<td align="left"></td>
					   	</tr>
					   	<tr> 
					       	<td align="left">肺功能参数：</td>
					       	<td align="left"></td>
					       	<td align="left">肺活量：</td>
					       	<td align="left">{lung}(ml)</td>
					       	<td align="left">用力肺活量：</td>
					       	<td align="left">{forcedLung}(ml)</td>
					       	<td align="left"></td>
					       	<td align="left"></td>
					       	<td align="left"></td>
					       	<td align="left"></td>
					   	</tr>
					   	<tr height="10"><td colspan="10"><hr></td></tr>
					   	<tr>
						   	<td colspan="10" width="95%">
						   		<img src="http://114.80.180.125:8080/WLW/char/Chart%21showChart.action?field=LEAD01&id={id}">
						   		<img src="http://114.80.180.125:8080/WLW/char/Chart%21showChart.action?field=LEAD02&id={id}">
						   		<img src="http://114.80.180.125:8080/WLW/char/Chart%21showChart.action?field=LEAD03&id={id}">
						   		<img src="http://114.80.180.125:8080/WLW/char/Chart%21showChart.action?field=LEAD04&id={id}">
						   		<img src="http://114.80.180.125:8080/WLW/char/Chart%21showChart.action?field=LEAD05&id={id}">
						   		<img src="http://114.80.180.125:8080/WLW/char/Chart%21showChart.action?field=LEAD06&id={id}">
						   		<img src="http://114.80.180.125:8080/WLW/char/Chart%21showChart.action?field=LEAD07&id={id}">
						   	</td>
					   	</tr>
				 	</tbody>
				 </table>
		     	</td>
		   	</tr>
	 	</tbody>
	 </table>
     </td>
     </tr>
    </table>
   </tbody>
</html>