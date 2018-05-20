/*******************************************************************************
 * 会员管理  Membership.js
 * 
 ******************************************************************************/

// 会员管理的数据存储数据类型定义
Ext.define('Membership', {
	extend : 'Ext.data.Model',
	fields : [
        {name : 'id'},
		{name : 'memberNo'},
		{name : 'name'},
		{name : 'gender'}, 
		{name : 'agePhase'},
		{name : 'address'}, 
		{name : 'postcode'},
		{name : 'tel'}, 
		{name : 'addWho'}, 
		{name : 'addDate',type : 'date',dateFormat : 'Y-m-d H:i:s.u'},
		{name : 'editWho'}, 
		{name : 'editDate',type : 'date',dateFormat : 'Y-m-d H:i:s.u'}
	],
	idProperty : 'id'
});

// (门店销售)的数据存储数据类型定义
Ext.define('ShopOrders', {
	extend : 'Ext.data.Model',
	fields : [
		{name : 'id'}, 
		{name : 'memberNo'},
		{name : 'shopOrderKey'},
		{name : 'shopId'},
		{name : 'cashType'}, 
		{name : 'totalQty',type : 'float'},
		{name : 'totalAmount',type : 'float'},
		{name : 'transAmount',type : 'float'},
		{name : 'addWho'},
		{name : 'addDate',type : 'date',dateFormat : 'Y-m-d H:i:s.u'},
		{name : 'editWho'}, 
		{name : 'editDate',type : 'date',dateFormat : 'Y-m-d H:i:s.u'}
	],
	idProperty : 'id'
});

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
// 上架策略主表的grid
Ext.define('Redm.shop.MembershipGrid', {
	extend : 'Redm.BaseGrid',
	alias : 'widget.MembershipGrid',
	buildColumns : function() {
		this.columns = [
			{header : "会员编号",dataIndex : 'memberNo',width : 150,sortable : true},
			{header : "姓名",dataIndex : 'name',width : 120,sortable : true},
			{header : "性别",dataIndex : 'gender',width : 120,sortable : true}, 
			{header : "年龄段",dataIndex : 'agePhase',width : 150,sortable : true},
			{header : "地址",dataIndex : 'address',width : 400,sortable : true},
			{header : "邮编",dataIndex : 'postcode',width : 140,sortable : true,hidden : true},
			{header : "电话",dataIndex : 'tel',width : 140,sortable : true,hidden : true}, 
			{header : "创建人",dataIndex : 'addWho',width : 140,sortable : true,hidden : true},
			{header : "创建时间",dataIndex : 'addDate',width : 140,sortable : true,renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s'),hidden : true}, 
			{header : "修改人",dataIndex : 'editWho',width : 140,sortable : true,hidden : true}, 
			{header : "修改时间",dataIndex : 'editDate',width : 140,sortable : true,renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s'),hidden : true}
			];
        return true;
	},
	buildDockedItems : function() {
		var me = this;
		this.dockedItems = 
        [
            {
                xtype : 'pagingtoolbar',
                store : this.store,
                dock : 'bottom',
                displayInfo : true
			}
        ];
			},
			
		initComponent : function() {
			var me = this;
			this.buildStore(basePath + '/shop/doQueryMembership.action','Membership', 20);
			this.on('itemdblclick',function(grid,record){    //鼠标双击就会跳到另外一个页面
    		var father = grid.ownerCt.ownerCt.ownerCt.ownerCt;
    		father.setActiveTab(1); 
    		father.selform.getForm().loadRecord(record);  
    		father.detailgrid.getStore().load();
    		},this);
			this.callParent(arguments);
		}
	}
);

// 门店销售表的grid
Ext.define('Redm.shop.ShopOrdersGrid', {
        extend : 'Redm.BaseGrid',
        alias : 'widget.ShopOrdersGrid',
        autoLoad : false, // 启动时不加载数据
        buildColumns : function() {
            this.columns = [
                {header : "会员编号",dataIndex : 'memberNo',width : 100,sortable : true},
                {header : "销售单号",dataIndex : 'shopOrderKey',width : 100,sortable : true}, 
                {header : "门店号",dataIndex : 'shopId',width : 100,sortable : true},
                {header : "收银方式",dataIndex : 'cashType',width : 100,sortable : true},
                {header : "总件数",dataIndex : 'totalQty',width : 100,renderer : Ext.util.Format.numberRenderer('0.000'),sortable : true}, 
                {header : "总金额",dataIndex : 'totalAmount',width : 100,renderer : Ext.util.Format.numberRenderer('0.000'),sortable : true},
                {header : "成交金额",dataIndex : 'transAmount',width : 100,renderer : Ext.util.Format.numberRenderer('0.000'),sortable : true},
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
            this.dockedItems = [
                {
                    xtype : 'pagingtoolbar',
                    store : this.store,
                    dock : 'bottom',
                    displayInfo : true
                }
            ];
        },
        initComponent : function() {
            var me = this;
            this.buildStore(basePath+'/shop/doQueryShopOrders.action','ShopOrders',20);
            this.callParent(arguments);
            }
	}
);

// 门店销售表的grid
Ext.define('Redm.shop.ShopOrdersDetailGrid', {
		extend : 'Redm.BaseGrid',
		alias : 'widget.ShopOrdersDetailGrid',
		autoLoad : false, // 启动时不加载数据
		buildColumns : function() {
			this.columns = [
                {header : "销售单号",dataIndex : 'shopOrderKey',width : 100,sortable : true}, 
                {header : "供应商",dataIndex : 'vendor',width : 100,sortable : true}, 
                {header : "商品",dataIndex : 'sku',width : 100,sortable : true}, 
                {header : "规格",dataIndex : 'spc',width : 100,sortable : true},
                {header : "型号",dataIndex : 'model',width : 100,sortable : true},
                {header : "颜色",dataIndex : 'color',width : 100,sortable : true},
                {header : "尺寸",dataIndex : 'size',width : 100,sortable : true},
                {header : "单价",dataIndex : 'price',width : 100,renderer : Ext.util.Format.numberRenderer('0.000'),sortable : true},
                {header : "折扣",dataIndex : 'discount',width : 100,renderer : Ext.util.Format.numberRenderer('0.000'),sortable : true},
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
			this.dockedItems = [
                {
                    xtype : 'pagingtoolbar',
                    store : this.store,
                    dock : 'bottom',
                    displayInfo : true
				}
            ];
		},
		initComponent : function() {
			var me = this;
     		this.buildStore(basePath+'/shop/doQueryShopOrderDetail.action','ShopOrderDetail',20);
      		this.callParent(arguments);
		}
	}
);

// 最外部容器，继承自Ext.tab.Panel，包括两个tab页
Ext.define('Redm.Shop.MembershipManager', {
	extend : 'Ext.tab.Panel',
	alias : 'widget.membershipmanager',
	title : '会员管理',
	layout : 'border',
	tabPosition : 'bottom',
	initComponent : function() {
		var me = this;
		this.items = [this.createPt1Panel(), this.createPt2Panel()]; // 两个table页
		this.callParent(arguments);
	},
	//重置方法
	onReset : function() {
		this.topform.getForm().reset();
	},

	saveMembership : function() {
		var me = this;
		var membershipForm = this.membershipForm.getForm();
		var membershipValues = membershipForm.getValues();
		if (!(membershipForm.isValid()))
			return;
		Ext.Ajax.request({
			url : basePath + '/shop/doSaveMembership.action',
			params : {
				id : membershipValues.id,
				memberNo : membershipValues.memberNo,
				name : membershipValues.name,
				gender : membershipValues.gender,
				agePhase : membershipValues.agePhase,
				address : membershipValues.address,
				agePhase : membershipValues.agePhase,
				tel : membershipValues.tel,
				editWho : membershipValues.editWho,
				editDate : membershipValues.editDate,
				addDate : membershipValues.addDate,
				addWho : membershipValues.addWho
			},
			success : function(response) {
				var text = Ext.decode(response.responseText);
				var success = text.success;
				MessageBox.show(success, text.json.msg);
				if (true == success) {
					me.membershipgrid.getStore().load();
					me.membershipForm.getForm().reset();
				}
			}
		});
	},
    
	// 删除主表上选中的记录和明细表的相关记录
	onDeleteMembership : function() {
		var me = this;
		var records = me.membershipgrid.getSelectionModel().getSelection();
		if (records == "") {
			MessageBox.error('错误提示', '请选择删除的数据！');
			return;
		} 
        else 
        {
			var record = records[0].getData();
			Ext.MessageBox.confirm('询问提示', '确定要删除所选信息吗？', function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
						url : basePath+ '/shop/doDeleteMembership.action',
						params : {
							memberNo : record.memberNo
							},
						success : function(response) {
							var text = Ext.decode(response.responseText);
							var success = text.success;
							MessageBox.show(success,text.json.msg);
							me.membershipgrid.getStore().load();
							me.membershipForm.getForm().reset();
							}
					});
				}
			});
		}
	},

	// 查询方法，主表的grid
	onSelectMembership : function() {
		this.membershipgrid.getStore().load();
	},

	// 创建第一个tab页的panel，包括一个主表grid和一个TopPanel
	createPt1Panel : function() {
		var me = this;
		this.mspanel = Ext.create('Ext.panel.Panel', {
			layout : 'border',
			border : false,
			title : '会员信息',
			items : [this.createBtmPanel(), this.createTopPanel()]
		});
		return this.mspanel;
	},

	// 底部面板，包括一个grid和一个form
	createBtmPanel : function() {
		this.btmpanel = Ext.create('Ext.panel.Panel', {
			region : 'center',
			layout : 'border',
			items : [this.createMembershipGrid(),
			this.createMembershipForm()]
		});
		return this.btmpanel;
	},

	// 第一个tab页 下部的grid，位于center位置
	createMembershipGrid : function() {
		var me = this;
		this.membershipgrid = Ext.create('widget.MembershipGrid', {
			region : 'center',
			listeners : {
				itemclick : function(grid, record) {
                    me.membershipForm.getForm().loadRecord(record);
                    // 加载时设置为只读，不能修改
                    me.membershipForm.getForm().findField('memberNo').setReadOnly(true);
                }
            }
		});
		this.membershipgrid.getStore().on('beforeload', function() {
            var params = this.membershipgrid.getStore().getProxy().extraParams;
			var record = me.topform.getForm().getValues();
			var memberNo = record.memberNo;
			delete params.memberNo;
			if (memberNo)params.memberNo = memberNo;
			}, this);
		return this.membershipgrid;
	},

	// 底部右边面板
	createMembershipForm : function() {
		this.membershipForm = Ext.create('Ext.form.Panel', {
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
			items: 
                [
                    {
                        layout : 'hbox',
						defaults : {
							xtype : 'textfield',
							margin : '5 0 0 5',
							labelAlign : 'top',
							labelWidth : 80,
							width : 160
						},
                        items: 
                        [
                            {
                                fieldLabel: '会员编号',
                                allowBlank: false,
                                listeners: 
                                {
                                    blur : function(txt) 
                                    {
                                        txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                    }
                                },
                                name : 'memberNo'
                            }
                        ]
					},
                    {
                        layout : 'hbox',
                        defaults : 
                        {
                            xtype : 'textfield',
                            margin : '5 0 0 5',
                            labelAlign : 'top',
                            width : 90,
                            labelWidth : 50
                        },
                        items: 
                        [
                            {
                                fieldLabel : '姓名',
                                allowBlank : false,
                                name : 'name',
                                listeners: 
                                {
                                    blur : function(txt) 
                                    {
                                        txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                    }
                                }
                            },
                            {
                                fieldLabel : '性别',
                                name : 'gender',
                                xtype:'codecombo',
                                codeType:'GENDER'
                            }
                        ]
                    }, 
                    {
                        layout: 'hbox',
                        defaults: 
                                    {
                            xtype : 'textfield',
                            margin : '5 0 0 5',
                            labelAlign : 'top',
                            width : 150,
                            labelWidth : 40
                        },
                        items:
                        [
                            {
                                fieldLabel : '年龄段',
                                xtype:'codecombo',
                                codeType:'AGETYPE',
                                name : 'agePhase'
                            }
                        ]
                    }, 
                    {
                        layout: 'hbox',
                        defaults:
                        {
                            xtype : 'textfield',
                            margin : '5 0 0 5',
                            labelAlign : 'top',
                            width : 300,
                            labelWidth : 40
                        },
                        items : 
                        [
                            {
                                fieldLabel : '地址',
                                name : 'address',
                                listeners: 
                                {
                                    blur : function(txt) 
                                    {
                                       txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                    }
                                }
                            }, 
                            {
                                name : 'postcode',
                                hidden : true
                            }, 
                            {
                                name : 'id',
                                hidden : true
                            }, 
                            {
                                name : 'tel',
                                hidden : true
                            }, 
                            {
                                name : 'addWho',
                                hidden : true
                            }, 
                            {
                                name : 'addDate',
                                hidden : true
                            }, 
                            {
                                name : 'editWho',
                                hidden : true
                            }, 
                            {
                                name : 'editDate',
                                hidden : true
                            }
                        ]
                    }
				]
			});
		return this.membershipForm;
	},
	
	createTopPanel : function() {
		var me = this;
		this.toppanel = Ext.create('Ext.panel.Panel', {
			region : 'north',
			border : false,
			height : 80,
			layout : 'border',
			items : [me.createTopForm(), me.createBtnPanel()]
		});
		return this.toppanel;
	},

	createTopForm : function() {
		var me = this;
		this.topform = Ext.create('Ext.form.Panel', {
			region : 'north',
			frame : true,
			height : 40,
			layout : 'hbox',
			defaults : {
				xtype : 'textfield',
				labelWidth : 60,
				margin : '5 0 0 5'
			},
			items : [
				{
                    fieldLabel : '会员编号',
                    width : 200,
                    name : 'memberNo',
                    listeners : 
                    {
                        blur : function(txt) {
                            txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                        }
                    }
				},
				{
                    xtype : 'button',
                    scope : this,
                    iconCls : 'icon-search',
                    handler : me.onSelectMembership,
                    text : '查询'
				},
				{
                    xtype : 'button',
                    scope : this,
                    iconCls : 'icon-reset',
                    handler : me.onReset,
                    text : '重置'
				}
            ]
		});
		return this.topform;
	},

	createBtnPanel : function() {
		var me = this;
		this.btnpanel = Ext.create('Ext.form.Panel', {
			region : 'center',
			frame : true,
			defaults : {
				xtype : 'button',
				margin : '5 0 0 5'
			},
			items : [
				{
                    iconCls : 'icon-delete',
                    itemId : 'delete',
                    text : '删除',
                    handler : me.onDeleteMembership, 
                    scope : this
				}, 
				{
					iconCls : 'icon-save',
					text : '保存',
					handler : me.saveMembership,
                    scope : this
				}
            ]
		});
		return this.btnpanel;
	},

	createPt2Panel : function() {
		var me = this;
		this.msdpanel = Ext.create('Ext.panel.Panel', {
			layout : 'border',
			border : false,
			title : '门店销售信息',
			items : [this.createPt2TopPanel2(),
				this.createPt2TopPanel3(), this.createPt2TopPanel()]
		});
		return this.msdpanel;
	},

	createPt2TopPanel : function() {
		this.msdtoppanel = Ext.create('Ext.panel.Panel', {
			region : 'north',
			layout : 'border',
			border : false,
			height : 40,
			items : [this.createSelForm()]
		});
		return this.msdtoppanel;
	},
	createPt2TopPanel2 : function() {
		this.msdtoppanel = Ext.create('Ext.panel.Panel', {
			region : 'center',
			layout : 'border',
			border : false,
			height : 250,
			items : [this.createDetailGrid()]
		});
		return this.msdtoppanel;
	},
	createPt2TopPanel3 : function() {
		this.msdtoppanel = Ext.create('Ext.panel.Panel', {
			region : 'south',
			layout : 'border',
			border : false,
			height : 300,
			items : [this.createDetail2Grid()]
		});
		return this.msdtoppanel;
	},

	createSelForm : function() {
		var me = this;
		this.selform = Ext.create('Ext.form.Panel', {
			region : 'center',
			frame : true,
			layout : 'hbox',
			defaults : {
				xtype : 'textfield',
				margin : '5 0 0 5',
				labelWidth : 60
			},
			items : [
				{
					fieldLabel : '会员编号',
					name : 'memberNo',
					labelWidth : 60,
					width : 200,
					listeners : {
						blur : function(txt) {
							membershipKeyValue = Ext.util.Format.uppercase(txt.getValue());
							txt.setValue(membershipKeyValue);
						}
					}
				},
				{
					xtype : 'button',
					scope : this,
					text : '查询',
					handler : me.onSelectShopOrders
				},
				{
					xtype : 'button',
					scope : this,
					handler : me.onReset,
					text : '重置'
				}
            ]
        });
		return this.selform;
	},
	createDetailGrid : function() {
		var me = this;
		this.detailgrid = Ext.create('widget.ShopOrdersGrid', {
			region : 'center'
		});
		this.detailgrid.on('itemclick',function(grid,record){
			me.detail2grid.getStore().load();
		},this);

		this.detailgrid.getStore().on('beforeload', function() {
			var params = this.detailgrid.getStore().getProxy().extraParams;
			var record = me.selform.getForm().getValues();

			var memberNo = record.memberNo;
			delete params.memberNo;
			if (memberNo)params.memberNo = memberNo;
		}, this);
		return this.detailgrid;
	},

	// 创建第二个tab页面的明细的grid
	createDetail2Grid : function() {
		var me = this;
		this.detail2grid = Ext.create('widget.ShopOrdersDetailGrid', {
			region : 'center'
		});
		this.detail2grid.getStore().on('beforeload', function() {
			var params = this.detail2grid.getStore().getProxy().extraParams;
			var records = me.detailgrid.getSelectionModel().getSelection(); 
            if(records != ''){
          	   	var data = records[0].getData();
                var shopOrderKey = data.shopOrderKey;
				if(shopOrderKey) params.shopOrderKey = shopOrderKey;
               }
		}, this);
		return this.detail2grid;
	},
	
    // 查询方法，主表的grid
	onSelectShopOrders : function() {
		this.detailgrid.getStore().load();
	}
});

Ext.onReady(function() {
	Ext.create('Ext.container.Viewport', {
		layout : 'border',
			items : [{
				xtype : 'membershipmanager',
				region : 'center'
			}]
    });
});