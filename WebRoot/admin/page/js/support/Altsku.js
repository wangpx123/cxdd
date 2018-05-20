/*******************************************

别名  altsku.js

********************************************/


Ext.define('Altsku', {
    extend: 'Ext.data.Model',
    fields: [
		{name:'id'},
		{name:'storerKey'},            
		{name:'sku'},     
		{name:'altsku'},
		{name:'packKey'},            
		{name:'vendor'},     
		{name:'defaultUom'},
		{name:'type'},            
		{name:'udf1'},     
		{name:'udf2'},
		{name:'udf3'},            
		{name:'udf4'},     
		{name:'udf5'},
		{name:'addDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},     
		{name:'addWho'}        
	],
    idProperty: 'id'
});

//GRID面板
Ext.define('Redm.support.AltskuGrid', {
    extend: 'Redm.BaseGrid',
    alias : 'widget.altskugrid',
    loadMask: true,
    forceLayout:true,
    dockedItems: [],
    buildColumns: function(){ 
        this.columns = [
		    { header: "货主", dataIndex: 'storerKey', width: 120, sortable: true},
		    { header: "商品", dataIndex: 'sku', width: 100, sortable: true},
		    { header: "别名商品", dataIndex: 'altsku', width: 100, sortable: true},
		    { header: "包装", dataIndex: 'packKey', width: 120, sortable: true},
		    { header: "供应商", dataIndex: 'vendor', width: 100, sortable: true},
		    { header: "RF默认收货单位", dataIndex: 'defaultUom', width: 100, sortable: true},
		    { header: "类型", dataIndex: 'type', width: 120, sortable: true},
		    { header: "自定义1", dataIndex: 'udf1', width: 100, sortable: true},
		    { header: "自定义2", dataIndex: 'udf2', width: 100, sortable: true},
		    { header: "自定义3", dataIndex: 'udf3', width: 100, sortable: true},
		    { header: "自定义4", dataIndex: 'udf4', width: 100, sortable: true},
		    { header: "自定义5", dataIndex: 'udf5', width: 100, sortable: true},
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
    	this.buildStore(basePath + '/support/doQueryAltsku.action','Altsku',20);
        this.callParent(arguments);
    }
    
/*     onCreate: function(){
    	var fatherPanel = this.ownerCt.ownerCt;
    	fatherPanel.onCreate();
    },
    onDelete: function(){
    	var fatherPanel = this.ownerCt.ownerCt;
    	fatherPanel.onDelete();
    }*/
});


//主面板
Ext.define('Redm.support.Altsku', {
	extend: 'Ext.panel.Panel',
    alias : 'widget.altsku',
    title:'别名',
    layout:'border',
	initComponent: function(){
    	var me = this;
/*    		this.tbar = {
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
	                    handler: this.saveAltsku
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
//	    this.buildContextMenu();
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
			handler: me.saveAltsku,
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
    		Ext.MessageBox.confirm('询问提示', '确定要删除所选信息吗？', 
				function(btn){
					if(btn == 'yes'){
						var record = records[0].getData();
			        	Ext.Ajax.request({
						    url: basePath + '/support/doDeleteAltsku.action',
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
                    handler: me.saveAltsku,
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
                    fieldLabel: '别名商品',
                    labelWidth: 60,
//                    xtype: 'skucombo',
                    name: 'altsku'
                },
                {
                    fieldLabel: '包装',
//                    xtype: 'packcombo',
                    name: 'packKey'
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
    	this.gridPanel = Ext.create('widget.altskugrid',{
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
    		var altsku = record.altsku;
    		var packKey = record.packKey;
    		
			delete params.storerKey;
			delete params.sku;
			delete params.altsku;
			delete params.packKey;
    		
			if(storerKey) params.storerKey = storerKey;
         	if(sku) params.sku = sku;
         	if(altsku) params.altsku = altsku;
         	if(packKey) params.packKey = packKey;
    	},this);
		return this.gridPanel;
    },
    
    
    //底部右边FORM
    createForm: function(){
        var me=this;
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
                            xtype: 'storercombo',
                            name: 'storerKey',
                            listeners:{
                                blur: function(txt){
                                    //输入参数，鼠标离开后先检查该货主商品别名是否唯一
                                    storerKeyValue=txt.getValue();
                                    altskuValue= me.form.getForm().findField('altsku').getValue('');
                                    skuValue= me.form.getForm().findField('sku').getValue('');
                                    if((''!=storerKeyValue)&&(''!=skuValue)&&(''!=altskuValue))
                                    {
                                        Ext.Ajax.request({
                                            url: basePath + '/support/doValidateStorerSkuAltsku.action',   //用true or false判断有误，后续再查，改用长度判断
                                            params: {
                                                sku:skuValue,
                                                storerKey:storerKeyValue,
                                                altsku:altskuValue
                                            },
                                            success: function(response){
                                                var text = Ext.decode(response.responseText);
                                                var status = text.success;
                                                
                                                if(0!=text.json.data.length)
                                                {
                                                    MessageBox.show(false, '货主商品别名记录不唯一请重新输入');   
                                                    me.form.getForm().findField('altsku').setValue('');
                                                }
                                            }
                                      
                                        });
                                    }
                                }                                 
                            }                              
                        },
                        {
                            fieldLabel: '商品',
                            name: 'sku',
                            listeners:{
                                blur: function(txt){
                                    //输入参数，鼠标离开后先检查该货主商品是否存在
                                    skuValue=Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(skuValue); 
                                    storerKeyValue= me.form.getForm().findField('storerKey').getValue('');
                                    altskuValue= me.form.getForm().findField('altsku').getValue('');
                                    if(''!=storerKeyValue) 
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
                                                    MessageBox.show(false, '货主商品记录不存在，请重新输入');   
                                                    me.form.getForm().findField('sku').setValue('');
                                                }
                                                else
                                                {
                                                    //检查货主，商品，别名是否唯一
                                                    if((''!=storerKeyValue)&&(''!=altskuValue)&&(''!=skuValue))
                                                    {
                                                        Ext.Ajax.request({
                                                            url: basePath + '/support/doValidateStorerSkuAltsku.action',   //用true or false判断有误，后续再查，改用长度判断
                                                            params: {
                                                                sku:skuValue,
                                                                storerKey:storerKeyValue,
                                                                altsku:altskuValue
                                                            },
                                                            success: function(response){
                                                                var text = Ext.decode(response.responseText);
                                                                var status = text.success;
                                                                
                                                                if(0!=text.json.data.length)
                                                                {
                                                                    MessageBox.show(false, '货主商品别名记录不唯一请重新输入');   
                                                                    me.form.getForm().findField('altsku').setValue('');
                                                                }
                                                            }
                                                      
                                                        });
                                                    }
                                                
                                                }
                                            }
                                      
                                        });
                                    }
                                    
                                } 
                            }                             
                        },
                        {
                            fieldLabel: '别名商品',
                            name: 'altsku',
                            listeners:{
                                blur: function(txt){
                                    //输入参数，鼠标离开后先检查该货主商品别名是否唯一
                                    altskuValue=Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(altskuValue); 
                                    storerKeyValue= me.form.getForm().findField('storerKey').getValue('');
                                    skuValue= me.form.getForm().findField('sku').getValue('');
                                    if((''!=storerKeyValue)&&(''!=skuValue)&&(''!=altskuValue))
                                    {
                                        Ext.Ajax.request({
                                            url: basePath + '/support/doValidateStorerSkuAltsku.action',   //用true or false判断有误，后续再查，改用长度判断
                                            params: {
                                                sku:skuValue,
                                                storerKey:storerKeyValue,
                                                altsku:altskuValue
                                            },
                                            success: function(response){
                                                var text = Ext.decode(response.responseText);
                                                var status = text.success;
                                                
                                                if(0!=text.json.data.length)
                                                {
                                                    MessageBox.show(false, '货主商品别名记录不唯一请重新输入');   
                                                    me.form.getForm().findField('altsku').setValue('');
                                                }
                                            }
                                      
                                        });
                                    }
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
                        labelAlign: 'top',
                        flex: 1
                    },
                    items: [
                        {
                            fieldLabel: '包装',
                            xtype: 'packcombo',
                            allowBlank: false,
                            name: 'packKey',
                            value:'STD'
                        },
                        {
                            fieldLabel: '供应商',
                            name: 'vendor'
                        },
                        {
                            fieldLabel: 'RF默认收货单位',
                            xtype: 'codecombo',
                            codeType: 'RFUOM',
                            name: 'defaultUom'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults: {
                        xtype: 'textfield',
                        margin: '5 0 0 5',
                        labelAlign: 'top',
                        flex: 1
                    },
                    items: [
                        {
                            fieldLabel: '类型',
                            xtype: 'codecombo',
                            codeType: 'ALTTYPE',
                            name: 'type'
                        },
                        {
                            fieldLabel: '自定义1',
                            name: 'udf1'
                        },
                        {
                            fieldLabel: '自定义2',
                            name: 'udf2'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults: {
                        xtype: 'textfield',
                        margin: '5 0 0 5',
                        labelAlign: 'top',
                        flex: 1
                    },
                    items: [
                        {
                            fieldLabel: '自定义3',
                            name: 'udf3'
                        },
                        {
                            fieldLabel: '自定义4',
                            name: 'udf4'
                        },
                        {
                            fieldLabel: '自定义5',
                            name: 'udf5'
                        },
                        {
                            name: 'id',
                            hidden: true
                        },
                        {
                            xtype:'datefield',
                            format:'Y-m-d H:i:s',
                            name: 'addDate',
                            hidden: true
                        },
                        {
                            name: 'addWho',
                            hidden: true
                        }                           
                    ]
                }
            ]
		});
		return this.form;
	},
    
    
	saveAltsku: function(){
		var me = this;
    	var sectionForm = this.form.getForm();
    	if(!(sectionForm.isValid())) return;
    	sectionForm.submit({
		    clientValidation: true,
		    url: basePath + '/support/doSaveAltsku.action',
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
	    	xtype:'altsku',
	    	region:'center'
	    }]
	});
});
