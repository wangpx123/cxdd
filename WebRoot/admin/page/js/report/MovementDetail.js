/***************************************
移库明细报表  MovementDetail.js

****************************************/

Ext.define('MoveDetail', {
    extend: 'Ext.data.Model',
    fields: [
		{name:'id'},
		{name:'sku'},
		{name:'name'},
		{name:'storerKey'},
		{name:'lot'},    
		{name:'fromloc'},      
		{name:'toloc'},    
		{name:'qtyMoved',type:'float'},  
		{name:'lineNumber'},  		
		{name:'reasonCode'}
	],
    idProperty: 'id'
});

Ext.define('Redm.report.MovementDetailGrid', {
    extend: 'Redm.BaseGrid',
    alias : 'widget.movementDetailgrid',
    loadMask: true,
    autoLoad:false,
    forceLayout:true,
    buildColumns: function(){
        this.columns = [
			{ header: "行号", dataIndex: 'lineNumber', width: 80, sortable: true},
		    { header: "商品", dataIndex: 'sku', width: 90, sortable: true},
		    { header: "名称", dataIndex: 'name', width: 100, sortable: true},
		    { header: "批号", dataIndex: 'lot', width: 100, sortable: true},
		    { header: "原库位", dataIndex: 'fromloc', width: 100, sortable: true},
			{ header: "现库位", dataIndex: 'toloc', width: 100, sortable: true},
		    { header: "数量", dataIndex: 'qtyMoved', width: 100, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    { header: "移库原因", dataIndex: 'reasonCode', width: 100, sortable: true}
		];
		return true;
    },
	buildDockedItems: function(){
		var me = this;
        var1PageSum = Ext.create('widget.tbtext',{
            text: '0',
            format: '0,000'
        });
        var1AllSum = Ext.create('widget.tbtext',{
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
                        text: '本页数量:'
                    },var1PageSum,
                    '-',{
                        xtype: 'label',
                        forId: 'myFieldId3',
                        text: '总数量:'
                    },var1AllSum
                ]
            }
        ];
	},
    initComponent: function(){
    	var me = this;
    	this.buildStore(basePath + '/report/doQueryMovementDetailInfo.action','MoveDetail',20);
        this.callParent(arguments);
    }
});

Ext.define('Redm.report.MovementDetail', {	
	extend: 'Ext.panel.Panel',
    alias : 'widget.movementDetailmanager',
    title:'移库明细报表',
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
        var fromloc = top.fromloc;
        var toloc = top.toloc;
        var addDate = top.addDate;
        var addDate1 = top.addDate1;
        
        Ext.Ajax.request({
                    url: basePath + '/report/doQueryMovementDatailSum.action',
                    params: {
                        storerKey:storerKey,
                        sku:sku,
                        fromloc:fromloc,
                        toloc:toloc,
                        addDate:addDate,
                        addDate1:addDate1
                    },
                    success: function(response){
                        var text = Ext.decode(response.responseText);
                        var success = text.success;
                        if(0 != text.json.data.length){
                            var var1sum=text.json.data[0].var1sum;
                            if(null==var1sum || ""==var1sum){
                                var1sum=0;
                            }
                            var var1sumHtml = '<b><font color=green>'+Ext.util.Format.number(var1sum,'0,000')+'</font></b>';
                            var1AllSum.update(var1sumHtml);
                            
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
		var fromloc = top.fromloc;
		var toloc = top.toloc;
		var addDate = top.addDate;
		var addDate1 = top.addDate1;
	
		//导出excel格式的报表
		window.location.href = basePath+'/report/movementDetailPOIExcel.action?string='+sku+","+storerKey+","+lot+","+fromloc+","+toloc+","+addDate+","+addDate1;
    },
	
	//顶部面板
    createTopPanel: function(){
    	var me = this;
    	this.toppanel = Ext.create('Ext.panel.Panel',{
    		region: 'north',
    		layout: 'border',
    		height: 90,
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
							xtype: 'textfield',
							labelWidth: 35,
							name: 'lot',
							fieldLabel: '批号',
							listeners:{
								blur:function(txt){
									txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
								}
							}
						},
						{
							xtype: 'textfield',
							labelWidth: 40,
							name: 'fromloc',
							fieldLabel: '原库位',
							listeners:{
								blur:function(txt){
									txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
								}
							}
						},
						{
							xtype: 'textfield',
							labelWidth: 40,
							name: 'toloc',
							fieldLabel: '现库位',
							listeners:{
								blur:function(txt){
									txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
								}
							}
						}
					]
				},
				{
                    layout: 'hbox',
                    defaults: {
                        xtype: 'textfield',
                        margin: '5 0 0 5'
                    },
					items:[
						{
							xtype: 'datefield',
                            format:'Y-m-d H:i:s',
							labelWidth: 60,
							width: 194,
							name: 'addDate',
							fieldLabel: '移库时间'
						},
						{
							xtype: 'datefield',
                            format:'Y-m-d H:i:s',
							labelWidth: 50,
							width: 183,
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
    	this.gridPanel = Ext.create('widget.movementDetailgrid',{
			region: 'center'
		});
		this.gridPanel.getStore().on({
           beforeload:{fn:function(store){
    		var params = this.gridPanel.getStore().getProxy().extraParams;
    		var record = me.selpanel.getForm().getValues();
    		
    		var sku = record.sku;
			var storerKey = record.storerKey;
			var lot = record.lot;
			var fromloc = record.fromloc;
			var toloc = record.toloc;
			var addDate = record.addDate;
			var addDate1 = record.addDate1;
			
			delete params.sku;
			delete params.storerKey;
			delete params.lot;
			delete params.fromloc;
			delete params.toloc;
			delete params.addDate;
			delete params.addDate1;
    		
			if(sku) params.sku = sku;
			if(storerKey) params.storerKey = storerKey;
			if(lot) params.lot = lot;
			if(fromloc) params.fromloc = fromloc;
			if(toloc) params.toloc = toloc;
			if(addDate) params.addDate = addDate;
			if(addDate1) params.addDate1 = addDate1;
    	   },scope: this},
             //计算本页总数量
            load:{fn:function(store){
                //此处在本页添加四个值(Lee)
                    var var1Total = store.sum('qtyMoved');
                    var var1Html = '<b><font color=green>'+Ext.util.Format.number(var1Total,'0,000')+'</font></b>';
                    var1PageSum.update(var1Html);
                },scope: this}
                }); 
		return this.gridPanel;
	}
});

Ext.onReady(function(){
	Ext.create('Ext.container.Viewport', {
	    layout: 'border',
	    items: [{
	    	xtype:'movementDetailmanager',
	    	region:'center'
	    }]
	});
});