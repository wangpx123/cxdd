/*******************************************
采购订单 Po.js


********************************************/

Ext.define('po', {
    extend: 'Ext.data.Model',
    fields: [
		{name:'id'},
		{name:'externPokey'},            
		{name:'poKey'},//PO编号     
		{name:'type'},//类型
		{name:'status'},//状态            
		{name:'orderDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},//创建日期   
		{name:'storerKey'},//货主
		{name:'storerDescr'}, //货主名称           
		{name:'dateStart',type:'date',dateFormat : 'Y-m-d H:i:s.u'},//预期到货日期     
		{name:'dateEnd',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
		{name:'pogroup'},//订单组别          
		{name:'buyerPo'},//采购商PO
		{name:'vesselDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},//装车时间
		{name:'placeofloading'},//装车地点            
		{name:'origincountry'},//原产国     
		{name:'vendorRefence'},//供应商参考号
		{name:'placeofdischarge'},//卸货地点            
		{name:'placeofdelivery'},//交货地点     
		{name:'destination'},//目的地
		{name:'vesselRefence'},//运输参考号            
		{name:'transMethod'}, //运输方式    
		{name:'paymentTerms'},//支付方式
		{name:'incoTerms'},//交货方式            
		{name:'otherRefence1'}, //其它参考号1    
		{name:'otherRefence2'}, //其它参考号2
		{name:'otherRefence3'}, //其它参考号3
		{name:'otherRefence4'}, //其它参考号4
		{name:'notes'},//备注
		{name:'vendor'},//供应商            
		{name:'vendorName'},//供应商名称     
		{name:'vendorAddress'},//供应商地址
		{name:'vendorContact'}, //联系人           
		{name:'vendorMobile'},//手机     
		{name:'vendorTel'},//电话
		{name:'shipto'},//收货方            
		{name:'shiptoName'},//收货方名称     
		{name:'shiptoAddress'},//收货方地址
		{name:'shiptoContact'},//收货方联系人            
		{name:'shiptoMobile'}, //收货方手机
		{name:'shiptoTel'}, //收货方电话    
		{name:'carrier'},//承运商
		{name:'carrierName'},//承运商名称            
		{name:'carrierAddress'},//承运商地址 
		{name:'carrierContact'}, //承运商联系人    
		{name:'carrierMobile'},//承运商手机
		{name:'carrierTel'},//承运商电话            
        {name:'addDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
        {name:'addWho'},
        {name:'editDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
        {name:'editWho'}    
	],
    idProperty: 'id'
});

Ext.define('PoDetail', {
    extend: 'Ext.data.Model',
    fields: [
		{name:'id'},
		{name:'poKey'},//PO号            
		{name:'storerKey'},     
		{name:'externPokey'},
		{name:'externLineno'},//PO行号            
		{name:'lineNumber'}, //行号    
		{name:'status'},//状态
		{name:'sku'},//商品            
		{name:'name'},//中文品名     
		{name:'descr'},//英文品名
		{name:'packKey'},//包装            
		{name:'uom'},//单位     
		{name:'qtyOrdered'},//采购数量
		{name:'qtyReceived'},//已收数量            
		{name:'price'},//单价     
		{name:'cube'},//体积
		{name:'wgt'},//毛重            
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
	],
    idProperty: 'id'
});

Ext.define('Redm.inbound.PoGrid', {
    extend: 'Redm.BaseGrid',
    alias: 'widget.pogrid',
    initComponent: function(){
    	this.buildStore(basePath+'/inbound/doQueryPo.action','po',20);
    	this.on('itemdblclick',function(grid,record){    //鼠标双击就会跳到另外一个页面
    		var father = grid.ownerCt.ownerCt.ownerCt;
    		father.setActiveTab(1);                           //tab1设置为当前激活的页面
            father.childdetail.setActiveTab(0);                  //第2页也有多个tab页，停留在第0个上
    		father.basicForm.getForm().loadRecord(record);     
    		father.customerForm.getForm().loadRecord(record);
            father.pt1pn1f3form.getForm().loadRecord(record);
            father.pt1pn1f4form.getForm().loadRecord(record);
    		father.podetailgrid.getStore().load();
    	},this);

    	this.callParent(arguments);
    },
    buildColumns: function(){
		this.columns = [
       		{ header: "PO序号", dataIndex: 'poKey', width: 120, sortable: true},
		    { header: "货主", dataIndex: 'storerKey', width: 100, sortable: true},
		    { header: "PO类型", dataIndex: 'type', width: 80, sortable: true,renderer:this.rendererTypeFunc},
		    { header: "PO状态", dataIndex: 'status', width: 80, sortable: true,renderer:this.rendererStatusFunc},
		    { header: "供应商", dataIndex: 'vendor', width: 100, sortable: true},
		    { header: "采购商PO号", dataIndex: 'buyerPo', width: 100, sortable: true},
		    { header: "收货方", dataIndex: 'shipto', width: 100, sortable: true},
		    { header: "承运人", dataIndex: 'carrier', width: 110, sortable: true},
		    { header: "创建日期", dataIndex: 'orderDate', width: 150, sortable: true,editor:{xtype:'datefield',format:'Y-m-d H:i'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i')},
		    { header: "预期到货日期", dataIndex: 'dateStart', width: 150, sortable: true,editor:{xtype:'datefield',format:'Y-m-d H:i'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i')},
			{ header: "创建时间", dataIndex: 'addDate', width: 140, sortable: true,renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s'),hidden:true},
			{ header: "创建人", dataIndex: 'addWho', width: 140, sortable: true,hidden:true}            
		];
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
                        handler: this.onCreate      //主表创建的按钮，跳转到第二个页面，并清空相关的5个form
                    },
                    '-',
                    {
                        iconCls: 'icon-delete',
                        itemId: 'delete',
                        text: '删除',
                        scope: this,
                        handler: this.onDelete      //主表删除按钮
                    },
                    '-',
                    {
                        iconCls: 'icon-search',
                        text: '查询',
                        handler: me.onSelect,       //第一个tab页的查询按钮，
                        scope: this
                    },
                    '-',
                    {
                        iconCls: 'icon-reset',
                        text: '重置',
                        handler: this.onReset,      //第一个tab页的重置按钮，清空查询条件
                        scope: this
                    },
                    '-',
                    {
                        iconCls: 'icon-upload',
                        text: '导入',
                        handler: this.onImport,    //从excel导入功能，尚未调试
                        scope: this
                    }//,
/*暂不启用快速搜索
                    '->',
                    {
                        width: 260,
                        fieldLabel: '快速搜索',
                        labelWidth: 60,
                        emptyText: '请输入货主、编号查询',
                        xtype: 'searchfield',
                        store: me.store
                     }*/
                 ]
            },
            {
                xtype: 'pagingtoolbar',
                store: me.store,
                dock: 'bottom',
                displayInfo: true
            }
        ]
	},
    
	rendererStatusFunc:function(value)
    {
            var retValue;
            if(value=='1') retValue='新建订单';
			else if(value=='2')  retValue='部分收货';
			else if(value=='3')  retValue='全收';
			else if(value=='4')  retValue='取消订单';
			else retValue='订单完成';
            return retValue;
    },
	rendererTypeFunc:function(value)
    {
            var retValue;
            if(value=='0') retValue='正常';
			else if(value=='1')  retValue='一般采购';
			else retValue='终点采购';
            return retValue;
    },

   //PO grid面板上的查询按钮
	onSelect: function(){
		this.getStore().load();
	},
    
    //PO grid面板上的重置按钮
	onReset: function(){
		var father = this.ownerCt.ownerCt;           //grid->Pt1Panel->potab，potab创建的在potab内部都可以用this访问到，因此father是两级ownerCt。
        father.pt1topform.getForm().reset();
//    	father.OnReset();                            //此方法不能用，但AltSku中有此用法，后续可以研究一下
	},
    
    //PO grid面板上的创建按钮
    onCreate: function(){
		var father = this.ownerCt.ownerCt;
		father.setActiveTab(1);
		father.basicForm.getForm().reset();                  
    	father.customerForm.getForm().reset();
    	father.pt1pn1f3form.getForm().reset();
    	father.pt1pn1f4form.getForm().reset();
		
		father.childtop.setActiveTab(0);
		
        //清空明细表的输入form，并跳转的该form
    	father.childdetailForm.getForm().reset();
        father.childdetail.setActiveTab(1);

        //计划在创建时自动加载一个数字
        //规则目前写死，后续考虑修改
        var nameCode='PONUM';
		var typeserail='0';
        
	    this.teststore = Ext.create('Ext.data.Store', {
	        remoteSort: true,
            autoLoad: true,
            fields: [
                        {name:'number'},
                        {name:'id'}
            ],
	        proxy: {
	            type: 'ajax',
	            url: basePath + '/support/doCreateNumberRules.action?string='+nameCode+','+typeserail,     
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
                        father.basicForm.getForm().findField('poKey').setValue(value);   
                        father.childdetailForm.getForm().findField('lineNumber').setValue('1');     //创建receiptkey时，设置行号为1
                        //每次创建时重新设置时间
                        var timeValue=Ext.util.Format.date(new Date(),"Y-m-d H:i:s")
                        father.basicForm.getForm().findField('orderDate').setValue(timeValue);                      
                    }
                },scope:this
            }
	    });  
	},
    
    //Po Grid上边的删除按钮，删除主表选中的记录和明细表相关记录
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
						url: basePath + '/inbound/doDeletePo.action',
						params: {
							poKey: data.poKey
						},
						success: function(response){
							var text = Ext.decode(response.responseText);
							var success = text.success;
							MessageBox.show(success, text.json.msg);
							me.getStore().load();
						}
					});
                }
            }
        );
		
	},
    
    //PO grid面板上的导入按钮
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
                handler: this.doSave
            },{
                text: '关闭',
                scope: this,
                iconCls: 'icon-cancel',
                handler: this.closeWindow
            }
        ];
		return buttons;
	}
    
});


