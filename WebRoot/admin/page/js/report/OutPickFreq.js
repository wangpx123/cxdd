/***************************************
出库拣货频率报表 OutPickFreq.js

****************************************/

Ext.define('OutPickFreq', {
    extend: 'Ext.data.Model',
    fields: [
		{name:'id'},
		{name:'putawayZone'},
		{name:'loc'},
		{name:'qty',type:'float'}
	],
    idProperty: 'id'
});

Ext.define('Redm.support.OutPickFreqGrid', {
    extend: 'Redm.BaseGrid',
    alias : 'widget.outPickFreqgrid',
    loadMask: true,
    forceLayout:true,
    autoLoad:false,
    buildColumns: function(){
        this.columns = [
			{ header: "行号", dataIndex: 'id', width: 80, sortable: true},
		    { header: "库区", dataIndex: 'putawayZone', width: 90, sortable: true},
		    { header: "库位", dataIndex: 'loc', width: 100, sortable: true},
		    { header: "拣货次数", dataIndex: 'qty', width: 100, sortable: true}
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
                        text: '本页拣货次数:'
                    },var1PageSum,
                    '-',{
                        xtype: 'label',
                        forId: 'myFieldId3',
                        text: '拣货总次数:'
                    },var1AllSum
                ]
            }
        ];
	},
    initComponent: function(){
    	var me = this;
    	this.buildStore(basePath + '/report/doQueryOutPickFreqInfo.action','OutPickFreq',20);
        this.callParent(arguments);
    }
});

Ext.define('Redm.support.OutPickFreq', {	
	extend: 'Ext.panel.Panel',
    alias : 'widget.outPickFreqmanager',
    title:'出库拣货频率报表',
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
        var storerKey = top.storerKey;
        var putawayZone = top.putawayZone;
        var loc = top.loc;
        var startDate = top.startDate;
        var endDate = top.endDate;
        
        
        Ext.Ajax.request({
                    url: basePath + '/report/doQueryOutPickFreqSum.action',
                    params: {
                        storerKey:storerKey,
                        putawayZone:putawayZone,
                        loc:loc,
                        startDate:startDate,
                        endDate:endDate
                    },
                    success: function(response){
                        var text = Ext.decode(response.responseText);
                        var success = text.success;
                        if(0 != text.json.data.length){
                            var var1sum=text.json.data[0].var1sum;
                        /*    var var2sum=text.json.data[0].var2sum;
                            var var3sum = text.json.data[0].var3sum;
                            var var4sum=text.json.data[0].var4sum;
                            */
                            if(null==var1sum || ""==var1sum){
                                var1sum=0;
                            }
                         /*   if(null==var2sum || ""==var2sum){
                                var2sum=0;
                            }
                            if(null==var3sum || ""==var3sum){
                                var3sum=0;
                            }
                            if(null==var4sum || ""==var4sum){
                                var4sum=0;
                            }*/
                            var var1sumHtml = '<b><font color=green>'+Ext.util.Format.number(var1sum,'0,000')+'</font></b>';
                            var1AllSum.update(var1sumHtml);
                            
                        /*    var var2sumHtml = '<b><font color=green>'+Ext.util.Format.number(var2sum,'0,000')+'</font></b>';
                            var2AllSum.update(var2sumHtml);
                            
                            var var3sumHtml = '<b><font color=green>'+Ext.util.Format.number(var3sum,'0,000')+'</font></b>';
                            var3AllSum.update(var3sumHtml);
                            
                            var var4sumHtml = '<b><font color=green>'+Ext.util.Format.number(var4sum,'0,000')+'</font></b>';
                            var4AllSum.update(var4sumHtml);*/
                            
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
		var storerKey = top.storerKey;
		var putawayZone = top.putawayZone;
		var loc = top.loc;
		var startDate = top.startDate;
		var endDate = top.endDate;
		//导出excel格式的报表
		window.location.href = basePath+'/report/outPickFreqPOIExcel.action?string='+storerKey+','+putawayZone+","+loc+","+startDate+","+endDate;
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
                    labelWidth: 30,
					width: 145,
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
					width: 145,
                    name: 'putawayZone',
                    fieldLabel: '库区',              
                    listeners:{
                        blur:function(txt){
							txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
						}
                    }
                },
				{
                    xtype: 'textfield',
                    labelWidth: 30,
					width: 145,
                    name: 'loc',
                    fieldLabel: '库位',
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
					name: 'startDate',
					fieldLabel: '拣货时间'
				},
				{
					xtype: 'datefield',
                    format:'Y-m-d H:i:s',
					labelWidth: 50,
					width: 180,
					name: 'endDate',
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
    	this.gridPanel = Ext.create('widget.outPickFreqgrid',{
			region: 'center'
		});
		this.gridPanel.getStore().on({
           beforeload:{fn:function(store){
    		var params = this.gridPanel.getStore().getProxy().extraParams;
    		var record = me.selpanel.getForm().getValues();
    		
			var storerKey = record.storerKey;
    		var putawayZone = record.putawayZone;
			var loc = record.loc;
			var startDate = record.startDate;
			var endDate = record.endDate;
			
			delete params.storerKey;
			delete params.putawayZone;
			delete params.loc;
			delete params.startDate;
			delete params.endDate;
    		
			if(storerKey) params.storerKey = storerKey;
			if(putawayZone) params.putawayZone = putawayZone;
			if(loc) params.loc = loc;
			if(startDate) params.startDate = startDate;
			if(endDate) params.endDate = endDate;
         },scope: this},
             //计算本页总数量
            load:{fn:function(store){
                //此处在本页添加四个值(Lee)
                    var var1Total = store.sum('qty');
                    var var1Html = '<b><font color=green>'+Ext.util.Format.number(var1Total,'0,000')+'</font></b>';
                    var1PageSum.update(var1Html);
                 /*   //qtyExpectedPageSum.setText(exTotal);
                    var var2Total = store.sum('qty');
                    var var2Html = '<b><font color=green>'+Ext.util.Format.number(var2Total,'0,000')+'</font></b>';
                    var2PageSum.update(var2Html);
                    //qtyReceivedPageSum.setText(reTotal);
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
	    	xtype:'outPickFreqmanager',
	    	region:'center'
	    }]
	});
});