/********************************
客户资源 Customer.js
**********************************/


Ext.define('Customer', {
    extend: 'Ext.data.Model',
    fields: [
		{name:'id'},
		{name:'carNo'},            
		{name:'brand'},    
		{name:'brandModel'},  
		{name:'carjiaNo'},  
		{name:'engineNo'},  
		{name:'idCard'},  
		{name:'cusName'},  
		{name:'cusAddress'},  
		{name:'cusTel1'},  
		{name:'cusTel2'},  
		{name:'firstDate',type:'date',dateFormat : 'YYYY-mm-dd HH:ii:ss'},
		{name:'userId'},  
		{name:'addDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'}, 
		{name:'addWho'},
		{name:'editDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},     
		{name:'editWho'}          
	],
    idProperty: 'id'
});

//GRID面板
Ext.define('Redm.cus.CustomerGrid', {
    extend: 'Redm.BaseGrid',
    alias : 'widget.customergrid',
    loadMask: true,
    forceLayout:true,
    selModel: Ext.create('Ext.selection.CheckboxModel'),
    dockedItems: [],
    buildColumns: function(){
        this.columns = [
		    { header: "车牌", dataIndex: 'carNo', width: 90, sortable: true},
		    { header: "品牌", dataIndex: 'brand', width: 90, sortable: true},
		    { header: "品牌型号", dataIndex: 'brandModel', width: 90, sortable: true},
		    { header: "车架号码", dataIndex: 'carjiaNo', width: 90, sortable: true},
		    { header: "发动机号码", dataIndex: 'engineNo', width: 90, sortable: true},
		    { header: "身份证号码", dataIndex: 'idCard', width: 90, sortable: true},
		    { header: "姓名", dataIndex: 'cusName', width: 90, sortable: true},
		    { header: "地址", dataIndex: 'cusAddress', width: 90, sortable: true},
		    { header: "电话1", dataIndex: 'cusTel1', width: 90, sortable: true},
		    { header: "电话2", dataIndex: 'cusTel2', width: 90, sortable: true},
		    { header: "初登日期", dataIndex: 'firstDate', width: 90, sortable: true,renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
		    { header: "用户ID", dataIndex: 'userId', width: 90, sortable: true},
		    
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
    	this.buildStore(basePath+'/cus/doQueryCustomer.action?type=nobody','Customer',20);
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
Ext.define('Redm.cus.customer', {
	extend: 'Ext.panel.Panel',
    alias : 'widget.Customer',
    title:'客户资源',
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
    			labelWidth: 40
    		},
    		items:[
                {
                    fieldLabel: '车牌',
                    listeners: {
                        blur:function(txt){
                          txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                        }
                    },
                    name: 'carNo',
                    width: 150
                },
                {
                    fieldLabel: '品牌',
                    listeners: {
                        blur:function(txt){
                          txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                        }
                    },
                    name: 'brand',
                    width: 150
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
                    handler: me.onSaveCustomer,
                    scope: this,
                    iconCls: 'icon-save',
                    text: '保存'
                },
                 {
                 	xtype: 'button',
                    iconCls: 'icon-delete',
                    text: '删除',
                    scope: this,
                    handler: me.onDelete
                },
                {
                 	xtype: 'button',
                    iconCls: 'icon-edit',
                    text: '获取',
                    scope: this,
                    handler: me.onGet
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
    	this.gridPanel = Ext.create('widget.customergrid',{
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
    		
    		var carNo = record.carNo;
    		var brand = record.brand;
    		
			delete params.carNo;
			delete params.brand;
    		
			if(carNo) params.carNo = carNo;
         	if(brand) params.brand = brand;
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
			width: 300,
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
                        fieldLabel: '车牌',
                        name: 'carNo',
                        width: 250,
                        listeners:{
                            blur: function(txt){
                                //输入参数，鼠标离开后见检查该货主是否存在
                                carNoValue= Ext.util.Format.uppercase(txt.getValue());
                                txt.setValue(carNoValue);
                                Ext.Ajax.request({
                                    url: basePath + '/cus/doValidateCustomer.action',
                                    params: {
                                        carNo:carNoValue
                                    },
                                    success: function(response){    //failure属于连不上服务器的情况，后续补充
                                        var text = Ext.decode(response.responseText);
                                        var success = text.success;
                                        console.log(text.json.data.length);
                                        if(0 != text.json.data.length)
                                        {
                                            me.form.getForm().findField('carNo').setValue('');
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
                            fieldLabel: '品牌',
                            allowBlank: false,
                            name: 'brand',
                            width: 250
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
                            fieldLabel: '品牌型号',
                            allowBlank: false,
                            name: 'brandModel',
                            width: 250
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
                            fieldLabel: '车架号',
                            name: 'carjiaNo',
                            width: 250
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
                            fieldLabel: '发动机号',
                            name: 'engineNo',
                            width: 250
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
                            fieldLabel: '身份证号',
                            name: 'idCard',
                            width: 250
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
                            fieldLabel: '姓名',
                            name: 'cusName',
                            width: 250
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
                            fieldLabel: '地址',
                            name: 'cusAddress',
                            width: 250
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
                            fieldLabel: '电话1',
                            name: 'cusTel1',
                            width: 250
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
                            fieldLabel: '电话2',
                            name: 'cusTel2',
                            width: 250
                        }            
                    ]
                },
                 {
                    layout: 'hbox',
                    defaults: {
                        margin: '5 0 0 5',
                        labelWidth: 60
                    },
                    items: [
                        {
                            fieldLabel: '初登日期',
                            name: 'firstDate',
                            xtype:'datefield',
                            format:'Y-m-d H:i:s',
                            width: 250
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
                            fieldLabel: '用户ID',
                            name: 'userId',
                            width: 250,
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
    
	onSaveCustomer: function(){
		var me = this;
    	var CustomerForm = this.form.getForm();
    	var values1 = CustomerForm.getValues();
    	if(!(CustomerForm.isValid())) return;
   		 Ext.Ajax.request({
		    url: basePath + '/cus/doSaveCustomer.action',
		    params: {
		        id: values1.id,
		        carNo: values1.carNo,
		        brand: values1.brand,
		        brandModel: values1.brandModel,
		        carjiaNo: values1.carjiaNo,
		        engineNo: values1.engineNo,
		        idCard: values1.idCard,
		        cusName: values1.cusName,
		        cusAddress: values1.cusAddress,
		        cusTel1: values1.cusTel1,
		        cusTel2: values1.cusTel2,
		        firstDate: values1.firstDate,
		        userId: values1.userId,
		        
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
		        CustomerForm.reset();
		    }
		});
	},

	//删除
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
						var datas = records[0].getData();
			        	Ext.Ajax.request({
						    url: basePath + '/cus/doDeleteCustomer.action',
						    params: {
						    	id: datas.id
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
    
    //获取
    onGet: function(){
    	var me = this;
    	var records = me.gridPanel.getSelectionModel().getSelection(); 
    	if(records == ""){
    		MessageBox.error('错误提示','请选择获取的数据！');
    		return;
    	}
        
		var ids = []; 
		Ext.Array.each(records, function(name, index, countriesItSelf) {
			ids.push(name.getData().id);
		});
    		Ext.MessageBox.confirm('询问提示', '确定要获取所选信息吗？', 
				function(btn){
					if(btn == 'yes'){
						var record = records[0].getData();
			        	Ext.Ajax.request({
						    url: basePath + '/cus/doMultiGet.action',
						    params: {
						    	ids:ids
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
	
});

	

Ext.onReady(function(){
	Ext.create('Ext.container.Viewport', {
	    layout: 'border',
	    items: [{
	    	xtype:'Customer',
	    	region:'center'
	    }]
	});
});