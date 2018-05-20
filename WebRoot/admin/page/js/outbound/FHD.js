Ext.define('Box', {
    extend: 'Ext.data.Model',
    fields: [
		{name:'boxnochecked'},
		{name:'boxnounchecked'}
	]
});


Ext.define('Redm.FhdGrid',{
	extend: 'Redm.BaseGrid',
	alias: ['widget.fhdgrid'],
	autoLoad: false,
	initComponent: function(){
		this.buildStore(basePath+'/admin/queryBoxNoList.action','Box',20,null,{});
		this.callParent(arguments);
	},
	buildColumns: function(){
		this.columns = [
		    { header: "已复核箱号", dataIndex: 'boxnochecked',width:150, sortable: true},
		    { header: "未复核箱号", dataIndex: 'boxnounchecked',width:150, sortable: true}
		];
	},
	buildDockedItems: function(){
		var me = this;
		this.dockedItems = [{
	        xtype: 'pagingtoolbar',
	        store: me.store,
	        dock: 'bottom',
	        displayInfo: true
	    }]
	}
});

Ext.define('Redm.FhdPanel',{
	extend: 'Ext.panel.Panel',
	alias: ['widget.fhdpanel'],
	title:'复核称重',
	layout:'border',
	initComponent: function() {
		var me = this;
		this.items = [this.createBasePanel(),this.createFhdGrid()];
        this.callParent(arguments);
	},
	createBasePanel: function(){
		var me = this;
		this.basepanel = Ext.create('Ext.form.Panel',{
    		region: 'center',
    		layout: 'vbox',
    		frame: true,
    		defaults: {
    			xtype: 'fieldcontainer',
    			margin: '5 0 0 5'
    		},
    		items: [{
    			layout: 'hbox',
    			defaults: {
    				xtype: 'textfield',
    				margin: '5 0 0 5',
    				width: 200,
    				allowBlank: false,
    				labelWidth: 60
    			},
    			items: [{
    				fieldLabel: '箱号',
    				listeners: {
    					change: function(txt,newValue){
							txt.setValue(newValue.toUpperCase());    						
    					},
    					afterRender: function(thisForm, options){
				            this.keyNav = Ext.create('Ext.util.KeyNav', this.el, {
				                enter: function(){
				                	var baseForm = me.basepanel.getForm();
				                	var  boxKey = baseForm.findField('boxNo').getValue();
				                	Ext.Ajax.request({
									    url: basePath+'/admin/queryBoxNo.action',
									    params: {
									        boxKey: boxKey
									    },
									    success: function(response){
									        var res = Ext.decode(response.responseText);
									        var results = res.json.results;
									        var success = res.success;
									        if(results){
										        baseForm.findField('orderNo').setValue(results.orderKey);
										        baseForm.findField('qty').setValue(results.qtyChecked>0?results.qtyChecked: '');
										        baseForm.findField('boxType').setValue(results.caseType);
										        baseForm.findField('weight').setValue(results.wgt>0?results.wgt:'');
										        baseForm.findField('qty').focus();
									        }else{
			        							MessageBox.show(success, res.json.msg);
									        }
									    }
									});
				            	},
				                scope: this
				            });
				        }
    				},
    				name: 'boxNo'
    			}]
    		},{
    			layout: 'hbox',
    			defaults: {
    				xtype: 'textfield',
    				margin: '5 0 0 5',
    				width: 200,
    				allowBlank: false,
    				labelWidth: 60
    			},
    			items: [{
    				fieldLabel: '配货单号',
    				readOnly: true,
    				name: 'orderNo'
    			}]
    		},{
    			layout: 'hbox',
    			defaults: {
    				xtype: 'combobox',
    				margin: '5 0 0 5',
    				width: 200,
    				allowBlank: false,
    				labelWidth: 60
    			},
    			items: [{
    				fieldLabel: '承运商',
    				xtype: 'codecombo',
    				dictType: 'CARRIER',
    				name: 'carrior'
    			}]
    		},{
    			layout: 'hbox',
    			defaults: {
    				xtype: 'numberfield',
    				margin: '5 0 0 5',
    				width: 200,
    				allowBlank: false,
    				labelWidth: 60
    			},
    			items: [{
    				fieldLabel: '数量',
    				listeners: {
    					afterRender: function(thisForm, options){
				            this.keyNav = Ext.create('Ext.util.KeyNav', this.el, {
				                enter: function(){
				                	var baseForm = me.basepanel.getForm();
				                	baseForm.findField('weight').focus();
				            	},
				                scope: this
				            });
				        }
    				},
    				name: 'qty'
    			}]
    		},{
    			layout: 'hbox',
    			defaults: {
    				xtype: 'numberfield',
    				margin: '5 0 0 5',
    				width: 200,
    				allowBlank: false,
    				labelWidth: 60
    			},
    			items: [{
    				fieldLabel: '重量',
    				name: 'weight',
    				maxValue: 100, 
    				minValue: 0, 
    				minWidth:3,
    				listeners: {
    					afterRender: function(thisForm, options){
				            this.keyNav = Ext.create('Ext.util.KeyNav', this.el, {
				                enter: function(){
				                	var baseForm = me.basepanel.getForm();
				                	baseForm.findField('boxType').focus();
				            	},
				                scope: this
				            });
				        },
				        change: function(txt,newValue){
				        	if(newValue>2400000000000){
				        		var sign = newValue%100000;
				        		var g = (sign - sign%10)/1000;
				        		txt.setValue(g);
				        	}
				        }
    				}
    			}]
    		},{
    			layout: 'hbox',
    			defaults: {
    				xtype: 'combobox',
    				margin: '5 0 0 5',
    				width: 200,
    				labelWidth: 60
    			},
    			items: [{
    				fieldLabel: '箱型',
    				xtype: 'codecombo',
    				dictType: 'CASETYPE',
    				allowBlank: false,
    				listeners: {
    					afterRender: function(thisForm, options){
				            this.keyNav = Ext.create('Ext.util.KeyNav', this.el, {
				                enter: function(){
				                	Ext.getCmp('ok').focus();
				            	},
				                scope: this
				            });
				        }
    				},
    				name: 'boxType'
    			}]
    		},{
    			layout: 'hbox',
    			defaults: {
    				xtype: 'button',
    				margin: '5 5 5 40',
    				width: 80
    			},
    			items: [{
    				text: '确定',
    				handler: this.FH,
    				id: 'ok',
    				scope: this
    			},{
    				text: '打印箱唛',
    				id: 'print',
    				handler: this.onPrintXM,
    				scope: this
    			}]
    		},{
    			layout: 'hbox',
    			defaults: {
    				xtype: 'button',
    				margin: '5 5 5 40',
    				width: 80
    			},
    			items: [{
    				text: '修改复核',
    				handler: this.updateFH,
    				scope: this
    			},{
    				text: '查询',
    				handler: function(){
    					me.fhdgrid.getStore().load();
    				},
    				scope: this
    			}]
    		},{
    			layout: 'hbox',
    			defaults: {
    				xtype: 'button',
    				margin: '5 5 5 40',
    				width: 80
    			},
    			items: [{
    				text: '复核结束',
    				handler: this.finishFH,
    				scope: this
    			},{
    				text: '警告',
    				handler: this.tests,
    				scope: this
    			}]
    		},{
    			layout: 'hbox',
    			defaults: {
    				xtype: 'button',
    				margin: '5 5 5 40',
    				width: 80
    			},
    			items: [{
    				text: '打印箱单',
    				handler: this.onPrint,
    				scope: this
    			},{
    				text: '合并箱单',
    				handler: this.onPrintList2,
    				scope: this
    			}]
    		}]
    	});
		return this.basepanel;
	},
	createFhdGrid: function(){
		this.fhdgrid = Ext.create('widget.fhdgrid',{
			region: 'east',
			width: 900
		});
		this.fhdgrid.getStore().on('beforeload',function(store){
			var params = store.getProxy().extraParams;
			var value = this.basepanel.getForm().getFieldValues();
			if(value.orderNo != ''){
	            var orderNo = value.orderNo;
	         	delete params.orderNo;
            	if(orderNo) params.orderNo = orderNo;
        	}
		},this);
		return this.fhdgrid;
	},
	FH:function(){
		var myForm = this.basepanel.getForm();
		if(!myForm.isValid()) return ;
		myForm.submit({
		    clientValidation: true,
		    url: basePath+'/admin/FH.action',
		    params: {},
		    success: function(form, action) {
		    	var res = action.result;
		    	myForm.findField('qty').setValue('');
		    	myForm.findField('weight').setValue('');
		    	myForm.findField('boxType').setValue('');
		    	Ext.getCmp('print').focus();
		    },
		    failure: function(form, action) {
		    	var res = action.result;
		    	MessageBox.show(res.success, res.json.msg);
		    }
		});
	},
	finishFH:function(){
		var myForm = this.basepanel.getForm();
		var value = myForm.getFieldValues();
		if(value.orderNo == ''){
			MessageBox.error('错误提示','请输入配货单号！');
			return;
		}
		Ext.Ajax.request({
		    url: basePath+'/admin/finishFHD.action',
		    params: {
		        orderNo: value.orderNo
		    },
		    success: function(response){
		        var res = Ext.decode(response.responseText);
		        var success = res.success;
		        MessageBox.show(success, res.json.msg);
		    }
		});
	},
	updateFH:function(){
		var myForm = this.basepanel.getForm();
		var value = myForm.getFieldValues();
		if(value.orderNo == ''){
			MessageBox.error('错误提示','请输入配货单号！');
			return;
		}
		if(value.boxNo == ''){
			MessageBox.error('错误提示','请输入箱型！');
			return;
		}
		if(value.boxType == ''){
			MessageBox.error('错误提示','请输入配货单号！');
			return;
		}
		if(value.weight == ''){
			MessageBox.error('错误提示','请输入重量！');
			return;
		}
		if(value.carrior == ''){
			MessageBox.error('错误提示','请输入承运商！');
			return;
		}
		Ext.Ajax.request({
		    url: basePath+'/admin/updateFH.action',
		    params: {
		        orderNo: value.orderNo,
		        boxNo: value.boxNo,
		        boxType: value.boxType,
		        weight: value.weight,
		        carrior: value.carrior,
		        carriorDesc: value.carriorDesc
		    },
		    success: function(response){
		        var res = Ext.decode(response.responseText);
		        var success = res.success;
		        MessageBox.show(success, res.json.msg);
		    }
		});
	},
	onPrintXM: function(){
    	var me = this;
    	var baseForm = me.basepanel.getForm();
    	var values = baseForm.getValues();
    	if(values.orderNo == ''){
    		MessageBox.error('错误提示','单号不可以为空！');
    		return;
    	}
    	if(values.boxNo == ''){
    		MessageBox.error('错误提示','箱号不可以为空！');
    		return;
    	}
    	var uid = values.orderNo; 
    	var boxKey = values.boxNo;
    	var url = '';
		Ext.Ajax.request({
		    url: basePath+'/admin/printerMX.action',
		    params: {id: uid,boxKey:boxKey},
		    async: false,
		    success: function(response){
		        var text = Ext.decode(response.responseText);
		        url = basePath + text.json.path;
			}
		});
		try{delete window.frames["printerm"];}catch(e){};
		me.winItems = {
			html: "<iframe id='printerm' name='printerm' src='"+url+"' style='width:100%; height:100%;' frameborder='0'></iframe>"
		};
		me.win = me.createPrinterWindow();
		me.prinerWin.show();
		me.prinerWin.on('close',function(){
			delete me.winItems;
			delete me.prinerWin;
			delete me.win;
			baseForm.findField('boxNo').setValue('');
	    	baseForm.findField('orderNo').setValue('');
	    	baseForm.findField('boxNo').focus();
		},me);
    },
    createPrinterWindow: function(){
		this.prinerWin = Ext.create('widget.window',{
			width: 500,
			height: 380,
	        layout: 'fit',
	        title: '打印',
			items:[this.winItems]
		});
		return this.prinerWin;
    },
	onPrint: function(){//打印箱单
    	var me = this;
    	var myForm = this.basepanel.getForm();
		var value = myForm.getFieldValues();
		if(value.orderNo == ''){
			MessageBox.error('错误提示','请输入配货单号！');
			return;
		}
		if(value.boxNo == ''){
			MessageBox.error('错误提示','请输入箱型！');
			return;
		}
    	var uid = value.orderNo;
    	var boxKey = value.boxNo
    	var url = '';
		Ext.Ajax.request({
		    url: basePath+'/admin/printerBox.action',
		    params: {id: uid,boxKey: boxKey,num: 1},
		    async: false,
		    success: function(response){
		        var text = Ext.decode(response.responseText);
		        url = basePath + text.json.path;
			}
		});
		try{delete window.frames["printer"];}catch(e){};
		me.winItems = {
			html: "<iframe id='printer' name='printer' src='"+url+"' style='width:100%; height:100%;' frameborder='0'></iframe>"
		};
		me.win = me.createPrinterWindow();
		me.prinerWin.show();
		me.prinerWin.on('close',function(){
			delete me.winItems;
			delete me.prinerWin;
			delete me.win;
		},me);
    },
    onPrintList2: function(){//合并箱单
    	var me = this;
    	var myForm = this.basepanel.getForm();
		var value = myForm.getFieldValues();
		if(value.orderNo == ''){
			MessageBox.error('错误提示','请输入配货单号！');
			return;
		}
		if(value.boxNo == ''){
			MessageBox.error('错误提示','请输入箱型！');
			return;
		}
    	var uid = value.orderNo;
    	var url = '';
		Ext.Ajax.request({
		    url: basePath+'/admin/printerBox.action',
		    params: {id: uid,num: 2},
		    async: false,
		    success: function(response){
		        var text = Ext.decode(response.responseText);
		        url = basePath + text.json.path;
			}
		});
		try{delete window.frames["printerlist"];}catch(e){};
		me.winItems = {
			html: "<iframe id='printerlist' name='printerlist' src='"+url+"' style='width:100%; height:100%;' frameborder='0'></iframe>"
		};
		me.win = me.createPrinterWindow();
		me.prinerWin.show();
		me.prinerWin.on('close',function(){
			delete me.winItems;
			delete me.prinerWin;
			delete me.win;
		},me);
    },
    tests: function(){
	    var wsh = new ActiveXObject('WSCript.shell');
		wsh.run('notepad.exe');
    }
});


Ext.onReady(function(){
	Ext.create('Ext.container.Viewport', {
	    layout: 'border',
	    items: [{
	    	xtype:'fhdpanel',
	    	region:'center'
	    }]
	});
});
