/*******************************************************************************
 * 门店信息 ShopInfo.js
 * 
 * 
 ******************************************************************************/

Ext.define('ShopInfo', {
			extend : 'Ext.data.Model',
			fields : [
				{name : 'id'}, 
				{name : 'shopId'}, 
				{name : 'companyId'},
				{name : 'address'},
				{name : 'postcode'},
				{name : 'tel'}, 
				{name : 'notes'},
				{name : 'addDate',type : 'date',dateFormat : 'Y-m-d H:i:s.u'}, 
				{name : 'addWho'},
				{name : 'editDate',type : 'date',dateFormat : 'Y-m-d H:i:s.u'},
				{name : 'editWho'}
				],
			idProperty : 'id'
		});

// GIRD面板
Ext.define('Redm.Shop.ShopInfoGrid', {
	extend : 'Redm.BaseGrid',
	alias : 'widget.shopinfogrid',
	loadMask : true,
	forceLayout : true,
	buildColumns : function() {
		this.columns = [
			{header : "门店编号",dataIndex : 'shopId',width : 200,sortable : true},
			{header : "组织机构编号",dataIndex : 'companyId',width : 200,sortable : true},
			{header : "地址",dataIndex : 'address',width : 200,sortable : true},
			{header : "邮编",dataIndex : 'postcode',width : 150,sortable : true},
			{header : "电话",dataIndex : 'tel',width : 200,sortable : true},
			{header : "创建人",dataIndex : 'addWho',width : 140,sortable : true,hidden : true}, 
			{header : "创建时间",dataIndex : 'addDate',width : 140,sortable : true,renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s'),hidden : true}, 
			{header : "修改人",dataIndex : 'addDate',width : 140,sortable : true,renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s'),hidden : true}, 
			{header : "修改时间",dataIndex : 'addWho',width : 140,sortable : true,hidden : true}
			];
		return true;
	},
	buildDockedItems : function() {
		this.dockedItems = [
			{xtype : 'pagingtoolbar',
			 store : this.store,
			 dock : 'bottom',
			 displayInfo : true}
			 ];
	},
	initComponent : function() {
		var me = this;
		this.buildStore(basePath + '/shop/doQueryShopInfo.action', 'ShopInfo',20);
		this.callParent(arguments);
	}
});

// 主面板
Ext.define('Redm.Shop.ShopInfo', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.shopinfomanager',
	title : '门店信息',
	layout : 'border',
	initComponent : function() {
		this.tbar = {
			plugins : new Ext.ux.ToolbarKeyMap(),
			hidden : true,
			scope : this,
			items : [{
						text : '快捷键',
						menu : {
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
					height : 100,
					layout : 'border',
					listeners : { // 顶部面板响应右键菜单，两个form都生效
						render : function(p) {
							p.getEl().on("contextmenu", function(e) {
										me.createContextMenu(e);
									}, me)
						}
					},
					border : false,
					items : [this.createBtnForm(), this.createSelForm()]
				});
		return this.toppanel;
	},

	// 顶部按钮面板
	createBtnForm : function() {
		var me = this;
		this.btnform = Ext.create('Ext.form.Panel', {
					region : 'center',
					border : false,
					frame : true,
					defaults : {
						xtype : 'button',
						margin : '5 0 0 5'
					},
					items : [
						{
							iconCls : 'icon-create',
							text : '创建',
							handler : me.onCreate,
							scope : this
						}, 
						{
							iconCls : 'icon-delete',
							itemId : 'delete',
							// disabled:true, //禁用
							text : '删除',
							handler : me.onDelete,
							scope : this
						}, 
						{
							iconCls : 'icon-save',
							text : '保存',
							handler : me.saveShopInfo,
							scope : this
						}]
				});
		return this.btnform;
	},

	onSelect : function() {
		this.shopinfogrid.getStore().load()
	},

	onReset : function() {
		this.selform.getForm().reset();
	},

	onCreate : function() {
		var me = this;
		me.shopinfoform.getForm().findField('shopId').setReadOnly(false);
		me.shopinfoform.getForm().reset();
	},

	onDelete : function() {
		var me = this;
		var records = me.shopinfogrid.getSelectionModel().getSelection();
		if (records == "") {
			MessageBox.error('错误提示', '请选择删除的数据！');
			return;
		} else {
			Ext.MessageBox.confirm('询问提示', '确定要删除吗？', function(btn) {
						if (btn == 'yes') {
							var shoInfoRecord = records[0].getData();
							Ext.Ajax.request({
										url : basePath+ '/shop/doDeleteShopInfo.action',
										params : {
											shopId : shoInfoRecord.shopId,
											companyId : shoInfoRecord.companyId
										},
										success : function(response) {
											var text = Ext
													.decode(response.responseText);
											var success = text.success;
											MessageBox.show(success,text.json.msg);
											me.shopinfogrid.getStore().load();
											me.shopinfoform.getForm().reset();
										}
									});
						}
					});
		}
	},

	// 顶部查询面板
	createSelForm : function() {
		var me = this;
		this.selform = Ext.create('Ext.form.Panel', {
			region : 'north',
			height : 50,
			border : false,
			frame : true,
			layout : 'hbox',
			defaults : {
				xtype : 'textfield',
				margin : '5 0 0 5',
				labelWidth : 60
			},
			items : [
				{
					fieldLabel : '门店编号',
					listeners : {
						blur : function(txt) {
							txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
						}
					},
					name : 'shopId',
					width : 200
				},
				{
					fieldLabel : '机构组织编号',
					listeners : {
						blur : function(txt) {
							txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
						}
					},
					name : 'companyId',
					labelWidth : 80,
					width : 200
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
			});
		return this.selform;
	},

	// 底部面板，包括一个grid和一个form
	createBtmPanel : function() {
		this.btmpanel = Ext.create('Ext.panel.Panel', {
					region : 'center',
					layout : 'border',
					items : [this.createShopInfoGrid(),
							this.createShopInfoForm()]
				});
		return this.btmpanel;
	},

	// 底部GRID面板
	createShopInfoGrid : function() {
		var me = this;
		this.shopinfogrid = Ext.create('widget.shopinfogrid', {
					region : 'center',
					listeners : {
						itemclick : function(grid, record) {
							me.shopinfoform.getForm().loadRecord(record);
							// 加载时设置为只读，不能修改
							me.shopinfoform.getForm().findField('shopId')
									.setReadOnly(true);

						}
					}
				});
		this.shopinfogrid.getStore().on('beforeload', function() {
					var params = this.shopinfogrid.getStore().getProxy().extraParams;
					var record = me.selform.getForm().getValues();

					var shopId = record.shopId;
					var companyId = record.companyId;

					delete params.shopId;
					delete params.companyId;

					if (shopId)
						params.shopId = shopId;
					if (companyId)
						params.companyId = companyId;
				}, this);
		return this.shopinfogrid;
	},

	// 底部右边面板
	createShopInfoForm : function() {
		var me = this;
		this.shopinfoform = Ext.create('Ext.form.Panel', {
			region : 'east',
			width : 320,
			split : true,
			collapsible : true,
			border : true,
			frame : true,
			defaults : {
				xtype : 'fieldcontainer',
				margin : '5 0 0 5',
				frame : true
			},
			items : [{
				layout : 'hbox',
				defaults : {
					xtype : 'textfield',
					margin : '5 0 0 5',
					labelAlign : 'top',
					labelWidth : 80,
					width : 150
				},
				items : [
					{
						fieldLabel : '门店编号',
						allowBlank : false,
						name : 'shopId',
						listeners : {
							blur : function(txt) {
								// 输入参数，鼠标离开后见检查该货主是否存在
								shopIdValue = Ext.util.Format.uppercase(txt.getValue());
								txt.setValue(shopIdValue);
								Ext.Ajax.request({
									url : basePath+ '/shop/doValidateShopInfo.action',
									params : {
										shopId : shopIdValue
									},
									success : function(response) { // failure属于连不上服务器的情况，后续补充
										var text = Ext.decode(response.responseText);
										var success = text.success;
										if (0 != text.json.data.length) {
											me.shopinfoform.getForm().findField('shopId').setValue('');
											Ext.Msg.alert("错误提示", '该门店编号已存在');
											}
										}
									})
								}
							},
						allowBlank : false
						}]
					},
					{
						layout : 'hbox',
						defaults : {
						xtype : 'textfield',
						margin : '5 0 0 5',
						labelAlign : 'top',
						width : 150,
						labelWidth : 80
					},
				items : [
					{
						fieldLabel : '组织机构编号',
						allowBlank : false,
						name : 'companyId',
						listeners : {
							blur : function(txt) {
								txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
							}
						}
					}]
					}, 
					{
						layout : 'hbox',
						defaults : {
						xtype : 'textfield',
						margin : '5 0 0 5',
						labelAlign : 'top',
						width : 285,
						labelWidth : 80
					},
				items : [
					{
						fieldLabel : '地址',
						name : 'address',
						listeners : {
							blur : function(txt) {
								txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
								}
							}
						}]
				},
				{
					layout : 'hbox',
					defaults : {
						xtype : 'textfield',
						margin : '5 0 0 5',
						labelAlign : 'top',
						width : 285,
						labelWidth : 80
				},
				items : [
					{
						fieldLabel : '邮编',
						name : 'postcode'
					}]
					}, {
					layout : 'hbox',
					defaults : {
						xtype : 'textfield',
						margin : '5 0 0 5',
						labelAlign : 'top',
						width : 285,
						labelWidth : 80
					},
					items : [
						{
							fieldLabel : '电话号码',
								// 电话号码最长11位；
							maxLength : 11,
							minLength : 11,
							name : 'tel'
						}]
				},
				{
					layout : 'hbox',
					defaults : {
						xtype : 'textfield',
						margin : '5 0 0 5',
						labelAlign : 'top',
						width : 140,
						labelWidth : 80
				},
					items : [
						{
							name : 'id',
							hidden : true
						},
						{
							name : 'addWho',
							hidden : true
						},
						{
							xtype : 'datefield',
							format : 'Y-m-d H:i:s',
							name : 'addDate',
							hidden : true
						},
						{
							name : 'editWho',
							hidden : true
						}, 
						{
							xtype : 'datefield',
							format : 'Y-m-d H:i:s',
							name : 'editDate',
							hidden : true
						}]
			}]
		});
		return this.shopinfoform;
	},

	saveShopInfo : function() {
		var me = this;
		var shopInfoForm = this.shopinfoform.getForm();
		var shipInfoValues = shopInfoForm.getValues();
		if (!(shopInfoForm.isValid()))
			return;
		Ext.Ajax.request({
					url : basePath + '/shop/doSaveshopInfo.action',
					params : {
						id : shipInfoValues.id,
						shopId : shipInfoValues.shopId,
						companyId : shipInfoValues.companyId,
						address : shipInfoValues.address,
						postcode : shipInfoValues.postcode,
						tel : shipInfoValues.tel,
						editWho : shipInfoValues.editWho,
						editDate : shipInfoValues.editDate,
						addDate : shipInfoValues.addDate,
						addWho : shipInfoValues.addWho
					},
					success : function(response) {
						var text = Ext.decode(response.responseText);
						var success = text.success;
						MessageBox.show(success, text.json.msg);
						if (true == success) {
							me.shopinfogrid.getStore().load();
							shopInfoForm.reset();
						}
					}
				});
	}
});

Ext.onReady(function() {
	Ext.create('Ext.container.Viewport', {
		layout : 'border',
		items : [{
			xtype : 'shopinfomanager',
			region : 'center'
		}]
	});
});