Ext.define('Redm.inbound.PoDetailGrid',{
	extend: 'Redm.BaseGrid',
    alias : 'widget.podetailgrid',
    autoLoad: false,
	selModel: Ext.create('Ext.selection.CheckboxModel'),
    buildColumns: function(){
        this.columns = [
		    { header: "PO编号", dataIndex: 'poKey', width: 120, sortable: true},
//		    { header: "货主", dataIndex: 'storerKey', width: 150, sortable: true},
		    { header: "行号", dataIndex: 'lineNumber', width:80, sortable: true},
		    { header: "状态", dataIndex: 'status', width: 80, sortable: true,renderer:this.rendererStatusFunc},
		    { header: "商品", dataIndex: 'sku', width: 110, sortable: true},
		    { header: "中文名称", dataIndex: 'name', width: 150, sortable: true},
		    { header: "英文名称", dataIndex: 'descr', width: 150, sortable: true},
		    { header: "包装", dataIndex: 'packKey', width: 110, sortable: true},
		    { header: "单位", dataIndex: 'uom', width: 60, sortable: true},
		    { header: "采购数量", dataIndex: 'qtyOrdered', width: 110, sortable: true},
		    { header: "已收数量", dataIndex: 'qtyReceived', width: 110, sortable: true},
		    { header: "单价", dataIndex: 'price', width: 110, sortable: true},
		    { header: "体积", dataIndex: 'cube', width: 110, sortable: true},
		    { header: '毛重',dataIndex: 'wgt',width: 110,sortable: true},
		    { header: '自定义一',dataIndex: 'udf1',width: 110,sortable: true},
		    { header: '自定义二',dataIndex: 'udf2',width: 110,sortable: true},
		    { header: '自定义三',dataIndex: 'udf3',width: 110,sortable: true},
		    { header: '自定义四',dataIndex: 'udf4',width: 110,sortable: true},
		    { header: '自定义五',dataIndex: 'udf5',width: 110,sortable: true},
		    { header: '备注',dataIndex: 'notes',width: 110,sortable: true},
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
    	this.buildStore(basePath+'/inbound/doQueryPoDetail.action','PoDetail',20);
    	this.on('itemdblclick',function(grid,record){
    		var father = grid.ownerCt.ownerCt.ownerCt.ownerCt.ownerCt;
    		father.childdetailForm.getForm().loadRecord(record);
    		father.childdetail.setActiveTab(1);
    	},this);
    	this.callParent(arguments);
    },

	rendererStatusFunc:function(value)
    {
            var retValue;
            if(value=='1') retValue='新建';
            return retValue;
    }
});



// 下边是最外层、最大的的组件，tab panel 
Ext.define('Redm.inbound.PoTab',{
	extend: 'Ext.tab.Panel',
    alias : 'widget.potab',
    tabPosition: 'bottom',
    title:'采购订单',
    initComponent: function(){
    	this.items = [this.createPt1Panel(),this.createPt2Panel()]; 
    	this.callParent(arguments);
    },

    //创建第一个tab页面  ，对应po主表，包括一个 查询的form，和一个grid面板
    createPt1Panel: function(){
    	var me = this;
    	this.pt1panel = Ext.create('Ext.form.Panel',{
    		title: '查询',
    		layout: 'border',
    		border: false,
            items: [this.createPt1TopForm(),this.createPoGrid()]
    	});
    	return this.pt1panel;
    },
    
    //创建第一个tab页面上下部的grid面板，存放Po主表信息
    createPoGrid: function(){
    	var me = this;
    	this.pogrid = Ext.create('widget.pogrid',{
			region: 'center'
		});
    	this.pogrid.getStore().on('beforeload',function(store){         //初次加载前或查询时的设置
    		var params = store.getProxy().extraParams;           //store指代什么？实际验证时上边的form对应的参数
    		var values = this.pt1topform.getForm().getFieldValues();  //Form的参数，一般用getForm().getValues()，有什么差异？
         	var format = 'Y-m-d';

    		var poKey = values.poKey;
    		var status = values.status;
    		var storerKey = values.storerKey;
    		var type = values.type;    
    		var orderDate = values.orderDate;
    		var orderDateOver = values.orderDateOver;
    		var dateStart = values.dateStart;
    		var dateEnd = values.dateEnd;
            
            //与库存交易使用的步骤和配置相同，但本文件中就转换失败,没有找到原因，只能在传递参数前转换一次。
            if(orderDate) orderDate = Ext.Date.format(orderDate,format);
            if(orderDateOver) orderDateOver = Ext.Date.format(orderDateOver,format);
            if(dateStart) dateStart = Ext.Date.format(dateStart,format);
            if(dateEnd) dateEnd = Ext.Date.format(dateEnd,format);

    		
    		delete params.poKey;
    		delete params.status;
    		delete params.storerKey;
    		delete params.type;
    		delete params.orderDate;
    		delete params.orderDateOver;
    		delete params.dateStart;
    		delete params.dateEnd;
    		
    		if(poKey) params.poKey = poKey; 
    		if(status) params.status = status;
    		if(storerKey) params.storerKey = storerKey;
    		if(type) params.type = type;
    		if(orderDate) params.orderDate = orderDate;
    		if(orderDateOver) params.orderDateOver = orderDateOver;
    		if(dateStart) params.dateStart = dateStart;
    		if(dateEnd) params.dateEnd = dateEnd;
    	},this);
            
		return this.pogrid;
    },

    //第一个tab页面上上部的查询面板
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
                            fieldLabel: 'PO类型',
                            name: 'type',
							xtype:'codecombo',
                            codeType:'POTYPE'
                        },
                        {
                            fieldLabel: 'PO状态',
                            name: 'status',
							xtype:'codecombo',
                            codeType:'POSTATUS'
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
                            fieldLabel: '采购商PO号',
                            name: 'buyerPo',
                            xtype: 'textfield',
							listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }   
                        },
                        {
                            fieldLabel: '供应商',
                            name: 'vendor',
							listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }   
                        },
                        {
                            fieldLabel: '收货方 ',
                            name: 'shipto',
							listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }   
                        },
                        {
                            fieldLabel: '承运商',
                            name: 'carrier',
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
                        margin: '5 0 0 5',
                        width: 240,
                        labelWidth: 80
                    },
                    items: [
                        {
                            fieldLabel: '供应参考号',
                            name: 'vendorRefence',
							listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }   
                        },
                        {
                            fieldLabel: '运输参考号',
                            name: 'vesselRefence',
							listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }   
                        },
                        {
                            fieldLabel: '其他参考号1',
                            name: 'otherRefence1',
							listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }   
                        },
                        {
                            fieldLabel: '其他参考号2',
                            name: 'otherRefence2',
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
                        margin: '5 0 0 5',
                        width: 240,
                        labelWidth: 80
                    },
                    items: [
                        {
                            fieldLabel: '其他参考号3',
                            xtype: 'textfield',
                            name: 'otherRefence3',
							listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }   
                        },
                        {
                            fieldLabel: '其他参考号4',
                            xtype: 'textfield',
                            name: 'otherRefence4',
							listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }   
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: '创建日期',
                            format:'Y-m-d H:i:s',
                            name: 'orderDate'
                        },
                        {
                            fieldLabel: '--',
                            name: 'orderDateOver',
                            format:'Y-m-d H:i:s',
                            xtype: 'datefield'
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
                            fieldLabel: '预期到货日期',
                            xtype: 'datefield',
                            format:'Y-m-d H:i:s',
                            name: 'dateStart'
                        },
                        {
                            fieldLabel: '--',
                            xtype: 'datefield',
                            format:'Y-m-d H:i:s',
                            name: 'dateEnd'
                        },
                        {
                            xtype:'datefield',    //隐藏字段，防止存盘被清空
                            format:'Y-m-d H:i:s',
                            name: 'addDate',
                            hidden:true
                        },
                        {
                            xtype:'textfield',    //隐藏字段，防止存盘被清空
                            name: 'addWho',
                            hidden:true
                        } 
                    ]
                }
            ]
    	});
    	return this.pt1topform;
    },

	//见grid的 onReset方法
