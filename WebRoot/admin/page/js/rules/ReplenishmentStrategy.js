/******************************************************
补货策略


*******************************************************/


Ext.define('ReplenishmentStrategy', {
    extend: 'Ext.data.Model',
    fields: [
    	{name:'id'},
		{name:'replenishmentStrategyKey'},
		{name:'descr'},
		{name:'mark'},
        {name:'addDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
        {name:'addWho'}          
	],
    idProperty: 'id'
});

Ext.define('ReplenishmentStrategyDeatil', {
    extend: 'Ext.data.Model',
    fields: [
		{name:'id'},
		{name:'replenishmentStrategyKey'},
		{name:'stepNumber'},
		{name:'status'},
		{name:'replenishmentRule'},
		{name:'fromZone'},
		{name:'fromLoc'},
		{name:'toZone'},
		{name:'toLoc'},
        {name:'addDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
        {name:'addWho'}        
	],
    idProperty: 'id'
});

Ext.define('Redm.rules.ReplenishmentStrategyGrid', {
    extend: 'Redm.BaseGrid',
    alias : 'widget.replenishmentstrategygrid',
    loadMask: true,
    height: 400,
    forceLayout:true,
    buildColumns: function(){
        this.columns = [
		    {header: "补货策略",dataIndex: 'replenishmentStrategyKey',width: 100,sortable: true},
            {header: "描述",dataIndex: 'descr',width: 140,sortable: true},
		    {header: "备注",dataIndex: 'mark',width: 200,sortable: true},
		    {header: "id",dataIndex: 'id',width: 140,sortable: true,hidden: true},
			{ header: "创建时间", dataIndex: 'addDate', width: 140, sortable: true,renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s'),hidden:true},
			{ header: "创建人", dataIndex: 'addWho', width: 140, sortable: true,hidden:true}            
	    ];
		return true;
    },
	buildDockedItems: function(){
		var me = this;
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
    	this.buildStore(basePath + '/rules/doQueryReplenishmentStrategy.action','ReplenishmentStrategy',20);
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
                        iconCls: 'icon-create',
                        handler:function(){
                        	//当点击时隐藏右键菜单 
                            this.up("menu").hide(); 
                            me.onCreate();
                        } 
                    },
                    { 
                        text:"删除", 
                        iconCls: 'icon-delete',
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
/*        this.on('render',function(p){   //暂不启用
        	 p.getEl().on("contextmenu",function(e){
            	e.preventDefault();
            },this)
        },this); */
        this.callParent(arguments);
    }
    
/*    onCreate: function(){
   	 	var fatherPanel = this.ownerCt.ownerCt;
   	 	fatherPanel.onGo();
    },
    onDelete: function(){
    	var fatherPanel = this.ownerCt.ownerCt;
   	 	fatherPanel.onGoDelete();
    }*/
});

Ext.define('Redm.rules.ReplenishmentStrategyDeatilGrid', {
    extend: 'Redm.BaseGrid',
    alias : 'widget.replenishmentstrategydeatilgrid',
    loadMask: true,
    height: 400,
    forceLayout:true,
    buildColumns: function(){
        this.columns = [ 
        	{header: "补货策略",dataIndex: 'replenishmentStrategyKey',width: 100,sortable: true},
            {header: "行号",dataIndex: 'stepNumber',width: 140,sortable: true},
		    {header: "状态",dataIndex: 'status',width: 200,sortable: true},
		    {header: "补货规则",dataIndex: 'replenishmentRule',width: 100,sortable: true},
            {header: "源库区",dataIndex: 'fromZone',width: 140,sortable: true},
		    {header: "源库位",dataIndex: 'fromLoc',width: 200,sortable: true},
		    {header: "目标库区",dataIndex: 'toZone',width: 200,sortable: true},
		    {header: "目标库位",dataIndex: 'toLoc',width: 200,sortable: true},
		    {header: "id",dataIndex: 'id',width: 140,sortable: true,hidden: true},
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
    	this.buildStore(basePath + '/rules/doQueryReplenishmentStrategyDeatil.action','ReplenishmentStrategyDeatil',20);

    	//屏蔽浏览器右键事件
/*        this.on('render',function(p){  //暂不屏蔽
        	 p.getEl().on("contextmenu",function(e){
            	e.preventDefault();
            },this)
        },this);*/ 
/*        this.on('itemcontextmenu',function(view,record,item,index,e,eOpts){ 
            //禁用的右键相应事件 
            e.preventDefault(); 
            e.stopEvent(); 
             
            var menu = new Ext.menu.Menu({ 
                //控制右键菜单位置 
                float:true, 
                 items:[{ 
                        text:"添加", 
                        iconCls: 'icon-create',                        
                        handler:function(){
                        	//当点击时隐藏右键菜单 
                            this.up("menu").hide(); 
                            me.onAddDetail();
                        } 
                    },{ 
                        text:"删除", 
                        iconCls: 'icon-delete',
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
    
/*    onAddDetail: function(){
    	var fatherPanel = this.ownerCt.ownerCt;
    	fatherPanel.onAddDetail();
    },
    onDelete: function(){
    	var fatherPanel = this.ownerCt.ownerCt;
    	fatherPanel.onDeleteDetail();
    }*/
});

Ext.define('Redm.rules.ReplenishmentStrategy', {	
	extend: 'Ext.tab.Panel',
    alias : 'widget.replenishmentstrategy',
    title:'补货策略',
    layout: 'border',
    tabPosition: 'bottom',
    initComponent: function(){
    	var me = this;
//    	this.buildContextMenu();
    	this.items = [this.createAPanel(),this.createADPanel()];
        this.callParent(arguments);
    },

    
/*    buildContextMenu:function(){
		var me = this;
		//-------------------查询---------------------
    	this.goAction = Ext.create('Ext.Action', {
			text : "创建" ,//查询界面的跳转
			iconCls: 'icon-create',
			handler: me.onGo,
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
		//----------------------基本(主)----------------------
		this.createAction = Ext.create('Ext.Action', {
			text : "创建" ,//基本里面的创建
			iconCls: 'icon-create',
			handler: me.onCreate,
			scope : this
		});
    	this.deleteAction = Ext.create('Ext.Action', {//删除主从
			text : "删除" ,
			iconCls : "icon-delete",
			handler: me.onDelete,
			scope : this
		});
		this.saveAction = Ext.create('Ext.Action', {
			text : "保存",
			iconCls : "icon-save",
			handler: me.saveStrategyAndDetail,
			scope : this
		});
		//----------------------基本(从)----------------------
		this.addAction = Ext.create('Ext.Action', {
			text : "添加",
			iconCls : "icon-create",
			handler: me.onAddDetail,
			scope : this
		});
    	this.deleteDetailAction = Ext.create('Ext.Action', {//删除从
			text : "删除" ,
			iconCls : "icon-delete",
			handler: me.onDeleteDetail,
			scope : this
		});
    },*/
    onGo: function(){
    	this.setActiveTab(1);
    	this.topform.getForm().reset();
    	this.basicForm.getForm().reset();
    },
    
    onSelect: function(){
    	this.gridPanel.getStore().load();
    },

    onReset: function(){
    	this.selform.getForm().reset();
    },
    
    onCreate: function(){
    	this.topform.getForm().reset();
    	this.basicForm.getForm().reset();
	},

    

//第一个tab页面的删除按钮，删除主表记录和对应的明细表记录    
    onGoDelete: function(){
    	var me = this;
    	var records = me.gridPanel.getSelectionModel().getSelection(); 
    	if(records == ""){
    		MessageBox.error('错误提示','请选择删除的数据！');
    		return;
        }
        else
        {
            Ext.MessageBox.confirm('询问提示', '确定要删除吗？', 
                function(btn){
                    if(btn == 'yes'){    
                        var record = records[0].getData();
                        Ext.Ajax.request({
                            url: basePath + '/rules/doDeletereplenishmentStrategy.action',
                            params: {
                                replenishmentStrategyKey: record.replenishmentStrategyKey
                            },
                            success: function(response){
                                var text = Ext.decode(response.responseText);
                                var success = text.success;
                                MessageBox.show(success, text.json.msg);
                                me.gridPanel.getStore().load();
                                me.detailgrid.getStore().load();
                                me.topform.getForm().reset();
                                me.basicForm.getForm().reset();
                            }
                        });
                    }
                }
            );  
        }
    },

    
//第二个tab页面的删除按钮，删除主表记录和对应的明细表记录    
    onDelete: function(){
    	var me = this;
    	var values = me.topform.getForm().getValues();
    	var key = values.replenishmentStrategyKey;
    	if(key == ''){return}
        Ext.MessageBox.confirm('询问提示', '确定要删除吗？', 
            function(btn){
                if(btn == 'yes'){  
                    Ext.Ajax.request({
                        url: basePath + '/rules/doDeletereplenishmentStrategy.action',
                        params: {
                            replenishmentStrategyKey: key
                        },
                        success: function(response){
                            var text = Ext.decode(response.responseText);
                            var success = text.success;
                            MessageBox.show(success, text.json.msg);
                            me.gridPanel.getStore().load();
                            me.detailgrid.getStore().load();
                            me.topform.getForm().reset();
                            me.basicForm.getForm().reset();
                        }
                    });
                }
            }
        );  
    },


    onAddDetail: function(){
    	this.basicForm.getForm().reset();
    },
    
    
    onDeleteDetail: function(){
    	var me = this;
    	var records = me.detailgrid.getSelectionModel().getSelection(); 
    	if(records == ""){
    		MessageBox.error('错误提示','请选择删除的数据！');
    		return;
    	}else{
    		var record = records[0].getData();
            Ext.MessageBox.confirm('询问提示', '确定要删除吗？', 
                function(btn){
                    if(btn == 'yes'){ 
                        Ext.Ajax.request({
                            url: basePath + '/rules/doDeleteReplenishmentStrategyDeatil.action',
                            params: {
                                id: record.id
                            },
                            success: function(response){
                                var text = Ext.decode(response.responseText);
                                var success = text.success;
                                MessageBox.show(success, text.json.msg);
                                me.detailgrid.getStore().load();
                                me.basicForm.getForm().reset();
                            }
                        });
                    }
                }
            );  
    	}
    },

/*    createGoContextMenu: function(e){
    	if(!this.formGoContextMenu){
			this.formGoContextMenu = Ext.create('Ext.menu.Menu', {
				items: [
					this.goAction,//创建
					this.searchAction,//查询
					this.resetAction//重置
				]
			});
    	}
		e.preventDefault();
		this.formGoContextMenu.showAt(e.getXY());
    },*/

/*    createContextMenu:function(e){
    	if(!this.formContextMenu){
			this.formContextMenu = Ext.create('Ext.menu.Menu', {
				items: [
					this.createAction,//创建
					this.deleteAction,//删除
					this.saveAction//保存
				]
			}); 
    	}
		e.preventDefault();
		this.formContextMenu.showAt(e.getXY());
    },*/
    
/*    createContextChildMenu:function(e){
    	if(!this.formContextChildMenu){
			this.formContextChildMenu = Ext.create('Ext.menu.Menu', {
				items: [
					this.addAction,//添加
					this.deleteDetailAction,//删除
					this.saveAction//保存
				]
			});
    	}
		e.preventDefault();
		this.formContextChildMenu.showAt(e.getXY());
    },*/
    
    
    
    
    createAPanel: function(){
    	this.apanel = Ext.create('Ext.panel.Panel',{
    		title: '查询',
    		layout: 'border',
//    		items:[this.createGridPanel(),this.createBtnForm(),this.createSelForm()]
    		items: [this.createGridPanel(),this.createPt1Pn1Panel()]
    	});
    	return this.apanel;
    },
    
    
//新增一个面板Pt1Pn1Panel，放置按钮面板和查询form，
//这个面板大小固定，grid作为尺寸可变化的面板使用
    createPt1Pn1Panel: function(){
    	var me = this;
    	this.pt1pn1panle = Ext.create('Ext.panel.Panel',{
    		layout: 'border',
    		border: false,
            region: 'north',
            height:90,
    		items:[this.createBtnForm(),this.createSelForm()]
    	});
    	return this.pt1pn1panle;
    },
    
    
    
    createBtnForm: function(){
    	var me = this;
    	this.btnform = Ext.create('Ext.form.Panel',{
    		region: 'center',
    		frame: true,
    		defaults: {
    			xtype: 'button'
    		},
/*    		listeners:{
	            render:function(p){
	                p.getEl().on("contextmenu",function(e){
	                	me.createGoContextMenu(e);
	                },me)
	            }
            },*/
    		items:[
                {
                    iconCls: 'icon-create',
                    text: '创建',
                    scope: this,
                    handler: me.onGo
                },
                {
                    iconCls: 'icon-delete',
                    text: '删除',
                    scope: this,
                    handler: this.onGoDelete
                }
            ]
    	});
    	return this.btnform;
    },

    createSelForm: function(){
    	var me = this;
    	this.selform = Ext.create('Ext.form.Panel',{
    		region: 'north',
    		height: 50,
    		frame: true,
    		layout: 'hbox',
    		defaults: {
    			xtype: 'textfield', 
    			margin: ' 5 0 0 5',
    			labelWidth: 60
    		},
/*    		listeners:{
	            render:function(p){
	                p.getEl().on("contextmenu",function(e){
	                	me.createGoContextMenu(e);
	                },me)
	            }
            },*/
    		items:[
                {
                    fieldLabel: '补货策略',
                    name: 'replenishmentStrategyKey',
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
                    fieldLabel: '备注',
                    name: 'mark'
                },
                {
                    xtype: 'button',
                    scope: this,
                    iconCls: 'icon-search',
                    handler: me.onSelect,
                    text: '查询'
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

    createGridPanel: function(){
    	var me = this;
    	this.gridPanel = Ext.create('widget.replenishmentstrategygrid',{
//			region: 'south',
			region: 'center',
//			height: 450,
			listeners: {
    			itemdblclick: function(grid,record){
    				me.topform.getForm().loadRecord(record);
    				me.detailgrid.getStore().load();
    				me.setActiveTab(1);
    			}
    		}
		});
		this.gridPanel.getStore().on('beforeload',function(){
    		var params = this.gridPanel.getStore().getProxy().extraParams;
    		var record = me.selform.getForm().getValues();
    		
    		var replenishmentStrategyKey = record.replenishmentStrategyKey; 
    		var descr = record.descr;  
    		var mark = record.mark; 
    		
			delete params.replenishmentStrategyKey;
			delete params.descr;
			delete params.mark;

			if(replenishmentStrategyKey) params.replenishmentStrategyKey = replenishmentStrategyKey;
			if(descr) params.descr = descr;
			if(mark) params.mark = mark;
            
    	},this);
		return this.gridPanel;
    },

    createADPanel: function(){
    	var me = this;
    	this.adpanel = Ext.create('Ext.panel.Panel',{
    		title: '基本',
    		layout: 'border',
/*    		tbar: {
	            plugins: new Ext.ux.ToolbarKeyMap(),
	            hidden: true,
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
	                        handler: me.saveStrategyAndDetail
	                    }, {
	                        text: '创建（基本）',
	                        scope: this,
	                        keyBinding: {
	                            key: 'n',
	                            ctrl: true
	                        },
	                        handler: me.onCreate
	                    },{
	                        text: '添加（基本）',
	                        scope: this,
	                        keyBinding: {
	                            key: 'a',
	                            ctrl: true
	                        },
	                        handler: me.onAddDetail
	                    }]
	                }
	            }]
	        },*/
    		items:[this.createBasicForm(),this.createDetailGrid(),this.createDTopPanel()]
    	});
    	return this.adpanel;
    },
    
    createDTopPanel: function(){
    	this.dtoppanel = Ext.create('Ext.panel.Panel',{
    		region: 'north',
    		layout: 'border',
    		border: false,
    		height: 130,
    		items:[this.createBtnPanel(),this.createTopForm(),this.createDBtnPanel()]
    	});
    	return this.dtoppanel;
    },
    
    
    createBtnPanel: function(){
    	var me = this;
    	this.btnpanel = Ext.create('Ext.form.Panel',{
    		region: 'north',
    		frame: true,
    		defaults: {
    			xtype: 'button',
    			margin: '5 0 0 5'
    		},
/*    		listeners:{
	            render:function(p){
	                p.getEl().on("contextmenu",function(e){
	                	me.createContextMenu(e);
	                },me)
	            }
            },*/
    		items:[
                {
                    iconCls: 'icon-create',
                    text: '创建',
                    scope: this,
                    handler: me.onCreate
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
                    text: '保存',
                    handler: me.saveStrategyAndDetail,
                    scope: this
                }
            ]
    	});
    	return this.btnpanel;
    },
    
    
    createDBtnPanel: function(){
    	var me = this;
    	this.dbtnpanel = Ext.create('Ext.form.Panel',{
    		region: 'south',
    		frame: true,
    		defaults: {
    			xtype: 'button',
    			margin: '5 0 0 5'
    		},
/*    		listeners:{
	            render:function(p){
	                p.getEl().on("contextmenu",function(e){
	                	me.createContextChildMenu(e);
	                },me)
	            }
            },*/
    		items:[
                {
                    iconCls: 'icon-create',
                    text: '添加',
                    handler: me.onAddDetail,
                    scope: this
                },
                {
                    iconCls: 'icon-delete',
                    text: '删除',
                    handler: me.onDeleteDetail,
                    scope: this
                }
            ]
    	});
    	return this.dbtnpanel;
    },

    createTopForm: function(){
    	this.topform = Ext.create('Ext.form.Panel',{
    		region: 'center',
    		height: 50,
    		frame: true,
    		layout: 'hbox',
    		defaults: {
    			xtype: 'textfield',
    			margin: '5 0 0 5',
    			labelWidth: 65
    		},
    		items:[
                {
                    fieldLabel: '补货策略',
                    name: 'replenishmentStrategyKey',
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
                    fieldLabel: '备注',
                    name: 'mark'
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
                    xtype: 'textfield',
                    name: 'addWho',
                    hidden: true
                }                  
            ]
    	});
    	return this.topform;
    },
    
    createDetailGrid: function(){
    	var me = this;
    	this.detailgrid = Ext.create('widget.replenishmentstrategydeatilgrid',{
    		region: 'center',
    		listeners: {
    			itemclick: function(grid,record){
    				me.basicForm.getForm().loadRecord(record);
    			}
    		}
    	});
    	this.detailgrid.getStore().on('beforeload',function(){
    		var params = this.detailgrid.getStore().getProxy().extraParams;
    		var record = me.topform.getForm().getValues();
    		var replenishmentStrategyKey = record.replenishmentStrategyKey;
			delete params.replenishmentStrategyKey;
			if(replenishmentStrategyKey) params.replenishmentStrategyKey = replenishmentStrategyKey;
    		
    	},this);
    	return this.detailgrid;
    },

    createBasicForm: function(){
    	var me = this;
    	this.basicForm = Ext.create('Ext.form.Panel',{
	        region: 'east',
			frame:true,
			split:true,
			collapsible: true,
    		width: 495,
	        border: false,
	        defaults: {
	        	xtype: 'fieldcontainer',
                hideLabel: true,
	            anchor: '100%',
	            margin: '10 0 0 10',
	            labelWidth: 60
	        },
	        items: [
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    defaults: {
                       labelWidth: 60,
                       margin: '5 0 0 5',
                       flex: 1,
                       xtype: 'textfield'
                    },
                    items: [
                        {
                            fieldLabel: '补货规则',
                            name: 'replenishmentRule',
                            xtype: 'codecombo',
                            codeType: 'REPLENISHRULE'
                        },
                        {
                            fieldLabel: '行号',
                            name: 'stepNumber',
                            xtype: 'numberfield',
                            minValue:1
                        }
                   ]
                },
                {
                   xtype: 'fieldcontainer',
                   layout: 'hbox',
                   defaults: {
                       labelWidth: 60,
                       margin: '5 0 0 5',
                       flex: 1,
                       xtype: 'textfield'
                   },
                   items: [
                        {
                            fieldLabel: '源库区',
                            xtype: 'putawayzonecombo', 
                            name: 'fromZone'
                        },
                        {
                            fieldLabel: '源库位',
                            name: 'fromLoc'
                        }
                   ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    defaults: {
                       labelWidth: 60,
                       margin: '5 0 0 5',
                       flex: 1,
                       xtype: 'textfield'
                    },
                    items: [
                        {
                            fieldLabel: '目标库区',
                            xtype: 'putawayzonecombo', 
                            name: 'toZone'
                        },
                        {
                            fieldLabel: '目标库位',
                            name: 'toLoc'
                        }
                   ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    defaults: {
                       labelWidth: 60,
                       margin: '5 0 0 5',
                       flex: 1,
                       xtype: 'textfield'
                    },
                    items: [
                        {
                            fieldLabel: '状态',
                            name: 'status',
                            inputValue:1,
                            xtype: 'checkbox'
                        },
                        {   
                            fieldLabel: '补货策略',
                            name: 'replenishmentStrategyKey',
                            hidden: true
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
                            xtype: 'textfield',
                            name: 'addWho',
                            hidden: true
                        }                         
                   ]
                }
            ]
    	});
    	return this.basicForm;
    },
    
    
    saveStrategyAndDetail: function(){
    	var me = this;
    	var form = this.topform.getForm();
    	var dform = this.basicForm.getForm();
    	
    	var values = form.getValues();
    	var dvaues = dform.getValues();
    	if(!(form.isValid())||!(dform.isValid())) return;
    	Ext.Ajax.request({
		    url: basePath + '/rules/doSaveReplenishmentStrategy.action',
		    params: {
		    	strategyId: values.id,
		    	replenishmentStrategyKey: values.replenishmentStrategyKey,
		    	descr: values.descr,
		    	mark: values.mark,
                addDate: values.addDate,
                addWho: values.addWho,                   
		    	
		    	strategyDetailId: dvaues.id,
		    	replenishmentRule: dvaues.replenishmentRule,
		    	stepNumber: dvaues.stepNumber,
		    	fromZone: dvaues.fromZone,
		    	fromLoc: dvaues.fromLoc,
		    	toZone: dvaues.toZone,
		    	toLoc: dvaues.toLoc,
		    	status: dvaues.status,
                daddDate: dvaues.addDate,
                daddWho: dvaues.addWho                
		    },
		    success: function(response){
		        var text = Ext.decode(response.responseText);
		        var success = text.success;
		        MessageBox.show(success, text.json.msg);
		        me.gridPanel.getStore().load();
		        me.detailgrid  .getStore().load();
		        dform.reset();
		    }
		});
    }
});


Ext.onReady(function(){
	Ext.create('Ext.container.Viewport', {
	    layout: 'border',
	    items: [{
	    	xtype:'replenishmentstrategy',
	    	region:'center'
	    }]
	});
});