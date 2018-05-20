/**********************************

批校验  LotValidate.js


************************************/


Ext.define('LotValidate', {
    extend: 'Ext.data.Model',
    fields: [
		{name:'id'},
		{name:'lotKey'},
		{name:'descr'},
		{name:'displabel01'},
		{name:'displabel02'},
		{name:'displabel03'},
		{name:'displabel04'},
		{name:'displabel05'},
		{name:'displabel06'},
		{name:'displabel07'},
		{name:'displabel08'},
		{name:'displabel09'},
		{name:'displabel10'},
		{name:'displabel11'},
		{name:'displabel12'},
		{name:'displabel13'},
		{name:'displabel14'},
		{name:'displabel15'},
		{name:'displabel16'},
		{name:'displabel17'},
		{name:'displabel18'},
		{name:'displabel19'},
		{name:'displabel20'},
		{name:'rflabel01'},
		{name:'rflabel02'},
		{name:'rflabel03'},
		{name:'rflabel04'},
		{name:'rflabel05'},
		{name:'rflabel06'},
		{name:'rflabel07'},
		{name:'rflabel08'},
		{name:'rflabel09'},
		{name:'rflabel10'},
		{name:'rflabel11'},
		{name:'rflabel12'},
		{name:'rflabel13'},
		{name:'rflabel14'},
		{name:'rflabel15'},
		{name:'rflabel16'},
		{name:'rflabel17'},
		{name:'rflabel18'},
		{name:'rflabel19'},
		{name:'rflabel20'},
		{name:'control01'},
		{name:'control02'},
		{name:'control03'},
		{name:'control04'},
		{name:'control05'},
		{name:'control06'},
		{name:'control07'},
		{name:'control08'},
		{name:'control09'},
		{name:'control10'},
		{name:'control11'},
		{name:'control12'},
		{name:'control13'},
		{name:'control14'},
		{name:'control15'},
		{name:'control16'},
		{name:'control17'},
		{name:'control18'},
		{name:'control19'},
		{name:'control20'},
		{name:'format01'},
		{name:'format02'},
		{name:'format03'},
		{name:'format04'},
		{name:'format05'},
		{name:'format06'},
		{name:'format07'},
		{name:'format08'},
		{name:'format09'},
		{name:'format10'},
		{name:'format11'},
		{name:'format12'},
		{name:'format13'},
		{name:'format14'},
		{name:'format15'},
		{name:'format16'},
		{name:'format17'},
		{name:'format18'},
		{name:'format19'},
		{name:'format20'},
		{name:'content01',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
		{name:'content02',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
		{name:'content03',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
		{name:'content04'},
		{name:'content05'},
		{name:'content06'},
		{name:'content07'},
		{name:'content08'},
		{name:'content09'},
		{name:'content10'},
		{name:'content11'},
		{name:'content12'},
		{name:'content13'},
		{name:'content14'},
		{name:'content15'},		
		{name:'content16'},
		{name:'content17'},
		{name:'content18'},
		{name:'content19'},
		{name:'content20'},		
		{name:'socontent01',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
		{name:'socontent02',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
		{name:'socontent03',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
		{name:'socontent04'},
		{name:'socontent05'},
		{name:'socontent06'},
		{name:'socontent07'},
		{name:'socontent08'},
		{name:'socontent09'},
		{name:'socontent10'},
		{name:'socontent11'},
		{name:'socontent12'},
		{name:'socontent13'},
		{name:'socontent14'},
		{name:'socontent15'},
		{name:'socontent16'},
		{name:'socontent17'},
		{name:'socontent18'},
		{name:'socontent19'},
		{name:'socontent20'},
		{name:'addDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},     
		{name:'addWho'}        
	],
    idProperty: 'id'
});

Ext.define('Redm.support.LotValidateGrid', {
    extend: 'Redm.BaseGrid',
    alias : 'widget.lotvalidategrid',
    loadMask: true,
    forceLayout:true,
    buildColumns: function(){
        this.columns = [
		    { header: "批校验", dataIndex: 'lotKey',sortable: true,width: 100},
		    { header: "描述", dataIndex: 'descr', sortable: true, width: 120},
		    { header: "标签描述01", dataIndex: 'displabel01',sortable: true,width: 100},
		    { header: "标签描述02", dataIndex: 'displabel02', sortable: true, width: 100},
		    { header: "标签描述03", dataIndex: 'displabel03',sortable: true,width: 100},
		    { header: "标签描述04", dataIndex: 'displabel04', sortable: true, width: 100},
		    { header: "标签描述05", dataIndex: 'displabel05',sortable: true,width: 100},
		    { header: "标签描述06", dataIndex: 'displabel06', sortable: true, width: 100},
		    { header: "标签描述07", dataIndex: 'displabel07',sortable: true,width: 100},
		    { header: "标签描述08", dataIndex: 'displabel08', sortable: true, width: 100},
		    { header: "标签描述09", dataIndex: 'displabel09',sortable: true,width: 100},
		    { header: "标签描述10", dataIndex: 'displabel10', sortable: true, width: 100},
		    { header: "标签描述11", dataIndex: 'displabel11',sortable: true,width: 100},
		    { header: "标签描述12", dataIndex: 'displabel12', sortable: true, width: 100},
		    { header: "标签描述13", dataIndex: 'displabel13', sortable: true, width: 100},
		    { header: "标签描述14", dataIndex: 'displabel14',sortable: true,width: 100},
		    { header: "标签描述15", dataIndex: 'displabel15', sortable: true, width: 100},
		    { header: "标签描述16", dataIndex: 'displabel16',sortable: true,width: 100},
		    { header: "标签描述17", dataIndex: 'displabel17', sortable: true, width: 100,hidden:true},
		    { header: "标签描述18", dataIndex: 'displabel18', sortable: true, width: 100,hidden:true},
		    { header: "标签描述19", dataIndex: 'displabel19',sortable: true,width: 100,hidden:true},
		    { header: "标签描述20", dataIndex: 'displabel20', sortable: true, width: 100,hidden:true},
		    { header: "RF标签描述01", dataIndex: 'rflabel01',sortable: true,width: 100},
		    { header: "RF标签描述02", dataIndex: 'rflabel02', sortable: true, width: 100},
		    { header: "RF标签描述03", dataIndex: 'rflabel03',sortable: true,width: 100},
		    { header: "RF标签描述04", dataIndex: 'rflabel04', sortable: true, width: 100},
		    { header: "RF标签描述05", dataIndex: 'rflabel05',sortable: true,width: 100},
		    { header: "RF标签描述06", dataIndex: 'rflabel06', sortable: true, width: 100},
		    { header: "RF标签描述07", dataIndex: 'rflabel07',sortable: true,width: 100},
		    { header: "RF标签描述08", dataIndex: 'rflabel08', sortable: true, width: 100},
		    { header: "RF标签描述09", dataIndex: 'rflabel09',sortable: true,width: 100},
		    { header: "RF标签描述10", dataIndex: 'rflabel10', sortable: true, width: 100},
		    { header: "RF标签描述11", dataIndex: 'rflabel11',sortable: true,width: 100},
		    { header: "RF标签描述12", dataIndex: 'rflabel12', sortable: true, width: 100},
		    { header: "RF标签描述13", dataIndex: 'rflabel13', sortable: true, width: 100},
		    { header: "RF标签描述14", dataIndex: 'rflabel14',sortable: true,width: 100},
		    { header: "RF标签描述15", dataIndex: 'rflabel15', sortable: true, width: 100},
		    { header: "RF标签描述16", dataIndex: 'rflabel16',sortable: true,width: 100},
		    { header: "RF标签描述17", dataIndex: 'rflabel17', sortable: true, width: 100,hidden:true},
		    { header: "RF标签描述18", dataIndex: 'rflabel18', sortable: true, width: 100,hidden:true},
		    { header: "RF标签描述19", dataIndex: 'rflabel19',sortable: true,width: 100,hidden:true},
		    { header: "RF标签描述20", dataIndex: 'rflabel20', sortable: true, width: 100,hidden:true},
		    { header: "输入显示控制01", dataIndex: 'control01',sortable: true,width: 100},
		    { header: "输入显示控制02", dataIndex: 'control02', sortable: true, width: 100},
		    { header: "输入显示控制03", dataIndex: 'control03',sortable: true,width: 100},
		    { header: "输入显示控制04", dataIndex: 'control04', sortable: true, width: 100},
		    { header: "输入显示控制05", dataIndex: 'control05',sortable: true,width: 100},
		    { header: "输入显示控制06", dataIndex: 'control06', sortable: true, width: 100},
		    { header: "输入显示控制07", dataIndex: 'control07',sortable: true,width: 100},
		    { header: "输入显示控制08", dataIndex: 'control08', sortable: true, width: 100},
		    { header: "输入显示控制09", dataIndex: 'control09',sortable: true,width: 100},
		    { header: "输入显示控制10", dataIndex: 'control10', sortable: true, width: 100},
		    { header: "输入显示控制11", dataIndex: 'control11',sortable: true,width: 100},
		    { header: "输入显示控制12", dataIndex: 'control12', sortable: true, width: 100},
		    { header: "输入显示控制13", dataIndex: 'control13', sortable: true, width: 100},
		    { header: "输入显示控制14", dataIndex: 'control14',sortable: true,width: 100},
		    { header: "输入显示控制15", dataIndex: 'control15', sortable: true, width: 100},
		    { header: "输入显示控制16", dataIndex: 'control16',sortable: true,width: 100},
		    { header: "输入显示控制17", dataIndex: 'control17', sortable: true, width: 100,hidden:true},
		    { header: "输入显示控制18", dataIndex: 'control18', sortable: true, width: 100,hidden:true},
		    { header: "输入显示控制19", dataIndex: 'control19',sortable: true,width: 100,hidden:true},
		    { header: "输入显示控制20", dataIndex: 'control20', sortable: true, width: 100,hidden:true},
		    { header: "格式01", dataIndex: 'format01',sortable: true,width: 100},
		    { header: "格式02", dataIndex: 'format02', sortable: true, width: 100},
		    { header: "格式03", dataIndex: 'format03',sortable: true,width: 100},
		    { header: "格式04", dataIndex: 'format04', sortable: true, width: 100},
		    { header: "格式05", dataIndex: 'format05',sortable: true,width: 100},
		    { header: "格式06", dataIndex: 'format06', sortable: true, width: 100},
		    { header: "格式07", dataIndex: 'format07',sortable: true,width: 100},
		    { header: "格式08", dataIndex: 'format08', sortable: true, width: 100},
		    { header: "格式09", dataIndex: 'format09',sortable: true,width: 100},
		    { header: "格式10", dataIndex: 'format10', sortable: true, width: 100},
		    { header: "格式11", dataIndex: 'format11',sortable: true,width: 100},
		    { header: "格式12", dataIndex: 'format12', sortable: true, width: 100},
		    { header: "格式13", dataIndex: 'format13', sortable: true, width: 100},
		    { header: "格式14", dataIndex: 'format14',sortable: true,width: 100},
		    { header: "格式15", dataIndex: 'format15', sortable: true, width: 100},
		    { header: "格式16", dataIndex: 'format16',sortable: true,width: 100},
		    { header: "格式17", dataIndex: 'format17', sortable: true, width: 100,hidden:true},
		    { header: "格式18", dataIndex: 'format18', sortable: true, width: 100,hidden:true},
		    { header: "格式19", dataIndex: 'format19',sortable: true,width: 100,hidden:true},
		    { header: "格式20", dataIndex: 'format20', sortable: true, width: 100,hidden:true},
		    { header: "ASN内容01", dataIndex: 'content01',sortable: true,width: 100,renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
		    { header: "ASN内容02", dataIndex: 'content02', sortable: true, width: 100,renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
		    { header: "ASN内容03", dataIndex: 'content03',sortable: true,width: 100,renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
		    { header: "ASN内容04", dataIndex: 'content04', sortable: true, width: 100},
		    { header: "ASN内容05", dataIndex: 'content05',sortable: true,width: 100},
		    { header: "ASN内容06", dataIndex: 'content06', sortable: true, width: 100},
		    { header: "ASN内容07", dataIndex: 'content07',sortable: true,width: 100},
		    { header: "ASN内容08", dataIndex: 'content08', sortable: true, width: 100},
		    { header: "ASN内容09", dataIndex: 'content09',sortable: true,width: 100},
		    { header: "ASN内容10", dataIndex: 'content10', sortable: true, width: 100},
		    { header: "ASN内容11", dataIndex: 'content11',sortable: true,width: 100},
		    { header: "ASN内容12", dataIndex: 'content12', sortable: true, width: 100},
		    { header: "ASN内容13", dataIndex: 'content13', sortable: true, width: 100},
		    { header: "ASN内容14", dataIndex: 'content14',sortable: true,width: 100},
		    { header: "ASN内容15", dataIndex: 'content15', sortable: true, width: 100},
		    { header: "ASN内容16", dataIndex: 'content16',sortable: true,width: 100},
		    { header: "ASN内容17", dataIndex: 'content17', sortable: true, width: 100,hidden:true},
		    { header: "ASN内容18", dataIndex: 'content18', sortable: true, width: 100,hidden:true},
		    { header: "ASN内容19", dataIndex: 'content19',sortable: true,width: 100,hidden:true},
		    { header: "ASN内容20", dataIndex: 'content20', sortable: true, width: 100,hidden:true},
		    { header: "SO内容01", dataIndex: 'socontent01',sortable: true,width: 100,renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
		    { header: "SO内容02", dataIndex: 'socontent02', sortable: true, width: 100,renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
		    { header: "SO内容03", dataIndex: 'socontent03',sortable: true,width: 100,renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
		    { header: "SO内容04", dataIndex: 'socontent04', sortable: true, width: 100},
		    { header: "SO内容05", dataIndex: 'socontent05',sortable: true,width: 100},
		    { header: "SO内容06", dataIndex: 'socontent06', sortable: true, width: 100},
		    { header: "SO内容07", dataIndex: 'socontent07',sortable: true,width: 100},
		    { header: "SO内容08", dataIndex: 'socontent08', sortable: true, width: 100},
		    { header: "SO内容09", dataIndex: 'socontent09',sortable: true,width: 100},
		    { header: "SO内容10", dataIndex: 'socontent10', sortable: true, width: 100},
		    { header: "SO内容11", dataIndex: 'socontent11',sortable: true,width: 100},
		    { header: "SO内容12", dataIndex: 'socontent12', sortable: true, width: 100},
		    { header: "SO内容13", dataIndex: 'socontent13', sortable: true, width: 100},
		    { header: "SO内容14", dataIndex: 'socontent14',sortable: true,width: 100},
		    { header: "SO内容15", dataIndex: 'socontent15', sortable: true, width: 100},
		    { header: "SO内容16", dataIndex: 'socontent16',sortable: true,width: 100},
		    { header: "SO内容17", dataIndex: 'socontent17', sortable: true, width: 100,hidden:true},
		    { header: "SO内容18", dataIndex: 'socontent18', sortable: true, width: 100,hidden:true},
		    { header: "SO内容19", dataIndex: 'socontent19',sortable: true,width: 100,hidden:true},
		    { header: "SO内容20", dataIndex: 'socontent20', sortable: true, width: 100,hidden:true},
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
    	this.buildStore(basePath+ '/support/doQueryLotValidate.action','LotValidate',20);
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
    	var fatherPanel = this.ownerCt;
    	fatherPanel.onCreate();
    },
    onDelete: function(){
    	var fatherPanel = this.ownerCt;
    	fatherPanel.onDelete();
    }*/
});

//主面板
Ext.define('Redm.support.LotValidate', {	
	extend: 'Ext.panel.Panel',
    alias : 'widget.LottableManager',
    title: '批校验',
    layout:'border',
    tabPosition: 'bottom',
    initComponent: function(){
    	var me = this;
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
	                    handler: this.saveLotValidate
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
    	this.items = [this.createLottableValidation(),this.creatBaseGrid(),this.createTopPanel()];
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
			handler: me.saveLotValidate,
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
    	this.lottableValidation.getForm().reset();
    },
    onSelect: function(){
    	this.basicgrid.getStore().load();
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
    
    
    //顶部面板
    createTopPanel: function(){
    	var me = this;
    	this.toppanel = Ext.create('Ext.panel.Panel',{
    		region: 'north',
    		height: 100,
    		border: false,
    		layout: 'border',
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
    		items:[{
                iconCls: 'icon-create',
                text: '创建',
                handler: me.onCreate,
                scope: this
            },{
                iconCls: 'icon-delete',
                itemId: 'delete',
                text: '删除',
                handler: me.onDelete,
                scope: this
            },{
                iconCls: 'icon-save',
                itemId: 'save',
                text: '保存',
                handler: me.saveLotValidate,
                scope: this
            }]
    	});
    	return this.btnform;
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
                    fieldLabel: '批校验',
                    listeners: {
                        blur:function(txt){
                            txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                        }
                    },                    
                    name: 'lotKey',
                    width: 200
                },
                {
                    fieldLabel: '描述',
                    name: 'descr',
                    width: 250
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
                }
            ]
    	});
    	return this.selform;
    },
    
    //具体信息GRID
    creatBaseGrid: function(){
    	var me= this;
    	this.basicgrid = Ext.create('widget.lotvalidategrid',{
    		region: 'center',
    		listeners: {
    			itemclick: function(grid,record){
    				me.lottableValidation.getForm().loadRecord(record);
    			}
    		}
    	});

		this.basicgrid.getStore().on('beforeload',function(){
    		var params = this.basicgrid.getStore().getProxy().extraParams;
    		var record = me.selform.getForm().getValues();
    		
    		var lotKey = record.lotKey;
    		var descr = record.descr;
    		
			delete params.lotKey;
			delete params.descr;
    		
			if(lotKey) params.lotKey = lotKey;
         	if(descr) params.descr = descr;
    	},this);
    	return this.basicgrid;
    },
    
    
   	createLottableValidation: function(){
	   	this.lottableValidation = Ext.create('Ext.form.Panel',{
				region: 'east',
	    		split: true,
	    		width: 650,
				collapsible: true,
				frame: true,
				border: false,
				autoScroll : true,
				viewConfig : {
					forceFit: true,
					autoFill: true
				},
		        defaults: {
		        	xtype: 'fieldcontainer',
		        	layout: 'vbox',
		        	margin: '10 0 0 10'
		        },
		        items: [
                    {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        defaults: {
                            xtype: 'textfield',
                            labelWidth: 45,
                            margin: '5 0 0 5'
                        },
                        items: [
                            {
                                fieldLabel: '批校验',
                                listeners: {
                                    blur:function(txt){
                                        txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                    }
                            },                    
                                name: 'lotKey',
                                allowBlank: false,
                                width: 200
                            },
                            {
                                fieldLabel: '描述',
                                labelWidth: 40,
                                name: 'descr',
                                width: 250	
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
                                name: 'addWho',
                                hidden: true
                            }                        
                        ]
                    },{
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        defaults: {

                            xtype: 'label',
                            flex: 1,
                            margin: '0 0 0 10'
                        },
                        items: [
                            {
                                text: '标签描述',
                                margin: '0 0 0 60'
                            },
                            {
                                text: 'RF标签描述'	        	
                            },
                            {
                                text: '输入显示控制'
                            },
                            {
                                text: '内容格式'
                            },
                            {
                                text: 'ASN内容显示'
                            },
                             {
                                text: 'SO内容显示'
                            }
                        ]
                    },
                    {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        defaults: {
                            xtype: 'textfield',
                            flex: 2,
                            margin: '5 0 0 5'
                        },
                        items: [
                            {
                                xtype: 'label',
                                text: '属性01:',
                                flex: 1
                            },
                            {
                                fieldLabel: '',
                                name: 'displabel01'
                            },
                            {
                                fieldLabel: '',
                                name: 'rflabel01'
                            },
                            {
                                fieldLabel: '',
                                name: 'control01',
                                xtype: 'codecombo',
                                codeType: 'LOTCTR'
                            },
                            {
                                fieldLabel: '',
                                name: 'format01',
                                xtype: 'codecombo',
                                codeType: 'LOTFORMAT'
                            },
                            {
                                xtype:'datefield',
                                fieldLabel: '',
                                name: 'content01',
                                format:'Y-m-d H:i:s'   //精确到秒
                            }
                            ,
                            {
                                xtype:'datefield',
                                fieldLabel: '',
                                name: 'socontent01',
                                format:'Y-m-d H:i:s'   //精确到秒
                            }
                        ]
                    },
                    {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        defaults: {
                            xtype: 'textfield',
                            labelWidth: 60,
                            flex: 2,
                            margin: '5 0 0 5'
                        },
                        items: [
                            {
                                xtype: 'label',
                                text: '属性02:',
                                flex: 1
                            },
                            {
                                fieldLabel: '',
                                name: 'displabel02'
                            },
                            {
                                fieldLabel: '',
                                name: 'rflabel02'
                            },
                            {
                                fieldLabel: '',
                                xtype: 'codecombo',
                                codeType: 'LOTCTR',
                                name: 'control02'
                            },
                            {
                                fieldLabel: '',
                                name: 'format02',
                                xtype: 'codecombo',
                                codeType: 'LOTFORMAT'
                            },
                            {
                                fieldLabel: '',
                                name: 'content02',
                                xtype:'datefield',
                                format:'Y-m-d H:i:s'
                            },
                            {
                                fieldLabel: '',
                                name: 'socontent02',
                                xtype:'datefield',
                                format:'Y-m-d H:i:s'
                            }
                        ]
                    },
                    {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        defaults: {
                            xtype: 'textfield',
                            labelWidth: 60,
                            flex: 2,
                            margin: '5 0 0 5'
                        },
                        items: [
                            {
                                xtype: 'label',
                                text: '属性03:',
                                flex: 1
                            },
                            {
                                fieldLabel: '',
                                name: 'displabel03'
                            },
                            {
                                fieldLabel: '',
                                name: 'rflabel03'
                            },
                            {
                                fieldLabel: '',
                                name: 'control03',
                                xtype: 'codecombo',
                                codeType: 'LOTCTR'
                            },
                            {
                                fieldLabel: '',
                                name: 'format03',
                                xtype: 'codecombo',
                                codeType: 'LOTFORMAT'
                            },
                            {
                                fieldLabel: '',
                                name: 'content03',
                                xtype:'datefield',
                                format:'Y-m-d H:i:s'
                            },
                            {
                                fieldLabel: '',
                                name: 'socontent03',
                                xtype:'datefield',
                                format:'Y-m-d H:i:s'
                            }
                        ]
                    },
                    {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        defaults: {
                            xtype: 'textfield',
                            labelWidth: 60,
                            flex: 2,
                            margin: '5 0 0 5'
                        },
                        items: [
                            {
                                xtype: 'label',
                                text: '属性04:',
                                flex: 1
                            },
                            {
                                fieldLabel: '',
                                name: 'displabel04'
                            },
                            {
                                fieldLabel: '',
                                name: 'rflabel04'
                            },
                            {
                                fieldLabel: '',
                                xtype: 'codecombo',
                                codeType: 'LOTCTR',
                                name: 'control04'
                            },
                            {
                                fieldLabel: '',
                                xtype: 'codecombo',
                                codeType: 'LOTFORMAT',
                                name: 'format04'
                            },
                            {
                                fieldLabel: '',
                                name: 'content04',
                                xtype: 'textfield',
                                listeners: {
                                    blur:function(txt){
                                        txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                    }
                                }
                            },
                            {
                                fieldLabel: '',
                                name: 'socontent04',
                                xtype: 'textfield',
                                listeners: {
                                    blur:function(txt){
                                        txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                    }
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        defaults: {
                            xtype: 'textfield',
                            labelWidth: 20,
                            flex: 2,
                            margin: '5 0 0 5'
                        },
                        items: [
                            {
                                xtype: 'label',
                                text: '属性05:',
                                flex: 1
                            },
                            {
                                fieldLabel: '',
                                name: 'displabel05'
                            },
                            {
                                fieldLabel: '',
                                name: 'rflabel05'
                            },
                            {
                                fieldLabel: '',
                                xtype: 'codecombo',
                                codeType: 'LOTCTR',
                                name: 'control05'
                            },
                            {
                                fieldLabel: '',
                                xtype: 'codecombo',
                                codeType: 'LOTFORMAT',
                                name: 'format05'
                            },
                            {
                                fieldLabel: '',
                                name: 'content05',
                                xtype: 'textfield',
                                listeners: {
                                    blur:function(txt){
                                        txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                    }
                                }
                            },
                            {
                                fieldLabel: '',
                                name: 'socontent05',
                                xtype: 'textfield',
                                listeners: {
                                    blur:function(txt){
                                        txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                    }
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        defaults: {
                            xtype: 'textfield',
                            labelWidth: 60,
                            flex: 2,
                            margin: '5 0 0 5'
                        },
                        items: [
                            {
                                xtype: 'label',
                                text: '属性06:',
                                flex: 1
                            },
                            {
                                fieldLabel: '',
                                name: 'displabel06'
                            },
                            {
                                fieldLabel: '',
                                name: 'rflabel06'
                            },
                            {
                                fieldLabel: '',
                                xtype: 'codecombo',
                                codeType: 'LOTCTR',
                                name: 'control06'
                            },
                            {
                                fieldLabel: '',
                                xtype: 'codecombo',
                                codeType: 'LOTFORMAT',
                                name: 'format06'
                            },
                            {
                                fieldLabel: '',
                                name: 'content06',
                                xtype: 'textfield',
                                listeners: {
                                    blur:function(txt){
                                        txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                    }
                                }
                            },
                            {
                                fieldLabel: '',
                                name: 'socontent06',
                                xtype: 'textfield',
                                listeners: {
                                    blur:function(txt){
                                        txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                    }
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        defaults: {
                            xtype: 'textfield',
                            labelWidth: 60,
                            flex: 2,
                            margin: '5 0 0 5'
                        },
                        items: [
                            {
                                xtype: 'label',
                                text: '属性07:',
                                flex: 1
                            },
                            {
                                fieldLabel: '',
                                name: 'displabel07'
                            },
                            {
                                fieldLabel: '',
                                name: 'rflabel07'
                            },
                            {
                                fieldLabel: '',
                                xtype: 'codecombo',
                                codeType: 'LOTCTR',
                                name: 'control07'
                            },
                            {
                                fieldLabel: '',
                                xtype: 'codecombo',
                                codeType: 'LOTFORMAT',
                                name: 'format07'
                            },
                            {
                                fieldLabel: '',
                                name: 'content07',
                                xtype: 'textfield',
                                listeners: {
                                    blur:function(txt){
                                        txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                    }
                                }
                            },
                            {
                                fieldLabel: '',
                                name: 'socontent07',
                                xtype: 'textfield',
                                listeners: {
                                    blur:function(txt){
                                        txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                    }
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        defaults: {
                            xtype: 'textfield',
                            labelWidth: 60,
                            flex: 2,
                            margin: '5 0 0 5'
                        },
                        items: [
                            {
                                xtype: 'label',
                                text: '属性08:',
                                flex: 1
                            },
                            {
                                fieldLabel: '',
                                name: 'displabel08'
                            },
                            {
                                fieldLabel: '',
                                name: 'rflabel08'
                            },
                            {
                                fieldLabel: '',
                                xtype: 'codecombo',
                                codeType: 'LOTCTR',
                                name: 'control08'
                            },
                            {
                                fieldLabel: '',
                                xtype: 'codecombo',
                                codeType: 'LOTFORMAT',
                                name: 'format08'
                            },
                            {
                                fieldLabel: '',
                                name: 'content08',
                                xtype: 'textfield',
                                listeners: {
                                    blur:function(txt){
                                        txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                    }
                                }
                            },
                            {
                                fieldLabel: '',
                                name: 'socontent08',
                                xtype: 'textfield',
                                listeners: {
                                    blur:function(txt){
                                        txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                    }
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        defaults: {
                            xtype: 'textfield',
                            labelWidth: 60,
                            flex: 2,
                            margin: '5 0 0 5'
                        },
                        items: [
                            {
                                xtype: 'label',
                                text: '属性09:',
                                flex: 1
                            },
                            {
                                fieldLabel: '',
                                name: 'displabel09'
                            },
                            {
                                fieldLabel: '',
                                name: 'rflabel09'
                            },
                            {
                                fieldLabel: '',
                                xtype: 'codecombo',
                                codeType: 'LOTCTR',
                                name: 'control09'
                            },
                            {
                                fieldLabel: '',
                                xtype: 'codecombo',
                                codeType: 'LOTFORMAT',
                                name: 'format09'
                            },
                            {
                                fieldLabel: '',
                                name: 'content09',
                                xtype: 'textfield',
                                listeners: {
                                    blur:function(txt){
                                        txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                    }
                                }
                            },
                            {
                                fieldLabel: '',
                                name: 'socontent09',
                                xtype: 'textfield',
                                listeners: {
                                    blur:function(txt){
                                        txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                    }
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        defaults: {
                            xtype: 'textfield',
                            labelWidth: 60,
                            flex: 2,
                            margin: '5 0 0 5'
                        },
                        items: [
                            {
                                xtype: 'label',
                                text: '属性10:',
                                flex: 1
                            },
                            {
                                fieldLabel: '',
                                name: 'displabel10'
                            },
                            {
                                fieldLabel: '',
                                name: 'rflabel10'
                            },
                            {
                                fieldLabel: '',
                                xtype: 'codecombo',
                                codeType: 'LOTCTR',
                                name: 'control10'
                            },
                            {
                                fieldLabel: '',
                                xtype: 'codecombo',
                                codeType: 'LOTFORMAT',
                                name: 'format10'
                            },
                            {
                                fieldLabel: '',
                                name: 'content10',
                                xtype: 'textfield',
                                listeners: {
                                    blur:function(txt){
                                        txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                    }
                                }
                            },
                            {
                                fieldLabel: '',
                                name: 'socontent10',
                                xtype: 'textfield',
                                listeners: {
                                    blur:function(txt){
                                        txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                    }
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        defaults: {
                            xtype: 'textfield',
                            flex: 2,
                            margin: '5 0 0 5'
                        },
                        items: [
                            {
                                xtype: 'label',
                                text: '属性11:',
                                flex: 1
                            },
                            {
                                fieldLabel: '',
                                name: 'displabel11'
                            },
                            {
                                fieldLabel: '',
                                name: 'rflabel11'
                            },
                            {
                                fieldLabel: '',
                                xtype: 'codecombo',
                                codeType: 'LOTCTR',
                                name: 'control11'
                            },
                            {
                                fieldLabel: '',
                                xtype: 'codecombo',
                                codeType: 'LOTFORMAT',
                                name: 'format11'
                            },
                            {
                                fieldLabel: '',
                                name: 'content11',
                                xtype: 'textfield',
                                listeners: {
                                    blur:function(txt){
                                        txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                    }
                                }
                            },
                            {
                                fieldLabel: '',
                                name: 'socontent11',
                                xtype: 'textfield',
                                listeners: {
                                    blur:function(txt){
                                        txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                    }
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        defaults: {
                            xtype: 'textfield',
                            flex: 2,
                            margin: '5 0 0 5'
                        },
                        items: [
                            {
                                xtype: 'label',
                                text: '属性12:',
                                flex: 1
                            },
                            {
                                fieldLabel: '',
                                name: 'displabel12'
                            },
                            {
                                fieldLabel: '',
                                name: 'rflabel12'
                            },
                            {
                                fieldLabel: '',
                                xtype: 'codecombo',
                                codeType: 'LOTCTR',
                                name: 'control12'
                            },
                            {
                                fieldLabel: '',
                                xtype: 'codecombo',
                                codeType: 'LOTFORMAT',
                                name: 'format12'
                            },
                            {
                                fieldLabel: '',
                                name: 'content12',
                                xtype: 'textfield',
                                listeners: {
                                    blur:function(txt){
                                        txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                    }
                                }
                            },
                            {
                                fieldLabel: '',
                                name: 'socontent12',
                                xtype: 'textfield',
                                listeners: {
                                    blur:function(txt){
                                        txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                    }
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        defaults: {
                            xtype: 'textfield',
                            flex: 2,
                            margin: '5 0 0 5'
                        },
                        items: [
                            {
                                xtype: 'label',
                                text: '属性13:',
                                flex: 1
                            },
                            {
                                fieldLabel: '',
                                name: 'displabel13'
                            },
                            {
                                fieldLabel: '',
                                name: 'rflabel13'
                            },
                            {
                                fieldLabel: '',
                                xtype: 'codecombo',
                                codeType: 'LOTCTR',
                                name: 'control13'
                            },
                            {
                                fieldLabel: '',
                                xtype: 'codecombo',
                                codeType: 'LOTFORMAT',
                                name: 'format13'
                            },
                            {
                                fieldLabel: '',
                                name: 'content13',
                                xtype: 'textfield',
                                listeners: {
                                    blur:function(txt){
                                        txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                    }
                                }
                            },
                            {
                                fieldLabel: '',
                                name: 'socontent13',
                                xtype: 'textfield',
                                listeners: {
                                    blur:function(txt){
                                        txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                    }
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        defaults: {
                            xtype: 'textfield',
                            flex: 2,
                            margin: '5 0 0 5'
                        },
                        items: [
                            {
                                xtype: 'label',
                                text: '属性14:',
                                flex: 1
                            },
                            {
                                fieldLabel: '',
                                name: 'displabel14'
                            },
                            {
                                fieldLabel: '',
                                name: 'rflabel4'
                            },
                            {
                                fieldLabel: '',
                                xtype: 'codecombo',
                                codeType: 'LOTCTR',
                                name: 'control14'
                            },
                            {
                                fieldLabel: '',
                                xtype: 'codecombo',
                                codeType: 'LOTFORMAT',
                                name: 'format14'
                            },
                            {
                                fieldLabel: '',
                                name: 'content14',
                                xtype: 'textfield',
                                listeners: {
                                    blur:function(txt){
                                        txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                    }
                                }
                            },
                            {
                                fieldLabel: '',
                                name: 'socontent14',
                                xtype: 'textfield',
                                listeners: {
                                    blur:function(txt){
                                        txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                    }
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        defaults: {
                            xtype: 'textfield',
                            flex: 2,
                            margin: '5 0 0 5'
                        },
                        items: [
                            {
                                xtype: 'label',
                                text: '属性15:',
                                flex: 1
                            },
                            {
                                fieldLabel: '',
                                name: 'displabel15'
                            },
                            {
                                fieldLabel: '',
                                name: 'rflabel15'
                            },
                            {
                                fieldLabel: '',
                                xtype: 'codecombo',
                                codeType: 'LOTCTR',
                                name: 'control15'
                            },
                            {
                                fieldLabel: '',
                                xtype: 'codecombo',
                                codeType: 'LOTFORMAT',
                                name: 'format15'
                            },
                            {
                                fieldLabel: '',
                                name: 'content15',
                                xtype: 'textfield',
                                listeners: {
                                    blur:function(txt){
                                        txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                    }
                                }
                            },
                            {
                                fieldLabel: '',
                                name: 'socontent15',
                                xtype: 'textfield',
                                listeners: {
                                    blur:function(txt){
                                        txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                    }
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        defaults: {
                            xtype: 'textfield',
                            flex: 2,
                            margin: '5 0 0 5'
                        },
                        items: [
                            {
                                xtype: 'label',
                                text: '属性16:',
                                flex: 1
                            },
                            {
                                fieldLabel: '',
                                name: 'displabel16'
                            },
                            {
                                fieldLabel: '',
                                name: 'rflabel16'
                            },
                            {
                                fieldLabel: '',
                                xtype: 'codecombo',
                                codeType: 'LOTCTR',
                                name: 'control16'
                            },
                            {
                                fieldLabel: '',
                                xtype: 'codecombo',
                                codeType: 'LOTFORMAT',
                                name: 'format15'
                            },
                            {
                                fieldLabel: '',
                                name: 'content16',
                                xtype: 'textfield',
                                listeners: {
                                    blur:function(txt){
                                        txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                    }
                                }
                            },
                            {
                                fieldLabel: '',
                                name: 'socontent16',
                                xtype: 'textfield',
                                listeners: {
                                    blur:function(txt){
                                        txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                    }
                                }
                            }
                        ]
                    }//,
//17-20暂不启用                    
 /*                  {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        defaults: {
                            xtype: 'textfield',
                            flex: 2,
                            margin: '5 0 0 5'
                        },
                        items: [
                            {
                                xtype: 'label',
                                text: '属性17:',
                                flex: 1
                            },
                            {
                                fieldLabel: '',
                                name: 'displabel17'
                            },
                            {
                                fieldLabel: '',
                                name: 'rflabel17'
                            },
                            {
                                fieldLabel: '',
                                xtype: 'codecombo',
                                codeType: 'LOTCTR',
                                name: 'control17'
                            },
                            {
                                fieldLabel: '',
                                xtype: 'codecombo',
                                codeType: 'LOTFORMAT',
                                name: 'format17'
                            },
                            {
                                fieldLabel: '',
                                name: 'content17',
                                xtype: 'textfield',
                                listeners: {
                                    blur:function(txt){
                                        txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                    }
                                }
                            },
                            {
                                fieldLabel: '',
                                name: 'socontent17',
                                xtype: 'textfield',
                                listeners: {
                                    blur:function(txt){
                                        txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                    }
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        defaults: {
                            xtype: 'textfield',
                            flex: 2,
                            margin: '5 0 0 5'
                        },
                        items: [
                            {
                                xtype: 'label',
                                text: '属性18:',
                                flex: 1
                            },
                            {
                                fieldLabel: '',
                                name: 'displabel18'
                            },
                            {
                                fieldLabel: '',
                                name: 'rflabel18'
                            },
                            {
                                fieldLabel: '',
                                xtype: 'codecombo',
                                codeType: 'LOTCTR',
                                name: 'control18'
                            },
                            {
                                fieldLabel: '',
                                xtype: 'codecombo',
                                codeType: 'LOTFORMAT',
                                name: 'format18'
                            },
                            {
                                fieldLabel: '',
                                name: 'content18',
                                xtype: 'textfield',
                                listeners: {
                                    blur:function(txt){
                                        txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                    }
                                }
                            },
                            {
                                fieldLabel: '',
                                name: 'socontent18',
                                xtype: 'textfield',
                                listeners: {
                                    blur:function(txt){
                                        txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                    }
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        defaults: {
                            xtype: 'textfield',
                            flex: 2,
                            margin: '5 0 0 5'
                        },
                        items: [
                            {
                                xtype: 'label',
                                text: '属性19:',
                                flex: 1
                            },
                            {
                                fieldLabel: '',
                                name: 'displabel19'
                            },
                            {
                                fieldLabel: '',
                                name: 'rflabel19'
                            },
                            {
                                fieldLabel: '',
                                xtype: 'codecombo',
                                codeType: 'LOTCTR',
                                name: 'control19'
                            },
                            {
                                fieldLabel: '',
                                xtype: 'codecombo',
                                codeType: 'LOTFORMAT',
                                name: 'format19'
                            },
                            {
                                fieldLabel: '',
                                name: 'content19',
                                xtype: 'textfield',
                                listeners: {
                                    blur:function(txt){
                                        txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                    }
                                }
                            },
                            {
                                fieldLabel: '',
                                name: 'socontent19',
                                xtype: 'textfield',
                                listeners: {
                                    blur:function(txt){
                                        txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                    }
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        defaults: {
                            xtype: 'textfield',
                            flex: 2,
                            margin: '5 0 0 5'
                        },
                        items: [
                            {
                                xtype: 'label',
                                text: '属性20:',
                                flex: 1
                            },
                            {
                                fieldLabel: '',
                                name: 'displabel20'
                            },
                            {
                                fieldLabel: '',
                                name: 'rflabel20'
                            },
                            {
                                fieldLabel: '',
                                xtype: 'codecombo',
                                codeType: 'LOTCTR',
                                name: 'control20'
                            },
                            {
                                fieldLabel: '',
                                xtype: 'codecombo',
                                codeType: 'LOTFORMAT',
                                name: 'format20'
                            },
                            {
                                fieldLabel: '',
                                name: 'content20',
                                xtype: 'textfield',
                                listeners: {
                                    blur:function(txt){
                                        txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                    }
                                }
                            },
                            {
                                fieldLabel: '',
                                name: 'socontent20',
                                xtype: 'textfield',
                                listeners: {
                                    blur:function(txt){
                                        txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                    }
                                }
                            }
                        ]
                    }*/                    
                ]
	    	});
   		return this.lottableValidation;
   	},
    
    
   	saveLotValidate: function(){
		var me = this;
    	var lotValidateForm = this.lottableValidation.getForm();
    	if(!(lotValidateForm.isValid())) return;
    	lotValidateForm.submit({
		    clientValidation: true,
		    url: basePath + '/support/doSaveLotValidate.action',
		    params: {},
		    success: function(form, action) {
		    	var success = action.result;
		        MessageBox.show(success.success, success.json.msg);
                if(true==success.success)
                {
                    lotValidateForm.reset();
                    me.basicgrid.getStore().load();
                }
		    },
		    failure: function(form, action) {
		    	var success = action.result;
		        MessageBox.show(success.success, success.json.msg);
//		        lotValidateForm.reset();
		        me.basicgrid.getStore().load();
		    }
		});
	},
    
    
    onDelete: function(){
    	var me = this;
    	var records = me.basicgrid.getSelectionModel().getSelection(); 
    	if(records == ""){
    		MessageBox.error('错误提示','请选择删除的数据！');
    		return;
    	}else{
    		Ext.MessageBox.confirm('询问提示', '确定要删除所选信息吗？', 
				function(btn){
					if(btn == 'yes'){
						var record = records[0].getData();
			        	Ext.Ajax.request({
						    url: basePath + '/support/doDeleteLotValidate.action',
						    params: {
						    	id: record.id
						    },
						    success: function(response){
						        var text = Ext.decode(response.responseText);
						        var success = text.success;
						        MessageBox.show(success, text.json.msg);
						        me.basicgrid.getStore().load();
			        			me.lottableValidation.getForm().reset();
						    }
						});
					}
				}
	    	);   
    	}
    }
});


Ext.onReady(function(){
	Ext.create('Ext.container.Viewport', {
	    layout: 'border',
	    items: [{
	    	xtype:'LottableManager',
	    	region:'center'
	    }]
	});
});