/*    onReset: function(){
    	this.pt1topform.getForm().reset();
	},
*/
    
    
/*    onDelete: function(){       //grid 删除PO数据的方法 
    	var records = this.gridPanel.getSelectionModel().getSelection(); 
    	if(records == ''){
    		MessageBox.error('错误提示','请选择要操作的数据！');
    		return; 
    	}
    	var data = records[0].getData();
    	Ext.Ajax.request({
		    url: basePath + '/inbound/doDeletePo.action',
		    params: {
		    	poKey: data.poKey
		    },
		    success: function(response){
		        var text = Ext.decode(response.responseText);
		        var success = text.success;
		        MessageBox.show(success, text.json.msg);
		        me.gridPanel.getStore().load();
		    }
		});
    }   */ 

    
     //第二个tab页的定义
    createPt2Panel: function(){   
    	var me = this;
    	this.pt2panel = Ext.create('Ext.panel.Panel',{
    		title: '基本',
    		tabPosition: 'bottom',
    		layout: 'border',
    		border: false,
    		items: [me.createTopBasic(),me.createBottomBasic()]
    	});
    	return this.pt2panel;   
    },
    
//第二个tab页的上部，包含一个ChildTop和一个TopBtn
    createTopBasic: function(){
    	var me = this;
    	this.topbasic = Ext.create('Ext.panel.Panel',{
    		region: 'center',
    		layout: 'border',
    		border: false,
    		items: [me.createTopBtn(),me.createChildTop()]
    	});
    	return this.topbasic;
    },
    
//   TopBtn 主表相关操作的按钮面板
    createTopBtn: function(){
    	var me = this;
    	this.topbtn = Ext.create('Ext.form.Panel',{
    		region: 'north',
    		frame: true,
            height:35,
    		defaults: {
    			xtype: 'button'
    		},
    		items: [
                {
                    iconCls: 'icon-create',
                    text: '创建',
                    scope: this,
                    handler: me.onCreate        //第二个tab页面创建主表和明细表记录的方法，清空各个form
                },
                {
                    iconCls: 'icon-delete',
                    text: '删除',
                    scope: this,
                    handler: me.deletePoAndDetal   // 删除form上对应的主表记录和相关从表记录
                },
                {
                    iconCls: 'icon-save',
                    text: '保存',
                    scope: this,
                    handler: me.savePo          //主表和明细表存盘方法
                }
            ]
    	});
    	return this.topbtn;
    },

    
//  ChildTop，包含两个组件  
//商家信息from上内容太多，改成四个form
    createChildTop: function(){
    	var me = this;
    	this.childtop = Ext.create('Ext.tab.Panel',{
    		region: 'center',
    		items: [me.createBasicForm(),me.createShops(),me.createPt1Pn1F3form(),me.createPt1Pn1F4form()]
    	});
    	return this.childtop;
    },
