
Ext.define('Dictionary', {
    extend: 'Ext.data.Model',
    fields: [
		{name:'id'},
		{name:'dictType'},
		{name:'dictValue'},
		{name:'dictCode'},
		{name:'dictDesc'},
		{name:'dictSort'},
		{name:'ediCode'}
	]
});
Ext.define('Types', {
    extend: 'Ext.data.Model',
    fields: [
    	{name: 'id'},
        {name: 'dictValue'}
    ]
});

Ext.define('Redm.DTLeftGrid',{
	extend: 'Redm.BaseGrid',
	alias: 'widget.dtleftgrid',
	columnLines: true, 
	initComponent: function() {
        this.buildStore(basePath + '/system/queryDictionaryTypes.action','Types',200);
        this.callParent(arguments);
	},
	buildColumns: function(){
		this.columns = [
			{ header: "id", dataIndex: 'id', width: 60, hidden: true},
		    { header: "业务类型", dataIndex: 'dictValue', sortable: true, flex: 1}
		];
	},
	buildDockedItems: function(){
		var me = this;
		this.dockedItems = [{
			xtype: 'toolbar',
            dock: 'top',
            items: [{
               	fieldLabel: '快速搜索',
                labelWidth: 60,
                height: 22,
                width: 190,
                emptyText: '输入业务类型名称',
                xtype: 'searchfield',
                store: me.store
            }]
		}]
	}
});

Ext.define('Redm.system.DictionaryGrid', {
    extend: 'Redm.BaseGrid',
    alias : 'widget.dictionarygrid',
    loadMask: true,
    forceLayout:true,
    parentId: null,
    dockedItems: [],
    selType: 'cellmodel', 
    columnLines: true, 
    initComponent: function(){
    	this.selModel = Ext.create('Ext.selection.CheckboxModel');
    	this.buildStore(basePath + '/system/queryDictionarysByType.action','Dictionary',20);
        this.callParent(arguments);
        /*this.store.on('beforeload',function(store,op){
        },this);*/
    },
    buildColumns: function(){
        this.columns = [
			{ header: "id", dataIndex: 'id', hidden: true},
		    { header: "序列值", dataIndex: 'dictSort',align: 'left', width: 60,field: {xtype:'numberfield'}},
		    { header: "业务名称", dataIndex: 'dictValue',align: 'left', width: 200,field: {xtype:'textfield',allowBlank: false}},
		    { header: "业务代码", dataIndex: 'dictCode', width: 140,field:{xtype:'textfield'}},
		    { header: "业务描述", dataIndex: 'dictDesc', flex: 1,field:{xtype:'textfield'}}
		];
		return true;
    },
	buildDockedItems: function(){
		this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                text: '创建',
                scope: this,
                iconCls: 'icon-create',
                handler: this.onCreate
            },'-',{
                itemId: 'delete',
                text: '删除',
                scope: this,
                iconCls: 'icon-delete',
                handler: this.onRemoveDate
            },'-',{
                itemId: 'save',
                text: '保存',
                scope: this,
                iconCls: 'icon-save',
                handler: this.onEdit
            }]
        },{
	        xtype: 'pagingtoolbar',
	        store: this.store,
	        dock: 'bottom',
	        displayInfo: true
	    }];
	},
    onRemoveDate: function(){
    	var me = this;
    	var records = me.getSelectionModel().getSelection(); 
    	if (Ext.isEmpty(records)) {
			MessageBox.error("错误提示","请先选择要删除的数据！");
			return false;
		}
		var datas = [];
		Ext.Array.each(records,function(model,i){
			if(!model.get('id')){
				me.getStore().remove(model);
			}else{
				datas.push(model.get('id'));
			}
		});
		if(!Ext.isEmpty(datas)){
			var myMask = new Ext.LoadMask(me.getEl(), {msg:"请稍候..."});
			myMask.show();
			try{
				Ext.Ajax.request({
				    url: basePath + '/system/deleteDictionaryByIds.action',
				    params: {ids: datas},
				    success: function(response){
				        var data = Ext.decode(response.responseText);
		                MessageBox.show(true,data.json.msg,function(){
		                	myMask.hide();
					   	 	me.getStore().load();
		                });
				    },
				    failure: function(response, opts) {
				    	var data = Ext.decode(response.responseText);
				    	MessageBox.show(false,data.json.msg,function(){
		                	myMask.hide();
		                });
				    }
				});
			}catch(e){
				myMask.hide();
			}
		}
		return true;
    },
    onEdit: function(){
    	var me = this;
    	var records = me.getStore().getRange(); 
    	if (Ext.isEmpty(records)) {
    		MessageBox.error("错误提示","没有数据保存数据！");
			return false;
		}
		var datas = [];
		Ext.Array.each(records,function(model,i){
			if(model.get('dictValue')){
				datas.push(model.data);
			}
		});
		if(!Ext.isEmpty(datas)){
			var myMask = new Ext.LoadMask(me.getEl(), {msg:"请稍候..."});
			myMask.show();
			Ext.Ajax.request({
			    url: basePath + '/system/saveDictionary.action',
			    params: {data: Ext.encode(datas)},
			    success: function(response){
			        var data = Ext.decode(response.responseText);
	                MessageBox.show(true,data.json.msg,function(){
	                	myMask.hide();
				   	 	me.getStore().load();
	                });
	                
			    },
			    failure: function(response, opts) {
			    	var data = Ext.decode(response.responseText);
	                MessageBox.show(false,data.json.msg,function(){
	                	myMask.hide();
	                });
			    }
			});
		}
		return true;
    },
    onCreate: function(){
    	var params = this.getStore().getProxy().extraParams;
        if(params.dictValue){
        	var dict = Ext.create('Dictionary',{dictType:params.dictValue});
    		this.store.add(dict);
        }else{
        	MessageBox.error("错误提示","请先选择所属业务类型！");
        }
    },
	plugins:[ Ext.create('Ext.grid.plugin.CellEditing', {
		clicksToEdit: 1
	})]
});

