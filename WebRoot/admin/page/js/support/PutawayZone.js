/*************************
库区 PutawayZone.js


****************************/


Ext.define('PutawayZone', {
    extend: 'Ext.data.Model',
    fields: [
		{name:'id'},
		{name:'putawayZone'},            
		{name:'descrption'},
		{name:'area'},
		{name:'notes'},
		{name:'addDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},     
		{name:'addWho'}        
	],
    idProperty: 'id'
});


//GRID面板
Ext.define('Redm.support.PutAwayZoneGrid', {
    extend: 'Redm.BaseGrid',
    alias : 'widget.Putawayzonegrid',
    loadMask: true,
    forceLayout:true,
    buildColumns: function(){
        this.columns = [
		    { header: "库区", dataIndex: 'putawayZone', width: 100, sortable: true},
		    { header: "区域", dataIndex: 'area', width: 100, sortable: true},
		    { header: "描述", dataIndex: 'descrption', width: 200, sortable: true},
		    { header: "备注", dataIndex: 'notes', width: 200, sortable: true},
		    { header: "id", dataIndex: 'id', width: 200, sortable: true,hidden: true},
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
    	this.buildStore(basePath+'/support/doQueryPutawayZone.action','PutawayZone',20);
/*    	this.on('itemcontextmenu',function(view,record,item,index,e,eOpts){ 
            //禁用的右键相应事件 
            e.preventDefault(); 
            e.stopEvent(); 
             
            var menu = new Ext.menu.Menu({ 
                //控制右键菜单位置 
                float:true, 
                 items:[
                    { 
                        text:"创建", 
                        iconCls:'leaf', 
                        handler:function(){
                        	//当点击时隐藏右键菜单 
                            this.up("menu").hide(); 
                            me.onCreate();
                        } 
                    },
                    { 
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
Ext.define('Redm.support.PutawayZones', {	
	extend: 'Ext.panel.Panel',
    alias : 'widget.putawayzone',
    title:'库区',
    layout:'border',
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
                        items: [
                            {
                                text: '保存 ',
                                scope: this,
                                keyBinding: {
                                    key: 's',
                                    ctrl: true
                                },
                                handler: this.savePutawayZone
                            }, 
                            {
                                text: '创建',
                                scope: this,
                                keyBinding: {
                                    key: 'a',
                                    ctrl: true
                                },
                                handler: this.onCreate
                            }
                        ]
                    }
                }
            ]
	    };*/
    	this.items = [this.createTopPanel(),this.createBtmPanel()];
//    	this.buildContextMenu();
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
			handler: me.savePutawayZone,
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
        var me =this
    	var bForm = this.basicform.getForm();
    	bForm.reset();
    	me.basicform.getForm().findField('putawayZone').setReadOnly(false);
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
					var record = records[0].getData();
		        	Ext.Ajax.request({
					    url: basePath+'/support/doDeletePuawayZone.action',
					    params: {
					    	id: record.id,
					    	putawayZone: record.putawayZone
					    },
					    success: function(response){
					        var text = Ext.decode(response.responseText);
					        var success = text.success;
					        MessageBox.show(success, text.json.msg);
					        me.gridPanel.getStore().load();
		        			me.basicform.getForm().reset();
					    }
					});
				}
	    	);   
    	}
    },
    
    
/*   	createContextMenu:function(e){
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
    
    
    //顶部的面板
    createTopPanel: function(){
    	var me = this;
    	this.toppanel = Ext.create('Ext.panel.Panel',{
    		region: 'north',
    		height: 100,
    		layout: 'border',
/*			listeners:{
	            render:function(p){
	                p.getEl().on("contextmenu",function(e){
	                	me.createContextMenu(e);
	                },me)
	            }
            },*/
    		items:[this.createBtnForm(),this.createSelForm()]
    	});
    	return this.toppanel;
    },
    
    
    //顶部button按钮面板
    createBtnForm: function(){
    	var me = this;
    	this.btnform = Ext.create('Ext.form.Panel',{
    		region: 'center',
    		frame: true,
    		defaults: {
    			xtype: 'button',
    			margin: '5 0 0 5'
    		},
    		items: [
                {
                    iconCls: 'icon-create',
                    text: '创建',
                    handler: me.onCreate,
                    scope: this
                },
                {
                    iconCls: 'icon-delete',
                    text: '删除',
                    //disabled:true,
                    handler: me.onDelete,
                    scope: this
                },
                {
                    iconCls: 'icon-save',
                    text: '保存',
                    handler: me.savePutawayZone,
                    scope: this
                }
            ]
    	});
    	return this.btnform;
    },
    
    
    //顶部FORM面板
    createSelForm: function(){
    	var me = this;
    	this.selform = Ext.create('Ext.form.Panel',{
    		region: 'north',
    		height: 50,
    		layout: 'hbox',
    		frame: true,
    		defaults: {
    			xtype: 'textfield',
    			margin: '5 0 0 5',
    			labelWidth: 40
    		},
    		items: [
                {
                    fieldLabel: '库区',
                    listeners: {
                        blur:function(txt){
                          txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                        }
                    },
                    name: 'putawayZone',
                    width: 200
                },
                {
                    fieldLabel: '区域',
                    xtype: 'areacombo',
                    name: 'area',
                    width: 200
                },
                {
                    fieldLabel: '描述',
                    name: 'descrption',
                    width: 250
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
    		items:[this.createGridPanel(),this.createBasicForm()]
    	});
    	return this.btmpanel;
    },

    //底部GIRD
    createGridPanel:function(){
    	var me = this;
    	this.gridPanel = Ext.create('widget.Putawayzonegrid',{
			region: 'center',
			listeners: {
    			itemclick: function(grid,record){
    				var bForm = me.basicform.getForm();
    				bForm.loadRecord(record);
    				bForm.findField('putawayZone').setReadOnly(true);    //区域设置为只读
    				
    			}
    		}
		});
		this.gridPanel.getStore().on('beforeload',function(){
    		var params = this.gridPanel.getStore().getProxy().extraParams;
    		var record = me.selform.getForm().getValues();
    		
    		var putawayZone = record.putawayZone;
    		var descrption = record.descrption;
    		var area = record.area;
    		
			delete params.putawayZone;
			delete params.descrption;
			delete params.area;
    		
			if(putawayZone) params.putawayZone = putawayZone;
         	if(descrption) params.descrption = descrption;
         	if(area) params.area = area;
    	},this);
		return this.gridPanel;
    },


    //底部右边面板
    createBasicForm: function(){
    	var me = this;
    	this.basicform = Ext.create('Ext.form.Panel',{
    		region: 'east',
    		collapsible: true,
    		width:320,
			split: true,
    		frame: true,
    		defaults: {
    			xtype: 'fieldcontainer',
    			margin: '5 0 0 5',
    			frame: false
    		},
    		items: [
                {
                    layout: 'hbox',
                    defaults: {
                        xtype: 'textfield',
                        margin: '5 0 0 5',
                        labelAlign: 'top',
                        width: 140
                    },
                    items: [
                        {
                            fieldLabel: '库区',
                            listeners: {
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            },
                            allowBlank: false,
                            name: 'putawayZone'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults: {
                        xtype: 'textfield',
                        margin: '5 0 0 5',
                        labelAlign: 'top',
                        width: 140
                    },
                    items: [
                        {
                            fieldLabel: '区域',
                            xtype: 'areacombo',
                            allowBlank: false,
                            name: 'area'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults: {
                        xtype: 'textfield',
                        margin: '5 0 0 5',
                        labelAlign: 'top',
                        width: 285
                    },
                    items: [
                        {
                            fieldLabel: '描述',
                            allowBlank: false,
                            name: 'descrption'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults: {
                        xtype: 'textfield',
                        margin: '5 0 0 5',
                        labelAlign: 'top',
                        width: 285
                    },
                    items: [
                        {
                            fieldLabel: '备注',
                            name: 'notes'
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
    	return this.basicform;
    },
    savePutawayZone: function(){
    	var me = this;
    	var putawayZoneForm = this.basicform.getForm();
    	if(!(putawayZoneForm.isValid())) return;
    	putawayZoneForm.submit({
		    clientValidation: true,
		    url: basePath+'/support/doSavePutawayZone.action',
		    params: {},
		    success: function(form, action) {
		    	var success = action.result;
		        MessageBox.show(success.success, success.json.msg);
                if(true==success.success)
                {
                    putawayZoneForm.reset();
                    me.gridPanel.getStore().load();
                }
		    },
		     failure: function(form, action) {
		    	var success = action.result;
		        MessageBox.show(success.success, success.json.msg);
		        //putawayZoneForm.reset();
		        //me.gridPanel.getStore().load();
		    }
		});
    }
});



Ext.onReady(function(){
	Ext.create('Ext.container.Viewport', {
	    layout: 'border',
	    items: [{
	    	xtype:'putawayzone',
	    	region:'center'
	    }]
	});
});