//  BasicForm
    createBasicForm: function(){
    	var me = this;
    	this.basicForm = Ext.create('Ext.form.Panel',{
			xtype:'form',
			frame:true,
			title:'基本信息',
			headerPosition: 'bottom',
	        autoHeight: true,
	        bodyPadding: '5 2 2 5',
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
                            name: 'poKey',
                            fieldLabel: 'PO编号',
							readOnly:true,
                            allowBlank: false
                        },
                        {
                            name: 'type',
                            fieldLabel: '类型',
							xtype:'codecombo',
                            codeType:'POTYPE',
                            readOnly:true,
                            value:'0'
                        },
                        {
                            name: 'status',
                            fieldLabel: '状态',
							xtype:'codecombo',
                            codeType:'POSTATUS',
                            readOnly:true,
                            value:'1'
                        },
                        {
                            name: 'orderDate',
                            fieldLabel: '创建日期',
                            xtype: 'datefield',
                            format:'Y-m-d H:i:s'
                        },
                        {name : "id",hidden: true}
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
                                                                me.childdetailForm.getForm().findField('packKey').setValue('');
                                                                me.childdetailForm.getForm().findField('uom').setValue('');
                                                                MessageBox.show(false, '该货主下没有对应的商品！');
                                                            }
                                                        }
                                                    })
                                                }
                                            }
                                            else
                                            {
												me.basicForm.getForm().findField('storerKey').setValue(''); 
                                                me.basicForm.getForm().findField('storerDescr').setValue(''); 
                                                //是否要清空商品相关待定，先拷贝过来
                                                me.childdetailForm.getForm().findField('name').setValue('');
                                                me.childdetailForm.getForm().findField('descr').setValue('');
                                                me.childdetailForm.getForm().findField('sku').setValue('');
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
							listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            } 
						},
                        {   
                            name: 'dateStart',
                            fieldLabel: '预期到货日期',
                            format:'Y-m-d H:i:s',
                            xtype: 'datefield'
                        },
                        {
                            name: 'dateEnd',
                            xtype: 'datefield',
                            format:'Y-m-d H:i:s',
                            width: 155,
                            margin: '0 0 0 95'
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
							name: 'buyerPo',
							fieldLabel: '采购商PO号',
							listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            } 
						},
                        {
							name: 'vesselDate',
							fieldLabel: '装车时间',
							format:'Y-m-d H:i:s',
							xtype: 'datefield'
						},
                        {
							name: 'placeofloading',
							fieldLabel: '装车地点',
							listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            } 
						},
                        {
							name: 'origincountry',
							fieldLabel: '原产国',
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
                    defaults:{
                        labelWidth: 80,
                        margin: '0 0 0 10',
                        xtype: 'textfield',
                        width: 240
                    },
                    items: [
                        {
							name: 'vendorRefence',
							fieldLabel: '供应商参考号',
							listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            } 
						},
                        {
							name: 'placeofdischarge',
							fieldLabel: '卸载地点',
							listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            } 
						},
                        {
							name: 'placeofdelivery',
							fieldLabel: '交货地点',
							listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            } 
						},
                        {
							name: 'destination',
							fieldLabel: '目的地',
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
                    defaults:{
                        labelWidth: 80,
                        width : 240,
                        margin: '0 0 0 10',
                        xtype: 'combobox'
                    },
                    items: [
                        {
							name: 'vesselRefence',
							fieldLabel: '运输参考号',
							xtype: 'textfield',
							listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            } 
						},
                        {
							name: 'transMethod',
							fieldLabel: '运输方式',
							listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            } 
						},
                        {
							name: 'paymentTerms',
							fieldLabel: '支付方式',
							listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            } 
						},
                        {
							name: 'incoTerms',
							fieldLabel: '交货方式',
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
                    defaults:{
                        labelWidth: 80,
                        width : 240,
                        margin: '0 0 0 10',
                        xtype: 'textfield'
                    },
                    items: [
                        {
							name: 'otherRefence1',
							fieldLabel: '其他参考号1',
							listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            } 
						},
                        {
							name: 'otherRefence2',
							fieldLabel: '其他参考号2',
							listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            } 
						},
                        {
							name: 'otherRefence3',
							fieldLabel: '其他参考号3',
							listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            } 
						},
                        {
							name: 'otherRefence4',
							fieldLabel: '其他参考号4',
							listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }
						}
                    ]
                }//,
