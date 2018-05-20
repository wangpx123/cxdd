/******************************************************
库存冻结 Inventoryhold.js


******************************************************/
Ext.define('Inventoryhold', {
    extend: 'Ext.data.Model',
    fields: [
        {name:'id'},
        {name:'holdKey'},
        {name:'lot'},
        {name:'loc'},
        {name:'hold'},
        {name:'status'},
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

Ext.define('Redm.inventory.InventoryholdGrid',{
	extend: 'Redm.BaseGrid',
    alias : 'widget.inventoryholdgrid',
     selModel: Ext.create('Ext.selection.CheckboxModel'),
    buildColumns: function(){
        this.columns = [
	        	{ header: "冻结单号", dataIndex: 'holdKey', width: 140, sortable: true},
			    { header: "状态", dataIndex: 'status', width: 80, sortable: true,
									renderer:this.rendererDetailStatusFunc
				},
			    { header: "Hold", dataIndex: 'hold', width: 100, sortable: true,renderer : this.holdChange,hidden:true},//方法待实现
			    { header: "批次", dataIndex: 'lot', width: 140, sortable: true},
			    { header: "库位", dataIndex: 'loc', width: 140, sortable: true},
				{ header: "冻结时间", dataIndex: 'addDate', width: 140, sortable: true,hidden:true},
			    { header: "冻结人", dataIndex: 'addWho', width: 140, sortable: true,hidden:true},
		        { header: "ID", dataIndex: 'id', width: 140, sortable: true,hidden:true},
		        
		        { header: "托盘号", dataIndex: 'lottable05', width: 80, sortable: true},
                { header: "成品卷号", dataIndex: 'lottable06', width: 100, sortable: true},
                { header: "等级", dataIndex: 'lottable07', width: 80, sortable: true},
                { header: "外观代码", dataIndex: 'lottable08', width: 60, sortable: true},
                { header: "表面处理", dataIndex: 'lottable09', width: 100, sortable: true},
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
                { header: "扣账状态", dataIndex: 'lottable16', width: 100, sortable: true}
		];
		return true;
    },
    buildDockedItems: function(){
    	var me = this;
		this.dockedItems = [

	    ];	    
	},
	initComponent: function(){
		var me = this;
		this.buildStore(basePath + '/inventory/doQueryInventoryHold.action','Inventoryhold',20);
		this.callParent(arguments);
	},
	
	//明细表的状态解析函数
    rendererDetailStatusFunc:function(value)
        {
            var retValue;
            if(value=='0') retValue='新建';
            else if(value=='1') retValue='已冻结';
            else if(value=='2') retValue='已释放';
            else  retValue=value;
            return retValue;
        },
	//hold的状态解析
	holdChange:function(value)
        {
            var retValue;
            if(value=='0') retValue='取消冻结';
            else if(value=='1') retValue='冻结';
            else  retValue=value;
            return retValue;
        }
    
});

Ext.define('Redm.inventory.InventoryholdManager',{   
	extend: 'Ext.panel.Panel',   
    //Ext.tab.Panel模式，layout不起作用，改为Ext.panel.Panel后，当前的panel 属性region必须要配置为‘center’
    //这样才可以在一个或者多个tab间切换，单个panel是不会有tab标签出现。
    alias : ['widget.inventoryholdmanager'],    //主panel，继承自 Ext.tab.Panel
    title:'库存冻结',
    layout: 'border',
    tabPosition: 'bottom',  
    header:true,
    initComponent: function(){
    	var me = this;
    	this.items = [this.createInventoryholdPanel()];
        this.callParent(arguments);
    },

	//设置明细表字段一般字段只读属性（manner：true:只读，false:可以编辑）
    //行号：配置上只读，sku，新建时可以编辑，其他任何情况下只读
    onSetDetailReadOnly: function(manner){
        var me=this;
        
        me.basicform.getForm().findField('hold').setReadOnly(manner);
        me.basicform.getForm().findField('lot').setReadOnly(manner);
        me.basicform.getForm().findField('loc').setReadOnly(manner);
    },
    
    //设置明细表关键字段只读属性（manner：true:只读，false:可以编辑）
    //关键字段包括 sku，中文名称，英文名称，别名。 新建时可以编辑，其他任何情况下只读
    onSetDetailKeyReadOnly: function(manner){
        var me=this;
        //me.basicform.getForm().findField('sku').setReadOnly(manner);
    },
	
    onReset: function(){
    	this.holdform.getForm().reset();
    },
    onGo: function(){
    	this.setActiveTab(1);
    },
    
    onSelect: function(){
     this.inventoryholdgrid.getStore().load();                             
    },
    onAddDetail: function(){
    	var me = this;
    	me.basicform.getForm().reset();
    	me.holdform.getForm().reset();
    },
    onDeleteDetail: function(){
    	var me = this;
    	var records = me.inventoryholdgrid.getSelectionModel().getSelection(); 
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
						        me.inventoryholdgrid.getStore().load();
			                	me.basicform.getForm().reset();
			                	me.holdform.getForm().reset();
						    }
						});
					}
				}
			); 
    	}
    },
	
	//操作按钮的方法
	onoperation:function(){
		var me = this;
    	var records = me.inventoryholdgrid.getSelectionModel().getSelection(); 
        //冻结未结束前禁用按钮
        Ext.getCmp('onOperateBtn').disable();        
    	if(records == ""){
    		MessageBox.error('错误提示','请选择冻结的数据！');
            //返回前使能按钮
            Ext.getCmp('onOperateBtn').enable();	            
    		return;
    	}else{
    		var record = records[0].getData();
    		Ext.MessageBox.confirm('询问提示', '确定要操作所选信息吗？', 
				function(btn){
					if(btn == 'yes'){
						var mask = new Ext.LoadMask(me.getEl(), { 
							msg : 'please wait...' 
						});
						mask.show(); 
						Ext.Ajax.request({
						    url: basePath + '/inventory/doExecuteOperation.action',
						    params: {
								holdKey: record.holdKey,
								hold:record.hold
						    },
						    success: function(response){
						        var text = Ext.decode(response.responseText);
						        var success = text.success;
								mask.hide();    
						        MessageBox.show(success, text.json.msg);
						        me.inventoryholdgrid.getStore().load();
			                	me.basicform.getForm().reset();
			                	me.holdform.getForm().reset();
						    },
							timeout: 100000000
						});
					}
				}
			); 
    	}
        //冻结完成后使能按钮
        Ext.getCmp('onOperateBtn').enable();	
	},
	
	//操作冻结按钮的方法
    onOperationHold:function(){
        var me = this;
        var records = me.inventoryholdgrid.getSelectionModel().getSelection(); 
        //冻结未结束前禁用按钮
        Ext.getCmp('onOperateholdBtn').disable();    
        Ext.getCmp('onOperateUnholdBtn').disable();        
        if(records == ""){
            MessageBox.error('错误提示','请选择冻结的数据！');
            //返回前使能按钮
            Ext.getCmp('onOperateholdBtn').enable();   
            Ext.getCmp('onOperateUnholdBtn').enable();      
            return;
        }else{
            var ids = []; 
            var operation = 'hold'; 
            Ext.Array.each(records, function(name, index, countriesItSelf) {
                 ids.push(name.getData().id);
             });
            Ext.MessageBox.confirm('询问提示', '确定要操作所选信息吗？', 
                function(btn){
                    if(btn == 'yes'){
                        var mask = new Ext.LoadMask(me.getEl(), { 
                            msg : 'please wait...' 
                        });
                        mask.show(); 
                        Ext.Ajax.request({
                            url: basePath + '/inventory/doExecuteOperationHold.action',
                            params: {
                            	ids: ids,
                            	operation: operation
                            },
                            success: function(response){
                                var text = Ext.decode(response.responseText);
                                var success = text.success;
                                mask.hide();    
                                MessageBox.show(success, text.json.msg);
                                me.inventoryholdgrid.getStore().load();
                                me.basicform.getForm().reset();
                                me.holdform.getForm().reset();
                            },
                            timeout: 100000000
                        });
                    }
                }
            ); 
        }
        //冻结完成后使能按钮
         Ext.getCmp('onOperateholdBtn').enable();   
         Ext.getCmp('onOperateUnholdBtn').enable();      
    },
    
    //操作按钮的方法
    onOperationUnhold:function(){
        var me = this;
        var records = me.inventoryholdgrid.getSelectionModel().getSelection(); 
        //冻结未结束前禁用按钮
        Ext.getCmp('onOperateholdBtn').disable();    
        Ext.getCmp('onOperateUnholdBtn').disable();      
        if(records == ""){
            MessageBox.error('错误提示','请选择冻结的数据！');
            //返回前使能按钮
            Ext.getCmp('onOperateholdBtn').enable();   
            Ext.getCmp('onOperateUnholdBtn').enable();      
            return;
        }else{
            var ids = []; 
            var operation = 'unhold'; 
            Ext.Array.each(records, function(name, index, countriesItSelf) {
                 ids.push(name.getData().id);
             });
            Ext.MessageBox.confirm('询问提示', '确定要操作所选信息吗？', 
                function(btn){
                    if(btn == 'yes'){
                        var mask = new Ext.LoadMask(me.getEl(), { 
                            msg : 'please wait...' 
                        });
                        mask.show(); 
                        Ext.Ajax.request({
                            url: basePath + '/inventory/doExecuteOperationHold.action',
                            params: {
                                ids: ids,
                                operation: operation
                            },
                            success: function(response){
                                var text = Ext.decode(response.responseText);
                                var success = text.success;
                                mask.hide();    
                                MessageBox.show(success, text.json.msg);
                                me.inventoryholdgrid.getStore().load();
                                me.basicform.getForm().reset();
                                me.holdform.getForm().reset();
                            },
                            timeout: 100000000
                        });
                    }
                }
            ); 
        }
        //冻结完成后使能按钮
         Ext.getCmp('onOperateholdBtn').enable();   
         Ext.getCmp('onOperateUnholdBtn').enable();      
    },
	
	//第一个tab页面的创建按钮
	onGoCreate: function(){
		this.basicform.getForm().reset();
		
		//新建主表记录，主表，明细表所有字段取消只读
        this.onSetDetailReadOnly(false);
        this.onSetDetailKeyReadOnly(false);
		
        //计划在创建时自动加载一个数字
        //规则目前写死，后续考虑修改
        var nameCode='HOLDNUM';
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
                        this.basicform.getForm().findField('holdKey').setValue(value);
                    }
                },scope:this
            }
	    });        
    },
	
	//保存
	saveInventoryhold: function(){
		var me = this;
    	var pt1form = this.basicform.getForm();
    	var pt1formValues = pt1form.getValues();
		var lotValue=pt1formValues.lot;
		var	locValue=pt1formValues.loc;
		
		if(''==lotValue && ''==locValue){
			Ext.Msg.alert("错误提示", '批次和库位不能同时为空！')
		}else{
			Ext.Ajax.request({
		    url: basePath + '/inventory/doSaveInventoryhold.action',
		    params: {
				//表记录
		    	id: pt1formValues.id,
				holdKey:pt1formValues.holdKey,
				lot:lotValue,
				status:pt1formValues.status,
				loc:locValue,
				hold:pt1formValues.hold,
				addDate:pt1formValues.addDate,
				addWho:pt1formValues.addWho
		    },
		    success: function(response){
		        var text = Ext.decode(response.responseText);
		        var success = text.success;
		        MessageBox.show(success, text.json.msg);
		        me.inventoryholdgrid.getStore().load();
				me.basicform.getForm().reset();
		    }
		});
		}
	},
	
	//从grid获取主表参数，删除主表和相关明细表记录的方法
	onDelete: function(){
		var me = this;
		var records = this.inventoryholdgrid.getSelectionModel().getSelection(); 
		if(records == ""){
			MessageBox.error('错误提示','请选择操作的数据！');
			return;
		}
		var data = records[0].getData();
        
        Ext.MessageBox.confirm('询问提示', '确定要删除吗？', 
            function(btn){
                if(btn == 'yes'){    
                    Ext.Ajax.request({
                        url: basePath + '/inventory/doDeleteInventoryhold.action',
                        params: {
                            holdKey: data.holdKey
                        },
                        success: function(response){
                            var text = Ext.decode(response.responseText);
                            var success = text.success;
                            MessageBox.show(success, text.json.msg);
                            me.inventoryholdgrid.getStore().load();
                        }
                    });
                }
            }
        );
	},
	
	//以上是各种方法，下面开始创建各种面板
    
    createInventoryholdPanel: function(){   //本例仅用第二个tab页来实现
    	var me = this;
    	this.cntdetail = Ext.create('Ext.panel.Panel',{    //创建第二个tab页，继承自  Ext.panel.Panel
    		layout: 'border',
    		region:'center',     //单个panel时需要配置
    		border: false,
            header:false,
    		items:[this.createInventoryholdGrid(),this.createBasicRuleForm(),this.createHoldTopPanel()]  //只有一个tab页，直接用createBasicRuleForm()
    	});
    	return this.cntdetail;
    },
 
    createHoldTopPanel: function(){
    	this.pwdtoppanel = Ext.create('Ext.panel.Panel',{
    		region: 'north',
    		layout: 'border',
    		border: false,
    		height: 115,
    		items:[this.createHoldForm(),this.createDBtnPanel()]
    	});
    	return this.pwdtoppanel;
    },
    
	createHoldForm: function(){
		var me = this;
		this.holdform = Ext.create('Ext.form.Panel',{   //创建Top form  继承自 Ext.form.Panel 
			region: 'north',
			frame: true,
			height: 80,
			layout: 'vbox',   //整体上vbox，而每个container是hbox，就可以做成多行的形式。用anchor也达到目的了
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
                                    xtype:'textfield',
                                    name: 'holdKey',
                                    fieldLabel: '冻结单号',
                                    labelWidth : 60,
                                    width:180
                                },
                                {
                                    name: 'status',
                                    margin: '3 2 3 20',
                                    labelWidth : 40,
                                    xtype:'combobox',
                                    fieldLabel: '状态',
									displayField: 'text',
									valueField: 'value',
									store:Ext.create('Ext.data.Store', 
									{
										fields: ['text','value'],
										data: [{text:'新建',value:'0'},{text:'已冻结',value:'1'},{text:'已释放',value:'2'}]
									}
									)
                                },
                                {
                                    xtype:'textfield',
                                    name: 'lot',
                                    margin: '3 2 3 20',
                                    labelWidth : 40,
                                    fieldLabel: '批次',
									listeners:{
										blur:function(txt){
											txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
										}
									}
                                },
                                {
                                    xtype:'textfield',
                                    name: 'loc',
                                    margin: '3 2 3 20',
                                    labelWidth : 40,
                                    fieldLabel: '库位',
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
                                margin: '3 2 3 2',
                                xtype: 'textfield'
                            },
                            items: [
                                {
                                    xtype:'button',
                                    width:100,
                                    margin: '3 2 3 286',  //控制在行的中间
                                    text : "查询",
                                    iconCls: 'icon-search',
                                    scope : this,
									handler: this.onSelect
                                },
                                {
                                    xtype:'button',
                                    width:100,
                                    margin: '3 2 3 28',
                                    text : "重置",
                                    iconCls: 'icon-reset',
                                    scope : this,
                                    handler: this.onReset
                                }
                                
                            ]
                    },
                    {   //做什么用的？关联记录的关键字？
                        xtype:'hidden',
                        name : "id"
                    },
                    {
                        xtype:'hidden',
                        name : "deleteItems"
                    }                    
            ]
	    })//end for Ext.create
	    
		return this.holdform;
	}, 

    
    createDBtnPanel: function(){
    	var me = this;
    	this.dbtnpanel = Ext.create('Ext.form.Panel',{
    		region: 'south',
    		frame: true,
    		defaults: {
    			xtype: 'button',
    			margin: '5 0 0 5'
    		},
    		listeners:{
	            render:function(p){
	                p.getEl().on("contextmenu",function(e){
	                	me.createContextChildMenu(e);
	                },me)
	            }
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
					xtype:'button',
					text : "保存",
					iconCls: 'icon-save',
					scope : this,
					handler: this.saveInventoryhold
				},
	           /* {
	            	itemId:'optionToolbar',
	                text: '操作',
                 	iconCls: 'icon-edit', 
                    id:'onOperateBtn',
	                handler: this.onoperation,
	                scope: this
	            },*/
	            {
	            	itemId:'deleteToolbar',
                	iconCls: 'icon-delete',
	                text: '删除',
	                handler: this.onDelete,
	                scope: this
	            },
	            {
                    itemId:'holdToolbar',
                    text: '批量冻结',
                    iconCls: 'icon-edit', 
                    id:'onOperateholdBtn',
                    handler: this.onOperationHold,
                    scope: this
                },  
                {
                    itemId:'unHoldToolbar',
                    text: '批量释放',
                    iconCls: 'icon-edit', 
                    id:'onOperateUnholdBtn',
                    handler: this.onOperationUnhold,
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
            ]
    	});
    	return this.dbtnpanel;
    },

    createInventoryholdGrid: function(){
    	var me = this;
    	this.inventoryholdgrid = Ext.create('widget.inventoryholdgrid',{
    		region: 'center',
    		listeners: {
    			itemclick: function(grid,record){
    				me.basicform.getForm().loadRecord(record);
					var status=me.basicform.getForm().findField('status').getValue();
					
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
    	this.inventoryholdgrid.getStore().on('beforeload',function(){
    		var params = this.inventoryholdgrid.getStore().getProxy().extraParams;
			var record = me.holdform.getForm().getFieldValues();

    		var holdKey = record.holdKey;  
    		var status = record.status;  
    		var loc = record.loc;
			var lot = record.lot;  
			
			delete params.holdKey;
			delete params.status;
			delete params.loc;
			delete params.lot;

			if(holdKey) params.holdKey = holdKey;
			if(status) params.status = status;
			if(loc) params.loc = loc;
			if(lot) params.lot = lot;
    	},this);
    	return this.inventoryholdgrid;
    },
    
	createBasicRuleForm: function(){
		var me=this;
    	this.basicform = Ext.create('Ext.form.Panel',{      //创建tab页，继承自Ext.form.Panel
			xtype:'form',
    		region: 'east',       //add for one tab  一个tab不需要上一级方法，直接用form，需要增加几个属性配置
    		width: 380,           //add for one tab
			collapsible: true,    //add for one tab
			frame:true,
			border: false,
			//title: '基本限制',   //note for one tab
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
                                flex:1,
                                labelAlign: 'top'
                            },

                            items: [
                                {
                                    name: 'holdKey',
                                    fieldLabel: '冻结单号',
									readOnly:true,
									flex:2,
									xtype: 'textfield'
                                },
                                {
									xtype:'combobox',
									fieldLabel: '状态',
									readOnly:true,
									name: 'status',
									flex:1,
									displayField: 'text',
									valueField: 'value',
									store:Ext.create('Ext.data.Store', 
									{
										fields: ['text','value'],
										data: [{text:'新建',value:'0'},{text:'已冻结',value:'1'},{text:'已释放',value:'2'}]
									}
									),
									value: '0'
								},
                                {
                                    name: 'hold',
                                    fieldLabel: 'Hold',
                                    xtype:'checkbox',
                                    inputValue: '1',
                                    checked: true,
                                    flex:0.5,
                                    hidden:true
                                },
                                 {xtype:'hidden',name : "",flex:1}                                
                            ]
                    },

                    {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            defaults: {
                                labelWidth: 70,
                                margin: '5 0 0 5',
                                labelAlign: 'top',
                                xtype: 'textfield'
                            },
                            items: [

                                {
                                    name: 'lot',
                                    fieldLabel: '批次',
                                    allowBlank: false,
									flex:3,
									listeners:{
										blur: function(txt){
											//输入参数，鼠标离开后见检查该批次是否存在
											var lotValue= Ext.util.Format.uppercase(txt.getValue());
											txt.setValue(lotValue);
											if(''!=lotValue)
											{
												Ext.Ajax.request({
													url: basePath + '/support/doValidateLot.action',
													params: {
														lot:lotValue
													},
													success: function(response){    //failure属于连不上服务器的情况，后续补充
														var text = Ext.decode(response.responseText);
														var success = text.success;
														if(0 == text.json.data.length)
														{
															me.basicform.getForm().findField('lot').setValue('');
															Ext.Msg.alert("错误提示", '查不到相关批次！')
														}
													}
												})
											}
										}
									}
                                },
                                /*{
                                    name: '',
                                    fieldLabel: 'Movable Unit'
                                }, */
                                {
                                    name: 'loc',
                                    fieldLabel: '库位',
                                    /*xtype: 'loccombo',*/
                                    allowBlank: false,
									flex:3,
									listeners:{
										blur: function(txt){
											//输入参数，鼠标离开后见检查该批次是否存在
											var locValue= Ext.util.Format.uppercase(txt.getValue());
											txt.setValue(locValue);
											if(''!=locValue)
											{
												Ext.Ajax.request({
													url: basePath + '/support/doCheckLocExist.action',
													params: {
														loc:locValue
													},
													success: function(response){    //failure属于连不上服务器的情况，后续补充
														var text = Ext.decode(response.responseText);
														var success = text.success;
														//if(0 == text.json.data.length)
														if(!success)
														{
															me.basicform.getForm().findField('loc').setValue('');
															Ext.Msg.alert("错误提示", '查不到相关库位！')
														}
													}
												})
											}
										}
									}
                                },
								 {xtype:'hidden',name : "",flex:2}
                            ]
                    },
					{
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            defaults: {
                                labelWidth: 70,
                                margin: '5 0 0 5',
                                labelAlign: 'top',
                                xtype: 'textfield'
                            },
                            items: [
{
                                    xtype:'datefield',
                                    format:'Y-m-d H:i:s',
                                    name: 'addDate',
                                    fieldLabel: '冻结时间',
									hidden:true
                                },
								{
									xtype:'textfield',
									name: 'addWho',
									fieldLabel: '冻结人',
									labelWidth : 60,
									hidden:true
								}
					
                            ]
                    },
					        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            defaults: {
                                labelWidth: 70,
                                width:150,
                                margin: '5 0 0 5',
                                labelAlign: 'top',
                                xtype: 'textfield'
                            },
                            items: [
                                {
                                    xtype:'datefield',
                                    name: 'lottable01',
                                    format:'Y-m-d H:i:s',
                                    fieldLabel: '收货日期',
                                    allowBlank: false,
                                    readOnly:true
                                },
                                {
                                    xtype:'datefield',
                                    name: 'lottable02',
                                    format:'Y-m-d H:i:s',
                                    fieldLabel: '生产日期',
                                    readOnly:true,
                                    allowBlank: false
                                }
                            ]
                    }, {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            defaults: {
                                labelWidth: 70,
                                width:150,
                                margin: '5 0 0 5',
                                labelAlign: 'top',
                                xtype: 'textfield'
                            },
                            items: [

                                {
                                    xtype:'datefield',
                                    name: 'lottable03',
                                    format:'Y-m-d H:i:s',
                                    fieldLabel: '失效日期',
                                     readOnly:true,
                                    allowBlank: false
                                },
                                {
                                    name: 'lottable04',
                                    fieldLabel: '生产批号',
                                     readOnly:true,
                                    allowBlank: false
                                }
                            ]
                    },
                       {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            defaults: {
                                labelWidth: 70,
                                width:150,
                                margin: '5 0 0 5',
                                labelAlign: 'top',
                                xtype: 'textfield'
                            },
                            items: [

                                {
                                    name: 'lottable05',
                                    fieldLabel: '托盘号',
                                     readOnly:true,
                                    allowBlank: false
                                },
                                {
                                    name: 'lottable06',
                                    fieldLabel: '成品卷号',
                                     readOnly:true,
                                    allowBlank: false
                                }
                            ]
                    },
                       {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            defaults: {
                                labelWidth: 70,
                                width:150,
                                margin: '5 0 0 5',
                                labelAlign: 'top',
                                xtype: 'textfield'
                            },
                            items: [

                                {
                                    name: 'lottable07',
                                    fieldLabel: '等级',
                                     readOnly:true,
                                    allowBlank: false
                                },
                                {
                                    name: 'lottable08',
                                    fieldLabel: '外观代码',
                                     readOnly:true,
                                    allowBlank: false
                                }
                            ]
                    },
                       {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            defaults: {
                                labelWidth: 70,
                                width:150,
                                margin: '5 0 0 5',
                                labelAlign: 'top',
                                xtype: 'textfield'
                            },
                            items: [

                                {
                                    name: 'lottable09',
                                    fieldLabel: '表面处理',
                                     readOnly:true,
                                    allowBlank: false
                                },
                                {
                                    name: 'lottable10',
                                    fieldLabel: '规格',
                                     readOnly:true,
                                    allowBlank: false
                                }
                            ]
                    },
                       {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            defaults: {
                                labelWidth: 70,
                                width:150,
                                margin: '5 0 0 5',
                                labelAlign: 'top',
                                xtype: 'textfield'
                            },
                            items: [

                                {
                                    name: 'lottable11',
                                    fieldLabel: '包装形式',
                                     readOnly:true,
                                    allowBlank: false
                                },
                                {
                                    name: 'lottable12',
                                    fieldLabel: 'ASN号',
                                     readOnly:true,
                                    allowBlank: false
                                }
                            ]
                    },
                       {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            defaults: {
                                labelWidth: 70,
                                width:150,
                                margin: '5 0 0 5',
                                labelAlign: 'top',
                                xtype: 'textfield'
                            },
                            items: [

                                {
                                    name: 'lottable13',
                                    fieldLabel: '反射率',
                                     readOnly:true,
                                    allowBlank: false
                                },
                                {
                                    name: 'lottable14',
                                    fieldLabel: '极差',
                                     readOnly:true,
                                    allowBlank: false
                                }
                            ]
                    },
                       {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            defaults: {
                                labelWidth: 70,
                                width:150,
                                margin: '5 0 0 5',
                                labelAlign: 'top',
                                xtype: 'textfield'
                            },
                            items: [

                                {
                                    name: 'lottable15',
                                    fieldLabel: '重量',
                                     readOnly:true,
                                    allowBlank: false
                                },
                                {
                                    name: 'lottable16',
                                    fieldLabel: '扣账状态',
                                     readOnly:true,
                                    allowBlank: false
                                }
                            ]
                    },
                    { //这是做什么用的？
                        xtype:'hidden',
                        name : "id"
                    },
                    { //这是做什么用的？
                        xtype:'hidden',
                        name : "deleteItems"
                    }
            ]//,

       /*     buttons:[
                        {
                            text : "保存",
                            iconCls: 'icon-save',
                            scope : this,
                            handler: function()
                           {
                               //查询代码在beforeload事件中处理
                               
                               //this.itrngrid.getStore().load(); //待重写

                           }
                        },

                        {
                            text : "取消",
                            iconCls: 'icon-cancel',
                            scope : this,
                           handler: function()
                           {
                              //this.leftform.getForm().reset(); //待重写
                           }
                        }
			]      */          
            
    	});
        
    	return this.basicform;
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
        var records = me.Transactiongrid.getSelectionModel().getSelection();
        if((records == ""))
        {
            MessageBox.error("错误提示","请选择要操作的数据！");
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
                url: basePath + '/inventory/importMoveFromInventoryHold.action',
                params: {
                    ids: ids
                },
                success: function(response){
                    var text = Ext.decode(response.responseText);
                    var success = text.success;
                    mask.hide();
                    MessageBox.show(success, text.json.msg);
                    if(true==success)
                    {
                        me.inventoryholdgrid.getStore().load();
                    }
                }
            });
        } 
    },
    onTransactionReturn: function(){
        var me=this;
        me.inventoryholdgrid.getStore().load();
        me.winformtran.close();
    }
 	
});

Ext.onReady(function(){
	Ext.create('Ext.container.Viewport', {
	    layout: 'border',
	    items: [{
	    	xtype:'inventoryholdmanager',
	    	region:'center'
	    }]
	});
});