Ext.define('Redm.system.DictionaryTree', {
    extend: 'Ext.tree.Panel',
    alias : 'widget.dictionarytree',
    useArrows: true,
    rootVisible: false,
    loadMask: true,
    columns: [{
        xtype: 'treecolumn',
        text: '业务类型',
        flex: 1,
        sortable: true,
        dataIndex: 'dictValue'
    }],
    initComponent:function(){
    	var me = this;
    	this.store = Ext.create('Ext.data.TreeStore', {
	        model: 'Types',
	        autoLoad: false,
	        proxy: {
	            type: 'ajax',
	            actionMethods: { read: 'POST' },
	            url: basePath + '/system/queryDictionaryTypes.action'
	        },
	        root: {expanded:false},
	        folderSort: false
	    });
	    this.store.on({
	    	'load': function(store,records){
		    	var root = store.proxy.reader.jsonData.json.data;
		    	store.setRootNode(root);
		    	me.reloadData();
	    	},
	    	'beforeload': function(store,opera){
		    	return true;
		    }
	    });
	    this.callParent(arguments);
    },
	reloadData: function(){
		this.fireEvent('reloaddata');
	},
	openResource: function(){
		var model = this.getSelectionModel().getSelection()[0];
		this.fireEvent('itemclick',this,model);
	}
});


Ext.define('DictionaryManager.App', {
	extend: 'Ext.panel.Panel',
	alias : 'widget.dictionarymanager',
    layout: 'border',
    region: 'center',
    title: '数据字典',
	iconCls: 'icon-win',
    items: [ {
    	width: 200,
    	itemId: 'treep',
    	region: 'west',
        xtype: 'dtleftgrid'
    },{
    	region: 'center',
    	itemId: 'gridp',
    	xtype: 'dictionarygrid'
    }],
    initComponent: function(){
        this.callParent(arguments);
       	var grid = this.getComponent('gridp');
        this.getComponent('treep').on('itemclick',function(view,record){
        	var dictValue = record.get('dictValue');
        	var store = grid.getStore();
        	var params = store.getProxy().extraParams;
        	params.dictValue = dictValue;
        	store.load();
        },this);
        /*var greep = this.getComponent('treep');
        greep.modelTree.on('reloaddata',function(){
        	var store = grid.getStore();
        	var params = store.getProxy().extraParams;
        	if (params.dictValue) {
                 delete params.dictValue;
            }
        	store.load();
        },this);*/
    }
});

Ext.onReady(function(){
	var app = new DictionaryManager.App();
	Ext.create('Ext.container.Viewport', {
	    layout: 'border',
	    items: [app]
	});
});