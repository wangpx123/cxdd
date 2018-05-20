/*************************************
商品类型  skutype.js


***************************************/

Ext.define('SkuType', {
    extend: 'Ext.data.Model',
    fields: [
    	{name:'id'},
		{name:'skuType'},
		{name:'descr'},
		{name:'parentTypeKey'},
		{name:'storerKey'},
		{name:'cartonKey'},
		{name:'packKey'},
		{name:'locGenerate'},
		{name:'lotKey'},
		{name:'putawayStrategyKey'},
		{name:'rotationStrategyKey'},
		{name:'preAllocationStrategyKey'},
		{name:'allocationStrategyKey'},
		{name:'replenishmentStrategyKey'},
		{name:'userDefine1'},
		{name:'userDefine2'},
		{name:'userDefine3'},
		{name:'userDefine4'},
		{name:'userDefine5'},
		{name:'notes'},
		{name:'addDate',type:'date',dateFormat : 'Y-m-d H:i:s'},     
		{name:'addWho'}     
    ]
});

//GRID面板
Ext.define('Redm.support.SkuTypeGrid', {
    extend: 'Redm.BaseGrid',
    alias : 'widget.skutypegrid',
    loadMask: true,
    forceLayout:true,
    buildColumns: function(){
        this.columns = [
		    { header: "货主", dataIndex: 'storerKey', width: 100, remoteSort: true},
		    { header: "商品类型", dataIndex: 'skuType', width: 100, remoteSort: true},
		    { header: "描述", dataIndex: 'descr', width: 120, remoteSort: true},
		    { header: "默认装箱组", dataIndex: 'cartonKey', width: 100, remoteSort: true},
		    { header: "默认包装", dataIndex: 'packKey', remoteSort: true, width: 100},
			{ header: "库位指定方式", dataIndex: 'locGenerate', width:100,  remoteSort: true},
		    { header: '默认批属性',dataIndex: 'lotKey',width: 100,  remoteSort: true},
			{ header: "默认上架策略", dataIndex: 'putawayStrategyKey', width: 100 , remoteSort: true},
		    { header: '默认周转策略',dataIndex: 'rotationStrategyKey',width: 100,  remoteSort: true},
		    { header: '默认预分配策略',dataIndex: 'preAllocationStrategyKey',width: 130,  remoteSort: true},
		    { header: '默认分配策略',dataIndex: 'allocationStrategyKey',width: 130,  remoteSort: true},
		    { header: '默认补货策略',dataIndex: 'replenishmentStrategyKey',width: 130,  remoteSort: true},
		    { header: "自定义1", dataIndex: 'userDefine1', remoteSort: true, width: 100},
		    { header: "自定义2", dataIndex: 'userDefine2', remoteSort: true, width: 100},
		    { header: "自定义3", dataIndex: 'userDefine3', remoteSort: true, width: 100},
		    { header: "自定义4", dataIndex: 'userDefine4', remoteSort: true, width: 100},
		    { header: "自定义5", dataIndex: 'userDefine5', remoteSort: true, width: 100},
		    { header: "备注", dataIndex: 'notes', remoteSort: true, width: 100},
		    { header: "id", dataIndex: 'id', remoteSort: true, width: 100,hidden: true},
			{ header: "创建时间", dataIndex: 'addDate', width: 140, remoteSort: true,renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s'),hidden:true},
            { header: "创建人", dataIndex: 'addWho', width: 140, remoteSort: true,hidden:true}            
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
    	this.buildStore(basePath + '/support/doQuerySkuType.action','SkuType',20);
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
    	var fatherPanel = this.ownerCt.ownerCt.ownerCt;
    	fatherPanel.onCreate();
    },
    onDelete: function(){
    	var fatherPanel = this.ownerCt.ownerCt.ownerCt;
    	fatherPanel.onDelete();
    }*/

});


//主面板
Ext.define('Redm.support.SkuType', {	
	extend: 'Ext.panel.Panel',
    alias : 'widget.skutypemanager',
    title:'商品类型',
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
                            handler: this.saveSkuType
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
	    };*/
//	    this.buildContextMenu();
    	this.items = [this.createTreePanel(),this.createRightPanel()];   //先注释掉tree，后续再支持
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
			handler: me.saveSkuType,
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
    	this.btmf1form.getForm().reset();
    },

    onReset: function(){
    	this.selform.getForm().reset();
    },
    
    onSelect: function(){
    	var me = this;
    	this.treeform.getStore().on('beforeload',function(){
	    	var params = this.treeform.getStore().getProxy().extraParams;
	    	var record = me.selform.getForm().getValues();
	    	var parentId = record.storerKey;
			delete params.parentId;
			if(parentId) params.parentId = parentId;
    	},this);

    	this.treeform.getStore().load();
    	this.gridPanel.getStore().load();

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
						    url: basePath + '/support/doDeleteSkuType.action',
						    params: {
						    	id: record.id
						    },
						    success: function(response){
						        var text = Ext.decode(response.responseText);
						        var success = text.success;
						        MessageBox.show(success, text.json.msg);
						        me.gridPanel.getStore().load();
				    			me.btmf1form.getForm().reset();
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
    
    //右边面板
    createRightPanel: function(){
    	var me = this;
    	this.rightpanel = Ext.create('Ext.panel.Panel',{
    		region: 'center',
    		layout: 'border',
    		border: false,
    		items:[this.createTopPanel(),this.createBtmPanel()]
    	});
    	return this.rightpanel;
    },
    
    //顶部面板
    createTopPanel: function(){
    	var me = this;
    	this.toppanel = Ext.create('Ext.panel.Panel',{
    		region: 'north',
    		layout: 'border',
    		border: false,
    		height: 100,
/*    		listeners:{
	            render:function(p){
	                p.getEl().on("contextmenu",function(e){
	                	me.createContextMenu(e);
	                },me)
	            }
            },*/
    		items: [me.createBtnForm(),me.createSelForm()]
    	});
    	return this.toppanel;
    },
    
    //顶部按钮面板
    createBtnForm: function(){
    	var me = this;
    	this.btnform = Ext.create('Ext.form.Panel',{
    		region: 'center',
    		frame: true,
    		defaults: {
    			xtype: 'button'
    		},
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
                    scope: this,
                    handler: me.onDelete
                },
                {
                    iconCls: 'icon-save',
                    text: '保存',
                    scope: this,
                    handler: me.saveSkuType
                }
            ]
    	});
    	return this.btnform;
    },
    
    //顶部查询面板
    createSelForm: function(){
    	var me = this;
    	this.selform = Ext.create('Ext.form.Panel',{
    		region: 'north',
    		height: 50,
    		layout: 'hbox',
    		frame: true,
    		defaults: {
    			xtype: 'textfield',
    			labelWidth: 40,
    			margin: '5 0 0 5'
    		},
    		items:[
                {
                    fieldLabel: '货主',
                    name: 'storerKey',
                    xtype: 'storercombo'
                },
                {
                    fieldLabel: '商品类型',
                    labelWidth: 60,
                    name: 'skuType'
                },
                {
                    fieldLabel: '描述',
                    name: 'descr'
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
    
    //底部面板
    createBtmPanel: function(){
    	var me = this;
    	this.btmpanel = Ext.create('Ext.panel.Panel',{
    		region: 'center',
    		layout: 'border',
    		border: false,
    		items: [me.createGridPanel(),me.createTabPanel()]
    	});
    	return this.btmpanel;
    },
    
    //底部GRID
    createGridPanel:function(){
    	var me = this;
    	this.gridPanel = Ext.create('widget.skutypegrid',{
			region: 'center',
			listeners: {
				itemclick: function(grid,record){
					me.btmf1form.getForm().loadRecord(record);
				}
			}
		});
		this.gridPanel.getStore().on('beforeload',function(){
				var params = this.gridPanel.getStore().getProxy().extraParams;
	    		var record = me.selform.getForm().getValues();
	    		
	    		var storerKey = record.storerKey;
	    		var skuType = record.skuType;
	    		var descr = record.descr;
	    		
				delete params.storerKey;
				delete params.skuType;
				delete params.descr;
				
				if(storerKey) params.storerKey = storerKey;
				if(skuType) params.skuType = skuType;
				if(descr) params.descr = descr;
		},this);
		return this.gridPanel;
    },
    
    
    //底部右边TAB，本例只有一个Form
    createTabPanel:function(){
    	var me = this;
    	this.tabPanel = Ext.create('widget.panel',{
    		region:'east',
    		width: 460,
			xtype:'tabpanel',
			split: true,
			collapsible: true,
			layout: 'fit',
			tabPosition: 'bottom',
			items:[this.createBtmF1Form()]
    	});
    	return this.tabPanel;
    },
    
    
    createBtmF1Form: function(){
    	var me = this;
    	this.btmf1form = Ext.create('Ext.form.Panel',{
			xtype:'form',
			frame:true,
			headerPosition: 'bottom',
	        autoHeight: true,
	        bodyPadding: '5 2 2 5',
	        defaults: {
	        	xtype: 'fieldcontainer',
                hideLabel: true,
	            anchor: '100%',
	            labelWidth: 100
	        },
	        items: [
                {
                    layout: 'hbox',
                    defaults:{
                        margin: '5 0 0 10',
                        xtype: 'textfield',
                        labelAlign: 'top',
                        flex: 1
                    },
                    items: [
                        {
                            fieldLabel: '货主',
                            name: 'storerKey',
                            xtype: 'storer2combo',
							listeners:{
                                select : function(txt){
                                    //输入参数，鼠标离开后见检查该商品是否存在
                                    storerKeyValue=txt.getValue();
                                    if(''!=storerKeyValue) 
                                    {
                                        Ext.Ajax.request({
                                            url: basePath + '/support/doQueryStorers.action',   //用true or false判断有误，后续再查，改用长度判断
                                            params: {
                                                storerKey:storerKeyValue
                                            },
                                            success: function(response){
                                                var text = Ext.decode(response.responseText);
                                                var status = text.success;
                                                
                                                if(0==text.json.data.length)
                                                {
                                                    MessageBox.show(false, '没有相应的记录，请重新输入！');   
                                                    me.btmf1form.getForm().findField('storerKey').setValue('');
                                                }else{
													me.btmf1form.getForm().findField('packKey').setValue(text.json.data[0].packKey);
													me.btmf1form.getForm().findField('cartonKey').setValue(text.json.data[0].cartonKey);
													me.btmf1form.getForm().findField('replenishmentStrategyKey').setValue(text.json.data[0].replenishmentStrategyKey);
													me.btmf1form.getForm().findField('putawayStrategyKey').setValue(text.json.data[0].putawayStrategyKey);
													me.btmf1form.getForm().findField('lotKey').setValue(text.json.data[0].lotKey);
													me.btmf1form.getForm().findField('rotationStrategyKey').setValue(text.json.data[0].rotationStrategyKey);
													me.btmf1form.getForm().findField('preAllocationStrategyKey').setValue(text.json.data[0].preAllocationStrategyKey);
													me.btmf1form.getForm().findField('allocationStrategyKey').setValue(text.json.data[0].allocationStrategyKey);
												}
                                            }
                                      
                                        });
                                    }
                                    
                                } 
                            }  
                        },
                        {
                            fieldLabel: '商品类型',
                            name: 'skuType',
                            listeners:{
                                blur: function(txt){
                                    skuValue= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(skuValue);
                                }
                            },                                
                            allowBlank: false
                        },
                        {
                            fieldLabel: '描述',
                            name: 'descr',
                            allowBlank: false
                        },
                        {
                            name : "id",
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
                },
                {
                    layout: 'hbox',
                    defaults:{
                        margin: '0 0 0 10',
                        xtype: 'combobox',
                        labelAlign: 'top',
                        flex: 1
                    },
                    items: [
                        {
                            //后续补充对包装的校验，必须是包装表中存在的 qxue 
                            name: 'packKey',
                            xtype: 'packcombo',
                            fieldLabel: '默认包装',
                            listeners:{
                                blur: function(txt){
                                    skuValue= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(skuValue);
                                }
                            }                                
                        },
                        {
                            //后续补充对策略的校验，必须是已有的策略 qxue 
                            name: 'replenishmentStrategyKey',
                            xtype: 'replenishmentstrategycombo',
                            fieldLabel: '默认补货策略'
                        },
                        {
                            name: 'cartonKey',
                            xtype: 'cartoncombo',
                            fieldLabel: '默认装箱组'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        margin: '0 0 0 10',
                        xtype: 'combobox',
                        labelAlign: 'top',
                        flex: 1
                    },
                    items: [
                        {name: 'putawayStrategyKey',xtype: 'putawaystrategycombo',fieldLabel: '默认上架策略'},
                        {fieldLabel: '库位指定方式',xtype: 'codecombo',codeType:'LOCGEN',name: 'locGenerate'},
                        {name: 'lotKey',xtype: 'lotvalidatecombo',fieldLabel: '默认批属性'}
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelAlign: 'top',
                        flex: 1,
                        margin: '0 0 0 10',
                        xtype: 'combobox'
                    },
                    items: [
                        {name: 'rotationStrategyKey',xtype: 'rotationstrategycombo',fieldLabel: '默认周转策略'},
                        {name: 'preAllocationStrategyKey',xtype: 'preallocatestrategycombo',fieldLabel: '默认预分配策略'},
                        {name: 'allocationStrategyKey',xtype: 'allocationstrategycombo',fieldLabel: '默认分配策略'}
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelAlign: 'top',
                        flex: 1,
                        margin: '0 0 0 10',
                        xtype: 'textfield'
                    },
                    items: [
                        {fieldLabel: '自定义1',name: 'userDefine1'},
                        {fieldLabel: '自定义2',name: 'userDefine2' },
                        {fieldLabel: '自定义3',name: 'userDefine3'}
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelAlign: 'top',
                        flex: 1,
                        margin: '0 0 0 10',
                        xtype: 'textfield'
                    },
                    items: [
                        {fieldLabel: '自定义4',name: 'userDefine4'},
                        {fieldLabel: '自定义5',name: 'userDefine5'},
                        {
                            fieldLabel: '父级类型',
                            xtype:'parrenttypecombo',
                            name: 'parentTypeKey',
                            allowBlank: false
                        }
                    ]
                }
            ]
    	});
    	return this.btmf1form;
    },
    
    
    saveSkuType: function(){
		var me = this;
    	var skuTypeForm = this.btmf1form.getForm();
    	if(!(skuTypeForm.isValid())) return;
    	skuTypeForm.submit({
		    clientValidation: true,
		    url: basePath + '/support/doSaveSkuType.action',
		    params: {},
		    success: function(form, action) {
		    	var success = action.result;
		        MessageBox.show(success.success, success.json.msg);
                if(true==success.success)
                {
                    skuTypeForm.reset();
                    me.gridPanel.getStore().load();
                }
		    },
		    failure: function(form, action) {
		    	var success = action.result;
		        MessageBox.show(success.success, success.json.msg);
		        //skuTypeForm.reset();
		        me.gridPanel.getStore().load();
		    }
		});
	},

    //商品分类树
    createTreePanel: function(){
		var me=this;
    	this.treeform = Ext.create('widget.typetree',{
    		region: 'west',
    		width: 200,
    		title: '商品分类',
			
			listeners: {
				itemclick: {
					fn: function(view, record, item, index, event) {
						//获取选中的一个节点
						var descr=record.data.text;
						//当选择"所有分类"时，则查询所有的。
						if(descr=='所有分类'){
							descr='';
						}
						//console.log(descr);
						Ext.Ajax.request({
                            url: basePath + '/support/doQuerySkuType.action',
                            params: {
                                descr:descr
                            },
                            success: function(response){
                                var text = Ext.decode(response.responseText);
                                var success = text.success;
                                if(''!= text.json.data || null != text.json.data)
                                {
									me.gridPanel.getStore().loadData(text.json.data);
                                }
                            }
                        })
					}
				}
			}
    	});
		return this.treeform;
    }
});

//商品分类面板
Ext.define('RedM.ProductType', {
	extend: 'Ext.tree.Panel',
	alias : 'widget.typetree',
    title:'商品分类',
	iconCls: 'icon-mhistory',
	width: 170,
    margin: '2 2 2 2',
	initComponent: function(){
		this.buildTreeStore();
        this.callParent(arguments);
    },
    
    buildTreeStore: function(){
    	this.store = Ext.create('Ext.data.TreeStore', { 
		    	fields: ['text','id','parentId'],
		    	root: {
		            text: '所有分类',
		            id: '0',
		            iconCls: 'task-folder',
		            expanded: true
		        },
		        proxy: { 
		            type: 'ajax', 
		            url: basePath + '/support/doQueryAllps.action'
		        },
		        folderSort: true,
		        sorters: [
                    {
                        property: 'text',
                        direction: 'ASC'
                    }
                ]
    	});
    }
});

/*
//暂时先不重写load方法，还没有看出差别来
Ext.override(Ext.data.TreeStore, {
    load : function(options) {
        options = options || {};
        options.params = options.params || {};
        var me = this, node = options.node || me.tree.getRootNode(), root;
        // If there is not a node it means the user hasnt defined a rootnode
        // yet. In this case lets just
        // create one for them.
        if (!node) {
            node = me.setRootNode( {
                expanded : true
            });
        }
        if (me.clearOnLoad) {
            node.removeAll(false);
        }
        Ext.applyIf(options, {
            node : node
        });
        options.params[me.nodeParam] = node ? node.getId() : 'root';
        if (node) {
            node.set('loading', true);
        }
        return me.callParent( [ options ]);
    }
});*/

//父级类型下拉框
Ext.define('Redm.form.ParrentTypeComboBox',{
	extend: 'Ext.form.ComboBox',
	alias: 'widget.parrenttypecombo',
	editable: false,
	store:Ext.create('Ext.data.Store', {
        autoLoad: true,
    	fields: [
			{name:'descr'},
			{name:'id'}
		],
        proxy: {
            type: 'ajax',
            url: basePath + '/support/doQuerySkuType.action?storerKey=',   //尚未解决
            reader: {type: 'json',root: 'json.data',totalProperty: 'json.totalCount'},
            actionMethods: { read: 'POST' },
            simpleSortMode: true
        },
        listeners: {
            'load':function(sto,recs){   //查询出来结果后，动态增加一条记录，根节点
                sto.insert(0,new SkuType(
                        {
                            descr: '根节点',
                            id: '0'
                        }
                    )
                )
            },scope:this
        },
        sorters:[{property :'descr',direction:'ASC'}]
    }),
    queryMode: 'local',
    displayField: 'descr',
    valueField: 'id'
});


Ext.onReady(function(){
	Ext.create('Ext.container.Viewport', {
	    layout: 'border',
	    items: [
            {
                xtype:'skutypemanager',
                region:'center'
            }
        ]
	});
});