/*                {           //面板布局问题，暂时注释掉备注栏，以后再添加
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 80,
                        width : 200,
                        margin: '0 0 0 10',
                        xtype: 'textfield'
                    },
                    items: [
                        {name: 'notes',fieldLabel: '备注',width: 990}
                    ]
                }*/
            ]
    	});
    	return this.basicForm;
    },

    createShops: function(){
		var me=this;
    	this.customerForm = Ext.create('Ext.form.Panel',{
			xtype:'form',
			frame:true,
			headerPosition: 'bottom',
			title:'承运商信息',
	        autoHeight: true,
	        bodyPadding: 1,
        	stripeRows : true,
			autoScroll : true,
			viewConfig : {
				forceFit: true,
				autoFill: true
			},
	        layout: 'vbox',
	        defaults: {
	        	xtype: 'fieldcontainer',
                hideLabel: true,
	            anchor: '100%',
	            labelWidth: 100
	        },
	        items: [{
	        	xtype: 'fieldcontainer',
	        	frame: false,
	        	defaults: {
	        		xtype: 'fieldcontainer'
	        	},
	        	items: [{
	                layout: 'hbox',
	                defaults:{
		                labelWidth: 80,
		                width: 360,
		                margin: '5 0 0 10',
		                xtype: 'textfield'
	                },
	                items: [
	                	{
							fieldLabel: '承运商',
							name: 'carrier',
							listeners:{
                                blur: function(txt){
                                    //输入参数，鼠标离开后见检查该货主是否存在
                                    storerKeyValue=Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(storerKeyValue);
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
                                                me.customerForm.getForm().findField('carrierName').setValue(text.json.data[0].company); 
                                                me.customerForm.getForm().findField('carrierAddress').setValue(text.json.data[0].address1);
                                                me.customerForm.getForm().findField('carrierContact').setValue(text.json.data[0].contact);
                                                me.customerForm.getForm().findField('carrierMobile').setValue(text.json.data[0].mobile); 
												me.customerForm.getForm().findField('carrierTel').setValue(text.json.data[0].tel);
                                            }
                                            else
                                            {
												me.customerForm.getForm().findField('carrier').setValue(''); 
                                                me.customerForm.getForm().findField('carrierName').setValue(''); 
                                                me.customerForm.getForm().findField('carrierAddress').setValue('');
                                                me.customerForm.getForm().findField('carrierContact').setValue('');
                                                me.customerForm.getForm().findField('carrierMobile').setValue(''); 
												me.customerForm.getForm().findField('carrierTel').setValue(''); 												
                                                MessageBox.show(false,  '该承运商不存在！');
                                            }
                                        }
                                    })
                                }
                            } 
						},
	                	{
							fieldLabel: '承运商名称',
							margin: '5 0 0 20',
							name: 'carrierName',
							listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            } 
						}
	                ]
	            },{
	                layout: 'hbox',
	                defaults:{
		                labelWidth: 80,
		                width: 240,
		                margin: '5 0 0 10',
		                xtype: 'textfield'
	                },
	                items: [
	                	{
							fieldLabel: '国家',
							name:'origincountry',
							listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            } 
						},
	                	{
							fieldLabel: '省份',
							listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            } 
						},
	                	{
							fieldLabel: '地区/城市',
							listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            } 
						}
	            	]    
	            },{
	                layout: 'hbox',
	                defaults:{
		                labelWidth: 80,
		                width: 240,
		                margin: '5 0 0 10',
		                xtype: 'textfield'
	                },
	                items: [
	                	{
							fieldLabel: '地址',
							width: 600,
							name: 'carrierAddress',
							listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            } 
						},
	                	{
							fieldLabel: '',
							width: 130,
							listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            } 
						}
	                ]
	            },{
	                layout: 'hbox',
	                defaults:{
		                labelWidth: 80,
		                width: 240,
		                margin: '5 0 0 10',
		                xtype: 'textfield'
	                },
	                items: [
	                	{
							fieldLabel: '联系人',
							name: 'carrierContact',
							listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            } 
						},
	                	{
							fieldLabel: '手机',
							name: 'carrierMobile',
							listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            } 
						},
	                	{
							fieldLabel: '电话',
							name: 'carrierTel',
							listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            } 
						}
	                ]
	            },{
	                layout: 'hbox',
	                defaults:{
		                labelWidth: 80,
		                width: 240,
		                margin: '5 0 0 10',
		                xtype: 'textfield'
	                },
	                items: [
	                	{
							fieldLabel: '职务',
							listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            } 
						},
	                	{
							fieldLabel: '传真'
						},
	                	{
							fieldLabel: '邮箱'
						}
	                ]
	            }
                ]
	        }
            ]
	    }
        );
    	return this.customerForm;
    },

    createPt1Pn1F3form:function(){
		var me=this;
        this.pt1pn1f3form = Ext.create('Ext.form.Panel',
        {
            xtype:'form',
            frame:true,
            headerPosition: 'bottom',
            title:'收货方信息',
            autoHeight: true,
            bodyPadding: 1,
            stripeRows : true,
            autoScroll : true,
            viewConfig : {
                forceFit: true,
                autoFill: true
            },
            layout: 'vbox',
            defaults: {
                xtype: 'fieldcontainer',
                hideLabel: true,
                anchor: '100%',
                labelWidth: 100
            },
            items: [
                {    //收货方信息
                    xtype: 'fieldcontainer',
                    frame: false,
                    border: false,
                    defaults: {
                        xtype: 'fieldcontainer'
                    },
                    items: 
                    [
                        {
                            layout: 'hbox',
                            defaults:{
                                labelWidth: 80,
                                width: 360,
                                margin: '5 0 0 10',
                                xtype: 'textfield'
                            },
                            items: [
                                {
									fieldLabel: '收货方',
									name: 'shipto',
									listeners:{
										blur: function(txt){
											//输入参数，鼠标离开后见检查该货主是否存在
											storerKeyValue=Ext.util.Format.uppercase(txt.getValue());
											txt.setValue(storerKeyValue);
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
														me.pt1pn1f3form.getForm().findField('shiptoName').setValue(text.json.data[0].company); 
														me.pt1pn1f3form.getForm().findField('shiptoAddress').setValue(text.json.data[0].address1);
														me.pt1pn1f3form.getForm().findField('shiptoContact').setValue(text.json.data[0].contact);
														me.pt1pn1f3form.getForm().findField('shiptoMobile').setValue(text.json.data[0].mobile); 
														me.pt1pn1f3form.getForm().findField('shiptoTel').setValue(text.json.data[0].tel);
													}
													else
													{
														me.pt1pn1f3form.getForm().findField('shipto').setValue(''); 
														me.pt1pn1f3form.getForm().findField('shiptoName').setValue(''); 
														me.pt1pn1f3form.getForm().findField('shiptoAddress').setValue('');
														me.pt1pn1f3form.getForm().findField('shiptoContact').setValue('');
														me.pt1pn1f3form.getForm().findField('shiptoMobile').setValue(''); 
														me.pt1pn1f3form.getForm().findField('shiptoTel').setValue(''); 												
														MessageBox.show(false,  '该收货人不存在！');
													   
													}
												}
											})
										}
									}  
								},
                                {
									fieldLabel: '收货方名称',
									margin: '5 0 0 20',
									name: 'shiptoName',
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
                            defaults:{
                                labelWidth: 80,
                                width: 240,
                                margin: '5 0 0 10',
                                xtype: 'textfield'
                            },
                            items: [
                                {
                                    fieldLabel: '国家',
                                    listeners:{
                                        blur:function(txt){
                                            txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                        }
                                    } 
                                },
                                {
                                    fieldLabel: '省份',
                                    listeners:{
                                        blur:function(txt){
                                            txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                        }
                                    } 
                                },
                                {
                                    fieldLabel: '地区/城市',
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
                            defaults:{
                                labelWidth: 80,
                                width: 240,
                                margin: '5 0 0 10',
                                xtype: 'textfield'
                            },
                            items: [
                                {
                                    fieldLabel: '地址',
                                    width: 600,
                                    name: 'shiptoAddress',
                                    listeners:{
                                        blur:function(txt){
                                            txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                        }
                                    } 
                                },
                                {
                                    fieldLabel: '',
                                    width: 130,
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
                            defaults:{
                                labelWidth: 80,
                                width: 240,
                                margin: '5 0 0 10',
                                xtype: 'textfield'
                            },
                            items: [
                                {
                                    fieldLabel: '联系人',
                                    name: 'shiptoContact',
                                    listeners:{
                                        blur:function(txt){
                                            txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                        }
                                    } 
                                },
                                {
                                    fieldLabel: '手机',
                                    name: 'shiptoMobile',
                                    listeners:{
                                        blur:function(txt){
                                            txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                        }
                                    } 
                                },
                                {
                                    fieldLabel: '电话',
                                    name: 'shiptoTel',
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
                            defaults:{
                                labelWidth: 80,
                                width: 240,
                                margin: '5 0 0 10',
                                xtype: 'textfield'
                            },
                            items: [
                                {
                                    fieldLabel: '职务',
                                    listeners:{
                                        blur:function(txt){
                                            txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                        }
                                    } 
                                },
                                {
                                    fieldLabel: '传真'
                                },
                                {
                                    fieldLabel: '邮箱'
                                }
                            ]
                        }
                    ]
                }
            ]
        });
    	return this.pt1pn1f3form;
    },    
    
    
    createPt1Pn1F4form:function(){
		var me=this;
		this.pt1pn1f4form = Ext.create('Ext.form.Panel',
        {
            xtype:'form',
            frame:true,
            headerPosition: 'bottom',
            title:'供货商信息',
            autoHeight: true,
            bodyPadding: 1,
            stripeRows : true,
            autoScroll : true,
            viewConfig : {
                forceFit: true,
                autoFill: true
            },
            layout: 'vbox',
            defaults: {
                xtype: 'fieldcontainer',
                hideLabel: true,
                anchor: '100%',
                labelWidth: 100
            },
            items: [
                {    //收货方信息
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
								margin: '5 0 0 10',
								xtype: 'textfield'
							},
							items: [
								{
									fieldLabel: '供应商',
									name: 'vendor',
									listeners:{
										blur: function(txt){
											//输入参数，鼠标离开后见检查该货主是否存在
											storerKeyValue=Ext.util.Format.uppercase(txt.getValue());
											txt.setValue(storerKeyValue);
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
														me.pt1pn1f4form.getForm().findField('vendorName').setValue(text.json.data[0].company); 
														me.pt1pn1f4form.getForm().findField('vendorAddress').setValue(text.json.data[0].address1);
														me.pt1pn1f4form.getForm().findField('vendorContact').setValue(text.json.data[0].contact);
														me.pt1pn1f4form.getForm().findField('vendorMobile').setValue(text.json.data[0].mobile); 
														me.pt1pn1f4form.getForm().findField('vendorTel').setValue(text.json.data[0].tel);
													}
													else
													{
														me.pt1pn1f4form.getForm().findField('vendor').setValue(''); 
														me.pt1pn1f4form.getForm().findField('vendorName').setValue(''); 
														me.pt1pn1f4form.getForm().findField('vendorAddress').setValue('');
														me.pt1pn1f4form.getForm().findField('vendorContact').setValue('');
														me.pt1pn1f4form.getForm().findField('vendorMobile').setValue(''); 
														me.pt1pn1f4form.getForm().findField('vendorTel').setValue(''); 												
														MessageBox.show(false,  '该供应商不存在！');
													   
													}
												}
											})
										}
									} 
								},
								{
									fieldLabel: '供应商名称',
									margin: '5 0 0 20',
									name: 'vendorName',
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
							defaults:{
								labelWidth: 80,
								width: 240,
								margin: '5 0 0 10',
								xtype: 'textfield'
							},
							items: [
								{
									fieldLabel: '国家',
									listeners:{
										blur:function(txt){
											txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
										}
									} 
								},
								{
									fieldLabel: '省份',
									listeners:{
										blur:function(txt){
											txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
										}
									} 
								},
								{
									fieldLabel: '地区/城市',
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
							defaults:{
								labelWidth: 80,
								width: 240,
								margin: '5 0 0 10',
								xtype: 'textfield'
							},
							items: [
								{
									fieldLabel: '地址',
									width: 600,
									name: 'vendorAddress',
									listeners:{
										blur:function(txt){
											txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
										}
									} 
								},
								{
									fieldLabel: '',
									width: 130,
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
							defaults:{
								labelWidth: 80,
								width: 240,
								margin: '5 0 0 10',
								xtype: 'textfield'
							},
							items: [
								{
									fieldLabel: '联系人',
									name: 'vendorContact',
									listeners:{
										blur:function(txt){
											txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
										}
									} 
								},
								{
									fieldLabel: '手机',
									name: 'vendorMobile',
									listeners:{
										blur:function(txt){
											txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
										}
									} 
								},
								{
									fieldLabel: '电话',
									name: 'vendorTel',
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
							defaults:{
								labelWidth: 80,
								width: 240,
								margin: '5 0 0 10',
								xtype: 'textfield'
							},
							items: [
								{
									fieldLabel: '职务',
									listeners:{
										blur:function(txt){
											txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
										}
									} 
								},
								{
									fieldLabel: '传真'
								},
								{
									fieldLabel: '邮箱'
								}
							]
						}
                    ]
                }
            ]
        });
    	return this.pt1pn1f4form;
    },    
    
    

 // 以上是第二个tab页的上部，所有组件描述完毕
 
 // 下边是第二个tab页的下部    
 
    createBottomBasic: function(){       //第二个tab页下部的整体定义
    	var me = this;
    	this.btmbasic = Ext.create('Ext.panel.Panel',{
    		region: 'south',
    		height: 275,
    		layout: 'border',
    		border: false,
    		items: [me.createBtmBtn(),me.createChildDetail()]
    	});
    	return this.btmbasic;
    },
    
// 下半部的button面板

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
                    handler: me.onAddDetail    //明细表添加记录
                },
                {
                    iconCls: 'icon-delete',
                    text: '删除',
                    scope: this,
                    //handler: me.deletePoDetail    //删除一条明细表记录
					 handler: me.onMultiDelete    //删掉多条选中的记录
                }
            ]
    	});
    	return this.btmbtn;
    },
    

