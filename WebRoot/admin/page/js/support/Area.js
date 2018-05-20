/*************************
区域 Area.js


****************************/


Ext.define('Area', {
    extend: 'Ext.data.Model',
    fields: [
		{name:'id'},
		{name:'area'},            
		{name:'description'},     
		{name:'notes'},
		{name:'addDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},     
		{name:'addWho'}
	],
    idProperty: 'id'
});


//GIRD面板
Ext.define('Redm.support.WarehouseGrid', {
    extend: 'Redm.BaseGrid',
    alias : 'widget.warehousegrid',
    loadMask: true,
    forceLayout:true,
    buildColumns: function(){
        this.columns = [
		    { header: "区域", dataIndex: 'area', width: 100, sortable: true},
		    { header: "描述", dataIndex: 'description', width: 200, sortable: true},
		    { header: "备注", dataIndex: 'notes', width: 200, sortable: true},
		    { header: "入库暂存库位", dataIndex: '', width: 100, sortable: true},
		    { header: "出库暂存库位", dataIndex: '', width: 100, sortable: true},
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
    	this.buildStore(basePath+'/support/doQueryArea.action','Area',20);
    	//屏蔽浏览器右键事件
        //启用后，grid范围内系统的右键菜单失效 qxue  
/*        this.on('render',function(p){  //暂不屏蔽
        	 p.getEl().on("contextmenu",function(e){
            	e.preventDefault();
            },this)
        },this);*/
        
        //下边这段代码功能不详   qxue  2013-12-18
/*        this.on('itemcontextmenu',function(view,record,item,index,e,eOpts){ 
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
        this.callParent(arguments);
    }
    
/*    onCreate: function(){
    	var fatherPanel = this.ownerCt.ownerCt;
    	fatherPanel.warehouseform.getForm().reset();
    },
    onDelete: function(){
    	var me = this;
    	var fatherPanel = this.ownerCt.ownerCt;
    	var records = me.getSelectionModel().getSelection(); 
    	if(records == ""){
    		MessageBox.error('错误提示','请选择删除的数据！');
    		return;
    	}else{
    		Ext.MessageBox.confirm('询问提示', '确定要删除所选信息吗？', 
				function(btn){
					var areaRecord = records[0].getData();
		        	Ext.Ajax.request({
					    url: basePath+'/support/doDeleteArea.action',
					    params: {
					    	id: areaRecord.id
					    },
					    success: function(response){
					        var text = Ext.decode(response.responseText);
					        var success = text.success;
					        MessageBox.show(success, text.json.msg);
					        me.getStore().load();
		        			fatherPanel.warehouseform.getForm().reset();
					    }
					});
				}
	    	);   
    	}
    }*/
});


//主面板
Ext.define('Redm.support.Area', {	
	extend: 'Ext.panel.Panel',
    alias : 'widget.areamanager',
    title:'区域',
    layout:'border',
    initComponent: function(){
    	this.tbar = {
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
    	                    handler: this.saveArea
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
	        }]
	    };
    	this.items = [this.createTopPanel(),this.createBtmPanel()];
    	this.buildContextMenu();
        this.callParent(arguments);
    },
    
    buildContextMenu:function(){
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
			handler: me.saveArea,
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
    },

    //创建右键菜单
   	createContextMenu:function(e){
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
    },
    //顶部面板
    createTopPanel: function(){
    	var me = this;
    	this.toppanel = Ext.create('Ext.panel.Panel',{
    		region: 'north',
    		height: 100,
    		layout: 'border',
    		listeners:{   //顶部面板响应右键菜单，两个form都生效
	            render:function(p){
	                p.getEl().on("contextmenu",function(e){
	                	me.createContextMenu(e);
	                },me)
	            }
            },
    		border: false,
    		items: [this.createBtnForm(),this.createSelForm()]
    	});
    	return this.toppanel;
    },

    //顶部按钮面板
    createBtnForm: function(){
    	var me = this;
    	this.btnform = Ext.create('Ext.form.Panel',{
    		region: 'center',
    		border: false,
    		frame: true,
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
                    //disabled:true,  //禁用
                    text: '删除',
                    handler: me.onDelete,
                    scope: this
                },
                {
                    iconCls: 'icon-save',
                    text: '保存',
                    handler: me.saveArea,
                    scope: this
                }
            ]
    	});
    	return this.btnform;
    },
    
    onSelect: function(){
    	this.warehousegrid.getStore().load()
    },
    
    onReset: function(){
    	this.selform.getForm().reset();
    },
    
    onCreate: function(){
        var me =this;
        me.warehouseform.getForm().findField('area').setReadOnly(false);
        this.warehouseform.getForm().reset();
    },
    
    onDelete: function(){
    	var me = this;
    	var records = me.warehousegrid.getSelectionModel().getSelection(); 
    	if(records == ""){
    		MessageBox.error('错误提示','请选择删除的数据！');
    		return;
    	}
        else
        {
            Ext.MessageBox.confirm('询问提示', '确定要删除吗？', 
                function(btn){
                    if(btn == 'yes'){            
                        var areaRecord = records[0].getData();
                        Ext.Ajax.request({
                            url: basePath+'/support/doDeleteArea.action',
                            params: {
                                id: areaRecord.id,
                                area: areaRecord.area
                            },
                            success: function(response){
                                var text = Ext.decode(response.responseText);
                                var success = text.success;
                                MessageBox.show(success, text.json.msg);
                                me.warehousegrid.getStore().load();
                                me.warehouseform.getForm().reset();
                            }
                        });
                    }
                }
            );  
    	}
    },
    
    
    //顶部查询面板
    createSelForm: function(){
    	var me = this;
    	this.selform = Ext.create('Ext.form.Panel',{
    		region: 'north',
    		height: 50,
    		border: false,
    		frame: true,
    		layout: 'hbox',
    		defaults: {
    			xtype: 'textfield',
    			margin: '5 0 0 5',
    			labelWidth: 40
    		},
    		items: [
                {
                    fieldLabel: '区域',
                    listeners: {
                        blur:function(txt){
                            txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                        }
                    },
                    name: 'area',
                    width: 200
                },
                {
                    fieldLabel: '描述',
                    name: 'description',
                    width: 250
                },
                {
                    xtype: 'button',
                    iconCls: 'icon-search',
                    scope: this,
                    text: '查询',
                    handler: me.onSelect
                },
                {
                    xtype: 'button',
                    scope: this,
                    iconCls: 'icon-reset',
                    handler: me.onReset,
                    text: '重置'
                }
            ]
    	});
    	return this.selform;
    },
    
    
    
    //底部面板，包括一个grid和一个form 
    createBtmPanel: function(){
    	this.btmpanel = Ext.create('Ext.panel.Panel',{
    		region: 'center',
    		layout: 'border',
    		items: [this.createWarehouseGrid(),this.createWarehoseForm()]
    	});
    	return this.btmpanel;
    },
    
    
    //底部GRID面板
    createWarehouseGrid:function(){
    	var me = this;
    	this.warehousegrid = Ext.create('widget.warehousegrid',{
			region: 'center',
			listeners: {
				itemclick: function(grid,record){
					me.warehouseform.getForm().loadRecord(record);
                    
                    //加载时设置为只读，不能修改
                    me.warehouseform.getForm().findField('area').setReadOnly(true);

				}
			}
		});
		this.warehousegrid.getStore().on('beforeload',function(){
    		var params = this.warehousegrid.getStore().getProxy().extraParams;
    		var record = me.selform.getForm().getValues();
    		
    		var area = record.area;
    		var description = record.description;
    		
			delete params.area;
			delete params.description;
    		
			if(area) params.area = area;
         	if(description) params.description = description;
    	},this);
		return this.warehousegrid;
    },
    
    //底部右边面板
    createWarehoseForm: function(){
    	this.warehouseform = Ext.create('Ext.form.Panel',{
    		region: 'east',
    		width: 320,
    		split: true,
			collapsible: true,
    		border: true,
    		frame: true,
    		defaults: {
    			xtype: 'fieldcontainer',
    			margin: '5 0 0 5',
    			frame: true
    		},
    		items: [
        		{
    				layout: 'hbox',
    				defaults: {
    					xtype: 'textfield',
    					margin: '5 0 0 5',
    					labelAlign: 'top',
    					labelWidth: 80,
    					width: 150
    				},
    				items: [
        				{
        					fieldLabel: '区域',
        					allowBlank: false,
        					listeners: {
                                blur:function(txt){
                                    txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
        	    			},
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
    					width: 285,
    					labelWidth: 80
    				},
    				items: [
        				{
        					fieldLabel: '描述',
        					allowBlank: false,
        					name: 'description'
        				}
    				]
    			},
    			{
    				layout: 'hbox',
    				defaults: {
    					xtype: 'textfield',
    					margin: '5 0 0 5',
    					labelAlign: 'top',
    					width: 285,
    					labelWidth: 80
    				},
    				items: [
        				{
        					fieldLabel: '备注',
        					name: 'notes'
        				}
    				]
    			},
    			{
    				layout: 'hbox',
    				defaults: {
    					xtype: 'textfield',
    					margin: '5 0 0 5',
    					labelAlign: 'top',
    					width: 140,
    					labelWidth: 80
    				},
    				items: [
                        {
//                            name: 'id',     //是否需要这个字段？
                            fieldLabel: '入库暂存库位'
                        },
                        {
//                            name: 'id',     //是否需要这个字段？
                            fieldLabel: '出库暂存库位'
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
    	return this.warehouseform;
    },
    
    saveArea: function(){
    	var me = this;
    	var areaForm = this.warehouseform.getForm();
    	var areaValues = areaForm.getValues();
    	if(!(areaForm.isValid())) return;
    	Ext.Ajax.request({
		    url: basePath+'/support/doSaveArea.action',
		    params: {
		        area: areaValues.area,
		        description: areaValues.description,
		        notes: areaValues.notes,
		        id: areaValues.id,
		        addDate: areaValues.addDate,
		        addWho: areaValues.addWho
		    },
		    success: function(response){
		        var text = Ext.decode(response.responseText);
		        var success = text.success;
		        MessageBox.show(success, text.json.msg);
                if(true==success)
                {
                    me.warehousegrid.getStore().load();
                    areaForm.reset();
                }
		    }
		});
    }
});

Ext.onReady(function(){
	Ext.create('Ext.container.Viewport', {
	    layout: 'border',
	    items: [{
	    	xtype:'areamanager',
	    	region:'center'
	    }]
	});
});