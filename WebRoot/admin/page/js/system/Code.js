/***********************************************************
  code.js 数据字典的web界面文件
  
1、数据字典取消删除功能，所有按钮和方法注释掉  


***********************************************************/




Ext.define('SystemCode', {
    extend: 'Ext.data.Model',
    fields: [
		{name:'id'},
		{name:'codeType'},            
		{name:'descrip'},     
		{name:'mark'},
        {name:'addDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
        {name:'addWho'}        
	],
    idProperty: 'id'
});


Ext.define('CodeDetail', {
    extend: 'Ext.data.Model',
    fields: [
		{name:'id'},
		{name:'codeType'},            
		{name:'codeValue'},     
		{name:'description'},
		{name:'sort'},
		{name:'codedef1'},
		{name:'codedef2'},
		{name:'codedef3'},
		{name:'notes'},
        {name:'addDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
        {name:'addWho'}        
	],
    idProperty: 'id' 
});



//主面板GRID
Ext.define('Redm.system.CodeGrid', {
    extend: 'Redm.BaseGrid',
    alias : 'widget.codegrid',
    loadMask: true,
    forceLayout:true,
    buildColumns: function(){
        this.columns = [
		    { header: "代码类型", dataIndex: 'codeType', width: 120, sortable: true },
		    { header: "描述", dataIndex: 'descrip', width: 200, sortable: true },
		    { header: "备注", dataIndex: 'mark', width: 200, sortable: true},
		    { header: "id", dataIndex: 'id', width: 250, sortable: true,hidden: true},
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
    initComponent: function(p){
    	var me = this;
    	this.buildStore(basePath + '/system/doQuerySystemCode.action','SystemCode',20);

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
                    }
                 ] 
            }).showAt(e.getXY());//让右键菜单跟随鼠标位置 
        },this);*/

/*        //屏蔽浏览器右键事件
        this.on('render',function(p){
        	 p.getEl().on("contextmenu",function(e){
            	e.preventDefault();
            },this)
        },this);*/
        this.callParent(arguments);
    },


/*   //数据字典取消删除功能，注释掉
    onDelete: function(){
    	var me = this;
    	var records = this.getSelectionModel().getSelection();
    	if(records == ""){
    		MessageBox.error('错误提示','请选择要删除的信息！');
    		return;
    	}
    	var code = records[0].getData();

		Ext.MessageBox.confirm('询问提示', '确定要删除所选信息吗？', 
			function(btn){
				if(btn == 'yes'){	
					Ext.Ajax.request({
					    url: basePath + '/system/deleteCodeAndDetail.action',
					    params: {
					    	id: code.id,
					        codeType: code.codeType
					    },
					    success: function(response){
					        var text = Ext.decode(response.responseText);
					        var success = text.success;
					        MessageBox.show(success, text.json.msg);
					        var fatherPanel = me.ownerCt.ownerCt;
			                fatherPanel.childtop.getForm().reset();
			                fatherPanel.childdetailform.getForm().reset();
			                fatherPanel.childdetailgrid.getStore().load();
					        me.getStore().load();
					        fatherPanel.childtop.getForm().findField('codeType').setReadOnly(false);
			            	fatherPanel.childdetailform.getForm().findField('codeValue').setReadOnly(false);
					    }
					});
				}
			}
		); 
    },   */
    
    
    onCreate: function(){
    	var fatherPanel = this.ownerCt.ownerCt;
    	fatherPanel.childtop.getForm().reset();
    	fatherPanel.childdetailform.getForm().reset();
    	fatherPanel.childdetailgrid.getStore().removeAll();
    	fatherPanel.setActiveTab(1);
    }
});