// 下部的 childdetail 面板，由两个panel组成，
    createChildDetail: function(){
    	var me = this;
    	this.childdetail = Ext.create('Ext.tab.Panel',{
    		region: 'center',
    		layout: 'fit',
    		height: 460,
    		items: [me.createChildDetailGrid(),me.createChildDetailForm()]
    	});
    	return this.childdetail;
    },

//  下部的一个form
    createChildDetailForm: function(){
    	var me = this;
		 var myStore=Ext.create('Ext.data.Store', {
								autoLoad: false,
								  //这里必须先load，否则下拉时再load一次，之前加的参数查询结果就被覆盖了。
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
        });
    	this.childdetailForm = Ext.create('Ext.form.Panel',{
    		title: '明细',
    		frame: true,
    		defaults: {
    			xtype: 'fieldcontainer'
    		},
    		items: [
                {
					layout: 'hbox',
					defaults: {
						xtype: 'textfield',
						margin: '5 0 0 5',
						width: 240,
						labelWidth: 60
					},
					items: [
                        {
                            fieldLabel: '行号',
                            allowBlank: false,
                            name: 'lineNumber'
                        },
                        {
                            fieldLabel: '状态',
                            name: 'status',
							readOnly:true,
                            value:'1',
                            xtype:'codecombo',
                            codeType:'PODSTATUS'
                        },
                        {
                            fieldLabel: '商品',
                            name: 'sku',
							allowBlank: false,
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
                                                        me.childdetailForm.getForm().findField('uom').setValue('EA');
                                                    }
                                                    else
                                                    {
                                                        me.childdetailForm.getForm().findField('name').setValue('');
                                                        me.childdetailForm.getForm().findField('descr').setValue('');
                                                        me.childdetailForm.getForm().findField('packKey').setValue('');
                                                        me.childdetailForm.getForm().findField('sku').setValue('');
                                                        me.childdetailForm.getForm().findField('uom').setValue('');
                                                        MessageBox.show(false, '货主或者商品不存在');
                                                    }
                                                }
                                            })
                                        }
                                    }
                                }//end listener 
                        },
                        {
                            fieldLabel: '包装',
                            name: 'packKey',
							listeners: {   //选中包装后,
                                    blur: function(txt){
                                        packKeyValue=Ext.util.Format.uppercase(txt.getValue());;
                                        txt.setValue(packKeyValue);
                                        uomValue = me.childdetailForm.getForm().findField('uom').getValue();
                                        qtyUomOrderedValue= me.childdetailForm.getForm().findField('qtyUomOrdered').getValue();
                                        qtyUomReceivedValue= me.childdetailForm.getForm().findField('qtyUomReceived').getValue();
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
                                                                        me.childdetailForm.getForm().findField('qtyOrdered').setValue(qtyUomOrderedValue*uomQty);
                                                                        me.childdetailForm.getForm().findField('qtyReceived').setValue(qtyUomReceivedValue*uomQty);
                                                                        
                                                                     }
                                                                }
                                                            })
                                                        }                                              
                                                    }
                                                    else
                                                    {
                                                        me.childdetailForm.getForm().findField('packKey').setValue('');
                                                        me.childdetailForm.getForm().findField('qtyOrdered').setValue('');  //预期数量清空
                                                        me.childdetailForm.getForm().findField('qtyReceived').setValue('');  //实收数量清空
                                                        
                                                        MessageBox.show(false, '包装不存在');
                                                    }
                                                }
                                            })
                                        }
                                    }
                                },
                            allowBlank: false
                        },
                        {
                            name: 'id',
                            hidden: true
                        }
                    ]
				},
                {
					layout: 'hbox',
					defaults: {
						xtype: 'textfield',
						margin: '5 0 0 5',
						width: 180,
						labelWidth: 60
					},
					items: [
                        {
                            fieldLabel: '中文名称',
                            name: 'name',
                            width: 485,
							listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            } 
                        },
                        {
                            fieldLabel: '英文名称',
                            name: 'descr',
                            width: 485,
							listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            } 
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
                            width: 200
                        },
					items: [
                        {
                            fieldLabel: '单位',
                            name: 'uom',
							xtype:'combobox',
							store:myStore,
							mode: 'remote',
							triggerAction : 'all',
							minListWidth:220,
							displayField: 'description',
							valueField: 'uomCode',
							lastQuery: '',
							allowBlank: false,
							listeners: {
								expand : function(){
									packKeyValue=me.childdetailForm.getForm().findField('packKey').getValue();
									myStore.load({params:{packKey:packKeyValue}});
								},
								blur: function(txt){
                                        var uomValue=txt.getValue();  //需要根据description反查数量，然后再计算 qxue
                                        var packKeyValue=me.childdetailForm.getForm().findField('packKey').getValue();

                                        var qtyUomOrderedValue=me.childdetailForm.getForm().findField('qtyUomOrdered').getValue();
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
                                                        me.childdetailForm.getForm().findField('qtyOrdered').setValue(qtyUomOrderedValue*uomQty);
                                                        me.childdetailForm.getForm().findField('qtyReceived').setValue(qtyUomReceivedValue*uomQty);
                                                        
                                                     }
                                                }
                                            })
                                        }
								}
							} 							
                        },
                        {
                            fieldLabel: '金额',
                            name: '',
							listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            } 
                        },
						{
                            xtype:'label',
                            text: '采购数量:',
							margin: '7 0 0 5',
                            width: 70
                        },
						{
                            fieldLabel: '',
                            xtype: 'numberfield',
                            minValue:0,
                            decimalPrecision:3,
                            width:100,
                            name:'qtyUomOrdered',
                            allowBlank: false,                                
                            listeners: {
									blur: function(txt){
                                        var qtyValue=txt.getValue();
                                        
                                        var uomValue=me.childdetailForm.getForm().findField('uom').getValue();
                                        var packKeyValue=me.childdetailForm.getForm().findField('packKey').getValue();

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
                                                        me.childdetailForm.getForm().findField('qtyOrdered').setValue(qtyValue*uomQty);
                                                        
                                                     }
                                                }
                                            })
                                        }
                                        else
                                        {
                                            me.childdetailForm.getForm().findField('qtyUomExpected').setValue('');
                                            MessageBox.show(false, '请先输入包装和单位');//单位是下拉框，可能有多个空格，不好确定是否为空
                                        }
									}
                                }							
                        },
                        {
                            fieldLabel: '',
                            xtype: 'numberfield',
                            minValue:0,
                            decimalPrecision:3,
                            width:100,
							readOnly:true,
                            name:'qtyOrdered'
                        },
						{
                            xtype:'label',
                            text:  '已收数量',
                            margin: '7 0 0 5',
                            width: 70
                        },
                        {
                            fieldLabel: '',
                            xtype: 'numberfield',
                            minValue:0,
                            decimalPrecision:3,
                            width:100,
                            name:'qtyUomReceived',
                            listeners: {
									blur: function(txt){
                                        var qtyValue=txt.getValue();
                                       
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
                            width:100,
							readOnly:true,                              
                            name:'qtyReceived' //计算出来的实收数量
                        }
                    ]
				},
                {
					layout: 'hbox',
					defaults: {
						xtype: 'textfield',
						margin: '5 0 0 5',
						width: 240,
						labelWidth: 60
					},
					items: [
                        {
                            fieldLabel: '单价',
                            name: 'price',
							listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            } 
                        },
                        {
                            fieldLabel: '体积',
                            name: 'cube',
							listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            } 
                        },
                        {
                            fieldLabel: '毛重',
                            name: 'wgt',
							listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            } 
                        },
                        {
                            fieldLabel: '自定义1',
                            name: 'udf1',
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
						margin: '5 0 0 5',
						width: 240,
						labelWidth: 60
					},
					items: [
                        {
                            fieldLabel: '自定义2',
                            name: 'udf2',
							listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            } 
                        },
                        {
                            fieldLabel: '自定义3',
                            name: 'udf3',
							listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            } 
                        },
                        {
                            fieldLabel: '自定义4',
                            name: 'udf4',
							listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            } 
                        },
                        {
                            fieldLabel: '自定义5',
                            name: 'udf5',
							listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            } 
                        }
                        
                    ]
				}//,
