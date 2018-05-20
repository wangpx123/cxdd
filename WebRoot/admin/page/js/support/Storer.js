/***************************************
货主 storer.js

****************************************/


Ext.define('Storer', {
    extend: 'Ext.data.Model',
    fields: [
		{name:'id'},
		{name:'storerKey'},            
		{name:'type'},     
		{name:'company'},    
		{name:'descr'},            
		{name:'nation'},            
		{name:'province'},            
		{name:'city'}, 
		{name:'county'},      
		{name:'address1'},            
		{name:'address2'},            
		{name:'contact'},            
		{name:'mobile'},            
		{name:'tel'},   
		{name:'position'},    
		{name:'fax'},            
		{name:'email'},            
		{name:'cartonKey'},            
		{name:'packKey'},            
		{name:'locGenerate'},            
		{name:'lotKey'},            
		{name:'putawayStrategyKey'},            
		{name:'rotationStrategyKey'},            
		{name:'preAllocationStrategyKey'},            
		{name:'allocationStrategyKey'},            
		{name:'replenishmentStrategyKey'},                   
		{name:'asnUom'},                  
		{name:'soUom'},
		{name:'asnCopy'},
		{name:'soCopy'},
		{name:'asnLabel'},
		{name:'soLabel'},
		{name:'route'},
		{name:'carrier'},
		{name:'prefix'},
		{name:'putAllocate'},
		{name:'excessAllowable'},
		{name:'excessRate'},
		{name:'mustAsn'},
		{name:'mustSo'},
		{name:'mustAsnSo'},
		{name:'autoSku'},
		{name:'autoStorer'},
		{name:'duty'},
		{name:'bankingAccount'},
		{name:'dateClosing',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
		{name:'billto'},
		{name:'chargeType'},
		{name:'chargeKey'},
		{name:'warehouseArea'},
		{name:'areachargeType'},
		{name:'chargeRank'},
		{name:'areaCharge'},
		{name:'currency'},
		{name:'cubeUom'},
		{name:'wgtUom'},
		{name:'invchargeRank'},
		{name:'isOutboundInvcharge'},
		{name:'isArea'},
		{name:'userDefine1'},
		{name:'userDefine2'},
		{name:'userDefine3'},
		{name:'userDefine4'},
		{name:'userDefine5'},
		{name:'notes'},
		{name:'mailSend'},
        {name:'addDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},     
        {name:'addWho'}        
	],
    idProperty: 'id'
});

Ext.define('Redm.support.StorerGrid', {
    extend: 'Redm.BaseGrid',
    alias : 'widget.storergrid',
    loadMask: true,
    forceLayout:true,
    buildColumns: function(){
        this.columns = [
		    { header: "货主", dataIndex: 'storerKey', width: 140, sortable: true},
/*		    { header: "类型", dataIndex: 'type', width: 120, sortable: true,
                renderer:function(v){
                    if(v=='1') return '货主';
                    else if(v=='2') return '供应商';
                    else if(v=='3') return '承运人';
                    else if(v=='4') return '收货人';
                }
            },*/
		    { header: "类型", dataIndex: 'type', width: 120, sortable: true,
                renderer:this.rendererStatusFunc
            },            
		    { header: "公司", dataIndex: 'company', width: 200, sortable: true},
		    { header: "描述", dataIndex: 'descr', width: 200, sortable: true},
		    { header: "国家", dataIndex: 'nation', width: 120, sortable: true},
		    { header: "省份", dataIndex: 'province', width: 120, sortable: true},
		    { header: "城市", dataIndex: 'city', width: 120, sortable: true},
		    { header: "区县", dataIndex: 'county', width: 120, sortable: true},
		    { header: "地址一", dataIndex: 'address1', width: 150, sortable: true},
		    { header: "地址二", dataIndex: 'address2', width: 150, sortable: true},
		    { header: "联系人", dataIndex: 'contact', width: 120, sortable: true},
		    { header: "手机", dataIndex: 'mobile', width: 120, sortable: true},
		    { header: "电话", dataIndex: 'tel', width: 120, sortable: true},
		    { header: "职务", dataIndex: 'position', width: 120, sortable: true},
		    { header: "传真", dataIndex: 'fax', width: 120, sortable: true},
		    { header: "邮箱", dataIndex: 'email', width: 120, sortable: true},
		    { header: "是否发送邮件", dataIndex: 'mailSend', width: 120, sortable: true},
		    { header: "默认装箱组", dataIndex: 'cartonKey', width: 100, sortable: true},
		    { header: "默认包装", dataIndex: 'packKey', width: 100, sortable: true},
		    { header: "库位指定方式", dataIndex: 'locGenerate', width: 100, sortable: true},
		    { header: "默认批校验", dataIndex: 'lotKey', width: 100, sortable: true},
		    { header: "默认上架策略", dataIndex: 'putawayStrategyKey', width: 100, sortable: true},
		    { header: "默认周转策略", dataIndex: 'rotationStrategyKey', width: 100, sortable: true},
		    { header: "默认预分配策略", dataIndex: 'preAllocationStrategyKey', width: 100, sortable: true},
		    { header: "默认分配策略", dataIndex: 'allocationStrategyKey', width: 100, sortable: true},
		    { header: "默认补货策略", dataIndex: 'replenishmentStrategyKey', width: 100, sortable: true},
		    { header: "默认收货单位", dataIndex: 'asnUom', width: 100, sortable: true},
		    { header: "默认出库单位", dataIndex: 'soUom', width: 100, sortable: true},
		    { header: "收货复制项", dataIndex: 'asnCopy', width: 100, sortable: true},
		    { header: "发货复制项", dataIndex: 'soCopy', width: 100, sortable: true},
		    { header: "入库标签", dataIndex: 'asnLabel', width: 100, sortable: true},
		    { header: "出库标签", dataIndex: 'soLabel', width: 100, sortable: true},
		    { header: "路线", dataIndex: 'route', width: 100, sortable: true},
		    { header: "承运人", dataIndex: 'carrier', width: 100, sortable: true},
		    { header: "单证前缀", dataIndex: 'prefix', width: 100, sortable: true},
		    { header: "一步到位分配", dataIndex: 'putAllocate', width: 100, sortable: true},
		    { header: "允许超量收货", dataIndex: 'excessAllowable', width: 100, sortable: true},
		    { header: "超额收货百分比", dataIndex: 'excessRate', width: 100, sortable: true},
		    { header: "ASN关闭前必须导入SN", dataIndex: 'mustAsn', width: 100, sortable: true},
		    { header: "SO关闭前必须导入SN", dataIndex: 'mustSo', width: 100, sortable: true},
		    { header: "SO导入的SN必须是ASN中已经导入的SN", dataIndex: 'mustAsnSo', width: 100, sortable: true},
		    { header: "ASN导入时自动把不存在的商品信息写入商品档案", dataIndex: 'autoSku', width: 100, sortable: true},
		    { header: "ASN/SO导入时自动把不存在的货主信息导入货主档案", dataIndex: 'autoStorer', width: 100, sortable: true},
		    { header: "税号", dataIndex: 'duty', width: 100, sortable: true},
		    { header: "银行帐号", dataIndex: 'bankingAccount', width: 100, sortable: true},
		    { header: "结算日期", dataIndex: 'dateClosing', width: 100, sortable: true,editor:{xtype:'textfield',format:'Y-m-d H:i:s.u'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i')},
		    { header: "重量体积计费方式", dataIndex: 'chargeType', width: 100, sortable: true},
		    { header: "费用代码", dataIndex: 'chargeKey', width: 100, sortable: true},
		    { header: "包仓面积", dataIndex: 'warehouseArea', width: 100, sortable: true},
		    { header: "包仓计费方式", dataIndex: 'areachargeType', width: 100, sortable: true},
		    { header: "计费级别", dataIndex: 'chargeRank', width: 100, sortable: true},
		    { header: "包仓费用", dataIndex: 'areaCharge', width: 100, sortable: true},
		    { header: "币种", dataIndex: 'currency', width: 100, sortable: true},
		    { header: "体积单位", dataIndex: 'cubeUom', width: 100, sortable: true},
		    { header: "重量单位", dataIndex: 'wgtUom', width: 100, sortable: true},
		    { header: "库存计费级别", dataIndex: 'invchargeRank', width: 100, sortable: true},
		    { header: "出库是结算库存费", dataIndex: 'isOutboundInvcharge', width: 100, sortable: true},
		    { header: "包仓", dataIndex: 'isArea', width: 100, sortable: true},
		    { header: "自定义1", dataIndex: 'userDefine1', width: 100, sortable: true},
		    { header: "自定义2", dataIndex: 'userDefine2', width: 100, sortable: true},
		    { header: "自定义3", dataIndex: 'userDefine3', width: 100, sortable: true},
		    { header: "自定义4", dataIndex: 'userDefine4', width: 100, sortable: true},
		    { header: "自定义5", dataIndex: 'userDefine5', width: 100, sortable: true},
		    { header: "备注", dataIndex: 'notes', width: 200, sortable: true},
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
        
        //数据字典解析描述用，调试中，先保留
/*		this.codeStore = Ext.create('Ext.data.Store', {
	        autoLoad: this.storeAutoLoad,
	        storeId:'codeStore',
        	fields: [
				{name:'codeValue'},
				{name:'description'}
			],
	        proxy: {
	            type: 'ajax',
	            url: basePath + '/system/queryCodeDetail.action?codeType='+'STORERTYPE',
	            reader: {type: 'json',root: 'json.data',totalProperty: 'json.totalCount'},
	            actionMethods: {read: 'POST'},
	            simpleSortMode: true
	        },
	        sorters:[{property :'codeValue',direction:'ASC'}],
	        listeners:{
				'load':function(sto,recs){
                var val=sto.getAt(0).get('description');
				},scope:this
	        }
	    });    */    
        
    	this.buildStore(basePath + '/support/doQueryStorers.action','Storer',20);
        this.callParent(arguments);
    },
    
 /*   //尚未调试通过，先保留
    rendererfunc:function(value)
        {
            var retValue;
            Ext.Ajax.request({
                url: basePath + '/system/doQueryCodeDetailDescr.action',
//              url: basePath + '/system/queryCodeDetail.action?codeType='+this.codeType+'&existall='+this.existall,
                params: {
                    codeType:'STORERTYPE',
                    codeValue:value
                },
                success: function(response){   
                    var text = Ext.decode(response.responseText);
                    var ret = text.json.descr;
                    console.log(ret);
                }
            })   
            if(retValue!="") return retValue; 
            else return value;
        },*/

//  Grid中状态解析的方法        
    rendererStatusFunc:function(value){
            var retValue;
            if(value=='1') return '货主';
            else if(value=='2') retValue = '供应商';
            else if(value=='3') retValue = '承运人';
            else if(value=='4') retValue = '收货人';
            else if(value=='5') retValue = '结算人';
            else if(value=='6') retValue = '下单方';
            else   retValue = value;   //新增加的状态，直接显示原始定义
            return retValue;
    }
    
 /* //grid上的按钮不需要了
    onCreate: function(){
    	var fatherPanel = this.ownerCt.ownerCt;
    	fatherPanel.onCreate();
    },
    onDelete: function(){
    	var fatherPanel = this.ownerCt.ownerCt;
    	fatherPanel.onDelete();
    }*/
   
});

Ext.define('Redm.support.Storer', {	
	extend: 'Ext.panel.Panel',
    alias : 'widget.storermanager',
    title:'货主',
    layout:'border',
    initComponent: function(){
    	var me = this;
    	this.tbar = {
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
	                    handler: this.saveStorer
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
	    };
	    this.buildContextMenu();
    	this.items = [this.createBottomPanel(),this.createTopPanel()];
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
    	this.saveAction = Ext.create('Ext.Action', {
			text : "保存" ,
			iconCls: 'icon-save',
			handler: me.saveStorer,
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
					this.saveAction,
					this.searchAction,
					this.resetAction
				]
			});
    	}
		e.preventDefault();
		this.formContextMenu.showAt(e.getXY());
    },
    onCreate: function(){
    	this.basicForm.getForm().reset();
		this.customerForm.getForm().reset();
		this.clForm.getForm().reset();
		this.otherForm.getForm().reset();
        //货主在创建时可以读写
        this.basicForm.getForm().findField('storerKey').setReadOnly(false);
        
    },
    onSelect: function(){
    	this.gridPanel.getStore().load();
    },
    onReset: function(){
    	this.selpanel.getForm().reset();
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
						var datas = records[0].getData();
			        	Ext.Ajax.request({
						    url: basePath + '/support/doDeleteStorer.action',
						    params: {
						    	id: datas.id
						    },
						    success: function(response){
						        var text = Ext.decode(response.responseText);
						        var success = text.success;
						        MessageBox.show(success, text.json.msg);
						        me.gridPanel.getStore().load();
			        			me.basicForm.getForm().reset();
			        			me.customerForm.getForm().reset();
			        			me.clForm.getForm().reset();
			        			me.otherForm.getForm().reset();
						    }
						});
					}
				}
	    	); 
    	}
    },
    
	//创建导入EXCEL面板对话框
	createFormByExcel: function(){
		this.winformByExcel = Ext.create('Ext.window.Window',{
	        autoHeight: true,
			title: '货主信息导入',
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
            items:[this.createImportFormByExcel()],
			buttons: this.createButtonsByExcel()
   		});		
		this.winformByExcel.on('close',function(){
    		delete this.winformByExcel;
    	},this);		
	    return this.winformByExcel;
	},

    //导入面板上的文本框
    createImportFormByExcel: function(){
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
	createButtonsByExcel: function(){
		var buttons = [
            {
                text: '保存',
                scope: this,
                iconCls: 'icon-save',
                handler: this.doSaveImportDataByExcel
            },
            {
                text: '关闭',
                scope: this,
                iconCls: 'icon-cancel',
                handler: function(){
                                this.winformByExcel.close();
                            }
            }
        ];
		return buttons;
	},
	
	//导入面板上保存按钮的方法
	doSaveImportDataByExcel: function(){
		var me = this;
		var form = this.importForm.getForm();
        if (form.isValid()) {
            form.submit({
            	url: basePath + '/support/importStorerData.action',
            	waitMsg: '正在上传数据，请稍候……',
                success: function(form, action) {
                	if(action.result.success){
                       me.winformByExcel.close();
	                   MessageBox.show(true, action.result.msg);
                       me.gridPanel.getStore().load();
                	}
                },
                failure: function(form, action) {
                    MessageBox.show(false, action.result.msg);
                    me.winformByExcel.close();
                }
            });
        }
	},

	
	//创建导入txt面板对话框
	createFormBytxt: function(){
		this.winformBytxt = Ext.create('Ext.window.Window',{
	        autoHeight: true,
			title: '货主信息导入',
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
            items:[this.createImportFormBytxt()],
			buttons: this.createtButtonsBytxt()
   		});		
		this.winformBytxt.on('close',function(){
    		delete this.winformBytxt;
    	},this);		
	    return this.winformBytxt;
	},
	
	 //导入面板上的文本框
    createImportFormBytxt: function(){
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
                    id: 'txtfiledata',
                    itemId: 'urldata',
                    emptyText: '选择TXT数据文件',
                    fieldLabel: '数据文件',
                    name: 'txtfiledata',
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
	createtButtonsBytxt: function(){
		var buttons = [
            {
                text: '保存',
                scope: this,
                iconCls: 'icon-save',
                handler: this.doSaveImportDataBytxt
            },
            {
                text: '关闭',
                scope: this,
                iconCls: 'icon-cancel',
                handler: function(){
                                this.winformBytxt.close();
                            }
            }
        ];
		return buttons;
	},
	
	//导入面板上保存按钮的方法
	doSaveImportDataBytxt: function(){
		var me = this;
		var form = this.importForm.getForm();
        if (form.isValid()) {
            form.submit({
            	url: basePath + '/support/importStorerDataByTXT.action',
            	waitMsg: '正在上传数据，请稍候……',
                success: function(form, action) {
                	if(action.result.success){
                       me.winformBytxt.close();
	                   MessageBox.show(true, action.result.msg);
                       me.gridPanel.getStore().load();
                	}
                },
                failure: function(form, action) {
                    MessageBox.show(false, action.result.msg);
                    me.winformBytxt.close();
                }
            });
        }
	},
	
	
	//创建导入XML面板对话框
	createFormByXML: function(){
		this.winformByXML = Ext.create('Ext.window.Window',{
	        autoHeight: true,
			title: '货主信息导入',
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
            items:[this.createImportFormByXML()],
			buttons: this.createtButtonsByXML()
   		});		
		this.winformByXML.on('close',function(){
    		delete this.winformByXML;
    	},this);		
	    return this.winformByXML;
	},
	
	 //导入面板上的文本框
    createImportFormByXML: function(){
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
                    id: 'XMLfiledata',
                    itemId: 'urldata',
                    emptyText: '选择XML数据文件',
                    fieldLabel: '数据文件',
                    name: 'XMLfiledata',
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
	createtButtonsByXML: function(){
		var buttons = [
            {
                text: '保存',
                scope: this,
                iconCls: 'icon-save',
                handler: this.doSaveImportDataByXML
            },
            {
                text: '关闭',
                scope: this,
                iconCls: 'icon-cancel',
                handler: function(){
                                this.winformByXML.close();
                            }
            }
        ];
		return buttons;
	},
	
	//导入面板上保存按钮的方法
	doSaveImportDataByXML: function(){
		var me = this;
		var form = this.importForm.getForm();
        if (form.isValid()) {
            form.submit({
            	url: basePath + '/support/importStorerDataByXML.action',
            	waitMsg: '正在上传数据，请稍候……',
                success: function(form, action) {
                	if(action.result.success){
                       me.winformByXML.close();
	                   MessageBox.show(true, action.result.msg);
                       me.gridPanel.getStore().load();
                	}
                },
                failure: function(form, action) {
                    MessageBox.show(false, action.result.msg);
                    me.winformByXML.close();
                }
            });
        }
	},
	
	
	//底部面板
    createBottomPanel: function(){
    	this.bottompanel = Ext.create('Ext.panel.Panel',{
    		region: 'center',
    		layout: 'border',
    		border: false,
    		items:[this.createGridPanel(),this.createTabPanel()]
    	});
    	return this.bottompanel;
    },
    //顶部面板
    createTopPanel: function(){
    	var me = this;
    	this.toppanel = Ext.create('Ext.panel.Panel',{
    		region: 'north',
    		layout: 'border',
    		height: 100,
    		border: false,
    		listeners:{
	            render:function(p){
	                p.getEl().on("contextmenu",function(e){
	                	me.createContextMenu(e);
	                },me)
	            }
            },
    		items:[this.createBtnPanel(),this.createSelPanel()]
    	});
    	return this.toppanel;
    },
    //顶部按钮面板
    createBtnPanel: function(){
    	var me = this;
    	this.btnpanel = Ext.create('Ext.form.Panel',{
    		region: 'center',
    		frame: true,
    		border: false,
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
                    //disabled:true,
                    handler: me.onDelete
                },
                {
                    iconCls: 'icon-save',
                    itemId: 'save',
                    text: '保存',
                    scope: this,
                    handler: me.saveStorer
                },
                {
                    iconCls: 'icon-upload',
                    text: '导入Excel',
                    //handler: me.onImport,
					handler: function(){
                        me.createFormByExcel();
                        me.winformByExcel.show();
                    },
                    scope: this
                },
				{
                    iconCls: 'icon-upload',
                    text: '导入TXT',
					handler: function(){
                        me.createFormBytxt();
                        me.winformBytxt.show();
                    },
                    scope: this
                },
				{
                    iconCls: 'icon-upload',
                    text: '导入XML',
					handler: function(){
                        me.createFormByXML();
                        me.winformByXML.show();
                    },
                    scope: this
                }
            ]
    	});
    	return this.btnpanel;
    },
    //顶部查询面板
    createSelPanel: function(){
    	var me = this;
    	this.selpanel = Ext.create('Ext.form.Panel',{
    		region: 'north',
    		frame: true,
    		layout: 'hbox',
    		border: false,
    		height: 50,
    		defaults: {
    			xtype: 'textfield'
    		},
    		items:[
                {
                    xtype: 'textfield',
                    labelWidth: 35,
                    name: 'storerKey',
                    fieldLabel: '货主',
                    listeners:{
                        blur:function(txt){
                          txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                        }
                    }
                },
                {
                    xtype: 'codecombo',
                    codeType: 'STORERTYPE',
                    //xtype: 'textfield',
                    name: 'type',
                    labelWidth: 35,
                    fieldLabel: '类型'
                },
                {
                    name: 'company',
                    labelWidth: 35,
                    xtype: 'textfield',
                    fieldLabel: '公司'
                },                
                {
                    name: 'descr',
                    labelWidth: 35,
                    xtype: 'textfield',
                    fieldLabel: '描述'
                },
                {
                    xtype: 'button',
                     handler: me.onSelect,
                    scope: this,
                    iconCls: 'icon-search',
                    text: '查询'
                },
                {
                    xtype: 'button',
                    handler: me.onReset,
                    scope: this,
                    iconCls: 'icon-reset',
                    text: '重置'
                }
            ]
    	});
    	return this.selpanel;
    },
    //底部GRID
    createGridPanel:function(){
    	var me = this;
    	this.gridPanel = Ext.create('widget.storergrid',{
			region: 'center',
			listeners: {
				itemclick: function(grid,record){
					me.basicForm.getForm().loadRecord(record);
					me.customerForm.getForm().loadRecord(record);
					me.clForm.getForm().loadRecord(record);
					me.otherForm.getForm().loadRecord(record);
                    //加载时设置为只读，不能修改
                    me.basicForm.getForm().findField('storerKey').setReadOnly(true);
				}
			}
		});
		this.gridPanel.getStore().on('beforeload',function(){
    		var params = this.gridPanel.getStore().getProxy().extraParams;
    		var record = me.selpanel.getForm().getValues();
    		
    		var storerKey = record.storerKey;
    		var type = record.type;
    		var company = record.company;
    		var descr = record.descr;
    		
			delete params.storerKey;
			delete params.type;
			delete params.company;
			delete params.descr;
    		
			if(storerKey) params.storerKey = storerKey;
         	if(type) params.type = type;
         	if(company) params.company = company;
         	if(descr) params.descr = descr;
    	},this);
		return this.gridPanel;
    },
    //底部右边TAB
    createTabPanel:function(){
    	var me = this;
    	this.tabPanel = Ext.create('Ext.tab.Panel',{
    		region:'east',
    		//width:700,
            width:'35%',
			xtype:'tabpanel',
			layout: 'fit',
			split: true,
			collapsible: true,
			tabPosition: 'bottom',
			items:[this.createBasicForm(),this.createCustomerForm(),this.createCLForm(),this.createOtherForm()]
    	});
    	return this.tabPanel;
    },
    
    
    //底部TAB主信息
    createBasicForm: function(){
    	var me = this;
        var myStore=Ext.create('Ext.data.Store', {
                                autoLoad: true,   //这里必须先load，否则下拉时再load一次，之前加的参数查询结果就被覆盖了。
                                fields: [
                                    {name:'pdescr'},
                                    {name:'pdescr'}
                                ],
                                proxy: {
                                    type: 'ajax',
                                    url: basePath + '/support/doQueryStorerProvince.action',    //这里不加查询参数
                                    reader: {type: 'json',root: 'json.data',totalProperty: 'json.totalCount'},
                                    actionMethods: { read: 'POST' },
                                    simpleSortMode: true
                                }
                                //mode:'remote',    //没有看到作用
                            });
         
        var my1Store=Ext.create('Ext.data.Store', {
                                autoLoad: true,   //这里必须先load，否则下拉时再load一次，之前加的参数查询结果就被覆盖了。
                                fields: [
                                    {name:'cdescr'},
                                    {name:'cdescr'}
                                ],
                                proxy: {
                                    type: 'ajax',
                                    url: basePath + '/support/doQueryStorerCity.action',    //这里不加查询参数
                                    reader: {type: 'json',root: 'json.data',totalProperty: 'json.totalCount'},
                                    actionMethods: { read: 'POST' },
                                    simpleSortMode: true
                                }
                                //mode:'remote',    //没有看到作用
                         });
         var my2Store=Ext.create('Ext.data.Store', {
                                autoLoad: true,   //这里必须先load，否则下拉时再load一次，之前加的参数查询结果就被覆盖了。
                                fields: [
                                    {name:'codescr'},
                                    {name:'codescr'}
                                ],
                                proxy: {
                                    type: 'ajax',
                                    url: basePath + '/support/doQueryStorerCounty.action',    //这里不加查询参数
                                    reader: {type: 'json',root: 'json.data',totalProperty: 'json.totalCount'},
                                    actionMethods: { read: 'POST' },
                                    simpleSortMode: true
                                }
                                //mode:'remote',    //没有看到作用
                         });
    	this.basicForm = Ext.create('Ext.form.Panel',{
			xtype:'form',
			frame:true,
			title:'主信息',
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
	                labelWidth: 60,
	                margin: '5 0 0 10',
	                labelAlign: 'top',
	                xtype: 'textfield',
	                flex:1
                },
                items: [
                	{
                        fieldLabel: '货主',
                        name: 'storerKey',
                        listeners:{
                            blur: function(txt){
                                //输入参数，鼠标离开后见检查该货主是否存在
                                storerKeyValue= Ext.util.Format.uppercase(txt.getValue());
                                txt.setValue(storerKeyValue);
                                Ext.Ajax.request({
                                    url: basePath + '/support/doValidateStorers.action',
                                    params: {
                                        storerKey:storerKeyValue
                                    },
                                    success: function(response){    //failure属于连不上服务器的情况，后续补充
                                        var text = Ext.decode(response.responseText);
                                        var success = text.success;
                                        if(0 != text.json.data.length)
                                        {
                                            me.basicForm.getForm().findField('storerKey').setValue('');
                                            Ext.Msg.alert("错误提示", '重复，请重新输入');
                                        }
                                    }
                                })
                            }                        
                        },
                        allowBlank: false
                    },
	            	{fieldLabel: '类型',name: 'type',xtype: 'codecombo',codeType: 'STORERTYPE'},
	            	{name : 'id',xtype: 'hidden'},
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
	                labelAlign: 'top',
	                margin: '0 0 0 10',
	                xtype: 'textfield',
	                flex: 1
                },
                items: [
	            	{
                        name: 'descr',
                        fieldLabel: '描述',
                        labelWidth: 60},
	            	{   
                        name: 'company',
                        fieldLabel: '公司',
                        labelWidth: 60
                    },
	            	{xtype: 'hidden'}
            	]
            },{
                layout: 'hbox',
                defaults:{
	                labelWidth: 60,
	                labelAlign: 'top',
	                margin: '0 0 0 10',
	                xtype: 'combobox',
	                flex:1
                },
                items: [
                            {
                                id:'nation',
                                fieldLabel: '国家',
                                selecOnFocus:true,
                                lastQuery: '',  //解决有时鼠标多点一次的问题
						    	forceSelection:true,
                                xtype:'nationcombo',
                                emptyText:'请选择国家',
                                name: 'nation',
                                listeners: {   
                               	 	expand : function(){
                                        nationKeyValue=me.basicForm.getForm().findField('nation').getValue();
                                        myStore.load({params:{nationKey:nationKeyValue}});
                                    }, 
                                    blur: function(txt){
                                        nationKeyValue=txt.getValue();
                                        if(''!=nationKeyValue)
                                        {
                                            Ext.Ajax.request({
                                                url: basePath + '/support/doQueryStorerProvince.action',
                                                params: {
                                                    nationKey:nationKeyValue
                                                },
                                                success: function(response){    //failure属于连不上服务器的情况，后续补充
                                                    var text = Ext.decode(response.responseText);
                                                    var success = text.success;
                                                    if(0 != text.json.data.length)
                                                    {
                                                        myStore.load({params:{nationKey:nationKeyValue}})
                                                    }
                                                    else
                                                    {
                                                        me.basicForm.getForm().findField('province').setValue('');
                                                        me.basicForm.getForm().findField('city').setValue('');
                                                        me.basicForm.getForm().findField('county').setValue('');
                                                    }
                                                }
                                            })
                                        }
                                    }
                                },
                                //allowBlank: false,                                
                                width: 160
                            },
                            {
                            	id:'province',
                                fieldLabel: '省份',
                                emptyText:'请选择省份',
                                name: 'province',
                                xtype:'combobox',
                                triggerAction:'all',
                                store:myStore,
                                displayField: 'pdescr',
                                valueField: 'pdescr',         
                                //allowBlank: false, 
                                lastQuery: '',  //解决有时鼠标多点一次的问题
                                listeners: {   
                                   expand : function(){
                                        nationKeyValue=me.basicForm.getForm().findField('nation').getValue();
                                        my1Store.load({params:{nationKey:nationKeyValue}});
                                    },      	
									blur: function(txt){
                                        var provinceKeyValue=txt.getValue();  
                                       if(''!=provinceKeyValue)
                                        {   
                                        	console.log(provinceKeyValue);
                                            Ext.Ajax.request({
                                                url: basePath + '/support/doQueryStorerCity.action',
                                                params: {
                                                    provinceKey:provinceKeyValue
                                                },
                                                success: function(response){    //failure属于连不上服务器的情况，后续补充
                                                    var text = Ext.decode(response.responseText);
                                                    var success = text.success;
                                                    if(0 != text.json.data.length)
                                                    {
                                                        my1Store.load({params:{provinceKey:provinceKeyValue}})
                                                    }
                                                    else
                                                    {
                                                        me.basicForm.getForm().findField('city').setValue('');
                                                        me.basicForm.getForm().findField('county').setValue('');
                                                    }
                                                }
                                            })
                                        }
									}
                                }								
                            },
	            	{
	            	name: 'city',
	            	fieldLabel: '城市',
	            	emptyText:'请选择城市',
	            	xtype: 'citycombo',
	            	lastQuery: '',  //解决有时鼠标多点一次的问题
	            	store:my1Store,
	            	listeners: {    
	            					expand : function(){
                                        provinceKeyValue=me.basicForm.getForm().findField('province').getValue();
                                        my2Store.load({params:{provinceKey:provinceKeyValue}});
                                    },   
									blur: function(txt){
                                        var cityKeyValue=txt.getValue();  //需要根据description反查数量，然后再计算 qxue
                                       if(''!=cityKeyValue)
                                        {
                                            Ext.Ajax.request({
                                                url: basePath + '/support/doQueryStorerCounty.action',
                                                params: {
                                                    cityKey:cityKeyValue
                                                },
                                                success: function(response){    //failure属于连不上服务器的情况，后续补充
                                                    var text = Ext.decode(response.responseText);
                                                    var success = text.success;
                                                    if(0 != text.json.data.length)
                                                    {
                                                        my2Store.load({params:{cityKey:cityKeyValue}})
                                                    }
                                                    else
                                                    {
                                                        me.basicForm.getForm().findField('county').setValue('');
                                                    }
                                                }
                                            })
                                        }
									}
                                },	
	            	displayField: 'cdescr',
                    valueField: 'cdescr'  
	            	},
	            	{
	            	name: 'county',
	            	emptyText:'请选择县区',
	            	lastQuery: '',  //解决有时鼠标多点一次的问题
	            	fieldLabel: '县区',
	            	store:my2Store,
	            	displayField: 'codescr',
                    valueField: 'codescr'  
	            	}
            	]
            },{
                layout: 'hbox',
                defaults:{
	                labelWidth: 60,
	                margin: '0 0 0 10',
	                labelAlign: 'top',
	                xtype: 'textfield',
	                flex:1
                },
                items: [
	            	{name: 'address1',fieldLabel: '地址' },
	                {name: 'address2',fieldLabel: '-' }
            	]
            },{
                layout: 'hbox',
                defaults:{
	                labelWidth: 60,
	                labelAlign: 'top',
	                flex:1,
	                margin: '0 0 0 10',
	                xtype: 'textfield'
                },
                items: [
                	{name: 'contact',fieldLabel: '联系人' },
                	{name: 'mobile',fieldLabel: '手机',maxLength: 11, minLength: 11},
                	{name: 'tel',fieldLabel: '电话'}
                ]
            },{
                layout: 'hbox',
                defaults:{
	                labelWidth: 60,
	                labelAlign: 'top',
	                flex:1,
	                margin: '0 0 0 10',
	                xtype: 'textfield'
                },
                items: [
                	{name: 'position',fieldLabel: '职务' ,maxLength: 20},
                	{name: 'fax',fieldLabel: '传真'/* ,maxLength: 8, minLength: 8*/},  //传真号码需要根据地区做调整，建议以后不做限制
                	//{name: 'email',fieldLabel: '邮箱' ,vtype:'email',maxLength: 30,labelWidth: 60}
                    {name: 'email',fieldLabel: '邮箱' ,xtype:'textfield',maxLength: 199,labelWidth: 60}
                ]
            },{
                layout: 'hbox',
                defaults:{
	                labelWidth: 60,
	                labelAlign: 'top',
	                flex:1,
	                margin: '10 0 0 10',
	                xtype: 'textfield'
                },
                items: [
                		 {
                            boxLabel: '是否发送邮件',
                            xtype: 'checkbox',
                            name: 'mailSend',
                            inputValue: 1,
                            uncheckedValue:0
                        }
                ]
            }]
    	});
    	return this.basicForm;
    },
    //底部TAB控制信息
    createCustomerForm: function(){
    	this.customerForm = Ext.create('Ext.form.Panel',{
			xtype:'form',
			frame:true,
			headerPosition: 'bottom',
			title:'控制信息',
	        autoHeight: true,
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
                    defaults:{
                        labelWidth: 90,
                        flex: 1,
                        labelAlign: 'top',
                        margin: '10 0 0 10',
                        xtype: 'combobox'
                    },
                    items: [
                        {   //取值自装箱表
                            fieldLabel: '默认装箱组',
                            name: 'cartonKey',
                            xtype:'cartoncombo'
                            //allowBlank:false,
                            //value:'STD'
                        }, 
                        {  //取值自包装表
                            fieldLabel: '默认包装',
                            name: 'packKey',
                            xtype:'packcombo',
                            allowBlank:false,
                            value:'STD'
                        },
                        { //取值自上架策略主表
                            fieldLabel: '默认上架策略',
                            xtype: 'putawaystrategycombo',
                            name: 'putawayStrategyKey',
                            allowBlank:false,
                            value:'STD'
                        } 
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 90,
                        flex: 1,
                        labelAlign: 'top',
                        margin: '2 0 0 10',
                        xtype: 'combobox'
                    },
                    items: [
                        {fieldLabel: '库位指定方式',xtype: 'codecombo',codeType: 'LOCGEN',labelWidth: 100,name: 'locGenerate'},   //取值自数据字典
                        {
                            fieldLabel: '默认批校验',
                            xtype: 'lotvalidatecombo',
                            name: 'lotKey',
                            allowBlank:false,
                            value:'STD'
                        },
                        { //取值自库存周转策略主表
                            fieldLabel: '默认周转策略',   
                            xtype: 'rotationstrategycombo',
                            labelWidth: 100,
                            name: 'rotationStrategyKey',
                            allowBlank:false,
                            value:'STD'
                        }
                    ]
                },
                {
                    
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 90,
                        flex: 1,
                        labelAlign: 'top',
                        margin: '2 0 0 10',
                        xtype: 'combobox'
                    },
                    items: [
                        {
                            fieldLabel: '默认预分配策略',
                            xtype: 'preallocatestrategycombo',
                            name: 'preAllocationStrategyKey',
                            allowBlank:false,
                            value:'STD'
                        },
                        {   
                            fieldLabel: '默认分配策略',
                            xtype: 'allocationstrategycombo',
                            labelWidth: 100,
                            name: 'allocationStrategyKey',
                            allowBlank:false,
                            value:'STD'
                        },
                        {
                            fieldLabel: '默认补货策略',
                            xtype: 'replenishmentstrategycombo',
                            name: 'replenishmentStrategyKey',
                            allowBlank:false,
                            value:'STD'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        flex: 1,
                        labelAlign: 'top',
                        margin: '2 0 0 10',
                        labelWidth: 90,
    //	                xtype: 'combobox'
                        xtype: 'combobox'
                    },
                    items: [
                        {fieldLabel: '路线',labelWidth: 100,name: 'route'}
                    ]
                }
            ]
    	});
    	return this.customerForm;
    },
	//底部TAB费用结算
	createCLForm:function(){
		this.clForm = Ext.create('Ext.form.Panel',{
			xtype:'form',
			frame:true,
			headerPosition: 'bottom',
			title:'费用结算',
	        autoHeight: true,
	        bodyPadding: 1,
	        defaults: {
	        	xtype: 'fieldcontainer',
                hideLabel: true,
	            anchor: '100%',
	            labelWidth: 100
	        },
	        items: [{
                layout: 'hbox',
                defaults:{
	                labelWidth: 60,
	                flex: 1,
	                labelAlign: 'top',
	                margin: '10 0 0 10',
	                xtype: 'textfield'
                },
                items: [
                	{fieldLabel: '税号',name: 'duty'},
                	{fieldLabel: '银行帐号',name: 'bankingAccount'},
                	{fieldLabel: '结算日期',xtype: 'datefield',format:'Y-m-d H:i',name: 'dateClosing'}
                ]
            },{
                layout: 'hbox',
                defaults:{
	                labelWidth: 60,
	                flex: 1,
	                labelAlign: 'top',
	                margin: '2 0 0 10',
	                xtype: 'textfield'
                },
                items: [
                	{fieldLabel: '体积重量计算方式',xtype: 'codecombo',codeType: '',labelWidth: 100,name: 'chargeType'},   //codeType待定义
                	{fieldLabel: '费用代码',xtype: 'combobox',name: 'chargeKey'},   //暂时没有费用相关的表，暂不支持
//                	{fieldLabel: '包仓面积',xtype: 'codecombo',codeType: 'AREACHARTYPE',name: 'warehouseArea'}   //临时在数据字典增加字段，后续根据需要修改
                	{fieldLabel: '包仓面积',name: 'warehouseArea'}   //临时在数据字典增加字段，后续根据需要修改
            	]    
            },{
                layout: 'hbox',
                defaults:{
	                labelWidth: 60,
	                flex: 1,
	                labelAlign: 'top',
	                margin: '2 0 0 10',
	                xtype: 'combobox'
                },
                items: [
                	{fieldLabel: '包仓计费方式',labelWidth: 80,xtype: 'combobox',name: 'areachargeType'},
                	{fieldLabel: '入/出库计费级别',labelWidth: 100,name: 'chargeRank'},  //暂不支持
                	{fieldLabel: '包仓费用',xtype: 'textfield',name: 'areaCharge'}
                ]
            },{
                layout: 'hbox',
                defaults:{
	                labelWidth: 60,
	                flex: 1,
	                labelAlign: 'top',
	                margin: '2 0 0 10',
	                xtype: 'combobox'
                },
                items: [
                	{fieldLabel: '体积单位',xtype: 'codecombo',codeType: 'CUBEUOM',labelWidth: 80,name: 'cubeUom'},
                	{fieldLabel: '库存计费级别',xtype: 'codecombo',codeType: '',labelWidth: 100,name: 'invchargeRank'},  //暂未实现
                	{fieldLabel: '重量单位',xtype: 'codecombo',codeType: 'WGTEUOM',name: 'wgtUom'}
                ]
            },{
                layout: 'hbox',
                defaults:{
	                labelWidth: 60,
	                flex: 1,
	                labelAlign: 'top',
	                margin: '2 0 0 10',
                    inputValue:1,
	                xtype: 'checkbox'
                },
                items: [
                	{boxLabel: '出库时结算库存费',labelWidth: 100,width: 150,name: 'isOutboundInvcharge'},
                	{boxLabel: '包仓',labelWidth: 30,width: 50,margin: '2 0 0 0',name: 'isArea'}
                ]
            }]
	    });
	    return this.clForm;
	},	
	//底部TAB其他
	createOtherForm: function(){
		this.otherForm = Ext.create('Ext.form.Panel',{
			xtype:'form',
			frame:true,
			headerPosition: 'bottom',
			title:'其他',
        	stripeRows : true,
			autoScroll : true,
			viewConfig : {
				forceFit: true,
				autoFill: true
			},
	        defaults: {
	        	xtype: 'fieldcontainer',
                hideLabel: true,
	            anchor: '100%',
	            labelWidth: 100
	        },
	        items: [{
                layout: 'hbox',
                defaults:{
	                labelWidth: 60,
	                flex: 1,
	                labelAlign: 'top',
	                margin: '10 0 0 10',
	                xtype: 'textfield'
                },
                items: [
                	{fieldLabel: '结算方',xtype: 'storercombo',name: 'billto'},
                	{fieldLabel: '承运人',xtype: 'storercombo', name: 'carrier'},
                	{fieldLabel: '单证前缀',labelWidth:70,name: 'prefix'}
                ]
            },{
                layout: 'hbox',
                defaults:{
	                labelWidth: 60,
	                flex: 1,
	                labelAlign: 'top',
	                margin: '2 0 0 10',
	                xtype: 'textfield'
                },
                items: [
                	{fieldLabel: '入库标签',labelWidth:70,name: 'asnLabel'},
                	{fieldLabel: '出库标签',name: 'soLabel'},
                	{fieldLabel: '币种',xtype: 'codecombo',codeType: 'CURRENCY',name: 'currency'}
                ]
            },{
                layout: 'hbox',
                defaults:{
	                labelWidth: 60,
	                flex: 1,
	                labelAlign: 'top',
	                margin: '2 0 0 10',
	                xtype: 'textfield'
                },
                items: [
                	{fieldLabel: '默认收货单位',xtype: 'codecombo',codeType: 'PACKUOM',name:'asnUom'},
                	{fieldLabel: '发货复制项',name:'soCopy'},
                	{fieldLabel: '收货复制项',labelWidth: 100,name: 'asnCopy'}
                ]
            },{
                layout: 'hbox',
                defaults:{
	                labelWidth: 60,
	                flex: 1,
	                labelAlign: 'top',
	                margin: '2 0 0 10',
	                xtype: 'textfield'
                },
                items: [
                	{fieldLabel: '默认出库单位',xtype: 'codecombo',codeType: 'PACKUOM',labelWidth: 100,name: 'soUom'},
                	{fieldLabel: '超额收货百分比(%)',labelWidth: 120,name: 'excessRate'}
                ]
            },{
                layout: 'hbox',
                defaults:{
	                labelWidth: 60,
	                flex: 1,
	                labelAlign: 'top',
	                margin: '2 0 0 10',
	                xtype: 'textfield'
                },
                items: [
                	{fieldLabel: '备注',labelWidth:70,name: 'notes'}
                ]
            },{
                layout: 'hbox',
                defaults:{
	                labelWidth: 60,
	                flex: 1,
	                labelAlign: 'top',
	                margin: '2 0 0 10',
	                xtype: 'textfield'
                },
                items: [  
                	{fieldLabel: '自定义1',name: 'userDefine1'},
                	{fieldLabel: '自定义2',name: 'userDefine2'},
                	{fieldLabel: '自定义3',name: 'userDefine3'}
                ]
            },{
                layout: 'hbox',
                defaults:{
	                labelWidth: 60,
	                flex: 1,
	                labelAlign: 'top',
	                margin: '2 0 0 10',
	                xtype: 'textfield'
                },
                items: [  
                	{fieldLabel: '自定义4',name: 'userDefine4'},
                	{fieldLabel: '自定义5',name: 'userDefine5'},
                	{fieldLabel: '',xtype: 'hidden'}
                ]
            },{
                layout: 'vbox',
                defaults:{
	                labelWidth: 290,
	                labelAlign: 'top',
	                margin: '2 0 0 10',
                    inputValue:1,
	                xtype: 'checkbox'
                },
                items: [
                   	{boxLabel: '一步到位分配',name: 'putAllocate'},
                	{boxLabel: '允许超量收货',name: 'excessAllowable'},
                	{boxLabel: 'ASN关闭时要求必须已经导入序列号',name: 'mustAsn'},
                	{boxLabel: 'SO关闭时要求必须已经导入序列号',name: 'mustSo'},
                	{boxLabel: 'SO中导入的序列号必须是ASN中已经导入的序列号',name: 'mustAsnSo'},
                	{boxLabel: 'ASN导入时自动把不存在的产品信息写入产品档案',name: 'autoSku'},
                	{boxLabel: 'ASN/SO导入时自动把不存在的货主信息导入货主档案',name: 'autoStorer'}
                ]          
            }]
	    });
	    return this.otherForm;
	},
	saveStorer: function(){
    	var me = this;
        
    	var basicform = this.basicForm.getForm();
    	var customerform = this.customerForm.getForm();
    	var clform = this.clForm.getForm();
    	var otherform = this.otherForm.getForm();
    	
    	var values1 = basicform.getValues();
    	var values2 = customerform.getValues();
    	var values3 = clform.getValues();
    	var values4 = otherform.getValues();
    	
    	if(!(basicform.isValid())||!(customerform.isValid())||!(clform.isValid())||!(otherform.isValid())) return;
    	Ext.Ajax.request({
		    url: basePath + '/support/doSaveStorers.action',
		    params: {
		        storerKey: values1.storerKey,
		        type: values1.type,
		        id: values1.id,
		        descr: values1.descr,
		        company: values1.company,
		        nation: values1.nation,
		        province: values1.province,
		        city: values1.city,
		        county: values1.county,
		        address1: values1.address1,
		        address2: values1.address2,
		        contact: values1.contact,
		        mobile: values1.mobile,
		        tel: values1.tel,
		        position: values1.position,
		        fax: values1.fax,
		        email: values1.email,
		        mailSend: values1.mailSend,
                addDate: values1.addDate,
                addWho: values1.addWho,
		        
		        cartonKey: values2.cartonKey,
		        packKey: values2.packKey,
		        putawayStrategyKey: values2.putawayStrategyKey,
		        locGenerate: values2.locGenerate,
		        lotKey: values2.lotKey,
		        rotationStrategyKey: values2.rotationStrategyKey,
		        preAllocationStrategyKey: values2.preAllocationStrategyKey,
		        allocationStrategyKey: values2.allocationStrategyKey,
		        replenishmentStrategyKey: values2.replenishmentStrategyKey,
		        route: values2.route,
		        
		        duty: values3.duty,
		        bankingAccount: values3.bankingAccount,
		        dateClosing: values3.dateClosing,
		        chargeType: values3.chargeType,
		        chargeKey: values3.chargeKey,
		        warehouseArea: values3.warehouseArea,
		        areachargeType: values3.areachargeType,
		        chargeRank: values3.chargeRank,
		        areaCharge: values3.areaCharge,
		        cubeUom: values3.cubeUom,
		        invchargeRank: values3.invchargeRank,
		        wgtUom: values3.wgtUom,
		        isOutboundInvcharge: values3.isOutboundInvcharge,
		        isArea: values3.isArea,
		        
		        billto: values4.billto,
		        carrier: values4.carrier,
		        prefix: values4.prefix,
		        asnLabel: values4.asnLabel,
		        putAllocate: values4.putAllocate,
		        soLabel: values4.soLabel,
		        currency: values4.currency,
		        asnUom: values4.asnUom,
		        soCopy: values4.soCopy,
		        asnCopy: values4.asnCopy,
		        soUom: values4.soUom,
		        excessAllowable: values4.excessAllowable,
		        excessRate: values4.excessRate,
		        notes: values4.notes,
		        userDefine1: values4.userDefine1,
		        userDefine2: values4.userDefine2,
		        userDefine3: values4.userDefine3,
		        userDefine4: values4.userDefine4,
		        userDefine5: values4.userDefine5,
		        mustAsn: values4.mustAsn,
		        mustSo: values4.mustSo,
		        mustAsnSo: values4.mustAsnSo,
		        autoSku: values4.autoSku,
		        autoStorer: values4.autoStorer
		    },
		    success: function(response){
		        var text = Ext.decode(response.responseText);
		        var success = text.success;
		        MessageBox.show(success, text.json.msg);
                if(success)
                {
                    me.gridPanel.getStore().load();
                    basicform.reset();
                    customerform.reset();
                    clform.reset();
                    otherform.reset();
                }
		    }
		});
    }
    
});


Ext.onReady(function(){
	Ext.create('Ext.container.Viewport', {
	    layout: 'border',
	    items: [{
	    	xtype:'storermanager',
	    	region:'center'
	    }]
	});
});