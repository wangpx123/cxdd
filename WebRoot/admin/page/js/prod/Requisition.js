/*******************************************
波次领料 Requisition.js
*********************************************/
//波次领料主表存储结构
Ext.define('RequisitionGrid', {
    extend: 'Ext.data.Model',
    fields: [
    	{name:'id'},
		{name:'requisitionKey'},
		{name:'storerKey'},
		{name:'company'},
		{name:'receiptor'},
		{name:'status'},
		{name:'dept'},
		{name:'orderKey'},
		{name:'retailReference'},
		{name:'orderDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
		{name:'requisitionDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
		{name:'editWho'},
		{name:'editDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
        {name:'addDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
        {name:'addWho'}          
	],
    idProperty: 'id'
});

//PICK_DETAIL表存储结构
Ext.define('PickDetailGrid', {
    extend: 'Ext.data.Model',
    fields: [
	        {name:'id'},
	        {name:'orderKey'},
	        {name:'retailReference'},
	        {name:'storerKey'},
	        {name:'lineNumber'},
	        {name:'status'},
	        {name:'sku'},
	        {name:'altsku'},
	        {name:'lot'},
	        {name:'loc'},
	        {name:'gid'},
	        {name:'dropid'},
	        {name:'packKey'},
	        {name:'uom'},
	        {name:'uomqty',type:'float'},
	        {name:'qty',type:'float'},
	        {name:'pallet'},
	        {name:'casecnt'},
	        {name:'innerpack'},
	        {name:'qtypicked',type:'float'},
	        {name:'qtymoved',type:'float'},
	        {name:'cartongroup'},
	        {name:'cartontype'},
	        {name:'fromloc'},
	        {name:'toloc'},
	        {name:'doreplenish'},
	        {name:'replenishzone'},
	        {name:'docartonize'},
	        {name:'pickmethod'},
	        {name:'wavekey'},
	        {name:'trackingid'},
	        {name:'picknotes'},
	        {name:'crossdocked'},
	        {name:'description'},
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
            {name:'udf1'},
            {name:'requisitionKey'},
            {name:'addDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},//添加日期
            {name:'addWho'}//添加人
    ],
    idProperty: 'id'
});


Ext.define('StorePickDetailGrid', {
    extend: 'Ext.data.Model',
    fields: [
	        {name:'id'},
	        {name:'orderKey'},
	        {name:'storerKey'},
	        {name:'lineNumber'},
	        {name:'status'},
	        {name:'sku'},
	        {name:'altsku'},
	        {name:'lot'},
	        {name:'loc'},
	        {name:'gid'},
	        {name:'dropid'},
	        {name:'packKey'},
	        {name:'uom'},
	        {name:'uomqty',type:'float'},
	        {name:'qty',type:'float'},
	        {name:'pallet'},
	        {name:'casecnt'},
	        {name:'innerpack'},
	        {name:'qtypicked',type:'float'},
	        {name:'qtyunpicked',type:'float'},
	        {name:'qtymoved',type:'float'},
	        {name:'cartongroup'},
	        {name:'cartontype'},
	        {name:'fromloc'},
	        {name:'toloc'},
	        {name:'doreplenish'},
	        {name:'replenishzone'},
	        {name:'docartonize'},
	        {name:'pickmethod'},
	        {name:'wavekey'},
	        {name:'trackingid'},
	        {name:'picknotes'},
	        {name:'crossdocked'},
	        {name:'description'},
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
            {name:'udf1'},
            {name:'addDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},//添加日期
            {name:'addWho'}//添加人
    ],
    idProperty: 'id'
});



//拣货的grid
Ext.define('Redm.outbound.UnFinishedPickDetailGrid',{
	extend: 'Redm.BaseGrid',
    alias : 'widget.unfinishedpickdetailgrid',
    autoLoad: false,   //启动不自动加载数据     
    buildColumns: function(){
        this.columns = [
		    { header: "行号", dataIndex: 'lineNumber', width: 70, sortable: true},
		    { header: "状态", dataIndex: 'status', width: 50, sortable: true,
                    renderer:this.rendererPickStatusFunc            
            },
		    { header: "商品", dataIndex: 'sku', width: 100, sortable: true},
//		    { header: "中文名称", dataIndex: 'name', width: 150, sortable: true},
//		    { header: "英文名称", dataIndex: 'desc', width: 150, sortable: true},
		    { header: "批次", dataIndex: 'lot', width: 120, sortable: true},
		    { header: "库位", dataIndex: 'loc', width: 120, sortable: true},
//		    { header: "ID", dataIndex: 'gid', width: 120, sortable: true},
		    { header: "待拣EA数量", dataIndex: 'qty', width: 100, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    { header: "未拣EA数量", dataIndex: 'qtyunpicked', width: 100, sortable: true,renderer:function(v){
		    	if(v > 0)return '<font color=red>'+v+'</font>';
		    }},
		    { header: "单位", dataIndex: 'description', width: 100, sortable: true},   //改用description显示单位
		    { header: "单位数量", dataIndex: 'uomqty', width: 100, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    //{ header: "已拣EA数量", dataIndex: 'qtypicked', width: 100, sortable: true},
            { header: "收货日期", dataIndex: 'lottable01', width: 130, sortable: false,editor:{xtype:'datefield',format:'Y-m-d H:i:s'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
	        { header: "生产日期", dataIndex: 'lottable02', width: 130, sortable: false,editor:{xtype:'datefield',format:'Y-m-d H:i:s'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
	        { header: "失效日期", dataIndex: 'lottable03', width: 130, sortable: false,editor:{xtype:'datefield',format:'Y-m-d H:i:s'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
		    { header: "生产批号", dataIndex: 'lottable04', width: 100, sortable: true},
    		{ header: "托盘号", dataIndex: 'lottable05', width: 100, sortable: true},
		    { header: "成品卷号", dataIndex: 'lottable06', width: 100, sortable: true},
		    { header: "等级", dataIndex: 'lottable07', width: 100, sortable: true},
		    { header: "外观代码", dataIndex: 'lottable08', width: 100, sortable: true},
    		{ header: "表面处理", dataIndex: 'lottable09', width: 100, sortable: true},
		    { header: "规格", dataIndex: 'lottable10', width: 100, sortable: true},
		    { header: "包装形式", dataIndex: 'lottable11', width: 100, sortable: true},
		    { header: "ASN号", dataIndex: 'lottable12', width: 100, sortable: true},
		    { header: "反射率", dataIndex: 'lottable13', width: 100, sortable: true},
		    { header: swmslot14, dataIndex: 'lottable14', width: 100, sortable: true},
		    { header: swmslot15, dataIndex: 'lottable15', width: 100, sortable: true},
		    { header: swmslot16, dataIndex: 'lottable16', width: 100, sortable: true},
		    { header: swmslot17, dataIndex: 'lottable17', width: 100, sortable: true,hidden:true},
		    { header: swmslot18, dataIndex: 'lottable18', width: 100, sortable: true,hidden:true},
		    { header: swmslot19, dataIndex: 'lottable19', width: 100, sortable: true,hidden:true},
		    { header: swmslot20, dataIndex: 'lottable20', width: 100, sortable: true,hidden:true},
		    { header: "面积", dataIndex: 'udf1', width: 100, sortable: true},
		    { header: "id", dataIndex: '',hidden: true}
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
		this.buildStore(basePath + '/prod/doQueryUnFinishedPickDetailInRequisition.action','StorePickDetailGrid',20); 

//    	this.on('itemdblclick',function(grid,record){    //鼠标双击就会跳到另外一个页面
//    		var father = grid.ownerCt.ownerCt.ownerCt.ownerCt.ownerCt;   //
//    		father.pt2pn2tabpanel.setActiveTab(3);       //双击后跳到拣货明细
//    		father.pt2pn2f4form.getForm().loadRecord(record);     //拣货明细form，显示选中的记录
//    		father.pt2pn2f51form.getForm().loadRecord(record);    //手工分配form，显示选中的form，用于取消分配和重新手工分配
//
//    	},this);

    	this.callParent(arguments);
    },
    //拣货表状态解析方法
    rendererPickStatusFunc:function(value)
        {
            var retValue;
            if(value=='0') retValue='新建';
            else if(value=='4') retValue='部分拣货';  //与RF有关
            else if(value=='5') retValue='全部拣货';  //与RF有关
            else if(value=='9') retValue='完成';
            else  retValue=value;
            return retValue;
        }    
});


//Requisition主表grid
Ext.define('Redm.prod.RequisitionGrid', {
    extend: 'Redm.BaseGrid',
    alias : 'widget.requisitiongrid',
    loadMask: true,
    height: 400,
    forceLayout:true,
    buildColumns: function(){
        this.columns = [
		    { 
			    header: "领料单号", 
			    dataIndex: 'requisitionKey', 
			    width: 140, 
			    sortable: true
            },
            { 
			    header: "货主", 
			    dataIndex: 'storerKey',
			    width: 140, 
			    sortable: true
		    },
            { 
			    header: "公司", 
			    dataIndex: 'company', 
			    width: 140,  
			    sortable: true
		    },
		     { 
			    header: "领料人", 
			    dataIndex: 'receiptor', 
			    width: 140,  
			    sortable: true
		    },
		     { 
			    header: "状态", 
			    dataIndex: 'status', 
			    width: 140,  
			    sortable: true,
			    renderer:this.rendererRequisitionStatusFunc            
		    },
		     { 
			    header: "部门", 
			    dataIndex: 'dept', 
			    width: 140,  
			    sortable: true
		    },
		     { 
			    header: "SO单号", 
			    dataIndex: 'orderKey', 
			    width: 140,  
			    sortable: true
		    },
		    { 
			    header: "计划单号", 
			    dataIndex: 'retailReference', 
			    width: 140,  
			    sortable: true
		    },
		     { 
			    header: "订单日期", 
			    dataIndex: 'orderDate', 
			    width: 140,  
			    renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s'),
			    sortable: true
		    },
		     { 
			    header: "领料日期", 
			    dataIndex: 'requisitionDate', 
			    width: 140,  
			    renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s'),
			    sortable: true
		    },
            {
		    	header: "id", 
			    dataIndex: 'id', 
			    hidden: true
		    },
			{ header: "创建时间", dataIndex: 'addDate', width: 140, sortable: true,renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s'),hidden:true},
			{ header: "创建人", dataIndex: 'addWho', width: 140, sortable: true,hidden:true}              
        ];
		return true;
    },
	buildDockedItems: function(){
		var me = this;
		this.dockedItems = [{},{
	        xtype: 'pagingtoolbar',
	        store: this.store,  
	        dock: 'bottom',
	        displayInfo: true
	    }];
	},
    initComponent: function(){
    	var me = this;
    	this.buildStore(basePath + '/prod/doQueryRequisition.action','RequisitionGrid',20);
        
    
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
/*        this.on('render',function(p){   //暂不启用
        	 p.getEl().on("contextmenu",function(e){
            	e.preventDefault();
            },this)
        },this);*/
        this.callParent(arguments);
    },
        //拣货表状态解析方法
    rendererRequisitionStatusFunc:function(value)
        {
            var retValue;
            if(value=='0') retValue='新建';
            else if(value=='4') retValue='部分拣货';  //与RF有关
            else if(value=='5') retValue='全部拣货';  //与RF有关
            else if(value=='3') retValue='拣货中';  //与RF有关
            else if(value=='8') retValue='拣完';  //与RF有关
            else if(value=='9') retValue='完成';
            else  retValue=value;
            return retValue;
        }   

    //第一个tab页面的创建按钮，首页增加panel后需要调整ownerct的关系
/*    onCreate: function(){
   	 	var fatherPanel = this.ownerCt.ownerCt;
   	 	fatherPanel.onGo();
    },*/
    //第一个tab页面的删除按钮，首页增加panel后需要调整ownerct的关系
/*    onDelete: function(){
    	var fatherPanel = this.ownerCt.ownerCt;
   	 	fatherPanel.onGoDelete();
    }*/
});

//分配策略明细表grid
Ext.define('Redm.prod.PickDetailGrid', {
    extend: 'Redm.BaseGrid',
    alias : 'widget.pickdetailgrid',
    autoLoad:false,       //detail 启动时不加载
    loadMask: true,
    height: 400,
    forceLayout:true,
    autoLoad:false,
    buildColumns: function(){
        this.columns = [
		    { header: "SO单号", dataIndex: 'orderKey', width: 120, sortable: true},
		    { header: "计划单号", dataIndex: 'retailReference', width: 120, sortable: true},
		    { header: "状态", dataIndex: 'status', width: 50, sortable: true,
                    renderer:this.rendererPickStatusFunc            
            },
		    { header: "商品", dataIndex: 'sku', width: 120, sortable: true},
//		    { header: "中文名称", dataIndex: 'name', width: 150, sortable: true},
//		    { header: "英文名称", dataIndex: 'desc', width: 150, sortable: true},
		    { header: "批次", dataIndex: 'lot', width: 120, sortable: true},
		    { header: "库位", dataIndex: 'loc', width: 120, sortable: true},
//		    { header: "ID", dataIndex: 'gid', width: 120, sortable: true},
		    { header: "待拣EA数量", dataIndex: 'qty', width: 100, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    { header: "单位", dataIndex: 'description', width: 100, sortable: true},   //改用description显示单位
		    { header: "单位数量", dataIndex: 'uomqty', width: 100, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    //{ header: "已拣EA数量", dataIndex: 'qtypicked', width: 100, sortable: true},
            { header: "收货日期", dataIndex: 'lottable01', width: 130, sortable: false,editor:{xtype:'datefield',format:'Y-m-d H:i:s'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
	        { header: "生产日期", dataIndex: 'lottable02', width: 130, sortable: false,editor:{xtype:'datefield',format:'Y-m-d H:i:s'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
	        { header: "失效日期", dataIndex: 'lottable03', width: 130, sortable: false,editor:{xtype:'datefield',format:'Y-m-d H:i:s'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
		    { header: "生产批号", dataIndex: 'lottable04', width: 100, sortable: true},
    		{ header: "托盘号", dataIndex: 'lottable05', width: 100, sortable: true},
		    { header: "成品卷号", dataIndex: 'lottable06', width: 100, sortable: true},
		    { header: "等级", dataIndex: 'lottable07', width: 100, sortable: true},
		    { header: "外观代码", dataIndex: 'lottable08', width: 100, sortable: true},
    		{ header: "表面处理", dataIndex: 'lottable09', width: 100, sortable: true},
		    { header: "规格", dataIndex: 'lottable10', width: 100, sortable: true},
		    { header: "包装形式", dataIndex: 'lottable11', width: 100, sortable: true},
		    { header: "ASN号", dataIndex: 'lottable12', width: 100, sortable: true},
		    { header: "反射率", dataIndex: 'lottable13', width: 100, sortable: true},
		    { header: swmslot14, dataIndex: 'lottable14', width: 100, sortable: true},
		    { header: swmslot15, dataIndex: 'lottable15', width: 100, sortable: true},
		    { header: swmslot16, dataIndex: 'lottable16', width: 100, sortable: true},
		    { header: swmslot17, dataIndex: 'lottable17', width: 100, sortable: true,hidden:true},
		    { header: swmslot18, dataIndex: 'lottable18', width: 100, sortable: true,hidden:true},
		    { header: swmslot19, dataIndex: 'lottable19', width: 100, sortable: true,hidden:true},
		    { header: swmslot20, dataIndex: 'lottable20', width: 100, sortable: true,hidden:true},
		    { header: "面积", dataIndex: 'udf1', width: 100, sortable: true},
		    { header: "id", dataIndex: 'id',hidden: true}
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
    	this.buildStore(basePath + '/prod/doQueryRequisitionPickDetail.action','PickDetailGrid',20);
    	//屏蔽浏览器右键事件
/*        this.on('render',function(p){  //暂不启用
        	 p.getEl().on("contextmenu",function(e){
            	e.preventDefault();
            },this)
        },this);*/
/*        this.on('itemcontextmenu',function(view,record,item,index,e,eOpts){  //暂不启用
            //禁用的右键相应事件 
            e.preventDefault(); 
            e.stopEvent(); 
             
            var menu = new Ext.menu.Menu({ 
                //控制右键菜单位置 
                float:true, 
                 items:[{ 
                        text:"添加", 
                        iconCls:'leaf', 
                        handler:function(){
                        	//当点击时隐藏右键菜单 
                            this.up("menu").hide(); 
                            me.onAddDetail();
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
        this.callParent(arguments);
    },
     //拣货表状态解析方法
    rendererPickStatusFunc:function(value)
        {
            var retValue;
            if(value=='0') retValue='新建';
            else if(value=='4') retValue='部分拣货';  //与RF有关
            else if(value=='5') retValue='全部拣货';  //与RF有关
            else if(value=='3') retValue='拣货中';  //与RF有关
            else if(value=='8') retValue='拣完';  //与RF有关
            else if(value=='9') retValue='完成';
            else  retValue=value;
            return retValue;
        }    
    
    //第二个tab页增加明细表记录按钮
/*    onAddDetail: function(){
    	var fatherPanel = this.ownerCt.ownerCt;
    	fatherPanel.onAddDetail();
    },*/
    //第二个tab页面删除明细表记录的按钮
/*    onDelete: function(){
    	var fatherPanel = this.ownerCt.ownerCt;
    	fatherPanel.onDeleteDetail();
    }*/
});

//最大的容器，包括两个tab页面
Ext.define('Redm.rules.AllocationStrategy', {	
	extend: 'Ext.tab.Panel',
    alias : 'widget.AllocationManager',
    title:'波次领料',
    layout: 'border',
    tabPosition: 'bottom',
    initComponent: function(){
    	var me = this;
    	this.items = [this.createAPanel(),this.createADPanel()];
//    	this.buildContextMenu();  暂不启用
        this.callParent(arguments);
    },
  
    //右键菜单，暂不启用 
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
			handler: me.saveRequisition,
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

    //第一个tab页面的创建按钮，跳转到第二个页面
    onGo: function(){
        this.setActiveTab(1);
         //执行father的onCreate事件
        this.onCreate();
    },

    //第一个tab页面的查询按钮
    onSelect: function(){
    	  this.gridPanel.getStore().load();
    },
    //第一个tab页面的重置按钮
    onReset: function(){
    	this.selform.getForm().reset();
    },
    
    //第二个tab页面的创建按钮，清空两个form
    onCreate: function(){
    	this.topform.getForm().reset();
    	//计划在创建时自动加载一个数字
        var nameCode='REQUISITIONNUM';
		var typeserail='0';
		this.teststore = Ext.create('Ext.data.Store', {
	        remoteSort: true,
            autoLoad: true,
            fields: [
                        {name:'number'},
                        {name:'id'}
            ],
	        proxy: {
	            type: 'ajax',
	            url: basePath + '/support/doCreateNumberRules.action?string='+nameCode+','+typeserail,     
	            reader: {type: 'json',root: 'json.data',totalProperty: 'json.totalCount'},
	            actionMethods: { read: 'POST' },
	            simpleSortMode: true
	        },
            //加载数据到store，通过监听事件来设置
            listeners: {
                'load':function(sto,recs){
                    var value=sto.getAt(0).get('number');
                    if(''!=value)
                    {
                        this.topform.getForm().findField('requisitionKey').setValue(value); 
                        this.topform.getForm().findField('status').setValue('0');  
                        //创建时自动设置时间
                        var  timeValue=Ext.util.Format.date(new Date(),"Y-m-d H:i:s");
                        this.topform.getForm().findField('orderDate').setValue(timeValue);
                        var  requisitionDate=Ext.util.Format.date(new Date(),"Y-m-d H:i:s");
                        this.topform.getForm().findField('requisitionDate').setValue(requisitionDate); 
                    }
                },scope:this
            }
	    })
    },

    //第一个tab页面，包括一个grid，和一个Pt1Pn1Panel
    createAPanel: function(){ 
    	this.apanel = Ext.create('Ext.panel.Panel',{
    		title: '查询',
    		layout: 'border',
//    		items:[this.createGridPanel(),this.createBtnForm(),this.createSelForm()]
    		items: [this.createGridPanel(),this.createPt1Pn1Panel()]
            
    	});
    	return this.apanel;
    },
    
//新增一个面板Pt1Pn1Panel，放置按钮面板和查询form，
//这个面板大小固定，grid作为尺寸可变化的面板使用
    createPt1Pn1Panel: function(){
    	var me = this;
    	this.pt1pn1panle = Ext.create('Ext.panel.Panel',{
    		layout: 'border',
    		border: false,
            region: 'north',
            height:155,
    		items:[this.createBtnForm(),this.createSelForm()]
    	});
    	return this.pt1pn1panle;
    },


    
    //第一个tab上部Pt1Pn1Panel 的按钮面板，主表的创建和删除按钮
    createBtnForm: function(){
    	var me = this;
    	this.btnform = Ext.create('Ext.form.Panel',{
    		region: 'center',
    		frame: true,
    		defaults: {
    			xtype: 'button'
    		},
    		items:[
                {
                    iconCls: 'icon-create',
                    text: '创建',   
                    scope: this,
                    handler: me.onGo
                },
                {
                    iconCls: 'icon-search',
                    handler: me.onSelect,
                    scope: this,
                    text: '查询'
                },
                {
                    margin: '5 0 0 5',
                    xtype: 'button',
                    iconCls: 'icon-reset',
                    handler: this.onReset,
                    scope: this,
                    text: '重置'
                }
            ]
    	});
    	return this.btnform;
    },
    
    //第一个tab上部Pt1Pn1Panel 的查询面板
    createSelForm: function(){
    	var me = this;
    	this.selform = Ext.create('Ext.form.Panel',{
    		region: 'north',
    		height: 120,
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
                            name: 'requisitionKey',
                            listeners: {
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            },
                            fieldLabel: '领料单号'
                        },
                        {
                            xtype: 'codecombo',
                   			codeType: 'REQUISITIONRECEIPTOR',
                            width: 170,
                            labelWidth: 55,
                            name: 'receiptor',
                            fieldLabel: '领料人'
                        },     
                        {
                            width: 170,
                            labelWidth: 55,
                            xtype:'textfield',
                            name: 'storerKey',
                            fieldLabel: '货主'
                        },
                         {
                            width: 170,
                            labelWidth: 55,
                            xtype:'textfield',
                            name: 'company',
                            fieldLabel: '公司'
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
                            xtype:'textfield',
                            width: 170,
                            labelWidth: 55,
                            name: 'orderKey',
                            fieldLabel: 'SO单号'
                        },   
                        {
                            xtype: 'codecombo',
                   			codeType: 'REQUISITIONTYPE',
                            width: 170,
                            labelWidth: 55,
                            name: 'status',
                            fieldLabel: '状态'
                        },
                        {
                            xtype:'datefield',
                            width: 170,
                            labelWidth: 55,
                            name: 'orderDate',
                            fieldLabel: '订单日期',
                            format:'Y-m-d H:i:s'
                        },
                        {
                            xtype:'datefield',
                            width: 170,
                            labelWidth: 55,
                            name: 'orderDateOver',
                            fieldLabel: '--->',
                            format:'Y-m-d H:i:s'
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
                            xtype:'textfield',
                            width: 170,
                            labelWidth: 55,
                            name: 'retailReference',
                            fieldLabel: '计划单号'
                        },   
                        {
                            xtype: 'codecombo',
                   			codeType: 'REQUISITIONDEPT',
                            width: 170,
                            labelWidth: 55,
                            name: 'dept',
                            fieldLabel: '部门'
                        },               
                        {
                            xtype:'datefield',
                            width: 170,
                            labelWidth: 55,
                            name: 'requisitionDate',
                            fieldLabel: '领料日期',
                            format:'Y-m-d H:i:s'
                        },
                        {
                            xtype:'datefield',
                            width: 170,
                            labelWidth: 55,
                            name: 'requisitionDateOver',
                            fieldLabel: '--->',
                            format:'Y-m-d H:i:s'
                        }
                    ]
                }
            ]
    	});
    	return this.selform;
    },
    
    //创建主表grid面板
    createGridPanel: function(){
    	var me = this;
    	this.gridPanel = Ext.create('widget.requisitiongrid',{
//			region: 'south',
			region: 'center',
//			height: 450,
			listeners: {
    			itemdblclick: function(grid,record){
    				me.setActiveTab(1);
    				me.topform.getForm().loadRecord(record);
                    me.detailgrid.getStore().load();
                    me.unfinishedpickdetailgrid.getStore().load();
    			}
    		}
		});
		this.gridPanel.getStore().on('beforeload',function(){
    		var params = this.gridPanel.getStore().getProxy().extraParams;
    		var record = me.selform.getForm().getValues();
    		
    		var requisitionKey = record.requisitionKey; 
    		var storerKey = record.storerKey; 
    		var company = record.company; 
    		var receiptor = record.receiptor; 
    		var status = record.status; 
    		var dept = record.dept; 
    		var retailReference = record.retailReference; 
    		var orderKey = record.orderKey; 
    		var orderDate = Ext.util.Format.date(record.orderDate,'Y-m-d H:i:s');
    		var orderDateOver = Ext.util.Format.date(record.orderDateOver,'Y-m-d H:i:s');
    		var requisitionDate = Ext.util.Format.date(record.requisitionDate,'Y-m-d H:i:s');
    		var requisitionDateOver = Ext.util.Format.date(record.requisitionDateOver,'Y-m-d H:i:s');
    		
			delete params.requisitionKey;
			delete params.storerKey;
			delete params.company;
			delete params.receiptor;
			delete params.status;
			delete params.dept;
			delete params.orderKey;
			delete params.retailReference;
			delete params.orderDate;
			delete params.requisitionDate;
			delete params.orderDateOver;
			delete params.requisitionDateOver;
			
			if(requisitionKey) params.requisitionKey = requisitionKey;
			if(storerKey) params.storerKey = storerKey;
			if(company) params.storerKey = company;
			if(receiptor) params.receiptor = receiptor;
			if(status) params.status = status;
			if(dept) params.dept = dept;
			if(orderKey) params.orderKey = orderKey;
			if(retailReference) params.retailReference = retailReference;
			if(orderDate) params.orderDate = orderDate;
			if(requisitionDate) params.requisitionDate = requisitionDate;
			if(orderDateOver) params.orderDateOver = orderDateOver;
			if(requisitionDateOver) params.requisitionDateOver = requisitionDateOver;
			
    	},this);
		return this.gridPanel;
    },
    
    //创建第二个tab页面，包括一个DTop panel，明细表grid，和明细表输入面板
    createADPanel: function(){
    	var me = this;
    	this.adpanel = Ext.create('Ext.panel.Panel',{
    		title: '基本',
    		layout: 'border',
/*    		tbar: {    //暂不使用
	            plugins: new Ext.ux.ToolbarKeyMap(),
	            hidden: true,
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
	                        handler: me.saveRequisition
	                    }, {
	                        text: '创建（基本）',
	                        scope: this,
	                        keyBinding: {
	                            key: 'n',
	                            ctrl: true
	                        },
	                        handler: me.onCreate
	                    },{
	                        text: '添加（基本）',
	                        scope: this,
	                        keyBinding: {
	                            key: 'a',
	                            ctrl: true
	                        },
	                        handler: me.onAddDetail
	                    }]
	                }
	            }]
	        },*/
    		items:[this.createPt2Pn2TabPanel(),this.createDTopPanel()]
    	});
    	return this.adpanel;
    },
    
     // 第二个tab页的下半部分，是tab.Panel类型创建的，有一个grid和多个form
    createPt2Pn2TabPanel: function(){
    	var me = this;
    	this.pt2pn2tabpanel = Ext.create('Ext.tab.Panel',{
//    		tabPosition: 'bottom',
    		region: 'center',
    		items: [me.createDetailGrid(),me.createPt2Pn2F6PlusGrid()]
    	});
    	return this.pt2pn2tabpanel;
    },
    
    createPt2Pn2F6PlusGrid: function(){
    	var me = this;
        this.unfinishedpickdetailgrid = Ext.create('widget.unfinishedpickdetailgrid',{
    		title: '未拣货完成'
    	});
    	this.unfinishedpickdetailgrid.getStore().on({
			beforeload:{fn:function(store){
				var params = store.getProxy().extraParams;
				var record = me.topform.getForm().getValues();
	    		var requisitionKey = record.requisitionKey;
				delete params.requisitionKey;
				if(requisitionKey) params.requisitionKey = requisitionKey;
			
			},scope: this}
		});
    	return this.unfinishedpickdetailgrid;
    },  
    
    //第二个tab页面的DTop panel，包括一个主表按钮面板，明细表按钮面板，主表记录输入、显示的form
    createDTopPanel: function(){
    	this.dtoppanel = Ext.create('Ext.panel.Panel',{
    		region: 'north',
    		layout: 'border',
    		border: false,
    		height: 200,
    		items:[this.createBtnPanel(),this.createTopForm(),this.createDBtnPanel()]
    	});
    	return this.dtoppanel;
    },
    
    //第二个panel顶部的DTop panel的主表按钮面板
    createBtnPanel: function(){
    	var me = this;
    	this.btnpanel = Ext.create('Ext.form.Panel',{
    		region: 'north',
    		frame: true,
    		defaults: {
    			xtype: 'button',
    			margin: '5 0 0 5'
    		},
/*    		listeners:{
	            render:function(p){
	                p.getEl().on("contextmenu",function(e){
	                	me.createContextMenu(e);
	                },me)
	            }
            },*/
    		items:[
                {
                    iconCls: 'icon-create',
                    text: '创建',
                    scope: this,
                    handler: me.onCreate
                },
//                {
//                    iconCls: 'icon-delete',
//                    text: '删除',
//                    handler: me.onDelete,
//                    scope: this
//                },
                {
                    iconCls: 'icon-save',
                    text: '保存',
                    handler:  me.saveRequisition,
                    scope: this
                },
                 {
                    iconCls: 'icon-save',
                    text: '拣完',
                    handler:  me.finishRequisition,
                    scope: this
                },
                 {
                    iconCls: 'icon-save',
                    text: '打印',
                    handler:  me.printRequisition,
                    scope: this
                }
            ]
    	});
    	return this.btnpanel;
    },
    
    //第二个panel顶部的DTop panel的明细表按钮面板    
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
	                	me.createContextChildMenu(e);
	                },me)
	            }
            },*/
    		items:[
//                {
//                    iconCls: 'icon-delete',
//                    text: '删除',
//                    handler:me.onDeleteDetail,
//                    scope: this
//                },
                {
                    iconCls: 'icon-delete',
                    text: '领单',
                    handler:function(){
                    	var record = this.topform.getForm().getValues();
    					var status = record.status;
    					var retailReference = record.retailReference;
    					var orderKey = record.orderKey;
		                if("0"!=status)
				        {
				            MessageBox.error("错误提示","此单不可操作!");
				            return;
				        } 
		                this.creatTransactionWindowPanel();
		                this.Transactionform.getForm().findField('retailReference').setValue(retailReference); 
		                this.Transactionform.getForm().findField('orderKey').setValue(orderKey); 
		                this.winformtran.show();
		            },
                    scope: this
                }
            ]
    	});
    	return this.dbtnpanel;
    },
    
    //第二个panel顶部的DTop panel的主表记录输入、显示面板
    createTopForm: function(){
    	var me = this;
    	this.topform = Ext.create('Ext.form.Panel',{
    		region: 'center',
    		height: 120,
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
                            name: 'requisitionKey',
                            listeners: {
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            },
                            fieldLabel: '领料单号'
                        },
                        {
                            xtype: 'codecombo',
                   			codeType: 'REQUISITIONRECEIPTOR',
                            width: 170,
                            labelWidth: 55,
                            name: 'receiptor',
                            fieldLabel: '领料人'
                        },     
                        {
                            width: 170,
                            labelWidth: 55,
                            xtype:'textfield',
                            name: 'storerKey',
                            fieldLabel: '货主'
                        },
                         {
                            width: 250,
                            labelWidth: 50,
                            xtype:'textfield',
                            name: 'company',
                            fieldLabel: '公司'
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
                            xtype:'textfield',
                            width: 170,
                            labelWidth: 55,
                            name: 'orderKey',
                            fieldLabel: 'SO单号'
                        },   
                        {
                            xtype: 'codecombo',
                   			codeType: 'REQUISITIONTYPE',
                            width: 170,
                            labelWidth: 55,
                            name: 'status',
                            fieldLabel: '状态'
                        },
                        {
                            xtype:'datefield',
                            width: 170,
                            labelWidth: 55,
                            name: 'orderDate',
                            fieldLabel: '订单日期',
                            format:'Y-m-d H:i:s',
                            value: Ext.util.Format.date(new Date(),"Y-m-d")     //初始值是当天日期，时分秒自动填0
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
                            xtype:'textfield',
                            width: 170,
                            labelWidth: 55,
                            name: 'retailReference',
                            fieldLabel: '计划单号'
                        },   
                        {
                            xtype: 'codecombo',
                   			codeType: 'REQUISITIONDEPT',
                            width: 170,
                            labelWidth: 55,
                            name: 'dept',
                            fieldLabel: '部门'
                        },               
                        {
                            xtype:'datefield',
                            width: 170,
                            labelWidth: 55,
                            name: 'requisitionDate',
                            fieldLabel: '领料日期',
                            format:'Y-m-d H:i:s',
                            value: Ext.util.Format.date(new Date(),"Y-m-d")     //初始值是当天日期，时分秒自动填0
                        },
                        {
                            xtype:'textfield',
                            width: 170,
                            hidden:true,
                            labelWidth: 55,
                            name: 'id',
                            fieldLabel: ''
                        },
                        {
                            xtype:'textfield',
                            width: 170,
                            hidden:true,
                            labelWidth: 55,
                            name: 'id',
                            fieldLabel: ''
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
                }
            ]
    	});
    	return this.topform;
    },
    
    //第二个tab页面的grid面板
    createDetailGrid: function(){
    	var me = this;
    	this.detailgrid = Ext.create('widget.pickdetailgrid',{
    		region: 'center',
    		title: '领料明细',
    		listeners: {
    			itemclick: function(grid,record){
    				me.basicForm.getForm().loadRecord(record);
    			}
    		}
    	});
		this.detailgrid.getStore().on('beforeload',function(){
    		var params = this.detailgrid.getStore().getProxy().extraParams;
    		var record = me.topform.getForm().getValues();
    		
    		var requisitionKey = record.requisitionKey;
			delete params.requisitionKey;
			if(requisitionKey) params.requisitionKey = requisitionKey;
    		
    	},this);
    	return this.detailgrid;
    },
    printRequisition:function(){
		var me = this;
    	var form = me.topform.getForm();
    	var values = form.getValues();
    	var status = values.status;
		if("3"!=status)
		{
			MessageBox.error("错误提示","此单不可操作!");
			return;
		} 
		else
		{
			Ext.Ajax.request({
			    url: basePath + '/prod/printRequisition.action',
			    params: {
                    orderKey:values.orderKey,
                     retailReference:values.retailReference,
                    requisitionKey:values.requisitionKey
			    },		
                async: false,				
			    success: function(response){
			    var text = Ext.decode(response.responseText);
		        url = basePath + text.json.path;

			    }
			});
			
			try{delete window.frames["printerlist"];}catch(e){};
			me.winItems = {
				html: "<iframe id='printerlist' name='printerlist' src='"+url+"' style='width:100%; height:100%;' frameborder='0'></iframe>"
			};
			me.win = me.createPrinterWindow();
			me.prinerWin.show();
			me.prinerWin.on('close',function(){
				delete me.winItems;
				delete me.prinerWin;
				delete me.win;
			},me);	
        }
    },
    
    	createPrinterWindow: function(){
			this.prinerWin = Ext.create('widget.window',{
				width: 500,
				height: 380,
		        layout: 'fit',
		        title: '打印',
				items:[this.winItems]
		});
		return this.prinerWin;
    },
    //保存主表和明细表相关记录
    saveRequisition: function(){
    	var me = this;
    	var form = this.topform.getForm();
    	var values = form.getValues();
    	var status = values.status;
		if("0"!=status)
		{
			MessageBox.error("错误提示","此单不可操作!");
			return;
		} 
    	if(!(form.isValid())) return;
    	Ext.Ajax.request({
		    url: basePath + '/prod/doSaveRequisition.action',
		    params: {
		    	id: values.id,
		    	requisitionKey: values.requisitionKey,
		    	storerKey: values.storerKey,
		    	company: values.company,
                receiptor: values.receiptor,
                status: values.status,                    
				dept: values.dept,
		    	orderKey: values.orderKey,
		    	orderDate: values.orderDate,
                requisitionDate: values.requisitionDate,
                addDate: values.addDate, 
                addWho: values.addWho
		    },
		    success: function(response){
		        var text = Ext.decode(response.responseText);
		        var success = text.success;
		        MessageBox.show(success, text.json.msg);
		        me.gridPanel.getStore().load();
		        me.detailgrid.getStore().load();
       			me.setActiveTab(0);
		        }
		});
    },
    
    finishRequisition: function(){
    	var me = this;
    	var form = this.topform.getForm();
    	var values = form.getValues();
    	var status = values.status;
		if("3"!=status)
		{
			MessageBox.error("错误提示","此单不可操作!");
			return;
		} 
    	if(!(form.isValid())) return;
    	Ext.Ajax.request({
		    url: basePath + '/prod/dofinishRequisition.action',
		    params: {
		    	requisitionKey: values.requisitionKey
		    },
		    success: function(response){
		        var text = Ext.decode(response.responseText);
		        var success = text.success;
		        MessageBox.show(success, text.json.msg);
		        me.gridPanel.getStore().load();
		        me.detailgrid.getStore().load();
       			me.setActiveTab(0);
		        }
		});
    },
     //从库存提取相关界面   
        creatTransactionWindowPanel: function(){
        var me = this;
        this.winformtran = Ext.create('Ext.window.Window',{
            title: '拣货明细查询',
            height: 550,
            width: 1050,
            layout: 'border',
            border: false,
            items: [this.creatTransactionPanel()]
        });
        this.winformtran.on('close',function(){
            delete this.winformtran;
        },this);
        return this.winformtran;
    },
    
    creatTransactionPanel:function(){
        var me = this;
        this.Transactionpanle=Ext.create('Ext.panel.Panel',{
            region: 'center',
            layout: 'border',
            //height:360,
            border: false,
            items: [this.createTransactionForm(),this.creatTransactionGridPanel()]
        })
        
        return this.Transactionpanle;
    },
    
    //创建ASNForm
    createTransactionForm: function(){
        var me=this;
        this.Transactionform = Ext.create('Ext.form.Panel',{
    		region: 'north',
    		layout: 'vbox',
            height:40,
			autoScroll : true,
    		frame: true,
            
            //以下是每个item的公共属性
            defaults: {
                anchor: '100%',
                xtype: 'fieldcontainer',
                layout: 'hbox',
                defaultType: 'textfield',
                combineErrors: true,
                width:1000,
                defaults: {
					margins: '0 2 0 6'
                }
            },
    		items: [
                {
                    items: [
                        {
                            fieldLabel:'SO单号',
                            labelWidth:60,
                            name: 'orderKey',
                            listeners:{
                                blur: function(txt){
                                    var storerValue=Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(storerValue);
                                } 
                            }                            
                        },
                        {
                            fieldLabel:'计划单号',
                            labelWidth:60,
                            name: 'retailReference',
                            listeners:{
                                blur: function(txt){
                                    var storerValue=Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(storerValue);
                                } 
                            }                            
                        },
                         {
                            fieldLabel:'',
                            value:'upload',
                            labelWidth:60,
                            hidden:true,
                            name: 'type',
                            listeners:{
                                blur: function(txt){
                                    var storerValue=Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(storerValue);
                                } 
                            }                            
                        } 
                    ]
                }
			]
    	});
        return this.Transactionform;
    },

    creatTransactionGridPanel:function(){
        var me = this;
        this.Transactionpanle=Ext.create('Ext.panel.Panel',{
            region: 'center',
            layout: 'border',
            border: false,
            items: [this.createTransactionButton(),this.createTransactionGrid()]
        })
        return this.Transactionpanle;
    },
    
    createTransactionButton: function(){
        this.Transactionbutton = Ext.create('Ext.form.Panel',{
            region: 'north',
            frame: true,
            height:35,
            defaults: {
                xtype: 'button'
            },
            items: [
                {
                        iconCls: 'icon-search',
                        text: '查询',
                        handler: this.onTransactionSelect,      //从库存提取查询按钮
                        scope: this
                },
                {
                        iconCls: 'icon-reset',
                        text: '重置',
                        handler: this.onTransactionReset,       //从库存提取重置按钮，清空查询条件
                        scope: this
                },
                {
                        iconCls: 'icon-save',
                        text: '确定',
                        handler: this.onTransactionSubmit,      //从库存提取提交按钮
                        scope: this
                },
                {
                        iconCls: 'icon-reset',
                        text: '返回',
                        handler: this.onTransactionReturn,      //返回按钮
                        scope: this
                }                
            ]
        });
        return this.Transactionbutton;
    },
    
    //创建库存余量Grid
    createTransactionGrid: function(){
        this.Transactiongrid = Ext.create('widget.pickdetailgrid',{
            region: 'center',
            selModel:Ext.create('Ext.selection.CheckboxModel')
        });
        this.Transactiongrid.getStore().on('beforeload',function(store){         //初次加载前或查询时的设置
            var params = store.getProxy().extraParams;
            var values = this.Transactionform.getForm().getFieldValues();
            var orderKey = values.orderKey;
            var retailReference = values.retailReference;
            var type = values.type;

            delete params.orderKey;
            delete params.retailReference;
            delete params.type;
            if(orderKey) params.orderKey = orderKey;
            if(retailReference) params.retailReference = retailReference;
            if(type) params.type = type;
            
        },this);
        return this.Transactiongrid;
    },
      //从库存提取用到的按钮前台方法
    onTransactionSelect: function(){
    	var values = this.Transactionform.getForm().getFieldValues();
//        var orderKey = values.orderKey;
        var retailReference = values.retailReference;
//    	if(""==orderKey)
//        {
//            MessageBox.error("错误提示","请先输入SO单号！");
//            return;
//        } 
        if(""==retailReference)
        {
            MessageBox.error("错误提示","请先输入计划单号！");
            return;
        } 
        this.Transactiongrid.getStore().load();
    },
    
    //从ASN提取用到的按钮前台方法
    onTransactionReset: function(){
        this.Transactionform.getForm().reset();
    },
    
    onTransactionSubmit: function(){
        var me=this;
        var id=this.topform.getForm().findField('id').getValue();
        var requisitionKey=this.topform.getForm().findField('requisitionKey').getValue();
        var storerKey=this.topform.getForm().findField('storerKey').getValue();
        var company=this.topform.getForm().findField('company').getValue();
        var receiptor=this.topform.getForm().findField('receiptor').getValue();
        var status=this.topform.getForm().findField('status').getValue();
        var dept=this.topform.getForm().findField('dept').getValue();
//        var orderKey=this.Transactionform.getForm().findField('orderKey').getValue();
        
        var orderKey=this.Transactionform.getForm().findField('orderKey').getValue();
        var retailReference=this.Transactionform.getForm().findField('retailReference').getValue();
        
        var orderDate=Ext.util.Format.date(this.topform.getForm().findField('orderDate').getValue(),'Y-m-d H:i:s');
        var requisitionDate=Ext.util.Format.date(this.topform.getForm().findField('requisitionDate').getValue(),'Y-m-d H:i:s');
        var records = me.Transactiongrid.getSelectionModel().getSelection();
        if((records == ""))
        {
            MessageBox.error("错误提示","请选择要操作的数据！");
            return;
        } 
//        if(""==orderKey)
//        {
//            MessageBox.error("错误提示","请先输入SO单号！");
//            return;
//        } 
        
        var ids = []; 
        Ext.Array.each(records, function(name, index, countriesItSelf) {
            ids.push(name.getData().id);
        });
        {
            var mask = new Ext.LoadMask(me.getEl(), { 
                msg : 'please wait...' 
            });
            mask.show(); 
            Ext.Ajax.request({
                url: basePath + '/prod/importRequisitionFromPickDetail.action',
                params: {
                    ids: ids,
                    id: id, 
                    requisitionKey: requisitionKey, 
  				    storerKey:storerKey, 
  				    company: company, 
  				    receiptor: receiptor, 
  				    status: status, 
  				    dept: dept, 
  				    orderKey: orderKey,
  				    retailReference: retailReference,
  				    orderDate:orderDate,
  				    requisitionDate:requisitionDate
                },
                success: function(response){
                    var text = Ext.decode(response.responseText);
                    var success = text.success;
                    mask.hide();
                    MessageBox.show(success, text.json.msg);
                    if(true==success)
                    {
                         me.gridPanel.getStore().load();
       					 me.winformtran.close();
      					 me.setActiveTab(0);
        				 me.detailgrid.getStore().load();
                    }
                }
            });
        } 
    },
    onTransactionReturn: function(){
        var me=this;
        me.gridPanel.getStore().load();
        me.winformtran.close();
        me.setActiveTab(0);
        me.detailgrid.getStore().load();
    }
});

Ext.onReady(function(){
	Ext.create('Ext.container.Viewport', {
	    layout: 'border',
	    items: [{
	    	xtype:'AllocationManager',
	    	region:'center'
	    }]
	});
});