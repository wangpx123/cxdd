/**********************************************
发货单报表 ShipmentOrder.js

***********************************************/

Ext.define('StoreSoDetailGrid', {
    extend: 'Ext.data.Model',
    fields: [
        {name:'id'},
        {name:'orderKey'},//SO单号
		{name:'orderNumber'},//客户订单号
        {name:'storerKey'},  //货主
        {name:'lineNumber'},//行号
		{name:'rownum'},//行号
		//长阳现场实施新增的字段;
		{name:'retailReference'},//分销商参考号
		{name:'buyerpo'},//采购商PO号
		{name:'carrierReference'},//承运商参考号
		{name:'consigneeKey'},//收货人
        {name:'consigneeCompany'},//收货人名称
        {name:'carrierKey'},//承运商
        {name:'carrierCompany'},//承运商名称
        {name:'model'},//型号
		//外部引用的字段
        {name:'uomDescr'}, 
        {name:'uomCode'},
		{name:'description'},
		{name:'desea'},
		{name:'type'},      //SO类型
        {name:'status'},  //状态
        {name:'sku'},      //商品
        {name:'altsku'}, //别名
        {name:'name'},     //中文名称
        {name:'packKey'},//包装
        {name:'uom'},//单位
        {name:'qtyOrdered',type:'float'},//订单数量KG
        {name:'qtyShipped',type:'float'},//实发数KG
		{name:'qtyUomShipped',type:'float'},//实发数
        {name:'lottable01',type:'date',dateFormat : 'Y-m-d H:i:s.u'},//入库日期
        {name:'lottable02',type:'date',dateFormat : 'Y-m-d H:i:s.u'},//生产日期
        {name:'lottable03',type:'date',dateFormat : 'Y-m-d H:i:s.u'},//失效日期
        {name:'lottable04'},//批属性4
        {name:'lottable05'},//批属性5
        {name:'lottable06'},//批属性6
        {name:'lottable07'},//批属性7
        {name:'lottable08'},//批属性8
        {name:'lottable09'},//批属性9
        {name:'lottable10'},//批属性10
        {name:'lottable11'},//批属性11
        {name:'lottable12'},//批属性12
        {name:'lottable13'},//批属性13
        {name:'lottable14'},//批属性14
        {name:'lottable15',type:'float'},//批属性15
        {name:'lottable11'},//批属性16
        {name:'lottable12'},//批属性17
        {name:'lottable13'},//批属性18
        {name:'lottable14'},//批属性19
        {name:'lottable15'},//批属性20
        {name:'consigneeKey'},
        {name:'actualshipdate',type:'date',dateFormat : 'Y-m-d H:i:s.u'}//发货日期
    ],
    idProperty: 'id'
});

