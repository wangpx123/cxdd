/********************************************
上架策略 

注意，删除的方法有三个

onGoDelete：选中主表的记录，删除主表和明细表相关的记录
onDelete：第二个tab页面顶部btns的删除按钮，按下后删除主表记录，和明细表相关记录。
    与onGoDelete不同，关键字是从pwform查询出来的
onDeleteDetail：删除明细表选中的记录

********************************************/


//上架策略的数据存储数据类型定义
Ext.define('PutawayStrategy', {
    extend: 'Ext.data.Model',
    fields: [
    	{name:'id'},
		{name:'putawayStrategyKey'},
		{name:'descr'},
		{name:'mark'},
        {name:'addDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
        {name:'addWho'}            
	],
    idProperty: 'id'
});

//上架策略明细的数据存储数据类型定义
Ext.define('PutawayStrategyDetail', {
    extend: 'Ext.data.Model',
    fields: [
    	{name:'id'},
		{name:'putawayStrategyKey'},
		{name:'stepNumber'},
		{name:'status'},
		{name:'putawayCode'},
		{name:'putawayZone'},
		{name:'sourceLoc'},
		{name:'putawayLoc'},
		{name:'locLimit01'},
		{name:'locLimit02'},
		{name:'locLimit03'},
		{name:'locLimit04'},
		{name:'spaceLimit01'},
		{name:'spaceLimit02'},
		{name:'spaceLimit03'},
		{name:'spaceLimit04'},
		{name:'orderLimit01'},
		{name:'orderLimit02'},
		{name:'orderLimit03'},
		{name:'orderLimit04'},
		{name:'lottable01',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
		{name:'lottable02',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
		{name:'lottable03',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
		{name:'lottable04'},
		{name:'lottable05'},
		{name:'lottable06'},
		{name:'lottable07'},
		{name:'lottable08'},
		{name:'lottable09'},
		{name:'lottable10'},
		{name:'lottable11'},
		{name:'lottable12'},
		{name:'lottable13'},
		{name:'lottable14'},
		{name:'lottable15'},
		{name:'lottable16'},
		{name:'lottable17'},
		{name:'lottable18'},
		{name:'lottable19'},
		{name:'lottable20'},
		{name:'inLocationType01'},
		{name:'inLocationType02'},
		{name:'inLocationType03'},
		{name:'exLocationType01'},
		{name:'exLocationType02'},
		{name:'exLocationType03'},
		{name:'inLocationCategory01'},
		{name:'inLocationCategory02'},
		{name:'inLocationCategory03'},
		{name:'exLocCategory01'},
		{name:'exLocCategory02'},
		{name:'exLocCategory03'},
		{name:'inLocationFlag01'},
		{name:'inLocationFlag02'},
		{name:'inLocationFlag03'},
		{name:'exLocationFlag01'},
		{name:'exLocationFlag02'},
		{name:'exLocationFlag03'},
		{name:'inLocationHandle01'},
		{name:'inLocationHandle02'},
		{name:'inLocationHandle03'},
		{name:'exLocationHandle01'},
		{name:'exLocationHandle02'},
		{name:'exLocationHandle03'},
		{name:'inAbc01'},
		{name:'inAbc02'},
		{name:'inAbc03'},
		{name:'exAbc01'},
		{name:'exAbc02'},
		{name:'exAbc03'},
		{name:'maxSkuQty'},
		{name:'maxLotQty'},
		{name:'nextStepAfterSuccess'},
		{name:'nextStepAfterFailure'},
        {name:'addDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
        {name:'addWho'}        
	],
    idProperty: 'id'
});


//上架策略主表的grid
Ext.define('Redm.rules.PutawayStrategyGrid',{
	extend: 'Redm.BaseGrid',
    alias : 'widget.putawaystrategygrid',
    buildColumns: function(){
        this.columns = [
		    { header: "上架策略", dataIndex: 'putawayStrategyKey', width: 100, sortable: true},
		    { header: "描述", dataIndex: 'descr', width: 180, sortable: true},
		    { header: "备注", dataIndex: 'mark', width: 240, sortable: true},
		    { header: "id", dataIndex: 'id', width: 240, sortable: true,hidden: true},
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
		this.buildStore(basePath + '/rules/doQueryPutawayStrategy.action','PutawayStrategy',20);

/*		this.on('itemcontextmenu',function(view,record,item,index,e,eOpts){ 
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
        //屏蔽浏览器右键事件
/*        this.on('render',function(p){
        	 p.getEl().on("contextmenu",function(e){
            	e.preventDefault();
            },this)
        },this);*/
		this.callParent(arguments);
	}

    //右键菜单使用，调用fatherPanel的创建，onGo方法，暂时不用
/*	onCreate: function(){
   	 	var fatherPanel = this.ownerCt.ownerCt;
   	 	fatherPanel.onGo();
    },*/
    
    //右键菜单使用，调用fatherPanel的删除，onGoDelete方法，暂时不用
/*    onDelete: function(){
    	var fatherPanel = this.ownerCt.ownerCt;
   	 	fatherPanel.onGoDelete();
    }*/
});


//上架策略明细表的grid
Ext.define('Redm.rules.PutawayStrategyDetailGrid',{
	extend: 'Redm.BaseGrid',
    alias : 'widget.putawaystrategydetailgrid',
    autoLoad:false,     //启动时不加载数据
    buildColumns: function(){
        this.columns = [
		    { header: "上架策略", dataIndex: 'putawayStrategyKey', width: 100, sortable: true},
		    { header: "行号", dataIndex: 'stepNumber', width: 100, sortable: true},
		    { header: "状态", dataIndex: 'status', width: 100, sortable: true},
		    { header: "上架代码", dataIndex: 'putawayCode', width: 100, sortable: true},
		    { header: "上架区域", dataIndex: 'putawayZone', width: 100, sortable: true},
		    { header: "源库位", dataIndex: 'sourceLoc', width: 100, sortable: true},
		    { header: "上架库位", dataIndex: 'putawayLoc', width: 100, sortable: true},
		    { header: "库位限制1", dataIndex: 'locLimit01', width: 100, sortable: true},
		    { header: "库位限制2", dataIndex: 'locLimit02', width: 100, sortable: true},
		    { header: "库位限制3", dataIndex: 'locLimit03', width: 100, sortable: true},
		    { header: "库位限制4", dataIndex: 'locLimit04', width: 100, sortable: true},
		    { header: "空间限制1", dataIndex: 'spaceLimit01', width: 100, sortable: true},
		    { header: "空间限制2", dataIndex: 'spaceLimit02', width: 100, sortable: true},
		    { header: "空间限制3", dataIndex: 'spaceLimit03', width: 100, sortable: true}, 
	    	{ header: "空间限制4", dataIndex: 'spaceLimit04', width: 100, sortable: true},
		    { header: "订单类型1", dataIndex: 'orderLimit01', width: 100, sortable: true},
		    { header: "订单类型2", dataIndex: 'orderLimit02', width: 100, sortable: true},
		    { header: "订单类型3", dataIndex: 'orderLimit03', width: 100, sortable: true},
		    { header: "订单类型4", dataIndex: 'orderLimit04', width: 100, sortable: true},
		    { header: "批属性1", dataIndex: 'lottable01', width: 120, sortable: true,renderer : Ext.util.Format.dateRenderer('Y-m-d H:i')},
            { header: "批属性2", dataIndex: 'lottable02', width: 120, sortable: true,renderer : Ext.util.Format.dateRenderer('Y-m-d H:i')},
		    { header: "批属性3", dataIndex: 'lottable03', width: 120, sortable: true,renderer : Ext.util.Format.dateRenderer('Y-m-d H:i')},
		    { header: "批属性4", dataIndex: 'lottable04', width: 100, sortable: true},
		    { header: "批属性5", dataIndex: 'lottable05', width: 100, sortable: true},
		    { header: "批属性6", dataIndex: 'lottable06', width: 100, sortable: true},
		    { header: "批属性7", dataIndex: 'lottable07', width: 100, sortable: true},
		    { header: "批属性8", dataIndex: 'lottable08', width: 100, sortable: true},
		    { header: "批属性9", dataIndex: 'lottable09', width: 100, sortable: true},
		    { header: "批属性10", dataIndex: 'lottable10', width: 100, sortable: true},
		    { header: "批属性11", dataIndex: 'lottable11', width: 100, sortable: true},
		    { header: "批属性12", dataIndex: 'lottable12', width: 100, sortable: true},
		    { header: "批属性13", dataIndex: 'lottable13', width: 100, sortable: true},
		    { header: "批属性14", dataIndex: 'lottable14', width: 100, sortable: true},
		    { header: "批属性15", dataIndex: 'lottable15', width: 100, sortable: true},
		    { header: "批属性16", dataIndex: 'lottable16', width: 100, sortable: true},
		    { header: "批属性17", dataIndex: 'lottable17', width: 100, sortable: true,hidden:true},
		    { header: "批属性18", dataIndex: 'lottable18', width: 100, sortable: true,hidden:true},
		    { header: "批属性19", dataIndex: 'lottable19', width: 100, sortable: true,hidden:true},
		    { header: "批属性20", dataIndex: 'lottable20', width: 100, sortable: true,hidden:true},
		    { header: "包含库位类型1", dataIndex: 'inLocationType01', width: 100, sortable: true},
		    { header: "包含库位类型2", dataIndex: 'inLocationType02', width: 100, sortable: true},
		    { header: "包含库位类型3", dataIndex: 'inLocationType03', width: 100, sortable: true},
		    { header: "排除库位1", dataIndex: 'exLocationType01', width: 100, sortable: true},
		    { header: "排除库位2", dataIndex: 'exLocationType02', width: 100, sortable: true},
		    { header: "排除库位3", dataIndex: 'exLocationType03', width: 100, sortable: true},
		    { header: "包含库位种类1", dataIndex: 'inLocationCategory01', width: 100, sortable: true},
		    { header: "包含库位种类2", dataIndex: 'inLocationCategory02', width: 100, sortable: true},
		    { header: "包含库位种类3", dataIndex: 'inLocationCategory03', width: 100, sortable: true},
		    { header: "排除库位种类1", dataIndex: 'exLocCategory01', width: 100, sortable: true},
		    { header: "排除库位种类2", dataIndex: 'exLocCategory02', width: 100, sortable: true},
		    { header: "排除库位种类3", dataIndex: 'exLocCategory03', width: 100, sortable: true},
		    { header: "包含库位标识1", dataIndex: 'inLocationFlag01', width: 100, sortable: true},
		    { header: "包含库位标识2", dataIndex: 'inLocationFlag02', width: 100, sortable: true},
		    { header: "包含库位标识3", dataIndex: 'inLocationFlag03', width: 100, sortable: true},
		    { header: "排除库位标识1", dataIndex: 'exLocationFlag01', width: 100, sortable: true},
		    { header: "排除库位标识2", dataIndex: 'exLocationFlag02', width: 100, sortable: true},
		    { header: "排除库位标识3", dataIndex: 'exLocationFlag03', width: 100, sortable: true},
		    { header: "包含库位处理1", dataIndex: 'inLocationHandle01', width: 100, sortable: true},
		    { header: "包含库位处理2", dataIndex: 'inLocationHandle02', width: 100, sortable: true},
		    { header: "包含库位处理3", dataIndex: 'inLocationHandle03', width: 100, sortable: true},
		    { header: "排除库位处理1", dataIndex: 'exLocationHandle01', width: 100, sortable: true},
		    { header: "排除库位处理2", dataIndex: 'exLocationHandle02', width: 100, sortable: true},
		    { header: "排除库位处理3", dataIndex: 'exLocationHandle03', width: 100, sortable: true},
		    { header: "包含周转速度1", dataIndex: 'inAbc01', width: 100, sortable: true},
		    { header: "包含周转速度2", dataIndex: 'inAbc02', width: 100, sortable: true},
		    { header: "包含周转速度3", dataIndex: 'inAbc03', width: 100, sortable: true},
		    { header: "排除周转速度1", dataIndex: 'exAbc01', width: 100, sortable: true},
		    { header: "排除周转速度2", dataIndex: 'exAbc02', width: 100, sortable: true},
		    { header: "排除周转速度3", dataIndex: 'exAbc03', width: 100, sortable: true},
		    { header: "最大混商品数", dataIndex: 'maxSkuQty', width: 100, sortable: true},
		    { header: "最大混批次数", dataIndex: 'maxLotQty', width: 100, sortable: true},
		    { header: "成功后下一步", dataIndex: 'nextStepAfterSuccess', width: 100, sortable: true},
		    { header: "失败后下一步", dataIndex: 'nextStepAfterFailure', width: 100, sortable: true},
		    { header: "id", dataIndex: 'id', width: 100, sortable: true,hidden: true},
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
		this.buildStore(basePath + '/rules/doQueryPutawayStrategyDetail.action','PutawayStrategyDetail',20);

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
                        text:"添加", 
                        iconCls:'leaf', 
                        handler:function(){
                        	//当点击时隐藏右键菜单 
                            this.up("menu").hide(); 
                            me.onAddDetail();
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
	
	//鼠标右键菜单用的，暂不使用
/*	onAddDetail: function(){
    	var fatherPanel = this.ownerCt.ownerCt;
    	fatherPanel.onAddDetail();   //明细表添加记录，清空明细表相关的form
    },*/


    //鼠标右键菜单用的，暂不使用
/*    onDelete: function(){
    	var fatherPanel = this.ownerCt.ownerCt;
    	fatherPanel.onDeleteDetail();
    }*/
});


//最外部容器，继承自Ext.tab.Panel，包括两个tab页
Ext.define('Redm.rules.PutawayStrategyManager',{
	extend: 'Ext.tab.Panel',
    alias : 'widget.putawaystrategymanager',
    title:'上架策略',
    layout: 'border',
    tabPosition: 'bottom',
    initComponent: function(){
    	var me = this;
    //	this.buildContextMenu();   //初始化鼠标右键菜单的内容吗，暂不启用
    	this.items = [this.createPWPanel(),this.createPWDPanel()];   //两个table页
        this.callParent(arguments);
    },
    
    //以下是鼠标右键菜单，可以考虑屏蔽
/*    buildContextMenu:function(){
		var me = this;
		//-------------------查询---------------------
    	this.goAction = Ext.create('Ext.Action', {
			text : "创建" ,//查询界面的跳转
			iconCls: 'icon-create',
			handler: me.onGo,
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
		//----------------------基本(主)----------------------
		this.createAction = Ext.create('Ext.Action', {
			text : "创建" ,//基本里面的创建
			iconCls: 'icon-create',
			handler: me.onCreate,
			scope : this
		});
    	this.deleteAction = Ext.create('Ext.Action', {//删除主从
			text : "删除" ,
			iconCls : "icon-delete",
			handler: me.onDelete,
			scope : this
		});
		this.saveAction = Ext.create('Ext.Action', {
			text : "保存",
			iconCls : "icon-save",
			handler: me.saveStrategyAndDetail,
			scope : this
		});
		//----------------------基本(从)----------------------
		this.addAction = Ext.create('Ext.Action', {
			text : "添加",
			iconCls : "icon-create",
			handler: me.onAddDetail,
			scope : this
		});
    	this.deleteDetailAction = Ext.create('Ext.Action', {//删除从
			text : "删除" ,
			iconCls : "icon-delete",
			handler: me.onDeleteDetail,
			scope : this
		});
    },*/

    //查询方法，主表的grid
    onSelect: function(){
    	this.pwgrid.getStore().load();
    },

    //删除主表上选中的记录和明细表的相关记录
    onGoDelete: function(){
    	var me = this;
    	var records = me.pwgrid.getSelectionModel().getSelection(); 
    	if(records == ""){
    		MessageBox.error('错误提示','请选择删除的数据！');
    		return;
    	}else{
    		var record = records[0].getData();
    		Ext.MessageBox.confirm('询问提示', '确定要删除所选信息吗？', 
				function(btn){
					if(btn == 'yes'){
						Ext.Ajax.request({
						    url: basePath + '/rules/doDeletePutawayStrategy.action',
						    params: {
						    	putawayStrategyKey: record.putawayStrategyKey
						    },
						    success: function(response){
						        var text = Ext.decode(response.responseText);
						        var success = text.success;
						        MessageBox.show(success, text.json.msg);
						        me.pwgrid.getStore().load();
						        me.detailgrid.getStore().load();
			        			me.pwform.getForm().reset();
			                	me.basicform.getForm().reset();
			                	me.otherform.getForm().reset();
						    }
						});
					}
				}
			); 
    	}
    },

    //第一个tab页最上部查询面板的重置按钮对应方法
    onReset: function(){
    	this.topform.getForm().reset();
    },

    //对应主表创建按钮，跳转到第2个tab页面
    onGo: function(){
    	var me = this;
    	me.setActiveTab(1);              //不能只做跳转，还要请空相关form
    	me.pwform.getForm().reset();
    	me.basicform.getForm().reset();
    	me.otherform.getForm().reset();
    	
    },
    
    //第2个tab页面TopPanel 按钮面板的创建，清空几个面板，用于输入
    onCreate: function(){      
    	var me = this;
    	me.pwform.getForm().reset();
    	me.basicform.getForm().reset();
    	me.otherform.getForm().reset();
    },

    
    //第二个tab页面顶部btns的删除按钮，按下后删除主表记录，和明细表相关记录
    //与onGoDelete不同，关键字是从pwform查询出来的
    onDelete: function(){
    	var me = this;
    	var values = me.pwform.getForm().getValues();
    	var pwsKey = values.putawayStrategyKey;
    	if(pwsKey == ''){return}
		Ext.MessageBox.confirm('询问提示', '确定要删除所选信息吗？', 
			function(btn){
				if(btn == 'yes'){
					Ext.Ajax.request({
					    url: basePath + '/rules/doDeletePutawayStrategy.action',
					    params: {
					    	putawayStrategyKey: pwsKey
					    },
					    success: function(response){
					        var text = Ext.decode(response.responseText);
					        var success = text.success;
					        MessageBox.show(success, text.json.msg);
					        me.pwgrid.getStore().load();         //主表grid也要重新加载，不要显示已经删除的记录
					        me.detailgrid.getStore().load();     //明细表grid重新加载 
			    			me.pwform.getForm().reset();         //请空form
			            	me.basicform.getForm().reset();
			            	me.otherform.getForm().reset();
					    }
					});
				}
			}
		);
    },

    //明细表添加记录，先清空两个form
    onAddDetail: function(){
    	var me = this;
    	me.basicform.getForm().reset();
    	me.otherform.getForm().reset();
    },
    
    //删除明细表的记录
    onDeleteDetail: function(){
    	var me = this;
    	var records = me.detailgrid.getSelectionModel().getSelection(); 
    	if(records == ""){
    		MessageBox.error('错误提示','请选择删除的数据！');
    		return;
    	}else{
    		var record = records[0].getData();
    		Ext.MessageBox.confirm('询问提示', '确定要删除所选信息吗？', 
				function(btn){
					if(btn == 'yes'){
						Ext.Ajax.request({
						    url: basePath + '/rules/doDeletePutawayStrategyDetail.action',
						    params: {
						    	id: record.id
						    },
						    success: function(response){
						        var text = Ext.decode(response.responseText);
						        var success = text.success;
						        MessageBox.show(success, text.json.msg);
						        me.detailgrid.getStore().load();
			                	me.basicform.getForm().reset();
			                	me.otherform.getForm().reset();
						    }
						});
					}
				}
			); 
    	}
    },

    //  第一个tab页面上的鼠标右键菜单
/*    createGoContextMenu: function(e){
    	if(!this.formGoContextMenu){
			this.formGoContextMenu = Ext.create('Ext.menu.Menu', {
				items: [
					this.goAction,//创建
					this.searchAction,//查询
					this.resetAction//重置
				]
			});
    	}
		e.preventDefault();
		this.formGoContextMenu.showAt(e.getXY());
    },*/

    //Btns和PWForm面板的鼠标右键菜单
/*    createContextMenu:function(e){   //暂不启用
    	if(!this.formContextMenu){
			this.formContextMenu = Ext.create('Ext.menu.Menu', {
				items: [
					this.createAction,//创建
					this.deleteAction,//删除
					this.saveAction//保存
				]
			});
    	}
		e.preventDefault();
		this.formContextMenu.showAt(e.getXY());
    },*/

     //DBtnPanel的右键菜单
/*    createContextChildMenu:function(e){     //暂不启用
    	if(!this.formContextChildMenu){
			this.formContextChildMenu = Ext.create('Ext.menu.Menu', {
				items: [
					this.addAction,//添加
					this.deleteDetailAction,//删除
					this.saveAction//保存
				]
			});
    	}
		e.preventDefault();
		this.formContextChildMenu.showAt(e.getXY());
    },*/

    
  //创建第一个tab页的panel，包括一个主表grid和一个TopPanel  
    createPWPanel: function(){
    	var me = this;
    	this.pwpanel = Ext.create('Ext.panel.Panel',{
    		layout: 'border',
    		border: false,
    		title: '查询',
    		items:[this.createPwGrid(),this.createTopPanel()]
    	});
    	return this.pwpanel;
    },


    //第一个tab页 下部的grid，位于center位置
    createPwGrid: function(){
    	var me = this;
    	this.pwgrid = Ext.create('widget.putawaystrategygrid',{
    		region: 'center',
    		listeners: {
    			itemdblclick: function(grid,record){
    				me.setActiveTab(1);
    				me.pwform.getForm().loadRecord(record);   //相当于给第二个tab页输入查询条件
    				me.detailgrid.getStore().load();     //重新load detailgrid数据，根据查询条件选择需要的数据
    			}
    		}
    	});
    	this.pwgrid.getStore().on('beforeload',function(){
    		var params = this.pwgrid.getStore().getProxy().extraParams;
    		var record = me.topform.getForm().getValues();
    		
    		var putawayStrategyKey = record.putawayStrategyKey; 
    		var descr = record.descr;  
    		
			delete params.putawayStrategyKey;
			delete params.descr;
			if(putawayStrategyKey) params.putawayStrategyKey = putawayStrategyKey;
			if(descr) params.descr = descr;
    	},this);
    	return this.pwgrid;
    },

    //第一个tab页 上部的panel，位于north位置，包括一个TopForm和一个BtnPanel
    createTopPanel: function(){
		var me = this;
		this.toppanel = Ext.create('Ext.panel.Panel',{
			region: 'north',

/*			listeners:{
	            render:function(p){
	                p.getEl().on("contextmenu",function(e){
	                	me.createGoContextMenu(e);    //第一个tab页面上的鼠标右键菜单
	                },me)
	            }
            },*/
			border:false,
			height: 80,
			layout: 'border',
			items:[me.createTopForm(),me.createBtnPanel()]
		});
		return this.toppanel;
	},

    //第一个tab页，上部toppanel中上部的TopForm，查询栏
	createTopForm: function(){
		var me = this;
		this.topform = Ext.create('Ext.form.Panel',{
			region: 'north',
			frame: true,
			height: 40,
			layout: 'hbox',
			defaults: {
				xtype: 'textfield',
				labelWidth: 60,
				margin: '5 0 0 5'
			},
			items:[
                {
                    fieldLabel: '上架策略',
                    width: 200,
                    name: 'putawayStrategyKey',
                    listeners: {
                        blur:function(txt){
                          txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                        }
                    }
                },
                {
                    fieldLabel: '描述',
                    width: 250,
                    labelWidth: 40,
                    name: 'descr'
                },
                {
                    xtype: 'button',
                    scope: this,
                    iconCls: 'icon-search',
                    handler:me.onSelect,
                    text: '查询'
                },
                {
                    xtype: 'button',
                    scope: this,
                    iconCls: 'icon-reset',
                    handler: me.onReset,      //清空查询栏文本框的查询条件
                    text: '重置'
                }
            ]
		});
		return this.topform;
	},

    //第一个tab页 上部TopPanel的按钮面板，添加和删除用的 
	createBtnPanel: function(){
    	var me = this;
    	this.btnpanel = Ext.create('Ext.form.Panel',{
    		region: 'center',
    		frame: true,
    		defaults: {
    			xtype: 'button',
    			margin: '5 0 0 5'
    		},
    		items:[
                {
                    iconCls: 'icon-create',
                    text: '创建',
                    scope: this,
                    handler: me.onGo    //跳转到第二个tab页面
                },
                {
                    iconCls: 'icon-delete',
                    itemId: 'delete',
                    text: '删除',
                    //disabled:true,
                    handler: me.onGoDelete,  //删除主表选中的记录和明细表的相关记录
                    scope: this
                }
            ]
    	});
    	return this.btnpanel;
    },

    
    //创建第二个tab页面，上架策略的明细信息
    createPWDPanel: function(){
    	var me = this;
    	this.pwdpanel = Ext.create('Ext.panel.Panel',{
    		layout: 'border',
    		border: false,
    		title: '基本',
/*    		tbar: {      //快捷键，暂时没有作用
	            plugins: new Ext.ux.ToolbarKeyMap(),
	            hidden: true,
	            items: [
                    {
                        text: '快捷键',
                        menu: {
                            items: [
                                {
                                    text: '保存 ',
                                    scope: this,
                                    keyBinding: {
                                        key: 's',
                                        ctrl: true
                                    },
                                    handler: me.saveStrategyAndDetail
                                },
                                {
                                    text: '创建（基本）',
                                    scope: this,
                                    keyBinding: {
                                        key: 'n',
                                        ctrl: true
                                    },
                                    handler: me.onCreate
                                },
                                {
                                    text: '添加（基本）',
                                    scope: this,
                                    keyBinding: {
                                        key: 'a',
                                        ctrl: true
                                    },
                                    handler: me.onAddDetail
                                }
                            ]
                        }
                    }
                ]
	        },*/
    		items:[this.createDetailGrid(),this.createPWTabpanel(),this.createPWDTopPanel()]
    	});
    	return this.pwdpanel;
    },

    //创建第二个tab页面的TopPanel，north位置，包含三个部分，Btns面板，PWForm面板，和DBtn面板
    createPWDTopPanel: function(){
    	this.pwdtoppanel = Ext.create('Ext.panel.Panel',{
    		region: 'north',
    		layout: 'border',
    		border: false,
    		height: 115,
    		items:[this.createBtns(),this.createPWForm(),this.createDBtnPanel()]
    	});
    	return this.pwdtoppanel;
    },

    //创建第二个tab页面TopPanel的按钮面板
    createBtns: function(){
    	var me = this;
    	this.btnspanel = Ext.create('Ext.form.Panel',{
    		region: 'north',
    		frame: true,
    		defaults: {
    			xtype: 'button',
    			margin: '5 0 0 5'
    		},
/*    		listeners:{
	            render:function(p){
	                p.getEl().on("contextmenu",function(e){     //Btns和PWForm面板的鼠标右键菜单
	                	me.createContextMenu(e);
	                },me)
	            }
            },*/
    		items:[
                {
                    iconCls: 'icon-create',
                    text: '创建',
                    scope: this,
                    handler: me.onCreate     //清空form，准备创建主表记录和明细表记录
                },
                {
                    iconCls: 'icon-delete',
                    itemId: 'delete',
                    text: '删除',
                   // disabled:true,
//                    handler: function(){},   //此按钮暂时无效
                    handler: me.onDelete,
                    scope: this
                },
                {
                    iconCls: 'icon-save',
                    itemId: 'save',
                    text: '保存',
                    handler: me.saveStrategyAndDetail,     //存盘操作，保存主表和明细表记录
                    scope: this
                }
            ]
    	});
    	return this.btnspanel;
    },

    //第二个tab页面 TopPanel上的form，用于显示主表记录，和输入主表记录
    createPWForm: function(){
    	var me = this;
    	this.pwform = Ext.create('Ext.form.Panel',{
    		region: 'center',
    		frame: true,
    		layout: 'hbox',
    		defaults: {
    			xtype: 'textfield',
    			margin: '5 0 0 5',
    		    labelWidth: 40
    		},
/*    		listeners:{
	            render:function(p){
	                p.getEl().on("contextmenu",function(e){
	                	me.createContextMenu(e);     //Btns和PWForm面板的鼠标右键菜单
	                },me)
	            }
            },*/
    		items:[
                {
                    fieldLabel: '上架策略',
                    name: 'putawayStrategyKey',
                    labelWidth: 60,
                    width: 200,
                    listeners: {
						blur: function(txt){                                    
                                    putawayStrategyKeyValue=Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(putawayStrategyKeyValue); 
									/* sourceLocValue=me.basicform.getForm().findField('sourceLoc').getValue();
                                    if(''!=putawayStrategyKeyValue && ''!=sourceLocValue)
                                    {
                                        Ext.Ajax.request({
                                            url: basePath + '/rules/doExistPutawayStrategyDetail.action',  
                                            params: {
                                                putawayStrategyKey:putawayStrategyKeyValue,
												sourceLoc:sourceLocValue,
                                            },
                                            success: function(response){
                                                var text = Ext.decode(response.responseText);
                                                var success = text.success;
                                                if(0 != text.json.data.length)
                                                {
                                                    me.basicform.getForm().findField('sourceLoc').setValue('');
													Ext.Msg.alert("错误提示", '上架策略与库位重复！')
                                                }
                                            }
                                        });
                                    }   */                                      
                                } 
                    },
                    allowBlank: false
                },
                {
                    fieldLabel: '描述',
                    name: 'descr',
                    width: 250,
                    allowBlank: false
                },
                {
                    fieldLabel: '备注',
                    name: 'mark',
                    width: 250
                },
                {
                    name: 'id',        //上架策略表的id
                    hidden: true
                },
                {
                    xtype:'datefield',
                    format:'Y-m-d H:i:s',
                    name: 'addDate',
                    hidden: true
                },
                {
                    xtype: 'textfield',
                    name: 'addWho',
                    hidden: true
                }                  
            ]
    	});
    	return this.pwform;
    },


    //第二个tab页面 TopPanel上的明细表按钮面板，增加，删除明细表记录
    createDBtnPanel: function(){
    	var me = this;
    	this.dbtnpanel = Ext.create('Ext.form.Panel',{
    		region: 'south',
    		frame: true,
    		defaults: {
    			xtype: 'button',
    			margin: '5 0 0 5'
    		},
/*    		listeners:{
	            render:function(p){
	                p.getEl().on("contextmenu",function(e){
	                	me.createContextChildMenu(e);    //DBtnPanel的右键菜单
	                },me)
	            }
            },*/
    		items:[
                {
                    iconCls: 'icon-create',
                    text: '添加',
                    scope: this,
                    handler: me.onAddDetail
                },
                {
                    iconCls: 'icon-delete',
                    itemId: 'delete',
                    text: '删除',
                   // disabled:true,
                    handler: me.onDeleteDetail,
                    scope: this
                }
            ]
    	});
    	return this.dbtnpanel;
    },

    createPWTabpanel: function(){
    	var me = this;
    	this.pwtabpanel = Ext.create('widget.tabpanel',{
    		region: 'east',
    		width: 450,
    		split: true,
			collapsible: true,
    		xtype:'tabpanel',
    		tabPosition: 'bottom',
    		items: [me.createBasicRuleForm(),me.createOtherRuleForm()]
    	});
    	return this.pwtabpanel;
    },

    createDetailGrid: function(){
    	var me = this;
    	this.detailgrid = Ext.create('widget.putawaystrategydetailgrid',{
    		region: 'center',
    		listeners: {
    			itemclick: function(grid,record){
    				me.basicform.getForm().loadRecord(record);
    				me.otherform.getForm().loadRecord(record);
    			}
    		}
    	});
    	this.detailgrid.getStore().on('beforeload',function(){
    		var params = this.detailgrid.getStore().getProxy().extraParams;
    		var record = me.pwform.getForm().getValues();
    		
    		var putawayStrategyKey = record.putawayStrategyKey;
			delete params.putawayStrategyKey;
			if(putawayStrategyKey) params.putawayStrategyKey = putawayStrategyKey;
    		
    	},this);
    	return this.detailgrid;
    },

    createBasicRuleForm: function(){
		var me = this;
    	this.basicform = Ext.create('Ext.form.Panel',{
			xtype:'form',
			frame:true,
			border: false,
			title: '基本限制',
			autoScroll : true,
			headerPosition: 'bottom',
	        autoHeight: true,
	        bodyPadding: 1,
        	items:[
                {
                   xtype: 'fieldcontainer',
                   layout: 'hbox',
                   defaults: {
                       labelWidth: 70,
                       margin: '5 0 0 5',
                       flex:1,
                       labelAlign: 'top',
                       xtype: 'textfield'
                   },
                   items: [
                        {
                            fieldLabel: '状态',
                            xtype: 'checkbox',
                            name: 'status',
                            inputValue: 1
                        },
                        {
                            fieldLabel: '行号',
                            name: 'stepNumber',
                            allowBlank: false,
                            xtype: 'numberfield',
                            minValue: 0
                        },
                        {
                            fieldLabel: '上架代码',
                            xtype: 'codecombo',
                            codeType: 'PATYPE',
                            name: 'putawayCode'
                        }//,
                        /*{
                            xtype: 'hidden'
                        }*/
                   ]
                },
                {
                   xtype: 'fieldcontainer',
                   layout: 'hbox',
                   defaults: {
                       labelWidth: 70,
                       margin: '5 0 0 5',
                       flex:1,
                       labelAlign: 'top',
                       xtype: 'textfield'
                   },
                   items: [
                        {
                            fieldLabel: '源库位',
							allowBlank: false,
                            name: 'sourceLoc',
                            listeners: {
                                blur: function(txt){                                    
                                    sourceLocValue=Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(sourceLocValue); 
									/* putawayStrategyKeyValue=me.pwform.getForm().findField('putawayStrategyKey').getValue();
                                    if(''!=sourceLocValue)
                                    {
                                        Ext.Ajax.request({
                                            url: basePath + '/support/doCheckLocExist.action',
                                            params: {
                                                loc:sourceLocValue
                                            },
                                            success: function(response){
                                                var text = Ext.decode(response.responseText);
                                                var status = text.success;
                                                //用status区分查重还是查是否存在。
												if(false==status)   
                                                {
                                                    MessageBox.show(status, text.json.msg);   
                                                    me.basicform.getForm().findField('sourceLoc').setValue('');
                                                }
												else
												{
													if(''!=putawayStrategyKeyValue && ''!=sourceLocValue){
														Ext.Ajax.request({
														url: basePath + '/rules/doExistPutawayStrategyDetail.action',  
														params: {
															putawayStrategyKey:putawayStrategyKeyValue,
															sourceLoc:sourceLocValue,
														},
														success: function(response){
															var text = Ext.decode(response.responseText);
															var success = text.success;
															if(0 != text.json.data.length)
															{
																me.basicform.getForm().findField('sourceLoc').setValue('');
																Ext.Msg.alert("错误提示", '上架策略与库位重复！')
															}
														}
													});
													}
												}
                                            }
                                        });
                                    }    */                                     
                                }                                
                            }                           
                        },
                        {
                            fieldLabel: '上架区域',
							allowBlank: false,
                            name: 'putawayZone',
                            xtype: 'putawayzonecombo'
                        },
                        {
                            fieldLabel: '上架库位',
                            name: 'putawayLoc',
                            listeners: {
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }                        },
                        {
                            name: 'putawayStrategyKey',
                            xtype: 'hidden'
                        },
                        {
                            name: 'id',
                            hidden: true
                        },                     //上架策略明细表的 id
                        {
                            xtype:'datefield',
                            format:'Y-m-d H:i:s',
                            name: 'addDate',
                            hidden: true
                        },
                        {
                            xtype: 'textfield',
                            name: 'addWho',
                            hidden: true
                        }                          
                   ]
                },
                {
                   xtype: 'fieldcontainer',
                   layout: 'hbox',
                   defaults: {
                       labelWidth: 40,
                       margin: '5 0 0 5',
                       flex:1,
                       xtype: 'codecombo',
                       editable: false,
                       codeType: 'PALOCLIMIT'
                   },
                   items: [
                        {fieldLabel: '库位限制',labelAlign: 'top',name: 'locLimit01'},
                        {fieldLabel: '',margin: '25 0 0 5',name: 'locLimit02'},
                        {fieldLabel: '',margin: '25 0 0 5',name: 'locLimit03'},
                        {fieldLabel: '',margin: '25 0 0 5',name: 'locLimit04'}
                   ]
                },
                {
                   xtype: 'fieldcontainer',
                   layout: 'hbox',
                   defaults: {
                       labelWidth: 60,
                       margin: '5 0 0 5',
                       flex:1,
                       xtype: 'codecombo',
                       editable: false,
                       codeType: 'PASPACELIMIT'
                   },
                   items: [
                        {fieldLabel: '空间限制',labelAlign: 'top',name: 'spaceLimit01'},
                        {fieldLabel: '',margin: '25 0 0 5',name: 'spaceLimit02'},
                        {fieldLabel: '',margin: '25 0 0 5',name: 'spaceLimit03'},
                        {fieldLabel: '',margin: '25 0 0 5',name: 'spaceLimit04'}
                   ]
                },
                {
                   xtype: 'fieldcontainer',
                   layout: 'hbox',
                   defaults: {
                       labelWidth: 70,
                       margin: '5 0 0 5',
                       xtype: 'codecombo',
                       flex:1,
                       editable: false,
                       codeType: 'PASORDERLIMIT'
                   },
                   items: [
                        {fieldLabel: '订单类型',labelAlign: 'top',name: 'orderLimit01'},
                        {fieldLabel: '',margin: '25 0 0 5',name: 'orderLimit02'},
                        {fieldLabel: '',margin: '25 0 0 5',name: 'orderLimit03'},
                        {fieldLabel: '',margin: '25 0 0 5',name: 'orderLimit04'}
                   ]
                },
                {
                   xtype: 'fieldcontainer',
                   layout: 'hbox',
                   defaults: {
                       labelWidth: 20,
                       margin: '5 0 0 5',
                       xtype: 'label',
                       labelAlign: 'top'
                   },
                   items: [
                        {text: '批属性:'}
                   ]
                },
                {
                   xtype: 'fieldcontainer',
                   layout: 'hbox',
                   defaults: {
                       labelWidth: 20,
                       margin: '5 0 0 5',
                       flex: 1,
                       xtype: 'datefield'
                   },
                   items: [
                        {fieldLabel: '1',name: 'lottable01',format:'Y-m-d H:i:s.u'},
                        {fieldLabel: '2',name: 'lottable02',format:'Y-m-d H:i:s.u'},
                        {fieldLabel: '3',name: 'lottable03',format:'Y-m-d H:i:s.u'}
                   ]
                },
                {
                   xtype: 'fieldcontainer',
                   layout: 'hbox',
                   defaults: {
                       labelWidth: 20,
                       margin: '5 0 0 5',
                       flex: 1,
                       xtype: 'textfield'
                   },
                   items: [
                        {
                            fieldLabel: '4',
                            name: 'lottable04',
                            listeners: {
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }
                        },
                        {
                            fieldLabel: '5',
                            name: 'lottable05',
                            listeners: {
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }                            
                        },
                        {
                            fieldLabel: '6',
                            name: 'lottable06',
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
                       labelWidth: 20,
                       margin: '5 0 0 5',
                       flex: 1,
                       xtype: 'textfield'
                   },
                   items: [
                        {
                            fieldLabel: '7',
                            name: 'lottable07',
                            listeners: {
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }
                        },
                        {
                            fieldLabel: '8',
                            name: 'lottable08',
                            listeners: {
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }
                        },
                        {
                            fieldLabel: '9',
                            name: 'lottable09',
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
                       labelWidth: 20,
                       flex: 1,
                       margin: '5 0 0 5',
                       xtype: 'textfield'
                   },
                   items: [
                        {
                            fieldLabel: '10',
                            name: 'lottable10',
                            listeners: {
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }
                        },
                        {
                            fieldLabel: '11',
                            name: 'lottable11',
                            listeners: {
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }
                        },
                        {
                            fieldLabel: '12',
                            name: 'lottable12',
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
                       labelWidth: 20,
                       flex: 1,
                       margin: '5 0 0 5',
                       xtype: 'textfield'
                   },
                   items: [
                        {
                            fieldLabel: '13',
                            name: 'lottable13',
                            listeners: {
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }
                        },
                        {
                            fieldLabel: '14',
                            name: 'lottable14',
                            listeners: {
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }
                        },
                        {
                            fieldLabel: '15',
                            name: 'lottable15',
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
                       labelWidth: 20,
                       //flex: 1,
                       margin: '5 0 0 5',
                       xtype: 'textfield'
                   },
                   items: [
                        {
                            fieldLabel: '16',
                            name: 'lottable16',
                            width:135,
                            listeners: {
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }
                        },
                        {
                            fieldLabel: '17',
                            name: 'lottable17',
                            hidden:true,
                            listeners: {
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }
                        },
                        {
                            fieldLabel: '18',
                            name: 'lottable18',
                            hidden:true,
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
                       labelWidth: 20,
                       flex: 1,
                       margin: '5 0 0 5',
                       xtype: 'textfield'
                   },
                   items: [
                        {
                            fieldLabel: '19',
                            name: 'lottable19',
                            hidden:true,
                            listeners: {
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }
                        },
                        {
                            fieldLabel: '20',
                            name: 'lottable20',
                            hidden:true,
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
                       labelWidth: 20,
                       flex: 1,
                       margin: '5 0 0 5',
                       labelAlign: 'top',
                       xtype: 'numberfield',
                       minValue: 0
                   },
                   items: [
                        {fieldLabel: '最大混商品数',name: 'maxSkuQty'},
                        {fieldLabel: '最大混批次数',name: 'maxLotQty'},
                        {fieldLabel: '成功后下一步',name: 'nextStepAfterSuccess'},
                        {fieldLabel: '失败后下一步',name: 'nextStepAfterFailure'}
                   ]
                }
            ]
    	});
    	return this.basicform;
    },

    createOtherRuleForm: function(){
    	this.otherform = Ext.create('Ext.form.Panel',{
			xtype:'form',
			frame:true,
			headerPosition: 'bottom',
			title:'附属限制',
	        autoHeight: true,
	        bodyPadding: 1,
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
	        items: [
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 90,
                        flex: 1,
                        labelAlign: 'top',
                        margin: '5 0 0 10',
                        xtype: 'codecombo',
                        editable: false,
                        codeType: 'LOCTYPE'
                    },
                    items: [
                        {fieldLabel: '包含库位类型',name: 'inLocationType01'},
                        {fieldLabel: '',name: 'inLocationType02',margin: '23 0 0 10'},
                        {fieldLabel: '',name: 'inLocationType03',margin: '23 0 0 10'},
                        {xtype: 'hidden'}
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 90,
                        flex: 1,
                        labelAlign: 'top',
                        margin: '5 0 0 10',
                        xtype: 'codecombo',
                        editable: false,
                        codeType: 'LOCTYPE'
                    },
                    items: [
                        {fieldLabel: '排除库位类型',name: 'exLocationType01'},
                        {fieldLabel: '',name: 'exLocationType02',margin: '23 0 0 10'},
                        {fieldLabel: '',name: 'exLocationType03',margin: '23 0 0 10'},
                        {xtype: 'hidden'}
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 90,
                        flex: 1,
                        labelAlign: 'top',
                        margin: '5 0 0 10',
                        xtype: 'codecombo',
                        editable: false,
                        codeType: 'LOCCATEGRY'
                    },
                    items: [
                        {fieldLabel: '包含库位种类',name: 'inLocationCategory01'},
                        {fieldLabel: '',name: 'inLocationCategory02',margin: '23 0 0 10'},
                        {fieldLabel: '',name: 'inLocationCategory03',margin: '23 0 0 10'},
                        {xtype: 'hidden'}
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 90,
                        flex: 1,
                        labelAlign: 'top',
                        margin: '5 0 0 10',
                        xtype: 'codecombo',
                        editable: false,
                        codeType: 'LOCCATEGRY'
                    },
                    items: [
                        {fieldLabel: '排除库位种类',name: 'exLocCategory01'},
                        {fieldLabel: '',name: 'exLocCategory02',margin: '23 0 0 10'},
                        {fieldLabel: '',name: 'exLocCategory03',margin: '23 0 0 10'},
                        {xtype: 'hidden'}
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 90,
                        flex: 1,
                        labelAlign: 'top',
                        margin: '5 0 0 10',
                        xtype: 'codecombo',
                        editable: false,
                        codeType: 'LOCFLAG'
                    },
                    items: [
                        {fieldLabel: '包含库位标识',name: 'inLocationFlag01'},
                        {fieldLabel: '',name: 'inLocationFlag02',margin: '23 0 0 10'},
                        {fieldLabel: '',name: 'inLocationFlag03',margin: '23 0 0 10'},
                        {xtype: 'hidden'}
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 90,
                        flex: 1,
                        labelAlign: 'top',
                        margin: '5 0 0 10',
                        xtype: 'codecombo',
                        editable: false,
                        codeType: 'LOCFLAG'
                    },
                    items: [
                        {fieldLabel: '排除库位标识',name: 'exLocationFlag01'},
                        {fieldLabel: '',name: 'exLocationFlag02',margin: '23 0 0 10'},
                        {fieldLabel: '',name: 'exLocationFlag03',margin: '23 0 0 10'},
                        {xtype: 'hidden'}
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 90,
                        flex: 1,
                        labelAlign: 'top',
                        margin: '5 0 0 10',
                        xtype: 'codecombo',
                        editable: false,
                        codeType: 'LOCHDLING'
                    },
                    items: [
                        {fieldLabel: '包含库位处理',name: 'inLocationHandle01'},
                        {fieldLabel: '',name: 'inLocationHandle02',margin: '23 0 0 10'},
                        {fieldLabel: '',name: 'inLocationHandle03',margin: '23 0 0 10'},
                        {xtype: 'hidden'}
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 90,
                        flex: 1,
                        labelAlign: 'top',
                        margin: '5 0 0 10',
                        xtype: 'codecombo',
                        editable: false,
                        codeType: 'LOCHDLING'
                    },
                    items: [
                        {fieldLabel: '排除库位处理',name: 'exLocationHandle01'},
                        {fieldLabel: '',name: 'exLocationHandle02',margin: '23 0 0 10'},
                        {fieldLabel: '',name: 'exLocationHandle03',margin: '23 0 0 10'},
                        {xtype: 'hidden'}
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 90,
                        flex: 1,
                        labelAlign: 'top',
                        margin: '5 0 0 10',
                        xtype: 'codecombo',
                        editable: false,
                        codeType: 'LOCABC'
                    },
                    items: [
                        {fieldLabel: '包含周转速度',name: 'inAbc01'},
                        {fieldLabel: '',name: 'inAbc02',margin: '23 0 0 10'},
                        {fieldLabel: '',name: 'inAbc03',margin: '23 0 0 10'},
                        {xtype: 'hidden'}
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 90,
                        flex: 1,
                        labelAlign: 'top',
                        margin: '5 0 0 10',
                        xtype: 'codecombo',
                        editable: false,
                        codeType: 'LOCABC'
                    },
                    items: [
                        {fieldLabel: '排除周转速度',name: 'exAbc01'},
                        {fieldLabel: '',name: 'exAbc02',margin: '23 0 0 10'},
                        {fieldLabel: '',name: 'exAbc03',margin: '23 0 0 10'},
                        {xtype: 'hidden'}
                    ]
                }
            ]
    	});
    	return this.otherform;
    },

    saveStrategyAndDetail: function(){
    	var me = this;
    	var pwform = this.pwform.getForm();
    	var basicform = this.basicform.getForm();
    	var otherform = this.otherform.getForm();
    	
    	var pwsValues = pwform.getValues();
    	var pwsdValues1 = basicform.getValues();

    	var pwsdValues2 = otherform.getValues();
    	if(!(pwform.isValid())||!(basicform.isValid())||!(otherform.isValid())) return;

    	Ext.Ajax.request({
		    url: basePath + '/rules/doSavePutawayStrategy.action',
		    params: {
		    	putawayStrategyKey: pwsValues.putawayStrategyKey,
		    	descr: pwsValues.descr,
		    	mark: pwsValues.mark,
		    	strategyId: pwsValues.id,
                addDate: pwsValues.addDate,
                addWho: pwsValues.addWho,     
                
		    	strategyDetailId: pwsdValues1.id,
		    	stepNumber: pwsdValues1.stepNumber,
		    	status: pwsdValues1.status,
		    	putawayCode: pwsdValues1.putawayCode,
		    	putawayZone: pwsdValues1.putawayZone,
		    	sourceLoc: pwsdValues1.sourceLoc,
		    	putawayLoc: pwsdValues1.putawayLoc,
		    	locLimit01: pwsdValues1.locLimit01,
		    	locLimit02: pwsdValues1.locLimit02,
		    	locLimit03: pwsdValues1.locLimit03,
		    	locLimit04: pwsdValues1.locLimit04,
		    	spaceLimit01: pwsdValues1.spaceLimit01,
		    	spaceLimit02: pwsdValues1.spaceLimit02,
		    	spaceLimit03: pwsdValues1.spaceLimit03,
		    	spaceLimit04: pwsdValues1.spaceLimit04,
		    	orderLimit01: pwsdValues1.orderLimit01,
		    	orderLimit02: pwsdValues1.orderLimit02,
		    	orderLimit03: pwsdValues1.orderLimit03,
		    	orderLimit04: pwsdValues1.orderLimit04,
		    	lottable01: pwsdValues1.lottable01,
		    	lottable02: pwsdValues1.lottable02,
		    	lottable03: pwsdValues1.lottable03,
		    	lottable04: pwsdValues1.lottable04,
		    	lottable05: pwsdValues1.lottable05,
		    	lottable06: pwsdValues1.lottable06,
		    	lottable07: pwsdValues1.lottable07,
		    	lottable08: pwsdValues1.lottable08,
		    	lottable09: pwsdValues1.lottable09,
		    	lottable10: pwsdValues1.lottable10,
		    	lottable11: pwsdValues1.lottable11,
		    	lottable12: pwsdValues1.lottable12,
		    	lottable13: pwsdValues1.lottable13,
		    	lottable14: pwsdValues1.lottable14,
		    	lottable15: pwsdValues1.lottable15,
		    	lottable16: pwsdValues1.lottable16,
		    	lottable17: pwsdValues1.lottable17,
		    	lottable18: pwsdValues1.lottable18,
		    	lottable19: pwsdValues1.lottable19,
		    	lottable20: pwsdValues1.lottable20,
		    	maxSkuQty: pwsdValues1.maxSkuQty,
		    	maxLotQty: pwsdValues1.maxLotQty,
		    	nextStepAfterSuccess: pwsdValues1.nextStepAfterSuccess,
		    	nextStepAfterFailure: pwsdValues1.nextStepAfterFailure,
                daddDate: pwsdValues1.addDate,
                daddWho: pwsdValues1.addWho,   
		    	
		    	inLocationType01: pwsdValues2.inLocationType01,
		    	inLocationType02: pwsdValues2.inLocationType02,
		    	inLocationType03: pwsdValues2.inLocationType03,
		    	exLocationType01: pwsdValues2.exLocationType01,
		    	exLocationType02: pwsdValues2.exLocationType02,
		    	exLocationType03: pwsdValues2.exLocationType03,
		    	inLocationCategory01: pwsdValues2.inLocationCategory01,
		    	inLocationCategory02: pwsdValues2.inLocationCategory02,
		    	inLocationCategory03: pwsdValues2.inLocationCategory03,
		    	exLocCategory01: pwsdValues2.exLocCategory01,
		    	exLocCategory02: pwsdValues2.exLocCategory02,
		    	exLocCategory03: pwsdValues2.exLocCategory03,
		    	inLocationFlag01: pwsdValues2.inLocationFlag01,
		    	inLocationFlag02: pwsdValues2.inLocationFlag02,
		    	inLocationFlag03: pwsdValues2.inLocationFlag03,
		    	exLocationFlag01: pwsdValues2.exLocationFlag01,
		    	exLocationFlag02: pwsdValues2.exLocationFlag02,
		    	exLocationFlag03: pwsdValues2.exLocationFlag03,
		    	inLocationHandle01: pwsdValues2.inLocationHandle01,
		    	inLocationHandle02: pwsdValues2.inLocationHandle02,
		    	inLocationHandle03: pwsdValues2.inLocationHandle03,
		    	exLocationHandle01: pwsdValues2.exLocationHandle01,
		    	exLocationHandle02: pwsdValues2.exLocationHandle02,
		    	exLocationHandle03: pwsdValues2.exLocationHandle03,
		    	inAbc01: pwsdValues2.inAbc01,
		    	inAbc02: pwsdValues2.inAbc02,
		    	inAbc03: pwsdValues2.inAbc03,
		    	exAbc01: pwsdValues2.exAbc01,
		    	exAbc02: pwsdValues2.exAbc02,
		    	exAbc03: pwsdValues2.exAbc03
		    },

		    success: function(response){
		        var text = Ext.decode(response.responseText);
		        var success = text.success;
		        MessageBox.show(success, text.json.msg);
				if(success==true){
					me.pwgrid.getStore().load();
					me.detailgrid.getStore().load();
					basicform.reset();
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
	    	xtype:'putawaystrategymanager',
	    	region:'center'
	    }]
	});
});