/*                {   //备注先隐藏起来
					layout: 'hbox',
					defaults: {
						xtype: 'textfield',
						margin: '5 0 0 5',
						width: 240,
						labelWidth: 60
					},
					items: [
                        {
                            fieldLabel: '备注',
                            name: 'notes',
                            width: 730
                        }
                    ]
				}*/
            ]
    	});
    	return this.childdetailForm;
    },
    
    
//下部的grid
    
    createChildDetailGrid: function(){
    	var me = this;
    	this.podetailgrid = Ext.create('widget.podetailgrid',{
    		title: '列表'
    	});
    	this.podetailgrid.getStore().on('beforeload',function(store){
			var values = me.basicForm.getForm().getValues();
			var params = store.getProxy().extraParams;
			var poKey = values.poKey;
			delete params.poKey;
			if(poKey) params.poKey=poKey;
    	},this);
    	return this.podetailgrid;
    },

    //以下是第二个tab页面五个按钮的方法
    //第二个tab页面创建主表和明细表记录的方法，清空各个form
    onCreate: function(){
    	this.basicForm.getForm().reset();
    	this.customerForm.getForm().reset();
    	this.pt1pn1f3form.getForm().reset();
    	this.pt1pn1f4form.getForm().reset();
		
		this.childtop.setActiveTab(0);
		
        //清空明细表的输入form，并跳转的该form
    	this.childdetailForm.getForm().reset();
        this.childdetail.setActiveTab(1);

        //计划在创建时自动加载一个数字
        //规则目前写死，后续考虑修改
        var nameCode='PONUM';
		var typeserail='0';
        
	    this.teststore = Ext.create('Ext.data.Store', {
	        remoteSort: true,
            autoLoad: true,
            fields: [
                        {name:'number'},
                        {name:'id'}
            ],
	        proxy: {
	            type: 'ajax',
	            url: basePath + '/support/doCreateNumberRules.action?string='+nameCode+','+typeserail,     
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
                        this.basicForm.getForm().findField('poKey').setValue(value);   
                        this.childdetailForm.getForm().findField('lineNumber').setValue('1');     //创建receiptkey时，设置行号为1
                        //每次创建时重新设置时间
                        var timeValue=Ext.util.Format.date(new Date(),"Y-m-d H:i:s")
                        this.basicForm.getForm().findField('orderDate').setValue(timeValue);                      
                    }
                },scope:this
            }
	    });  
    },

