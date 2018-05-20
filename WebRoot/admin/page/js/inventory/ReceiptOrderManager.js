var me = '';
Ext.define('Redm.view.warehouse.ReceiptOrderManager', {
    extend: 'Ext.tab.Panel',
    alias : 'widget.receiptordermanager',
	tabPosition: 'bottom',
    initComponent: function(){
    	me = this;
    	Ext.apply(this,{
    		tabPosition: 'bottom',
    		items: [this.createTabList(),this.createtabForm(),this.createTabGrid()]
    	})
	  this.callParent(arguments);
    },
    createTabList: function(){
    	var me = this;
    	this.tablist = Ext.create('Ext.panel.Panel',{
	    	title: 'List',
	    	layout: 'border',
	    	frame: true,
	    	autoHeight: true,
	    	autoWidth: true,
	    	defaults: {
	            xtype: 'fieldcontainer'
	        },
	    	items: [{
				region: 'north',
				xtype: 'form',
				frame: false,
				border: false,
				margin: '10 0 0 5',
				layout: 'anchor',
				height: 150,
				buttonAlign: 'center',
				buttons:[{
					text : "查询" ,
					iconCls : "icon-find",
					scope : this
				},{
					text : "重置",
					iconCls : "icon-reset",
					scope : this
				}],
				items: [{
					xtype: 'container',
					layout: 'hbox',
					defaults: {
						labelWidth : 80,
						xtype: 'textfield',
						margin: '0 0 0 10',
						labelAlign: 'top',
	                	width:180
					},
					items: [{
						xtype: 'storercombo',
	                	name: 'storerKey'
					},{
						name: 'receiptKey',
	                    fieldLabel: '入库单号'
					},{
						name: 'status',
	                    xtype: 'codecombo',
						listname: 'RECSTATUS',
	                    fieldLabel: '状态'
					},{
						xtype: 'datefield',
	                    name: 'receiptDateStr',
	                    fieldLabel: '收货日期',
	                    format: 'Y-m-d H:i:s'
					},{
						xtype: 'datefield',
						fieldLabel: ' ',
	                    name: 'receiptDateEnd',
	                    format: 'Y-m-d H:i:s'
					}]
				},{
					xtype: 'container',
					layout: 'hbox',
					defaults: {
						labelWidth : 80,
						xtype: 'textfield',
						margin: '0 0 0 10',
						labelAlign: 'top',
	                	width:180
					},
					items:[{
	                    name: 'type',
	                    xtype:'codecombo',
						listname: 'RECEIPTYPE',
	                    fieldLabel: '类型',
	                    value: '1',
	                	labelWidth : 80,
	                	width:180
	                },{
	                    name: 'poKey',
	                    fieldLabel: '采购订单号',
	                	labelWidth : 80,
	                	width:180
	                },{
	                    name: 'rma',
	                    fieldLabel: 'RMA Number',
	                	labelWidth : 80,
	                	width:180
	                },{
	                    name: 'proNumber',
	                    fieldLabel: 'Pro Number',
	                    hidden:true,
	                	labelWidth : 80,
	                	width:180
	                },{
	                    name: 'vendorReference',
	                    fieldLabel: '供应商参考号',
	                    hidden:true,
	                	labelWidth : 80,
	                	width:180
	                },{
	                    name: 'carrierReference',
	                    fieldLabel: '承运商参考号',
	                	labelWidth : 80,
	                	width:180
	                },{
	                    name: 'containerReference',
	                    fieldLabel: '集装箱参考号',
	                    hidden:true,
	                	labelWidth : 80,
	                	width:180
	                },{
	                    name: 'warehouseReference',
	                    fieldLabel: '仓库参考号',
	                	labelWidth : 80,
	                	width:180
	                }]
				}]
			},{
				region: 'center',
				xtype: 'grid',
				height: 480,
				dockedItems:[{
		            xtype: 'toolbar',
		            dock: 'top',
		            items: [{
			            	itemId:'createToolbar',
			                iconCls: 'icon-create',
			                text: '创建',
			                handler: this.onCreateClick,
			                scope: this
			            },'-',{
			            	itemId:'optionToolbar',
			            	iconCls: 'icon-edit',
			                text: '操作',
			                disabled: true,
			                handler: this.onUpdateClick,
			                scope: this
			            },'-',{
			            	itemId:'deleteToolbar',
			            	iconCls: 'icon-delete',
			                text: '删除',
			                disabled: true,
			                handler: this.onDeleteClick,
			                scope: this
			            }]
	            },{
			        xtype: 'pagingtoolbar',
			        store: this.store,   
			        dock: 'bottom',
			        displayInfo: true
			    }],
				store: Ext.create('Ext.data.Store', {
	    			autoLoad: false,
	    			remoteSort: true,
			        fields: [
						{name:'id'},
						{name:'receiptKey'},
						{name:'storerKey'},
						{name:'storerVat'},
						{name:'storerCompany'},
						{name:'storerAddress1'},
						{name:'receiptDate',type:'date',dateFormat : 'Y-m-d H:i:s'},
						{name:'poKey'},
						{name:'carrierKey'},
						{name:'carrierName'},
						{name:'carrierReference'},
						{name:'warehouseReference'},
						{name:'placeOfLoading'},
						{name:'placeOfDischarge'},
						{name:'placeofDelivery'},
						{name:'status'},
						{name:'statusText'},
						{name:'notes'},
						{name:'susr1'},
						{name:'susr2'},
						{name:'susr3'},
						{name:'susr4'},
						{name:'susr5'},
						{name:'type'},
						{name:'typeText'},
						{name:'rma'},
						{name:'expectedreceiptdate',type:'date',dateFormat : 'Y-m-d H:i:s'}
					],
					proxy: {
			            type: 'ajax',
			            url: 'queryReceiptOrders.action',
			            reader: {type: 'json',root: 'json.data',totalProperty: 'json.totalCount'},
			            actionMethods: { read: 'POST' },
			            simpleSortMode: true
			        },
			        sorters:[{property :'receiptKey',direction:'DESC'}]
		    }),
	        columns: [
	        	{ header: "货主", dataIndex: 'storerKey', width: 140, sortable: true},
			    { header: "入库单号", dataIndex: 'receiptKey', width: 140, sortable: true},
			    { header: "状态", dataIndex: 'statusText', width: 140, sortable: true},
			    { header: "收货时间", dataIndex: 'receiptDate', width: 140, sortable: true,renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
				{ header: "类型", dataIndex: 'typeText', width: 140, sortable: true},
				{ header: "采购订单号", dataIndex: 'poKey', width: 140, sortable: true},
			    { header: "RMA Number", dataIndex: 'rma', width: 140, sortable: true,hidden:true},
			    { header: "Pro Number", dataIndex: 'proNumber', width: 140, sortable: true,hidden:true},
			    { header: "供应商参考号", dataIndex: 'vendorReference', width: 140, sortable: true},
			    { header: "承运商参考号", dataIndex: 'carrierReference', width: 140, sortable: true},
			    { header: "集装箱参考号", dataIndex: 'containerReference', width: 140, sortable: true},
			    { header: "仓库参考号", dataIndex: 'warehouseReference', width: 140, sortable: true}
			]
		  }]
    	});
    	return this.tablist;
    },
    createtabForm : function(){
    	this.tabform = Ext.create('Ext.panel.Panel',{
    		title: 'Form',
	        layout: 'border',
	        frame: false,
	        border: false,
	        items: [{
	        	region: 'north',
	        	xtype: 'container',
	        	autoScroll : true,
				viewConfig : {
					forceFit: true,
					autoFill: true
				},
	        	height: 300,
	        	layout: 'vbox',
	        	items: [{
	        		xtype: 'container',
	        		layout: 'hbox',
	        		autoWidth: true,
	        		defaults: {
	        			width: 140,
						labelWidth: 40,
						labelAlign: 'top',
						margin: '5 0 0 5'
	        		},
	        		items: [
						{xtype: 'textfield', fieldLabel: 'ASN号',margin: '5 0 0 15'},
						{xtype: 'textfield', fieldLabel: '状态'},
		        		{xtype: 'textfield', name: '', fieldLabel: '类型'},
						{xtype: 'textfield', fieldLabel: '订单日期'}
						
	        		]
	        	},{
	        		xtype: 'container',
	        		layout: 'hbox',
	        		autoWidth: true,
	        		defaults: {
	        			width: 140,
						labelWidth: 40,
						labelAlign: 'top',
						margin: '5 0 0 5'
	        		},
	        		items: [
						{xtype: 'textfield', name: '', fieldLabel: 'PO号',margin: '5 0 0 15'},
		        		{xtype: 'textfield',fieldLabel: 'RMA参考号'},
						{xtype: 'textfield', fieldLabel: '承运商参考号'},
						{xtype: 'textfield', fieldLabel: '箱单参考号'},
						{xtype: 'textfield', fieldLabel: '承运商参考号'},
						{xtype: 'textfield',fieldLabel: '其他参考号'}
	        		]
	        	},{
	        		xtype: 'container',
	        		layout: 'hbox',
	        		autoWidth: true,
	        		defauls: {
	        			width: 140,
						labelWidth: 40,
						labelAlign: 'top'
	        		},
	        		items: [{
						xtype: 'fieldset',
						width: 310,
						autoHeight: true,
						title: '货主',
						margin: '5 0 0 5',
						items: [{
								xtype: 'container',
								width: 310,
								layout: 'hbox',
								defaults: {
									width: 140
								},
								items: [
									{xtype: 'textfield'},
									{xtype: 'textfield'}
								]
							},
							{xtype: 'textfield',width: 284},
							{xtype: 'textfield',width: 284},
							{
								xtype: 'container',
								width: 310,
								layout: 'hbox',
								defaults: {
									width: 140
								},
								items: [
									{xtype: 'textfield'},
									{xtype: 'textfield'}
								]
						}]
	        		},{
	        			xtype: 'fieldset',
						title: '承运商',
						width: 310,
						autoHeight: true,
						layout: 'vbox',
						margin: '5 0 0 5',
						items: [{
								xtype: 'container',
								width: 400,
								layout: 'hbox',
								defaults: {
									width: 140
								},
								items: [
									{xtype: 'textfield',name: ''},
									{xtype: 'textfield', name: ''}
								]
							},
							{xtype: 'textfield',width: 284},
							{xtype: 'textfield',width: 284},
							{
								xtype: 'container',
								width: 400,
								layout: 'hbox',
								defaults: {
									width: 140
								},
								items: [
									{xtype: 'textfield'},
									{xtype: 'textfield'}
								]
						}]
	        		},{
	        			xtype: 'fieldset',
	    				title: '仓库',
	    				width: 310,
	    				autoHeight: true,
	    				layout: 'vbox',
	    				margin: '5 0 0 5',
	    				items: [
	    					{
	    						xtype: 'container',
	    						width: 310,
	    						layout: 'hbox',
	    						defaults: {
	    							width: 140
	    						},
	    						items: [
	    							{xtype: 'textfield'},
	    							{xtype: 'textfield'}
	    						]
							},
	    					{xtype: 'textfield',width: 284},
	    					{xtype: 'textfield',width: 284},
	    					{
	    						xtype: 'container',
	    						width: 310,
	    						defaults: {
	    							width: 140
	    						},
	    						layout: 'hbox',
	    						items: [
	    							{xtype: 'textfield'},
	    							{xtype: 'textfield'}
	    						]
						}]
	        		}]
	        	},{
	        		xtype: 'container',
	        		layout: 'hbox',
	        		autoWidth: true,
	        		defaults: {
	        			width: 152,
						labelWidth: 40,
						labelAlign: 'top',
						xtype: 'textfield',
						margin: '5 0 0 5'
	        		},
	        		items: [{
	                    name: '',
	                    xtype: 'datefield',
	                    fieldLabel: '装货日期'
	                },{
	                    name: '',
	                    fieldLabel: '装货地点'
	                },{
	                    name: '',
	                    fieldLabel: '卸货地点'
	                },{
	                	name:'',
	                	fieldLabel: '交货地点'
	                },{
	                    name: '',
	                    xtype: 'combobox',
	                    fieldLabel: '交货方式'
	                },{
	                    name: '',
	                    xtype: 'combobox',
	                    fieldLabel: '运输方式'
	                }]
	        	},{
	        		xtype: 'container',
	        		layout: 'hbox',
	        		autoWidth: true,
	        		defaults: {
	        			width: 152,
						labelWidth: 40,
						labelAlign: 'top',
						xtype: 'textfield',
						margin: '5 0 0 5'
	        		},
	        		items: [ 
        			{xtype: 'datefield', fieldLabel: '预期到货日期'},
				    {xtype: 'datefield', fieldLabel : '实收日期',format :'Y-m-d H:i:s'},
			    	{
                    name: 'notes',
                    fieldLabel: '备注',
                    width: 310
	                }]
	        	},{
	        		xtype: 'container',
	        		layout: 'hbox',
	        		autoWidth: true,
	        		defaults: {
	        			width: 182,
						labelWidth: 40,
						labelAlign: 'top',
						xtype: 'textfield',
						margin: '5 0 0 5'
	        		},
	        		items: [{
	                    name: 'susr1',
	                    fieldLabel: '自定义1'
	                },{
	                    name: 'susr2',
	                    fieldLabel: '自定义2'
	                },{
	                    name: 'susr3',
	                    fieldLabel: '自定义3'
	                },{
	                    name: 'susr4',
	                    fieldLabel: '自定义4'
	                },{
	                    name: 'susr5',
	                    fieldLabel: '自定义5'
	                }]
	        	}]
	        },{
	        	region: 'center',
	        	xtype: 'grid',
	        	dockedItems:[{
		            xtype: 'toolbar',
		            dock: 'top',
		            items: [{
			            	text: '添加',
					        iconCls : "icon-add",
					        disabled: false,
					        handler: this.onAddClick,
					        scope: this
			            },'-',{
			            	text : "保存" ,
							iconCls : "icon-save",
							handler: this.onSaveClick,
							scope : this
			            },'-',{
			            	itemId:'deleteToolbar',
			            	iconCls: 'icon-delete',
			                text: '删除',
			                disabled: true,
			                handler: this.onDeleteClick,
			                scope: this
			            },'-',{
			            	margin: '0 0 0 650',
			                text: '从PO提取',
			                scope: this
			            },'-',{
			                text: '导入',
			                scope: this
			            },'-',{
			                text: '部分收货',
			                scope: this
			            },'-',{
			                text: '全收',
			                scope: this
			            },'-',{
			                text: '人工上架',
			                scope: this
			            },'-',{
			                text: '系统上架',
			                scope: this
			            },'-',{
				            text : "打印",
							cls : "x-btn-text-icon",
							menu : [
								'收货任务单',
								'上架任务单'
							]
						}]
		            },{
				        xtype: 'pagingtoolbar',
				        store: this.store,   
				        dock: 'bottom',
				        displayInfo: true
				    }],
	        	columns: [{
			            header: "Line #",
			            width: 45,
			            dataIndex:'receiptLineNumber',
						sortable: false
			        },{ header: "商品 *", dataIndex: 'sku', width: 140,sortable: false,
		            	editor: {
			                xtype: 'procombo',
						    allowBlank: false
						}
					},{ 
			            header: "名称 *", 
			            dataIndex: 'skuDescription', 
			            width: 140, 
			            sortable: false,
			            editor:{
			            	xtype: 'textfield'
			            } 
		            },{ 
			            header: "PO", 
			            dataIndex: 'poKey', 
			            width: 140,
			            sortable: false,
			            editor:{
			            	xtype: 'textfield'
			            }
		            },{ 
			            header: "包装 *", 
			            dataIndex: 'packKey', 
			            width: 140,
			            sortable: false,
		            	editor:{
				            xtype: 'prosincombo',
						    allowBlank: false
						}
					},{ 
						header: "单位 *", 
						dataIndex: 'uom', 
						width: 140, 
						sortable: false,
		            	editor: {
	        				xtype:'combo',
						    allowBlank: false
						}
					},{ 
		            	header: "预期数量", 
		            	dataIndex: 'qtyExpected',
		            	width: 140,
		            	sortable: false,
		            	editor:{
		            		xtype:'numberfield',
		            		minValue:0,
		            		decimalPrecision:0
	            		}
	        		},{ 
		            	header: "实收数量", 
		            	dataIndex: 'qtyReceived', 
		            	width: 140, 
		            	sortable: false,
		            	editor:{
		            		xtype:'numberfield',
		            		minValue:0,
		            		decimalPrecision:0
	            		}
	        		},{ 
		            	header: "库位 [Last]", 
		            	dataIndex: 'toLoc',
		            	width: 140, 
		            	sortable: false,
		            	editor:{
			                xtype: 'loccombo',
						    allowBlank: false
						}
					},{ 
						header: "Date [Last] *", 
						dataIndex: 'dateReceived', 
						width: 140, 
						sortable: false,
						editor:{
							xtype:'datefield',
							format:'Y-m-d H:i'
						},
						renderer : Ext.util.Format.dateRenderer('Y-m-d H:i')
					},{ 
		            	header: "Hold Code", 
		            	dataIndex: 'conditionCode', 
		            	width: 140, sortable: false,
		            	editor:{
			                xtype: 'codecombo',
			                listname: 'RECHOLD'
						}
					},
		            { header: "属性 1", dataIndex: 'lottable01', width: 140, sortable: false,editor:{xtype:'textfield'}},
		            { header: "属性 2", dataIndex: 'lottable02', width: 140, sortable: false,editor:{xtype:'textfield'}},
		            { header: "属性 3", dataIndex: 'lottable03', width: 140, sortable: false,editor:{xtype:'textfield'}},
		            { header: "属性 4", dataIndex: 'lottable04', width: 140, sortable: false,editor:{xtype:'datefield',format:'Y-m-d H:i'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i')},
		            { header: "属性 5", dataIndex: 'lottable05', width: 140, sortable: false,editor:{xtype:'datefield',format:'Y-m-d H:i'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i')},
		            { header: "属性 6", dataIndex: 'lottable06', width: 140, sortable: false,editor:{xtype:'textfield'}},
		            { header: "属性 7", dataIndex: 'lottable07', width: 140, sortable: false,editor:{xtype:'textfield'}},
		            { header: "属性 8", dataIndex: 'lottable08', width: 140, sortable: false,editor:{xtype:'textfield'}},
		            { header: "属性 9", dataIndex: 'lottable09', width: 140, sortable: false,editor:{xtype:'textfield'}},
		            { header: "属性 10", dataIndex: 'lottable10', width: 140, sortable: false,editor:{xtype:'textfield'}},
		            { header: "自定义 1", dataIndex: 'susr1', width: 140, sortable: false,editor:{xtype:'textfield'}},
		            { header: "自定义 2", dataIndex: 'susr2', width: 140, sortable: false,editor:{xtype:'textfield'}},
		            { header: "自定义 3", dataIndex: 'susr3', width: 140, sortable: false,editor:{xtype:'textfield'}},
		            { header: "自定义 4", dataIndex: 'susr4', width: 140, sortable: false,editor:{xtype:'textfield'}},
		            { header: "自定义 5", dataIndex: 'susr5', width: 140, sortable: false,editor:{xtype:'textfield'}},
		            { header: "备注", dataIndex: 'notes', width: 140, sortable: false,editor:{xtype:'textfield'}}
		        ]	        
	        }]
    	})
    	return this.tabform;
    },
    createTabGrid: function(){
    	this.tabgrid = Ext.create('Ext.grid.Panel',{
	    	title: '上架',
	    	dockedItems:[{
	            xtype: 'toolbar',
	            dock: 'top',
	            items: [{
		            	text: '插入',
				        iconCls : "icon-add",
				        disabled: false,
				        scope: this
		            },'-',{
		            	text : "保存" ,
						iconCls : "icon-save",
						scope : this
		            },'-',{
		            	itemId:'deleteToolbar',
		            	iconCls: 'icon-delete',
		                text: '删除',
		                disabled: true,
		                scope: this
		            },'-',{
		            	text : "确认上架" ,
						iconCls : "icon-save",
						scope : this
		            },'-',{
			            text : "打印",
						cls : "x-btn-text-icon",
						menu : [
							'收货任务单',
							'上架任务单'
						]
					}]
	        },{
		        xtype: 'pagingtoolbar',
		        store: this.store,   
		        dock: 'bottom',
		        displayInfo: true
		    }],
		    columns: [{ 
					header: "LINE#",
					dataIndex: '', 
					width: 140, 
					sortable: false,
					editor:{
						xtype:'textfield'
					}
				},{ 
		        	header: "商品 ", 
		        	dataIndex: '',
		        	width: 140, 
		        	sortable: false,
		        	editor:{
		        	xtype:'textfield'
		        	}
	        	},{ 
		        	header: "名称 ", 
		        	dataIndex: '', 
		        	width: 140, 
		        	sortable: false,
		        	editor:{
	        			xtype:'textfield'
	        		}
	    		},{ 
		        	header: "包装 ", 
		        	dataIndex: '', 
		        	width: 140, 
		        	sortable: false,
		        	editor:{
		        		xtype:'textfield'
	        		}
	    		},{ 
		        	header: "单位 ", 
		        	dataIndex: '',
		        	width: 140, 
		        	sortable: false,
		        	editor:{
		        		xtype:'textfield'
	        		}
	    		},{ 
		        	header: "上架数量 ", 
		        	dataIndex: '', 
		        	width: 140,
		        	sortable: false,
		        	editor:{
		        		xtype:'textfield'
	        		}
	        	},{ 
		        	header: "原库位 ", 
		        	dataIndex: '', 
		        	width: 140, 
		        	sortable: false,
		        	editor:{
		        		xtype:'textfield'
	        		}
	        	},{ 
		        	header: "上架库位 ", 
		        	dataIndex: '', 
		        	width: 140, 
		        	sortable: false,
		        	editor:{
		        		xtype:'textfield'
		        	}
	        	},{ 
		        	header: "状态", 
		        	dataIndex: '', 
		        	width: 140, 
		        	sortable: false,
		        	editor:{
		        		xtype:'textfield'
	        		}
	    		}
		    ]
    
    	})
    	return this.tabgrid;
    },
    onCreateClick: function(){
    	//this.tablist.getComponent(1).getStore().add();
    	this.tabform.getComponent(1).show();
    	console.log(this.tabform.getComponent(1));
    }
    
});
Ext.onReady(function(){
    new Ext.LoadMask('loading-mask', {msg:"打开中，请稍候..."});
    Ext.QuickTips.init();
	
    Ext.widget('viewport', {
        renderTo: Ext.getBody(),
        layout: 'fit',
        items: [Ext.widget('receiptordermanager')]
    });
    
    setTimeout(function() {
		Ext.get('loading-mask').fadeOut({remove : true});
	}, 300);
});
