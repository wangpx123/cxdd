/********************************************
替代品 SubstituteSku.js



*********************************************/

Ext.define('SubstituteSku', {
    extend: 'Ext.data.Model',
    fields: [
		{name:'id'},
		{name:'storerKey'},            
		{name:'sku'},     
		{name:'substituteSku'},
		{name:'status'},            
		{name:'sequence'},     
		{name:'packKey'},
		{name:'uomQty'},            
		{name:'uom'},     
		{name:'qty'},
		{name:'subpackKey'},            
		{name:'subuomQty'},     
		{name:'subuom'},
		{name:'subQty'},
		{name:'addDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},     
		{name:'addWho'}           
	],
    idProperty: 'id'
});

//GRID面板
Ext.define('Redm.support.substituteSkuGrid', {
    extend: 'Redm.BaseGrid',
    alias : 'widget.substituteskugrid',
    loadMask: true,
    forceLayout:true,
    dockedItems: [],
    buildColumns: function(){
        this.columns = [
		    { header: "货主", dataIndex: 'storerKey', width: 120, sortable: true},
		    { header: "商品", dataIndex: 'sku', width: 100, sortable: true},
		    { header: "替代商品", dataIndex: 'substituteSku', width: 100, sortable: true},
		    { header: "状态", dataIndex: 'status', width: 120, sortable: true},
		    { header: "替代顺序", dataIndex: 'sequence', width: 100, sortable: true},
		    { header: "包装", dataIndex: 'packKey', width: 100, sortable: true},
		    { header: "单位数量", dataIndex: 'uomQty', width: 120, sortable: true},
		    { header: "单位", dataIndex: 'uom', width: 100, sortable: true},
		    { header: "数量", dataIndex: 'qty', width: 100, sortable: true},
		    { header: "替代包装", dataIndex: 'subpackKey', width: 100, sortable: true},
		    { header: "替代单位数量", dataIndex: 'subuomQty', width: 100, sortable: true},
		    { header: "替代单位", dataIndex: 'subuom', width: 100, sortable: true},
		    { header: "替代数量", dataIndex: 'subQty', width: 100, sortable: true},
		    { header: "id",dataIndex: 'id',hidden: true},
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
    	this.buildStore(basePath + '/support/doQuerySubstituteSku.action','SubstituteSku',20);
        this.callParent(arguments);
    }
    
/*    onCreate: function(){
    	var fatherPanel = this.ownerCt.ownerCt;
    	fatherPanel.onCreate();
    },
    onDelete: function(){
    	var fatherPanel = this.ownerCt.ownerCt;
    	fatherPanel.onDelete();
    }*/
});


//主面板
Ext.define('Redm.support.SubstituteSku', {
	extend: 'Ext.panel.Panel',
    alias : 'widget.substitutesku',
    title:'替代品',
    layout:'border',
	initComponent: function(){
    	var me = this;
//    	this.buildContextMenu();
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
	                    handler: this.saveSection
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
    	this.items = [this.createTopPanel(),this.createBtmPanel()];
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
			handler: me.saveSection,
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
    
    onCreate: function(){
    	this.form.getForm().reset();
    },
    
    onSelect: function(){
    	this.gridPanel.getStore().load();
    },
    
    onReset: function(){
		this.selform.getForm().reset();
	},
    
    onDelete: function(){
    	var me = this;
    	var records = me.gridPanel.getSelectionModel().getSelection(); 
    	if(records == ""){
    		MessageBox.error('错误提示','请选择删除的数据！');
    		return;
    	}else{
    		var record = records[0].getData();

            Ext.MessageBox.confirm('询问提示', '确定要删除吗？', 
                function(btn){
                    if(btn == 'yes'){ 
                        Ext.Ajax.request({
                            url: basePath + '/support/doDeleteSubstituteSku.action',
                            params: {
                                id: record.id
                            },
                            success: function(response){
                                var text = Ext.decode(response.responseText);
                                var success = text.success;
                                MessageBox.show(success, text.json.msg);
                                me.gridPanel.getStore().load();
                                me.form.getForm().reset();
                            }
                        });
                    }
                }
            );              
    	}
    },
    
    //顶部面板
    createTopPanel: function(){
    	var me = this;
    	this.toppanel = Ext.create('Ext.panel.Panel',{
    		region: 'north',
    		height: 100,
    		layout: 'border',
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
    
    //顶部按钮面板
    createBtnForm: function(){
    	var me = this;
    	this.btnform = Ext.create('Ext.form.Panel',{
    		region: 'center',
    		frame: true,
    		border: false,
    		defaults: {
    			xtype: 'button',
    			margin: '5 0 0 5' 
    		},
    		items:[
                {
                    iconCls: 'icon-create',
                    text: '创建',
                    handler: me.onCreate,
                    scope: this
                },
                {
                    iconCls: 'icon-delete',
                    itemId: 'delete',
                    text: '删除',
                    handler: me.onDelete,
                    scope: this
                },
                {
                    iconCls: 'icon-save',
                    itemId: 'save',
                    text: '保存',
                    handler: me.saveSection,
                    scope: this
                }
            ]
    	});
    	return this.btnform;
    },
    
    //顶部查询面板
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
    			margin: '5 0 0 5',
    			labelWidth: 40
    		},
    		items:[
                {
                    fieldLabel: '货主',
//                    xtype: 'storercombo',
                    listeners:{
                        blur:function(txt){
                          txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                        }
                    },
                    name: 'storerKey'
                },
                {
                    fieldLabel: '商品',
//                    xtype: 'skucombo',
                    name: 'sku'
                },
                {
                    fieldLabel: '替代商品',
                    labelWidth: 60,
//                    xtype: 'skucombo',
                    name: 'substituteSku'
                },
                {
                    xtype: 'button',
                    iconCls: 'icon-search',
                    scope: this,
                    handler: me.onSelect,
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
    
    //底部面板
    createBtmPanel: function(){
    	this.btmpanel = Ext.create('Ext.panel.Panel',{
    		region: 'center',
    		layout: 'border',
    		border: false,
    		items:[this.createGridPanel(),this.createForm()]
    	});
    	return this.btmpanel;
    },
    
    //底部GRID
    createGridPanel:function(){
    	var me = this;
    	this.gridPanel = Ext.create('widget.substituteskugrid',{
			region: 'center',
			listeners: {
    			itemclick: function(grid,record){
    				me.form.getForm().loadRecord(record);
    			}
    		}
		});
		this.gridPanel.getStore().on('beforeload',function(){
    		var params = this.gridPanel.getStore().getProxy().extraParams;
    		var record = me.selform.getForm().getValues();
    		
    		var storerKey = record.storerKey;
    		var sku = record.sku;
    		var substituteSku = record.substituteSku;
    		
			delete params.storerKey;
			delete params.sku;
    		delete params.substituteSku;
    		
			if(storerKey) params.storerKey = storerKey;
         	if(sku) params.sku = sku;
         	if(substituteSku) params.substituteSku = substituteSku;
    	},this);
		return this.gridPanel;
    },
    
    
    //底部右边FORM
    createForm: function(){
		this.form = Ext.create('Ext.form.Panel',{
			region: 'east',
			frame: true,
			border: false,
			split: true,
			collapsible: true,
			width: 450,
			defaults: {
				margin: '5 0 0 5',
				xtype: 'fieldcontainer' 
			},
			items: [
                {
                    layout: 'hbox',
                    defaults: {
                        xtype: 'textfield',
                        margin: '5 0 0 5',
                        allowBlank: false,
                        labelAlign: 'top',
                        flex: 1
                    },
                    items: [
                        {
                            fieldLabel: '货主',
                            name: 'storerKey',
                            xtype: 'storercombo'
                        },
                        {
                            fieldLabel: '商品',
                            name: 'sku',
                            xtype: 'skucombo'
                        },
                        {
                            fieldLabel: '替代商品',
                            name: 'substituteSku',
                            xtype: 'skucombo'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults: {
                        xtype: 'textfield',
                        margin: '5 0 0 5',
                        flex: 1,
                        allowBlank: false,
                        labelAlign: 'top'
                    },
                    items: [
                        {
                            fieldLabel: '状态',
                            name: 'status'
                        },
                        {
                            fieldLabel: '替代顺序',
                            xtype: 'numberfield',
                            minValue:0,
                            name: 'sequence'
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
                                                     me.form.getForm().findField('packKey').setValue('');                                                         
                                   
                                                }
                                            }
                                        })
                                    }
                                }
                            },
                            allowBlank: false,                                
                            width: 160
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults: {
                        xtype: 'textfield',
                        margin: '5 0 0 5',
                        flex: 1,
                        labelAlign: 'top'
                    },
                    items: [
                        {
                            xtype: 'codecombo',
                            codeType: 'PREALLCATEUOM',
                            fieldLabel: '单位',
                            name: 'uom'
                        },
                        {
                            fieldLabel: '数量',
                            xtype: 'numberfield',
                            minValue:0,
                            name: 'qty'
                        },
                        {
                            fieldLabel: '替代包装',
                            xtype:'textfield',
                            name: 'subpackKey',
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
                                                     me.form.getForm().findField('packKey').setValue('');                                                         
                                   
                                                }
                                            }
                                        })
                                    }
                                }
                            },
                            allowBlank: false,                            
                            width: 160
                        }                        
                    ]
                },
                {
                    layout: 'hbox',
                    defaults: {
                        xtype: 'textfield',
                        margin: '5 0 0 5',
                        flex: 1,
                        labelAlign: 'top'
                    },
                    items: [
                        {
                            fieldLabel: '替代单位数量',
                            xtype: 'numberfield',
                            minValue:0,
                            name: 'subuomQty'
                        },
                        {
                            fieldLabel: '替代单位',
                            name: 'subuom'
                        },
                        {
                            fieldLabel: '替代数量',
                            xtype: 'numberfield',
                            minValue:0,
                            name: 'subQty'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults: {
                        xtype: 'numberfield',
                        minValue:0,
                        margin: '5 0 0 5',
                        flex: 1,
                        labelAlign: 'top'
                    },
                    items: [
                        {
                            fieldLabel: '单位数量',
                            name: 'uomQty'
                        },
                        {
                            xtype: 'textfield',
                            name: 'id',
                            xtype: "hidden"
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
                }
            ]
		});
		return this.form;
	},
    
    
	saveSection: function(){
		var me = this;
    	var sectionForm = this.form.getForm();
    	if(!(sectionForm.isValid())) return;
    	sectionForm.submit({
		    clientValidation: true,
		    url: basePath + '/support/doSaveSubstituteSku.action',
		    params: {},
		    success: function(form, action) {
		    	var success = action.result;
		        MessageBox.show(success.success, success.json.msg);
                if(true==success.success)
                {                          
                    sectionForm.reset();
                    me.gridPanel.getStore().load();
                }
		    },
		    failure: function(form, action) {
		    	var success = action.result;
		        MessageBox.show(success.success, success.json.msg);
		        //sectionForm.reset();
		        me.gridPanel.getStore().load();
		    }
		});
	}
});

Ext.onReady(function(){
	Ext.create('Ext.container.Viewport', {
	    layout: 'border',
	    items: [{
	    	xtype:'substitutesku',
	    	region:'center'
	    }]
	});
});