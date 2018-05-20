Ext.define('ReceiptDetail', {
	extend: 'Ext.data.Model',
	fields: [
		{name:'id'},            
		{name:'receiptKey'},
		{name:'storerKey'},
		{name:'rownum'},//行号
		{name:'lineNumber'},//行号
		//外部引用的三个字段
		{name:'poKey'},//PO号
		{name:'uomCode'},//单位
		{name:'qtyUomReceived'},//实收数
		{name:'description'},//包装单位
		{name:'desea'},//单位
		{name:'status'},//状态
		{name:'	type'},//类型
		{name:'sku'},//商品
		{name:'name'},//中文品名
		{name:'packKey'},//包装
		{name:'uom'},//单位
		{name:'qtyExpected',type:'float'},//预期数量
		{name:'qtyReceived',type:'float'},//实收数量  
		{name:'toloc'},//上架库位
		{name:'lottable01',type:'date',dateFormat : 'Y-m-d H:i:s.u'},//入库日期
		{name:'lottable02',type:'date',dateFormat : 'Y-m-d H:i:s.u'},//生产日期
		{name:'lottable03',type:'date',dateFormat : 'Y-m-d H:i:s.u'},//失效日期
		{name:'lottable04'},//批属性04            
		{name:'lottable05'},//批属性05
		{name:'lottable06'},//批属性06
		{name:'lottable07'},//批属性07
		{name:'lottable08'},//批属性08
		{name:'lottable09'},//批属性09
		{name:'lottable10'},//批属性10
		{name:'lottable11'},//批属性11
		{name:'lottable12'},//批属性12
		{name:'lottable13'},//批属性13
		{name:'lottable14'},//批属性14
		{name:'lottable15',type:'float'},//重量
		{name:'lottable16'},//批属性16
		{name:'lottable17'},//批属性17
		{name:'lottable18'},//批属性18
		{name:'lottable19'},//批属性19
		{name:'lottable20'},//批属性20
		{name:'udf1',type:'float'},//面积
		{name:'dateReceipted',type:'date',dateFormat : 'Y-m-d H:i:s.u'}//收货日期
	]
});

