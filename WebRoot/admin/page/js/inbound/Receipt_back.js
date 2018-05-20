/*********************************

预期到货通知ASN



***********************************/

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
		{name:'dateEnd',type:'date',dateFormat : 'Y-m-d H:i:s.u'},//预期到货日期结束
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
		{name:'notes'},//备注
		{name:'vendorNation'},
		{name:'vendorProvince'},
		{name:'vendorCity'},
		{name:'vendorAddress2'},
		{name:'vendorPosition'},
		{name:'vendorFax'},
		{name:'vendorEmail'},
		{name:'carrierNation'},
		{name:'carrierProvince'},
		{name:'carrierCity'},
		{name:'carrierAddress2'},
		{name:'carrierPosition'},
		{name:'carrierFax'},
		{name:'carrierEmail'},
		{name:'shiptoNation'},
		{name:'shiptoProvince'},
		{name:'shiptoCity'},
		{name:'shiptoAddress2'},
		{name:'shiptoPosition'},
		{name:'shiptoFax'},
		{name:'shiptoEmail'},
        {name:'addDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
        {name:'addWho'},
        {name:'editDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
        {name:'editWho'}    
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
		{name:'dpoKey'},//PO号            
		{name:'poLineno'},//PO行号
		{name:'sku'},//商品
		{name:'altsku'},//别名
		{name:'name'},//中文品名
		{name:'descr'},//英文品名
		{name:'packKey'},//包装
		{name:'uom'},//单位            
		{name:'ti'},//TixHi
		{name:'hi'},
		{name:'qtyUomExpected',type:'float'},//预期单位数量
		{name:'qtyExpected',type:'float'},//预期数量
		{name:'qtyUomReceived',type:'float'},//实收单位数量
		{name:'qtyReceived',type:'float'},//实收数量
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
		{name:'notes'},//备注
        {name:'addDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
        {name:'addWho'},
        {name:'editDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
        {name:'editWho'}    
        
	]
});


Ext.define('PaDetail', {
	extend: 'Ext.data.Model',
	fields: [
    {name:'id'},
    {name:'serialNo'}, 
	{name:'receiptKey'},
    {name:'lineNumber'}, 
	{name:'status'},
	{name:'gid'},
	{name:'uom'},
	{name:'uomqty',type:'float'},  //计算上架数量
	{name:'paqty',type:'float'},   //实际上架数量
    {name:'qty',type:'float'},     //单位对应的EA数量，总的EA数量=uomqty*qty
	{name:'paloc'},
    {name:'addDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
    {name:'addWho'},
    {name:'editDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
    {name:'editWho'},   
    {name:'description'}   
	]
});

    //JS的方法，没有用到
function  onTestSetReaOnly(){
        var me=this;
        
        me.childdetailForm.getForm().findField('sku').setReadOnly(true);
        me.childdetailForm.getForm().findField('altsku').setReadOnly(true);
        me.childdetailForm.getForm().findField('packKey').setReadOnly(true);
        me.childdetailForm.getForm().findField('uom').setReadOnly(true);
        me.childdetailForm.getForm().findField('qtyUomExpected').setReadOnly(true);
        me.childdetailForm.getForm().findField('qtyUomReceived').setReadOnly(true);    
        me.childdetailForm.getForm().findField('fromloc').setReadOnly(true);         
        me.childdetailForm.getForm().findField('toloc').setReadOnly(true);         
        me.childdetailForm.getForm().findField('dpoKey').setReadOnly(true);         
        me.childdetailForm.getForm().findField('poLineno').setReadOnly(true);         
        me.childdetailForm.getForm().findField('lottable01').setReadOnly(true);         
        me.childdetailForm.getForm().findField('lottable02').setReadOnly(true);         
        me.childdetailForm.getForm().findField('lottable03').setReadOnly(true);         
        me.childdetailForm.getForm().findField('lottable04').setReadOnly(true);         
        me.childdetailForm.getForm().findField('lottable05').setReadOnly(true);         
        me.childdetailForm.getForm().findField('lottable06').setReadOnly(true);         
        me.childdetailForm.getForm().findField('lottable07').setReadOnly(true);         
        me.childdetailForm.getForm().findField('lottable08').setReadOnly(true);         
        me.childdetailForm.getForm().findField('lottable09').setReadOnly(true);         
        me.childdetailForm.getForm().findField('lottable10').setReadOnly(true);
    };

//单位、数量转换用到的存储结构
Ext.define('UomData', {
	extend: 'Ext.data.Model',
	fields: [
		{name:'packKey'},            
		{name:'uomCode'},
		{name:'uomDescr'},
		{name:'uomQty'},
		{name:'description'}
	]
});


Ext.define('Redm.inbound.ReceiptGrid', {
    extend: 'Redm.BaseGrid',
    alias : 'widget.receiptgrid',
    loadMask: true,
    forceLayout:true,
    buildColumns: function(){
        this.columns = [
		    { header: "ASN编号", dataIndex: 'receiptKey', width: 110, sortable: true},
		    { header: "货主", dataIndex: 'storerKey', width: 80, sortable: true},
		    { header: "PO编号", dataIndex: 'poKey', width: 80, sortable: true},
		    { header: "ASN类型", dataIndex: 'type', width: 80, sortable: true,
                    renderer:this.rendererTypeFunc
            },
		    { header: "ASN状态", dataIndex: 'status', width: 120, sortable: true,
                    renderer:this.rendererStatusFunc
            },
		    { header: "预期到货日期", dataIndex: 'dateStart', width: 120, sortable: true,editor:{xtype:'datefield',format:'Y-m-d H:i'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i')},
		    { header: "入库日期", dataIndex: 'dateReceived', width: 150, sortable: true,editor:{xtype:'datefield',format:'Y-m-d H:i'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i')},
		    { header: "供应商", dataIndex: 'vendor', width: 80, sortable: true},
		    { header: "目的地", dataIndex: 'destination', width: 110, sortable: true},
		    { header: "承运商", dataIndex: 'carrier', width: 80, sortable: true},
		    { header: "供应商参考号", dataIndex: 'vendorRefence', width: 110, sortable: true},
		    { header: "运输参考号", dataIndex: 'vesselRefence', width: 110, sortable: true},
			{ header: "创建时间", dataIndex: 'addDate', width: 140, sortable: true,renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s'),hidden:true},
			{ header: "创建人", dataIndex: 'addWho', width: 140, sortable: true,hidden:true}            
		];
		return true;
    },
	buildDockedItems: function(){
		var me = this;
		this.dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                items: [
                    {
                        iconCls: 'icon-create',
                        text: '创建',
                        scope: this,
                        handler: this.onCreate         //创建按钮，跳转到第二个tab页面，并清空相关form
                    },
                    '-',
                    {
                        iconCls: 'icon-delete',
                        itemId: 'delete',
                        text: '删除',
                        scope: this,
                        handler: this.onDelete         //第一个tab页面删除按钮，删除主表选中记录和明细表相关记录
                    },
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
                        text: '导入',
                        handler: this.onImport,    //从excel导入功能，尚未调试
                        scope: this
                    }

/*  暂不实现快速搜索
                    '->',
                    {
                        width: 260,
                        fieldLabel: '快速搜索',
                        labelWidth: 60,
                        emptyText: '请输入货主、编号查询',
                        xtype: 'searchfield',
                        store: me.store       //暂不实现，待后续研究
                     }*/
                 ]
            },
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
    	this.buildStore(basePath+'/inbound/doQueryReceipt.action','Receipt',20); //加载时获取数据
    	this.on('itemdblclick',function(grid,record){    //鼠标双击跳到另外一个界面
    		var father = grid.ownerCt.ownerCt.ownerCt;
    		father.setActiveTab(1);               //自身跳到第1个tab页
            father.childdetailpanel.setActiveTab(0);   //第2页也有多个tab页，停留在第0个上
    		father.basicForm.getForm().loadRecord(record);
	        father.customerForm.getForm().loadRecord(record);
	        father.clForm.getForm().loadRecord(record);
	        father.childdetailgrid.getStore().load();   //这一行是detailgrid加载对应的数据
	        //father.pt2pn1f7form.getStore().load();     //该form的数据也显示不出来，后续再查
            father.basicForm.getForm().findField('storerKey').setReadOnly(true);
            
            var status=father.basicForm.getForm().findField('status').getValue();
            if(status!='0')
            {   //load 时判断如果状态不是0，则只读状态
                father.onSetReceiptReadOnly(true); 
                //关键字段也设置只读
                father.onSetReceiptKeyReadOnly(true); 
            }
            else
            {    //主表除关键字段外，取消只读
                father.onSetReceiptReadOnly(false); 
                //关键字段也设置只读
                father.onSetReceiptKeyReadOnly(true); 
            }

    	},this);
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
    onSelect: function(){
    	this.getStore().load();
    },
    
    //第一个tab页面重置按钮，清空查询条件
    onReset: function(){
    	var father = this.ownerCt.ownerCt;
    	father.pt1topform.getForm().reset();
    },
    
    //创建按钮，跳转到第二个tab页面，并清空相关form
    onCreate: function(){
		var father = this.ownerCt.ownerCt;
        //跳转语句需要在这里执行
		father.setActiveTab(1);
        //执行father的onCreate事件
        father.onCreate();

	},
    
    //第一个tab页面删除按钮，删除主表选中记录和明细表相关记录
	onDelete: function(){
		var me = this;
		var records = this.getSelectionModel().getSelection(); 
		if(records == ""){
			MessageBox.error('错误提示','请选择操作的数据！');
			return;
		}
		var data = records[0].getData();
        
        Ext.MessageBox.confirm('询问提示', '确定要删除吗？', 
            function(btn){
                if(btn == 'yes'){    
                    Ext.Ajax.request({
                        url: basePath + '/inbound/doDeleteReceipt.action',
                        params: {
                            receiptKey: data.receiptKey
                        },
                        success: function(response){
                            var text = Ext.decode(response.responseText);
                            var success = text.success;
                            MessageBox.show(success, text.json.msg);
                            if(success==true)
                            {
                                me.getStore().load();   //删除成功，才重新加载主表grid
                            }
                        }
                    });
                }
            }
        );
	},

    //POdetail grid面板上的导入按钮
	onImport: function(){
		this.winItems = this.createForm();
		this.winConfig = {
			height: 110,
			width: 400,
			maximizable: false,
			resizable: false,
			title: '采购入库单信息导入',
			items: this.winItems,
			buttons: this.createButtons()
		};
		this.showWindow();
	},
    
    //创建导入面板对话框
	createForm: function(){
		var form = Ext.create('Ext.form.Panel', {
	        autoHeight: true,
//	        bodyPadding: '1 10 1 1',
	        width: 400,
	        bodyPadding: '10 10 0',
	        defaults: {
	            anchor: '100%',
	            allowBlank: false,
	            msgTarget: 'side',
	            labelWidth: 60
	        },
	        items: [
                {
                    xtype: 'filefield',
                    id: 'filedata',
                    emptyText: '选择Excel数据文件',
                    fieldLabel: '数据文件',
                    name: 'filedata',
                    buttonText: '',
                    buttonConfig: {
                        iconCls: 'icon-create'
                    }
                }
            ]
   		});			
	    return form;
	},

    //导入面板上的按钮
	createButtons: function(){
		var buttons = [
            {
                text: '保存',
                scope: this,
                iconCls: 'icon-save',
                handler: this.doSaveImportData
            },
            {
                text: '关闭',
                scope: this,
                iconCls: 'icon-cancel',
                handler: this.closeWindow
            }
        ];
		return buttons;
	},

    doSaveImportData: function(){
		var me = this;
		var form = this.winItems.getForm();
        if (form.isValid()) {
            form.submit({
            	url: basePath + '/inbound/importReceiptData.action',

            	waitMsg: '正在上传数据，请稍候……',
                success: function(form, action) {
                	if(action.result.success){
	            	   	me.closeWindow();
	                   MessageBox.show(true, action.result.msg,function(){
	                   		me.getStore().load();
	                   });
                	}
                },
                failure: function(form, action) {
                	me.closeWindow();
                    MessageBox.show(false, action.result.msg);
                }
            });
        }
	}
    
});

Ext.define('Redm.inbound.MoneyGrid',{
    extend: 'Redm.BaseGrid',
    alias : 'widget.moneygrid',
    buildColumns: function(){
        this.columns = [
		    { header: "序号", dataIndex: '', width: 150, sortable: true},
		    { header: "收费日期", dataIndex: '', width: 110, sortable: true},
		    { header: "收费类型", dataIndex: '', width: 150, sortable: true},
		    { header: "描述", dataIndex: '', width: 110, sortable: true},
		    { header: "id", dataIndex: 'id',hidden: true}
		];
		return true;
    },
	buildDockedItems: function(){
		var me = this;
		this.dockedItems = [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    iconCls: 'icon-create',
                    text: '创建',
                    scope: this,
                    handler: this.onCreate
                },
                '-',
                {
                    iconCls: 'icon-update',
                    itemId: 'save',
                    text: '修改',
                    disabled: true,
                    scope: this,
                    handler: this.onEdit
                },
                '-',
                {
                    iconCls: 'icon-delete',
                    itemId: 'delete',
                    text: '删除',
                    disabled: true,
                    scope: this,
                    handler: this.onDelete
                }
            ]
        },
            {
                xtype: 'pagingtoolbar',
                store: this.store, 
                dock: 'bottom',
                displayInfo: true
            }
        ];
	},
    initComponent: function(){
    	this.callParent(arguments);
    }
	
});

Ext.define('Redm.inbound.OtherGrid',{
	 extend: 'Redm.BaseGrid',
     alias : 'widget.othergrid',
     buildColumns: function(){
        this.columns = [
		    { header: "序号", dataIndex: '', width: 150, sortable: true},
		    { header: "集装箱号", dataIndex: '', width: 110, sortable: true},
		    { header: "类型", dataIndex: '', width: 150, sortable: true},
		    { header: "尺寸", dataIndex: '', width: 110, sortable: true},
		    { header: "铅封号", dataIndex: '', width: 150, sortable: true},
		    { header: "重量", dataIndex: '', width: 110, sortable: true},
		    { header: "备注", dataIndex: '', width: 110, sortable: true},
		    { header: "id", dataIndex: 'id',hidden: true}
		];
		return true;
    },
	buildDockedItems: function(){
		var me = this;
		this.dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                items: [
                    {
                        iconCls: 'icon-create',
                        text: '创建',
                        scope: this,
                        handler: this.onCreate
                    },
                    '-',
                    {
                        iconCls: 'icon-update',
                        itemId: 'save',
                        text: '修改',
                        disabled: true,
                        scope: this,
                        handler: this.onEdit
                    },
                    '-',
                    {
                        iconCls: 'icon-delete',
                        itemId: 'delete',
                        text: '删除',
                        disabled: true,
                        scope: this,
                        handler: this.onDelete
                    }
                ]
            },
            {
                xtype: 'pagingtoolbar',
                store: this.store, 
                dock: 'bottom',
                displayInfo: true
            }
        ];
	},
    initComponent: function(){
    	this.callParent(arguments);
    }
	
});

Ext.define('Redm.inbound.PreBookGrid',{
	 extend: 'Redm.BaseGrid',
     alias : 'widget.prebookgrid',
     buildColumns: function(){
        this.columns = [
		    { header: "ASN序号", dataIndex: '', width: 150, sortable: true},
		    { header: "序号", dataIndex: '', width: 110, sortable: true},
		    { header: "车牌号", dataIndex: '', width: 150, sortable: true},
		    { header: "司机", dataIndex: '', width: 110, sortable: true},
		    { header: "卸载平台", dataIndex: '', width: 110, sortable: true},
		    { header: "开始卸载时点", dataIndex: '', width: 150, sortable: true},
		    { header: "卸货时间（分钟）", dataIndex: '', width: 110, sortable: true},
		    { header: "id", dataIndex: 'id',hidden: true}
		];
		return true;
    },
	buildDockedItems: function(){
		var me = this;
		this.dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                items: [
                    {
                        iconCls: 'icon-create',
                        text: '创建',
                        scope: this,
                        handler: this.onCreate
                    },
                    '-',
                    {
                        iconCls: 'icon-update',
                        itemId: 'save',
                        text: '修改',
                        disabled: true,
                        scope: this,
                        handler: this.onEdit
                    },
                    '-',
                    {
                        iconCls: 'icon-delete',
                        itemId: 'delete',
                        text: '删除',
                        disabled: true,
                        scope: this,
                        handler: this.onDelete
                    }
                ]
            },
            {
                xtype: 'pagingtoolbar',
                store: this.store, 
                dock: 'bottom',
                displayInfo: true
            }
        ];
	},
    initComponent: function(){
    	this.callParent(arguments);
    }
});

