/*************************************************
交易日志

*************************************************/

Ext.define('Itrn', {
    extend: 'Ext.data.Model',
    fields: [
		{name:'id'},
		{name:'trantype'},
		{name:'storerKey'},            
		{name:'sku'},     
		{name:'lot'},  
		{name:'fromloc'},
		{name:'fromid'},
		{name:'toloc'},
		{name:'toid'},
		{name:'sourcekey'},
		{name:'sourceline'},
		{name:'qty',type:'float'},
		{name:'sourcetype'},
		{name:'lottable01',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
		{name:'lottable02',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
		{name:'lottable03',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
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
		{name:'lottable15'},
		{name:'lottable16'},
		{name:'lottable17'},
		{name:'lottable18'},
		{name:'lottable19'},
		{name:'lottable20'}
	],
    idProperty: 'id'
});

Ext.define('Redm.inventory.ItrnGrid', {
    extend: 'Redm.BaseGrid',
    alias : 'widget.itrngrid',
    loadMask: true,
    forceLayout:true,
    autoLoad:false,
    buildColumns: function(){
        this.columns = [
		    
    		{ header: "交易类型", dataIndex: 'trantype', width: 100, sortable: true,
                renderer:this.rendererStateFunc
            },
		    { header: "货主", dataIndex: 'storerKey', width: 100, sortable: true},
		    { header: "商品", dataIndex: 'sku', width: 100, sortable: true},
		    { header: "批次", dataIndex: 'lot', width: 100, sortable: true},

    		{ header: "从库位", dataIndex: 'fromloc', width: 100, sortable: true},
		    { header: "从ID", dataIndex: 'fromid', width: 60, sortable: true},
		    { header: "到库位", dataIndex: 'toloc', width: 100, sortable: true},
		    { header: "到ID", dataIndex: 'toid', width: 60, sortable: true},
    		{ header: "单证号", dataIndex: 'sourcekey', width: 100, sortable: true},
		    { header: "源行号", dataIndex: 'sourceline', width: 60, sortable: true},
		    { header: "数量", dataIndex: 'qty', width: 100, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    { header: "源类型", dataIndex: 'sourcetype', width: 100, sortable: true},
            { header: swmslot01, dataIndex: 'lottable01', width: 120, sortable: false,editor:{xtype:'datefield',format:'Y-m-d H:i:s'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i')},
	        { header: swmslot02, dataIndex: 'lottable02', width: 120, sortable: false,editor:{xtype:'datefield',format:'Y-m-d H:i:s'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i')},
	        { header: swmslot03, dataIndex: 'lottable03', width: 120, sortable: false,editor:{xtype:'datefield',format:'Y-m-d H:i:s'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i')},
		    { header: swmslot04, dataIndex: 'lottable04', width: 100, sortable: true},
    		{ header: swmslot05, dataIndex: 'lottable05', width: 100, sortable: true},
		    { header: swmslot06, dataIndex: 'lottable06', width: 100, sortable: true},
		    { header: swmslot07, dataIndex: 'lottable07', width: 100, sortable: true},
		    { header: swmslot08, dataIndex: 'lottable08', width: 100, sortable: true},
    		{ header: swmslot09, dataIndex: 'lottable09', width: 100, sortable: true},
		    { header: swmslot10, dataIndex: 'lottable10', width: 100, sortable: true},
		    { header: swmslot11, dataIndex: 'lottable11', width: 100, sortable: true},
		    { header: swmslot12, dataIndex: 'lottable12', width: 100, sortable: true},
		    { header: swmslot13, dataIndex: 'lottable13', width: 100, sortable: true},
		    { header: swmslot14, dataIndex: 'lottable14', width: 100, sortable: true},
		    { header: swmslot15, dataIndex: 'lottable15', width: 100, sortable: true},
		    { header: swmslot16, dataIndex: 'lottable16', width: 100, sortable: true},
		    { header: swmslot17, dataIndex: 'lottable17', width: 100, sortable: true,hidden:true},
		    { header: swmslot18, dataIndex: 'lottable18', width: 100, sortable: true,hidden:true},
		    { header: swmslot19, dataIndex: 'lottable19', width: 100, sortable: true,hidden:true},
		    { header: swmslot20, dataIndex: 'lottable20', width: 100, sortable: true,hidden:true}
		];
		return true;
    },

	buildDockedItems: function(){
		this.dockedItems = [
            {
                xtype: 'pagingtoolbar',
                store: this.store,  
                dock: 'bottom',
                displayInfo: true
            }
        ];
	},
    
    initComponent: function(){
    	var me = this;
    	this.buildStore(basePath+'/inventory/doQueryItrnInfo.action','Itrn',20);
      this.callParent(arguments);
    },
    
    //交易日志状态解析方法
    rendererStateFunc:function(value)
    {
            var retValue;
            if(value=='DP') retValue='收货';
            else if(value=='WD') retValue='发货';   
            else if(value=='MV') retValue='移库';
            else if(value=='AJ') retValue='调整';
            else if(value=='TR') retValue='转移';
            else  retValue=value;
            return retValue;
    }

});





//主面板
Ext.define('Redm.support.Itrn', {	
	extend: 'Ext.panel.Panel',
    alias : 'widget.itrnmanager',
    layout:'border',
    title:'交易日志',   //加上这个title，看上去比较清楚，但会占掉一行，暂不需要
    initComponent: function(){

    	this.items = [/*this.createTopPanel(),*/this.createBtmPanel()];
      this.callParent(arguments);
    },

    //底部面板
    createBtmPanel: function(){
    	this.btmpanel = Ext.create('Ext.panel.Panel',{
    		region: 'center',
    		layout: 'border',
    		items: [this.createItrnGrid(),this.createTopForm()]
    	});
    	return this.btmpanel;
    },
    
    //底部GRID面板
    createItrnGrid:function(){
    	var me = this;
    	this.itrngrid = Ext.create('widget.itrngrid',{
			region: 'center'
/*			listeners: {//    查询不能显示记录
				itemclick: function(grid,record){
					console.log(record);
					me.top.getForm().loadRecord(record);
				}
			}*/
		});

/*
//according to area.js

		this.warehousegrid.getStore().on('beforeload',function(){
    		var params = this.warehousegrid.getStore().getProxy().extraParams;
    		var record = me.selform.getForm().getValues();
    		
    		var area = record.area;
    		var description = record.description;
    		
			delete params.area;
			delete params.description;
    		
			if(area) params.area = area;
         	if(description) params.description = description;
    	},this);*/

		this.itrngrid.getStore().on('beforeload',function(){
    		var params = this.itrngrid.getStore().getProxy().extraParams;
    		var record = me.top.getForm().getValues();
//         	var format = 'Y-m-d';


		    var storerKey = record.storerKey;
		    var storerKeyOver = record.storerKeyOver;
		    var sku = record.sku;
		    var skuOver = record.skuOver;
		    var lot = record.lot;
		    var lotOver = record.lotOver;
		    var fromloc = record.fromloc;
		    var fromlocOver = record.fromlocOver;
		    var trantype = record.trantype;
		    var datestart = record.datestart;
		    var dateend = record.dateend;
            
            var lottable01 = record.lottable01;
            var lottable01Over = record.lottable01Over;
            var lottable02 = record.lottable02;
            var lottable02Over = record.lottable02Over;
            var lottable03 = record.lottable03;
            var lottable03Over = record.lottable03Over;
            
		    var lottable04 = record.lottable04;
		    var lottable04Over = record.lottable04Over;
		    var lottable05 = record.lottable05;
		    var lottable05Over = record.lottable05Over;
		    var lottable06 = record.lottable06;
		    var lottable06Over = record.lottable06Over;
		    var lottable07 = record.lottable07;
		    var lottable07Over = record.lottable07Over;
		    var lottable08 = record.lottable08;
		    var lottable08Over = record.lottable08Over;
		    var lottable09 = record.lottable09;
		    var lottable09Over = record.lottable09Over;
		    var lottable10 = record.lottable10;
		    var lottable10Over = record.lottable10Over;
		    var lottable11 = record.lottable11;
		    var lottable11Over = record.lottable11Over;
		    var lottable12 = record.lottable12;
		    var lottable12Over = record.lottable12Over;
		    var lottable13 = record.lottable13;
		    var lottable13Over = record.lottable13Over;
		    var lottable14 = record.lottable14;
		    var lottable14Over = record.lottable14Over;
		    var lottable15 = record.lottable15;
		    var lottable15Over = record.lottable15Over;
		    var lottable16 = record.lottable16;
		    var lottable16Over = record.lottable16Over;
		    var lottable17 = record.lottable17;
		    var lottable17Over = record.lottable17Over;
		    var lottable18 = record.lottable18;
		    var lottable18Over = record.lottable18Over;
		    var lottable19 = record.lottable19;
		    var lottable19Over = record.lottable19Over;
		    var lottable20 = record.lottable20;
		    var lottable20Over = record.lottable20Over;

			delete params.storerKey;
			delete params.storerKeyOver;
			delete params.sku;
			delete params.skuOver;
			delete params.lot;
			delete params.lotOver;
			delete params.fromloc;
			delete params.fromlocOver;
			delete params.trantype;
			delete params.datestart;
			delete params.dateend;

			delete params.lottable01;
			delete params.lottable01Over;
			delete params.lottable02;
			delete params.lottable02Over;
			delete params.lottable03;
			delete params.lottable03Over;

			delete params.lottable04;
			delete params.lottable04Over;
			delete params.lottable05;
			delete params.lottable05Over;
			delete params.lottable06;
			delete params.lottable06Over;
			delete params.lottable07;
			delete params.lottable07Over;
			delete params.lottable08;
			delete params.lottable08Over;
			delete params.lottable09;
			delete params.lottable09Over;
			delete params.lottable10;
			delete params.lottable10Over;
			delete params.lottable11;
			delete params.lottable11Over;
			delete params.lottable12;
			delete params.lottable12Over;
			delete params.lottable13;
			delete params.lottable13Over;
			delete params.lottable14;
			delete params.lottable14Over;
			delete params.lottable15;
			delete params.lottable15Over;
			delete params.lottable16;
			delete params.lottable16Over;
			delete params.lottable17;
			delete params.lottable17Over;
			delete params.lottable18;
			delete params.lottable18Over;
			delete params.lottable19;
			delete params.lottable19Over;
			delete params.lottable20;
			delete params.lottable20Over;

			if(storerKey) params.storerKey = storerKey;
			if(storerKeyOver) params.storerKeyOver = storerKeyOver;
			if(sku) params.sku = sku;
			if(skuOver) params.skuOver = skuOver;
			if(lot) params.lot = lot;
			if(lotOver) params.lotOver = lotOver;
			if(fromloc) params.fromloc = fromloc;
			if(fromlocOver) params.fromlocOver = fromlocOver;
			if(trantype) params.trantype = trantype;
			if(datestart) params.datestart = datestart;
			if(dateend) params.dateend = dateend;
            
			if(lottable01) params.lottable01 = lottable01;
			if(lottable01Over) params.lottable01Over = lottable01Over;
			if(lottable02) params.lottable02 = lottable02;
			if(lottable02Over) params.lottable02Over = lottable02Over;
			if(lottable03) params.lottable03 = lottable03;
			if(lottable03Over) params.lottable03Over = lottable03Over;

			if(lottable04) params.lottable04 = lottable04;
			if(lottable04Over) params.lottable04Over = lottable04Over;
			if(lottable05) params.lottable05 = lottable05;
			if(lottable05Over) params.lottable05Over = lottable05Over;
			if(lottable06) params.lottable06 = lottable06;
			if(lottable06Over) params.lottable06Over = lottable06Over;
			if(lottable07) params.lottable07 = lottable07;
			if(lottable07Over) params.lottable07Over = lottable07Over;
			if(lottable08) params.lottable08 = lottable08;
			if(lottable08Over) params.lottable08Over = lottable08Over;
			if(lottable09) params.lottable09 = lottable09;
			if(lottable09Over) params.lottable09Over = lottable09Over;
			if(lottable10) params.lottable10 = lottable10;
			if(lottable10Over) params.lottable10Over = lottable10Over;
			if(lottable11) params.lottable11 = lottable11;
			if(lottable11Over) params.lottable11Over = lottable11Over;
			if(lottable12) params.lottable12 = lottable12;
			if(lottable12Over) params.lottable12Over = lottable12Over;
			if(lottable13) params.lottable13 = lottable13;
			if(lottable13Over) params.lottable13Over = lottable13Over;
			if(lottable14) params.lottable14 = lottable14;
			if(lottable14Over) params.lottable14Over = lottable14Over;
			if(lottable15) params.lottable15 = lottable15;
			if(lottable15Over) params.lottable15Over = lottable15Over;
			if(lottable16) params.lottable16 = lottable16;
			if(lottable16Over) params.lottable16Over = lottable16Over;
			if(lottable17) params.lottable17 = lottable17;
			if(lottable17Over) params.lottable17Over = lottable17Over;
			if(lottable18) params.lottable18 = lottable18;
			if(lottable18Over) params.lottable18Over = lottable18Over;
			if(lottable19) params.lottable19 = lottable19;
			if(lottable19Over) params.lottable19Over = lottable19Over;
			if(lottable20) params.lottable20 = lottable20;
			if(lottable20Over) params.lottable20Over = lottable20Over;

    	},this);
		return this.itrngrid;
    },

    //打印检货清单
    onPrintItrnReport: function(){
    	    var me = this;
            var record = me.top.getForm().getValues();
            var storerKey = record.storerKey;
            var storerKeyOver = record.storerKeyOver;
            var sku = record.sku;
            var skuOver = record.skuOver;
            var lot = record.lot;
            var lotOver = record.lotOver;
            var fromloc = record.fromloc;
            var fromlocOver = record.fromlocOver;
            var trantype = record.trantype;
            var datestart = record.datestart;
            var dateend = record.dateend;
            
            var lottable01 = record.lottable01;
            var lottable01Over = record.lottable01Over;
            var lottable02 = record.lottable02;
            var lottable02Over = record.lottable02Over;
            var lottable03 = record.lottable03;
            var lottable03Over = record.lottable03Over;
            
            var lottable04 = record.lottable04;
            var lottable04Over = record.lottable04Over;
            var lottable05 = record.lottable05;
            var lottable05Over = record.lottable05Over;
            var lottable06 = record.lottable06;
            var lottable06Over = record.lottable06Over;
            var lottable07 = record.lottable07;
            var lottable07Over = record.lottable07Over;
            var lottable08 = record.lottable08;
            var lottable08Over = record.lottable08Over;
            var lottable09 = record.lottable09;
            var lottable09Over = record.lottable09Over;
            var lottable10 = record.lottable10;
            var lottable10Over = record.lottable10Over;
            var lottable11 = record.lottable11;
            var lottable11Over = record.lottable11Over;
            var lottable12 = record.lottable12;
            var lottable12Over = record.lottable12Over;
            var lottable13 = record.lottable13;
            var lottable13Over = record.lottable13Over;
            var lottable14 = record.lottable14;
            var lottable14Over = record.lottable14Over;
            var lottable15 = record.lottable15;
            var lottable15Over = record.lottable15Over;
            var lottable16 = record.lottable16;
            var lottable16Over = record.lottable16Over;
            var lottable17 = record.lottable17;
            var lottable17Over = record.lottable17Over;
            var lottable18 = record.lottable18;
            var lottable18Over = record.lottable18Over;
            var lottable19 = record.lottable19;
            var lottable19Over = record.lottable19Over;
            var lottable20 = record.lottable20;
            var lottable20Over = record.lottable20Over;
        
        //导出excel格式的报表
        window.location.href = basePath+'/inventory/itrnReportPOIExcel.action?string='+storerKey+","+storerKeyOver+","+sku+","+skuOver+","+lot
                               +","+lotOver+","+fromloc+","+fromlocOver+","+trantype+","+datestart+","+dateend
                               +","+lottable01+","+lottable01Over+","+lottable02+","+lottable02Over+","+lottable03+","+lottable03Over+","
                               +lottable04+","+lottable04Over+","+lottable05+","+lottable05Over+","+lottable06+","+lottable06Over+","
                               +lottable07+","+lottable07Over+","+lottable08+","+lottable08Over+","+lottable09+","+lottable09Over+","
                               +lottable10+","+lottable10Over+","+lottable11+","+lottable11Over+","+lottable12+","+lottable12Over+","
                               +lottable13+","+lottable13Over+","+lottable14+","+lottable14Over+","+lottable15+","+lottable15Over+","
                               +lottable16+","+lottable16Over+","+lottable17+","+lottable17Over+","+lottable18+","+lottable18Over+","
                               +lottable19+","+lottable19Over+","+lottable20+","+lottable20Over;

    },
    
    //顶部查询面板
    createTopForm: function(){
        var me=this;
    	this.top = Ext.create('Ext.form.Panel',{

			region: 'north',
			height:315,
    		//split: true,      //form 中间的隐藏窗口的按钮，库存部分其他菜单没有，可以统一添加
			frame : true,
			border : false,
			autoScroll :false,
			resizable: true,
			collapsible : false,
			layout: 'anchor',
			buttonAlign:'left',  
            
            //以下是每个item的公共属性
            defaults: {
                anchor: '100%',
                xtype: 'fieldcontainer',
                layout: 'hbox',
                defaultType: 'textfield',
                combineErrors: true
            },

    		items: [
                {
                	defaults: {
                       xtype: 'textfield',
                       margin: '5 0 0 5',
                        width:180,
                       labelWidth:60
                    },
                    items: [
                        {
                            fieldLabel:'货主',
                            name: 'storerKey',
                            listeners:
                            {
                                blur: function(txt){
                                    var storerKeyValue= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(storerKeyValue);
                                    me.top.getForm().findField('storerKeyOver').setValue(storerKeyValue);
                                }                                           
                            }
                        },
                        {
                            fieldLabel:'->',
                            name: 'storerKeyOver',
                            listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }
                        },
                        {
                            fieldLabel:'商品',
                            name: 'sku',
                            listeners:{
                                blur: function(txt){
                                    var skuValue=Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(skuValue);
                                    me.top.getForm().findField('skuOver').setValue(skuValue);
                                } 
                            }
                        },
                        {
                            fieldLabel:'->',
                            name: 'skuOver',
                            listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }
                        },
                        {
                            fieldLabel:'批次',
                            name: 'lot',
                            listeners:{
                                blur: function(txt){
                                    var lotValue= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(lotValue);
                                    me.top.getForm().findField('lotOver').setValue(lotValue);
                                }, 
                                scope:this
                            }
                        },
                        {
                            fieldLabel:'->',
                            name: 'lotOver',
                            listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }
                        }
                        
                    ]
                },
                {
                	defaults: {
                       xtype: 'textfield',
                       margin: '5 0 0 5',
                        width:180,
                       labelWidth:60
                    },
                    items: [
                        {
                            fieldLabel:'库位',
                            name:'fromloc',
                            listeners:{
                                blur: function(txt){
                                    var fromlocValue= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(fromlocValue);
                                    me.top.getForm().findField('fromlocOver').setValue(fromlocValue);
                                }
                            }
                        },
                        {
                            fieldLabel:'->',
                            name: 'fromlocOver',
                            listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }
                        },
                        {	
                            fieldLabel:'时间',
                            xtype:'datefield',
                            name: 'datestart',
                            format:'Y-m-d H:i:s'
                        },
                        {	
                            fieldLabel:'->',
                            xtype:'datefield',
                            name: 'dateend',
                            format:'Y-m-d H:i:s'
                        },
                        {
                            xtype:'codecombo',
                            codeType:'TRANTYPE',
                            fieldLabel:'类型',    //做成数据字典，下拉框
                            name: 'trantype',
                            listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }
                        }
                    ]
                },
                
                {
                	defaults: {
                       xtype: 'textfield',
                       margin: '5 0 0 5',
                        width:180,
                       labelWidth:60
                    },
                    items: [
                        {	
                            fieldLabel:swmslot01,
                            xtype:'datefield',
                            name: 'lottable01',
                            format:'Y-m-d H:i:s'
                        },
                        {	
                            fieldLabel:'->',
                            xtype:'datefield',
                            name: 'lottable01Over',
                            format:'Y-m-d H:i:s'
                        },
                        {	
                            fieldLabel:swmslot02,
                            xtype:'datefield',
                            name: 'lottable02',
                            format:'Y-m-d H:i:s'
                        },
                        {	
                            fieldLabel:'->',
                            xtype:'datefield',
                            name: 'lottable02Over',
                            format:'Y-m-d H:i:s'
                        },
                        {	
                            fieldLabel:swmslot03,
                            xtype:'datefield',
                            name: 'lottable03',
                            format:'Y-m-d H:i:s'
                        },
                        {	
                            fieldLabel:'->',
                            xtype:'datefield',
                            name: 'lottable03Over',
                            format:'Y-m-d H:i:s'
                        }
                        
                    ]
                },
                {
                	defaults: {
                       xtype: 'textfield',
                       margin: '5 0 0 5',
                        width:180,
                       labelWidth:60
                    },
                    items: [
                        {	
                            fieldLabel:swmslot04,
                            name: 'lottable04',
                            listeners:{
                                blur: function(txt){
                                    var lottable04Value= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(lottable04Value);
                                    me.top.getForm().findField('lottable04Over').setValue(lottable04Value);
                                }
                            }
                        },    
                        {	
                            fieldLabel:'->',
                            name: 'lottable04Over',
                            listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }                         
                        },
                        {	
                            fieldLabel:swmslot05,
                            name: 'lottable05',
                            listeners:{
                                blur: function(txt){
                                    var lottable05Value= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(lottable05Value);
                                    me.top.getForm().findField('lottable05Over').setValue(lottable05Value);
                                }
                            }                            
                        },
                        {	
                            fieldLabel:'->',
                            name: 'lottable05Over',
                            listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }                       
                        },
                        {
                            fieldLabel:swmslot06,
                            name: 'lottable06',
                            listeners:{
                                blur: function(txt){
                                    var lottable06Value= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(lottable06Value);
                                    me.top.getForm().findField('lottable06Over').setValue(lottable06Value);
                                }
                            }                            
                        },
                        {
                            fieldLabel:'->',
                            name: 'lottable06Over',
                            listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }                       
                        }
                    ]
                },
                
                {
                	defaults: {
                       xtype: 'textfield',
                       margin: '5 0 0 5',
                        width:180,
                       labelWidth:60
                    },
                    items: [
                        {
                            fieldLabel:swmslot07,
                            name: 'lottable07',
                            listeners:{
                                blur: function(txt){
                                    var lottable07Value= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(lottable07Value);
                                    me.top.getForm().findField('lottable07Over').setValue(lottable07Value);
                                }
                            }                            
                        },
                        {
                            fieldLabel:'->',
                            name: 'lottable07Over',
                            listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }                         
                        },
                        {
                            fieldLabel:swmslot08,
                            name: 'lottable08',
                            listeners:{
                                blur: function(txt){
                                    var lottable08Value= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(lottable08Value);
                                    me.top.getForm().findField('lottable08Over').setValue(lottable08Value);
                                }
                            }                            
                        },
                        {
                            fieldLabel:'->',
                            name: 'lottable08Over',
                            listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }                         
                        },
                        {
                            fieldLabel:swmslot09,
                            name: 'lottable09',
                            listeners:{
                                blur: function(txt){
                                    var lottable09Value= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(lottable09Value);
                                    me.top.getForm().findField('lottable09Over').setValue(lottable09Value);
                                }
                            }                            
                        },
                        {
                            fieldLabel:'->',
                            name: 'lottable09Over',
                            listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }                        
                        }
                    ]
                },
                {
                	defaults: {
                       xtype: 'textfield',
                       margin: '5 0 0 5',
                        width:180,
                       labelWidth:60
                    },
                    items: [
                        {
                            fieldLabel:swmslot10,
                            name: 'lottable10',
                            listeners:{
                                blur: function(txt){
                                    var lottable10Value= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(lottable10Value);
                                    me.top.getForm().findField('lottable10Over').setValue(lottable10Value);
                                }
                            }                            
                        },
                        {
                            fieldLabel:'->',
                            name: 'lottable10Over',
                            listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }                      
                        },
                        {
                            fieldLabel:swmslot11,
                            name: 'lottable11',
                            listeners:{
                                blur: function(txt){
                                    var lottable11Value= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(lottable11Value);
                                    me.top.getForm().findField('lottable11Over').setValue(lottable11Value);
                                }
                            }                            
                        },
                        {
                            fieldLabel:'->',
                            name: 'lottable11Over',
                            listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }                        
                        },
                        {   
                            fieldLabel:swmslot12,
                            name: 'lottable12',
                            listeners:{
                                blur: function(txt){
                                    var lottable12Value= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(lottable12Value);
                                    me.top.getForm().findField('lottable12Over').setValue(lottable12Value);
                                }
                            }                            
                        },
                        {
                            fieldLabel:'->',
                            name: 'lottable12Over',
                            listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }                        
                        }
                    ]
                },
                {
                	defaults: {
                       xtype: 'textfield',
                       margin: '5 0 0 5',
                       width:180,
                       labelWidth:60
                    },
                    items: [
                        {
                            fieldLabel:swmslot13,
                            name: 'lottable13',
                            listeners:{
                                blur: function(txt){
                                    var lottable13Value= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(lottable13Value);
                                    me.top.getForm().findField('lottable13Over').setValue(lottable13Value);
                                }
                            }                            
                        },
                        {
                            fieldLabel:'->',
                            name: 'lottable13Over',
                            listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }                         
                        },
                        {
                            fieldLabel:swmslot14,
                            name: 'lottable14',
                            listeners:{
                                blur: function(txt){
                                    var lottable14Value= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(lottable14Value);
                                    me.top.getForm().findField('lottable14Over').setValue(lottable14Value);
                                }
                            }                            
                        },
                        {
                            fieldLabel:'->',
                            name: 'lottable14Over',
                            listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }                         
                        },
                        {
                            fieldLabel:swmslot15,
                            name: 'lottable15',
                            listeners:{
                                blur: function(txt){
                                    var lottable15Value= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(lottable15Value);
                                    me.top.getForm().findField('lottable15Over').setValue(lottable15Value);
                                }
                            }                            
                        },
                        {
                            fieldLabel:'->',
                            name: 'lottable15Over',
                            listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }                        
                        }
                    ]
                },
                {
                	defaults: {
                       xtype: 'textfield',
                       margin: '5 0 0 5',
                       width:180,
                       labelWidth:60
                    },
                    items: [
                        {
                            fieldLabel:swmslot16,
                            name: 'lottable16',
                            listeners:{
                                blur: function(txt){
                                    var lottable16Value= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(lottable16Value);
                                    me.top.getForm().findField('lottable16Over').setValue(lottable16Value);
                                }
                            }                            
                        },
                        {
                            fieldLabel:'->',
                            name: 'lottable16Over',
                            listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }                        
                        },                   
                        {
                            fieldLabel:swmslot17,
                            name: 'lottable17',
                            hidden:true,
                            listeners:{
                                blur: function(txt){
                                    var lottable17Value= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(lottable17Value);
                                    me.top.getForm().findField('lottable17Over').setValue(lottable17Value);
                                }
                            }                            
                        },
                        {
                            fieldLabel:'->',
                            name: 'lottable17Over',
                            hidden:true,
                            listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }                         
                        },
                        {
                            fieldLabel:swmslot18,
                            name: 'lottable18',
                            hidden:true,
                            listeners:{
                                blur: function(txt){
                                    var lottable18Value= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(lottable18Value);
                                    me.top.getForm().findField('lottable18Over').setValue(lottable18Value);
                                }
                            }                            
                        },
                        {
                            fieldLabel:'->',
                            name: 'lottable18Over',
                            hidden:true,
                            listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }                         
                        },
                        {
                            fieldLabel:swmslot19,
                            name: 'lottable19',
                            hidden:true,
                            listeners:{
                                blur: function(txt){
                                    var lottable19Value= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(lottable19Value);
                                    me.top.getForm().findField('lottable19Over').setValue(lottable19Value);
                                }
                            }                            
                        },
                        {
                            fieldLabel:'->',
                            name: 'lottable19Over',
                            hidden:true,
                            listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }                        
                        },
                        {
                            fieldLabel:swmslot20,
                            name: 'lottable20',
                            hidden:true,
                            listeners:{
                                blur: function(txt){
                                    var lottable20Value= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(lottable20Value);
                                    me.top.getForm().findField('lottable20Over').setValue(lottable20Value);
                                }
                            }                            
                        },
                        {
                            fieldLabel:'->',
                            name: 'lottable20Over',
                            hidden:true,
                            listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }                        
                        }
                    ]
                }
			],
            buttons:[
                {
				    text : "查询",
				    margin: '5 0 20 10',
				    iconCls: 'icon-search',
				    scope : this,
	               handler: function()
	               {
	                   //查询代码在beforeload事件中处理
    	               this.itrngrid.getStore().load();
	               }
			    },

                {
				    text : "重置",
				    margin: '5 0 20 10',
				    iconCls: 'icon-reset',
				    scope : this,
	               handler: function()
	               {
	            	  this.top.getForm().reset();
	               }
			    },
			     {
                        iconCls: 'icon-upload',
                        text: '导出',
                        handler: this.onPrintItrnReport, 
                        scope: this
                    }
			]
    	});
    	return this.top;
    }
});

Ext.onReady(function(){
	Ext.create('Ext.container.Viewport', {
	    layout: 'border',
	    items: [{
	    	xtype:'itrnmanager',
	    	region:'center'
	    }]
	});
});

