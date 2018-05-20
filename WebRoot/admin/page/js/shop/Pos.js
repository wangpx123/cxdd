/*******************************************************************************
 * POS界面 Pos.js
 * 
 * 
 ******************************************************************************/

// (门店销售明细表)的数据存储数据类型定义
Ext.define('ShopOrderDetail', {
	extend : 'Ext.data.Model',
	fields :[ 
	    {name : 'id'},
	    {name : 'shopOrderKey'}, 
	    {name : 'vendor'},
	    {name : 'sku'},
	    {name : 'qty',type : 'float'},
	    {name : 'spc'},
	    {name : 'model'},
	    {name : 'color'},
	    {name : 'size'},
	    {name : 'price',type : 'float'}, 
        {name : 'discount',type : 'float'},
		{name : 'transPrice',type : 'float'}, 
		{name : 'status'},
		{name : 'addWho'},
		{name : 'addDate',type : 'date',dateFormat : 'Y-m-d H:i:s.u'},
		{name : 'editWho'},
		{name : 'editDate',type : 'date',dateFormat : 'Y-m-d H:i:s.u'}
		],
		idProperty : 'id'
});
// GIRD面板
Ext.define('Redm.Shop.ShopOrdersGrid', {
	extend : 'Redm.BaseGrid',
	alias : 'widget.shopordersgrid',
	loadMask : false,
	forceLayout : true,
	autoLoad : false,
	buildColumns : function() {
		this.columns = [
			{header : "销售单号",dataIndex : 'shopOrderKey',width : 100,sortable : true}, 
			{header : "供应商",dataIndex : 'vendor',width : 100,sortable : true,hidden : true}, 
			{header : "商品",dataIndex : 'sku',width : 100,sortable : true}, 
			{header : "规格",dataIndex : 'spc',width : 100,sortable : true},
			{header : "型号",dataIndex : 'model',width : 100,sortable : true},
			{header : "颜色",dataIndex : 'color',width : 100,sortable : true}, 
			{header : "尺寸",dataIndex : 'size',width : 100,sortable : true},
			{header : "单价",dataIndex : 'price',width : 100,renderer : Ext.util.Format.numberRenderer('0.000'),sortable : true}, 
			{header : "折扣",dataIndex : 'discount',width : 100,sortable : true,renderer : Ext.util.Format.numberRenderer('0.000'),hidden : true},
			{header : "成交价",dataIndex : 'transPrice',width : 100,renderer : Ext.util.Format.numberRenderer('0.000'),sortable : true}, 
			{header : "数量",dataIndex : 'qty',width : 100,renderer : Ext.util.Format.numberRenderer('0.000'),sortable : true}, 
			{header : "状态",dataIndex : 'status',width : 100,sortable : true},
			{header : "创建人",dataIndex : 'addWho',width : 100,sortable : true,hidden : true},
			{header : "创建时间",dataIndex : 'addDate',width : 100,sortable : true,renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s'),hidden : true}, 
			{header : "修改人",dataIndex : 'editWho',width : 100,sortable : true,hidden : true}, 
			{header : "修改时间",dataIndex : 'editDate',width : 100,sortable : true,renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s'),hidden : true},
			{dataIndex : 'id',hidden : true}
			];
		return true;
	},
	buildDockedItems : function() {
		var me = this;
		this.dockedItems = [{
			xtype : 'pagingtoolbar',
			store : this.store,
			dock : 'bottom',
			displayInfo : true
			}];
	},
	initComponent : function() {
		var me = this;
		this.buildStore(basePath + '/shop/doQueryShopOrderDetail.action','ShopOrderDetail', 20);
		this.callParent(arguments);
	}
});

// 主面板
Ext.define('Redm.shop.ShopInventory', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.posmanager',
	title : 'POS界面',
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
				 	        		text : '保存 ',
							 		scope : this,
								 	keyBinding :
							 		{
							  			key : 's',
										ctrl : true
							 		 },
							 		 handler : this.saveArea}, 
							 	{
									text : '创建',
									scope : this,
							  		keyBinding :
							  		{
										key : 'a',
										ctrl : true
									},
							  		handler : this.onCreate}
									]
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
					layout : 'border',
					height : 160,
					border : false,
					items : [this.createBtnForm(), this.createSelForm()]
				});
		return this.toppanel;
	},
	// 顶部按钮面板
	createBtnForm : function() {
		var me = this;
		this.btnform = Ext.create('Ext.form.Panel', {
			region : 'north',
			border : false,
			frame : true,
			defaults : {
				xtype : 'button',
				// minHeight:'50',
				fieldStyle : 'font-size: 30px',
				margin : '5 20 5 5',
				iconCls : 'icon-save',
				width : 120,
				height : 50,
				cls : 'mybutton'
			},
			items : [
				{text : '<font color=black style="font-size: 20px;font-weight: bold;">会员管理</font>',handler : me.onCreate,scope : this}, 
				{text : '<font color=black style="font-size: 20px;font-weight: bold;">库存管理</font>',handler : me.onCreate,scope : this},
				{text : '<font color=black style="font-size: 20px;font-weight: bold;">其他管理</font>',handler : me.onCreate,scope : this},
				{text : '<font color=black style="font-size: 20px;font-weight: bold;">其他管理</font>',handler : me.onCreate,scope : this}, 
				{text : '<font color=black style="font-size: 20px;font-weight: bold;">开始收银</font>',handler : me.onStartCash,scope : this}
				]
		});
		return this.btnform;
	},
    
	// 开始收银操作方法
	onStartCash : function() {
		var me = this;
		me.cashform.getForm().reset();
		me.selform.getForm().reset();
		Ext.Ajax.request({
			url : basePath + '/shop/doQueryShopNO.action',
			params : {},
			success : function(response) 
            {
				var text = Ext.decode(response.responseText);
				var success = text.success;
				var data = text.json.data;
				me.selform.getForm().findField('shopId').setValue(data[0].shopId);
                me.selform.getForm().findField('cashType').setValue('现金');

                var nameCode='SHOPNUM';
                var typeserail=data[0].shopId;
                me.ShopOrdersGrid.getStore().removeAll();            
                this.teststore = Ext.create('Ext.data.Store', {
                            remoteSort : true,
                            autoLoad : true,
                            fields : [{name : 'number'},
                                      {name : 'id'}
                                ],
                            proxy : {
                                type : 'ajax',
                                url: basePath + '/support/doCreateNumberRules.action?string='+nameCode+','+typeserail,
                                reader : {
                                    type : 'json',
                                    root : 'json.data',
                                    totalProperty : 'json.totalCount'
                                },
                                actionMethods : {
                                    read : 'POST'
                                },
                                simpleSortMode : true
                            },
                            // 加载数据到store，通过监听事件来设置
                            listeners : {
                                'load' : function(sto, recs) {
                                    var value = sto.getAt(0).get('number');
                                    if ('' != value) {
                                    me.selform.getForm().findField('shopOrderKey').setValue(value);
                                    }
                                },
                                scope : this
                            }
                    })
            }
        });

	},

	// 顶部查询面板
	createSelForm : function() {
		var me = this;
		this.selform = Ext.create('Ext.form.Panel', {
			xtype : 'form',
			region : 'center',
			border : false,
			frame : true,
			defaults : 
				{
				 	xtype : 'fieldcontainer',
				 	hideLabel : true,
					anchor : '100%'
				},
			items : [
				{
					layout : 'hbox',
					defaults : {
						labelWidth : 30,
						labelAlign : 'left',
						margin : '10 0 0 10',
						xtype : 'textfield',
						listeners : {
							blur : function(txt) {
								txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
							}
						}
				},
				items : [
					{
						labelWidth : 60,
						fieldLabel : '会员编号',
						name : 'memberNo',
						// 电话号码最长11位；
						maxLength : 11,
						minLength : 11,
						listeners : {
						blur : function(txt) {
							// 输入参数，鼠标离开后见检查该货主是否存在
							memberNoValue = Ext.util.Format.uppercase(txt.getValue());
							txt.setValue(memberNoValue);
							Ext.Ajax.request({
										url : basePath
												+ '/shop/doValidateMembership.action',
										params : {
											memberNo : memberNoValue
										},
										success : function(response) { // failure属于连不上服务器的情况，后续补充
											var text = Ext
													.decode(response.responseText);
											var success = text.success;
											var data = text.json.data;
											if (0 != text.json.data.length) {
												me.selform.getForm().findField('name').setValue(data[0].name);
												me.selform.getForm().findField('gender').setValue(data[0].gender);
												me.selform.getForm().findField('agePhase').setValue(data[0].agePhase);
											}
										}
									})
						   }
					   }
				    },
				    {
						iconCls : 'icon-save',
						xtype : 'button',
						cls : 'mybutton',
						text : '注册',
						// handler: me.onImport,
						handler : function() {
						me.createFormByMemberReg();
						me.winformByMembership.show();
					},
						scope : this
				    },
				    {
						fieldLabel : '姓名',
						name : 'name',
						width : 90
				    },
				    {
						fieldLabel : '性别',
						xtype:'codecombo',
						codeType:'GENDER',
						name : 'gender',
						width : 90
				    }, 
				    {
						labelWidth : 40,
						fieldLabel : '年龄段',
						xtype:'codecombo',
						codeType:'AGETYPE',
						name : 'agePhase',
						width : 120
				    }, 
				    {
						labelWidth : 40,
						fieldLabel : '门店号',
						name : 'shopId',
						width : 120,
						allowBlank : false
					},
					{
						labelWidth : 60,
						fieldLabel : '销售单号',
						name : 'shopOrderKey',
						width : 180
						// readOnly : true
					},
					{
						xtype : 'hidden',
						name : 'area',
						width : 50
				    }]
			      	 }, 
			       	{
				   		layout : 'hbox',
				   		defaults : {
						labelWidth : 30,
						labelAlign : 'left',
						margin : '10 0 0 10',
						xtype : 'textfield',
						listeners : {
							blur : function(txt) {
								txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
						}
					}
				},
				items : [
					{
						fieldLabel : '商品',
						labelWidth : 60,
						width : 190,
						name : 'sku',
						// allowBlank: false,
						listeners : {
						blur : function(txt) {
							//检查商品是否存在；
							skuValue = Ext.util.Format.uppercase(txt.getValue());
							txt.setValue(skuValue);
							Ext.Ajax.request({
								url : basePath+ '/shop/doValidateShopInventory.action',
								params : {
									sku : skuValue
								},
								success : function(response) { // failure属于连不上服务器的情况，后续补充
									var text = Ext.decode(response.responseText);
									var success = text.success;
									var data = text.json.data;
									if (0 != text.json.data.length) {
										me.selform.getForm().findField('spc').setValue(data[0].spc);
										me.selform.getForm().findField('vendor').setValue(data[0].vendor);
										me.selform.getForm().findField('model').setValue(data[0].model);
										me.selform.getForm().findField('color').setValue(data[0].color);
										me.selform.getForm().findField('size').setValue(data[0].size);
										me.cashform.getForm().findField('price').setValue(data[0].price);
										me.cashform.getForm().findField('qty').setValue(1);
										//判断是否有会员，若有则将最低价作为成交价，否则将单价最为成交价；
										if(''!=me.selform.getForm().getValues().name)
										{
											me.cashform.getForm().findField('transPrice').setValue(data[0].minPrice);
										}else{
											me.cashform.getForm().findField('transPrice').setValue(data[0].price);
										}
									}else{
										Ext.Msg.alert("查询失败",'请输入正确的商品');
									}
								}
							})
						}
					}
					},
					{
						fieldLabel : '供应商',
						labelWidth : 40,
						hidden : true,
						name : 'vendor',
						width : 150
					},
					{
						fieldLabel : '规格',
						name : 'spc',
						width : 150
					},
					{
						fieldLabel : '型号',
						name : 'model',
						width : 150
					}, 
					{
						fieldLabel : '颜色',
						name : 'color',
						width : 150
					},
					{
						fieldLabel : '尺寸',
						name : 'size',
						width : 150
					},
					{
						fieldLabel : '收款方式',
						name : 'cashType',
                   		xtype:'codecombo',
                    	codeType:'CASHTYPE',
				   		fieldStyle : 'font-size: 10px',
						width : 150,
						labelWidth : 60
					}]
			}]
		});
		return this.selform;
	},
	// 创建会员注册对话框
	createFormByMemberReg : function() {
		this.winformByMembership = Ext.create('Ext.window.Window', {
					autoHeight : true,
					title : '会员注册信息',
					height : 250,
					width : 600,
					maximizable : true,
					resizable : false,
					bodyPadding : '10 10 0',
					defaults : {
						anchor : '100%',
						allowBlank : false,
						msgTarget : 'side',
						labelWidth : 60
					},
					items : [this.createImportFormByMemberReg()],
					buttons : this.createButtonsByReg()
				});
		this.winformByMembership.on('close', function() {
					delete this.winformByMembership;
				}, this);
		return this.winformByMembership;
	},
	// 导入面板上的文本框
	createImportFormByMemberReg : function() {
		var me = this;
		this.registerform = Ext.create('Ext.form.Panel', {
			width : 1000,
			split : true,
			collapsible : false,
			border : true,
			frame : true,
			defaults : {
				xtype : 'fieldcontainer',
				margin : '5 0 0 5',
				frame : true
			},
			items : [
				{
					layout : 'hbox',
					defaults : {
						flex : 2,
						labelWidth : 30,
						labelAlign : 'left',
						margin : '10 0 10 5',
						xtype : 'textfield',
						width : 50,
						listeners : {
							blur : function(txt) {
								txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
							}
						}
					},
					items : [
						{
							labelWidth : 60,
							flex : 1,
							fieldLabel : '会员编号',
							name : 'memberNo',
							// 电话号码最长11位；
							maxLength : 11,
							minLength : 11,
							listeners : {
								blur : function(txt) {
								// 输入参数，鼠标离开后见检查该货主是否存在
									memberNoValue = Ext.util.Format.uppercase(txt.getValue());
									txt.setValue(memberNoValue);
									Ext.Ajax.request({
											url : basePath+ '/shop/doValidateMembership.action',
											params : {
												memberNo : memberNoValue
											},
											success : function(response) { // failure属于连不上服务器的情况，后续补充
												var text = Ext.decode(response.responseText);
												var success = text.success;
												console.log(text.json.data.length);
												if (0 != text.json.data.length) {
													me.registerform.getForm().findField('memberNo').setValue('');
													Ext.Msg.alert("注册失败",'该手机号已注册');
												}
											}
										})
							}
						},
						allowBlank : false
						}, 
						{
							fieldLabel : '姓名',
							flex : 0.5,
							name : 'name',
							width : 20
						}, 
						{
							xtype : 'codecombo',
							fieldLabel : '性别',
							flex : 0.5,
							name : 'gender',
							codeType:'GENDER',
							width : 50
						},
						{
							xtype : 'codecombo',
							labelWidth : 40,
							fieldLabel : '年龄段',
							flex : 0.6,
							name : 'agePhase',
							codeType:'AGETYPE',
							width : 50
						},
						{
							xtype : 'hidden',
							width : 50
						}]
						},
				{
					layout : 'hbox',
					defaults : {
					xtype : 'textfield',
					margin : '5 0 0 5',
					labelWidth : 60,
					width : 500,
					listeners : {
						blur : function(txt) {
						txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
						}
					}
				},
					items : [
						{
								fieldLabel : '地址',
								name : 'address'
							}]
							}, 
				{
					layout : 'hbox',
					defaults : {
						labelWidth : 30,
						labelAlign : 'left',
						margin : '10 0 10 5',
						width : 50
						},
					items : [
							{
								xtype : 'textfield',
								labelWidth : 60,
								fieldLabel : '验证码',
								flex : 0.4,
								name : ''
							},
							{
								xtype : 'button',
								labelWidth : 40,
								text : '短信发送',
								flex : 0.1,
								name : ''
							},
							{
								xtype : 'hidden',
								flex : 1
							}]
				}]
		});
		return this.registerform;
	},

	// 导入面板上的按钮
	createButtonsByReg : function() {
		var me = this;
		var buttons = [
			{
					text : '确定',
					scope : this,
					iconCls : 'icon-save',
					handler : me.doSaveImportDataByMemberReg
			}, 
			{
					text : '返回',
					scope : this,
					iconCls : 'icon-cancel',
					handler : function() {
						this.winformByMembership.close();
					}
			}];
		return buttons;
	},

	// 导入面板上保存按钮的方法
	doSaveImportDataByMemberReg : function() {
		var me = this;
		var MemberRegForm = this.registerform.getForm();
		var memberValues = MemberRegForm.getValues();
		if (!(MemberRegForm.isValid()))
			return;
		Ext.Ajax.request({
					url : basePath + '/shop/doSaveMembership.action',
					params : {
						id : memberValues.id,
						memberNo : memberValues.memberNo,
						name : memberValues.name,
						gender : memberValues.gender,
						agePhase : memberValues.agePhase,
						address : memberValues.address,
						postcode : memberValues.postcode,
						tel : memberValues.tel,
						addDate : memberValues.addDate,
						addWho : memberValues.addWho,
						editDate : memberValues.editWho,
						editWho : memberValues.editWho
					},
					success : function(response) {
						var text = Ext.decode(response.responseText);
						var success = text.success;
						MessageBox.show(success, text.json.msg);
						me.winformByMembership.close();
					}
				});
	},

	// 保存商品明细到数据库
	doSaveShopOrders : function() {
		var me = this;
		var selform = this.selform.getForm();
		var cashform = this.cashform.getForm();
		var selformValues = selform.getValues();
		var cashformValues = cashform.getValues();
		if (!((selform.isValid()) && (cashform.isValid())))
			return;
		Ext.Ajax.request({
			url : basePath + '/shop/doSaveShopOrders.action',
			params : {
				memberNo : selformValues.memberNo,
				shopOrderKey : selformValues.shopOrderKey,
				vendor : selformValues.vendor,
				sku : selformValues.sku,
				shopId : selformValues.shopId,
				spc : selformValues.spc,
				size : selformValues.size,
				model : selformValues.model,
				color : selformValues.color,
				cashType : selformValues.cashType,
				qty : cashformValues.qty,
				price : cashformValues.price,
				discount : cashformValues.discount,
				transPrice : cashformValues.transPrice
				
			},
			success : function(response) {
				var text = Ext.decode(response.responseText);
				var success = text.success;
				Ext.Ajax.request({
					url : basePath + '/shop/doQueryShopOrderSum.action',
					params : {
						shopOrderKey : selformValues.shopOrderKey
					},
					success : function(response) {
						var text = Ext.decode(response.responseText);
						var success = text.success;

						var qtySum = text.json.data[0].qtyshopordersum;
						var qtySumHtml = '<b><font color=black>'+ Ext.util.Format.number(qtySum, '0,000.000')+ '</font></b><br/>';
						SkuQtySum.update(qtySumHtml);
						var priceTotal = text.json.data[0].priceordersum;
						var transPriceSum = text.json.data[0].transpriceordersum;
						var priceHtml = '<b><font color=black>'+ Ext.util.Format.number(transPriceSum,'0,000.000') + '</font></b>';
						SKuPriceSum.update(priceHtml);

						me.ShopOrdersGrid.getStore().load();
						me.cashform.getForm().reset();
						me.selform.getForm().findField('sku').setValue('');
						me.selform.getForm().findField('spc').setValue('');
						me.selform.getForm().findField('model').setValue('');
						me.selform.getForm().findField('color').setValue('');
						me.selform.getForm().findField('size').setValue('');
						// MessageBox.show(success,"OK!");
					}
				});
			}
		});

	},
	// 删除主表上选中的记录和明细表的相关记录
	onDeleteShopOrderDetail : function() {
		var me = this;
		var selform = this.selform.getForm();
		var selformValues = selform.getValues();
		var records = me.ShopOrdersGrid.getSelectionModel().getSelection();
		if (records == "") {
			MessageBox.error('错误提示', '请选择删除的数据！');
			return;
		} else {
			var record = records[0].getData();
			MessageBox.error('错误提示', '请选择删除的数据！');
			if (record.status != 0) {
				MessageBox.error('错误提示', '该商品不可删除！');
				return;
			} else {
				Ext.MessageBox.confirm('询问提示', '确定要删除所选信息吗？', function(btn) {
					if (btn == 'yes') {
						Ext.Ajax.request({
							url : basePath+ '/shop/doDeleteShopOrderDetail.action',
							params : {
								id : record.id
							},
							success : function(response) {
								var text = Ext.decode(response.responseText);
								var success = text.success;
								me.ShopOrdersGrid.getStore().load();
								MessageBox.show(success, text.json.msg);

								Ext.Ajax.request({
									url : basePath+ '/shop/doQueryShopOrderSum.action',
									params : {
										shopOrderKey : selformValues.shopOrderKey
									},
									success : function(response) {
										var text = Ext.decode(response.responseText);
										var success = text.success;

										var qtySum = text.json.data[0].qtyshopordersum;
										var qtySumHtml = '<b><font color=black>'+ Ext.util.Format.number(qtySum, '0,000.000')+ '</font></b><br>';
										SkuQtySum.update(qtySumHtml);
										var priceTotal = text.json.data[0].priceordersum;
										var transPriceSum = text.json.data[0].transpriceordersum;
										var priceHtml = '<b><font color=black>'+ Ext.util.Format.number(transPriceSum,'0,000.000')+ '</font></b>';
										SKuPriceSum.update(priceHtml);
										me.ShopOrdersGrid.getStore().load();
										me.cashform.getForm().reset();
										me.selform.getForm().findField('sku').setValue('');
										me.selform.getForm().findField('spc').setValue('');
										me.selform.getForm().findField('model').setValue('');
										me.selform.getForm().findField('color').setValue('');
										me.selform.getForm().findField('size').setValue('');
									}
								});
							}
						});
					}
				});
			}
		}
	},

	onResetShopOrderDetail : function() {
		var me = this;
		me.cashform.getForm().reset();
		me.selform.getForm().findField('sku').setValue('');
		me.selform.getForm().findField('spc').setValue('');
		me.selform.getForm().findField('model').setValue('');
		me.selform.getForm().findField('color').setValue('');
		me.selform.getForm().findField('size').setValue('');
	},

	// 收银操作 保存到主表和明细表中
	onCashShopOrders : function() {
		var me = this;
		var selform = this.selform.getForm();
		var cashform = this.cashform.getForm();
		var selformValues = selform.getValues();
		var cashformValues = cashform.getValues();
		if (!((selform.isValid()) & (cashform.isValid())))
			return;
		Ext.Ajax.request({
					url : basePath + '/shop/doCashShopOrders.action',
					params : {
						memberNo : selformValues.memberNo,
						shopOrderKey : selformValues.shopOrderKey,
						shopId : selformValues.shopId,
						cashType : selformValues.cashType,
						totalQty : cashformValues.totalQty,
						totalAmount : cashformValues.totalAmount,
						transAmount : cashformValues.transAmount
					},
					success : function(response) {
						var text = Ext.decode(response.responseText);
						var success = text.success;
						MessageBox.show(success, text.json.msg);
						me.ShopOrdersGrid.getStore().load();
					}
				});
	},
	
	// 根据销售单号打印
	onPrintPOS : function() {
		var me = this;
		var record = me.selform.getForm().getValues();
		if (record.shopOrderKey == "") {
			MessageBox.error('错误提示', '无销售订单，本次操作无效');
			return;
		} else {
			Ext.Ajax.request({
						url : basePath + '/shop/printPos.action',
						params : {
							shopOrderKey : record.shopOrderKey,
							memberNo : record.memberNo
						},
						async : false,
						success : function(response) {
							var text = Ext.decode(response.responseText);
							url = basePath + text.json.path;
						}
					});

			try {
				delete window.frames["onPrintPOS"];
			} catch (e) {
			};
			me.winItems = {
				html : "<iframe id='onPrintPOS' name='onPrintPOS' src='"+ url+ "' style='width:100%; height:100%;' frameborder='0'></iframe>"
			};
			me.win = me.createPrinterWindow();
			me.prinerWin.show();
			me.prinerWin.on('close', function() {
						delete me.winItems1;
						delete me.prinerWin1;
						delete me.win;
					}, me);
		}
	},
	
	 //打印产生打印界面；
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
	createBtmPanel : function() {
		this.btmpanel = Ext.create('Ext.panel.Panel', {
					region : 'center',
					layout : 'border',
					items : [this.createLeftPanel(), this.createCashForm()]
				});
		return this.btmpanel;
	},

	// 底部左侧面板，包括一个grid和一个form
	createLeftPanel : function() {
		this.btmpanel = Ext.create('Ext.panel.Panel', {
					region : 'center',
					layout : 'border',
					items : [this.createShopOrdersGrid(),
							this.createLeftSumPanel()]
				});
		return this.btmpanel;
	},

	// 左边最底部面板,定义一个没有数字的空的form
	createLeftSumPanel : function() {
		var me = this;
		qtyShippedSum = Ext.create('widget.tbtext', {
					text : '',
					format : '0,000'
				});
		sumText = Ext.create('widget.label', {
					text : ''
				});
		this.bts = Ext.create('Ext.container.Container', {
					layout : {
						type : 'hbox'
					},
					region : 'south',
					defaults : {
						layout : 'hbox',
						labelWidth : 70,
						height : 170
					},
					items : [sumText, qtyShippedSum]
				});
		return this.bts;
	},

	// 底部GRID面板
	createShopOrdersGrid : function() {
		var me = this;
		this.ShopOrdersGrid = Ext.create('widget.shopordersgrid', {
					region : 'center'
				});
		this.ShopOrdersGrid.getStore().on({
			beforeload : {
				fn : function(store) {
					var params = this.ShopOrdersGrid.getStore().getProxy().extraParams;
					var record = me.selform.getForm().getValues();
					var shopOrderKey = record.shopOrderKey;
					delete params.shopOrderKey;
					if (shopOrderKey)
						params.shopOrderKey = shopOrderKey;
				},
				scope : this
			}
		});
		return this.ShopOrdersGrid;
	},

	// 底部右边面板
	createCashForm : function() {
		var me = this;
		SkuQtySum = Ext.create('widget.tbtext', {
					text : '0',
					format : '0,000.000'
				});
		SKuPriceSum = Ext.create('widget.tbtext', {
					text : '0',
					format : '0,000.000'
				});
		this.cashform = Ext.create('Ext.form.Panel', {
			region : 'east',
			width : 500,
			split : true,
			collapsible : false,
			border : true,
			frame : true,
			defaults : {
				xtype : 'fieldcontainer',
				margin : '5 0 0 5',
				frame : true
			},
			items : [
				{
					layout : 'hbox',
					defaults : {
						xtype : 'textfield',
						margin : '5 0 0 5',
						// labelAlign: 'top',
						labelWidth : 120,
						width : 400
						},
					items : [
							{
								fieldLabel : '单价',
								name : 'price',
								minHeight : '40',
								fieldStyle : 'font-size: 20px',
								labelStyle : 'font-size: 20px;font-weight: bold;'
							}]
							}, 
				{
					layout : 'hbox',
					defaults : {
						xtype : 'textfield',
						margin : '5 0 0 5',
						// labelAlign: 'top',
						labelWidth : 120,
						width : 400
						},
					items : [
							{
								fieldLabel : '成交价',
								name : 'transPrice',
								minHeight : '40',
								fieldStyle : 'font-size: 20px',
								labelStyle : 'font-size: 20px;font-weight: bold;'
								}]
							}, 
				{
				layout : 'hbox',
				defaults : {
				xtype : 'textfield',
				margin : '5 0 0 5',
				labelWidth : 120,
			    width : 400
							},
					items : [
							{
								fieldLabel : '数量',
								// xtype : 'numberfield',
								name : 'qty',
								minHeight : '40',
								fieldStyle : 'font-size: 20px',
								labelStyle : 'font-size: 20px;font-weight: bold;',
								listeners : {
									blur : function(txt) {
										skuValue = me.selform.getForm().getValues().sku;
										Ext.Ajax.request({
										url : basePath+ '/shop/doValidateShopInventoryQty.action',
										params : {
											sku : skuValue,
											qtyInput :txt.getValue()
										},
										success : function(response) { // failure属于连不上服务器的情况，后续补充
											var text = Ext.decode(response.responseText);
											var success = text.success;
											MessageBox.show(success, text.json.msg);
										}
									})
									}
								}
								}]
							},
				{
					layout : 'hbox',
					defaults : {
					xtype : 'button',
					margin : '5 0 0 5',
					width : 80,
					height : 40,
					cls : 'mybutton'
				},
					items : [
							{
								text : '<font color=black style="font-size: 20px;font-weight: bold;">确认</font> ',
								scope : this,
								handler : me.doSaveShopOrders,
								keyBinding : {
								key : 's',
								ctrl : true
								}
							},
							{
								text : '<font color=black style="font-size: 20px;font-weight: bold;">删除</font> ',
								scope : this,
								handler : me.onDeleteShopOrderDetail,
								keyBinding : {
									key : 's',
									ctrl : true
								}
							}, 
							{
								text : '<font color=black style="font-size: 20px;font-weight: bold;">重置</font> ',
								scope : this,
								handler : me.onResetShopOrderDetail,
								keyBinding : {
									key : 's',
									ctrl : true
							}
							},
							{
								text : '<font color=black style="font-size: 20px;font-weight: bold;">收银</font> ',
								scope : this,
								handler : me.onCashShopOrders,
								keyBinding : {
									key : 's',
									ctrl : true
							}
							},
							{
								text : '<font color=black style="font-size: 20px;font-weight: bold;">打印</font>  ',
								scope : this,
								handler : me.onPrintPOS,
								keyBinding : {
									key : 's',
									ctrl : true
							}
							}]
				}, 
				{
					layout : 'hbox',
					defaults : {
						xtype : 'textfield',
						margin : '5 0 0 5',
						cls : 'mylabel'
					},
					items : [
								{
									xtype : 'label',
									forId : 'myFieldId1',
									text : '商品数量：'
								}, SkuQtySum,
							]
				},
				{
					layout : 'hbox',
					defaults : {
						xtype : 'textfield',
						margin : '5 0 0 5',
						cls : 'mylabel'
					},
					items : [
								{
									xtype : 'label',
									forId : 'myFieldId1',
									text : '成交价：'
								}, SKuPriceSum
							]
				}
			]
		});
		return this.cashform;
	}
});

Ext.onReady(function() {
	Ext.create('Ext.container.Viewport', {
		layout : 'border',
			items : [{
				xtype : 'posmanager',
				region : 'center'
			}]
	});
});