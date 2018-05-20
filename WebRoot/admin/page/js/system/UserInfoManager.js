
Ext.define('UserInfo', {
    extend: 'Ext.data.Model',
    fields: [
		{name:'id'},
		{name:'companyId'},            
		{name:'companyDesc'},
		{name:'username'},
		{name:'realname'},
		{name:'password'},
		{name:'age'},
		{name:'sex'},
		{name:'userType'},            
//        {name:'birthday',type:'date',dateFormat : 'Y-m-d'},
        {name:'birthday'},
        {name:'enable'},
        {name:'udf1'}, 
        {name:'udf2'}, 
		{name:'createTime'},
		{name:'createMan'},
		{name:'updateTime'},
		{name:'updateMan'}
    ],
    idProperty: 'id'
});


Ext.define('Company', {
    extend: 'Ext.data.Model',
    fields: [
        'id',
        'companyCode',
        'companyName',
        'parentCode',
        'code',
        'address',
        'remark',
        'enable',
        'createTime',
        'createMan',
        'updateTime',
        'updateMan',
        'zip',
        'contact',
        'tel',
        'mobile',
        'fax',
        'email',
        'qq',
        'status'
    ],
    idProperty: 'companyCode'
});

var comboStore = Ext.create('Ext.data.TreeStore', { 
	model: 'Company',
	root: {
        companyName: '顶级机构',
        companyCode: 'NONE',
        expanded: true
    },
    proxy: { 
        type: 'ajax', 
        url: basePath + '/basicdata/doQueryCompanys.action'
    }
});



