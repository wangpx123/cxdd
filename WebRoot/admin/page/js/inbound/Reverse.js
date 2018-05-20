/******************************************************

取消收货  Reverse.js


*******************************************************/

Ext.define('Receipt', {
    extend: 'Ext.data.Model',
    fields: [
		{name:'id'},
		{name:'externReceiptkey'},            
		{name:'receiptKey'},//入库单号
		{name:'type'},//类型
		{name:'status'},//状态
		{name:'orderDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},//创建日期
		{name:'storerKey'},//货主
		{name:'storerDescr'},//货主名称
		{name:'dateStart',type:'date',dateFormat : 'Y-m-d H:i:s.u'},//预期到货日期
		{name:'dateEnd'},
		{name:'receiptgroup'},//订单组别
		{name:'poKey'},//PO号
		{name:'dock'},//收货平台
		{name:'dateReceipted',type:'date',dateFormat : 'Y-m-d H:i:s.u'},//实际到货日期
		{name:'dateReceived',type:'date',dateFormat : 'Y-m-d H:i:s.u'},//入库日期
		{name:'vendorRefence'},//供应商参考号
		{name:'vesselRefence'},//运输参考号
		{name:'otherRefence1'},//其它参考号1
		{name:'otherRefence2'},//其它参考号2
		{name:'otherRefence3'},//其它参考号3
		{name:'otherRefence4'},//其它参考号4
		{name:'udf1'},//自定义1
		{name:'udf2'},//自定义2
		{name:'udf3'},//自定义3
		{name:'udf4'},//自定义4
		{name:'udf5'},//自定义5
		{name:'vesselType'},//车型
		{name:'vesselNo'},//车牌号
		{name:'driver'},//司机
		{name:'vesselDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},//装车时间
		{name:'placeofloading'},//装车地点
		{name:'origincountry'},//原产国
		{name:'placeofdischarge'},//卸货地点
		{name:'placeofdelivery'},//交货地点 
		{name:'destination'},//目的地
		{name:'transMethod'},//运输方式
		{name:'paymentTerms'},//支付方式
		{name:'incoTerms'},//交货方式
		{name:'deliveryNotes'},//交货描述
		{name:'vendor'},//供应商
		{name:'vendorName'},//供应商名称
		{name:'vendorAddress1'},//供应商地址
		{name:'vendorContact'},//联系人
		{name:'vendorMobile'},//手机
		{name:'vendorTel'},//电话
		{name:'shipto'},//收货方
		{name:'shiptoName'},//收货方名称
		{name:'shiptoAddress1'},//收货方地址
		{name:'shiptoContact'},//收货方联系人
		{name:'shiptoMobile'},//收货方手机
		{name:'shiptoTel'},//收货方电话
		{name:'carrier'},//承运商
		{name:'carrierName'},//承运商名称
		{name:'carrierAddress1'},//承运商地址
		{name:'carrierContact'},//承运商联系人
		{name:'carrierMobile'},//承运商手机
		{name:'carrierTel'},//承运商电话
		{name:'notes'}//备注
	],
    idProperty: 'id'
});


Ext.define('ReceiptDetail', {
	extend: 'Ext.data.Model',
	fields: [
		{name:'id'},            
		{name:'receiptKey'},
		{name:'storerKey'},
		{name:'externReceiptkey'},
		{name:'externLineno'},
		{name:'lineNumber'},//行号
		{name:'status'},//状态
		{name:'poKey'},//PO号            
		{name:'poLineno'},//PO行号
		{name:'sku'},//商品
		{name:'altsku'},//别名
		{name:'name'},//中文品名
		{name:'descr'},//英文品名
		{name:'packKey'},//包装
		{name:'uom'},//单位            
		{name:'ti'},//TixHi
		{name:'hi'},
		{name:'qtyExpected'},//预期数量
		{name:'qtyReceived'},//实收数量
		{name:'fromloc'},//收货库位
		{name:'cube'},//体积
		{name:'wgt'},//毛重            
		{name:'toloc'},//上架库位
		{name:'tolot'},//入库批次
		{name:'conditionCode'},//冻结编码
		{name:'holdReason'},//冻结原因
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
		{name:'lottable15'},//批属性15
		{name:'udf1'},//自定义1
		{name:'udf2'},//自定义2
		{name:'udf3'},//自定义3
		{name:'udf4'},//自定义4
		{name:'udf5'},//自定义5
		{name:'notes'}//备注
	]
});


//EXTJS ajax的同步调用
function ajaxSyncCall(value, paramsStr) {   
    var obj;   
    var value;   
    if (window.ActiveXObject) {   
        obj = new ActiveXObject('Microsoft.XMLHTTP');   
    }else if (window.XMLHttpRequest) {   
        obj = new XMLHttpRequest();   
    }   
    obj.open('POST', basePath+'/system/queryCodeDetail.action', false);   
    obj.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');   
    obj.send(paramsStr);   
    var result = Ext.decode(obj.responseText);   
    
    var arr = result.json.data;  
    var desc = ''
    Ext.Array.each(arr, function(name, index, countriesItSelf) {
    	if(name.codeValue == value){
    		desc = name.description;
    	}
	});
    return  desc;
}


// 抽象为 Pn1Grid
Ext.define('Redm.inbound.ReverseReceiptGrid',{
	extend: 'Redm.BaseGrid',
    alias : 'widget.reversereceiptgrid',
    buildColumns: function(){
        this.columns = [
		    { header: "ASN编号", dataIndex: 'receiptKey', width: 110, sortable: true},
		    { header: "货主", dataIndex: 'storerKey', width: 80, sortable: true},
		    { header: "PO编号", dataIndex: 'poKey', width: 80, sortable: true},
		    { header: "ASN类型", dataIndex: 'type', width: 80, sortable: true,
                   renderer: function(value,metadata,record){
					return ajaxSyncCall(value,'codeType=ASNTYPE');
			    }
            },
		    { header: "ASN状态", dataIndex: 'status', width:120, sortable: true,
                    renderer:this.rendererStatusFunc
            },
		    { header: "预期到货日期", dataIndex: 'dateStart', width: 120, sortable: true,editor:{xtype:'datefield',format:'Y-m-d H:i'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i')},
		    { header: "入库日期", dataIndex: 'dateReceived', width: 120, sortable: true,editor:{xtype:'datefield',format:'Y-m-d H:i'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i')},
		    { header: "供应商", dataIndex: 'vendor', width: 80, sortable: true},
		    { header: "目的地", dataIndex: 'destination', width: 110, sortable: true},
		    { header: "承运商", dataIndex: 'carrier', width: 80, sortable: true},
		    { header: "供应商参考号", dataIndex: 'vendorRefence', width: 110, sortable: true},
		    { header: "运输参考号", dataIndex: 'vesselRefence', width: 110, sortable: true}
		];
		return true;
    },
    buildDockedItems: function(){
    	var me = this;
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
		//与Receipt查询方法共用一个
		this.buildStore(basePath + '/inbound/doQueryReverseReceipt.action','Receipt',20);
		this.callParent(arguments);
	},
    
//ASN类型解析函数
    rendererTypeFunc:function(value)
        {
            var retValue;
            if(value=='0') retValue='正常';
            else  retValue=value;
            return retValue;
        }, 
    
//ASN状态解析函数
    rendererStatusFunc:function(value)
        {
            var retValue;
            if(value=='0') return retValue='新建';
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
        }   

});

//同一个panel上，抽象为Pn2Grid

Ext.define('Redm.inbound.ReverseReceiptDetailGrid',{
	extend: 'Redm.BaseGrid',
    alias : 'widget.reversereceiptdetailgrid',
    autoLoad:false,   //特别注意，不会自动加载
    selModel:Ext.create('Ext.selection.CheckboxModel', {}),
    buildColumns: function(){
        this.columns = [
		    { header: "行号", dataIndex: 'lineNumber', width: 60, sortable: true},
		    { header: "商品", dataIndex: 'sku', width: 110, sortable: true},
//		    { header: "别名", dataIndex: 'altsku', width: 110, sortable: true},
		    { header: "中文名称", dataIndex: 'name', width: 150, sortable: true},
		    { header: "英文名称", dataIndex: 'descr', width: 150, sortable: true},
		    { header: "状态", dataIndex: 'status', width: 100, sortable: true,
                    renderer:this.rendererDetailStatusFunc
            }, 
		    { header: "冻结码", dataIndex: 'conditionCode', width: 50, sortable: true,
                    renderer:this.rendererConditionCodeFunc
            },
		    { header: "冻结原因", dataIndex: 'holdReason', width: 80, sortable: true},
		    { header: "包装", dataIndex: 'packKey', width: 50, sortable: true},
		    { header: "单位", dataIndex: 'uom', width: 50, sortable: true},
		    { header: "TI", dataIndex: 'ti', width: 30, sortable: true},
		    { header: "HI", dataIndex: 'hi', width: 30, sortable: true},
		    { header: "收货库位", dataIndex: 'fromloc', width: 120, sortable: true},
		    { header: "上架库位", dataIndex: 'toloc', width: 120, sortable: true},
		    { header: "预期数量", dataIndex: 'qtyExpected', width: 80, sortable: true},
		    { header: "实收数量", dataIndex: 'qtyReceived', width: 80, sortable: true},
		    { header: "入库批次", dataIndex: 'tolot', width: 110, sortable: true},
		    { header: '收货日期', dataIndex: 'lottable01',width: 130,sortable: true,renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},//入库日期
		    { header: '生产日期', dataIndex: 'lottable02',width: 130,sortable: true,renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},//生产日期
		    { header: '失效日期', dataIndex: 'lottable03',width: 130,sortable: true,renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},//失效日期
		    { header: "生产批号", dataIndex: 'lottable04', width: 110, sortable: true},
		    { header: "托盘号", dataIndex: 'lottable05', width: 110, sortable: true},
		    { header: "成品卷号", dataIndex: 'lottable06', width: 110, sortable: true},
		    { header: "等级", dataIndex: 'lottable07', width: 110, sortable: true},
		    { header: "外观代码", dataIndex: 'lottable08', width: 110, sortable: true},
		    { header: "表面处理", dataIndex: 'lottable09', width: 110, sortable: true},
		    { header: "规格", dataIndex: 'lottable10', width: 110, sortable: true},
		    { header: "包装形式", dataIndex: 'lottable11', width: 110, sortable: true},
		    { header: "ASN号", dataIndex: 'lottable12', width: 110, sortable: true},
		    { header: "反射率", dataIndex: 'lottable13', width: 110, sortable: true},
		    { header: "极差", dataIndex: 'lottable14', width: 110, sortable: true},
		    { header: "批重量", dataIndex: 'lottable15', width: 110, sortable: true},
		    { header: "PO编号", dataIndex: 'poKey', width: 50, sortable: true},
		    { header: "PO行号", dataIndex: 'poLineno', width: 50, sortable: true},
		    { header: "单价", dataIndex: 'cube', width: 50, sortable: true},       //需要增加单价字段
		    { header: "体积", dataIndex: 'cube', width: 50, sortable: true},
		    { header: "净重", dataIndex: 'wgt', width: 50, sortable: true},        //需要增加净重字段
		    { header: "毛重", dataIndex: 'wgt', width: 50, sortable: true},
		    { header: "面积", dataIndex: 'udf1', width: 110, sortable: true},
		    { header: "自定义2", dataIndex: 'udf2', width: 110, sortable: true},
		    { header: "自定义3", dataIndex: 'udf3', width: 110, sortable: true},
		    { header: "自定义4", dataIndex: 'udf4', width: 110, sortable: true},
		    { header: "自定义5", dataIndex: 'udf5', width: 110, sortable: true},
		    { header: "id", dataIndex: 'id',hidden: true}
		];
		return true;
    },
    buildDockedItems: function(){
    	var me = this;
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
        //与ReceiptDetail 查询方法共用一个
		this.buildStore(basePath + '/inbound/doQueryReverseReceiptDetail.action','ReceiptDetail',20);
		this.callParent(arguments);
	},
    //明细表状态解析方法
    rendererDetailStatusFunc:function(value)
        {
            var retValue;
            if(value=='0') return retValue='新建';
            else if(value=='0') retValue='新建';
            else if(value=='5') retValue='收货完成';
            else  retValue=value;
            return retValue;
        },
    //明细表中冻结码的解析，暂时定义只有两个
    rendererConditionCodeFunc:function(value)
        {
            var retValue;
            if(value=='0')  retValue='正常';
            else if(value=='1')  retValue='损坏';
            else   retValue=value;
            return retValue;
        }

});

//Manager 定义，最外部的容器

Ext.define('Redm.inbound.ReverseManager',{  //与功能相关的命名
	extend: 'Ext.panel.Panel',   //只有一个panel，需要改为继承 Ext.panel.Panel
    alias : 'widget.reversemanager',
    title: '取消收货',
    layout: 'border',
    tabPosition: 'bottom',
    initComponent: function(){
    	var me = this;
    	this.items = [this.createPn1Panel(),this.createPn2Panel(),this.createTopPanel()];
        this.callParent(arguments);
    },

    onSelect: function(){
    	this.pn1grid.getStore().load();
    },


    onReset: function(){
    	this.topform.getForm().reset();
    },

    
/************************************************************************************************* 
/组件名称： TopPanel
/创建方法： createPn1Panel
/位置：     位于manager顶部，'center'位置，继承Ext.form.Panel
/内部组件： 内部的组件上下结构，均继承Ext.form.Panel，上中下分别为Btn1,TopForm,Btn2
/           命名为Pn1Grid，Pn12Grid。也可以放一个tabform。本例只有一个TopForm
/作者：
/功能描述
/
*************************************************************************************************/ 
    createTopPanel: function(){
    	this.toppanel = Ext.create('Ext.panel.Panel',{
    		region: 'north',
    		layout: 'border',
    		border: false,
    		height: 115,
    		items:[this.createTopForm()]
    	});
    	return this.toppanel;
    },
    

/************************************************************************************************* 
/组件名称： TopForm
/创建方法： createTopForm
/位置：     位于TopPanel中部，'center'位置，继承Ext.form.Panel
/内部组件： 查询框，输入框，和查询类的按钮
/           
/作者：
/功能描述
/
*************************************************************************************************/     
    createTopForm: function(){
    	var me = this;
    	this.topform = Ext.create('Ext.form.Panel',{
    		region: 'center',
    		frame: true,
    		layout: 'vbox',
    		defaults: {
    			xtype: 'fieldcontainer',
    			margin: '5 0 0 5'
    		},

    		items:[
                {
                    layout: 'hbox',
                    defaults: {
//                        xtype: 'combobox',
                        margin: '5 0 0 5',
                        width: 240,
                        labelWidth: 80
                    },
                    items: [
                        {
                            fieldLabel: '货主',
                            xtype: 'textfield',
                            name: 'storerKey',
                            listeners: {
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }
                        },
                        {
                            fieldLabel: 'ASN编号',
                            name: 'receiptKey',
                            xtype: 'textfield'
                        },
                        {
                            fieldLabel: 'ASN类型',
                            xtype:'codecombo',
                            codeType:'ASNTYPE',
                            name: 'type'
                        },
                        {
                            fieldLabel: 'ASN状态',
                            xtype:'codecombo',
                            codeType:'ASNSTATUS',
                            name: 'status'
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
                            fieldLabel: 'PO编号',
                            name: 'poKey'
                            //xtype: 'textfield'
                        },
                        {
                            fieldLabel: '供应商',
                            name: 'vendor',
                            listeners: {
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }                            
                        },
                        {
                            fieldLabel: '收货方 ',
                            name: 'shipto',
                            listeners: {
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }                            
                        }
                    ]
                },
                {
                   xtype: 'fieldcontainer',
                   layout: 'hbox',
                   defaults: {
                       margin: '3 2 3 2',
                       xtype: 'textfield',
                       width:80
                   },
                   items: [
                        {
                            xtype:'button',
                            margin: '3 2 3 236',  //控制在行的中间
                            text : "查询",
                            iconCls: 'icon-search',
                            scope : this,
                            handler: me.onSelect
                        },
                        {
                            xtype:'button',
                            margin: '3 2 3 28',
                            text : "重置",
                            iconCls: 'icon-reset',
                            scope : this,
                            handler: me.onReset
                        },
                        {
                            xtype:'button',
                            margin: '3 2 3 28',
                            text : "取消订单",
                            iconCls: 'icon-delete',
                            id:'cancelAllBtn',
                            scope : this,
                            handler: this.onReverseReceiptItems
                        },
                        {
                            xtype:'button',
                            margin: '3 2 3 28',
                            text : "取消明细",
                            iconCls: 'icon-delete',
                            id:'cancelPartBtn',
                            scope : this,
                            handler: this.onReverseReceiptDetailItems
                        }
                   ]
                }
            ]
    	});
    	return this.topform;
    },
/************************************************************************************************* 
/ 名称：Pn1Panel
/ 位置：位于中部，'center'位置，内部的组件左右结构，上边有一个或者多个Grid，
/       命名为Pn1Grid，Pn12Grid。也可以放一个tabform。本例只有一个grid
/作者：
/功能描述：
/
*************************************************************************************************/ 
    createPn1Panel: function(){
    	var me = this;
    	this.pn1panel = Ext.create('Ext.panel.Panel',{
    		layout: 'border',
            region:'center',
    		border: false,
    		items:[this.createPn1Grid()]
    	});
    	return this.pn1panel;
    },
  
/************************************************************************************************* 
/ 名称：Pn1Grid
/ 位置：位于中部，'center'位置，
/   
/作者：
/功能描述： 创建 reversereceiptgrid，显示对应数据
/
*************************************************************************************************/ 
    //Grid的创建 ，如果有多个，在同一panel上从左到右排列
    createPn1Grid: function(){
    	var me = this;
    	this.pn1grid = Ext.create('widget.reversereceiptgrid',{
    		region: 'center'

    		//选中记录后内容显示在对应的form上，grid的固定用法
    		//本功能可以考虑选中后，不显示在form上
/*			listeners: {
				itemclick: function(grid,record){
//					me.topform.getForm().loadRecord(record);   //查询不能显示选中的内容
				}
			} */   		

    	});
        
        this.pn1grid.on('itemclick',function(grid,record){
			me.pn2grid.getStore().load();
		},this);

    	//查询选项可以放在这里
    	this.pn1grid.getStore().on('beforeload',function(){
    		var params = this.pn1grid.getStore().getProxy().extraParams;
    		var record = me.topform.getForm().getValues();
    		
    		var storerKey = record.storerKey;
    		var receiptKey = record.receiptKey;
    		var type = record.type;
    		var status = record.status;
    		var poKey = record.poKey;

			delete params.storerKey;
			delete params.receiptKey;
			delete params.type;
			delete params.status;
            delete params.poKey;
    		
			if(storerKey) params.storerKey = storerKey;
         	if(receiptKey) params.receiptKey = receiptKey;
			if(type) params.type = type;
         	if(status) params.status = status;
            if(poKey) params.poKey = poKey;
    	},this);
        
    	return this.pn1grid;
    },
  

/************************************************************************************************* 
/ 名称：Pn2Panel
/ 位置：manager 上最下边的panel，放置内容同Pn1Panel，内部是左右结构
/       内部组件命名为Pn2Grid，Pn22Grid，或者TabForm。本例只有一个grid
/作者：
/功能描述： 
/
*************************************************************************************************/     
    
    
//Pn2Panel 创建及相关的定义
    
    createPn2Panel: function(){
    	var me = this;
    	this.pn2panel = Ext.create('Ext.panel.Panel',{
    		layout: 'border',
            region:'south',
    		border: false,
            height:280,
    		items:[this.createPn2Grid()]
    	});
    	return this.pn2panel;
    },

/***********************************************************************************************
/ 名称：Pn2Grid
/ 位置：位于中部，'center'位置，
/   
/作者：
/功能描述： 创建 reversereceiptdetailgrid，显示对应数据
/
*************************************************************************************************/ 
    createPn2Grid: function(){
    	var me = this;
    	this.pn2grid = Ext.create('widget.reversereceiptdetailgrid',{
    		region: 'center'

            });
    	this.pn2grid.getStore().on('beforeload',function(){
    		var params = this.pn2grid.getStore().getProxy().extraParams;
            //查询条件
			var records = me.pn1grid.getSelectionModel().getSelection(); 
			if(records != ''){
                var data = records[0].getData();
				var receiptKey = data.receiptKey;
				delete params.receiptKey;
				if(receiptKey) params.receiptKey = receiptKey;
			}
        },this);
    	return this.pn2grid;
    },

//取消主表表选中的收货记录
    onReverseReceiptItems: function(){
    	var me = this;
    	var records = me.pn1grid.getSelectionModel().getSelection(); 
        var num = records.length;  // 复选后的记录数，然后通过循环删除

        //取消收货完成前禁用收货按钮
        Ext.getCmp('cancelPartBtn').disable();
        Ext.getCmp('cancelAllBtn').disable();

    	if(records == ""){
    		MessageBox.error('错误提示','请选择取消的数据！');
            //返回前使能收货按钮
            Ext.getCmp('cancelPartBtn').enable();
            Ext.getCmp('cancelAllBtn').enable();              
    		return;
    	}
    	else{
    		var record = records[0].getData();
    		Ext.MessageBox.confirm('询问提示', '确定要取消所选信息吗？', 
    				function(btn){
    					if(btn == 'yes'){
							var mask = new Ext.LoadMask(me.getEl(), { 
								msg : 'please wait...' 
							});
							mask.show();
						
    						Ext.Ajax.request(
        						{
        						    url: basePath + '/inbound/doReverseReceipt.action',
        						    params: {
        						    	receiptKey: record.receiptKey
        						    },
        						    success: function(response)
        						    {
        						        var text = Ext.decode(response.responseText);
        						        var success = text.success;
										mask.hide();
        						        MessageBox.show(success, text.json.msg);
                                    	me.topform.getForm().reset();    //清空查询条件再load
        						        me.pn1grid.getStore().load();
        						        me.pn2grid.getStore().load();
        						    },
									timeout: 100000000
        						}
    						);
    					}
    				}
			    ); 
    	    }
        //取消收货完成后使能收货按钮
        Ext.getCmp('cancelPartBtn').enable();
        Ext.getCmp('cancelAllBtn').enable();            
    },


//取消明细表选中的收货记录
    onReverseReceiptDetailItems: function(){
    	var me = this;
    	var records = me.pn2grid.getSelectionModel().getSelection(); 
        var num = records.length;  // 复选后的记录数，然后通过循环删除

        //取消收货完成前禁用收货按钮
        Ext.getCmp('cancelPartBtn').disable();
        Ext.getCmp('cancelAllBtn').disable();
    	
    	if(records == ""){
    		MessageBox.error('错误提示','请选择取消的数据！');
            //返回前使能收货按钮
            Ext.getCmp('cancelPartBtn').enable();
            Ext.getCmp('cancelAllBtn').enable();             
    		return;
    	}
    	else{
            var ids = []; 
            Ext.Array.each(records, function(name, index, countriesItSelf) {
                ids.push(name.getData().id);
            });
            console.log(ids);
    		Ext.MessageBox.confirm('询问提示', '确定要取消所选信息吗？', 
    				function(btn){
    					if(btn == 'yes'){
							var mask = new Ext.LoadMask(me.getEl(), { 
								msg : 'please wait...' 
							});
							mask.show();
						
    						Ext.Ajax.request(
        						{
        						    url: basePath + '/inbound/doReverseReceiptDetail.action',
        						    params: {
        						    	ids: ids
        						    },
        						    success: function(response)
        						    {
        						        var text = Ext.decode(response.responseText);
        						        var success = text.success;
										mask.hide();
        						        MessageBox.show(success, text.json.msg);
                                    	me.topform.getForm().reset();    //清空查询条件再load
        						        me.pn1grid.getStore().load();
        						        me.pn2grid.getStore().load();
        						    },
									timeout: 100000000
        						}
    						);
    					}
    				}
			    ); 
    	    }
        //取消收货完成后使能收货按钮
        Ext.getCmp('cancelPartBtn').enable();
        Ext.getCmp('cancelAllBtn').enable();            
    },

    
/***********************************************************************************************
/ 名称：其他方法
/ 位置：
/   
/作者：
/功能描述：
/
*************************************************************************************************/ 
    //本功能暂无存盘需求
    saveStrategyAndDetail: function(){

    }
});



Ext.onReady(function(){
	Ext.create('Ext.container.Viewport', {
	    layout: 'border',
	    items: [{
	    	xtype:'reversemanager',
	    	region:'center'
	    }]
	});
});