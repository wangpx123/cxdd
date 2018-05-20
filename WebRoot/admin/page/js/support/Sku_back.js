/**************************************

商品表  sku.js
遗留问题
1）部分字段表中没有
2）查询时价格的判断
3）采购价格小数位的保存和显示
**************************************/

//商品存储数据结构
Ext.define('Sku', {
    extend: 'Ext.data.Model',
    fields: [
		{name:'id'},
		{name:'storerKey'},                                     
		{name:'sku'},                                   
		{name:'skuType'},                                 
		{name:'status'},       
		{name:'name'},
		{name:'descr'},                           
		{name:'manufacturerSku'},                             
		{name:'altSku'},                               
		{name:'retailSku'},                                
		{name:'leng'},                           
		{name:'width'},                           
		{name:'height'},   
		{name:'grossWeight'},   
		{name:'netWeight'},    
		{name:'tareWeight'},
		{name:'cost'},
		{name:'price'},    
		{name:'orderCost'},   
		{name:'carryCost'},                          
		{name:'packKey'},                       
		{name:'putCode'},  
		{name:'shippableContainer'}, 
		{name:'cartonGroup'},                         
		{name:'rotateby'},                          
		{name:'rotation'},                     
		{name:'abc'},                  
		{name:'putawayStrategyKey'},                 
		{name:'rotationStrategyKey'},                               
		{name:'preAllocationStrategyKey'},                                
		{name:'allocationStrategyKey'},                              
		{name:'replenishmentStrategyKey'},
		{name:'qualityStrategyKey'},                           
		{name:'rfPack'},   
		{name:'rfUom'},   
		{name:'lotKey'},    
		{name:'dateCodedays'},
		{name:'shelflifeIndicator'},
		{name:'shelflifeCodetype'},    
		{name:'shelflifeOnreceiving'},   
		{name:'shelflifeOnshipping'},                          
		{name:'shelflife'},                       
		{name:'lastCyclecount',type:'date',dateFormat : 'Y-m-d H:i:s.u'},  
		{name:'reorderPoint'}, 
		{name:'maxPoint'},                         
		{name:'reorderQty'},                          
		{name:'putawayLoc'},                     
		{name:'skuGroup1'},                  
		{name:'skuGroup2'},                 
		{name:'hscode'},                               
		{name:'vendor1'},                                
		{name:'vendor2'},                              
		{name:'hazmatCode'},
		{name:'tariffKey'},                           
		{name:'putawayZone'},   
		{name:'transportationMode'},   
		{name:'freightClass'},    
		{name:'cycleClass'},
		{name:'receiptHoldcode'},
		{name:'onreceiptCopypackKey'},    
		{name:'flowThruItem'},   
		{name:'conveyable'},       
		{name:'userDefine1'},  
		{name:'userDefine2'}, 
		{name:'userDefine3'},                         
		{name:'userDefine4'},                          
		{name:'userDefine5'},                     
		{name:'userDefine6'},                  
		{name:'userDefine7'},                 
		{name:'userDefine8'},                               
		{name:'userDefine9'},                                
		{name:'userDefine10'},                              
		{name:'userDefine11'},
		{name:'userDefine12'},                           
		{name:'userDefine13'},   
		{name:'userDefine14'},   
		{name:'userDefine15'},    
		{name:'notes1'},
		{name:'notes2'},
		{name:'addDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},     
		{name:'addWho'}        
	],
    idProperty: 'id'
});

Ext.define('Redm.support.SkuGrid', {
    extend: 'Redm.BaseGrid',
    alias : 'widget.SkuGrid',
    loadMask: true,
    forceLayout:true,
    selModel: Ext.create('Ext.selection.CheckboxModel'),
    buildColumns: function(){
        this.columns = [
        	{ header: "货主", dataIndex: 'storerKey', width: 100, sortable: true},
		    { header: "商品", dataIndex: 'sku', width: 100, sortable: true},
		    { header: "商品类型", dataIndex: 'skuType', width: 100, sortable: true},
		    { header: "状态", dataIndex: 'status', width: 100, sortable: true,
                    renderer:this.rendererStatusFunc
            },
		    { header: "名称", dataIndex: 'name', width: 100, sortable: true},
		    { header: "描述", dataIndex: 'descr', width: 100, sortable: true},
		    { header: "制造商商品", dataIndex: 'manufacturerSku', width: 100, sortable: true},
		    { header: "快捷码", dataIndex: 'altSku', width: 100, sortable: true},
		    { header: "分销商商品", dataIndex: 'retailSku', width: 100, sortable: true},
		    { header: "长", dataIndex: 'leng', width: 100, sortable: true},
		    { header: "宽", dataIndex: 'width', width: 100, sortable: true},
		    { header: "高", dataIndex: 'height', width: 100, sortable: true},
		    { header: "毛重", dataIndex: 'grossWeight', width: 100, sortable: true},
		    { header: "净重", dataIndex: 'netWeight', width: 100, sortable: true},
		    { header: "皮重", dataIndex: 'tareWeight', width: 100, sortable: true},
		    { header: "采购价格", dataIndex: 'cost', width: 100, sortable: true},
		    { header: "零售价", dataIndex: 'price', width: 100, sortable: true},
		    { header: "订购成本", dataIndex: 'orderCost', width: 100, sortable: true},
		    { header: "运输成本", dataIndex: 'carryCost', width: 100, sortable: true},
		    { header: "包装", dataIndex: 'packKey', width: 100, sortable: true},
		    { header: "上架代码", dataIndex: 'putCode', width: 100, sortable: true},
		    { header: "专箱", dataIndex: 'shippableContainer', width: 100, sortable: true},
		    { header: "箱组别", dataIndex: 'cartonGroup', width: 100, sortable: true},
		    { header: "用X循环", dataIndex: 'rotateby', width: 100, sortable: true},
		    { header: "循环方式", dataIndex: 'rotation', width: 100, sortable: true},
		    { header: "周转速度", dataIndex: 'abc', width: 100, sortable: true},
		    { header: "上架策略", dataIndex: 'putawayStrategyKey', width: 100, sortable: true},
		    { header: "周转策略", dataIndex: 'rotationStrategyKey', width: 100, sortable: true},
		    { header: "预分配策略", dataIndex: 'preAllocationStrategyKey', width: 100, sortable: true},
		    { header: "分配策略", dataIndex: 'allocationStrategyKey', width: 100, sortable: true},
		    { header: "补货策略", dataIndex: 'replenishmentStrategyKey', width: 100, sortable: true},
		    { header: "质检策略", dataIndex: 'qualityStrategyKey', width: 100, sortable: true},
		    { header: "RF默认收货包装", dataIndex: 'rfPack', width: 100, sortable: true},
		    { header: "RF默认收货单位", dataIndex: 'rfUom', width: 100, sortable: true},
		    { header: "批校验", dataIndex: 'lotKey', width: 100, sortable: true},
		    { header: "上次循盘时间", dataIndex: 'lastCyclecount', width: 120, sortable: true,editor:{xtype:'textfield',format:'Y-m-d H:i:s.u'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i')},
		    { header: "时间限", dataIndex: 'dateCodedays', width: 100, sortable: true},
		    { header: "保质期控制", dataIndex: 'shelflifeIndicator', width: 100, sortable: true},
		    { header: "保质期类型", dataIndex: 'shelflifeCodetype', width: 100, sortable: true},
		    { header: "入库保质期值", dataIndex: 'shelflifeOnreceiving', width: 100, sortable: true},
		    { header: "入库保质期值", dataIndex: 'shelflifeOnshipping', width: 100, sortable: true},
		    { header: "保质期值", dataIndex: 'shelflife', width: 100, sortable: true},
		    { header: "再订购点", dataIndex: 'reorderPoint', width: 100, sortable: true},
		    { header: "最大库存", dataIndex: 'maxPoint', width: 100, sortable: true},
		    { header: "再订购数", dataIndex: 'reorderQty', width: 100, sortable: true},
		    { header: "商品组1", dataIndex: 'skuGroup1', width: 100, sortable: true},
		    { header: "商品组2", dataIndex: 'skuGroup2', width: 100, sortable: true},
		    { header: "HS编码", dataIndex: 'hscode', width: 100, sortable: true},
		    { header: "上架区域", dataIndex: 'putawayZone', width: 100, sortable: true},
		    { header: "上架库位", dataIndex: 'putawayLoc', width: 100, sortable: true},
		    { header: "指定供应商1", dataIndex: 'vendor1', width: 100, sortable: true},
		    { header: "指定供应商2", dataIndex: 'vendor2', width: 100, sortable: true},
		    { header: "危险品代码", dataIndex: 'hazmatCode', width: 100, sortable: true},
		    { header: "费率代码", dataIndex: 'tariffKey', width: 100, sortable: true},
		    { header: "运输方式", dataIndex: 'transportationMode', width: 100, sortable: true},
		    { header: "特殊运输等级", dataIndex: 'freightClass', width: 100, sortable: true},
		    { header: "循环盘点级别", dataIndex: 'cycleClass', width: 100, sortable: true},
		    { header: "收货冻结代码", dataIndex: 'receiptHoldcode', width: 100, sortable: true},
		    { header: "包装拷贝到批属性01", dataIndex: 'onreceiptCopypackKey', width: 100, sortable: true},
		    { header: "FLOWTHRUITEM", dataIndex: 'flowThruItem', width: 100, sortable: true},
		    { header: "可搬运", dataIndex: 'conveyable', width: 100, sortable: true},
		    { header: "自定义1", dataIndex: 'userDefine1', width: 100, sortable: true},
		    { header: "自定义2", dataIndex: 'userDefine2', width: 100, sortable: true},
		    { header: "自定义3", dataIndex: 'userDefine3', width: 100, sortable: true},
		    { header: "自定义4", dataIndex: 'userDefine4', width: 100, sortable: true},
		    { header: "自定义5", dataIndex: 'userDefine5', width: 100, sortable: true},
		    { header: "自定义6", dataIndex: 'userDefine6', width: 100, sortable: true},
		    { header: "自定义7", dataIndex: 'userDefine7', width: 100, sortable: true},
		    { header: "自定义8", dataIndex: 'userDefine8', width: 100, sortable: true},
		    { header: "自定义9", dataIndex: 'userDefine9', width: 100, sortable: true},
		    { header: "自定义10", dataIndex: 'userDefine10', width: 100, sortable: true},
		    { header: "自定义11", dataIndex: 'userDefine11', width: 100, sortable: true},
		    { header: "自定义12", dataIndex: 'userDefine12', width: 100, sortable: true},
		    { header: "自定义13", dataIndex: 'userDefine13', width: 100, sortable: true},
		    { header: "自定义14", dataIndex: 'userDefine14', width: 100, sortable: true},
		    { header: "自定义15", dataIndex: 'userDefine15', width: 100, sortable: true},
		    { header: "备注", dataIndex: 'notes1', width: 100, sortable: true},
		    { header: "拣货指示", dataIndex: 'notes2', width: 100, sortable: true},
			{ header: "创建时间", dataIndex: 'addDate', width: 140, sortable: true,renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s'),hidden:true},
			{ header: "创建人", dataIndex: 'addWho', width: 140, sortable: true,hidden:true}             
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
    	this.buildStore(basePath + '/support/doQuerySkus.action','Sku',20);
/*    	this.on('itemcontextmenu',function(view,record,item,index,e,eOpts){ 
            //禁用的右键相应事件 
            e.preventDefault(); 
            e.stopEvent(); 
             
            var menu = new Ext.menu.Menu({ 
                //控制右键菜单位置 
                float:true, 
                 items:[{ 
                        text:"创建", 
                        iconCls:'leaf', 
                        handler:function(){
                        	//当点击时隐藏右键菜单 
                            this.up("menu").hide(); 
                            me.onCreate();
                        } 
                    },{ 
                        text:"删除", 
                        iconCls:'leaf', 
                        handler:function(){ 
                        	//当点击时隐藏右键菜单 
                            this.up("menu").hide(); 
                            me.onDelete();
                        } 
                    } 
                 ] 
            }).showAt(e.getXY());//让右键菜单跟随鼠标位置 
        },this);*/
        //屏蔽浏览器右键事件
/*        this.on('render',function(p){
        	 p.getEl().on("contextmenu",function(e){
            	e.preventDefault();
            },this)
        },this);*/
        this.callParent(arguments);
    },
    rendererStatusFunc:function(value)
        {
            var retValue;
            if(value=='0') retValue='可用';
            else if(value=='1') retValue='禁用';
            else  retValue=value;
            return retValue;
        }      
    
/*    onCreate: function(){
    	var fatherPanel = this.ownerCt.ownerCt.ownerCt;
    	fatherPanel.onCreate();
    },
    onDelete: function(){
    	var fatherPanel = this.ownerCt.ownerCt.ownerCt;
    	fatherPanel.onDelete();
    }*/
});

Ext.define('Redm.support.Sku', {	
	extend: 'Ext.panel.Panel',
    alias : 'widget.SkuManager',
    title:'商品',
    layout: 'border',
    initComponent: function(){
    	var me = this;
/*    	this.tbar = {
	        plugins: new Ext.ux.ToolbarKeyMap(),
	        hidden: true,
	        scope: this,
	        items: [
	        	{
	            text: '快捷键',
	            menu: {
	                items: [{
	                    text: '保存 ',
	                    scope: this,
	                    keyBinding: {
	                        key: 's',
	                        ctrl: true
	                    },
	                    handler: this.saveSku
	                }, {
	                    text: '创建',
	                    scope: this,
	                    keyBinding: {
	                        key: 'a',
	                        ctrl: true
	                    },
	                    handler: me.onCreate
	                }]
	            }
	        }]
	    };*/
	    //当前页面销毁时，同时销毁弹出的window
	    this.on('destroy',function(){
	    	if(this.winform){
	    		this.winform.close();
	    		delete this.winform;
	    	}
	    },this);
//	    this.buildContextMenu();
    	this.items = [this.createRightPanel()/*,this.createSkuTypePanel()*/];   //暂时先隐藏tree，后续再开发支持
        this.callParent(arguments);
    },
/*    buildContextMenu:function(){
    	var me = this;
    	this.createAction = Ext.create('Ext.Action', {
			text : "创建" ,
			iconCls: 'icon-create',
			handler: me.onCreate,
			scope : this
		});
    	this.saveAction = Ext.create('Ext.Action', {
			text : "保存" ,
			iconCls: 'icon-save',
			handler: me.saveSku,
			scope : this
		});
    	this.searchAction = Ext.create('Ext.Action', {
			text : "查询" ,
			iconCls : "icon-search",
			handler: me.onSelect,
			scope : this
		});
		this.resetAction = Ext.create('Ext.Action', {
			text : "重置",
			iconCls : "icon-reset",
			handler: me.onReset,
			scope : this
		});
    },*/
    
    onCreate: function(){
    	this.basicForm.getForm().reset();
		this.customerForm.getForm().reset();
		this.clForm.getForm().reset();
		this.otherForm.getForm().reset();
        //创建时设置可以读写
        this.basicForm.getForm().findField('storerKey').setReadOnly(false);
        
    },
    
    onSelect: function(){
    	this.gridPanel.getStore().load();
    },
    
    onReset: function(){
    	this.selform.getForm().reset();
    },
    
    
    //删除多条记录
    onMultiDelete: function(){
    	var me = this;
    	var records = me.gridPanel.getSelectionModel().getSelection(); 
    	if(records == ""){
    		MessageBox.error('错误提示','请选择删除的数据！');
    		return;
    	}
        
		var ids = []; 
		Ext.Array.each(records, function(name, index, countriesItSelf) {
			ids.push(name.getData().id);
		});
    		Ext.MessageBox.confirm('询问提示', '确定要删除所选信息吗？', 
				function(btn){
					if(btn == 'yes'){
						var record = records[0].getData();
                        console.log(record.id);
			        	Ext.Ajax.request({
						    url: basePath + '/support/doMultiDeleteSku.action',
						    params: {
						    	ids:ids,
						    },
						    success: function(response){
						        var text = Ext.decode(response.responseText);
						        var success = text.success;
						        MessageBox.show(success, text.json.msg);
						        me.gridPanel.getStore().load();
			        			me.basicForm.getForm().reset();
			    				me.customerForm.getForm().reset();
			    				me.clForm.getForm().reset();
			    				me.otherForm.getForm().reset();
						    }
						});
					}
				}
	    	);   
    },
    
/*	createContextMenu:function(e){
    	if(!this.formContextMenu){
			this.formContextMenu = Ext.create('Ext.menu.Menu', {
				items: [
					this.createAction,
					this.saveAction,
					this.searchAction,
					this.resetAction
				]
			});
    	}
		e.preventDefault();
		this.formContextMenu.showAt(e.getXY());
    },*/
    
    createRightPanel: function(){
    	this.rightpanel = Ext.create('Ext.panel.Panel',{
    		region: 'center',
    		layout: 'border',
    		border: false,
    		items:[this.createTopPanel(),this.createBottomPanel()]
    	});
    	return this.rightpanel;
    },
    
    createTopPanel: function(){
    	var me = this;
    	this.toppanel = Ext.create('Ext.panel.Panel',{
    		region: 'north',
    		height: 80,
    		layout: 'border',
    		border: false,
/*    		listeners:{
	            render:function(p){
	                p.getEl().on("contextmenu",function(e){
	                	me.createContextMenu(e);
	                },me)
	            }
            },*/
    		items: [this.createBtnForm(),this.createSelForm()]
    	});
    	return this.toppanel;
    },
    
    createBtnForm: function(){
    	var me = this;
    	this.btnform = Ext.create('Ext.form.Panel',{
    		region: 'center',
    		frame: true,
    		border: false,
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
                    itemId: 'delete',
                    text: '删除',
                    disabled:true,
                    handler: me.onMultiDelete,
                    scope: this
                },
                {
                    iconCls: 'icon-save',
                    itemId: 'save',
                    text: '保存',
                    handler: me.saveSku,
                    scope: this
                },
                {
                    iconCls: 'icon-save',
                    text: '批更新',
                    handler: function(){
                        me.createWinFrom();
                        me.winform.show();
                    },
                    scope: this
                },
                {
                    iconCls: 'icon-upload',
                    text: '导入',
					handler: function(){
                        me.createForm();
                        me.winform.show();
                    },
                    scope: this
                }
            ]
    	});
    	return this.btnform;
    },
    
    
    createWinFrom: function(){
    	var me = this;
    	this.winform = Ext.create('Ext.window.Window',{
	    	title: '批修改',
		    height: 470,
		    width: 680,
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
                        width: 150
                    },
                    items: [
                        {
                            fieldLabel: '商品组1',
                            itemId: 'skuGroup1', 
                            name: 'skuGroup1'
                        },
                        {
                            fieldLabel: '商品组2',
                            itemId: 'skuGroup2', 
                            name: 'skuGroup2'
                        },
                        {
                            fieldLabel: '商品组3'  
                        },
                        {
                            fieldLabel: '商品组4'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        margin: '0 0 0 10',
                        labelWidth: 60,
                        width: 150,
                        xtype: 'textfield'
                    },
                    items: [
                        {
                            fieldLabel: '商品组5'
                        },
                        {
                            fieldLabel: '商品组6'
                        },
                        {
                            fieldLabel: '商品组7'
                        },
                        {
                            fieldLabel: '商品组8'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        margin: '0 0 0 10',
                        labelWidth: 60,
                        width: 150,
                        xtype: 'textfield'
                    },
                    items: [
                        {
                            fieldLabel: '商品组9'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        margin: '0 0 0 10',
                        labelWidth: 60,
                        width: 150,
                        xtype: 'textfield'
                    },
                    items: [
                        {
                            fieldLabel: '自定义1',
                            itemId: 'userDefine1', 
                            name: 'userDefine1'
                        },
                        {
                            fieldLabel: '自定义2',
                            itemId: 'userDefine2', 
                            name: 'userDefine2'
                        },
                        {
                            fieldLabel: '自定义3',
                            itemId: 'userDefine3', 
                            name: 'userDefine3'
                        },
                        {
                            fieldLabel: '自定义4',
                            itemId: 'userDefine4', 
                            name: 'userDefine14'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        margin: '0 0 0 10',
                        labelWidth: 60,
                        width: 150,
                        xtype: 'textfield'
                    },
                    items: [
                        {
                            fieldLabel: '自定义5',
                            itemId: 'userDefine5', 
                            name: 'userDefine5'
                        },
                        {
                            fieldLabel: '自定义6',
                            itemId: 'userDefine6', 
                            name: 'userDefine6'
                        },
                        {
                            fieldLabel: '自定义7',
                            itemId: 'userDefine7', 
                            name: 'userDefine7'
                        },
                        {
                            fieldLabel: '自定义8',
                            itemId: 'userDefine8', 
                            name: 'userDefine8'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        margin: '0 0 0 10',
                        labelWidth: 60,
                        width: 150,
                        xtype: 'textfield'
                    },
                    items: [
                        {
                            fieldLabel: '自定义9',
                            itemId: 'userDefine9', 
                            name: 'userDefine9'
                        },
                        {
                            fieldLabel: '自定义10',
                            itemId: 'userDefine10', 
                            name: 'userDefine10'
                        },
                        {
                            fieldLabel: '自定义11',
                            itemId: 'userDefine11', 
                            name: 'userDefine11'
                        },
                        {
                            fieldLabel: '自定义12',
                            itemId: 'userDefine12', 
                            name: 'userDefine12'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        margin: '0 0 0 10',
                        labelWidth: 60,
                        width: 150,
                        xtype: 'textfield'
                    },
                    items: [
                        {
                            fieldLabel: '自定义13',
                            itemId: 'userDefine13', 
                            name: 'userDefine13'
                        },
                        {
                            fieldLabel: '自定义14',
                            itemId: 'userDefine14', 
                            name: 'userDefine14'
                        },
                        {
                            fieldLabel: '自定义15',
                            itemId: 'userDefine15', 
                            name: 'userDefine15'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        margin: '0 0 0 10',
                        labelWidth: 60,
                        width: 150,
                        xtype: 'textfield'
                    },
                    items: [
                        {
                            fieldLabel: '装箱组',
                            xtype: 'combobox',
                            itemId: 'cartonGroup', 
                            name: 'cartonGroup'
                        },
                        {
                            fieldLabel: '包装代码'
                        },
                        {
                            fieldLabel: '批次属性'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        margin: '0 0 0 10',
                        labelWidth: 60,
                        width: 150,
                        xtype: 'textfield'
                    },
                    items: [
                        {
                            fieldLabel: '库位指定规则'
                        },
                        {
                            fieldLabel: '上架规则',
                            name: 'putawayStrategyKey',
                            itemId: 'putawayStrategyKey', 
                            xtype: 'putawaystrategycombo'
                        },
                        {
                            fieldLabel: '上架库区'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        margin: '0 0 0 10',
                        labelWidth: 60,
                        width: 150,
                        xtype: 'textfield'
                    },
                    items: [
                        {
                            fieldLabel: '质检规则',
                            itemId: 'qualityStrategyKey', 
                            name: 'qualityStrategyKey'
                        },
                        {
                            fieldLabel: '库存周转规矩',
                            itemId: 'rotationStrategyKey', 
                            name: 'rotationStrategyKey',
                            xtype: 'rotationstrategycombo'
                        },
                        {
                            fieldLabel: '预配规则',
                            name: 'preAllocationStrategyKey',
                            itemId: 'preAllocationStrategyKey', 
                            xtype: 'rotationstrategycombo'
                        },
                        {
                            fieldLabel: '分配规则',
                            name: 'allocationStrategyKey',
                            itemId: 'allocationStrategyKey', 
                            xtype: 'allocationstrategycombo'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        margin: '0 0 0 10',
                        labelWidth: 60,
                        width: 150,
                        xtype: 'textfield'
                    },
                    items: [
                        {
                            fieldLabel: '补货规则',
                            name: 'replenishmentStrategyKey',
                            itemId: 'replenishmentStrategyKey', 
                            xtype: 'replenishmentstrategycombo'
                        },
                        {
                            fieldLabel: '费率代码'
                        },
                        {
                            fieldLabel: '循环级别'
                        },
                        {
                            fieldLabel: '危险品标识'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        margin: '0 0 0 10',
                        labelWidth: 60,
                        width: 150,
                        xtype: 'textfield'
                    },
                    items: [
                        {
                            fieldLabel: '货物类型'
                        },
                        {
                            fieldLabel: 'HS编码'
                        },
                        {
                            fieldLabel: '缺省收货单位'
                        },
                        {
                            fieldLabel: '缺省发货单位'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        margin: '0 0 0 10',
                        labelWidth: 60,
                        width: 150,
                        xtype: 'textfield'
                    },
                    items: [
                        {
                            fieldLabel: '复制包装到批次12'
                        },
                        {
                            fieldLabel: '超额收货百分比'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 60,
                        width : 80,
                        margin: '0 0 0 20',
                        xtype: 'button'
                    },
                    items: [
                        {
                            text: '确定',
                            handler: me.updateAllSku,
                            scope: this,
                            margin: '0 0 0 250'
                        },
                        {
                            text: '取消',
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
    
    createSelForm: function(){
    	var me = this;
    	this.selform = Ext.create('Ext.form.Panel',{
    		region: 'north',
    		height: 50,
    		frame: true,
    		border: false,
    		layout: 'hbox',
    		defaults: {
    			xtype: 'textfield',
    			margin: '5 0 0 5' 
    		},
    		items:[
                {
                    width: 140,
                    labelWidth: 40,
                    name:'storerKey',
                    fieldLabel:'货主',
                    listeners: {
                        blur:function(txt){
                          txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                        }
                    }                        
                },
                {
                    xtype: 'textfield',
                    width: 140,
                    labelWidth: 40,
                    name: 'sku',
                    fieldLabel: '商品',
                    listeners: {
                        blur:function(txt){
                          txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                        }
                    }                        
                },
                {
                    xtype: 'textfield',
                    width: 140,
                    labelWidth: 40,
                    name: 'descr',
                    fieldLabel: '描述'
                },
                {
                    fieldLabel: '包装',
                    xtype:'textfield',
                    name: 'packKey',
                    listeners: {   //选中包装后,
                        blur: function(txt){
                            packKeyValue=Ext.util.Format.uppercase(txt.getValue());
                            txt.setValue(packKeyValue); 
                            if(''!=packKeyValue)
                            {
                                Ext.Ajax.request({
                                    url: basePath + '/support/doCheckPack.action',
                                    params: {
                                        packKey:packKeyValue
                                    },
                                    success: function(response){ 
                                        var text = Ext.decode(response.responseText);
                                        var success = text.success;
                                        if(0 == text.json.data.length)
                                        {
                                             MessageBox.show(false, '包装不存在');
                                             me.selform.getForm().findField('packKey').setValue('');                                                         
                           
                                        }
                                    }
                                })
                            }
                        }
                    },
                    allowBlank: false, 
                    labelWidth: 40,
                    width: 140
                },
                {
                    xtype: 'combobox',
                    name: 'eqType',
                    width: 120,
                    labelWidth: 40,
                    fieldLabel: '价格',
                    store: [
                        ['>','大于'],
                        ['<','小于 '],
                        ['=','等于'],
                        ['>=','大于等于'],
                        ['<=','小于等于']
                    ],
                    value: '>'
                },
                {
                    xtype: 'numberfield',
                    width: 100,
                    labelWidth: 35,
                    name: 'price',
                    minValue:0,
                    fieldLabel: ''
                },
                {
                    xtype: 'button',
                    iconCls: 'icon-search',
                    handler: me.onSelect,
                    scope: this,
                    text: '查询'
                },
                {
                    xtype: 'button',
                    handler: me.onReset,
                    scope: this,
                    iconCls: 'icon-reset',
                    text: '重置'
                }
            ]
    	});
    	return this.selform;
    },
    
    
    createBottomPanel: function(){
    	this.bottompanel = Ext.create('Ext.panel.Panel',{
    		region: 'center',
    		layout: 'border',
    		border: false,
    		items:[this.createGridPanel(),this.createTabPanel()]
    	});
    	return this.bottompanel;
    },
    
    
    createGridPanel:function(){
    	var me = this;
    	this.gridPanel = Ext.create('widget.SkuGrid',{
			region: 'center',
			listeners: {
    			itemclick: function(grid,record){
    				me.basicForm.getForm().loadRecord(record);
    				me.customerForm.getForm().loadRecord(record);
    				me.clForm.getForm().loadRecord(record);
    				me.otherForm.getForm().loadRecord(record);
                    me.basicForm.getForm().findField('storerKey').setReadOnly(true);
    			}
    		}
		});
		this.gridPanel.getStore().on('beforeload',function(){
    		var params = this.gridPanel.getStore().getProxy().extraParams;
    		var record = me.selform.getForm().getValues();
    		
    		var storerKey = record.storerKey;
    		var sku = record.sku;
    		var descr = record.descr;
    		var packKey = record.packKey;
    		
			delete params.storerKey;
			delete params.sku;
			delete params.descr;
			delete params.packKey;
    		
			if(storerKey) params.storerKey = storerKey;
         	if(sku) params.sku = sku;
         	if(descr) params.descr = descr;
         	if(packKey) params.packKey = packKey;
    	},this);
		return this.gridPanel;
    },
    onShowTab: function(record){
    	var me = this;
    	var form = me.basicForm.getForm();
    	if(me.tabPanel){
    		if(record != null){
    			form.loadRecord(record);
    		}else{
	    		form.reset();    
	    		me.tabPanel.show();
    		}
    	}  	    
    },
    
    createTabPanel:function(){
    	var me = this;
    	this.tabPanel = Ext.create('widget.tabpanel',{
    		region:'east',//south
    		collapsible: true,
    		border: false,
    		width:450,
			xtype:'tabpanel',
			layout: 'fit',
			split: true,
			tabPosition: 'bottom',
			items:[this.createBasicForm(),this.createCustomerForm(),this.createCLForm(),this.createOtherForm()],
			listeners: {
				tabchange: function(tp,newCard){
					var id = me.basicForm.getForm().findField('id').getValue();
					if(id == ''){
					}else{
					}
				}
			}
    	});
    	return this.tabPanel;
    },
    
    createSkuTypePanel: function(){
    	var me = this;
    	this.skutypepanel = Ext.create('widget.typetree',{
    		region: 'west',
			width: 200
    	});
    	return this.skutypepanel;
    },
    
    createBasicForm: function(){
    	var me = this;
    	this.basicForm = Ext.create('Ext.form.Panel',{
			xtype:'form',
			frame: true,
   			headerPosition: 'bottom',
			title:'基本信息',
			autoScroll : true,
			border:false,
			itemId: 'basicForm',
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
                        flex: 1,
                        labelAlign: 'top',
                        margin: '5 10 0 5',
                        xtype: 'textfield'
                    },
                    items: [
                        {
                            fieldLabel: '货主',
                            xtype: 'storer2combo',   //专用combo，只能查货主类型的记录
                            allowBlank: false,
                            name: 'storerKey',
                            listeners:{
                                blur: function(txt){
                                    //输入参数，鼠标离开后见检查该商品是否存在
                                    storerKeyValue=txt.getValue();
                                    skuValue= me.basicForm.getForm().findField('sku').getValue('');
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
                                                
                                                if(0!=text.json.data.length)
                                                {
                                                    MessageBox.show(false, '记录重复，请重新输入');   
                                                    me.basicForm.getForm().findField('sku').setValue('');
                                                }
                                            }
                                      
                                        });
                                    }
                                    
                                } 
                            }                                
                        },
                        {
                            fieldLabel:'状态',
                            name: 'status',
                            xtype:'codecombo',
                            codeType:'SKUSTATUS',
                            value:'0'   //初始值是可用
                        //    allowBlank: false   //暂时不用，取消限制
                        },                        
                        {
                            fieldLabel: '商品类型',
                            name: 'skuType',
                            //xtype: 'textfield'
                            allowBlank: false,    
                            xtype: 'combobox',
                            displayField: 'text',
                            valueField: 'value',
                            store:Ext.create('Ext.data.Store', 
                                {
                                    fields: ['text','value'],
                                    data: [{text:'STD',value:'STD'}]
                                    }
                                ),
                            value: 'STD',
                            forceSelection: true                            
                        },
                        {
                            name : 'id',
                            hidden: true
                        },
                        {
                            xtype:'datefield',
                            format:'Y-m-d H:i:s',
                            name: 'addDate',
                            hidden: true
                        },
                        {
                            xtype: 'textfield',
                            name: 'addWho',
                            hidden: true
                        }                        
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 80,
                        flex: 1,
                        labelAlign: 'top',
                        margin: '0 10 0 5',
                        xtype: 'textfield'
                    },
                    items: [
                        {
                            fieldLabel: '商品',
                            allowBlank: false,
                            name: 'sku',
                            listeners:{
                                blur: function(txt){
                                    //输入参数，鼠标离开后见检查该商品是否存在
                                    skuValue= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(skuValue);
                                    storerKeyValue= me.basicForm.getForm().findField('storerKey').getValue('');
                                    
                                    if(''==storerKeyValue)   //如果货主没有输入，提示，请先输入货主，确认后清空sku
                                    {
                                         MessageBox.show(false, '请先输入货主');
                                         me.basicForm.getForm().findField('sku').setValue('');
                                    }
                                    else  //如果输入了货主，在检测是否货主+商品唯一
                                    {
                                        Ext.Ajax.request({
                                            url: basePath + '/support/doValidateSkus.action',   //用true or false判断有误，后续再查，改用长度判断
                                            //url: basePath + '/support/doCheckSku.action',
                                            params: {
                                                sku:skuValue,
                                                storerKey:storerKeyValue
                                            },
                                            success: function(response){
                                                var text = Ext.decode(response.responseText);
                                                var status = text.success;
                                                
                                                if(0!=text.json.data.length)
                                                {
                                                    MessageBox.show(false, '记录重复，请重新输入');   
                                                    me.basicForm.getForm().findField('sku').setValue('');
                                                }
                                            }
                                      
                                        });
                                    }
                                    
                                }
                            }                            
                        },
                        {
                            fieldLabel: '快捷码',
                            name: 'altSku'
                        },                        
                        {
                            fieldLabel:'制造商商品',
                            name: 'manufacturerSku'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 80,
                        flex: 1,
                        labelAlign: 'top',
                        margin: '0 10 0 5',
                        xtype: 'textfield'
                    },
                    items: [
                        {
                            fieldLabel: '名称',
                            name: 'name',
                            flex: 2,
                            allowBlank: false
                        },
                        {
                            fieldLabel: '分销商商品',
                            flex: 1,
                            name: 'retailSku'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 80,
                        flex: 1,
                        labelAlign: 'top',
                        margin: '0 10 0 5',
                        minValue:0,
                        xtype: 'textfield'
                    },
                    items: [
                        {
                            fieldLabel: '英文名称',
                            flex: 2,
                            name: 'descr'
                        },
                        {
                            fieldLabel: '上架代码',
                            name: 'putCode',
                            codeType: 'PUTCODE',
                            xtype: 'codecombo'
                        }
                    ]
                },     
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 80,
                        flex: 1,
                        labelAlign: 'top',
                        margin: '0 10 0 5',
                        xtype: 'textfield'
                    },
                    items: [

                        {
                            fieldLabel: '包装',
                            xtype:'textfield',
                            name: 'packKey',
                            listeners: {   //选中包装后,
                                blur: function(txt){
                                    packKeyValue= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(packKeyValue);
                                    if(''!=packKeyValue)
                                    {
                                        Ext.Ajax.request({
                                            url: basePath + '/support/doCheckPack.action',
                                            params: {
                                                packKey:packKeyValue
                                            },
                                            success: function(response){ 
                                                var text = Ext.decode(response.responseText);
                                                var success = text.success;
                                                if(0 == text.json.data.length)
                                                {
                                                     MessageBox.show(false, '包装不存在');
                                                     me.basicForm.getForm().findField('packKey').setValue('');                                                         
                                   
                                                }
                                            }
                                        })
                                    }
                                }
                            },
                            allowBlank: false,   
                            value:'STD',
                            width: 160
                        },
                        {
                            fieldLabel: '专箱 ',
                            name: 'shippableContainer',
                            codeType: 'YESNO',
                            xtype: 'codecombo',
                            value:'2'    //对应数据字典 否
                        },
                        {
                            fieldLabel: '箱组别',
                            xtype: 'cartoncombo',
                            allowBlank: false,
                            name: 'cartonGroup',
                            value:'MEDIUM'
                        },                        

                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 80,
                        flex: 1,
                        labelAlign: 'top',
                        margin: '0 10 0 5',
                        xtype: 'combobox'
                    },
                    items: [
                        {
                            fieldLabel: '用X循环',
                            name: 'rotateby',
                            codeType: 'ROTATEBY',
                            allowBlank: false,
                            xtype: 'codecombo',
                            value:'LOT'      //默认值是批号
                        },                    
                        {
                            fieldLabel: '循环方式',
                            name: 'rotation',
                            codeType: 'ROTATION',
                            allowBlank: false,
                            xtype: 'codecombo',
                            value:'FIFO'    //默认值是先进先出
                        },
                        {
                            fieldLabel: '周转速度',
                            name: 'abc',
                            codeType: 'SKUABC',
                            allowBlank: false,
                            xtype: 'codecombo',
                            value:'2'      //默认值是中速
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 80,
                        flex: 1,
                        labelAlign: 'top',
                        margin: '0 10 0 5',
                        xtype: 'textfield'
                    },
                    items: [

                        {
                            fieldLabel: '商品组1',
                            name: 'skuGroup1'
                        },
                        {
                            fieldLabel: '商品组2',
                            name: 'skuGroup2'
                        },
                        {
                            fieldLabel: '费率代码',
                            name: 'tariffKey'
                        }
                    ]
                }, 
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 90,
                        flex: 1,
                        labelAlign: 'top',
                        margin: '2 0 0 10',
                        xtype: 'combobox'
                    },
                    items: [
                        {
                            fieldLabel: 'RF默认收货包装',
                            name: 'rfPack',
                            xtype: 'packcombo'
                        },
                        {
                            fieldLabel: 'RF默认收货单位',
                            name: 'rfUom',
                            xtype: 'codecombo',
                            codeType: 'RFUOM'
                        },
                        {
                            fieldLabel: '收货冻结代码',
                            name: 'receiptHoldcode',
                            xtype: 'codecombo',
                            codeType: 'HOLDCODE'
                        }                        
                    ]
                
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 80,
                        flex: 1,
                        labelAlign: 'top',
                        margin: '0 10 0 5',
                        minValue:0,
                        xtype: 'numberfield'
                    },
                    items: [
                        {
                            fieldLabel: '长',
                            name: 'leng'
                        },
                        {
                            fieldLabel: '宽',
                            name: 'width'
                        },
                        {
                            fieldLabel: '高',
                            name: 'height'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 80,
                        flex: 1,
                        labelAlign: 'top',
                        margin: '0 10 0 5',
                        minValue:0,
                        xtype: 'numberfield'
                    },
                    items: [
                        {
                            fieldLabel: '毛重',
                            name: 'grossWeight'
                        },
                        {
                            fieldLabel: '净重',
                            name: 'netWeight'
                        },
                        {
                            fieldLabel: '皮重',
                            name: 'tareWeight'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 80,
                        flex: 1,
                        labelAlign: 'top',
                        margin: '0 10 0 5',
                        xtype: 'textfield'
                    },
                    items: [
                        {
                            fieldLabel: '再订购点',
                            xtype: 'numberfield',
                            name: 'reorderPoint'
                        },
                        {
                            fieldLabel: '再订购数',
                            xtype: 'numberfield',
                            minValue:0,
                            name: 'reorderQty'
                        },                        
                        {
                            fieldLabel: '采购价格',
                            name: 'cost'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 80,
                        flex: 1,
                        labelAlign: 'top',
                        margin: '0 10 0 5',
                        minValue:0,
                        xtype: 'numberfield'
                    },
                    items: [
                        {
                            fieldLabel:'零售价格',
                            name: 'price'
                        },
                        {
                            fieldLabel: '订购成本',
                            name: 'orderCost'
                        },
                        {
                            fieldLabel: '运输成本 ',
                            xtype: 'numberfield',
                            minValue:0,
                            name: 'carryCost'
                        }  
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 80,
                        flex: 1,
                        labelAlign: 'top',
                        margin: '0 10 0 5',
                        xtype: 'textfield'
                    },
                    items: [
                        {
                            fieldLabel: '再订购点',
                            xtype: 'numberfield',
                            name: 'reorderPoint'
                        },
                        {
                            fieldLabel: '再订购数',
                            xtype: 'numberfield',
                            minValue:0,
                            name: 'reorderQty'
                        },                        
                        {
                            fieldLabel: '采购价格',
                            name: 'cost'
                        }
                    ]
                }
            ]
    	});
    	return this.basicForm;
    },
    
    createCustomerForm: function(){
    	this.customerForm = Ext.create('Ext.form.Panel',{
			xtype:'form',
			frame:true,
			headerPosition: 'bottom',
			title:'配制信息',
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
                        flex: 1,
                        labelAlign: 'top',
                        margin: '5 0 0 10',
                        xtype: 'combobox'
                    },
                    items: [
                        {
                            fieldLabel: '上架库位',
//                            xtype: 'combobox',
                            xtype:'textfield',
                            name: 'putawayLoc'
                        },
                        {
                            fieldLabel: '上架区域',
                            name: 'putawayZone',
                            xtype: 'putawayzonecombo'
                        },
                        {
                            fieldLabel: '上架策略',
                            name: 'putawayStrategyKey',
                            allowBlank: false,
                            xtype: 'putawaystrategycombo',
                            value:'STD'
                        }                        
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 90,
                        flex: 1,
                        labelAlign: 'top',
                        margin: '2 0 0 10',
                        xtype: 'combobox'
                    },
                    items: [

                        {
                            fieldLabel: '周转策略',
                            name: 'rotationStrategyKey',
                            allowBlank: false,
                            xtype: 'rotationstrategycombo',
                            value:'STD'
                        },
                        {
                            fieldLabel: '预分配策略',
                            name: 'preAllocationStrategyKey',
                            allowBlank: false,
                            xtype: 'preallocatestrategycombo',
                            value:'STD'
                        },
                        {
                            fieldLabel: '分配策略',
                            name: 'allocationStrategyKey',
                            allowBlank: false,
                            xtype: 'allocationstrategycombo',
                            value:'STD'
                        }                        
                    ]
                },  
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 90,
                        flex: 1,
                        labelAlign: 'top',
                        margin: '2 0 0 10',
                        xtype: 'combobox'
                    },
                    items: [
                        {
                            fieldLabel: '批校验',
                            allowBlank: false,
                            name: 'lotKey',
                            xtype: 'lotvalidatecombo',
                            value:'STD'
                        },
                        {
                            fieldLabel: '补货策略',
                            allowBlank: false,
                            name: 'replenishmentStrategyKey',
                            xtype: 'replenishmentstrategycombo',
                            value:'STD'
                        },
                        {
                            fieldLabel: '质检策略',
                            name: 'qualityStrategyKey'
                        }
                    ]
                
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 80,
                        flex: 1,
                        labelAlign: 'top',
                        margin: '0 10 0 5',
                        xtype: 'textfield'
                    },
                    items: [
                        {
                            fieldLabel: '包装拷贝到批属性11',
                            name: 'onreceiptCopypackKey',
                            xtype: 'codecombo',
                            codeType: 'YESNO',
                            value:'1'
                        },
                        {
                            fieldLabel: '循环盘点级别',
                            name: 'cycleClass'
                        },
                        {
                            fieldLabel: '上次循环盘点时间',
                            xtype: 'datefield',
                            format:'Y-m-d H:i:s',
                            name: 'lastCyclecount'
                        }                        
                    ]
                },                
                {
                    xtype: 'fieldset',
                    title: '有效期控制',
                    layout: 'anchor',
                    items:[
                        {
                            layout: 'hbox',
                            width:'100%',
                            xtype: 'fieldcontainer',
                            defaults:{
                                labelWidth: 80,
                                flex: 1,
                                labelAlign: 'top',
                                margin: '0 10 0 10',
                                xtype: 'numberfield'
                            },
                            items: [
                                {
                                    boxLabel: '时间限',
                                    margin: '15 10 0 10',
                                    xtype: 'checkbox',
                                    inputValue:1,
                                    name: 'dateCodedays'
                                },
                                {
                                    boxLabel: '保质期控制',
                                    margin: '15 10 0 10',
                                    xtype: 'checkbox',
                                    inputValue:1,
                                    name: 'shelflifeIndicator'
                                },
                                {
                                    fieldLabel: '保质期类型',
                                    name: 'shelflifeCodetype',
                                    xtype: 'codecombo',
                                    codeType: 'SHELFLIFE'
                                }
                            ]
                        },
                        {
                            layout: 'hbox',
                            width:'100%',
                            xtype: 'fieldcontainer',
                            defaults:{
                                labelWidth: 80,
                                flex: 1,
                                labelAlign: 'top',
                                margin: '0 10 0 10',
                                minValue:0,
                                xtype: 'numberfield'
                            },
                            items: [
                                {
                                    fieldLabel: '入库保质期值',
                                    name: 'shelflifeOnreceiving'
                                },
                                {
                                    fieldLabel: '出库保质期值',
                                    name: 'shelflifeOnshipping'
                                },
                                {
                                    fieldLabel: '保质期值',
                                    name: 'shelflife'
                                }

                                
                            ]
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 90,
                        flex: 1,
                        labelAlign: 'top',
                        margin: '5 0 0 10',
                        xtype: 'combobox'
                    },
                    items: [
                        {
                            fieldLabel: '最大库存',
                            name: 'maxPoint',
                            minValue:0,
                            xtype: 'numberfield'
                        },                    
                        {
                            fieldLabel: '指定供应商1',
                            xtype:'textfield',
                            name: 'vendor1'
                        },
                        {
                            fieldLabel: '指定供应商2',
                            xtype:'textfield',
                            name: 'vendor2'
                        }

                    ]
                },




                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 80,
                        flex: 1,
                        labelAlign: 'top',
                        margin: '0 10 0 5',
                        xtype: 'textfield'
                    },
                    items: [
                        {
                            boxLabel: '可搬运',
                            xtype: 'checkbox',
                            inputValue:1,
                            margin:'25',
                            name: 'conveyable'
                        },
                        {
                            fieldLabel: '运输方式',
                            name: 'transportationMode',
                            xtype: 'codecombo',
                            codeType: 'TRANSMODE'
                        },
                        {
                            fieldLabel: '特殊运输等级',
                            name: 'freightClass',
                            xtype: 'codecombo',
                            codeType: 'FREIGHTCLASS'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 80,
                        flex: 1,
                        labelAlign: 'top',
                        margin: '0 10 0 10',
                        xtype: 'textfield'
                    },
                    items: [
                        {
                            boxLabel: 'FLOWTHRUITEM',
                            xtype: 'checkbox',
                            margin:'25',
                            inputValue:1,
                            name: 'flowThruItem'
                        },  
                        {
                            fieldLabel: 'HS编码',
                            name: 'hscode'
                        },
                        {
                            fieldLabel: '危险品代码',
                            name: 'hazmatCode',
                            xtype: 'codecombo',
                            codeType: 'HAZMATCODE'
                        }
                    ]
                },

            ]
    	});
    	return this.customerForm;
    },
    
    createCLForm:function(){
		this.clForm = Ext.create('Ext.form.Panel',{
			xtype:'form',
			frame:true,
			headerPosition: 'bottom',
			title:'拣货配制',
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
                        labelWidth: 60,
                        flex: 1,
                        labelAlign: 'top',
                        margin: '5 0 0 10',
                        xtype: 'textfield'
                    },
                    items: [
                        {
                            fieldLabel: '库位类型',
                            xtype: 'combobox'
                        },   //无此字段
                        {
                            fieldLabel: '补货编组'  //无此字段
                        },
                        {
                            fieldLabel: '拣货库位',  //无此字段
                            labelWidth: 80
                        }
                        
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 60,
                        flex: 1,
                        labelAlign: 'top',
                        margin: '2 0 0 10',
                        xtype: 'textfield'
                    },
                    items: [
                        {
                            fieldLabel: '拣货库位数',
                            labelWidth: 100,
                            width: 240,
                            xtype: 'combobox'
                        },
                        {
                            fieldLabel: '最小补货量'
                        },
                        {
                            fieldLabel: '补货单位',
                            xtype: 'combobox'
                        }
                    ]    
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 60,
                        flex: 1,
                        labelAlign: 'top',
                        margin: '2 0 0 10',
                        xtype: 'combobox'
                    },
                    items: [
                        {
                            fieldLabel: '补货上限',
                            labelWidth: 80,
                            width: 200
                        },
                        {
                            fieldLabel: '补货下限',
                            labelWidth: 100,
                            width: 240
                        },
                        {
                            fieldLabel: '包仓费用',
                            xtype: 'textfield'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 60,
                        flex: 1,
                        labelAlign: 'top',
                        margin: '2 0 0 10',
                        xtype: 'combobox'
                    },
                    items: [
                        {
                            fieldLabel: '重量单位'
                        },
                        {
                            fieldLabel: '体积单位',
                            labelWidth: 80
                        },
                        {
                            fieldLabel: '库存计费级别',
                            labelWidth: 100,
                            width: 240
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 60,
                        flex: 1,
                        labelAlign: 'top',
                        margin: '2 0 0 10',
                        xtype: 'checkbox'
                    },
                    items: [
                        {
                            boxLabel: '从库存库位补货',
                            labelWidth: 100,
                            width: 150
                        },
                        {
                            boxLabel: '从箱捡库位拣货',
                            labelWidth: 100,
                            width: 150,
                            margin: '2 0 0 0'
                        }
                    ]
                }
            ]
	    });
	    return this.clForm;
	},	
    
	createOtherForm: function(){
		this.otherForm = Ext.create('Ext.form.Panel',{
			headerPosition: 'bottom',
			title:'其他',
			frame: true,
			autoScroll : true,
			defaults: {
				xtype: 'fieldcontainer'
			},
	        items: [
                {
                    layout: 'hbox',
                    region: 'center',
                    defaults:{
                        flex: 1,
                        margin: '10 0 0 10',
                        labelAlign: 'top',
                        xtype: 'textfield'
                    },
                    items: [  
                        {
                            fieldLabel: '自定义1',
                            name: 'userDefine1'
                        },
                        {
                            fieldLabel: '自定义2',
                            name: 'userDefine2'
                        },
                        {
                            fieldLabel: '自定义3',
                            name: 'userDefine3'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    border: false,
                    frame: true,
                    region: 'center',
                    defaults:{
                        flex: 1,
                        labelAlign: 'top',
                        margin: '10 0 0 10',
                        xtype: 'textfield'
                    },
                    items: [  
                        {
                            fieldLabel: '自定义4',
                            name: 'userDefine4'
                        },
                        {
                            fieldLabel: '自定义5',
                            name: 'userDefine5'
                        },
                        {
                            fieldLabel: '自定义6',
                            name: 'userDefine6'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    border: false,
                    frame: true,
                    region: 'center',
                    defaults:{
                        labelAlign: 'top',
                        flex: 1,
                        margin: '10 0 0 10',
                        xtype: 'textfield'
                    },
                    items: [  
                        {
                            fieldLabel: '自定义7',
                            name: 'userDefine7'
                        },
                        {
                            fieldLabel: '自定义8',
                            name: 'userDefine8'
                        },
                        {
                            fieldLabel: '自定义9',
                            name: 'userDefine9'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    border: false,
                    frame: true,
                    region: 'center',
                    defaults:{
                        labelAlign: 'top',
                        flex: 1,
                        margin: '10 0 0 10',
                        xtype: 'textfield'
                    },
                    items: [  
                        {
                            fieldLabel: '自定义10',
                            name: 'userDefine10'
                        },
                        {
                            fieldLabel: '自定义11',
                            name: 'userDefine11'
                        },
                        {
                            fieldLabel: '自定义12',
                            name: 'userDefine12'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    border: false,
                    frame: true,
                    defaults:{
                        labelAlign: 'top',
                        flex: 1,
                        margin: '10 0 0 10',
                        xtype: 'textfield'
                    },
                    items: [  
                        {
                            fieldLabel: '自定义13',
                            name: 'userDefine13'
                        },
                        {
                            fieldLabel: '自定义14',
                            name: 'userDefine14'
                        },
                        {
                            fieldLabel: '自定义15',
                            name: 'userDefine15'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    border: false,
                    frame: true,
                    defaults:{
                        labelAlign: 'top',
                        flex: 1,
                        margin: '10 0 0 10',
                        xtype: 'textfield'
                    },
                    items: [  
                        {
                            fieldLabel: '拣货指示',
                            name: 'notes2'
                        }

                    ]
                },
                {
                    layout: 'hbox',
                    border: false,
                    frame: true,
                    defaults:{
                        labelAlign: 'top',
                        flex: 1,
                        margin: '10 0 0 10',
                        xtype: 'textfield'
                    },
                    items: [  
                        {
                            fieldLabel: '备注',
                            name: 'notes1'
                        }
                    ]
                }                
            ]
	    });
	    return this.otherForm;
	},
    
    
	saveSku: function(){
		var me = this;
    	var basicform = this.basicForm.getForm();
    	var customerform = this.customerForm.getForm();
    	var clform = this.clForm.getForm();
    	var otherform = this.otherForm.getForm();
    	var value1 = basicform.getValues();
    	var value2 = customerform.getValues();
    	var value3 = clform.getValues();
    	var value4 = otherform.getValues();
    	if(!(basicform.isValid())||!(customerform.isValid())||!(clform.isValid())||!(otherform.isValid())) return;
    	Ext.Ajax.request({
		    url: basePath + '/support/doSaveSku.action',
		    params: {
		    	id: value1.id,
		        storerKey: value1.storerKey,
		        sku: value1.sku,
		        skuType: value1.skuType,
		        status: value1.status,
		        name: value1.name,
		        descr: value1.descr,
		        manufacturerSku: value1.manufacturerSku,
		        altSku: value1.altSku,
		        retailSku: value1.retailSku,
		        leng: value1.leng,
		        width: value1.width,
		        height: value1.height,
		        grossWeight: value1.grossWeight,
		        netWeight: value1.netWeight,
		        tareWeight: value1.tareWeight,
		        cost: value1.cost,
		        price: value1.price,
		        orderCost: value1.orderCost,
		        carryCost: value1.carryCost,
		        packKey: value1.packKey,
		        putCode: value1.putCode,
		        shippableContainer: value1.shippableContainer,
		        cartonGroup: value1.cartonGroup,
		        rotateby: value1.rotateby,
		        rotation: value1.rotation,
		        abc: value1.abc,
		        reorderPoint: value1.reorderPoint,
		        reorderQty: value1.reorderQty,
		        skuGroup1: value1.skuGroup1,
		        skuGroup2: value1.skuGroup2,
		        tariffKey: value1.tariffKey,
		        transportationMode: value1.transportationMode,
		        freightClass: value1.freightClass,
		        cycleClass: value1.cycleClass,
		        receiptHoldcode: value1.receiptHoldcode,
		        onreceiptCopypackKey: value1.onreceiptCopypackKey,
		        addDate:value1.addDate,
		        addWho:value1.addWho,                
		        
		        putawayStrategyKey: value2.putawayStrategyKey,
		        putawayZone: value2.putawayZone,
		        flowThruItem: value2.flowThruItem,
		        vendor1: value2.vendor1,
		        vendor2: value2.vendor2,
		        conveyable: value2.conveyable,
		        putawayLoc: value2.putawayLoc,
		        rotationStrategyKey: value2.rotationStrategyKey,
		        preAllocationStrategyKey: value2.preAllocationStrategyKey,
		        allocationStrategyKey: value2.allocationStrategyKey,
		        replenishmentStrategyKey: value2.replenishmentStrategyKey,
		        qualityStrategyKey: value2.qualityStrategyKey,
		        rfPack: value2.rfPack,
		        rfUom: value2.rfUom,
		        lotKey: value2.lotKey,
		        hscode: value2.hscode,
		        hazmatCode: value2.hazmatCode,
		        lastCyclecount: value2.lastCyclecount,
		        dateCodedays: value2.dateCodedays,
		        shelflifeIndicator: value2.shelflifeIndicator,
		        shelflifeCodetype: value2.shelflifeCodetype,
		        shelflifeOnreceiving: value2.shelflifeOnreceiving,
		        shelflifeOnshipping: value2.shelflifeOnshipping,
		        shelflife: value2.shelflife,
		        
		        
		        userDefine1: value4.userDefine1,
		        userDefine2: value4.userDefine2,
		        userDefine3: value4.userDefine3,
		        userDefine4: value4.userDefine4,
		        userDefine5: value4.userDefine5,
		        userDefine6: value4.userDefine6,
		        userDefine7: value4.userDefine7,
		        userDefine8: value4.userDefine8,
		        userDefine9: value4.userDefine9,
		        userDefine10: value4.userDefine10,
		        userDefine11: value4.userDefine11,
		        userDefine12: value4.userDefine12,
		        userDefine13: value4.userDefine13,
		        userDefine14: value4.userDefine14,
		        userDefine15: value4.userDefine15,
		        notes1: value4.notes1,
		        notes2: value4.notes2,
		        maxPoint: value4.maxPoint
		    },
		    success: function(response){
		        var text = Ext.decode(response.responseText);
		        var success = text.success;
		        MessageBox.show(success, text.json.msg);
		        basicform.reset();
    	        customerform.reset();
    	        clform.reset();
    			otherform.reset();
    			me.gridPanel.getStore().load();
		    }
		});
	},
    
    
	updateAllSku: function(){
		var me = this;
		var skuGroup1 = me.winform.queryById('skuGroup1').getValue();
		var skuGroup2 = me.winform.queryById('skuGroup2').getValue();
		var userDefine1 = me.winform.queryById('userDefine1').getValue();
		var userDefine2 = me.winform.queryById('userDefine2').getValue();
		var userDefine3 = me.winform.queryById('userDefine3').getValue();
		var userDefine4 = me.winform.queryById('userDefine4').getValue();
		var userDefine5 = me.winform.queryById('userDefine5').getValue();
		var userDefine6 = me.winform.queryById('userDefine6').getValue();
		var userDefine7 = me.winform.queryById('userDefine7').getValue();
		var userDefine8 = me.winform.queryById('userDefine8').getValue();
		var userDefine9 = me.winform.queryById('userDefine9').getValue();
		var userDefine10 = me.winform.queryById('userDefine10').getValue();
		var userDefine11 = me.winform.queryById('userDefine11').getValue();
		var userDefine12 = me.winform.queryById('userDefine12').getValue();
		var userDefine13 = me.winform.queryById('userDefine13').getValue();
		var userDefine14 = me.winform.queryById('userDefine14').getValue();
		var userDefine15 = me.winform.queryById('userDefine15').getValue();
		var cartonGroup = me.winform.queryById('cartonGroup').getValue();
		var putawayStrategyKey = me.winform.queryById('putawayStrategyKey').getValue();
		var qualityStrategyKey = me.winform.queryById('qualityStrategyKey').getValue();
		var rotationStrategyKey = me.winform.queryById('rotationStrategyKey').getValue();
		var preAllocationStrategyKey = me.winform.queryById('preAllocationStrategyKey').getValue();
		var allocationStrategyKey = me.winform.queryById('allocationStrategyKey').getValue();
		var replenishmentStrategyKey = me.winform.queryById('replenishmentStrategyKey').getValue();
		
		var records = me.gridPanel.getSelectionModel().getSelection();
		if(records == ""){
			MessageBox.error("错误提示","请选择要修改的数据！");
		 	return;
		} 
		if(skuGroup1 =="" && skuGroup2=="" && userDefine1=="" && userDefine2 =="" && userDefine3=="" && userDefine4=="" && userDefine5 == ""&& userDefine6 == "" && userDefine7 =="" &&  userDefine8=="" && userDefine9=="" && userDefine10=="" && userDefine11=="" &&userDefine12=="" && userDefine13=="" && userDefine14=="" && userDefine15==""&& cartonGroup==""&&putawayStrategyKey==null&&qualityStrategyKey==null&&rotationStrategyKey==null&&preAllocationStrategyKey==null&&allocationStrategyKey==null&&replenishmentStrategyKey==null){
		 	MessageBox.error("错误提示","请填写需要修改的内容！");
		 	return;
		}
	 	var ids = []; 
		Ext.Array.each(records, function(name, index, countriesItSelf) {
			ids.push(name.getData().id);
		});
		 
		Ext.Ajax.request({
		    url: basePath + '/support/doUpdateAllSku.action',
		    params: {
		    	ids: ids,
		        skuGroup1: skuGroup1,
		        skuGroup2: skuGroup2,
		        userDefine1: userDefine1,
		        userDefine2: userDefine2,
		        userDefine3: userDefine3,
		        userDefine4: userDefine5,
		        userDefine5: userDefine5,
		        userDefine6: userDefine6,
		        userDefine7: userDefine7,
		        userDefine8: userDefine8,
		        userDefine9: userDefine9,
		        userDefine10: userDefine10,
		        userDefine11: userDefine11,
		        userDefine12: userDefine12,
		        userDefine13: userDefine13,
		        userDefine14: userDefine14,
		        userDefine15: userDefine15,
		        cartonGroup: cartonGroup,
		        putawayStrategyKey: putawayStrategyKey,
		        qualityStrategyKey: qualityStrategyKey,
		        rotationStrategyKey: rotationStrategyKey,
		        preAllocationStrategyKey: preAllocationStrategyKey,
		        allocationStrategyKey: allocationStrategyKey,
		        replenishmentStrategyKey: replenishmentStrategyKey
		    },
		    success: function(response){
		        var text = Ext.decode(response.responseText);
		        var success = text.success;
		        MessageBox.show(success, text.json.msg);
    			me.gridPanel.getStore().load();
		    }
		});
	},
	
	//创建导入面板对话框
	createForm: function(){
		this.winform = Ext.create('Ext.window.Window',{
	        autoHeight: true,
			title: '商品信息导入',
	        height: 110,
			width: 400,
			maximizable: false,
			resizable: false,
	        bodyPadding: '10 10 0',
	        defaults: {
	            anchor: '100%',
	            allowBlank: false,
	            msgTarget: 'side',
	            labelWidth: 60
	        },
			 items:[this.createImportForm()],
			buttons: this.createButtons()
   		});		
		this.winform.on('close',function(){
    		delete this.winform;
    	},this);		
	    return this.winform;
	},

    //导入面板上的文本框
    createImportForm: function(){
    	var me = this;
    	this.importForm = Ext.create('Ext.form.Panel',{
			xtype:'form',
			frame:true,
			headerPosition: 'bottom',
	        autoHeight: true,
	        bodyPadding: '5 2 2 5',
			items: [
                {
					labelWidth: 60,
                    width: 330,
                    xtype: 'filefield',
                    id: 'filedata',
                    itemId: 'urldata',
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
    	return this.importForm;
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
                handler: function(){
                                this.winform.close();
                            }
            }
        ];
		return buttons;
	},
	
	//导入面板上保存按钮的方法
	doSaveImportData: function(){
		var me = this;
		var form = this.importForm.getForm();
        if (form.isValid()) {
            form.submit({
            	url: basePath + '/support/importSkuData.action',
            	waitMsg: '正在上传数据，请稍候……',
                success: function(form, action) {
                	if(action.result.success){
                       me.winform.close();
	                   MessageBox.show(true, action.result.msg);
                       me.gridPanel.getStore().load();
                	}
                },
                failure: function(form, action) {
                    MessageBox.show(false, action.result.msg);
                    me.winform.close();
                }
            });
        }
	}
});

Ext.define('RedM.ProductType', {
	extend: 'Ext.tree.Panel',
	alias : 'widget.typetree',
    title:'商品分类',
	iconCls: 'icon-mhistory',
	width: 170,
    margin: '2 2 2 2',
	initComponent: function(){
		this.buildTreeStore();
        this.callParent(arguments);
    },
    buildTreeStore: function(){
    	this.store = Ext.create('Ext.data.TreeStore', { 
		    	fields: ['text','id','parentId'],
		    	root: {
		            text: '所有分类',
		            id: '0',
		            iconCls: 'task-folder',
		            expanded: true
		        },
		        proxy: { 
		            type: 'ajax', 
		            url: basePath + '/support/doQueryAllps.action'//textdoQueryAllps
		        },
		        folderSort: true,
		        sorters: [{
		        property: 'text',
		        direction: 'ASC'
		    }]
    	});
    }
});

Ext.onReady(function(){
	Ext.create('Ext.container.Viewport', {
	    layout: 'border',
	    items: [{
	    	xtype:'SkuManager',
	    	region:'center'
	    }]
	});
});