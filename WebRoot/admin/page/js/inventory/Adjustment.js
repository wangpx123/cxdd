/******************************************************
库存调整 Adjustment.js


******************************************************/

Ext.define('Adjustment', {
    extend: 'Ext.data.Model',
    fields: [
        {name:'id'},
        {name:'adjustmentKey'},
        {name:'storerKey'},
        {name:'status'},
        {name:'orderDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
        {name:'effectiveDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
        {name:'addDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
        {name:'addWho'},
        {name:'editDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
        {name:'editWho'}
    ],
    idProperty: 'id'
});


Ext.define('AdjustmentDetail', {
    extend: 'Ext.data.Model',
    fields: [
            {name:'id'},
            {name:'adjustmentKey'},
            {name:'lineNumber'},
            {name:'sku'},
            {name:'lot'},
            {name:'loc'},
            {name:'reasonCode'},
            {name:'packKey'},
            {name:'uom'},
            {name:'qty',type:'float',numberFormat:'0.000'},
            {name:'targetQty',type:'float',numberFormat:'0.000'},
            {name:'adjustmentQty',type:'float',numberFormat:'0.000'},
			{name:'status'},
            {name:'pallet'},
            {name:'casecnt'},
            {name:'innerpack'},
            {name:'effectiveDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
            {name:'addDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
            {name:'addWho'},
            {name:'editDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
            {name:'editWho'}
    ],
    idProperty: 'id'
});		

//库存提取使用
Ext.define('Transaction', {
    extend: 'Ext.data.Model',
    fields: [
        {name:'id'},
        {name:'storerKey'},            
        {name:'sku'},     
        {name:'loc'},
        {name:'lot'},  
        {name:'gid'},  
        {name:'qty',type:'float'},
        {name:'qtyavail',type:'float'},
        {name:'qtyallocated',type:'float'},
        {name:'qtyonhold',type:'float'},
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
        {name:'lottable16'},//批属性16
        {name:'lottable17'},//批属性17
        {name:'lottable18'},//批属性18
        {name:'lottable19'},//批属性19
        {name:'lottable20'},//批属性20
        {name:'name'},     //sku表的字段，通过内连接获取  
        {name:'qtyavailable',type:'float'},     //表中没有，自定义字段
        {name:'status'}     //lli的状态字段
    ],
    idProperty: 'id'
});
//两个grid的定义，两个tab页各一个
//按照LotxLocxId提取库存到SO的Grid
Ext.define('Redm.inventory.LliGrid', {
    extend: 'Redm.BaseGrid',
    alias : 'widget.lligrid',
    loadMask: true,
    forceLayout:true,
    autoLoad:false,
    selModel: Ext.create('Ext.selection.CheckboxModel'),    
    buildColumns: function(){
        this.columns = [
            { header: "SKU", dataIndex: 'sku', width: 140, sortable: true},
            { header: "库位", dataIndex: 'loc', width: 70, sortable: true},
            { header: "ID", dataIndex: 'id', width: 100, sortable: true,hidden:true},
            { header: "货主", dataIndex: 'storerKey', width: 50, sortable: true},
            { header: "数量", dataIndex: 'qty', width: 80, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
            { header: "可用数量", dataIndex: 'qtyavail', width: 80, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
            { header: "已分配数量", dataIndex: 'qtyallocated', width: 80, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
            { header: "托盘号", dataIndex: 'lottable05', width: 80, sortable: true},
            { header: "成品卷号", dataIndex: 'lottable06', width: 100, sortable: true},
            { header: "等级", dataIndex: 'lottable07', width: 80, sortable: true},
            { header: "外观代码", dataIndex: 'lottable08', width: 60, sortable: true},
            { header: "表面处理", dataIndex: 'lottable09', width: 100, sortable: true},
//          { header: "名称", dataIndex: 'name', width: 100, sortable: true},            
//          { header: "批次", dataIndex: 'lot', width: 100, sortable: true},
//          { header: "ID", dataIndex: 'gid', width: 100, sortable: true},
            { header: "状态", dataIndex: 'status', width: 100, sortable: true,
                    renderer:this.rendererStatusFunc
            },
            { header: "收货日期", dataIndex: 'lottable01', width: 130, sortable: false,editor:{xtype:'datefield',format:'Y-m-d H:i:s'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
            { header: "生产日期", dataIndex: 'lottable02', width: 130, sortable: false,editor:{xtype:'datefield',format:'Y-m-d H:i:s'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
            { header: "失效日期", dataIndex: 'lottable03', width: 130, sortable: false,editor:{xtype:'datefield',format:'Y-m-d H:i:s'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
            { header: "生产批号", dataIndex: 'lottable04', width: 100, sortable: true},
            { header: "规格", dataIndex: 'lottable10', width: 100, sortable: true},
            { header: "包装形式", dataIndex: 'lottable11', width: 100, sortable: true},
            { header: "ASN号", dataIndex: 'lottable12', width: 100, sortable: true},
            { header: "反射率", dataIndex: 'lottable13', width: 100, sortable: true},
            { header: "极差", dataIndex: 'lottable14', width: 100, sortable: true},
            { header: "批重量", dataIndex: 'lottable15', width: 100, sortable: true},
		    { header: swmslot16, dataIndex: 'lottable16', width: 100, sortable: true},
		    { header: swmslot17, dataIndex: 'lottable17', width: 100, sortable: true,hidden:true},
            { header: swmslot18, dataIndex: 'lottable18', width: 100, sortable: true,hidden:true},
    		{ header: swmslot19, dataIndex: 'lottable19', width: 100, sortable: true,hidden:true},
		    { header: swmslot20, dataIndex: 'lottable20', width: 100, sortable: true,hidden:true}
        ];
        return true;
    },

    buildDockedItems: function(){
        this.dockedItems = [{
            xtype: 'pagingtoolbar',
            store: this.store,  
            dock: 'bottom',
            displayInfo: true
        }];
    },
    initComponent: function(){
        var me = this;
        this.buildStore(basePath+'/outbound/doQueryTransactionLLI.action','Transaction',20);
      this.callParent(arguments);
    },
//LLI status解析函数
    rendererStatusFunc:function(value)
        {
            var retValue;
            if(value=='0') retValue='正常';
            else  retValue='冻结';
            return retValue;
        }  
});
//第一个Tab页的列表Grid
Ext.define('Redm.inventory.AdjustmentGrid',{
	extend: 'Redm.BaseGrid',
    alias : 'widget.adjustmentgrid',
    buildColumns: function(){
        this.columns = [
            { header: "货主", dataIndex: 'storerKey', width: 140, sortable: true},
			{ header: "调整单号", dataIndex: 'adjustmentKey', width: 140, sortable: true},
			{ header: "状态", dataIndex: 'status', width: 80, sortable: true, 
						renderer:this.rendererStatusFunc
			},  
	
			{ header: "调整时间", dataIndex: 'addDate', width: 140, sortable: true,renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
			{ header: "调整人", dataIndex: 'addWho', width: 140, sortable: true,hidden:true}
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
		this.buildStore(basePath + '/inventory/doQueryAdjustment.action','Adjustment',20);
		this.callParent(arguments);
	},
   
	//主表的状态解析函数
	rendererStatusFunc:function(value)
        {
            var retValue;
            if(value=='0') retValue='新建';
			else if(value=='1') retValue='部分完成';
			else if(value=='2') retValue='完成';
            else if(value=='9') retValue='关闭';
            else  retValue=value;
            return retValue;
        }
});


//第二个Tab页的列表Grid
Ext.define('Redm.inventory.AdjustmentDetailGrid',{
	extend: 'Redm.BaseGrid',
    alias : 'widget.adjustmentdetailgrid',
	autoLoad:false,
    selModel: Ext.create('Ext.selection.CheckboxModel'),
    buildColumns: function(){
        this.columns = [
                        {
                            header: "行号",
                            width: 45,
                            dataIndex:'lineNumber',
                            sortable: true
                        },
                        { header: "商品", dataIndex: 'sku', width: 100,sortable: true},
                        { header: "库位", dataIndex: 'loc', width: 100, sortable: true},
                        { header: "批次", dataIndex: 'lot', width: 100, sortable: true,editor:{xtype:'textfield',allowBlank: false}},
                        { header: "状态", dataIndex: 'status', width: 60,sortable: true,
											renderer:this.rendererDetailStatusFunc
						}, 
					
						{ header: "调整原因", dataIndex: 'reasonCode', width: 120, sortable: true
                          /*  editor:{
                                xtype: 'combo',
                                xtype:'codecombo',
                                listname: 'ADJREASON'
                            },renderer:reasonChange //该方法待后续补充*/
                        },
                        //{ header: "包装", dataIndex: 'packKey', width: 80, sortable: false//,
                         /*   editor:{
                                xtype: 'prosincombo',
                                outGrid:this,
                             //   store:packStore,       //待后续补充增加此数据结构
                                queryMode: 'local',
                                displayField: 'packKey',
                                valueField: 'packKey',
                                allowBlank: false
                            }*/
                        //},
                        //{ header: "单位", dataIndex: 'uom', width: 80, sortable: false//,
                          /*  editor: {
                                xtype:'combo',
        //			            store:uomColumn.uomStore,
                                queryMode: 'local',
                                displayField: 'value',
                                valueField: 'value',
                                allowBlank: false
                            }*/
                        //},
                        { header: "库存", dataIndex: 'qty', width: 80, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
//                        { header: "调整后库存", dataIndex: 'targetQty', width: 120, sortable: false,renderer:Ext.util.Format.numberRenderer('0.000'),editor:{xtype:'numberfield',minValue:0,decimalPrecision:3}},
                        { header: "调整后库存", dataIndex: 'targetQty', width: 120, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},                        
                        { header: "调整数", dataIndex: 'adjustmentQty', width: 100, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')}
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
		this.buildStore(basePath + '/inventory/doQueryAdjustmentDetail.action','AdjustmentDetail',20);
		this.callParent(arguments);
	},
	//明细表的状态解析函数
    rendererDetailStatusFunc:function(value)
        {
            var retValue;
            if(value=='0') retValue='新建';
            else if(value=='9') retValue='完成';
            else  retValue=value;
            return retValue;
        }

/*   暂不启用，待后续研究    
	    function reasonChange(val) {
		    if (val =='54') return '54-RECEIPT>PREVIOUSLY REPORTED';
			else if(val =='GENERAL') return 'General Adjustment';

		    return val;
		}*/

		
    
});


//主panel 包含两个Tab页
Ext.define('Redm.inventory.AdjustmentManager',{   
	extend: 'Ext.tab.Panel',
    alias : 'widget.adjustmentmanager',    //主panel，继承自 Ext.tab.Panel
    layout: 'border',
    title:'库存调整',
    tabPosition: 'bottom',
    initComponent: function(){
    	var me = this;
    	this.items = [this.createPt1Panel(),this.createPt2Panel()];
        this.callParent(arguments);
    },

	 
    //设置RECEIPT表关键字段只读属性（manner：true:只读，false:可以编辑）
    //关键字段包括货主，货主名称。新建时可以编辑，其他任何情况下只读
    onSetAdjustmentKeyReadOnly: function(manner){
        var me=this;
        me.pt2topform.getForm().findField('storerKey').setReadOnly(manner); 
        me.pt2topform.getForm().findField('addDate').setReadOnly(manner);
    },
    
    //设置明细表字段一般字段只读属性（manner：true:只读，false:可以编辑）
    //行号：配置上只读，sku，新建时可以编辑，其他任何情况下只读
    onSetDetailReadOnly: function(manner){
        var me=this;
        
        me.pt2pn1form.getForm().findField('loc').setReadOnly(manner);
        me.pt2pn1form.getForm().findField('lot').setReadOnly(manner);
        me.pt2pn1form.getForm().findField('reasonCode').setReadOnly(manner);
        me.pt2pn1form.getForm().findField('qty').setReadOnly(manner);    
        me.pt2pn1form.getForm().findField('adjustmentQty').setReadOnly(manner);
		if(true==manner){
			Ext.getCmp('saveBtn').disable(); 
		}else{
			Ext.getCmp('saveBtn').enable();
		}
    },
    
    //设置明细表关键字段只读属性（manner：true:只读，false:可以编辑）
    //关键字段包括 sku，中文名称，英文名称，别名。 新建时可以编辑，其他任何情况下只读
    onSetDetailKeyReadOnly: function(manner){
        var me=this;
        me.pt2pn1form.getForm().findField('sku').setReadOnly(manner);
    },
    
	
	
    createPt1Panel: function(){    //创建第一个tab页，继承自 Ext.panel.Panel
    	var me = this;
    	this.pt1panel = Ext.create('Ext.panel.Panel',{
    		layout: 'border',
    		border: false,
    		title: '基本',
    		items:[this.createAdjustmentGrid(),this.createPt1TopPanel()]
    	});
    	return this.pt1panel;
    },
	
	
    createAdjustmentGrid: function(){     // 创建第一个tab页的grid
    	var me = this;
    	this.adjustmentgrid = Ext.create('widget.adjustmentgrid',{
    		region: 'center',
    		listeners: {
  			itemdblclick: function(grid,record){
      				me.setActiveTab(1);
    				me.pt2topform.getForm().loadRecord(record);
					me.pt2pn1form.getForm().reset();
					me.detailgrid.getStore().load();
					//关键字段设置只读
					me.onSetAdjustmentKeyReadOnly(true);					
    			}
    		}
    	});
    	this.adjustmentgrid.getStore().on('beforeload',function(){    //启动时查询，加载的内容
    		var params = this.adjustmentgrid.getStore().getProxy().extraParams;
    		var record = me.pt1topform.getForm().getValues();

    		var storerKey = record.storerKey;  
    		var status = record.status;  
    		var adjustmentKey = record.adjustmentKey;  
			var effectiveDateStr= record.effectiveDateStr; 
			var effectiveDateEnd= record.effectiveDateEnd; 
			
			delete params.storerKey;
			delete params.status;
			delete params.adjustmentKey;
			delete params.effectiveDateStr;
			delete params.effectiveDateEnd;

			if(storerKey) params.storerKey = storerKey;
			if(status) params.status = status;
			if(adjustmentKey) params.adjustmentKey = adjustmentKey;
			if(effectiveDateStr) params.effectiveDateStr = effectiveDateStr;
			if(effectiveDateEnd) params.effectiveDateEnd = effectiveDateEnd;
			
    	},this);
    	return this.adjustmentgrid;
    },
    
    createPt1TopPanel: function(){  //创建第一页的TOP panel   继承自 Ext.panel.Panel 
		var me = this;
		this.pt1toppanel = Ext.create('Ext.panel.Panel',{
			region: 'north',
			border:false,
			height: 90,
			layout: 'border',
			items:[me.createPt1TopForm(),me.createPt1TopBtnPanel()]     //创建pt1topform 和 btn panel
		});
		return this.pt1toppanel;
	},
	createPt1TopForm: function(){
		var me = this;
		this.pt1topform = Ext.create('Ext.form.Panel',{   //创建Top form  继承自 Ext.form.Panel 
			region: 'north',
			frame: true,
			height: 50,
			layout: 'vbox',   //整体上vbox，而每个container是hbox，就可以做成多行的形式。用anchor也达到目的了
			defaults: {
				xtype: 'textfield',
				labelWidth: 80,
				margin: '5 0 0 5'
			},
        	items:[
                    {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            defaults: {
                                  margin: '3 2 3 2'
                            },
                            items: [
                                {  //该类型与表关联？待确认
                                    //xtype: 'storercombo',
									xtype:'textfield',
									fieldLabel: '货主',
                                    name:'storerKey',
                                    labelWidth : 40,
                                    width:180,
									listeners:{
										blur:function(txt){
											txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
										}
									}
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'adjustmentKey',
                                    fieldLabel: '调整单号',
                                    labelWidth : 60,
                                    width:180
                                },
                                {
                                    name: 'status',
                                    xtype:'combobox',
                                    fieldLabel: '状态',
                                    labelWidth : 40,
                                    displayField: 'text',
                                    valueField: 'value',
                                    store:Ext.create('Ext.data.Store', 
                                        {
                                            fields: ['text','value'],
                                            data: [{text:'新建',value:'0'},{text:'部分完成',value:'1'},{text:'完成',value:'2'},{text:'关闭',value:'9'}]
                                        }
                                    ),
                                    forceSelection: true,
                                    labelWidth : 80,
                                    width:180
                                },
                                {
                                    xtype:'datefield',
                                    name: 'effectiveDateStr',
                                    fieldLabel: '调整时间',
                                    format:'Y-m-d H:i:s',
                                    labelWidth : 80,
                                    width:210
                                },
                                {
                                    xtype:'datefield',
                                    name: 'effectiveDateEnd',
                                    format:'Y-m-d H:i:s',
                                    width:130
                                }
                            ]

                    }//,
/*                    {   
                        xtype:'hidden',
                        name : "id"
                    },
                    {
                        xtype:'hidden',
                        name : "deleteItems"
                    }     */               
            ]
	    })//end for Ext.create
		return this.pt1topform;
	},  //end  createTopForm
	
	createPt1TopBtnPanel: function(){
    	var me = this;
    	this.pt1topbtnpanel = Ext.create('Ext.form.Panel',{  //  创建btn panel ，继承自 Ext.form.Panel
    		region: 'center',
    		frame: true,
    		defaults: {
    			xtype: 'button',
    			margin: '5 0 0 5'
    		},

            items:[
            //暂时不支持分隔符，也没有加上图标。
                {
                    itemId: 'createToolbar',
                	iconCls: 'icon-create',
                    text: '创建',
					handler: me.onGoCreate, 
                    scope: this
                },
	            {
	            	itemId:'deleteToolbar',
                	iconCls: 'icon-delete',
	                text: '删除',
	                handler: this.onDelete,  //需要新增方法
	                scope: this
	            },
                {
                    text : "查询",
                    iconCls: 'icon-search',
                    scope : this,
                    handler: this.onSelect

                },
                {
                    text : "重置",
                    iconCls: 'icon-reset',
                    scope : this,
                    handler:  this.onReset

                },
				{
                    text : "整单调整",
                    scope : this,
                    id:'allAdjFst',//第一个整单调整按钮
                    handler:  this.onAction

                }					
            ]

    	});
    	return this.pt1topbtnpanel;
    },
    
    // 以上第一个tab页创建好了，下边是创建第二个tab页
    createPt2Panel: function(){
    	var me = this;
    	this.pt2panel= Ext.create('Ext.panel.Panel',{    //创建第二个tab页，继承自  Ext.panel.Panel
    		layout: 'border',
    		border: false,
    		title: '详细',
    		items:[/*this.createDetailGrid(),*/this.createPt2TopPanel(),this.createPt2Pn1Panel()]  //只有一个grid，其他可以删除了
    	});
    	return this.pt2panel;
    },

    createPt2TopPanel: function(){
     	this.pt2toppanel = Ext.create('Ext.panel.Panel',{
    		region: 'north',
    		layout: 'border',
    		border: false,
    		height: 80,
    		items:[this.createPt2TopForm(),this.createPt2TopBtnPanel()]
    	});
    	return this.pt2toppanel;
    },
    createPt2TopForm: function(){
    	var me = this;
    	this.pt2topform = Ext.create('Ext.form.Panel',{
    		region: 'north',
    		frame: true,
			height:40,
    		layout: 'hbox',
    		defaults: {
    			xtype: 'textfield',
    			margin: '5 0 0 5',
    		    labelWidth: 40
    		},
            items: [
                {
                    xtype:'textfield',
                    name: 'adjustmentKey',
                    fieldLabel: '调整单号',
                    labelWidth : 60,
                    allowBlank: false,
                    readOnly:true
                },
				{
					name:'id',
					hidden:true
				},
                {
					xtype:'textfield',
					fieldLabel: '货主',
                    name:'storerKey',
                    allowBlank:false,
                    labelWidth : 40,
                    width:180,
                    listeners:{
                                blur: function(txt){
									var storerKeyValue= Ext.util.Format.uppercase(txt.getValue());
									txt.setValue(storerKeyValue);
                                    //输入参数，鼠标离开后见检查该商品是否存在
                                    skuValue= me.pt2pn1form.getForm().findField('sku').getValue('');
                                    if(''!=skuValue) 
                                    {
                                        Ext.Ajax.request({
                                            url: basePath + '/support/doValidateSkus.action',   //用true or false判断有误，后续再查，改用长度判断
                                            params: {
                                                sku:skuValue,
                                                storerKey:storerKeyValue
                                            },
                                            success: function(response){
                                                var text = Ext.decode(response.responseText);
                                                var status = text.success;
                                                
                                                if(0==text.json.data.length)
                                                {
                                                    MessageBox.show(false, '货主与商品不匹配！');   
                                                    me.pt2pn1form.getForm().findField('sku').setValue('');
                                                }
                                            }
                                      
                                        });
                                    }
                                    
                                } 
                            } //end listeners
                },
                {
                    name: 'status',
                    xtype:'combobox',
                    fieldLabel: '状态',
                    displayField: 'text',
                    valueField: 'value',
                    store:Ext.create('Ext.data.Store', 
                        {
                            fields: ['text','value'],
                            data: [{text:'新建',value:'0'},{text:'部分完成',value:'1'},{text:'完成',value:'2'},{text:'关闭',value:'9'}]
                        }
                    ),
                    value: '0',
                    labelWidth : 40,
                    readOnly: true    //true为只读，不能选择，没有下拉框。false为可以选择的，有下拉框
                },
				{
                    xtype:'datefield',
                    format:'Y-m-d H:i:s',
                    name: 'addDate',
                    fieldLabel: '调整时间',
                    labelWidth : 60,
                    value:new Date(),
                    width:210
                },
				{
                    xtype:'textfield',
                    name: 'addWho',
                    fieldLabel: '调整人',
                    labelWidth : 60,
                    hidden:true
                },
                {
                    xtype:'button',
                	iconCls: 'icon-create',
					margin: '3 2 3 2',
                    text: '创建',
					handler: me.onGoCreate, 
                    scope: this
                },				
                {
                     xtype:'button',
                     margin: '3 2 3 2',  //控制在行的中间
                     text : "保存",
					 id:'saveBtn',
                     iconCls: 'icon-save',
                     scope : this,
                     handler: this.saveAdjustment
                 },
                 {
                    xtype:'button',
                    margin: '3 2 3 2',  //控制在行的中间
					iconCls: 'icon-delete',
	                text: '删除',
					handler: this.deleteAdjustmentAndDetal,
	                scope: this
                 }
            ]
    	});
    	return this.pt2topform;
    },

	createPt2TopBtnPanel: function(){
    	var me = this;
    	this.pt2topbtnpanel = Ext.create('Ext.form.Panel',{  //  创建btn panel ，继承自 Ext.form.Panel
    		region: 'center',
    		frame: true,
    		defaults: {
    			xtype: 'button',
    			margin: '5 0 0 5'
    		},
            items:[
                {
                    itemId: 'createToolbar',
                	iconCls: 'icon-create',
                    text: '添加',
					handler: me.onAddDetail, 
                    scope: this
                },
	            {
	            	itemId:'deleteToolbar',
                	iconCls: 'icon-delete',
	                text: '删除',
					handler: me.onMultiDelete,
	                scope: this
	            },
				{
					xtype:'button',
                    text : "整单调整",
                    scope : this,
                    id:'allAdjSnd',
                    handler:  this.onAdjustmentAndDetal

                },
				{
                    text : "明细调整", 
                    scope : this,
                    id:'detailAdj',
                    handler:  this.onDetailAction
                },
                {
                    text : "从库存提取",
                    id:'detailMov',
                    scope : this,
                    handler:function(){
                        this.creatTransactionWindowPanel();
                        this.winformtran.show();
                    }
                }
            ]
    	});
    	return this.pt2topbtnpanel;
    },
    
	//底部面板，包括一个grid和一个form 
	createPt2Pn1Panel: function(){
    	this.pt2pn1panel = Ext.create('Ext.panel.Panel',{
    		region: 'center',
    		layout: 'border',
    		items: [this.createDetailGrid(),this.createPt2Pn1Form()]
    	});
    	return this.pt2pn1panel;
    },
	
	//底部左边grid
    createDetailGrid: function(){
    	var me = this;
    	this.detailgrid = Ext.create('widget.adjustmentdetailgrid',{
    		region: 'center',
    		listeners: {
    			itemclick: function(grid,record){
    				me.pt2pn1form.getForm().loadRecord(record);
					var status=me.pt2pn1form.getForm().findField('status').getValue();
					
					if(status!='0')
					{   //load 时判断如果状态不是0，则只读状态
						//设置明细表字段只读
						me.onSetDetailReadOnly(true);       
						//关键字段也设置只读
						me.onSetDetailKeyReadOnly(true); 
					}
					else
					{   //因设置后状态一直不变，在加载新建的记录时，需要重新设置取消只读
						//另外，新建时主表或者添加明细记录，需要设置可以编辑，操作完成需要设置只读
						me.onSetDetailReadOnly(false);                
						//关键字段也设置只读
						me.onSetDetailKeyReadOnly(true); 
					}
    			}
    		}
    	});
    	this.detailgrid.getStore().on('beforeload',function(){
    		var params = this.detailgrid.getStore().getProxy().extraParams;
			var record = me.pt2topform.getForm().getFieldValues();
    		var adjustmentKey = record.adjustmentKey;
			delete params.adjustmentKey;
			if(adjustmentKey) params.adjustmentKey = adjustmentKey;
			
    	},this);
    	return this.detailgrid;
    },    
    
    //底部右边form
    createPt2Pn1Form: function(){
		var me=this;
    	this.pt2pn1form = Ext.create('Ext.form.Panel',{
    		region: 'east',
    		width: 320,
    		split: true,
			collapsible: true,
    		border: true,
    		frame: true,
    		defaults: {
    			xtype: 'fieldcontainer',
    			margin: '5 0 0 5',
    			frame: true
    		},
    		items: [
        		{
    				layout: 'hbox',
    				defaults: {
    					xtype: 'textfield',
    					margin: '5 0 0 5',
    					labelWidth: 80,
    					width: 285
    				},
    				items: [
        				{
        					fieldLabel: '行号',
        					allowBlank: false,
							readOnly:true,
        					name: 'lineNumber'
    				    },
						{
							name:'id',
							hidden:true
						}
    				]
    			},
				{
    				layout: 'hbox',
    				defaults: {
    					xtype: 'textfield',
    					margin: '5 0 0 5',
    					labelWidth: 80,
    					width: 285
    				},
    				items: [
        				{
        					xtype:'combobox',
							fieldLabel: '状态',
        					readOnly:true,
        					name: 'status',
							displayField: 'text',
							valueField: 'value',
							store:Ext.create('Ext.data.Store', 
							{
								fields: ['text','value'],
								data: [{text:'新建',value:'0'},{text:'完成',value:'9'}]
							}
							),
							value: '0'
    				    }
    				]
    			},
        		{
    				layout: 'hbox',
    				defaults: {
    					xtype: 'textfield',
    					margin: '5 0 0 5',
    					labelWidth: 80,
    					width: 285
    				},
    				items: [
        				{
        					fieldLabel: '商品',
        					allowBlank: false,
        					name: 'sku',
							listeners:{
                                    blur: function(txt){
										var skuValue= Ext.util.Format.uppercase(txt.getValue());
										txt.setValue(skuValue);
                                       //输入参数，鼠标离开后见检查该商品是否存在
                                        lotValue=me.pt2pn1form.getForm().findField('lot').getValue();
                                        locValue=me.pt2pn1form.getForm().findField('loc').getValue();
										storerKeyValue=me.pt2topform.getForm().findField('storerKey').getValue();
                                        if(''!=skuValue && ''!=lotValue  && ''!=locValue  && ''!=storerKeyValue)
                                        {
                                            Ext.Ajax.request({
                                                url: basePath + '/inventory/doQuerryAdjustmentDetail.action',
                                                params: {
                                                    sku:skuValue,
													lot:lotValue,
													loc:locValue
                                                },
                                                success: function(response){    //failure属于连不上服务器的情况，后续补充
                                                    var text = Ext.decode(response.responseText);
                                                    var success = text.success;
                                                    if(0 != text.json.data.length)
                                                    {
                                                        me.pt2pn1form.getForm().findField('qty').setValue(text.json.data[0].qty);
														
														if(text.json.data[0].storerKey==storerKeyValue){
														}else{
															me.pt2pn1form.getForm().findField('sku').setValue('');
															Ext.Msg.alert("错误提示", '商品与货主不匹配！')
														}
                                                    }
                                                    else
                                                    {
                                                        me.pt2pn1form.getForm().findField('qty').setValue('');
														me.pt2pn1form.getForm().findField('lot').setValue('');
                                                        Ext.Msg.alert("错误提示", '查不到相关记录！')
                                                    }
                                                }
                                            })
                                        }
                                    }
                                }//end listener 
    				    }
    				]
    			},
    			{
    				layout: 'hbox',
    				defaults: {
    					xtype: 'textfield',
    					margin: '5 0 0 5',
    					width: 285,
    					labelWidth: 80
    				},
    				items: [
        				{
        					fieldLabel: '库位',
        					allowBlank: false,
							listeners: {
								blur: function(txt){
										var locValue= Ext.util.Format.uppercase(txt.getValue());
										txt.setValue(locValue);
                                       //输入参数，鼠标离开后见检查该商品是否存在
                                        lotValue=me.pt2pn1form.getForm().findField('lot').getValue();
                                        skuValue=me.pt2pn1form.getForm().findField('sku').getValue();
                                        storerKeyValue=me.pt2topform.getForm().findField('storerKey').getValue();
                                        if(''!=skuValue && ''!=lotValue  && ''!=locValue  && ''!=storerKeyValue)
                                        {
                                            Ext.Ajax.request({
                                                url: basePath + '/inventory/doQuerryAdjustmentDetail.action',
                                                params: {
                                                    sku:skuValue,
													lot:lotValue,
													loc:locValue
                                                },
                                                success: function(response){    //failure属于连不上服务器的情况，后续补充
                                                    var text = Ext.decode(response.responseText);
                                                    var success = text.success;
                                                    if(0 != text.json.data.length)
                                                    {
                                                        me.pt2pn1form.getForm().findField('qty').setValue(text.json.data[0].qty);
														if(text.json.data[0].storerKey==storerKeyValue){
														}else{
															me.pt2pn1form.getForm().findField('sku').setValue('');
															Ext.Msg.alert("错误提示", '商品与货主不匹配！')
														}
													}
                                                    else
                                                    {
                                                        me.pt2pn1form.getForm().findField('qty').setValue('');
														me.pt2pn1form.getForm().findField('lot').setValue('');
                                                        Ext.Msg.alert("错误提示", '查不到相关记录！')
                                                    }
                                                }
                                            })
                                        }
                                    }
        	    			},
        					name: 'loc'
        				}
    				]
    			},
    			{
    				layout: 'hbox',
    				defaults: {
    					xtype: 'textfield',
    					margin: '5 0 0 5',
    					width: 285,
    					labelWidth: 80
    				},
    				items: [
        				{
        					fieldLabel: '批次',
							allowBlank: false,
							listeners: {
								blur: function(txt){
										var lotValue= Ext.util.Format.uppercase(txt.getValue());
										txt.setValue(lotValue);
                                       //输入参数，鼠标离开后见检查该商品是否存在
                                        locValue=me.pt2pn1form.getForm().findField('loc').getValue();
                                        skuValue=me.pt2pn1form.getForm().findField('sku').getValue();
                                        storerKeyValue=me.pt2topform.getForm().findField('storerKey').getValue();
                                        if(''!=skuValue && ''!=lotValue  && ''!=locValue  && ''!=storerKeyValue)
                                        {
                                            Ext.Ajax.request({
                                                url: basePath + '/inventory/doQuerryAdjustmentDetail.action',
                                                params: {
                                                    sku:skuValue,
													lot:lotValue,
													loc:locValue
                                                },
                                                success: function(response){    //failure属于连不上服务器的情况，后续补充
                                                    var text = Ext.decode(response.responseText);
                                                    var success = text.success;
                                                    if(0 != text.json.data.length)
                                                    {
                                                        me.pt2pn1form.getForm().findField('qty').setValue(text.json.data[0].qty);
														if(text.json.data[0].storerKey==storerKeyValue){
														}else{
															me.pt2pn1form.getForm().findField('sku').setValue('');
															Ext.Msg.alert("错误提示", '商品与货主不匹配！')
														}
													}
                                                    else
                                                    {
                                                        me.pt2pn1form.getForm().findField('qty').setValue('');
														me.pt2pn1form.getForm().findField('lot').setValue('');
                                                        Ext.Msg.alert("错误提示", '查不到相关记录！')
                                                    }
                                                }
                                            })
                                        }
                                    }
        	    			},
        					name: 'lot'
        				}
    				]
    			},
				{
    				layout: 'hbox',
    				defaults: {
    					xtype: 'textfield',
    					margin: '5 0 0 5',
    					width: 285,
    					labelWidth: 80
    				},
    				items: [
        				{
        					fieldLabel: '调整原因',
        					name: 'reasonCode',
                            xtype:'codecombo',
                            codeType:'ADJREASON'
        				}
    				]
    			},
/*				{                 //暂时隐掉
    				layout: 'hbox',
    				defaults: {
    					xtype: 'textfield',
    					margin: '5 0 0 5',
    					width: 285,
    					labelWidth: 80
    				},
    				items: [
        				{
        					fieldLabel: '包装',
							listeners: {
        						change: function(txt,newValue){
        							txt.setValue(newValue.toUpperCase());
        						}
        	    			},
        					name: 'packKey'
        				}
    				]
    			},
				{
    				layout: 'hbox',
    				defaults: {
    					xtype: 'textfield',
    					margin: '5 0 0 5',
    					width: 285,
    					labelWidth: 80
    				},
    				items: [
        				{
        					fieldLabel: '单位',
							listeners: {
        						change: function(txt,newValue){
        							txt.setValue(newValue.toUpperCase());
        						}
        	    			},
        					name: 'uom'
        				}
    				]
    			},*/
				{
    				layout: 'hbox',
    				defaults: {
    					//xtype: 'textfield',
					    xtype: 'numberfield',
    					margin: '5 0 0 5',
    					width: 285,
    					labelWidth: 80
    				},
    				items: [
        				{
        					fieldLabel: '库存',
							decimalPrecision:3,
//                            format:'0.000',
        					name: 'qty'
        				}
    				]
    			},
				{
    				layout: 'hbox',
    				defaults: {
    					xtype: 'textfield',
    					margin: '5 0 0 5',
    					width: 285,
    					labelWidth: 80
    				},
    				items: [
        				{
						    xtype: 'numberfield',
        					fieldLabel: '调整数',
        					name: 'adjustmentQty',
							decimalPrecision:3,
//                          format:'0.000',
							listeners:{
                                blur: function(txt){
                                       //输入参数，鼠标离开后见检查该商品是否存在
                                        targetQtyValue=txt.getValue();
                                        qtyValue=me.pt2pn1form.getForm().findField('qty').getValue();
                                        adjustmentQtyValue=me.pt2pn1form.getForm().findField('adjustmentQty').getValue();
										
                                        if(null!=qtyValue  && null!=adjustmentQtyValue)
                                        {
                                            Ext.Ajax.request({
                                                url: basePath + '/inventory/doQuerryTargetQty.action',
                                                params: {
													qty:qtyValue,
													adjustmentQty:adjustmentQtyValue
                                                },
                                                success: function(response){    //failure属于连不上服务器的情况，后续补充
                                                    var text = Ext.decode(response.responseText);
                                                    var success = text.success;
                                                    if(''!= text.json.data || null != text.json.data)
                                                    {
                                                        me.pt2pn1form.getForm().findField('targetQty').setValue(text.json.data);
                                                    }
                                                    else
                                                    {
                                                        me.pt2pn1form.getForm().findField('targetQty').setValue('');
                                                        Ext.Msg.alert("错误提示", '调整有误！')
                                                    }
                                                }
                                            })
                                        }
                                    }
                                }//end listener       
        				}
    				]
    			},
				{
    				layout: 'hbox',
    				defaults: {
    					xtype: 'numberfield',
						decimalPrecision:3,
                        //format:'0.000',
    					margin: '5 0 0 5',
    					width: 285,
    					labelWidth: 80
    				},
    				items: [
        				{
        					fieldLabel: '调整后库存',
        					name: 'targetQty',
					        readOnly:true
        				}
    				]
    			}
			]
    	});
    	return this.pt2pn1form;
    },
	
	
    onSelect: function(){
    	this.adjustmentgrid.getStore().load();
    },
    onGoDelete: function(){
    	var me = this;
    	var records = me.adjustmentgrid.getSelectionModel().getSelection(); 
    	if(records == ""){
    		MessageBox.error('错误提示','请选择删除的数据！');
    		return;
    	}else{
    		var record = records[0].getData();
    		Ext.MessageBox.confirm('询问提示', '确定要删除所选信息吗？', 
				function(btn){
					if(btn == 'yes'){
						Ext.Ajax.request({
						    url: basePath + '/inventory/deletePutawayStrategy.action',
						    params: {
						    	putawayStrategyKey: record.putawayStrategyKey
						    },
						    success: function(response){
						        var text = Ext.decode(response.responseText);
						        var success = text.success;
						        MessageBox.show(success, text.json.msg);
						        me.adjustmentgrid.getStore().load();
						        me.detailgrid.getStore().load();
			        			me.pwform.getForm().reset();
			                	me.basicform.getForm().reset();
			                	me.otherform.getForm().reset();
						    }
						});
					}
				}
			); 
    	}
    },
    
    onReset: function(){
    	this.pt1topform.getForm().reset();
    },
	
	//第一个tab页面的创建按钮，包括跳转页面，和清空两个form
	onGoCreate: function(){
    	this.setActiveTab(1);
		
		//新建主表记录，主表，明细表所有字段取消只读
        this.onSetAdjustmentKeyReadOnly(false);
        this.onSetDetailReadOnly(false);
        this.onSetDetailKeyReadOnly(false);
        
		
		//待添加跳转页面后的其他操作内容
		this.pt2topform.getForm().reset();
		this.pt2pn1form.getForm().reset();
		
		
        //计划在创建时自动加载一个数字
        //规则目前写死，后续考虑修改
        var nameCode='ADJNUM';
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
                        this.pt2topform.getForm().findField('adjustmentKey').setValue(value);   
                        this.pt2pn1form.getForm().findField('lineNumber').setValue('1');     //创建receiptkey时，设置行号为1
                    }
                },scope:this
            }
	    });        
        
        this.detailgrid.getStore().removeAll();   //清空gid的数据
    },
	
	//第二个tab页面的创建按钮，清空两个form
    //都使用onGoCreate，这个方法不用了
/*    onCreate: function(){
		this.pt2topform.getForm().reset();
		this.pt2pn1form.getForm().reset();
    },*/
    
	
	//第二个tab页面添加明细
    onAddDetail: function(){
    	var me = this;
    	me.pt2pn1form.getForm().reset();
		
		//新建明细表记录，所有字段取消只读
        this.onSetDetailReadOnly(false);
        this.onSetDetailKeyReadOnly(false);
		
		//可以自动创建行号
		this.lineNoStore = Ext.create('Ext.data.Store', {
	        remoteSort: true,
            autoLoad: true,
            fields: [
                        {name:'id'},
                        {name:'adjustmentKey'},
                        {name:'lineNumber'}
            ],
	        proxy: {
	            type: 'ajax',
                //添加明细时，根据adjustmentKey查找。如果找不到，设置为1
	            url: basePath + '/inventory/doCreateAdjustmentDetailLineNumber.action?adjustmentKey='+this.pt2topform.getForm().findField('adjustmentKey').getValue(),
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
                        this.pt2pn1form.getForm().findField('lineNumber').setValue(value); 
                    }
                    else
                    {
                        this.pt2pn1form.getForm().findField('lineNumber').setValue('1'); 
                    }
                },scope:this
            }
	    });
    },
	
	//第二个tab页面删除选中的记录明细
    onDeleteDetail: function(){
    	var me = this;
    	var records = me.detailgrid.getSelectionModel().getSelection(); 
    	if(records == ""){
    		MessageBox.error('错误提示','请选择删除的数据！');
    		return;
    	}else{
    		var record = records[0].getData();
    		Ext.MessageBox.confirm('询问提示', '确定要删除所选信息吗？', 
				function(btn){
					if(btn == 'yes'){
						Ext.Ajax.request({
						    url: basePath + '/inventory/deletePutawayStrategyDetail.action',
						    params: {
						    	id: record.id
						    },
						    success: function(response){
						        var text = Ext.decode(response.responseText);
						        var success = text.success;
						        MessageBox.show(success, text.json.msg);
						        me.detailgrid.getStore().load();
								me.adjustmentgrid.getStore().load();
			                	me.basicform.getForm().reset();
			                	me.otherform.getForm().reset();
						    }
						});
					}
				}
			); 
    	}
    },

    createContextMenu:function(e){

    },
    createContextChildMenu:function(e){

    },

	//保存主表及明细表
	saveAdjustment: function(){
		var me = this;
    	var pt2top = this.pt2topform.getForm();//基本
    	var pt2pn1 = this.pt2pn1form.getForm();//运输

    	var pt2topValues = pt2top.getValues();
    	var pt2pn1Values = pt2pn1.getValues();
    	if(!(pt2top.isValid())||!(pt2pn1.isValid()) ) return;
    	Ext.Ajax.request({
		    url: basePath + '/inventory/doSaveAdjustment.action',
		    params: {
				//主表记录
		    	id: pt2topValues.id,
				storerKey:pt2topValues.storerKey,
				adjustmentKey:pt2topValues.adjustmentKey,
				status:pt2topValues.status,
				addDate:pt2topValues.addDate,
				addWho:pt2topValues.addWho,
				
		        //明细表记录
                detailId:pt2pn1Values.id,
                lineNumber:pt2pn1Values.lineNumber,
                sku:pt2pn1Values.sku,
                loc:pt2pn1Values.loc,
                lot:pt2pn1Values.lot,
				dstatus: pt2pn1Values.status,   //不允许手工修改
                reasonCode:pt2pn1Values.reasonCode,
                packKey:pt2pn1Values.packKey,
                uom:pt2pn1Values.uom,
                qty:pt2pn1Values.qty,
                targetQty:pt2pn1Values.targetQty,
                adjustmentQty:pt2pn1Values.adjustmentQty
		    },
		    success: function(response){
		        var text = Ext.decode(response.responseText);
		        var success = text.success;
		        MessageBox.show(success, text.json.msg);
				
				if(true==success)
				{
					me.pt2pn1form.getForm().reset();   //清空后状态更新问题就不存在了
					me.detailgrid.getStore().load();
					me.adjustmentgrid.getStore().load();
					//调整完成时，更新主表状态，并 根据主表状态判断是否需要设置主表的字段为只读
					Ext.Ajax.request({
						url: basePath + '/inventory/doQueryAdjustmentStatus.action',
						params: {
							adjustmentKey:pt2topValues.adjustmentKey
						},
						success: function(response){
							var text = Ext.decode(response.responseText);
							var success = text.success;
							if(0 != text.json.data.length)   //adjustmentKey唯一，应该只有一条记录
							{
								//更新主表状态
								var statusValue=text.json.data[0].status;
								
								me.pt2topform.getForm().findField('status').setValue(statusValue)
								if('0'!=statusValue)
								{      
									me.onSetAdjustmentKeyReadOnly(true); //根据状态设置是否可以编辑
								}
							}
						}
					});
				}
		    }
		});
	},
	
	//删除明细表多条记录的方法
	onMultiDelete: function(){
		var me = this;
		var records = me.detailgrid.getSelectionModel().getSelection();
		var record = me.pt2topform.getForm().getFieldValues(); 
		var adjustmentKey=record.adjustmentKey;
		if(records == ""){
			MessageBox.error("错误提示","请选择要操作的数据！");
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
                        url: basePath + '/inventory/doMultiDeleteAdjustmentDetail.action',
                        params: {
                            ids: ids
                        },
                        success: function(response){
                            var text = Ext.decode(response.responseText);
                            var success = text.success;
                            MessageBox.show(success, text.json.msg);
							
							if(true==success)
                            {
								me.pt2pn1form.getForm().reset();   //清空后状态更新问题就不存在了
								me.detailgrid.getStore().load();
								me.adjustmentgrid.getStore().load();
								//调整完成时，更新主表状态，并 根据主表状态判断是否需要设置主表的字段为只读
								Ext.Ajax.request({
									url: basePath + '/inventory/doQueryAdjustmentStatus.action',
									params: {
										adjustmentKey:adjustmentKey
									},
									success: function(response){
									var text = Ext.decode(response.responseText);
									var success = text.success;
									if(0 != text.json.data.length)   //adjustmentKey唯一，应该只有一条记录
									{
										//更新主表状态
										var statusValue=text.json.data[0].status;
										me.pt2topform.getForm().findField('status').setValue(statusValue)
										if('0'!=statusValue)
										{      
											me.onSetAdjustmentKeyReadOnly(true); //根据状态设置是否可以编辑
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
	
	//从form获取主表参数，删除主表和相关明细表记录的方法
	deleteAdjustmentAndDetal: function(){
		var me = this;
    	var record = me.pt2topform.getForm().getFieldValues(); 
    	if(record.adjustmentKey == ""){
    		MessageBox.error('错误提示','请选择操作的数据！');
    		return;
    	}
        else
        {
        	Ext.MessageBox.confirm('询问提示', '确定要删除吗？', 
    			function(btn){
    				if(btn == 'yes'){    
                            Ext.Ajax.request({
                                url: basePath + '/inventory/doDeleteAdjustment.action',
                                params: {
                                    adjustmentKey: record.adjustmentKey
                                },
                                success: function(response){
                                    var text = Ext.decode(response.responseText);
                                    var success = text.success;
                                    MessageBox.show(success, text.json.msg);
                                    me.pt2topform.getForm().reset();
                                    me.pt2pn1form.getForm().reset();
                                    me.detailgrid.getStore().load();
									me.adjustmentgrid.getStore().load();
                                }
                            });
    				}
                }
			);  
    	}
    },
	
	//从grid获取主表参数，删除主表和相关明细表记录的方法
	onDelete: function(){
		var me = this;
		var records = this.adjustmentgrid.getSelectionModel().getSelection(); 
		if(records == ""){
			MessageBox.error('错误提示','请选择操作的数据！');
			return;
		}
		var data = records[0].getData();
        
        Ext.MessageBox.confirm('询问提示', '确定要删除吗？', 
            function(btn){
                if(btn == 'yes'){    
                    Ext.Ajax.request({
                        url: basePath + '/inventory/doDeleteAdjustment.action',
                        params: {
                            adjustmentKey: data.adjustmentKey
                        },
                        success: function(response){
                            var text = Ext.decode(response.responseText);
                            var success = text.success;
                            MessageBox.show(success, text.json.msg);
                            me.adjustmentgrid.getStore().load();
							me.detailgrid.getStore().load();
                        }
                    });
                }
            }
        );
	},
	
	//整单调整按钮的方法，从grid获取主表参数
	onAction:function(){
		var me = this;
		var records = this.adjustmentgrid.getSelectionModel().getSelection(); 

        //调整未结束前禁用按钮
        Ext.getCmp('allAdjFst').disable();
        Ext.getCmp('allAdjSnd').disable();
        Ext.getCmp('detailAdj').disable();
        
		if(records == ""){
			MessageBox.error('错误提示','请选择操作的数据！');
            //返回前使能按钮
            Ext.getCmp('allAdjFst').enable();
            Ext.getCmp('allAdjSnd').enable();
            Ext.getCmp('detailAdj').enable();            
			return;
		}
		var data = records[0].getData();
		
		Ext.MessageBox.confirm('询问提示', '确定要调整吗？', 
            function(btn){
                if(btn == 'yes'){    
					var mask = new Ext.LoadMask(me.getEl(), { 
						msg : 'please wait...' 
					});
					mask.show(); 
                    Ext.Ajax.request({
                        url: basePath + '/inventory/doExecuteAdjustment.action',
                        params: {
                            adjustmentKey: data.adjustmentKey,
							storerKey:data.storerKey
                        },
                        success: function(response){
                            var text = Ext.decode(response.responseText);
                            var success = text.success;
							mask.hide();      
                            MessageBox.show(success, text.json.msg);
							me.detailgrid.getStore().load();
							me.adjustmentgrid.getStore().load();
                        },
						timeout: 100000000
                    });
                }
            }
        );
        //调整完成后使能按钮
        Ext.getCmp('allAdjFst').enable();
        Ext.getCmp('allAdjSnd').enable();
        Ext.getCmp('detailAdj').enable();
	},
	
	//整单调整按钮的方法，从form获取主表参数
	onAdjustmentAndDetal: function(){
		var me = this;
    	var record = me.pt2topform.getForm().getFieldValues(); 

        //调整未结束前禁用按钮
        Ext.getCmp('allAdjFst').disable();
        Ext.getCmp('allAdjSnd').disable();
        Ext.getCmp('detailAdj').disable();
        
    	if(record.adjustmentKey == ""){
    		MessageBox.error('错误提示','请选择操作的数据！');
            //返回前使能按钮
            Ext.getCmp('allAdjFst').enable();
            Ext.getCmp('allAdjSnd').enable();
            Ext.getCmp('detailAdj').enable();            
    		return;
    	}
		Ext.MessageBox.confirm('询问提示', '确定要调整吗？', 
            function(btn){
                if(btn == 'yes'){ 
					var mask = new Ext.LoadMask(me.getEl(), { 
						msg : 'please wait...' 
					});
					mask.show(); 
                    Ext.Ajax.request({
                        url: basePath + '/inventory/doExecuteAdjustment.action',
                        params: {
                            adjustmentKey: record.adjustmentKey,
							storerKey:record.storerKey
                        },
                        success: function(response){
                            var text = Ext.decode(response.responseText);
                            var success = text.success;
							mask.hide();   
                            MessageBox.show(success, text.json.msg);
							if(true==success)
							{
								//主表对应的form不能清空，需要单独更新状态
								me.pt2pn1form.getForm().reset();   //清空后状态更新问题就不存在了
								me.detailgrid.getStore().load();
								me.adjustmentgrid.getStore().load();

								//整单调整完成时，更新主表状态，并 根据主表状态判断是否需要设置主表的字段为只读
								Ext.Ajax.request({
									url: basePath + '/inventory/doQueryAdjustmentStatus.action',
									params: {
										adjustmentKey: record.adjustmentKey
									},
									success: function(response){
										var text = Ext.decode(response.responseText);
										var success = text.success;
										if(0 != text.json.data.length)   //adjustmentKey唯一，应该只有一条记录
										{
											//更新主表状态
											var statusValue=text.json.data[0].status;
											me.pt2topform.getForm().findField('status').setValue(statusValue)
											if('0'!=statusValue)
											{
												me.onSetAdjustmentKeyReadOnly(true); //根据状态设置是否可以编辑
											}
										}
									},
									timeout: 100000000
								});
							}
                        }
                    });
                }
            }
        );
        //调整完成后使能按钮
        Ext.getCmp('allAdjFst').enable();
        Ext.getCmp('allAdjSnd').enable();
        Ext.getCmp('detailAdj').enable();
	},
	//明细调整按钮的方法
	onDetailAction:function(){
		var me = this;
		var records = me.detailgrid.getSelectionModel().getSelection();
		var record = me.pt2topform.getForm().getFieldValues(); 
		var adjustmentKey=record.adjustmentKey;

        //调整未结束前禁用按钮
        Ext.getCmp('allAdjFst').disable();
        Ext.getCmp('allAdjSnd').disable();
        Ext.getCmp('detailAdj').disable();
        
		if(records == ""){
			MessageBox.error("错误提示","请选择要操作的数据！");
            //返回前使能按钮
            Ext.getCmp('allAdjFst').enable();
            Ext.getCmp('allAdjSnd').enable();
            Ext.getCmp('detailAdj').enable();            
		 	return;
		} 
		var ids = []; 
		Ext.Array.each(records, function(name, index, countriesItSelf) {
			ids.push(name.getData().id);
		});

        Ext.MessageBox.confirm('询问提示', '确定要调整吗？', 
            function(btn){
                if(btn == 'yes'){    
					var mask = new Ext.LoadMask(me.getEl(), { 
						msg : 'please wait...' 
					});
					mask.show(); 
                    Ext.Ajax.request({
                        url: basePath + '/inventory/doAdjustmentDetailExecute.action',
                        params: {
                            ids: ids,
							storerKey:record.storerKey
                        },
                        success: function(response){
                            var text = Ext.decode(response.responseText);
                            var success = text.success;
							mask.hide();    
                            MessageBox.show(success, text.json.msg);
                            
							//调整完成时，需要设置这几个字段为只读
							if(true==success)
							{
								me.pt2pn1form.getForm().reset();   //清空后状态更新问题就不存在了
								me.detailgrid.getStore().load();
								me.adjustmentgrid.getStore().load();
								//调整完成时，更新主表状态，并 根据主表状态判断是否需要设置主表的字段为只读
								Ext.Ajax.request({
									url: basePath + '/inventory/doQueryAdjustmentStatus.action',
									params: {
										adjustmentKey:adjustmentKey
									},
									success: function(response){
										var text = Ext.decode(response.responseText);
										var success = text.success;
										if(0 != text.json.data.length)   //adjustmentKey唯一，应该只有一条记录
										{
											//更新主表状态
											var statusValue=text.json.data[0].status;
											me.pt2topform.getForm().findField('status').setValue(statusValue)
											if('0'!=statusValue)
											{      
												me.onSetAdjustmentKeyReadOnly(true); //根据状态设置是否可以编辑
											}
										}
									},
									timeout: 100000000
								});
							}
                        }
                    });
                }
            }
        );  
        //调整完成后使能按钮
        Ext.getCmp('allAdjFst').enable();
        Ext.getCmp('allAdjSnd').enable();
        Ext.getCmp('detailAdj').enable();
	},
	
	 //从库存提取相关界面   
        creatTransactionWindowPanel: function(){
        var me = this;
        this.winformtran = Ext.create('Ext.window.Window',{
            title: '库存余量查询',
            height: 550,
            width: 1050,
            layout: 'border',
            border: false,
            items: [this.creatTransactionPanel()]
        });
        this.winformtran.on('close',function(){
            delete this.winformtran;
        },this);
        return this.winformtran;
    },
    
    creatTransactionPanel:function(){
        var me = this;
        this.Transactionpanle=Ext.create('Ext.panel.Panel',{
            region: 'center',
            layout: 'border',
            //height:360,
            border: false,
            items: [this.createTransactionForm(),this.creatTransactionGridPanel()]
        })
        
        return this.Transactionpanle;
    },
    
    //创建ASNForm
    createTransactionForm: function(){
        var me=this;
        this.Transactionform = Ext.create('Ext.form.Panel',{
    		region: 'north',
    		layout: 'vbox',
            height:170,
			autoScroll : true,
    		frame: true,
            
            //以下是每个item的公共属性
            defaults: {
                anchor: '100%',
                xtype: 'fieldcontainer',
                layout: 'hbox',
                defaultType: 'textfield',
                combineErrors: true,
                width:1000,
                defaults: {
					margins: '0 2 0 6'
                }
            },
    		items: [
                {
                    items: [
                        {
                            fieldLabel:'货主',
                            labelWidth:60,
                            name: 'storerKey',
                            value:'8080',
                            listeners:{
                                blur: function(txt){
                                    var storerValue=Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(storerValue);
                                } 
                            }                            
                        },
                        {
                            fieldLabel:'商品',
                            labelWidth:60,
                            name: 'sku',
                            listeners:{
                                blur: function(txt){
                                    var skuValue=Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(skuValue);
                                } 
                            }
                        },
                        {
                            fieldLabel:'库位',
                            labelWidth:60,
                            name:'loc',
                            listeners:{
                                blur: function(txt){
                                    var fromlocValue= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(fromlocValue);
                                }
                            }
                        },
                        {	
                            fieldLabel:'收货日期',
                            labelWidth:60,
                            width:191,
                            xtype:'datefield',
                            name: 'lottable01',
                            format:'Y-m-d'
                        },
                        {	
                            fieldLabel:'  --->',
                            labelWidth:60,
                            width:191,
                            xtype:'datefield',
                            name: 'tolottable01',
                            format:'Y-m-d'
                        }                    
                    ]
                },
                {
                    items: [
                        {	
                            fieldLabel:'生产日期',
                            labelWidth:60,
                            width:191,
                            xtype:'datefield',
                            name: 'lottable02',
                            format:'Y-m-d'
                        },
                        {	
                            fieldLabel:'  --->',
                            labelWidth:60,
                            width:191,
                            xtype:'datefield',
                            name: 'tolottable02',
                            format:'Y-m-d'
                        },                        
                        {	
                            fieldLabel:'失效日期',
                            labelWidth:60,
                            width:191,
                            xtype:'datefield',
                            name: 'lottable03',
                            format:'Y-m-d'
                        },
                        {	
                            fieldLabel:'  --->',
                            labelWidth:60,
                            width:191,
                            xtype:'datefield',
                            name: 'tolottable03',
                            format:'Y-m-d'
                        },
                        {	
                            fieldLabel:'生产批号',
                            labelWidth:60,
                            name: 'lottable04',
                            listeners:{
                                blur: function(txt){
                                    var lottable04Value= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(lottable04Value);
                                }
                            }
                        }    
                    ]
                },
                {
                    items: [
                        {	
                            fieldLabel:'托盘号',
                            labelWidth:60,
                            name: 'lottable05',
                            listeners:{
                                blur: function(txt){
                                    var lottable05Value= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(lottable05Value);
                                }
                            }                            
                        },
                        {
                            fieldLabel:'成品卷号',
                            labelWidth:60,
                            name: 'lottable06',
                            listeners:{
                                blur: function(txt){
                                    var lottable06Value= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(lottable06Value);
                                }
                            }                            
                        },
                        {
                            fieldLabel: '等级',
                            xtype:'codecombo',
                            labelWidth:60,
                            width:191,
                            codeType:'CYCLASS',
                            name: 'lottable07'
                        },                        
                        {
                            fieldLabel:'外观代码',
                            labelWidth:60,
                            name: 'lottable08',
                            listeners:{
                                blur: function(txt){
                                    var lottable08Value= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(lottable08Value);
                                    me.top.getForm().findField('lottable08Over').setValue(lottable08Value);
                                }
                            }                            
                        },{
                            fieldLabel:'批重量',
                            labelWidth:60,
                            name: 'lottable15',
                            listeners:{
                                blur: function(txt){
                                    var lottable15Value= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(lottable15Value);
                                }
                            }                            
                        }
                    ]
                },
                {
                    items: [
                        {
                            fieldLabel:'规格',
                            labelWidth:60,
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
                            fieldLabel:'包装形式',
                            labelWidth:60,
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
                            fieldLabel:'ASN号',
                            labelWidth:60,
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
                            fieldLabel:'反射率',
                            labelWidth:60,
                            name: 'lottable13',
                            listeners:{
                                blur: function(txt){
                                    var lottable13Value= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(lottable13Value);
                                }
                            }                            
                        },
                        {
                            fieldLabel:'极差',
                            labelWidth:60,
                            name: 'lottable14',
                            listeners:{
                                blur: function(txt){
                                    var lottable14Value= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(lottable14Value);
                                }
                            }                            
                        }                        
                    ]
                },
                {
                    items: [
                        {
                            fieldLabel: '表面处理',
                            xtype:'codecombo',
                            labelWidth:60,
                            width:230,
                            codeType:'CYSURFACE',
                            name: 'lottable09'
                        },
                        {
                            fieldLabel:'扣帐状态',
                            labelWidth:60,
                            name: 'lottable16',
                            listeners:{
                                blur: function(txt){
                                    var lottable16Value= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(lottable16Value);
                                }
                            }                            
                        },
                        {
                            fieldLabel:swmslot17,
                            labelWidth:60,
                            hidden:true,
                            name: 'lottable17',
                            listeners:{
                                blur: function(txt){
                                    var lottable17Value= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(lottable17Value);
                                }
                            }                            
                        },
                        {
                            fieldLabel:swmslot18,
                            labelWidth:60,
                            hidden:true,
                            name: 'lottable18',
                            listeners:{
                                blur: function(txt){
                                    var lottable18Value= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(lottable18Value);
                                }
                            }                            
                        },
                        {
                            boxLabel: '显示所有',
                            xtype: 'checkbox',
                            inputValue:1,
                            margin: '5 0 0 15',
                            name: 'showall'                
                        }                        
                    ]
                },
                {
                    items: [
                        {
                            fieldLabel:swmslot19,
                            labelWidth:60,
                            hidden:true,
                            name: 'lottable19',
                            listeners:{
                                blur: function(txt){
                                    var lottable19Value= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(lottable19Value);
                                }
                            }                            
                        },
                        {
                            fieldLabel:swmslot20,
                            labelWidth:60,
                            hidden:true,
                            name: 'lottable20',
                            listeners:{
                                blur: function(txt){
                                    var lottable20Value= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(lottable20Value);
                                }
                            }                            
                        }
                    ]
                }
			]
    	});
        return this.Transactionform;
    },

    creatTransactionGridPanel:function(){
        var me = this;
        this.Transactionpanle=Ext.create('Ext.panel.Panel',{
            region: 'center',
            layout: 'border',
            border: false,
            items: [this.createTransactionButton(),this.createTransactionGrid()]
        })
        return this.Transactionpanle;
    },
    
    createTransactionButton: function(){
        this.Transactionbutton = Ext.create('Ext.form.Panel',{
            region: 'north',
            frame: true,
            height:35,
            defaults: {
                xtype: 'button'
            },
            items: [
                {
                        iconCls: 'icon-search',
                        text: '查询',
                        handler: this.onTransactionSelect,      //从库存提取查询按钮
                        scope: this
                },
                {
                        iconCls: 'icon-reset',
                        text: '重置',
                        handler: this.onTransactionReset,       //从库存提取重置按钮，清空查询条件
                        scope: this
                },
                {
                        iconCls: 'icon-save',
                        text: '确定',
                        handler: this.onTransactionSubmit,      //从库存提取提交按钮
                        scope: this
                },
                {
                        iconCls: 'icon-reset',
                        text: '返回',
                        handler: this.onTransactionReturn,      //返回按钮
                        scope: this
                }                
            ]
        });
        return this.Transactionbutton;
    },
    
    //创建库存余量Grid
    createTransactionGrid: function(){
        this.Transactiongrid = Ext.create('widget.lligrid',{
            region: 'center',
            selModel:Ext.create('Ext.selection.CheckboxModel')
        });
        this.Transactiongrid.getStore().on('beforeload',function(store){         //初次加载前或查询时的设置
            var params = store.getProxy().extraParams;
            var values = this.Transactionform.getForm().getFieldValues();
            var storerKey = values.storerKey;
            var sku = values.sku;
            var loc = values.loc;
            var lottable01 = values.lottable01;
            var tolottable01 = values.tolottable01;
            var lottable02 = values.lottable02;
            var tolottable02 = values.tolottable02;
            var lottable03 = values.lottable03;
            var tolottable03 = values.tolottable03;
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
    		var lottable16 = values.lottable16;
    		var lottable17 = values.lottable17;
    		var lottable18 = values.lottable18;
    		var lottable19 = values.lottable19;
    		var lottable20 = values.lottable20;
            var showall = values.showall;

            delete params.storerKey;
            delete params.sku;
            delete params.loc;
            delete params.lottable01;
            delete params.tolottable01;
            delete params.lottable02;
            delete params.tolottable02;
            delete params.lottable03;
            delete params.tolottable03;
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
    		delete params.lottable16;
    		delete params.lottable17;
    		delete params.lottable18;
    		delete params.lottable19;
    		delete params.lottable20;
            delete params.showall;
            
            if(storerKey) params.storerKey = storerKey;
            if(sku) params.sku = sku;
            if(loc) params.loc = loc;
            if(lottable01) params.lottable01 = lottable01;
            if(tolottable01) params.tolottable01 = tolottable01;
            if(lottable02) params.lottable02 = lottable02;
            if(tolottable02) params.tolottable02 = tolottable02;
            if(lottable03) params.lottable03 = lottable03;
            if(tolottable03) params.tolottable03 = tolottable03;
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
            if(lottable16) params.lottable16 = lottable16;
            if(lottable17) params.lottable17 = lottable17;
            if(lottable18) params.lottable18 = lottable18;
            if(lottable19) params.lottable19 = lottable19;
            if(lottable20) params.lottable20 = lottable20;
            if(showall) params.showall = showall;
        },this);
        return this.Transactiongrid;
    },
      //从库存提取用到的按钮前台方法
    onTransactionSelect: function(){
        this.Transactiongrid.getStore().load();
    },
    
    //从ASN提取用到的按钮前台方法
    onTransactionReset: function(){
        this.Transactionform.getForm().reset();
    },
    
    onTransactionSubmit: function(){
        var me=this;
        var adjustmentKey=this.pt2topform.getForm().findField('adjustmentKey').getValue();
        var storerKey=this.pt2topform.getForm().findField('storerKey').getValue();
        var status=this.pt2topform.getForm().findField('status').getValue();
        var effectiveDate=Ext.util.Format.date(this.pt2topform.getForm().findField('addDate').getValue(),'Y-m-d H:i:s');
        var records = me.Transactiongrid.getSelectionModel().getSelection();
        if((records == ""))
        {
            MessageBox.error("错误提示","请选择要操作的数据！");
            return;
        } 
        if(""==storerKey)
        {
            MessageBox.error("错误提示","请先输入货主！");
            return;
        } 
        
        var ids = []; 
        Ext.Array.each(records, function(name, index, countriesItSelf) {
            ids.push(name.getData().id);
        });
        {
            var mask = new Ext.LoadMask(me.getEl(), { 
                msg : 'please wait...' 
            });
            mask.show(); 
            Ext.Ajax.request({
                url: basePath + '/inventory/importAdjustmentFromTransaction.action',
                params: {
                    ids: ids,
                    adjustmentKey: adjustmentKey,
                    storerKey: storerKey,
                    status:status,
                    effectiveDate:effectiveDate
                },
                success: function(response){
                    var text = Ext.decode(response.responseText);
                    var success = text.success;
                    console.log(success);
                    mask.hide();
                    MessageBox.show(success, text.json.msg);
                    if(true==success)
                    {
                        me.detailgrid.getStore().load();
                    }
                }
            });
        } 
    },
    onTransactionReturn: function(){
        var me=this;
        me.adjustmentgrid.getStore().load();
        me.winformtran.close();
        me.setActiveTab(0);
        me.detailgrid.getStore().load();
    }
	//以上是按钮相关的各种方法

});

Ext.onReady(function(){
	Ext.create('Ext.container.Viewport', {
	    layout: 'border',
	    items: [{
	    	xtype:'adjustmentmanager',
	    	region:'center'
	    }]
	});
});