//detail GRID面板相关定义
Ext.define('Redm.system.DetailGrid',{
	extend: 'Redm.BaseGrid',
    alias : 'widget.detailgrid',
    autoLoad: false,

    initComponent: function(){
    	var me= this;
    	this.buildStore(basePath + '/system/queryCodeDetail.action','CodeDetail',20);

/* 暂时屏蔽右键菜单
    	//屏蔽浏览器右键事件
        this.on('render',function(p){
        	 p.getEl().on("contextmenu",function(e){
            	e.preventDefault();
            },this)
        },this);
        this.on('itemcontextmenu',function(view,record,item,index,e,eOpts){ 
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
                    } 
                 ] 
            }).showAt(e.getXY());//让右键菜单跟随鼠标位置 
        },this);  */
    	this.callParent(arguments);
    },
    buildColumns: function(){
    	this.columns = [
		    { header: "代码类型", dataIndex: 'codeType', width: 120, sortable: true },
		    { header: "代码", dataIndex: 'codeValue', width: 120, sortable: true},
		    { header: "描述", dataIndex: 'description', width: 120, sortable: true},
		    { header: "顺序", dataIndex: 'sort', width: 50, sortable: true},
		    { header: "自定义1", dataIndex: 'codedef1', width: 100, sortable: true},
		    { header: "自定义2", dataIndex: 'codedef2', width:100, sortable: true},
		    { header: "自定义3", dataIndex: 'codedef3', width: 100, sortable: true},
		    { header: "备注", dataIndex: 'notes', width: 150, sortable: true},
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
    
    onAddDetail: function(){
    	var fatherPanel = this.ownerCt.ownerCt.ownerCt;
		var childdetailForm = fatherPanel.childdetailform.getForm();
		childdetailForm.reset();
		childdetailForm.findField('codeValue').setReadOnly(false);     //增加时才取消只读限制
	},
	
	
/*	 //数据字典取消删除功能，注释掉
    onDelete: function(){
    	var me = this;
    	var fatherPanel = this.ownerCt.ownerCt.ownerCt;
    	var records = me.getSelectionModel().getSelection(); 
    	if(records == ""){
    		MessageBox.error('错误提示','请选择删除的数据！');
    		return;
    	}else{
			Ext.MessageBox.confirm('询问提示', '确定要删除所选信息吗？', 
				function(btn){
					if(btn == 'yes'){var codeDetail = records[0].getData();
	                	Ext.Ajax.request({
						    url: basePath + '/system/deleteCodeDetail.action',
						    params: {
						    	id: codeDetail.id
						    },
						    success: function(response){
						        var text = Ext.decode(response.responseText);
						        var success = text.success;
						        MessageBox.show(success, text.json.msg);
						        me.getStore().load();
						        var childdetailForm = fatherPanel.childdetailform.getForm();
	                			childdetailForm.reset();
	                			childdetailForm.findField('codeValue').setReadOnly(false);
						    }
						});
					}
				}
	    	);                		
    	}
    }*/
    
});



//第1个tab页面的panel，查询页面面板
Ext.define('Redm.system.CodeSelectPanel', {	
	extend: 'Ext.panel.Panel',
    alias : 'widget.codeselectpanel',
    layout:'border',
    initComponent: function(){
    	this.buildContextMenu();
    	this.items = [this.createCodelkupGrid(),this.createTopPanel()];
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
    createContextMenu:function(e){
    	if(!this.formContextMenu){
			this.formContextMenu = Ext.create('Ext.menu.Menu', {
				items: [
					this.createAction,
					this.searchAction,
					this.resetAction
				]
			});
    	}
		e.preventDefault();
		this.formContextMenu.showAt(e.getXY());
    },
    
    
    
    //GRID面板，center位置，放置codegrid
    createCodelkupGrid:function(){
    	var me = this;
    	this.codelkupgrid = Ext.create('widget.codegrid',{
			region: 'center',
			listeners: {
				itemdblclick: function(gird,record){
					var fatherPanel = me.ownerCt;
					fatherPanel.setActiveTab(1);
					var childtopForm = fatherPanel.childtop.getForm();
					childtopForm.loadRecord(record);
					fatherPanel.childdetailgrid.getStore().load();
					childtopForm.findField('codeType').setReadOnly(true);
					
				}
			}
		});
		
	   	this.codelkupgrid.getStore().on('beforeload',function(){     //查询条件
    		var params = this.codelkupgrid.getStore().getProxy().extraParams;
    		var record = me.codelkupform.getForm().getValues();
    		
    		var codeType = record.codeType;
    		var descrip = record.descrip;
    		
			delete params.codeType;
			delete params.descrip;
    		
			if(codeType) params.codeType = codeType;
         	if(descrip) params.descrip = descrip;
    	},this);
		return this.codelkupgrid;
    },
    
    
    //第一个tab页上部的TopPanel north位置包括一个查询form 和一个按钮面板
    createTopPanel: function(){
    	var me = this;
    	this.toppanel = Ext.create('Ext.panel.Panel',{
    		region: 'north',
    		height: 80,
			listeners:{
	            render:function(p){
	                p.getEl().on("contextmenu",function(e){
	                	me.createContextMenu(e);
	                },me)
	            }
            },
    		layout: 'border',
    		border: false,
    		items:[this.createCodelkupForm(),this.createBtnPanel()]
    	});
    	return this.toppanel;
    },
        
    
    
    //第一个tab页上部TopPanel的上部的查询form north位置
    createCodelkupForm: function(){
    	var me = this;
    	this.codelkupform = Ext.create('Ext.form.Panel',{
    		region: 'north',
    		frame: true,
    		border: false,
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
    					labelWidth: 40,
    					width: 200
    				},
    				items: [
        				{
        					fieldLabel: '代码类型',
        					name: 'codeType',
        					labelWidth: 55,
        					listeners: {
                                blur:function(txt){
                                    txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
        					}
        				},
        				{
        					fieldLabel: '描述',
        					name: 'descrip',
        					width: 250
        				},
        				{ 
        					xtype: 'button',
        					iconCls: 'icon-search',
        	                scope: this,
        	                text: '查询',
        	                handler: me.onSelect,
        	                width: 60
        	            },
        	            {
        	            	xtype: 'button',
        	                handler: this.doReset,
        	                scope: this,
        	                iconCls: 'icon-reset',
        	                text: '重置',
        	                handler: me.onReset,
        	                width: 60
        	        	}
    	        	]
    			}
			]
    	});
    	return this.codelkupform;
    },
    
 //第一个tab页 上部TopPanel的按钮面板
    createBtnPanel: function(){
    	var me = this;
    	this.btnpanel = Ext.create('Ext.form.Panel',{
    		region: 'center',
    		layout: 'hbox',
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
                    scope: this,
                    handler: me.onCreate
                }
/*               //数据字典取消删除功能，注释掉   
               {
                    iconCls: 'icon-delete',
                    itemId: 'delete',
                    text: '删除',
                    handler: me.deleteCode,
                    scope: this
                }*/
            ]
    	});
    	return this.btnpanel;
    },
    
/*   //数据字典取消删除功能，注释掉   
    deleteCode: function(){
    	var me = this;
    	var records = this.codelkupgrid.getSelectionModel().getSelection();
    	if(records == ""){
    		MessageBox.error('错误提示','请选择要删除的信息！');
    		return;
    	}
    	var code = records[0].getData();
		Ext.MessageBox.confirm('询问提示', '确定要删除所选信息吗？', 
			function(btn){
				if(btn == 'yes'){	
					Ext.Ajax.request({
					    url: basePath + '/system/deleteCodeAndDetail.action',
					    params: {
					    	id: code.id,
					        codeType: code.codeType
					    },
					    success: function(response){
					        var text = Ext.decode(response.responseText);
					        var success = text.success;
					        MessageBox.show(success, text.json.msg);
					        var fatherPanel = me.ownerCt;
			                fatherPanel.childtop.getForm().reset();
			                fatherPanel.childdetailform.getForm().reset();
			                fatherPanel.childdetailgrid.getStore().load();
					        me.codelkupgrid.getStore().load();
					        fatherPanel.childtop.getForm().findField('codeType').setReadOnly(false);
			            	fatherPanel.childdetailform.getForm().findField('codeValue').setReadOnly(false);
					    }
					});
				}
			}
		); 
    },*/
    
    onCreate: function(){
    	var fatherPanel = this.ownerCt;
    	fatherPanel.childtop.getForm().reset();
    	fatherPanel.childdetailform.getForm().reset();
    	fatherPanel.childdetailgrid.getStore().removeAll();
    	fatherPanel.setActiveTab(1);
    },
    
    onSelect: function(){
    	this.codelkupgrid.getStore().load();
    },
    
    onReset: function(){
    	this.codelkupform.getForm().reset();
    }
    
});

