/***************************************
库位利用率 LocationUseRate.js

****************************************/

Ext.define('LocData', {
    extend: 'Ext.data.Model',
    fields: [
		{name:'id'},
		{name:'putawayZone'},
		{name:'leng'},
		{name:'width',type:'float'},
		{name:'height',type:'float'},
		{name:'palletQty'},
		{name:'loc'},
		{name:'putawaySeq'},
		{name:'picSeq'},
		{name:'locationType'},
		{name:'locationCategory'},
		{name:'locationFlag'},
		{name:'locationHandling'},
		{name:'abc'},
		{name:'pickZone'},
		{name:'section'},
		{name:'level'},
		{name:'cube'},
		{name:'weight',type:'float'},
		{name:'pcsQty'},
		{name:'caseQty'},
		{name:'commingleLot'},
		{name:'commingleSku'},
		{name:'loseId'}
	],
    idProperty: 'id'
});

Ext.define('Redm.report.LocationUseRateGrid', {
    extend: 'Redm.BaseGrid',
    alias : 'widget.locationUseRategrid',
    autoLoad:false,
    buildColumns: function(){
        this.columns = [
			{ header: "行号", dataIndex: 'id', width: 80, sortable: true},
		    { header: "库区", dataIndex: 'putawayZone', width: 90, sortable: true},
		    { header: "有效托数", dataIndex: 'height', width: 100, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    { header: "使用托数", dataIndex: 'weight', width: 100, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    { header: "库位利用率(%)", dataIndex: 'leng', width: 100, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')}
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
     /*   var3PageSum = Ext.create('widget.tbtext',{
            text: '0',
            format: '0,000'
        });
        var4PageSum = Ext.create('widget.tbtext',{
           text: '0',
           format: '0,000'
        });*/
        var1AllSum = Ext.create('widget.tbtext',{
            text: '0',
            format: '0,000'
        });
        var2AllSum = Ext.create('widget.tbtext',{
            text: '0',
            format: '0,000'
        });
     /*   var3AllSum = Ext.create('widget.tbtext',{
            text: '0',
            format: '0,000'
        });
       var4AllSum = Ext.create('widget.tbtext',{
           text: '0',
            format: '0,000'
       });*/
        this.dockedItems = [
               {
                xtype: 'pagingtoolbar',
                store: this.store, 
                dock: 'bottom',
                displayInfo: true,
                items:['-',{
                        xtype: 'label',
                        forId: 'myFieldId1',
                        text: '本页有效托数:'
                    },var1PageSum,{
                        xtype: 'label',
                        forId: 'myFieldId2',
                        text: '本页使用托数:'
                    },var2PageSum,
                 /*   {
                        xtype: 'label',
                        forId: 'myFieldId1',
                        text: '本页已分配数量：'
                    },var3PageSum,{
                        xtype: 'label',
                        forId: 'myFieldId1',
                        text: '本页重量:'
                    },var4PageSum,*/
                    '-',{
                        xtype: 'label',
                        forId: 'myFieldId3',
                        text: '总有效托数:'
                    },var1AllSum,{
                        xtype: 'label',
                        forId: 'myFieldId4',
                        text: '总使用托数:'
                    },var2AllSum
                 /*   ,{
                        xtype: 'label',
                        forId: 'myFieldId4',
                        text: '总分配数量:'
                    },var3AllSum,{
                        xtype: 'label',
                        forId: 'myFieldId4',
                        text: '总重量:'
                    },var4AllSum*/
                ]
            }
        ];
	},
	initComponent: function(){
		var me = this;
		this.buildStore(basePath + '/report/doQueryLocationUseRateInfo.action','LocData',20);
		this.callParent(arguments);
    }
});

Ext.define('Redm.report.LocationUseRate', {	
	extend: 'Ext.panel.Panel',
    alias : 'widget.locationUseRatemanager',
    title:'库位利用率',
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
        
        var putawayZone = top.putawayZone;
        var storerKey = top.storerKey;
        
        Ext.Ajax.request({
                    url: basePath + '/report/doQueryLocationUseRateSum.action',
                    params: {
                        putawayZone:putawayZone,
                        storerKey:storerKey
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
	
	onExport:function(){
		var me = this;
  		var top = me.selpanel.getForm().getValues();
		
		var putawayZone = top.putawayZone;
		var storerKey = top.storerKey;
		
		//导出excel格式的报表
		window.location.href = basePath+'/report/locUseRateReportExcel.action?string='+putawayZone+','+storerKey;
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
    		layout: 'hbox',
    		border: false,
    		height: 50,
    		defaults: {
    			xtype: 'fieldcontainer',     //公共属性
    			margin: '9 0 0 5'
    		},
    		items:[
				{
                    xtype: 'textfield',
                    labelWidth: 35,
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
                    labelWidth: 35,
                    name: 'putawayZone',
                    fieldLabel: '库区',
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
    	this.gridPanel = Ext.create('widget.locationUseRategrid',{
			region: 'center'
		});
	   this.gridPanel.getStore().on({
           beforeload:{fn:function(store){
    		var params = this.gridPanel.getStore().getProxy().extraParams;
    		var record = me.selpanel.getForm().getFieldValues();
			
    		var putawayZone = record.putawayZone;
			var storerKey = record.storerKey;
			delete params.putawayZone;
			delete params.storerKey;
    		
			if(putawayZone) params.putawayZone = putawayZone;
			if(storerKey) params.storerKey = storerKey;
    	   },scope: this},
             //计算本页总数量
            load:{fn:function(store){
                //此处在本页添加四个值(Lee)
                    var var1Total = store.sum('height');
                    var var1Html = '<b><font color=green>'+Ext.util.Format.number(var1Total,'0,000')+'</font></b>';
                    var1PageSum.update(var1Html);
                    //qtyExpectedPageSum.setText(exTotal);
                    var var2Total = store.sum('weight');
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
	    	xtype:'locationUseRatemanager',
	    	region:'center'
	    }]
	});
});