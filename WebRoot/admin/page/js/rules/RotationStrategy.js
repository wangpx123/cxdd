/**********************************************************************
库存周转策略


***********************************************************************/

//库存周转策略主表数据存储结构
Ext.define('RotationStrategy', {
    extend: 'Ext.data.Model',
    fields: [
    	{name:'id'},
		{name:'rotationStrategyKey'},
		{name:'descr'},
		{name:'mark'},
        {name:'addDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
        {name:'addWho'}           
	],
    idProperty: 'id'
});


//库存周转策略从表数据存储结构
Ext.define('RotationStrategyDetail', {
    extend: 'Ext.data.Model',
    fields: [
    	{name:'id'},
		{name:'rotationStrategyKey'},
		{name:'stepNumber'},
		{name:'status'},
		{name:'rotation'},
		{name:'sortType'},
		{name:'matchType'},
        {name:'addDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
        {name:'addWho'}           
	],
    idProperty: 'id'
});


//库存周转策略grid
Ext.define('Redm.rules.RotationStrategyGrid', {
    extend: 'Redm.BaseGrid',
    alias : 'widget.rotationstrategygrid',
    loadMask: true,
    forceLayout:true,
    buildColumns: function(){
        this.columns = [
		    { header: "库存周转策略", dataIndex: 'rotationStrategyKey', width: 100, sortable: true},
		    { header: "描述", dataIndex: 'descr', width: 180, sortable: true},
		    { header: "备注", dataIndex: 'mark', width: 200, sortable: true},
		    { header: "id", dataIndex: 'id', width: 120, sortable: true,hidden: true},
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

//暂时屏蔽鼠标右键菜单
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
    	this.buildStore(basePath + '/rules/doQueryRotationStrategy.action','RotationStrategy',20);
        this.callParent(arguments);
    }

    //右键菜单的创建按钮，调用onGo
/*    onCreate: function(){
   	 	var fatherPanel = this.ownerCt.ownerCt;
   	 	fatherPanel.onGo();
    },*/

    //右键菜单的创建按钮，调用onGo
/*    onDelete: function(){
    	var fatherPanel = this.ownerCt.ownerCt;
   	 	fatherPanel.onGoDelete();
    }*/
});

//库存周转策略明细表
Ext.define('Redm.rules.RotationStrategyDetailGrid', {
    extend: 'Redm.BaseGrid',
    alias : 'widget.rotationstrategydetailgrid',
    loadMask: true,
    forceLayout:true,
    autoLoad:false,
    buildColumns: function(){
        this.columns = [
		    { header: "库存周转策略", dataIndex: 'rotationStrategyKey', width: 100, sortable: true},
		    { header: "行号", dataIndex: 'stepNumber', width: 50, sortable: true},
//		    { header: "状态", dataIndex: 'status', width: 100, sortable: true},
		    { header: "周转属性", dataIndex: 'rotation', width: 100, sortable: true,
                    renderer:this.rendererLottableFunc
            },
		    { header: "排序方式", dataIndex: 'sortType', width: 100, sortable: true,
                    renderer:this.rendererSortFunc
            },
		    { header: "模糊匹配", dataIndex: 'matchType', width: 100, sortable: true,
                    renderer:this.rendererMatchTypeFunc
            },
		    { header: "id", dataIndex: 'id', width: 100, sortable: true,hidden: true},
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
    	var me =this;
    	//屏蔽浏览器右键事件
        this.on('render',function(p){
        	 p.getEl().on("contextmenu",function(e){
            	e.preventDefault();
            },this)
        },this);

//暂时屏蔽
/*        this.on('itemcontextmenu',function(view,record,item,index,e,eOpts){ 
            //禁用的右键相应事件 
            e.preventDefault(); 
            e.stopEvent(); 
             
            var menu = new Ext.menu.Menu({ 
                //控制右键菜单位置 
                float:true, 
                 items:[
                    { 
                        text:"添加", 
                        iconCls:'leaf', 
                        handler:function(){
                        	//当点击时隐藏右键菜单 
                            this.up("menu").hide(); 
                            me.onAddDetail();
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
    	this.buildStore(basePath + '/rules/doQueryRotationStrategyDetail.action','RotationStrategyDetail',20);
        this.callParent(arguments);
    },
    
    	//排序方式解析函数
    rendererLottableFunc:function(value)
        {
            var retValue;
            if(value=='LOTTABLE01') retValue='批属性01';
            else if(value=='LOTTABLE02') retValue='批属性02';
            else if(value=='LOTTABLE03') retValue='批属性03';
            else if(value=='LOTTABLE04') retValue='批属性04';
            else if(value=='LOTTABLE05') retValue='批属性05';
            else if(value=='LOTTABLE06') retValue='批属性06';
            else if(value=='LOTTABLE07') retValue='批属性07';
            else if(value=='LOTTABLE08') retValue='批属性08';
            else if(value=='LOTTABLE09') retValue='批属性09';
            else if(value=='LOTTABLE10') retValue='批属性10';
            else if(value=='LOTTABLE11') retValue='批属性11';
            else if(value=='LOTTABLE12') retValue='批属性12';
            else if(value=='LOTTABLE13') retValue='批属性13';
            else if(value=='LOTTABLE14') retValue='批属性14';
            else if(value=='LOTTABLE15') retValue='批属性15';
            else if(value=='LOTVALUE') retValue='周转属性批号';
            else  retValue=value;
            return retValue;
        }, 

        //排序方式解析函数
    rendererSortFunc:function(value)
        {
            var retValue;
            if(value=='1') retValue='升序';
            else if(value=='2') retValue='降序';
            else  retValue=value;
            return retValue;
        }, 
    	
        //匹配方式解析函数
    rendererMatchTypeFunc:function(value)
        {
            var retValue;
            if(value=='1') retValue='是';
            else if(value=='2') retValue='否';
            else  retValue=value;
            return retValue;
        }
        
});

//最外部的容器，继承自tab.Panel，有两个tab页面，均为panel
Ext.define('Redm.rules.RotationStrategy',{
	extend: 'Ext.tab.Panel',
    alias : 'widget.rotationstrategy',
    title:'库存周转策略',
    layout:'border',
    tabPosition: 'bottom',
    initComponent: function(){
    	var me = this;
    	//this.buildContextMenu();   //菜单初始化，暂时不用
    	this.items = [this.createInvPanel(),this.createInvDPanel()];  
    	this.callParent(arguments);
    },

/*    buildContextMenu:function(){    //菜单项的定义 暂时不用
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
    
    //第一个tab页面的创建按钮，跳转到第二个tab页面，并清空两个输入面板的文本框
    onGo: function(){
    	this.setActiveTab(1);
    	this.invtraform.getForm().reset();
    	this.topform.getForm().reset();
    },
    
    //第一个tab页面的删除按钮，删除选中的主表记录和明细表的相关记录
    onGoDelete: function(){
    	var me = this;
    	var records = me.invtragrid.getSelectionModel().getSelection(); 
    	if(records == ""){
    		MessageBox.error('错误提示','请选择删除的数据！');
    		return;
    	}else{
            Ext.MessageBox.confirm('询问提示', '确定要删除吗？', 
                function(btn){
                    if(btn == 'yes'){            
                        var record = records[0].getData();
                        Ext.Ajax.request({
                            url: basePath +'/rules/doDeleteRotationStrategy.action',
                            params: {
                                rotationStrategyKey: record.rotationStrategyKey
                            },
                            success: function(response){
                                var text = Ext.decode(response.responseText);
                                var success = text.success;
                                MessageBox.show(success, text.json.msg);
                                me.invtragrid.getStore().load();
                                me.invtradetailgrid.getStore().load();
                                me.topform.getForm().reset();
                                me.invtraform.getForm().reset();
                            }
                        });
                    }
                }
            );      
    	}
    },
    
    //第一个tab页面查询面板的查询按钮
   	onSelect: function(){
    	this.invtragrid.getStore().load();
    },
    
    //第一个tab页面的查询面板的重置按钮
    onReset: function(){
    	this.selform.getForm().reset();
    },
    
    //第二个tab页面创建按钮，清空查询面板显示的主表记录，和输入面板的文本框
    onCreate: function(){
    	this.topform.getForm().reset();
    	this.invtraform.getForm().reset();
    },
    
    //第二个tab页面的删除按钮，功能同onGoDelete，删除主表记录和相关明细表记录，主表记录来自于topform
    onDelete: function(){
    	var me = this;
    	var values = me.topform.getValues(); 
    	if(values.rotationStrategyKey == '') return ;
        
        Ext.MessageBox.confirm('询问提示', '确定要删除吗？', 
            function(btn){
                if(btn == 'yes'){ 
                    Ext.Ajax.request({
                        url: basePath +'/rules/doDeleteRotationStrategy.action',
                        params: {
                            rotationStrategyKey: values.rotationStrategyKey
                        },
                        success: function(response){
                            var text = Ext.decode(response.responseText);
                            var success = text.success;
                            MessageBox.show(success, text.json.msg);
                            me.invtragrid.getStore().load();
                            me.invtradetailgrid.getStore().load();
                            me.topform.getForm().reset();
                            me.invtraform.getForm().reset();
                        }
                    });
                }
            }
        );
    },
    
    //第二个tab页面的添加按钮，清空输入form的文本框
    onAddDetail: function(){
    	this.invtraform.getForm().reset();
    },
    
    //第二个tab页面删除选中的明细表记录的按钮
    onDeleteDetail: function(){
    	var me = this;
    	var records = me.invtradetailgrid.getSelectionModel().getSelection(); 
    	if(records == ""){
    		MessageBox.error('错误提示','请选择删除的数据！');
    		return;
    	}else{
    		var record = records[0].getData();
            
            Ext.MessageBox.confirm('询问提示', '确定要删除吗？', 
                function(btn){
                    if(btn == 'yes'){             
                        Ext.Ajax.request({
                            url: basePath +'/rules/doDeleteRotationStrategyDetail.action',
                            params: {
                                id: record.id
                            },
                            success: function(response){
                                var text = Ext.decode(response.responseText);
                                var success = text.success;
                                MessageBox.show(success, text.json.msg);
                                me.invtradetailgrid.getStore().load();
                                me.invtraform.getForm().reset();
                            }
                        });
                    }
                }
            );            
    	}
    },
//创建鼠标的右键菜单    
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
   

//第1个tab页，包含三部分   
    createInvPanel: function(){
    	this.invpanel = Ext.create('Ext.panel.Panel',{
    		title: '查询信息',
    		layout: 'border',
//    		items:[this.createInvTraGrid(),this.createSelForm(),this.createBtnForm()]
     		items: [this.createInvTraGrid(),this.createPt1Pn1Panel()]
   	});
    	return this.invpanel;
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

    
//第1个tab页的按钮面板
    createBtnForm: function(){
    	var me = this;
    	this.btnform = Ext.create('Ext.form.Panel',{
    		region: 'center',
    		frame: true,
    		defaults: {
    			xtype: 'button',
    			margin: '5 0 0 5'
    		},
/*    		listeners:{   //暂不使用右键菜单
	            render:function(p){
	                p.getEl().on("contextmenu",function(e){
	                	me.createGoContextMenu(e);
	                },me)
	            }
            },*/
    		items: [
                {
                    iconCls: 'icon-create',
                    text: '创建',
                    handler: me.onGo,     //第一个tab页面的创建按钮，跳转到第二个tab页面，并清空查询form和输入form
                    scope: this
                },
                {
                    iconCls: 'icon-delete',
                    text: '删除',
                    handler: me.onGoDelete,  //第一个tab页面的删除按钮，跳转到第二个tab页面，并清空查询form和输入form
                    scope: this
                }
            ]
    	});
    	return this.btnform;
    },
    
//第一个tab页的查询面板    
	createSelForm: function(){
		var me = this;
		this.selform = Ext.create('Ext.form.Panel',{
			region: 'north',
			height: 50,
			frame: true,
			layout: 'hbox',
			defaults:{
				xtype: 'textfield',
				labelWidth: 40,
				margin: '5 0 0 5'
			},
/*			listeners:{           //暂不使用右键菜单功能
	            render:function(p){
	                p.getEl().on("contextmenu",function(e){
	                	me.createGoContextMenu(e);
	                },me)
	            }
            },*/
			items:[
                {
                    fieldLabel: '库存周转策略',
                    labelWidth: 80,
                    listeners: {
                        blur:function(txt){
                            txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                        }
                    },
                    name: 'rotationStrategyKey'
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
                    handler: me.onSelect,       //第一个tab页的查询按钮
                    scope: this,
                    iconCls: 'icon-search',
                    text: '查询'
                },
                {
                    xtype: 'button',
                    handler: me.onReset,       //第一个tab页的重置按钮，清空查询form的文本框
                    scope: this,
                    iconCls: 'icon-reset',
                    text: '重置'
                }
            ]
		});
		return this.selform;
	},    

    
//第1个tab页的grid面板
 	createInvTraGrid: function(){
 		var me = this;
    	this.invtragrid = Ext.create('widget.rotationstrategygrid',{
//    		region: 'south',
    		region: 'center',
//    		height: 580,
    		listeners: {                //双击主表的记录，跳转到第二个tab页面，并显示相关的记录
    			itemdblclick: function(gird,record){
					me.topform.getForm().loadRecord(record);    //顶部输入框显示主表选中记录的信息
					me.setActiveTab(1);                         //tab页面跳转
					me.invtradetailgrid.getStore().load();      //明细表记录加载
    			}
    		}
    	});
    	this.invtragrid.getStore().on('beforeload',function(){
    		var params = this.invtragrid.getStore().getProxy().extraParams;
    		var record = me.selform.getForm().getValues();   //根据输入框的查询条件在明细表
    		
    		var rotationStrategyKey = record.rotationStrategyKey;
    		var descr = record.descr;
    		var mark = record.mark;
    		
			delete params.rotationStrategyKey;
			delete params.descr;
			delete params.mark;
			
			if(rotationStrategyKey) params.rotationStrategyKey = rotationStrategyKey;
			if(descr) params.descr = descr;
			if(mark) params.mark = mark;
    		
    	},this);
    	return this.invtragrid;
    },
//第1个tab页面结束


//第2个tab页面 ，包含三部分组成，顶部的DTopPanel，center位置的grid，east位置的输入面板
    createInvDPanel: function(){
    	var me = this;
    	this.invdpanel = Ext.create('Ext.panel.Panel',{
    		title: '具体信息',
    		layout: 'border',
/*    		tbar: {                //快捷菜单，暂不使用
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
                    }
                ]
	        },*/
    		items: [this.createInvTraForm(),this.createInvTraDetailGrid(),this.createDTopPanel()]
    	});
    	return this.invdpanel;
    },
    
//第二个tab页面上部的panel    包括一个输入面板，和两个按钮面板
    createDTopPanel: function(){
    	this.dtoppanel = Ext.create('Ext.panel.Panel',{
    		region: 'north',
    		layout: 'border',
    		height: 130,
    		border: false,
    		items:[this.createTopForm(),this.createDBtnPanel(),this.createBtnPanel()]
    	});
    	return this.dtoppanel;
    },
    
//  第二个页面上部panel的明细表按钮面板，south位置，明细表的添加和删除按钮
    createDBtnPanel: function(){
    	var me = this;
    	this.dbtnpanel = Ext.create('Ext.form.Panel',{
    		region: 'south',
    		frame: true,
    		defaults: {
    			xtype: 'button',
    			margin: '5 0 0 5'
    		},
/*    		listeners:{         //暂不使用
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
                    handler: me.onAddDetail    //添加明细表记录，只清空明细表输入的form
                },
                {
                    iconCls: 'icon-delete',
                    itemId: 'delete',
                    text: '删除',
                    handler: me.onDeleteDetail,   //删除明细表记录
                    scope: this
                }
            ]
    	});
    	return this.dbtnpanel;
    },
    
    //第二个页面上部panel的主表相关按钮面板，north位置
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
                    handler: me.onCreate     //创建，清空主表输入面板和明细表输入面板
                },
                {
                    iconCls: 'icon-delete',
                    itemId: 'delete',
                    text: '删除',
                    handler: me.onDelete,   //删除，根据主表输入面板的关键字，删除主表对应字段和明细表相关字段
                    scope: this
                },
                {
                    iconCls: 'icon-save',
                    itemId: 'save',
                    text: '保存',
                    handler: me.saveStrategyAndDetail,   //存盘，包括主表和明细表
                    scope: this
                }
            ]
    	});
    	return this.btnpanel;
    },
    
    //第二个tab页面 下边面板 的输入form，east位置
    createInvTraForm: function(){
    	this.invtraform = Ext.create('Ext.form.Panel',{
    		region: 'east',
    		width: 450,
    		split: true,
			collapsible: true,
			frame: true,
    		defaults: {
    			xtype: 'fieldcontainer',
    			margin: '5 0 0 5'
    		},
    		items: [
                {
                    layout: 'hbox',
                    defaults: {
                        xtype: 'textfield',
                        labelWidth: 60,
                        margin: '5 0 0 5',
                        labelAlign: 'top',
                        flex: 1
                    },
                    items: [
                        {
                            fieldLabel: 'rotationStrategyKey',
                            name: 'rotationStrategyKey',
                            hidden: true
                        },
                        {
                            fieldLabel: '行号',
                            xtype: 'numberfield',
                            minValue:0,         //最小值为0
                            name: 'stepNumber'
                        },
                        {
                            fieldLabel: '排序方式',
                            xtype: 'codecombo',
                            codeType: 'TOSORTTYPE',
                            allowBlank: false,
                            name: 'sortType'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults: {
                        xtype: 'textfield',
                        labelWidth: 60,
                        margin: '5 0 0 5',
                        labelAlign: 'top',
                        flex: 1
                    },
                    items: [
                        {
                            fieldLabel: '周转属性',
                            xtype: 'codecombo',
                            codeType: 'TOLOTTABLE',
                            name: 'rotation'
                        }//,
                        /*{
                            xtype: 'hidden'
                        },
                        {
                            xtype: 'hidden'
                        }*/
                    ]
                },
                {
                    layout: 'hbox',
                    defaults: {
                        xtype: 'checkbox',
                        labelWidth: 60,
                        margin: '5 0 0 5',
                        inputValue: 1,
                        uncheckedValue:2,
                        flex: 1
                    },
                    items: [
                        {
                            boxLabel: '状态',
                            name: 'status'
                        },
                        {
                            margin: '5 0 0 20',
                            boxLabel: '模糊匹配',
                            name: 'matchType'
                        },
                        {
                            xtype: 'hidden',
                            name: 'id'
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
    	return this.invtraform;
    },
    createInvTraDetailGrid: function(){
    	var me = this;
    	this.invtradetailgrid = Ext.create('widget.rotationstrategydetailgrid',{
    		region: 'center',
    		listeners: {
    			itemclick: function(grid,record){
    				me.invtraform.getForm().loadRecord(record);
    			}
    		}
    	});
    	this.invtradetailgrid.getStore().on('beforeload',function(){
    		var params = this.invtradetailgrid.getStore().getProxy().extraParams;
    		var tsform = this.topform.getForm();
    		var tsValues = tsform.getValues();
    		
    		var rotationStrategyKey = tsValues.rotationStrategyKey;
			delete params.rotationStrategyKey;
			if(rotationStrategyKey) params.rotationStrategyKey = rotationStrategyKey;
    		
    	},this);
    	return this.invtradetailgrid;
    },
    createTopForm: function(){
    	var me = this;
    	this.topform = Ext.create('Ext.form.Panel',{
    		region: 'center',
    		height: 50,
    		layout: 'hbox',
    		frame: true,
    		border: false,
    		defaults: {
    			xtype: 'textfield',
    			margin: '5 0 0 5',
    			labelWidth: 40
    		},
/*    		listeners:{     //暂不使用
	            render:function(p){
	                p.getEl().on("contextmenu",function(e){
	                	me.createContextMenu(e);
	                },me)
	            }
            },*/
    		items:[
                {
                    fieldLabel: '库存周转策略',
                    labelWidth: 80,
                    listeners: {
                        blur:function(txt){
                            txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                        }
                    },
                    width: 200,
                    name: 'rotationStrategyKey',
                    allowBlank: false
                },
                {
                    fieldLabel: '描述',
                    allowBlank: false,
                    width: 250,
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
    saveStrategyAndDetail: function(){
    	var me = this;
    	var tsform = this.topform.getForm();
    	var tsdform = this.invtraform.getForm();
    	if(!(tsform.isValid())||!(tsdform.isValid())) return;
    	var tsValues = tsform.getValues();
    	var tsdVaues = tsdform.getValues();
    	Ext.Ajax.request({
		    url: basePath + '/rules/doSaveRotationStrategy.action',
		    params: {
		    	strategyId: tsValues.id,
		    	rotationStrategyKey: tsValues.rotationStrategyKey,
		    	descr: tsValues.descr,
		    	mark: tsValues.mark,
                addDate: tsValues.addDate,
                addWho: tsValues.addWho,                    
                
		    	strategyDetailId: tsdVaues.id,
		    	stepNumber: tsdVaues.stepNumber,
		    	status: tsdVaues.status,
		    	rotation: tsdVaues.rotation,
		    	sortType: tsdVaues.sortType,
		    	matchType: tsdVaues.matchType,
                daddDate: tsdVaues.addDate,
                daddWho: tsdVaues.addWho
		    },
		    success: function(response){
		        var text = Ext.decode(response.responseText);
		        var success = text.success;
		        MessageBox.show(success, text.json.msg);
		        tsdform.reset();
		        me.invtradetailgrid.getStore().load();
		        me.invtragrid.getStore().load();
		    }
		});
    }
});

Ext.onReady(function(){
	Ext.create('Ext.container.Viewport', {
	    layout: 'border',
	    items: [
            {
                xtype:'rotationstrategy',
                region:'center'
            }
        ]
	});
});