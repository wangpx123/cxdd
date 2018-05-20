/****************************************************
扫描装箱 box.js


*****************************************************/




//orders表需要用到的数据

Ext.define('Orders', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id'},
        {name: 'orderKey'},
        {name: 'type'},
        {name: 'ordergroup'},
        {name: 'status'}
     ]
});

//BOX表需要用到的数据
Ext.define('Box', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id'},
        {name: 'boxKey'},
        {name: 'status'},
        {name: 'boxType'},
        {name: 'wgt'},
        {name: 'cube'}  
     ]
});

//BoxDetail需要用到的数据
Ext.define('BoxDetail', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id'},
        {name: 'lineNumber'},
        {name: 'sku'},
        {name: 'altSku'},
        {name: 'lot'},
        {name: 'loc'},
        {name: 'gId'},
        {name: 'packKey'},
        {name: 'uom'},
        {name: 'qty'},
        {name: 'pickNotes'},
        {name: 'notes1'},
        {name: 'notes2'},
        {name: 'crossDocked'},
        {name: 'waveKey'}
     ]
});

//OrderGrid定义
Ext.define('Redm.OrderGrid',{
	extend: 'Redm.BaseGrid',
	alias: ['widget.ordergrid'],
	iconCls: 'icon-win',
	initComponent: function() {
		var me = this;
		this.buildStore(basePath + '/outbound/doQueryOrdersBox.action','Orders',30);
		this.getStore().on('beforeload',function(store)
            {
                var params = store.getProxy().extraParams;
                var ttl = me.down('toolbar');
                if(ttl){
                    var orderKey = ttl.getComponent(1).getValue();
                    delete params.orderKey;
                    if(orderKey) params.orderKey = orderKey;
                }
            }
        );
        this.callParent(arguments);
	},
	buildColumns: function(){
		this.columns = [
		    { header: "出库单号", dataIndex: 'orderKey', sortable: true, width: 100},
		    { header: "类型", dataIndex: 'type', sortable: true, width: 80},
		    { header: "订单组别", dataIndex: 'ordergroup', sortable: true, width: 100},
		    { header: "状态", dataIndex: 'status', sortable: true, width: 80}
		];
	},
	buildDockedItems: function(){
		var me = this;
		this.dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                layout: {overflowHandler: 'Menu'},
                items: [
                    '出库单号:',
                    {
                        xtype: 'textfield',
                        width: 90
                    },
                    '-',
                    {
                        iconCls: 'icon-search',
                        text: '查询',
                        scope: this,
                        handler: this.doQuery
                    },
                    '-',
                    {
                        iconCls: 'icon-reset',
                        text: '重置',
                        scope: this,
                        handler: this.onReset
                    }
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
	doQuery: function(){
		this.getStore().load();
        
	},
	onReset: function(){
		var me = this;
		var ttl = me.down('toolbar');
        if(ttl){
           ttl.getComponent(1).setValue('');
        }
	}
});

//BoxGrid 定义
Ext.define('Redm.BoxGrid',{
	extend: 'Redm.BaseGrid',
	alias: ['widget.boxgrid'],
	iconCls: 'icon-win',
	autoLoad: false,   //false 表示不加载，特别注意
	initComponent: function(){
        this.buildStore(basePath + '/outbound/doQueryBox.action','Box',20);
		this.callParent(arguments);
	},
	buildColumns: function(){
		this.columns = [
		    { header: "箱号", dataIndex: 'boxKey', sortable: true, width: 100},
		    { header: "状态", dataIndex: 'status', sortable: true, width: 100},
		    { header: "箱型", dataIndex: 'boxType', sortable: true, width: 100},
		    { header: "箱重", dataIndex: 'wgt', sortable: true, width: 100},
		    { header: "体积", dataIndex: 'cube', sortable: true, width: 100}
		];
	},
	buildDockedItems: function(){
		var me = this;
		this.dockedItems = [
            {
                xtype: 'pagingtoolbar',
                store: me.store,
                dock: 'bottom',
                displayInfo: true
            }
        ]
	}
});


//BoxDetailGrid 定义

Ext.define('Redm.BoxDetailGrid',{
	extend: 'Redm.BaseGrid',
	alias: ['widget.boxdetailgrid'],
	iconCls: 'icon-win',
	autoLoad: false,   //false 表示不加载，特别注意
	initComponent: function(){
		this.buildStore(basePath + '/outbound/doQueryBoxDetail.action','BoxDetail',20);
		this.callParent(arguments);
	},
	buildColumns: function(){
		this.columns = [
			{ header: "部门", dataIndex: 'waveKey',width:100, sortable: true},
		    { header: "条目", dataIndex: 'lineNumber',width:100, sortable: true},
		    { header: "商品编码", dataIndex: 'sku',width:100, sortable: true},
		    { header: "中文描述", dataIndex: 'notes1',width:150, sortable: true},
		    { header: "描述", dataIndex: 'notes2',width:150, sortable: true},
		    { header: "数量", dataIndex: 'qty',width:50, sortable: true},
		    { header: "单位", dataIndex: 'uom',width:50, sortable: true}
		];
	},
	buildDockedItems: function(){
		var me = this;
		this.dockedItems = [
            {
                xtype: 'pagingtoolbar',
                store: me.store,
                dock: 'bottom',
                displayInfo: true
            }
        ]
	}
});



Ext.define('Redm.BoxManager',{
	extend: 'Ext.panel.Panel',
	alias: ['widget.boxmanager'],
	title:'扫描装箱',
	iconCls: 'icon-win',
	layout: 'border',
	initComponent: function(){
		var me = this;
		this.items = [this.createTopPanel(),this.createBtmPanel()];
    	this.callParent(arguments);
	},
    
    
	createTopPanel: function(){
		var me  = this;
		this.toppannel = Ext.create('Ext.panel.Panel',{
			region: 'north',
			height: 250,
			layout: 'border',
			items: [me.createOrderGrid(),me.createBoxGrid()]
		});
		return this.toppannel;
	},

	createOrderGrid: function(){
		var me = this;
		this.ordergrid = Ext.create('widget.ordergrid',{
			region: 'center'
		});
		this.ordergrid.on('itemclick',function(grid,record){
//			me.detailgrid.getSelectionModel().clearSelections(); 
//            var sel=me.boxgrid.getSelectionModel().lastSelected;
//            console.log(sel);
			me.detailgrid.getStore().load();
			me.boxgrid.getStore().load();
		},this);
		return this.ordergrid;
	},
    
    
	createBoxGrid: function(){
		var me = this;
		this.boxgrid = Ext.create('widget.boxgrid',{
			region: 'east',
			width: 500
		});

        this.boxgrid.on('itemclick',function(grid,record){
			me.detailgrid.getStore().load();
		},this);
        
		this.boxgrid.getStore().on('beforeload',function(store){
			var records = me.ordergrid.getSelectionModel().getSelection(); 
			if(records != ''){
				var data = records[0].getData();
				var orderKey = data.orderKey;
				var params = store.getProxy().extraParams; 
				delete params.orderKey;
				if(orderKey) params.orderKey = orderKey;
			}
		},this);
		return this.boxgrid;
	},

	createBtmPanel: function(){
		var me = this;
		this.btmpanel = Ext.create('Ext.panel.Panel',{
			region: 'center',
			layout: 'border',
			items: [me.createDetailGrid(),me.createTab()]
		});
		return this.btmpanel;
	
	},

	createDetailGrid: function(){
		var me = this;
		this.detailgrid = Ext.create('widget.boxdetailgrid',{
			region: 'center'
		});
		this.detailgrid.getStore().on('beforeload',function(store){
			var params = store.getProxy().extraParams;

			var topRecords = me.ordergrid.getSelectionModel().getSelection(); 
			if(topRecords != ''){
				var data = topRecords[0].getData();
				var orderKey = data.orderKey;
				delete params.orderKey;
				if(orderKey) params.orderKey = orderKey;
			}
    
            //选中记录只能生效一次，但查询参数会一直保留在params中。需要删除查询参数，防止再次load时参数没有清空。
            //这里遗留一种情况，先点击boxgrid，再点击ordergrid，boxgrid最后一次选中记录会生效。要再次点击同一条记录，boxgrid记录才会失效
            delete params.boxKey;              
            
            var boxRecords = me.boxgrid.getSelectionModel().getSelection(); 
            if(boxRecords != ''){
                var bData = boxRecords[0].getData();
                var boxKey = bData.boxKey;
                delete params.boxKey;
                if(boxKey) params.boxKey = boxKey;
            }
		},this);
		return this.detailgrid;
	},

    //创建输入的tab
	createTab: function(){
		var me = this;
		this.tap = Ext.create('Ext.tab.Panel',{
			region: 'east',
			width: 400,
			items: [me.createDoBox1(),me.createDoBox2()]
		});
		return this.tap;
	},

	createDoBox1: function(){
		var me = this;
		this.dobox1 = Ext.create('Ext.form.Panel',{
			title: '摘果式',
			frame: true,
			defaults: {
				xtype: 'fieldcontainer',
				margin: '2 2 2 2',
				layout: 'hbox'
			},
			items:[
                {
                    defaults: {
                        xtype: 'textfield',
                        width: 220,
                        labelWidth: 60
                    },
                    items:[
                        {
                            fieldLabel: '订单号',
                            name: 'orderKey',
                            allowBlank: false,
                            listeners: {
                                afterRender: function(thisForm, options){
                                    this.keyNav = Ext.create('Ext.util.KeyNav', this.el, {
                                        enter: function(){
                                            var form = me.dobox1.getForm();
                                            var waveKey = form.findField('waveKey');
                                            var store = waveKey.getStore();
                                            var orderKey = form.findField('orderKey').getValue();
                                            var params = store.getProxy().extraParams;
                                            delete params.orderKey;
                                            params.orderKey = orderKey;
                                            store.load();
                                            waveKey.focus();
                                        },
                                        scope: this
                                    });
                                }
                            }
                        }
                    ]
                },
                {
                    defaults: {
                        xtype: 'textfield',
                        width: 200,
                        labelWidth: 60
                    },
                    items:[
                        {//error start
                            fieldLabel: '订货部门',
                            allowBlank: false,
                            xtype: 'wavekeycombo',       //BaseGrid中自定义的类型，详见该js文件
                            width: 150,
                            listeners: {
                                change:function(cmb,newValue){
                                    var form = me.dobox1.getForm();
                                    var locked = form.findField('locked');
                                    if(newValue != ''){
                                        locked.setDisabled(false);
                                        Ext.Ajax.request({
                                   //         url: basePath + '/system/queryQty.action',
                                            params: {
                                                waveKey: newValue
                                            },
                                            success: function(response){
                                                var text = Ext.decode(response.responseText);
                                                var success = text.success;
                                                var map = text.json.map;
                                                form.findField('totalQty').setValue(map.totaltty);
                                                form.findField('boxedQty').setValue(map.qty);
                                                locked.focus();
                                            }
                                        });
                                    }else{
                                        locked.setDisabled(true);
                                    }
                                }
                            },
                            name: 'waveKey'
                        },
                        {
                            xtype: 'checkbox',
                            margin: '2 2 2 10',
                            boxLabel: '锁定部门',
                            disabled: true,
                            listeners: {
                                change: function(ckb,newValue){
                                    var form = me.dobox1.getForm();
                                    var waveKey = form.findField('waveKey');
                                    var boxKey = form.findField('boxKey');
                                    if(newValue == true){
                                        waveKey.setReadOnly(true);
                                        boxKey.focus();
                                    }else{
                                        waveKey.setReadOnly(false);
                                    }
                                }
                            },
                            name: 'locked'
                        }
                    ]
                    
                },
                {
                    defaults: {
                        xtype: 'textfield',
                        width: 220,
                        labelWidth: 60
                    },
                    items:[{
                        fieldLabel: '箱号',
                        name: 'boxKey',
                        allowBlank: false,
                        listeners: {
                            afterRender: function(thisForm, options){
                                this.keyNav = Ext.create('Ext.util.KeyNav', this.el, {
                                    enter: function(){
                                        var form = me.dobox1.getForm();
                                        var boxKey = form.findField('boxKey');
                                        var lineNumber = form.findField('lineNumber');
                                        if(boxKey.getValue() != ''){
                                            lineNumber.focus();
                                        }else{
                                            MessageBox.error('错误提示','箱号不可以为空！');
                                        }
                                    },
                                    scope: this
                                });
                            }
                        }
                    }]
                },
                {
                    defaults: {
                        xtype: 'textfield',
                        width: 200,
                        labelWidth: 60
                    },
                    items:[{
                        fieldLabel: '订单条目',
                        width: 160,
                        allowBlank: false,
                        name: 'lineNumber',
                        listeners: {
                            afterRender: function(thisForm, options){
                                this.keyNav = Ext.create('Ext.util.KeyNav', this.el, {
                                    enter: function(){
                                        var form = me.dobox1.getForm();
                                        var lineNumber = form.findField('lineNumber');
                                        var waveKey = form.findField('waveKey');
                                        var orderKey = form.findField('orderKey');
                                        var sku = form.findField('sku');
                                        Ext.Ajax.request({
                                            url: basePath + '/system/checkLineNumber.action',
                                            params: {
                                                lineNumber: lineNumber.getValue(),
                                                waveKey: waveKey.getValue(),
                                                orderKey: orderKey.getValue()
                                            },
                                            success: function(response){
                                                var text = Ext.decode(response.responseText);
                                                var success = text.success;
                                                if(success){
                                                    sku.focus();					        	
                                                }else{
                                                    sku.setValue('');
                                                    MessageBox.show(success, text.json.msg);
                                                }
                                            }
                                        });
                                    },
                                    scope: this
                                });
                            }
                        }
                    },{
                        readOnly: true,
                        margin: '0 0 0 10',
                        name: 'totalQty',
                        width: 50
                    }]
                },
                {
                    defaults: {
                        xtype: 'textfield',
                        width: 200,
                        labelWidth: 60
                    },
                    items:[{
                        fieldLabel: '商品编号',
                        width: 160,
                        allowBlank: false,
                        listeners: {
                            afterRender: function(thisForm, options){
                                this.keyNav = Ext.create('Ext.util.KeyNav', this.el, {
                                    enter: function(){
                                        var form = me.dobox1.getForm();
                                        var lineNumber = form.findField('lineNumber');
                                        var waveKey = form.findField('waveKey');
                                        var orderKey = form.findField('orderKey');
                                        var sku = form.findField('sku');
                                        var notes1 = form.findField('notes1');
                                        var notes2 = form.findField('notes2');
                                        var qty = form.findField('qty');
                                        Ext.Ajax.request({
    //									    url: basePath + '/system/checkSku.action',
                                            params: {
                                                lineNumber: lineNumber.getValue(),
                                                waveKey: waveKey.getValue(),
                                                orderKey: orderKey.getValue(),
                                                sku: sku.getValue()
                                            },
                                            success: function(response){
                                                var text = Ext.decode(response.responseText);
                                                var success = text.success;
                                                if(success){
                                                    var map = text.json.map;
                                                    notes1.setValue(map.notes1);
                                                    notes2.setValue(map.notes2);
                                                    var p = form.findField('p').getValue();
                                                    if(p){
                                                        me.onSave1();
                                                    }else{
                                                        qty.focus();
                                                    }
                                                }else{
                                                    sku.setValue('');
                                                    MessageBox.show(success, text.json.msg)
                                                }
                                            }
                                        });
                                    },
                                    scope: this
                                });
                            }
                        },
                        name: 'sku'
                    },{
                        readOnly: true,
                        margin: '0 0 0 10',
                        name: 'boxedQty',
                        width: 50
                    }]
                },
                {
                    defaults: {
                        xtype: 'textfield',
                        width: 220,
                        labelWidth: 60
                    },
                    items:[{
                        name: '',
                        fieldLabel: '-',
                        name: 'notes1',
                        readOnly: true
                    }]
                },
                {
                    defaults: {
                        xtype: 'textfield',
                        width: 220,
                        labelWidth: 60
                    },
                    items:[{
                        name: '',
                        fieldLabel: '-',
                        name: 'notes2',
                        readOnly: true
                    }]
                },
                {
                    defaults: {
                        xtype: 'textfield',
                        width: 200,
                        labelWidth: 60
                    },
                    items:[{
                        fieldLabel: '数量',
                        value: 1,
                        allowBlank: false,
                        xtype: 'numberfield',
                        name: 'qty',
                        readOnly: true,
                        width: 150
                    },{
                        xtype: 'checkbox',
                        margin: '2 2 2 20',
                        checked: true,
                        boxLabel: '批量装',
                        name: 'p',
                        listeners: {
                            change: function(ckb,newValue){
                                var form = me.dobox1.getForm();
                                var qty = form.findField('qty');
                                if(newValue == true){
                                    qty.setReadOnly(true);
                                }else{
                                    qty.setReadOnly(false);
                                    qty.setValue('');
                                }
                            }
                        }
                    }]
                },
                {
                    defaults: {
                        xtype: 'button',
                        margin: '0 0 0 20',
                        width: 80
                    },
                    items:[{
                        xtype: 'button', 
                        text: '确定',
                        scope: this,
                        handler: function(){
                            var form = me.dobox1.getForm();
                            var p = form.findField('p').getValue();
                            if(!p){
                                me.onSave1();
                            }
                        }
                    },{
                        xtype: 'button', 
                        text: '装满',
                        handler: function(){
                            var form = me.dobox1.getForm();
                            var orderKey = form.findField('orderKey').getValue();
                            var boxKey = form.findField('boxKey').getValue();
                            if(orderKey == ''){
                                MessageBox.error('错误提示','单号不可以为空！');
                                return;
                            }
                            if(boxKey == ''){
                                MessageBox.error('错误提示','箱号不可以为空！');
                                return;
                            }
                            Ext.Ajax.request({
                                url: basePath + '/system/updateBoxStatus.action',
                                params: {
                                    orderKey: orderKey,
                                    boxKey: boxKey
                                },
                                success: function(response){
                                   var text = Ext.decode(response.responseText);
                                   var success = text.success;
                                   MessageBox.show(success,text.json.msg);
                                   form.reset();
                                }
                            });
                        }
                    }]
                }
            ]
		});
		return this.dobox1;
	},
	onSave1: function(){
		var me = this;
		var form = me.dobox1.getForm();
		if(!form.isValid()){
			return ;
		}else{
			form.submit({
			    clientValidation: true,
//			    url: basePath + '/system/saveBox.action',
			    params: {},
			    success: function(form, action) {
			    	var success = action.result;
			    	MessageBox.show(success, success.json.msg);
			        form.reset();
			    },
			    failure: function(form, action) {
			    	var success = action.result;
			        MessageBox.error("错误提示", success.json.msg);
			    }
			});
		}
		
	},
	createDoBox2: function(){
		var me = this;
		this.dobox2 = Ext.create('Ext.form.Panel',{
			title: '播种式',
			frame: true,
			defaults: {
				xtype: 'fieldcontainer',
				margin: '2 2 2 2',
				layout: 'hbox'
			},
			items:[
                {
                    defaults: {
                        xtype: 'textfield',
                        width: 220,
                        labelWidth: 60
                    },
                    items:[
                        {
                            fieldLabel: '订单号',
                            name: 'orderKey',
                            allowBlank: false,
                            listeners: {
                                afterRender: function(thisForm, options){
                                        this.keyNav = Ext.create('Ext.util.KeyNav', this.el, 
                                        {
                                            enter: function(){
                                                var form = me.dobox2.getForm();
                                                var lineNumber = form.findField('lineNumber');
                                                lineNumber.focus();
                                            },
                                            scope: this
                                        }
                                    );
                                }
                            }
                        }
                    ]
                },
                {
                    defaults: {
                        xtype: 'textfield',
                        width: 220,
                        labelWidth: 60
                    },
                    items:[
                        {
                            fieldLabel: '订单条目',
                            name: 'lineNumber',
                            allowBlank: false,
                            listeners: {
                                afterRender: function(thisForm, options){
                                    this.keyNav = Ext.create('Ext.util.KeyNav', this.el, 
                                        {
                                            enter: function(){
                                                var form = me.dobox2.getForm();
                                                var sku = form.findField('sku');
                                                sku.focus();
                                            },
                                            scope: this
                                        }
                                    );
                                }
                            }
                        }
                    ]
                },
                {
                    defaults: {
                        xtype: 'textfield',
                        width: 220,
                        labelWidth: 60
                    },
                    items:[
                    {
                        fieldLabel: '商品编码',
                        allowBlank: false,
                        listeners: {
                            afterRender: function(thisForm, options){
                                this.keyNav = Ext.create('Ext.util.KeyNav', this.el, {
                                    enter: function(){
                                        var form = me.dobox2.getForm();
                                        var waveKey = form.findField('waveKey');
                                        var notes1 = form.findField('notes1');
                                        var notes2 = form.findField('notes2');
                                        var boxKey1 = form.findField('boxKey1');
                                        var boxKey = form.findField('boxKey');
                                        
                                        var orderKey = form.findField('orderKey').getValue();;
                                        var lineNumber = form.findField('lineNumber').getValue();
                                        var sku = form.findField('sku').getValue();
                                        
                                        Ext.Ajax.request(
                                            {
                                                //url: basePath + '/system/queryInfos.action',
                                                params: {
                                                    orderKey: orderKey,
                                                    lineNumber: lineNumber,
                                                    sku: sku
                                                },
                                                success: function(response)
                                                {
                                                   var text = Ext.decode(response.responseText);
                                                   var success = text.success;
                                                   if(success){
                                                       var map = text.json.map;
                                                       if(map){
                                                           waveKey.setValue(map.waveKey);
                                                           notes1.setValue(map.notes1);
                                                           notes2.setValue(map.notes2);
                                                           boxKey1.setValue(map.boxKey);
                                                           boxKey.focus();
                                                       }else{
                                                            MessageBox.error('错误提示',text.json.msg);
                                                       }
                                                   }else{
                                                       MessageBox.show(success,text.json.msg);
                                                   }
                                                }
                                            }
                                        );
                                    },
                                    scope: this
                                });
                            }
                        },
                        name: 'sku'
                    }]
                },
                {
                    defaults: {
                        xtype: 'textfield',
                        width: 220,
                        labelWidth: 60
                    },
                    items:[{
                        fieldLabel: '-',
                        name: 'notes1'
                    }]
                },
                {
                    defaults: {
                        xtype: 'textfield',
                        width: 220,
                        readOnly: true,
                        labelWidth: 60
                    },
                    items:[{
                        fieldLabel: '-',
                        readOnly: true,
                        name: 'notes2'
                    }]
                },
                {
                    defaults: {
                        xtype: 'textfield',
                        width: 220,
                        labelWidth: 60
                    },
                    items:[{
                        fieldLabel: '订单部门',
                        allowBlank: false,
                        name: 'waveKey'
                    }]
                },
                {
                    defaults: {
                        xtype: 'textfield',
                        width: 180,
                        labelWidth: 60
                    },
                    items:[{
                        fieldLabel: '箱号',
                        readOnly: true,
                        name: 'boxKey1'
                    },{
                        name: 'boxKey',
                        width: 120,
                        allowBlank: false,
                        listeners: {
                            afterRender: function(thisForm, options){
                                this.keyNav = Ext.create('Ext.util.KeyNav', this.el, {
                                    enter: function(){
                                        var form = me.dobox2.getForm();
                                        var boxKey1 = form.findField('boxKey1').getValue();
                                        var boxKey = form.findField('boxKey').getValue();
                                        var p = form.findField('p').getValue();
                                        if(boxKey1 != ''){
                                            if(boxKey == boxKey1){
                                                if(p){//保存
                                                    me.onSave2();
                                                }else{
                                                    form.findField('qty').focus();
                                                }
                                                
                                            }else{
                                                MessageBox.error('错误提示',"箱号不一致！");
                                            }
                                        }else{
                                            if(p){//保存
                                                me.onSave2();
                                            }else{
                                                form.findField('qty').focus();
                                            }
                                        }
                                    },
                                    scope: this
                                });
                            }
                        },
                        margin: '0 0 0 10'
                    }]
                },
                {
                    defaults: {
                        xtype: 'textfield',
                        width: 200,
                        labelWidth: 60
                    },
                    items:[{
                        fieldLabel: '数量',
                        name: 'qty',
                        allowBlank: false,
                        readOnly: true,
                        value: 1,
                        xtype: 'numberfield',
                        width: 150
                    },{
                        xtype: 'checkbox',
                        margin: '2 2 2 20',
                        checked: true,
                        boxLabel: '批量装',
                        name: 'p',
                        listeners: {
                            change: function(ckb,newValue){
                                var form = me.dobox2.getForm();
                                var qty = form.findField('qty');
                                if(newValue == true){
                                    qty.setReadOnly(true);
                                }else{
                                    qty.setValue('');
                                    qty.setReadOnly(false);
                                }
                            }
                        }
                    }]
                },
                {
                    defaults: {
                        xtype: 'button',
                        margin: '0 0 0 20',
                        width: 80
                    },
                    items:[
                        {
                            xtype: 'button', 
                            text: '确定',
                            handler: function(){
                                var form = me.dobox2.getForm();
                                var p = form.findField('p').getValue();
                                if(!p){
                                    me.onSave2();
                                }
                            }
                        },
                        {
                            xtype: 'button', 
                            text: '装满',
                            handler: function(){
                                var form = me.dobox2.getForm();
                                var orderKey = form.findField('orderKey').getValue();
                                var boxKey = form.findField('boxKey').getValue();
                                if(orderKey == ''){
                                    MessageBox.error('错误提示','单号不可以为空！');
                                    return;
                                }
                                if(boxKey == ''){
                                    MessageBox.error('错误提示','箱号不可以为空！');
                                    return;
                                }
                                Ext.Ajax.request(
                                    {
                                       // url: basePath + '/system/updateBoxStatus.action',
                                        params: {
                                            orderKey: orderKey,
                                            boxKey: boxKey
                                        },
                                        success: function(response){
                                           var text = Ext.decode(response.responseText);
                                           var success = text.success;
                                           MessageBox.show(success,text.json.msg);
                                        }
                                    }
                                );
                            }
                        }
                    ]
                }
            ]
		});
		return this.dobox2;
	},
	onSave2: function(){
		var me = this;
		var form = me.dobox2.getForm();
		if(!form.isValid()){
			return ;
		}else{
			form.submit({
			    clientValidation: true,
			   // url: basePath + '/system/saveBox.action',
			    params: {},
			    success: function(form, action) {
			    	var success = action.result;
			        MessageBox.show(success, success.json.msg);
			        form.reset();
			    },
			    failure: function(form, action) {
			    	var success = action.result;
			        MessageBox.error("错误提示", success.json.msg);
			    }
			});
		}
		
	},

    
});

Ext.onReady(function(){
	Ext.create('Ext.container.Viewport', {
	    layout: 'border',
	    items: [{
	    	xtype:'boxmanager',
	    	region:'center'
	    }]
	});
});
