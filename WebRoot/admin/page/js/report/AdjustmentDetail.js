/***************************************
调整明细报表  AdjustmentDetail.js

****************************************/

Ext.define('AdjustmentDetail', {
    extend: 'Ext.data.Model',
    fields: [
		{name:'id'},
		{name:'sku'},
		{name:'name'},
		{name:'lot'},    
		{name:'qty',type:'float'},   
		{name:'targetQty'}, 
		{name:'lineNumber'},  	   		
		{name:'reasonCode'}
	],
    idProperty: 'id'
});

Ext.define('Redm.report.AdjustmentDetailGrid', {
    extend: 'Redm.BaseGrid',
    alias : 'widget.adjustmentDetailgrid',
    loadMask: true,
    forceLayout:true,
    autoLoad:false,
    buildColumns: function(){
        this.columns = [
			{ header: "行号", dataIndex: 'lineNumber', width: 80, sortable: true},
		    { header: "商品", dataIndex: 'sku', width: 90, sortable: true},
		    { header: "名称", dataIndex: 'name', width: 100, sortable: true},
		    { header: "批号", dataIndex: 'lot', width: 100, sortable: true},
		    { header: "调整前数量", dataIndex: 'qty', width: 130, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
			{ header: "调整后数量", dataIndex: 'targetQty', width: 130, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    { header: "调整原因", dataIndex: 'reasonCode', width: 100, sortable: true}
		];
		return true;
    },
	buildDockedItems: function(){
	   var me = this;
         var1PageSum = Ext.create('widget.tbtext',{
            text: '0',
            format: '0,000'
        });
        var2PageSum = Ext.create('widget.tbtext',{
            text: '0',
            format: '0,000'
        });
        var1AllSum = Ext.create('widget.tbtext',{
            text: '0',
            format: '0,000'
        });
        var2AllSum = Ext.create('widget.tbtext',{
            text: '0',
            format: '0,000'
        });
        this.dockedItems = [
               {
                xtype: 'pagingtoolbar',
                store: this.store, 
                dock: 'bottom',
                displayInfo: true,
                items:['-',{
                        xtype: 'label',
                        forId: 'myFieldId1',
                        text: '本页调整前数量:'
                    },var1PageSum,{
                        xtype: 'label',
                        forId: 'myFieldId2',
                        text: '本页调整后数量:'
                    },var2PageSum,
                    '-',{
                        xtype: 'label',
                        forId: 'myFieldId3',
                        text: '调整前总数量:'
                    },var1AllSum,{
                        xtype: 'label',
                        forId: 'myFieldId4',
                        text: '调整后总数量:'
                    },var2AllSum
                ]
            }
        ];
	},
    initComponent: function(){
    	var me = this;
    	this.buildStore(basePath + '/report/doQueryAdjustmentDetailInfo.action','AdjustmentDetail',20);
        this.callParent(arguments);
    }
});

Ext.define('Redm.report.AdjustmentDetail', {	
	extend: 'Ext.panel.Panel',
    alias : 'widget.adjustmentDetailmanager',
    title:'调整明细报表',
    layout:'border',
    initComponent: function(){
    	var me = this;
    	this.items = [this.createBottomPanel(),this.createTopPanel()];
        this.callParent(arguments);
    },
	
    onSelect: function(){
		var me = this;
		var storedKeyValue=me.selpanel.getForm().findField('storerKey').getValue();
        if(''==storedKeyValue)
        {
  			MessageBox.error('错误提示','请先输入货主！');
            return;
        }
        this.onQueryQtySum();
    	this.gridPanel.getStore().load();
    },	
 //查询总重量
    onQueryQtySum:function(){
        var me = this;
        var top = me.selpanel.getForm().getValues();
        
        var sku = top.sku;
        var storerKey = top.storerKey;
        var lot = top.lot;
        var addDate = top.addDate;
        var addDate1 = top.addDate1;
        
        Ext.Ajax.request({
                    url: basePath + '/report/doQueryAdjustmentDetailSum.action',
                    params: {
                        storerKey:storerKey,
                        sku:sku,
                        lot:lot,
                        addDate:addDate,
                        addDate1:addDate1
                    },
                    success: function(response){
                        var text = Ext.decode(response.responseText);
                        var success = text.success;
                        if(0 != text.json.data.length){
                            var var1sum=text.json.data[0].var1sum;
                            var var2sum=text.json.data[0].var2sum;
                            
                            if(null==var1sum || ""==var1sum){
                                var1sum=0;
                            }
                            if(null==var2sum || ""==var2sum){
                                var2sum=0;
                            }
                            var var1sumHtml = '<b><font color=green>'+Ext.util.Format.number(var1sum,'0,000')+'</font></b>';
                            var1AllSum.update(var1sumHtml);
                            
                            var var2sumHtml = '<b><font color=green>'+Ext.util.Format.number(var2sum,'0,000')+'</font></b>';
                            var2AllSum.update(var2sumHtml);
                        }
                    }
            });  
        },
        
	onReset: function(){
    	this.selpanel.getForm().reset();
    },
	//待修改
	onExport:function(){
		var me = this;
  		var top = me.selpanel.getForm().getValues();
		
		var sku = top.sku;
		var storerKey = top.storerKey;
		var lot = top.lot;
		var addDate = top.addDate;
		var addDate1 = top.addDate1;
		//导出excel格式的报表
		window.location.href = basePath+'/report/adjustmentDetailPOIExcel.action?string='+sku+","+storerKey+","+lot+","+addDate+","+addDate1;+","+addDate+","+addDate1;
    },
	
	//顶部面板
    createTopPanel: function(){
    	var me = this;
    	this.toppanel = Ext.create('Ext.panel.Panel',{
    		region: 'north',
    		layout: 'border',
    		height: 50,
    		border: false,
    		items:[this.createSelPanel()]
    	});
    	return this.toppanel;
    },
    //顶部查询面板
    createSelPanel: function(){
	var me = this;
    	this.selpanel = Ext.create('Ext.form.Panel',{
    		region: 'center',
    		frame: true,
    		layout: 'vbox',
    		border: false,
    		defaults: {
    			xtype: 'fieldcontainer',     //公共属性
    			margin: '9 0 0 5'
    		},
			items: [
                {
                    layout: 'hbox',
                    defaults: {
                        //xtype: 'combobox',
                        xtype: 'textfield',
                        margin: '5 0 0 5'
                    },
					items:[
						{
							xtype: 'textfield',
							labelWidth: 30,
							width: 140,
							name: 'storerKey',
							fieldLabel: '货主',
							listeners:{
								blur:function(txt){
									txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
								}
							}
						},
						{
							xtype: 'textfield',
							labelWidth: 30,
							width: 140,
							name: 'sku',
							fieldLabel: '商品',
							listeners:{
								blur:function(txt){
									txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
								}
							}
						},
						{
							xtype: 'textfield',
							labelWidth: 35,
							width: 140,
							name: 'lot',
							fieldLabel: '批号',
							listeners:{
								blur:function(txt){
									txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
								}
							}
						},
						{
							xtype: 'datefield',
                            format:'Y-m-d H:i:s',
							labelWidth: 60,
							width: 180,
							name: 'addDate',
							fieldLabel: '调整时间'
						},
						{
							xtype: 'datefield',
                            format:'Y-m-d H:i:s',
							labelWidth: 50,
							width: 180,
							name: 'addDate1',
							fieldLabel: '    ------>'
						},
						{
							xtype: 'button',
							 handler: me.onSelect,
							scope: this,
							iconCls: 'icon-search',
							text: '查询'
						},
						{
							xtype: 'button',
							handler: me.onReset,
							scope: this,
							iconCls: 'icon-reset',
							text: '重置'
						},
						{
							xtype: 'button',
							handler: this.onExport,
							scope: this,
							iconCls: 'icon-upload',
							text: '导出'
						}
					]
				}
			]
    	});
    	return this.selpanel;
    },
	//底部面板
    createBottomPanel: function(){
    	this.bottompanel = Ext.create('Ext.panel.Panel',{
    		region: 'center',
    		layout: 'border',
    		border: false,
    		items:[this.createGridPanel()]
    	});
    	return this.bottompanel;
    },
    //底部GRID
    createGridPanel:function(){
		var me = this;
    	this.gridPanel = Ext.create('widget.adjustmentDetailgrid',{
			region: 'center'
		});
		this.gridPanel.getStore().on({
           beforeload:{fn:function(store){
    		var params = this.gridPanel.getStore().getProxy().extraParams;
    		var record = me.selpanel.getForm().getValues();
    		
    		var sku = record.sku;
    		var storerKey = record.storerKey;
			var lot = record.lot;
			var addDate = record.addDate;
			var addDate1 = record.addDate1;
			
			delete params.sku;
			delete params.storerKey;
			delete params.lot;
			delete params.addDate;
			delete params.addDate1;
    		
			if(sku) params.sku = sku;
			if(storerKey) params.storerKey = storerKey;
			if(lot) params.lot = lot;
			if(addDate) params.addDate = addDate;
			if(addDate1) params.addDate1 = addDate1;
    	   },scope: this},
             //计算本页总数量
            load:{fn:function(store){
                //此处在本页添加四个值(Lee)
                    var var1Total = store.sum('qty');
                    var var1Html = '<b><font color=green>'+Ext.util.Format.number(var1Total,'0,000')+'</font></b>';
                    var1PageSum.update(var1Html);
                    //qtyExpectedPageSum.setText(exTotal);
                    var var2Total = store.sum('targetQty');
                    var var2Html = '<b><font color=green>'+Ext.util.Format.number(var2Total,'0,000')+'</font></b>';
                    var2PageSum.update(var2Html);
               /*     //qtyReceivedPageSum.setText(reTotal);
                    var var3Total = store.sum('qtyallocated');
                    var var3Html = '<b><font color=green>'+Ext.util.Format.number(var3Total,'0,000')+'</font></b>';
                    var3PageSum.update(var3Html);
                    var var4Total = store.sum('lottable15');
                    var var4Html = '<b><font color=green>'+Ext.util.Format.number(var4Total,'0,000')+'</font></b>';
                    var4PageSum.update(var4Html);*/
                },scope: this}
                }); 
		return this.gridPanel;
	}
});

Ext.onReady(function(){
	Ext.create('Ext.container.Viewport', {
	    layout: 'border',
	    items: [{
	    	xtype:'adjustmentDetailmanager',
	    	region:'center'
	    }]
	});
});