/***************************************************

 预分配策略

***************************************************/

//预分配策略存储数据结构
Ext.define('PreAllocateStrategy', {
    extend: 'Ext.data.Model',
    fields: [
		{name:'id'},
		{name:'preAllocationStrategyKey'},
		{name:'descr'},
		{name:'excess'},
		{name:'preAllocationType'},
		{name:'preAllocationRule'},
		{name:'mark'},
        {name:'addDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
        {name:'addWho'}         
	],
    idProperty: 'id'
});

//预分配策略明细存储数据结构
Ext.define('PreAllocateStrategyDetail', {
    extend: 'Ext.data.Model',
    fields: [
		{name:'id'},
		{name:'preAllocationStrategyKey'},
		{name:'stepNumber'},
		{name:'status'},
		{name:'uom'},
		{name:'uomDescr'},
		{name:'engine'},
        {name:'addDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
        {name:'addWho'}        
	],
    idProperty: 'id'
});

//预分配策略grid
Ext.define('Redm.rules.PreallocationGrid', {
    extend: 'Redm.BaseGrid',
    alias : 'widget.PreallocationGrid',
    loadMask: true,
    height: 400,
    forceLayout:true,
    buildColumns: function(){
        this.columns = [
        	{header: "预分配策略",dataIndex: 'preAllocationStrategyKey',width: 100,sortable: true},
        	{header: "描述",dataIndex: 'descr',width: 140,sortable: true},
        	{header: "超量预分配",dataIndex: 'excess',width: 140,sortable: true},
        	{header: "预分配类型",dataIndex: 'preAllocationType',width: 140,sortable: true},
        	{header: "预分配规则",dataIndex: 'preAllocationRule',width: 140,sortable: true},
        	{header: "备注",dataIndex: 'mark',width: 240,sortable: true},
        	{header: "id",dataIndex: 'id',hidden: true},
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
    	this.buildStore(basePath + '/rules/doQueryPreAllocateStrategys.action','PreAllocateStrategy',20);

//暂时不用鼠标右键菜单
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
        },this); */
        this.callParent(arguments);
    }
    
    //创建
/*    onCreate: function(){
   	 	var fatherPanel = this.ownerCt.ownerCt;
   	 	fatherPanel.onGo();
    },*/
    
    //删除
/*    onDelete: function(){
    	var fatherPanel = this.ownerCt.ownerCt;
   	 	fatherPanel.onGoDelete();
    }  */
});

//预分配策略明细表存储结构
Ext.define('Redm.rules.PreallocationDetailGrid', {
    extend: 'Redm.BaseGrid',
    alias : 'widget.preallocationdetailgrid',
    loadMask: true,
    height: 400,
    forceLayout:true,
    buildColumns: function(){
        this.columns = [
        	{header: "预分配策略",dataIndex: 'preAllocationStrategyKey', width: 100,sortable: true},
        	{header: "行号",dataIndex: 'stepNumber',width: 100,sortable: true},
        	{header: "状态",dataIndex: 'status',width: 100,sortable: true},
        	{header: "单位",dataIndex: 'uom',width: 100,sortable: true},
        	{header: "描述", dataIndex: 'uomDescr',width: 100,sortable: true},
    		{header: "预分配引擎",dataIndex: 'engine',width: 100,sortable: true},
    		{header: "id",dataIndex: 'id',hidden: true},
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
    	this.buildStore(basePath + '/rules/doQueryPreAllocateStrategyDetails.action','PreAllocateStrategyDetail',20);

    	//屏蔽浏览器右键事件 
/*        this.on('render',function(p){    //取消对浏览器右键事件的屏蔽
        	 p.getEl().on("contextmenu",function(e){
            	e.preventDefault();
            },this)
        },this);*/

//暂不启用右键菜单        
/*        this.on('itemcontextmenu',function(view,record,item,index,e,eOpts){ 
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
    
    //添加明细表选中的记录记录
/*    onAddDetail: function(){
    	var fatherPanel = this.ownerCt.ownerCt;
    	fatherPanel.onAddDetail();
    },*/
    
    //删除明细表选中的记录
/*    onDelete: function(){
    	var fatherPanel = this.ownerCt.ownerCt;
    	fatherPanel.onDeleteDetail();
    }*/
});


//最外部的容器，继承自Ext.tab.Panel
Ext.define('Redm.rules.PreAllocationStrategy', {	
	extend: 'Ext.tab.Panel',
    alias : 'widget.PreallocationManager',
    title:'预分配策略',
    layout: 'border',
    tabPosition: 'bottom',
    initComponent: function(){
    	var me = this;
//    	this.buildContextMenu();
    	this.items = [this.createPAPanel(),this.createPADPanel()];
        this.callParent(arguments);
    },
 

/* 
    buildContextMenu:function(){
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
    }, */
    
/*    createGoContextMenu: function(e){  //暂时屏蔽右键菜单
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
    
/*    createContextMenu:function(e){   //暂时屏蔽右键菜单
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
    
    //第一个tab页面的创建按钮 
    onGo: function(){
    	this.setActiveTab(1);  
    	this.topform.getForm().reset();    //清空输入form
    	this.baseform.getForm().reset();   //清空输入form
    },

    //第一个tab页面的删除按钮，删除选中的主表记录和相关的明细表记录
    onGoDelete: function(){
        var me=this;
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
                        Ext.Ajax.request(
                            {
                            url: basePath + '/rules/doDeletePreAllocateStrategy.action',
                            params: {
                                preAllocationStrategyKey: record.preAllocationStrategyKey
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
    
    //第一个tab页面查询按钮
    onSelect: function(){
    	this.gridPanel.getStore().load();
    },
    
    //第一个tab页面的重置按钮，清空查询form
    onReset: function(){
    	this.selform.getForm().reset();
    },
    
    //第二个tab页面的创建按钮，清空输入form
    onCreate: function(){
    	this.topform.getForm().reset();
    	this.baseform.getForm().reset();
    },
    
    //第二个tab页面的删除按钮，根据topform的输入条件在主表删除对应记录，和明细表的相关记录
    onDelete: function(){
    	var me = this;
    	var values = me.topform.getForm().getValues();
    	if(values.preAllocationStrategyKey == ''){return}
        
        Ext.MessageBox.confirm('询问提示', '确定要删除吗？', 
            function(btn){
                if(btn == 'yes'){ 
                    Ext.Ajax.request({
                        url: basePath + '/rules/doDeletePreAllocateStrategy.action',
                        params: {
                            preAllocationStrategyKey: values.preAllocationStrategyKey
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
    },
    
    //第二个页面明细表的添加按钮，清空明细表的输入form
    onAddDetail: function(){
    	this.baseform.getForm().reset();
    },
    
    //第二个页面明细表的删除按钮，删除明细表的选中记录
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
                            url: basePath + '/rules/doDeletePreAllocateStrategyDetail.action',
                            params: {
                                id: record.id
                            },
                            success: function(response){
                                var text = Ext.decode(response.responseText);
                                var success = text.success;
                                MessageBox.show(success, text.json.msg);
                                me.detailgrid.getStore().load();
                                me.baseform.getForm().reset();
                            }
                        });
                    }
                }
            );              
    	}
    },

//创建第一个tab页面，包括两个组件，grid面板，Pt1Pn1Panel
    
    createPAPanel: function(){
    	var me = this;
    	this.papanel = Ext.create('Ext.panel.Panel',{
    		title: '查询',
    		layout: 'border',
//    		items: [this.createGridPanel(),this.createBtnForm(),this.createSelForm()]
    		items: [this.createGridPanel(),this.createPt1Pn1Panel()]
    	});
    	return this.papanel;
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


//第一个tab页面的按钮面板，包括创建和删除两个按钮
    createBtnForm: function(){
    	var me = this;
    	this.btnform = Ext.create('Ext.panel.Panel',{
    		region: 'center',
    		frame: true,
    		defaults: {
    			xtype: 'button',
    			margin: '5 0 0 5'
    		},

/*			listeners:{
	            render:function(p){
	                p.getEl().on("contextmenu",function(e){
	                	me.createGoContextMenu(e);   //暂时屏蔽右键菜单
	                },me)
	            }
            },*/
    		items:[
                {
                    iconCls: 'icon-create',
                    text: '创建',
                    scope: this,
                    handler: me.onGo              //第一个页面的创建按钮，跳转到第二个页面并清空两个输入form
                },
                {    
                    iconCls: 'icon-delete',
                    itemId: 'delete',
                    text: '删除',
                    scope: this,
                    handler: me.onGoDelete       //第一个页面的删除按钮，删除主表选中的记录和明细表的相关记录
                }
            ]
    		
    	});
    	return this.btnform;
    },
    
    //创建查询面板
    createSelForm: function(){
    	var me = this;
    	this.selform = Ext.create('Ext.form.Panel',{
    		region: 'north',
    		frame: true,
    		height: 50,
    		layout: 'hbox',
    		defaults: {
    			xtype: 'textfield',
    			labelWidth: 80,
    			margin: '5 0 0 5'
    		},
/*    		listeners:{
	            render:function(p){
	                p.getEl().on("contextmenu",function(e){
	                	me.createGoContextMenu(e);
	                },me)
	            }
            },*/
    		items: [
                {
                    fieldLabel: '预分配策略',
                    name: 'preAllocationStrategyKey',
                    listeners: {
                        blur:function(txt){
                          txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                        }
                    }
                },
                {
                    fieldLabel: '预分配规则',
                    xtype: 'codecombo',
                    codeType: 'PREALLCATERULE',
                    name: 'preAllocationRule'
                },
                {
                   fieldLabel: '预分配类型',
                   xtype: 'codecombo',
                   codeType: 'PREALLCATETYPE',
                   name: 'preAllocationType'
                },
                {
                    xtype: 'button',
                    scope: this,
                    iconCls: 'icon-search',
                    handler: me.onSelect,   //主表查询按钮
                    text: '查询'
                },
                {
                    xtype: 'button',
                    scope: this,
                    iconCls: 'icon-reset',
                    handler: me.onReset,    //主表重置按钮
                    text: '重置'
                }
            ]
    	});
    	return this.selform;
    },
    
    //创建主表grid面板
    createGridPanel: function(){
    	var me = this;
    	this.gridPanel = Ext.create('widget.PreallocationGrid',{
//          region: 'south',
            region: 'center',
//          height: 450,
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

            var preAllocationStrategyKey = record.preAllocationStrategyKey; 
            var preAllocationRule = record.preAllocationRule;
            var preAllocationType = record.preAllocationType;

            delete params.preAllocationStrategyKey;
            delete params.preAllocationRule;
            delete params.preAllocationType;

            if(preAllocationStrategyKey) params.preAllocationStrategyKey = preAllocationStrategyKey;
            if(preAllocationRule) preAllocationRule.descr = preAllocationRule;
            if(preAllocationType) params.preAllocationType = preAllocationType;
        },this);
        return this.gridPanel;
    },
    
    //第二个tab页面，包括一个DTop的面板，明细表grid和明细表记录输入的form
    createPADPanel: function(){
    	var me = this;
    	this.padpanel = Ext.create('Ext.panel.Panel',{
    		title: '基本',
    		layout: 'border',
    		border: false,
/*    		tbar: {          //快捷键暂不使用
	            plugins: new Ext.ux.ToolbarKeyMap(),
	            hidden: true,
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
                                handler: me.saveStrategyAndDetail
                            },
                            {
                                text: '创建（基本）',
                                scope: this,
                                keyBinding: {
                                    key: 'n',
                                    ctrl: true
                                },
                                handler: me.onCreate
                            },
                            {
                                text: '添加（基本）',
                                scope: this,
                                keyBinding: {
                                    key: 'a',
                                    ctrl: true
                                },
                                handler: me.onAddDetail
                            }
                        ]
	                }
	            }]
	        },*/
    		items: [this.createBasicForm(),this.createDetailGrid(),this.createDTopPanel()]
    	});
    	return this.padpanel;
    },
    
    //第二个tab页面上关于明细表的DTop面板，位置是north，包括主表按钮面板，主表记录输入、显示的form，和明细表按钮面板
    createDTopPanel: function(){
    	this.dtoppanel = Ext.create('Ext.panel.Panel',{
    		region: 'north',
    		layout: 'border',
    		border:false,
    		height: 175,
    		items:[this.createBtnPanel(),this.createTopForm(),this.createDBtnPanel()]
    	});
    	return this.dtoppanel;
    },
    //第二个tab页面，DTop面板上的主表按钮面板，位置是north
    createBtnPanel: function(){
    	var me = this;
    	this.btnpanel = Ext.create('Ext.panel.Panel',{
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
                    handler: me.onCreate   //创建主表记录，清空两个form
                },
                {
                    iconCls: 'icon-delete',
                    text: '删除',
                    handler: me.onDelete,  //根据form的内容，删除主表对应的记录和明细表相关记录
                    scope: this
                },
                {
                    iconCls: 'icon-save',
                    text: '保存',
                    handler: me.saveStrategyAndDetail,   //主表和明细表记录存盘
                    scope: this
                }
            ]
    	});
    	return this.btnpanel;
    },
    
    //第二个tab页面，DTop面板上的明细表按钮面板，位置是south
    createDBtnPanel: function(){
    	var me = this;
		this.dbtnpanel = Ext.create('Ext.form.Panel',{
    		region: 'south',
    		frame: true,
    		border: false,
/*    		listeners:{
	            render:function(p){
	                p.getEl().on("contextmenu",function(e){
	                	me.createContextChildMenu(e);
	                },me)
	            }
            },*/
    		defaults: {
    			xtype: 'button',
    			margin: '5 0 0 5'
    		},
    		items:[
                {
                    iconCls: 'icon-create',
                    text: '添加',
                    scope: this,
                    handler: me.onAddDetail    //增加明细表记录，清空明细表输入的form
                },
                {
                    iconCls: 'icon-delete',
                    itemId: 'delete',
                    text: '删除',
                    handler: me.onDeleteDetail,  //删除明细表记录
                    scope: this
                }
            ]
    	});
		return this.dbtnpanel;
    },
    
    //第二个tab页面，DTop面板上的输入或显示主表记录的form，位置是south
    createTopForm: function(){
    	var me = this;
    	this.topform = Ext.create('Ext.form.Panel',{
    		frame: true,
    		region: 'center',
	        defaults: {
	        	xtype: 'fieldcontainer',
                hideLabel: true,
	            anchor: '100%',
	            labelWidth: 100
	        },
/*	        listeners:{
	            render:function(p){
	                p.getEl().on("contextmenu",function(e){
	                	me.createContextMenu(e);
	                },me)
	            }
            },*/
	        items: [
                {
                    xtype: 'container',
                    layout: 'hbox',
                    defaults: {
                        labelWidth: 70,
                        margin: '5 0 0 5',
                        width: 200,
                        margin: '5 0 0 5',
                        allowBlank: false,
                        xtype: 'textfield'
                    },
                    items: [
                       {
                            fieldLabel: '预分配策略',
                            name: 'preAllocationStrategyKey',
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
                            fieldLabel: '超量预分配',
                            xtype: 'checkbox',
                            inputValue: 1,
                            name: 'excess'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    defaults: {
                        labelWidth: 70,
                        margin: '5 0 0 5',
                        width: 200,
                        allowBlank: false,
                        xtype: 'textfield'
                    },
                    items: [
                        {
                            fieldLabel: '预分配类型',
                            name: 'preAllocationType',
                            xtype: 'codecombo',
                            codeType: 'PREALLCATETYPE'
                        },
                        {
                            fieldLabel: '预分配规则',
                            xtype: 'codecombo',
                            codeType: 'PREALLCATERULE',
                            name: 'preAllocationRule'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    defaults: {
                       labelWidth: 70,
                       margin: '5 0 0 5',
                       width: 405,
                       xtype: 'textfield'
                    },
                    items: [
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
                }
            ]
    	});
    	return this.topform;
    },
    
    //第二个tab页面，输入或显示明细表记录的form，位置是east
    createBasicForm: function(){
    	var me = this;
    	this.baseform = Ext.create('Ext.form.Panel',{
    		region: 'east',
    		width: 450,
			frame:true,
			border: false,
			split: true,
			collapsible: true,
	        defaults: {
	        	xtype: 'fieldcontainer',
                hideLabel: true,
	            anchor: '100%',
	            labelWidth: 100
	        },
	        items: [
                {
                   xtype: 'container',
                   layout: 'hbox',
                    defaults: {
                       labelWidth: 70,
                       margin: '5 0 0 5',
                       flex: 2,
                       labelAlign: 'top',
                       xtype: 'textfield'
                    },
                    items: [
                        {
                            fieldLabel: '预分配策略',
                            name: 'preAllocationStrategyKey',
                            hidden: true
                        },
                        {
                            fieldLabel: '行号',
                            xtype: 'numberfield',
                            minValue: 0,
                            name: 'stepNumber'
                        },
                        {
                            fieldLabel: '单位',
                            name: 'uom',
                            xtype: 'codecombo',
                            codeType: 'PREALLCATEUOM'
                        },
                        {
                            xtype: 'hidden',
                            flex: 1
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
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    defaults: {
                       labelWidth: 70,
                       margin: '5 0 0 5',
                       labelAlign: 'top',
                       xtype: 'textfield',
                       flex: 2
                    },
                    items: [
                        {
                            fieldLabel: '预分配引擎',
                            name: 'engine'
                        },
                        {
                            fieldLabel: '描述',
                            name: 'uomDescr'
                        },
                        {
                           fieldLabel: '状态',
                           xtype: 'checkbox',
                           flex: 1,
                           inputValue: 1,
                           name: 'status'
                        }
                    ]
                }
            ]
    	});
    	return this.baseform;
    },
    
    //第二个tab页面的明细表grid，位置center
    createDetailGrid: function(){
    	var me = this;
    	this.detailgrid = Ext.create('widget.preallocationdetailgrid',{
    		region: 'center',
    		listeners: {
    			itemclick: function(grid,record){
    				me.baseform.getForm().loadRecord(record);
    			}
    		}
    	});
    	this.detailgrid.getStore().on('beforeload',function(){
    		var params = this.detailgrid.getStore().getProxy().extraParams;
    		var record = me.topform.getForm().getValues();
    		
    		var preAllocationStrategyKey = record.preAllocationStrategyKey;
			delete params.preAllocationStrategyKey;
			if(preAllocationStrategyKey) params.preAllocationStrategyKey = preAllocationStrategyKey;
    		
    	},this);
    	return this.detailgrid;
    },
    
    //保存主表与明细表的相关记录
    saveStrategyAndDetail: function(){
    	var me = this;
    	var topform = this.topform.getForm();
    	var basicform = this.baseform.getForm();
    	
    	var values = topform.getValues();
    	var dVaues = basicform.getValues();

    	if(!(topform.isValid())||!(basicform.isValid())) return;
    	Ext.Ajax.request({
		    url: basePath + '/rules/doSavePreAllocateStrategy.action',
		    params: {
		    	strategyId: values.id,
		    	preAllocationStrategyKey: values.preAllocationStrategyKey,
		    	descr: values.descr,
		    	excess: values.excess,
		    	preAllocationType: values.preAllocationType,
		    	preAllocationRule: values.preAllocationRule,
		    	mark: values.mark,
                addDate: values.addDate,
                addWho: values.addWho,   
                
		    	strategyDetailId: dVaues.id,
		    	stepNumber: dVaues.stepNumber,
		    	status: dVaues.status,
		    	uom: dVaues.uom,
		    	uomDescr: dVaues.uomDescr,
		    	engine: dVaues.engine,
                daddDate: dVaues.addDate,
                daddWho: dVaues.addWho                  
		    },
		    success: function(response){
		        var text = Ext.decode(response.responseText);
		        var success = text.success;
		        MessageBox.show(success, text.json.msg);
		        me.gridPanel.getStore().load();
		        me.detailgrid.getStore().load();
		        basicform.reset();
		    }
		});
    }
});



Ext.onReady(function(){
	Ext.create('Ext.container.Viewport', {
	    layout: 'border',
	    items: [{
	    	xtype:'PreallocationManager',
	    	region:'center'
	    }]
	});
});