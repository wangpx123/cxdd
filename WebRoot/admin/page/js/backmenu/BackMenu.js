/******************************************
回单管理 
BackMenu.js

******************************************/


Ext.define('BackMenu', {
    extend: 'Ext.data.Model',
    fields: [
    {name:'id'},
		{name:'carrierReference'},            
		{name:'storerKey'},     
		{name:'logisticsCompany'},
		{name:'consigneeCompany'},            
		{name:'placeofdelivery'},     
		{name:'lot15count'},
		{name:'lot05count'},            
		{name:'lot06count'},     
		{name:'forceFee',type:'float'},
		{name:'lossFee',type:'float'},            
		{name:'signDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},      
		{name:'signatory'},
		{name:'addDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},     
		{name:'addWho'}        
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
Ext.define('Redm.backMenu.BackMenuGrid', {
    extend: 'Redm.BaseGrid',
    alias : 'widget.backmenugrid',
    loadMask: true,
    forceLayout:true,
    selModel: Ext.create('Ext.selection.CheckboxModel'),
    buildColumns: function(){
        this.columns = [
		    { header: "托运单", dataIndex: 'carrierReference', width: 120, sortable: true},
		    { header: "货主", dataIndex: 'storerKey', width: 100, sortable: true},
		    { header: "物流公司", dataIndex: 'logisticsCompany', width: 100, sortable: true},
		    { header: "客户名称", dataIndex: 'consigneeCompany', width: 120, sortable: true},
		    { header: "到达站", dataIndex: 'placeofdelivery', width: 100, sortable: true},
		    { header: "重量", dataIndex: 'lot15count', width: 100, sortable: true},
		    { header: "托数", dataIndex: 'lot05count', width: 120, sortable: true},
		    { header: "卷数", dataIndex: 'lot06count', width: 100, sortable: true},
		    { header: "叉车费", dataIndex: 'forceFee', width: 100, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    { header: "货损费", dataIndex: 'lossFee', width: 100, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    { header: "签收日期", dataIndex: 'signDate', width: 100, sortable: true,renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
		    { header: "签收人", dataIndex: 'signatory', width: 100, sortable: true},
		    { header: "id",dataIndex: 'id',hidden: true},
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
    	this.buildStore(basePath + '/backmenu/doQueryBackMenu.action','BackMenu',20);
        this.callParent(arguments);
    }
});


//主面板
Ext.define('Redm.backMenu.BackMenu', {	
	extend: 'Ext.panel.Panel',
    alias : 'widget.backMenumanager',
    title:'回单管理',
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
    
    onCreate: function(){
        var me = this;
    	this.basicForm.getForm().reset();
        me.basicForm.getForm().findField('carrierReference').setReadOnly(false);
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
    
    //顶部面板
    createTopPanel: function(){
    	var me = this;
    	this.toppanel = Ext.create('Ext.panel.Panel',{
    		region: 'north',
    		height: 190,
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
                    handler: me.saveBackMenu,
                    scope: this
                },{
                    xtype: 'button',
                    handler: this.onExportBackMenuReport,
                    scope: this,
                    iconCls: 'icon-upload',
                    text: '<font color=red>导出</font>'
                   
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
    		height: 150,
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
                            width: 200,
                            labelWidth: 55,
                            name: 'storerKey',
                            fieldLabel: '货主',
                            value:'宁波长阳科技有限公司'
                        },
                        {
                            width: 200,
                            labelWidth: 55,
                            xtype:'logisticscompanycombo',
                            name: 'logisticsCompany',
                            fieldLabel: '物流公司'
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
                            xtype: 'textfield',
                            width: 200,
                            labelWidth: 55,
                            name: 'carrierReference',
                            listeners: {
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            },
                            fieldLabel: '托运单'
                        },
                        {
                            width: 200,
                            labelWidth: 55,
                            name: 'consigneeCompany',
                            fieldLabel: '客户名称'
                        },
                        {
                            width: 200,
                            labelWidth: 55,
                            name: 'placeofdelivery',
                            fieldLabel: '到达站'
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
                            width: 200,
                            labelWidth: 55,
                            name: 'signatory',
                            fieldLabel: '签收人'
                        },                    
                        {
                            width: 200,
                            xtype: 'datefield',
                            labelWidth: 55,
                            name: 'signDateStart',
                            fieldLabel: '签收日期',
                            format:'Y-m-d H:i:s'
                        },
                        {
                            width: 200,
                            xtype: 'datefield',
                            labelWidth: 55,
                            name: 'signDateEnd',
                            fieldLabel: '---->',
                            format:'Y-m-d H:i:s'
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
    	this.gridPanel = Ext.create('widget.backmenugrid',{
			region: 'center',
			width: 550,
			listeners: {
    			itemclick: function(grid,record){
    				me.basicForm.getForm().loadRecord(record);
                    //托运单设置为只读
                    me.basicForm.getForm().findField('carrierReference').setReadOnly(true);
    			}
    		}
		});
		this.gridPanel.getStore().on('beforeload',function(){
    		var params = this.gridPanel.getStore().getProxy().extraParams;
    		var record = me.selform.getForm().getValues();
    		
    		var carrierReference = record.carrierReference;
    		var storerKey = record.storerKey;
    		var logisticsCompany = record.logisticsCompany;
    		var consigneeCompany = record.consigneeCompany;

    		var placeofdelivery = record.placeofdelivery;
    		var signatory = record.signatory;
    		var signDateStart = Ext.util.Format.date(record.signDateStart,'Y-m-d H:i:s');
    		var signDateEnd = Ext.util.Format.date(record.signDateEnd,'Y-m-d H:i:s');

			delete params.carrierReference;
			delete params.storerKey;
			delete params.logisticsCompany;
    		delete params.consigneeCompany;

			delete params.placeofdelivery;
			delete params.signatory;
			delete params.signDateStart;
    		delete params.signDateEnd;
			
			if(carrierReference) params.carrierReference = carrierReference;
         	if(storerKey) params.storerKey = storerKey;
         	if(logisticsCompany) params.logisticsCompany = logisticsCompany;
         	if(consigneeCompany) params.consigneeCompany = consigneeCompany;

			if(placeofdelivery) params.placeofdelivery = placeofdelivery;
         	if(signatory) params.signatory = signatory;
         	if(signDateStart) params.signDateStart = signDateStart;
         	if(signDateEnd) params.signDateEnd = signDateEnd;
            
    	},this);
		return this.gridPanel;
    },

    //底部右边面板  
    createTabPanel:function(){
    	var me = this;
    	this.tabPanel = Ext.create('Ext.panel.Panel',{
    		region:'east',
    		width: 400,
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
                            fieldLabel: '托运单',
                            allowBlank: false,
                            listeners: {
                                blur: function(txt){                                    
                                    carrierReferenceValue=Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(carrierReferenceValue); 
                                    if(''!=carrierReferenceValue)
                                    {
                                        Ext.Ajax.request({
                                            url: basePath + '/backmenu/doValidateBackMenu.action',  
                                            params: {
                                                carrierReference:carrierReferenceValue
                                            },
                                            success: function(response){
                                                var text = Ext.decode(response.responseText);
                                               	if(0 != text.json.data.length)
                                                {
                                                    me.basicForm.getForm().findField('carrierReference').setValue(text.json.data[0].carrierReference);
                                                	me.basicForm.getForm().findField('consigneeCompany').setValue(text.json.data[0].consigneeCompany);
                                                    me.basicForm.getForm().findField('placeofdelivery').setValue(text.json.data[0].placeofdelivery);
                                                	
                                                	me.basicForm.getForm().findField('lot15count').setValue(text.json.data[0].susr5);
                                                	me.basicForm.getForm().findField('lot05count').setValue(text.json.data[0].susr3);
                                                	me.basicForm.getForm().findField('lot06count').setValue(text.json.data[0].susr4);
                                                }
                                            }
                                        });
                                    }                                        
                                }                                
                            },
                            name: 'carrierReference'
                        },
                        {
                            fieldLabel: '客户名称',
                            name: 'consigneeCompany'
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
                        xtype: 'textfield',
                        hidden: true
                    },
                    items: [
                        {
                            fieldLabel: '物流公司',
                            name: 'logisticsCompany' 
                        },{
                            fieldLabel: '货主',
                            name: 'storerKey',
                            listeners: {
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }
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
                            fieldLabel: '到达站',
                            name: 'placeofdelivery',
                            allowBlank: false 
                        },
                        {
                            fieldLabel: '重量',
                            name: 'lot15count',
                            allowBlank: false,
                            xtype: 'numberfield',
                       		value: 0 
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
                            fieldLabel: '托数',
                            name: 'lot05count'
                        } ,
                        {
                            fieldLabel: '卷数',
                            name: 'lot06count'
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
                            fieldLabel: '叉车费',
                            name: 'forceFee'
                        },
                        {
                            fieldLabel: '货损费',
                            name: 'lossFee'
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
                            fieldLabel: '签收人',
                            name: 'signatory'
                        },
                        {
                            fieldLabel: '签收日期',
                            xtype: 'datefield',
                            name: 'signDate',
                            format:'Y-m-d H:i:s'
                        } 
                    ]
                } 
            ]
    	});
    	return this.basicForm;
    },
    
    
//  保存回单设置;
    saveBackMenu: function(){
		var me = this;
    	var locForm = this.basicForm.getForm();
    	if(!(locForm.isValid())) return;
    	locForm.submit({
		    clientValidation: true,
		    url: basePath + '/backmenu/doSaveBackMenu.action',
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
    
	//导出Excel
	onExportBackMenuReport: function(){
		var me = this;
  		var record = me.selform.getForm().getFieldValues();
  		var logisticsCompany = record.logisticsCompany;
  		if(''==logisticsCompany)
        {
  			MessageBox.error('错误提示','物流公司信息为空！');
            return;
        }
		var carrierReference = record.carrierReference;
    	var storerKey = record.storerKey;
    	var logisticsCompany = record.logisticsCompany;
    	var consigneeCompany = record.consigneeCompany;

    	var placeofdelivery = record.placeofdelivery;
    	var signatory = record.signatory;
    	var signDateStart = Ext.util.Format.date(record.signDateStart,'Y-m-d H:i:s');
    	var signDateEnd = Ext.util.Format.date(record.signDateEnd,'Y-m-d H:i:s');
		
		//导出excel格式的报表
		window.location.href = basePath+'/backmenu/onExportBackMenuReport.action?string='+carrierReference+","
		+consigneeCompany+","+placeofdelivery+","+signatory+","+signDateStart+","+signDateEnd;
    },
    
	onMultiDelete: function(){
		var me = this;
		var records = me.gridPanel.getSelectionModel().getSelection();
		if(records == ""){
			MessageBox.error("错误提示","请选择要操作的数据！");
		 	return;
		} 
		var record = records[0].getData();
        Ext.MessageBox.confirm('询问提示', '确定要删除吗？', 
            function(btn){
                if(btn == 'yes'){    
                
                Ext.Ajax.request({
                    url: basePath + '/backmenu/doDeleteBackMenu.action',
                    params: {
                        id: record.id
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
                xtype:'backMenumanager',
                region:'center'
            }
        ]
	});
});