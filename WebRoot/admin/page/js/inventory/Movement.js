/******************************************************
库存移动 Movement.js
******************************************************/
Ext.define('Movement', {
    extend: 'Ext.data.Model',
    fields: [
        {name:'id'},
        {name:'moveKey'},
        {name:'storerKey'},
		{name:'status'},
        {name:'effectiveDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
        {name:'addDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
        {name:'addWho'},
        {name:'editDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
        {name:'editWho'}
    ],
    idProperty: 'id'
});

Ext.define('MovementDetail', {
    extend: 'Ext.data.Model',
    fields: [
        {name:'id'},
        {name:'moveKey'},
        {name:'lineNumber'},
        {name:'storerKey'},
        {name:'sku'},
        {name:'lot'},
        {name:'fromloc'},
		{name:'toloc'},
		{name:'status'},
        {name:'reasonCode'},
        {name:'packKey'},
        {name:'uom'},
        {name:'qty',type:'float',numberFormat:'0.000'},
        {name:'qtyMoved',type:'float',numberFormat:'0.000'},
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
//两个grid的定义，两个tab页各一个
Ext.define('Redm.inventory.MovementGrid',{
	extend: 'Redm.BaseGrid',
    alias : 'widget.movementgrid',
    buildColumns: function(){
        this.columns = [
	        	{ header: "货主", dataIndex: 'storerKey', width: 140, sortable: true},
			    { header: "移库单号", dataIndex: 'moveKey', width: 140, sortable: true},
			    { header: "状态", dataIndex: 'status', width: 80, sortable: true,renderer:this.rendererStatusFunc}, 
			    { header: "移库时间", dataIndex: 'addDate', width: 140, sortable: true,renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
				{ header: "移库人", dataIndex: 'addWho', width: 140, sortable: true,hidden:true}
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
		this.buildStore(basePath + '/inventory/doQueryMovement.action','Movement',20);
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
        }

});

Ext.define('Redm.inventory.MovementDetailGrid',{
	extend: 'Redm.BaseGrid',
    alias : 'widget.movementdetailgrid',
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
	            { header: "商品", dataIndex: 'sku', width: 100,sortable: true
				},
	            { header: "源库位", dataIndex: 'fromloc', width: 100, sortable: true
				},
	            { header: "批次", dataIndex: 'lot', width: 100, sortable: true,editor:{xtype:'textfield',allowBlank: false}},
	            { header: "状态", dataIndex: 'status', width: 60,sortable: true,
									renderer:this.rendererDetailStatusFunc},
/*				{ header: "包装", dataIndex: 'packKey', width: 80, sortable: false
				},
	            { header: "单位", dataIndex: 'uom', width: 80, sortable: false
				},*/
	            { header: "库存", dataIndex: 'qty', width: 80, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
	            { header: "移至库位", dataIndex: 'toloc', width: 100, sortable: true},
	            { header: "移库数", dataIndex: 'qtyMoved', width: 100, sortable: true,editor:{xtype:'numberfield',decimalPrecision:3},renderer:Ext.util.Format.numberRenderer('0.000')}
		];
		return true;
    },
   
	initComponent: function(){
		var me = this;
		this.buildStore(basePath + '/inventory/doQueryMoveDetail.action','MovementDetail',20);
		this.callParent(arguments);
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
	//明细表的状态解析函数
    rendererDetailStatusFunc:function(value)
        {
            var retValue;
            if(value=='0') retValue='新建';
            else if(value=='9') retValue='完成';
            else  retValue=value;
            return retValue;
        }
/*   暂不启用，待后续研究    
	    function reasonChange(val) {
		    if (val =='54') return '54-RECEIPT>PREVIOUSLY REPORTED';
			else if(val =='GENERAL') return 'General Adjustment';

		    return val;
		}*/
    
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
Ext.define('Redm.inventory.MovementManager',{   
	extend: 'Ext.tab.Panel',
    alias : 'widget.movementmanager',    //主panel，继承自 Ext.tab.Panel
    layout: 'border',
    title:'库存移动',
    tabPosition: 'bottom',
    initComponent: function(){
    	var me = this;
    	this.items = [this.createCntPanel(),this.createCntDetailPanel()];
        this.callParent(arguments);
    },

	//设置RECEIPT表关键字段只读属性（manner：true:只读，false:可以编辑）
    //关键字段包括货主，货主名称。新建时可以编辑，其他任何情况下只读
    onSetMovementKeyReadOnly: function(manner){
        var me=this;
        me.pt2topform.getForm().findField('storerKey').setReadOnly(manner); 
        me.pt2topform.getForm().findField('addDate').setReadOnly(manner);
    },
    
    //设置明细表字段一般字段只读属性（manner：true:只读，false:可以编辑）
    //行号：配置上只读，sku，新建时可以编辑，其他任何情况下只读
    onSetDetailReadOnly: function(manner){
        var me=this;
        me.pt2pn1form.getForm().findField('fromloc').setReadOnly(manner);
        me.pt2pn1form.getForm().findField('lot').setReadOnly(manner);
        me.pt2pn1form.getForm().findField('toloc').setReadOnly(manner);
        me.pt2pn1form.getForm().findField('qty').setReadOnly(manner);    
        me.pt2pn1form.getForm().findField('qtyMoved').setReadOnly(manner);
		me.pt2pn1form.getForm().findField('packKey').setReadOnly(manner);
        me.pt2pn1form.getForm().findField('uom').setReadOnly(manner);    
        me.pt2pn1form.getForm().findField('uomqty').setReadOnly(manner);
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
        me.pt2pn1form.getForm().findField('sku').setReadOnly(manner);
    },
	
    onSelect: function(){
    	this.movementgrid.getStore().load();
    },
    
    onReset: function(){
    	this.pt1topform.getForm().reset();
    },

    createContextMenu:function(e){

    },
    createContextChildMenu:function(e){

    },
    
	//第二个tab页的添加明细按钮
    onAddDetail: function(){
    	var me = this;
    	me.pt2pn1form.getForm().reset();
		
		//新建明细表记录，所有字段取消只读
        this.onSetDetailReadOnly(false);
        this.onSetDetailKeyReadOnly(false);
		
		//可以自动创建行号
		this.lineNoStore = Ext.create('Ext.data.Store', {
	        remoteSort: true,
            autoLoad: true,
            fields: [
                        {name:'id'},
                        {name:'moveKey'},
                        {name:'lineNumber'}
            ],
	        proxy: {
	            type: 'ajax',
                //添加明细时，根据adjustmentKey查找。如果找不到，设置为1
	            url: basePath + '/inventory/doCreateMovementDetailLineNumber.action?moveKey='+this.pt2topform.getForm().findField('moveKey').getValue(),
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
	
      //从so提取转移数据

	doCreateDataFromSO: function(){
		var me = this;
    	var moveKey=this.pt2topform.getForm().findField('moveKey').getValue();
        var storerKey=this.pt2topform.getForm().findField('storerKey').getValue();
        var status=this.pt2topform.getForm().findField('status').getValue();
        var orderKey = this.pt2topform.getForm().findField('orderKey').getValue();
        var effectiveDate=Ext.util.Format.date(this.pt2topform.getForm().findField('addDate').getValue(),'Y-m-d H:i:s');;
    	if(moveKey == ""){
    		MessageBox.error('错误提示','请创建移库单号');
    		return;
    	}
    	if((storerKey == "")||(orderKey == ""))
        {
    		MessageBox.error('错误提示','请输入货主和SO单号!');
    		return;
    	}
        else
        {
            Ext.Ajax.request({
                url: basePath + '/inventory/doCreateMoveDataFromSO.action',
                params: {
                    moveKey: moveKey,
                    storerKey: storerKey,
                    status:status,
                    effectiveDate:effectiveDate,
                    orderKey:orderKey
                },
                success: function(response){
                	var text = Ext.decode(response.responseText);
                    var success = text.success;
                    MessageBox.show(success, text.json.msg);
                    if(true==success)
                    {
                        me.pt2pn1form.getForm().reset();   //清空后状态更新问题就不存在了
						me.detailgrid.getStore().load();
						me.movementgrid.getStore().load();
                    }
                }
            });
    	}
    },
    
    
    
	//第一个tab页面的创建按钮，包括跳转页面，和清空两个form
	onGoCreate: function(){
    	this.setActiveTab(1);
		
		//新建主表记录，主表，明细表所有字段取消只读
        this.onSetMovementKeyReadOnly(false);
        this.onSetDetailReadOnly(false);
        this.onSetDetailKeyReadOnly(false);
		
		//待添加跳转页面后的其他操作内容
		this.pt2topform.getForm().reset();
		this.pt2pn1form.getForm().reset();

        //moveKey一直设置为只读
		this.pt2topform.getForm().findField('moveKey').setReadOnly(true);
        this.pt2topform.getForm().findField('storerKey').setReadOnly(false);
		
        //计划在创建时自动加载一个数字
        //规则目前写死，后续考虑修改
        var nameCode='MOVNUM';
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
                        this.pt2topform.getForm().findField('moveKey').setValue(value);   
                        this.pt2pn1form.getForm().findField('lineNumber').setValue('1');     //创建movekey时，设置行号为1
                    }
                },scope:this
            }
	    });        

        this.detailgrid.getStore().removeAll();    //清空grid

    },
	
	//保存主表及明细表
	saveMovement: function(){
		var me = this;
    	var pt2top = this.pt2topform.getForm();//基本
    	var pt2pn1 = this.pt2pn1form.getForm();//运输

    	var pt2topValues = pt2top.getValues();
    	var pt2pn1Values = pt2pn1.getValues();
    	if(!(pt2top.isValid())||!(pt2pn1.isValid()) ) return;
    	Ext.Ajax.request({
		    url: basePath + '/inventory/doSaveMovement.action',
		    params: {
				//主表记录
		    	id: pt2topValues.id,
				storerKey:pt2topValues.storerKey,
				moveKey:pt2topValues.moveKey,
				status:pt2topValues.status,
				addDate:pt2topValues.addDate,
				addWho:pt2topValues.addWho,

		        //明细表记录
                detailId:pt2pn1Values.id,
                lineNumber:pt2pn1Values.lineNumber,
                sku:pt2pn1Values.sku,
				dstatus: pt2pn1Values.status,   //不允许手工修改
                fromloc:pt2pn1Values.fromloc,
                lot:pt2pn1Values.lot,
                packKey:pt2pn1Values.packKey,
                uom:pt2pn1Values.uom,
                qty:pt2pn1Values.qty,
                toloc:pt2pn1Values.toloc,
                qtyMoved:pt2pn1Values.qtyMoved
		    },
		    success: function(response){
		        var text = Ext.decode(response.responseText);
		        var success = text.success;
		        MessageBox.show(success, text.json.msg);
                if(true==success)
				{
					me.pt2pn1form.getForm().reset();   //清空后状态更新问题就不存在了
					me.detailgrid.getStore().load();
					me.movementgrid.getStore().load();
					//移库完成时，更新主表状态，并 根据主表状态判断是否需要设置主表的字段为只读
					Ext.Ajax.request({
						url: basePath + '/inventory/doQueryMovementStatus.action',
						params: {
							moveKey:pt2topValues.moveKey
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
									me.onSetMovementKeyReadOnly(true); //根据状态设置是否可以编辑
								}
							}
						}
					});
				}
		    }
		});
	},
	
	//删除明细表多条记录的方法
	onMultiDelete: function(){
		var me = this;
		var records = me.detailgrid.getSelectionModel().getSelection();
		var record = me.pt2topform.getForm().getFieldValues(); 
		var moveKey=record.moveKey;
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
                        url: basePath + '/inventory/doMultiDeleteMoveDetail.action',
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
								me.detailgrid.getStore().load();
								me.movementgrid.getStore().load();
								//移库完成时，更新主表状态，并 根据主表状态判断是否需要设置主表的字段为只读
								Ext.Ajax.request({
									url: basePath + '/inventory/doQueryMovementStatus.action',
									params: {
										moveKey:moveKey
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
												me.onSetMovementKeyReadOnly(true); //根据状态设置是否可以编辑
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
	deleteMovementAndDetail: function(){
		var me = this;
    	var record = me.pt2topform.getForm().getFieldValues(); 
    	if(record.moveKey == ""){
    		MessageBox.error('错误提示','请选择操作的数据！');
    		return;
    	}
        else
        {
        	Ext.MessageBox.confirm('询问提示', '确定要删除吗？', 
    			function(btn){
    				if(btn == 'yes'){    
                            Ext.Ajax.request({
                                url: basePath + '/inventory/doDeleteMovement.action',
                                params: {
                                    moveKey: record.moveKey
                                },
                                success: function(response){
                                    var text = Ext.decode(response.responseText);
                                    var success = text.success;
                                    MessageBox.show(success, text.json.msg);
                                    me.pt2topform.getForm().reset();
                                    me.pt2pn1form.getForm().reset();
                                    me.movementgrid.getStore().load();
									me.detailgrid.getStore().load();
                                }
                            });
    				}
                }
			);  
    	}
    },
	
	//从grid获取主表参数，删除主表和相关明细表记录的方法
	onDelete: function(){
		var me = this;
		var records = this.movementgrid.getSelectionModel().getSelection(); 
		if(records == ""){
			MessageBox.error('错误提示','请选择操作的数据！');
			return;
		}
		var data = records[0].getData();
        
        Ext.MessageBox.confirm('询问提示', '确定要删除吗？', 
            function(btn){
                if(btn == 'yes'){    
                    Ext.Ajax.request({
                        url: basePath + '/inventory/doDeleteMovement.action',
                        params: {
                            moveKey: data.moveKey
                        },
                        success: function(response){
                            var text = Ext.decode(response.responseText);
                            var success = text.success;
                            MessageBox.show(success, text.json.msg);
                            me.movementgrid.getStore().load();
							me.detailgrid.getStore().load();
                        }
                    });
                }
            }
        );
	},
	
	//整单移动按钮方法,从grid获取主表参数
	onMove: function(){
		var me = this;
		var records = this.movementgrid.getSelectionModel().getSelection(); 

        //移库未结束前禁用按钮
        Ext.getCmp('allMovFst').disable();
        Ext.getCmp('allMovSnd').disable();
        Ext.getCmp('detailMov').disable();        

		if(records == ""){
			MessageBox.error('错误提示','请选择操作的数据！');
            //返回前使能按钮
            Ext.getCmp('allMovFst').enable();
            Ext.getCmp('allMovSnd').enable();
            Ext.getCmp('detailMov').enable();             
			return;
		}
		var data = records[0].getData();
        
        Ext.MessageBox.confirm('询问提示', '确定要移动吗？', 
            function(btn){
                if(btn == 'yes'){ 
					var mask = new Ext.LoadMask(me.getEl(), { 
						msg : 'please wait...' 
					});
					mask.show(); 
                    Ext.Ajax.request({
                        url: basePath + '/inventory/doMovement.action',
                        params: {
                            moveKey: data.moveKey,
							storerKey:data.storerKey
                        },
                        success: function(response){
                            var text = Ext.decode(response.responseText);
                            var success = text.success;
							mask.hide();    
                            MessageBox.show(success, text.json.msg);
                            me.movementgrid.getStore().load();
							me.detailgrid.getStore().load();
                            //整单执行移动成功后设置货主只读
                            me.pt2topform.getForm().findField('storerKey').setReadOnly(true);
                        },
						timeout: 100000000
                    });
                }
            }
        );
        //移库完成后使能按钮
        Ext.getCmp('allMovFst').enable();
        Ext.getCmp('allMovSnd').enable();
        Ext.getCmp('detailMov').enable();        
	},
	
	//整单移动按钮方法,从form获取主表参数
	onMovementAndDetal: function(){
		var me = this;
    	var record = me.pt2topform.getForm().getFieldValues(); 

        //移库未结束前禁用按钮
        Ext.getCmp('allMovFst').disable();
        Ext.getCmp('allMovSnd').disable();
        Ext.getCmp('detailMov').disable();        

    	if(record.moveKey == ""){
    		MessageBox.error('错误提示','请选择操作的数据！');
            //返回前使能按钮
            Ext.getCmp('allMovFst').enable();
            Ext.getCmp('allMovSnd').enable();
            Ext.getCmp('detailMov').enable();              
    		return;
    	}
		Ext.MessageBox.confirm('询问提示', '确定要移动吗？', 
            function(btn){
                if(btn == 'yes'){   
					var mask = new Ext.LoadMask(me.getEl(), { 
						msg : 'please wait...' 
					});
					mask.show(); 				
                    Ext.Ajax.request({
                        url: basePath + '/inventory/doMovement.action',
                        params: {
                            moveKey: record.moveKey,
							storerKey:record.storerKey
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
								me.movementgrid.getStore().load();
								me.detailgrid.getStore().load();

								//整单移库完成时，更新主表状态，并 根据主表状态判断是否需要设置主表的字段为只读
								Ext.Ajax.request({
									url: basePath + '/inventory/doQueryMovementStatus.action',
									params: {
										moveKey: record.moveKey
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
												me.onSetMovementKeyReadOnly(true); //根据状态设置是否可以编辑
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
        //移库完成后使能按钮
        Ext.getCmp('allMovFst').enable();
        Ext.getCmp('allMovSnd').enable();
        Ext.getCmp('detailMov').enable();        
	},
	
	
	//明细移动按钮的方法
	onDetailMove:function(){
		var me = this;
		var records = this.detailgrid.getSelectionModel().getSelection(); 
		var record = me.pt2topform.getForm().getFieldValues(); 

        //移库未结束前禁用按钮
        Ext.getCmp('allMovFst').disable();
        Ext.getCmp('allMovSnd').disable();
        Ext.getCmp('detailMov').disable();        

		if(records == ""){
			MessageBox.error("错误提示","请选择要操作的数据！");
            //返回前使能按钮
            Ext.getCmp('allMovFst').enable();
            Ext.getCmp('allMovSnd').enable();
            Ext.getCmp('detailMov').enable();              
		 	return;
		} 
		var ids = []; 
		Ext.Array.each(records, function(name, index, countriesItSelf) {
			ids.push(name.getData().id);
		});

        Ext.MessageBox.confirm('询问提示', '确定要移动吗？', 
            function(btn){
                if(btn == 'yes'){  
					var mask = new Ext.LoadMask(me.getEl(), { 
						msg : 'please wait...' 
					});
					mask.show(); 
                    Ext.Ajax.request({
                        url: basePath + '/inventory/doMovementDetail.action',
                        params: {
                            ids: ids,
							storerKey:record.storerKey
                        },
                        success: function(response){
                            var text = Ext.decode(response.responseText);
                            var success = text.success;
							mask.hide();    
                            MessageBox.show(success, text.json.msg);
                            
							//移库完成时，需要设置这几个字段为只读
							if(true==success)
							{
								me.pt2pn1form.getForm().reset();   //清空后状态更新问题就不存在了
								me.movementgrid.getStore().load();
								me.detailgrid.getStore().load();
								//移库完成时，更新主表状态，并 根据主表状态判断是否需要设置主表的字段为只读
								Ext.Ajax.request({
									url: basePath + '/inventory/doQueryMovementStatus.action',
									params: {
										moveKey: record.moveKey
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
												me.onSetMovementKeyReadOnly(true); //根据状态设置是否可以编辑
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
        //移库完成后使能按钮
        Ext.getCmp('allMovFst').enable();
        Ext.getCmp('allMovSnd').enable();
        Ext.getCmp('detailMov').enable();        
	},
	
    //以上是方法，下面开始创建界面
	
	
    createCntPanel: function(){    //创建第一个tab页，继承自 Ext.panel.Panel
    	var me = this;
    	this.cntpanel = Ext.create('Ext.panel.Panel',{
    		layout: 'border',
    		border: false,
    		title: '基本',
    		items:[this.createMovementGrid(),this.createTopPanel()]
    	});
    	return this.cntpanel;
    },
    createMovementGrid: function(){     // 创建第一个tab页的grid
    	var me = this;
    	this.movementgrid = Ext.create('widget.movementgrid',{
    		region: 'center',
    		listeners: {
    			itemdblclick: function(grid,record){
    				me.setActiveTab(1);
    				me.pt2topform.getForm().loadRecord(record);
					me.pt2pn1form.getForm().reset();
					me.detailgrid.getStore().load();
                    
                    //关键字段设置只读
					me.onSetMovementKeyReadOnly(true);	
    			}
    		}
    	});
    	this.movementgrid.getStore().on('beforeload',function(){    //启动时查询，加载的内容
    		var params = this.movementgrid.getStore().getProxy().extraParams;
    		var record = me.pt1topform.getForm().getValues();

    		var storerKey = record.storerKey;  
    		var status = record.status;  
    		var moveKey = record.moveKey;
			var effectiveDateStr= record.effectiveDateStr; 
			var effectiveDateEnd= record.effectiveDateEnd; 			
			
			delete params.storerKey;
			delete params.status;
			delete params.moveKey;
			delete params.effectiveDateStr;
			delete params.effectiveDateEnd;

			if(storerKey) params.storerKey = storerKey;
			if(status) params.status = status;
			if(moveKey) params.moveKey = moveKey;
			if(effectiveDateStr) params.effectiveDateStr = effectiveDateStr;
			if(effectiveDateEnd) params.effectiveDateEnd = effectiveDateEnd;
			
    	},this);
    	return this.movementgrid;
    },
    
    createTopPanel: function(){  //创建第一页的TOP panel   继承自 Ext.panel.Panel 
		var me = this;
		this.toppanel = Ext.create('Ext.panel.Panel',{
			region: 'north',

			border:false,
			height: 90,
			layout: 'border',
			items:[me.createPt1TopForm(),me.createPt1TopBtnPanel()]     //创建topform 和 btn panel
		});
		return this.toppanel;
	},
	createPt1TopForm: function(){    //创建Top form  继承自 Ext.form.Panel 
		var me = this;
		this.pt1topform = Ext.create('Ext.form.Panel',{   
			region: 'north',
			frame: true,
			height: 50,
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
                            
                            items: [{
                                    xtype:'textfield',
									fieldLabel: '货主',
									name:'storerKey',
									labelWidth : 40,
									width:180,
									listeners:{
										blur:function(txt){
											txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
										}
									}
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'moveKey',
                                    fieldLabel: '移库单号',
                                    labelWidth : 60,
                                    width:180
                                },
                                {
                                    name: 'status',
                                    xtype:'combobox',
                                    fieldLabel: '状态',
                                    labelWidth : 40,
                                    displayField: 'text',
                                    valueField: 'value',
                                    store:Ext.create('Ext.data.Store', {
                                         fields: ['text','value'],
                                         data: [{text:'新建',value:'0'},{text:'部分完成',value:'1'},{text:'完成',value:'2'},{text:'关闭',value:'9'}]
                                    }),
                                    forceSelection: true,
                                    labelWidth : 80,
                                    width:180
                                },
                                {
                                    xtype:'datefield',
                                    name: 'effectiveDateStr',
                                    fieldLabel: '移库时间',
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
	    
		return this.pt1topform;
	},   //end  createPt1TopForm
	
    createPt1TopBtnPanel: function(){
    	var me = this;
    	this.pt1topbtnpanel = Ext.create('Ext.form.Panel',{  //  创建btn panel ，继承自 Ext.form.Panel
    		region: 'center',
    		frame: true,
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
					handler: me.onGoCreate, 
                    scope: this
                },
	            {
	            	itemId:'deleteToolbar',
                	iconCls: 'icon-delete',
	                text: '删除',
	                handler: this.onDelete,  //需要新增方法
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
                    text : "整单移动",
                    scope : this,
                    id:'allMovFst',
                    handler:  this.onMove

                }					
            ]

    	});
    	return this.pt1topbtnpanel;
    },
    
    // 以上第一个tab页创建好了，下边是创建第二个tab页
    
    
    createCntDetailPanel: function(){   //创建第二个tab页，继承自  Ext.panel.Panel
    	var me = this;
    	this.cntdetail = Ext.create('Ext.panel.Panel',{    
    		layout: 'border',
    		border: false,
    		title: '详细',
    		items:[this.createPt2Pn1Panel(),this.createPt2TopPanel()]  //只有一个grid，其他可以删除了
    	});
    	return this.cntdetail;
    },
 
	createPt2TopPanel: function(){
     	this.pt2toppanel = Ext.create('Ext.panel.Panel',{
    		region: 'north',
    		layout: 'border',
    		border: false,
    		height: 80,
    		items:[this.createPt2TopForm(),this.createPt2TopBtnPanel()]
    	});
    	return this.pt2toppanel;
    },
	
	createPt2TopBtnPanel: function(){
    	var me = this;
    	this.pt2topbtnpanel = Ext.create('Ext.form.Panel',{  //  创建btn panel ，继承自 Ext.form.Panel
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
					xtype:'button',
                    text : "整单移动",
                    id:'allMovSnd',
                    scope : this,
                    handler:  this.onMovementAndDetal
                },
				{
                    text : "明细移动",
                    id:'detailMov',
                    scope : this,
                    handler:  this.onDetailMove
                },
                {
                    text : "从库存提取",
                    id:'detailMov',
                    scope : this,
                    handler:function(){
                        this.creatTransactionWindowPanel();
                        this.winformtran.show();
                    }
                },
                {
                    text : "库位批量修改",
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
    
    createPt2TopForm: function(){
        var me = this;
        this.pt2topform = Ext.create('Ext.form.Panel',{
            region: 'north',
            frame: true,
            layout: 'anchor',
/*            defaults: {
                xtype: 'textfield',
                margin: '5 0 0 5',
                labelWidth: 40
            },*/
            items: [
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
                                xtype:'textfield',
                                name: 'moveKey',
                                fieldLabel: '移库单号',
                                labelWidth : 60,
                                readOnly: true,
                                allowBlank: false
                            },
                            {
                                xtype:'textfield',
                                fieldLabel: '货主',
                                name:'storerKey',
                                allowBlank:false,
                                labelWidth : 40,
                                width:100,
                                listeners:
                                {
                                    blur: function(txt){
                                    //输入参数，鼠标离开后见检查该商品是否存在
                                        var storerKeyValue= Ext.util.Format.uppercase(txt.getValue());
                                        txt.setValue(storerKeyValue);
                                        skuValue= me.pt2pn1form.getForm().findField('sku').getValue('');
                                        if(''!=skuValue) 
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
                                                        MessageBox.show(false, '货主与商品不匹配！');   
                                                        me.pt2pn1form.getForm().findField('sku').setValue('');
                                                    }
                                                }
                                            });
                                        }
                                    } 
                                } //end listeners
                            },
                            {
                                name: 'status',
                                xtype:'combobox',
                                fieldLabel: '状态',
                                 width:100,
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
                            {
                                xtype:'datefield',
                                format:'Y-m-d H:i:s',
                                name: 'addDate',
                                fieldLabel: '移库时间',
                                labelWidth : 60,
                                value:new Date(),
                                width:210
                            },
                            {
                                xtype:'textfield',
                                name: 'addWho',
                                fieldLabel: '移库人',
                                labelWidth : 60,
                                hidden:true
                            }
                        ]
                    },
                    {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        defaults: {
                            labelWidth: 100,
                            margin: '5 0 0 5',
                            xtype: 'textfield'
                        },
                        items: [
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
                                margin: '3 2 3 2',  
                                text: ' 创建 ',
                                handler: me.onGoCreate, 
                                scope: this
                            },              
                            {
                                xtype:'button',
                                margin: '3 2 3 2',  //控制在行的中间
                                text : " 保存 ",
                                id:'saveBtn',
                                iconCls: 'icon-save',
                                scope : this,
                                handler: this.saveMovement
                            },
                            {
                                xtype:'button',
                                margin: '3 2 3 2',  //控制在行的中间
                                iconCls: 'icon-delete',
                                text: ' 删除 ',
                                handler: this.deleteMovementAndDetail,
                                scope: this
                            }
                        ]
                    }
            ]
        });
        return this.pt2topform;
    },
    
    //底部面板，包括一个grid和一个form 
    createPt2Pn1Panel: function(){
        this.pt2pn1panel = Ext.create('Ext.panel.Panel',{
            region: 'center',
            layout: 'border',
            items: [this.createDetailGrid(),this.createPt2Pn1Form()]
        });
        return this.pt2pn1panel;
    },
    //底部左边grid
    createDetailGrid: function(){
        var me = this;
        this.detailgrid = Ext.create('widget.movementdetailgrid',{
            region: 'center',
            listeners: {
                itemclick: function(grid,record){
                    me.pt2pn1form.getForm().loadRecord(record);
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
            var moveKey = record.moveKey;
            delete params.moveKey;
            if(moveKey) params.moveKey = moveKey;
        },this);
        return this.detailgrid;
    },
	
	//底部右边form
	createPt2Pn1Form: function(){
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
        });
        
		
    	this.pt2pn1form = Ext.create('Ext.form.Panel',{
    		region: 'east',
    		width: 320,
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
    					labelWidth: 80,
    					width: 285
    				},
    				items: [
        				{
        					fieldLabel: '行号',
        					allowBlank: false,
							readOnly:true,
        					name: 'lineNumber'
    				    },
						{
							name:'id',
							hidden:true
						}
    				]
    			},
				{
    				layout: 'hbox',
    				defaults: {
    					xtype: 'textfield',
    					margin: '5 0 0 5',
    					labelWidth: 80,
    					width: 285
    				},
    				items: [
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
							value: '0'
    				    }
    				]
    			},
        		{
    				layout: 'hbox',
    				defaults: {
    					xtype: 'textfield',
    					margin: '5 0 0 5',
    					labelWidth: 80,
    					width: 285
    				},
    				items: [
        				{
        					fieldLabel: '商品',
        					allowBlank: false,
							name: 'sku',
        					listeners:{
                                    blur: function(txt){
                                       //输入参数，鼠标离开后见检查该商品是否存在
										var skuValue= Ext.util.Format.uppercase(txt.getValue());
										txt.setValue(skuValue);
                                        lotValue=me.pt2pn1form.getForm().findField('lot').getValue();
                                        locValue=me.pt2pn1form.getForm().findField('fromloc').getValue();
										storerKeyValue=me.pt2topform.getForm().findField('storerKey').getValue();
										
                                        if(''!=skuValue && ''!=lotValue  && ''!=locValue  && ''!=storerKeyValue)
                                        {
                                            Ext.Ajax.request({
                                                url: basePath + '/inventory/doQuerryMovementDetail.action',
                                                params: {
                                                    sku:skuValue,
													lot:lotValue,
													fromloc:locValue
                                                },
                                                success: function(response){    //failure属于连不上服务器的情况，后续补充
                                                    var text = Ext.decode(response.responseText);
                                                    var success = text.success;
                                                    if(0 != text.json.data.length)
                                                    {
                                                        me.pt2pn1form.getForm().findField('qty').setValue(text.json.data[0].qty);
														me.pt2pn1form.getForm().findField('packKey').setValue(text.json.data[0].lottable11);
														if(text.json.data[0].storerKey==storerKeyValue){
														}else{
															me.pt2pn1form.getForm().findField('sku').setValue('');
															Ext.Msg.alert("错误提示", '商品与货主不匹配！')
														}
													}
                                                    else
                                                    {
                                                        me.pt2pn1form.getForm().findField('qty').setValue('');
														me.pt2pn1form.getForm().findField('packKey').setValue('');
														me.pt2pn1form.getForm().findField('lot').setValue('');
                                                        Ext.Msg.alert("错误提示", '查不到相关记录！')
                                                    }
                                                }
                                            })
                                        }
                                    }
                                }//end listener 
    				    }
    				]
    			},
    			{
    				layout: 'hbox',
    				defaults: {
    					xtype: 'textfield',
    					margin: '5 0 0 5',
    					width: 285,
    					labelWidth: 80
    				},
    				items: [
        				{
        					fieldLabel: '源库位',
        					allowBlank: false,
							name: 'fromloc',
							listeners: {
								blur: function(txt){
                                       //输入参数，鼠标离开后见检查该商品是否存在
										var locValue= Ext.util.Format.uppercase(txt.getValue());
										txt.setValue(locValue);
                                        lotValue=me.pt2pn1form.getForm().findField('lot').getValue();
                                        skuValue=me.pt2pn1form.getForm().findField('sku').getValue();
                                        storerKeyValue=me.pt2topform.getForm().findField('storerKey').getValue();
										
                                        if(''!=skuValue && ''!=lotValue  && ''!=locValue  && ''!=storerKeyValue)
                                        {
                                            Ext.Ajax.request({
                                                url: basePath + '/inventory/doQuerryMovementDetail.action',
                                                params: {
                                                    sku:skuValue,
													lot:lotValue,
													fromloc:locValue
                                                },
                                                success: function(response){    //failure属于连不上服务器的情况，后续补充
                                                    var text = Ext.decode(response.responseText);
                                                    var success = text.success;
                                                    if(0 != text.json.data.length)
                                                    {
                                                        me.pt2pn1form.getForm().findField('qty').setValue(text.json.data[0].qty);
                                                        me.pt2pn1form.getForm().findField('packKey').setValue(text.json.data[0].lottable11);
                                                        if(text.json.data[0].storerKey==storerKeyValue){
                                                        }else{
                                                            me.pt2pn1form.getForm().findField('sku').setValue('');
                                                            Ext.Msg.alert("错误提示", '商品与货主不匹配！')
                                                        }
                                                    }
                                                    else
                                                    {
                                                        me.pt2pn1form.getForm().findField('qty').setValue('');
                                                        me.pt2pn1form.getForm().findField('packKey').setValue('');
                                                        me.pt2pn1form.getForm().findField('lot').setValue('');
                                                        Ext.Msg.alert("错误提示", '查不到相关记录！')
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
    					xtype: 'textfield',
    					margin: '5 0 0 5',
    					width: 285,
    					labelWidth: 80
    				},
    				items: [
        				{
        					fieldLabel: '批次',
							allowBlank: false,
							listeners: {
								blur: function(txt){
                                       //输入参数，鼠标离开后见检查该商品是否存在
                                        var lotValue= Ext.util.Format.uppercase(txt.getValue());
										txt.setValue(lotValue);
                                        locValue=me.pt2pn1form.getForm().findField('fromloc').getValue();
                                        skuValue=me.pt2pn1form.getForm().findField('sku').getValue();
                                        storerKeyValue=me.pt2topform.getForm().findField('storerKey').getValue();
										
                                        if(''!=skuValue && ''!=lotValue  && ''!=locValue  && ''!=storerKeyValue)
                                        {
                                            Ext.Ajax.request({
                                                url: basePath + '/inventory/doQuerryMovementDetail.action',
                                                params: {
                                                    sku:skuValue,
													lot:lotValue,
													fromloc:locValue
                                                },
                                                success: function(response){    //failure属于连不上服务器的情况，后续补充
                                                    var text = Ext.decode(response.responseText);
                                                    var success = text.success;
                                                    if(0 != text.json.data.length)
                                                    {
                                                        me.pt2pn1form.getForm().findField('qty').setValue(text.json.data[0].qty);
														me.pt2pn1form.getForm().findField('packKey').setValue(text.json.data[0].lottable11);
														if(text.json.data[0].storerKey==storerKeyValue){
														}else{
															me.pt2pn1form.getForm().findField('sku').setValue('');
															Ext.Msg.alert("错误提示", '商品与货主不匹配！')
														}
													}
                                                    else
                                                    {
                                                        me.pt2pn1form.getForm().findField('qty').setValue('');
														me.pt2pn1form.getForm().findField('packKey').setValue('');
														me.pt2pn1form.getForm().findField('lot').setValue('');
                                                        Ext.Msg.alert("错误提示", '查不到相关记录！')
                                                    }
                                                }
                                            })
                                        }
                                    }
        	    			},
        					name: 'lot'
        				}
    				]
    			},
				{
    				layout: 'hbox',
    				defaults: {
						xtype: 'numberfield',
    					margin: '5 0 0 5',
    					width: 285,
    					labelWidth: 80
    				},
    				items: [
        				{
        					fieldLabel: '库存',
							decimalPrecision:3,
        					name: 'qty'
        				}
    				]
    			},
				{
    				layout: 'hbox',
    				defaults: {
    					xtype: 'textfield',
    					margin: '5 0 0 5',
    					width: 285,
    					labelWidth: 80
    				},
    				items: [
        				{
        					fieldLabel: '移至库位',
        					name: 'toloc',
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
    					width: 285,
    					labelWidth: 80
    				},
    				items: [
        				{
        					 fieldLabel: '包装',
                                xtype:'textfield',
                                name: 'packKey',
                                listeners: {   //选中包装后,
                                    blur: function(txt){
                                        packKeyValue=Ext.util.Format.uppercase(txt.getValue());
                                        txt.setValue(packKeyValue);
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
                                                    if(0 == text.json.data.length)
                                                    {
														me.pt2pn1form.getForm().findField('packKey').setValue('');
														me.pt2pn1form.getForm().findField('uom').setValue('');
                                                        MessageBox.show(false, '包装不存在');
                                                    }
                                                }
                                            })
                                        }
                                    }
                                },
                                allowBlank: false
        				}
    				]
    			},
				{
    				layout: 'hbox',
    				defaults: {
    					xtype: 'textfield',
    					margin: '5 0 0 5',
    					width: 285,
    					labelWidth: 80
    				},
    				items: [
        				{
        					 fieldLabel: '单位',
                                name: 'uom',
                                xtype:'combobox',
                                store:myStore,
                                mode: 'remote',
								triggerAction : 'all',
								minListWidth:220,
								displayField: 'description',
								valueField: 'uomCode',
								lastQuery: '',
								listeners: {
									expand : function(){
										packKeyValue=me.pt2pn1form.getForm().findField('packKey').getValue();
										myStore.load({params:{packKey:packKeyValue}});
									}
								}  						
        				}
    				]
    			},
				{
    				layout: 'hbox',
    				defaults: {
    					xtype: 'numberfield',
    					margin: '5 0 0 5',
    					width: 285,
    					labelWidth: 80
    				},
    				items: [
        				{
        					fieldLabel: '单位数量',
							decimalPrecision:3,
							listeners: {   //选中包装后,
									blur: function(txt){
                                        uomqtyValue=txt.getValue(); 
										packKeyValue = me.pt2pn1form.getForm().findField('packKey').getValue();
										uomValue= me.pt2pn1form.getForm().findField('uom').getValue();
										if((''!=uomValue)&&(''!=packKeyValue))
                                        {
                                            Ext.Ajax.request({
                                                url: basePath + '/support/doQuerySkuPackQty.action',
                                                params: {
                                                    uomCode:uomValue,   //需要验证这里查询参数是什么？重点关注
                                                    packKey:packKeyValue
                                                },
                                                success: function(response){    //failure属于连不上服务器的情况，后续补充
                                                    var text = Ext.decode(response.responseText);
                                                    var success = text.success;
                                                    if(''!= text.json.data || null != text.json.data)
                                                    {
                                                        var uomQty=text.json.data;
                                                        me.pt2pn1form.getForm().findField('qtyMoved').setValue(uomqtyValue*uomQty);
                                                    }
                                                }
                                            })
                                        }  
                                    }
                                },  
                            name: 'uomqty'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults: {
                        xtype: 'numberfield',
                        margin: '5 0 0 5',
                        width: 285,
                        labelWidth: 80
                    },
                    items: [
                        {
                            fieldLabel: '移库数',
                            decimalPrecision:3,
                            name: 'qtyMoved'
                        }
                    ]
                }
            ]
        });
        return this.pt2pn1form;
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
        var moveKey=this.pt2topform.getForm().findField('moveKey').getValue();
        var storerKey=this.pt2topform.getForm().findField('storerKey').getValue();
        var status=this.pt2topform.getForm().findField('status').getValue();
        var effectiveDate=Ext.util.Format.date(this.pt2topform.getForm().findField('addDate').getValue(),'Y-m-d H:i:s');;
//        console.log(effectiveDate);
        var records = me.Transactiongrid.getSelectionModel().getSelection();
        if((records == ""))
        {
            MessageBox.error("错误提示","请选择要操作的数据！");
            return;
        } 
        if(""==storerKey)
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
                url: basePath + '/inventory/importMoveFromTransaction.action',
                params: {
                    ids: ids,
                    moveKey: moveKey,
                    storerKey: storerKey,
                    status:status,
                    effectiveDate:effectiveDate
                },
                success: function(response){
                    var text = Ext.decode(response.responseText);
                    var success = text.success;
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
        me.movementgrid.getStore().load();
        me.winformtran.close();
        me.setActiveTab(0);
        me.detailgrid.getStore().load();
    },
    //修改结算幅宽和结算面积，长阳专用
    createWinAmendFrom: function(){
        var me = this;
        this.winamendform = Ext.create('Ext.window.Window',{
            title: '库位批量修改',
            height: 200,
            width: 250,
            layout: 'vbox',
            defaults: {
                xtype: 'fieldcontainer'
            },
            items: [
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 60,
                        margin: '5 0 0 10',
                        xtype: 'textfield',
                        width: 200
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
                        labelWidth: 60,
                        width: 200,
                        xtype: 'textfield'
                    },
                    items: [
                        {
                            fieldLabel: '移至库位',
                            itemId: 'toLocId',
                            name: 'toloc',
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
                                                	me.winamendform.queryById('toLocId').setValue();  
                                                    MessageBox.show(false, '库位不存在！');   
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
                    defaults:{
                        margin: '0 0 0 10',
                        labelWidth: 60,
                        width: 200,
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
        var moveKeyValue=this.pt2topform.getForm().findField('moveKey').getValue();
        var firstLineValue = me.winamendform.queryById('firstLineId').getValue();
        var toLocIdValue = me.winamendform.queryById('toLocId').getValue();
        var lastLineValue = me.winamendform.queryById('lastLineId').getValue();
        var toLastValue = me.winamendform.queryById('toLastId').getValue();
        if(null==moveKeyValue ||''== moveKeyValue){
            MessageBox.error("错误提示","请填写移库单号！");
            return;
        }

        if(((''==lastLineValue)&&(false==toLastValue)))
        {
            MessageBox.error("错误提示","请填写结束行");
            return;
        }
        Ext.Ajax.request({
            url: basePath + '/inventory/doToLocAmendForCY.action',
            params: {
                moveKey:moveKeyValue,
                firstLineValue: firstLineValue,
                toLoc: toLocIdValue,
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
	    	xtype:'movementmanager',
	    	region:'center'
	    }]
	});
});