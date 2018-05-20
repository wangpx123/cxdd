/******************************************************
库存转移 Transfer.js


******************************************************/

Ext.define('Transfer', {
    extend: 'Ext.data.Model',
    fields: [
        {name:'id'},
        {name:'transferKey'},
        {name:'fromstorerkey'},
        {name:'tostorerkey'},
        {name:'status'},
        {name:'type'},
        {name:'effectiveDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
        {name:'generateHocharges'},
        {name:'generateHicharges'},
        {name:'ref1'},
        {name:'ref2'},
        {name:'orderKey'},
        {name:'addDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
        {name:'addWho'},
        {name:'editDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
        {name:'editWho'}
    ],
    idProperty: 'id'
});


Ext.define('TransferDetail', {
    extend: 'Ext.data.Model',
    fields: [
        {name:'id'},
        {name:'transferKey'},
        {name:'lineNumber'},
        {name:'status'},
        {name:'fromsku'},
        {name:'fromlot'},
        {name:'fromloc'},
        {name:'fromgid'},
        {name:'fromQty',type:'float',numberFormat:'0.000'},
        {name:'fromPackkey'},
        {name:'fromuom'},
        {name:'tosku'},
        {name:'tolot'},
        {name:'toloc'},
        {name:'togid'},
        {name:'toQty',type:'float',numberFormat:'0.000'},
        {name:'toPackkey'},
        {name:'touom'},
        {name:'fromlottable01',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
        {name:'fromlottable02',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
        {name:'fromlottable03',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
        {name:'fromlottable04'},
        {name:'fromlottable05'},
        {name:'fromlottable06'},
        {name:'fromlottable07'},
        {name:'fromlottable08'},
        {name:'fromlottable09'},
        {name:'fromlottable10'},
        {name:'fromlottable11'},
        {name:'fromlottable12'},
        {name:'fromlottable13'},
        {name:'fromlottable14'},
        {name:'fromlottable15'},
        {name:'fromlottable16'},
        {name:'fromlottable17'},
        {name:'fromlottable18'},
        {name:'fromlottable19'},
        {name:'fromlottable20'},
		{name:'tolottable01',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
        {name:'tolottable02',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
        {name:'tolottable03',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
        {name:'tolottable04'},
        {name:'tolottable05'},
        {name:'tolottable06'},
        {name:'tolottable07'},
        {name:'tolottable08'},
        {name:'tolottable09'},
        {name:'tolottable10'},
        {name:'tolottable11'},
        {name:'tolottable12'},
        {name:'tolottable13'},
        {name:'tolottable14'},
        {name:'tolottable15'},
        {name:'tolottable16'},
        {name:'tolottable17'},
        {name:'tolottable18'},
        {name:'tolottable19'},
        {name:'tolottable20'},
        {name:'effectiveDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
        {name:'addDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
        {name:'addWho'},
        {name:'editDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
        {name:'editWho'}
    ],
    idProperty: 'id'
});

//库存提取使用
Ext.define('Transaction', {
    extend: 'Ext.data.Model',
    fields: [
        {name:'id'},
        {name:'storerKey'},            
        {name:'sku'},     
        {name:'loc'},
        {name:'lot'},  
        {name:'gid'},  
        {name:'qty',type:'float'},
        {name:'qtyavail',type:'float'},
        {name:'qtyallocated',type:'float'},
        {name:'qtyonhold',type:'float'},
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
        {name:'lottable16'},//批属性16
        {name:'lottable17'},//批属性17
        {name:'lottable18'},//批属性18
        {name:'lottable19'},//批属性19
        {name:'lottable20'},//批属性20
        {name:'name'},     //sku表的字段，通过内连接获取  
        {name:'qtyavailable',type:'float'},     //表中没有，自定义字段
        {name:'status'}     //lli的状态字段
    ],
    idProperty: 'id'
});
//按照LotxLocxId提取库存到SO的Grid
Ext.define('Redm.inventory.LliGrid', {
    extend: 'Redm.BaseGrid',
    alias : 'widget.lligrid',
    loadMask: true,
    forceLayout:true,
    autoLoad:false,
    selModel: Ext.create('Ext.selection.CheckboxModel'),    
    buildColumns: function(){
        this.columns = [
            { header: "SKU", dataIndex: 'sku', width: 140, sortable: true},
            { header: "库位", dataIndex: 'loc', width: 70, sortable: true},
            { header: "ID", dataIndex: 'id', width: 100, sortable: true,hidden:true},
            { header: "货主", dataIndex: 'storerKey', width: 50, sortable: true},
            { header: "数量", dataIndex: 'qty', width: 80, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
            { header: "可用数量", dataIndex: 'qtyavail', width: 80, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
            { header: "已分配数量", dataIndex: 'qtyallocated', width: 80, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
            { header: "托盘号", dataIndex: 'lottable05', width: 80, sortable: true},
            { header: "成品卷号", dataIndex: 'lottable06', width: 100, sortable: true},
            { header: "等级", dataIndex: 'lottable07', width: 80, sortable: true},
            { header: "外观代码", dataIndex: 'lottable08', width: 60, sortable: true},
            { header: "表面处理", dataIndex: 'lottable09', width: 100, sortable: true},
//          { header: "名称", dataIndex: 'name', width: 100, sortable: true},            
//          { header: "批次", dataIndex: 'lot', width: 100, sortable: true},
//          { header: "ID", dataIndex: 'gid', width: 100, sortable: true},
            { header: "状态", dataIndex: 'status', width: 100, sortable: true,
                renderer:this.rendererStatusFunc
            },
            { header: "收货日期", dataIndex: 'lottable01', width: 130, sortable: false,editor:{xtype:'datefield',format:'Y-m-d H:i:s'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
            { header: "生产日期", dataIndex: 'lottable02', width: 130, sortable: false,editor:{xtype:'datefield',format:'Y-m-d H:i:s'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
            { header: "失效日期", dataIndex: 'lottable03', width: 130, sortable: false,editor:{xtype:'datefield',format:'Y-m-d H:i:s'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
            { header: "生产批号", dataIndex: 'lottable04', width: 100, sortable: true},
            { header: "规格", dataIndex: 'lottable10', width: 100, sortable: true},
            { header: "包装形式", dataIndex: 'lottable11', width: 100, sortable: true},
            { header: "ASN号", dataIndex: 'lottable12', width: 100, sortable: true},
            { header: "反射率", dataIndex: 'lottable13', width: 100, sortable: true},
            { header: "极差", dataIndex: 'lottable14', width: 100, sortable: true},
            { header: "批重量", dataIndex: 'lottable15', width: 100, sortable: true},
		    { header: swmslot16, dataIndex: 'lottable16', width: 100, sortable: true},
		    { header: swmslot17, dataIndex: 'lottable17', width: 100, sortable: true,hidden:true},
            { header: swmslot18, dataIndex: 'lottable18', width: 100, sortable: true,hidden:true},
    		{ header: swmslot19, dataIndex: 'lottable19', width: 100, sortable: true,hidden:true},
		    { header: swmslot20, dataIndex: 'lottable20', width: 100, sortable: true,hidden:true}
        ];
        return true;
    },

    buildDockedItems: function(){
        this.dockedItems = [{
            xtype: 'pagingtoolbar',
            store: this.store,  
            dock: 'bottom',
            displayInfo: true
        }];
    },
    initComponent: function(){
        var me = this;
        this.buildStore(basePath+'/outbound/doQueryTransactionLLI.action','Transaction',20);
      this.callParent(arguments);
    },
//LLI status解析函数
    rendererStatusFunc:function(value)
        {
            var retValue;
            if(value=='0') retValue='正常';
            else  retValue='冻结';
            return retValue;
        }  
});
//两个grid的定义，两个tab页各一个
Ext.define('Redm.inventory.TransferGrid',{
	extend: 'Redm.BaseGrid',
    alias : 'widget.transfergrid',
    buildColumns: function(){
        this.columns = [
                    { header: "来源货主", dataIndex: 'fromstorerkey', width: 140, sortable: true},
                    { header: "目标货主", dataIndex: 'tostorerkey', width: 140, sortable: true},
                    { header: "类型", dataIndex: 'type', width: 140, sortable: true,renderer : this.rendererTypeFunc},
                    { header: "状态", dataIndex: 'status', width: 80, sortable: true,renderer : this.rendererStatusFunc},
                    { header: "转移单号", dataIndex: 'transferKey', width: 140, sortable: true},
                    { header: "出库单号", dataIndex: 'orderKey', width: 140, sortable: true},
                    { header: "转移时间", dataIndex: 'addDate', width: 140, sortable: true,renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
					{ header: "转移人", dataIndex: 'addWho', width: 140, sortable: true,hidden:true}
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
		this.buildStore(basePath + '/inventory/doQueryTransfer.action','Transfer',20);
		this.callParent(arguments);
	},
	//主表的状态解析函数
	rendererStatusFunc:function(value)
        {
            var retValue;
            if(value=='0') retValue='新建';
			else if(value=='1') retValue='部分完成';
			else if(value=='2') retValue='完成';
            else if(value=='9') retValue='关闭';
            else  retValue=value;
            return retValue;
        },

    //主表的type解析函数
	rendererTypeFunc:function(value)
        {
            var retValue;
            if(value=='0') retValue='库存转移';
            else  retValue=value;
            return retValue;
        }
});

Ext.define('Redm.inventory.TransferDetailGrid',{
	extend: 'Redm.BaseGrid',
    alias : 'widget.transferdetailgrid',
	autoLoad:false,
	selModel: Ext.create('Ext.selection.CheckboxModel'),
    buildColumns: function(){
        this.columns = [
	            {
		            header: "行号",
		            width: 45,
		            dataIndex:'lineNumber',
					sortable: true
		        },
	            { header: "状态", dataIndex: 'status', width: 60,sortable: true,renderer:this.rendererDetailStatusFunc},
				{ header: "From 商品", dataIndex: 'fromsku', width: 100,sortable: true},
	            { header: "From 库位", dataIndex: 'fromloc', width: 100, sortable: true},
	            { header: "From 批次", dataIndex: 'fromlot', width: 100, sortable: true,editor:{xtype:'textfield',allowBlank: false}},
	            { header: "From 数量", dataIndex: 'fromQty', width: 80, sortable: true,editor:{xtype:'numberfield',minValue:0,decimalPrecision:3},renderer:Ext.util.Format.numberRenderer('0.000')},
	            { header: "To 商品", dataIndex: 'tosku', width: 100,sortable: true},
	            { header: "To 库位", dataIndex: 'toloc', width: 100, sortable: true},
	            { header: "To 批次", dataIndex: 'tolot', width: 100, sortable: true},
	            { header: "To 数量", dataIndex: 'toQty', width: 80, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
	            { header: "From"+swmslot01, dataIndex: 'fromlottable01', width: 100, sortable: true,editor:{xtype:'datefield',format:'Y-m-d H:i:s'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
	            { header: "From"+swmslot02, dataIndex: 'fromlottable02', width: 100, sortable: true,editor:{xtype:'datefield',format:'Y-m-d H:i:s'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
	            { header: "From"+swmslot03, dataIndex: 'fromlottable03', width: 100, sortable: true,editor:{xtype:'datefield',format:'Y-m-d H:i:s'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
	            { header: "From"+swmslot04, dataIndex: 'fromlottable04', width: 100, sortable: true,editor:{xtype:'textfield'}},
	            { header: "From"+swmslot05, dataIndex: 'fromlottable05', width: 100, sortable: true,editor:{xtype:'textfield'}},
	            { header: "From"+swmslot06, dataIndex: 'fromlottable06', width: 100, sortable: true,editor:{xtype:'textfield'}},
	            { header: "From"+swmslot07, dataIndex: 'fromlottable07', width: 100, sortable: true,editor:{xtype:'textfield'}},
	            { header: "From"+swmslot08, dataIndex: 'fromlottable08', width: 100, sortable: true,editor:{xtype:'textfield'}},
	            { header: "From"+swmslot09, dataIndex: 'fromlottable09', width: 100, sortable: true,editor:{xtype:'textfield'}},
	            { header: "From"+swmslot10, dataIndex: 'fromlottable10', width: 100, sortable: true,editor:{xtype:'textfield'}},
				{ header: "From"+swmslot11, dataIndex: 'fromlottable11', width: 100, sortable: true,editor:{xtype:'textfield'}},
	            { header: "From"+swmslot12, dataIndex: 'fromlottable12', width: 100, sortable: true,editor:{xtype:'textfield'}},
				{ header: "From"+swmslot13, dataIndex: 'fromlottable13', width: 100, sortable: true,editor:{xtype:'textfield'}},
				{ header: "From"+swmslot14, dataIndex: 'fromlottable14', width: 100, sortable: true,editor:{xtype:'textfield'}},
	            { header: "From"+swmslot15, dataIndex: 'fromlottable15', width: 100, sortable: true,editor:{xtype:'textfield'}},
				{ header: "From"+swmslot16, dataIndex: 'fromlottable16', width: 100, sortable: true,editor:{xtype:'textfield'}},
	            { header: "From"+swmslot17, dataIndex: 'fromlottable17', width: 100, sortable: true,editor:{xtype:'textfield'},hidden:true},
				{ header: "From"+swmslot18, dataIndex: 'fromlottable18', width: 100, sortable: true,editor:{xtype:'textfield'},hidden:true},
				{ header: "From"+swmslot19, dataIndex: 'fromlottable19', width: 100, sortable: true,editor:{xtype:'textfield'},hidden:true},
	            { header: "From"+swmslot20, dataIndex: 'fromlottable20', width: 100, sortable: true,editor:{xtype:'textfield'},hidden:true},
				
				{ header: "To"+swmslot01, dataIndex: 'tolottable01', width: 100, sortable: true,editor:{xtype:'datefield',format:'Y-m-d H:i:s'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
	            { header: "To"+swmslot02, dataIndex: 'tolottable02', width: 100, sortable: true,editor:{xtype:'datefield',format:'Y-m-d H:i:s'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
	            { header: "To"+swmslot03, dataIndex: 'tolottable03', width: 100, sortable: true,editor:{xtype:'datefield',format:'Y-m-d H:i:s'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
	            { header: "To"+swmslot04, dataIndex: 'tolottable04', width: 100, sortable: true,editor:{xtype:'textfield'}},
	            { header: "To"+swmslot05, dataIndex: 'tolottable05', width: 100, sortable: true,editor:{xtype:'textfield'}},
	            { header: "To"+swmslot06, dataIndex: 'tolottable06', width: 100, sortable: true,editor:{xtype:'textfield'}},
	            { header: "To"+swmslot07, dataIndex: 'tolottable07', width: 100, sortable: true,editor:{xtype:'textfield'}},
	            { header: "To"+swmslot08, dataIndex: 'tolottable08', width: 100, sortable: true,editor:{xtype:'textfield'}},
	            { header: "To"+swmslot09, dataIndex: 'tolottable09', width: 100, sortable: true,editor:{xtype:'textfield'}},
	            { header: "To"+swmslot10, dataIndex: 'tolottable10', width: 100, sortable: true,editor:{xtype:'textfield'}},
				{ header: "To"+swmslot11, dataIndex: 'tolottable11', width: 100, sortable: true,editor:{xtype:'textfield'}},
	            { header: "To"+swmslot12, dataIndex: 'tolottable12', width: 100, sortable: true,editor:{xtype:'textfield'}},
	            { header: "To"+swmslot13, dataIndex: 'tolottable13', width: 100, sortable: true,editor:{xtype:'textfield'}},
				{ header: "To"+swmslot14, dataIndex: 'tolottable14', width: 100, sortable: true,editor:{xtype:'textfield'}},
	            { header: "To"+swmslot15, dataIndex: 'tolottable15', width: 100, sortable: true,editor:{xtype:'textfield'}},
				{ header: "To"+swmslot16, dataIndex: 'tolottable16', width: 100, sortable: true,editor:{xtype:'textfield'}},
	            { header: "To"+swmslot17, dataIndex: 'tolottable17', width: 100, sortable: true,editor:{xtype:'textfield'},hidden:true},
	            { header: "To"+swmslot18, dataIndex: 'tolottable18', width: 100, sortable: true,editor:{xtype:'textfield'},hidden:true},
				{ header: "To"+swmslot19, dataIndex: 'tolottable19', width: 100, sortable: true,editor:{xtype:'textfield'},hidden:true},
	            { header: "To"+swmslot20, dataIndex: 'tolottable20', width: 100, sortable: true,editor:{xtype:'textfield'},hidden:true}	
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
        //方法待补充
		this.buildStore(basePath + '/inventory/doQueryTransferDetail.action','TransferDetail',20);
		this.callParent(arguments);
	},
	//明细表的状态解析函数
    rendererDetailStatusFunc:function(value)
        {
            var retValue;
            if(value=='0') retValue='新建';
            else if(value=='9') retValue='完成';
            else  retValue=value;
            return retValue;
        }
    
});

Ext.define('Redm.inventory.TransferManager',{
	extend: 'Ext.tab.Panel',
    alias : 'widget.transfermanager',    //主panel，继承自 Ext.tab.Panel
    title:'库存转移',
    layout: 'border',
    tabPosition: 'bottom',
    initComponent: function(){
    	var me = this;
    	this.items = [this.createCntPanel(),this.createTransferDetailPanel()];
        this.callParent(arguments);
    },
	
	//设置Transfer表关键字段只读属性（manner：true:只读，false:可以编辑）
    //关键字段包括货主，货主名称。新建时可以编辑，其他任何情况下只读
    onSetTransferKeyReadOnly: function(manner){
        var me=this;
        me.pt2topform.getForm().findField('fromstorerkey').setReadOnly(manner); 
		me.pt2topform.getForm().findField('tostorerkey').setReadOnly(manner); 
		me.pt2topform.getForm().findField('type').setReadOnly(manner);
        me.pt2topform.getForm().findField('addDate').setReadOnly(manner);
    },
    
    //设置明细表字段一般字段只读属性（manner：true:只读，false:可以编辑）
    //行号：配置上只读，sku，新建时可以编辑，其他任何情况下只读
    onSetDetailReadOnly: function(manner){
        var me=this;
        
        me.pt2pn1form.getForm().findField('fromlot').setReadOnly(manner);
//        me.pt2pn1form.getForm().findField('fromQty').setReadOnly(manner);
		me.pt2pn1form.getForm().findField('toQty').setReadOnly(manner);
		
/*		me.pt2pn2form.getForm().findField('fromlottable01').setReadOnly(manner);
        me.pt2pn2form.getForm().findField('fromlottable02').setReadOnly(manner);
        me.pt2pn2form.getForm().findField('fromlottable03').setReadOnly(manner);
        me.pt2pn2form.getForm().findField('fromlottable04').setReadOnly(manner);    
        me.pt2pn2form.getForm().findField('fromlottable05').setReadOnly(manner);
		me.pt2pn2form.getForm().findField('fromlottable06').setReadOnly(manner);
        me.pt2pn2form.getForm().findField('fromlottable07').setReadOnly(manner);
        me.pt2pn2form.getForm().findField('fromlottable08').setReadOnly(manner);
        me.pt2pn2form.getForm().findField('fromlottable09').setReadOnly(manner);    
        me.pt2pn2form.getForm().findField('fromlottable10').setReadOnly(manner);
		me.pt2pn2form.getForm().findField('fromlottable11').setReadOnly(manner);    
        me.pt2pn2form.getForm().findField('fromlottable12').setReadOnly(manner);
        me.pt2pn2form.getForm().findField('fromlottable13').setReadOnly(manner);
		me.pt2pn2form.getForm().findField('fromlottable14').setReadOnly(manner);    
        me.pt2pn2form.getForm().findField('fromlottable15').setReadOnly(manner);*/
		
		me.pt2pn2form.getForm().findField('tolottable01').setReadOnly(manner);
        me.pt2pn2form.getForm().findField('tolottable02').setReadOnly(manner);
        me.pt2pn2form.getForm().findField('tolottable03').setReadOnly(manner);
        me.pt2pn2form.getForm().findField('tolottable04').setReadOnly(manner);    
        me.pt2pn2form.getForm().findField('tolottable05').setReadOnly(manner);
		me.pt2pn2form.getForm().findField('tolottable06').setReadOnly(manner);
        me.pt2pn2form.getForm().findField('tolottable07').setReadOnly(manner);
        me.pt2pn2form.getForm().findField('tolottable08').setReadOnly(manner);
        me.pt2pn2form.getForm().findField('tolottable09').setReadOnly(manner);    
        me.pt2pn2form.getForm().findField('tolottable10').setReadOnly(manner);
		me.pt2pn2form.getForm().findField('tolottable11').setReadOnly(manner);    
        me.pt2pn2form.getForm().findField('tolottable12').setReadOnly(manner);
        me.pt2pn2form.getForm().findField('tolottable13').setReadOnly(manner);
		me.pt2pn2form.getForm().findField('tolottable14').setReadOnly(manner);    
        me.pt2pn2form.getForm().findField('tolottable15').setReadOnly(manner);
		me.pt2pn2form.getForm().findField('tolottable16').setReadOnly(manner);    
        me.pt2pn2form.getForm().findField('tolottable17').setReadOnly(manner);
        me.pt2pn2form.getForm().findField('tolottable18').setReadOnly(manner);
		me.pt2pn2form.getForm().findField('tolottable19').setReadOnly(manner);    
        me.pt2pn2form.getForm().findField('tolottable20').setReadOnly(manner);
		if(true==manner){
			Ext.getCmp('saveBtn').disable(); 
		}else{
			Ext.getCmp('saveBtn').enable();
		}
    },
    
    //设置明细表关键字段只读属性（manner：true:只读，false:可以编辑）
    //关键字段包括 sku，中文名称，英文名称，别名。 新建时可以编辑，其他任何情况下只读
    onSetDetailKeyReadOnly: function(manner){
        var me=this;
//        me.pt2pn1form.getForm().findField('fromsku').setReadOnly(manner);
		me.pt2pn1form.getForm().findField('tosku').setReadOnly(manner);
    },
	
	
    onSelect: function(){
    	this.transfergrid.getStore().load();
    },
    onGoDelete: function(){
    	var me = this;
    	var records = me.transfergrid.getSelectionModel().getSelection(); 
    	if(records == ""){
    		MessageBox.error('错误提示','请选择删除的数据！');
    		return;
    	}else{
    		var record = records[0].getData();
    		Ext.MessageBox.confirm('询问提示', '确定要删除所选信息吗？', 
				function(btn){
					if(btn == 'yes'){
						Ext.Ajax.request({
						    url: basePath + '/inventory/deletePutawayStrategy.action',
						    params: {
						    	putawayStrategyKey: record.putawayStrategyKey
						    },
						    success: function(response){
						        var text = Ext.decode(response.responseText);
						        var success = text.success;
						        MessageBox.show(success, text.json.msg);
						        me.transfergrid.getStore().load();
						        me.detailgrid.getStore().load();
						    }
						});
					}
				}
			); 
    	}
    },
    
    onReset: function(){
    	this.pt1topform.getForm().reset();
    },
    onGo: function(){
    	this.setActiveTab(1);
    },
   
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
						    url: basePath + '/inventory/deletePutawayStrategyDetail.action',
						    params: {
						    	id: record.id
						    },
						    success: function(response){
						        var text = Ext.decode(response.responseText);
						        var success = text.success;
						        MessageBox.show(success, text.json.msg);
						        me.transfergrid.getStore().load();
						        me.detailgrid.getStore().load();
						    }
						});
					}
				}
			); 
    	}
    },
	
    createContextMenu:function(e){

    },
    createContextChildMenu:function(e){

    },
    
	//保存主表及明细表
	saveTransfer: function(){
		var me = this;
    	var pt2top = this.pt2topform.getForm();
    	var pt2pn1 = this.pt2pn1form.getForm();
		var pt2pn2 = this.pt2pn2form.getForm();

    	var pt2topValues = pt2top.getValues();
    	var pt2pn1Values = pt2pn1.getValues();
		var pt2pn2Values = pt2pn2.getValues();
    	if(!(pt2top.isValid())||!(pt2pn1.isValid()) ) return;
    	Ext.Ajax.request({
		    url: basePath + '/inventory/doSaveTransfer.action',
		    params: {
				//主表记录
		    	id: pt2topValues.id,
				transferKey:pt2topValues.transferKey,
				type:pt2topValues.type,
				status:pt2topValues.status,
				addDate:pt2topValues.addDate,
				addWho:pt2topValues.addWho,
				tostorerkey:pt2topValues.tostorerkey,
				fromstorerkey:pt2topValues.fromstorerkey,
				generateHocharges:pt2topValues.generateHocharges,
				generateHicharges:pt2topValues.generateHicharges,

		        //明细表记录
                detailId:pt2pn1Values.id,
                lineNumber:pt2pn1Values.lineNumber,
                fromsku:pt2pn1Values.fromsku,
                fromloc:pt2pn1Values.fromloc,
                fromlot:pt2pn1Values.fromlot,
                fromPackkey:pt2pn1Values.fromPackkey,
                fromuom:pt2pn1Values.fromuom,
                fromQty:pt2pn1Values.fromQty,
				tosku:pt2pn1Values.tosku,
				toloc:pt2pn1Values.toloc,
                toPackkey:pt2pn1Values.toPackkey,
				touom:pt2pn1Values.touom,
				toQty:pt2pn1Values.toQty,
				dstatus: pt2pn1Values.status,   //不允许手工修改
                fromlottable01:pt2pn2Values.fromlottable01,
				fromlottable02:pt2pn2Values.fromlottable02,
				fromlottable03:pt2pn2Values.fromlottable03,
				fromlottable04:pt2pn2Values.fromlottable04,
				fromlottable05:pt2pn2Values.fromlottable05,
				fromlottable06:pt2pn2Values.fromlottable06,
				fromlottable07:pt2pn2Values.fromlottable07,
				fromlottable08:pt2pn2Values.fromlottable08,
				fromlottable09:pt2pn2Values.fromlottable09,
				fromlottable10:pt2pn2Values.fromlottable10,
				fromlottable11:pt2pn2Values.fromlottable11,
				fromlottable12:pt2pn2Values.fromlottable12,
				fromlottable13:pt2pn2Values.fromlottable13,
				fromlottable14:pt2pn2Values.fromlottable14,
				fromlottable15:pt2pn2Values.fromlottable15,
				fromlottable16:pt2pn2Values.fromlottable16,
				fromlottable17:pt2pn2Values.fromlottable17,
				fromlottable18:pt2pn2Values.fromlottable18,
				fromlottable19:pt2pn2Values.fromlottable19,
				fromlottable20:pt2pn2Values.fromlottable20,
				
				tolottable01:pt2pn2Values.tolottable01,
				tolottable02:pt2pn2Values.tolottable02,
				tolottable03:pt2pn2Values.tolottable03,
				tolottable04:pt2pn2Values.tolottable04,
				tolottable05:pt2pn2Values.tolottable05,
				tolottable06:pt2pn2Values.tolottable06,
				tolottable07:pt2pn2Values.tolottable07,
				tolottable08:pt2pn2Values.tolottable08,
				tolottable09:pt2pn2Values.tolottable09,
				tolottable10:pt2pn2Values.tolottable10,
				tolottable11:pt2pn2Values.tolottable11,
				tolottable12:pt2pn2Values.tolottable12,
				tolottable13:pt2pn2Values.tolottable13,
				tolottable14:pt2pn2Values.tolottable14,
				tolottable15:pt2pn2Values.tolottable15,
				tolottable16:pt2pn2Values.tolottable16,
				tolottable17:pt2pn2Values.tolottable17,
				tolottable18:pt2pn2Values.tolottable18,
				tolottable19:pt2pn2Values.tolottable19,
				tolottable20:pt2pn2Values.tolottable20
		    },
		    success: function(response){
		        var text = Ext.decode(response.responseText);
		        var success = text.success;
		        MessageBox.show(success, text.json.msg);
		        
				if(true==success)
				{
					me.pt2pn1form.getForm().reset();   //清空后状态更新问题就不存在了
					me.pt2pn2form.getForm().reset();
					me.transfergrid.getStore().load();
					me.detailgrid.getStore().load();
					//转移完成时，更新主表状态，并 根据主表状态判断是否需要设置主表的字段为只读
					Ext.Ajax.request({
						url: basePath + '/inventory/doQueryTransferStatus.action',
						params: {
							transferKey:pt2topValues.transferKey
						},
						success: function(response){
							var text = Ext.decode(response.responseText);
							var success = text.success;
							if(0 != text.json.data.length)   //transferKey唯一，应该只有一条记录
							{
								//更新主表状态
								var statusValue=text.json.data[0].status;
								
								me.pt2topform.getForm().findField('status').setValue(statusValue)
								if('0'!=statusValue)
								{      
									me.onSetTransferKeyReadOnly(true); //根据状态设置是否可以编辑
								}
							}
						}
					});
				}
		    }
		});
	},
	
	//第一个tab页面的创建按钮，包括跳转页面，和清空两个form
	onGoCreate: function(){
    	this.setActiveTab(1);
		
		//新建主表记录，主表，明细表所有字段取消只读
        this.onSetTransferKeyReadOnly(false);
        this.onSetDetailReadOnly(false);
        this.onSetDetailKeyReadOnly(false);
		
		//待添加跳转页面后的其他操作内容
		this.pt2topform.getForm().reset();
		this.pt2pn1form.getForm().reset();
		this.pt2pn2form.getForm().reset();
		
		
        //计划在创建时自动加载一个数字
        //规则目前写死，后续考虑修改
        var nameCode='TRANSNUM';
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
                        this.pt2topform.getForm().findField('transferKey').setValue(value);   
                        this.pt2pn1form.getForm().findField('lineNumber').setValue('1');     //创建movekey时，设置行号为1
                    }
                },scope:this
            }
	    });   
		this.detailgrid.getStore().removeAll();    //清空grid
    },
	
	//第二个tab页的添加明细按钮
    onAddDetail: function(){
    	var me = this;
    	me.pt2pn1form.getForm().reset();
		me.pt2pn2form.getForm().reset();
		
		//新建明细表记录，所有字段取消只读
        this.onSetDetailReadOnly(false);
        this.onSetDetailKeyReadOnly(false);
		
		//可以自动创建行号
		this.lineNoStore = Ext.create('Ext.data.Store', {
	        remoteSort: true,
            autoLoad: true,
            fields: [
                        {name:'id'},
                        {name:'transferKey'},
                        {name:'lineNumber'}
            ],
	        proxy: {
	            type: 'ajax',
                //添加明细时，根据adjustmentKey查找。如果找不到，设置为1
	            url: basePath + '/inventory/doCreateTransferDetailLineNumber.action?transferKey='+this.pt2topform.getForm().findField('transferKey').getValue(),
	            reader: {type: 'json',root: 'json.data',totalProperty: 'json.totalCount'},
	            actionMethods: { read: 'POST' },
	            simpleSortMode: true
	        },
            //加载数据到store，通过监听事件来设置
            listeners: {
                'load':function(sto,recs){
//                    console.log(sto.totalCount);
                  if(0!=sto.totalCount)
                    {
                        var value=sto.getAt(0).get('lineNumber');
                        this.pt2pn1form.getForm().findField('lineNumber').setValue(value); 
                    }
                    else
                    {
                        this.pt2pn1form.getForm().findField('lineNumber').setValue('1'); 
                    }
                },scope:this
            }
	    });
    },
	
	//删除明细表多条记录的方法
	onMultiDelete: function(){
		var me = this;
		var records = me.detailgrid.getSelectionModel().getSelection();
		var record = me.pt2topform.getForm().getFieldValues(); 
		var transferKey=record.transferKey;
		if(records == ""){
			MessageBox.error("错误提示","请选择要操作的数据！");
		 	return;
		} 
		var ids = []; 
		Ext.Array.each(records, function(name, index, countriesItSelf) {
			ids.push(name.getData().id);
		});

        Ext.MessageBox.confirm('询问提示', '确定要删除吗？', 
            function(btn){
                if(btn == 'yes'){    
                    Ext.Ajax.request({
                        url: basePath + '/inventory/doMultiDeleteTransferDetail.action',
                        params: {
                            ids: ids
                        },
                        success: function(response){
                            var text = Ext.decode(response.responseText);
                            var success = text.success;
                            MessageBox.show(success, text.json.msg);
                            
							if(true==success)
                            {
								me.pt2pn1form.getForm().reset();   //清空后状态更新问题就不存在了
								me.pt2pn2form.getForm().reset();
								me.detailgrid.getStore().load();
								me.transfergrid.getStore().load();
								//移库完成时，更新主表状态，并 根据主表状态判断是否需要设置主表的字段为只读
								Ext.Ajax.request({
									url: basePath + '/inventory/doQueryTransferStatus.action',
									params: {
										transferKey:transferKey
									},
									success: function(response){
										var text = Ext.decode(response.responseText);
										var success = text.success;
										if(0 != text.json.data.length)   //moveKey唯一，应该只有一条记录
										{
											//更新主表状态
											var statusValue=text.json.data[0].status;
											me.pt2topform.getForm().findField('status').setValue(statusValue)
											if('0'!=statusValue)
											{      
												me.onSetTransferKeyReadOnly(true); //根据状态设置是否可以编辑
											}
										}
									}
								});
                            }
                        }
                    });
                }
            }
        );  
        
    },
	
	//从form获取主表参数，删除主表和相关明细表记录的方法
	deleteTransferAndDetal: function(){
		var me = this;
    	var record = me.pt2topform.getForm().getFieldValues(); 
    	if(record.transferKey == ""){
    		MessageBox.error('错误提示','请选择操作的数据！');
    		return;
    	}
        else
        {
        	Ext.MessageBox.confirm('询问提示', '确定要删除吗？', 
    			function(btn){
    				if(btn == 'yes'){    
                        Ext.Ajax.request({
                            url: basePath + '/inventory/doDeleteTransfer.action',
                            params: {
                                transferKey: record.transferKey
                            },
                            success: function(response){
                                var text = Ext.decode(response.responseText);
                                var success = text.success;
                                MessageBox.show(success, text.json.msg);
                                me.pt2topform.getForm().reset();
                                me.pt2pn1form.getForm().reset();
                                me.pt2pn2form.getForm().reset();
                                me.transfergrid.getStore().load();
								me.detailgrid.getStore().load();
                            }
                        });
    				}
                }
			);  
    	}
    },
    //从so提取转移数据

	doCreateDataFromSO: function(){
		var me = this;
    	var record = me.pt2topform.getForm().getFieldValues(); 
    	if((record.fromstorerkey == "")||(record.tostorerkey == "")||(record.orderKey == ""))
        {
    		MessageBox.error('错误提示','请输入货主和SO单号!');
    		return;
    	}
        else
        {
            Ext.Ajax.request({
                url: basePath + '/inventory/doCreateTransferDataFromSO.action',
                params: {
                    transferKey: record.transferKey,
                    type: record.type,
                    status: record.status,
                    fromstorerkey: record.fromstorerkey,
                    tostorerkey: record.tostorerkey,
                    orderKey: record.orderKey
                },
                success: function(response){
                    var text = Ext.decode(response.responseText);
                    var success = text.success;
                    MessageBox.show(success, text.json.msg);
//                    me.pt2topform.getForm().reset();
                    me.pt2pn1form.getForm().reset();
                    me.pt2pn2form.getForm().reset();
                    me.transfergrid.getStore().load();
                    me.detailgrid.getStore().load();
                }
            });
    	}
    },
    
    
    
    
	//从grid获取主表参数，删除主表和相关明细表记录的方法
	onDelete: function(){
		var me = this;
		var records = this.transfergrid.getSelectionModel().getSelection(); 
		if(records == ""){
			MessageBox.error('错误提示','请选择操作的数据！');
			return;
		}
		var data = records[0].getData();
        
        Ext.MessageBox.confirm('询问提示', '确定要删除吗？', 
            function(btn){
                if(btn == 'yes'){    
                    Ext.Ajax.request({
                        url: basePath + '/inventory/doDeleteTransfer.action',
                        params: {
                            transferKey: data.transferKey
                        },
                        success: function(response){
                            var text = Ext.decode(response.responseText);
                            var success = text.success;
                            MessageBox.show(success, text.json.msg);
                            me.transfergrid.getStore().load();
							me.detailgrid.getStore().load();
                        }
                    });
                }
            }
        );
	},
	
	//从grid获取主表参数，整单执行按钮方法
	onTransfer: function(){
		var me = this;
		var records = this.transfergrid.getSelectionModel().getSelection(); 

		if(records == ""){
			MessageBox.error('错误提示','请选择操作的数据！');
			return;
		}
        //转移未结束前禁用按钮
        Ext.getCmp('allTraFst').disable();
        Ext.getCmp('allTraSnd').disable();
        Ext.getCmp('detailTra').disable();            
		var data = records[0].getData();
		
		Ext.MessageBox.confirm('询问提示', '确定要转移吗？', 
            function(btn){
                if(btn == 'yes'){  
					var mask = new Ext.LoadMask(me.getEl(), { 
						msg : 'please wait...' 
					});
					mask.show(); 
                    Ext.Ajax.request({
                        url: basePath + '/inventory/doExecuteTransfer.action',
                        params: {
                            transferKey: data.transferKey,
							fromstorerkey:data.fromstorerkey,
							tostorerkey:data.tostorerkey
                        },
                        success: function(response){
                            var text = Ext.decode(response.responseText);
                            var success = text.success;
							mask.hide(); 
                            MessageBox.show(success, text.json.msg);
                            me.transfergrid.getStore().load();
						    me.detailgrid.getStore().load();
                        },
						timeout: 100000000
                    });
                }
            }
        );
        //转移完成后使能按钮
        Ext.getCmp('allTraFst').enable();
        Ext.getCmp('allTraSnd').enable();
        Ext.getCmp('detailTra').enable();        
	},
	//从form获取主表参数，整单执行按钮方法
	onTransferAndDetal: function(){
		var me = this;
    	var record = me.pt2topform.getForm().getFieldValues(); 

    	if(record.transferKey == ""){
    		MessageBox.error('错误提示','请选择操作的数据！');
    		return;
    	}

        //转移未结束前禁用按钮
        Ext.getCmp('allTraFst').disable();
        Ext.getCmp('allTraSnd').disable();
        Ext.getCmp('detailTra').disable();        
        
		Ext.MessageBox.confirm('询问提示', '确定要转移吗？', 
            function(btn){
                if(btn == 'yes'){
					var mask = new Ext.LoadMask(me.getEl(), { 
						msg : 'please wait...' 
					});
					mask.show(); 
                    Ext.Ajax.request({
                        url: basePath + '/inventory/doExecuteTransfer.action',
                        params: {
                            transferKey: record.transferKey,
							fromstorerkey:record.fromstorerkey,
							tostorerkey:record.tostorerkey
                        },
                        success: function(response){
                            var text = Ext.decode(response.responseText);
                            var success = text.success;
							mask.hide();  
                            MessageBox.show(success, text.json.msg);
                            
							if(true==success)
							{
								//主表对应的form不能清空，需要单独更新状态
								me.pt2pn1form.getForm().reset();   //清空后状态更新问题就不存在了
								me.pt2pn2form.getForm().reset(); 
								me.transfergrid.getStore().load();
								me.detailgrid.getStore().load();

								//整单转移完成时，更新主表状态，并 根据主表状态判断是否需要设置主表的字段为只读
								Ext.Ajax.request({
									url: basePath + '/inventory/doQueryTransferStatus.action',
									params: {
										transferKey: record.transferKey
									},
									success: function(response){
										var text = Ext.decode(response.responseText);
										var success = text.success;
										if(0 != text.json.data.length)   //transferKey唯一，应该只有一条记录
										{
											//更新主表状态
											var statusValue=text.json.data[0].status;
											me.pt2topform.getForm().findField('status').setValue(statusValue)
											if('0'!=statusValue)
											{
												me.onSetTransferKeyReadOnly(true); //根据状态设置是否可以编辑
											}
										}
									},
									timeout: 100000000
								});
							}
                        }
                    });
                }
            }
        );
        //转移完成后使能按钮
        Ext.getCmp('allTraFst').enable();
        Ext.getCmp('allTraSnd').enable();
        Ext.getCmp('detailTra').enable();        
	},
	//转移明细表多条记录的方法
	onMultiTransfer: function(){
		var me = this;
		var records = me.detailgrid.getSelectionModel().getSelection();
		var record = me.pt2topform.getForm().getFieldValues(); 

		if(records == ""){
			MessageBox.error("错误提示","请选择要操作的数据！");
		 	return;
		} 

        //转移未结束前禁用按钮
        Ext.getCmp('allTraFst').disable();
        Ext.getCmp('allTraSnd').disable();
        Ext.getCmp('detailTra').disable();        

		var ids = []; 
		Ext.Array.each(records, function(name, index, countriesItSelf) {
			ids.push(name.getData().id);
		});

        Ext.MessageBox.confirm('询问提示', '确定要转移吗？', 
            function(btn){
                if(btn == 'yes'){ 
					var mask = new Ext.LoadMask(me.getEl(), { 
						msg : 'please wait...' 
					});
					mask.show(); 
                    Ext.Ajax.request({
                        url: basePath + '/inventory/doExecuteTransferDetail.action',
                        params: {
                            ids: ids,
							fromstorerkey:record.fromstorerkey,
							tostorerkey:record.tostorerkey
                        },
                        success: function(response){
                            var text = Ext.decode(response.responseText);
                            var success = text.success;
							mask.hide(); 
                            MessageBox.show(success, text.json.msg);
                            
							//转移完成时，需要设置这几个字段为只读
							if(true==success)
							{
								me.pt2pn1form.getForm().reset();   //清空后状态更新问题就不存在了
								me.pt2pn2form.getForm().reset();
								me.transfergrid.getStore().load();
								me.detailgrid.getStore().load();
								//转移完成时，更新主表状态，并 根据主表状态判断是否需要设置主表的字段为只读
								Ext.Ajax.request({
									url: basePath + '/inventory/doQueryTransferStatus.action',
									params: {
										transferKey: record.transferKey
									},
									success: function(response){
										var text = Ext.decode(response.responseText);
										var success = text.success;
										if(0 != text.json.data.length)   //transferKey唯一，应该只有一条记录
										{
											//更新主表状态
											var statusValue=text.json.data[0].status;
											me.pt2topform.getForm().findField('status').setValue(statusValue)
											if('0'!=statusValue)
											{      
												me.onSetTransferKeyReadOnly(true); //根据状态设置是否可以编辑
											}
										}
									},
									timeout: 100000000
								});
							}
                        }
                    });
                }
            }
        );  
        //转移完成后使能按钮
        Ext.getCmp('allTraFst').enable();
        Ext.getCmp('allTraSnd').enable();
        Ext.getCmp('detailTra').enable();        
	},
	
    //以上是各种方法，下面开始创建页面
	
	
    createCntPanel: function(){    //创建第一个tab页，继承自 Ext.panel.Panel
    	var me = this;
    	this.cntpanel = Ext.create('Ext.panel.Panel',{
    		layout: 'border',
    		border: false,
    		title: '基本',
    		items:[this.createTransferGrid(),this.createTopPanel()]
    	});
    	return this.cntpanel;
    },
    
	createTopPanel: function(){  //创建第一页的TOP panel   继承自 Ext.panel.Panel 
		var me = this;
		this.toppanel = Ext.create('Ext.panel.Panel',{
			region: 'north',

			border:false,
			height: 120,
			layout: 'border',
			items:[me.createPt1TopForm(),me.createPt1BtnPanel()]     //创建topform 和 btn panel
		});
		return this.toppanel;
	},
	
	createPt1TopForm: function(){
		var me = this;
		this.pt1topform = Ext.create('Ext.form.Panel',{   //创建Top form  继承自 Ext.form.Panel 
			region: 'north',
			frame: true,
			height: 80,
			layout: 'vbox',   //整体上市vbox，而每个container是hbox，就可以做成多行的形式。用anchor也达到目的了
			defaults: {
				xtype: 'textfield',
				labelWidth: 80,
				margin: '5 0 0 5'
			},

        	items:[
                    {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            defaults: {
                                  margin: '3 2 3 10'
                            },
                            items: [

                                {
                                    fieldLabel: '来源货主',
                                    name:'fromstorerkey',
                                    xtype:'textfield',
									labelWidth : 60,
									width:180,
									listeners:{
										blur:function(txt){
											txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
										}
									}
                                },
                                {
                                    xtype:'textfield',
                                    fieldLabel: '目标货主',
                                    name:'tostorerkey',
                                    labelWidth : 60,
                                    width:180,
									listeners:{
										blur:function(txt){
											txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
										}
									}
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'transferKey',
                                    fieldLabel: '转移单号',
                                    labelWidth : 80,
                                    width:180
                                },
                                {
                                    xtype:'datefield',
                                    name: 'effectiveDateStr',
                                    fieldLabel: '转移时间',
                                    format:'Y-m-d H:i:s',
                                    labelWidth : 80,
                                    width:210
                                },
                                {
                                    xtype:'datefield',
                                    name: 'effectiveDateEnd',
                                    format:'Y-m-d H:i:s',
                                    width:130
                                }

                            ]
                    },
                    {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            defaults: {
                                margin: '3 2 3 10',
                                xtype: 'textfield'
                            },
                            items: [
                                {
                                    name: 'type',
                                    //xtype:'textfield',
                                    xtype:'codecombo',
                                    codeType:'TRTYPE',
                                    fieldLabel: '类型',
                                    labelWidth : 60,
                                    width:180
                                },
								{
                                     name: 'status',
                                    xtype:'combobox',
                                    fieldLabel: '状态',
                                    displayField: 'text',
                                    valueField: 'value',
                                    store:Ext.create('Ext.data.Store', {
                                         fields: ['text','value'],
                                         data: [{text:'新建',value:'0'},{text:'部分完成',value:'1'},{text:'完成',value:'2'},{text:'关闭',value:'9'}]
                                    }),
                                    forceSelection: true,
                                    labelWidth : 60,
                                    width:180
                                },
                                {
                                    name: 'orderKey',
                                    xtype:'textfield',
                                    fieldLabel: '出库单号',
                                    labelWidth : 80,
                                    width:180
                                }                                
                            ]
                            
                    }                   

            ]
            
            
	    })//end for Ext.create
	    
		return this.pt1topform;
	},   //end  createTopForm
	
	createPt1BtnPanel: function(){
    	var me = this;
    	this.pt1btnpanel = Ext.create('Ext.form.Panel',{  //  创建btn panel ，继承自 Ext.form.Panel
    		region: 'center',
    		frame: true,
    		defaults: {
    			xtype: 'button',
    			margin: '5 0 0 5'
    		},
            items:[
                {
                    itemId: 'createToolbar',
                	iconCls: 'icon-create',
                    text: '创建',
					handler: me.onGoCreate, 
                    scope: this
                },
	            {
	            	itemId:'deleteToolbar',
                	iconCls: 'icon-delete',
	                text: '删除',
					handler: me.onDelete,
	                scope: this
	            },
				 {
                    text : "查询",
                    iconCls: 'icon-search',
                    scope : this,
                    handler: this.onSelect

                },
                {
                    text : "重置",
                    iconCls: 'icon-reset',
                    scope : this,
                    handler:  this.onReset

                },
				{
                    text : "整单执行",
                    scope : this,
                    id:'allTraFst',
                    handler:  this.onTransfer

                }					
            ]

    	});
    	return this.pt1btnpanel;
    },
    
	createTransferGrid: function(){     // 创建第一个tab页的grid
    	var me = this;
    	this.transfergrid = Ext.create('widget.transfergrid',{
    		region: 'center',
    		listeners: {
    			itemdblclick: function(grid,record){
    				me.setActiveTab(1);
    				me.pt2topform.getForm().loadRecord(record);
					me.pt2pn1form.getForm().reset();
					me.detailgrid.getStore().load();
					//关键字段设置只读
					me.onSetTransferKeyReadOnly(true);	
    			}
    		}
    	});
    	this.transfergrid.getStore().on('beforeload',function(){    //启动时查询，加载的内容
    		var params = this.transfergrid.getStore().getProxy().extraParams;
			var record = me.pt1topform.getForm().getValues();
			
			var fromstorerkey = record.fromstorerkey
    		var tostorerkey = record.tostorerkey;  
    		var status = record.status;  
    		var transferKey = record.transferKey;  
			var type = record.type;  
			var orderKey = record.orderKey;  
			var effectiveDateStr= record.effectiveDateStr; 
			var effectiveDateEnd= record.effectiveDateEnd; 	
			
			delete params.fromstorerkey;
			delete params.tostorerkey;
			delete params.status;
			delete params.transferKey;
			delete params.type;
			delete params.orderKey;
			delete params.effectiveDateStr;
			delete params.effectiveDateEnd;

			if(fromstorerkey) params.fromstorerkey = fromstorerkey;
			if(tostorerkey) params.tostorerkey = tostorerkey;
			if(status) params.status = status;
			if(transferKey) params.transferKey = transferKey;
			if(type) params.type = type;
			if(orderKey) params.orderKey = orderKey;
			if(effectiveDateStr) params.effectiveDateStr = effectiveDateStr;
			if(effectiveDateEnd) params.effectiveDateEnd = effectiveDateEnd;
			
    	},this);
    	return this.transfergrid;
    },
    
	
	// 以上第一个tab页创建好了，下边是创建第二个tab页
    
    createTransferDetailPanel: function(){
    	var me = this;
    	this.transferdetail = Ext.create('Ext.panel.Panel',{    //创建第二个tab页，继承自  Ext.panel.Panel
    		layout: 'border',
    		border: false,
    		title: '详细',
    		items:[this.createPt2Pn1Panel(),this.createPt2TopPanel()]  //只有一个tab页，直接用createBasicRuleForm()
    	});
    	return this.transferdetail;
    },
    
	//顶部面板，包括一个form和一个button面板
    createPt2TopPanel: function(){
     	this.pt2toppanel = Ext.create('Ext.panel.Panel',{
    		region: 'north',
    		layout: 'border',
    		border: false,
    		height: 120,
    		items:[this.createPt2TopForm(),this.createPt2TopBtnPanel()]
    	});
    	return this.pt2toppanel;
    },
    
	createPt2TopForm: function(){
		var me = this;
		this.pt2topform = Ext.create('Ext.form.Panel',{   //创建Top form  继承自 Ext.form.Panel 
			region: 'north',
			frame: true,
			height: 80,
			layout: 'vbox',   //整体上市vbox，而每个container是hbox，就可以做成多行的形式。用anchor也达到目的了
			defaults: {
				xtype: 'textfield',
				labelWidth: 80,
				margin: '5 0 0 5'
			},

        	items:[  //这里要调整布局方式！！！！！！！！！
                    {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            defaults: {
                                  margin: '3 2 3 10'
                            },
                            items: [
                                {
                                    xtype:'textfield',
                                    name: 'transferKey',
                                    fieldLabel: '转移单号',
                                    labelWidth: 60,
                                    allowBlank:false,
                                    readOnly:true
                                },
                                {
                                    name: 'type',
                                    //xtype:'textfield',
                                    xtype:'codecombo',
                                    codeType:'TRTYPE',
                                    fieldLabel: '类型',
                                    labelWidth: 60,
                                    value:'0'

                                    },
                                {
									name: 'status',
									xtype:'combobox',
									fieldLabel: '状态',
									displayField: 'text',
									valueField: 'value',
									store:Ext.create('Ext.data.Store', 
									{
										fields: ['text','value'],
										data: [{text:'新建',value:'0'},{text:'部分完成',value:'1'},{text:'完成',value:'2'},{text:'关闭',value:'9'}]
									}
									),
									value: '0',
									labelWidth : 40,
									readOnly: true    //true为只读，不能选择，没有下拉框。false为可以选择的，有下拉框
								},
                                /*{
                                    xtype:'datefield',
                                    format:'Y-m-d H:i',
                                    name: 'effectiveDate',
                                    fieldLabel: '转移时间',
                                    value:new Date()
                                },*/
								{
                                    xtype:'datefield',
                                    format:'Y-m-d H:i:s',
                                    name: 'addDate',
                                    fieldLabel: '转移时间',
                                    value:new Date()
                                },
								{
									xtype:'textfield',
									name: 'addWho',
									fieldLabel: '转移人',
									labelWidth : 60,
									hidden:true
								}
                            ]
                    },
					{
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            defaults: {
                                  margin: '3 2 3 10'
                            },
                            items: [
                                {
                                    xtype:'textfield',
                                    name:'fromstorerkey',
                                    fieldLabel:'来源货主',
                                    labelWidth: 60,
                                    allowBlank: false,
									listeners:{
                                        blur: function(txt){
                                            //输入参数，鼠标离开后见检查该货主是否存在
											var storerKeyValue= Ext.util.Format.uppercase(txt.getValue());
											txt.setValue(storerKeyValue);
                                            me.pt2topform.getForm().findField('tostorerkey').setValue(storerKeyValue);
                                            lotValue=me.pt2pn1form.getForm().findField('fromlot').getValue();
                                            locValue=me.pt2pn1form.getForm().findField('fromloc').getValue();
                                            skuValue=me.pt2pn1form.getForm().findField('fromsku').getValue();
                                            Ext.Ajax.request({
                                                url: basePath + '/support/doValidateStorers.action',
                                                params: {
                                                    storerKey:storerKeyValue
                                                },
                                                success: function(response){    //failure属于连不上服务器的情况，后续补充
                                                    var text = Ext.decode(response.responseText);
                                                    var success = text.success;
                                                    if(0 == text.json.data.length)
                                                    {
                                                        me.pt2topform.getForm().findField('fromstorerkey').setValue('');                                              
                                                        Ext.Msg.alert("错误提示", '货主不存在，请重新输入');
                                                    }
                                                    else  //校验货主商品是否匹配
                                                    {
                                                        if(''!=skuValue&&''!=storerKeyValue)
                                                        {
                                                            Ext.Ajax.request({
                                                                url: basePath + '/support/doValidateSkus.action',   //用true or false判断有误，后续再查，改用长度判断
                                                                params: {
                                                                    sku:skuValue,
                                                                    storerKey:storerKeyValue
                                                                },
                                                                success: function(response){
                                                                    var text = Ext.decode(response.responseText);
                                                                    var status = text.success;
                                                                    
                                                                    if(0==text.json.data.length)
                                                                    {
                                                                        MessageBox.show(false, '源货主，商品参数错误');   
                                                                        me.pt2pn1form.getForm().findField('fromsku').setValue('');
                                                                    }
                                                                }
                                                            });
                                                        }//第二个校验结束
                                                    }
                                                }
                                            }) //第一个校验结束
                                        }   
									}//end listener 
                                },
								{
                                    xtype:'textfield',
                                    name:'tostorerkey',
                                    fieldLabel:'目标货主',
                                    labelWidth: 60,
                                    allowBlank: false,
									listeners:{
                                        blur: function(txt){
                                            //输入参数，鼠标离开后见检查该货主是否存在
											var storerKeyValue= Ext.util.Format.uppercase(txt.getValue());
											txt.setValue(storerKeyValue);
                                            lotValue=me.pt2pn1form.getForm().findField('tolot').getValue();
                                            locValue=me.pt2pn1form.getForm().findField('toloc').getValue();
                                            skuValue=me.pt2pn1form.getForm().findField('tosku').getValue();
                                            
                                            Ext.Ajax.request({
                                                url: basePath + '/support/doValidateStorers.action',
                                                params: {
                                                    storerKey:storerKeyValue
                                                },
                                                success: function(response){    //failure属于连不上服务器的情况，后续补充
                                                    var text = Ext.decode(response.responseText);
                                                    var success = text.success;
                                                    if(0 == text.json.data.length)
                                                    {
                                                        me.pt2topform.getForm().findField('tostorerkey').setValue('');                                              
                                                        Ext.Msg.alert("错误提示", '货主不存在，请重新输入');
                                                    }
                                                    else  //校验货主商品是否匹配
                                                    {
                                                        if(''!=skuValue&&''!=storerKeyValue)
                                                        {
                                                            Ext.Ajax.request({
                                                                url: basePath + '/support/doValidateSkus.action',   //用true or false判断有误，后续再查，改用长度判断
                                                                params: {
                                                                    sku:skuValue,
                                                                    storerKey:storerKeyValue
                                                                },
                                                                success: function(response){
                                                                    var text = Ext.decode(response.responseText);
                                                                    var status = text.success;
                                                                    
                                                                    if(0==text.json.data.length)
                                                                    {
                                                                        MessageBox.show(false, '目标货主，商品参数错误');   
                                                                        me.pt2pn1form.getForm().findField('tosku').setValue('');
                                                                    }
                                                                }
                                                          
                                                            });
                                                        }//货主，商品校验结束
                                                    
                                                    }
                                                }
                                            })  //货主校验结束
                                        }   
                                                                                
									}//end listener 
                                }, 

								{
									xtype:'textfield',
									name: 'orderKey',
									fieldLabel: 'SO单号',
									labelWidth : 60
								},
								{
									xtype:'button',
									margin: '3 2 3 2',  
									iconCls: 'icon-create',
									text: '从SO提取',
									handler: this.doCreateDataFromSO,
									scope: this
                                },
                                {
									xtype:'button',
									iconCls: 'icon-create',
									text: '创建',
									handler: me.onGoCreate, 
									scope: this
								},				
								{
									 xtype:'button',
									 margin: '3 2 3 2',  //控制在行的中间
									 text : "保存",
									 iconCls: 'icon-save',
									 id:'saveBtn',
									 scope : this,
									 handler: this.saveTransfer
								},
								{
									xtype:'button',
									margin: '3 2 3 2',  //控制在行的中间
									iconCls: 'icon-delete',
									text: '删除',
									handler: this.deleteTransferAndDetal,
									scope: this
                                }
                                
                            ]
                    },
                    {   //做什么用的？关联记录的关键字！
                        xtype:'hidden',
                        name : "id"
                    },
                    {
                        xtype:'hidden',
                        name : "deleteItems"
                    }                    
            ]
	    })//end for Ext.create
	    
		return this.pt2topform;
	},   //end  createTransferForm

	createPt2TopBtnPanel: function(){
    	var me = this;
    	this.pt2topbtnpanel = Ext.create('Ext.form.Panel',{  //  创建btn panel ，继承自 Ext.form.Panel
    		region: 'north',
    		frame: true,
    		defaults: {
    			xtype: 'button',
    			margin: '5 0 0 5'
    		},
            items:[
                {
                    itemId: 'createToolbar',
                	iconCls: 'icon-create',
                    text: '添加',
					handler: me.onAddDetail, 
                    scope: this
                },
	            {
	            	itemId:'deleteToolbar',
                	iconCls: 'icon-delete',
	                text: '删除',
					handler: me.onMultiDelete,
	                scope: this
	            },
				{
	            	itemId:'allToolbar',
					text : "整单执行",
					iconCls: 'icon-ok',
					scope : this,
                    id:'allTraSnd',
					handler: this.onTransferAndDetal
				},
				{
	            	itemId:'detailToolbar',
	                text: '明细执行',
					iconCls: 'icon-ok',
                    id:'detailTra',
					handler: me.onMultiTransfer,
	                scope: this
	            },
                {
                    text : "从库存提取",
                    id:'detailMov',
                    scope : this,
                    handler:function(){
                        this.creatTransactionWindowPanel();
                        this.winformtran.show();
                    }
                }
               ,
                {
                    text : "库存转移批量修改",
                    id:'detailLocMov',
                    scope : this,
                    handler:function(){
                        this.createWinAmendFrom();
                        this.winamendform.queryById('firstLineId').setValue(1);
                        this.winamendform.show();
                    }
                } 
            ]
    	});
    	return this.pt2topbtnpanel;
    },
	
	
    //底部面板，包括一个grid和一个form 
	createPt2Pn1Panel: function(){
    	this.pt2pn1panel = Ext.create('Ext.panel.Panel',{
    		region: 'center',
    		layout: 'border',
    		items: [this.createDetailGrid(),this.createPt2TabPanel()]
    	});
    	return this.pt2pn1panel;
    },
    //底部左边grid
	createDetailGrid: function(){
    	var me = this;
    	this.detailgrid = Ext.create('widget.transferdetailgrid',{
    		region: 'center',
    		listeners: {
    			itemclick: function(grid,record){
    				me.pt2pn1form.getForm().loadRecord(record);
					me.pt2pn2form.getForm().loadRecord(record);
					var status=me.pt2pn1form.getForm().findField('status').getValue();
					if(status!='0')
					{   //load 时判断如果状态不是0，则只读状态
						//设置明细表字段只读
						me.onSetDetailReadOnly(true);       
						//关键字段也设置只读
						me.onSetDetailKeyReadOnly(true); 
					}
					else
					{   //因设置后状态一直不变，在加载新建的记录时，需要重新设置取消只读
						//另外，新建时主表或者添加明细记录，需要设置可以编辑，操作完成需要设置只读
						me.onSetDetailReadOnly(false);                
						//关键字段也设置只读
						me.onSetDetailKeyReadOnly(true); 
					}
    			}
    		}
    	});
    	this.detailgrid.getStore().on('beforeload',function(){
    		var params = this.detailgrid.getStore().getProxy().extraParams;
    		var record = me.pt2topform.getForm().getFieldValues();
    		var transferKey = record.transferKey;
			delete params.transferKey;
			if(transferKey) params.transferKey = transferKey;
    	},this);
    	return this.detailgrid;
    },
   //底部右边tabpanel
   createPt2TabPanel:function(){
    	var me = this;
    	this.pt2tabPanel = Ext.create('widget.tabpanel',{
    		region:'east',//south
    		collapsible: true,
    		border: false,
    		width:450,
			xtype:'tabpanel',
			layout: 'fit',
			split: true,
			tabPosition: 'bottom',
			items:[this.createPt2Pn1Form(),this.createPt2Pn2Form()],
			listeners: {
				tabchange: function(tp,newCard){
					var id = me.pt2topform.getForm().findField('id').getValue();
					if(id == ''){
					}else{
					}
				}
			}
    	});
    	return this.pt2tabPanel;
    },
   
   //底部右边第一个form
    createPt2Pn1Form: function(){
		var me=this;
    	this.pt2pn1form = Ext.create('Ext.form.Panel',{      //创建tab页，继承自Ext.form.Panel
			xtype:'form',
    		region: 'east',       //add for one tab  一个tab不需要上一级方法，直接用form，需要增加几个属性配置
    		width: 550,           //add for one tab
			collapsible: true,    //add for one tab
			frame:true,
			border: false,
			title: '基本限制1',   //note for one tab
			headerPosition: 'top',  //collapse的按钮等在上边还是下边，默认是上边
	        autoHeight: true,
            layout:'anchor',  //
            buttonAlign:'center',   //专门控制button位置的
	        bodyPadding: 1,
        	items:[
                    {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        defaults: {
                            labelWidth: 70,
                            margin: '5 0 0 5',
                            xtype: 'textfield'
                        },
                        items: [
                            {xtype:'hidden',name : "id",flex: .1},
                            {name: 'lineNumber',fieldLabel:'Line#',readOnly:true,flex: .6},
                            {
                                xtype:'combobox',
                                fieldLabel: '状态',
                                readOnly:true,
                                name: 'status',
                                displayField: 'text',
                                valueField: 'value',
                                store:Ext.create('Ext.data.Store', 
                                {
                                    fields: ['text','value'],
                                    data: [{text:'新建',value:'0'},{text:'完成',value:'9'}]
                                }
                            ),
                            value: '0',
                            flex: .6
                            }
                        ]
                    },
                    {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        defaults: {
                            labelWidth: 70,
                            margin: '5 0 0 5',
                            //  flex:1,           //不加这个，单独一行，左对齐
                            labelAlign: 'top',  //lable和文本框的排列方式，label在上
                            xtype: 'textfield'
                        },
                        items: [
                            {xtype:'label',text:'',flex: .1},
                            {
                                text:'FROM',
                                readOnly:true,
                                xtype: 'label',
                                flex: .4
                            },
                            {xtype:'label',text:'',flex: .1},
                            {
                                text:'TO',
                                readOnly:true,
                                xtype: 'label',
                                flex: .5
                            }
                        ]
                    },
					{
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        defaults: {
                            labelWidth: 60,
                            margin: '0 12 -2 0',
                            flex:1,
                            xtype: 'textfield'
                        },
                        items: [
                            {xtype:'label',text:'',flex: .2},
                            {
                                name: 'fromlot',
                                xtype: 'textfield',
                                allowBlank: false,
                                fieldLabel:'批次',
                                listeners:{
                                    blur: function(txt){
                                    //输入参数，鼠标离开后见检查该商品是否存在
										var lotValue= Ext.util.Format.uppercase(txt.getValue());
										txt.setValue(lotValue);
                                        locValue=me.pt2pn1form.getForm().findField('fromloc').getValue();
                                        skuValue=me.pt2pn1form.getForm().findField('fromsku').getValue();
                                        storerKeyValue=me.pt2topform.getForm().findField('fromstorerkey').getValue();
                                        if(''!=lotValue && ''!=storerKeyValue)
                                        {
                                            Ext.Ajax.request({
                                                url: basePath + '/inventory/doQuerryFromTransferDetail.action',
                                                params: {
                                                    fromlot:lotValue,
                                                    fromstorerkey:storerKeyValue
                                                },
                                                success: function(response){    //failure属于连不上服务器的情况，后续补充
                                                    var text = Ext.decode(response.responseText);
                                                    var success = text.success;
                                                    if(0 != text.json.data.length)
                                                    {
                                                        me.pt2pn1form.getForm().findField('fromsku').setValue(text.json.data[0].sku);
                                                        me.pt2pn1form.getForm().findField('fromloc').setValue(text.json.data[0].loc);
                                                        me.pt2pn1form.getForm().findField('tosku').setValue(text.json.data[0].sku);
                                                        me.pt2pn1form.getForm().findField('toloc').setValue(text.json.data[0].loc);

                                                        me.pt2pn1form.getForm().findField('fromQty').setValue(text.json.data[0].qty);
                                                        me.pt2pn1form.getForm().findField('toQty').setValue(text.json.data[0].qty);
                                                        me.pt2pn2form.getForm().findField('fromlottable01').setValue(Ext.util.Format.date(text.json.data[0].lottable01,"Y-m-d H:i:s"));
                                                        me.pt2pn2form.getForm().findField('fromlottable02').setValue(Ext.util.Format.date(text.json.data[0].lottable02,"Y-m-d H:i:s"));
                                                        me.pt2pn2form.getForm().findField('fromlottable03').setValue(Ext.util.Format.date(text.json.data[0].lottable03,"Y-m-d H:i:s"));
                                                        me.pt2pn2form.getForm().findField('fromlottable04').setValue(text.json.data[0].lottable04);
                                                        me.pt2pn2form.getForm().findField('fromlottable05').setValue(text.json.data[0].lottable05);
                                                        me.pt2pn2form.getForm().findField('fromlottable06').setValue(text.json.data[0].lottable06);
                                                        me.pt2pn2form.getForm().findField('fromlottable07').setValue(text.json.data[0].lottable07);
                                                        me.pt2pn2form.getForm().findField('fromlottable08').setValue(text.json.data[0].lottable08);
                                                        me.pt2pn2form.getForm().findField('fromlottable09').setValue(text.json.data[0].lottable09);
                                                        me.pt2pn2form.getForm().findField('fromlottable10').setValue(text.json.data[0].lottable10);
                                                        me.pt2pn2form.getForm().findField('fromlottable11').setValue(text.json.data[0].lottable11);
                                                        me.pt2pn2form.getForm().findField('fromlottable12').setValue(text.json.data[0].lottable12);
                                                        me.pt2pn2form.getForm().findField('fromlottable13').setValue(text.json.data[0].lottable13);
                                                        me.pt2pn2form.getForm().findField('fromlottable14').setValue(text.json.data[0].lottable14);
                                                        me.pt2pn2form.getForm().findField('fromlottable15').setValue(text.json.data[0].lottable15);
                                                        me.pt2pn2form.getForm().findField('fromlottable16').setValue(text.json.data[0].lottable16);
                                                        me.pt2pn2form.getForm().findField('fromlottable17').setValue(text.json.data[0].lottable17);
                                                        me.pt2pn2form.getForm().findField('fromlottable18').setValue(text.json.data[0].lottable18);
                                                        me.pt2pn2form.getForm().findField('fromlottable19').setValue(text.json.data[0].lottable19);
                                                        me.pt2pn2form.getForm().findField('fromlottable20').setValue(text.json.data[0].lottable20);
                                                        me.pt2pn2form.getForm().findField('tolottable01').setValue(Ext.util.Format.date(text.json.data[0].lottable01,"Y-m-d H:i:s"));
                                                        me.pt2pn2form.getForm().findField('tolottable02').setValue(Ext.util.Format.date(text.json.data[0].lottable02,"Y-m-d H:i:s"));
                                                        me.pt2pn2form.getForm().findField('tolottable03').setValue(Ext.util.Format.date(text.json.data[0].lottable03,"Y-m-d H:i:s"));
                                                        me.pt2pn2form.getForm().findField('tolottable04').setValue(text.json.data[0].lottable04);
                                                        me.pt2pn2form.getForm().findField('tolottable05').setValue(text.json.data[0].lottable05);
                                                        me.pt2pn2form.getForm().findField('tolottable06').setValue(text.json.data[0].lottable06);
                                                        me.pt2pn2form.getForm().findField('tolottable07').setValue(text.json.data[0].lottable07);
                                                        me.pt2pn2form.getForm().findField('tolottable08').setValue(text.json.data[0].lottable08);
                                                        me.pt2pn2form.getForm().findField('tolottable09').setValue(text.json.data[0].lottable09);
                                                        me.pt2pn2form.getForm().findField('tolottable10').setValue(text.json.data[0].lottable10);
                                                        me.pt2pn2form.getForm().findField('tolottable11').setValue(text.json.data[0].lottable11);
                                                        me.pt2pn2form.getForm().findField('tolottable12').setValue(text.json.data[0].lottable12);
                                                        me.pt2pn2form.getForm().findField('tolottable13').setValue(text.json.data[0].lottable13);
                                                        me.pt2pn2form.getForm().findField('tolottable14').setValue(text.json.data[0].lottable14);
                                                        me.pt2pn2form.getForm().findField('tolottable15').setValue(text.json.data[0].lottable15);
                                                        me.pt2pn2form.getForm().findField('tolottable16').setValue(text.json.data[0].lottable16);
                                                        me.pt2pn2form.getForm().findField('tolottable17').setValue(text.json.data[0].lottable17);
                                                        me.pt2pn2form.getForm().findField('tolottable18').setValue(text.json.data[0].lottable18);
                                                        me.pt2pn2form.getForm().findField('tolottable19').setValue(text.json.data[0].lottable19);
                                                        me.pt2pn2form.getForm().findField('tolottable20').setValue(text.json.data[0].lottable20);
                                                    }
                                                    else
                                                    {
                                                        me.pt2pn1form.getForm().findField('fromsku').setValue('');
                                                        me.pt2pn1form.getForm().findField('fromloc').setValue('');
                                                        me.pt2pn1form.getForm().findField('fromQty').setValue('');
                                                        me.pt2pn2form.getForm().findField('fromlottable01').setValue('');
                                                        me.pt2pn2form.getForm().findField('fromlottable02').setValue('');
                                                        me.pt2pn2form.getForm().findField('fromlottable03').setValue('');
                                                        me.pt2pn2form.getForm().findField('fromlottable04').setValue('');
                                                        me.pt2pn2form.getForm().findField('fromlottable05').setValue('');
                                                        me.pt2pn2form.getForm().findField('fromlottable06').setValue('');
                                                        me.pt2pn2form.getForm().findField('fromlottable07').setValue('');
                                                        me.pt2pn2form.getForm().findField('fromlottable08').setValue('');
                                                        me.pt2pn2form.getForm().findField('fromlottable09').setValue('');
                                                        me.pt2pn2form.getForm().findField('fromlottable10').setValue('');
                                                        me.pt2pn2form.getForm().findField('fromlottable11').setValue('');
                                                        me.pt2pn2form.getForm().findField('fromlottable12').setValue('');
                                                        me.pt2pn2form.getForm().findField('fromlottable13').setValue('');
                                                        me.pt2pn2form.getForm().findField('fromlottable14').setValue('');
                                                        me.pt2pn2form.getForm().findField('fromlottable15').setValue('');
                                                        me.pt2pn2form.getForm().findField('fromlottable16').setValue('');
                                                        me.pt2pn2form.getForm().findField('fromlottable17').setValue('');
                                                        me.pt2pn2form.getForm().findField('fromlottable18').setValue('');
                                                        me.pt2pn2form.getForm().findField('fromlottable19').setValue('');
                                                        me.pt2pn2form.getForm().findField('fromlottable20').setValue('');
                                                      
                                                        me.pt2pn2form.getForm().findField('tolottable01').setValue('');
                                                        me.pt2pn2form.getForm().findField('tolottable02').setValue('');
                                                        me.pt2pn2form.getForm().findField('tolottable03').setValue('');
                                                        me.pt2pn2form.getForm().findField('tolottable04').setValue('');
                                                        me.pt2pn2form.getForm().findField('tolottable05').setValue('');
                                                        me.pt2pn2form.getForm().findField('tolottable06').setValue('');
                                                        me.pt2pn2form.getForm().findField('tolottable07').setValue('');
                                                        me.pt2pn2form.getForm().findField('tolottable08').setValue('');
                                                        me.pt2pn2form.getForm().findField('tolottable09').setValue('');
                                                        me.pt2pn2form.getForm().findField('tolottable10').setValue('');
                                                        me.pt2pn2form.getForm().findField('tolottable11').setValue('');
                                                        me.pt2pn2form.getForm().findField('tolottable12').setValue('');
                                                        me.pt2pn2form.getForm().findField('tolottable13').setValue('');
                                                        me.pt2pn2form.getForm().findField('tolottable14').setValue('');
                                                        me.pt2pn2form.getForm().findField('tolottable15').setValue('');
                                                        me.pt2pn2form.getForm().findField('tolottable16').setValue('');
                                                        me.pt2pn2form.getForm().findField('tolottable17').setValue('');
                                                        me.pt2pn2form.getForm().findField('tolottable18').setValue('');
                                                        me.pt2pn2form.getForm().findField('tolottable19').setValue('');
                                                        me.pt2pn2form.getForm().findField('tolottable20').setValue('');
                                                        me.pt2pn1form.getForm().findField('fromlot').setValue('');
                                                        Ext.Msg.alert("错误提示", '查不到相关记录！')
                                                    }
                                                }
                                            })
                                        }//货主，商品，lot，loc校验结束
                                    }
                                }//end listener 
                            },
                            {
                                name: 'tolot',
                                readOnly:true,
                                xtype: 'textfield',
                                fieldLabel:'-->'
                            }
                        ]
                    },
					{
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            defaults: {
                                labelWidth: 60,
                                margin: '0 12 -2 0',
                                flex:1,
                                xtype: 'textfield'
                            },
                            items: [
                                {xtype:'label',flex: .2},
                                {
                                    name: 'fromsku',
									xtype: 'textfield',
									allowBlank: false,
                                    fieldLabel:'商品',
                                    readOnly:true,
									listeners:{
                                        blur: function(txt){
											//输入参数，鼠标离开后见检查该商品是否存在
											var skuValue= Ext.util.Format.uppercase(txt.getValue());
											txt.setValue(skuValue);
											lotValue=me.pt2pn1form.getForm().findField('fromlot').getValue();
											locValue=me.pt2pn1form.getForm().findField('fromloc').getValue();
											storerKeyValue=me.pt2topform.getForm().findField('fromstorerkey').getValue();
											if(''!=skuValue && ''!=storerKeyValue)
											{
                                                Ext.Ajax.request({
                                                    url: basePath + '/support/doValidateSkus.action',   //用true or false判断有误，后续再查，改用长度判断
                                                    params: {
                                                        sku:skuValue,
                                                        storerKey:storerKeyValue
                                                    },
                                                    success: function(response){
                                                        var text = Ext.decode(response.responseText);
                                                        var status = text.success;
                                                        
                                                        if(0==text.json.data.length)
                                                        {
                                                            MessageBox.show(false, '源货主，商品参数错误');   
                                                            me.pt2pn1form.getForm().findField('fromsku').setValue('');
                                                        }
                                                    }
                                                }); 
											}  //货主，商品校验结束
										}                                        
									}//end listener 
                                },
                                {
                                    name: 'tosku',
									xtype: 'textfield',
									allowBlank: false,
                                    fieldLabel:'-->',
									listeners:{
										blur: function(txt){
											//输入参数，鼠标离开后见检查该商品是否存在
											var skuValue= Ext.util.Format.uppercase(txt.getValue());
											txt.setValue(skuValue);
											storerKeyValue=me.pt2topform.getForm().findField('tostorerkey').getValue();
											if(''!=skuValue && ''!=storerKeyValue)
											{
                                                       Ext.Ajax.request({
                                                            url: basePath + '/support/doValidateSkus.action',   //用true or false判断有误，后续再查，改用长度判断
                                                            params: {
                                                                sku:skuValue,
                                                                storerKey:storerKeyValue
                                                            },
                                                            success: function(response){
                                                                var text = Ext.decode(response.responseText);
                                                                var status = text.success;
                                                                
                                                                if(0==text.json.data.length)
                                                                {
                                                                    MessageBox.show(false, '目标货主，商品参数错误');   
                                                                    me.pt2pn1form.getForm().findField('tosku').setValue('');
                                                                }
                                                            }
                                                      
                                                        });
											}// 货主，商品校验结束
										}
									}//end listener 
                                }
                            ]
                    },
					{
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        defaults: {
                            labelWidth: 60,
                            margin: '0 12 -2 0',
                            flex:1,
                            xtype: 'textfield'
                        },
                        items: [
                            {xtype:'label',flex: .2},
                            {
                                name: 'fromloc',
					            xtype: 'textfield',
                                readOnly:true,
                                allowBlank: false,
                                fieldLabel:'库位',
                                listeners:{
                                    blur: function(txt){
                                    //输入参数，鼠标离开后见检查该商品是否存在
										var locValue= Ext.util.Format.uppercase(txt.getValue());
										txt.setValue(locValue);
                                    }
                                }//end listener 
                            },
                            {
                                name: 'toloc',
                                xtype: 'textfield',
                                readOnly:true,
                                allowBlank: false,
                                fieldLabel:'-->',
                                listeners:{
                                    blur:function(txt){
										txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                    }
                                }
                            }
                        ]
                    },
					/*{
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            defaults: {
                                labelWidth: 60,
                                margin: '0 12 -2 0',
                                flex:1,
                                xtype: 'textfield'
                            },
                            items: [
                                {xtype:'label',text:'',flex: .2},
                                {
                                    name: 'fromPackkey',
									xtype: 'textfield',
                                    fieldLabel:'包装'
                                },
                                {
                                    name: 'toPackkey',
									xtype: 'textfield',
                                    fieldLabel:'-->'
                                }
                            ]
                    },
					{
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            defaults: {
                                labelWidth: 60,
                                margin: '0 12 -2 0',
                                flex:1,
                                xtype: 'textfield'
                            },
                            items: [
                                {xtype:'label',text:'',flex: .2},
                                {
                                    name: 'fromuom',
									xtype: 'textfield',
                                    fieldLabel:'单位'
                                },
                                {
                                    name: 'toUom',
									xtype: 'textfield',
                                    fieldLabel:'-->'
                                }
                            ]
                    },*/
					{
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        defaults: {
                            labelWidth: 60,
                            margin: '0 12 -2 0',
                            flex:1,
                            minValue:0,
                            decimalPrecision:3,
                            xtype: 'numberfield'
                        },
                        items: [
                            {xtype:'label',text:'',flex: .2},
                            {
                                name: 'fromQty',
                                readOnly:true,
								decimalPrecision:3,
                                fieldLabel:'数量'
                            },
                            {
                                name: 'toQty',
                                decimalPrecision:3,
                                fieldLabel:'-->'
                            }
                        ]
                    }
            ]
    	});
    	return this.pt2pn1form;
    },
  //底部右边第二个form
	createPt2Pn2Form: function(){
    	this.pt2pn2form = Ext.create('Ext.form.Panel',{      //创建tab页，继承自Ext.form.Panel
			xtype:'form',
    		region: 'east',       //add for one tab  一个tab不需要上一级方法，直接用form，需要增加几个属性配置
    		width: 550,           //add for one tab
			collapsible: true,    //add for one tab
			frame:true,
			border: false,
			title: '基本限制2',     //note for one tab
			headerPosition:'top',  //collapse的按钮等在上边还是下边，默认是上边
	        autoHeight: true,
            layout:'anchor',
   			collapsible : true,
   			autoScroll :true,
            buttonAlign:'center',   //专门控制button位置的
	        bodyPadding: 1,
        	items:[
					{
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            defaults: {
                                labelWidth: 70,
                                margin: '5 0 0 5',
                              //  flex:1,           //不加这个，单独一行，左对齐
                                labelAlign: 'top',  //lable和文本框的排列方式，label在上
                                xtype: 'textfield'
                            },
                            items: [
                                {xtype:'label',text:'',flex: .8},
                                {xtype:'label',text:'源批属性',flex: 3},
                                {xtype:'label',text:'目的批属性',flex: 3}
                            ]
                    },
                    {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            defaults: {
                                labelWidth: 60,
                                margin: '0 12 -2 0',
                                flex:1,
                                xtype: 'textfield'
                            },
                            items: [
                                {xtype:'label',text:'',flex: .2},
                                {
                                    name: 'fromlottable01',
                                    xtype:'datefield',
                                    readOnly:true,
                                    format:'Y-m-d H:i:s',
                                    fieldLabel:swmslot01
                                },
                                {
                                    name: 'tolottable01',
                                    xtype:'datefield',
                                    format:'Y-m-d H:i:s',
                                    fieldLabel:'-->'
                                }
                            ]
                    },
                    {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            defaults: {
                                labelWidth: 60,
                                margin: '0 12 -2 0',
                                flex:1,
                                xtype: 'textfield'
                            },
                            items: [
                                {xtype:'label',text:'',flex: .2},
                                {
                                    name: 'fromlottable02',
                                    xtype:'datefield',
                                    readOnly:true,
                                    format:'Y-m-d H:i:s',
                                    fieldLabel:swmslot02
                                },
                                {
                                    name: 'tolottable02',
                                    xtype:'datefield',
                                    format:'Y-m-d H:i:s',
                                    fieldLabel:'-->'
                                }
                            ]
                    },
                    {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            defaults: {
                                labelWidth: 60,
                                margin: '0 12 -2 0',
                                flex:1,
                                xtype: 'textfield'
                            },
                            items: [
                                {xtype:'label',text:'',flex: .2},
                                {
                                    name: 'fromlottable03',
                                    xtype:'datefield',
                                    readOnly:true,
                                    format:'Y-m-d H:i:s',
                                    fieldLabel:swmslot03
                                },
                                {
                                    name: 'tolottable03',
                                    xtype:'datefield',
                                    format:'Y-m-d H:i:s',
                                    fieldLabel:'-->'
                                }
                            ]
                    },
                    {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            defaults: {
                                labelWidth: 60,
                                margin: '0 12 -2 0',
                                flex:1,
                                xtype: 'textfield'
                            },
                            items: [
                                {xtype:'label',text:'',flex: .2},
                                {
                                    name: 'fromlottable04',
                                    fieldLabel:swmslot04,
                                    readOnly:true,
									listeners:{
										blur:function(txt){
											txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
										}
									}
                                },
                                {
                                    name: 'tolottable04',
                                    fieldLabel:'-->',
									listeners:{
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
                                labelWidth: 60,
                                margin: '0 12 -2 0',
                                flex:1,
                                xtype: 'textfield'
                            },
                            items: [
                                {xtype:'label',text:'',flex: .2},
                                {
                                    name: 'fromlottable05',
                                    fieldLabel:swmslot05,
                                    readOnly:true,
									listeners:{
										blur:function(txt){
											txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
										}
									}
                                },
                                {
                                    name: 'tolottable05',
                                    fieldLabel:'-->',
									listeners:{
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
                                labelWidth: 60,
                                margin: '0 12 -2 0',
                                flex:1,
                                xtype: 'textfield'
                            },
                            items: [
                                {xtype:'label',text:'',flex: .2},
                                {
                                    name: 'fromlottable06',
                                    fieldLabel:swmslot06,
                                    readOnly:true,
									listeners:{
										blur:function(txt){
											txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
										}
									}
                                },
                                {
                                    name: 'tolottable06',
                                    fieldLabel:'-->',
									listeners:{
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
                                labelWidth: 60,
                                margin: '0 12 -2 0',
                                flex:1,
                                xtype: 'textfield'
                            },
                            items: [
                                {xtype:'label',text:'',flex: .2},
                                {
                                    name: 'fromlottable07',
                                    readOnly:true,
                                    fieldLabel:swmslot07,
									listeners:{
										blur:function(txt){
											txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
										}
									}
                                },
                                {
                                    name: 'tolottable07',
                                    fieldLabel:'-->',
									listeners:{
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
                                labelWidth: 60,
                                margin: '0 12 -2 0',
                                flex:1,
                                xtype: 'textfield'
                            },
                            items: [
                                {xtype:'label',text:'',flex: .2},
                                {
                                    name: 'fromlottable08',
                                    fieldLabel:swmslot08,
                                    readOnly:true,
									listeners:{
										blur:function(txt){
											txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
										}
									}
                                },
                                {
                                    name: 'tolottable08',
                                    fieldLabel:'-->',
									listeners:{
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
                                labelWidth: 60,
                                margin: '0 12 -2 0',
                                flex:1,
                                xtype: 'textfield'
                            },
                            items: [
                                {xtype:'label',text:'',flex: .2},
                                {
                                    name: 'fromlottable09',
                                    fieldLabel:swmslot09,
                                    readOnly:true,
									listeners:{
										blur:function(txt){
											txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
										}
									}
                                },
                                {
                                    name: 'tolottable09',
                                    fieldLabel:'-->',
									listeners:{
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
                                labelWidth: 60,
                                margin: '0 12 -2 0',
                                flex:1,
                                xtype: 'textfield'
                            },
                            items: [
                                {xtype:'label',text:'',flex: .2},
                                {
                                    name: 'fromlottable10',
                                    fieldLabel:swmslot10,
                                    readOnly:true,
									listeners:{
										blur:function(txt){
											txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
										}
									}
                                },
                                {
                                    name: 'tolottable10',
                                    fieldLabel:'-->',
									listeners:{
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
                                labelWidth: 60,
                                margin: '0 12 -2 0',
                                flex:1,
                                xtype: 'textfield'
                            },
                            items: [
                                {xtype:'label',text:'',flex: .2},
                                {
                                    name: 'fromlottable11',
                                    fieldLabel:swmslot11,
                                    readOnly:true,
									listeners:{
										blur:function(txt){
											txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
										}
									}
                                },
                                {
                                    name: 'tolottable11',
                                    fieldLabel:'-->',
									listeners:{
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
                                labelWidth: 60,
                                margin: '0 12 -2 0',
                                flex:1,
                                xtype: 'textfield'
                            },
                            items: [
                                {xtype:'label',text:'',flex: .2},
                                {
                                    name: 'fromlottable12',
                                    fieldLabel:swmslot12,
                                    readOnly:true,
									listeners:{
										blur:function(txt){
											txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
										}
									}
                                },
                                {
                                    name: 'tolottable12',
                                    fieldLabel:'-->',
									listeners:{
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
                                labelWidth: 60,
                                margin: '0 12 -2 0',
                                flex:1,
                                xtype: 'textfield'
                            },
                            items: [
                                {xtype:'label',text:'',flex: .2},
                                {
                                    name: 'fromlottable13',
                                    fieldLabel:swmslot13,
                                    readOnly:true,
									listeners:{
										blur:function(txt){
											txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
										}
									}
                                },
                                {
                                    name: 'tolottable13',
                                    fieldLabel:'-->',
									listeners:{
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
                                labelWidth: 60,
                                margin: '0 12 -2 0',
                                flex:1,
                                xtype: 'textfield'
                            },
                            items: [
                                {xtype:'label',text:'',flex: .2},
                                {
                                    name: 'fromlottable14',
                                    fieldLabel:swmslot14,
                                    readOnly:true,
									listeners:{
										blur:function(txt){
											txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
										}
									}
                                },
                                {
                                    name: 'tolottable14',
                                    fieldLabel:'-->',
									listeners:{
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
                                labelWidth: 60,
                                margin: '0 12 -2 0',
                                flex:1,
                                xtype: 'textfield'
                            },
                            items: [
                                {xtype:'label',text:'',flex: .2},
                                {
                                    name: 'fromlottable15',
                                    fieldLabel:swmslot15,
                                    readOnly:true,
									listeners:{
										blur:function(txt){
											txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
										}
									}
                                },
                                {
                                    name: 'tolottable15',
                                    fieldLabel:'-->',
									listeners:{
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
                                labelWidth: 60,
                                margin: '0 12 -2 0',
                                flex:1,
                                xtype: 'textfield'
                            },
                            items: [
                                {xtype:'label',text:'',flex: .2},
                                {
                                    name: 'fromlottable16',
                                    fieldLabel:swmslot16,
                                    readOnly:true,
									listeners:{
										blur:function(txt){
											txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
										}
									}
                                },
                                {
                                    name: 'tolottable16',
                                    fieldLabel:'-->',
									listeners:{
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
                                labelWidth: 60,
                                margin: '0 12 -2 0',
                                flex:1,
                                xtype: 'textfield'
                            },
                            items: [
                                {xtype:'label',text:'',flex: .2},
                                {
                                    name: 'fromlottable17',
                                    fieldLabel:swmslot17,
                                    hidden:true,
                                    readOnly:true,
									listeners:{
										blur:function(txt){
											txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
										}
									}
                                },
                                {
                                    name: 'tolottable17',
                                    fieldLabel:'-->',
                                    hidden:true,
									listeners:{
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
                                labelWidth: 60,
                                margin: '0 12 -2 0',
                                flex:1,
                                xtype: 'textfield'
                            },
                            items: [
                                {xtype:'label',text:'',flex: .2},
                                {
                                    name: 'fromlottable18',
                                    fieldLabel:swmslot18,
                                    hidden:true,
                                    readOnly:true,
									listeners:{
										blur:function(txt){
											txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
										}
									}
                                },
                                {
                                    name: 'tolottable18',
                                    fieldLabel:'-->',
                                    hidden:true,
									listeners:{
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
                                labelWidth: 60,
                                margin: '0 12 -2 0',
                                flex:1,
                                xtype: 'textfield'
                            },
                            items: [
                                {xtype:'label',text:'',flex: .2},
                                {
                                    name: 'fromlottable19',
                                    fieldLabel:swmslot19,
                                    hidden:true,
                                    readOnly:true,
									listeners:{
										blur:function(txt){
											txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
										}
									}
                                },
                                {
                                    name: 'tolottable19',
                                    fieldLabel:'-->',
                                    hidden:true,
									listeners:{
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
                                labelWidth: 60,
                                margin: '0 12 -2 0',
                                flex:1,
                                xtype: 'textfield'
                            },
                            items: [
                                {xtype:'label',text:'',flex: .2},
                                {
                                    name: 'fromlottable20',
                                    fieldLabel:swmslot20,
                                    hidden:true,
                                    readOnly:true,
									listeners:{
										blur:function(txt){
											txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
										}
									}
                                },
                                {
                                    name: 'tolottable20',
                                    fieldLabel:'-->',
                                    hidden:true,
									listeners:{
										blur:function(txt){
											txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
										}
									}
                                }
                            ]
                    }
            ]
    	});
    	return this.pt2pn2form;
    },
    //从库存提取相关界面   
        creatTransactionWindowPanel: function(){
        var me = this;
        this.winformtran = Ext.create('Ext.window.Window',{
            title: '库存余量查询',
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
            height:170,
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
                            fieldLabel:'货主',
                            labelWidth:60,
                            name: 'storerKey',
                            value:'8080',
                            listeners:{
                                blur: function(txt){
                                    var storerValue=Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(storerValue);
                                } 
                            }                            
                        },
                        {
                            fieldLabel:'商品',
                            labelWidth:60,
                            name: 'sku',
                            listeners:{
                                blur: function(txt){
                                    var skuValue=Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(skuValue);
                                } 
                            }
                        },
                        {
                            fieldLabel:'库位',
                            labelWidth:60,
                            name:'loc',
                            listeners:{
                                blur: function(txt){
                                    var fromlocValue= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(fromlocValue);
                                }
                            }
                        },
                        {	
                            fieldLabel:'收货日期',
                            labelWidth:60,
                            width:191,
                            xtype:'datefield',
                            name: 'lottable01',
                            format:'Y-m-d'
                        },
                        {	
                            fieldLabel:'  --->',
                            labelWidth:60,
                            width:191,
                            xtype:'datefield',
                            name: 'tolottable01',
                            format:'Y-m-d'
                        }                    
                    ]
                },
                {
                    items: [
                        {	
                            fieldLabel:'生产日期',
                            labelWidth:60,
                            width:191,
                            xtype:'datefield',
                            name: 'lottable02',
                            format:'Y-m-d'
                        },
                        {	
                            fieldLabel:'  --->',
                            labelWidth:60,
                            width:191,
                            xtype:'datefield',
                            name: 'tolottable02',
                            format:'Y-m-d'
                        },                        
                        {	
                            fieldLabel:'失效日期',
                            labelWidth:60,
                            width:191,
                            xtype:'datefield',
                            name: 'lottable03',
                            format:'Y-m-d'
                        },
                        {	
                            fieldLabel:'  --->',
                            labelWidth:60,
                            width:191,
                            xtype:'datefield',
                            name: 'tolottable03',
                            format:'Y-m-d'
                        },
                        {	
                            fieldLabel:'生产批号',
                            labelWidth:60,
                            name: 'lottable04',
                            listeners:{
                                blur: function(txt){
                                    var lottable04Value= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(lottable04Value);
                                }
                            }
                        }    
                    ]
                },
                {
                    items: [
                        {	
                            fieldLabel:'托盘号',
                            labelWidth:60,
                            name: 'lottable05',
                            listeners:{
                                blur: function(txt){
                                    var lottable05Value= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(lottable05Value);
                                }
                            }                            
                        },
                        {
                            fieldLabel:'成品卷号',
                            labelWidth:60,
                            name: 'lottable06',
                            listeners:{
                                blur: function(txt){
                                    var lottable06Value= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(lottable06Value);
                                }
                            }                            
                        },
                        {
                            fieldLabel: '等级',
                            xtype:'codecombo',
                            labelWidth:60,
                            width:191,
                            codeType:'CYCLASS',
                            name: 'lottable07'
                        },                        
                        {
                            fieldLabel:'外观代码',
                            labelWidth:60,
                            name: 'lottable08',
                            listeners:{
                                blur: function(txt){
                                    var lottable08Value= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(lottable08Value);
                                    me.top.getForm().findField('lottable08Over').setValue(lottable08Value);
                                }
                            }                            
                        },{
                            fieldLabel:'批重量',
                            labelWidth:60,
                            name: 'lottable15',
                            listeners:{
                                blur: function(txt){
                                    var lottable15Value= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(lottable15Value);
                                }
                            }                            
                        }
                    ]
                },
                {
                    items: [
                        {
                            fieldLabel:'规格',
                            labelWidth:60,
                            name: 'lottable10',
                            listeners:{
                                blur: function(txt){
                                    var lottable10Value= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(lottable10Value);
                                    me.top.getForm().findField('lottable10Over').setValue(lottable10Value);
                                }
                            }                            
                        },
                        {
                            fieldLabel:'包装形式',
                            labelWidth:60,
                            name: 'lottable11',
                            listeners:{
                                blur: function(txt){
                                    var lottable11Value= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(lottable11Value);
                                    me.top.getForm().findField('lottable11Over').setValue(lottable11Value);
                                }
                            }                            
                        },
                        {   
                            fieldLabel:'ASN号',
                            labelWidth:60,
                            name: 'lottable12',
                            listeners:{
                                blur: function(txt){
                                    var lottable12Value= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(lottable12Value);
                                    me.top.getForm().findField('lottable12Over').setValue(lottable12Value);
                                }
                            }                            
                        },
                        {
                            fieldLabel:'反射率',
                            labelWidth:60,
                            name: 'lottable13',
                            listeners:{
                                blur: function(txt){
                                    var lottable13Value= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(lottable13Value);
                                }
                            }                            
                        },
                        {
                            fieldLabel:'极差',
                            labelWidth:60,
                            name: 'lottable14',
                            listeners:{
                                blur: function(txt){
                                    var lottable14Value= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(lottable14Value);
                                }
                            }                            
                        }                        
                    ]
                },
                {
                    items: [
                        {
                            fieldLabel: '表面处理',
                            xtype:'codecombo',
                            labelWidth:60,
                            width:230,
                            codeType:'CYSURFACE',
                            name: 'lottable09'
                        },
                        {
                            fieldLabel:'扣帐状态',
                            labelWidth:60,
                            name: 'lottable16',
                            listeners:{
                                blur: function(txt){
                                    var lottable16Value= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(lottable16Value);
                                }
                            }                            
                        },
                        {
                            fieldLabel:swmslot17,
                            labelWidth:60,
                            hidden:true,
                            name: 'lottable17',
                            listeners:{
                                blur: function(txt){
                                    var lottable17Value= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(lottable17Value);
                                }
                            }                            
                        },
                        {
                            fieldLabel:swmslot18,
                            labelWidth:60,
                            hidden:true,
                            name: 'lottable18',
                            listeners:{
                                blur: function(txt){
                                    var lottable18Value= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(lottable18Value);
                                }
                            }                            
                        },
                        {
                            boxLabel: '显示所有',
                            xtype: 'checkbox',
                            inputValue:1,
                            margin: '5 0 0 15',
                            name: 'showall'                
                        }                        
                    ]
                },
                {
                    items: [
                        {
                            fieldLabel:swmslot19,
                            labelWidth:60,
                            hidden:true,
                            name: 'lottable19',
                            listeners:{
                                blur: function(txt){
                                    var lottable19Value= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(lottable19Value);
                                }
                            }                            
                        },
                        {
                            fieldLabel:swmslot20,
                            labelWidth:60,
                            hidden:true,
                            name: 'lottable20',
                            listeners:{
                                blur: function(txt){
                                    var lottable20Value= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(lottable20Value);
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
        this.Transactiongrid = Ext.create('widget.lligrid',{
            region: 'center',
            selModel:Ext.create('Ext.selection.CheckboxModel')
        });
        this.Transactiongrid.getStore().on('beforeload',function(store){         //初次加载前或查询时的设置
            var params = store.getProxy().extraParams;
            var values = this.Transactionform.getForm().getFieldValues();
            var storerKey = values.storerKey;
            var sku = values.sku;
            var loc = values.loc;
            var lottable01 = values.lottable01;
            var tolottable01 = values.tolottable01;
            var lottable02 = values.lottable02;
            var tolottable02 = values.tolottable02;
            var lottable03 = values.lottable03;
            var tolottable03 = values.tolottable03;
            var lottable04 = values.lottable04;
            var lottable05 = values.lottable05;
            var lottable06 = values.lottable06;
            var lottable07 = values.lottable07;
            var lottable08 = values.lottable08;
            var lottable09 = values.lottable09;
            var lottable10 = values.lottable10;
            var lottable11 = values.lottable11;
            var lottable12 = values.lottable12;
            var lottable13 = values.lottable13;
            var lottable14 = values.lottable14;
            var lottable15 = values.lottable15;
    		var lottable16 = values.lottable16;
    		var lottable17 = values.lottable17;
    		var lottable18 = values.lottable18;
    		var lottable19 = values.lottable19;
    		var lottable20 = values.lottable20;
            var showall = values.showall;

            delete params.storerKey;
            delete params.sku;
            delete params.loc;
            delete params.lottable01;
            delete params.tolottable01;
            delete params.lottable02;
            delete params.tolottable02;
            delete params.lottable03;
            delete params.tolottable03;
            delete params.lottable04;
            delete params.lottable05;
            delete params.lottable06;
            delete params.lottable07;
            delete params.lottable08;
            delete params.lottable09;
            delete params.lottable10;
            delete params.lottable11;
            delete params.lottable12;
            delete params.lottable13;
            delete params.lottable14;
            delete params.lottable15;
    		delete params.lottable16;
    		delete params.lottable17;
    		delete params.lottable18;
    		delete params.lottable19;
    		delete params.lottable20;
            delete params.showall;
            
            if(storerKey) params.storerKey = storerKey;
            if(sku) params.sku = sku;
            if(loc) params.loc = loc;
            if(lottable01) params.lottable01 = lottable01;
            if(tolottable01) params.tolottable01 = tolottable01;
            if(lottable02) params.lottable02 = lottable02;
            if(tolottable02) params.tolottable02 = tolottable02;
            if(lottable03) params.lottable03 = lottable03;
            if(tolottable03) params.tolottable03 = tolottable03;
            if(lottable04) params.lottable04 = lottable04;
            if(lottable05) params.lottable05 = lottable05;
            if(lottable06) params.lottable06 = lottable06;
            if(lottable07) params.lottable07 = lottable07;
            if(lottable08) params.lottable08 = lottable08;
            if(lottable09) params.lottable09 = lottable09;
            if(lottable10) params.lottable10 = lottable10;
            if(lottable11) params.lottable11 = lottable11;
            if(lottable12) params.lottable12 = lottable12;
            if(lottable13) params.lottable13 = lottable13;
            if(lottable14) params.lottable14 = lottable14;
            if(lottable15) params.lottable15 = lottable15;
            if(lottable16) params.lottable16 = lottable16;
            if(lottable17) params.lottable17 = lottable17;
            if(lottable18) params.lottable18 = lottable18;
            if(lottable19) params.lottable19 = lottable19;
            if(lottable20) params.lottable20 = lottable20;
            if(showall) params.showall = showall;
            
        },this);
        return this.Transactiongrid;
    },
      //从库存提取用到的按钮前台方法
    onTransactionSelect: function(){
        this.Transactiongrid.getStore().load();
    },
    
    //从ASN提取用到的按钮前台方法
    onTransactionReset: function(){
        this.Transactionform.getForm().reset();
    },
    
    onTransactionSubmit: function(){
        var me=this;
        var transferKey=this.pt2topform.getForm().findField('transferKey').getValue();
        var fromstorerkey=this.pt2topform.getForm().findField('fromstorerkey').getValue();
        var tostorerkey=this.pt2topform.getForm().findField('tostorerkey').getValue();
        var status=this.pt2topform.getForm().findField('status').getValue();
        var orderKey=this.pt2topform.getForm().findField('orderKey').getValue();
        var effectiveDate=Ext.util.Format.date(this.pt2topform.getForm().findField('addDate').getValue(),'Y-m-d H:i:s');;
//        console.log(effectiveDate);
        var records = me.Transactiongrid.getSelectionModel().getSelection();
        if((records == ""))
        {
            MessageBox.error("错误提示","请选择要操作的数据！");
            return;
        } 
        if((fromstorerkey == "")||(tostorerkey == ""))
        {
            MessageBox.error("错误提示","请先输入货主！");
            return;
        } 
        
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
                url: basePath + '/inventory/importTransferFromTransaction.action',
                params: {
                    ids: ids,
                    transferKey: transferKey,
                    fromstorerkey: fromstorerkey,
                    tostorerkey: tostorerkey,
                    status: status,
                    orderKey:orderKey,
                    effectiveDate:effectiveDate
                },
                success: function(response){
                    var text = Ext.decode(response.responseText);
                    var success = text.success;
                    console.log(success);
                    mask.hide();
                    MessageBox.show(success, text.json.msg);
                    if(true==success)
                    {
                        me.detailgrid.getStore().load();
                    }
                }
            });
        } 
    },
    onTransactionReturn: function(){
        var me=this;
        me.transfergrid.getStore().load();
        me.winformtran.close();
        me.setActiveTab(0);
        me.detailgrid.getStore().load();
    },
    //修改相关批属性，长阳专用
    createWinAmendFrom: function(){
        var me = this;
        this.winamendform = Ext.create('Ext.window.Window',{
            title: '库位转移批量修改',
            height: 700,
            width: 380,
            layout: 'vbox',
            defaults: {
                xtype: 'fieldcontainer'
            },
            items: [
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 90,
                        margin: '5 0 0 10',
                        xtype: 'textfield',
                        width: 250
                    },
                    items: [
                        {
                            fieldLabel: '起始行号',
                            itemId: 'firstLineId'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        margin: '0 0 0 10',
                        labelWidth: 90,
                        width: 250,
                        xtype: 'textfield'
                    },
                    items: [
                        {
                            fieldLabel: 'To商品',
                            name:'sku',
                            itemId: 'skuId',
                            listeners:{
                                blur: function(txt){
                                    var toskuValue= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(toskuValue);
                                    var tostorerkeyValue=me.pt2topform.getForm().findField('tostorerkey').getValue();
//                                    console.log(tostorerkeyValue);
                                    if(''!=toskuValue) 
                                    {
                                        Ext.Ajax.request({
                                            url: basePath + '/support/doValidateSkus.action',  
                                            params: {
                                                sku:toskuValue,
                                                storerKey:tostorerkeyValue
                                            },
                                            success: function(response){
                                                var text = Ext.decode(response.responseText);
                                                var status = text.success;
                                                
                                                if(0==text.json.data.length)
                                                {
                                                    me.winamendform.queryById('skuId').setValue();  
                                                    MessageBox.show(false, '商品不存在！');   
                                                }
                                            }
                                      
                                        });
                                    }
                                    
                                } 
                            }     
                        },
                           {
                            itemId: 'CheckskuId',
                            xtype: 'checkbox',
                            inputValue: true, 
                            boxLabel: '是否为空',
                            listeners:{
                                change:function(txt){
                                    if(true==txt.checked)
                                    {
                                        me.winamendform.queryById('skuId').setValue();  
                                        me.winamendform.queryById('skuId').disable();  
                                    }
                                    else
                                    {
                                        me.winamendform.queryById('skuId').enable();  
                                    }
                                }
                            } 
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        margin: '0 0 0 10',
                        labelWidth: 90,
                        width: 250,
                        xtype: 'textfield'
                    },
                    items: [
                        {
                            fieldLabel: 'To库位',
                            itemId: 'locId',
                            name:'loc',
                            listeners:{
                                blur: function(txt){
                                    var tolocValue= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(tolocValue);
                                    if(''!=tolocValue) 
                                    {
                                        Ext.Ajax.request({
                                            url: basePath + '/inventory/doValidateLoc.action',  
                                            params: {
                                                toloc:tolocValue
                                            },
                                            success: function(response){
                                                var text = Ext.decode(response.responseText);
                                                var status = text.success;
                                                
                                                if(0==text.json.data.length)
                                                {
                                                    me.winamendform.queryById('locId').setValue();  
                                                    MessageBox.show(false, '库位不存在！');   
                                                }
                                            }
                                      
                                        });
                                    }
                                    
                                } 
                            }     
                        },
                           {
                            itemId: 'ChecklocId',
                            xtype: 'checkbox',
                            inputValue: true, 
                            boxLabel: '是否为空',
                            listeners:{
                                change:function(txt){
                                    if(true==txt.checked)
                                    {
                                        me.winamendform.queryById('locId').setValue();  
                                        me.winamendform.queryById('locId').disable();  
                                    }
                                    else
                                    {
                                        me.winamendform.queryById('locId').enable();  
                                    }
                                }
                            } 
                        }
                    ]
                },
                 {
                    layout: 'hbox',
                    defaults:{
                        margin: '0 0 0 10',
                        labelWidth: 90,
                        width: 250,
                        xtype: 'textfield'
                    },
                    items: [
                        {
                            fieldLabel: 'To数量',
                            minValue:0,
                            decimalPrecision:3,
                            xtype: 'numberfield',
                            name:'qty',
                            itemId: 'qtyId',
                            listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }      
                        },
                           {
                            itemId: 'CheckqtyId',
                            xtype: 'checkbox',
                            inputValue: true, 
                            boxLabel: '是否为空',
                            listeners:{
                                change:function(txt){
                                    if(true==txt.checked)
                                    {
                                        me.winamendform.queryById('qtyId').setValue();  
                                        me.winamendform.queryById('qtyId').disable();  
                                    }
                                    else
                                    {
                                        me.winamendform.queryById('qtyId').enable();  
                                    }
                                }
                            } 
                        }
                    ]
                },
                 {
                    layout: 'hbox',
                    defaults:{
                        margin: '0 0 0 10',
                        labelWidth: 90,
                        width: 250,
                        xtype: 'textfield'
                    },
                    items: [
                        {
                            fieldLabel: 'To收货日期',
                            itemId: 'lottable01Id',
                            xtype:'datefield',
                            name: 'lottable01',
                            format:'Y-m-d H:i:s'
                        },
                           {
                            itemId: 'Checklottable01Id',
                            xtype: 'checkbox',
                            inputValue: true, 
                            boxLabel: '是否为空',
                            listeners:{
                                change:function(txt){
                                    if(true==txt.checked)
                                    {
                                        me.winamendform.queryById('lottable01Id').setValue();  
                                        me.winamendform.queryById('lottable01Id').disable();  
                                    }
                                    else
                                    {
                                        me.winamendform.queryById('lottable01Id').enable();  
                                    }
                                }
                            } 
                        }
                    ]
                },
                 {
                    layout: 'hbox',
                    defaults:{
                        margin: '0 0 0 10',
                        labelWidth: 90,
                        width: 250,
                        xtype: 'textfield'
                    },
                    items: [
                        {
                            fieldLabel: 'To生产日期',
                            itemId: 'lottable02Id',
                            xtype:'datefield',
                            name: 'lottable02',
                            format:'Y-m-d H:i:s'
                        },
                           {
                            itemId: 'Checklottable02Id',
                            xtype: 'checkbox',
                            inputValue: true, 
                            boxLabel: '是否为空',
                            listeners:{
                                change:function(txt){
                                    if(true==txt.checked)
                                    {
                                        me.winamendform.queryById('lottable02Id').setValue();  
                                        me.winamendform.queryById('lottable02Id').disable();  
                                    }
                                    else
                                    {
                                        me.winamendform.queryById('lastLineId').enable();  
                                    }
                                }
                            } 
                        }
                    ]
                },
                 {
                    layout: 'hbox',
                    defaults:{
                        margin: '0 0 0 10',
                        labelWidth: 90,
                        width: 250,
                        xtype: 'textfield'
                    },
                    items: [
                        {
                            fieldLabel: 'To失效日期',
                            xtype:'datefield',
                            name: 'lottable03',
                            format:'Y-m-d H:i:s',
                            itemId: 'lottable03Id'
                        },
                           {
                            itemId: 'Checklottable03Id',
                            xtype: 'checkbox',
                            inputValue: true, 
                            boxLabel: '是否为空',
                            listeners:{
                                change:function(txt){
                                    if(true==txt.checked)
                                    {
                                        me.winamendform.queryById('lottable03Id').setValue();  
                                        me.winamendform.queryById('lottable03Id').disable();  
                                    }
                                    else
                                    {
                                        me.winamendform.queryById('lottable03Id').enable();  
                                    }
                                }
                            } 
                        }
                    ]
                },
                 {
                    layout: 'hbox',
                    defaults:{
                        margin: '0 0 0 10',
                        labelWidth: 90,
                        width: 250,
                        xtype: 'textfield'
                    },
                    items: [
                        {
                            fieldLabel: 'To生产批号',
                            itemId: 'lottable04Id',
                             name: 'lottable04',
                            listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }      
                        },
                           {
                            itemId: 'Checklottable04Id',
                            xtype: 'checkbox',
                            inputValue: true, 
                            boxLabel: '是否为空',
                            listeners:{
                                change:function(txt){
                                    if(true==txt.checked)
                                    {
                                        me.winamendform.queryById('lottable04Id').setValue();  
                                        me.winamendform.queryById('lottable04Id').disable();  
                                    }
                                    else
                                    {
                                        me.winamendform.queryById('lottable04Id').enable();  
                                    }
                                }
                            } 
                        }
                    ]
                },
                 {
                    layout: 'hbox',
                    defaults:{
                        margin: '0 0 0 10',
                        labelWidth: 90,
                        width: 250,
                        xtype: 'textfield'
                    },
                    items: [
                        {
                            fieldLabel: 'To托盘号',
                            itemId: 'lottable05Id',
                            name: 'lottable05',
                            listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }      
                        },
                           {
                            itemId: 'Checklottable05Id',
                            xtype: 'checkbox',
                            inputValue: true, 
                            boxLabel: '是否为空',
                            listeners:{
                                change:function(txt){
                                    if(true==txt.checked)
                                    {
                                        me.winamendform.queryById('lottable05Id').setValue();  
                                        me.winamendform.queryById('lottable05Id').disable();  
                                    }
                                    else
                                    {
                                        me.winamendform.queryById('lottable05Id').enable();  
                                    }
                                }
                            } 
                        }
                    ]
                },
                 {
                    layout: 'hbox',
                    defaults:{
                        margin: '0 0 0 10',
                        labelWidth: 90,
                        width: 250,
                        xtype: 'textfield'
                    },
                    items: [
                        {
                            fieldLabel: 'To成品卷号',
                            itemId: 'lottable06Id',
                            name: 'lottable06',
                            listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }      
                        },
                           {
                            itemId: 'Checklottable06Id',
                            xtype: 'checkbox',
                            inputValue: true, 
                            boxLabel: '是否为空',
                            listeners:{
                                change:function(txt){
                                    if(true==txt.checked)
                                    {
                                        me.winamendform.queryById('lottable06Id').setValue();  
                                        me.winamendform.queryById('lottable06Id').disable();  
                                    }
                                    else
                                    {
                                        me.winamendform.queryById('lottable06Id').enable();  
                                    }
                                }
                            } 
                        }
                    ]
                },
                 {
                    layout: 'hbox',
                    defaults:{
                        margin: '0 0 0 10',
                        labelWidth: 90,
                        width: 250,
                        xtype: 'textfield'
                    },
                    items: [
                        {
                            fieldLabel: 'To等级',
                            itemId: 'lottable07Id',
                            name: 'lottable07',
                            listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }      
                        },
                           {
                            itemId: 'Checklottable07Id',
                            xtype: 'checkbox',
                            inputValue: true, 
                            boxLabel: '是否为空',
                            listeners:{
                                change:function(txt){
                                    if(true==txt.checked)
                                    {
                                        me.winamendform.queryById('lottable07Id').setValue();  
                                        me.winamendform.queryById('lottable07Id').disable();  
                                    }
                                    else
                                    {
                                        me.winamendform.queryById('lottable07Id').enable();  
                                    }
                                }
                            } 
                        }
                    ]
                },
                 {
                    layout: 'hbox',
                    defaults:{
                        margin: '0 0 0 10',
                        labelWidth: 90,
                        width: 250,
                        xtype: 'textfield'
                    },
                    items: [
                        {
                            fieldLabel: 'To外观代码',
                            itemId: 'lottable08Id',
                            name: 'lottable08',
                            listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }      
                        },
                           {
                            itemId: 'Checklottable08Id',
                            xtype: 'checkbox',
                            inputValue: true, 
                            boxLabel: '是否为空',
                            listeners:{
                                change:function(txt){
                                    if(true==txt.checked)
                                    {
                                        me.winamendform.queryById('lottable08Id').setValue();  
                                        me.winamendform.queryById('lottable08Id').disable();  
                                    }
                                    else
                                    {
                                        me.winamendform.queryById('lottable08Id').enable();  
                                    }
                                }
                            } 
                        }
                    ]
                },
                 {
                    layout: 'hbox',
                    defaults:{
                        margin: '0 0 0 10',
                        labelWidth: 90,
                        width: 250,
                        xtype: 'textfield'
                    },
                    items: [
                        {
                            fieldLabel: 'To表面处理',
                            name: 'lottable09',
                            itemId: 'lottable09Id',
                            listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }      
                        },
                           {
                            itemId: 'Checklottable09Id',
                            xtype: 'checkbox',
                            inputValue: true, 
                            boxLabel: '是否为空',
                            listeners:{
                                change:function(txt){
                                    if(true==txt.checked)
                                    {
                                        me.winamendform.queryById('lottable09Id').setValue();  
                                        me.winamendform.queryById('lottable09Id').disable();  
                                    }
                                    else
                                    {
                                        me.winamendform.queryById('lottable09Id').enable();  
                                    }
                                }
                            } 
                        }
                    ]
                },
                 {
                    layout: 'hbox',
                    defaults:{
                        margin: '0 0 0 10',
                        labelWidth: 90,
                        width: 250,
                        xtype: 'textfield'
                    },
                    items: [
                        {
                            fieldLabel: 'To规格',
                            itemId: 'lottable10Id',
                            name: 'lottable10',
                            listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }      
                        },
                           {
                            itemId: 'Checklottable10Id',
                            xtype: 'checkbox',
                            inputValue: true, 
                            boxLabel: '是否为空',
                            listeners:{
                                change:function(txt){
                                    if(true==txt.checked)
                                    {
                                        me.winamendform.queryById('lottable10Id').setValue();  
                                        me.winamendform.queryById('lottable10Id').disable();  
                                    }
                                    else
                                    {
                                        me.winamendform.queryById('lastLineId').enable();  
                                    }
                                }
                            } 
                        }
                    ]
                },
                 {
                    layout: 'hbox',
                    defaults:{
                        margin: '0 0 0 10',
                        labelWidth: 90,
                        width: 250,
                        xtype: 'textfield'
                    },
                    items: [
                        {
                            fieldLabel: 'To包装形式',
                            itemId: 'lottable11Id',
                            name: 'lottable11',
                            listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }      
                        },
                           {
                            itemId: 'Checklottable11Id',
                            xtype: 'checkbox',
                            inputValue: true, 
                            boxLabel: '是否为空',
                            listeners:{
                                change:function(txt){
                                    if(true==txt.checked)
                                    {
                                        me.winamendform.queryById('lottable11Id').setValue();  
                                        me.winamendform.queryById('lottable11Id').disable();  
                                    }
                                    else
                                    {
                                        me.winamendform.queryById('lottable11Id').enable();  
                                    }
                                }
                            } 
                        }
                    ]
                },
                 {
                    layout: 'hbox',
                    defaults:{
                        margin: '0 0 0 10',
                        labelWidth: 90,
                        width: 250,
                        xtype: 'textfield'
                    },
                    items: [
                        {
                            fieldLabel: 'ToASN号',
                            itemId: 'lottable12Id',
                            name: 'lottable12',
                            listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }      
                        },
                           {
                            itemId: 'Checklottable12Id',
                            xtype: 'checkbox',
                            inputValue: true, 
                            boxLabel: '是否为空',
                            listeners:{
                                change:function(txt){
                                    if(true==txt.checked)
                                    {
                                        me.winamendform.queryById('lottable12Id').setValue();  
                                        me.winamendform.queryById('lottable12Id').disable();  
                                    }
                                    else
                                    {
                                        me.winamendform.queryById('lottable12Id').enable();  
                                    }
                                }
                            } 
                        }
                    ]
                },
                 {
                    layout: 'hbox',
                    defaults:{
                        margin: '0 0 0 10',
                        labelWidth: 90,
                        width: 250,
                        xtype: 'textfield'
                    },
                    items: [
                        {
                            fieldLabel: 'To反射率',
                            itemId: 'lottable13Id',
                            name: 'lottable13',
                            listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }      
                        },
                           {
                            itemId: 'Checklottable13Id',
                            xtype: 'checkbox',
                            inputValue: true, 
                            boxLabel: '是否为空',
                            listeners:{
                                change:function(txt){
                                    if(true==txt.checked)
                                    {
                                        me.winamendform.queryById('lottable13Id').setValue();  
                                        me.winamendform.queryById('lottable13Id').disable();  
                                    }
                                    else
                                    {
                                        me.winamendform.queryById('lottable13Id').enable();  
                                    }
                                }
                            } 
                        }
                    ]
                },
                 {
                    layout: 'hbox',
                    defaults:{
                        margin: '0 0 0 10',
                        labelWidth: 90,
                        width: 250,
                        xtype: 'textfield'
                    },
                    items: [
                        {
                            fieldLabel: 'To极差',
                            itemId: 'lottable14Id',
                            name: 'lottable14',
                            listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }      
                        },
                           {
                            itemId: 'Checklottable14Id',
                            xtype: 'checkbox',
                            inputValue: true, 
                            boxLabel: '是否为空',
                            listeners:{
                                change:function(txt){
                                    if(true==txt.checked)
                                    {
                                        me.winamendform.queryById('lottable14Id').setValue();  
                                        me.winamendform.queryById('lottable14Id').disable();  
                                    }
                                    else
                                    {
                                        me.winamendform.queryById('lottable14Id').enable();  
                                    }
                                }
                            } 
                        }
                    ]
                },
                 {
                    layout: 'hbox',
                    defaults:{
                        margin: '0 0 0 10',
                        labelWidth: 90,
                        width: 250,
                        xtype: 'textfield'
                    },
                    items: [
                        {
                            fieldLabel: 'To重量',
                            itemId: 'lottable15Id',
                            name: 'lottable15',
                            listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }      
                        },
                           {
                            itemId: 'Checklottable15Id',
                            xtype: 'checkbox',
                            inputValue: true, 
                            boxLabel: '是否为空',
                            listeners:{
                                change:function(txt){
                                    if(true==txt.checked)
                                    {
                                        me.winamendform.queryById('lottable15Id').setValue();  
                                        me.winamendform.queryById('lottable15Id').disable();  
                                    }
                                    else
                                    {
                                        me.winamendform.queryById('lottable15Id').enable();  
                                    }
                                }
                            } 
                        }
                    ]
                },
                 {
                    layout: 'hbox',
                    defaults:{
                        margin: '0 0 0 10',
                        labelWidth: 90,
                        width: 250,
                        xtype: 'textfield'
                    },
                    items: [
                        {
                            fieldLabel: 'To'+swmslot16,
                            itemId: 'lottable16Id',
                            name: 'lottable16',
                            listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }      
                        },
                           {
                            itemId: 'Checklottable16Id',
                            xtype: 'checkbox',
                            inputValue: true, 
                            boxLabel: '是否为空',
                            listeners:{
                                change:function(txt){
                                    if(true==txt.checked)
                                    {
                                        me.winamendform.queryById('lottable16Id').setValue();  
                                        me.winamendform.queryById('lottable16Id').disable();  
                                    }
                                    else
                                    {
                                        me.winamendform.queryById('lottable16Id').enable();  
                                    }
                                }
                            } 
                        }
                    ]
                },
         /*        {
                    layout: 'hbox',
                    defaults:{
                        margin: '0 0 0 10',
                        labelWidth: 60,
                        width: 250,
                        xtype: 'textfield'
                    },
                    items: [
                        {
                            fieldLabel: '批属性16',
                            itemId: 'lottable16Id',
                            name: 'lottable16',
                            listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }      
                        },
                           {
                            itemId: 'Checklottable16Id',
                            xtype: 'checkbox',
                            inputValue: true, 
                            boxLabel: '是否为空',
                            listeners:{
                                change:function(txt){
                                    if(true==txt.checked)
                                    {
                                        me.winamendform.queryById('lottable16Id').setValue();  
                                        me.winamendform.queryById('lottable16Id').disable();  
                                    }
                                    else
                                    {
                                        me.winamendform.queryById('lottable16Id').enable();  
                                    }
                                }
                            } 
                        }
                    ]
                },*/
                {
                    layout: 'hbox',
                    defaults:{
                        margin: '0 0 0 10',
                        labelWidth: 90,
                        width: 250,
                        xtype: 'textfield'
                    },
                    items: [
                        {
                            fieldLabel: '结束行号',
                            itemId: 'lastLineId'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        margin: '0 0 0 50',
                        xtype: 'checkbox'
                    },
                    items: [
                        {
                            itemId: 'toLastId',
                            inputValue: true, 
                            boxLabel: '更新至最后一行',
                            listeners:{
                                change:function(txt){
                                    if(true==txt.checked)
                                    {
                                        me.winamendform.queryById('lastLineId').setValue();  
                                        me.winamendform.queryById('lastLineId').disable();  
                                    }
                                    else
                                    {
                                        me.winamendform.queryById('lastLineId').enable();  
                                    }
                                }
                            } 
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 60,
                        width : 80,
                        margin: '0 0 0 20',
                        xtype: 'button'
                    },
                    items: [
                        {
                            text: '确定',
                            handler: me.onLocAmend,
                            scope: this,
                            margin: '0 0 0 20'
                        },
                        {
                            text: '退出',
                            scope: this,
                            handler: function(){
                                me.winamendform.close();
                            }
                        }
                    ]
                }
            ]
        });
        this.winamendform.on('close',function(){
            delete this.winamendform;
        },this);
        return this.winamendform;
    
    },

    onLocAmend: function(){
        var me = this;
        var transferKeyValue=this.pt2topform.getForm().findField('transferKey').getValue();
        var firstLineValue = me.winamendform.queryById('firstLineId').getValue();
        
        var skuId  = me.winamendform.queryById('skuId').getValue();
        var CheckskuId  = me.winamendform.queryById('CheckskuId').getValue();
        
        var locId  = me.winamendform.queryById('locId').getValue();
        var ChecklocId  = me.winamendform.queryById('ChecklocId').getValue();
        
        var qtyId  = me.winamendform.queryById('qtyId').getValue();
        var CheckqtyId  = me.winamendform.queryById('CheckqtyId').getValue();
        
        //Ext.util.Format.date(me.winamendform.queryById('lottable01Id').getValue(),'Y-m-d H:i:s');
        //有些日期操作有问题，如中间多了英文字母，此处进行转换即可;
        var lottable01Id  = Ext.util.Format.date(me.winamendform.queryById('lottable01Id').getValue(),'Y-m-d H:i:s');
        var Checklottable01Id  = me.winamendform.queryById('Checklottable01Id').getValue();
        
        var lottable02Id  = Ext.util.Format.date(me.winamendform.queryById('lottable02Id').getValue(),'Y-m-d H:i:s');
        var Checklottable02Id  = me.winamendform.queryById('Checklottable02Id').getValue();
        
        var lottable03Id  = Ext.util.Format.date(me.winamendform.queryById('lottable03Id').getValue(),'Y-m-d H:i:s');
        var Checklottable03Id  = me.winamendform.queryById('Checklottable03Id').getValue();
        
        var lottable04Id  = me.winamendform.queryById('lottable04Id').getValue();
        var Checklottable04Id  = me.winamendform.queryById('Checklottable04Id').getValue();
        
        var lottable05Id  = me.winamendform.queryById('lottable05Id').getValue();
        var Checklottable05Id  = me.winamendform.queryById('Checklottable05Id').getValue();
        
        var lottable06Id  = me.winamendform.queryById('lottable06Id').getValue();
        var Checklottable06Id  = me.winamendform.queryById('Checklottable06Id').getValue();
        
        var lottable07Id  = me.winamendform.queryById('lottable07Id').getValue();
        var Checklottable07Id  = me.winamendform.queryById('Checklottable07Id').getValue();
        
        var lottable08Id  = me.winamendform.queryById('lottable08Id').getValue();
        var Checklottable08Id  = me.winamendform.queryById('Checklottable08Id').getValue();
        
        var lottable09Id  = me.winamendform.queryById('lottable09Id').getValue();
        var Checklottable09Id  = me.winamendform.queryById('Checklottable09Id').getValue();
        
        var lottable10Id  = me.winamendform.queryById('lottable10Id').getValue();
        var Checklottable10Id  = me.winamendform.queryById('Checklottable10Id').getValue();
        
        var lottable11Id  = me.winamendform.queryById('lottable11Id').getValue();
        var Checklottable11Id  = me.winamendform.queryById('Checklottable11Id').getValue();
        
        var lottable12Id  = me.winamendform.queryById('lottable12Id').getValue();
        var Checklottable12Id  = me.winamendform.queryById('Checklottable12Id').getValue();
        
        var lottable13Id  = me.winamendform.queryById('lottable13Id').getValue();
        var Checklottable13Id  = me.winamendform.queryById('Checklottable13Id').getValue();
        
        var lottable14Id  = me.winamendform.queryById('lottable14Id').getValue();
        var Checklottable14Id  = me.winamendform.queryById('Checklottable14Id').getValue();
        
        var lottable15Id  =me.winamendform.queryById('lottable15Id').getValue();
        var Checklottable15Id  = me.winamendform.queryById('Checklottable15Id').getValue();
        
        var lottable16Id  = me.winamendform.queryById('lottable16Id').getValue();
        var Checklottable16Id  = me.winamendform.queryById('Checklottable16Id').getValue();

        var lastLineValue = me.winamendform.queryById('lastLineId').getValue();
        var toLastValue = me.winamendform.queryById('toLastId').getValue();
        if(null==transferKeyValue ||''== transferKeyValue){
            MessageBox.error("错误提示","请填写转移单号！");
            return;
        }

        if(((''==lastLineValue)&&(false==toLastValue)))
        {
            MessageBox.error("错误提示","请填写结束行");
            return;
        }
        Ext.Ajax.request({
            url: basePath + '/inventory/doTransferAmendForCY.action',
            params: {
                transferKey:transferKeyValue,
                firstLineValue: firstLineValue,
                
                skuId: skuId,
                CheckskuId: CheckskuId,
                locId: locId,
                ChecklocId: ChecklocId,
                qtyId: qtyId,
                CheckqtyId: CheckqtyId,
                
                lottable01Id: lottable01Id,
                Checklottable01Id: Checklottable01Id,
                
                lottable02Id: lottable02Id,
                Checklottable02Id: Checklottable02Id,
               
                lottable03Id: lottable03Id,
                Checklottable03Id: Checklottable03Id,
               
                lottable04Id: lottable04Id,
                Checklottable04Id: Checklottable04Id,
                
                lottable05Id: lottable05Id,
                Checklottable05Id: Checklottable05Id,
                
                lottable06Id: lottable06Id,
                Checklottable06Id: Checklottable06Id,
               
                lottable07Id: lottable07Id,
                Checklottable07Id: Checklottable07Id,
                
                lottable08Id: lottable08Id,
                Checklottable08Id: Checklottable08Id,
                
                lottable09Id: lottable09Id,
                Checklottable09Id: Checklottable09Id,
                
                lottable10Id: lottable10Id,
                Checklottable10Id: Checklottable10Id,
                
                lottable11Id: lottable11Id,
                Checklottable11Id: Checklottable11Id,
                
                lottable12Id: lottable12Id,
                Checklottable12Id: Checklottable12Id,
               
                lottable13Id: lottable13Id,
                Checklottable13Id: Checklottable13Id,
                
                lottable14Id: lottable14Id,
                Checklottable14Id: Checklottable14Id,
               
                lottable15Id: lottable15Id,
                Checklottable15Id: Checklottable15Id,
                
                lottable16Id: lottable16Id,
                Checklottable16Id: Checklottable16Id,
                
                
                lastLineValue: lastLineValue,
                toLastValue: toLastValue
            },
            success: function(response){
                var text = Ext.decode(response.responseText);
                var success = text.success;
                if(true==success)
                {
                    MessageBox.show(success, text.json.msg);
                    me.detailgrid.getStore().load();
                    me.winamendform.close();
                }
                else
                {
                    MessageBox.show(success, "更新失败!");
                }
            }            
        })
}
});
Ext.onReady(function(){
	Ext.create('Ext.container.Viewport', {
	    layout: 'border',
	    items: [{
	    	xtype:'transfermanager',
	    	region:'center'
	    }]
	});
});