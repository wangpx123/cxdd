/********************************
参数设置 ParaSetting.js


**********************************/


Ext.define('ParaSetting', {
    extend: 'Ext.data.Model',
    fields: [
		{name:'id'},
		{name:'paraKey'},            
		{name:'content'},     
		{name:'addDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'}, 
		{name:'addWho'},
		{name:'editDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},     
		{name:'editWho'}          
	],
    idProperty: 'id'
});

//GRID面板
Ext.define('Redm.support.ParaSettingGrid', {
    extend: 'Redm.BaseGrid',
    alias : 'widget.parasettinggrid',
    loadMask: true,
    forceLayout:true,
    dockedItems: [],
    buildColumns: function(){
        this.columns = [
		    { header: "参数类型", dataIndex: 'paraKey', width: 200, sortable: true},
		    { header: "内容", dataIndex: 'content', width: 200, sortable: true},
		    { header: "id",dataIndex: 'id',hidden: true},
			{ header: "创建时间", dataIndex: 'addDate', width: 140, sortable: true,renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s'),hidden:true},
			{ header: "创建者", dataIndex: 'addWho', width: 140, sortable: true,hidden:true},  
			{ header: "修改时间", dataIndex: 'editDate', width: 140, sortable: true,renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s'),hidden:true},
			{ header: "修改者", dataIndex: 'editWho', width: 140, sortable: true,hidden:true}     
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
    	this.buildStore(basePath+'/rules/doQueryParaSetting.action','ParaSetting',20);
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
Ext.define('Redm.rules.paraSetting', {
	extend: 'Ext.panel.Panel',
    alias : 'widget.ParaSetting',
    title:'参数设置',
    layout:'border',
//    tbar: {},
	initComponent: function(){
    	var me = this;
//    	this.buildContextMenu();
/*    	this.tbar = {
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
    
    
    onSelect: function(){
    	this.gridPanel.getStore().load();
    },
    
    onReset: function(){
    	this.selform.getForm().reset();
    }, 
    
  /*  onSave: function(){
    	this.selform.getForm().save();
    }, */
    //顶部面板
    createTopPanel: function(){
    	var me = this;
    	this.toppanel = Ext.create('Ext.panel.Panel',{
    		region: 'north',
    		height: 50,
    		layout: 'border',
/*    		listeners:{
	            render:function(p){
	                p.getEl().on("contextmenu",function(e){
	                	me.createContextMenu(e);
	                },me)
	            }
            },*/
    		items: [this.createSelForm()]
    	});
    	return this.toppanel;
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
                    fieldLabel: '参数类型',
                    listeners: {
                        blur:function(txt){
                          txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                        }
                    },
                    name: 'paraKey',
                    width: 200
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
                },
                  {
                    xtype: 'button',
                    handler: me.onCreate,
                    scope: this,
                    iconCls: 'icon-save',
                    text: '创建'
                },
                  {
                    xtype: 'button',
                    handler: me.onSaveParaSetting,
                    scope: this,
                    iconCls: 'icon-save',
                    text: '保存'
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
    	this.gridPanel = Ext.create('widget.parasettinggrid',{
			region: 'center',
			listeners: {
    			itemclick: function(grid,record){
    				me.form.getForm().loadRecord(record);
                    //库位段设置为只读
                   me.form.getForm().findField('paraKey').setReadOnly(true);
    			}
    		}
		});
		this.gridPanel.getStore().on('beforeload',function(){
    		var params = this.gridPanel.getStore().getProxy().extraParams;
    		var record = me.selform.getForm().getValues();
    		
    		var paraKey = record.paraKey;
    		var content = record.content;
    		
			delete params.paraKey;
			delete params.content;
    		
			if(paraKey) params.paraKey = paraKey;
         	if(content) params.content = content;
    	},this);
		return this.gridPanel;
    },
    //底部右边FORM
    createForm: function(){
    	var me = this;
		this.form = Ext.create('Ext.form.Panel',{
			region: 'east',
			frame: true,
			border: false,
			split: true,
			collapsible: true,
			width: 430,
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
                        labelWidth: 60
                    },
                    items: [
                        {
                        fieldLabel: '参数类型',
                        name: 'paraKey',
                        width: 250,
                        listeners:{
                            blur: function(txt){
                                //输入参数，鼠标离开后见检查该货主是否存在
                                paraKeyValue= Ext.util.Format.uppercase(txt.getValue());
                                txt.setValue(paraKeyValue);
                                Ext.Ajax.request({
                                    url: basePath + '/rules/doValidateParaSetting.action',
                                    params: {
                                        paraKey:paraKeyValue
                                    },
                                    success: function(response){    //failure属于连不上服务器的情况，后续补充
                                        var text = Ext.decode(response.responseText);
                                        var success = text.success;
                                        console.log(text.json.data.length);
                                        if(0 != text.json.data.length)
                                        {
                                            me.form.getForm().findField('paraKey').setValue('');
                                            Ext.Msg.alert("错误提示", '重复，请重新输入');
                                        }
                                    }
                                })
                            }                        
                        },
                        allowBlank: false
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults: {
                        xtype: 'textfield',
                        margin: '5 0 0 5',
                        labelWidth: 60
                    },
                    items: [
                        {
                            fieldLabel: '内容',
                            allowBlank: false,
                            name: 'content',
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
                            xtype:'datefield',
                            format:'Y-m-d H:i:s',
                            name: 'editDate',
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
    
 	onCreate: function(){
        this.form.getForm().reset();
        this.form.getForm().findField('paraKey').setReadOnly(false);
    },
    
	onSaveParaSetting: function(){
		var me = this;
    	var ParaSettingForm = this.form.getForm();
    	var values1 = ParaSettingForm.getValues();
    	if(!(ParaSettingForm.isValid())) return;
   		 Ext.Ajax.request({
		    url: basePath + '/rules/doSaveParaSetting.action',
		    params: {
		        id: values1.id,
		        paraKey: values1.paraKey,
		        content: values1.content,
		        addDate: values1.addDate,
		        addWho: values1.addWho,
		        editDate: values1.editWho,
		        editWho: values1.editWho
		    },
		    success: function(response){
		        var text = Ext.decode(response.responseText);
		        var success = text.success;
		        MessageBox.show(success, text.json.msg);
		        me.gridPanel.getStore().load();
		        ParaSettingForm.reset();
		    }
		});
	}
	
});

	

Ext.onReady(function(){
	Ext.create('Ext.container.Viewport', {
	    layout: 'border',
	    items: [{
	    	xtype:'ParaSetting',
	    	region:'center'
	    }]
	});
});