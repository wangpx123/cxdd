/*******************************************
分配策略 AllocationStrategy.js


*********************************************/

//分配策略主表存储结构
Ext.define('AllocationStrategy', {
    extend: 'Ext.data.Model',
    fields: [
    	{name:'id'},
		{name:'allocationStrategyKey'},
		{name:'descr'},
		{name:'mark'},
        {name:'addDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
        {name:'addWho'}          
	],
    idProperty: 'id'
});

//分配策略明细表存储结构
Ext.define('AllocationStrategyDetail', {
    extend: 'Ext.data.Model',
    fields: [
		{name:'id'},
		{name:'allocationStrategyKey'},
		{name:'stepNumber'},
		{name:'status'},
		{name:'openstock'},
		{name:'stockManner'},
		{name:'excessPickloc'},
		{name:'pickManner'},
        {name:'addDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
        {name:'addWho'}        
	],
    idProperty: 'id'
});

//分配策略主表grid
Ext.define('Redm.rules.AllocationGrid', {
    extend: 'Redm.BaseGrid',
    alias : 'widget.AllocationGrid',
    loadMask: true,
    height: 400,
    forceLayout:true,
    buildColumns: function(){
        this.columns = [
		    { 
			    header: "分配策略", 
			    dataIndex: 'allocationStrategyKey', 
			    width: 140, 
			    sortable: true
            },
            { 
			    header: "描述", 
			    dataIndex: 'descr',
			    width: 140, 
			    sortable: true
		    },
            { 
			    header: "备注", 
			    dataIndex: 'mark', 
			    width: 140,  
			    sortable: true
		    },
            {
		    	header: "id", 
			    dataIndex: 'id', 
			    hidden: true
		    },
			{ header: "创建时间", dataIndex: 'addDate', width: 140, sortable: true,renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s'),hidden:true},
			{ header: "创建人", dataIndex: 'addWho', width: 140, sortable: true,hidden:true}              
        ];
		return true;
    },
	buildDockedItems: function(){
		var me = this;
		this.dockedItems = [{},{
	        xtype: 'pagingtoolbar',
	        store: this.store,  
	        dock: 'bottom',
	        displayInfo: true
	    }];
	},
    initComponent: function(){
    	var me = this;
    	this.buildStore(basePath + '/rules/doQueryAllocationStrategy.action','AllocationStrategy',20);
        
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
/*        this.on('render',function(p){   //暂不启用
        	 p.getEl().on("contextmenu",function(e){
            	e.preventDefault();
            },this)
        },this);*/
        this.callParent(arguments);
    }

    //第一个tab页面的创建按钮，首页增加panel后需要调整ownerct的关系
/*    onCreate: function(){
   	 	var fatherPanel = this.ownerCt.ownerCt;
   	 	fatherPanel.onGo();
    },*/
    //第一个tab页面的删除按钮，首页增加panel后需要调整ownerct的关系
/*    onDelete: function(){
    	var fatherPanel = this.ownerCt.ownerCt;
   	 	fatherPanel.onGoDelete();
    }*/
});

//分配策略明细表grid
Ext.define('Redm.rules.AllocationDetailGrid', {
    extend: 'Redm.BaseGrid',
    alias : 'widget.allocationdetailgrid',
    autoLoad:false,       //detail 启动时不加载
    loadMask: true,
    height: 400,
    forceLayout:true,
    autoLoad:false,
    buildColumns: function(){
        this.columns = [
            {header: "分配策略", dataIndex: 'allocationStrategyKey', width: 100,sortable: true},
            {header: "行号", dataIndex: 'stepNumber',width: 60,sortable: true},
            {header: "状态",dataIndex: 'status',width: 80,sortable: true},
            {header: "拆包",dataIndex: 'openstock',width: 80,sortable: true},
            {header: "拆包方式",dataIndex: 'stockManner',width: 120,sortable: true,renderer:function(v)
                {
                    if(v == 0)
                        return  '向上拆解';
                    else if(v == 1)
                        return '向下拆解'; 
                    else if(v == 2)
                        return '清仓优先';
                    }
            },
            {header: "拣货位超量分配",dataIndex: 'excessPickloc',width: 120,sortable: true},
            {header: "拣货位超量分配方式",dataIndex: 'pickManner',width: 200,sortable: true,renderer:function(v)
                {
                    if(v == 0)
                        return  '自动产生补货任务';
                    else if(v == 1)
                        return '储存库位拣选'; 
                    else if(v == 2)
                        return '动态拣货';
                    }
            },
            {header: "id", dataIndex: 'id', hidden: true},
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
    	this.buildStore(basePath + '/rules/doQueryAllocationStrategydetail.action','AllocationStrategyDetail',20);
    	//屏蔽浏览器右键事件
/*        this.on('render',function(p){  //暂不启用
        	 p.getEl().on("contextmenu",function(e){
            	e.preventDefault();
            },this)
        },this);*/
/*        this.on('itemcontextmenu',function(view,record,item,index,e,eOpts){  //暂不启用
            //禁用的右键相应事件 
            e.preventDefault(); 
            e.stopEvent(); 
             
            var menu = new Ext.menu.Menu({ 
                //控制右键菜单位置 
                float:true, 
                 items:[{ 
                        text:"添加", 
                        iconCls:'leaf', 
                        handler:function(){
                        	//当点击时隐藏右键菜单 
                            this.up("menu").hide(); 
                            me.onAddDetail();
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
        this.callParent(arguments);
    }
    
    //第二个tab页增加明细表记录按钮
/*    onAddDetail: function(){
    	var fatherPanel = this.ownerCt.ownerCt;
    	fatherPanel.onAddDetail();
    },*/
    //第二个tab页面删除明细表记录的按钮
/*    onDelete: function(){
    	var fatherPanel = this.ownerCt.ownerCt;
    	fatherPanel.onDeleteDetail();
    }*/
});

//最大的容器，包括两个tab页面
Ext.define('Redm.rules.AllocationStrategy', {	
	extend: 'Ext.tab.Panel',
    alias : 'widget.AllocationManager',
    title:'分配策略',
    layout: 'border',
    tabPosition: 'bottom',
    initComponent: function(){
    	var me = this;
    	this.items = [this.createAPanel(),this.createADPanel()];
//    	this.buildContextMenu();  暂不启用
        this.callParent(arguments);
    },
  
    //右键菜单，暂不启用 
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

    //第一个tab页面的创建按钮，跳转到第二个页面
    onGo: function(){
        this.setActiveTab(1);
        this.topform.getForm().reset();
        this.basicForm.getForm().reset();
    },

    //第一个tab页面的删除按钮，删除主表选中的记录和相关从表记录
    onGoDelete: function(){
       	var me = this;
        var records = me.gridPanel.getSelectionModel().getSelection(); 
            if(records == ""){
                MessageBox.error('错误提示','请选择删除的数据！');
                return;
                }
            else
                {
                    var record = records[0].getData();
                    Ext.MessageBox.confirm('询问提示', '确定要删除吗？', 
                        function(btn){
                            if(btn == 'yes'){                    
                                
                                Ext.Ajax.request({
                                    url: basePath + '/rules/doDeleteAllocationStrategy.action',
                                    params: {
                                        allocationStrategyKey: record.allocationStrategyKey
                                    },
                                    success: function(response){
                                        var text = Ext.decode(response.responseText);
                                        var success = text.success;
                                        MessageBox.show(success, text.json.msg);
                                        me.gridPanel.getStore().load();
                                        me.detailgrid.getStore().load();
                                        me.topform.getForm().reset();
                                        me.baseform.getForm().reset();
                                    }
                                });
                            }
                        }
                    );                     
                }
    },
    
    //第一个tab页面的查询按钮
    onSelect: function(){
    	this.pwgrid.getStore().load();
    },
    //第一个tab页面的重置按钮
    onReset: function(){
    	this.selform.getForm().reset();
    },
    
    //第二个tab页面的创建按钮，清空两个form
    onCreate: function(){
    	this.topform.getForm().reset();
    	this.basicForm.getForm().reset();
    },

    //第二个tab页面的删除按钮，根据topform的查询条件，找到主表记录删除，同时删除从表相关记录
    onDelete: function(){
    	var me = this;
    	var values = me.topform.getForm().getValues();
    	var key = values.allocationStrategyKey;
    	if(key == ''){return}
        
        Ext.MessageBox.confirm('询问提示', '确定要删除吗？', 
            function(btn){
                if(btn == 'yes'){  
                    Ext.Ajax.request({
                        url: basePath + '/rules/doDeleteAllocationStrategy.action',
                        params: {
                            allocationStrategyKey: key
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
    
    //第二个tab页面增加明细表记录按钮，清空对应form
    onAddDetail: function(){
    	this.basicForm.getForm().reset();
    },
    
    //第二个tab页面的删除明细表记录按钮
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
                            url: basePath + '/rules/doDeleteAllocationStrategydetail.action',
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
    
    //右键菜单，暂不启用
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
    
    
    //第一个tab页面，包括一个grid，和一个Pt1Pn1Panel
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


    
    //第一个tab上部Pt1Pn1Panel 的按钮面板，主表的创建和删除按钮
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
                    handler: me.onGoDelete
                }
            ]
    	});
    	return this.btnform;
    },
    
    //第一个tab上部Pt1Pn1Panel 的查询面板
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
/*   		listeners:{
	            render:function(p){
	                p.getEl().on("contextmenu",function(e){
	                	me.createGoContextMenu(e);
	                },me)
	            }
            },*/
    		items:[
                {
                    fieldLabel: '分配策略',
                    name: 'allocationStrategyKey',
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
                    xtype: 'button',
                    scope: this,
                    iconCls: 'icon-search',
                    handler: me.onSelect,  //查询按钮
                    text: '查询'
                },
                {
                    xtype: 'button',
                    scope: this,
                    iconCls: 'icon-reset',
                    handler: me.onReset,  //重置按钮
                    text: '重置'
                }
            ]
    	});
    	return this.selform;
    },
    
    //创建主表grid面板
    createGridPanel: function(){
    	var me = this;
    	this.gridPanel = Ext.create('widget.AllocationGrid',{
//			region: 'south',
			region: 'center',
//			height: 450,
			listeners: {
    			itemdblclick: function(grid,record){
    				me.setActiveTab(1);
    				me.topform.getForm().loadRecord(record);
                    me.detailgrid.getStore().load();
    			}
    		}
		});
		this.gridPanel.getStore().on('beforeload',function(){
    		var params = this.gridPanel.getStore().getProxy().extraParams;
    		var record = me.selform.getForm().getValues();
    		
    		var allocationStrategyKey = record.allocationStrategyKey; 
    		var descr = record.descr;  
    		
			delete params.allocationStrategyKey;
			delete params.descr;
			if(allocationStrategyKey) params.allocationStrategyKey = allocationStrategyKey;
			if(descr) params.descr = descr;
    	},this);
		return this.gridPanel;
    },
    
    //创建第二个tab页面，包括一个DTop panel，明细表grid，和明细表输入面板
    createADPanel: function(){
    	var me = this;
    	this.adpanel = Ext.create('Ext.panel.Panel',{
    		title: '基本',
    		layout: 'border',
/*    		tbar: {    //暂不使用
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
    
    //第二个tab页面的DTop panel，包括一个主表按钮面板，明细表按钮面板，主表记录输入、显示的form
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
    
    //第二个panel顶部的DTop panel的主表按钮面板
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
                    text: '删除',
                    handler: me.onDelete,
                    scope: this
                },
                {
                    iconCls: 'icon-save',
                    text: '保存',
                    handler:  me.saveStrategyAndDetail,
                    scope: this
                }
            ]
    	});
    	return this.btnpanel;
    },
    
    //第二个panel顶部的DTop panel的明细表按钮面板    
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
                    scope: this,
                    handler: me.onAddDetail
                },
                {
                    iconCls: 'icon-delete',
                    text: '删除',
                    handler:me.onDeleteDetail,
                    scope: this
                }
            ]
    	});
    	return this.dbtnpanel;
    },
    
    //第二个panel顶部的DTop panel的主表记录输入、显示面板
    createTopForm: function(){
    	var me = this;
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
/*    		listeners:{
	            render:function(p){
	                p.getEl().on("contextmenu",function(e){
	                	me.createContextMenu(e);
	                },me)
	            }
            },*/
    		items:[
                {
                    fieldLabel: '分配策略',
                    name: 'allocationStrategyKey',
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
                    fieldLabel: '英文描述',
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
    
    //第二个tab页面的grid面板
    createDetailGrid: function(){
    	var me = this;
    	this.detailgrid = Ext.create('widget.allocationdetailgrid',{
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
    		
    		var allocationStrategyKey = record.allocationStrategyKey;
			delete params.allocationStrategyKey;
			if(allocationStrategyKey) params.allocationStrategyKey = allocationStrategyKey;
    		
    	},this);
    	return this.detailgrid;
    },
    
    //第二个tab页面的明细表输入面板
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
	            labelWidth: 100
	        },
	        items: [
                {
                   xtype: 'fieldcontainer',
                   layout: 'hbox',
                   defaults: {
                       labelWidth: 60,
                       margin: '5 0 0 5',
                       xtype: 'textfield'
                   },
                   items: [
                        {fieldLabel: '分配策略',name: 'allocationStrategyKey',hidden: true},
                        {name: 'id',hidden: true},
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
                            fieldLabel: '行号',
                            name: 'stepNumber',
                            xtype: 'numberfield',
                            minValue:0
                        },
                        {
                           fieldLabel: '状态',
                           margin:'5 0 0 30',
                           xtype: 'checkbox',
                           inputValue: 1,
                           name: 'status'
                        }
                   ]
                },
                {
                   xtype: 'fieldcontainer',
                   layout: 'hbox',
                   defaults: {
                       labelWidth: 60,
                       margin: '5 0 0 5',
                       xtype: 'radio'        
                   },
                   items: [//如果“拆包”选中了，后边只能有一个选中，如果拆包没有选中，后边一个都不能选
                        {
                            boxLabel: '拆包',
                            xtype: 'checkbox',
                            name: 'openstock',
                            inputValue: 1,
                            uncheckedValue:0
                        },
                        {
                            xtype      : 'fieldcontainer',
                            defaultType: 'radiofield',
                            margin: '5 0 0 80',
                            defaults: {
                            },
                            layout: 'hbox',
                            items: [
                                {
                                    boxLabel  : '向上拆解',
                                    name      : 'stockManner',
                                    inputValue: 0,
                                    id        : 'radio1'
                                }, 
                                {
                                    boxLabel  : '向下拆解',
                                    margin:   '0 0 0 58',
                                    name      : 'stockManner',
                                    inputValue: 1,
                                    id        : 'radio2'
                                },
                                {
                                    boxLabel  : '清仓优先',
                                    margin:   '0 0 0 21',
                                    name      : 'stockManner',
                                    inputValue: 2,
                                    id        : 'radio3'
                                }
                            ]
                        }
                   ]
                },
                {
                   xtype: 'fieldcontainer',
                   layout: 'hbox',
                   defaults: {
                       margin: '5 0 0 5',
                       xtype: 'radio' 
                   },
                   items: [ //如果“拣货位超量分配”选中了，后边只能有一个选中，如果拆包没有选中，后边一个都不能选
                        {
                            boxLabel: '拣货位超量分配',
                            xtype: 'checkbox',
                            name: 'excessPickloc',
                            inputValue: 1                            
                        },
                        {
                            xtype      : 'fieldcontainer',
                            defaultType: 'radiofield',
                            margin: '5 0 0 20',
                            defaults: {
                            },
                            layout: 'hbox',
                            items: [
                                {
                                    boxLabel  : '自动产生补货任务',
                                    name      : 'pickManner',
                                    inputValue: 0,
                                    id        : 'radio4'
                                }, 
                                {
                                    boxLabel  : '储存位补货',
                                    margin    : '0 0 0 10',
                                    name      : 'pickManner',
                                    inputValue: 1,
                                    id        : 'radio5'
                                },
                                {
                                    boxLabel  : '动态拣货',
                                    margin    : '0 0 0 10',
                                    name      : 'pickManner',
                                    inputValue: 2,
                                    id        : 'radio6'
                                }
                            ]
                        }


                    ]

                }
            ]
    	});
    	return this.basicForm;
    },
    
    //保存主表和明细表相关记录
    saveStrategyAndDetail: function(){
    	var me = this;
    	var form = this.topform.getForm();
    	var dform = this.basicForm.getForm();
    	
    	var values = form.getValues();
    	var dvaues = dform.getValues();
    	if(!(form.isValid())||!(dform.isValid())) return;
    	Ext.Ajax.request({
		    url: basePath + '/rules/doSaveAllocationStrategy.action',
		    params: {
		    	strategyId: values.id,
		    	allocationStrategyKey: values.allocationStrategyKey,
		    	descr: values.descr,
		    	mark: values.mark,
                addDate: values.addDate,
                addWho: values.addWho,                    

		    	strategyDetailId: dvaues.id,
		    	stepNumber: dvaues.stepNumber,
		    	status: dvaues.status,
		    	openstock: dvaues.openstock,
		    	stockManner: dvaues.stockManner,
		    	excessPickloc: dvaues.excessPickloc,
		    	pickManner: dvaues.pickManner,
                daddDate: dvaues.addDate,
                daddWho: dvaues.addWho
		    },
		    success: function(response){
		        var text = Ext.decode(response.responseText);
		        var success = text.success;
		        MessageBox.show(success, text.json.msg);
		        me.gridPanel.getStore().load();
		        me.detailgrid.getStore().load();
		        dform.reset();
		    }
		});
    }
});

Ext.onReady(function(){
	Ext.create('Ext.container.Viewport', {
	    layout: 'border',
	    items: [{
	    	xtype:'AllocationManager',
	    	region:'center'
	    }]
	});
});