Ext.define('Redm.inbound.DetailGrid',{
    extend: 'Redm.BaseGrid',
    alias : 'widget.detailgrid',
    autoLoad: false,
    selModel: Ext.create('Ext.selection.CheckboxModel'),
    buildColumns: function(){
        this.columns = [
		    { header: "行号", dataIndex: 'lineNumber', width: 60, sortable: true},
		    { header: "商品", dataIndex: 'sku', width: 110, sortable: true},
		    { header: "别名", dataIndex: 'altsku', width: 110, sortable: true},
		    { header: "中文名称", dataIndex: 'name', width: 150, sortable: true},
		    { header: "英文名称", dataIndex: 'descr', width: 150, sortable: true},
		    { header: "状态", dataIndex: 'status', width: 80, sortable: true,
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
		    { header: "预期单位数量", dataIndex: 'qtyUomExpected', width: 80, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    { header: "预期数量", dataIndex: 'qtyExpected', width: 80, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    { header: "实收单位数量", dataIndex: 'qtyUomReceived', width: 80, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    { header: "实收数量", dataIndex: 'qtyReceived', width: 80, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    { header: "入库批次", dataIndex: 'tolot', width: 110, sortable: true},
		    { header: '批属性01', dataIndex: 'lottable01',width: 130,sortable: true,renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},//入库日期
		    { header: '批属性02', dataIndex: 'lottable02',width: 130,sortable: true,renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},//生产日期
		    { header: '批属性03', dataIndex: 'lottable03',width: 130,sortable: true,renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},//失效日期
		    { header: "批属性04", dataIndex: 'lottable04', width: 110, sortable: true},
		    { header: "批属性05", dataIndex: 'lottable05', width: 110, sortable: true},
		    { header: "批属性06", dataIndex: 'lottable06', width: 110, sortable: true},
		    { header: "批属性07", dataIndex: 'lottable07', width: 110, sortable: true},
		    { header: "批属性08", dataIndex: 'lottable08', width: 110, sortable: true},
		    { header: "批属性09", dataIndex: 'lottable09', width: 110, sortable: true},
		    { header: "批属性10", dataIndex: 'lottable10', width: 110, sortable: true},
		    { header: "批属性11", dataIndex: 'lottable11', width: 110, sortable: true},
		    { header: "批属性12", dataIndex: 'lottable12', width: 110, sortable: true},
		    { header: "批属性13", dataIndex: 'lottable13', width: 110, sortable: true},
		    { header: "批属性14", dataIndex: 'lottable14', width: 110, sortable: true},
		    { header: "批属性15", dataIndex: 'lottable15', width: 110, sortable: true},
		    { header: "PO编号", dataIndex: 'dpoKey', width: 50, sortable: true},
		    { header: "PO行号", dataIndex: 'poLineno', width: 50, sortable: true},
		    { header: "单价", dataIndex: 'cube', width: 50, sortable: true},       //需要增加单价字段
		    { header: "体积", dataIndex: 'cube', width: 50, sortable: true},
		    { header: "净重", dataIndex: 'wgt', width: 50, sortable: true},        //需要增加净重字段
		    { header: "毛重", dataIndex: 'wgt', width: 50, sortable: true},
		    { header: "自定义1", dataIndex: 'udf1', width: 110, sortable: true},
		    { header: "自定义2", dataIndex: 'udf2', width: 110, sortable: true},
		    { header: "自定义3", dataIndex: 'udf3', width: 110, sortable: true},
		    { header: "自定义4", dataIndex: 'udf4', width: 110, sortable: true},
		    { header: "自定义5", dataIndex: 'udf5', width: 110, sortable: true},
			{ header: "创建时间", dataIndex: 'addDate', width: 140, sortable: true,renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s'),hidden:true},
			{ header: "创建人", dataIndex: 'addWho', width: 140, sortable: true,hidden:true},            
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
    	this.buildStore(basePath+'/inbound/doQueryReceiptDetail.action','ReceiptDetail',20);
    	this.on('itemdblclick',function(grid,record){    //鼠标双击跳到另外一个界面
           	var me = this;
            var father = grid.ownerCt.ownerCt.ownerCt.ownerCt.ownerCt;    //father 指最终的创建者
    		father.childdetailpanel.setActiveTab(1);   //必须由childdetailpanel来设置激活的页面
	        father.childdetailForm.getForm().loadRecord(record);   
            father.pt2pn2f5grid.getStore().load();
            var status=father.childdetailForm.getForm().findField('status').getValue();

            if(status!='0')
            {   //load 时判断如果状态不是0，则只读状态
                //设置明细表字段只读
                father.onSetDetailReadOnly(true);       
                //关键字段也设置只读
                father.onSetDetailKeyReadOnly(true); 
            }
            else
            {   //因设置后状态一直不变，在加载新建的记录时，需要重新设置取消只读
                //另外，新建时主表或者添加明细记录，需要设置可以编辑，收货完成需要设置只读
                father.onSetDetailReadOnly(false);                
                //关键字段也设置只读
                father.onSetDetailKeyReadOnly(true); 
            }
    	},this);        
    	this.callParent(arguments);
    },
    
    //明细表状态解析方法
    rendererDetailStatusFunc:function(value)
        {
            var retValue;
            if(value=='0') retValue='新建';
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

Ext.define('Redm.inbound.PaDetailGrid',{
	 extend: 'Redm.BaseGrid',
     alias : 'widget.padetailgrid',
     autoLoad:false,
     buildColumns: function(){
        this.columns = [
		    { header: "序号", dataIndex: 'serialNo', width: 60, sortable: true},
		    { header: "行号", dataIndex: 'lineNumber', width: 60, sortable: true},
		    { header: "GID", dataIndex: 'gid', hidden: true},
		    { header: "上架库位", dataIndex: 'paloc', width: 110, sortable: true},
		    { header: "单位", dataIndex: 'description', width: 110, sortable: true},   //单位的值从codeDetail中取值
		    { header: "计算上架数量", dataIndex: 'uomqty', width: 110, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    { header: "实际上架数量", dataIndex: 'paqty', width: 110, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    { header: "最小单位数量", dataIndex: 'qty', width: 110, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    { header: "状态", dataIndex: 'status', width: 110, sortable: true,
                            renderer:this.rendererPaDetailStatusFunc
            },
			{ header: "创建时间", dataIndex: 'addDate', width: 140, sortable: true,renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s'),hidden:true},
			{ header: "创建人", dataIndex: 'addWho', width: 140, sortable: true,hidden:true},            
		    { header: "", dataIndex: 'id', hidden: true}
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
    	this.buildStore(basePath+'/inbound/doQueryPADetail.action','PaDetail',20);
    	this.on('itemdblclick',function(grid,record){    //鼠标双击跳到另外一个界面
           	var me = this;
            var father = grid.ownerCt.ownerCt.ownerCt.ownerCt.ownerCt;    //father 指最终的创建者
    		father.childdetailpanel.setActiveTab(5);   //必须由childdetailpanel来设置激活的页面
	        father.pt2pn2f6form.getForm().loadRecord(record);   
    	},this);           
    	this.callParent(arguments);
    },
    
    //明细表状态解析方法
    rendererPaDetailStatusFunc:function(value)
        {
            var retValue;
            if(value=='0') retValue='新建';
            else if(value=='9') retValue='完成';
            else  retValue=value;
            return retValue;
        }    
});


//最外部组件定义
Ext.define('Redm.inbound.AsnTab',{
	extend: 'Ext.tab.Panel',
    alias : 'widget.asntab',
    title:'预期到货通知ASN',
    tabPosition: 'bottom',
    initComponent: function(){
        this.createContextMenuOperationItem();   //必须在这里做一次初始化，菜单中的按钮才会启用
    	this.items = [this.createPt1Panel(),this.createPt2Panel()];
    	this.callParent(arguments);
    },
    

    //JS的方法，
    //设置RECEIPT表一般字段只读属性（manner：true:只读，false:可以编辑）
    //ASN号：配置上只读，货主，新建时可以编辑，其他任何情况下只读
    onSetReceiptReadOnly: function(manner){
        var me=this;
        me.basicForm.getForm().findField('type').setReadOnly(manner);  
        me.basicForm.getForm().findField('orderDate').setReadOnly(manner);  
        me.basicForm.getForm().findField('dateStart').setReadOnly(manner);  
        me.basicForm.getForm().findField('dateEnd').setReadOnly(manner);  
        me.basicForm.getForm().findField('poKey').setReadOnly(manner);  
        me.basicForm.getForm().findField('dateReceipted').setReadOnly(manner);  
        me.basicForm.getForm().findField('dateReceived').setReadOnly(manner);  
        me.basicForm.getForm().findField('vendorRefence').setReadOnly(manner);  
        me.basicForm.getForm().findField('vesselRefence').setReadOnly(manner);  
        me.basicForm.getForm().findField('otherRefence1').setReadOnly(manner);  
        me.basicForm.getForm().findField('otherRefence2').setReadOnly(manner);  
        me.basicForm.getForm().findField('otherRefence3').setReadOnly(manner);  
    },

    //设置RECEIPT表关键字段只读属性（manner：true:只读，false:可以编辑）
    //关键字段包括货主，货主名称。新建时可以编辑，其他任何情况下只读
    onSetReceiptKeyReadOnly: function(manner){
        var me=this;
        me.basicForm.getForm().findField('storerKey').setReadOnly(manner); 
        me.basicForm.getForm().findField('storerDescr').setReadOnly(manner);
    },
    
    //设置明细表字段一般字段只读属性（manner：true:只读，false:可以编辑）
    //行号：配置上只读，sku，新建时可以编辑，其他任何情况下只读
    onSetDetailReadOnly: function(manner){
        var me=this;
        
        me.childdetailForm.getForm().findField('packKey').setReadOnly(manner);
        me.childdetailForm.getForm().findField('uom').setReadOnly(manner);
        me.childdetailForm.getForm().findField('qtyUomExpected').setReadOnly(manner);
        me.childdetailForm.getForm().findField('qtyUomReceived').setReadOnly(manner);    
        me.childdetailForm.getForm().findField('fromloc').setReadOnly(manner);         
        me.childdetailForm.getForm().findField('toloc').setReadOnly(manner);         
        me.childdetailForm.getForm().findField('dpoKey').setReadOnly(manner);         
        me.childdetailForm.getForm().findField('poLineno').setReadOnly(manner);         
        me.childdetailForm.getForm().findField('lottable01').setReadOnly(manner);         
        me.childdetailForm.getForm().findField('lottable02').setReadOnly(manner);         
        me.childdetailForm.getForm().findField('lottable03').setReadOnly(manner);         
        me.childdetailForm.getForm().findField('lottable04').setReadOnly(manner);         
        me.childdetailForm.getForm().findField('lottable05').setReadOnly(manner);         
        me.childdetailForm.getForm().findField('lottable06').setReadOnly(manner);         
        me.childdetailForm.getForm().findField('lottable07').setReadOnly(manner);         
        me.childdetailForm.getForm().findField('lottable08').setReadOnly(manner);         
        me.childdetailForm.getForm().findField('lottable09').setReadOnly(manner);         
        me.childdetailForm.getForm().findField('lottable10').setReadOnly(manner);
        me.childdetailForm.getForm().findField('conditionCode').setReadOnly(manner);
        me.childdetailForm.getForm().findField('holdReason').setReadOnly(manner);
        me.childdetailForm.getForm().findField('udf1').setReadOnly(manner);
        me.childdetailForm.getForm().findField('udf2').setReadOnly(manner);
        me.childdetailForm.getForm().findField('udf3').setReadOnly(manner);
        me.childdetailForm.getForm().findField('udf4').setReadOnly(manner);
        me.childdetailForm.getForm().findField('udf5').setReadOnly(manner);
    },
    
    //设置明细表关键字段只读属性（manner：true:只读，false:可以编辑）
    //关键字段包括 sku，中文名称，英文名称，别名。 新建时可以编辑，其他任何情况下只读
    onSetDetailKeyReadOnly: function(manner){
        var me=this;
        me.childdetailForm.getForm().findField('sku').setReadOnly(manner);  
        me.childdetailForm.getForm().findField('name').setReadOnly(manner); 
        me.childdetailForm.getForm().findField('descr').setReadOnly(manner);
        me.childdetailForm.getForm().findField('altsku').setReadOnly(manner);
    },
    
    
    

    //创建第一个tab页面  ，对应po主表，包括一个 查询的form，和一个grid面板
    createPt1Panel: function(){
    	var me = this;
    	this.pt1panel = Ext.create('Ext.form.Panel',{
    		title: '查询',
    		layout: 'border',
    		border: false,
            items: [this.createPt1TopForm(),this.createReceiptGrid()]
    	});
    	return this.pt1panel;
    },
  
    //创建第一个tab页面的 Receipt Grid
    createReceiptGrid: function(){
    	var me = this;
    	this.receiptgrid = Ext.create('widget.receiptgrid',{
			region: 'center'
		});

    	this.receiptgrid.getStore().on('beforeload',function(store){   //加载前的查询条件
    		var params = store.getProxy().extraParams;
    		var values = this.pt1topform.getForm().getFieldValues();
    		var receiptKey = values.receiptKey;
    		var storerKey = values.storerKey;
    		var type = values.type;
    		var status = values.status;
    		var poKey = values.poKey;
    		
    		delete params.receiptKey;
    		delete params.storerKey;
    		delete params.type;
    		delete params.status;
    		delete params.poKey;
    		
    		if(receiptKey) params.receiptKey = receiptKey;
    		if(storerKey) params.storerKey = storerKey;
    		if(type) params.type = type;
    		if(status) params.status = status;
    		if(poKey) params.poKey = poKey;
    	},this);
        
		return this.receiptgrid;
    },
    
    //创建第一个tab页面的 上部的查询面板
    createPt1TopForm: function(){
    	this.pt1topform = Ext.create('Ext.form.Panel',{
    		region: 'north',
    		layout: 'vbox',
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
                            listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }                                
                        },
                        {
                            fieldLabel: 'ASN号',
                            name: 'receiptKey'
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
                            xtype: 'textfield'
                        },
                        {
                            fieldLabel: '供应商',
                            name: 'vendor'
                        },
                        {
                            fieldLabel: '承运商',
                            name: 'carrier'
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
                            fieldLabel: '采购商PO号'
                        },
                        {
                            fieldLabel: '其他参考号1',
                            name: 'otherRefence1'
                        },
                        {
                            xtype: 'datefield',
                            name: 'orderDate',
                            fieldLabel: '创建日期',
                            format:'Y-m-d H:i:s'
                        },
                        {
                            xtype: 'datefield',
                            name: 'orderDate1',
                            fieldLabel: '  ------>',
                            format:'Y-m-d H:i:s'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults: {
                        xtype: 'datefield',
                        margin: '5 0 0 5',
                        width: 240,
                        labelWidth: 80,
                        format:'Y-m-d'
                    },
                    items: [
                        {
                            fieldLabel: '供应商参考号',
                            name: 'vendorRefence',
                            xtype: 'textfield'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '其他参考号2',
                            name: 'otherRefence2'
                        },
                        {
                            xtype: 'datefield',
                            name: 'dateStart',
                            fieldLabel: '预期到货日期',
                            format:'Y-m-d H:i:s'
                        },
                        {
                            xtype: 'datefield',
                            name: 'dateEnd',
                            fieldLabel: '  ------>',
                            format:'Y-m-d H:i:s'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults: {
                        xtype: 'datefield',
                        margin: '5 0 0 5',
                        width: 240,
                        labelWidth: 80,
                        format:'Y-m-d'
                    },
                    items: [
                        {
                            fieldLabel: '运输参考号',
                            name: 'vesselRefence',
                            xtype: 'textfield'
                        },
                        {
                            fieldLabel: '其他参考号3',
                            name: 'otherRefence3',
                            xtype: 'textfield'
                        },
                        {
                            fieldLabel: '入库日期',
                            name: 'dateReceived',
                            format:'Y-m-d H:i:s'
                        },
                        {
                            fieldLabel: '  ------>',
                            name: 'dateReceived1',
                            format:'Y-m-d H:i:s'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults: {
                        xtype: 'combobox',
                        margin: '5 0 0 5',
                        width: 240,
                        labelWidth: 80
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: '仓库参考号',
                            name: 'otherRefence1'
                        },
                        {
                            fieldLabel: '收货平台'
                        },
                        {
                            fieldLabel: '实际到库日期',
                            xtype: 'datefield',
                            format:'Y-m-d H:i:s'
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: '  ------>',
                            format:'Y-m-d H:i:s'
                        }
                    ]
                }
            ]
    	});
    	return this.pt1topform;
    },  
  
    
    createPt2Panel: function(){
    	var me = this;
    	this.pt2panel = Ext.create('Ext.panel.Panel',{
    		title: '基本',
    		tabPosition: 'bottom',
    		layout: 'border',
    		items: [me.createTopBasic(),me.createBottomBasic()]
    	});
    	return this.pt2panel;
    },
    
//第二个tab 页面的上半部分    
    createTopBasic: function(){
    	var me = this;
    	this.topbasic = Ext.create('Ext.panel.Panel',{
    		region: 'center',
    		layout: 'border',
    		border: false,
    		items: [me.createChildTop(),me.createTopBtn()]
    	});
    	return this.topbasic;
    },

    createTopBtn: function(){
    	var me = this;
    	this.topbtn = Ext.create('Ext.form.Panel',{
    		region: 'north',
    		frame: true,
    		defaults: {
    			xtype: 'button'
    		},
    		items: [
                {
                    iconCls: 'icon-create',
                    text: '创建',
                    scope: this,
                    handler: me.onCreate
                },
                {
                    iconCls: 'icon-delete',
                    text: '删除',
                    scope: this,
                    handler: me.deleteReAndDetal
                },
                {
                    iconCls: 'icon-save',
                    text: '保存',
                    scope: this,
                    id:'saveBtn',
                    handler: me.saveReceipt
                },
                this.OperationAction,
                this.CheckAction,
   				this.printAction,
                this.ImportExportAction
            ]
    	});

    	return this.topbtn;
    },

//initComponent中调用，先做初始化

    createContextMenuOperationItem:function(){

//操作菜单开始

        this.OperationItem1 = Ext.create('Ext.Action', {  //创建Action
			text : "全部收货",
			cls : "x-btn-text-icon",
            id:'allReceiptBtn',
            handler:this.onAsnAllReceipt,
			scope : this
		});
		this.OperationItem2 = Ext.create('Ext.Action', {
			text : "部分收货",
			cls : "x-btn-text-icon",
            id:'partlyReceiptBtn',  
            handler:this.onAsnPartlyReceipt,
			scope : this
		});

		this.OperationItem3 = Ext.create('Ext.Action', {
			text : "码盘收货",
			cls : "x-btn-text-icon",
            handler:this.onVoid,
			scope : this
		});
        
		this.OperationItem4 = Ext.create('Ext.Action', {
			text : "扫描收货",
			cls : "x-btn-text-icon",
            handler:this.onVoid,
			scope : this
		});
        
		this.OperationItem5 = Ext.create('Ext.Action', {
			text : "计算上架",
			cls : "x-btn-text-icon",
            handler:this.onComputePutAway,
			scope : this
		});
        
		this.OperationItem6 = Ext.create('Ext.Action', {
			text : "确认上架",
			cls : "x-btn-text-icon",
            handler:this.onEnforcePutAway,
			scope : this
		});

		this.OperationItem7 = Ext.create('Ext.Action', {
			text : "查询交易日志",
			cls : "x-btn-text-icon",
            handler:this.onVoid,
			scope : this
		});
        
		this.OperationItem8 = Ext.create('Ext.Action', {
			text : "关闭订单",
			cls : "x-btn-text-icon",
            handler:this.onVoid,
			scope : this
		});
        
		this.OperationItem9 = Ext.create('Ext.Action', {
			text : "取消订单",
			cls : "x-btn-text-icon",
            handler:this.onVoid,
			scope : this
		});
        
		this.OperationAction = Ext.create('Ext.Action', {
			text : "操作",
            iconCls: 'icon-edit',
			menu : [
				this.OperationItem1,
				this.OperationItem2,
				this.OperationItem3,
				this.OperationItem4,
				this.OperationItem5,
				this.OperationItem6,
				this.OperationItem7,
				this.OperationItem8,
				this.OperationItem9
			]
		});

//操作菜单结束

//码盘菜单开始

        this.CheckItem1 = Ext.create('Ext.Action', {  //创建Action
			text : "码盘",
			cls : "x-btn-text-icon",
            disabled:true,  //  禁用
            handler:this.onVoid,
			scope : this
		});
		this.CheckItem2 = Ext.create('Ext.Action', {
			text : "取消码盘",
			cls : "x-btn-text-icon",
            handler:this.onVoid,
			scope : this
		});

		this.CheckItem3 = Ext.create('Ext.Action', {
			text : "预约",
			cls : "x-btn-text-icon",
            handler:this.onVoid,
			scope : this
		});
        
		this.CheckItem4 = Ext.create('Ext.Action', {
			text : "取消预约",
			cls : "x-btn-text-icon",
            handler:this.onVoid,
			scope : this
		});
        
		this.CheckAction = Ext.create('Ext.Action', {
			text : "码盘",
            iconCls: 'icon-lookat',
			menu : [
				this.CheckItem1,
				this.CheckItem2,
				this.CheckItem3,
				this.CheckItem4
			]
		});

//码盘菜单结束
    
    
 //打印菜单开始   
        this.printOperItem1 = Ext.create('Ext.Action', {  //创建Action
			text : "收货任务清单",
			cls : "x-btn-text-icon",
			handler: this.onPrintAsnReceipt,
			scope : this
		});
		this.printOperItem2 = Ext.create('Ext.Action', {
			text : "收货任务清单(码盘)",
			cls : "x-btn-text-icon",
            handler:this.onVoid,
			scope : this
		});

		this.printOperItem3 = Ext.create('Ext.Action', {
			text : "上架任务清单",
			cls : "x-btn-text-icon",
            handler:this.onPrintPwDetail,
			scope : this
		});
        
		this.printOperItem4 = Ext.create('Ext.Action', {
			text : "入库验收报告",
			cls : "x-btn-text-icon",
            handler:this.onVoid,
			scope : this
		});
        
		this.printOperItem5 = Ext.create('Ext.Action', {
			text : "托盘号标签",
			cls : "x-btn-text-icon",
            handler:this.onVoid,
			scope : this
		});
		this.printOperItem6 = Ext.create('Ext.Action', {
			text : "入库标签（单）",
			cls : "x-btn-text-icon",
            handler:this.onVoid,
			scope : this
		});
		this.printOperItem7 = Ext.create('Ext.Action', {
			text : "入库标签（全部）",
			cls : "x-btn-text-icon",
            handler:this.onVoid,
			scope : this
		});

        
		this.printAction = Ext.create('Ext.Action', {
			text : "打印",
            iconCls: 'icon-printer',
			menu : [
				this.printOperItem1,
				this.printOperItem2,
				this.printOperItem3,
				this.printOperItem4,
				this.printOperItem5,
				this.printOperItem6,
				this.printOperItem7
			]
		});
//打印菜单结束

//导入导出菜单开始
        this.ImportExportItem1 = Ext.create('Ext.Action', {  //创建Action
			text : "从PO提取",
			cls : "x-btn-text-icon",
			handler: function(){
				this.onPrintClick("ImportExportItem1.action"); //调用Action方法来实现打印。我们可以通过已有方法打印
			},
			scope : this
		});
		this.ImportExportItem2 = Ext.create('Ext.Action', {
			text : "导入ASN",
			cls : "x-btn-text-icon",
			//handler:this.onActionImport,   //对话框已经出来了，存盘尚未调通。
            handler:this.onVoid,
			scope : this
		});

		this.ImportExportItem3 = Ext.create('Ext.Action', {
			text : "导入上架清单",
			cls : "x-btn-text-icon",
            handler:this.onVoid,
			scope : this
		});
        
		this.ImportExportItem4 = Ext.create('Ext.Action', {
			text : "导入序列号",
			cls : "x-btn-text-icon",
            handler:this.onVoid,
			scope : this
		});
        
		this.ImportExportItem5 = Ext.create('Ext.Action', {
			text : "导入收货数据",
			cls : "x-btn-text-icon",
            handler:this.onVoid,
			scope : this
		});
		this.ImportExportItem6 = Ext.create('Ext.Action', {
			text : "导出ASN",
			cls : "x-btn-text-icon",
            handler:this.onVoid,
			scope : this
		});
		this.ImportExportItem7 = Ext.create('Ext.Action', {
			text : "导出验收报告",
			cls : "x-btn-text-icon",
            handler:this.onVoid,
			scope : this
		});

        
		this.ImportExportAction = Ext.create('Ext.Action', {
			text : "导入导出",
            iconCls: 'icon-expand',
			menu : [
				this.ImportExportItem1,
				this.ImportExportItem2,
				this.ImportExportItem3,
				this.ImportExportItem4,
				this.ImportExportItem5,
				this.ImportExportItem6,
				this.ImportExportItem7
			]
		});

        
//导入导出菜单结束
        
//动作菜单结束

        this.ActItem1 = Ext.create('Ext.Action', {  //创建Action
			text : "复制收货日期到所有行",
			cls : "x-btn-text-icon",
            handler:this.onVoid,
			scope : this
		});
		this.ActItem2 = Ext.create('Ext.Action', {
			text : "复制收货库位到所有行",
			cls : "x-btn-text-icon",
            handler:this.onVoid,
			scope : this
		});

		this.ActItem3 = Ext.create('Ext.Action', {
			text : "复制收货人员到所有行",
			cls : "x-btn-text-icon",
            handler:this.onVoid,
			scope : this
		});
        
		this.ActAction = Ext.create('Ext.Action', {
			text : "动作",
            iconCls: 'icon-mhistory',
			menu : [
				this.ActItem1,
				this.ActItem2,
				this.ActItem3
			]
		});


//动作菜单结束

//ASN下部打印菜单开始
        this.BtmPrintOperItem1 = Ext.create('Ext.Action', {  //创建Action
			text : "上架标签（单）",
			cls : "x-btn-text-icon",
            handler:this.onVoid,
			scope : this
		});
		this.BtmPrintOperItem2 = Ext.create('Ext.Action', {
			text : "上架标签（全）",
			cls : "x-btn-text-icon",
           // handler:this.onPrintList,   //测试使用
            //handler:this.onVoid,
			scope : this
		});

		this.BtmPrintOperAction = Ext.create('Ext.Action', {
			text : "打印",
            iconCls: 'icon-printer',
			menu : [
				this.BtmPrintOperItem1,
				this.BtmPrintOperItem2,
				this.BtmPrintOperItem3
			]
		})

//ASN下部打印菜单结束
        
    }, // 菜单初始化结束
    
//各种操作菜单方法开始    
    
    onVoid:function()
    {
       //空方法
    },
 
// 参考库位的批更新来做导入界面 
    onActionImport: function(){
        var me=this;
        me.createWinFrom();
        me.winform.show();
    },
    
    createWinFrom: function(){
    	var me = this;
    	this.winform = Ext.create('Ext.window.Window',{
	    	title: '导入收货数据',
		    height: 150,
		    width: 450,
		    layout: 'vbox',
	        defaults: {
	        	xtype: 'fieldcontainer'
	        },
	        items: [
                {
                    anchor: '100%',
                    allowBlank: false,
                    msgTarget: 'side',
                    labelWidth: 100,
                    xtype: 'filefield',
                    id: 'filedata',
                    emptyText: '选择Excel数据文件     ',
                    fieldLabel: '数据文件',
                    name: 'filedata',
                    margin: '20 0 0 60',
                    buttonText: '',
                    buttonConfig: {
                        iconCls: 'icon-create'
                    }
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 60,
                        width : 80,
                        margin: '20 0 0 60',
                        xtype: 'button'
                    },
                    items: [
                        {
                            text: '保存',
                            scope: this,
                            iconCls: 'icon-save',
                            handler: this.doSaveImportDataAction
                        },
                        {
                            text: '关闭',
                            scope: this,
                            iconCls: 'icon-cancel',
                            handler: function(){
                                me.winform.close();
                            }
                        }
                    ]
                }
            ]
    	});
    	this.winform.on('close',function(){
    		delete this.winform;
    	},this);
    	return this.winform;
    
    },
    
    //上传数据，还没有调通，后续再查
    doSaveImportDataAction: function(){
		var me = this;
		var form = this.winItems.getForm();
        if (form.isValid()) {
            form.submit({
            	url: basePath + '/inbound/importReceiptData.action',

            	waitMsg: '正在上传数据，请稍候……',
                success: function(form, action) {
                	if(action.result.success){
	            	   	me.closeWindow();
	                   MessageBox.show(true, action.result.msg,function(){
	                   		me.getStore().load();
	                   });
                	}
                },
                failure: function(form, action) {
                	me.closeWindow();
                    MessageBox.show(false, action.result.msg);
                }
            });
        }
	},
    
// 参考FHD.js开发，存在问题，暂不启用，用第一个tab页面的来实现
//参考location做的导入对话框已经可以用，后续研究一下为何下边这个不好用
/*
	onActionImport: function(){
       var me = this;
		me.winItems = {
			html: "<iframe id='printer' name='printer' src='"+"' style='width:100%; height:100%;' frameborder='0'></iframe>"
		};
        me.win = me.createPrinterWindow();
        me.prinerWin.show();
		me.prinerWin.on('close',function(){
			delete me.winItems;
			delete me.prinerWin;
			delete me.win;
		},me);
	},

    createPrinterWindow: function(){
		this.prinerWin = Ext.create('widget.window',{
			width: 500,
			height: 180,
	        layout: 'fit',
	        title: '导入ASN',
//			items:[this.winItems]
            items:[this.createForm(),this.createButtons()]
		});
		return this.prinerWin;
    },
    
    //创建导入面板对话框
	createForm: function(){
		var form = Ext.create('Ext.form.Panel', {
	        autoHeight: true,
//	        bodyPadding: '1 10 1 1',
	        width: 400,
	        bodyPadding: '10 10 0',
	        defaults: {
	            anchor: '100%',
	            allowBlank: false,
	            msgTarget: 'side',
	            labelWidth: 60
	        },
	        items: [
                {
                    xtype: 'filefield',
                    id: 'filedata',
                    emptyText: '选择Excel数据文件',
                    fieldLabel: '数据文件',
                    name: 'filedata',
                    buttonText: '',
                    buttonConfig: {
                        iconCls: 'icon-create'
                    }
                }
            ]
   		});			
	    return form;
	},
    //导入面板上的按钮
	createButtons: function(){
		var buttons = [
            {
                text: '保存',
                scope: this,
                iconCls: 'icon-save',
                handler: this.doSaveImportData
            },
            {
                text: '关闭',
                scope: this,
                iconCls: 'icon-cancel',
                handler: this.closeWindow
            }
        ];
		return buttons;
	},
   导入功能暂不启用 */
   
   


    //全部收货
    onAsnAllReceipt:function(){
        var me = this;
        var record = me.basicForm.getForm().getFieldValues(); 
        var receiptKeyValue = record.receiptKey; 
    	if(record.receiptKey == ""){
    		MessageBox.error('错误提示','请选择操作的数据！');
    		return;
    	}else{
            //收货未结束前禁用收货按钮
            Ext.getCmp('allReceiptBtn').disable();
            Ext.getCmp('partlyReceiptBtn').disable();
        
            Ext.Ajax.request({
			    url: basePath + '/inbound/doAsnAllReceipt.action',
			    params: {
			    	receiptKey: record.receiptKey
			    },
			    success: function(response){
			        var text = Ext.decode(response.responseText);
			        var success = text.success;
			        MessageBox.show(success, text.json.msg);
                    if(true==success)
                    {
                        //主表对应的form不能清空，需要单独更新状态
                        me.childdetailForm.getForm().reset();   //清空后明细表状态更新问题就不存在了
                        me.childdetailgrid.getStore().load();
                        me.receiptgrid.getStore().load();

                        //收货完成时，更新主表状态，并 根据主表状态判断是否需要设置主表的字段为只读
                        Ext.Ajax.request({
                            url: basePath + '/inbound/doQueryReceiptStatus.action',
                            params: {
                                receiptKey: receiptKeyValue
                            },
                            success: function(response){
                                var text = Ext.decode(response.responseText);
                                var success = text.success;
                                if(0 != text.json.data.length)   //receiptKey唯一，应该只有一条记录
                                {
                                    //更新主表状态
                                    var statusValue=text.json.data[0].status;
                                    me.basicForm.getForm().findField('status').setValue(statusValue)
                                    if('0'!=statusValue)
                                    {
                                        me.onSetReceiptReadOnly(true);      //根据状态设置是否可以编辑
                                        me.onSetReceiptKeyReadOnly(true); 
                                    }
                                }
                            }
                        });
                    }
			    }
			});
    	}
        //收货完成后使能收货按钮
        Ext.getCmp('allReceiptBtn').enable();
        Ext.getCmp('partlyReceiptBtn').enable();
    },
    
    //部分收货
    onAsnPartlyReceipt:function(){
        var me = this;

        var record = me.basicForm.getForm().getFieldValues(); 
        var receiptKeyValue = record.receiptKey; 
        
		var records = me.childdetailgrid.getSelectionModel().getSelection();
		if(records == ""){
			MessageBox.error("错误提示","请选择要操作的数据！");
		 	return;
		} 
		var ids = []; 
		Ext.Array.each(records, function(name, index, countriesItSelf) {
			ids.push(name.getData().id);
		});
        
        //收货未结束前禁用收货按钮
        Ext.getCmp('allReceiptBtn').disable();
        Ext.getCmp('partlyReceiptBtn').disable();
        
		Ext.Ajax.request({
		    url: basePath + '/inbound/doAsnPartlyReceipt.action',
		    params: {
		    	ids: ids
		    },
		    success: function(response){
		        var text = Ext.decode(response.responseText);
		        var success = text.success;
		        MessageBox.show(success, text.json.msg);
                //收货完成时，需要设置这几个字段为只读
                if(true==success)
                {
                    me.childdetailForm.getForm().reset();   //清空后状态更新问题就不存在了
                    me.childdetailgrid.getStore().load();
                    me.receiptgrid.getStore().load();
                    //收货完成时，更新主表状态，并 根据主表状态判断是否需要设置主表的字段为只读
                    Ext.Ajax.request({
                        url: basePath + '/inbound/doQueryReceiptStatus.action',
                        params: {
                            receiptKey: receiptKeyValue
                        },
                        success: function(response){
                            var text = Ext.decode(response.responseText);
                            var success = text.success;
                            if(0 != text.json.data.length)   //receiptKey唯一，应该只有一条记录
                            {
                                //更新主表状态
                                var statusValue=text.json.data[0].status;
                                me.basicForm.getForm().findField('status').setValue(statusValue)
                                if('0'!=statusValue)
                                {
                                    me.onSetReceiptReadOnly(true);      //根据状态设置是否可以编辑
                                    me.onSetReceiptKeyReadOnly(true); 
                                }
                            }
                        }
                    });
                }
            }
		});        
        //收货完成后使能收货按钮
        Ext.getCmp('allReceiptBtn').enable();
        Ext.getCmp('partlyReceiptBtn').enable();
    },

    //计算上架
    onComputePutAway:function(){
		var me = this;
    	var record = me.basicForm.getForm().getValues(); 
        var receiptKeyValue = record.receiptKey; 
    	if(record.receiptKey == ""){
    		MessageBox.error('错误提示','请选择操作的数据！');
    		return;
    	}
		Ext.Ajax.request({
		    url: basePath + '/inbound/doComputePutAway.action',
		    params: {
		    	receiptKey:record.receiptKey
		    },
		    success: function(response){
		        var text = Ext.decode(response.responseText);
		        var success = text.success;
		        MessageBox.show(success, text.json.msg);
                if(true==success)
                {
                    me.receiptgrid.getStore().load();  //更新状态
                    //计算上架完成时，更新主表状态，并 根据主表状态判断是否需要设置主表的字段为只读
                    Ext.Ajax.request({
                        url: basePath + '/inbound/doQueryReceiptStatus.action',
                        params: {
                            receiptKey: receiptKeyValue
                        },
                        success: function(response){
                            var text = Ext.decode(response.responseText);
                            var success = text.success;
                            if(0 != text.json.data.length)   //receiptKey唯一，应该只有一条记录
                            {
                                //更新主表状态
                                var statusValue=text.json.data[0].status;
                                me.basicForm.getForm().findField('status').setValue(statusValue)
                                if('0'!=statusValue)
                                {
                                    me.onSetReceiptReadOnly(true);      //根据状态设置是否可以编辑
                                    me.onSetReceiptKeyReadOnly(true); 
                                }
                            }
                        }
                    });
                }
		    }
		});        
    },

    
    onEnforcePutAway:function(){
		var me = this;
    	var record = me.basicForm.getForm().getValues(); 
        var receiptKeyValue = record.receiptKey; 
    	if(record.receiptKey == ""){
    		MessageBox.error('错误提示','请选择操作的数据！');
    		return;
    	}
		Ext.Ajax.request({
		    url: basePath + '/inbound/doEnforcePutAway.action',
		    params: {
		    	receiptKey:record.receiptKey
		    },
		    success: function(response){
		        var text = Ext.decode(response.responseText);
		        var success = text.success;
		        MessageBox.show(success, text.json.msg);
                me.receiptgrid.getStore().load();
                //收货完成时，更新主表状态，并 根据主表状态判断是否需要设置主表的字段为只读
                Ext.Ajax.request({
                    url: basePath + '/inbound/doQueryReceiptStatus.action',
                    params: {
                        receiptKey: receiptKeyValue
                    },
                    success: function(response){
                        var text = Ext.decode(response.responseText);
                        var success = text.success;
                        if(0 != text.json.data.length)   //receiptKey唯一，应该只有一条记录
                        {
                            //更新主表状态
                            var statusValue=text.json.data[0].status;
                            me.basicForm.getForm().findField('status').setValue(statusValue)
                            if('0'!=statusValue)
                            {
                                me.onSetReceiptReadOnly(true);      //根据状态设置是否可以编辑
                                me.onSetReceiptKeyReadOnly(true); 
                            }
                        }
                    }
                });
		    }
		});          
    },
    
    //刘沙写的打印，作用不清楚，先注释掉
/*    onPrintReceipt:function(){
        var me = this;
        var record = me.basicForm.getForm().getFieldValues(); 
        
    	if(record.receiptKey == ""){
    		MessageBox.error('错误提示','请选择操作的数据！');
    		return;
    	}else{
            Ext.Ajax.request({
			    url: basePath + '/inbound/printReceiptDetail.action',
			    params: {
			    	receiptKey: record.receiptKey
			    },
			    success: function(response){
			        var text = Ext.decode(response.responseText);
			        var success = text.success;
			        MessageBox.show(success, text.json.msg);

			    }
			});
    	}
    },*/
    
    
    
    
    
 //打印收货清单
 	onPrintAsnReceipt: function(){
		var me = this;
    	var record = me.basicForm.getForm().getFieldValues(); 
    	if(record.receiptKey == ""){
    		MessageBox.error('错误提示','请选择操作的数据！');
    		return;
    	}else{
        	Ext.Ajax.request({
			    url: basePath + '/inbound/printReceiptDetail.action',
			    params: {
			    	receiptKey: record.receiptKey
			    },
                async: false,				
			    success: function(response){
			        var text = Ext.decode(response.responseText);
		            url = basePath + text.json.path;
			    }
			});
			
			try{delete window.frames["onPrintAsnReceipt"];}catch(e){};
			me.winItems = {
				html: "<iframe id='onPrintAsnReceipt' name='onPrintAsnReceipt' src='"+url+"' style='width:100%; height:100%;' frameborder='0'></iframe>"
			};
			me.win = me.createPrinterWindow();
			me.prinerWin.show();
			me.prinerWin.on('close',function(){
				delete me.winItems1;
				delete me.prinerWin1;
				delete me.win;
			},me);
					
    	}
    },		
 
 
 
 //打印收货上架清单
 	onPrintPwDetail: function(){
		var me = this;
    	var record = me.basicForm.getForm().getFieldValues(); 
    	if(record.receiptKey == ""){
    		MessageBox.error('错误提示','请选择操作的数据！');
    		return;
    	}else{
        	Ext.Ajax.request({
			    url: basePath + '/inbound/printPwDetail.action',
			    params: {
			    	receiptKey: record.receiptKey
			    },
                async: false,				
			    success: function(response){
			        var text = Ext.decode(response.responseText);
		            url = basePath + text.json.path;
			    }
			});
			
			try{delete window.frames["onPrintPwDetail"];}catch(e){};
			me.winItems = {
				html: "<iframe id='onPrintPwDetail' name='onPrintPwDetail' src='"+url+"' style='width:100%; height:100%;' frameborder='0'></iframe>"
			};
			me.win = me.createPrinterWindow();
			me.prinerWin.show();
			me.prinerWin.on('close',function(){
				delete me.winItems1;
				delete me.prinerWin1;
				delete me.win;
			},me);
					
    	}
    },



 //打印示例
 
 	onPrintList: function(){
    	var me = this;
    	var datas = this.childdetailgrid.getSelectionModel().getSelection();
    	if(datas == ''){
    		MessageBox.error('错误提示','请选择要打印的数据！');
    		return;
    	}
    	var data = datas[0].getData();
    	var lineNumberValue = data.lineNumber;
    	var url = '';
		Ext.Ajax.request({
		    url: basePath+'/inbound/printReceiptDetail.action',
		    params: {lineNumber: lineNumberValue},
		    async: false,
		    success: function(response){
		        var text = Ext.decode(response.responseText);
		        url = basePath + text.json.path;
			}
		});
		try{delete window.frames["printerlist"];}catch(e){};
		me.winItems = {
			html: "<iframe id='printerlist' name='printerlist' src='"+url+"' style='width:100%; height:100%;' frameborder='0'></iframe>"
		};
		me.win = me.createPrinterWindow();
		me.prinerWin.show();
		me.prinerWin.on('close',function(){
			delete me.winItems;
			delete me.prinerWin;
			delete me.win;
		},me);
    },
 
    createPrinterWindow: function(){
		this.prinerWin = Ext.create('widget.window',{
			width: 780,
			height: 600,
	        layout: 'fit',
	        title: '打印',
			items:[this.winItems]
		});
		return this.prinerWin;
    }, 


//各种操作菜单到此结束    
    
//创建panel上部的组件
    createChildTop: function(){
    	var me = this;
    	this.childtop = Ext.create('Ext.tab.Panel',{
    		region: 'center',
    		height: 250,  //本组件为center位置，height不起作用
    		items: [me.createBasicForm(),me.createShops(),me.createCLForm(),me.createMoneyForm(),me.createPt2Pn1F5Form(),me.createProBookForm(),me.createPt2Pn1F7Form(),me.createPt2Pn1F8Form()]
    	});
    	return this.childtop;
    },

// 基本信息    
    createBasicForm: function(){
    	var me = this;
    	this.basicForm = Ext.create('Ext.form.Panel',{
			xtype:'form',
			frame:true,
			title:'基本信息',
			headerPosition: 'bottom',
	        autoHeight: true,
	        bodyPadding: '5 2 2 5',
	        stripeRows : true,
			autoScroll : true,
			viewConfig : {
				forceFit: true,
				autoFill: true
			},
	        defaults: {
	        	xtype: 'fieldcontainer',
                hideLabel: true,
	            anchor: '100%',
	            labelWidth: 100
	        },
	        items: [
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 80,
                        margin: '0 0 0 10',
                        xtype: 'textfield',
                        width: 240
                    },
                    items: [
                        {
                            name: 'receiptKey',
                            fieldLabel: 'ASN号',
                            readOnly:true,
                            allowBlank: false
                        },
                        {
                            name: 'type',
                            fieldLabel: 'ASN类型',
                            xtype:'codecombo',
                            codeType:'ASNTYPE',
                            allowBlank: false,
                            value:'0'                            
                        },
                        {
                            name: 'status',
                            fieldLabel: 'ASN状态',
                            xtype:'codecombo',
                            codeType:'ASNSTATUS',
                            readOnly:true,
                            value:'0'
                            
                        },
                        {
                            name: 'orderDate',
                            fieldLabel: '创建日期',
                            xtype: 'datefield',
                            format:'Y-m-d H:i:s',
                            allowBlank: false
//                            value:Ext.util.Format.date(new Date(),"Y-m-d H:i:s")   //这里设置时间默认值，不会变化，需要移到创建的方法中
                        },
                        {name: 'id',hidden: true}
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 80,
                        margin: '0 0 0 10',
                        xtype: 'textfield',
                        width: 240
                    },
                    items: [
                        {
                            name: 'storerKey',
                            fieldLabel: '货主',
                            allowBlank: false,
                            listeners:{
                                //货主是否存在由sku表做保证，这里不再单独校验
                                blur: function(txt){
                                    //输入参数，鼠标离开后见检查该货主是否存在
                                    storerKeyValue=Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(storerKeyValue);
                                    skuValue=me.childdetailForm.getForm().findField('sku').getValue();
                                    
                                    Ext.Ajax.request({
                                        url: basePath + '/support/doValidateStorers.action',
                                        params: {
                                            storerKey:storerKeyValue
                                        },
                                        success: function(response){    //failure属于连不上服务器的情况，后续补充
                                            var text = Ext.decode(response.responseText);
                                            var success = text.success;
                                            if(0 != text.json.data.length)
                                            {
                                                me.basicForm.getForm().findField('storerDescr').setValue(text.json.data[0].company);
                                                //此处再判断与sku的校验
                                                if((''!=skuValue)&&(''!=storerKeyValue))
                                                {
                                                    Ext.Ajax.request({
                                                        url: basePath + '/support/doValidateSkus.action',
                                                        params: {
                                                            sku:skuValue,
                                                            storerKey:storerKeyValue
                                                        },
                                                        success: function(response){    //failure属于连不上服务器的情况，后续补充
                                                            var text = Ext.decode(response.responseText);
                                                            var success = text.success;
                                                            if(0 != text.json.data.length)   //storerKey与sku唯一，应该只有一条记录
                                                            {
                                                                me.childdetailForm.getForm().findField('name').setValue(text.json.data[0].name);
                                                                me.childdetailForm.getForm().findField('descr').setValue(text.json.data[0].descr);
                                                            }
                                                            else   //这个流程基本上执行不到
                                                            {
                                                                me.childdetailForm.getForm().findField('name').setValue('');
                                                                me.childdetailForm.getForm().findField('descr').setValue('');
                                                                me.childdetailForm.getForm().findField('sku').setValue('');
                                                                me.childdetailForm.getForm().findField('altsku').setValue('');
                                                                me.childdetailForm.getForm().findField('packKey').setValue('');
                                                                me.childdetailForm.getForm().findField('uom').setValue('');
                                                                MessageBox.show(false, '货主或者商品不存在');

                                                            }
                                                        }
                                                    })
                                                }                                                
                                            }
                                            else
                                            {
                                               // me.basicForm.getForm().findField('storerKey').setValue('');
                                                me.basicForm.getForm().findField('storerDescr').setValue(''); 
                                                //是否要清空商品相关待定，先拷贝过来
                                                me.childdetailForm.getForm().findField('name').setValue('');
                                                me.childdetailForm.getForm().findField('descr').setValue('');
                                                me.childdetailForm.getForm().findField('sku').setValue('');
                                                me.childdetailForm.getForm().findField('altsku').setValue('');
                                                me.childdetailForm.getForm().findField('packKey').setValue('');
                                                me.childdetailForm.getForm().findField('uom').setValue('');                                                
                                                MessageBox.show(false,  '货主不存在');
                                               
                                            }
                                        }
                                    })
                                }
                            }
                        },
                        {
                            name: 'storerDescr',
                            fieldLabel: '货主名称',
                            allowBlank: false
                        },
                        {
                            name: 'dateStart',
                            fieldLabel: '预期到货日期',
                            xtype: 'datefield',
                            format:'Y-m-d H:i:s',
                            value: Ext.util.Format.date(new Date(),"Y-m-d")     //初始值是当天日期，时分秒自动填0
                        },
                        {
                            name: 'dateEnd',
                            fieldLabel: '------>',
                            xtype: 'datefield',
                            format:'Y-m-d H:i:s'
                        },
                        {
                            xtype:'datefield',    //隐藏字段，放置存盘被清空
                            format:'Y-m-d H:i:s',
                            name: 'addDate',
                            hidden:true
                        },
                        {
                            xtype:'textfield',    //隐藏字段，放置存盘被清空
                            name: 'addWho',
                            hidden:true
                        }                        
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 80,
                        margin: '0 0 0 10',
                        xtype: 'textfield',
                        width: 240
                    },
                    items: [
                        {
                            name: 'poKey',
                            fieldLabel: 'PO编号'
                            //allowBlank: false
                        },
                        {name: '',fieldLabel: '收货平台',xtype: 'combobox'}, //该字段表中尚未加上，后续版本实现
                        {name: 'dateReceipted',fieldLabel: '实际到货日期',xtype: 'datefield',format:'Y-m-d H:i:s',value: Ext.util.Format.date(new Date(),"Y-m-d")},
                        {name: 'dateReceived',fieldLabel: '入库日期',xtype: 'datefield',format:'Y-m-d H:i:s'}
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 80,
                        margin: '0 0 0 10',
                        xtype: 'textfield',
                        width: 240
                    },
                    items: [
                        {name: 'vendorRefence',fieldLabel: '供应商参考号'},
                        {name: '',fieldLabel: '采购商PO号'},   //该字段表中尚未加上
                        {name: 'vesselRefence',fieldLabel: '承运商参考号'},
                        {name: '',fieldLabel: '仓库参考号'}//该字段表中尚未加上
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 80,
                        width : 240,
                        margin: '0 0 0 10',
                        xtype: 'textfield'
                    },
                    items: [
                        {name: 'otherRefence1',fieldLabel: '其他参考号1'},
                        {name: 'otherRefence2',fieldLabel: '其他参考号2'},
                        {name: 'otherRefence3',fieldLabel: '其他参考号3'}
                    ]
                }
            ]
    	});
    	return this.basicForm;
    },

//运输信息    
    createShops: function(){
    	this.customerForm = Ext.create('Ext.form.Panel',{
			xtype:'form',
			frame:true,
			headerPosition: 'bottom',
			title:'运输信息',
			stripeRows : true,
			autoScroll : true,
			viewConfig : {
				forceFit: true,
				autoFill: true
			},
	        autoHeight: true,
	        bodyPadding: 1,
	        defaults: {
	        	xtype: 'fieldcontainer',
                hideLabel: true,
	            anchor: '100%',
	            labelWidth: 100
	        },
	        items: [
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 90,
                        width: 240,
                        margin: '5 0 0 10',
                        xtype: 'textfield'
                    },
                    items: [
                        {fieldLabel: '车型',name: 'vesselType'},
                        {fieldLabel: '装车时间',xtype: 'datefield',name: 'vesselDate',format:'Y-m-d H:i:s'},
                        {fieldLabel: '装车地点',name: 'placeofloading'},
                        {fieldLabel: '原产国',xtype: 'combobox',name: 'origincountry'}
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 90,
                        width: 240,
                        margin: '2 0 0 10',
                        xtype: 'textfield'
                    },
                    items: [
                        {fieldLabel: '车牌号',name: 'vesselNo'},  
                        {fieldLabel: '卸货地点',name: 'placeofdischarge'},
                        {fieldLabel: '交货地点',name: 'placeofdelivery'},  
                        {fieldLabel: '目的地',xtype: 'combobox',name: 'destination'}
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 90,
                        width: 240,
                        margin: '2 0 0 10',
                        xtype: 'textfield'
                    },
                    items: [
                        {fieldLabel: '司机',name: 'driver'},
                        {fieldLabel: '支付方式',xtype: 'combobox',name: 'incoTerms'},
                        {fieldLabel: '支付描述',name: 'deliveryNotes'}//支付描述和交货描述字段一样
                    ]
                },
                {
                    
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 90,
                        width: 240,
                        margin: '2 0 0 10',
                        xtype: 'combobox'
                    },
                    items: [
                        {fieldLabel: '运输方式',name: 'transMethod'},
                        {fieldLabel: '支付方式',name: 'paymentTerms'},
                        {fieldLabel: '交货描述',name: 'deliveryNotes'}
                    ]
                
                }
            ]
    	});
    	return this.customerForm;
    },    

//商家信息    
    createCLForm:function(){
        var me=this;
        this.clForm = Ext.create('Ext.form.Panel',{
			xtype:'form',
			frame:true,
			headerPosition: 'bottom',
			title:'商家信息',
	        autoHeight: true,
	        stripeRows : true,
			autoScroll : true,
			viewConfig : {
				forceFit: true,
				autoFill: true
			},
	        bodyPadding: 1,
	        layout: 'vbox',
	        defaults: {
	        	xtype: 'fieldcontainer',
                hideLabel: true,
	            anchor: '100%',
	            labelWidth: 100
	        },
	        items: [
                {
                    xtype: 'fieldcontainer',
                    frame: false,
                    defaults: {
                        xtype: 'fieldcontainer'
                    },
                    items: [
                        {
                            layout: 'hbox',
                            defaults:{
                                labelWidth: 80,
                                width: 360,
                                margin: '10 0 0 10',
                                xtype: 'textfield'
                            },
                            items: [
                                {
                                    fieldLabel: '供应商',
                                    name: 'vendor',
                                    listeners:{
                                        blur: function(txt){
                                            vendorValue=Ext.util.Format.uppercase(txt.getValue());
                                            txt.setValue(vendorValue);
                                            Ext.Ajax.request({
                                                url: basePath + '/support/doValidateStorers.action',
                                                params: {
                                                    storerKey:vendorValue
                                                },
                                                success: function(response){    //failure属于连不上服务器的情况，后续补充
                                                    var text = Ext.decode(response.responseText);
                                                    var success = text.success;
                                                    if(0 != text.json.data.length)
                                                    {   //缺少很多字段，待补充 qxue
                                                        me.clForm.getForm().findField('vendorName').setValue(text.json.data[0].descr);
                                                        me.clForm.getForm().findField('vendorAddress1').setValue(text.json.data[0].address1);
                                                        me.clForm.getForm().findField('vendorContact').setValue(text.json.data[0].contact);
                                                        me.clForm.getForm().findField('vendorMobile').setValue(text.json.data[0].mobile);
                                                        me.clForm.getForm().findField('vendorTel').setValue(text.json.data[0].tel);
                                                        me.clForm.getForm().findField('vendorNation').setValue(text.json.data[0].nation);
                                                        me.clForm.getForm().findField('vendorProvince').setValue(text.json.data[0].province);
                                                        me.clForm.getForm().findField('vendorCity').setValue(text.json.data[0].city);
                                                        me.clForm.getForm().findField('vendorAddress2').setValue(text.json.data[0].address2);
                                                        me.clForm.getForm().findField('vendorPosition').setValue(text.json.data[0].position);
                                                        me.clForm.getForm().findField('vendorFax').setValue(text.json.data[0].fax);
                                                        me.clForm.getForm().findField('vendorEmail').setValue(text.json.data[0].email);
                                                        
                                                    }
                                                }
                                            })                                    
                                        }
                                    }                                        
                                },
                                {
                                    fieldLabel: '供应商名称',
                                    margin: '10 0 0 20',
                                    name: 'vendorName'
                                }
                            ]
                        },
                        {
                            layout: 'hbox',
                            defaults:{
                                labelWidth: 80,
                                width: 240,
                                margin: '2 0 0 10',
                                xtype: 'textfield'
                            },
                            items: [
                                {
                                    fieldLabel: '国家',
                                    name: 'vendorNation'
                                },
                                {
                                    fieldLabel: '省份',
                                    name: 'vendorProvince'
                                },
                                {
                                    fieldLabel: '地区/城市',
                                    name: 'vendorCity'
                                }
                            ]    
                        },
                        {
                            layout: 'hbox',
                            defaults:{
                                labelWidth: 80,
                                width: 240,
                                margin: '2 0 0 10',
                                xtype: 'textfield'
                            },
                            items: [
                                {
                                    fieldLabel: '地址',
                                    width: 600,
                                    name: 'vendorAddress1'
                                },
                                {
                                    fieldLabel: '',
                                    width: 130,
                                    name: 'vendorAddress2'
                                }
                            ]
                        },
                        {
                            layout: 'hbox',
                            defaults:{
                                labelWidth: 80,
                                width: 240,
                                margin: '2 0 0 10',
                                xtype: 'textfield'
                            },
                            items: [
                                {
                                    fieldLabel: '联系人',
                                    name: 'vendorContact'
                                },
                                {
                                    fieldLabel: '手机',
                                    name: 'vendorMobile'
                                },
                                {
                                    fieldLabel: '电话',
                                    name: 'vendorTel'
                                }
                            ]
                        },
                        {
                            layout: 'hbox',
                            defaults:{
                                labelWidth: 80,
                                width: 240,
                                margin: '2 0 0 10',
                                xtype: 'textfield'
                            },
                            items: [
                                {
                                    fieldLabel: '职务',
                                    name: 'vendorPosition'
                                },
                                {
                                    fieldLabel: '传真',
                                    name: 'vendorFax'
                                },
                                {
                                    fieldLabel: '邮箱',
                                    name: 'vendorEmail'
                                }
                            ]
                        }
/*                        {
                            layout: 'hbox',
                            defaults:{
                                labelWidth: 80,
                                width: 360,
                                margin: '2 0 0 10',
                                xtype: 'textfield'
                            },
                            items: [
                                {
                                    fieldLabel: '收货方',
                                    name: 'shipto'
                                },
                                {
                                    fieldLabel: '收货方名称',
                                    margin: '2 0 0 20',
                                    name: 'shiptoName'
                                }
                            ]
                        },
                        {
                            layout: 'hbox',
                            defaults:{
                                labelWidth: 80,
                                width: 240,
                                margin: '2 0 0 10',
                                xtype: 'textfield'
                            },
                            items: [
                                {fieldLabel: '国家',name: 'shiptoNation'},
                                {fieldLabel: '省份',name: 'shiptoProvince'},
                                {fieldLabel: '地区/城市',name: 'shiptoCity'}
                            ]
                        },
                        {
                            layout: 'hbox',
                            defaults:{
                                labelWidth: 80,
                                width: 240,
                                margin: '2 0 0 10',
                                xtype: 'textfield'
                            },
                            items: [
                                {fieldLabel: '地址',width: 600,name: 'shiptoAddress1'},
                                {fieldLabel: '',width: 130,name: 'shiptoAddress2'}
                            ]
                        },
                        {
                            layout: 'hbox',
                            defaults:{
                                labelWidth: 80,
                                width: 240,
                                margin: '2 0 0 10',
                                xtype: 'textfield'
                            },
                            items: [
                                {fieldLabel: '联系人',xtype:'storercombo',name: 'shiptoContact'},
                                {fieldLabel: '手机',name: 'shiptoMobile'},
                                {fieldLabel: '电话',name: 'shiptoTel'}
                            ]
                        },
                        {
                            layout: 'hbox',
                            defaults:{
                                labelWidth: 80,
                                width: 240,
                                margin: '2 0 0 10',
                                xtype: 'textfield'
                            },
                            items: [
                                {fieldLabel: '职务',name: 'shiptoPosition'},
                                {fieldLabel: '传真',name: 'shiptoFax'},
                                {fieldLabel: '邮箱',name: 'shiptoEmail'}
                            ]
                        } 暂时注释掉收货方   */
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    frame: false,
                    border: false,
                    defaults: {
                        xtype: 'fieldcontainer'
                    },
                    items: [
                        {
                            layout: 'hbox',
                            defaults:{
                                labelWidth: 80,
                                width: 360,
                                margin: '30 0 0 10',
                                xtype: 'textfield'
                            },
                            items: [
                                {
                                    fieldLabel: '承运商',
                                    name: 'carrier',
                                    listeners:{
                                        blur: function(txt){
                                            carrierValue=Ext.util.Format.uppercase(txt.getValue());
                                            txt.setValue(carrierValue);
                                            Ext.Ajax.request({
                                                url: basePath + '/support/doValidateStorers.action',
                                                params: {
                                                    storerKey:carrierValue
                                                },
                                                success: function(response){    //failure属于连不上服务器的情况，后续补充
                                                    var text = Ext.decode(response.responseText);
                                                    var success = text.success;
                                                    if(0 != text.json.data.length)
                                                    {   //缺少很多字段，待补充 qxue
                                                        me.clForm.getForm().findField('carrierName').setValue(text.json.data[0].descr);
                                                        me.clForm.getForm().findField('carrierAddress1').setValue(text.json.data[0].address1);
                                                        me.clForm.getForm().findField('carrierContact').setValue(text.json.data[0].contact);
                                                        me.clForm.getForm().findField('carrierMobile').setValue(text.json.data[0].mobile);
                                                        me.clForm.getForm().findField('carrierTel').setValue(text.json.data[0].tel);
                                                        me.clForm.getForm().findField('carrierNation').setValue(text.json.data[0].nation);
                                                        me.clForm.getForm().findField('carrierProvince').setValue(text.json.data[0].province);
                                                        me.clForm.getForm().findField('carrierCity').setValue(text.json.data[0].city);
                                                        me.clForm.getForm().findField('carrierAddress2').setValue(text.json.data[0].address2);
                                                        me.clForm.getForm().findField('carrierPosition').setValue(text.json.data[0].position);
                                                        me.clForm.getForm().findField('carrierFax').setValue(text.json.data[0].fax);
                                                        me.clForm.getForm().findField('carrierEmail').setValue(text.json.data[0].email);
                                                    }
                                                }
                                            })                                    
                                        }
                                    } 
                                },
                                {
                                    fieldLabel: '承运商名称',
                                    margin: '30 0 0 20',
                                    name: 'carrierName'
                                }
                            ]
                        },
                        {
                            layout: 'hbox',
                            defaults:{
                                labelWidth: 80,
                                width: 240,
                                margin: '2 0 0 10',
                                xtype: 'textfield'
                            },
                            items: [
                                {fieldLabel: '国家',name: 'carrierNation'},
                                {fieldLabel: '省份',name: 'carrierProvince'},
                                {fieldLabel: '地区/城市',name: 'carrierCity'}
                            ]    
                        },
                        {
                            layout: 'hbox',
                            defaults:{
                                labelWidth: 80,
                                width: 240,
                                margin: '2 0 0 10',
                                xtype: 'textfield'
                            },
                            items: [
                                {fieldLabel: '地址',width: 600,name: 'carrierAddress1'},
                                {fieldLabel: '',width: 130,name: 'carrierAddress2'}
                            ]
                        },
                        {
                            layout: 'hbox',
                            defaults:{
                                labelWidth: 80,
                                width: 240,
                                margin: '2 0 0 10',
                                xtype: 'textfield'
                            },
                            items: [
                                {fieldLabel: '联系人',name: 'carrierContact'},
                                {fieldLabel: '手机',name: 'carrierMobile'},
                                {fieldLabel: '电话',name: 'carrierTel'}
                            ]
                        },
                        {
                            layout: 'hbox',
                            defaults:{
                                labelWidth: 80,
                                width: 240,
                                margin: '2 0 0 10',
                                xtype: 'textfield'
                            },
                            items: [
                                {fieldLabel: '职务',name: 'carrierPosition'},
                                {fieldLabel: '传真',name: 'carrierFax'},
                                {fieldLabel: '邮箱',name: 'carrierEmail'}
                            ]
                        }
                    ]
                }
            ]
	    });
	    return this.clForm;
	},	
    
//费收信息
	createMoneyForm: function(){
		var me = this;
		this.moneyForm = Ext.create('Ext.panel.Panel',{
			title:'费收信息',
			layout: 'border',
			stripeRows : true,
			autoScroll : true,
			viewConfig : {
				forceFit: true,
				autoFill: true
			},
	        items: [me.createMoneyChildForm(),me.createMoneyGrid()]
	    });
	    return this.moneyForm;
	},

    //panel不能reset，临时增加的一个form 
    createMoneyChildForm:function(){
		this.moneychildform = Ext.create('Ext.form.Panel',{
			xtype:'form',
			frame:true,
			headerPosition: 'bottom',
	        	width:300,
	        	region: 'west',
	        	frame: true,
	        	defaults: {
	        		xtype: 'textfield',
	        		labelAlign: 'top',
	        		width: 200
	        	},
	        autoHeight: true,
	        stripeRows : true,
			autoScroll : true,
	        bodyPadding: 1,
	        layout: 'vbox',
	        	items: [
                    {
                        fieldLabel: '收费日期',
                        margin: '15 0 0 5',
                        xtype: 'datefield',
                        format:'Y-m-d H:i:s'
                    },
                    {
                        fieldLabel: '收费类型',
                        margin: '0 0 0 5'
                    },
                    {
                        fieldLabel: '描述',
                        margin: '0 0 0 5'
                    }
                ]
	    });
	    return this.moneychildform;
	},	
      
    
    
//装车信息    
//按照位置重新命名，Pt2Pn1F5Form，原来名称是OtherForm
//这段代码要好好理解一下
	createPt2Pn1F5Form: function(){
		var me = this;
		this.pt2pn1f5form = Ext.create('Ext.panel.Panel',{
			title: '装车信息',
			stripeRows : true,
			autoScroll : true,
			viewConfig : {
				forceFit: true,
				autoFill: true
			},
			layout: 'border',
			items: [me.createPt2Pn1F5F1Form(), me.createOtherGrid()]            //其他信息上有一个grid
		});
		return this.pt2pn1f5form;
	},

    //panel不能reset，临时增加的一个form 
    createPt2Pn1F5F1Form:function(){
		this.pt2pn1f5f1form = Ext.create('Ext.form.Panel',{
			xtype:'form',
			frame:true,
			viewConfig : {
				forceFit: true,
				autoFill: true
			},
            region: 'west',
            width: 450,
            defaults: {
                xtype: 'fieldcontainer',
                margin: '5 0 0 5'
            },
	        autoHeight: true,
	        stripeRows : true,
			autoScroll : true,
	        bodyPadding: 1,
	        	items: [
                        {
                            layout: 'hbox',
                            defaults: {
                                xtype: 'textfield',
                                margin: '0 0 0 5',
                                labelWidth: 60,
                                flex: 1
                            },
                            items: [
                                {
                                    fieldLabel: '集装箱号'
                                },
                                {
                                    fieldLabel: '类型'
                                }
                            ]
                        },
                        {
                            layout: 'hbox',
                            defaults: {
                                xtype: 'textfield',
                                margin: '0 0 0 5',
                                labelWidth: 60,
//                                labelAlign: 'top',
                                flex: 1
                            },
                            items: [
                                {
                                    fieldLabel: '尺寸'
                                },
                                {
                                    xtype: 'hidden'
                                }
                            ]
                        },
                        {
                            layout: 'hbox',
                            defaults: {
                                xtype: 'textfield',
                                margin: '0 0 0 5',
                                labelWidth: 60,
                                flex: 1
                            },
                            items: [
                                {
                                    fieldLabel: '铅封号'
                                },
                                {
                                    fieldLabel: '重量'
                                }
                            ]
                        },
                        {
                            layout: 'hbox',
                            defaults: {
                                xtype: 'textfield',
                                margin: '0 0 0 5',
                                labelWidth: 60,
                                flex: 1
                            },
                            items: [
                                {
                                    fieldLabel: '备注'
                                }
                            ]
                        }
                ]
	    });
	    return this.pt2pn1f5f1form;
	},	
    
    
//预约信息    
	createProBookForm: function(){
		var me = this;
		this.probookform = Ext.create('Ext.panel.Panel',{
			layout: 'border',
			frame:false,
			stripeRows : true,
			autoScroll : true,
			viewConfig : {
				forceFit: true,
				autoFill: true
			},
			title: '预约信息',
			items: [me.createProBookF1Form(),me.createPreBookGrid()]
		});
		return this.probookform;
	},

    //panel不能reset，临时增加的一个form 
    createProBookF1Form:function(){
		this.probookf1form = Ext.create('Ext.form.Panel',{
			xtype:'form',
			frame:true,
            region: 'west',
            width: 450,
			viewConfig : {
				forceFit: true,
				autoFill: true
			},
            defaults: {
                xtype: 'fieldcontainer',
                margin: '5 0 0 5'
            },
	        autoHeight: true,
	        stripeRows : true,
			autoScroll : true,
	        bodyPadding: 1,
	        	items: [
                        {
                            layout: 'hbox',
                            defaults: {
                                xtype: 'textfield',
//                                labelAlign: 'top',
                                margin: '0 0 0 5',
                                flex: 1
                            },
                            items: [
                                {fieldLabel: 'ASN编号'},
                                {fieldLabel: '序号'}
                            ]
                        },
                        {
                            layout: 'hbox',
                            frame: false,
                            defaults: {
                                xtype: 'textfield',
//                                labelAlign: 'top',
                                margin: '0 0 0 5',
                                flex: 1
                            },
                            items: [
                                {fieldLabel: '车牌号'},
                                {xtype: 'hidden'}
                            ]
                        },
                        {
                            layout: 'hbox',
                            defaults: {
                                xtype: 'textfield',
//                                labelAlign: 'top',
                                margin: '0 0 0 5',
                                flex: 1
                            },
                            items: [
                                {
                                    fieldLabel: '司机'
                                },
                                { fieldLabel: '卸货平台',xtype: 'combobox'}
                            ]
                        },
                        {
                            layout: 'hbox',
                            defaults: {
                                xtype: 'datefield',
//                                labelAlign: 'top',
                                margin: '0 0 0 5',
                                format:'Y-m-d H:i:s',
                                flex: 1
                            },
                            items: [
                                { fieldLabel: '开始卸载时间'},
                                {fieldLabel: '卸货时间(分钟)'}
                            ]
                        }
                ]
	    });
	    return this.probookf1form;
	},	
    
//自定义，把基本信息中的自定义部分和备注拿过来    
	createPt2Pn1F7Form: function(){
		this.pt2pn1f7form = Ext.create('Ext.form.Panel',{
			xtype:'form',
			frame:true,
			headerPosition: 'bottom',
			title:'自定义',
	        autoHeight: true,
	        stripeRows : true,
			autoScroll : true,
			viewConfig : {
				forceFit: true,
				autoFill: true
			},
	        bodyPadding: 1,
	        layout: 'vbox',
	        defaults: {
	        	xtype: 'fieldcontainer',
                hideLabel: true,
	            anchor: '100%',
	            labelWidth: 100
	        },
	        items: [
                {
                    xtype: 'fieldcontainer',
                    frame: false,
                    defaults: {
                        xtype: 'fieldcontainer'
                    },
                    items: [
                        {
                            layout: 'hbox',
                            defaults:{
                                labelWidth: 80,
                                width: 240,
                                margin: '5 0 0 10',
                                xtype: 'textfield'
                            },
                            items: [
                                {   
                                    xtype: 'textfield',
                                    name: 'udf1',
                                    fieldLabel: '用户自定义1'
                                },
                                {   
                                    xtype: 'textfield',
                                    name: 'udf2',
                                    fieldLabel: '用户自定义2'
                                },
                                {   
                                    xtype: 'textfield',
                                    name: 'udf3',
                                    fieldLabel: '用户自定义3'
                                }
                            ]
                        },
                        {
                            layout: 'hbox',
                            defaults:{
                                labelWidth: 80,
                                width: 240,
                                margin: '2 0 0 10',
                                xtype: 'textfield'
                            },
                            items: [
                                {   
                                    xtype: 'textfield',
                                    name: 'udf4',
                                    fieldLabel: '用户自定义4'
                                },
                                {   
                                    xtype: 'textfield',
                                    name: 'udf5',
                                    fieldLabel: '用户自定义5'
                                }
                            ]    
                        },
                        {
                            layout: 'hbox',
                            defaults:{
                                labelWidth: 80,
                                width: 740,
                                height:70,
                                margin: '2 0 0 10',
                                xtype: 'textfield'
                            },
                            items: [
                                {   
                                    xtype: 'textarea',
                                    name: 'notes',
                                    fieldLabel: '备注'
                                }
                            ]    
                        }
                    ]
                }

            ]
	    });

		return this.pt2pn1f7form;
	},

//附件，尚未实现，显示原始单据
	createPt2Pn1F8Form: function(){
        var me = this;
		this.pt2pn1f8form = Ext.create('Ext.form.Panel',{
			xtype:'form',
			frame:true,
			headerPosition: 'bottom',
			title:'附件',
	        autoHeight: true,
	        stripeRows : true,
			autoScroll : true,
			viewConfig : {
				forceFit: true,
				autoFill: true
			},
	        bodyPadding: 1,
	        layout: 'vbox',
	        defaults: {
	        	xtype: 'fieldcontainer',
                hideLabel: true,
	            anchor: '100%',
	            labelWidth: 100
	        },
	        items: [
                {
                    xtype: 'fieldcontainer',
                    frame: false,
                    defaults: {
                        xtype: 'fieldcontainer'
                    },
                    items: [
                        {
                            layout: 'hbox',
                            defaults:{
                                labelWidth: 80,
                                margin: '5 0 0 10',
                                xtype: 'textfield'
                            },
                            items: [
                                {   
                                    xtype: 'label',
                                    text:'添加附件'
//                                    fieldLabel: '附件信息1'
                                },
                                {   
                                    xtype: 'button',
                                    margin: '0 0 0 40',
                                    iconCls: 'icon-browse',
                                    text: '添加附件',
                                    scope: this,
                                    handler: me.onImport
                                }
                            ]
                        },
                        {
                            layout: 'hbox',
                            defaults:{
                                labelWidth: 80,
                                width: 740,
                                height:90,
                                margin: '2 0 0 10',
                                xtype: 'textfield'
                            },
                            items: [
                                {   
                                    xtype: 'textarea',
                                    name: 'notes',
                                    fieldLabel: '附件描述'
                                }
                            ]    
                        }
                    ]
                }

            ]
	    });

		return this.pt2pn1f8form;
	},


//导入附件需要的方法    
//窗口跳不出来，待排查
/*	onImport: function(){
		this.winItems = this.createForm();
		this.winConfig = {
			height: 110,
			width: 400,
			maximizable: false,
			resizable: false,
			title: '附件导入',
			items: this.winItems,
			buttons: this.createButtons()
		};
		this.showWindow();
	},*/
    

    //参考库位新完成的导入附件对话框
	onImport: function(){
        var me=this;
        me.createWinFrom();
        me.winform.show();
    },

    
    createWinFrom: function(){
    	var me = this;
    	this.winform = Ext.create('Ext.window.Window',{
	    	title: '导入附件',
		    height: 120,
		    width: 360,
		    layout: 'vbox',
	        defaults: {
	        	xtype: 'fieldcontainer'
	        },
	        items: [
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 60,
                        margin: '5 0 0 10',
                        xtype: 'textfield',
                        width: 260
                    },
                    items: [
                        {
                            xtype: 'filefield',
                            id: 'filedata',
                            emptyText: '选择文件',
                            fieldLabel: '附件',
                            name: 'filedata',
                            buttonText: '',
                            buttonConfig: {
                                iconCls: 'icon-create'
                            }
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 60,
                        width : 80,
                        margin: '10 0 0 20',
                        xtype: 'button'
                    },
                    items: [
                        {
                            text: '确定',
                            handler: me.updateAllLocation,
                            scope: this,
                            margin: '10 0 0 70'
                        },
                        {
                            text: '退出',
                            scope: this,
                            handler: function(){
                                me.winform.close();
                            }
                        }
                    ]
                }
            ]
    	});
    	this.winform.on('close',function(){
    		delete this.winform;
    	},this);
    	return this.winform;
    
    },
    
     
    
    
	createForm: function(){
		var form = Ext.create('Ext.form.Panel', {
	        autoHeight: true,
//	        bodyPadding: '1 10 1 1',
	        width: 400,
	        bodyPadding: '10 10 0',
	        defaults: {
	            anchor: '100%',
	            allowBlank: false,
	            msgTarget: 'side',
	            labelWidth: 60
	        },
	        items: [{
	            xtype: 'filefield',
	            id: 'filedata',
	            emptyText: '选择文件',
	            fieldLabel: '数据文件',
	            name: 'filedata',
	            buttonText: '',
	            buttonConfig: {
	                iconCls: 'icon-create'
	            }
	        }]
   		});			
	    return form;
	},
	createButtons: function(){
		var buttons = [
            {
                text: '保存',
                scope: this,
                iconCls: 'icon-save',
                handler: this.doSave
            },
            {
                text: '关闭',
                scope: this,
                iconCls: 'icon-cancel',
                handler: this.closeWindow
            }
        ];
		return buttons;
	},

//导入附件需要的方法结束
    
    
//这是第二个面板的下半部分
    createBottomBasic: function(){
    	var me = this;
    	this.btmbasic = Ext.create('Ext.panel.Panel',{
    		region: 'south',
    		height: 305,    //调整大小
    		layout: 'border',
    		border: false,
    		items: [me.createChildDetailPanel(),me.createBtmBtn()]
    	});
    	return this.btmbasic;
    },    

//第二个面板，下半部分的按钮    
    createBtmBtn: function(){
    	var me = this;
    	this.btmbtn = Ext.create('Ext.panel.Panel',{
    		region: 'north',
    		defaults: {
    			xtype: 'button'
    		},
    		frame: true,
    		items: [
                {
                    iconCls: 'icon-create',
                    text: '添加',
                    scope: this,
                    handler: me.onAddDetail
                },
                {
                    iconCls: 'icon-delete',
                    text: '删除',
                    scope: this,
                    //handler: me.deleteDetail   //删掉一条选中的记录
                    handler: me.onMultiDelete    //删掉多条选中的记录
                },
                this.ActAction,
                this.BtmPrintOperAction
            ]
    	});
    	return this.btmbtn;
    },

//第二个面板，下半部分的panel        
    createChildDetailPanel: function(){
    	var me = this;
    	this.childdetailpanel = Ext.create('Ext.tab.Panel',{
    		region: 'center',
    		items: [me.createChildDetailGrid(),me.createChildDetailForm(),me.createPt2Pn2F3Grid(),me.createPt2Pn2F4Form(),me.createPt2Pn2F5Grid(),me.createPt2Pn2F6Form(),me.createPt2Pn2F7Form()]
    	});
    	return this.childdetailpanel;
    },    

//第二个面板下半部分，tab上的第一个grid数据

    createChildDetailGrid: function(){
    	var me = this;
    	this.childdetailgrid = Ext.create('widget.detailgrid',{
    		title: '列表',
    		height: 450
    	});
    	this.childdetailgrid.getStore().on('beforeload',function(store){
			var values = me.basicForm.getForm().getValues();
			var params = store.getProxy().extraParams;
			var receiptKey = values.receiptKey;
			delete params.receiptKey;
			if(receiptKey) params.receiptKey=receiptKey;
    	},this);
    	return this.childdetailgrid;
    },

//第二个面板下半部分，tab上F2位置的form，要看或者修改的数据
    createChildDetailForm: function(){
    	var me = this;
        var myStore=Ext.create('Ext.data.Store', {
                                autoLoad: false,   //这里必须先load，否则下拉时再load一次，之前加的参数查询结果就被覆盖了。
                                fields: [
                                    {name:'description'},
                                    {name:'uomCode'}
                                ],
                                proxy: {
                                    type: 'ajax',
                                    url: basePath + '/support/doQuerySkuPack.action',    //这里不加查询参数
                                    reader: {type: 'json',root: 'json.data',totalProperty: 'json.totalCount'},
                                    actionMethods: { read: 'POST' },
                                    simpleSortMode: true
                                }
                                //mode:'remote',    //没有看到作用
                            });
        
    	this.childdetailForm = Ext.create('Ext.form.Panel',{
    		title: '明细',
    		defaults: {
    			xtype: 'fieldcontainer'
    		},
    		frame: true,
		   	stripeRows : true,
			autoScroll : true,
			viewConfig : {
				forceFit: true,
				autoFill: true
			},
    		items: [
                {
                        layout: 'hbox',
                        defaults: {
                            xtype: 'textfield',
                            margin: '2 0 0 5',
                            labelWidth: 60,
                            width: 160
                        },
                        items: [
                            {
                                fieldLabel: '行号',
                                name: 'lineNumber',
                                allowBlank: false,                                
                                width: 120
                            },
                            {
                                fieldLabel: '状态',
                                name: 'status',
                                readOnly:true,
                                value:'0',
                                xtype:'codecombo',
                                codeType:'ASNDSTATUS',
                                labelWidth: 40,
                                width: 115
                            },
                            {
                                fieldLabel: 'PO编号',
                                name: 'dpoKey'
                            },
                            {
                                fieldLabel: 'PO行号',
                                name: 'poLineno',
                                width: 120
                            },
                            {
                                name: 'id',
                                hidden: true
                            },
                            {
                                xtype:'datefield',    //隐藏字段，放置存盘被清空
                                format:'Y-m-d H:i:s',
                                name: 'addDate',
                                hidden:true
                            },
                            {
                                xtype:'textfield',    //隐藏字段，放置存盘被清空
                                name: 'addWho',
                                hidden:true
                            }			
                        ]
                    },
                    {
                        layout: 'hbox',
                        xtype: 'fieldcontainer',
                        defaults: {
                            xtype: 'textfield',
                            margin: '2 0 0 5',
                            labelWidth: 60,
                            width: 160
                        },
                        items: [
                            {
                                fieldLabel: '商品',
                                name: 'sku',
                                allowBlank: false,  //商品是必填项                     
                                listeners:{
                                    blur: function(txt){
                                        //输入参数，鼠标离开后见检查该商品是否存在
                                        skuValue=Ext.util.Format.uppercase(txt.getValue());
                                        txt.setValue(skuValue);
                                        storerKeyValue=me.basicForm.getForm().findField('storerKey').getValue();
                                        if((''!=skuValue)&&(''!=storerKeyValue))
                                        {
                                            Ext.Ajax.request({
                                                url: basePath + '/support/doValidateSkus.action',
                                                params: {
                                                    sku:skuValue,
                                                    storerKey:storerKeyValue
                                                },
                                                success: function(response){    //failure属于连不上服务器的情况，后续补充
                                                    var text = Ext.decode(response.responseText);
                                                    var success = text.success;
                                                    if(0 != text.json.data.length)   //storerKey与sku唯一，应该只有一条记录
                                                    {
                                                        me.childdetailForm.getForm().findField('name').setValue(text.json.data[0].name);
                                                        me.childdetailForm.getForm().findField('descr').setValue(text.json.data[0].descr);
                                                        me.childdetailForm.getForm().findField('packKey').setValue(text.json.data[0].packKey);
                                                        me.childdetailForm.getForm().findField('lottable11').setValue(text.json.data[0].packKey);
                                                        me.childdetailForm.getForm().findField('uom').setValue('EA');
                                                    }
                                                    else
                                                    {
                                                        me.childdetailForm.getForm().findField('name').setValue('');
                                                        me.childdetailForm.getForm().findField('descr').setValue('');
                                                        me.childdetailForm.getForm().findField('packKey').setValue('');
                                                        me.childdetailForm.getForm().findField('lottable11').setValue('');
                                                        me.childdetailForm.getForm().findField('sku').setValue('');
                                                        me.childdetailForm.getForm().findField('uom').setValue('');
                                                        me.childdetailForm.getForm().findField('altsku').setValue('');
                                                        MessageBox.show(false, '货主或者商品不存在');
                                                        //Ext.Msg.alert("错误提示", '货主或者商品不存在')
                                                    }
                                                }
                                            })
                                        }
                                    }
                                }//end listener                       
                            },
                            {
                                fieldLabel: '中文名称',
                                name: 'name',
                                width: 325
                            },
                            {
                                xtype: 'numberfield',
                                fieldLabel: '单价',        //表中没有单价，临时用其他代替，后续要补充到表中
                                minValue:0,
                                decimalPrecision:3,
                                labelWidth: 30,
                                width: 77
                            },
                            {
                                xtype: 'numberfield',
                                fieldLabel: '体积',
                                name: 'cube',
                                minValue:0,
                                decimalPrecision:3,
                                labelWidth: 30,
                                width: 77
                            },
                            {
                                xtype: 'numberfield',
                                fieldLabel: '净重',      //表中没有净重，临时用其他代替，后续要补充到表中
                                minValue:0,
                                decimalPrecision:3,
                                labelWidth: 30,
                                width: 77
                            },
                            {
                                xtype: 'numberfield',
                                fieldLabel: '毛重',
                                labelWidth: 30,
                                minValue:0,
                                decimalPrecision:3,
                                name: 'wgt',
                                width: 77
                            }
                        ]
                    },
                    {
                        layout: 'hbox',
                        xtype: 'fieldcontainer',
                        defaults: {
                            xtype: 'textfield',
                            labelWidth: 60,
                            margin: '2 0 0 5',
                            width: 160
                        },
                        items: [
                            {
                                fieldLabel: '别名',
                                name: 'altsku',
                                listeners:{
                                    blur: function(txt){
                                        //输入参数，鼠标离开后见检查该商品别名是否存在
                                        //别名和货主做校验，但货主鼠标移动后只与sku校验，不与别名校验
                                        altskuValue=Ext.util.Format.uppercase(txt.getValue());
                                        txt.setValue(altskuValue);                                        
                                        storerKeyValue=me.basicForm.getForm().findField('storerKey').getValue();
                                        if((''!=altskuValue)&&(''!=storerKeyValue))
                                        {
                                            Ext.Ajax.request({
                                                url: basePath + '/support/doValidateAltsku.action',
                                                params: {
                                                    altsku:altskuValue,
                                                    storerKey:storerKeyValue
                                                },
                                                success: function(response){    //failure属于连不上服务器的情况，后续补充
                                                    var text = Ext.decode(response.responseText);
                                                    var success = text.success;
                                                    if(0 != text.json.data.length)
                                                    {
                                                        skuValue=text.json.data[0].sku;
                                                        me.childdetailForm.getForm().findField('sku').setValue(skuValue);

                                                        //从sku查中文名称和英文名称
                                                        Ext.Ajax.request({
                                                            url: basePath + '/support/doValidateSkus.action',
                                                            params: {
                                                                sku:skuValue
                                                            },
                                                            success: function(response){    //failure属于连不上服务器的情况，后续补充
                                                                var res = Ext.decode(response.responseText);
                                                                var success = res.success;
                                                                if(0 != res.json.data.length)
                                                                {
                                                                    me.childdetailForm.getForm().findField('name').setValue(res.json.data[0].name);
                                                                    me.childdetailForm.getForm().findField('descr').setValue(res.json.data[0].descr);
                                                                    me.childdetailForm.getForm().findField('packKey').setValue(text.json.data[0].packKey);
                                                                }
                                                            }
                                                        })
                                                    }
                                                    else
                                                    {
                                                        me.childdetailForm.getForm().findField('sku').setValue('');
                                                        me.childdetailForm.getForm().findField('altsku').setValue('');
                                                        me.childdetailForm.getForm().findField('name').setValue('');
                                                        me.childdetailForm.getForm().findField('packKey').setValue('');
                                                        me.childdetailForm.getForm().findField('descr').setValue('');
                                                        
                                                        //Ext.Msg.alert("错误提示", '商品别名不存在')
                                                         MessageBox.show(false, '商品别名不存在');
                                                    }
                                                }
                                            })
                                        }
                                    }
                                }//end listener                       

                            },
                            {
                                fieldLabel: '英文名称',
                                name: 'descr',
                                width: 325
                            },
                            {
                                xtype: 'codecombo',
                                codeType: 'HOLDCODE',
                                margin: '2 0 0 5',
                                name: 'conditionCode',
                                value:'0',        //默认值设置为正常
                                fieldLabel: '冻结码'
                            },
                            {
                                fieldLabel: '冻结原因',
                                name: 'holdReason',
                                value:'正常',
                                width: 159
                            }
                        ]
                    },
                    {
                        layout: 'hbox',
                        xtype: 'fieldcontainer',
                        defaults: {
                            xtype: 'textfield',
                            margin: '2 0 0 5',
                            labelWidth: 60
                        },
                        items: [
                            {
                                fieldLabel: '包装',
                                xtype:'textfield',
                                name: 'packKey',
                                listeners: {   //选中包装后,
                                    blur: function(txt){
                                        packKeyValue=Ext.util.Format.uppercase(txt.getValue());;
                                        txt.setValue(packKeyValue);
                                    //    packKeyValue=newValue.getValue();
                                        uomValue = me.childdetailForm.getForm().findField('uom').getValue();
                                        qtyUomExpectedValue= me.childdetailForm.getForm().findField('qtyUomExpected').getValue();
                                        qtyUomReceivedValue= me.childdetailForm.getForm().findField('qtyUomReceived').getValue();
										me.childdetailForm.getForm().findField('lottable11').setValue(packKeyValue);
                                        if(''!=packKeyValue)
                                        {
                                            Ext.Ajax.request({
                                                url: basePath + '/support/doCheckPack.action',
                                                params: {
                                                    packKey:packKeyValue
                                                },
                                                success: function(response){    //failure属于连不上服务器的情况，后续补充
                                                    var text = Ext.decode(response.responseText);
                                                    var success = text.success;
                                                    if(0 != text.json.data.length)
                                                    {
                                                        //包装存在，则loadstore，查询单位的下拉框。
                                                        myStore.load({params:{packKey:packKeyValue}})
                                                        //找到对应的uomQty数量
                                                        if((''!=uomValue)&&(''!=packKeyValue))
                                                        {
                                                            Ext.Ajax.request({
                                                                url: basePath + '/support/doQuerySkuPackQty.action',
                                                                params: {
                                                                    uomCode:uomValue,   //需要验证这里查询参数是什么？重点关注qxue
                                                                    packKey:packKeyValue
                                                                },
                                                                success: function(response){    //failure属于连不上服务器的情况，后续补充
                                                                    var text = Ext.decode(response.responseText);
                                                                    var success = text.success;
                                                                     if(''!= text.json.data || null != text.json.data)
                                                                     {
                                                                        var uomQty=text.json.data;
                                                                        me.childdetailForm.getForm().findField('qtyExpected').setValue(qtyUomExpectedValue*uomQty);
                                                                        me.childdetailForm.getForm().findField('qtyReceived').setValue(qtyUomReceivedValue*uomQty);
                                                                        
                                                                     }
                                                                }
                                                            })
                                                        }                                              
                                                    }
                                                    else
                                                    {
                                                        me.childdetailForm.getForm().findField('packKey').setValue('');
                                                        me.childdetailForm.getForm().findField('qtyExpected').setValue('');  //预期数量清空
                                                        me.childdetailForm.getForm().findField('qtyReceived').setValue('');  //实收数量清空
                                                        me.childdetailForm.getForm().findField('lottable11').setValue(packKeyValue);//批属性11也要清空
                                                        //Ext.Msg.alert("错误提示", '包装不存在')
                                                         MessageBox.show(false, '包装不存在');
                                                    }
                                                }
                                            })
                                        }
                                    }
/*									change: function(tf,newValue){
                                        packKeyValue=newValue;
                                        console.log(packKeyValue);
                                        myStore.load({params:{packKey:packKeyValue}})
                                    }*/
                                    /*select:function(txt){   //选中触发的事件，可以显示当前字段名称
                                        packKeyValue=txt.getValue();
                                        //console.log(packKeyValue);
                                        myStore.load({params:{packKey:packKeyValue}})
                                    }  */
                                },
                                allowBlank: false,                                
                                width: 160
                            },
                            {
                                fieldLabel: '单位',
                                name: 'uom',
                                xtype:'combobox',
                                store:myStore,
                                displayField: 'description',
                                //valueField: 'description',   
                                valueField: 'uomCode',         //保存用uomCode，excel导入写为EA，按照最小单位输入数量
                                width: 120,
                                allowBlank: false,                                
                                listeners: {   //选中包装后,
									blur: function(txt){
                                        var uomValue=txt.getValue();  //需要根据description反查数量，然后再计算 qxue
                                        var packKeyValue=me.childdetailForm.getForm().findField('packKey').getValue();

                                        var qtyUomExpectedValue=me.childdetailForm.getForm().findField('qtyUomExpected').getValue();
                                        var qtyUomReceivedValue=me.childdetailForm.getForm().findField('qtyUomReceived').getValue();
                                        
                                        if((''!=uomValue)&&(''!=packKeyValue))
                                        {
                                            Ext.Ajax.request({
                                                url: basePath + '/support/doQuerySkuPackQty.action',
                                                params: {
                                                    uomCode:uomValue,
                                                    packKey:packKeyValue
                                                },
                                                success: function(response){    //failure属于连不上服务器的情况，后续补充
                                                    var text = Ext.decode(response.responseText);
                                                    var success = text.success;
                                                     if(''!= text.json.data || null != text.json.data)
                                                     {
                                                        var uomQty=text.json.data;
                                                        me.childdetailForm.getForm().findField('qtyExpected').setValue(qtyUomExpectedValue*uomQty);
                                                        me.childdetailForm.getForm().findField('qtyReceived').setValue(qtyUomReceivedValue*uomQty);
                                                        
                                                     }
                                                }
                                            })
                                        }
										//console.log('uom');
										//me.childdetailForm.getForm().findField('qtyExpected').setValue(qtyUomExpectedValue*uomValue);
										//me.childdetailForm.getForm().findField('qtyReceived').setValue(qtyUomReceivedValue*uomValue);
									}
                                }								
                            },
                            {
                                xtype:'label',
                                text: 'TI X HI:',
                                margin: '7 0 0 18'
                            },
                            {
                                fieldLabel: '',
                                width: 65,
                                name: 'ti'
                            },
                            {
                                fieldLabel: '',
                                name: 'hi',
                                margin: '2 0 0 10',
                                width: 65
                            },
                            {
                                fieldLabel: '收货库位',
                                width: 159,
                                name: 'fromloc',
                                allowBlank: false,                                
                                listeners:{
                                    blur: function(txt){                                    
                                        locValue=Ext.util.Format.uppercase(txt.getValue());
                                        txt.setValue(locValue);
                                        if(''!=locValue)
                                        {
                                            Ext.Ajax.request({
                                                url: basePath + '/support/doCheckLocExist.action',  
                                                params: {
                                                    loc:locValue
                                                },
                                                success: function(response){
                                                    var text = Ext.decode(response.responseText);
                                                    var status = text.success;
                                                    if(false==status)   //false表示没有找到该库位
                                                    {
                                                        MessageBox.show(status, text.json.msg);   
                                                        me.childdetailForm.getForm().findField('fromloc').setValue('');
                                                    }
                                                }
                                            });
                                        }                                        

                                    }                                    
                                }                                
                            },
                            {
                                fieldLabel: '上架库位',
                                width: 159,
                                name: 'toloc',
                                listeners:{
                                    blur: function(txt){                                    
                                        locValue=Ext.util.Format.uppercase(txt.getValue());
                                        txt.setValue(locValue);
                                        if(''!=locValue)
                                        {
                                            Ext.Ajax.request({
                                                url: basePath + '/support/doCheckLocExist.action',  
                                                params: {
                                                    loc:locValue
                                                },
                                                success: function(response){
                                                    var text = Ext.decode(response.responseText);
                                                    var status = text.success;
                                                    //console.log(status);
                                                    //用status区分查重还是查是否存在。
                                                    if(false==status)   //false表示没有找到该库位
                                                    {
                                                        MessageBox.show(status, text.json.msg);   
                                                        me.childdetailForm.getForm().findField('toloc').setValue('');
                                                    }
                                                }
                                            });
                                        }                                        

                                    }
                                }                                
                            }
                        ]
                    },
                    {
                        layout: 'hbox',
                        xtype: 'fieldcontainer',
                        defaults: {
                            xtype: 'textfield',
                            margin: '2 0 0 5',
                            labelWidth: 60,
                            width: 160
                        },
                        items: [
                            {
                                xtype:'label',
                                text: '预期数量:',
                                margin: '7 0 0 5',
                                width: 60
                            },
                            {
                                fieldLabel: '',
                                xtype: 'numberfield',
                                minValue:0,
                                decimalPrecision:3,
                                width:86,
                                name:'qtyUomExpected',
                                allowBlank: false,                                
                                listeners: {
									blur: function(txt){
                                        var qtyValue=txt.getValue();
                                        //var uomValue=me.childdetailForm.getForm().findField('uom').getValue();
										//me.childdetailForm.getForm().findField('qtyExpected').setValue(qtyValue*uomValue);
                                        
                                        var uomValue=me.childdetailForm.getForm().findField('uom').getValue();
                                        var packKeyValue=me.childdetailForm.getForm().findField('packKey').getValue();

                                        //var qtyUomExpectedValue=me.childdetailForm.getForm().findField('qtyUomExpected').getValue();
                                        if((''!=uomValue)&&(''!=packKeyValue))
                                        {
                                            Ext.Ajax.request({
                                                url: basePath + '/support/doQuerySkuPackQty.action',
                                                params: {
                                                    uomCode:uomValue,
                                                    packKey:packKeyValue
                                                },
                                                success: function(response){    //failure属于连不上服务器的情况，后续补充
                                                    var text = Ext.decode(response.responseText);
                                                    var success = text.success;
                                                     if(''!= text.json.data || null != text.json.data)
                                                     {
                                                        var uomQty=text.json.data;
                                                        me.childdetailForm.getForm().findField('qtyExpected').setValue(qtyValue*uomQty);
                                                        
                                                     }
                                                }
                                            })
                                        }
                                        else
                                        {
                                            me.childdetailForm.getForm().findField('qtyUomExpected').setValue('');
                                            MessageBox.show(false, '请先输入包装和单位');//单位是下拉框，可能有多个空格，不好确定是否为空
                                            //MessageBox.show(false, uomValue);   
                                        }
                                        
                                        
									}
                                }							
                            },
                            {
                                fieldLabel: '',
                                xtype: 'numberfield',
                                minValue:0,
                                decimalPrecision:3,
                                width:86,
								readOnly:true,
                                name:'qtyExpected'   //计算出来的数量
                            },
                            {
                                xtype:'label',
                                text: '实收数量:',
                                margin: '7 0 0 5',
                                width: 60
                            },
                            {
                                fieldLabel: '',
                                xtype: 'numberfield',
                                minValue:0,
                                decimalPrecision:3,
                                width:86,
                                name:'qtyUomReceived',
                                listeners: {
									blur: function(txt){
                                        var qtyValue=txt.getValue();
                                        //var uomValue=me.childdetailForm.getForm().findField('uom').getValue();

										//console.log('qtyR');
										//me.childdetailForm.getForm().findField('qtyReceived').setValue(qtyValue*uomValue);
                                        
                                        var uomValue=me.childdetailForm.getForm().findField('uom').getValue();
                                        var packKeyValue=me.childdetailForm.getForm().findField('packKey').getValue();

                                        var qtyUomReceivedValue=me.childdetailForm.getForm().findField('qtyUomReceived').getValue();
                                        if((''!=uomValue)&&(''!=packKeyValue))
                                        {
                                            Ext.Ajax.request({
                                                url: basePath + '/support/doQuerySkuPackQty.action',
                                                params: {
                                                    uomCode:uomValue,
                                                    packKey:packKeyValue
                                                },
                                                success: function(response){    //failure属于连不上服务器的情况，后续补充
                                                    var text = Ext.decode(response.responseText);
                                                    var success = text.success;
                                                     if(''!= text.json.data || null != text.json.data)
                                                     {
                                                        var uomQty=text.json.data;
                                                        me.childdetailForm.getForm().findField('qtyReceived').setValue(qtyValue*uomQty);
                                                     }
                                                }
                                            })
                                        } 
                                        
									}
                                }							
								
                            },
                            {
                                fieldLabel: '',
                                xtype: 'numberfield',
                                minValue:0,
                                decimalPrecision:3,
                                width:86,
								readOnly:true,
                                allowBlank: false,                                
                                name:'qtyReceived' //计算出来的实收数量
                            },
                            {
                                xtype:'datefield',
                                //fieldLabel: '入库日期',
                                fieldLabel: '批属性1',
                                name: 'lottable01', 
                                allowBlank: false,                                
                                format:'Y-m-d H:i:s', //精确到秒
                                value: Ext.util.Format.date(new Date(),"Y-m-d")     //初始值是当天日期，时分秒自动填0
                            },
                            
                            {
                                xtype:'datefield',
                                //fieldLabel: '生产日期',
                                fieldLabel: '批属性2',
                                name: 'lottable02',
                                format:'Y-m-d H:i:s'   //精确到秒
                            }
                        ]
                    },
                    {
                        layout: 'hbox',
                        xtype: 'fieldcontainer',
                        defaults: {
                            xtype: 'textfield',
                            margin: '2 0 0 5',
                            labelWidth: 60,
                            width: 160
                        },
                        items: [
                            {
                                xtype:'datefield',
                                //fieldLabel: '失效日期',
                                fieldLabel: '批属性3',
                                name: 'lottable03',
                                format:'Y-m-d H:i:s'   //精确到秒
                            },
                            {
                                fieldLabel: '批属性4',
                                name: 'lottable04',
                                xtype: 'textfield',
                                listeners:{
                                    blur:function(txt){
                                      txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                    }
                                }
                            },
                            {
                                fieldLabel: '批属性5',
                                name: 'lottable05',
                                xtype: 'textfield',
                                value:'OK',
                                listeners:{
                                    blur:function(txt){
                                      txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                    }
                                }
                            },
                            {
                                fieldLabel: '批属性6',
                                name: 'lottable06',
                                xtype: 'textfield',
                                value:'AV',
                                listeners:{
                                    blur:function(txt){
                                      txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                    }
                                }
                            },
                            {
                                fieldLabel: '批属性7',
                                name: 'lottable07',
                                xtype: 'textfield',
                                value:'T',
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
                        xtype: 'fieldcontainer',
                        defaults: {
                            xtype: 'textfield',
                            margin: '2 0 0 5',
                            labelWidth: 60,
                            width: 160
                        },
                        items: [
                            {
                                fieldLabel: '批属性8',
                                name: 'lottable08',
                                xtype: 'textfield',
                                listeners:{
                                    blur:function(txt){
                                      txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                    }
                                }
                            },
                            {
                                fieldLabel: '批属性9',
                                name: 'lottable09',
                                xtype: 'textfield',
                                listeners:{
                                    blur:function(txt){
                                      txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                    }
                                }
                            },
                            {
                                fieldLabel: '批属性10',
                                name: 'lottable10',
                                xtype: 'textfield',
                                listeners:{
                                    blur:function(txt){
                                      txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                    }
                                }
                            },
                            {
                                fieldLabel: '批属性11',
                                name: 'lottable11',
                                readOnly:true
                            },
                            {
                                fieldLabel: '批属性12',
                                name: 'lottable12',
                                readOnly:true
                            }
                        ]
                    },
                    {
                        layout: 'hbox',
                        xtype: 'fieldcontainer',
                        defaults: {
                            xtype: 'textfield',
                            margin: '2 0 0 5',
                            labelWidth: 60,
                            width: 160
                        },
                        items: [
                            
                            {
                                fieldLabel: '批属性13',
                                name: 'lottable13',
                                readOnly:true
                            },
                            {
                                fieldLabel: '批属性14',
                                name: 'lottable14',
                                readOnly:true
                            },
                            {
                                fieldLabel: '批属性15',
                                name: 'lottable15',
                                readOnly:true
                            }
                        ]
                    },
                    {
                        layout: 'hbox',
                        xtype: 'fieldcontainer',
                        defaults: {
                            xtype: 'textfield',
                            margin: '2 0 0 5',
                            labelWidth: 60,
                            width: 160
                        },
                        items: [
                            {
                                fieldLabel: '自定义1',
                                name: 'udf1'
                            },
                            {
                                fieldLabel: '自定义2',
                                name: 'udf2'
                            },
                            {
                                fieldLabel: '自定义3',
                                name: 'udf3'
                            },
                            {
                                fieldLabel: '自定义4',
                                name: 'udf4'
                            },
                            {
                                fieldLabel: '自定义5',     //该字段不知什么原因显示不出来，后续再排查
                                name: 'udf5'
                            },
                            {
                                name: 'tolot',
                                hidden:true
                            }
                        ]
                    }/*,
/*                    { // 备注放不下，先隐藏起来，以后再考虑调整
                        layout: 'hbox',
                        xtype: 'fieldcontainer',
                        defaults: {
                            xtype: 'textfield',
                            margin: '2 0 0 5',
                            labelWidth: 60,
                            width: 160
                        },
                        items: [
                            {
                                fieldLabel: '备注',
                                name: 'notes',
                                width: 975
                            }
                        ]
                    }*/
                ]
    	});
    	return this.childdetailForm;
    },

//第二个面板下半部分，tab上的F3位置的grid数据，码盘列表
    createPt2Pn2F3Grid: function(){
    	var me = this;
    	this.pt2pn2f3grid = Ext.create('widget.detailgrid',{
    		title: '码盘列表',
    		height: 450
    	});
    	this.childdetailgrid.getStore().on('beforeload',function(store){
			var values = me.basicForm.getForm().getValues();
			var params = store.getProxy().extraParams;
			var receiptKey = values.receiptKey;
			delete params.receiptKey;
			if(receiptKey) params.receiptKey=receiptKey;
    	},this);
    	return this.pt2pn2f3grid;
    },

//第二个面板下半部分，tab上F4位置的form，码盘数据
    createPt2Pn2F4Form: function(){
    	var me = this;
    	this.pt2pn2f4form = Ext.create('Ext.form.Panel',{
    		title: '码盘明细',
    		defaults: {
    			xtype: 'fieldcontainer'
    		},
    		frame: true,
		   	stripeRows : true,
			autoScroll : true,
			viewConfig : {
				forceFit: true,
				autoFill: true
			},
    		items: [
                {
                        layout: 'hbox',
                        defaults: {
                            xtype: 'textfield',
                            margin: '2 0 0 5',
                            labelWidth: 60,
                            width: 160
                        },
                        items: [
                            {
                                fieldLabel: '行号',
                                name: 'lineNumber',
                                width: 120
                            },
                            {
                                fieldLabel: '状态',
                                name: 'status',
                                labelWidth: 40,
                                width: 115
                            },
                            {
                                fieldLabel: 'PO编号',
                                name: 'dpoKey'
                            },
                            {
                                fieldLabel: 'PO行号',
                                name: 'poLineno',
                                width: 120
                            }
                        ]
                    },
                    {
                        layout: 'hbox',
                        xtype: 'fieldcontainer',
                        defaults: {
                            xtype: 'textfield',
                            margin: '2 0 0 5',
                            labelWidth: 60,
                            width: 160
                        },
                        items: [
                            {
                                fieldLabel: '商品',
                                name: 'sku'
                            },
                            {
                                fieldLabel: '中文名称',
                                name: 'name',
                                width: 325
                            },
                            {
                                fieldLabel: '单价',        //表中没有单价，临时用其他代替，后续要补充到表中
                                labelWidth: 30,
                                width: 77
                            },
                            {
                                fieldLabel: '体积',
                                name: 'cube',
                                labelWidth: 30,
                                width: 77
                            },
                            {
                                fieldLabel: '净重',      //表中没有净重，临时用其他代替，后续要补充到表中
                                labelWidth: 30,
                                width: 77
                            },
                            {
                                fieldLabel: '毛重',
                                labelWidth: 30,
                                name: 'wgt',
                                width: 77
                            }
                        ]
                    },
                    {
                        layout: 'hbox',
                        xtype: 'fieldcontainer',
                        defaults: {
                            xtype: 'textfield',
                            labelWidth: 60,
                            margin: '2 0 0 5',
                            width: 160
                        },
                        items: [
                            {
                                fieldLabel: '别名',
                                name: 'altsku'
                            },
                            {
                                fieldLabel: '英文名称',
                                name: 'descr',
                                width: 325
                            },
                            {
                                fieldLabel: '冻结码',
                                name: 'conditionCode',
                                margin: '2 0 0 5',
                                width: 159
                            },
                            {
                                fieldLabel: '冻结原因',
                                name: 'holdReason',
                                width: 159
                            }
                        ]
                    },
                    {
                        layout: 'hbox',
                        xtype: 'fieldcontainer',
                        defaults: {
                            xtype: 'textfield',
                            margin: '2 0 0 5',
                            labelWidth: 60
                        },
                        items: [
                            {
                                fieldLabel: '包装',
                                name: 'packKey',
                                width: 160
                            },
                            {
                                fieldLabel: '单位',
                                name: 'uom',
                                width: 120
                            },
                            {
                                xtype:'label',
                                text: 'TI X HI:',
                                margin: '7 0 0 18'
                            },
                            {
                                fieldLabel: '',
                                width: 65,
                                name: 'ti'
                            },
                            {
                                fieldLabel: '',
                                name: 'hi',
                                margin: '2 0 0 10',
                                width: 65
                            },
                            {
                                fieldLabel: '收货库位',
                                width: 159,
                                name: 'fromloc'
                            },
                            {
                                fieldLabel: '上架库位',
                                width: 159,
                                name: 'toloc'
                            }
                        ]
                    },
                    {
                        layout: 'hbox',
                        xtype: 'fieldcontainer',
                        defaults: {
                            xtype: 'textfield',
                            margin: '2 0 0 5',
                            labelWidth: 60,
                            width: 160
                        },
                        items: [
                            {
                                xtype:'label',
                                text: '预期数量:',
                                margin: '7 0 0 5',
                                width: 60
                            },
                            {
                                fieldLabel: '',
                                width:86,
                                name: 'fromloc'
                            },
                            {
                                fieldLabel: '',
                                width:86,
                                name: 'fromloc1'   //计算出来的数量
                            },
                            {
                                xtype:'label',
                                text: '实收数量:',
                                margin: '7 0 0 5',
                                width: 60
                            },
                            {
                                fieldLabel: '',
                                width:86,
                                name: 'toloc'
                            },
                            {
                                fieldLabel: '',
                                width:86,
                                name: 'toloc1'   //计算出来的实收数量
                            },
                            {
                                xtype:'datefield',
                                fieldLabel: '批属性1',//入库日期
                                name: 'lottable01',
                                format:'Y-m-d H:i:s'
                            },                            
                            {
                                xtype:'datefield',
                                fieldLabel: '批属性',//生产日期
                                name: 'lottable02',
                                format:'Y-m-d H:i:s'
                            }
                        ]
                    },
                    {
                        layout: 'hbox',
                        xtype: 'fieldcontainer',
                        defaults: {
                            xtype: 'textfield',
                            margin: '2 0 0 5',
                            labelWidth: 60,
                            width: 160
                        },
                        items: [
                            {
                                xtype:'datefield',
                                fieldLabel: '批属性3',//失效日期
                                name: 'lottable03',
                                format:'Y-m-d H:i:s'
                            },
                            {
                                fieldLabel: '批属性4',
                                name: 'lottable04',
                                xtype: 'textfield'
                            },
                            {
                                fieldLabel: '批属性5',
                                name: 'lottable05',
                                xtype: 'textfield'
                            },
                            {
                                fieldLabel: '批属性6',
                                name: 'lottable06'
                            },
                            {
                                fieldLabel: '批属性7',
                                name: 'lottable07'
                            }
                        ]
                    },
                    {
                        layout: 'hbox',
                        xtype: 'fieldcontainer',
                        defaults: {
                            xtype: 'textfield',
                            margin: '2 0 0 5',
                            labelWidth: 60,
                            width: 160
                        },
                        items: [
                            {
                                fieldLabel: '批属性8',
                                name: 'lottable08'
                            },
                            {
                                fieldLabel: '批属性9',
                                name: 'lottable09'
                            },
                            {
                                fieldLabel: '批属性10',
                                name: 'lottable010'
                            },
                            {
                                fieldLabel: '批属性11',
                                name: 'lottable11'
                            },
                            {
                                fieldLabel: '批属性12',
                                name: 'lottable12'
                            }
                        ]
                    },
                    {
                        layout: 'hbox',
                        xtype: 'fieldcontainer',
                        defaults: {
                            xtype: 'textfield',
                            margin: '2 0 0 5',
                            labelWidth: 60,
                            width: 160
                        },
                        items: [
                            
                            {
                                fieldLabel: '批属性13',
                                name: 'lottable13',
                                readOnly:true
                            },
                            {
                                fieldLabel: '批属性14',
                                name: 'lottable14',
                                readOnly:true
                            },
                            {
                                fieldLabel: '批属性15',
                                name: 'lottable15',
                                readOnly:true
                            }
                        ]
                    },
                    {
                        layout: 'hbox',
                        xtype: 'fieldcontainer',
                        defaults: {
                            xtype: 'textfield',
                            margin: '2 0 0 5',
                            labelWidth: 60,
                            width: 160
                        },
                        items: [
                            {
                                fieldLabel: '自定义1',
                                name: 'udf1'
                            },
                            {
                                fieldLabel: '自定义2',
                                name: 'udf2'
                            },
                            {
                                fieldLabel: '自定义3',
                                name: 'udf3'
                            },
                            {
                                fieldLabel: '自定义4',
                                name: 'udf4'
                            },
                            {
                                fieldLabel: '自定义5',     //该字段不知什么原因显示不出来，后续再排查
                                name: 'udf5'
                            }
                        ]
                    }/*,
/*                    { // 备注放不下，先隐藏起来，以后再考虑调整
                        layout: 'hbox',
                        xtype: 'fieldcontainer',
                        defaults: {
                            xtype: 'textfield',
                            margin: '2 0 0 5',
                            labelWidth: 60,
                            width: 160
                        },
                        items: [
                            {
                                fieldLabel: '备注',
                                name: 'notes',
                                width: 975
                            }
                        ]
                    }*/
                ]
    	});
    	return this.pt2pn2f4form;
    },


    
//第二个面板下半部分，tab上的F5位置的grid数据，上架列表
    createPt2Pn2F5Grid: function(){
    	var me = this;
    	this.pt2pn2f5grid = Ext.create('widget.padetailgrid',{
    		title: '上架列表',
    		height: 450
    	});
    	this.pt2pn2f5grid.getStore().on('beforeload',function(store){
			var values = me.basicForm.getForm().getValues();
			var params = store.getProxy().extraParams;
            //form上获得receiptKey
            var receiptKey = values.receiptKey;
            delete params.receiptKey;
			if(receiptKey) params.receiptKey=receiptKey;

            //grid上获得行号
       		var records = me.childdetailgrid.getSelectionModel().getSelection();
			if(records != ''){
				var data = records[0].getData();
				var lineNumber = data.lineNumber;
				delete params.lineNumber;
				if(lineNumber) params.lineNumber = lineNumber;
			}

            },this);
    	return this.pt2pn2f5grid;
    },

//第二个面板下半部分，tab上F6位置的form，上架明细
    createPt2Pn2F6Form: function(){
    	var me = this;
    	this.pt2pn2f6form = Ext.create('Ext.form.Panel',{
    		title: '上架明细',
    		defaults: {
                anchor: '100%',
    			xtype: 'fieldcontainer',
                layout: 'hbox'
    		},
    		frame: true,
		   	//stripeRows : true,
			autoScroll : true,
			viewConfig : {
				forceFit: true,
				autoFill: true
			},
			buttonAlign:'left',  
    		items: [
                {
                        layout: 'hbox',
                        defaults: {
                            xtype: 'textfield',
                            margin: '2 0 0 5',
                            labelWidth: 80,
                            labelAlign: 'top',                            
                            width: 120
                        },
                        items: [
                            {
                                fieldLabel: '序号',
                                readOnly:true,
                                name: 'serialNo'
                            },                        
                            {
                                fieldLabel: '行号',
                                readOnly:true,
                                name: 'lineNumber'
                            },
                            {
                                fieldLabel: '上架库位',
                                name: 'paloc',
                                listeners:{
                                    blur: function(txt){                                    
                                        locValue=Ext.util.Format.uppercase(txt.getValue());
                                        txt.setValue(locValue);
                                        if(''!=locValue)
                                        {
                                            Ext.Ajax.request({
                                                url: basePath + '/support/doCheckLocExist.action',  
                                                params: {
                                                    loc:locValue
                                                },
                                                success: function(response){
                                                    var text = Ext.decode(response.responseText);
                                                    var status = text.success;
                                                    //用status区分查重还是查是否存在。
                                                    if(false==status)   //false表示没有找到该库位
                                                    {
                                                        MessageBox.show(status, text.json.msg);   
                                                        me.pt2pn2f6form.getForm().findField('paloc').setValue('');
                                                    }
                                                }
                                            });
                                        }                                        

                                    }
                                }                                 
                            },
                            {
                                name: 'id',
                                hidden:true
                            }
                        ]
                    },
                    {
                        layout: 'hbox',
                        xtype: 'fieldcontainer',
                        defaults: {
                            xtype: 'textfield',
                            margin: '2 0 0 5',
                            labelAlign: 'top',                            
                            labelWidth: 80,
                            width: 120
                        },
                        items: [
                            {
                                fieldLabel: '单位',
                                readOnly:true,
                                //name: 'uom'
                                name:'description'
                            },
                            {
                                fieldLabel: '计算上架数量',
                                name: 'uomqty',
                                xtype:'numberfield',
                                minValue:0,
                                decimalPrecision:3,
                                readOnly:true,
                                width: 120
                            },
                            {
                                fieldLabel: '实际上架数量',
                                name: 'paqty',
                                xtype:'numberfield',
                                minValue:0,
                                decimalPrecision:3,
                                width: 120
                            },
                            {
                                xtype:'button',
                                text:'保存',
                                iconCls: 'icon-save',
                                width: 80,
                                margin: '20 20 0 15',
                                scope : this,
                                handler: me.onSavePaDetail                                
                            
                            }
                            
                        ]
                    },
                    {
                        layout: 'hbox',
                        xtype: 'fieldcontainer',
                        defaults: {
                            xtype: 'textfield',
                            margin: '2 0 0 5',
                            labelAlign: 'top',                            
                            labelWidth: 80,
                            width: 120
                        },
                        items: [
                            {
                                hidden:true,
                                name: 'gid'
                            },
                            {
                                xtype:'datefield',
                                format:'Y-m-d H:i:s',
                                name: 'addDate',
                                hidden:true
                            },
                            {
                                xtype:'textfield',
                                name: 'addWho',
                                hidden:true
                            },
                            {
                                xtype:'textfield',
                                name: 'status',
                                hidden:true
                            },
                            {
                                xtype:'numberfield',
                                decimalPrecision:3,
                                name: 'qty',
                                hidden:true
                            },
                            {
                                xtype:'textfield',
                                name: 'uom',
                                hidden:true
                            }                             
                        ]
                    }                    

                ]
    	});
    	return this.pt2pn2f6form;
    },

    //保存padetail记录，待补充，位置也要调整
	onSavePaDetail: function(){
		var me = this;
    	var basicform = this.basicForm.getForm();//基本
    	var basic = basicform.getValues();
        
		var padform  = me.pt2pn2f6form.getForm();
        var padValue =padform.getValues()

        if(!(padform.isValid())||!(basicform.isValid())) return;
         
        Ext.Ajax.request({
            url: basePath + '/inbound/doSavePaDetail.action',
            params: {
		        receiptKey: basic.receiptKey,
                id: padValue.id,
                serialNo: padValue.serialNo,
                lineNumber: padValue.lineNumber,
                uom: padValue.uom,
                uomqty: padValue.uomqty,
                paqty: padValue.paqty,
                status: padValue.status,
                gid: padValue.gid,
                qty: padValue.qty,
                paloc: padValue.paloc,
                addDate: padValue.addDate,
                addWho: padValue.addWho
                },
		    success: function(response){
		        var text = Ext.decode(response.responseText);
		        var success = text.success;
		        MessageBox.show(success, text.json.msg);
		        me.pt2pn2f5grid.getStore().load();
		    }                        
        });
    }, 
    
//第二个面板下半部分，tab上F7位置的form，序列号
    createPt2Pn2F7Form: function(){
    	var me = this;
    	this.pt2pn2f7form = Ext.create('Ext.form.Panel',{
    		title: '序列号',
    		defaults: {
    			xtype: 'fieldcontainer'
    		},
    		frame: true,
		   	stripeRows : true,
			autoScroll : true,
			viewConfig : {
				forceFit: true,
				autoFill: true
			},
    		items: [

                ]
    	});
    	return this.pt2pn2f7form;
    },

    //以下是第二个tab页面用到的方法
    //第二个tab页面，上半部分panel，btn面板的创建按钮，清空主表和明细表的输入面板
    
    onCreate: function(){
    	this.basicForm.getForm().reset();
    	this.customerForm.getForm().reset();
        this.clForm.getForm().reset();
        this.moneychildform.getForm().reset();  
        this.pt2pn1f5f1form.getForm().reset();  
        this.probookf1form.getForm().reset();   
        this.pt2pn1f7form.getForm().reset();
        this.pt2pn1f8form.getForm().reset();

        this.childtop.setActiveTab(0);
        
        //新建主表记录，主表，明细表所有字段取消只读
        this.onSetReceiptReadOnly(false);
        this.onSetReceiptKeyReadOnly(false);
        this.onSetDetailReadOnly(false);
        this.onSetDetailKeyReadOnly(false);
        

        //清空明细表的输入form，并跳转的该form
    	this.childdetailForm.getForm().reset();
        this.childdetailpanel.setActiveTab(1);

        //计划在创建时自动加载一个数字
        //规则目前写死，后续考虑修改
        var nameCode='ABCRECEIPTKEY';
        
	    this.teststore = Ext.create('Ext.data.Store', {
	        remoteSort: true,
            autoLoad: true,
            fields: [
                        {name:'number'},
                        {name:'id'}
            ],
	        proxy: {
	            type: 'ajax',
	            url: basePath + '/support/doQueryNumber.action?name='+nameCode,     
	            reader: {type: 'json',root: 'json.data',totalProperty: 'json.totalCount'},
	            actionMethods: { read: 'POST' },
	            simpleSortMode: true
	        },
            //加载数据到store，通过监听事件来设置
            listeners: {
                'load':function(sto,recs){
                    var value=sto.getAt(0).get('number');
                    if(''!=value)
                    {
                        this.basicForm.getForm().findField('receiptKey').setValue(value);   
                        this.childdetailForm.getForm().findField('lineNumber').setValue('1');     //创建receiptkey时，设置行号为1
                        //每次创建时重新设置时间
                        var timeValue=Ext.util.Format.date(new Date(),"Y-m-d H:i:s")
                        this.basicForm.getForm().findField('orderDate').setValue(timeValue); 
                        //this.childdetailForm.getForm().findField('lottable01').setValue(timeValue);   //不需要填写时间
                        //自动把ASN编号加到属性12中
                       var lottable12Value =this.basicForm.getForm().findField('receiptKey').getValue(); 
                       this.childdetailForm.getForm().findField('lottable12').setValue(lottable12Value);                         
                    }
                },scope:this
            }
	    });        
    },

    onAddDetail: function(){
    	this.childdetailForm.getForm().reset();
    	this.childdetailpanel.setActiveTab(1);
        
        //新建明细表记录，所有字段取消只读
        this.onSetDetailReadOnly(false);
        this.onSetDetailKeyReadOnly(false);
                
        this.lineNoStore = Ext.create('Ext.data.Store', {
	        remoteSort: true,
            autoLoad: true,
            fields: [
                        {name:'id'},
                        {name:'receiptKey'},
                        {name:'lineNumber'}
            ],
	        proxy: {
	            type: 'ajax',
                //添加明细时，根据receiptKey查找。如果找不到，设置为1
	            url: basePath + '/inbound/doCreateReceiptDetailLineNumber.action?receiptKey='+this.basicForm.getForm().findField('receiptKey').getValue(),
	            reader: {type: 'json',root: 'json.data',totalProperty: 'json.totalCount'},
	            actionMethods: { read: 'POST' },
	            simpleSortMode: true
	        },
            //加载数据到store，通过监听事件来设置
            listeners: {
                'load':function(sto,recs){
//                    console.log(sto.totalCount);
                  if(0!=sto.totalCount)
                    {
                        var value=sto.getAt(0).get('lineNumber');
                        this.childdetailForm.getForm().findField('lineNumber').setValue(value); 
                    }
                    else
                    {
                        this.childdetailForm.getForm().findField('lineNumber').setValue('1'); 
                    }
                },scope:this
            }
	    });

        //自动填写入库日期，来自创建日期
       //var timeValue =this.basicForm.getForm().findField('orderDate').getValue(); 
       //this.childdetailForm.getForm().findField('lottable01').setValue(timeValue); 
       //自动把ASN编号加到属性12中
       var lottable12Value =this.basicForm.getForm().findField('receiptKey').getValue(); 
       this.childdetailForm.getForm().findField('lottable12').setValue(lottable12Value); 
       

    },
    
    //从form获取主表参数，删除主表和相关明细表记录的方法
    deleteReAndDetal: function(){
		var me = this;
    	var record = me.basicForm.getForm().getFieldValues(); 
    	if(record.receiptKey == ""){
    		MessageBox.error('错误提示','请选择操作的数据！');
    		return;
    	}
        else
        {
        	Ext.MessageBox.confirm('询问提示', '确定要删除吗？', 
    			function(btn){
    				if(btn == 'yes'){    
                            Ext.Ajax.request({
                                url: basePath + '/inbound/doDeleteReceipt.action',
                                params: {
                                    receiptKey: record.receiptKey
                                },
                                success: function(response){
                                    var text = Ext.decode(response.responseText);
                                    var success = text.success;
                                    MessageBox.show(success, text.json.msg);
                                    //只有删除成功，才清空相关的form和grid
                                    if(success==true)
                                    {
                                        me.basicForm.getForm().reset();
                                        me.customerForm.getForm().reset();
                                        me.clForm.getForm().reset();
                                        me.moneychildform.getForm().reset();     //临时增加form
                                        me.pt2pn1f5f1form.getForm().reset();     //临时增加form
                                        me.probookf1form.getForm().reset();      //临时增加form
                                        me.childdetailForm.getForm().reset();
                                        me.childdetailgrid.getStore().removeAll();
                                        me.receiptgrid.getStore().load();
                                    }
                                }
                            });
    				}
                }
			);  
    	}
    },
    
    //删除一条明细表记录的方法
    //已经不用了
 /*   deleteDetail: function(){
		var me = this;
		var records = this.childdetailgrid.getSelectionModel().getSelection();
    	if(records == ""){
    		MessageBox.error('错误提示','请选择操作的数据！');
    		return;
    	}else{
    		var data = records[0].getData();
        	Ext.Ajax.request({
			    url: basePath + '/inbound/doDeleteReceiptDetail.action',
			    params: {
			    	id: data.id
			    },
			    success: function(response){
			        var text = Ext.decode(response.responseText);
			        var success = text.success;
			        MessageBox.show(success, text.json.msg);
			        me.childdetailgrid.getStore().load();
			    }
			});
    	}
    },*/

    //删除明细表多条记录的方法
	onMultiDelete: function(){
		var me = this;
		var records = me.childdetailgrid.getSelectionModel().getSelection();
        var receiptKeyValue=this.basicForm.getForm().findField('receiptKey').getValue();  //查询并更新状态使用
        
		if(records == ""){
			MessageBox.error("错误提示","请选择要删除的数据！");
		 	return;
		} 
		var ids = []; 
		Ext.Array.each(records, function(name, index, countriesItSelf) {
			ids.push(name.getData().id);
		});

        Ext.MessageBox.confirm('询问提示', '确定要删除吗？', 
            function(btn){
                if(btn == 'yes'){    
                    Ext.Ajax.request({
                        url: basePath + '/inbound/doMultiDeleteReceiptDetail.action',
                        params: {
                            ids: ids
                        },
                        success: function(response){
                            var text = Ext.decode(response.responseText);
                            var success = text.success;
                            MessageBox.show(success, text.json.msg);
                            if(true==success)
                            {
                                //主表对应的form不能清空，需要单独更新状态
                                me.childdetailForm.getForm().reset();   //清空后明细表状态更新问题就不存在了
                                me.childdetailgrid.getStore().load();
                                me.receiptgrid.getStore().load();

                                //收货完成时，更新主表状态，并 根据主表状态判断是否需要设置主表的字段为只读
                                Ext.Ajax.request({
                                    url: basePath + '/inbound/doQueryReceiptStatus.action',
                                    params: {
                                        receiptKey: receiptKeyValue
                                    },
                                    success: function(response){
                                        var text = Ext.decode(response.responseText);
                                        var success = text.success;
                                        if(0 != text.json.data.length)   //receiptKey唯一，应该只有一条记录
                                        {
                                            //更新主表状态
                                            var statusValue=text.json.data[0].status;
                                            me.basicForm.getForm().findField('status').setValue(statusValue)
                                            if('0'!=statusValue)
                                            {
                                                me.onSetReceiptReadOnly(true);      //根据状态设置是否可以编辑
                                                me.onSetReceiptKeyReadOnly(true); 
                                            }
                                        }
                                    }
                                });
                            }
                        }
                    });
                }
            }
        );  
        
    },
    
    
    

	createMoneyGrid: function(){
		this.moneygrid = Ext.create('widget.moneygrid',{
			region: 'center'
		});
		return this.moneygrid;
	},
	createOtherGrid: function(){
		this.othergrid = Ext.create('widget.othergrid',{
			region: 'center'
		});
		return this.othergrid;
	},
	createPreBookGrid: function(){
		this.prebookgrid = Ext.create('widget.prebookgrid',{
			region: 'center'
		});
		return this.prebookgrid;
	},

/*    printMenu: function(){
		var me = this;
        printmenu=Ext.create('Ext.menu.Menu', {
                width: 100,
                margin: '0 0 10 0',
                floating: true,  // usually you want this set to True (default)
                renderTo: Ext.getBody(),  // usually rendered by it's containing component
                items: [
                {
                    text: 'regular item 1'
                },
                {
                    text: 'regular item 2'
                },
                {
                    text: 'regular item 3'
                }
                ]
            });
		return this.printmenu;
    },*/
    
    printMenu: function(){
		var me = this;
  		MessageBox.error('错误提示','请选择操作的数据！');

/*        printmenu=Ext.create('Ext.Button', {
            text: 'Click me',
            renderTo: Ext.getBody(),
            handler: function() {
                alert('You clicked the button!');
            }
            });
		return this.printmenu;*/
    },
    
	saveReceipt: function(){
		var me = this;
        var receiptKeyValue=this.basicForm.getForm().findField('receiptKey').getValue();  //查询并更新状态使用
        
    	var basicform = this.basicForm.getForm();//基本
    	var customerform = this.customerForm.getForm();//运输
    	var clform = this.clForm.getForm();//商家
    	var childdetailform = this.childdetailForm.getForm();//从表
    	var basic = basicform.getValues();
    	var customer = customerform.getValues();
    	var cl = clform.getValues();
    	var detail = childdetailform.getValues();
    	if(!(basicform.isValid())||!(customerform.isValid())||!(childdetailform.isValid())||!(clform.isValid())) return;
    	Ext.Ajax.request({
		    url: basePath + '/inbound/doSaveReceipt.action',
		    params: {
		    	id: basic.id,
		        type: basic.type,
		        receiptKey: basic.receiptKey,
		        status: basic.status,
		        orderDate: basic.orderDate,
		        storerKey: basic.storerKey,
		        storerDescr: basic.storerDescr,
		        dateStart: basic.dateStart,
		        dateEnd: basic.dateEnd,
		        poKey: basic.poKey,
		        dateReceipted: basic.dateReceipted,
		        dateReceived: basic.dateReceived,
		        vendorRefence: basic.vendorRefence,
		        vesselRefence: basic.vesselRefence,
		        otherRefence1: basic.otherRefence1,
		        otherRefence2: basic.otherRefence2,
		        otherRefence3: basic.otherRefence3,
		        udf1: basic.udf1,
		        udf2: basic.udf2,
		        udf3: basic.udf3,
		        udf4: basic.udf4,
		        udf5: basic.udf5,
		        notes: basic.notes,
                addDate: basic.addDate,
                addWho: basic.addWho,                
                
		        //运输
		        vesselType: customer.vesselType,
		        vesselDate: customer.vesselDate,
		        placeofloading: customer.placeofloading,
		        origincountry: customer.origincountry,
		        vesselNo: customer.vesselNo,
		        placeofdischarge: customer.placeofdischarge,
		        placeofdelivery: customer.placeofdelivery,
		        destination: customer.destination,
		        driver: customer.driver,
		        incoTerms: customer.incoTerms,
		        transMethod: customer.transMethod,
		        paymentTerms: customer.paymentTerms,
		        deliveryNotes: customer.deliveryNotes,
		        //商家
		        vendor: cl.vendor,
		        vendorName: cl.vendorName,
		        vendorAddress1: cl.vendorAddress1,
		        vendorContact: cl.vendorContact,
		        vendorMobile: cl.vendorMobile,
		        vendorTel: cl.vendorTel,
		        vendorNation: cl.vendorNation,
		        vendorProvince: cl.vendorProvince,
		        vendorCity: cl.vendorCity,
		        vendorAddress2: cl.vendorAddress2,
		        vendorPosition: cl.vendorPosition,
		        vendorFax: cl.vendorFax,
		        vendorEmail: cl.vendorEmail,
                
		       /* shipto: cl.shipto,
		        shiptoName: cl.shiptoName,
		        shiptoAddress1: cl.shiptoAddress1,
		        shiptoContact: cl.shiptoContact,
		        carrierMobile: cl.carrierMobile,
		        shiptoTel: cl.shiptoTel,*/
                
		        carrier: cl.carrier,
		        carrierName: cl.carrierName,
		        carrierAddress1: cl.carrierAddress1,
		        carrierContact: cl.carrierContact,
		        shiptoMobile: cl.shiptoMobile,
		        carrierTel: cl.carrierTel,
		        carrierNation: cl.carrierNation,
		        carrierProvince: cl.carrierProvince,
		        carrierCity: cl.carrierCity,
		        carrierAddress2: cl.carrierAddress2,
		        carrierPosition: cl.carrierPosition,
		        carrierFax: cl.carrierFax,
		        carrierEmail: cl.carrierEmail,                
                
		        //从表
                detailId:detail.id,
		        lineNumber: detail.lineNumber,
		        dstatus: detail.status,   //防止重复，改名
		        dpoKey: detail.dpoKey,
		        poLineno: detail.poLineno,
		        sku: detail.sku,
		        name: detail.name,
		        altsku: detail.altsku,
		        descr: detail.descr,
		        packKey: detail.packKey,
		        uom: detail.uom,
		        hi: detail.hi,
		        ti: detail.ti,
		        fromloc: detail.fromloc,
		        cube: detail.cube,
		        wgt: detail.wgt,
		        toloc: detail.toloc,
		        tolot: detail.tolot,
		        conditionCode: detail.conditionCode,
		        qtyExpected: detail.qtyExpected,
		        qtyUomExpected: detail.qtyUomExpected,
		        qtyReceived: detail.qtyReceived,
		        qtyUomReceived: detail.qtyUomReceived,
		        holdReason: detail.holdReason,
		        lottable01: detail.lottable01,
		        lottable02: detail.lottable02,
		        lottable03: detail.lottable03,
		        lottable04: detail.lottable04,
		        lottable05: detail.lottable05,
		        lottable06: detail.lottable06,
		        lottable07: detail.lottable07,
		        lottable08: detail.lottable08,
		        lottable09: detail.lottable09,
		        lottable10: detail.lottable10,
		        lottable11: detail.lottable11,
		        lottable12: detail.lottable12,
		        lottable13: detail.lottable13,
		        lottable14: detail.lottable14,
		        lottable15: detail.lottable15,
		        udf1: detail.udf1,
		        udf2: detail.udf2,
		        udf3: detail.udf3,
		        udf4: detail.udf4,
		        udf5: detail.udf5,
		        notes: detail.notes,
                daddDate: detail.addDate,
                daddWho: detail.addWho  
		    },
		    success: function(response){
		        var text = Ext.decode(response.responseText);
		        var success = text.success;
		        MessageBox.show(success, text.json.msg);
                if(true==success)
                {
                    //主表对应的form不能清空，需要单独更新状态
                    me.childdetailForm.getForm().reset();   //清空后明细表状态更新问题就不存在了
                    me.childdetailgrid.getStore().load();
                    me.receiptgrid.getStore().load();

                    //收货完成时，更新主表状态，并 根据主表状态判断是否需要设置主表的字段为只读
                    Ext.Ajax.request({
                        url: basePath + '/inbound/doQueryReceiptStatus.action',
                        params: {
                            receiptKey: receiptKeyValue
                        },
                        success: function(response){
                            var text = Ext.decode(response.responseText);
                            var success = text.success;
                            if(0 != text.json.data.length)   //receiptKey唯一，应该只有一条记录
                            {
                                //更新主表状态
                                var statusValue=text.json.data[0].status;
                                me.basicForm.getForm().findField('status').setValue(statusValue)
                                if('0'!=statusValue)
                                {
                                    me.onSetReceiptReadOnly(true);      //根据状态设置是否可以编辑
                                    me.onSetReceiptKeyReadOnly(true); 
                                }
                            }
                        }
                    });
                }                
		    }
		});
	}
});

Ext.onReady(function(){
    new Ext.LoadMask('loading-mask', {msg:"打开中，请稍候..."});
    Ext.QuickTips.init();
    Ext.widget('viewport', {
    	id : 'viewportName',
        renderTo: Ext.getBody(),
        layout: 'fit',
        items: [Ext.widget('asntab')]
    });
});