//detail grid
Ext.define('Redm.outbound.DetailGrid',{
    extend: 'Redm.BaseGrid',
    alias : 'widget.detailgrid',
    autoLoad: false,   //启动不自动加载数据
    selModel: Ext.create('Ext.selection.CheckboxModel'),
    buildColumns: function(){
        this.columns = [
		    { header: "SO单号", dataIndex: 'orderKey', width: 100, sortable: true},
		    { header: "行号", dataIndex: 'lineNumber', width: 60, sortable: true},		    		
			{ header: "客户订单号", dataIndex: 'orderNumber', width: 100, sortable: true},
		    { header: "分销商参考号", dataIndex: 'retailReference', width: 100, sortable: true},
		    { header: "采购商PO号", dataIndex: 'buyerpo', width: 100, sortable: true},
		    { header: "承运商参考号", dataIndex: 'carrierReference', width: 100, sortable: true},
		    { header: "收货方", dataIndex: 'consigneeKey', width: 100, sortable: true},
		    { header: "收货方名称", dataIndex: 'consigneeCompany', width: 100, sortable: true},
		    { header: "承运商", dataIndex: 'carrierKey', width: 100, sortable: true},
		    { header: "承运商名称", dataIndex: 'carrierCompany', width: 100, sortable: true},
		    { header: "商品", dataIndex: 'sku', width: 100, sortable: true},
		    { header: "中文名称", dataIndex: 'name', width: 150, sortable: true},
		    { header: "包装", dataIndex: 'packKey', width: 80, sortable: true},
		    { header: "单位", dataIndex: 'desea', width: 60, sortable: true},
		    { header: "重量", dataIndex: 'lottable15', width: 90, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    { header: '收货方',dataIndex: 'consigneeKey',width: 110,sortable: true},
			{ header: "订单数KG", dataIndex: 'qtyOrdered', width: 150, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
			{ header: "实发数KG", dataIndex: 'qtyShipped', width: 150, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    { header: "包装单位", dataIndex: 'description', width: 80, sortable: true},
		    { header: "实发数", dataIndex: 'qtyUomShipped', width: 60, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
			{ header: '发货日期',dataIndex: 'actualshipdate',width: 110,sortable: true,editor:{xtype:'datefield',format:'Y-m-d H:i'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i')},
			{ header: '生产日期',dataIndex: 'lottable02',width: 110,sortable: true,editor:{xtype:'datefield',format:'Y-m-d H:i'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i')},
		    { header: '批号',dataIndex: 'lottable04',width: 110,sortable: true},
		    { header: '托盘号',dataIndex: 'lottable05',width: 110,sortable: true},
		    { header: '卷号',dataIndex: 'lottable06',width: 110,sortable: true},
		    { header: '等级',dataIndex: 'lottable07',width: 110,sortable: true},
		    { header: '规格',dataIndex: 'lottable10',width: 110,sortable: true},
		    { header: '型号',dataIndex: 'model',width: 110,sortable: true},
		    { header: "id", dataIndex: 'id',hidden: true}
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
                xtype: 'toolbar',
                dock: 'top',
                items: [
                   '-',
                    {
                        iconCls: 'icon-search',
                        text: '查询',
                        handler: me.onSelect,
                        scope: this
                    },
                    '-',
                    {
                        iconCls: 'icon-reset',
                        text: '重置',
                        handler: this.onReset,
                        scope: this
                    },
					'-',
					{
						iconCls: 'icon-upload',
                        text: '导出',
                        handler: this.onPrintPickDetailItem1,        //第一个tab页面重置按钮，清空查询条件
                        scope: this
                    }
                    //此处将不在使用，后续再来观察(Lee)
                    /*,
                    '-',
                    {
                        xtype: 'button',
                        handler: this.onQueryQtySum,
                        scope: this,
                        iconCls: 'icon-search',
                        text: '查询总数量'
                   }*/
                 ]
            },
               {
                xtype: 'pagingtoolbar',
                store: this.store, 
                dock: 'bottom',
                displayInfo: true,
                items:['-',{
                        xtype: 'label',
                        forId: 'myFieldId1',
                        text: '本页订单数：'
                    },var1PageSum,{
                        xtype: 'label',
                        forId: 'myFieldId2',
                        text: '本页实发数KG：'
                    },var2PageSum,{
                        xtype: 'label',
                        forId: 'myFieldId1',
                        text: '本页实发数：'
                    },var3PageSum,
                    {
                        xtype: 'label',
                        forId: 'myFieldId1',
                        text: '本页重量：'
                    },var4PageSum,
                    '-',{
                        xtype: 'label',
                        forId: 'myFieldId3',
                        text: '总订单数：'
                    },var1AllSum,{
                        xtype: 'label',
                        forId: 'myFieldId4',
                        text: '总实发数KG：'
                    },var2AllSum,{
                        xtype: 'label',
                        forId: 'myFieldId4',
                        text: '总实发数：'
                    },var3AllSum,{
                        xtype: 'label',
                        forId: 'myFieldId4',
                        text: '总重量：'
                    },var4AllSum
                ]
            }
        ];
	},

    initComponent: function(){
    	var me = this;
    	this.buildStore(basePath + '/report/doQueryOrderDetailInfo.action','StoreSoDetailGrid',20);
        this.callParent(arguments);
    },
    //明细表状态解析方法
    rendererDetailStatusFunc:function(value){
            var retValue;
            if(value=='0') retValue='新建';
            else if(value=='1') retValue='部分分配完成';
            else if(value=='2') retValue='全部分配完成';
            else  retValue=value;
            return retValue;
        },    
	
	//发货单类型解析函数
    rendererTypeFunc:function(value){
            var retValue;
            if(value=='0') retValue='正常';
            else  retValue=value;
            return retValue;
        },  
    
	//发货单状态解析函数
    rendererStatusFunc:function(value){
            var retValue;
            if(value=='0') retValue='新建';
            else if(value=='1') retValue='部分分配';
            else if(value=='2') retValue='全部分配';
            else if(value=='5') retValue='部分分配部分发货';
            else if(value=='6') retValue='部分分配全部发货';
            else if(value=='7') retValue='全部分配部分发货';
            else if(value=='8') retValue='全部分配全部发货';
            else if(value=='9') retValue='关闭';
            //else  retValue=value;
            return retValue;
      },
	  
	 //第一个tab页面查询按钮
      // this.onQueryQtySum()为查询grid显示的总数的方法(Lee)
    onSelect: function(){
		var me = this.ownerCt.ownerCt;
		var storedKeyValue=me.pt1topform.getForm().findField('storerKey').getValue();
        if(''==storedKeyValue)
        {
  			MessageBox.error('错误提示','请先输入货主！');
            return;
        }
        this.onQueryQtySum();
    	this.getStore().load();
    },

    //第一个tab页面重置按钮，清空查询条件
    onReset: function(){
    	var me = this.ownerCt.ownerCt;
    	me.pt1topform.getForm().reset();
    },
       //查询总重量
    onQueryQtySum:function(){
        var me = this.ownerCt.ownerCt;
        //计算总数量，有问题，待解决
        var values = me.pt1topform.getForm().getFieldValues();
        var orderKey = values.orderKey;
        var storerKey = values.storerKey;
        var type = values.type;
        var status = values.status;
        var orderNumber = values.orderNumber;
        var sku = values.sku;
       
        var retailReference = values.retailReference;
    	var buyerpo = values.buyerpo;
		var carrierReference = values.carrierReference;
			
		var consigneeCompany = values.consigneeCompany;
    	var carrierKey = values.carrierKey;
    	var carrierCompany = values.carrierCompany;
		var model = values.model;
        
        var lottable01 = Ext.util.Format.date(values.lottable01,'Y-m-d H:i:s');
        var lottable01Over = Ext.util.Format.date(values.lottable01Over,'Y-m-d H:i:s');
        var lottable02 = Ext.util.Format.date(values.lottable02,'Y-m-d H:i:s');
        var lottable02Over = Ext.util.Format.date(values.lottable02Over,'Y-m-d H:i:s');
        var lottable03 = Ext.util.Format.date(values.lottable03,'Y-m-d H:i:s');
        var lottable03Over = Ext.util.Format.date(values.lottable03Over,'Y-m-d H:i:s');
       
        var lottable04 = values.lottable04;
        var lottable05 = values.lottable05;
        var lottable06 = values.lottable06;
        var lottable07 = values.lottable07;
        var lottable08 = values.lottable08;
        var lottable09 = values.lottable09;
        var lottable10 = values.lottable10;
        var lottable11 = values.lottable11;
        var lottable12 = values.lottable12;
        var lottable13 = values.lottable13;
        var lottable14 = values.lottable14;
        var lottable15 = values.lottable15;
        var dStart = Ext.util.Format.date(values.dStart,'Y-m-d H:i:s');
        var dEnd = Ext.util.Format.date(values.dEnd,'Y-m-d H:i:s');
        var consigneeKey = values.consigneeKey;
        
        Ext.Ajax.request({
                    url: basePath + '/report/doQueryOrderReportInfoSum.action',
                    params: {
                        orderKey:orderKey,
                        storerKey:storerKey,
                        type:type,
                        status:status,
                        orderNumber:orderNumber,
                        sku:sku,
                        
                        retailReference:retailReference,
                        buyerpo:buyerpo,
                        carrierReference:carrierReference,
                        consigneeCompany:consigneeCompany,
                        carrierKey:carrierKey,
                        carrierCompany:carrierCompany,
                        model:model,
                        
                        lottable01:lottable01,
                        lottable02:lottable02, 
                        lottable03:lottable03,
                        lottable04:lottable04,
                        lottable05:lottable05,
                        lottable06:lottable06,
                        lottable07:lottable07,
                        lottable08:lottable08,
                        lottable09:lottable09,
                        lottable10:lottable10,  
                        lottable11:lottable11,  
                        lottable12:lottable12,  
                        lottable13:lottable13,
                        lottable14:lottable14,
                        lottable15:lottable15,
                        dStart:dStart,
                        dEnd:dEnd, 
                        consigneeKey:consigneeKey,
                        lottable01Over:lottable01Over,
                        lottable02Over:lottable02Over,
                        lottable03Over:lottable03Over
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
        
	//打印检货清单
	onPrintPickDetailItem1: function(){
		var me = this.ownerCt.ownerCt;
  		var values = me.pt1topform.getForm().getFieldValues();
    	var orderKey = values.orderKey;
    	var storerKey = values.storerKey;
    	var type = values.type;
    	var status = values.status;
    	var orderNumber = values.orderNumber;
		var sku = values.sku;
		
    	var retailReference = values.retailReference;
    	var buyerpo = values.buyerpo;
		var carrierReference = values.carrierReference;
			
		var consigneeCompany = values.consigneeCompany;
    	var carrierKey = values.carrierKey;
    	var carrierCompany = values.carrierCompany;
		var model = values.model;		
		
	    var lottable01 = Ext.util.Format.date(values.lottable01,'Y-m-d H:i:s');
        var lottable01Over = Ext.util.Format.date(values.lottable01Over,'Y-m-d H:i:s');
        var lottable02 = Ext.util.Format.date(values.lottable02,'Y-m-d H:i:s');
        var lottable02Over = Ext.util.Format.date(values.lottable02Over,'Y-m-d H:i:s');
        var lottable03 = Ext.util.Format.date(values.lottable03,'Y-m-d H:i:s');
        var lottable03Over = Ext.util.Format.date(values.lottable03Over,'Y-m-d H:i:s');
        
		var lottable04 = values.lottable04;
		var lottable05 = values.lottable05;
		var lottable06 = values.lottable06;
		var lottable07 = values.lottable07;
		var lottable08 = values.lottable08;
		var lottable09 = values.lottable09;
		var lottable10 = values.lottable10;
		var lottable11 = values.lottable11;
		var lottable12 = values.lottable12;
		var lottable13 = values.lottable13;
		var lottable14 = values.lottable14;
		var lottable15 = values.lottable15;
		var dStart = Ext.util.Format.date(values.dStart,'Y-m-d H:i:s');
		var dEnd = Ext.util.Format.date(values.dEnd,'Y-m-d H:i:s');
		var consigneeKey = values.consigneeKey;
        
		//导出excel格式的报表
		window.location.href = basePath+'/report/ordersReport.action?string='+storerKey+","+consigneeKey+","+orderKey+","+type+","+status+","+orderNumber
																			+","+lottable01+","+lottable02+","+lottable03+","+lottable04+","+lottable05
																			+","+lottable06+","+lottable07+","+lottable08+","+lottable09+","+lottable10
																			+","+lottable11+","+lottable12+","+lottable13+","+lottable14+","+lottable15
                                                                            +","+dStart+","+dEnd+","+sku+","+lottable01Over+","+lottable02Over+","+lottable03Over
                                                                            +","+retailReference+","+buyerpo+","+carrierReference+","+consigneeCompany+","+carrierKey
                                                                            +","+carrierCompany+","+model;
    }
});

//最外部的容器
Ext.define('Redm.outbound.ShipmentOrder',{
	extend: 'Ext.panel.Panel',
    alias : 'widget.sotab',
    title:'出库报表',
    layout:'border',
	initComponent: function(){
    	var me = this;
    	this.items = [this.createBottomPanel(),this.createTopPanel()];
        this.callParent(arguments);
    },

	
	//顶部面板
    createTopPanel: function(){
    	var me = this;
    	this.toppanel = Ext.create('Ext.panel.Panel',{
    		region: 'north',
    		layout: 'border',
    		height: '45%',
    		border: false,
    		items:[this.createPt1TopForm()]
    	});
    	return this.toppanel;
    },
   //顶部查询From
    createPt1TopForm: function(){
		var me = this;
    	this.pt1topform = Ext.create('Ext.form.Panel',{
    		region: 'center',
    		layout: 'vbox',
			autoHeight: true,
			stripeRows : true,
			autoScroll : true,
    		frame: true,
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
                        margin: '0 0 0 3',
                        width: 240,
                        labelWidth: 80
                    },
                    items: [
                        {
                            name:'storerKey',  
                            fieldLabel: '货主',
							allowBlank: false,
                            listeners:{
								blur:function(txt){
									txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
								}
							}                              
                        },
                        {
                            fieldLabel: 'SO编号',
                            name:'orderKey',  
                            xtype: 'textfield',
                            listeners:{
								blur:function(txt){
									txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
								}
							}                 
                        },
                        {
                            name:'type',   
                            fieldLabel: '类型',
                            xtype:'codecombo',
                            codeType:'SOTYPE'                            
                        },
                        {
                            name:'status',
                            fieldLabel: '状态',
                            xtype:'codecombo',
                            codeType:'SOSTATUS'                         
                        }
                    ]
                },
                 {
                    layout: 'hbox',
                    defaults: {
                        //xtype: 'combobox',
                        xtype: 'textfield',
                        margin: '0 0 0 3',
                        width: 240,
                        labelWidth: 80
                    },
                    items: [
                        {
                           fieldLabel: '客户订单号',
                            name:'orderNumber',
                            xtype: 'textfield',
                            listeners:{
								blur:function(txt){
									txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
								}
							}                 
                        },
                        {
                            name:'retailReference',  
                            fieldLabel: '分销商参考号',
							allowBlank: false,
                            listeners:{
								blur:function(txt){
									txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
								}
							}                              
                        },
                        {
                            fieldLabel: '采购商PO号',
                            name:'buyerpo',  
                            xtype: 'textfield',
                            listeners:{
								blur:function(txt){
									txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
								}
							}                 
                        },{
                           fieldLabel: '承运商参考号',
                            name:'carrierReference',
                            xtype: 'textfield',
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
                        //xtype: 'combobox',
                        xtype: 'textfield',
                        margin: '0 0 0 3',
                        width: 240,
                        labelWidth: 80
                    },
                    items: [
                    	{
                           fieldLabel: '收货人',
                            name:'consigneeKey',
                            xtype: 'textfield',
                            listeners:{
								blur:function(txt){
									txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
								}
							}                 
                        },
                          {
                            fieldLabel: '收货人名称',
                            name:'consigneeCompany',
                            xtype: 'textfield',
                             listeners:{
								blur:function(txt){
									txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
								}
							}  
                        },
						
                        {
                            name:'carrierKey',  
                            fieldLabel: '承运商',
							allowBlank: false,
                            listeners:{
								blur:function(txt){
									txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
								}
							}                              
                        },
                        {
                            fieldLabel: '承运商名称',
                            name:'carrierCompany',  
                            xtype: 'textfield',
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
                        xtype: 'combobox',
                        margin: '0 0 0 3',
                        width: 240,
                        labelWidth: 80
                    },
                    items: [
                        {
                            name:'sku',   
                            fieldLabel: '商品',
                            xtype:'textfield',
                             listeners:{
								blur:function(txt){
									txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
								}
							}  
                        },
                        {
                            name:'lottable10',
                             xtype:'textfield',
                            fieldLabel: '规格',
                            listeners:{
                                blur:function(txt){
                                    txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }  
                        }, 
                        {
                            name:'lottable01',
                            fieldLabel: '收货日期',
                            xtype: 'datefield',
                            format:'Y-m-d H:i:s'             
                        },
                        {
                            name:'lottable01Over',
                            fieldLabel: '--------->',
                            xtype: 'datefield',
                            format:'Y-m-d H:i:s'                
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults: {
                        xtype: 'textfield',
                        margin: '0 0 0 3',
                        width: 240,
                        labelWidth: 80
                    },
                    items: [
                      {
                            name:'model',
                            fieldLabel: '型号',
                            listeners:{
                                blur:function(txt){
                                    txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }  
                        },
                       {
                            name:'lottable04',
                            fieldLabel: '生产批号',
                            listeners:{
                                blur:function(txt){
                                    txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }                 
                        },
                     
                        {   
                            fieldLabel:swmslot02,
                            xtype:'datefield',
                            name: 'lottable02',
                            format:'Y-m-d H:i:s'
                        },
                        {   
                            fieldLabel:'--------->',
                            xtype:'datefield',
                            name: 'lottable02Over',
                            format:'Y-m-d H:i:s'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults: {
                        xtype: 'textfield',
                        margin: '0 0 0 3',
                        width: 240,
                        labelWidth: 80
                    },
                    items: [
                     	{
                             name:'lottable05',
                            fieldLabel: '托盘号',
                            listeners:{
								blur:function(txt){
									txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
								}
							}                 
                        },
                        {
                            name:'lottable06',
                            fieldLabel: '成品卷号',
							listeners:{
								blur:function(txt){
									txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
								}
							}  
                        },  
                        {   
                            fieldLabel:swmslot03,
                            xtype:'datefield',
                            name: 'lottable03',
                            format:'Y-m-d H:i:s'
                        },
                        {   
                            fieldLabel:'--------->',
                            xtype:'datefield',
                            name: 'lottable03Over',
                            format:'Y-m-d H:i:s'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults: {
                        xtype: 'textfield',
                        margin: '0 0 0 3',
                        width: 240,
                        labelWidth: 80
                    },
                    items: [
                    	{
                            name:'lottable07',
                            fieldLabel: '等级',
							listeners:{
								blur:function(txt){
									txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
								}
							}  
                        },
						{
                            name:'lottable08',
                            fieldLabel: '外观代码',
							listeners:{
								blur:function(txt){
									txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
								}
							}  
                        },
                        {
                            name:'dStart',
                            fieldLabel: '发货日期',
                            xtype: 'datefield',
							format:'Y-m-d H:i:s'
							
                        },
                        {
                            name:'dEnd',
                            fieldLabel: '--------->',
                            xtype: 'datefield',
							format:'Y-m-d H:i:s'             
                        }                       
                    ]
                }  , {
                    layout: 'hbox',
                    defaults: {
                        xtype: 'textfield',
                        margin: '0 0 0 3',
                        width: 240,
                        labelWidth: 80
                    },
                    items: [ 
                    	{
                            name:'lottable09',
                            fieldLabel: '表面处理',
                            listeners:{
                                blur:function(txt){
                                    txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }  
                        },
                        {
                            name:'lottable11',
                            fieldLabel: '包装形式',
                            listeners:{
                                blur:function(txt){
                                    txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }  
                        },
                        {
                            name:'lottable12',
                            fieldLabel: 'ASN号',
                            listeners:{
                                blur:function(txt){
                                    txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }  
                        },
                        {
                            name:'lottable13',
                            fieldLabel: '反射率',
                            listeners:{
                                blur:function(txt){
                                    txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }  
                        }
                    ]
                } , {
                    layout: 'hbox',
                    defaults: {
                        xtype: 'textfield',
                        margin: '0 0 0 3',
                        width: 240,
                        labelWidth: 80
                    },
                    items: [
                      {
                            name:'lottable15',
                            fieldLabel: '重量',
							listeners:{
								blur:function(txt){
									txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
								}
							}  
                        },
                        {
                            name:'lottable14',
                            fieldLabel: '极差',
                            listeners:{
                                blur:function(txt){
                                    txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }  
                        }
                       
                    ]
                }
                
            ]
    	});
    	return this.pt1topform;
    },
	
	 //底部面板
    createBottomPanel: function(){
    	this.bottompanel = Ext.create('Ext.panel.Panel',{
    		region: 'center',
    		layout: 'border',
    		border: false,
    		items:[this.createDetailGrid()]
    	});
    	return this.bottompanel;
    },
	
	//底部Grid
    createDetailGrid: function(){
    	var me = this;
    	this.detailgrid = Ext.create('widget.detailgrid',{
			region: 'center',
			autoHeight: true,
			stripeRows : true,
			autoScroll : true
		});

	   this.detailgrid.getStore().on({
	 	   beforeload:{fn:function(store){
    	 var params = this.detailgrid.getStore().getProxy().extraParams;
    		var values = this.pt1topform.getForm().getFieldValues();
    		var orderKey = values.orderKey;
    		var storerKey = values.storerKey;
    		var type = values.type;
    		var status = values.status;
			var orderNumber = values.orderNumber;
			var sku = values.sku;
			
    		var retailReference = values.retailReference;
    		var buyerpo = values.buyerpo;
			var carrierReference = values.carrierReference;
			
			var consigneeCompany = values.consigneeCompany;
    		var carrierKey = values.carrierKey;
    		var carrierCompany = values.carrierCompany;
			var model = values.model;
		
            var lottable01 = Ext.util.Format.date(values.lottable01,'Y-m-d H:i:s');
            var lottable01Over = Ext.util.Format.date(values.lottable01Over,'Y-m-d H:i:s')
            var lottable02 = Ext.util.Format.date(values.lottable02,'Y-m-d H:i:s')
            var lottable02Over = Ext.util.Format.date(values.lottable02Over,'Y-m-d H:i:s')
            var lottable03 = Ext.util.Format.date(values.lottable03,'Y-m-d H:i:s')
            var lottable03Over = Ext.util.Format.date(values.lottable03Over,'Y-m-d H:i:s')
			
    		var lottable04 = values.lottable04;
			var lottable05 = values.lottable05;
			var lottable06 = values.lottable06;
    		var lottable07 = values.lottable07;
    		var lottable08 = values.lottable08;
    		var lottable09 = values.lottable09;
			var lottable10 = values.lottable10;
			var lottable11 = values.lottable11;
			var lottable12 = values.lottable12;
			var lottable13 = values.lottable13;
			var lottable14 = values.lottable14;
			var lottable15 = values.lottable15;
//			var dStart = values.dStart;
//			var dEnd = values.dEnd;
    		
			var dStart = Ext.util.Format.date(values.dStart,'Y-m-d H:i:s');
            var dEnd = Ext.util.Format.date(values.dEnd,'Y-m-d H:i:s');
            
			var consigneeKey = values.consigneeKey;
    		
    		delete params.orderKey;
    		delete params.storerKey;
    		delete params.type;
    		delete params.status;
			delete params.orderNumber;
			delete params.sku;
		  
			delete params.retailReference;
            delete params.buyerpo;
            delete params.carrierReference;
            delete params.consigneeCompany;
            delete params.carrierKey;
            delete params.carrierCompany;
            delete params.model;
			
			delete params.lottable01;
            delete params.lottable01Over;
            delete params.lottable02;
            delete params.lottable02Over;
            delete params.lottable03;
            delete params.lottable03Over;
            
    		delete params.lottable04;
			delete params.lottable05;
			delete params.lottable06;
    		delete params.lottable07;
			delete params.lottable08;
    		delete params.lottable09;
    		delete params.lottable10;
    		delete params.lottable11;
			delete params.lottable12;
			delete params.lottable13;
    		delete params.lottable14;
			delete params.lottable15;
			delete params.dStart;
			delete params.dEnd;
			delete params.consigneeKey;
    		
    		if(orderKey) params.orderKey = orderKey;
    		if(storerKey) params.storerKey = storerKey;
    		if(type) params.type = type;
    		if(status) params.status = status;
			if(orderNumber) params.orderNumber = orderNumber;
			if(sku) params.sku = sku;

			if(retailReference) params.retailReference = retailReference;
    		if(buyerpo) params.buyerpo = buyerpo;
    		if(carrierReference) params.carrierReference = carrierReference;
			if(consigneeCompany) params.consigneeCompany = consigneeCompany;
			if(carrierKey) params.carrierKey = carrierKey;
			if(carrierCompany) params.carrierCompany = carrierCompany;
			if(model) params.model = model;
			
			if(lottable01) params.lottable01 = lottable01;
            if(lottable01Over) params.lottable01Over = lottable01Over;
            if(lottable02) params.lottable02 = lottable02;
            if(lottable02Over) params.lottable02Over = lottable02Over;
            if(lottable03) params.lottable03 = lottable03;
            if(lottable03Over) params.lottable03Over = lottable03Over;
            
    		if(lottable04) params.lottable04 = lottable04;
			if(lottable05) params.lottable05 = lottable05;
			if(lottable06) params.lottable06 = lottable06;
    		if(lottable07) params.lottable07 = lottable07;
    		if(lottable08) params.lottable08 = lottable08;
    		if(lottable09) params.lottable09 = lottable09;
			if(lottable10) params.lottable10 = lottable10;
    		if(lottable11) params.lottable11 = lottable11;
			if(lottable12) params.lottable12 = lottable12;
			if(lottable13) params.lottable13 = lottable13;
    		if(lottable14) params.lottable14 = lottable14;
			if(lottable15) params.lottable15 = lottable15;
			if(dStart) params.dStart = dStart;
			if(dEnd) params.dEnd = dEnd;
			if(consigneeKey) params.consigneeKey = consigneeKey;
         },scope: this},
           //计算本页总数量
        load:{fn:function(store){
            //此处在本页添加四个值(Lee)
                var var1Total = store.sum('qtyOrdered');
                var var1Html = '<b><font color=green>'+Ext.util.Format.number(var1Total,'0,000')+'</font></b>';
                var1PageSum.update(var1Html);
                //qtyExpectedPageSum.setText(exTotal);
                var var2Total = store.sum('qtyShipped');
                var var2Html = '<b><font color=green>'+Ext.util.Format.number(var2Total,'0,000')+'</font></b>';
                var2PageSum.update(var2Html);
                //qtyReceivedPageSum.setText(reTotal);
                var var3Total = store.sum('qtyUomShipped');
                var var3Html = '<b><font color=green>'+Ext.util.Format.number(var3Total,'0,000')+'</font></b>';
                var3PageSum.update(var3Html);
                var var4Total = store.sum('lottable15');
                var var4Html = '<b><font color=green>'+Ext.util.Format.number(var4Total,'0,000')+'</font></b>';
                var4PageSum.update(var4Html);
                //qtyReceivedPageSum.setText(reTotal);
            },scope: this}
            }); 
        return this.detailgrid;
    }
});


Ext.onReady(function(){
	Ext.create('Ext.container.Viewport', {
	    layout: 'border',
	    items: [{
	    	xtype:'sotab',
	    	region:'center'
	    }]
	});
});
 
