/***************************************
库龄分析报表  InventoryAge.js

****************************************/

Ext.define('InventoryAge', {
    extend: 'Ext.data.Model',
    fields: [
		{name:'rownum'},
		{name:'id'},
		{name:'storerKey'},
		{name:'sku'},
		{name:'name'},      
		{name:'qty',type:'float'},
		{name:'qtyallocated',type:'float'},    
		{name:'lottable01'},      
		{name:'lottable02'},    
		{name:'lottable03'},    		
		{name:'lottable04'},
		{name:'lottable05'},      
		{name:'lottable06'},    
		{name:'lottable07'},    		
		{name:'lottable08'},
		{name:'lottable09'},    
		{name:'lottable10'},    		
		{name:'lottable11'},
		{name:'lottable12'},
		{name:'lottable13'},    		
		{name:'lottable14'},
		{name:'lottable15',type:'float'},
		{name:'inventoryAge',type:'float'}
	],
    idProperty: 'id'
});

Ext.define('Redm.report.InventoryAgeGrid', {
    extend: 'Redm.BaseGrid',
    alias : 'widget.inventoryAgegrid',
    loadMask: true,
    autoLoad:false,
    forceLayout:true,
    buildColumns: function(){
        this.columns = [
			{ header: "行号", dataIndex: 'rownum', width: 80, sortable: true},
			{ header: "货主", dataIndex: 'storerKey', width: 90, sortable: true},
		    { header: "商品", dataIndex: 'sku', width: 90, sortable: true},
			{ header: "名称", dataIndex: 'name', width: 100, sortable: true},
			{ header: "库龄(天数)", dataIndex: 'inventoryAge', width: 90, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    { header: "数量", dataIndex: 'qty', width: 100, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    { header: "已分配数量", dataIndex: 'qtyallocated', width: 100, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
			{ header: "收货日期", dataIndex: 'lottable01', width: 100, sortable: true,renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
		    { header: "生产日期", dataIndex: 'lottable02', width: 100, sortable: true,renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
		    { header: "失效日期", dataIndex: 'lottable03', width: 100, sortable: true,renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
			{ header: "生产批号", dataIndex: 'lottable04', width: 100, sortable: true},
		    { header: "托盘号", dataIndex: 'lottable05', width: 100, sortable: true},
			{ header: "成品卷号", dataIndex: 'lottable06', width: 100, sortable: true},
		    { header: "等级", dataIndex: 'lottable07', width: 100, sortable: true},
		    { header: "外观代码", dataIndex: 'lottable08', width: 100, sortable: true},
			{ header: "表面处理", dataIndex: 'lottable09', width: 100, sortable: true},
			{ header: "规格", dataIndex: 'lottable10', width: 100, sortable: true},
			{ header: "包装形式", dataIndex: 'lottable11', width: 100, sortable: true},
			{ header: "ASN号", dataIndex: 'lottable12', width: 100, sortable: true},
			{ header: "反射率", dataIndex: 'lottable13', width: 100, sortable: true},
			{ header: "极差", dataIndex: 'lottable14', width: 100, sortable: true},
			{ header: "重量", dataIndex: 'lottable15', width: 100, sortable: true}
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
        var3PageSum = Ext.create('widget.tbtext',{
            text: '0',
            format: '0,000'
        });
        var4PageSum = Ext.create('widget.tbtext',{
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
        var3AllSum = Ext.create('widget.tbtext',{
            text: '0',
            format: '0,000'
        });
       var4AllSum = Ext.create('widget.tbtext',{
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
                        text: '本页库龄(天数):'
                    },var1PageSum,{
                        xtype: 'label',
                        forId: 'myFieldId2',
                        text: '本页数量:'
                    },var2PageSum,{
                        xtype: 'label',
                        forId: 'myFieldId1',
                        text: '本页已分配数量：'
                    },var3PageSum,{
                        xtype: 'label',
                        forId: 'myFieldId1',
                        text: '本页重量:'
                    },var4PageSum,
                    '-',{
                        xtype: 'label',
                        forId: 'myFieldId3',
                        text: '总库龄(天数):'
                    },var1AllSum,{
                        xtype: 'label',
                        forId: 'myFieldId4',
                        text: '总数量:'
                    },var2AllSum,{
                        xtype: 'label',
                        forId: 'myFieldId4',
                        text: '总分配数量:'
                    },var3AllSum,{
                        xtype: 'label',
                        forId: 'myFieldId4',
                        text: '总重量:'
                    },var4AllSum
                ]
            }
        ];
	},
    initComponent: function(){
    	var me = this;
    	this.buildStore(basePath + '/report/doQueryInventoryAgeInfo.action','InventoryAge',20);
        this.callParent(arguments);
    }
});

Ext.define('Redm.report.InventoryAgeTab', {	
	extend: 'Ext.panel.Panel',
    alias : 'widget.inventoryAgemanager',
    title:'库龄分析报表',
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
        
        
        Ext.Ajax.request({
                    url: basePath + '/report/doQueryInventoryAgeReportInfoSum.action',
                    params: {
                        storerKey:storerKey,
                        sku:sku
                    },
                    success: function(response){
                        var text = Ext.decode(response.responseText);
                        var success = text.success;
                        if(0 != text.json.data.length){
                            var var1sum=text.json.data[0].var1sum;
                            var var2sum=text.json.data[0].var2sum;
                            var var3sum = text.json.data[0].var3sum;
                            var var4sum=text.json.data[0].var4sum;
                            
                            if(null==var1sum || ""==var1sum){
                                var1sum=0;
                            }
                            if(null==var2sum || ""==var2sum){
                                var2sum=0;
                            }
                            if(null==var3sum || ""==var3sum){
                                var3sum=0;
                            }
                            if(null==var4sum || ""==var4sum){
                                var4sum=0;
                            }
                            var var1sumHtml = '<b><font color=green>'+Ext.util.Format.number(var1sum,'0,000')+'</font></b>';
                            var1AllSum.update(var1sumHtml);
                            
                            var var2sumHtml = '<b><font color=green>'+Ext.util.Format.number(var2sum,'0,000')+'</font></b>';
                            var2AllSum.update(var2sumHtml);
                            
                            var var3sumHtml = '<b><font color=green>'+Ext.util.Format.number(var3sum,'0,000')+'</font></b>';
                            var3AllSum.update(var3sumHtml);
                            
                            var var4sumHtml = '<b><font color=green>'+Ext.util.Format.number(var4sum,'0,000')+'</font></b>';
                            var4AllSum.update(var4sumHtml);
                            
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
	
		//导出excel格式的报表
		window.location.href = basePath+'/report/inventoryAgePOIExcel.action?string='+sku+","+storerKey;
    },
	
	//顶部面板
    createTopPanel: function(){
    	var me = this;
    	this.toppanel = Ext.create('Ext.panel.Panel',{
    		region: 'north',
    		layout: 'border',
    		height: '10%',
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
    			xtype: 'fieldcontainer',
    			margin: '5 0 0 5'
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
							labelWidth: 60,
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
							labelWidth: 50,
							name: 'sku',
							fieldLabel: '商品',
							listeners:{
								blur:function(txt){
									txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
								}
							}
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
    	this.gridPanel = Ext.create('widget.inventoryAgegrid',{
			region: 'center'
		});
		this.gridPanel.getStore().on({
           beforeload:{fn:function(store){
    		var params = this.gridPanel.getStore().getProxy().extraParams;
    		var record = me.selpanel.getForm().getValues();
    		
    		var sku = record.sku;
			var storerKey = record.storerKey;
			
			delete params.sku;
			delete params.storerKey;
			
			if(sku) params.sku = sku;
			if(storerKey) params.storerKey = storerKey;
    	   },scope: this},
             //计算本页总数量
            load:{fn:function(store){
                //此处在本页添加四个值(Lee)
                    var var1Total = store.sum('inventoryAge');
                    var var1Html = '<b><font color=green>'+Ext.util.Format.number(var1Total,'0,000')+'</font></b>';
                    var1PageSum.update(var1Html);
                    //qtyExpectedPageSum.setText(exTotal);
                    var var2Total = store.sum('qty');
                    var var2Html = '<b><font color=green>'+Ext.util.Format.number(var2Total,'0,000')+'</font></b>';
                    var2PageSum.update(var2Html);
                    //qtyReceivedPageSum.setText(reTotal);
                    var var3Total = store.sum('qtyallocated');
                    var var3Html = '<b><font color=green>'+Ext.util.Format.number(var3Total,'0,000')+'</font></b>';
                    var3PageSum.update(var3Html);
                    var var4Total = store.sum('lottable15');
                    var var4Html = '<b><font color=green>'+Ext.util.Format.number(var4Total,'0,000')+'</font></b>';
                    var4PageSum.update(var4Html);
                },scope: this}
                }); 
		return this.gridPanel;
	}
});

Ext.onReady(function(){
	Ext.create('Ext.container.Viewport', {
	    layout: 'border',
	    items: [{
	    	xtype:'inventoryAgemanager',
	    	region:'center'
	    }]
	});
});