/*********************************
装箱 Cartonization.js

***********************************/

Ext.define('Cartonization', {
    extend: 'Ext.data.Model',
    fields: [
		{name:'id'},
		{name:'cartonKey'},            
		{name:'cartonGroup'},     
		{name:'cartonType'},
		{name:'descr'},            
		{name:'sequence'},     
		{name:'leng'},
		{name:'width'},            
		{name:'height'},     
		{name:'cube'},
		{name:'maxWeight'},
		{name:'maxCount'},
		{name:'addDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},     
		{name:'addWho'}         
	],
    idProperty: 'id'
});

//GRID面板
Ext.define('Redm.support.CartonizationGrid', {
    extend: 'Redm.BaseGrid',
    alias : 'widget.cartonizationgrid',
    loadMask: true,
    forceLayout:true,
    dockedItems: [],
    buildColumns: function(){
        this.columns = [
		    { header: "箱号码", dataIndex: 'cartonKey', width: 100, sortable: true},
		    { header: "箱组", dataIndex: 'cartonGroup', width: 80, sortable: true},
		    { header: "箱型", dataIndex: 'cartonType', width: 80, sortable: true},
		    { header: "描述", dataIndex: 'descr', width: 100, sortable: true},
		    { header: "顺序", dataIndex: 'sequence', width: 50, sortable: true},
		    { header: "长", dataIndex: 'leng', width: 120, sortable: true},
		    { header: "宽", dataIndex: 'width', width: 120, sortable: true},
		    { header: "高", dataIndex: 'height', width: 120, sortable: true},
		    { header: "体积", dataIndex: 'cube', width: 120, sortable: true},
		    { header: "限重", dataIndex: 'maxWeight', width: 120, sortable: true},
		    { header: "限量", dataIndex: 'maxCount', width: 120, sortable: true},
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
    	this.buildStore(basePath + '/support/doQueryCartonization.action','Cartonization',20);
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
Ext.define('Redm.support.Cartonization', {
	extend: 'Ext.panel.Panel',
    alias : 'widget.cartonization',
    title:'周转箱',
    layout:'border',
	initComponent: function(){
    	var me = this;
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
    		Ext.MessageBox.confirm('询问提示', '确定要删除所选信息吗？', 
				function(btn){
					if(btn == 'yes'){
						var record = records[0].getData();
			        	Ext.Ajax.request({
						    url: basePath + '/support/doDeleteCartonization.action',
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
                handler: me.saveSection,
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
    			labelWidth: 40
    		},
    		items:[
                {
                    fieldLabel: '箱号码',
                    listeners: {
                        blur:function(txt){
                            txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                        }
                    },
                    name: 'cartonKey'
                },
                {
                    fieldLabel: '箱组',
                    name: 'cartonGroup'
                },
                {
                    fieldLabel: '箱型',
                    name: 'cartonType'
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
    	this.gridPanel = Ext.create('widget.cartonizationgrid',{
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
    		
    		var cartonKey = record.cartonKey;
    		var cartonGroup = record.cartonGroup;
    		var cartonType = record.cartonType;
    		
			delete params.cartonKey;
			delete params.cartonGroup;
    		delete params.cartonType;
    		
			if(cartonKey) params.cartonKey = cartonKey;
         	if(cartonGroup) params.cartonGroup = cartonGroup;
         	if(cartonType) params.cartonType = cartonType;
         	
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
                        labelAlign: 'top',
                        allowBlank: false,
                        flex: 1
                    },
                    items: [
                        {
                            fieldLabel: '箱号码',
                            name: 'cartonKey',
                            listeners: {
                                blur:function(txt){
                                    txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }
                        },
                        {
                            fieldLabel: '箱组',
                            name: 'cartonGroup'
                        },
                        {
                            fieldLabel: '箱型',
                            name: 'cartonType'
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
                            fieldLabel: '描述',
                            allowBlank: false,
                            name: 'descr'
                        },
                        {
                            fieldLabel: '顺序',
                            xtype: 'numberfield',
                            allowBlank: false,
                            minValue:0,
                            name: 'sequence'
                        },
                        {
                            fieldLabel: '长',
                            xtype: 'numberfield',
                            minValue:0,
                            name: 'leng'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults: {
                        xtype: 'textfield',
                        margin: '5 0 0 5',
                        flex: 1,
                        xtype: 'numberfield',
                        minValue:0,
                        labelAlign: 'top'
                    },
                    items: [
                        {
                            fieldLabel: '宽',
                            name: 'width'
                        },
                        {
                            fieldLabel: '高',
                            name: 'height'
                        },
                        {
                            fieldLabel: '体积',
                            name: 'cube'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults: {
                        margin: '5 0 0 5',
                        flex: 1,
                        xtype: 'numberfield',
                        minValue:0,
                        labelAlign: 'top'
                    },
                    items: [
                        {
                            fieldLabel: '限重',
                            name: 'maxWeight'
                        },
                        {
                            fieldLabel: '限量',
                            name: 'maxCount'
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
		    url: basePath + '/support/doSaveCartonization.action',
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
//		        sectionForm.reset();
		        me.gridPanel.getStore().load();
		    }
		});
	}
});


Ext.onReady(function(){
	Ext.create('Ext.container.Viewport', {
	    layout: 'border',
	    items: [{
	    	xtype:'cartonization',
	    	region:'center'
	    }]
	});
});