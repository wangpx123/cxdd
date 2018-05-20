/******************************************
库位 
location.js
OnDelete：删除一条记录
OnMultiDelete：删除多条记录。现在删除按钮对应的是山粗多条记录的方法

******************************************/


Ext.define('Location', {
    extend: 'Ext.data.Model',
    fields: [
    	{name:'id'},
		{name:'loc'},
		{name:'putawaySeq'},
		{name:'picSeq'},
		{name:'locationType'},
		{name:'locationCategory'},
		{name:'locationFlag'},
		{name:'locationHandling'},
		{name:'abc'},
		{name:'putawayZone'},
		{name:'pickZone'},
		{name:'section'},
		{name:'level'},
		{name:'leng'},
		{name:'width'},
		{name:'height'},
		{name:'cube'},
		{name:'weight'},
		{name:'pcsQty'},
		{name:'caseQty'},
		{name:'palletQty'},
		{name:'commingleLot'},
		{name:'commingleSku'},
		{name:'loseId'},
		{name:'addDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},     
		{name:'addWho'},
		{name:'desccategry'},
		{name:'desctype'},
		{name:'descflag'},
		{name:'deschdling'},
		{name:'descabc'},
		{name:'xAxle'},
		{name:'yAxle'}
		
	],
    idProperty: 'id'
});

//EXTJS ajax的同步调用
function ajaxSyncCall(value, paramsStr) {   
    var obj;   
    var value;   
    if (window.ActiveXObject) {   
        obj = new ActiveXObject('Microsoft.XMLHTTP');   
    }else if (window.XMLHttpRequest) {   
        obj = new XMLHttpRequest();   
    }   
    obj.open('POST', basePath+'/system/queryCodeDetail.action', false);   
    obj.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');   
    obj.send(paramsStr);   
    var result = Ext.decode(obj.responseText);   
    
    var arr = result.json.data;  
    var desc = ''
    Ext.Array.each(arr, function(name, index, countriesItSelf) {
    	if(name.codeValue == value){
    		desc = name.description;
    	}
	});
    return  desc;
}

//GRID面板
Ext.define('Redm.support.LocationGrid', {
    extend: 'Redm.BaseGrid',
    alias : 'widget.locationgrid',
    loadMask: true,
    forceLayout:true,
    plugins: [
        Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        })
    ],
    selModel: Ext.create('Ext.selection.CheckboxModel'),
    buildColumns: function(){
        this.columns = [
		    { header: "库位", dataIndex: 'loc', width: 100, sortable: true},
		    { header: "上架顺序", dataIndex: 'putawaySeq', width: 100, sortable: true},
		    { header: "拣货顺序", dataIndex: 'picSeq', width: 100, sortable: true},
/*		    { header: "库位类型", dataIndex: 'locationType', width: 100, sortable: true,
			    renderer: function(value,metadata,record){
					return ajaxSyncCall(value,'codeType=LOCTYPE');
			    }
		    },*/
		    { header: "库位类型", dataIndex: 'desctype', width: 100, sortable: true},
/*		    { header: "库位种类", dataIndex: 'locationCategory', width: 100, sortable: true,
		    	renderer: function(value,metadata,record){
					return ajaxSyncCall(value,'codeType=LOCCATEGRY');
			    }
		    },*/
		    { header: "库位种类", dataIndex: 'desccategry', width: 100, sortable: true},
/*		    { header: "库位标识", dataIndex: 'locationFlag', width: 100, sortable: true,
		    	renderer: function(value,metadata,record){
					return ajaxSyncCall(value,'codeType=LOCFLAG');
			    }
		    }, */
		    { header: "库位标识", dataIndex: 'descflag', width: 100, sortable: true}, 
/*		    { header: "处理方式", dataIndex: 'locationHandling', width: 100, sortable: true,
				renderer: function(value,metadata,record){
					return ajaxSyncCall(value,'codeType=LOCHDLING');
			    }		    
		    },*/
		    { header: "处理方式", dataIndex: 'deschdling', width: 100, sortable: true},
/*		    { header: "周转方式", dataIndex: 'abc', width: 100, sortable: true,
		    	renderer: function(value,metadata,record){
					return ajaxSyncCall(value,'codeType=LOCABC');
			    }
		    },*/
		    { header: "周转方式", dataIndex: 'descabc', width: 100, sortable: true},
		    { header: "上架区域", dataIndex: 'putawayZone', width: 110, sortable: true},
		    { header: "拣货区域", dataIndex: 'pickZone', width: 100, sortable: true},
		    { header: "库位段", dataIndex: 'section', width: 110, sortable: true},
		   	{ header: "层", dataIndex: 'level', width: 50, sortable: true},
		   	{ header: "X轴", dataIndex: 'xAxle', width: 50, sortable: true},
		    { header: "Y轴", dataIndex: 'yAxle', width: 50, sortable: true},
		    { header: "长", dataIndex: 'leng', width: 50, sortable: true},
		    { header: "宽", dataIndex: 'width', width: 50, sortable: true},
		    { header: "高", dataIndex: 'height', width: 50, sortable: true},
		    { header: "体积", dataIndex: 'cube', width: 50, sortable: true},
		    { header: "重量", dataIndex: 'weight', width: 50, sortable: true},
		    { header: "件数", dataIndex: 'pcsQty', width: 50, sortable: true},
		    { header: "箱数", dataIndex: 'caseQty', width: 50, sortable: true},
		    { header: "托数", dataIndex: 'palletQty', width: 50, sortable: true},
		    { header: "允许混放商品", dataIndex: 'commingleSku', width: 140, sortable: true},
		    { header: "允许混放批次", dataIndex: 'commingleLot', width: 140, sortable: true},
		    { header: "忽略ID", dataIndex: 'loseId', width: 140, sortable: true},
		    { header: "id", dataIndex: 'id', width: 80, sortable: true,hidden: true},
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
    	this.buildStore(basePath + '/support/doQueryLocation.action','Location',20);
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
Ext.define('Redm.support.Location', {	
	extend: 'Ext.panel.Panel',
    alias : 'widget.locationmanager',
    title:'库位',
    layout:'border',
    initComponent: function(){
    	var me = this;
//    	this.buildContextMenu();
    	this.items = [this.createTopPanel(),this.createBtmPanel()];
    	//当前页面销毁时，同时销毁弹出的window
    	this.on('destroy',function(){
	    	if(this.winform){
	    		this.winform.close();
	    		delete this.winform;
	    	}
	    },this);
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
			handler: me.saveLocation,
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
        var me = this;
    	this.basicForm.getForm().reset();
        me.basicForm.getForm().findField('loc').setReadOnly(false);
    },
    
    onSelect: function(){
    	this.gridPanel.getStore().load()
    },
    
    onReset: function(){
    	this.selform.getForm().reset();
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
						var areaRecord = records[0].getData();
			        	Ext.Ajax.request({
						    url: basePath + '/support/doDeleteLocation.action',
						    params: {
						    	id: areaRecord.id
						    },
						    success: function(response){
						        var text = Ext.decode(response.responseText);
						        var success = text.success;
						        MessageBox.show(success, text.json.msg);
						        me.gridPanel.getStore().load();
			        			me.basicForm.getForm().reset();
						    }
						});
					}
				}
	    	);   
    	}
    },
    
/*   	createContextMenu:function(e){
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
    
	//创建导入面板对话框
	createForm: function(){
		this.winform = Ext.create('Ext.window.Window',{
	        autoHeight: true,
			title: '库位信息导入',
	        height: 110,
			width: 400,
			maximizable: false,
			resizable: false,
	        bodyPadding: '10 10 0',
	        defaults: {
	            anchor: '100%',
	            allowBlank: false,
	            msgTarget: 'side',
	            labelWidth: 60
	        },
            items:[this.createImportForm()],
			buttons: this.createButtons()
   		});		
		this.winform.on('close',function(){
    		delete this.winform;
    	},this);		
	    return this.winform;
	},

    //导入面板上的文本框
    createImportForm: function(){
    	var me = this;
    	this.importForm = Ext.create('Ext.form.Panel',{
			xtype:'form',
			frame:true,
			headerPosition: 'bottom',
	        autoHeight: true,
	        bodyPadding: '5 2 2 5',
	        items: [
                {
					labelWidth: 60,
                    width: 330,
                    xtype: 'filefield',
                    id: 'filedata',
                    itemId: 'urldata',
                    emptyText: '选择Excel数据文件',
                    fieldLabel: '数据文件',
                    name: 'filedata',
                    buttonText: '',
                    buttonConfig: {
                        iconCls: 'icon-create'
                    }
                }
            ]
    	});
    	return this.importForm;
    },
    
    //导入面板上的按钮
	createButtons: function(){
		var buttons = [
            {
                text: '保存',
                scope: this,
                iconCls: 'icon-save',
                handler: this.doSaveImportData
            },
            {
                text: '关闭',
                scope: this,
                iconCls: 'icon-cancel',
                handler: function(){
                                this.winform.close();
                            }
            }
        ];
		return buttons;
	},
	
	//导入面板上保存按钮的方法
	doSaveImportData: function(){
		var me = this;
		var form = this.importForm.getForm();
		console.log(this.winform);
        if (form.isValid()) {
            form.submit({
            	url: basePath + '/support/importLocationData.action',

            	waitMsg: '正在上传数据，请稍候……',
                success: function(form, action) {
                	if(action.result.success){
					   MessageBox.show(true, action.result.msg);
					   me.getStore().load();
					   me.winform.close();
                	}
                },
                failure: function(form, action) {
                    MessageBox.show(false, action.result.msg);
					me.winform.close();
                }
            });
        }
	},
	
    
    //顶部面板
    createTopPanel: function(){
    	var me = this;
    	this.toppanel = Ext.create('Ext.panel.Panel',{
    		region: 'north',
    		height: 150,
    		layout: 'border', 
    		border: false,
/*   		listeners:{
	            render:function(p){
	                p.getEl().on("contextmenu",function(e){
	                	me.createContextMenu(e);
	                },me)
	            }
            },*/
    		items:[this.createBtnForm(),this.createSelForm()]
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
    		layout: 'hbox',
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
                },
                {
                    iconCls: 'icon-delete',
                    itemId: 'delete',
                    text: '删除',
//                    handler: me.onDelete,
                    //disabled:true,
                    handler: me.onMultiDelete,
                    scope: this
                },
                {
                    iconCls: 'icon-save',
                    text: '保存',
                    handler: me.saveLocation,
                    scope: this
                },
                {
                    iconCls: 'icon-save',
                    text: '批更新',
                    handler: function(){
                        me.createWinFrom();
                        me.winform.show();
                    },
                    scope: this
                },
                {
                    iconCls: 'icon-upload',
                    text: '导入',
					handler: function(){
                        me.createForm();
                        me.winform.show();
                    },
                    scope: this
                }
			
            ]
    	});
    	return this.btnform;
    },
    
    createWinFrom: function(){
    	var me = this;
    	this.winform = Ext.create('Ext.window.Window',{
	    	title: 'Hello',
		    height: 350,
		    width: 450,
		    layout: 'vbox',
	        defaults: {
	        	xtype: 'fieldcontainer'
	        },
	        items: [
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 60,
                        margin: '5 0 0 10',
                        xtype: 'textfield',
                        width: 200
                    },
                    items: [
                        {
                            fieldLabel: '库位类型',
                            codeType: 'LOCTYPE',
                            itemId: 'locationType',
                            xtype: 'codecombo'
                        },
                        {
                            fieldLabel: '库位种类',
                            codeType: 'LOCCATEGRY',
                            xtype: 'codecombo',
                            itemId: 'locationCategory'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        margin: '0 0 0 10',
                        labelWidth: 60,
                        width: 200,
                        xtype: 'textfield'
                    },
                    items: [
                        {
                            fieldLabel: '库位标识',
                            codeType: 'LOCFLAG',
                            id: 'locationFlag',
                            xtype: 'codecombo',
                            itemId: 'locationFlag'
                        },
                        {
                            fieldLabel: '处理方式',
                            codeType: 'LOCHDLING',
                            xtype: 'codecombo',
                            itemId: 'locationHandling'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        margin: '0 0 0 10',
                        labelWidth: 60,
                        width: 200,
                        xtype: 'checkbox'
                    },
                    items: [
                        {
                            fieldLabel: '库位周转',
                            codeType: 'LOCABC',
                            xtype: 'codecombo',
                            itemId: 'abc'
                        },
                        {
                            fieldLabel: '上架区域',
                            xtype: 'putawayzonecombo',
                            itemId: 'putawayZone'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        margin: '0 0 0 10',
                        labelWidth: 60,
                        width: 200,
                        xtype: 'checkbox'
                    },
                    items: [
                        {
                            fieldLabel: '拣货区域',
                            xtype: 'putawayzonecombo',
                            itemId: 'pickZone'
                        },
                        {
                            fieldLabel: '库位段',
                            xtype: 'sectioncombo',
                            itemId: 'section'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        margin: '0 0 0 10',
                        labelWidth: 60,
                        width: 200,
                        xtype: 'textfield'
                    },
                    items: [
                        {
                            fieldLabel: 'X轴',
                            xtype: 'textfield',
                            itemId: 'xAxle'
                        },
                        {
                            fieldLabel: 'Y轴',
                            xtype: 'textfield',
                            itemId: 'yAxle'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        margin: '0 0 0 10',
                        labelWidth: 60,
                        width: 200,
                        xtype: 'checkbox'
                    },
                    items: [
                        {
                            fieldLabel: '层',
                            itemId: 'level',
                            xtype: 'textfield'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        margin: '0 0 0 50',
                        xtype: 'checkbox'
                    },
                    items: [
                        {
                            itemId: 'commingleLot',
                            inputValue: true, 
                            boxLabel: '允许混放批次'
                        },
                        {
                            itemId: 'commingleSku',
                            boxLabel: '允许混放商品'
                        },
                        {
                            itemId: 'loseId',
                            boxLabel: '忽略ID'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        margin: '0 0 0 10',
                        labelWidth: 60,
                        width: 200,
                        xtype: 'numberfield'
                    },
                    items: [
                        {
                            fieldLabel: '长',
                            minValue:0,
                            itemId: 'leng'
                            
                        },
                        {
                            fieldLabel: '宽',
                            minValue:0,
                            itemId: 'width'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        margin: '0 0 0 10',
                        labelWidth: 60,
                        width: 200,
                        xtype: 'numberfield'
                    },
                    items: [
                        {
                            fieldLabel: '高',
                            minValue:0,
                            itemId: 'height'
                        },
                        {
                            fieldLabel: '体积',
                            minValue:0,
                            itemId: 'cube'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        margin: '0 0 0 10',
                        labelWidth: 60,
                        width: 200,
                        xtype: 'numberfield'
                    },
                    items: [
                        {
                            fieldLabel: '重量',
                            minValue:0,
                            itemId: 'weight'
                        },
                        {
                            fieldLabel: '件数',
                            minValue:0,
                            itemId: 'pcsQty'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        margin: '0 0 0 10',
                        labelWidth: 60,
                        width: 200,
                        xtype: 'numberfield'
                    },
                    items: [
                        {
                            fieldLabel: '箱数',
                            minValue:0,
                            itemId: 'caseQty'
                        },
                        {
                            fieldLabel: '托数',
                            minValue:0,
                            itemId: 'palletQty'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 60,
                        width : 80,
                        margin: '0 0 0 20',
                        xtype: 'button'
                    },
                    items: [
                        {
                            text: '确定',
                            handler: me.updateAllLocation,
                            scope: this,
                            margin: '0 0 0 150'
                        },
                        {
                            text: '退出',
                            scope: this,
                            handler: function(){
                                me.winform.close();
                            }
                        }
                    ]
                }
            ]
    	});
    	this.winform.on('close',function(){
    		delete this.winform;
    	},this);
    	return this.winform;
    
    },
    
    //顶部查询面板
    createSelForm: function(){
    	var me = this;
    	this.selform = Ext.create('Ext.form.Panel',{
    		region: 'north',
    		height: 110,
    		layout: 'vbox', 
    		frame: true,
    		border: false,
    		defaults: {
    			//xtype: 'textfield',
                xtype:'fieldcontainer',
    			margin: '5 0 0 5'
    		},
    		items:[
                {
                    layout: 'hbox',
                    defaults: {
                        xtype: 'textfield',
                        margin: '5 0 0 5'
                    },
                    items:[
                        {
                            xtype: 'textfield',
                            width: 170,
                            labelWidth: 55,
                            name: 'loc',
                            listeners: {
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            },
                            fieldLabel: '库位'
                        },
                        {
                            width: 170,
                            labelWidth: 55,
                            xtype:'codecombo',
                            codeType:'LOCTYPE',
                            name: 'locationType',
                            fieldLabel: '库位类型'
                        },
                        {
                            width: 170,
                            labelWidth: 55,
                            xtype:'codecombo',
                            codeType:'LOCCATEGRY',
                            name: 'locationCategory',
                            fieldLabel: '库位种类'
                        },
                        {
                            xtype:'codecombo',
                            codeType:'LOCFLAG',
                            width: 170,
                            labelWidth: 55,
                            name: 'locationFlag',
                            fieldLabel: '库位标识'
                        },
                        {
                            xtype:'codecombo',
                            codeType:'LOCHDLING',
                            width: 170,
                            labelWidth: 55,
                            name: 'locationHandling',
                            fieldLabel: '处理方式'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults: {
                        xtype: 'textfield',
                        margin: '5 0 0 5'
                    },
                    items:[
                        {
                            xtype:'codecombo',
                            codeType:'LOCABC',
                            width: 170,
                            labelWidth: 55,
                            name: 'abc',
                            fieldLabel: '周转速度'
                        },                    
                        {
                            xtype:'putawayzonecombo',
                            width: 170,
                            labelWidth: 55,
                            name: 'putawayZone',
                            fieldLabel: '上架区域'
                        },
                        {
                            xtype:'putawayzonecombo',
                            width: 170,
                            labelWidth: 55,
                            name: 'pickZone',
                            fieldLabel: '拣货区域'
                        },
                        {
                            xtype:'sectioncombo',
                            width: 170,
                            labelWidth: 55,
                            name: 'section',
                            fieldLabel: '库位段'
                        },
                        {
                            xtype:'textfield',
                            width: 170,
                            labelWidth: 55,
                            name: 'level',
                            fieldLabel: '层'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults: {
                        xtype: 'checkbox',
                        margin: '5 0 0 5'
                    },
                    items:[
                        {
                            boxLabel: '允许混放物品',
                            //checked: true,    //reset后的初始值
                            inputValue: '1',
                            name: 'commingleSku'
                        },
                        {
                            boxLabel: '允许混放批次',
                            //checked: true,     //reset后的初始值
                            inputValue: '1',
                            name: 'commingleLot'
                        },
                        {
                            boxLabel: '忽略ID',
                            inputValue: '1',
                            name: 'loseId'
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
                            handler: this.onReset,
                            scope: this,
                            text: '重置'
                        }
                    ]                    
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
    		items: [this.createGridPanel(),this.createTabPanel()]
    	});
    	return this.btmpanel;
    },


    //底部GRID面板
    createGridPanel:function(){
    	var me = this;
    	this.gridPanel = Ext.create('widget.locationgrid',{
			region: 'center',
			width: 550,
			listeners: {
    			itemclick: function(grid,record){
    				me.basicForm.getForm().loadRecord(record);
                    //区域设置为只读
                    me.basicForm.getForm().findField('loc').setReadOnly(true);
    			}
    		}
		});
		this.gridPanel.getStore().on('beforeload',function(){
    		var params = this.gridPanel.getStore().getProxy().extraParams;
    		var record = me.selform.getForm().getValues();
    		
    		var loc = record.loc;
    		var locationType = record.locationType;
    		var locationCategory = record.locationCategory;
    		var locationFlag = record.locationFlag;

    		var locationHandling = record.locationHandling;
    		var abc = record.abc;
    		var putawayZone = record.putawayZone;
    		var pickZone = record.pickZone;
    		var section = record.section;
    		var level = record.level;
    		var commingleSku = record.commingleSku;
    		var commingleLot = record.commingleLot;
    		var loseId = record.loseId;

			delete params.loc;
			delete params.locationType;
			delete params.locationCategory;
    		delete params.locationFlag;

			delete params.locationHandling;
			delete params.abc;
			delete params.putawayZone;
    		delete params.pickZone;
			delete params.section;
			delete params.level;
			delete params.commingleSku;
    		delete params.commingleLot;
			delete params.loseId;
			
			if(loc) params.loc = loc;
         	if(locationType) params.locationType = locationType;
         	if(locationCategory) params.locationCategory = locationCategory;
         	if(locationFlag) params.locationFlag = locationFlag;

			if(locationHandling) params.locationHandling = locationHandling;
         	if(abc) params.abc = abc;
         	if(putawayZone) params.putawayZone = putawayZone;
         	if(pickZone) params.pickZone = pickZone;
   			if(section) params.section = section;
         	if(level) params.level = level;
         	if(commingleSku) params.commingleSku = commingleSku;
         	if(commingleLot) params.commingleLot = commingleLot;
  			if(loseId) params.loseId = loseId;
            
    	},this);
		return this.gridPanel;
    },

    //底部右边面板  
    createTabPanel:function(){
    	var me = this;
    	this.tabPanel = Ext.create('Ext.panel.Panel',{
    		region:'east',
    		width: 450,
			split: true,
			collapsible: true,
			layout: 'fit',
			xtype:'tabpanel',
			tabPosition: 'bottom',
			items:[this.createBasicForm()]
    	});
    	return this.tabPanel;
    },

    createBasicForm: function(){
    	var me = this;
    	this.basicForm = Ext.create('Ext.form.Panel',{
			xtype:'form',
			frame:true,
			border:false,
			headerPosition: 'bottom',
			bodyPadding: '5 10 2 2',
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
                        labelWidth: 60,
                        margin: '0 0 0 10',
                        width: 130,
                        labelAlign: 'top',
                        xtype: 'textfield'
                    },
                    items: [
                        {
                            fieldLabel: '库位',
                            allowBlank: false,
                            listeners: {
                                blur: function(txt){                                    
                                    locValue=Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(locValue); 
                                    if(''!=locValue)
                                    {
                                        Ext.Ajax.request({
                                            url: basePath + '/support/doCheckLocExist.action',  
                                            params: {
                                                loc:locValue
                                            },
                                            success: function(response){
                                                var text = Ext.decode(response.responseText);
                                                var status = text.success;
                                                //console.log(status);
                                                //用status区分查重还是查是否存在。
                                                if(true==status)   //false表示没有找到该库位
                                                {
                                                    MessageBox.show(status, text.json.msg);   
                                                    me.basicForm.getForm().findField('loc').setValue('');
                                                }
                                            }
                                        });
                                    }                                        
                                }                                
                            },
                            name: 'loc'
                        },
                        {
                            fieldLabel: '上架顺序',
                            name: 'putawaySeq',
                            listeners: {
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }
                        },
                        {
                            fieldLabel:'拣货顺序',
                            name: 'picSeq',
                            listeners: {
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }                            
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
                        labelWidth: 60,
                        width: 130,
                        labelAlign: 'top',
                        margin: '0 0 0 10',
                        xtype: 'combobox'
                    },
                    items: [
                        {
                            fieldLabel: '库位类型',
                            name: 'locationType',
                            codeType: 'LOCTYPE',
                            allowBlank: false,
                            xtype: 'codecombo',
                            value: 'KW2'
                        },
                        {
                            fieldLabel: '库位种类',
                            codeType: 'LOCCATEGRY',
                            xtype: 'codecombo',
                            name: 'locationCategory',
                            allowBlank: false,
                            value: 'KWZL1'
                        },
                        {
                            fieldLabel: '库位标识',
                            codeType: 'LOCFLAG',
                            xtype: 'codecombo',
                            name: 'locationFlag',
                            allowBlank: false,
                            value: 'NONE'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 60,
                        width: 130,
                        labelAlign: 'top',
                        margin: '0 0 0 10',
                        xtype: 'combobox'
                    },
                    items: [
                        {
                            fieldLabel: '处理方式',
                            codeType: 'LOCHDLING',
                            xtype: 'codecombo',
                            name: 'locationHandling',
                            allowBlank: false,
                            value: '3'
                        },
                        {
                            fieldLabel: '周转速度',
                            codeType: 'LOCABC',
                            xtype: 'codecombo',
                            name: 'abc',
                            allowBlank: false,
                            value: '2'
                        },
                        {
                            fieldLabel: '上架区域',
                            xtype: 'putawayzonecombo',
                            name: 'putawayZone'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 60,
                        width: 130,
                        labelAlign: 'top',
                        margin: '0 0 0 10',
                        xtype: 'combobox'
                    },
                    items: [
                        {
                            fieldLabel: '拣货区域',
                            xtype: 'putawayzonecombo',
                            name: 'pickZone'
                        },
                        {
                            fieldLabel: '库位段',
                            xtype: 'sectioncombo',
                            name: 'section'
                        },
                        {
                            fieldLabel: '层',
                            xtype: 'textfield',
                            name: 'level'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 60,
                        width: 130,
                        labelAlign: 'top',
                        margin: '0 0 0 10',
                        xtype: 'textfield'
                    },
                    items: [
                        {
                            fieldLabel: 'X轴',
                            name: 'xAxle'
                        },
                        {
                            fieldLabel: 'Y轴',
                            name: 'yAxle'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 60,
                        width: 130,
                        margin: '0 0 0 10',
                        inputValue: true,
                        xtype: 'checkbox'
                    },
                    items: [
                        {
                            boxLabel: '允许混放物品',
                            checked: true,    //reset后的初始值
                            inputValue: '1',
                            name: 'commingleSku'
                        },
                        {
                            boxLabel: '允许混放批次',
                            checked: true,     //reset后的初始值
                            inputValue: '1',
                            name: 'commingleLot'
                        },
                        {
                            boxLabel: '忽略ID',
                            inputValue: '1',
                            name: 'loseId'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 60,
                         width: 130,
                        labelAlign: 'top',
                        margin: '0 0 0 10',
                        xtype: 'numberfield',
                        value: 0
                    },
                    items: [
                        {
                            fieldLabel: '长',
                            minValue:0,
                            name: 'leng'
                        },
                        {
                            fieldLabel: '宽',
                            minValue:0,
                            name: 'width'
                        },
                        {
                            fieldLabel: '高',
                            minValue:0,
                            name: 'height'
                        },
                        {
                            fieldLabel: '体积',
                            minValue:0,
                            name: 'cube'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 60,
                        width: 130,
                        labelAlign: 'top',
                        margin: '0 0 0 10',
                        xtype: 'numberfield',
                        value: 0
                    },
                    items: [
                        {
                            fieldLabel: '重量',
                            minValue:0,
                            name: 'weight'
                        },
                        {
                            fieldLabel: '件数',
                            minValue:0,
                            name: 'pcsQty'
                        },
                        {
                            fieldLabel: '箱数',
                            minValue:0,
                            name: 'caseQty'
                        },
                        {
                            fieldLabel: '托数',
                            minValue:0,
                            name: 'palletQty',
                            value:1   //不输入默认是0，表示无限托
                        }
                    ]
                }
            ]
    	});
    	return this.basicForm;
    },
    
    
//  已经能正常存盘
    saveLocation: function(){
		var me = this;
    	var locForm = this.basicForm.getForm();
    	if(!(locForm.isValid())) return;
    	locForm.submit({
		    clientValidation: true,
		    url: basePath + '/support/doSaveLocation.action',
		    params: {},
		    success: function(form, action) {
		    	var success = action.result;
		        MessageBox.show(success.success, success.json.msg);
                if(true==success.success)
                {
                    locForm.reset();
                    me.gridPanel.getStore().load();
                }
		    },
		    failure: function(form, action) {
		    	var success = action.result;
		        MessageBox.show(success.success, success.json.msg);
		        //locForm.reset();
		        me.gridPanel.getStore().load();
		    }
		});
	},
    
    

/*    saveLocation: function(){
		var me = this;
    	var locForm = this.basicForm.getForm();
        var locValues=locForm.getValues();
        
    	if(!(locForm.isValid())) return;
        
    	Ext.Ajax.request({        
    	    url: basePath + '/support/doSaveLocation.action',
		    params: {
                id:locValues.id,
                loc:locValues.loc,
                
            },
		    success: function(form, action) {
		    	var success = action.result;
		        MessageBox.show(success.success, success.json.msg);
		        locForm.reset();
		        me.gridPanel.getStore().load();
		    },
		    failure: function(form, action) {
		    	var success = action.result;
		        MessageBox.show(success.success, success.json.msg);
		        //locForm.reset();
		        me.gridPanel.getStore().load();
		    }
		});
	},*/
    
    
    
	updateAllLocation: function(){
		var me = this;
		var locationType = me.winform.queryById('locationType').getValue();
		var locationCategory = me.winform.queryById('locationCategory').getValue();
		var locationFlag = me.winform.queryById('locationFlag').getValue();
		var locationHandling = me.winform.queryById('locationHandling').getValue();
		var abc = me.winform.queryById('abc').getValue();
		var putawayZone = me.winform.queryById('putawayZone').getValue();
		var pickZone = me.winform.queryById('pickZone').getValue();
		var section = me.winform.queryById('section').getValue();
		var level = me.winform.queryById('level').getValue();
		var xAxle = me.winform.queryById('xAxle').getValue();
		var yAxle = me.winform.queryById('yAxle').getValue();
		var commingleLot = me.winform.queryById('commingleLot').getValue();
		var commingleSku = me.winform.queryById('commingleSku').getValue();
		var loseId = me.winform.queryById('loseId').getValue();
		var leng = me.winform.queryById('leng').getValue();
		var width = me.winform.queryById('width').getValue();
		var height = me.winform.queryById('height').getValue();
		var cube = me.winform.queryById('cube').getValue();
		var weight = me.winform.queryById('weight').getValue();
		var pcsQty = me.winform.queryById('pcsQty').getValue();
		var caseQty = me.winform.queryById('caseQty').getValue();
		var palletQty = me.winform.queryById('palletQty').getValue();
//		var records = me.gridPanel.getStore().getSelectionModel().getSelect();
		var records = me.gridPanel.getSelectionModel().getSelection();
		if(records == ""){
			MessageBox.error("错误提示","请选择要修改的数据！");
		 	return;
		} 
		if(locationType ==null&&locationCategory==null && locationFlag==null &&locationHandling ==null&&abc==null&&putawayZone==null&&pickZone==null&&section==null&&level ==""&&leng==""&&width==""&&height==""&&cube==""&&weight==""&&pcsQty==""&&caseQty==""&&palletQty==""){
		 	MessageBox.error("错误提示","请填写需要修改的内容！");
		 	return;
		}
		var ids = []; 
		Ext.Array.each(records, function(name, index, countriesItSelf) {
			ids.push(name.getData().id);
		});
		Ext.Ajax.request({
		    url: basePath + '/support/doUpdateAllLocation.action',
		    params: {
		    	ids: ids,
		        locationType: locationType,
		        locationCategory: locationCategory,
		        locationFlag: locationFlag,
		        locationHandling: locationHandling,
		        abc: abc,
		        putawayZone: putawayZone,
		        pickZone: pickZone,
		        section: section,
		        level: level,
		        xAxle: xAxle,
		        yAxle: yAxle,
		        commingleLot: commingleLot,
		        commingleSku: commingleSku,
		        loseId: loseId,
		        leng: leng,
		        width: width,
		        height: height,
		        cube: cube,
		        weight: weight,
		        pcsQty: pcsQty,
		        caseQty: caseQty,
		        palletQty: palletQty
		    },
		    success: function(response){
		        var text = Ext.decode(response.responseText);
		        var success = text.success;
		        MessageBox.show(success, text.json.msg);
                me.gridPanel.getStore().load();
                locForm.reset();
                //if(success==true)   //判断条件无效，放到外边去，保留后续再分析
                //{
                //    me.gridPanel.getStore().load();
                //}
		    }
		});
		 
	},
    
	onMultiDelete: function(){
		var me = this;
		var records = me.gridPanel.getSelectionModel().getSelection();
		if(records == ""){
			MessageBox.error("错误提示","请选择要操作的数据！");
		 	return;
		} 
		var ids = []; 
		Ext.Array.each(records, function(name, index, countriesItSelf) {
			ids.push(name.getData().id);
		});
        
        Ext.MessageBox.confirm('询问提示', '确定要删除吗？', 
            function(btn){
                if(btn == 'yes'){    
                
                Ext.Ajax.request({
                    url: basePath + '/support/doMultiDeleteLocation.action',
                    params: {
                        ids: ids
                    },
                    success: function(response){
                        var text = Ext.decode(response.responseText);
                        var success = text.success;
                        MessageBox.show(success, text.json.msg);
                        me.gridPanel.getStore().load();
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
	    items: [
            {
                xtype:'locationmanager',
                region:'center'
            }
        ]
	});
});