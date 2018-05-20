/***************************************

boom.js



***************************************/


Ext.define('Billofmaterial', {
    extend: 'Ext.data.Model',
    fields: [
		{name:'id'},
		{name:'storerKey'},
		{name:'sku'},
		{name:'name'},
		{name:'descr'},
		{name:'status'}
	],
    idProperty: 'id'
});

Ext.define('BomDetail', {
    extend: 'Ext.data.Model',
    fields: [
		{name:'id'},
		{name:'storerKey'},
		{name:'sku'},
		{name:'componentSku'},
		{name:'sequence'},
		{name:'qty'},
		{name:'isComponent'},
		{name:'name'},
		{name:'descr'}
	],
    idProperty: 'id'
});

Ext.define('Redm.support.BomGrid', {
    extend: 'Redm.BaseGrid',
    alias : 'widget.BomGrid',
    loadMask: true,
    height: 400,
    forceLayout:true,
    buildColumns: function(){
        this.columns = [
    		{ header: "货主", dataIndex: 'storerKey',sortable: true, width: 100},
		    { header: "商品", dataIndex: 'sku', sortable: true, width: 100},
		    { header: "名称", dataIndex: 'name',sortable: true, width: 80},
		    { header: "描述", dataIndex: 'descr', sortable: true, width: 240},
		    { header: "状态", dataIndex: 'status',sortable: true, width: 240},
		    { header: "id", dataIndex: 'id',sortable: true, width: 240,hidden: true}
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
                            me.onGoDelete();
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
    	this.buildStore(basePath + '/support/doQueryBoms.action','Billofmaterial',20);
        this.callParent(arguments);
    }
    
/*    onCreate: function(){
   	 	var fatherPanel = this.ownerCt;
   	 	fatherPanel.onCreate();
    },
    onGoDelete: function(){
    	var fatherPanel = this.ownerCt;
   	 	fatherPanel.onGoDelete();
    }*/
    
});


Ext.define('Redm.support.BomDetailGrid', {
    extend: 'Redm.BaseGrid',
    alias : 'widget.bomdetailgrid',
    loadMask: true,
    height: 400,
    forceLayout:true,
//    autoLoad: false,
    buildColumns: function(){
        this.columns = [
    		{ header: "货主", dataIndex: 'storerKey',sortable: true, width: 100},
		    { header: "商品", dataIndex: 'sku', sortable: true, width: 100},
		    { header: "部件商品", dataIndex: 'componentSku',sortable: true, width: 120},
		    { header: "次序", dataIndex: 'sequence', sortable: true, width: 60},
		    { header: "数量", dataIndex: 'qty',sortable: true, width: 60},
		    { header: "只作部件", dataIndex: 'isComponent', sortable: true, width: 200},
		    { header: "名称", dataIndex: 'name',sortable: true, width: 200},
		    { header: "描述", dataIndex: 'descr', sortable: true, width: 100},
		    { header: "id", dataIndex: 'id', sortable: true, width: 100,hidden: true}
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
    	//屏蔽浏览器右键事件
/*        this.on('render',function(p){
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
    	this.buildStore(basePath + '/support/doQueryBomDetails.action','BomDetail',20);
        this.callParent(arguments);
    }
    
/*    onAddDetail: function(){
    	var fatherPanel = this.ownerCt.ownerCt.ownerCt;
    	fatherPanel.onAddDetail();
    },
    onDelete: function(){
    	var fatherPanel = this.ownerCt.ownerCt.ownerCt;
    	fatherPanel.onDeleteDetail();
    }*/
});

/*  这段代码可以不要了，已经放到下边的容器中了
Ext.define('Redm.support.BomManagers', {	
	extend: 'Ext.panel.Panel',
    alias : 'widget.BomManagers',
    layout: 'border',
    initComponent: function(){
    	var me = this;
//    	this.buildContextMenu();
    	this.items = [this.createBomGrid(),this.createTopPanel()];
        this.callParent(arguments);
    },
    
*    buildContextMenu:function(){
    	var me = this;
    	this.createAction = Ext.create('Ext.Action', {
			text : "创建" ,
			iconCls: 'icon-create',
			handler: me.onCreate,
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
    },*
    
    onCreate: function(){
    	var fatherPanel = this.ownerCt;
    	fatherPanel.childtop.getForm().reset();
    	fatherPanel.childdetailform.getForm().reset();
    	fatherPanel.setActiveTab(1);
    },
    
    onSelect: function(){
    	this.bomgrid.getStore().load();
    },
    
    onReset: function(){
    	this.basicForm.getForm().reset();
    },
    
    //第一个页面的删除按钮，删除主表选中的记录和明细表的相关记录
    onGoDelete: function(){
    	var me = this;
    	var records = me.bomgrid.getSelectionModel().getSelection(); 
    	if(records == ""){
    		MessageBox.error('错误提示','请选择删除的数据！');
    		return;
    	}else{
    		Ext.MessageBox.confirm('询问提示', '确定要删除所选信息吗？', 
				function(btn){
					if(btn == 'yes'){
						var datas = records[0].getData();
			        	Ext.Ajax.request({
						    url: basePath + '/support/doDeleteBom.action',
						    params: {
						    	storerKey: datas.storerKey,
						    	sku: datas.sku
						    },
						    success: function(response){
						        var text = Ext.decode(response.responseText);
						        var success = text.success;
						        MessageBox.show(success, text.json.msg);
						        me.bomgrid.getStore().load();
						        var fatherPanel = me.ownerCt;
						        fatherPanel.childdetailgrid.getStore().load();
						        fatherPanel.childtop.getForm().reset();
						        fatherPanel.childdetailform.getForm().reset();
						    }
						});
					}
				}
			); 
    		
    	}
    },
    
    
    
    createTopPanel: function(){
    	var me = this;
    	this.toppanel = Ext.create('Ext.panel.Panel',{
    		region: 'north',
    		height: 130,
    		layout: 'border',
    		border: false,
    		items:[this.createBtnForm(),this.createBasicForm()]
    	});
    	return this.toppanel;
    },
    
    createBtnForm: function(){
    	var me = this;
    	this.btnform = Ext.create('Ext.form.Panel',{
    		region: 'north',
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
                    handler: me.onGoDelete,
                    scope: this
                },
                { 
                    iconCls: 'icon-search',
                    scope: this,
                    text: '查询',
                    handler: me.onSelect,
                    width: 60
                },
                {
                    scope: this,
                    iconCls: 'icon-reset',
                    text: '重置',
                    handler: me.onReset,
                    width: 60
                }
            ]
    	});
    	return this.btnform;
    },
    
    createBomGrid: function(){
    	var me = this;
    	this.bomgrid = Ext.create('widget.BomGrid',{
			region: 'center',
			listeners: {
				itemdblclick: function(gird,record){
					var fatherPanel = me.ownerCt;
					fatherPanel.setActiveTab(1);
					fatherPanel.childtopform.getForm().loadRecord(record);
					fatherPanel.childdetailgrid.getStore().load();
				}
			}
		});
	 	this.bomgrid.getStore().on('beforeload',function(){
    		var params = this.bomgrid.getStore().getProxy().extraParams;
    		var record = me.basicForm.getForm().getValues();
    		
    		var storerKey = record.storerKey;
    		var sku = record.sku;
    		
			delete params.storerKey;
			delete params.sku;
    		
			if(storerKey) params.storerKey = storerKey;
         	if(sku) params.sku = sku;
    	},this);
		return this.bomgrid;
    },
    
    
    createBasicForm: function(){
    	var me = this;
    	this.basicForm = Ext.create('Ext.form.Panel',{
    		region: 'center',
    		stripeRows : true,
			autoScroll : true,
			viewConfig : {
				forceFit: true,
				autoFill: true
			},
			xtype:'form',
			frame:true,
			border: false,
			headerPosition: 'bottom',
	        bodyPadding: 1,
	        defaults: {
	        	xtype: 'fieldcontainer',
                hideLabel: true,
	            anchor: '100%',
	            labelWidth: 100
	        },
	        items: [
                {
                   xtype: 'fieldcontainer',
                   layout: 'hbox',
                   defaults: {
                       labelWidth: 60,
                       margin: '5 0 0 5',
                       width: 240,
                       xtype: 'textfield'
                   },
                   items: [
                        {
                            fieldLabel: '货主',
                            listeners:{
                                change: function(tf,newValue){
                                    tf.setValue(newValue.toUpperCase());
                                }
                            },
                            name: 'storerKey'
                        }
                   ]
                },
                {
                   xtype: 'fieldcontainer',
                   layout: 'hbox',
                   defaults: {
                       labelWidth: 60,
                       margin: '5 0 0 5',
                       width: 240,
                       xtype: 'textfield'
                   },
                   items: [
                        {
                            fieldLabel: '组件商品',
                            name: 'sku'
                        }
                   ]
                }
            ]
    	});
    	return this.basicForm;
    }
		    
});*/

Ext.define('Redm.support.Bom',{
    extend: 'Ext.tab.Panel',
    alias : 'widget.bommanager',
    title:'BOM',
    tabPosition: 'bottom',
	initComponent: function(){
		var me = this;
		this.items = [this.createBomPanel(),this.createBomChildTab()];
		this.callParent(arguments);
	},
    
//第一个tab页面包括一个grid面板和一个TopPanel    

    createBomPanel: function(){
    	var me = this;
    	this.bompanel = Ext.create('Ext.form.Panel',{
    		title: '查询',
    		layout: 'border',
    		border: false,
            items: [this.createBomGrid(),this.createTopPanel()]
    	});
    	return this.bompanel;
    },

    //创建第一个tab页面的grid面板
    createBomGrid: function(){
    	var me = this;
    	this.bomgrid = Ext.create('widget.BomGrid',{
			region: 'center',
			listeners: {
				itemdblclick: function(gird,record){
					var fatherPanel = me.ownerCt;
					me.setActiveTab(1);
					me.childtopform.getForm().loadRecord(record);
					me.childdetailgrid.getStore().load();    
				}
			}
		});
	 	this.bomgrid.getStore().on('beforeload',function(){
    		var params = this.bomgrid.getStore().getProxy().extraParams;
    		var record = me.basicForm.getForm().getValues();
    		
    		var storerKey = record.storerKey;
    		var sku = record.sku;
    		
			delete params.storerKey;
			delete params.sku;
    		
			if(storerKey) params.storerKey = storerKey;
         	if(sku) params.sku = sku;
    	},this);
		return this.bomgrid;
    },

    //创建第一个tab页面上部的TopPanel，包括按钮面板和查询form
    createTopPanel: function(){
    	var me = this;
    	this.toppanel = Ext.create('Ext.panel.Panel',{
    		region: 'north',
    		height: 130,
    		layout: 'border',
    		border: false,
    		items:[this.createBtnForm(),this.createBasicForm()]
    	});
    	return this.toppanel;
    },
    
    //创建第一个tab页面上部TopPanel的主表按钮面板，包括创建，删除，查询，重置四个按钮
    createBtnForm: function(){
    	var me = this;
    	this.btnform = Ext.create('Ext.form.Panel',{
    		region: 'north',
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
                    handler: me.onGo,
                    scope: this
                },
                {
                    iconCls: 'icon-delete',
                    itemId: 'delete',
                    text: '删除',
                    handler: me.onGoDelete,
                    scope: this
                },
                { 
                    iconCls: 'icon-search',
                    scope: this,
                    text: '查询',
                    handler: me.onSelect,
                    width: 60
                },
                {
                    scope: this,
                    iconCls: 'icon-reset',
                    text: '重置',
                    handler: me.onReset,
                    width: 60
                }
            ]
    	});
    	return this.btnform;
    },
    
    
    //创建第一个tab页面上部TopPanel的查询条件输入面板
    createBasicForm: function(){
    	var me = this;
    	this.basicForm = Ext.create('Ext.form.Panel',{
    		region: 'center',
    		stripeRows : true,
			autoScroll : true,
			viewConfig : {
				forceFit: true,
				autoFill: true
			},
			xtype:'form',
			frame:true,
			border: false,
			headerPosition: 'bottom',
	        bodyPadding: 1,
	        defaults: {
	        	xtype: 'fieldcontainer',
                hideLabel: true,
	            anchor: '100%',
	            labelWidth: 100
	        },
	        items: [
                {
                   xtype: 'fieldcontainer',
                   layout: 'hbox',
                   defaults: {
                       labelWidth: 60,
                       margin: '5 0 0 5',
                       width: 240,
                       xtype: 'textfield'
                   },
                   items: [
                        {
                            fieldLabel: '货主',
                            listeners:{
                                change: function(tf,newValue){
                                    tf.setValue(newValue.toUpperCase());
                                }
                            },
                            name: 'storerKey'
                        }
                   ]
                },
                {
                   xtype: 'fieldcontainer',
                   layout: 'hbox',
                   defaults: {
                       labelWidth: 60,
                       margin: '5 0 0 5',
                       width: 240,
                       xtype: 'textfield'
                   },
                   items: [
                        {
                            fieldLabel: '组件商品',
                            name: 'sku'
                        }
                   ]
                }
            ]
    	});
    	return this.basicForm;
    },
    
    //第一个tab页面的创建按钮，跳转到第二个tab页面，并清空主表输入form和明细表输入form
    onGo: function(){
        var me = this;
    	me.setActiveTab(1);
    	me.childtop.getForm().reset();
    	me.childdetailform.getForm().reset();
    },
    
    //第一个页面的查询按钮
    onSelect: function(){
    	this.bomgrid.getStore().load();
    },
    
    //第一个页面的重置按钮
    onReset: function(){
    	this.basicForm.getForm().reset();
    },
    
    //第一个页面的删除按钮，删除主表选中的记录和明细表的相关记录
    onGoDelete: function(){
    	var me = this;
    	var records = me.bomgrid.getSelectionModel().getSelection(); 
    	if(records == ""){
    		MessageBox.error('错误提示','请选择删除的数据！');
    		return;
    	}else{
    		Ext.MessageBox.confirm('询问提示', '确定要删除所选信息吗？', 
				function(btn){
					if(btn == 'yes'){
						var datas = records[0].getData();
			        	Ext.Ajax.request({
						    url: basePath + '/support/doDeleteBom.action',
						    params: {
						    	storerKey: datas.storerKey,
						    	sku: datas.sku
						    },
						    success: function(response){
						        var text = Ext.decode(response.responseText);
						        var success = text.success;
						        MessageBox.show(success, text.json.msg);
						        me.bomgrid.getStore().load();
						        me.childdetailgrid.getStore().load();
						        me.childtop.getForm().reset();
						        me.childdetailform.getForm().reset();
						    }
						});
					}
				}
			); 
    		
    	}
    },
    
    //以上是第一个页面的所有组件和方法

    //第二个tab页面，包括一个ChildTop 和一个ChildDetail
    createBomChildTab: function(){
    	var me = this;
    	this.bomchildtab = Ext.create('Ext.form.Panel',{
    		title: '基本',
    		layout: 'border',
    		border: false,
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
	                        handler: me.saveCode
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
    		items: [me.createChildTop(),me.createChildDetail()]
    	});
    	return this.bomchildtab;
    },
    
    //第二个tab页面的上部的面板，包括ChildTopForm，ChildTopBtn，BtnPanel
    createChildTop: function(){
    	var me = this;
    	this.childtop = Ext.create('Ext.form.Panel',{
			region: 'north',
			frame:true,
			height: 200,
			border: false,
			layout: 'border',
	        items: [me.createChildTopForm(),me.createChildTopBtn(),me.createBtnPanel()]
    	});
    	return this.childtop;
    },    
    
    //第二个tab页面的上部ChildTop面板上，主表记录输入和显示的面板
    createChildTopForm: function(){
    	var me = this;
    	this.childtopform = Ext.create('Ext.form.Panel',{
			region: 'center',
			frame:true,
			border: false,
/*			listeners:{
	            render:function(p){
	                p.getEl().on("contextmenu",function(e){
	                	me.createContextMenu(e);
	                },me)
	            }
            },*/
	        defaults: {
	        	xtype: 'fieldcontainer',
                hideLabel: true,
	            anchor: '100%',
	            labelWidth: 100
	        },
	        items: [
                {
                   xtype: 'fieldcontainer',
                   layout: 'hbox',
                   defaults: {
                       margin: '5 0 0 5',
                       xtype: 'textfield',
                       labelAlign: 'top',
                       width: 150
                   },
                   items: [
                        {
                            fieldLabel: '货主',
                            name: 'storerKey',
                            listeners:{
                                change: function(tf,newValue){
                                    tf.setValue(newValue.toUpperCase());
                                }
                            },
                            allowBlank: false
                        },
                        {
                            fieldLabel: '组件商品',
                            name: 'sku',
                            allowBlank: false
                        },
                        {
                            fieldLabel: '名称',
                            name: 'name',
                            allowBlank: false
                        },
                        {
                            name: 'id',
                            hidden: true
                        }
                   ]
                },
                {
                   xtype: 'fieldcontainer',
                   layout: 'hbox',
                   defaults: {
                       margin: '5 0 0 5',
                       xtype: 'textfield',
                       labelAlign: 'top',
                       width: 230
                   },
                   items: [
                        {
                            fieldLabel: '描述',
                            name: 'descr'
                        },
                        {
                            fieldLabel: '状态',
                            name: 'status'
                        }
                   ]
                }
            ]
    	});
    	return this.childtopform;
    },

    //第二个tab页面的上部ChildTop面板上，主表和明细表相关操作的按钮面板，包括创建，删除，保存
    createChildTopBtn: function(){
    	var me = this;
    	this.childtopbtn = Ext.create('Ext.form.Panel',{
    		region: 'north',
    		frame: true,
/*    		listeners:{
	            render:function(p){
	                p.getEl().on("contextmenu",function(e){
	                	me.createContextMenu(e);
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
	                text: '创建',
	                handler: me.onCreate,
	                scope: this
	            },
                {
	                iconCls: 'icon-delete',
	                itemId: 'delete',
	                text: '删除',
	                handler:  me.onDelete,
	                scope: this
	            },
                {
	                iconCls: 'icon-save',
	                itemId: 'save',
	                text: '保存',
	                handler: me.saveBomAndDetail,
	                scope: this
	            }
            ]
    	});
    	return this.childtopbtn;
    },
        
    //第二个tab页面的上部ChildTop面板上，明细表相关操作的按钮面板，包括添加，删除
    createBtnPanel: function(){
    	var me = this;
    	this.btnpanel = Ext.create('Ext.form.Panel',{
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
                    itemId: 'delete',
                    text: '删除',
                    handler: me.onDeleteDetail,
                    scope: this
                }
            ]
    	});
    	return this.btnpanel;
    },

    //第二个tab页面的下部ChildDetail面板，包括一个明细表grid和一个明细表输入，显示的form
    createChildDetail: function(){
    	var me = this;
    	this.childdetail = Ext.create('Ext.panel.Panel',{
    		tabPosition: 'bottom',
    		region: 'center',
    		layout: 'border',
    		border: false,
    		items: [me.createChildDetailForm(),me.createChildDetailGrid()]
    	});
    	return this.childdetail;
    },
    
    //第二个tab页面的下部ChildDetail面板上，明细表输入，显示的面板
    createChildDetailForm: function(){
    	var me = this;
    	this.childdetailform = Ext.create('Ext.form.Panel',{
			xtype:'form',
			region: 'east',
			width:450,
			frame:true,
			border: false,
			headerPosition: 'bottom',
	        bodyPadding: 1,
	        defaults: {
	        	xtype: 'fieldcontainer',
                hideLabel: true,
	            anchor: '100%',
	            labelWidth: 100
	        },
	        items: [
                {
                   xtype: 'fieldcontainer',
                   layout: 'hbox',
                   defaults: {
                       labelWidth: 80,
                       margin: '5 0 0 5',
                       xtype: 'textfield',
                       labelAlign: 'top',
                       flex: 1
                   },
                   items: [
                        {
                            fieldLabel: '部件商品 ',
                            name: 'componentSku',
                            allowBlank: false
                        },
                        {
                            fieldLabel: '次序',
                            xtype: 'numberfield',
                            minValue:0,
                            name: 'sequence'
                        },
                        {
                            fieldLabel: '数量',
//                            xtype: 'numberfield',
//                            minValue:0,
                            name: 'qty'
                        }
                   ]
                },
                {
                   xtype: 'fieldcontainer',
                   layout: 'hbox',
                   defaults: {
                       labelWidth: 80,
                       margin: '5 0 0 5',
                       xtype: 'textfield',
                       labelAlign: 'top',
                       flex: 1
                   },
                   items: [
                        {fieldLabel: '只作部件 ',xtype: 'codecombo',codeType: 'YESNO',name: 'isComponent'},
                        {fieldLabel: '名称',name: 'name'},
                        {fieldLabel: '描述',name: 'descr'},
                        {fieldLabel: 'id',name: 'id',hidden: true}
                   ]
                }
            ]
	    
    	});
    	return this.childdetailform;
    },
    
    //第二个tab页面的上部ChildDetail面板上，明细表grid
    createChildDetailGrid: function(){
    	var me = this;
    	this.childdetailgrid = Ext.create('widget.bomdetailgrid',{
    		region: 'center',
    		listeners: {
    			itemclick: function(grid,record){
    				me.childdetailform.getForm().loadRecord(record);
    			}
    		}
    	});
        
    	this.childdetailgrid.getStore().on('beforeload',function(){
    		var params = this.childdetailgrid.getStore().getProxy().extraParams;
    		var record = me.childtopform.getForm().getValues();
    		
    		var storerKey = record.storerKey;
    		var sku = record.sku;
    		var name = record.name;
    		var descr = record.descr;
    		var status = record.status;
            
			delete params.storerKey;
			delete params.sku;
			delete params.name;
			delete params.descr;
			delete params.status;
            
			if(storerKey) params.storerKey = storerKey;
			if(sku) params.sku = sku;
			if(name) params.name = name;
			if(descr) params.descr = descr;
			if(status) params.status = status;
    	},this);
    	return this.childdetailgrid;
    },
    
/*   	createContextMenu:function(e){
    	if(!this.formContextMenu){
			this.formContextMenu = Ext.create('Ext.menu.Menu', {
				items: [
					this.createAction,
					this.deleteAction,
					this.saveAction
				]
			});
    	}
		e.preventDefault();
		this.formContextMenu.showAt(e.getXY());
    },

    createContextChildMenu:function(e){
    	if(!this.formContextChildMenu){
			this.formContextChildMenu = Ext.create('Ext.menu.Menu', {
				items: [
					this.addAction,
					this.deleteDetailAction,
					this.saveAction
				]
			});
    	}
		e.preventDefault();
		this.formContextChildMenu.showAt(e.getXY());
    },*/
    
        
    
        
    //第二个tab页面额创建按钮，清空主表记录输入form，和明细表记录输入form
    onCreate: function(){
    	this.childtop.getForm().reset();
        this.childdetailform.getForm().reset();
    },

    //第二个tab页面的删除按钮，删除输入面板上对应的主表记录和相关明细表记录
    onDelete: function(){
    	var me = this;
    	var codeForm = this.childtop.getForm();
    	var code = codeForm.getValues();
    	if(!code) return;
    	if((code.codeType)=="") return;
    	Ext.MessageBox.confirm('询问提示', '确定要删除所选信息吗？', 
			function(btn){
				if(btn == 'yes'){
					Ext.Ajax.request({
					    url: basePath + '/support/doDeleteBom.action',
					    params: {
					    	storerKey: code.storerKey,
					    	sku: code.sku
					    },
					    success: function(response){
					        var text = Ext.decode(response.responseText);
					        var success = text.success;
					        MessageBox.show(success, text.json.msg);
					        me.bomgrid.getStore().load();
					        me.childdetailgrid.getStore().load();
					        me.childtop.getForm().reset();
					        me.childdetailform.getForm().reset();
					    }
					});
				}
			}
    	);  
    },
    
    onAddDetail: function(){
    	this.childdetailform.getForm().reset();
    },
    
    onDeleteDetail: function(){
    	var me = this;
    	var records = me.childdetailgrid.getSelectionModel().getSelection(); 
    	if(records == ""){
    		MessageBox.error('错误提示','请选择删除的数据！');
    		return;
    	}else{
    		Ext.MessageBox.confirm('询问提示', '确定要删除所选信息吗？', 
				function(btn){
					var codeDetail = records[0].getData();
		        	Ext.Ajax.request({
					    url: basePath + '/support/doDeleteBomDetail.action',
					    params: {
					    	id: codeDetail.id
					    },
					    success: function(response){
					        var text = Ext.decode(response.responseText);
					        var success = text.success;
					        MessageBox.show(success, text.json.msg);
					        me.childdetailgrid.getStore().load();
					    }
					});
				}
	    	);  
    	}
    },
    

    
    



    
    saveBomAndDetail: function(){
    	var me = this;
    	var form = this.childtop.getForm();
    	var dform = this.childdetailform.getForm();
    	
    	var values = form.getValues();
    	var dvaues = dform.getValues();
    	if(!(form.isValid())||!(dform.isValid())) return;
    	Ext.Ajax.request({
		    url: basePath + '/support/doSaveBom.action',
		    params: {
		    	bomId: values.id,
		    	detailId: dvaues.id,
		    	
		    	storerKey: values.storerKey,
		    	sku: values.sku,
		    	name: values.name,
		    	descr: values.descr,
		    	status: values.status,
		    	
		    	componentSku: dvaues.componentSku,
		    	sequence: dvaues.sequence,
		    	qty: dvaues.qty,
		    	isComponent: dvaues.isComponent,
		    	names: dvaues.name,
		    	descrs: dvaues.descr
		    	
		    	
		    },
		    success: function(response){
		        var text = Ext.decode(response.responseText);
		        var success = text.success;
		        MessageBox.show(success, text.json.msg);
                me.bomgrid.getStore().load();
		        me.childdetailgrid.getStore().load();
		        dform.reset();
		    }
		});
    }
});


Ext.onReady(function(){
	Ext.create('Ext.container.Viewport', {
	    layout: 'border',
	    items: [{
	    	xtype:'bommanager',
	    	region:'center'
	    }]
	});
});

