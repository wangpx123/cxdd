
/*************************************
包装  pack.js

**************************************/


Ext.define('Pack', {
    extend: 'Ext.data.Model',
    fields: [
		{name:'id'},
		{name:'packKey'},
		{name:'descr'},
		{name:'uomQty',type:'float'},
		{name:'innerQty',type:'float'},
		{name:'caseQty',type:'float'},
		{name:'palletQty',type:'float'},
		{name:'otherQty',type:'float'},        
		{name:'uomDescr'},
		{name:'innerDescr'},
		{name:'caseDescr'},
		{name:'palletDescr'},
		{name:'otherDescr'},
		{name:'uomMaterial'},
		{name:'innerMaterial'},
		{name:'caseMaterial'},
		{name:'palletMaterial'},
		{name:'otherMaterial'},
		{name:'ti'},
		{name:'hi'},
		{name:'uomLeng',type: 'float'},
		{name:'innerLeng',type: 'float'},
		{name:'caseLeng',type: 'float'},
		{name:'pallet1Leng',type: 'float'},
		{name:'pallet2Leng',type: 'float'},
		{name:'otherLeng',type: 'float'},
		{name:'uomWidth',type: 'float'},
		{name:'innerWidth',type: 'float'},
		{name:'caseWidth',type: 'float'},
		{name:'pallet1Width',type: 'float'},
		{name:'pallet2Width',type: 'float'},
		{name:'otherWidth',type: 'float'},
		{name:'uomHeight',type: 'float'},
		{name:'innerHeigh',type: 'float'},
		{name:'caseHeight',type: 'float'},
		{name:'pallet1Height',type: 'float'},
		{name:'pallet2Height',type: 'float'},
		{name:'otherHeight',type: 'float'},
		{name:'uomCube',type: 'float'},
		{name:'innerCube',type: 'float'},
		{name:'caseCube',type: 'float'},
		{name:'pallet1Cube',type: 'float'},
		{name:'pallet2Cube',type: 'float'},
		{name:'otherCube',type: 'float'},
		{name:'uomWeight',type: 'float'},
		{name:'innerWeight',type: 'float'},
		{name:'caseWeight',type: 'float'},
		{name:'pallet1Weight',type: 'float'},
		{name:'pallet2Weight',type: 'float'},
		{name:'otherWeight',type: 'float'},
		{name: 'innerHeight',type: 'float'},
		{name:'userudf1'},
		{name:'userudf2'},
		{name:'userudf3'},
		{name:'addDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},     
		{name:'addWho'}           
	],
    idProperty: 'id'
});

Ext.define('Redm.support.PackGrid', {
    extend: 'Redm.BaseGrid',
    alias : 'widget.packgrid',
    loadMask: true,
    forceLayout:true,
    buildColumns: function(){
        this.columns = [
		     { header: "包装", dataIndex: 'packKey', sortable: true, width: 100},
		     { header: "描述", dataIndex: 'descr', sortable: true, width: 120},
	         { header: "主单位数量", dataIndex: 'uomQty', sortable: true, width: 80,renderer:Ext.util.Format.numberRenderer('0.000')},
		     { header: "内包装数量", dataIndex: 'innerQty', sortable: true, width: 80,renderer:Ext.util.Format.numberRenderer('0.000')},
			 { header: "箱数量", dataIndex: 'caseQty', sortable: true, width: 80,renderer:Ext.util.Format.numberRenderer('0.000')},
		     { header: "托盘数量", dataIndex: 'palletQty', sortable: true, width: 80,renderer:Ext.util.Format.numberRenderer('0.000')},
		     { header: "其他数量", dataIndex: 'otherQty', sortable: true, width: 100,renderer:Ext.util.Format.numberRenderer('0.000')},
		     { header: "主单位描述", dataIndex: 'uomDescr', sortable: true, width: 100},
		     { header: "内包装描述", dataIndex: 'innerDescr', sortable: true, width: 100},
		     { header: "箱描述", dataIndex: 'caseDescr', sortable: true, width: 100},
		     { header: "托盘描述", dataIndex: 'palletDescr', sortable: true, width: 100},
		     { header: "其他描述", dataIndex: 'otherDescr', sortable: true, width: 100},
		     { header: "主单位材料", dataIndex: 'uomMaterial', sortable: true, width: 100},
		     { header: "内包装材料", dataIndex: 'innerMaterial', sortable: true, width: 100},
		     { header: "箱材料", dataIndex: 'caseMaterial', sortable: true, width: 100},
		     { header: "托盘材料", dataIndex: 'palletMaterial', sortable: true, width: 100},
		     { header: "其他材料", dataIndex: 'otherMaterial', sortable: true, width: 100},
		     { header: "ti", dataIndex: 'ti', sortable: true, width: 100},
		     { header: "hi", dataIndex: 'hi', sortable: true, width: 100},
		     { header: "主单位长", dataIndex: 'uomLeng', sortable: true, width: 100},
		     { header: "内包装长", dataIndex: 'innerLeng', sortable: true, width: 100},
		     { header: "箱长", dataIndex: 'caseLeng', sortable: true, width: 100},
		     { header: "托盘长", dataIndex: 'pallet1Leng', sortable: true, width: 100},
		     { header: "托盘2长", dataIndex: 'pallet2Leng', sortable: true, width: 100},
		     { header: "其他长", dataIndex: 'otherLeng', sortable: true, width: 100},
		     { header: "主单位宽", dataIndex: 'uomWidth', sortable: true, width: 100},
		     { header: "内包装宽", dataIndex: 'innerWidth', sortable: true, width: 100},
		     { header: "箱宽", dataIndex: 'caseWidth', sortable: true, width: 100},
		     { header: "托盘1宽", dataIndex: 'pallet1Width', sortable: true, width: 100},
		     { header: "托盘2宽", dataIndex: 'pallet2Width', sortable: true, width: 100},
		     { header: "其他宽", dataIndex: 'otherWidth', sortable: true, width: 100},
		     { header: "主单位高", dataIndex: 'uomHeight', sortable: true, width: 100},
		     { header: "内包装高", dataIndex: 'innerHeight', sortable: true, width: 100},
		     { header: "箱高", dataIndex: 'caseHeight', sortable: true, width: 100},
		     { header: "托盘1高", dataIndex: 'pallet1Height', sortable: true, width: 100},
		     { header: "托盘2高", dataIndex: 'pallet2Height', sortable: true, width: 100},
		     { header: "其他高", dataIndex: 'otherHeight', sortable: true, width: 100},
		     { header: "主单位体积", dataIndex: 'uomCube', sortable: true, width: 100},
		     { header: "内包装体积", dataIndex: 'innerCube', sortable: true, width: 100},
		     { header: "箱体积", dataIndex: 'caseCube', sortable: true, width: 100},
		     { header: "托盘1体积", dataIndex: 'pallet1Cube', sortable: true, width: 100},
		     { header: "托盘2体积", dataIndex: 'pallet2Cube', sortable: true, width: 100},
		     { header: "其他体积", dataIndex: 'otherCube', sortable: true, width: 100},
		     { header: "主单位重量", dataIndex: 'uomWeight', sortable: true, width: 100},
		     { header: "内包装重量", dataIndex: 'innerWeight', sortable: true, width: 100},
		     { header: "箱重量", dataIndex: 'caseWeight', sortable: true, width: 100},
		     { header: "托盘1重量", dataIndex: 'pallet1Weight', sortable: true, width: 100},
		     { header: "托盘2重量", dataIndex: 'pallet2Weight', sortable: true, width: 100},
		     { header: "其他重量", dataIndex: 'otherWeight', sortable: true, width: 100},
		     { header: "自定义一", dataIndex: 'userudf1', sortable: true, width: 100},
		     { header: "自定义二", dataIndex: 'userudf2', sortable: true, width: 100},
		     { header: "自定义三", dataIndex: 'userudf3', sortable: true, width: 100},
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
    	this.buildStore(basePath + '/support/doQueryPacks.action','Pack',20);
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
Ext.define('Redm.support.Pack', {	
	extend: 'Ext.panel.Panel',
    alias : 'widget.Pack',
    title:'包装',
    layout:'border',
    initComponent: function(){
    	var me = this;
    	this.items = [this.createTopPanel(),this.createBtmPanel()];
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
	                    handler: this.savePack
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
//	    this.buildContextMenu();
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
			handler: me.savePack,
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
    	this.basicForm.getForm().reset();
		this.customerForm.getForm().reset();
        this.basicForm.getForm().findField('packKey').setReadOnly(false);  
    },
    
    onSelect: function(){
    	this.gridPanel.getStore().load()
    },
    
    onReset: function(){
    	this.selform.getForm().reset();
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
						var areaRecord = records[0].getData();
			        	Ext.Ajax.request({
						    url: basePath + '/support/doDeletePack.action',
						    params: {
						    	id: areaRecord.id
						    },
						    success: function(response){
						        var text = Ext.decode(response.responseText);
						        var success = text.success;
						        MessageBox.show(success, text.json.msg);
						        me.gridPanel.getStore().load();
			        			me.basicForm.getForm().reset();
			        			me.customerForm.getForm().reset();
						    }
						});
					}
				}
	    	);  
    	}
    },
    
    //顶部面板
    createTopPanel: function(){
    	var me = this;
    	this.toppanel = Ext.create('Ext.panel.Panel',{
    		region: 'north',
    		height: 100,
    		layout: 'border',
    		border: false,
/*    		listeners:{
	            render:function(p){
	                p.getEl().on("contextmenu",function(e){
	                	me.createContextMenu(e);
	                },me)
	            }
            },*/
    		items: [this.createBtnForm(),this.createSelForm()]
    	});
    	return this.toppanel;
    },
    
    //顶部按钮面板
    createBtnForm: function(){
    	var me = this;
    	this.btnform = Ext.create('Ext.form.Panel',{
    		region: 'center',
    		frame: true,
    		border: false,
    		defaults: {
    			xtype: 'button',
    			margin: '5 0 0 5'
    		},
    		items: [
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
                    //disabled:true,
                    handler: me.onDelete,
                    scope: this
                },
                {
                    iconCls: 'icon-save',
                    text: '保存',
                    handler: me.savePack,
                    scope: this
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
    		layout: 'hbox',
    		frame: true,
    		border: false,
    		height: 50,
    		defaults: {
    			xtype: 'textfield',
    			margin: '5 0 0 5',
    			labelWidth: 60
    		},
    		items:[
                {
                    xtype: 'textfield',
                    width: 200,
                    labelWidth: 35,
                    name: 'packKey',
                    listeners: {
                        blur:function(txt){
                          txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                        }
                    },
                    fieldLabel: '包装'
                },
                {
                    width: 200,
                    labelWidth: 35,
                    name: 'descr',
                    fieldLabel: '描述'
                },
                {
                    xtype: 'button',
                    iconCls: 'icon-search',
                    handler: me.onSelect,
                    scope: this,
                    text: '查询'
                },
                {
                    xtype: 'button',
                    iconCls: 'icon-reset',
                    handler: me.onReset,
                    scope: this,
                    text: '重置'
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
    		items:[this.createGridPanel(),this.createTabPanel()]
    	});
    	return this.btmpanel;
    },
    
    //底部GRID明白
    createGridPanel:function(){
    	var me = this;
    	this.gridPanel = Ext.create('widget.packgrid',{
			region: 'center',
			listeners: {
				itemclick: function(grid,record){
					me.basicForm.getForm().loadRecord(record);
    				me.customerForm.getForm().loadRecord(record);
                    me.basicForm.getForm().findField('packKey').setReadOnly(true);  
				}
			}
		});
		this.gridPanel.getStore().on('beforeload',function(){
    		var params = this.gridPanel.getStore().getProxy().extraParams;
    		var record = me.selform.getForm().getValues();
    		
    		var packKey = record.packKey;
    		var descr = record.descr;
    		
			delete params.packKey;
			delete params.descr;
    		
			if(packKey) params.packKey = packKey;
         	if(descr) params.descr = descr;
    	},this);
		return this.gridPanel;
    },
    
    //底部右边TAP面板
    createTabPanel:function(){
    	var me = this;
    	this.tabPanel = Ext.create('widget.tabpanel',{
    		border: false,
    		region:'east',
    		width: 450,
    		split: true,
			collapsible: true,
			xtype:'tabpanel',
			tabPosition: 'bottom',
			items:[this.createBasicForm(),this.createCustomerForm()]
    	});
    	return this.tabPanel;
    },
    
    //TAB主信息
    createBasicForm: function(){
    	var me = this;
    	this.basicForm = Ext.create('Ext.form.Panel',{
			xtype:'form',
			title: '主信息',
	        bodyPadding: 1,
	        frame: true,
	        defaults: {
	        	xtype: 'fieldcontainer',
                hideLabel: true,
	            anchor: '100%',
	            labelWidth: 100
	        },
	        items: [
                {
                    defaults: {
                        margin: '5 5 5 5',
                        xtype: 'container'
                    },
                    items:[
                        {
                            layout: 'hbox',
                            defaults:{
                                labelWidth: 40,
                                margin: '5 0 0 10',
                                flex: 1,
                                xtype: 'textfield'
                            },
                            items: [
                                {
                                    fieldLabel: '包装',
                                    listeners: {
                                        blur: function(txt){
                                            //输入参数，鼠标离开后见检查该商品是否存在
                                            packKeyValue=Ext.util.Format.uppercase(txt.getValue());
                                            txt.setValue(packKeyValue); 
                                            if(''!=packKeyValue) 
                                            {
                                                Ext.Ajax.request({
                                                    url: basePath + '/support/doCheckPack.action',   //用true or false判断有误，后续再查，改用长度判断
                                                    params: {
                                                        packKey:packKeyValue
                                                    },
                                                    success: function(response){
                                                        var text = Ext.decode(response.responseText);
                                                        var status = text.success;
                                                        
                                                        if(0!=text.json.data.length)
                                                        {
                                                            MessageBox.show(false, '记录重复，请重新输入');   
                                                            me.basicForm.getForm().findField('packKey').setValue('');
                                                        }
                                                    }
                                              
                                                });
                                            }
                                            
                                        }                                         
                                    },
                                    name: 'packKey',
                                    allowBlank: false
                                },
                                {
                                    fieldLabel: '描述',
                                    name: 'descr'
                                },
                                {
                                    fieldLabel: 'id',
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
                        },
                        {
                            layout: 'hbox',
                            defaults:{
                                margin: '0 0 0 10',
                                xtype: 'label',
                                width: 125
                            },
                            items: [
                                {
                                    text: '数量',
                                    margin: '0 0 0 80'
                                },
                                {
                                    text: '描述'
                                },
                                {
                                    text: '材料'
                                }
                            ]
                        },
                        {
                            layout: 'hbox',
                            defaults:{
                                labelWidth: 40,
                                margin: '0 0 0 10',
                                flex: 1,
                                xtype: 'textfield'
                            },
                            items: [
                                {
                                    fieldLabel: '主单位',
                                    xtype: 'numberfield',
                                    value:1,
                                    decimalPrecision:3,
                                    name: 'uomQty',
                                    readOnly:true
                                },
                                {
                                    fieldLabel: '',
                                    codeType: 'PACKUOM',
                                    xtype: 'codecombo',
                                    name: 'uomDescr'
                                },
                                {
                                    codeType: 'PACKMAT',
                                    xtype: 'codecombo',
                                    name: 'uomMaterial'
                                }
                            ]
                        },
                        {
                            layout: 'hbox',
                            defaults:{
                                labelWidth: 60,
                                margin: '0 0 0 10',
                                flex: 1,
                                xtype: 'textfield'
                            },
                            items: [
                                {
                                    labelWidth: 40,
                                    fieldLabel: '内包装',
                                    xtype: 'numberfield',
                                    minValue:0,
                                    decimalPrecision:3,
                                    name: 'innerQty'
                                },
                                {
                                    fieldLabel: '',
                                    codeType: 'PACKUOM',
                                    xtype: 'codecombo',
                                    name: 'innerDescr'
                                },
                                {
                                    codeType: 'PACKMAT',
                                    xtype: 'codecombo',
                                    name: 'innerMaterial'
                                }
                            ]
                        },
                        {
                            layout: 'hbox',
                            defaults:{
                                labelWidth: 40,
                                margin: '0 0 0 10',
                                flex: 1,
                                xtype: 'textfield'
                            },
                            items: [
                                {
                                    fieldLabel: '箱',
                                    xtype: 'numberfield',
                                    minValue:0,
                                    decimalPrecision:3,
                                    name: 'caseQty'
                                },
                                {
                                    fieldLabel: '',
                                    codeType: 'PACKUOM',
                                    xtype: 'codecombo',
                                    name: 'caseDescr'
                                },
                                {
                                    codeType: 'PACKMAT',
                                    xtype: 'codecombo',
                                    name: 'caseMaterial'
                                }
                            ]
                        },
                        {
                            layout: 'hbox',
                            defaults:{
                                labelWidth: 40,
                                margin: '0 0 0 10',
                                flex: 1,
                                xtype: 'textfield'
                            },
                            items: [
                                {
                                    fieldLabel: '托盘',
                                    xtype: 'numberfield',
                                    minValue:0,
                                    decimalPrecision:3,
                                    name: 'palletQty'
                                },
                                {
                                    fieldLabel: '',
                                    codeType: 'PACKUOM',
                                    xtype: 'codecombo',
                                    name: 'palletDescr'
                                },
                                {
                                    codeType: 'PACKMAT',
                                    xtype: 'codecombo',
                                    name: 'palletMaterial'
                                }
                            ]
                        },
                        {
                            layout: 'hbox',
                            defaults:{
                                labelWidth: 40,
                                margin: '0 0 0 10',
                                flex: 1,
                                xtype: 'textfield'
                            },
                            items: [
                                {
                                    fieldLabel: '其他',
                                    xtype: 'numberfield',
                                    minValue:0,
                                    decimalPrecision:3,
                                    name: 'otherQty'
                                },
                                {
                                    fieldLabel: '',
                                    codeType: 'PACKUOM',
                                    xtype: 'codecombo',
                                    name: 'otherDescr'
                                },
                                {
                                    codeType: 'PACKMAT',
                                    xtype: 'codecombo',
                                    name: 'otherMaterial'
                                }
                            ]
                        }
                    ]
                }
            ]
    	});
    	return this.basicForm;
    },
    
    //TAB附属信息
    createCustomerForm: function(){
    	this.customerForm = Ext.create('Ext.form.Panel',{
			xtype:'form',
			frame:false,
			headerPosition: 'bottom',
			title:'附属信息',
			frame: true,
	        autoHeight: true,
	        bodyPadding: 1,
	        defaults: {
	        	xtype: 'fieldcontainer',
                hideLabel: true,
	            anchor: '100%',
	            margin: '5 5 5 5',
	            labelWidth: 40
	        },
	        items: [{
                layout: 'hbox',
                defaults:{
	                xtype: 'label',
	                margin: '0 0 0 10',
	                flex: 1
                },
                items: [
                    {text: '长',margin: '0 0 0 100'},
                	{text: '宽'},
                	{text: '高'},
                	{text: '体积'},
                	{text: '重量'}
                ]
            },{
                layout: 'hbox',
                defaults:{
	                labelWidth: 40,
	                margin: '2 0 0 10',
	                flex: 1,
	                xtype: 'textfield'
                },
                items: [
                    {text: '主单位:',xtype: 'label'},
                    {fieldLabel: '',name: 'uomLeng'},
                	{fieldLabel: '',name: 'uomWidth'},
                	{fieldLabel: '',name: 'uomHeight'},
                	{fieldLabel: '',name: 'uomCube'},
                	{fieldLabel: '',name: 'uomWeight'}
                ]
            },{
                layout: 'hbox',
                defaults:{
                	labelWidth: 60,
                	margin: '2 0 0 10',
                	flex: 1,
                	xtype: 'textfield'
                },
                items: [
                	{text: '内包装:',xtype: 'label'},
                	{fieldLabel: '',name: 'innerLeng'},
                	{fieldLabel: '',name: 'innerWidth'},
                	{fieldLabel: '',name: 'innerHeight'},
                	{fieldLabel: '',name: 'innerCube'},
                	{fieldLabel: '',name: 'innerWeight'}
                ]
            },{
                layout: 'hbox',
                defaults:{
	                labelWidth: 60,
	                margin: '2 0 0 10',
	                flex: 1,
	                xtype: 'textfield'
                },
                items: [
                	{text: '箱:',xtype: 'label'},
                	{fieldLabel: '',name: 'caseLeng'},
                	{fieldLabel: '',name: 'caseWidth'},
                	{fieldLabel: '',name: 'caseHeight'},
                	{fieldLabel: '',name: 'caseCube'},
                	{fieldLabel: '',name: 'caseWeight'}
                ]
            },{
                layout: 'hbox',
                defaults:{
	                labelWidth: 60,
	                margin: '2 0 0 10',
	                flex: 1,
	                xtype: 'textfield'
                },
                items: [
                	{text: '托盘:',xtype: 'label'},
                	{fieldLabel: '',name: 'pallet1Leng'},
                	{fieldLabel: '',name: 'pallet1Width'},
                	{fieldLabel: '',name: 'pallet1Height'},
                	{fieldLabel: '',name: 'pallet1Cube'},
                	{fieldLabel: '',name: 'pallet1Weight'}
                ]
            },{
            	
                layout: 'hbox',
                defaults:{
	                labelWidth: 60,
	                margin: '2 0 0 10',
	                flex: 1,
	                xtype: 'textfield'
                },
                items: [
                	{text: '',xtype: 'label'},
                	{fieldLabel: '',name: 'pallet2Leng'},
                	{fieldLabel: '',name: 'pallet2Width'},
                	{fieldLabel: '',name: 'pallet2Height'},
                	{fieldLabel: '',name: 'pallet2Cube'},
                	{fieldLabel: '',name: 'pallet2Weight'}
                ]
            
            },{
                layout: 'hbox',
                defaults:{
	                margin: '2 0 0 10',
	                labelWidth: 60,
	                flex: 1, 
	                xtype: 'textfield'
                },
                items: [
                	{text: '其他:',xtype: 'label'},
                	{fieldLabel: '',name: 'otherLeng'},
                	{fieldLabel: '',name: 'otherWidth'},
                	{fieldLabel: '',name: 'otherHeight'},
                	{fieldLabel: '',name: 'otherCube'},
                	{fieldLabel: '',name: 'otherWeight'}
                ]
            },{
                layout: 'hbox',
                defaults:{
	                margin: '2 0 0 10',
	                labelWidth: 50,
	                width: 120,
	                xtype: 'textfield'
                },
                items: [
                	 {
                            fieldLabel: '自定义1',
                            name: 'userudf1',
                            labelWidth: 65,
                             width: 140,
							listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            } 
                      },
                      {
                            fieldLabel: '自定义2',
                            name: 'userudf2',
							listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            } 
                      },
                      {
                            fieldLabel: '自定义3',
                            name: 'userudf3',
							listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            } 
                      }
                ]
            }]
    	});
    	return this.customerForm;
    },
    
    
    savePack: function(){
    	var me = this;
    	var basicform = this.basicForm.getForm();
    	var customerform = this.customerForm.getForm();
    	if(!(basicform.isValid())||!(customerform.isValid())) return;
    	var basicValues = basicform.getValues();
    	var customerValues = customerform.getValues();
    	Ext.Ajax.request({
		    url: basePath + '/support/doSavePack.action',
		    params: {
		    	id: basicValues.id,
		        packKey: basicValues.packKey,
		        descr: basicValues.descr,
		        uomQty: basicValues.uomQty,
		        uomDescr: basicValues.uomDescr,
		        uomMaterial: basicValues.uomMaterial,
		        innerQty: basicValues.innerQty,
		        innerDescr: basicValues.innerDescr,
		        innerMaterial: basicValues.innerMaterial,
		        caseQty: basicValues.caseQty,
		        caseDescr: basicValues.caseDescr,
		        caseMaterial: basicValues.caseMaterial,
		        palletQty: basicValues.palletQty,
		        palletDescr: basicValues.palletDescr,
		        palletMaterial: basicValues.palletMaterial,
		        otherQty: basicValues.otherQty,
		        otherDescr: basicValues.otherDescr,
		        otherMaterial: basicValues.otherMaterial,
		        addDate: basicValues.addDate,
		        addWho: basicValues.addWho,                
		        
		        uomLeng: customerValues.uomLeng,
		        uomWidth: customerValues.uomWidth,
		        uomHeight: customerValues.uomHeight,
		        uomCube: customerValues.uomCube,
		        uomWeight: customerValues.uomWeight,
		        innerLeng: customerValues.innerLeng,
		        innerWidth: customerValues.innerWidth,
		        innerHeight: customerValues.innerHeight,  
		        innerCube: customerValues.innerCube,
		        innerWeight: customerValues.innerWeight,
		        caseLeng: customerValues.caseLeng,
		        caseWidth: customerValues.caseWidth,
		        caseHeight: customerValues.caseHeight,
		        caseCube: customerValues.caseCube,
		        caseWeight: customerValues.caseWeight,
		        pallet1Leng: customerValues.pallet1Leng,
		        pallet1Width: customerValues.pallet1Width,
		        pallet1Height: customerValues.pallet1Height,
		        pallet1Cube: customerValues.pallet1Cube,
		        pallet1Weight: customerValues.pallet1Weight,
		        pallet2Leng: customerValues.pallet2Leng,
		        pallet2Width: customerValues.pallet2Width,
		        pallet2Height: customerValues.pallet2Height,
		        pallet2Cube: customerValues.pallet2Cube,
		        pallet2Weight: customerValues.pallet2Weight,
		        otherLeng: customerValues.otherLeng,
		        otherWidth: customerValues.otherWidth,
		        otherHeight: customerValues.otherHeight,
		        otherCube: customerValues.otherCube,
		        otherWeight: customerValues.otherWeight,
		        
		        userudf1: customerValues.userudf1,
		        userudf2: customerValues.userudf2,
		        userudf3: customerValues.userudf3
		    },
		    success: function(response){
		        var text = Ext.decode(response.responseText);
		        var success = text.success;
		        MessageBox.show(success, text.json.msg);
                if(true==success)
                {
                    basicform.reset();
                    customerform.reset();
                    me.gridPanel.getStore().load();
                }
		    }
		});
    }
});


Ext.onReady(function(){
	Ext.create('Ext.container.Viewport', {
	    layout: 'border',
	    items: [{
	    	xtype:'Pack',
	    	region:'center'
	    }]
	});
});