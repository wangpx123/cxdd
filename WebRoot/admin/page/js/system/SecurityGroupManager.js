Ext.define('SecutiryGroup', {
    extend: 'Ext.data.Model',
    fields: [
		{name:'id'},
		{name:'name'},
		{name:'state'},
		{name:'remark'}
	],
    idProperty: 'id'
});

Ext.define('Redm.view.system.permission.SecurityGroupManager', {
    extend: 'Redm.BaseGrid',
    alias : 'widget.securitygroupmanager',
    title: '权限组管理',
	iconCls: 'icon-win',
    loadMask: true,
    forceLayout:true,
    dockedItems: [],
    buildColumns: function(){
        this.columns = [
			{ header: "id", dataIndex: 'id', width: 60, hidden: true, id: 'id'},
		    { header: "角色名称", dataIndex: 'name', width: 200, sortable: true},
		    { header: "状态", dataIndex: 'state', width: 150, sortable: true,align:'left',
		    renderer:function(v){
		    	if(v == 'Y') return '<font color="green">启用</font>'; else return '<font color="red">作废</font>';
		    }},
		    { header: "角色描述", dataIndex: 'remark', flex: 1,sortable: true}
		];
		return true;
    },
	buildDockedItems: function(){
		this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                iconCls: 'icon-create',
                text: '创建',
                scope: this,
                handler: this.onCreate
            },'-',{
                iconCls: 'icon-update',
                itemId: 'save',
                text: '修改',
                disabled: true,
                scope: this,
                handler: this.onUpdate
            },'-',{
                iconCls: 'icon-reset',
                text: '分配权限',
                scope: this,
                disabled: true,
                handler: this.onPermission
            }]
        },{
	        xtype: 'pagingtoolbar',
	        store: this.store,   // same store GridPanel is using
	        dock: 'bottom',
	        displayInfo: true
	    }];
	},
    initComponent: function(){
    	this.buildStore(basePath + '/system/doQuerySecurityGroups.action','SecutiryGroup',20);
        this.callParent(arguments);
        this.on("itemclick",function(grid,rowIndex){
			var ttl = this.down('toolbar');
			ttl.getComponent(2).enable();//修改
			ttl.getComponent(4).enable();//分配权限
		},this);
        this.on('itemdblclick',this.onUpdate);
        this.on('itemclick',function(view,record){
			var ttl = this.down('toolbar');
			ttl.getComponent(2).enable();
			ttl.getComponent(4).enable();
		},this);
		this.store.on('load',function(){
			var ttl = this.down('toolbar');
			ttl.getComponent(2).disable();
			ttl.getComponent(4).disable();
		},this);
    },
    
    onPermission: function(){
    	var record = this.getSelectionModel().getSelection()[0];
		if (!record) {
			MessageBox.error("提示信息","请先选择要操作的数据！");
			return false;
		}
		var id = record.get("id");
    	this.showPermissionWindow(id);
    },
    showPermissionWindow: function(id){	
		if (!this.permissionWin) {
			this.permissionWin = this.createPermissionWindow(id);
			this.permissionWin.on("close", function() {
				delete this.permissionWin;
				delete this.treePanel;
				delete this.treeGrid;
			}, this);
		}
		this.permissionWin.show();
	},
	createPermissionWindow: function(id){
		this.createTreePanel(id);
		this.createTreeGrid(id);
		return Ext.create('widget.window',{
			width : 800,
			height : 480,
			iconCls: 'icon-win',
			title : "权限分配",
			modal : true,
			border:false,
			closable :true,
			maximizable :true,
			shadow : true,
			layout : 'border',
			items : [this.treePanel,this.treeGrid]
		});
	},
	createTreeGrid: function(id){
		var me = this;
		var gridstore = Ext.create('Ext.data.TreeStore', {
	        fields: ['text','id','remark'],
	        proxy: {
	            type: 'ajax',
	            url: basePath + '/system/doQueryAssignPermissions.action?groupId=' + id
	        },
	        folderSort: true
	    });
	    this.treeGrid = Ext.create('Ext.tree.Panel', {
	        region: 'center',
	        useArrows: true,
	        rootVisible: false,
	        store: gridstore,
	        multiSelect: true,
	        root: {
		        text: "Root node",
		        expanded: true
		     },
	        //singleExpand: true,
	        columns: [{
	            xtype: 'treecolumn', 
	            text: '菜单名称',
	            flex: 1,
	            sortable: true,
	            dataIndex: 'text'
	        },{
	            text: '菜单描述',
	            flex: 1,
	            dataIndex: 'remark',
	            sortable: true
	        }],
	        dockedItems: [{ 
	            xtype: 'toolbar', 
	            items: ['<font color="blue">已分配权限</font>','->',{
	            	text:'刷新',
	            	scope: this,
	            	iconCls: 'icon-refresh',
	            	handler: function(b){
	            		b.disable();
	            		var myMask = new Ext.LoadMask(me.treeGrid.getEl(), {msg:"Please wait..."});
	            		gridstore.load();
	            		myMask.hide();
	            		setTimeout(function() {
							b.enable();
						}, 5000);
	            	}
	            }]
	            
	        }]
	    });
	    return this.treeGrid;
	},
	createTreePanel: function(id){
		var me = this;
	    var treestore = Ext.create('Ext.data.TreeStore', { 
	    	fields: ['text','id','parentId'],
	        proxy: { 
	            type: 'ajax', 
	            url: basePath + '/system/doQueryAllPermissions.action?groupId=' + id
	        }, 
	        folderSort: true
	    }); 
	    this.treePanel = Ext.create('Ext.tree.Panel', { 
	        store: treestore, 
	        loadMask:true,
	        rootVisible: false, 
	        //useArrows: true, 
	        frame: false, 
	        border: true,
	        split: true,
	        region: 'west',
	        width: 260,
	        dockedItems: [{ 
	            xtype: 'toolbar', 
	            items: ['<font color="green">所有权限列表</font>','->',{
	            	text: '重置', 
	            	iconCls: 'icon-reset',
	            	scope: this,
	                handler: function(b){
	                	b.disable();
	                	treestore.load();
	                	setTimeout(function() {
							b.enable();
						}, 5000);
	                }
	            },'-',{ 
	                text: '保存', 
	                iconCls: 'icon-save',
	                scope: this,
	                disabled: true,
	                handler: function(){ 
	                	var treeGrid = this.treeGrid;
	                	var myMask = new Ext.LoadMask(this.permissionWin.getEl(), {msg:"Please wait..."});
						myMask.show();
	                    var records = me.treePanel.getView().getChecked(), ids   = []; 
	                    Ext.Array.each(records, function(rec){ 
	                        ids.push(rec.get('id')); 
	                    }); 
	                    
	                    Ext.Ajax.request({
						    url: basePath + '/system/doSaveSecurityGroupPermissions.action',
						    //timeout: 60000,
						    params: {
						        permissionIds: ids,
						        groupId: id
						    },
						    success: function(response){
						        var data = Ext.decode(response.responseText);
			                    MessageBox.show(data.success,data.json.msg);
			                    myMask.hide();
			                    treeGrid.getStore().load();
						    },
						    failure: function(response, opts) {
						    	var data = Ext.decode(response.responseText);
						    	Ext.MessageBox.show({ 
				                    title: '错误提示', 
				                    msg: data.json.msg, 
				                    icon: Ext.MessageBox.ERROR
				                }); 
						        myMask.hide();
						    }
						});
	                } 
	            }]
	        }]
	    }); 
	    
	    treestore.on('beforeload',function(){
	    	this.getEl().mask('Expanding tree...');
	    },this.treePanel);
	    treestore.on('load',function(){
	    	var ttl = this.down('toolbar');
	    	var btnSave = ttl.getComponent(4);
	    	btnSave.enable();
	    	this.getEl().unmask();
	    },this.treePanel);
	    this.treePanel.on('checkchange',function(node, checked){
        	node.expand();   
		    node.checked = checked; 
		    if(checked){
		    	var parent = node.parentNode,parentId = node.data.parentId;
		    	if(parent != null && parentId != "root"){
		    		if(!parent.get('checked')){
			    		parent.auto = true;
			    		parent.set('checked', checked);
			    		this.fireEvent('checkchange', parent, checked);
		    		}
		    	}
	    		if(!node.auto){
	    			node.eachChild(function (child) {   
				        child.set('checked', checked);   
				        this.fireEvent('checkchange', child, checked);   
				   	},this);  
	    		}
		    }else{
		    	node.collapse();
		    	node.auto = false
			    node.eachChild(function (child) {   
			        child.auto = false;
			        child.set('checked', checked); 
			        this.fireEvent('checkchange', child, checked);   
			   	},this);
			   	// 
		    	var parent = node.parentNode,parentId = node.data.parentId;
		    	if(parent != null && parentId != "root"){
		    		var hasSelect = false;
		    		parent.auto = false;
			    	parent.eachChild(function (child) {   
				        child.auto = false;
				        //child.set('checked', checked); 
				        //this.fireEvent('checkchange', child, checked);  
				        if(child.get('checked')){
				        	hasSelect = true;
				        }
				   	},this); 
				   	if(!hasSelect){
				   		 parent.set('checked', false); 
				   		 parent.collapse();
				   		 //this.fireEvent('checkchange', parent, false);  
				   	}
		    	}
		    }
    	},this.treePanel);
		return this.treePanel;
	},
    onUpdate: function(){
    	var record = this.getSelectionModel().getSelection()[0];
		if (!record) {
			MessageBox.error("提示信息","请先选择要操作的数据！");
			return false;
		}
		this.winItems = this.createForm();
		this.winItems.getForm().loadRecord(record);
		this.winConfig = {
			height: 235,
			width: 380,
			title: '角色修改',
			items: this.winItems,
			buttons: this.createButtons()
		};
    	this.showWindow();
    },
    onCreate: function(){
		this.winItems = this.createForm();
		this.winConfig = {
			height: 235,
			width: 380,
			title: '角色创建',
			items: this.winItems,
			buttons: this.createButtons()
		};
    	this.showWindow();
    },
    doSaveSecurityGroup: function(){
    	Form.submit(this.winItems,
    		basePath + '/system/doSaveSecurityGroup.action',
			function(){
    			this.closeWindow();
				this.getStore().load();
			},
			null,this
		);
    },
    createButtons:function(){
    	return [{
			text : "保存" ,
			handler : this.doSaveSecurityGroup,
			iconCls: 'icon-save',
			scope : this
		},{
			text : "关闭",
			handler : this.closeWindow,
			iconCls: 'icon-cancel',
			scope : this
		}];
    },
	createForm: function(){
		var grid = this;
		var fp = new Ext.form.FormPanel({
			labelWidth : 80,
			labelAlign : 'right',
			layout:'fit',
			bodyPadding: 10,
			items : [{
				labelWidth : 70,
				frame : false,
				border : false,
				layout:'fit',
				items : {
					title : "基本信息",
					xtype: 'fieldset',
	                defaultType: 'textfield',
	                layout: 'anchor',
	                defaults: {
	                	labelWidth : 70,
	                    anchor: '100%'
	                },
					items : [{name: 'id',hidden: true},{
                        name: 'state',
                        xtype:'combobox',
                        fieldLabel: '状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态',
                        displayField: 'text',
                        valueField: 'value',
                        store:Ext.create('Ext.data.Store', {
						    fields: ['text','value'],
						    data: [{text:'启用',value:'Y'},{text:'作废',value:'N'}]
						}),
						value: 'Y',
						forceSelection: true,
                        margins: '0 0 0 6',
                        allowBlank: false
                    },{
						fieldLabel : "<font color=red>角色名称</font>",
						name : "name",
						allowBlank: false
					},{
						xtype:'textareafield',
						grow      : true,
						maxHeight: 45,
						growMax: 45,
						maxLength: 100,
						fieldLabel : "角色描述",
						name : "remark"
					}]
				}
			}]
		});
		return fp;
	}
});


Ext.onReady(function(){
	
	Ext.create('Ext.container.Viewport', {
	    layout: 'border',
	    items: [{
	    	xtype:'securitygroupmanager',
	    	region:'center'
	    }]
	});
});