Ext.define('Redm.inbound.DetailGrid',{
    extend: 'Redm.BaseGrid',
    alias : 'widget.detailgrid',
    autoLoad: false,
    selModel: Ext.create('Ext.selection.CheckboxModel'),
    buildColumns: function(){
        this.columns = [
		    { header: "行号", dataIndex: 'lineNumber', width: 60, sortable: true},
			{ header: "ASN#", dataIndex: 'receiptKey', width: 110, sortable: true},
			{ header: "PO编号", dataIndex: 'poKey', width: 50, sortable: true},
			{ header: "商品", dataIndex: 'sku', width: 110, sortable: true},
		    { header: "中文名称", dataIndex: 'name', width: 150, sortable: true},
		    { header: "包装", dataIndex: 'packKey', width: 50, sortable: true},
		    { header: "单位", dataIndex: 'desea', width: 50, sortable: true},
		    { header: "预期数量", dataIndex: 'qtyExpected', width: 80, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    { header: "实收数量", dataIndex: 'qtyReceived', width: 80, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    { header: "包装单位", dataIndex: 'description', width: 70, sortable: true},
		    { header: "实收数", dataIndex: 'qtyUomReceived', width: 120, sortable: true},
			{ header: "面积", dataIndex: 'udf1', width: 90, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
			{ header: "重量", dataIndex: 'lottable15', width: 90, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
			{ header: "上架库位", dataIndex: 'toloc', width: 120, sortable: true},
			{ header: '收货日期', dataIndex: 'lottable01',width: 130,sortable: true,renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
		    { header: "批号", dataIndex: 'lottable04', width: 110, sortable: true},
		    { header: "托盘号", dataIndex: 'lottable05', width: 110, sortable: true},
		    { header: "卷号", dataIndex: 'lottable06', width: 110, sortable: true},
		    { header: "等级", dataIndex: 'lottable07', width: 110, sortable: true},
		    { header: "外观代码", dataIndex: 'lottable08', width: 110, sortable: true},
		    { header: "表面处理", dataIndex: 'lottable09', width: 110, sortable: true},
		    { header: "规格", dataIndex: 'lottable10', width: 110, sortable: true},
		    { header: "id", dataIndex: 'id',hidden: true}
		];
		return true;
    },
	buildDockedItems: function(){
		 var me = this;
        qtyExpectedPageSum = Ext.create('widget.tbtext',{
            text: '0',
            format: '0,000'
        });
        qtyReceivedPageSum = Ext.create('widget.tbtext',{
            text: '0',
            format: '0,000'
        });
        lot15PageSum = Ext.create('widget.tbtext',{
            text: '0',
            format: '0,000'
        });
        udf1PageSum = Ext.create('widget.tbtext',{
            text: '0',
            format: '0,000'
        });
        qtyExpectedSum = Ext.create('widget.tbtext',{
            text: '0',
            format: '0,000'
        });
        qtyReceivedSum = Ext.create('widget.tbtext',{
            text: '0',
            format: '0,000'
        });
        lot15Sum = Ext.create('widget.tbtext',{
            text: '0',
            format: '0,000'
        });
        udf1Sum = Ext.create('widget.tbtext',{
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
                        handler: me.onSelect,          //第一个tab页面查询按钮
                        scope: this
                    },
                    '-',
                    {
                        iconCls: 'icon-reset',
                        text: '重置',
                        handler: this.onReset,        //第一个tab页面重置按钮，清空查询条件
                        scope: this
                    },
					'-',
					{
						iconCls: 'icon-upload',
                        text: '导出',
                        handler: this.onPrintAsnReceipt,
                        scope: this
                    }
                   //以下方法可能不需要使用，后面再看(Lee)
                   /* ,'-',
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
                        text: '页预数：'
                    },qtyExpectedPageSum,{
                        xtype: 'label',
                        forId: 'myFieldId2',
                        text: '页实数：'
                    },qtyReceivedPageSum,{
                        xtype: 'label',
                        forId: 'myFieldId1',
                        text: '页重：'
                    },lot15PageSum,
                    {
                        xtype: 'label',
                        forId: 'myFieldId1',
                        text: '页面积：'
                    },udf1PageSum,
                    '-',{
                        xtype: 'label',
                        forId: 'myFieldId3',
                        text: '总预数：'
                    },qtyExpectedSum,{
                        xtype: 'label',
                        forId: 'myFieldId4',
                        text: '总实数：'
                    },qtyReceivedSum,{
                        xtype: 'label',
                        forId: 'myFieldId4',
                        text: '总重：'
                    },lot15Sum,{
                        xtype: 'label',
                        forId: 'myFieldId4',
                        text: '，总面积：'
                    },udf1Sum
                ]
            }
        ];
	},
     initComponent: function(){
    	var me = this;
    	this.buildStore(basePath + '/report/doQueryReceiptDetailReportInfo.action','ReceiptDetail',20);
        this.callParent(arguments);
    },
   
	//ASN类型解析函数
    rendererTypeFunc:function(value){
            var retValue;
            if(value=='0') retValue='正常';
            else  retValue=value;
            return retValue;
        }, 

	//ASN状态解析函数
    rendererStatusFunc:function(value){
            var retValue;
            if(value=='0') retValue='新建';
            else if(value=='1') retValue='部分收货';
            else if(value=='2') retValue='全部收货';
            else if(value=='3') retValue='部分收货上架中';
            else if(value=='4') retValue='全部收货上架中';
            else if(value=='5') retValue='部分收货部分上架';
            else if(value=='6') retValue='部分收货全部上架';
            else if(value=='7') retValue='全部收货部分上架';
            else if(value=='8') retValue='全部收货全部上架';
            else if(value=='9') retValue='关闭';
            else  retValue=value;
            return retValue;
        },    
     //第一个tab页面查询按钮
     // this.onQueryQtySum()为查询grid显示的总数的方法(Lee)
    onSelect: function(){
		var father = this.ownerCt.ownerCt;
		var storedKeyValue=father.pt1topform.getForm().findField('storerKey').getValue();
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
    	var father = this.ownerCt.ownerCt;
    	father.pt1topform.getForm().reset();
    },
      //查询总重量
    onQueryQtySum:function(){
        var me = this.ownerCt.ownerCt;
        var values = me.pt1topform.getForm().getFieldValues();
            
        var receiptKey = values.receiptKey;
        var storerKey = values.storerKey;
        var type = values.type;
        var status = values.status;
        var poKey = values.poKey;
        var sku = values.sku;
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
        Ext.Ajax.request({
                    url: basePath + '/report/doQueryReceiptReportInfoSum.action',
                    params: {
                        receiptKey:receiptKey,
                        storerKey:storerKey,
                        type:type,
                        status:status,
                        poKey:poKey,
                        sku:sku,
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
                        lottable01Over:lottable01Over,
                        lottable02Over:lottable02Over,
                        lottable03Over:lottable03Over
                    },
                    success: function(response){
                        var text = Ext.decode(response.responseText);
                        var success = text.success;
                        if(0 != text.json.data.length){
                            var sumqtyexpected=text.json.data[0].sumqtyexpected;
                            var sumqtyreceived=text.json.data[0].sumqtyreceived;
                            var sumlot15 = text.json.data[0].sumlot15;
                            var sumudf1=text.json.data[0].sumudf1;
                            
                            if(null==sumqtyexpected || ""==sumqtyexpected){
                                sumqtyexpected=0;
                            }
                            if(null==sumqtyreceived || ""==sumqtyreceived){
                                sumqtyreceived=0;
                            }
                            if(null==sumlot15 || ""==sumlot15){
                                sumlot15=0;
                            }
                            if(null==sumudf1 || ""==sumudf1){
                                sumudf1=0;
                            }
                            var sumqtyexpectedtotalHtml = '<b><font color=green>'+Ext.util.Format.number(sumqtyexpected,'0,000')+'</font></b>';
                            qtyExpectedSum.update(sumqtyexpectedtotalHtml);
                            
                            var sumqtyreceivedHtml = '<b><font color=green>'+Ext.util.Format.number(sumqtyreceived,'0,000')+'</font></b>';
                            qtyReceivedSum.update(sumqtyreceivedHtml);
                            
                            var sumlot15Html = '<b><font color=green>'+Ext.util.Format.number(sumlot15,'0,000')+'</font></b>';
                            lot15Sum.update(sumlot15Html);
                            
                            var sumudf1Html = '<b><font color=green>'+Ext.util.Format.number(sumudf1,'0,000')+'</font></b>';
                            udf1Sum.update(sumudf1Html);
                            
                        }
                    }
            });  
        },
        
	onPrintAsnReceipt: function(){
		var me = this.ownerCt.ownerCt;
  		var values = me.pt1topform.getForm().getFieldValues();
    		
		var receiptKey = values.receiptKey;
    	var storerKey = values.storerKey;
		var type = values.type;
		var status = values.status;
    	var poKey = values.poKey;
		var sku = values.sku;
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
        
		//导出excel格式的报表
		window.location.href = basePath+'/report/receiptReport.action?string='+storerKey+","+receiptKey+","+type+","+status+","+poKey
																			+","+lottable01+","+lottable02+","+lottable03+","+lottable04+","+lottable05
																			+","+lottable06+","+lottable07+","+lottable08+","+lottable09+","+lottable10
																			+","+lottable11+","+lottable12+","+lottable13+","+lottable14+","+lottable15
                                                                            +","+lottable01Over+","+lottable02Over+","+lottable03Over+","+sku;

    }	
   
});

//最外部组件定义
Ext.define('Redm.inbound.AsnTab',{
	extend: 'Ext.panel.Panel',
    alias : 'widget.asntab',
    title:'入库报表',
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
    		height: '34%',
    		border: false,
    		items:[this.createPt1TopForm()]
    	});
    	return this.toppanel;
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
	
   //顶部查询From
	createPt1TopForm: function(){
    	this.pt1topform = Ext.create('Ext.form.Panel',{
    		region: 'center',
    		layout: 'vbox',
			autoHeight: true,
			stripeRows : true,
			autoScroll : true,
    		frame: true,
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
                        margin: '5 0 0 5',
                        width: 240,
                        labelWidth: 80
                    },
                    items: [
                        {
                            fieldLabel: '货主',
                            name: 'storerKey',
							allowBlank: false,
                            listeners:{
                                 blur:function(txt){
									txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
								}
                            }                                
                        },
                        {
                            fieldLabel: 'ASN号',
                            name: 'receiptKey',
                            listeners:{
                                 blur:function(txt){
									txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
								}
                            }                 
                        },
                        {
                            fieldLabel: 'ASN类型',
                            name: 'type',
                            xtype:'codecombo',
                            codeType:'SOTYPE'  
                        },
                        {
                            fieldLabel: 'ASN状态',
                            name: 'status',
                            xtype:'codecombo',
                            codeType:'ASNSTATUS'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults: {
                        //xtype: 'combobox',
                        xtype: 'textfield',
                        margin: '5 0 0 5',
                        width: 240,
                        labelWidth: 80
                    },
                    items: [
                        {
                            fieldLabel: 'PO编号',
                            name: 'poKey',
                            xtype: 'textfield',
                            listeners:{
                                 blur:function(txt){
									txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
								}
                            }                 
                        },
						{
                            name:'sku',
                            fieldLabel: '商品',
                            xtype: 'textfield',
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
                        margin: '5 0 0 5',
                        width: 240,
                        labelWidth: 80
                    },
                    items: [
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
                             name:'lottable05',
                            fieldLabel: '托盘号',
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
                        margin: '5 0 0 5',
                        width: 240,
                        labelWidth: 80
                    },
                    items: [
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
                            name:'lottable08',
                            fieldLabel: '外观代码',
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
                        margin: '5 0 0 5',
                        width: 240,
                        labelWidth: 80
                    },
                    items: [
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
                ,
                {
                    layout: 'hbox',
                    defaults: {
                        xtype: 'textfield',
                        margin: '5 0 0 5',
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
                            name:'lottable09',
                            fieldLabel: '表面处理',
                            listeners:{
                                blur:function(txt){
                                    txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }  
                        },
                        {
                            name:'lottable10',
                            fieldLabel: '规格',
                            listeners:{
                                blur:function(txt){
                                    txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }  
                        },  {
                            name:'lottable07',
                            fieldLabel: '等级',
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
    		var receiptKey = values.receiptKey;
    		var storerKey = values.storerKey;
			var type = values.type;
			var status = values.status;
    		var poKey = values.poKey;
			var sku = values.sku;
		
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
			
			
    		delete params.receiptKey;
    		delete params.storerKey;
    		delete params.type;
    		delete params.status;
			delete params.poKey;
			delete params.sku;
    		
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
    		
    		if(receiptKey) params.receiptKey = receiptKey;
    		if(storerKey) params.storerKey = storerKey;
    		if(type) params.type = type;
    		if(status) params.status = status;
			if(poKey) params.poKey = poKey;
			if(sku) params.sku = sku;
    		
    
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
			
    	 },scope: this},
             //计算本页总数量
        load:{fn:function(store){
        	//此处在本页添加四个值(Lee)
                var qtyExpectedTotal = store.sum('qtyExpected');
                var qtyExpectedHtml = '<b><font color=green>'+Ext.util.Format.number(qtyExpectedTotal,'0,000')+'</font></b>';
                qtyExpectedPageSum.update(qtyExpectedHtml);
                var qtyReceivedTotal = store.sum('qtyReceived');
                var qtyReceivedtotalHtml = '<b><font color=green>'+Ext.util.Format.number(qtyReceivedTotal,'0,000')+'</font></b>';
                qtyReceivedPageSum.update(qtyReceivedtotalHtml);
                var lot15Total = store.sum('lottable15');
                var lot15totalHtml = '<b><font color=green>'+Ext.util.Format.number(lot15Total,'0,000')+'</font></b>';
                lot15PageSum.update(lot15totalHtml);
                var udf1Total = store.sum('udf1');
                var udf1totalHtml = '<b><font color=green>'+Ext.util.Format.number(udf1Total,'0,000')+'</font></b>';
                udf1PageSum.update(udf1totalHtml);
            },scope: this}
            }); 
		return this.detailgrid;
    }
});

Ext.onReady(function(){
	Ext.create('Ext.container.Viewport', {
	    layout: 'border',
	    items: [{
	    	xtype:'asntab',
	    	region:'center'
	    }]
	});
});