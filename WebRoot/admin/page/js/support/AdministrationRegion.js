/***************************************
行政区域  administrationregion.js

****************************************/

//国家
Ext.define('Nation', {
    extend: 'Ext.data.Model',
    fields: [
		{name:'id'},
		{name:'nationKey'},            
		{name:'descr'},     
		{name:'endescr'},    
		{name:'userDefine1'},            
		{name:'userDefine2'},            
		{name:'userDefine3'},           
        {name:'addDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},     
        {name:'addWho'},
        {name:'editDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},     
		{name:'editWho'}   
	],
    idProperty: 'id'
});

//省份
Ext.define('Province', {
    extend: 'Ext.data.Model',
    fields: [
		{name:'id'},
		{name:'nationKey'}, 
		{name:'provinceKey'},         
		{name:'descr'},     
		{name:'endescr'},    
		{name:'userDefine1'},            
		{name:'userDefine2'},            
		{name:'userDefine3'},           
        {name:'addDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},     
        {name:'addWho'},
        {name:'editDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},     
		{name:'editWho'}   
	],
    idProperty: 'id'
});

//城市
Ext.define('City', {
    extend: 'Ext.data.Model',
    fields: [
		{name:'id'},
		{name:'cityKey'}, 
		{name:'provinceKey'},         
		{name:'descr'},     
		{name:'endescr'},    
		{name:'userDefine1'},            
		{name:'userDefine2'},            
		{name:'userDefine3'},           
        {name:'addDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},     
        {name:'addWho'},
        {name:'editDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},     
		{name:'editWho'}   
	],
    idProperty: 'id'
});

//区县
Ext.define('County', {
    extend: 'Ext.data.Model',
    fields: [
		{name:'id'},
		{name:'cityKey'}, 
		{name:'countyKey'},         
		{name:'descr'},     
		{name:'endescr'},    
		{name:'userDefine1'},            
		{name:'userDefine2'},            
		{name:'userDefine3'},           
        {name:'addDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},     
        {name:'addWho'},
        {name:'editDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},     
		{name:'editWho'}   
	],
    idProperty: 'id'
});

//GRID面板
Ext.define('Redm.support.NationGrid', {
    extend: 'Redm.BaseGrid',
    alias : 'widget.nationgrid',
    loadMask: true,
    forceLayout:true,
    dockedItems: [],
    buildColumns: function(){
        this.columns = [
		 	{header : "国家代码",dataIndex : 'nationKey',width : 150,sortable : true},
			{header : "中文名称",dataIndex : 'descr',width : 120,sortable : true},
			{header : "英文名称",dataIndex : 'endescr',width : 120,sortable : true}, 
			{header : "自定义一",dataIndex : 'userDefine1',width : 150,sortable : true},
			{header : "自定义二",dataIndex : 'userDefine2',width : 150,sortable : true},
			{header : "自定义三",dataIndex : 'userDefine3',width : 140,sortable : true},
			{header : "创建人",dataIndex : 'addWho',width : 140,sortable : true,hidden : true},
			{header : "创建时间",dataIndex : 'addDate',width : 140,sortable : true,renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s'),hidden : true}, 
			{header : "修改人",dataIndex : 'editWho',width : 140,sortable : true,hidden : true}, 
			{header : "修改时间",dataIndex : 'editDate',width : 140,sortable : true,renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s'),hidden : true}
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
    	this.buildStore(basePath+'/support/doQueryNation1.action','Nation',20);
    	this.on('itemdblclick',function(grid,record){    //鼠标双击就会跳到另外一个页面
    		var father = grid.ownerCt.ownerCt.ownerCt.ownerCt;
    		father.setActiveTab(1); 
	//		console.log(record.data.nationKey);
 			father.t2seltopform.getForm().findField('nationKey').setValue(record.data.nationKey);
   // 		father.t2seltopform.getForm().loadRecord(record);  
    		father.provincegrid.getStore().load();
            father.provinceForm.getForm().reset();
    		},this);
        this.callParent(arguments);
    }
    
});

// 省份表的grid
Ext.define('Redm.support.ProvinceGrid', {
	extend : 'Redm.BaseGrid',
	alias : 'widget.provincegrid',
	buildColumns : function() {
		this.columns = [
			{header : "国家代码",dataIndex : 'nationKey',width : 150,sortable : true},
			{header : "省份代码",dataIndex : 'provinceKey',width : 150,sortable : true},
			{header : "中文名称",dataIndex : 'descr',width : 120,sortable : true},
			{header : "英文名称",dataIndex : 'endescr',width : 120,sortable : true}, 
			{header : "自定义一",dataIndex : 'userDefine1',width : 150,sortable : true},
			{header : "自定义二",dataIndex : 'userDefine2',width : 150,sortable : true},
			{header : "自定义三",dataIndex : 'userDefine3',width : 140,sortable : true},
			{header : "创建人",dataIndex : 'addWho',width : 140,sortable : true,hidden : true},
			{header : "创建时间",dataIndex : 'addDate',width : 140,sortable : true,renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')}, 
			{header : "修改人",dataIndex : 'editWho',width : 140,sortable : true,hidden : true}, 
			{header : "修改时间",dataIndex : 'editDate',width : 140,sortable : true,renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')}
			];
        return true;
	},
	buildDockedItems : function() {
		var me = this;
		this.dockedItems = 
        [
            {
                xtype : 'pagingtoolbar',
                store : this.store,
                dock : 'bottom',
                displayInfo : true
			}
        ];
			},
			
		initComponent : function() {
			var me = this;
			this.buildStore(basePath + '/support/doQueryProvince1.action','Province', 20);
			this.on('itemdblclick',function(grid,record){    //鼠标双击就会跳到另外一个页面
    		var father = grid.ownerCt.ownerCt.ownerCt.ownerCt;
    		father.setActiveTab(2); 
    		father.t3seltopform.getForm().findField('provinceKey').setValue(record.data.provinceKey);
    		//father.t3seltopform.getForm().loadRecord(record);  
    		father.citygrid.getStore().load();
            father.cityForm.getForm().reset();
    		},this);
			this.callParent(arguments);
		}
	}
);

// 城市表的grid
Ext.define('Redm.support.CityGrid', {
	extend : 'Redm.BaseGrid',
	alias : 'widget.citygrid',
	buildColumns : function() {
		this.columns = [
			{header : "省份代码",dataIndex : 'provinceKey',width : 150,sortable : true},
			{header : "城市代码",dataIndex : 'cityKey',width : 150,sortable : true},
			{header : "中文名称",dataIndex : 'descr',width : 120,sortable : true},
			{header : "英文名称",dataIndex : 'endescr',width : 120,sortable : true}, 
			{header : "自定义一",dataIndex : 'userDefine1',width : 150,sortable : true},
			{header : "自定义二",dataIndex : 'userDefine2',width : 150,sortable : true},
			{header : "自定义三",dataIndex : 'userDefine3',width : 140,sortable : true},
			{header : "创建人",dataIndex : 'addWho',width : 140,sortable : true,hidden : true},
			{header : "创建时间",dataIndex : 'addDate',width : 140,sortable : true,renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s'),hidden : true}, 
			{header : "修改人",dataIndex : 'editWho',width : 140,sortable : true,hidden : true}, 
			{header : "修改时间",dataIndex : 'editDate',width : 140,sortable : true,renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s'),hidden : true}
			];
        return true;
	},
	buildDockedItems : function() {
		var me = this;
		this.dockedItems = 
        [
            {
                xtype : 'pagingtoolbar',
                store : this.store,
                dock : 'bottom',
                displayInfo : true
			}
        ];
			},
			
		initComponent : function() {
			var me = this;
			this.buildStore(basePath + '/support/doQueryCity1.action','City', 20);
			this.on('itemdblclick',function(grid,record){    //鼠标双击就会跳到另外一个页面
    		var father = grid.ownerCt.ownerCt.ownerCt.ownerCt;
    		father.setActiveTab(3); 
    		father.t4seltopform.getForm().findField('cityKey').setValue(record.data.cityKey);
//    		father.t4seltopform.getForm().loadRecord(record);  
    		father.citygrid.getStore().load();
            father.countyForm.getForm().reset();
    		},this);
			this.callParent(arguments);
		}
	}
);

// 区县表的grid
Ext.define('Redm.support.CountyGrid', {
	extend : 'Redm.BaseGrid',
	alias : 'widget.countygrid',
	buildColumns : function() {
		this.columns = [
			{header : "城市代码",dataIndex : 'cityKey',width : 150,sortable : true},
			{header : "县区代码",dataIndex : 'countyKey',width : 150,sortable : true},
			{header : "中文名称",dataIndex : 'descr',width : 120,sortable : true},
			{header : "英文名称",dataIndex : 'endescr',width : 120,sortable : true}, 
			{header : "自定义一",dataIndex : 'userDefine1',width : 150,sortable : true},
			{header : "自定义二",dataIndex : 'userDefine2',width : 150,sortable : true},
			{header : "自定义三",dataIndex : 'userDefine3',width : 140,sortable : true},
			{header : "创建人",dataIndex : 'addWho',width : 140,sortable : true,hidden : true},
			{header : "创建时间",dataIndex : 'addDate',width : 140,sortable : true,renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s'),hidden : true}, 
			{header : "修改人",dataIndex : 'editWho',width : 140,sortable : true,hidden : true}, 
			{header : "修改时间",dataIndex : 'editDate',width : 140,sortable : true,renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s'),hidden : true}
			];
        return true;
	},
	buildDockedItems : function() {
		var me = this;
		this.dockedItems = 
        [
            {
                xtype : 'pagingtoolbar',
                store : this.store,
                dock : 'bottom',
                displayInfo : true
			}
        ];
			},
			
		initComponent : function() {
			var me = this;
			this.buildStore(basePath + '/support/doQueryCounty1.action','County', 20);
			this.callParent(arguments);
		}
	}
);

Ext.define('Redm.support.AdministrationRegion', {	
	extend: 'Ext.tab.Panel',
    alias : 'widget.administrationregion',
    title:'行政区域',
    layout:'border',
    tabPosition: 'bottom',
    initComponent: function(){
    	var me = this;
	   // this.buildContextMenu();
    	this.items = [this.createTab1Panel(),this.createTab2Panel(),this.createTab3Panel(),this.createTab4Panel()];
        this.callParent(arguments);
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
    
    
    onSelectAdministrationRegion: function(){
    	this.nationgrid.getStore().load();
    	this.provincegrid.getStore().load();
    	this.citygrid.getStore().load();
    	this.countygrid.getStore().load();
    },
    
    onCreateNation: function(){
    	console.log('goes here');
    	console.log(this.nationForm.getForm());
    	//console.log(this.provinceForm);
    	 this.nationForm.getForm().reset();
    	 this.nationForm.getForm().findField('nationKey').setReadOnly(false);
        //this.nationForm.getForm().reset();
    },
    onCreateProvince: function(){
    	console.log(this.provinceForm);
    	console.log('goes here province');
        this.provinceForm.getForm().reset();
        this.provinceForm.getForm().findField('provinceKey').setReadOnly(false);
    },
    onCreateCity: function(){
        this.cityForm.getForm().reset();
        this.cityForm.getForm().findField('cityKey').setReadOnly(false);
    },
    onCreateCounty: function(){
        this.countyForm.getForm().reset();
        this.countyForm.getForm().findField('countyKey').setReadOnly(false);
    },
  	
    onSaveNation: function(){
		var me = this;
    	var NationForm = this.nationForm.getForm();
    	var values1 = NationForm.getValues();
    	if(!(NationForm.isValid())) return;
   		 Ext.Ajax.request({
		    url: basePath + '/support/doSaveNation.action',
		    params: {
		        id: values1.id,
		        nationKey: values1.nationKey,
		        descr: values1.descr,
		        endescr: values1.endescr,
		        userDefine1: values1.userDefine1,
		        userDefine2: values1.userDefine2,
		        userDefine3: values1.userDefine3,
		        addDate: values1.addDate,
		        addWho: values1.addWho,
		        editDate: values1.editDate,
		        editWho: values1.editWho
		    },
		    success: function(response){
		        var text = Ext.decode(response.responseText);
		        var success = text.success;
		        MessageBox.show(success, text.json.msg);
		        me.nationgrid.getStore().load();
		        NationForm.reset();
		    }
		});
	},
	
	 onSaveNation: function(){
		var me = this;
    	var NationForm = this.nationForm.getForm();
    	var values1 = NationForm.getValues();
    	if(!(NationForm.isValid())) return;
   		 Ext.Ajax.request({
		    url: basePath + '/support/doSaveNation.action',
		    params: {
		        id: values1.id,
		        nationKey: values1.nationKey,
		        descr: values1.descr,
		        endescr: values1.endescr,
		        userDefine1: values1.userDefine1,
		        userDefine2: values1.userDefine2,
		        userDefine3: values1.userDefine3,
		        addDate: values1.addDate,
		        addWho: values1.addWho,
		        editDate: values1.editDate,
		        editWho: values1.editWho
		    },
		    success: function(response){
		        var text = Ext.decode(response.responseText);
		        var success = text.success;
		        MessageBox.show(success, text.json.msg);
		        me.nationgrid.getStore().load();
		        NationForm.reset();
		    }
		});
	},
	
	 onSaveProvince: function(){
		var me = this;
    	var ProvinceForm = this.provinceForm.getForm();
    	var values1 = ProvinceForm.getValues();
    	if(!(ProvinceForm.isValid())) return;
   		 Ext.Ajax.request({
		    url: basePath + '/support/doSaveProvince.action',
		    params: {
		        id: values1.id,
		        nationKey: values1.nationKey,
		        provinceKey: values1.provinceKey,
		        descr: values1.descr,
		        endescr: values1.endescr,
		        userDefine1: values1.userDefine1,
		        userDefine2: values1.userDefine2,
		        userDefine3: values1.userDefine3,
		        addDate: values1.addDate,
		        addWho: values1.addWho,
		        editDate: values1.editDate,
		        editWho: values1.editWho
		    },
		    success: function(response){
		        var text = Ext.decode(response.responseText);
		        var success = text.success;
		        MessageBox.show(success, text.json.msg);
		        me.provincegrid.getStore().load();
		        ProvinceForm.reset();
		    }
		});
	},
	
	 onSaveCity: function(){
		var me = this;
    	var CityForm = this.cityForm.getForm();
    	var values1 = CityForm.getValues();
    	if(!(CityForm.isValid())) return;
   		 Ext.Ajax.request({
		    url: basePath + '/support/doSaveCity.action',
		    params: {
		        id: values1.id,
		        cityKey: values1.cityKey,
		        provinceKey: values1.provinceKey,
		        descr: values1.descr,
		        endescr: values1.endescr,
		        userDefine1: values1.userDefine1,
		        userDefine2: values1.userDefine2,
		        userDefine3: values1.userDefine3,
		        addDate: values1.addDate,
		        addWho: values1.addWho,
		        editDate: values1.editDate,
		        editWho: values1.editWho
		    },
		    success: function(response){
		        var text = Ext.decode(response.responseText);
		        var success = text.success;
		        MessageBox.show(success, text.json.msg);
		        me.citygrid.getStore().load();
		        CityForm.reset();
		    }
		});
	},
	
	 onSaveCounty: function(){
		var me = this;
    	var CountyForm = this.countyForm.getForm();
    	var values1 = CountyForm.getValues();
    	if(!(CountyForm.isValid())) return;
   		 Ext.Ajax.request({
		    url: basePath + '/support/doSaveCounty.action',
		    params: {
		        id: values1.id,
		        cityKey: values1.cityKey,
		        countyKey: values1.countyKey,
		        descr: values1.descr,
		        endescr: values1.endescr,
		        userDefine1: values1.userDefine1,
		        userDefine2: values1.userDefine2,
		        userDefine3: values1.userDefine3,
		        addDate: values1.addDate,
		        addWho: values1.addWho,
		        editDate: values1.editDate,
		        editWho: values1.editWho
		    },
		    success: function(response){
		        var text = Ext.decode(response.responseText);
		        var success = text.success;
		        MessageBox.show(success, text.json.msg);
		        me.countygrid.getStore().load();
		        CountyForm.reset();
		    }
		});
	},
	
	//重置操作
    onResetNation: function(){
    	//console.log(this.t1seltopform.getForm());
    	this.t1seltopform.getForm().reset();
    },
    
    //重置操作
    onResetProvince: function(){
    	//console.log(this.t1seltopform.getForm());
    	this.t2seltopform.getForm().reset();
    },
    
    //重置操作
    onResetCity: function(){
    	//console.log(this.t1seltopform.getForm());
    	this.t3seltopform.getForm().reset();
    },
    
    //重置操作
    onResetCounty: function(){
    	//console.log(this.t1seltopform.getForm());
    	this.t4seltopform.getForm().reset();
    },
    
    //删除县区操作
   	onDeleteNation : function() {
		var me = this;
		var records = me.nationgrid.getSelectionModel().getSelection();
		//console.log(records);
		if (records == "") {
			MessageBox.error('错误提示', '请选择删除的数据！');
			return;
		} else {
			Ext.MessageBox.confirm('询问提示', '确定要删除吗？', function(btn) {
						if (btn == 'yes') {
							var nationRecord = records[0].getData();
							Ext.Ajax.request({
										url : basePath+ '/support/doDeleteNation.action',
										params : {
											nationKey : nationRecord.nationKey
										},
										success : function(response) {
											var text = Ext.decode(response.responseText);
											var success = text.success;
											MessageBox.show(success,text.json.msg);
											me.nationgrid.getStore().load();
											me.nationForm.getForm().reset();
										}
									});
						}
					});
		}
	},
	
	//删除县区操作
   	onDeleteProvince : function() {
		var me = this;
		var records = me.provincegrid.getSelectionModel().getSelection();
		if (records == "") {
			MessageBox.error('错误提示', '请选择删除的数据！');
			return;
		} else {
			Ext.MessageBox.confirm('询问提示', '确定要删除吗？', function(btn) {
						if (btn == 'yes') {
							var provinceRecord = records[0].getData();
							Ext.Ajax.request({
										url : basePath+ '/support/doDeleteProvince.action',
										params : {
											provinceKey : provinceRecord.provinceKey
										},
										success : function(response) {
											var text = Ext.decode(response.responseText);
											var success = text.success;
											MessageBox.show(success,text.json.msg);
											me.provincegrid.getStore().load();
											me.provinceForm.getForm().reset();
										}
									});
						}
					});
		}
	},
	
    //删除城市
    onDeleteCity : function() {
		var me = this;
		var records = me.citygrid.getSelectionModel().getSelection();
		if (records == "") {
			MessageBox.error('错误提示', '请选择删除的数据！');
			return;
		} else {
			Ext.MessageBox.confirm('询问提示', '确定要删除吗？', function(btn) {
						if (btn == 'yes') {
							var cityRecord = records[0].getData();
							Ext.Ajax.request({
										url : basePath+ '/support/doDeleteCity.action',
										params : {
											cityKey : cityRecord.cityKey
										},
										success : function(response) {
											var text = Ext.decode(response.responseText);
											var success = text.success;
											MessageBox.show(success,text.json.msg);
											me.citygrid.getStore().load();
											me.cityForm.getForm().reset();
										}
									});
						}
					});
		}
	},
	
	//删除县区操作
   	onDeleteCounty : function() {
		var me = this;
		var records = me.countygrid.getSelectionModel().getSelection();
		if (records == "") {
			MessageBox.error('错误提示', '请选择删除的数据！');
			return;
		} else {
			Ext.MessageBox.confirm('询问提示', '确定要删除吗？', function(btn) {
						if (btn == 'yes') {
							var countyRecord = records[0].getData();
							Ext.Ajax.request({
										url : basePath+ '/support/doDeleteCounty.action',
										params : {
											countyKey : countyRecord.countyKey
										},
										success : function(response) {
											var text = Ext.decode(response.responseText);
											var success = text.success;
											MessageBox.show(success,text.json.msg);
											me.countygrid.getStore().load();
											me.countyForm.getForm().reset();
										}
									});
						}
					});
		}
	},
	
    // 创建第一个tab页的panel，包括一个主表grid和一个TopPanel
	createTab1Panel : function() {
		var me = this;
		this.mspanel = Ext.create('Ext.panel.Panel', {
			layout : 'border',
			border : false,
			title : '国家信息',
			items : [this.createT1P1Panel(), this.createT1P2Panel()]
		});
		return this.mspanel;
	},
    	// 底部面板，包括一个grid和一个form
	createT1P1Panel : function() {
		this.btmpanel = Ext.create('Ext.panel.Panel', {
			region : 'center',
			layout : 'border',
			items : [this.createT1P1Grid(),
			this.createT1P1Form()]
		});
		return this.btmpanel;
	},

	// 第一个tab页 下部的grid，位于center位置
	createT1P1Grid : function() {
		var me = this;
		this.nationgrid = Ext.create('widget.nationgrid', {
			region : 'center',
			listeners : {
				itemclick : function(grid, record) {
                    me.nationForm.getForm().loadRecord(record);
                  	me.nationForm.getForm().findField('nationKey').setReadOnly(true);
                }
            }
		});
		this.nationgrid.getStore().on('beforeload', function() {
            var params = this.nationgrid.getStore().getProxy().extraParams;
			var record = me.t1seltopform.getForm().getValues();
			var nationKey = record.nationKey;
			var descr = record.descr;
			var endescr = record.endescr;
			delete params.nationKey;
			delete params.descr;
			delete params.endescr;
			if (nationKey)params.nationKey = nationKey;
			if (descr)params.descr = descr;
			if (endescr)params.endescr = endescr;
			}, this);
		return this.nationgrid;
	},

	// 底部右边面板
	createT1P1Form : function() {
		var me = this;
		this.nationForm = Ext.create('Ext.form.Panel', {
			region : 'east',
			width : 320,
			split : true,
			collapsible : true,
			border : true,
			frame : true,
			defaults : {
				xtype : 'fieldcontainer',
				margin : '5 0 0 5',
				frame : true
			},
			items: 
                [
                    {
                        layout : 'hbox',
						defaults : {
							margin : '5 0 0 5',
							labelAlign : 'top',
							labelWidth : 80,
							width : 160
						},
                        items: 
                        [
                            {
                                fieldLabel: '国家代码',
                              	xtype: 'textfield',
                                allowBlank: false,
                             	listeners:{
		                            blur: function(txt){
		                                //输入参数，鼠标离开后见检查该货主是否存在
		                                nationKeyValue= Ext.util.Format.uppercase(txt.getValue());
		                                txt.setValue(nationKeyValue);
		                                Ext.Ajax.request({
		                                    url: basePath + '/support/doValidateNation.action',
		                                    params: {
		                                        nationKey:nationKeyValue
		                                    },
		                                    success: function(response){    //failure属于连不上服务器的情况，后续补充
		                                        var text = Ext.decode(response.responseText);
		                                        var success = text.success;
		                                        console.log(text.json.data.length);
		                                        if(0 != text.json.data.length)
		                                        {
		                                            me.nationForm.getForm().findField('nationKey').setValue('');
		                                            Ext.Msg.alert("错误提示", '重复，请重新输入');
		                                        }
		                                    }
		                                })
		                            }                        
                        },
                                name : 'nationKey'
                            }
                        ]
					},
                    {
                        layout : 'hbox',
                        defaults : 
                        {
                            xtype : 'textfield',
                            margin : '5 0 0 5',
                            labelAlign : 'top',
                            labelWidth : 80,
							width : 160
                        },
                        items: 
                        [
                            {
                                fieldLabel : '中文名称',
                                allowBlank : false,
                                name : 'descr',
                                listeners: 
                                {
                                    blur : function(txt) 
                                    {
                                        txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                    }
                                }
                            }
                        ]
                    }, 
                    {
                        layout: 'hbox',
                        defaults: 
                                    {
                            xtype : 'textfield',
                            margin : '5 0 0 5',
                            labelAlign : 'top',
                            labelWidth : 80,
							width : 160
                        },
                        items:
                        [
                            {
                                fieldLabel : '英文名称',
                                listeners: 
                                {
                                    blur : function(txt) 
                                    {
                                        txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                    }
                                },
                                name : 'endescr'
                            }
                        ]
                    }, 
                    {
                        layout: 'hbox',
                        defaults: 
                                    {
                            xtype : 'textfield',
                            margin : '5 0 0 5',
                            labelAlign : 'top',
                            labelWidth : 80,
							width : 160
                        },
                        items:
                        [
                            {
                                fieldLabel : '自定义一',
                                name : 'userDefine1'
                            }
                        ]
                    }, 
                    {
                        layout: 'hbox',
                        defaults: 
                                    {
                            xtype : 'textfield',
                            margin : '5 0 0 5',
                            labelAlign : 'top',
                           	labelWidth : 80,
							width : 160
                        },
                        items:
                        [
                            {
                                fieldLabel : '自定义二',
                                name : 'userDefine2'
                            }
                        ]
                    }, 
                    {
                        layout: 'hbox',
                        defaults:
                        {
                            xtype : 'textfield',
                            margin : '5 0 0 5',
                            labelAlign : 'top',
                           	labelWidth : 80,
							width : 160
                        },
                        items : 
                        [
                            {
                                fieldLabel : '自定义三',
                                name : 'userDefine3',
                                listeners: 
                                {
                                    blur : function(txt) 
                                    {
                                       txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                    }
                                }
                            }, 
                            {
                                name : 'id',
                                hidden : true
                            }, 
                            {
                                name : 'addWho',
                                hidden : true
                            }, 
                            {	
                                xtype:'datefield',
                                format:'Y-m-d H:i:s',
                                name : 'addDate',
                                hidden : true
                            }, 
                            {
                                name : 'editWho',
                                hidden : true
                            }, 
                            {
                            	xtype:'datefield',
                                format:'Y-m-d H:i:s',
                                name : 'editDate',
                                hidden : true
                            }
                        ]
                    }
				]
			});
		return this.nationForm;
	},
	
	createT1P2Panel : function() {
		var me = this;
		this.t1toppanel = Ext.create('Ext.panel.Panel', {
			region : 'north',
			border : false,
			height : 80,
			layout : 'border',
			items : [me.createT1TopPanel(),me.createT1SelTopPanel()]
		});
		return this.t1toppanel;
	},
	  //顶部查询面板
    createT1SelTopPanel : function() {
		var me = this;
		this.t1seltoppanel = Ext.create('Ext.panel.Panel', {
			region : 'center',
			border : false,
			height : 40,
			layout : 'border',
			items : [me.createT1SelTopForm()]
		});
		return this.t1seltoppanel;
	},
    createT1SelTopForm: function(){
    	var me = this;
    	this.t1seltopform = Ext.create('Ext.form.Panel',{
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
                   
                    labelWidth: 60,
                    name: 'nationKey',
                    fieldLabel: '国家代码',
                    listeners:{
                        blur:function(txt){
                          txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                        }
                    }
                },{
                    labelWidth: 60,
                    name: 'descr',
                    fieldLabel: '中文名称',
                    listeners:{
                        blur:function(txt){
                          txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                        }
                    }
                },{
                    labelWidth: 60,
                    name: 'endescr',
                    fieldLabel: '英文名称',
                    listeners:{
                        blur:function(txt){
                          txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                        }
                    }
                },
                {
                    xtype: 'button',
                     handler: me.onSelectAdministrationRegion,
                    scope: this,
                    iconCls: 'icon-search',
                    text: '查询'
                },
                {
                    xtype: 'button',
                    handler: me.onResetNation,
                    scope: this,
                    iconCls: 'icon-reset',
                    text: '重置'
                }
            ]
    	});
    	return this.t1seltopform;
    },
   
	createT1TopPanel : function() {
		var me = this;
		this.nationpanel = Ext.create('Ext.form.Panel', {
			region : 'north',
			frame : true,
			defaults : {
				xtype : 'button',
				margin : '5 0 0 5'
			},
			items : [
				{
                    handler: me.onCreateNation,
                    iconCls: 'icon-save',
                    scope: this,
                    text: '创建'
                },
                {
                    iconCls : 'icon-delete',
                    itemId : 'delete',
                    text : '删除',
                    handler : me.onDeleteNation, 
                    scope : this
				},
				{
					iconCls : 'icon-save',
					text : '保存',
					handler : me.onSaveNation,
                    scope : this
				}
				
				
            ]
		});
		return this.nationpanel;
	},
   
    // 创建第二个tab页的panel，包括一个主表grid和一个TopPanel
	createTab2Panel : function() {
		var me = this;
		this.mspanel = Ext.create('Ext.panel.Panel', {
			layout : 'border',
			border : false,
			title : '省份信息',
			items : [this.createT2P1Panel(), this.createT2P2Panel()]
		});
		return this.mspanel;
	},
    	// 底部面板，包括一个grid和一个form
	createT2P1Panel : function() {
		this.btmpanel = Ext.create('Ext.panel.Panel', {
			region : 'center',
			layout : 'border',
			items : [this.createT2P1Grid(),
			this.createT2P1Form()]
		});
		return this.btmpanel;
	},

	// 第二个tab页
	createT2P1Grid : function() {
		var me = this;
		this.provincegrid = Ext.create('widget.provincegrid', {
			region : 'center',
			listeners : {
				itemclick : function(grid, record) {
                    me.provinceForm.getForm().loadRecord(record);
                    // 加载时设置为只读，不能修改
                    me.provinceForm.getForm().findField('provinceKey').setReadOnly(true);
                }
            }
		});
		this.provincegrid.getStore().on('beforeload', function() {
            var params = this.provincegrid.getStore().getProxy().extraParams;
			var record = me.t2seltopform.getForm().getValues();
			var nationKey = record.nationKey;
			var provinceKey = record.provinceKey;
			var descr = record.descr;
			var endescr = record.endescr;
			delete params.provinceKey;
			delete params.nationKey;
			delete params.descr;
			delete params.endescr;
			if (provinceKey)params.provinceKey = provinceKey;
			if (nationKey)params.nationKey = nationKey;
			if (descr)params.descr = descr;
			if (endescr)params.endescr = endescr;
			}, this);
		return this.provincegrid;
	},

	// 底部右边面板
	createT2P1Form : function() {
			var me = this;
		this.provinceForm = Ext.create('Ext.form.Panel', {
			region : 'east',
			width : 320,
			split : true,
			collapsible : true,
			border : true,
			frame : true,
			defaults : {
				xtype : 'fieldcontainer',
				margin : '5 0 0 5',
				frame : true
			},
			items: 
                [
                    {
                        layout : 'hbox',
						defaults : {
							margin : '5 0 0 5',
							labelAlign : 'top',
							labelWidth : 80,
							width : 160
						},
                        items: 
                        [
                            {   xtype : 'nationcombo',
                                fieldLabel: '国家代码',
                                allowBlank: false,
                                listeners: 
                                {
                                    blur : function(txt) 
                                    {
                                        txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                    }
                                },
                                name : 'nationKey'
                            }
                        ]
					},
					{
                        layout : 'hbox',
						defaults : {
							xtype : 'textfield',
							margin : '5 0 0 5',
							labelAlign : 'top',
							labelWidth : 80,
							width : 160
						},
                        items: 
                        [
                            {
                                fieldLabel: '省份代码',
                                allowBlank: false,
                                listeners:{
		                            blur: function(txt){
		                                //输入参数，鼠标离开后见检查该货主是否存在
		                                provinceKeyValue= Ext.util.Format.uppercase(txt.getValue());
		                                txt.setValue(provinceKeyValue);
		                                Ext.Ajax.request({
		                                    url: basePath + '/support/doValidateProvince.action',
		                                    params: {
		                                        provinceKey:provinceKeyValue
		                                    },
		                                    success: function(response){    //failure属于连不上服务器的情况，后续补充
		                                        var text = Ext.decode(response.responseText);
		                                        var success = text.success;
		                                        console.log(text.json.data.length);
		                                        if(0 != text.json.data.length)
		                                        {
		                                            me.provinceForm.getForm().findField('provinceKey').setValue('');
		                                            Ext.Msg.alert("错误提示", '重复，请重新输入');
		                                        }
		                                    }
		                                })
		                            }                        
                        },
                                name : 'provinceKey'
                            }
                        ]
					},
                    {
                        layout : 'hbox',
                        defaults : 
                        {
                            xtype : 'textfield',
                            margin : '5 0 0 5',
                            labelAlign : 'top',
                            labelWidth : 80,
							width : 160
                        },
                        items: 
                        [
                            {
                                fieldLabel : '中文名称',
                                allowBlank : false,
                                name : 'descr',
                                listeners: 
                                {
                                    blur : function(txt) 
                                    {
                                        txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                    }
                                }
                            }
                        ]
                    }, 
                    {
                        layout: 'hbox',
                        defaults: 
                                    {
                            xtype : 'textfield',
                            margin : '5 0 0 5',
                            labelAlign : 'top',
                            labelWidth : 80,
							width : 160
                        },
                        items:
                        [
                            {
                                fieldLabel : '英文名称',
                                name : 'endescr',
                                listeners: 
                                {
                                    blur : function(txt) 
                                    {
                                        txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                    }
                                }
                            }
                        ]
                    }, 
                    {
                        layout: 'hbox',
                        defaults: 
                                    {
                            xtype : 'textfield',
                            margin : '5 0 0 5',
                            labelAlign : 'top',
                            labelWidth : 80,
							width : 160
                        },
                        items:
                        [
                            {
                                fieldLabel : '自定义一',
                                name : 'userDefine1'
                            }
                        ]
                    }, 
                    {
                        layout: 'hbox',
                        defaults: 
                                    {
                            xtype : 'textfield',
                            margin : '5 0 0 5',
                            labelAlign : 'top',
                           	labelWidth : 80,
							width : 160
                        },
                        items:
                        [
                            {
                                fieldLabel : '自定义二',
                                name : 'userDefine2'
                            }
                        ]
                    }, 
                    {
                        layout: 'hbox',
                        defaults:
                        {
                            xtype : 'textfield',
                            margin : '5 0 0 5',
                            labelAlign : 'top',
                           	labelWidth : 80,
							width : 160
                        },
                        items : 
                        [
                            {
                                fieldLabel : '自定义三',
                                name : 'userDefine3',
                                listeners: 
                                {
                                    blur : function(txt) 
                                    {
                                       txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                    }
                                }
                            }, 
                            {
                                name : 'id',
                                hidden : true
                            }, 
                            {
                                name : 'addWho',
                                hidden : true
                            }, 
                            {
                            	xtype:'datefield',
                                format:'Y-m-d H:i:s',
                                name : 'addDate',
                                hidden : true
                            }, 
                            {
                                name : 'editWho',
                                hidden : true
                            }, 
                            {
                            	xtype:'datefield',
                                format:'Y-m-d H:i:s',
                                name : 'editDate',
                                hidden : true
                            }
                        ]
                    }
				]
			});
		return this.provinceForm;
	},
	
	createT2P2Panel : function() {
		var me = this;
		this.t2toppanel = Ext.create('Ext.panel.Panel', {
			region : 'north',
			border : false,
			height : 80,
			layout : 'border',
			items : [me.createT2TopPanel(),me.createT2SelTopPanel()]
		});
		return this.t2toppanel;
	},
	  //顶部查询面板
    createT2SelTopPanel : function() {
		var me = this;
		this.t2seltoppanel = Ext.create('Ext.panel.Panel', {
			region : 'center',
			border : false,
			height : 40,
			layout : 'border',
			items : [me.createT2SelTopForm()]
		});
		return this.t2seltoppanel;
	},
    createT2SelTopForm: function(){
    	var me = this;
    	this.t2seltopform = Ext.create('Ext.form.Panel',{
    		region: 'north',
    		frame: true,
    		layout: 'hbox',
    		border: false,
    		height: 50,
    		defaults: {
    			 xtype: 'codecombo'
    		},
    		items:[
                {
                    xtype: 'textfield',
                    labelWidth: 60,
                    name: 'nationKey',
                    fieldLabel: '国家代码',
                    listeners:{
                        blur:function(txt){
                          txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                        }
                    }
                },{
                     xtype: 'textfield',
                    labelWidth: 60,
                    name: 'provinceKey',
                    fieldLabel: '省份代码',
                    listeners:{
                        blur:function(txt){
                          txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                        }
                    }
                },{
                     xtype: 'textfield',
                    labelWidth: 60,
                    name: 'descr',
                    fieldLabel: '中文名称',
                    listeners:{
                        blur:function(txt){
                          txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                        }
                    }
                },{
                    xtype: 'textfield',
                    labelWidth: 60,
                    name: 'endescr',
                    fieldLabel: '英文名称',
                    listeners:{
                        blur:function(txt){
                          txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                        }
                    }
                },
                {
                    xtype: 'button',
                     handler: me.onSelectAdministrationRegion,
                    scope: this,
                    iconCls: 'icon-search',
                    text: '查询'
                },
                {
                    xtype: 'button',
                    handler: me.onResetProvince,
                    scope: this,
                    iconCls: 'icon-reset',
                    text: '重置'
                }
            ]
    	});
    	return this.t2seltopform;
    },
	createT2TopPanel : function() {
		var me = this;
		this.provincepanel = Ext.create('Ext.form.Panel', {
			region : 'north',
			frame : true,
			defaults : {
				xtype : 'button',
				margin : '5 0 0 5'
			},
			items : [
				{
                    handler: me.onCreateProvince,
                    scope: this,
                    iconCls: 'icon-save',
                    text: '创建'
                },
				{
                    iconCls : 'icon-delete',
                    itemId : 'delete',
                    text : '删除',
                    handler : me.onDeleteProvince, 
                    scope : this
				}, 
				{
					iconCls : 'icon-save',
					text : '保存',
					handler : me.onSaveProvince,
                    scope : this
				}
            ]
		});
		return this.provincepanel;
	},
	
	 // 创建Tab3
	createTab3Panel : function() {
		var me = this;
		this.mspanel = Ext.create('Ext.panel.Panel', {
			layout : 'border',
			border : false,
			title : '城市信息',
			items : [this.createT3P1Panel(), this.createT3P2Panel()]
		});
		return this.mspanel;
	},
    	// 底部面板，包括一个grid和一个form
	createT3P1Panel : function() {
		this.btmpanel = Ext.create('Ext.panel.Panel', {
			region : 'center',
			layout : 'border',
			items : [this.createT3P1Grid(),
			this.createT3P1Form()]
		});
		return this.btmpanel;
	},

	// 第一个tab页 下部的grid，位于center位置
	createT3P1Grid : function() {
		var me = this;
		this.citygrid = Ext.create('widget.citygrid', {
			region : 'center',
			listeners : {
				itemclick : function(grid, record) {
                    me.cityForm.getForm().loadRecord(record);
                    me.cityForm.getForm().findField('cityKey').setReadOnly(true);
                }
            }
		});
		this.citygrid.getStore().on('beforeload', function() {
            var params = this.citygrid.getStore().getProxy().extraParams;
			var record = me.t3seltopform.getForm().getValues();
			var provinceKey = record.provinceKey;
			var cityKey = record.cityKey;
			var descr = record.descr;
			var endescr = record.endescr;
			delete params.provinceKey;
			delete params.cityKey;
			delete params.descr;
			delete params.endescr;
			if (provinceKey)params.provinceKey = provinceKey;
			if (cityKey)params.cityKey = cityKey;
			if (descr)params.descr = descr;
			if (endescr)params.endescr = endescr;
			}, this);
		return this.citygrid;
	},

	// 底部右边面板
	createT3P1Form : function() {
			var me = this;
		this.cityForm = Ext.create('Ext.form.Panel', {
			region : 'east',
			width : 320,
			split : true,
			collapsible : true,
			border : true,
			frame : true,
			defaults : {
				xtype : 'fieldcontainer',
				margin : '5 0 0 5',
				frame : true
			},
			items: 
                [
                    {
                        layout : 'hbox',
						defaults : {
							margin : '5 0 0 5',
							labelAlign : 'top',
							labelWidth : 80,
							width : 160
						},
                        items: 
                        [
                            {	
                           		 xtype : 'provincecombo',
                                fieldLabel: '省份代码',
                                allowBlank: false,
                                listeners: 
                                {
                                    blur : function(txt) 
                                    {
                                        txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                    }
                                },
                                name : 'provinceKey'
                            }
                        ]
					},
					{
                        layout : 'hbox',
						defaults : {
							xtype : 'textfield',
							margin : '5 0 0 5',
							labelAlign : 'top',
							labelWidth : 80,
							width : 160
						},
                        items: 
                        [
                            {
                                fieldLabel: '城市代码',
                                allowBlank: false,
                                listeners:{
		                            blur: function(txt){
		                                //输入参数，鼠标离开后见检查该货主是否存在
		                                cityKeyValue= Ext.util.Format.uppercase(txt.getValue());
		                                txt.setValue(cityKeyValue);
		                                Ext.Ajax.request({
		                                    url: basePath + '/support/doValidateCity.action',
		                                    params: {
		                                        cityKey:cityKeyValue
		                                    },
		                                    success: function(response){    //failure属于连不上服务器的情况，后续补充
		                                        var text = Ext.decode(response.responseText);
		                                        var success = text.success;
		                                        console.log(text.json.data.length);
		                                        if(0 != text.json.data.length)
		                                        {
		                                            me.cityForm.getForm().findField('cityKey').setValue('');
		                                            Ext.Msg.alert("错误提示", '重复，请重新输入');
		                                        }
		                                    }
		                                })
		                            }                        
                        },
                                name : 'cityKey'
                            }
                        ]
					},
                    {
                        layout : 'hbox',
                        defaults : 
                        {
                            xtype : 'textfield',
                            margin : '5 0 0 5',
                            labelAlign : 'top',
                            labelWidth : 80,
							width : 160
                        },
                        items: 
                        [
                            {
                                fieldLabel : '中文名称',
                                allowBlank : false,
                                name : 'descr',
                                listeners: 
                                {
                                    blur : function(txt) 
                                    {
                                        txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                    }
                                }
                            }
                        ]
                    }, 
                    {
                        layout: 'hbox',
                        defaults: 
                                    {
                            xtype : 'textfield',
                            margin : '5 0 0 5',
                            labelAlign : 'top',
                            labelWidth : 80,
							width : 160
                        },
                        items:
                        [
                            {
                                fieldLabel : '英文名称',
                                name : 'endescr'
                            }
                        ]
                    }, 
                    {
                        layout: 'hbox',
                        defaults: 
                                    {
                            xtype : 'textfield',
                            margin : '5 0 0 5',
                            labelAlign : 'top',
                            labelWidth : 80,
							width : 160
                        },
                        items:
                        [
                            {
                                fieldLabel : '自定义一',
                                name : 'userDefine1'
                            }
                        ]
                    }, 
                    {
                        layout: 'hbox',
                        defaults: 
                                    {
                            xtype : 'textfield',
                            margin : '5 0 0 5',
                            labelAlign : 'top',
                           	labelWidth : 80,
							width : 160
                        },
                        items:
                        [
                            {
                                fieldLabel : '自定义二',
                                name : 'userDefine2'
                            }
                        ]
                    }, 
                    {
                        layout: 'hbox',
                        defaults:
                        {
                            xtype : 'textfield',
                            margin : '5 0 0 5',
                            labelAlign : 'top',
                           	labelWidth : 80,
							width : 160
                        },
                        items : 
                        [
                            {
                                fieldLabel : '自定义三',
                                name : 'userDefine3',
                                listeners: 
                                {
                                    blur : function(txt) 
                                    {
                                       txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                    }
                                }
                            }, 
                            {
                                name : 'id',
                                hidden : true
                            }, 
                            {
                                name : 'addWho',
                                hidden : true
                            }, 
                            {
                            	xtype:'datefield',
                                format:'Y-m-d H:i:s',
                                name : 'addDate',
                                hidden : true
                            }, 
                            {
                                name : 'editWho',
                                hidden : true
                            }, 
                            {
                            	xtype:'datefield',
                                format:'Y-m-d H:i:s',
                                name : 'editDate',
                                hidden : true
                            }
                        ]
                    }
				]
			});
		return this.cityForm;
	},
	
	createT3P2Panel : function() {
		var me = this;
		this.t3toppanel = Ext.create('Ext.panel.Panel', {
			region : 'north',
			border : false,
			height : 80,
			layout : 'border',
			items : [me.createT3TopPanel(),me.createT3SelTopPanel()]
		});
		return this.t3toppanel;
	},
	
	  //顶部查询面板
    createT3SelTopPanel : function() {
		var me = this;
		this.t3seltoppanel = Ext.create('Ext.panel.Panel', {
			region : 'center',
			border : false,
			height : 40,
			layout : 'border',
			items : [me.createT3SelTopForm()]
		});
		return this.t3seltoppanel;
	},
    createT3SelTopForm: function(){
    	var me = this;
    	this.t3seltopform = Ext.create('Ext.form.Panel',{
    		region: 'north',
    		frame: true,
    		layout: 'hbox',
    		border: false,
    		height: 50,
    		items:[
                {
                    xtype: 'textfield',
                    labelWidth: 60,
                    name: 'provinceKey',
                    fieldLabel: '省份代码',
                    listeners:{
                        blur:function(txt){
                          txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                        }
                    }
                },{
                     xtype: 'textfield',
                    labelWidth: 60,
                    name: 'cityKey',
                    fieldLabel: '城市代码',
                    listeners:{
                        blur:function(txt){
                          txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                        }
                    }
                },{
                     xtype: 'textfield',
                    labelWidth: 60,
                    name: 'descr',
                    fieldLabel: '中文名称',
                    listeners:{
                        blur:function(txt){
                          txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                        }
                    }
                },{
                    xtype: 'textfield',
                    labelWidth: 60,
                    name: 'endescr',
                    fieldLabel: '英文名称',
                    listeners:{
                        blur:function(txt){
                          txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                        }
                    }
                },
                {
                    xtype: 'button',
                     handler: me.onSelectAdministrationRegion,
                    scope: this,
                    iconCls: 'icon-search',
                    text: '查询'
                },
                {
                    xtype: 'button',
                    handler: me.onResetCity,
                    scope: this,
                    iconCls: 'icon-reset',
                    text: '重置'
                }
            ]
    	});
    	return this.t3seltopform;
    },
	createT3TopPanel : function() {
		var me = this;
		this.citypanel = Ext.create('Ext.form.Panel', {
			region : 'north',
			frame : true,
			defaults : {
				xtype : 'button',
				margin : '5 0 0 5'
			},
			items : [
				 {
                    handler: me.onCreateCity,
                    scope: this,
                    iconCls: 'icon-save',
                    text: '创建'
                },
				{
                    iconCls : 'icon-delete',
                    itemId : 'delete',
                    text : '删除',
                    handler : me.onDeleteCity, 
                    scope : this
				}, 
				{
					iconCls : 'icon-save',
					text : '保存',
					handler : me.onSaveCity,
                    scope : this
				}
            ]
		});
		return this.citypanel;
	},
	 // 创建第一个tab页的panel，包括一个主表grid和一个TopPanel
	createTab4Panel : function() {
		var me = this;
		this.mspanel = Ext.create('Ext.panel.Panel', {
			layout : 'border',
			border : false,
			title : '区县信息',
			items : [this.createT4p1Panel(), this.createT4P2Panel()]
		});
		return this.mspanel;
	},
    	// 底部面板，包括一个grid和一个form
	createT4p1Panel : function() {
		this.btmpanel = Ext.create('Ext.panel.Panel', {
			region : 'center',
			layout : 'border',
			items : [this.createT4p1Grid(),
			this.createT4p1Form()]
		});
		return this.btmpanel;
	},

	// 第一个tab页 下部的grid，位于center位置
	createT4p1Grid : function() {
		var me = this;
		this.countygrid = Ext.create('widget.countygrid', {
			region : 'center',
			listeners : {
				itemclick : function(grid, record) {
                    me.countyForm.getForm().loadRecord(record);
                     me.countyForm.getForm().findField('countyKey').setReadOnly(true);
                }
            }
		});
		this.countygrid.getStore().on('beforeload', function() {
            var params = this.countygrid.getStore().getProxy().extraParams;
			var record = me.t4seltopform.getForm().getValues();
			var descr = record.descr;
			var endescr = record.endescr;
			var cityKey = record.cityKey;
			var countyKey = record.countyKey;
			delete params.nationKey;
			delete params.provinceKey;
			delete params.cityKey;
			delete params.countyKey;
			if (descr)params.descr = descr;
			if (endescr)params.endescr = endescr;
			if (cityKey)params.cityKey = cityKey;
			if (countyKey)params.countyKey = countyKey;
			}, this);
		return this.countygrid;
	},

	// 底部右边面板
	createT4p1Form : function() {
		    	var me = this;
		this.countyForm = Ext.create('Ext.form.Panel', {
			region : 'east',
			width : 320,
			split : true,
			collapsible : true,
			border : true,
			frame : true,
			defaults : {
				xtype : 'fieldcontainer',
				margin : '5 0 0 5',
				frame : true
			},
			items: 
                [
                    {
                        layout : 'hbox',
						defaults : {
							margin : '5 0 0 5',
							labelAlign : 'top',
							labelWidth : 80,
							width : 160
						},
                        items: 
                        [
                            {
                           		 xtype : 'citycombo',
                                fieldLabel: '城市代码',
                                allowBlank: false,
                                listeners: 
                                {
                                    blur : function(txt) 
                                    {
                                        txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                    }
                                },
                                name : 'cityKey'
                            }
                        ]
					},
					{
                        layout : 'hbox',
						defaults : {
							xtype : 'textfield',
							margin : '5 0 0 5',
							labelAlign : 'top',
							labelWidth : 80,
							width : 160
						},
                        items: 
                        [
                            {
                                fieldLabel: '县区代码',
                                allowBlank: false,
                                listeners:{
		                            blur: function(txt){
		                                //输入参数，鼠标离开后见检查该货主是否存在
		                                countyKeyValue= Ext.util.Format.uppercase(txt.getValue());
		                                txt.setValue(countyKeyValue);
		                                Ext.Ajax.request({
		                                    url: basePath + '/support/doValidateCounty.action',
		                                    params: {
		                                        countyKey:countyKeyValue
		                                    },
		                                    success: function(response){    //failure属于连不上服务器的情况，后续补充
		                                        var text = Ext.decode(response.responseText);
		                                        var success = text.success;
		                                        console.log(text.json.data.length);
		                                        if(0 != text.json.data.length)
		                                        {
		                                            me.countyForm.getForm().findField('countyKey').setValue('');
		                                            Ext.Msg.alert("错误提示", '重复，请重新输入');
		                                        }
		                                    }
		                                })
		                            }                        
                        },
                                name : 'countyKey'
                            }
                        ]
					},
                    {
                        layout : 'hbox',
                        defaults : 
                        {
                            xtype : 'textfield',
                            margin : '5 0 0 5',
                            labelAlign : 'top',
                            labelWidth : 80,
							width : 160
                        },
                        items: 
                        [
                            {
                                fieldLabel : '中文名称',
                                allowBlank : false,
                                name : 'descr',
                                listeners: 
                                {
                                    blur : function(txt) 
                                    {
                                        txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                    }
                                }
                            }
                        ]
                    }, 
                    {
                        layout: 'hbox',
                        defaults: 
                                    {
                            xtype : 'textfield',
                            margin : '5 0 0 5',
                            labelAlign : 'top',
                            labelWidth : 80,
							width : 160
                        },
                        items:
                        [
                            {
                                fieldLabel : '英文名称',
                                name : 'endescr'
                            }
                        ]
                    }, 
                    {
                        layout: 'hbox',
                        defaults: 
                                    {
                            xtype : 'textfield',
                            margin : '5 0 0 5',
                            labelAlign : 'top',
                            labelWidth : 80,
							width : 160
                        },
                        items:
                        [
                            {
                                fieldLabel : '自定义一',
                                name : 'userDefine1'
                            }
                        ]
                    }, 
                    {
                        layout: 'hbox',
                        defaults: 
                                    {
                            xtype : 'textfield',
                            margin : '5 0 0 5',
                            labelAlign : 'top',
                           	labelWidth : 80,
							width : 160
                        },
                        items:
                        [
                            {
                                fieldLabel : '自定义二',
                                name : 'userDefine2'
                            }
                        ]
                    }, 
                    {
                        layout: 'hbox',
                        defaults:
                        {
                            xtype : 'textfield',
                            margin : '5 0 0 5',
                            labelAlign : 'top',
                           	labelWidth : 80,
							width : 160
                        },
                        items : 
                        [
                            {
                                fieldLabel : '自定义三',
                                name : 'userDefine3',
                                listeners: 
                                {
                                    blur : function(txt) 
                                    {
                                       txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                    }
                                }
                            }, 
                            {
                                name : 'id',
                                hidden : true
                            }, 
                            {
                                name : 'addWho',
                                hidden : true
                            }, 
                            {
                            	xtype:'datefield',
                                format:'Y-m-d H:i:s',
                                name : 'addDate',
                                hidden : true
                            }, 
                            {
                                name : 'editWho',
                                hidden : true
                            }, 
                            {
                            	xtype:'datefield',
                                format:'Y-m-d H:i:s',
                                name : 'editDate',
                                hidden : true
                            }
                        ]
                    }
				]
			});
		return this.countyForm;
	},
	
	createT4P2Panel : function() {
		var me = this;
		this.t4toppanel = Ext.create('Ext.panel.Panel', {
			region : 'north',
			border : false,
			height : 80,
			layout : 'border',
			items : [me.createT4TopPanel(),me.createT4SelTopPanel()]
		});
		return this.t4toppanel;
	},
	  //顶部查询面板
    createT4SelTopPanel : function() {
		var me = this;
		this.t4seltoppanel = Ext.create('Ext.panel.Panel', {
			region : 'center',
			border : false,
			height : 40,
			layout : 'border',
			items : [me.createT4SelTopForm()]
		});
		return this.t4seltoppanel;
	},
    createT4SelTopForm: function(){
    	var me = this;
    	this.t4seltopform = Ext.create('Ext.form.Panel',{
    		region: 'north',
    		frame: true,
    		layout: 'hbox',
    		border: false,
    		height: 50,
    		items:[
                {
                    xtype: 'textfield',
                    labelWidth: 60,
                    name: 'cityKey',
                    fieldLabel: '城市代码',
                    listeners:{
                        blur:function(txt){
                          txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                        }
                    }
                },{
                     xtype: 'textfield',
                    labelWidth: 60,
                    name: 'countyKey',
                    fieldLabel: '县区代码',
                    listeners:{
                        blur:function(txt){
                          txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                        }
                    }
                },{
                     xtype: 'textfield',
                    labelWidth: 60,
                    name: 'descr',
                    fieldLabel: '中文名称',
                    listeners:{
                        blur:function(txt){
                          txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                        }
                    }
                },{
                    xtype: 'textfield',
                    labelWidth: 60,
                    name: 'endescr',
                    fieldLabel: '英文名称',
                    listeners:{
                        blur:function(txt){
                          txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                        }
                    }
                },
                {
                    xtype: 'button',
                     handler: me.onSelectAdministrationRegion,
                    scope: this,
                    iconCls: 'icon-search',
                    text: '查询'
                },
                {
                    xtype: 'button',
                    handler: me.onResetCounty,
                    scope: this,
                    iconCls: 'icon-reset',
                    text: '重置'
                }
            ]
    	});
    	return this.t4seltopform;
    },
	createT4TopPanel : function() {
		var me = this;
		this.countypanel = Ext.create('Ext.form.Panel', {
			region : 'north',
			frame : true,
			defaults : {
				xtype : 'button',
				margin : '5 0 0 5'
			},
			items : [
				 {
                    handler: me.onCreateCounty,
                    scope: this,
                    iconCls: 'icon-save',
                    text: '创建'
                },
				{
                    iconCls : 'icon-delete',
                    itemId : 'delete',
                    text : '删除',
                    handler : me.onDeleteCounty, 
                    scope : this
				}, 
				{
					iconCls : 'icon-save',
					text : '保存',
					handler : me.onSaveCounty,
                    scope : this
				}
            ]
		});
		return this.countypanel;
	}
    
});


Ext.onReady(function(){
	Ext.create('Ext.container.Viewport', {
	    layout: 'border',
	    items: [{
	    	xtype:'administrationregion',
	    	region:'center'
	    }]
	});
});