//以上第1个tab页面的panel创建完毕


//最大的容器，继承自Ext.tab.Panel，包含两个tab页

Ext.define('DictionaryManager.DictionaryApp',{
	extend: 'Ext.tab.Panel',
    alias : 'widget.codelkupmanager',
    tabPosition: 'bottom',
    layout: 'border',
    region: 'center',
    title: '数据字典',
	iconCls: 'icon-win',
    initComponent: function(){
		this.items = [this.createCodelkupList(),this.createCodelkupChildTab()];
		this.buildContextMenu();
		this.callParent(arguments);
	},
	
	//第一个tab页，panel 查询信息界面，由codeselectpanel创建
	createCodelkupList: function(){
    	var me = this;
    	this.codelkuplist = Ext.create('widget.codeselectpanel',{
    		title: '查询'
    	});
		return this.codelkuplist;
	},
	
	//右键菜单初始化方法
	buildContextMenu:function(){
		var me = this;
    	this.createAction = Ext.create('Ext.Action', {
			text : "创建" ,
			iconCls: 'icon-create',
			handler: me.onCreate,
			scope : this
		});
		this.saveAction = Ext.create('Ext.Action', {
			text : "保存",
			iconCls : "icon-save",
			handler: me.saveCode,
			scope : this
		});
		this.addAction = Ext.create('Ext.Action', {
			text : "添加",
			iconCls : "icon-create",
			handler: me.onAddDetail,
			scope : this
		});
    },
    
   	createContextMenu:function(e){
    	if(!this.formContextMenu){
			this.formContextMenu = Ext.create('Ext.menu.Menu', {
				items: [
					this.createAction,
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
					this.saveAction
				]
			});
    	}
		e.preventDefault();
		this.formContextChildMenu.showAt(e.getXY());
    },
    
    
 //第二个tab页面的创建，包含一个TopPanel 和一个ChildDetail
    
	createCodelkupChildTab: function(){
    	var me = this;
    	this.codelkupchildtab = Ext.create('Ext.panel.Panel',{
    		title: '基本',
    		layout: 'border',
			tbar: {
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
        	                        handler: me.saveCode
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
	        },
    		border: false,
    		items: [me.createTopPanel(),me.createChildDetail()]
    	});
    	return this.codelkupchildtab;
    },
    

//第二个tab页面 上部的panel，north位置，包括两个查询面板和一个查询的form

    createTopPanel: function(){
    	var me = this;
    	this.toppanel = Ext.create('Ext.panel.Panel',{
    		region: 'north',
    		layout: 'border',
    		height: 120,
    		border: false,
    		items:[me.createTopBtn(),me.createChildTop(),this.createBtnPanel()]
    	});
    	return this.toppanel;
    },


//第二个tab页，上部panel，最上边的按钮面板TopBtn

    createTopBtn: function(){
    	var me = this;
    	this.topbtn = Ext.create('Ext.panel.Panel',{
    		region: 'north',
    		border: false,
    		height: 30,
    		listeners:{
	            render:function(p){
	                p.getEl().on("contextmenu",function(e){
	                	me.createContextMenu(e);
	                },me)
	            }
            },
    		items:[
        		{
    	        	xtype: 'form',
    	        	margin: '0 0 0 0',
    	        	frame: true,
    				layout: 'hbox',
    				defaults: {
    					xtype: 'button',
    					margin: '0 0 0 5',
    					labelWidth: 60
    				},
    				items: [
        				{
        	                iconCls: 'icon-create',
        	                text: '创建',
        	                scope: this,
        	                handler: me.onCreate
        	            },
        	            {
        	                iconCls: 'icon-save',
        	                text: '保存',
        	                handler: this.saveCode,
        	                scope: this
        	            }
    	            ]
    	        	
    	        }
	        ]
    	});
    	return this.topbtn;
    },
    

//第二个tab页，上部panel，最xia边的按钮面板TopBtn，detailgrid用
    createBtnPanel: function(){
    	var me = this;
    	this.btnpanel = Ext.create('Ext.form.Panel',{
    		region: 'south',
    		frame: true,
    		defaults: {
    			xtype: 'button',
    			margin: '5 0 0 5'
    		},
    		listeners:{
	            render:function(p){
	                p.getEl().on("contextmenu",function(e){
	                	me.createContextChildMenu(e);
	                },me)
	            }
            },
    		items:[
        		{
                    iconCls: 'icon-create',
                    text: '添加',
                    scope: this,
                    handler: me.onAddDetail
                }//,
        		/*{   //禁用删除明细
                    iconCls: 'icon-delete',
                    text: '删除',
                    scope: this,
                    handler: me.onDeleteDetail
                }*/
            ]
    	});
    	return this.btnpanel;
    },
    

//第二个tab页，上部panel，中间的查询面板
    createChildTop: function(){
    	var me = this;
    	this.childtop = Ext.create('Ext.form.Panel',{
			region: 'center',
			frame:true,
			border: false,
			headerPosition: 'bottom',
	        defaults: {
	        	xtype: 'fieldcontainer',
                hideLabel: true,
	            anchor: '100%',
	            labelWidth: 100
	        },
	        listeners:{
	            render:function(p){
	                p.getEl().on("contextmenu",function(e){
	                	me.createContextMenu(e);
	                },me)
	            }
            },
	        items: [{
				layout: 'hbox',
				defaults: {
					xtype: 'textfield',
					margin: '5 0 0 5',
					labelWidth: 60
				},
				items: [
                    {
                        fieldLabel: '代码类型',
                        name: 'codeType',
                        listeners: {
                            blur:function(txt){
                                txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                            }
                        },
                        allowBlank: false,
                        width: 200
                    },{
                        fieldLabel: '描述',
                        name: 'descrip',
                        labelWidth: 40,
                        allowBlank: false,
                        width: 250
                    },{
                        fieldLabel: '备注',
                        labelWidth: 40,
                        name: 'mark',
                        width: 250
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
			}]
    	});
    	return this.childtop;
    },

//第二个tab页，下部的panel，包括一个form和一个grid，detail信息

    createChildDetail: function(){
    	var me = this;
    	this.childdetail = Ext.create('Ext.panel.Panel',{
    		region: 'center',
    		layout: 'border',
    		border: false,
    		items: [me.createChildDetailForm(),me.createChildDetailGrid()]
    	});
    	return this.childdetail;
    },

//第二个tab页，下部的panel上，右边的form，输入和修改信息用的
    createChildDetailForm: function(){
    	var me = this;
    	this.childdetailform = Ext.create('Ext.form.Panel',{
			xtype:'form',
			region: 'east',
			width:320,
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
    				layout: 'hbox',
    				defaults: {
    					xtype: 'textfield',
    					margin: '5 0 0 5',
    					labelAlign: 'top'
    				},
    				items: [
        				{
        					fieldLabel: '代码',
        					name: 'codeValue',
        					listeners: {
                                blur: function(txt){
                                    //输入参数，鼠标离开后见检查该codeValue是否存在
                                    codeValue=Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(codeValue); 
                                    codeTypeValue= me.childtop.getForm().findField('codeType').getValue('');
                                    idValue= me.childtop.getForm().findField('id').getValue('');
                                    
                                    //if(''!=idValue) return;   //只有新建时才做校验，这个方法判断有误，后续再解决
                                    
                                    if(''==codeTypeValue)   //如果货主没有输入，提示，请先输入货主，确认后清空sku
                                    {
                                         MessageBox.show(false, '请先输入代码类型');
                                         me.childdetailform.getForm().findField('codeValue').setValue('');
                                    }
                                    else  //如果输入了货主，在检测是否货主+商品唯一
                                    {
                                        Ext.Ajax.request({
                                            url: basePath + '/system/doCheckCodeTypeValue.action',
                                            params: {
                                                codeValue:codeValue,
                                                codeType:codeTypeValue
                                            },
                                            success: function(response){
                                                var text = Ext.decode(response.responseText);
                                                var status = text.success;
                                                if(false==status)    //false 表示记录重复
                                                {
                                                    MessageBox.show(status, text.json.msg);   
                                                    me.childdetailform.getForm().findField('codeValue').setValue('');
                                                }
                                            }
                                        });
                                    }
                                }                                
        					},
        					allowBlank: false,
        					width: 150
        				},
        				{
        					fieldLabel: '顺序',
        					name: 'sort',
        					xtype: 'numberfield',
        					allowBlank: false,
        					width: 130
        				}
    				]
    			},
    			{  
    				layout: 'hbox',
    				defaults: {
    					xtype: 'textfield',
    					margin: '5 0 0 5',
    					width: 285,
    					labelAlign: 'top'
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
    					width: 285,
    					labelAlign: 'top'
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
    					width: 140,
    					labelAlign: 'top'
    				},
    				items: [
        				{
        					fieldLabel: '自定义一',
        					name: 'codedef1'
        				},
        				{
        					fieldLabel: '自定义二',
        					name: 'codedef2'
        				}
    				]
    			},
    			{
    				layout: 'hbox',
    				defaults: {
    					xtype: 'textfield',
    					margin: '5 0 0 5',
    					width: 140,
    					labelAlign: 'top'
    				},
    				items: [
        				{
        					fieldLabel: '自定义三',
        					name: 'codedef3'
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
    	return this.childdetailform;
    },
    
    
    
//
    createChildDetailGrid: function(){
    	var me = this;
    	this.childdetailgrid = Ext.create('widget.detailgrid',{
    		region: 'center',
    		listeners: {
    			itemclick: function(grid,record){
    				me.childdetailform.getForm().loadRecord(record);
    				me.childdetailform.getForm().findField('codeValue').setReadOnly(true);
    			}
    		}
    	});
    	this.childdetailgrid.getStore().on('beforeload',function(){      //加载前的查询信息
    		var params = this.childdetailgrid.getStore().getProxy().extraParams;
    		var record = me.childtop.getForm().getValues();
    		
    		var codeType = record.codeType;
			delete params.codeType;
			if(codeType) params.codeType = codeType;
    	},this);
    	return this.childdetailgrid;
    },

//以上第二个tab页的界面创建结束



//以下是第二个tab页面上用到的方法


/* //数据字典取消删除功能，注释掉   
    onDelete:function(){
    	var me = this;
		var codeForm = this.childtop.getForm();
    	var code = codeForm.getValues();
    	Ext.MessageBox.confirm('询问提示', '确定要删除所选信息吗？', 
			function(btn){
				if(btn == 'yes'){
                	if((code.codeType)=="") return;
                	Ext.Ajax.request({
					    url: basePath + '/system/deleteCodeAndDetail.action',
					    params: {
					        codeType: code.codeType
					    },
					    success: function(response){
					        var text = Ext.decode(response.responseText);
					        var success = text.success;
					        var childtopForm = me.childtop.getForm();
                			var childdetailForm = me.childdetailform.getForm();
					        MessageBox.show(success, text.json.msg);
					        me.codelkuplist.codelkupgrid.getStore().load();
					        me.childdetailgrid.getStore().load();
					        childtopForm.reset();
                			childdetailForm.reset();
                			childtopForm.findField('codeType').setReadOnly(false);
                			childdetailForm.findField('codeValue').setReadOnly(false);
					    }
					});
				}
			}
    	);  
    },*/

    
/*
    onDeleteDetail: function(){
    	var me = this;
    	var records = me.childdetailgrid.getSelectionModel().getSelection(); 
    	if(records == ""){
    		MessageBox.error('错误提示','请选择删除的数据！');
    		return;
    	}else{
			Ext.MessageBox.confirm('询问提示', '确定要删除所选信息吗？', 
				function(btn){
					if(btn == 'yes'){var codeDetail = records[0].getData();
	                	Ext.Ajax.request({
						    url: basePath + '/system/deleteCodeDetail.action',
						    params: {
						    	id: codeDetail.id
						    },
						    success: function(response){
						        var text = Ext.decode(response.responseText);
						        var success = text.success;
						        MessageBox.show(success, text.json.msg);
						        me.childdetailgrid.getStore().load();
	                			me.childdetailform.getForm().reset();
	                			me.childdetailform.getForm().findField('codeValue').setReadOnly(false);
						    }
						});
					}
				}
	    	);                		
    	}
    },
    */
    
    
    onCreate: function(){
		var childtopForm = this.childtop.getForm();
		var childdetailForm = this.childdetailform.getForm();
		childtopForm.reset();
		childdetailForm.reset();
		childtopForm.findField('codeType').setReadOnly(false);
		childdetailForm.findField('codeValue').setReadOnly(false);
		this.childdetailgrid.getStore().removeAll();
	},
	onAddDetail: function(){
		var childdetailForm = this.childdetailform.getForm();
		childdetailForm.reset();
		childdetailForm.findField('codeValue').setReadOnly(false);
	},
    
    saveCode: function(){
    	var me = this;
    	var codeForm = this.childtop.getForm();
    	var codeDetailForm = this.childdetailform.getForm();
    	var code = codeForm.getValues();
    	var codeDetail = codeDetailForm.getValues();
    	if(!(codeForm.isValid())||!(codeDetailForm.isValid())) return;
    	Ext.Ajax.request({
		    url: basePath + '/system/saveCode.action',
		    params: {
		        codeId: code.id,
		        codeType: code.codeType,
		        mark: code.mark,
		        codeValue: codeDetail.codeValue,
		        sort: codeDetail.sort,
		        description: codeDetail.description,
		        descrip: code.descrip,
                addDate: code.addDate,
                addWho: code.addWho,     
                
		        notes: codeDetail.notes,
		        codedef1: codeDetail.codedef1,
		        codedef2: codeDetail.codedef2,
		        codedef3: codeDetail.codedef3,
		        codeDetailId: codeDetail.id,
                daddDate: codeDetail.addDate,
                daddWho: codeDetail.addWho
		    },
		    success: function(response){
		        var text = Ext.decode(response.responseText);
		        var success = text.success;
                if(true==success)  //存盘成功才清空两个form
                {
                    MessageBox.show(success, text.json.msg);
                    codeDetailForm.reset();
                    me.childdetailgrid.getStore().load();
                    me.codelkuplist.codelkupgrid.getStore().load();
                    codeDetailForm.findField('codeValue').setReadOnly(false);
                }
		    }
		});
    
    }
	
});


Ext.onReady(function(){
	var DictionaryApp = new DictionaryManager.DictionaryApp();
	Ext.create('Ext.container.Viewport', {
	    layout: 'border',
	    items: [DictionaryApp]
	});
});