Ext.define('Redm.UserInfoGrid',{
	extend: 'Redm.BaseGrid',
	title: '用户管理',
	iconCls: 'icon-win',
	alias: ['widget.userinfogrid'],
	initComponent: function() {
        this.buildStore('../doQueryUserInfos.action','UserInfo',20);
        this.callParent(arguments);
        this.on('itemclick',function(view,record){
			var ttl = this.down('toolbar');
			var enable = ttl.getComponent(8);
			if(record.get('enable') == 'Y'){
				enable.setText('作废');
				enable.setIconCls('icon-disable');
			}else{
				enable.setText('启用');
				enable.setIconCls('icon-enable');
			}
        },this);
        this.on('itemdblclick',this.onUpdate);
        
	},
	buildColumns: function(){
		this.columns = [
			{ header: "id", dataIndex: 'id', width: 60, hidden: true, id: 'id'},
		    { header: "用户名", dataIndex: 'username', sortable: true, flex: 1},
		    { header: "真实名称", dataIndex: 'realname', sortable: true, flex: 1},
		    { header: "公司机构", dataIndex: 'companyId', flex: 1, sortable: true},
		    { header: "年龄", dataIndex: 'age', width: 100, sortable: true},
		    { header: "性别", dataIndex: 'sex', width: 100, align:'center',sortable: true},
		    { header: "出生日期", dataIndex: 'birthday', align:'center',sortable: true, flex: 1,renderer : Ext.util.Format.dateRenderer('Y-m-d')},
//		    { header: "出生日期", dataIndex: 'birthday', align:'center',sortable: true, flex: 1},
		    { header: "自定义1", dataIndex: 'udf1', width: 100, sortable: true},
		    { header: "自定义2", dataIndex: 'udf2', width: 100, sortable: true},
		    { header: "状态", dataIndex: 'enable', width: 100,align:'center', sortable: true,renderer:function(v){
		    	if(v == 'Y')return '<font color=green>启用</font>'; else return '<font color=red>作废</font>';
		    }},
		    { header: "创建人", dataIndex: 'createMan', sortable: true, flex: 1},
		    { header: "创建时间", dataIndex: 'createTime', sortable: true, flex: 1}
		];
	},
	buildDockedItems: function(){
		var me = this;
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
                //disabled: true,
                scope: this,
                handler: this.onUpdate
            },'-',{
                iconCls: 'icon-lock',
                text: '重置密码',
                scope: this,
                handler: this.onResetPwd
            },'-',{
            	text:'分配权限组',
            	iconCls: 'icon-role',
            	scope: this,
                handler: this.onShowAssignWindow
            },'-',{
            	text:'启用',
            	iconCls: 'icon-enable',
            	scope: this,
                handler: this.onEnable
            },'->',{
                width: 280,
                fieldLabel: '快速搜索',
                labelWidth: 60,
                emptyText: '输入用户名、名称或身份证号搜索',
                xtype: 'searchfield',
                store: me.store
             }]
		},{
	        xtype: 'pagingtoolbar',
	        store: me.store,
	        dock: 'bottom',
	        displayInfo: true
	    }]
	},
	buildAssignWindow: function(id,realname){
		this.leftGrid = this.createLeftGrid(id);
		this.rightGrid = this.createRightGrid(id,realname);
		return Ext.create('widget.window',{
			width : 880,
			height : 480,
			buttonAlign : "center",
			title : "权限组分配",
			modal : true,
			border:false,
			closable :true,
			maximizable :true,
			shadow : true,
			minimizable : true,
			resizable: true,
			layout : "border",
			items : [this.leftGrid,this.rightGrid]
		});		
	},
	createLeftGrid: function(id){
		this.leftstore = Ext.create('Ext.data.Store', {
			pageSize: 15,
	        fields: ['id','name','remark','checked'],
	        autoLoad: true,
	        remoteSort: false,
	        proxy: {
	            type: 'ajax',
	            url: '../doQueryAllSecurityGroups.action',
	            reader: {type: 'json',root: 'json.data',totalProperty: 'json.totalCount'},
	            actionMethods: { read: 'POST' },
	            extraParams: {userId:id},
	            simpleSortMode: true
	        }
	    });
		
	    var sm = Ext.create('Ext.selection.CheckboxModel');
	    var leftGrid = Ext.create('Ext.grid.Panel', {
	        store: this.leftstore,
	        selModel: sm,
	        columns: [
	            {text: "id", width: 200, dataIndex: 'id',hidden: true},
	            {
		            text: "checked", 
		            dataIndex: 'checked', 
		            hidden: true,
		            renderer: function(value,meta,record){
		            	if(value == true)
		            		sm.select(record,true);
		            }
	            },
	            {text: "权限组名称",  dataIndex: 'name',width: 135},
	            {text: "描述", dataIndex: 'remark',flex: 1}
	        ],
	        columnLines: true,
	        region: 'west',
	        split: true,
	        width: 410,
	        frame: false,
	        border: true,
	        iconCls: 'icon-grid',
	        dockedItems: [{ 
	            xtype: 'toolbar', 
	            items: ['<font color="green">所有权限组列表</font>','->',{
	            	text: '重置', 
	            	iconCls: 'icon-reset',
	            	scope: this,
	                handler: function(){
	                	this.leftstore.load();
	                }
	            },'-',{ 
	                text: '保存', 
	                iconCls: 'icon-save',
	                scope: this,
	                handler: function(){ 
	                	var rightGrid = this.rightGrid;
	                	var myMask = new Ext.LoadMask(this.assignWin.getEl(), {msg:"保存中，请稍候..."});
						myMask.show();
	                    var records = leftGrid.getSelectionModel().getSelection(), ids = []; 
	                    Ext.Array.each(records, function(rec){ 
	                        ids.push(rec.get('id')); 
	                    }); 
	                    var saveFun = function save(){
	                    	Ext.Ajax.request({
							    url: '../doSaveUserSecurityGroup.action',
							    timeout: 30000,
							    params: {
							        groupIds: ids,
							        userId: id
							    },
							    success: function(response){
							        var text = response.responseText;
							        var data = Ext.decode(text);
				                    MessageBox.show(data.success,data.json.msg);
				                    myMask.hide();
				                    rightGrid.getStore().load();
							    }
							});
	                    };
	                    if(Ext.isEmpty(ids)){
	                    	Ext.Msg.confirm("友情提示", "所选权限组信息为空，是否继续?", function(btn) {
								if (btn == "yes") {
									saveFun();
								}else{
									myMask.hide();
								}
							});
	                    }else{
	                    	saveFun();
	                    }
	                } 
	            }]
	        },{
		        xtype: 'pagingtoolbar',
		        store: this.leftstore,   // same store GridPanel is using
		        dock: 'bottom',
		        displayInfo: true
		    }]
	    });
	    return leftGrid;
	},
	createRightGrid: function(id,realname){
	    this.rightstore = Ext.create('Ext.data.Store', {
	        fields: ['id','name','remark'],
	        autoLoad: true,
	        remoteSort: false,
	        proxy: {
	            type: 'ajax',
	            url: '../doQueryAssignSecurityGroups.action',
	            reader: {type: 'json',root: 'json.data'},
	            actionMethods: { read: 'POST' },
	            extraParams: {userId:id},
	            simpleSortMode: true
	        }
	    });
		
	    var rightGrid = Ext.create('Ext.grid.Panel', {
	        store: this.rightstore,
	        columns: [
	            {text: "id", width: 200, dataIndex: 'id',hidden: true},
	            {text: "权限组名称",  dataIndex: 'name',width: 165},
	            {text: "描述", dataIndex: 'remark',flex: 1}
	        ],
	        columnLines: true,
	        region: 'center',
	        frame: false, 
	        border: true,
	        iconCls: 'icon-grid',
	        dockedItems: [{ 
	            xtype: 'toolbar', 
	            items: ['<font color="blue">已分配权限组</font>：<font color="green">' + realname + '</font>','->',{
	            	text:'刷新',
	            	scope: this,
	            	iconCls: 'icon-refresh',
	            	handler: function(){
	            		this.rightstore.load();
	            	}
	            }]
	            
	        }]
	    });
	    return rightGrid;
	},
    
    //创建用户时使用 
	createForm: function(){
		var form = Ext.create('Ext.form.Panel', {
	        autoHeight: true,
	        bodyPadding: '3 10 3 3',
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
                        labelWidth: 70,
                        flex: 1,
                        allowBlank: false,
                        margin: '5 0 0 10',
                        xtype: 'textfield'
                    },
                    items: [
                        {name:'id',xtype:'textfield',allowBlank: true,hidden:true},
                        {
                            name:'username',
                            fieldLabel:'用户名',
                            maxLength:20,
                            minLength:4,
                            allowBlank: false,
                            listeners:{
                                render:function(){
                                    var id = form.getForm().findField('id').getValue();
                                    if(id != ''){
                                        this.setReadOnly(true);
                                        this.setFieldStyle('background-color:#FDF6CD; background-image: none;');
                                    }
                                }	                		
                            }
                        },
                        {name: 'password',allowBlank: false,fieldLabel:'密码',inputType:'password',maxLength:20,minLength:6 }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 70,
                        flex: 1,
                        margin: '5 0 0 10'
                        //fieldStyle:'background-color:#DFE8F6; background-image: none;'
                    },
                    items: [{name: 'realname',xtype: 'textfield',readOnly:false,fieldLabel:'真实姓名',maxLength:20,minLength:2 },
                        {	
                            name: 'enable',
                            fieldLabel: '启用状态',
                            xtype:'combobox',
                            editable: false,
                            allowBlank: false,
                            displayField: 'text',
                            valueField: 'value',
                            value: 'Y',
                            store:Ext.create('Ext.data.Store', {
                                fields: ['text','value'],
                                data: [{text:'启用',value:'Y'},{text:'作废',value:'N'}]
                            })
                    }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 70,
                        flex: 1,
                        margin: '5 0 0 10'
                       // readOnly:true
                    },
                    items: [
                    {
                        xtype: 'datefield',
                        name: 'birthday',
                        fieldLabel: '出生日期',
                        fieldStyle: '',
                        format: 'Y-m-d H:i:s.u',
                        listeners:{
                            change: function(t,nv,ov){
                                if(Ext.isDate(nv)){
                                    var today = new Date();
                                    var age = today.getFullYear() - nv.getFullYear();
                                    form.getForm().findField('age').setValue(age);
                                }
                            }
                        }
                    },
                    {	name: 'age',
                        xtype: 'numberfield',
                        fieldLabel: '年龄',
                        maxValue: 120,
                        readOnly: true,
                        minValue: 1,
                        fieldStyle:'background-color:#FDF6CD; background-image: none;' 
                    }]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 70,
                        flex: 1,
                        margin: '5 0 0 10',
                        xtype: 'textfield'
                    },
                    items: [{  
                        
                        name: 'companyId',
                        fieldLabel: '公司机构',
                        //allowBlank: false,
                        xtype: 'treecombox',
                        labelWidth: 70,
                        valueField: 'companyCode',
                        displayField: 'companyName',
                        firstSelected: true,
                        rootVisible:false,
                        maxPickerWidth: 220,
                        store: comboStore
                    },{	                	
                        name: 'sex',
                        xtype:'combobox',
                        editable: false,
                        emptyText: '--请选择--',
                        fieldLabel: '性别',
                        allowBlank: false,
                        displayField: 'text',
                        value:'男',
                        store:Ext.create('Ext.data.Store', {
                            fields: ['text'],
                            data: [{text:'男'},{text:'女'}]
                        })
                    }]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 70,
                        flex: 1,
                        margin: '5 0 0 10',
                        xtype: 'textfield'
                    },
                    items: [{  
                        
                        name: 'udf1',
                        fieldLabel: '自定义1',
                        labelWidth: 70,
                        maxPickerWidth: 220
                    },
                    { name: 'udf2',
                        fieldLabel: '自定义2',
                        labelWidth: 70,
                        maxPickerWidth: 220
                    }]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 70,
                        flex: 1,
                        margin: '5 0 0 10',
                        fieldStyle:'background-color:#DFE8F6; background-image: none;'
                    },
                    items: [
                        {name: 'createMan',fieldLabel: '创建人', xtype: 'textfield', readOnly:true },
                        {name: 'createTime',fieldLabel: '创建时间',xtype:'textfield',readOnly:true }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 70,
                        flex: 1,
                        margin: '5 0 0 10',
                        readOnly:true,
                        fieldStyle:'background-color:#DFE8F6; background-image: none;'
                    },
                    items: [
                        {name: 'updateMan',fieldLabel: '修改人', xtype: 'textfield' },
                        {name: 'updateTime',fieldLabel: '修改时间',xtype: 'textfield' }
                    ]
                }
            ]
	    });
	    return form;
	},
    
    //修改用户时使用 
	createForm2: function(){
		var form2 = Ext.create('Ext.form.Panel', {
	        autoHeight: true,
	        bodyPadding: '3 10 3 3',
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
                        labelWidth: 70,
                        allowBlank: false,
                        margin: '5 0 0 10',
                        xtype: 'textfield'
                    },
                    items: [
                        {name:'id',xtype:'textfield',allowBlank: true,hidden:true},
                        {
                            name:'username',
                            fieldLabel:'用户名',
                            maxLength:20,
                            minLength:4,
                            allowBlank: false,
                            width:240,
                            listeners:{
                                render:function(){
                                    var id = form2.getForm().findField('id').getValue();
                                    if(id != ''){
                                        this.setReadOnly(true);
                                        this.setFieldStyle('background-color:#FDF6CD; background-image: none;');
                                    }
                                }	                		
                            }
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 70,
                        flex: 1,
                        margin: '5 0 0 10'
                        //fieldStyle:'background-color:#DFE8F6; background-image: none;'
                    },
                    items: [{name: 'realname',xtype: 'textfield',readOnly:false,fieldLabel:'真实姓名',maxLength:20,minLength:2 },
                        {	
                            name: 'enable',
                            fieldLabel: '启用状态',
                            xtype:'combobox',
                            editable: false,
                            allowBlank: false,
                            displayField: 'text',
                            valueField: 'value',
                            value: 'Y',
                            store:Ext.create('Ext.data.Store', {
                                fields: ['text','value'],
                                data: [{text:'启用',value:'Y'},{text:'作废',value:'N'}]
                            })
                    }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 70,
                        flex: 1,
                        margin: '5 0 0 10'
                       // readOnly:true
                    },
                    items: [
                    {
                        xtype: 'datefield',
                        name: 'birthday',
                        fieldLabel: '出生日期',
                        fieldStyle: '',
                        format: 'Y-m-d H:i:s.u',
                        listeners:{
                            change: function(t,nv,ov){
                                if(Ext.isDate(nv)){
                                    var today = new Date();
                                    var age = today.getFullYear() - nv.getFullYear();
                                    form2.getForm().findField('age').setValue(age);
                                }
                            }
                        }
                    },
                    {	name: 'age',
                        xtype: 'numberfield',
                        fieldLabel: '年龄',
                        maxValue: 120,
                        readOnly: true,
                        minValue: 1,
                        fieldStyle:'background-color:#FDF6CD; background-image: none;' 
                    }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 70,
                        flex: 1,
                        margin: '5 0 0 10',
                        xtype: 'textfield'
                    },
                    items: [{  
                        
                        name: 'companyId',
                        fieldLabel: '公司机构',
                        //allowBlank: false,
                        xtype: 'treecombox',
                        labelWidth: 70,
                        valueField: 'companyCode',
                        displayField: 'companyName',
                        firstSelected: true,
                        rootVisible:false,
                        maxPickerWidth: 220,
                        store: comboStore
                    },{	                	
                        name: 'sex',
                        xtype:'combobox',
                        editable: false,
                        emptyText: '--请选择--',
                        fieldLabel: '性别',
                        allowBlank: false,
                        displayField: 'text',
                        value:'男',
                        store:Ext.create('Ext.data.Store', {
                            fields: ['text'],
                            data: [{text:'男'},{text:'女'}]
                        })
                    }
                    ]
                }, {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 70,
                        flex: 1,
                        margin: '5 0 0 10',
                        xtype: 'textfield'
                    },
                    items: [{  
                        
                        name: 'udf1',
                        fieldLabel: '自定义1',
                        labelWidth: 70,
                        maxPickerWidth: 220
                    },
                    { name: 'udf2',
                        fieldLabel: '自定义2',
                        labelWidth: 70,
                        maxPickerWidth: 220
                    }]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 70,
                        flex: 1,
                        margin: '5 0 0 10',
                        fieldStyle:'background-color:#DFE8F6; background-image: none;'
                    },
                    items: [
                        {name: 'createMan',fieldLabel: '创建人', xtype: 'textfield', readOnly:true },
                        {name: 'createTime',fieldLabel: '创建时间',xtype:'textfield',readOnly:true }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 70,
                        flex: 1,
                        margin: '5 0 0 10',
                        readOnly:true,
                        fieldStyle:'background-color:#DFE8F6; background-image: none;'
                    },
                    items: [
                        {name: 'updateMan',fieldLabel: '修改人', xtype: 'textfield' },
                        {name: 'updateTime',fieldLabel: '修改时间',xtype: 'textfield' }
                    ]
                }
            ]
	    });
	    return form2;
	},
    
    
	createButtons: function(){
		this.winButtons = [{
			text: '保存',
            scope: this,
            iconCls: 'icon-save',
            handler: this.doSave
		},{
			text: '关闭',
            scope: this,
            iconCls: 'icon-cancel',
            handler: this.closeWindow
		}];
		return this.winButtons;
	},
    
	onShowAssignWindow: function(){
		var record = this.getSelectionModel().getSelection()[0];
		if (!record) {
			MessageBox.error("提示信息","请先选择要操作的数据！");
			return false;
		}
		var id = record.get("id");
		var realname = record.get("realname");
		if (!this.assignWin) {
			this.assignWin = this.buildAssignWindow(id,realname);
			this.assignWin.on("close", function() {
				delete this.assignWin;
				delete this.leftGrid;
				delete this.rightGrid;
			}, this);
		}
		this.assignWin.show();
	},	
    
    
    //创建用户，需要设置初始密码
	onCreate: function(){
		this.winItems = this.createForm();
		this.winConfig = {
			height: 265,
			width: 530,
			title: '创建用户信息',
			items: this.winItems,
			buttons: this.createButtons()
		};
		this.showWindow();
	},
    
    //启用/禁用用户
	onEnable: function(){
		var me = this;
		var records = this.getSelectionModel().getSelection();
		if(records.length == 0){MessageBox.error('错误提示','请先选择你要操作的数据！'); return;}
		var record = records[0];
		Ext.Ajax.request({
		   	url: '../changeEnable.action',
		   	params: {id:record.get('id'),enable:record.get('enable')},
		   	success: function(response, opts) {
		    	var res = Ext.decode(response.responseText);
		        var success = res.success;
		        if(success) me.getStore().load();
		        MessageBox.show(success, res.json.msg)
		   	}
		});
	},
    
    
    //更新信息，密码不会显示
	onUpdate: function(){
		var records = this.getSelectionModel().getSelection();
		if(records.length == 0){MessageBox.error('错误提示','请先选择你要操作的数据！'); return;}
		this.winItems = this.createForm2();
		this.winItems.getForm().loadRecord(records[0]);

		var config = {
			width: 530,
    		height: 265,
			title: '修改用户信息',
			items: this.winItems,
			buttons: this.createButtons()
		};
		this.winConfig = config;
		this.showWindow();
	},
    
    //重置密码，改为6个0
	onResetPwd: function(){
		var me = this;
		var records = this.getSelectionModel().getSelection();
		if(records.length == 0){MessageBox.error('错误提示','请先选择你要操作的数据！'); return;}
		var record = records[0];		
		Ext.MessageBox.confirm('询问提示', 
			'你确定要重置当前所选用户密码吗？', 
			function(btn){
				if(btn == 'yes'){
					Ext.Ajax.request({
					    url: '../resetMemberPwd.action',
					    params: {id: record.getId()},
					    success: function(response){
					        var res = Ext.decode(response.responseText);
					        var success = res.success;
					        if(success) me.getStore().load();
					        MessageBox.show(success, res.json.msg)
					    }
					});
				}
			}
    	);
	},
    
    //存盘
	doSave: function(){
		var me = this;
		var form = this.winItems.getForm();
        if (form.isValid()) {
        	var id = form.findField('id').getValue();
        	var myMask = new Ext.LoadMask(this.winItems, {msg:"正在处理，请稍候……"});
			myMask.show();
            form.submit({
            	url: '../doSaveUserManager.action',
                success: function(form, action) {
                   MessageBox.show(true,action.result.json.msg);
            	   me.getStore().load();
            	   myMask.hide();
            	   if(id == '') form.reset();
                },
                failure: function(form, action) {
                    MessageBox.show(false,action.result.json.msg);
                    myMask.hide();
                }
            });
        }
	}
});


Ext.onReady(function(){
	Ext.create('Ext.container.Viewport', {
	    layout: 'border',
	    items: [{
	    	xtype:'userinfogrid',
	    	region:'center'
	    }]
	});
});




