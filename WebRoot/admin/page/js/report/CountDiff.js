/***************************************
盘点差异报表  CountDiff.js

****************************************/

Ext.define('CountDiff', {
    extend: 'Ext.data.Model',
    fields: [
		{name:'id'},
		{name:'countKey'},//盘点单号
		{name:'sku'},//商品
		{name:'name'},//中文品名
		{name:'dstatus'},//状态
		{name:'packKey'},//包装
		{name:'uom'},//单位            
		{name:'qty',type:'float'}, //库存数 
		{name:'countqty',type:'float'}, //盘点数 
		{name:'qtydiff',type:'float'},  //差异数 
		{name:'lottable04'}, //盘点数 
		{name:'lottable11'},  //差异数 
		{name:'firstQty'}, 
		{name:'secondQty'},
		{name:'loc'},
		{name:'desea'},
		{name:'countKey'}
	],
    idProperty: 'id'
});

Ext.define('Redm.report.CountDiffGrid', {
    extend: 'Redm.BaseGrid',
    alias : 'widget.countDiffgrid',
    loadMask: true,
    forceLayout:true,
	autoLoad:false,
    buildColumns: function(){
        this.columns = [
			{ header: "行号", dataIndex: 'id', width: 80, sortable: true},
		    { header: "盘点单号", dataIndex: 'countKey', width: 90, sortable: true},
		    { header: "商品", dataIndex: 'sku', width: 90, sortable: true},
		    { header: "中文品名", dataIndex: 'name', width: 100, sortable: true},
//		    { header: "批属性04", dataIndex: 'lottable04', width: 100, sortable: true},
//		    { header: "包装", dataIndex: 'packKey', width: 100, sortable: true},
//			{ header: "单位", dataIndex: 'desea', width: 100, sortable: true},
			{ header: "库存数", dataIndex: 'qty', width: 100, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    { header: "盘点数", dataIndex: 'countqty', width: 100, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    { header: "差异数", dataIndex: 'qtydiff', width: 100, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')}
		];
		return true;
    },
       buildDockedItems: function(){
        var me = this;
        qtyPageSum = Ext.create('widget.tbtext',{
            text: '0',
            format: '0,000'
        });
        countqtyPageSum = Ext.create('widget.tbtext',{
            text: '0',
            format: '0,000'
        });
        qtydiffPageSum = Ext.create('widget.tbtext',{
            text: '0',
            format: '0,000'
        });
        qtySum = Ext.create('widget.tbtext',{
            text: '0',
            format: '0,000'
        });
        countqtySum = Ext.create('widget.tbtext',{
            text: '0',
            format: '0,000'
        });
        qtydiffSum = Ext.create('widget.tbtext',{
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
                        text: '本页库存数：'
                    },qtyPageSum,{
                        xtype: 'label',
                        forId: 'myFieldId2',
                        text: '，本页盘点数：'
                    },countqtyPageSum,
                    '-',{
                        xtype: 'label',
                        forId: 'myFieldId1',
                        text: '本页差异数：'
                    },qtydiffPageSum,
                    '-',{
                        xtype: 'label',
                        forId: 'myFieldId3',
                        text: '总库存数：'
                    },qtySum,{
                        xtype: 'label',
                        forId: 'myFieldId4',
                        text: '，总盘点数：'
                    },countqtySum,{
                        xtype: 'label',
                        forId: 'myFieldId4',
                        text: '，总差异数：'
                    },qtydiffSum
                ]
            }
        ];
    },
    initComponent: function(){
    	var me = this;
		this.buildStore(basePath + '/report/doQueryCountDiffInfo.action','CountDiff',20);
		this.callParent(arguments);
    }
});

Ext.define('Redm.report.CountDiff', {	
	extend: 'Ext.panel.Panel',
    alias : 'widget.countDiffmanager',
    title:'盘点差异报表',
    layout:'border',
    initComponent: function(){
    	var me = this;
    	this.items = [this.createBottomPanel(),this.createTopPanel()];
        this.callParent(arguments);
    },
	
     // this.onQueryQtySum()为查询grid显示的总数的方法(Lee)
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
	onReset: function(){
    	this.selpanel.getForm().reset();
    },
	//待修改
	onExport:function(){
		var me = this;
  		var top = me.selpanel.getForm().getFieldValues();
		
        var storerKey = top.storerKey;
        var countKey = top.countKey;
		var sku = top.sku;
	
		//导出excel格式的报表
		window.location.href = basePath+'/report/countDiffReportExcel.action?string='+storerKey+","+countKey+","+sku;
    },
    //查询总重量
	onQueryQtySum:function(){
        var me = this;
        //计算总数量，有问题，待解决
        var top = me.selpanel.getForm().getFieldValues();
        var storerKey = top.storerKey;
        var countKey = top.countKey;
        var sku = top.sku;
        Ext.Ajax.request({
                    url: basePath + '/report/doQueryCountDiffInfoSum.action',
                    params: {
                        storerKey:storerKey,
                        countKey:countKey,
                        sku:sku
                    },
                    success: function(response){
                        var text = Ext.decode(response.responseText);
                        var success = text.success;
                        if(0 != text.json.data.length){
                            var qtysum=text.json.data[0].qtysum;
                            var countqtysum=text.json.data[0].countqtysum;
                            var qtydiffsum=text.json.data[0].qtydiffsum;
                            
                            if(null==qtysum || ""==qtysum){
                                qtysum=0;
                            }
                            if(null==countqtysum || ""==countqtysum){
                                countqtysum=0;
                            }
                            if(null==qtydiffsum || ""==qtydiffsum){
                                qtydiffsum=0;
                            }
                            var qtytotalHtml = '<b><font color=green>'+Ext.util.Format.number(qtysum,'0,000')+'</font></b>';
                            qtySum.update(qtytotalHtml);
                            
                            var countqtytotalHtml = '<b><font color=green>'+Ext.util.Format.number(countqtysum,'0,000')+'</font></b>';
                            countqtySum.update(countqtytotalHtml);
                            
                            var qtydifftotalHtml = '<b><font color=green>'+Ext.util.Format.number(qtydiffsum,'0,000')+'</font></b>';
                            qtydiffSum.update(qtydifftotalHtml);
                            
                        }
                    }
            });  
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
                    labelWidth: 60,
                    name: 'countKey',
                    fieldLabel: '盘点单号',
					listeners:{
								blur:function(txt){
									txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
								}
					}
                },
                {
                    xtype: 'textfield',
                    labelWidth: 30,
                    name: 'sku',
                    fieldLabel: '商品',
                    listeners:{
								blur:function(txt){
									txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
								}
					}
                },                
/*				{
                    xtype: 'textfield',
                    labelWidth: 60,
                    name: 'lottable04',
                    fieldLabel: '批属性04',
                },*/
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
             //以下方法可能不需要使用，后面再看(Lee)
            /*    ,
                {
                    xtype: 'button',
                    handler: this.onQueryQtySum,
                    scope: this,
                    iconCls: 'icon-search',
                    text: '查询总数量'
                }*/
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
    	this.gridPanel = Ext.create('widget.countDiffgrid',{
			region: 'center'
		});
		  this.gridPanel.getStore().on({
             beforeload:{fn:function(store){
             var params = this.gridPanel.getStore().getProxy().extraParams;
             var record = me.selpanel.getForm().getValues();
            
             var storerKey = record.storerKey;
             var countKey = record.countKey;
             var sku = record.sku;
          //  var lottable04 = record.lottable04;

            
             delete params.storerKey;
             delete params.countKey;
             delete params.sku;
        //  delete params.lottable04;
            
             if(storerKey) params.storerKey = storerKey;
             if(countKey) params.countKey = countKey;
             if(sku) params.sku = sku;
             },scope: this},
            //计算本页总数量
             load:{fn:function(store){
                var qtyTotal = store.sum('qty');
                var qtyTotalHtml = '<b><font color=green>'+Ext.util.Format.number(qtyTotal,'0,000')+'</font></b>';
                qtyPageSum.update(qtyTotalHtml);
                //qtyExpectedPageSum.setText(exTotal);
                var countqtyTotal = store.sum('countqty');
                var countqtytotalHtml = '<b><font color=green>'+Ext.util.Format.number(countqtyTotal,'0,000')+'</font></b>';
                countqtyPageSum.update(countqtytotalHtml);
                //qtyReceivedPageSum.setText(reTotal);
                var qtydiffTotal = store.sum('qtydiff');
                var qtydifftotalHtml = '<b><font color=green>'+Ext.util.Format.number(qtydiffTotal,'0,000')+'</font></b>';
                qtydiffPageSum.update(qtydifftotalHtml);
                //qtyReceivedPageSum.setText(reTotal);
            },scope: this}
        });
		return this.gridPanel;
	}
});

Ext.onReady(function(){
	Ext.create('Ext.container.Viewport', {
	    layout: 'border',
	    items: [{
	    	xtype:'countDiffmanager',
	    	region:'center'
	    }]
	});
});