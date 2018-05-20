/*******************************************************************************
 * 门店信息表 ShopInventory.js
 * 
 * 
 ******************************************************************************/

Ext.define('ShopInventory', {
			extend : 'Ext.data.Model',
			fields : [
				{name : 'id'},
				{name : 'shopId'},
				{name : 'vendor'},
				{name : 'sku'},
				{name : 'qty',type : 'float'},
				{name : 'spc'}, 
				{name : 'model'}, 
				{name : 'color'}, 
				{name : 'size'},
				{name : 'price',type : 'float'}, 
				{name : 'minPrice',type : 'float'},
				{name : 'maxPrice',type : 'float'},
				{name : 'addDate',type : 'date',dateFormat : 'Y-m-d H:i:s.u'}, 
				{name : 'addWho'},
				{name : 'editDate',type : 'date',dateFormat : 'Y-m-d H:i:s.u'}, 
				{name : 'editWho'}
				],
			idProperty : 'id'
});

// GIRD面板
Ext.define('Redm.support.WarehouseGrid', {
	extend : 'Redm.BaseGrid',
	alias : 'widget.shopinventorygrid',
	loadMask : true,
	forceLayout : true,
	buildColumns : function() {
		this.columns = [
			{header : "id",dataIndex : 'id',hidden : true}, 
			{header : "门店编号",dataIndex : 'shopId',width : 100,sortable : true}, 
			{header : "供应商",dataIndex : 'vendor',width : 150,sortable : true},
			{header : "商品",dataIndex : 'sku',width : 150,sortable : true},
			{header : "数量",dataIndex : 'qty',width : 100,renderer : Ext.util.Format.numberRenderer('0.000'),sortable : true}, 
			{header : "规格",dataIndex : 'spc',width : 100,sortable : true}, 
			{header : "型号",dataIndex : 'model',width : 100,sortable : true},
			{header : "颜色",dataIndex : 'color',width : 100,sortable : true},
			{header : "尺寸",dataIndex : 'size',width : 100,sortable : true},
			{header : "单价",dataIndex : 'price',width : 100,renderer : Ext.util.Format.numberRenderer('0.000'),sortable : true}, 
			{header : "最低价",dataIndex : 'minPrice',width : 100,renderer : Ext.util.Format.numberRenderer('0.000'),sortable : true},
			{header : "最高价",dataIndex : 'maxPrice',width : 100,renderer : Ext.util.Format.numberRenderer('0.000'),sortable : true},
			{header : "创建人",dataIndex : 'addWho',width : 100,sortable : true,hidden : true},
			{header : "创建时间",dataIndex : 'addDate',width : 100,sortable : true,renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s'),hidden : true}, 
			{header : "修改人",dataIndex : 'editWho',width : 100,sortable : true,hidden : true}, 
			{header : "修改时间",dataIndex : 'editDate',width : 100,sortable : true,renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s'),hidden : true}
			];
		return true;
	},
	buildDockedItems : function() {
		this.dockedItems = [{
					xtype : 'pagingtoolbar',
					store : this.store,
					dock : 'bottom',
					displayInfo : true
				}];
	},
	initComponent : function() {
		var me = this;
		this.buildStore(basePath + '/shop/doQueryShopInventory.action','ShopInventory', 20);
		this.callParent(arguments);
	}
});

// 主面板
Ext.define('Redm.shop.ShopInventory', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.shopinventorymanager',
	title : '库存管理',
	layout : 'border',
	initComponent : function() {
		this.tbar = {
			plugins : new Ext.ux.ToolbarKeyMap(),
			hidden : true,
			scope : this,
			items : [
				{
					text : '快捷键',
					menu : 
						{
							items : [
								{
									text : '创建',
									scope : this,
									keyBinding : {
										key : 'a',
										ctrl : true
									},
									handler : this.onCreate
								}]
						}
					}]
		};
		this.items = [this.createTopPanel(), this.createBtmPanel()];
		this.buildContextMenu();
		this.callParent(arguments);
	},

	buildContextMenu : function() {
		var me = this;
	},

	// 创建右键菜单
	createContextMenu : function(e) {
		if (!this.formContextMenu) {
			this.formContextMenu = Ext.create('Ext.menu.Menu', {
						items : [this.createAction, this.saveAction,
								this.searchAction, this.resetAction]
					});
		}
		e.preventDefault();
		this.formContextMenu.showAt(e.getXY());
	},
	// 顶部面板
	createTopPanel : function() {
		var me = this;
		this.toppanel = Ext.create('Ext.panel.Panel', {
					region : 'north',
					height : 110,
					// layout: 'border',
					listeners : { // 顶部面板响应右键菜单，两个form都生效
						render : function(p) {
							p.getEl().on("contextmenu", function(e) {
										me.createContextMenu(e);
									}, me)
						}
					},
					border : false,
					items : [this.createSelForm()]
				});
		return this.toppanel;
	},

	onSelect : function() {
		this.shopinventorygrid.getStore().load()
	},

	onReset : function() {
		this.selform.getForm().reset();
	},

	// 顶部查询面板
	createSelForm : function() {
		var me = this;
		this.selform = Ext.create('Ext.form.Panel', {
					border : false,
					frame : true,
					height : 110,
					defaults : {
						margin : '5 0 0 5',
						xtype : 'fieldcontainer'
					},
					items : [{
						layout : 'hbox',
						defaults : {
							xtype : 'textfield',
							margin : '5 0 0 5',
							labelWidth : 60,
							listeners : {
								blur : function(txt) {
									txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
								}
							}
						},
						items : [
							{
								xtype : 'textfield',
								labelWidth : 60,
								fieldLabel : '门店编号',
								name : 'shopId',
								flex : 0.15
							},
							{
								xtype : 'textfield',
								labelWidth : 40,
								fieldLabel : '供应商',
								name : 'vendor',
								flex : 0.15
							},
							{
								xtype : 'textfield',
								labelWidth : 30,
								fieldLabel : '商品',
								name : 'sku',
								flex : 0.15
							}, 
							{
								xtype : 'textfield',
								labelWidth : 30,
								fieldLabel : '数量',
								name : 'qty',
								flex : 0.15
							},
							{
								xtype : 'textfield',
								labelWidth : 30,
								fieldLabel : '规格',
								name : 'spc',
								flex : 0.15
							}]
				    		},
				    		{
						layout : 'hbox',
						defaults : {
							xtype : 'textfield',
							margin : '5 0 0 5',
							labelWidth : 60,
							listeners : {
								blur : function(txt) {
									txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
								}
							}
						},
						items : [
							{
								xtype : 'textfield',
								labelWidth : 60,
								fieldLabel : '型号',
								name : 'model',
								flex : 0.15
							},
							{
								xtype : 'textfield',
								labelWidth : 30,
								fieldLabel : '颜色',
								name : 'color',
								flex : 0.2
							},
							{
								xtype : 'textfield',
								labelWidth : 30,
								fieldLabel : '尺寸',
								name : 'size',
								flex : 0.2
							}, 
							{
								xtype : 'textfield',
								labelWidth : 30,
								fieldLabel : '单价',
								name : 'price',
								flex : 0.2
							},
							{
								xtype : 'textfield',
								labelWidth : 40,
								fieldLabel : '最低价',
								name : 'minPrice',
								flex : 0.2
							},
							{
								xtype : 'textfield',
								labelWidth : 40,
								fieldLabel : '最高价',
								name : 'maxPrice',
								flex : 0.2
							},
							{
								xtype : 'button',
								iconCls : 'icon-search',
								scope : this,
								text : '查询',
								handler : me.onSelect
							},
							{
								xtype : 'button',
								scope : this,
								iconCls : 'icon-reset',
								handler : me.onReset,
								text : '重置'
							}]
				    		},
				    		{
								layout : 'hbox',
								defaults : {
									margin : '5 0 0 5',
									labelWidth : 60,
									listeners : {
										blur : function(txt) {
											txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
										}
									}
							},
						items : [
							{
								xtype : 'button',
								iconCls : 'icon-upload',
								scope : this,
								text : '导入Excel',
								handler: function(){
                        		me.createForm();
                       			me.winform.show();
                  			},
                   				scope: this
							}
							]
					}]
				});
		return this.selform;
	},
	
    //创建导入面板对话框
	createForm: function(){
		this.winform = Ext.create('Ext.window.Window',{
	        autoHeight: true,
			title: '库存信息导入',
	        height: 150,
			width: 500,
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
                    width: 450,
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
            	url: basePath + '/shop/importShopInventoryData.action',
            	waitMsg: '正在上传数据，请稍候……',
                success: function(form, action) {
                	if(action.result.success){
                       me.winform.close();
	                   MessageBox.show(true, action.result.msg);
                       me.shopinventorygrid.getStore().load();
                	}
                },
                failure: function(form, action) {
                    MessageBox.show(false, action.result.msg);
                    me.winform.close();
                }
            });
        }
	},
	// 底部面板，包括一个grid和一个form
	createBtmPanel : function() {
		this.btmpanel = Ext.create('Ext.panel.Panel', {
					region : 'center',
					layout : 'border',
					items : [this.createShopInventoryGrid(),
							this.createShopInventoryForm()]
				});
		return this.btmpanel;
	},

	// 底部GRID面板
	createShopInventoryGrid : function() {
		var me = this;
		this.shopinventorygrid = Ext.create('widget.shopinventorygrid', {
					region : 'center',
					listeners : {
						itemclick : function(grid, record) {
							me.shopinventoryform.getForm().loadRecord(record);
							// 加载时设置为只读，不能修改
							me.shopinventoryform.getForm().findField('shopId').setReadOnly(true);
						}
					}
				});
		this.shopinventorygrid.getStore().on('beforeload', function() {
					var params = this.shopinventorygrid.getStore().getProxy().extraParams;
					var record = me.selform.getForm().getValues();

					var shopId = record.shopId;
					var vendor = record.vendor;
					var sku = record.sku;
					var qty = record.qty;
					var spc = record.spc;
					var model = record.model;
					var color = record.color;
					var size = record.size;
					var price = record.price;
					var minPrice = record.minPrice;
					var maxPrice = record.maxPrice;

					delete params.shopId;
					delete params.vendor;
					delete params.sku;
					delete params.qty;
					delete params.spc;
					delete params.model;
					delete params.color;
					delete params.size;
					delete params.price;
					delete params.minPrice;
					delete params.maxPrice;

					if (shopId)
						params.shopId = shopId;
					if (vendor)
						params.vendor = vendor;
					if (sku)
						params.sku = sku;
					if (qty)
						params.qty = qty;
					if (spc)
						params.spc = spc;
					if (model)
						params.model = model;
					if (shopId)
						params.shopId = shopId;
					if (color)
						params.color = color;
					if (size)
						params.size = size;
					if (price)
						params.price = price;
					if (minPrice)
						params.minPrice = minPrice;
					if (maxPrice)
						params.maxPrice = maxPrice;
				}, this);
		return this.shopinventorygrid;
	},

	// 底部右边面板
	createShopInventoryForm : function() {
		this.shopinventoryform = Ext.create('Ext.form.Panel', {
					region : 'east',
					width : 400,
					split : true,
					collapsible : true,
					border : true,
					frame : true,
					defaults : {
						xtype : 'fieldcontainer',
						margin : '5 0 0 5',
						frame : true,
						labelWidth : 120
					},
					items : [
						{
							layout : 'hbox',
							defaults : {
								labelWidth : 60,
								flex : 1,
								labelAlign : 'top',
								margin : '10 0 0 10',
								xtype : 'textfield'
							},
							items : [
								{
									fieldLabel : '门店编号',
									name : 'shopId'
								}, 
								{
									fieldLabel : '供应商',
									name : 'vendor'
								}, 
								{
									fieldLabel : '商品',
									name : 'sku'
								}]
								},
								{
									layout : 'hbox',
									defaults : {
										labelWidth : 60,
										flex : 1,
										labelAlign : 'top',
										margin : '2 0 0 10',
										xtype : 'textfield'
								},
								items : [
									{
										fieldLabel : '数量',
										labelWidth : 100,
										name : 'qty'
									}, 
									{
										fieldLabel : '规格',
										name : 'spc'
									}, 
									{
										fieldLabel : '型号',
										name : 'model'
									}]
								},
								{
									layout : 'hbox',
									defaults : {
									labelWidth : 60,
									flex : 1,
									labelAlign : 'top',
									margin : '2 0 0 10',
									xtype : 'textfield'
									},
								items : [
									{
										fieldLabel : '颜色',
										labelWidth : 80,
										name : 'color'
									}, 
									{
										fieldLabel : '尺寸',
										labelWidth : 100,
										name : 'size'
									},
									{
										fieldLabel : '单价',
										name : 'price'
									}]
									},
								{
									layout : 'hbox',
									defaults : {
										labelWidth : 60,
										flex : 1,
										labelAlign : 'top',
										margin : '2 0 0 10',
										xtype : 'textfield'
								},
								items : [
									{
										fieldLabel : '最低价',
										labelWidth : 100,
										name : 'minPrice'
									}, 
									{
										fieldLabel : '最高价',
										labelWidth : 100,
										name : 'maxPrice'
									}, 
									{
										fieldLabel : '创建人',
										labelWidth : 100,
										name : 'addWho',
										hidden : true
									}, 
									{
										fieldLabel : '创建时间',
										labelWidth : 100,
										name : 'addDate',
										hidden : true
									},
									{
										fieldLabel : '修改人',
										labelWidth : 100,
										name : 'editWho',
										hidden : true
									}, 
									{
										fieldLabel : '修改时间',
										labelWidth : 100,
										name : 'editDate',
										hidden : true
									},
									{
										fieldLabel : '编号',
										labelWidth : 100,
										name : 'id',
										hidden : true
									}]
							}]
				});
		return this.shopinventoryform;
	}
});

Ext.onReady(function() {
	Ext.create('Ext.container.Viewport', {
		layout : 'border',
			items : [{
				xtype : 'shopinventorymanager',
				region : 'center'
			}]
	});
});