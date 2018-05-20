/**********************************************************************

  盘点 count.js

**********************************************************************/


Ext.define('Count', {
    extend: 'Ext.data.Model',
    fields: [
    	{name:'id'}, //id
		{name:'countKey'}, //盘点单号
		{name:'storerKey'},  //货主
		{name:'effectiveDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},//  生效日期
		{name:'type'},       //类型 
		{name:'mode'},       //方式
		{name:'status'},     //状态
		{name:'startDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},  //时间段-起始时间
		{name:'endDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},    //时间段-结束时间
		{name:'startLoc'},  //库位段-起始库位
		{name:'endLoc'},    //库位段-结束库位
		{name:'startSku'},  //商品段-起始商品
		{name:'endSku'},    //商品段-结束商品
        {name:'addDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'}, //添加日期
        {name:'addWho'}, //添加人
        {name:'editDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},//修改日期
        {name:'editWho'}  //修改人
    ],
    idProperty: 'id'
});


Ext.define('CountDetail', {
    extend: 'Ext.data.Model',
    fields: [
            {name:'id'},
            {name:'countKey'},
            {name:'lineNumber'},
            {name:'storerKey'},
            {name:'sku'},
            {name:'lot'},
            {name:'loc'},
            {name:'gid'},
            {name:'firstQty'},
            {name:'firstQtyDif'},
            {name:'secondQty'},
            {name:'secondQtyDif'},
            {name:'notes'},
            {name:'dstatus'},
            {name:'udf1'},
            {name:'udf2'},
            {name:'udf3'},
            {name:'udf4'},
            {name:'udf5'},
            {name:'packKey'},
            {name:'name'},   //内部连接从sku表获取的商品名称            
            {name:'qty'},    //内部连接从countInv表获取的数量
            {name:'addDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
            {name:'addWho'},
            {name:'editDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
            {name:'editWho'}
    ],
    idProperty: 'id'
});

Ext.define('CountResult', {
    extend: 'Ext.data.Model',
    fields: [
            {name:'id'},
            {name:'countKey'},
            {name:'lineNumber'},
            {name:'storerKey'},
            {name:'sku'},
            {name:'lot'},
            {name:'loc'},
            {name:'udf1'},
            {name:'udf2'},
            {name:'udf3'},
            {name:'udf4'},
            {name:'udf5'},
            {name:'gid'},
            {name:'qty'},
            {name:'firstQty'},
            {name:'firstQtyDif'},
            {name:'secondQty'},
            {name:'secondQtyDif'},
            {name:'notes'},
            {name:'name'},   //内部连接从sku表获取的商品名称
            {name:'addDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
            {name:'addWho'},
            {name:'editDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
            {name:'editWho'}
    ],
    idProperty: 'id'
});


//两个grid的定义，两个tab页各一个
Ext.define('Redm.inventory.CountGrid',{
	extend: 'Redm.BaseGrid',
    alias : 'widget.countgrid',
/*    viewConfig : {             //字体变颜色，后续再继续研究
            forceFit : false, 
            enableRowBody : true, 
            getRowClass :function(record, status, p, ds) { 
                var cls = 'white-row'; 
                switch (record.data.STATUS) { 
                    case '0': // 状态为0表示新建状态
                        cls = 'x-grid-record-green';
                        break;
                    case '9': // 状态为9表示关闭状态 
                        cls = 'x-grid-record-yellow'; 
                        break;
                        
                } 
                return cls; 
            } 
        } ,   */
    buildColumns: function(){
        this.columns = [
        	{ header: "货主", dataIndex: 'storerKey', width: 140, sortable: true},
		    { header: "盘库单号", dataIndex: 'countKey', width: 120, sortable: true},
		    { header: "盘库时间", dataIndex: 'effectiveDate', width: 130, sortable: true,renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
		    { header: "状态", dataIndex: 'status', width: 60, sortable: true,
                    renderer:this.rendererStatusFunc
            },
		    { header: "类型", dataIndex: 'type', width: 80, sortable: true,
                    renderer:this.rendererTypeFunc
            },
		    { header: "方式", dataIndex: 'mode', width: 60, sortable: true,
                    renderer:this.rendererMannerFunc
            },
   		    { header: "id", dataIndex: 'id',hidden: true},
   		    { header: "addWho", dataIndex: 'addWho',hidden: true},
   		    { header: "addDate", dataIndex: 'addDate',hidden: true,renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')}
//   		    { header: "editWho", dataIndex: 'editWho',hidden: true},
//   		    { header: "editDate", dataIndex: 'editDate',hidden: true}
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
		this.buildStore(basePath + '/inventory/doQueryCountInfo.action','Count',20);
		this.callParent(arguments);
	},
    
//盘点主表状态解析函数
    rendererStatusFunc:function(value)
        {
            var retValue;
            if(value=='0') retValue='新建';                         //'<font color=#3D8A08>新建</font>'; 字体变颜色，后续再研究 qxue
            else if(value=='9') retValue='关闭';                    //'<font color=#D00076>关闭</font>'; 
            else  retValue=value;
            return retValue;
        },
//盘点主表类型解析函数
    rendererTypeFunc:function(value)
        {
            var retValue;
            if(value=='1') retValue='静态盘点';
            else if(value=='2') retValue='循环盘点';
            else if(value=='3') retValue='动态盘点';
            else  retValue=value;
            return retValue;
        },

//盘点主表方式解析函数
    rendererMannerFunc:function(value)
        {
            var retValue;
            if(value=='1') retValue='盲盘';
            else if(value=='2') retValue='明盘';
            else  retValue=value;
            return retValue;
        }
        
});

//盘点明细表

Ext.define('Redm.inventory.CountDetailGrid',{
	extend: 'Redm.BaseGrid',
    alias : 'widget.countdetailgrid',
    autoLoad:false,
    selModel: Ext.create('Ext.selection.CheckboxModel'),    
    buildColumns: function(){
        this.columns = [
            { header: "行号",dataIndex:'lineNumber',width: 45,sortable: true},
            { header: "商品", dataIndex: 'sku', width: 120,sortable: true	},
			{ header: "商品名称", dataIndex: 'name', width: 140, sortable: false},  //内部连接从sku表获取的商品名称
//            { header: "批次", dataIndex: 'lot', width: 120, sortable: true},
            { header: "库位", dataIndex: 'loc', width: 120, sortable: true},
            { header: "状态", dataIndex: 'dstatus', width: 120, sortable: true,
                    renderer:this.rendererStatusFunc
            },
//            { header: "批属性04", dataIndex: 'lottable04', width: 120, sortable: true},
//            { header: "批属性11", dataIndex: 'lottable11', width: 120, sortable: true},
            { header: "自定义1", dataIndex: 'udf1', width: 120, sortable: true},
            { header: "自定义2", dataIndex: 'udf2', width: 120, sortable: true},
            { header: "自定义3", dataIndex: 'udf3', width: 120, sortable: true},
//            { header: "自定义4", dataIndex: 'udf4', width: 120, sortable: true},
//            { header: "自定义5", dataIndex: 'udf5', width: 120, sortable: true},
            { header: "包装", dataIndex: 'packKey', width: 120, sortable: true},
            { header: "库存数量", dataIndex: 'qty', width: 120, sortable: true},   
//            { header: "GID", dataIndex: 'gid', width: 120, sortable: false},
            { header: "初盘数量", dataIndex: 'firstQty', width: 100, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
//            { header: "初盘差异", dataIndex: 'firstQtyDif', width: 100, sortable: false},
            { header: "复盘数量", dataIndex: 'secondQty', width: 100, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
//            { header: "复盘差异", dataIndex: 'secondQtyDif', width: 100, sortable: false},
   		    { header: "id", dataIndex: 'id',sortable: true, hidden: true},
  		    { header: "addWho", dataIndex: 'addWho',hidden: true},
		    { header: "addDate", dataIndex: 'addDate', hidden: true}
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
		this.buildStore(basePath + '/inventory/doQueryCountDetail.action','CountDetail',20);
		this.callParent(arguments);
	},
    //盘点明细表表状态解析函数
    rendererStatusFunc:function(value)
        {
            var retValue;
            if(value=='1') retValue='初盘';
            else if(value=='2') retValue='复盘';
            else if(value=='3') retValue='关闭';
            else  retValue=value;
            return retValue;
        }
});

//盘点结果表，动态的grid
Ext.define('Redm.inventory.CountResultGrid',{
	extend: 'Redm.BaseGrid',
    alias : 'widget.countresultgrid',
    autoLoad:false,
    selModel: Ext.create('Ext.selection.CheckboxModel'),    
    buildColumns: function(){
        this.columns = [
            { header: "行号",dataIndex:'id',width: 45,sortable: false},     //借用ID字段显示动态生成的行号(序号)
            { header: "商品", dataIndex: 'sku', width: 120,sortable: true	},
			{ header: "商品名称", dataIndex: 'name', width: 140, sortable: false},  //表中无此字段
//          { header: "批次", dataIndex: 'lot', width: 120, sortable: false},
            { header: "库位", dataIndex: 'loc', width: 120, sortable: true},
//          { header: "批属性04", dataIndex: 'lottable04', width: 120, sortable: true},
//          { header: "批属性11", dataIndex: 'lottable11', width: 120, sortable: true},
            { header: "自定义1", dataIndex: 'udf1', width: 120, sortable: true},
            { header: "自定义2", dataIndex: 'udf2', width: 120, sortable: true},
            { header: "自定义3", dataIndex: 'udf3', width: 120, sortable: true},
//          { header: "自定义4", dataIndex: 'udf4', width: 120, sortable: true},
//          { header: "自定义5", dataIndex: 'udf5', width: 120, sortable: true},
//          { header: "GID", dataIndex: 'gid', width: 120, sortable: false},
            { header: "库存", dataIndex: 'qty', width: 80, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},   //CountInv表中的字段
            { header: "初盘数量", dataIndex: 'firstQty', width: 100, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
            { header: "初盘差异", dataIndex: 'firstQtyDif', width: 100, sortable: false,renderer:Ext.util.Format.numberRenderer('0.000')},
            { header: "复盘数量", dataIndex: 'secondQty', width: 100, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
            { header: "复盘差异", dataIndex: 'secondQtyDif', width: 100, sortable: false,renderer:Ext.util.Format.numberRenderer('0.000')},
   		    { header: "id", dataIndex: 'id',hidden: true}
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
		this.buildStore(basePath + '/inventory/doQueryCountResult.action','CountResult',20);
		this.callParent(arguments);
	}
    
});

//导出调用的方法 暂时没有用
/*function exportButtonClick (id){
	 window.location.href = basePath+'/inventory/doExportCountDifference.action?countKey='+id;
};*/

Ext.define('Redm.inventory.CountManager',{   
	extend: 'Ext.tab.Panel',
    alias : 'widget.countmanager',    //主panel，继承自 Ext.tab.Panel
    layout: 'border',
    title:'库存盘点',
    tabPosition: 'bottom',
    initComponent: function(){
        this.createContextMenuItem();
    	this.items = [this.createPt1Panel(),this.createPt2Panel()];
        this.callParent(arguments);
    },

    
    //第一个tab页上查询按钮对应的方法
    onSelect: function(){
    	this.countgrid.getStore().load();
    },
    
    //第一个tab页面上删除按钮，删除主表记录和对应的明细表记录
    onGoDelete: function(){
    	var me = this;
    	var records = me.countgrid.getSelectionModel().getSelection(); 
    	if(records == ""){
    		MessageBox.error('错误提示','请选择删除的数据！');
    		return;
    	}else{
    		var record = records[0].getData();
    		Ext.MessageBox.confirm('询问提示', '确定要删除所选信息吗？', 
				function(btn){
					if(btn == 'yes'){
						Ext.Ajax.request({
						    url: basePath + '/inventory/doDeleteCount.action',
						    params: {
						    	countKey: record.countKey
						    },
						    success: function(response){
						        var text = Ext.decode(response.responseText);
						        var success = text.success;
						        MessageBox.show(success, text.json.msg);
						        me.countgrid.getStore().load();
			                	me.pt2pn1topform.getForm().reset();
						        me.detailgrid.getStore().load();
						    }
						});
					}
				}
			); 
    	}
    },
    
    
    //第一个tab页面上关闭按钮，关闭主表记录，状态设置为9
    onClose: function(){
    	var me = this;
    	var records = me.countgrid.getSelectionModel().getSelection(); 
    	if(records == ""){
    		MessageBox.error('错误提示','请选择关闭的数据！');
    		return;
    	}else{
    		var record = records[0].getData();
    		Ext.MessageBox.confirm('询问提示', '确定要关闭所选信息吗？', 
				function(btn){
					if(btn == 'yes'){
						Ext.Ajax.request({
						    url: basePath + '/inventory/doCloseCount.action',
						    params: {
						    	countKey: record.countKey
						    },
						    success: function(response){
						        var text = Ext.decode(response.responseText);
						        var success = text.success;
						        MessageBox.show(success, text.json.msg);
						        me.countgrid.getStore().load();
						        me.detailgrid.getStore().load();
						    }
						});
					}
				}
			); 
    	}
    },
       
    
    
    //第一个tab页面上重置按钮，查询form清空
    onReset: function(){
    	this.topform.getForm().reset();
    },
    
    //第一个tab页面的创建按钮，第二个页面的创建也用这个方法
    onCreate: function(){
        var me=this;
    	this.setActiveTab(1);
        this.pt2pn1topform.getForm().reset();
        this.pt2pn2f1tabpanel.setActiveTab(0);

        this.pt2pn1f2form.getForm().reset();
        
        //设置countkey只读
		me.pt2pn1topform.getForm().findField('storerKey').setReadOnly(false);//设置货主只读

        //明细表grid重新加载，清空明细表grid，必须放在最后，设置countKey后在加载
		me.detailgrid.getStore().removeAll();            

        //开启存盘和生成盘点数据功能
        Ext.getCmp('saveBtn').enable();
        Ext.getCmp('createBtn').enable();
        Ext.getCmp('addDetailBtn').enable();
        Ext.getCmp('delDetailBtn').enable();
                        
        //计划在创建时自动加载countKey
        //规则目前写死，后续考虑修改
        var nameCode='COUNTNUM';
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
                        this.pt2pn1topform.getForm().findField('countKey').setValue(value);   
//                        this.pt2pn1f2form.getForm().findField('lineNumber').setValue('1');     //创建countKey时，设置行号，暂不设置
                        var timeValue=Ext.util.Format.date(new Date(),"Y-m-d H:i:s")              //填写创建时间
                        this.pt2pn1topform.getForm().findField('effectiveDate').setValue(timeValue); 
                    }
                },scope:this
            }
	    });       
        
        //新的countKey，设置行号为1
        //行号改为保存时产生 qxue 2013-12-7
     //   this.pt2pn1f2form.getForm().findField('lineNumber').setValue('1'); 
        
    },
    
    
    //第二个tab页面的删除按钮，从form获取countKey，删除主表和相关的明细表记录
    //本方法暂时还没有启用
    onDelete: function(){
    	var me = this;
   /* 	var values = me.pwform.getForm().getValues();
    	var pwsKey = values.putawayStrategyKey;
    	if(pwsKey == ''){return}
		Ext.MessageBox.confirm('询问提示', '确定要删除所选信息吗？', 
			function(btn){
				if(btn == 'yes'){
					Ext.Ajax.request({
					    url: basePath + '/inventory/deletePutawayStrategy.action',
					    params: {
					    	putawayStrategyKey: pwsKey
					    },
					    success: function(response){
					        var text = Ext.decode(response.responseText);
					        var success = text.success;
					        MessageBox.show(success, text.json.msg);
					        me.detailgrid.getStore().load();
			    			me.pwform.getForm().reset();
			            	me.pt2pn1topform.getForm().reset();
			            	me.otherform.getForm().reset();
					    }
					});
				}
			}
		); */
    },
    
    //添加明细表记录的方法，由明细表grid内部的方法调用
    onAddDetail: function(){
    	var me = this;
    	me.pt2pn1f2form.getForm().reset();   //清空明细输入form
/*     行号改为保存时自动产生 
        //创建行号
        this.lineNoStore = Ext.create('Ext.data.Store', {
	        remoteSort: true,
            autoLoad: true,
            fields: [
                        {name:'id'},
                        {name:'countKey'},
                        {name:'lineNumber'}
            ],
	        proxy: {
	            type: 'ajax',
                //添加明细时，根据countKey查找。如果找不到，设置为1
	            url: basePath + '/inventory/doCreateCountDetailLineNumber.action?countKey='+this.pt2pn1topform.getForm().findField('countKey').getValue(),
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
                        this.pt2pn1f2form.getForm().findField('lineNumber').setValue(value); 
                    }
                    else
                    {
                        this.pt2pn1f2form.getForm().findField('lineNumber').setValue('1'); 
                    }
                },scope:this
            }
	    });   
	    */   
        
    },
    
    //删除明细表多条记录的方法，由明细表grid内部的方法调用
    onMultiDeleteDetail: function(){
		var me = this;
		var records = me.detailgrid.getSelectionModel().getSelection();
		if(records == ""){
			MessageBox.error("错误提示","请选择要删除的数据！");
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
                        url: basePath + '/inventory/doMultiDeleteCountDetail.action',
                        params: {
                            ids: ids
                        },
                        success: function(response){
                            var text = Ext.decode(response.responseText);
                            var success = text.success;
                            MessageBox.show(success, text.json.msg);
                            me.detailgrid.getStore().load();
                        }
                    });
                }
            }
        );  
    },
        
    //盘点结果查询按钮，在resultgrid上显示结果
    onQueryResult:function(){
        this.resultgrid.getStore().load();
        this.pt2pn2f1tabpanel.setActiveTab(1);
    },


    createContextMenu:function(e){

    },
    createContextChildMenu:function(e){

    },
    
    
    createPt1Panel: function(){    //创建第一个tab页，继承自 Ext.panel.Panel
    	var me = this;
    	this.pt1panel = Ext.create('Ext.panel.Panel',{
    		layout: 'border',
    		border: false,
    		title: '基本',
    		items:[this.createCountGrid(),this.createTopPanel()]
    	});
    	return this.pt1panel;
    },
    
    
    //创建主表grid
    createCountGrid: function(){     // 创建第一个tab页的grid
    	var me = this;
    	this.countgrid = Ext.create('widget.countgrid',{
    		region: 'center',
    		listeners: {
    			itemdblclick: function(grid,record){
    				me.setActiveTab(1);
                    me.pt2pn2f1tabpanel.setActiveTab(0);
    				me.pt2pn1topform.getForm().loadRecord(record);
    				me.pt2pn1topform.getForm().findField('storerKey').setReadOnly(true);//设置货主只读
                    var status=me.pt2pn1topform.getForm().findField('status').getValue();
                    
                    if('9'==status)  //关闭状态，全部是只读
                    {
                        //采用禁止存盘方式，不能修改，也不能生成盘点数据
                        Ext.getCmp('saveBtn').disable();
                        Ext.getCmp('createBtn').disable();
                        Ext.getCmp('addDetailBtn').disable();
                        Ext.getCmp('delDetailBtn').disable();
                    }
                    else
                    {     //非关闭状态，可以编辑

                        //取消禁止存盘，可以修改，可以生成盘点数据
                        Ext.getCmp('saveBtn').enable();
                        Ext.getCmp('createBtn').enable();
                        Ext.getCmp('addDetailBtn').enable();
                        Ext.getCmp('delDetailBtn').enable();
                    }
    				me.detailgrid.getStore().load();     //双击显示明细表记录
                    
    			}
    		}
    	});
    	this.countgrid.getStore().on('beforeload',function(){    //启动时查询，加载的内容
    		var params = this.countgrid.getStore().getProxy().extraParams;
    		var record = me.topform.getForm().getValues();

    		var storerKey = record.storerKey; 
    		var countKey = record.countKey; 
    		var effectiveDateStart = record.effectiveDateStart; 
    		var effectiveDateEnd = record.effectiveDateEnd; 
    		var type = record.type; 
    		var mode = record.mode; 
    		var status = record.status; 

			delete params.storerKey;
			delete params.countKey;
			delete params.effectiveDateStart;
			delete params.effectiveDateEnd;
			delete params.type;
			delete params.mode;
			delete params.status;

			if(storerKey) params.storerKey = storerKey;
			if(countKey) params.countKey = countKey;
			if(effectiveDateStart) params.effectiveDateStart = effectiveDateStart;
			if(effectiveDateEnd) params.effectiveDateEnd = effectiveDateEnd;
			if(type) params.type = type;
			if(mode) params.mode = mode;
			if(status) params.status = status;
            
    	},this);
    	return this.countgrid;
    },
    
    
    createTopPanel: function(){  //创建第一页的TOP panel   继承自 Ext.panel.Panel 
		var me = this;
		this.toppanel = Ext.create('Ext.panel.Panel',{
			region: 'north',
			border:false,
			height: 120,
			layout: 'border',
			items:[me.createTopForm(),me.createBtnPanel()]     //创建topform 和 btn panel
		});
		return this.toppanel;
	},
    
    
    //第一个panel上的 查询面板
	createTopForm: function(){
		var me = this;
		this.topform = Ext.create('Ext.form.Panel',{   //创建Top form  继承自 Ext.form.Panel 
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
                              margin: '3 2 3 2'
                        },
                        items: [
                            {
                                //xtype: 'storercombo',    //这里并没有“货主”这label，是如何显示出来的？
                                xtype: 'textfield',
                                fieldLabel: '货主',
                                listeners:{
                                    blur:function(txt){
                                      txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                    }
                                },                                    
                                name:'storerKey',
                                labelWidth : 50,
                                width:180
                            },
                            {
                                xtype: 'textfield',
                                name: 'countKey',
                                fieldLabel: '盘库单号',
                                labelWidth : 60,
                                width:180
                            },
                            {
                                xtype:'datefield',
                                name: 'effectiveDateStart',
                                fieldLabel: '盘库时间',
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
                            margin: '3 2 3 2',
                            xtype: 'textfield'
                        },
                        items: [
                            {
                                name: 'status',
                                fieldLabel: '状态',
                                labelWidth : 50,
                                xtype:'combobox',
                                displayField: 'text',
                                valueField: 'value',
                                store:Ext.create('Ext.data.Store', 
                                        {
                                            fields: ['text','value'],
                                            data: [{text:'新建',value:'0'},{text:'关闭',value:'9'}]
                                        }
                                    ),                                
                                width:180
                            },                            
                            {
                                name: 'type',
                                fieldLabel: '类型',
                                labelWidth : 60,
                                xtype:'codecombo',
                                codeType:'COUNTTYPE',                                
                                width:180
                            },
                            {
                                name: 'mode',
                                fieldLabel: '方式',
                                labelWidth : 80,
                                xtype:'codecombo',
                                codeType:'COUNTMODE',                                
                                width:210
                            },
                            {
                                xtype:'button',
                                width:100,
                                margin: '3 2 3 28',
                                text : "查询",
                                iconCls: 'icon-search',
                                scope : this,
                                handler: me.onSelect
                            },
                            {
                                xtype:'button',
                                width:100,
                                margin: '3 2 3 23',
                                text : "重置",
                                iconCls: 'icon-reset',
                                scope : this,
                                handler: me.onReset
                            }

                        ]
                        
                    }               
            ]
	    })//end for Ext.create
		return this.topform;
	},   //end  createTopForm
	
	
	//第一个panel上的 按钮面板
	createBtnPanel: function(){
    	var me = this;
    	this.btnpanel = Ext.create('Ext.form.Panel',{  //  创建btn panel ，继承自 Ext.form.Panel
    		region: 'center',
    		frame: true,
			layout: 'anchor',
    		defaults: {
    			xtype: 'button',
    			margin: '5 0 0 5'
    		},

            items:[
            //暂时不支持分隔符，也没有加上图标。
                {
                    itemId: 'createToolbar',
                	iconCls: 'icon-create',
                    text: '创建',
                    handler: me.onCreate, 
                    scope: this
                },
	            {
	            	itemId:'deleteToolbar',
                	iconCls: 'icon-delete',
	                text: '删除',
	            //    disabled: true,   //这是按钮禁用的方法
	                handler: this.onGoDelete,  //需要新增方法
	                scope: this
	            },
                {
	            	itemId:'closeToolbar',
                    text : "盘点关闭",
                    iconCls: 'icon-lock',
                    handler: me.onClose,
                    scope : this
                }                
            ]

    	});
    	return this.btnpanel;
    },
    
    // 以上第一个tab页创建好了，下边是创建第二个tab页
    
    
    createPt2Panel: function(){
    	var me = this;
    	this.pt2panel = Ext.create('Ext.panel.Panel',{    //创建第二个tab页，继承自  Ext.panel.Panel
    		layout: 'border',
    		border: false,
    		title: '详细',
    		items:[this.createPt2Pn1Panel(),this.createPt2Pn2Panel()]  
    	});
    	return this.pt2panel;
    },

    //第二个tab上部的panel，north位置
    createPt2Pn1Panel: function(){
    	this.pt2pn1panel = Ext.create('Ext.panel.Panel',{
    		region: 'north',
    		layout: 'border',
            height:200,
    		items: [this.createPt2Pn1BtnPanel(),this.createPt2Pn1TopForm(),this.createPt2Pn1DetailBtnPanel()]
    	});
    	return this.pt2pn1panel;
    },
    
    	//第二tab页面 上部panel的 按钮面板
	createPt2Pn1BtnPanel: function(){
    	var me = this;
    	this.pt2pn1btnpanel = Ext.create('Ext.form.Panel',{  //  创建btn panel ，继承自 Ext.form.Panel
    		region: 'north',
    		frame: true,
            height:40,
    		defaults: {
    			xtype: 'button',
    			margin: '5 0 0 5'
    		},
            items:[
                {
                    text: '创建',
                    iconCls: 'icon-create',
                    scope:this,
                    handler: this.onCreate
                },
                {
                    text: '保存',
                    id:'saveBtn',
                    iconCls: 'icon-save',
                    //disabled:true,
                    scope:this,
                    handler: this.onSaveCountItems
                },
                {
                    xtype:'button',
                    text: '生成',
                    id:'createBtn',
                    iconCls: 'icon-edit',
                    scope:this,
                    handler: this.onCreateCountItems
                }
            ]

    	});
    	return this.pt2pn1btnpanel;
    },
    
    
    createPt2Pn1TopForm: function(){
        var me=this;
    	this.pt2pn1topform = Ext.create('Ext.form.Panel',{      //创建tab页，继承自Ext.form.Panel
			xtype:'form',
    		region: 'center',       //add for one tab  一个tab不需要上一级方法，直接用form，需要增加几个属性配置
			frame:true,
			border: false,
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
                            {
                                name: 'countKey',
                                fieldLabel: '盘库单号',
 //                               width:  200,
                                readOnly:true,
                                allowBlank: false
                            }, 
                            {
                               // xtype: 'storercombo',
                                name:'storerKey',
                                fieldLabel:'货主',
                                labelWidth: 50,
                                width:  180,
                                allowBlank: false,
                                listeners:{
                                    //货主是否存在由sku表做保证，这里不再单独校验
                                    blur: function(txt){
                                        //输入参数，鼠标离开后见检查该货主是否存在
                                        storerKeyValue=Ext.util.Format.uppercase(txt.getValue());
                                        txt.setValue(storerKeyValue);
                                        skuValue=me.pt2pn1f2form.getForm().findField('sku').getValue();
                                        
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
                                                    //此处再判断与sku的校验
                                                    if((''!=skuValue)&&(''!=storerKeyValue))
                                                    {
                                                        Ext.Ajax.request({
                                                            url: basePath + '/support/doValidateSkus.action',
                                                            params: {
                                                                sku:skuValue,
                                                                storerKey:storerKeyValue
                                                            },
                                                            success: function(response){    //failure属于连不上服务器的情况，后续补充
                                                                var text = Ext.decode(response.responseText);
                                                                var success = text.success;
                                                                if(0 == text.json.data.length)   //storerKey与sku唯一，应该只有一条记录
                                                                {
                                                                    //商品与货主不存在
                                                                    Ext.Msg.alert("错误提示", '货主或者商品错误')
                                                                    me.pt2pn1f2form.getForm().findField('sku').setValue('');
                                                                }
                                                            }
                                                        })
                                                    }                                                
                                                }
                                                else
                                                {
                                                    Ext.Msg.alert("错误提示", '货主不存在')
                                                    me.pt2pn1topform.getForm().findField('storerKey').setValue('');
                                                }
                                            }
                                        })
                                    }
                                }                                
                            },
/*                            {
                                name: 'type',
                                xtype:'combobox',
                                fieldLabel: '类型',
                                margin:'5 0 0 23',     //调整位置，与上边的对齐
                                labelWidth: 50,
                                width:  150,
                                displayField: 'text',
                                valueField: 'value',
                                store:Ext.create('Ext.data.Store', 
                                        {
                                            fields: ['text','value'],
                                            data: [{text:'动态盘库',value:'动态盘库'},{text:'静态盘库',value:'静态盘库'}]
                                        }
                                    ),
                                value: '动态盘库',
                                forceSelection: true
                            },*/
                            {     //使用数据字典设置盘点类型
                                name: 'type',
                                xtype:'codecombo',
                                codeType:'COUNTTYPE',
                                fieldLabel: '类型',
                                margin:'5 0 0 23',     //调整位置，与上边的对齐
                                labelWidth: 50,
                                width:  150,
                                forceSelection: true,
                                allowBlank: false
                                
                            },
/*                            {
                                name: 'mode',
                                xtype:'combobox',
                                fieldLabel: '方式',
                                labelWidth: 50,
                                width:  150,
                                displayField: 'text',
                                valueField: 'value',
                                store:Ext.create('Ext.data.Store', 
                                        {
                                            fields: ['text','value'],
                                            data: [{text:'明盘',value:'明盘'},{text:'盲盘',value:'盲盘'}]
                                        }
                                    ),
                                value: '明盘',
                                forceSelection: true
                            },*/
                            {   //使用数据字典设置盘点方式
                                name: 'mode',
                                xtype:'codecombo',
                                codeType:'COUNTMODE',
                                fieldLabel: '方式',
                                labelWidth: 50,
                                width:  150,
                                forceSelection: true,
                                allowBlank: false
                            },                            
                            {
                                name: 'status',
                                xtype:'combobox',
                                fieldLabel: '状态',
                                labelWidth: 50,
                                width:  150,
                                displayField: 'text',
                                valueField: 'value',
                                store:Ext.create('Ext.data.Store', 
                                        {
                                            fields: ['text','value'],
                                            data: [{text:'新建',value:'0'},{text:'关闭',value:'9'}]
                                        }
                                    ),
                                value: '0',
                                forceSelection: true,
                                readOnly:true
                            },
                            {
                                name: 'id',
                                hidden: true
                            },
                            {
                                name: 'addWho',
                                hidden: true
                            },
                            {
                                name:'addDate',
                                xtype:'datefield',
                                format:'Y-m-d H:i:s',
                                hidden: true
                            }
                        ]
                    },
                    {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        defaults: {
                            labelWidth: 70,
                            margin: '5 0 0 5',
                            xtype: 'textfield'
                        },
                        items: [
                            {
                                xtype:'label',
                                text:'时间范围:'
                            },
                            {
                                xtype:'datefield',
                                format:'Y-m-d H:i:s',
                                margin:'5 0 0 23',     //调整位置，与上边的对齐
                                name: 'startDate',
                                allowBlank: false,
                                value:Ext.util.Format.date(Ext.Date.add(new Date(),Ext.Date.DAY,-1),"Y-m-d")  //昨天的时间
                            },
                            {
                                xtype:'label',
                                text:'->'
                            },                            
                            {
                                xtype:'datefield',
                                format:'Y-m-d H:i:s',
                                name: 'endDate',
                                allowBlank: false,
                                value:Ext.util.Format.date((new Date()),"Y-m-d")
                            },
                            {
                                xtype:'label',
                                margin:'5 0 0 23',     //调整位置，与上边的对齐
                                text:'库位范围:'
                            },
                            {
                                name: 'startLoc',
                                width:144,
                                listeners:{
                                        blur:function(txt){
                                          txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                        }
                                    }
                            },
                            {
                                xtype:'label',
                                text:'->'
                            },                              
                            {
                                name: 'endLoc',
                                width:144,
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
                            labelWidth: 70,
                            margin: '5 0 0 5',
 //                           labelAlign: 'top',
                            xtype: 'textfield'
                        },
                        items: [
                            {
                                xtype:'label',
                                text:'商品范围:'
                            },
                            {
                                name: 'startSku',
                                margin:'5 0 0 23',     //调整位置，与上边的对齐
                                width:144,
                                listeners:{
                                    blur:function(txt){
                                        txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                    }
                                }
                            },
                            {
                                xtype:'label',
                                text:'->'
                            },                              
                            {
                                name: 'endSku',
                                width:144,
                                listeners:{
                                        blur:function(txt){
                                          txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                        }
                                    }
                            },
                            {
                                fieldLabel: '创建日期',
                                margin:'5 0 0 23',     //调整位置，与上边的对齐
                                xtype:'datefield',
                                format:'Y-m-d H:i:s',
                                name: 'effectiveDate'
                            }
                            
                        ]
                    },
                    { //这是做什么用的？
                        xtype:'hidden',
                        name : "deleteItems"
                    }
                ]
    	});
        
    	return this.pt2pn1topform;
    },
 
 
      	//第二tab页面 明细表相关的按钮面板。
        //为减少修改量，临时放到pt2pn1 panel上，正常情况下明细表相关的组件应该放到下边的panel上，后续修改时再考虑
	createPt2Pn1DetailBtnPanel: function(){
    	var me = this;
    	this.pt2pn2detailbtnpanel = Ext.create('Ext.form.Panel',{  //  创建btn panel ，继承自 Ext.form.Panel
            xtype:'form',
    		region: 'south',
    		frame: true,
			border: false,
            layout: 'hbox',
            height:35,
    		defaults: {
                xtype: 'button'
    //			margin: '5 0 0 5'
    		},
            items:[
                {
                    xtype: 'button',
                    iconCls: 'icon-create',
                    id:'addDetailBtn',
                    text: '添加',
                    scope: this,
                    handler: this.onAddDetail
                },
                {
                    xtype: 'button',
                    iconCls: 'icon-save',
                    text: '保存明细',
                    scope: this,
                    handler: this.onSaveDetail
                },
                {
                    xtype: 'button',
                    iconCls: 'icon-save',
                    text: '修改明细',
                    scope: this,
                    handler: this.onAmendDetail
                },
                {
                    xtype: 'button',
                    iconCls: 'icon-delete',
                    id:'delDetailBtn',
                    text: '删除',
                    scope: this,
                    handler: this.onMultiDeleteDetail
                },
                {
                    xtype: 'button',
                    iconCls: 'icon-search',
                    text: '查询',
                    scope: this,
                    handler: this.onQueryResult      //查询盘点结果的按钮
                },
                {
                    name: 'FirstCount',
                    xtype:'combobox',
                    fieldLabel: '初盘显示',
                    labelWidth:60,
                    width:150,
                    displayField: 'text',
                    valueField: 'value',
                    store:Ext.create('Ext.data.Store', 
                        {
                            fields: ['text','value'],
                            data: [{text:'全部',value:'2'},{text:'差异为0',value:'0'},{text:'差异不为0',value:'1'}]
                        }
                    ),
                    value: '2',
                    forceSelection: true
                },                
                {
                    name: 'SecondCount',
                    xtype:'combobox',
                    fieldLabel: '复盘显示',
                    labelWidth:60,
                    width:150,
                    displayField: 'text',
                    valueField: 'value',
                    store:Ext.create('Ext.data.Store', 
                        {
                            fields: ['text','value'],
                            data: [{text:'全部',value:'2'},{text:'差异为0',value:'0'},{text:'差异不为0',value:'1'}]
                        }
                    ),
                    value: '2',
                    forceSelection: true
                },   
                this.printAction   //相当于一个按键
            ]
    	});
    	return this.pt2pn2detailbtnpanel;
    },

    //第二个panel上的下部的panel，包括明细表grid和明细表输入查看的form 
    createPt2Pn2Panel: function(){
    	this.pt2pn2panel = Ext.create('Ext.panel.Panel',{
    		region: 'center',
    		layout: 'border',
    		items: [this.createDetailGrid(),this.createPt2Pn1F2Form()]
    	});
    	return this.pt2pn2panel;
    },
    
    createPt2Pn2Panel: function(){
    	this.pt2pn2panel = Ext.create('Ext.panel.Panel',{
    		region: 'center',
    		layout: 'border',
    		items: [this.createPt2Pn2F1TabPanel(),this.createPt2Pn1F2Form()]
    	});
    	return this.pt2pn2panel;
    },
    
    createPt2Pn2F1TabPanel: function(){
    	this.pt2pn2f1tabpanel = Ext.create('Ext.tab.Panel',{
    		region: 'center',
    		items: [this.createDetailGrid(),this.createResultGrid()]
    	});
    	return this.pt2pn2f1tabpanel;
    },    
    
    //第二个panel上的下部的明细表grid
    createDetailGrid: function(){
    	var me = this;
    	this.detailgrid = Ext.create('widget.countdetailgrid',{
            title:'明细',
    		listeners: {
    			itemclick: function(grid,record){
                    me.pt2pn1f2form.getForm().reset();
    				me.pt2pn1f2form.getForm().loadRecord(record);
    			}
    		}
    	});
        
        //为了获取toolbar的参数，beforeload方法放在这里定义。countKey等查询参数，需要先用 father来获取form，
    	this.detailgrid.getStore().on('beforeload',function(){
    		var params = this.detailgrid.getStore().getProxy().extraParams;
    		var record = this.pt2pn1topform.getForm().getValues();
    		var countKey = record.countKey; 
			delete params.countKey;
			if(countKey) params.countKey = countKey;
            },this);        
                
    	return this.detailgrid;
    },
    
    //第二个panel上的下部的明细表grid
    createResultGrid: function(){
    	var me = this;
    	this.resultgrid = Ext.create('widget.countresultgrid',{
            title:'盘点结果'
    	});
        
    	this.resultgrid.getStore().on('beforeload',function(){
    		var params = this.resultgrid.getStore().getProxy().extraParams;
    		var record = this.pt2pn1topform.getForm().getValues();
    		var countKey = record.countKey; 
			delete params.countKey;
			if(countKey) params.countKey = countKey;

	        var queryValues = me.pt2pn2detailbtnpanel.getForm().getFieldValues();
            if(queryValues){

	            var firstDisplay = queryValues.FirstCount;
	            var secondDisplay = queryValues.SecondCount; 
//                console.log(firstDisplay);
//                console.log(secondDisplay);
	        	delete params.firstDisplay;
	        	delete params.secondDisplay;
	        	if(firstDisplay) params.firstDisplay = firstDisplay;
	        	if(secondDisplay) params.secondDisplay = secondDisplay;
	        }
        },this);        
                
    	return this.resultgrid;
    },
    
    //底部右边面板
    createPt2Pn1F2Form: function(){
        var me=this;
        var myStore=Ext.create('Ext.data.Store', {
                                autoLoad: false,   //这里必须先load，否则下拉时再load一次，之前加的参数查询结果就被覆盖了。
                                fields: [
                                    {name:'description'},
                                    {name:'uomCode'}
                                ],
                                proxy: {
                                    type: 'ajax',
                                    url: basePath + '/support/doQuerySkuPack.action',    //这里不加查询参数
                                    reader: {type: 'json',root: 'json.data',totalProperty: 'json.totalCount'},
                                    actionMethods: { read: 'POST' },
                                    simpleSortMode: true
                                }
                                //mode:'remote',    //没有看到作用
                            });        

        this.pt2pn1f2form = Ext.create('Ext.form.Panel',{
    		region: 'east',
    		width: 360,
    		split: true,
			collapsible: true,
    		border: true,
    		frame: true,
    		defaults: {
    			xtype: 'fieldcontainer',
    			margin: '5 0 0 5',
    			frame: true
    		},
    		items: [
        		{
    				layout: 'hbox',
    				defaults: {
    					xtype: 'textfield',
    					margin: '5 0 0 5',
    					labelWidth: 40
    				},
    				items: [
        				{
        					name: 'lineNumber',
        					fieldLabel: '行号',
                            readOnly:true,
                            width: 140
    				    },
        				{   //明细表状态
        					name: 'dstatus',
        					fieldLabel: '状态',
                            width: 140,
                            xtype:'codecombo',
                            codeType:'COUNTSTATUS',
                            value:'1',
                            allowBlank:false
    				    },                        
        				{
        					name: 'id',
                            hidden: true
    				    },
                        {
                            name: 'addWho',
                            hidden: true
                        },
                        {
                            name: 'addDate',
                            xtype:'datefield',
                            format:'Y-m-d H:i:s',
                            hidden: true
                        }                        
    				]
    			},
    /*    		{
    				layout: 'hbox',
    				defaults: {
    					xtype: 'textfield',
    					margin: '5 0 0 5',
    					labelWidth: 60,
    				},
    				items: [
        				{   //明细表状态
        					name: 'dstatus',
        					fieldLabel: '状态',
                            width: 200,
                            xtype:'codecombo',
                            codeType:'COUNTSTATUS',
                            value:'1'
    				    }
    				]
    			},   */             

    			{
    				layout: 'hbox',
    				defaults: {
    					xtype: 'textfield',
    					margin: '5 0 0 5',
    					labelWidth: 40
    				},
    				items: [
        				{
        					name: 'sku',
        					fieldLabel: '商品',
                            width: 140,
                            allowBlank: false,     //不生效，原因待查 qxue
                            listeners:{
                                blur: function(txt){
                                    //输入参数，鼠标离开后见检查该商品是否存在
                                    skuValue=Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(skuValue);
                                    storerKeyValue=me.pt2pn1topform.getForm().findField('storerKey').getValue();
                                    if((''!=skuValue)&&(''!=storerKeyValue))
                                    {
                                        Ext.Ajax.request({
                                            url: basePath + '/support/doValidateSkus.action',
                                            params: {
                                                sku:skuValue,
                                                storerKey:storerKeyValue
                                            },
                                            success: function(response){    //failure属于连不上服务器的情况，后续补充
                                                var text = Ext.decode(response.responseText);
                                                var success = text.success;
                                                if(0!= text.json.data.length)   //storerKey与sku唯一，应该只有一条记录
                                                {
                                                    me.pt2pn1f2form.getForm().findField('name').setValue(text.json.data[0].name);
                                                    me.pt2pn1f2form.getForm().findField('lottable11').setValue(text.json.data[0].packKey);
                                                }                                                
                                                else   //storerKey与sku唯一，应该只有一条记录
                                                {
                                                    me.pt2pn1f2form.getForm().findField('sku').setValue('');
                                                    me.pt2pn1f2form.getForm().findField('lottable11').setValue('');
                                                    Ext.Msg.alert("错误提示", '货主或者商品不存在')
                                                }
                                            }
                                        })
                                    }
                                }                                
                            }                        
    				    },
        				{
        					name:'name',
        					fieldLabel: '名称',
                            width: 140
    				    }                        
    				]
    			},  
                {
    				layout: 'hbox',
    				defaults: {
    					xtype: 'textfield',
    					margin: '5 0 0 5',
    					labelWidth: 60
    				},
    				items: [
        				{
        					name: 'loc',
        					fieldLabel: '库位',
                            allowBlank: false,     //不生效，原因待查 qxue
                            width: 200,
                            listeners:{
                                blur: function(txt){                                    
                                    locValue=Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(locValue);
                                    if(''!=locValue)
                                    {
                                        Ext.Ajax.request({
                                            url: basePath + '/support/doCheckLocExist.action',  
                                            params: {
                                                loc:locValue
                                            },
                                            success: function(response){
                                                var text = Ext.decode(response.responseText);
                                                var status = text.success;
                                                if(false==status)   //false表示没有找到该库位
                                                {
                                                    MessageBox.show(status, text.json.msg);   
                                                    me.pt2pn1f2form.getForm().findField('loc').setValue('');
                                                }
                                            }
                                        });
                                    }                                        
                                }                                 
                            }                            
        				}
    				]
    			},
        		{
    				layout: 'hbox',
    				defaults: {
    					xtype: 'textfield',
    					margin: '5 0 0 5',
    					labelWidth: 60
    				},
    				items: [
        				{
        					name: 'udf1',
        					fieldLabel: '自定义1',
        					allowBlank: false, 
                            width: 200,
                            xtype:'textfield',
                            listeners:{
                                blur:function(txt){
                                    txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }
    				    }
                    ]
    			},       
        		{
    				layout: 'hbox',
    				defaults: {
    					xtype: 'textfield',
    					margin: '5 0 0 5',
    					labelWidth: 60
    				},
    				items: [
        				{
        					name: 'udf2',
        					fieldLabel: '自定义2',
        					allowBlank: false, 
                            width: 200,
                            xtype:'textfield',
                            listeners:{
                                blur:function(txt){
                                    txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }
    				    }
                    ]
    			},                
        		{
    				layout: 'hbox',
    				defaults: {
    					xtype: 'textfield',
    					margin: '5 0 0 5',
    					labelWidth: 60
    				},
    				items: [
        				{
        					name: 'udf3',
        					fieldLabel: '自定义3',
        					allowBlank: false, 
                            width: 200,
                            xtype:'textfield',
                            listeners:{
                                blur:function(txt){
                                    txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }
    				    }
                    ]
    			},                
        		{
    				layout: 'hbox',
    				defaults: {
    					xtype: 'textfield',
    					margin: '5 0 0 5',
    					labelWidth: 60
    				},
    				items: [
        				{
        					name: 'packKey',
        					fieldLabel: '包装',
        					allowBlank: false, 
                            width: 160,
                            xtype:'textfield',
                            listeners: {
                                blur: function(txt){
                                    packKeyValue=Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(packKeyValue);
                                    var uomValue=me.pt2pn1f2form.getForm().findField('uom').getValue();
                                    var uomqtyValue=me.pt2pn1f2form.getForm().findField('uomqty').getValue();
                                    
                                    if(''!=packKeyValue)
                                    {
                                        Ext.Ajax.request({
                                            url: basePath + '/support/doCheckPack.action',
                                            params: {
                                                packKey:packKeyValue
                                            },
                                            success: function(response){    //failure属于连不上服务器的情况，后续补充
                                                var text = Ext.decode(response.responseText);
                                                var success = text.success;
                                                if(0 != text.json.data.length)
                                                {
                                                    //包装存在，则loadstore，查询单位的下拉框。
                                                    myStore.load({params:{packKey:packKeyValue}})
                                                    if((''!=uomValue)&&(''!=packKeyValue))
                                                    {
                                                        Ext.Ajax.request({
                                                            url: basePath + '/support/doQuerySkuPackQty.action',
                                                            params: {
                                                                uomCode:uomValue,   //需要验证这里查询参数是什么？重点关注qxue
                                                                packKey:packKeyValue
                                                            },
                                                            success: function(response){    //failure属于连不上服务器的情况，后续补充
                                                                var text = Ext.decode(response.responseText);
                                                                var success = text.success;
                                                                if(''!= text.json.data || null != text.json.data)
                                                                {
                                                                    var uomEaQty=text.json.data;
                                                                    me.pt2pn1f2form.getForm().findField('qty').setValue(uomqtyValue*uomEaQty);
                                                                }
                                                            }
                                                        })
                                                    }                                                     
                                                }
                                                else
                                                {
                                                    me.pt2pn1f2form.getForm().findField('packKey').setValue('');
                                                    MessageBox.show(false, '包装不存在');
                                                }
                                            }
                                        })
                                    }
                                }                                    
                            }                            
    				    },
        				{
        					name: 'uom',
        					xtype:'combobox',
        					fieldLabel: '单位',
                            labelWidth: 40,
        					allowBlank: false, 
                            width: 120,
                            lastQuery: '',  //解决有时鼠标多点一次的问题
                            store:myStore,
                            displayField: 'description',
                            valueField: 'uomCode',
                            value:'EA',
                            listeners: {   //选中包装后,
                                expand : function(){
                                    packKeyValue=me.pt2pn1f2form.getForm().findField('lottable11').getValue();
                                    myStore.load({params:{packKey:packKeyValue}});
                                },                                
            					blur: function(txt){
                                    var uomValue=txt.getValue();  //需要根据description反查数量，然后再计算 qxue
                                    var packKeyValue=me.pt2pn1f2form.getForm().findField('lottable11').getValue();
                                    var uomqtyValue=me.pt2pn1f2form.getForm().findField('uomqty').getValue();
                                    
                                    if((''!=uomValue)&&(''!=packKeyValue))
                                    {
                                        Ext.Ajax.request({
                                            url: basePath + '/support/doQuerySkuPackQty.action',
                                            params: {
                                                uomCode:uomValue,
                                                packKey:packKeyValue
                                            },
                                            success: function(response){    //failure属于连不上服务器的情况，后续补充
                                                var text = Ext.decode(response.responseText);
                                                var success = text.success;
                                                 if(''!= text.json.data || null != text.json.data)
                                                 {
                                                    var uomEaQty=text.json.data;
                                                    me.pt2pn1f2form.getForm().findField('qty').setValue(uomEaQty*uomqtyValue);
                                                 }
                                            }
                                        })
                                    }
					            }
                            }
        				}                        
    				]
    			}, 
                {
    				layout: 'hbox',
    				defaults: {
    					margin: '5 0 0 5',
    					labelWidth: 60
    				},
    				items: [
        				{
        					name: 'uomqty',
                            labelWidth: 60,
        					fieldLabel: '单位数量',
        					allowBlank: false, 
                            width: 140,
                            xtype: 'numberfield',
                            minValue:0,
                            decimalPrecision:3,
                            listeners: {
        						blur: function(txt){
                                    var uomqtyValue=txt.getValue();
                                    var uomValue=me.pt2pn1f2form.getForm().findField('uom').getValue();
                                    var packKeyValue=me.pt2pn1f2form.getForm().findField('lottable11').getValue();
                                    if((''!=uomValue)&&(''!=packKeyValue))
                                    {
                                        Ext.Ajax.request({
                                            url: basePath + '/support/doQuerySkuPackQty.action',
                                            params: {
                                                uomCode:uomValue,
                                                packKey:packKeyValue
                                            },
                                            success: function(response){    //failure属于连不上服务器的情况，后续补充
                                                var text = Ext.decode(response.responseText);
                                                var success = text.success;
                                                 if(''!= text.json.data || null != text.json.data)
                                                 {
                                                    var uomEaQty=text.json.data;
                                                    me.pt2pn1f2form.getForm().findField('qty').setValue(uomqtyValue*uomEaQty);
                                                    
                                                 }
                                            }
                                        })
                                    }
                                    else
                                    {
                                        me.pt2pn1f2form.getForm().findField('qty').setValue('');
                                        MessageBox.show(false, '请先输入包装和单位');//单位是下拉框，可能有多个空格，不好确定是否为空
                                    }
            					}
                            }                            
        				},
        				{
        					name: 'qty',
                            labelWidth: 60,
                            xtype: 'numberfield',                            
        					fieldLabel: '盘点数量',
        					readOnly:true,
        					allowBlank: false, 
                            width: 160
        				},
                        {
        					name: 'firstQty',
                            xtype: 'numberfield',                            
        					hidden:true
        				},   
        				{
        					name: 'secondQty',
                            xtype: 'numberfield',                            
        					hidden:true
        					
        				}                           
    				]
    			}//,
                /*{
    				layout: 'hbox',
    				defaults: {
    					xtype: 'textfield',
    					margin: '5 0 0 5',
    					labelWidth: 60
    				},
    				items: [
        				{
        					name: 'qty',
        					fieldLabel: '库存数量',
        					readOnly:true,
        					allowBlank: false, 
                            width: 160
        				}
    				]
    			}//,*/
 /*               { //界面上不再显示 qxue
    				layout: 'hbox',
    				defaults: {
    					xtype: 'numberfield',
                        decimalPrecision:3,
    					margin: '5 0 0 5',
    					labelWidth: 60
    				},
    				items: [
        				{
        					name: 'firstQty',
        					fieldLabel: '初盘数量',
                            minValue:0,
                            width: 200
        				}
    				]
    			},*/
/*                {
    				layout: 'hbox',
    				defaults: {
    					xtype: 'textfield',
    					margin: '5 0 0 5',
    					labelWidth: 60
    				},
    				items: [
        				{
        					name: 'firstQtyDif',
        					fieldLabel: '初盘差异',
                            readOnly:true,
                            width: 200
        				}
    				]
    			},*/
/*                {   //界面上不再显示 qxue
    				layout: 'hbox',
    				defaults: {
    					xtype: 'numberfield',
                        decimalPrecision:3,
    					margin: '5 0 0 5',
    					labelWidth: 60
    				},
    				items: [
        				{
        					name: 'secondQty',
        					fieldLabel: '复盘数量',
                            minValue:0,
                            width: 200
        				}
    				]
    			},*/
/*                {    //后续考虑是否把按钮移到这里  qxue
    				layout: 'hbox',
    				defaults: {
    					xtype: 'numberfield',
                        decimalPrecision:3,
    					margin: '5 0 0 5',
    					labelWidth: 60
    				},
    				items: [
                        {
                                xtype:'button',
                                width:100,
                                margin: '3 2 3 28',
                                text : "添加明细",
                                iconCls: 'icon-add',
                                scope : this//,
                                //handler: me.onSelect
                        },
                        {
                                xtype:'button',
                                width:100,
                                margin: '3 2 3 23',
                                text : "保存明细",
                                iconCls: 'icon-save',
                                scope : this//,
                                //handler: me.onReset
                        }
    				]
    			}     */           

/*                {
    				layout: 'hbox',
    				defaults: {
    					xtype: 'textfield',
    					margin: '5 0 0 5',
    					labelWidth: 60
    				},
    				items: [
        				{
        					name: 'secondQtyDif',
        					fieldLabel: '复盘差异',
                            readOnly:true,
                            width: 200
        				}
    				]
    			}*/                
			]
    	});
    	return this.pt2pn1f2form;
    },
    
    
    //保存主表的方法
    onSaveCountItems:function(){
        var me= this;
        var pt2pn1topform = this.pt2pn1topform.getForm();
        
    	var countValues = pt2pn1topform.getValues();
        
        if(!(pt2pn1topform.isValid())) return;
    	Ext.Ajax.request({
		    url: basePath + '/inventory/doSaveCountMasterItem.action',
		    params: {
                //主表记录
		        id: countValues.id,
		        storerKey: countValues.storerKey,
		        countKey: countValues.countKey,
		        type: countValues.type,
		        mode: countValues.mode,
		        status: countValues.status,
                effectiveDate:countValues.effectiveDate,
                addDate:countValues.addDate,
                addWho:countValues.addWho,
                
		        startDate: countValues.startDate,
		        endDate: countValues.endDate,
                
		        startLoc: countValues.startLoc,
		        endLoc: countValues.endLoc,
		        startSku: countValues.startSku,
		        endSku: countValues.endSku
		    },
		    success: function(response){
		        var text = Ext.decode(response.responseText);
		        var success = text.success;
		        MessageBox.show(success, text.json.msg);
    	        me.countgrid.getStore().load();
    	        me.detailgrid.getStore().load();
                me.pt2pn1f2form.getForm().reset();
//		        pt2pn1topform.reset();
		    }
		});
    },
    
    
    //盘点明细表保存方法
    onSaveDetail:function(){
        var me= this;
        var pt2pn1f2form = this.pt2pn1f2form.getForm();
    	var countDetailValues = pt2pn1f2form.getValues();
        
        var countKeyValue=me.pt2pn1topform.getForm().findField('countKey').getValue();
        var storerKeyValue=me.pt2pn1topform.getForm().findField('storerKey').getValue();
        if((''==countKeyValue)||(''==storerKeyValue)) return
        
        //if(!(pt2pn1f2form.isValid())) return;
    	Ext.Ajax.request({
		    url: basePath + '/inventory/doSaveCountDetailItem.action',
		    params: {
                //明细表记录
                countKey:countKeyValue,        //必须有，否则存盘失败
                storerKey:storerKeyValue,  
                detailId:countDetailValues.id,
                sku:countDetailValues.sku,
                name:countDetailValues.name,
                udf1:countDetailValues.udf1,
                udf2:countDetailValues.udf2,
                udf3:countDetailValues.udf3,
                packKey:countDetailValues.packKey,
                lineNumber:countDetailValues.lineNumber,
                dstatus:countDetailValues.dstatus,
                loc:countDetailValues.loc,
                firstQty:countDetailValues.firstQty,
                secondQty:countDetailValues.secondQty,
                addDate:countDetailValues.addDate,
                addWho:countDetailValues.addWho,
                qty:countDetailValues.qty
		    },
		    success: function(response){
		        var text = Ext.decode(response.responseText);
		        var success = text.success;
		        MessageBox.show(success, text.json.msg);
    	        me.countgrid.getStore().load();
    	        me.detailgrid.getStore().load();
                me.pt2pn1f2form.getForm().reset();
		    }
		});
    },
    
    //盘点明细表修改方法
    onAmendDetail:function(){
        var me= this;
        var pt2pn1f2form = this.pt2pn1f2form.getForm();
    	var countDetailValues = pt2pn1f2form.getValues();
        
        var countKeyValue=me.pt2pn1topform.getForm().findField('countKey').getValue();
        var storerKeyValue=me.pt2pn1topform.getForm().findField('storerKey').getValue();
        if((''==countKeyValue)||(''==storerKeyValue)) return
        
        //if(!(pt2pn1f2form.isValid())) return;
    	Ext.Ajax.request({
		    url: basePath + '/inventory/doAmendCountDetail.action',
		    params: {
                //明细表记录
                countKey:countKeyValue,        //必须有，否则存盘失败
                storerKey:storerKeyValue,  
                detailId:countDetailValues.id,
                sku:countDetailValues.sku,
                name:countDetailValues.name,
                udf1:countDetailValues.udf1,
                udf2:countDetailValues.udf2,
                udf3:countDetailValues.udf3,
                packKey:countDetailValues.packKey,
                lineNumber:countDetailValues.lineNumber,
                dstatus:countDetailValues.dstatus,
                loc:countDetailValues.loc,
                firstQty:countDetailValues.firstQty,
                secondQty:countDetailValues.secondQty,
                addDate:countDetailValues.addDate,
                addWho:countDetailValues.addWho,
                qty:countDetailValues.qty
		    },
		    success: function(response){
		        var text = Ext.decode(response.responseText);
		        var success = text.success;
		        MessageBox.show(success, text.json.msg);
    	        me.countgrid.getStore().load();
    	        me.detailgrid.getStore().load();
                me.pt2pn1f2form.getForm().reset();
		    }
		});
    },    
    
    
    //盘点的生成按钮，生成盘点相关数据，写到countInv表中
    onCreateCountItems:function(){
        var me= this;
        var pt2pn1topform = this.pt2pn1topform.getForm();
    	var countValues = pt2pn1topform.getValues();

        //生成未结束前禁用按钮
        Ext.getCmp('createBtn').disable();
        Ext.getCmp('saveBtn').disable();
        
        //先查询是否有该countKey对应的记录
    	Ext.Ajax.request({
		    url: basePath + '/inventory/doQueryCountInv.action',
		    params: {
		        countKey: countValues.countKey
		    },
		    success: function(response){
		        var text = Ext.decode(response.responseText);
		        var success = text.success;
                
                //用字符串表示查询结果 0，表示无记录，1，表示有记录
                //如果有记录，需要确认。如果继续，则删除现有的记录，并重新生成。否则退出不做操作
                if(text.json.msg=='1')   
                {
                    MessageBox.show(false, '已经生成盘点数据，不能重新生成');
/*                    Ext.MessageBox.confirm('询问提示', '有记录，确定要删除并重新生成吗', 
                        function(btn){
                            if(btn == 'yes'){    
                                Ext.Ajax.request({
                                    url: basePath + '/inventory/doCreateCountItem.action',
                                    params: {
                                        storerKey: countValues.storerKey,
                                        countKey: countValues.countKey,
                                        type: countValues.type,
                                        mode: countValues.mode,
                                        status: countValues.status,
                                        
                                        startDate: countValues.startDate,
                                        endDate: countValues.endDate,
                                        
                                        startLoc: countValues.startLoc,
                                        endLoc: countValues.endLoc,
                                        startSku: countValues.startSku,
                                        endSku: countValues.endSku
                                    },
                                    success: function(response){
                                        var text = Ext.decode(response.responseText);
                                        var success = text.success;
                                        MessageBox.show(success, text.json.msg);
                                        me.countgrid.getStore().load();
                                        me.detailgrid.getStore().load();
                                    }
                                });
                            }
                        }
                    ); */
                }
                else   //如果为空，则直接生成新的数据
                {    //与上边一种情况代码重复，但写到方法中无法调用，暂时这么用，后续考虑修改
                    var mask = new Ext.LoadMask(me.getEl(), { 
                         msg : 'please wait...' 
                         });
                         mask.show(); 
                    Ext.Ajax.request({
                        url: basePath + '/inventory/doCreateCountItem.action',
                        params: {
                            storerKey: countValues.storerKey,
                            countKey: countValues.countKey,
                            type: countValues.type,
                            mode: countValues.mode,
                            status: countValues.status,
                            
                            startDate: countValues.startDate,
                            endDate: countValues.endDate,
                            
                            startLoc: countValues.startLoc,
                            endLoc: countValues.endLoc,
                            startSku: countValues.startSku,
                            endSku: countValues.endSku
                        },
                        success: function(response){
                            var text = Ext.decode(response.responseText);
                            var success = text.success;
                            mask.hide();                             
                            MessageBox.show(success, text.json.msg);
                            me.countgrid.getStore().load();
                            me.detailgrid.getStore().load();
                        },
                        timeout: 100000000
                    });
                }
		    }
		});            

        //生成完成后使能按钮
        Ext.getCmp('createBtn').enable();

    },
    
    onConfirmCreateCountItems:function(){
        Ext.Ajax.request({
            url: basePath + '/inventory/doCreateCountItem.action',
            params: {
                storerKey: countValues.storerKey,
                countKey: countValues.countKey,
                type: countValues.type,
                mode: countValues.mode,
                status: countValues.status,
                
                startDate: countValues.startDate,
                endDate: countValues.endDate,
                
                startLoc: countValues.startLoc,
                endLoc: countValues.endLoc,
                startSku: countValues.startSku,
                endSku: countValues.endSku
            },
            success: function(response){
                var text = Ext.decode(response.responseText);
                var success = text.success;
                MessageBox.show(success, text.json.msg);
                me.countgrid.getStore().load();
                me.detailgrid.getStore().load();
            }
        });
    },    
    
    //创建一个类似右键菜单的组件
    createContextMenuItem:function(){
		this.printCountmentTallyFirstAction = Ext.create('Ext.Action', {  //创建Action
			text : "盘库任务单",
			cls : "x-btn-text-icon",
			handler: this.onPrintFirst,
			scope : this
		});
		this.printCountmentTallyAgainAction = Ext.create('Ext.Action', {
			text : "导出盘库单",
			cls : "x-btn-text-icon",
			handler: this.onExportCountForm, 
			scope : this
		});
		
		this.printCountmentDifferenceFirstAction = Ext.create('Ext.Action', {
			text : "初盘差异报告",
            //handler: this.onTestExport,
            scope : this,
			menu : [
				{
					text:"全部",
					handler: this.onExportCountmentDifference1,
					scope : this
				},
				{
					text:"有差异",
					handler: this.onExportCountmentDifference2,
					scope : this
				},
				{
					text:"无差异",
					handler: this.onExportCountmentDifference3,
					scope : this
				}
			]
		});
		this.printCountmentDifferenceAgainAction = Ext.create('Ext.Action', {
			text : "复盘差异报告",
			handler: function(){
				this.onPrintClick("printCountmentDifferenceAgain.action");
			},
			scope : this,
			menu : [
				{
					text:"全部",
					handler: this.onExportCountmentDifference4,
					scope : this
				},
				{
					text:"有差异",
					handler: this.onExportCountmentDifference5,
					scope : this
				},
				{
					text:"无差异",
					handler: this.onExportCountmentDifference6,
					scope : this
				}
			]
		});
		
		this.printAction = Ext.create('Ext.Action', {
			text : "打印",
            iconCls: 'icon-printer',
			menu : [
				this.printCountmentTallyFirstAction,
				this.printCountmentTallyAgainAction,
				'-',
				this.printCountmentDifferenceFirstAction,
				this.printCountmentDifferenceAgainAction
			]
		});
    },
    
    //测试用
    onTestExport:function(){
        var countKey = "0000000004";
        var orderKey = '000000000001';
        window.location.href = basePath+'/inventory/ordersPOIExcel.action?countKey='+countKey; 
    },
    
    
 //打印盘点单
 	onPrintFirst: function(){
		var me = this;
    	var record = me.pt2pn1topform.getForm().getFieldValues(); 
        
    	if(record.countKey == ""){
    		MessageBox.error('错误提示','请选择操作的数据！');
    		return;
    	}else{
        	Ext.Ajax.request({
			    url: basePath + '/inventory/printCountInvForm.action',
			    params: {
			    	countKey: record.countKey,
			    	mode:record.mode    //明盘2 or 盲盘1
			    },
                async: false,				
			    success: function(response){
			        var text = Ext.decode(response.responseText);
		            url = basePath + text.json.path;
			    }
			});
			
			try{delete window.frames["onPrintAsnReceipt"];}catch(e){};
			me.winItems = {
				html: "<iframe id='onPrintAsnReceipt' name='onPrintAsnReceipt' src='"+url+"' style='width:100%; height:100%;' frameborder='0'></iframe>"
			};
			me.win = me.createPrinterWindow();
			me.prinerWin.show();
			me.prinerWin.on('close',function(){
				delete me.winItems1;
				delete me.prinerWin1;
				delete me.win;
			},me);
					
    	}
    },
    
    createPrinterWindow: function(){
		this.prinerWin = Ext.create('widget.window',{
			width: 780,
			height: 600,
	        layout: 'fit',
	        title: '打印',
			items:[this.winItems]
		});
		return this.prinerWin;
    }, 

    //导出盘点单
    onExportCountForm:function(){
        var me = this;
        var mannerValue="1";   //定义输出的盘点差异内容
    	var record = me.pt2pn1topform.getForm().getFieldValues(); 
    	var countKey = record.countKey;
    	var mode = record.mode;    //明盘2 or 盲盘1
    	if(record.countKey == ""){
    		MessageBox.error('错误提示','请选择操作的数据！');
    		return;
    	}
        var countKey=record.countKey;        
        window.location.href = basePath+'/inventory/doExportCountForm.action?string='+countKey+','+mode;
    },
    
    //导出盘点差异
    //做成公共方法存在一些问题，先按照6个方法来完成功能 qxue 
    onExportCountmentDifference1:function(){
        var me = this;
        var mannerValue="1";   //定义输出的盘点差异内容
        var record = me.pt2pn1topform.getForm().getFieldValues(); 
    	if(record.countKey == ""){
    		MessageBox.error('错误提示','请选择操作的数据！');
    		return;
    	}
        var countKey=record.countKey;
        window.location.href = basePath+'/inventory/doExCountDiff1.action?countKey='+countKey;
    },
    
    onExportCountmentDifference2:function(){
        var me = this;
        var mannerValue="1";   //定义输出的盘点差异内容
        var record = me.pt2pn1topform.getForm().getFieldValues(); 
    	if(record.countKey == ""){
    		MessageBox.error('错误提示','请选择操作的数据！');
    		return;
    	}
        var countKey=record.countKey;
        window.location.href = basePath+'/inventory/doExCountDiff2.action?countKey='+countKey;
    },
    
    onExportCountmentDifference3:function(){
        var me = this;
        var mannerValue="1";   //定义输出的盘点差异内容
        var record = me.pt2pn1topform.getForm().getFieldValues(); 
    	if(record.countKey == ""){
    		MessageBox.error('错误提示','请选择操作的数据！');
    		return;
    	}
        var countKey=record.countKey;
        window.location.href = basePath+'/inventory/doExCountDiff3.action?countKey='+countKey;
    },
    
    onExportCountmentDifference4:function(){
        var me = this;
        var mannerValue="1";   //定义输出的盘点差异内容
        var record = me.pt2pn1topform.getForm().getFieldValues(); 
    	if(record.countKey == ""){
    		MessageBox.error('错误提示','请选择操作的数据！');
    		return;
    	}
        var countKey=record.countKey;
        window.location.href = basePath+'/inventory/doExCountDiff4.action?countKey='+countKey;
    },
    
    onExportCountmentDifference5:function(){
        var me = this;
        var mannerValue="1";   //定义输出的盘点差异内容
        var record = me.pt2pn1topform.getForm().getFieldValues(); 
    	if(record.countKey == ""){
    		MessageBox.error('错误提示','请选择操作的数据！');
    		return;
    	}
        var countKey=record.countKey;
        window.location.href = basePath+'/inventory/doExCountDiff5.action?countKey='+countKey;
    },
    
    onExportCountmentDifference6:function(){
        var me = this;
        var mannerValue="1";   //定义输出的盘点差异内容
        var record = me.pt2pn1topform.getForm().getFieldValues(); 
    	if(record.countKey == ""){
    		MessageBox.error('错误提示','请选择操作的数据！');
    		return;
    	}
        var countKey=record.countKey;
        window.location.href = basePath+'/inventory/doExCountDiff6.action?countKey='+countKey;
    }
    

});

Ext.onReady(function(){
	Ext.create('Ext.container.Viewport', {
	    layout: 'border',
	    items: [{
	    	xtype:'countmanager',
	    	region:'center'
	    }]
	});
});