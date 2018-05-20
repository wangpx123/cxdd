Ext.define('LoginLog', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id'},
        {name: 'ip'},
        {name: 'realname'},
        {name: 'userName'},
        {name: 'logoutTime'},
        {name: 'loginTime'},
        {name: 'userType'},
        {name: 'status'},
        {name: 'onlineTime'},
        {name: 'remark'}
     ]
});

Ext.define('LoginLogGrid',{
	extend: 'Redm.BaseGrid',
	alias: 'widget.loginloggrid',
	title: '系统登陆日志查看',
	iconCls: 'icon-win',
	initComponent: function(){
		var me = this;
		this.buildStore(basePath + '/system/queryLoginLogs.action','LoginLog',30);
        this.callParent(arguments);
        this.getStore().on('beforeload',function(store){
	    	var params = store.getProxy().extraParams;
            var ttl = me.down('toolbar');
            if(ttl){
	            var on = ttl.getComponent(5).getValue();
            	var off = ttl.getComponent(6).getValue();
            	var all = ttl.getComponent(7).getValue();
            	delete params.status;
	            if(on) params.status = 'ON';
	            if(off) params.status = 'OFF';
	            if(all) params.status = 'ALL';
            }
	    });
	    this.on('itemclick',function(view,record){
	    	var logoutTime = record.get('logoutTime');
	    	 var ttl = me.down('toolbar');
	    	if(logoutTime == ''){
	    		ttl.getComponent(0).disable();
	    		ttl.getComponent(2).enable();
	    	}else{
	    		ttl.getComponent(0).enable();
	    		ttl.getComponent(2).disable();
	    	}
	    });
	},
	buildColumns: function(){
		this.columns = [
	        {text: "IP地址",dataIndex: 'ip',flex:1},
	        {text: "用户姓名",dataIndex: 'realname',flex:1},
	        { header: "用户类型", dataIndex: 'userType', width: 90, renderer:function(v){
	        	if(v == 'ADMIN_SYSTEM')
	        		return  '<font color=#3D8A08>系统管理员</font>';
		    	else if(v == 'ADMIN_COMPANY')
		    		return '<font color=#D00076>管理员</font>'; 
		    	else if(v == 'SUPERMAN_COMPANY')
		    		return '<font color=#1C53EE>高级用户</font>';
		    	else return '<font color=#1C53EE>普通用户</font>';;
		    }},
	        {text: "登陆时间",dataIndex: 'loginTime',width:145,align:'center'},
	        {text: "状态",dataIndex: 'status',flex:1,renderer:function(v){
	        	if(v == '登陆' || v == '监控登陆')return '<font color=green>'+v+'</font>';
	        	if(v == '注销' || v == '监控注销')return '<font color=red>'+v+'</font>';
	        	else return v;
	        }},
	        {text: "注销时间",dataIndex: 'logoutTime',width:145,align:'center'},
	        {text: "在线时长",dataIndex: 'onlineTime',flex:1,renderer:function(v,m,r){
	        	var logoutTime = r.get('logoutTime');
	        	if(v == 0) 
	        		return ''; 
	        	else if(logoutTime == '')
	        		return '<font color=#08C105>约'+v+'</font>';
	        	else return '<font color=#D00076>'+v+'</font>'; ;
	        }},
	        {text: "备注",dataIndex: 'remark',flex:2}
	    ];
	},
	buildDockedItems: function(){
		var me = this;
		this.dockedItems = [{
			xtype: 'toolbar',
            dock: 'top',
            items: [{
            		text:'发送消息',
	            	iconCls: 'letters',
	            	scope: this,
	                handler: this.onEnable
           	 	},'-',{
           	 		text:'强制下线',
	            	iconCls: 'icon-disconn',
	            	scope: this,
	                handler: this.doEnforce
            	},'-','状态过滤：',{
	        		xtype:'radio',
	        		name: 'inline',
	        		width: 50,
	        		boxLabel: '<font color=green>在线</font>'
	        	},{
	        		xtype:'radio',
	        		name: 'inline',
	        		width: 50,
	        		boxLabel: '<font color=red>离线</font>',
	        		scope: this
	        	},{
	        		xtype:'radio',
	        		checked:true,
	        		width: 50,
	        		name: 'inline',
	        		boxLabel: '<font color=#B610B2>全部</font>',
	        		scope: this
	        	},'-',{
            		text:'查询',
	            	iconCls: 'icon-search',
	            	scope: this,
	                handler: this.doSearch
            	},'->',{
	                width: 280,
	                fieldLabel: '快速搜索',
	                labelWidth: 60,
	                emptyText: '在此输入搜索条件',
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
	doEnforce: function(){
		var me = this;
		var records = this.getSelectionModel().getSelection();
		if(records.length == 0){MessageBox.error('错误提示','请先选择你要操作的数据！'); return;}
		var record = records[0];		
		Ext.MessageBox.confirm('询问提示', 
			'你确定要强制用户从系统注销吗？', 
			function(btn){
				if(btn == 'yes'){
					Ext.Ajax.request({
					    url: basePath + '/system/doEnforceOffline.action',
					    params: {id:record.get('id'),userName: record.get('userName')},
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
	doSearch: function(){
		this.getStore().load();
	}
});

Ext.onReady(function(){
	
	Ext.create('Ext.container.Viewport', {
	    layout: 'border',
	    items: [{
	    	xtype:'loginloggrid',
	    	region:'center'
	    }]
	});
});