// 删除Po主表记录和相关明细表的方法，从form上获取主表相关记录
	deletePoAndDetal: function(){
		var me = this;
    	var record = me.basicForm.getForm().getFieldValues();        //为何是getFieldValues？
    	if(record == ""){
    		MessageBox.error('错误提示','请选择删除的数据！');
    		return;
    	}else{
			Ext.MessageBox.confirm('询问提示', '确定要删除吗？', 
				function(btn){
					if(btn == 'yes'){    
						Ext.Ajax.request({
							url: basePath + '/inbound/doDeletePo.action',
							params: {
								poKey: record.poKey
							},
							success: function(response){
								var text = Ext.decode(response.responseText);
								var success = text.success;
								MessageBox.show(success, text.json.msg);
								me.podetailgrid.getStore().load();    //删除后对应主表的1个grid，4个form，对应明细表的1个grid，1个form全部清空
								me.pogrid.getStore().load();
								me.basicForm.getForm().reset();
								me.customerForm.getForm().reset();
								me.pt1pn1f3form.getForm().reset();
								me.pt1pn1f4form.getForm().reset();
								me.childdetailForm.getForm().reset();
								
							}
						});
					}
				}
			); 
    	}
    },

    //第二个tab页面，下部grid上的按钮，添加PoDetail记录的方法  
    onAddDetail: function(){
		var me=this;
    	this.childdetailForm.getForm().reset();
    	this.childdetail.setActiveTab(1);
                
        this.lineNoStore = Ext.create('Ext.data.Store', {
	        remoteSort: true,
            autoLoad: true,
            fields: [
                        {name:'id'},
                        {name:'poKey'},
                        {name:'lineNumber'}
            ],
	        proxy: {
	            type: 'ajax',
                //添加明细时，根据receiptKey查找。如果找不到，设置为1
	            url: basePath + '/inbound/doCreatePoDetailLineNumber.action?poKey='+this.basicForm.getForm().findField('poKey').getValue(),
	            reader: {type: 'json',root: 'json.data',totalProperty: 'json.totalCount'},
	            actionMethods: { read: 'POST' },
	            simpleSortMode: true
	        },
            //加载数据到store，通过监听事件来设置
            listeners: {
                'load':function(sto,recs){
				
                  if(0!=sto.totalCount)
                    {
                        var value=sto.getAt(0).get('lineNumber');
						if(""==value || null==value){
							 this.childdetailForm.getForm().findField('lineNumber').setValue('1'); 
						}else{
							this.childdetailForm.getForm().findField('lineNumber').setValue(value); 
						}
                    }
                    else
                    {
                        this.childdetailForm.getForm().findField('lineNumber').setValue('1'); 
                    }
                },scope:this
            }
	    });
    },

    //第二个tab页面，下部grid上的按钮，删除PoDetail的方法    
	/* deletePoDetail: function(){
		var me = this;
    	var records = me.podetailgrid.getSelectionModel().getSelection(); 
    	if(records == ""){
    		MessageBox.error('错误提示','请选择删除的数据！');
    		return;
    	}else{
    		var record = records[0].getData();
        	Ext.Ajax.request({
			    url: basePath + '/inbound/doDeletePoDetail.action',
			    params: {
			    	id: record.id
			    },
			    success: function(response){
			        var text = Ext.decode(response.responseText);
			        var success = text.success;
			        MessageBox.show(success, text.json.msg);
			        me.podetailgrid.getStore().load();
			    }
			});
    	}
    }, */
    
	//删除明细表多条记录的方法
	onMultiDelete: function(){
		var me = this;
		var records = me.podetailgrid.getSelectionModel().getSelection();
        var poKeyValue=this.basicForm.getForm().findField('poKey').getValue();  //查询并更新状态使用
        
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
                        url: basePath + '/inbound/doMultiDeletePoDetail.action',
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
                                me.podetailgrid.getStore().load();
                                me.pogrid.getStore().load();
                            }
                        }
                    });
                }
            }
        );  
        
    },
	
	
//存盘的方法    
	savePo: function(){
		var me = this;
    	var basicform = this.basicForm.getForm();//基本
    	
        var customerform = this.customerForm.getForm();//商家
    	var childdetailform = this.childdetailForm.getForm();//从表
        
    	var basic = basicform.getValues();
    	var customer = customerform.getValues();
    	var pt1pn1f3values = this.pt1pn1f3form.getForm().getValues();
    	var pt1pn1f4values = this.pt1pn1f4form.getForm().getValues();
        
    	var detail = childdetailform.getValues();
        if(!(basicform.isValid())||!(customerform.isValid())||!(childdetailform.isValid())) return;
    	Ext.Ajax.request({
		    url: basePath + '/inbound/doSavePo.action',
		    params: {
		    	id: basic.id,
		        poKey: basic.poKey,
		        type: basic.type,
		        status: basic.status,
		        orderDate: basic.orderDate,
		        storerKey: basic.storerKey,
		        storerDescr: basic.storerDescr,
		        dateStart: basic.dateStart,
		        dateEnd: basic.dateEnd,
		        buyerPo: basic.buyerPo,
		        vesselDate: basic.vesselDate,
		        placeofloading: basic.placeofloading,
		        origincountry: basic.origincountry,
		        vendorRefence: basic.vendorRefence,
		        placeofdischarge: basic.placeofdischarge,
		        placeofdelivery: basic.placeofdelivery,
		        destination: basic.destination,
		        vesselRefence: basic.vesselRefence, 
		        transMethod: basic.transMethod,
		        paymentTerms: basic.paymentTerms,
		        incoTerms: basic.incoTerms,
		        otherRefence1: basic.otherRefence1, 
		        otherRefence2: basic.otherRefence2,
		        otherRefence3: basic.otherRefence3,
		        otherRefence4: basic.otherRefence4,
		        notes: basic.notes, 
				addDate: basic.addDate,
                addWho: basic.addWho,   
		        //商家信息
		        carrier: customer.carrier,
		        carrierName: customer.carrierName,
		        carrierAddress: customer.carrierAddress,
		        carrierContact: customer.carrierContact,
		        carrierMobile: customer.carrierMobile,
		        carrierTel: customer.carrierTel,
                
                //pt1pn1f3form 收货方信息
		        shipto: pt1pn1f3values.shipto,
		        shiptoName: pt1pn1f3values.shiptoName,
		        shiptoAddress: pt1pn1f3values.shiptoAddress,
		        shiptoContact: pt1pn1f3values.shiptoContact,
		        shiptoMobile: pt1pn1f3values.shiptoMobile,
		        shiptoTel: pt1pn1f3values.shiptoTel,
                
                
                //pt1pn1f4form 供货商信息
		        vendor: pt1pn1f4values.vendor,
		        vendorName: pt1pn1f4values.vendorName,
		        vendorAddress: pt1pn1f4values.vendorAddress,
		        vendorContact: pt1pn1f4values.vendorContact,
		        vendorMobile: pt1pn1f4values.vendorMobile,
		        vendorTel: pt1pn1f4values.vendorTel,
                
		        //从表信息
		        detailId: detail.id,
		        lineNumber: detail.lineNumber,
		        dstatus: detail.status,
		        sku: detail.sku,
		        name: detail.name,
		        descr: detail.descr,
		        packKey: detail.packKey,
		        uom: detail.uom,
		        qtyOrdered: detail.qtyOrdered,
		        qtyReceived: detail.qtyReceived,
		        price: detail.price,
		        cube: detail.cube,
		        wgt: detail.wgt,
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
		        me.podetailgrid.getStore().load();
		        me.pogrid.getStore().load();
				me.childdetailForm.getForm().reset();
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
        items: [Ext.widget('potab')]
    });
});