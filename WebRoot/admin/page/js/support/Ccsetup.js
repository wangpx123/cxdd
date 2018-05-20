/************************************
循环级别ccsetup.js

************************************/

Ext.define('Ccsetup', {
    extend: 'Ext.data.Model',
    fields: [
		{name:'id'},
		{name:'ccKey'},            
		{name:'descr'},     
		{name:'cycledays'},
		{name:'sequence'},     
		{name:'percentage'},
		{name:'addDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},     
		{name:'addWho'}        
	],
    idProperty: 'id'
});

//GRID面板
Ext.define('Redm.support.CcsetupGrid', {
    extend: 'Redm.BaseGrid',
    alias : 'widget.ccsetupgrid',
    loadMask: true,
    forceLayout:true,
    dockedItems: [],
    buildColumns: function(){
        this.columns = [
		    { header: "循环级别", dataIndex: 'ccKey', width: 120, sortable: true},
		    { header: "描述", dataIndex: 'descr', width: 100, sortable: true},
		    { header: "循环周期", dataIndex: 'cycledays', width: 100, sortable: true},
		    { header: "级别排序", dataIndex: 'sequence', width: 100, sortable: true},
		    { header: "百分比", dataIndex: 'percentage', width: 100, sortable: true},
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
    	this.buildStore(basePath + '/support/doQueryCcsetup.action','Ccsetup',20);
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
Ext.define('Redm.support.Ccsetup', {
	extend: 'Ext.panel.Panel',
    alias : 'widget.ccsetupmanager',
    title:'循环级别',
    layout:'border',
	initComponent: function(){
    	var me = this;
    	this.items = [this.createTopPanel(),this.createBtmPanel()];
/*		this.tbar = {
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
	                    handler: this.saveCcsetup
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
			handler: me.saveCcsetup,
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
						    url: basePath + '/support/doDeleteCcsetup.action',
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
    		items:[{
                iconCls: 'icon-create',
                text: '创建',
                handler: me.onCreate,
                scope: this
            },{
                iconCls: 'icon-delete',
                itemId: 'delete',
                text: '删除',
                handler: me.onDelete,
                scope: this
            },{
                iconCls: 'icon-save',
                itemId: 'save',
                text: '保存',
                handler: me.saveCcsetup,
                scope: this
            }]
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
    			labelWidth: 60
    		},
    		items:[
                {
                    fieldLabel: '循环级别',
                    listeners: {
                        blur:function(txt){
                            txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                        }
                    },
                    name: 'ccKey'
                },
                {
                    fieldLabel: '描述',
                    name: 'descr'
                },
                {
                    fieldLabel: '循环周期',
                    name: 'cycledays'
                },
                {
                    fieldLabel: '级别排序',
                    name: 'sequence'
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
    	this.gridPanel = Ext.create('widget.ccsetupgrid',{
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
    		
    		var ccKey = record.ccKey;
    		var descr = record.descr;
    		var cycledays = record.cycledays;
    		var sequence = record.sequence;
    		
			delete params.ccKey;
			delete params.descr;
			delete params.cycledays;
			delete params.sequence;
    		
			if(ccKey) params.ccKey = ccKey;
         	if(descr) params.descr = descr;
         	if(cycledays) params.cycledays = cycledays;
         	if(sequence) params.sequence = sequence;
            
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
                        flex: 1,
                        allowBlank: false,
                        labelAlign: 'top'
                    },
                    items: [
                        {
                            fieldLabel: '循环级别',
                            name: 'ccKey',
                            listeners: {
                                blur:function(txt){
                                    txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }
                        },
                        {
                            fieldLabel: '描述',
                            name: 'descr'
                        },
                        {
                            fieldLabel: '循环周期',
                            xtype: 'numberfield',
                            minValue:0,
                            name: 'cycledays'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults: {
                        xtype: 'numberfield',
                        margin: '5 0 0 5',
                        flex: 1,
                        minValue:0,
                        labelAlign: 'top'
                    },
                    items: [
                        {
                            fieldLabel: '级别排序',
                            allowBlank: false,
                            name: 'sequence'
                        },
                        {
                            fieldLabel: '百分比',
                            name: 'percentage'
                        },
                        {
                            name: 'id',
                            xtype: 'hidden'
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
    
	saveCcsetup: function(){
		var me = this;
    	var sectionForm = this.form.getForm();
    	if(!(sectionForm.isValid())) return;
    	sectionForm.submit({
		    clientValidation: true,
		    url: basePath + '/support/doSaveCcsetup.action',
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
	    	xtype:'ccsetupmanager',
	    	region:'center'
	    }]
	});
});