/******************************************************
批量分配 BatchAllocate.js

******************************************************/

Ext.define('StoreSoGrid', {
    extend: 'Ext.data.Model',
    fields: [
        {name:'id'},
        {name:'externorderkey'},
        {name:'orderKey'},  //SO单号
        {name:'type'},      //SO类型
        {name:'ordergroup'}, //订单组别
        {name:'status'},     //SO状态
		{name:'opstatus'},//处理状态
        {name:'orderDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},//创建日期
        {name:'storerKey'},//货主
        {name:'storerDescr'},//货主名称
        {name:'dateStart',type:'date',dateFormat : 'Y-m-d H:i:s.u'},//预期发货日期
        {name:'dateEnd',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
        {name:'requetedshipdate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},//要求发货日期
        {name:'actualshipdate',type:'date',dateFormat : 'Y-m-d H:i:s.u'}, //实际发货日期
        {name:'deliveryDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},//提货日期
        {name:'priority'},//优先级
        {name:'consigneeKey'},//收货人
        {name:'consigneeCompany'},//收货人名称
        {name:'orderNumber'},//客户订单号
        {name:'dock'},//发货平台
        {name:'retailReference'},//分销商参考号
        {name:'buyerpo'},//采购商PO号
        {name:'carrierReference'},//承运商参考号
        {name:'warehouseReference'},//仓库参考号
        {name:'otherReference1'},//其他参考号1
        {name:'otherReference2'},//其他参考号2
        {name:'otherReference3'},//其他参考号3
        {name:'susr1'},//用户自定义1
        {name:'susr2'},//用户自定义2
        {name:'susr3'},//用户自定义3
        {name:'susr4'},//用户自定义4
        {name:'susr5'},//用户自定义5
        {name:'notes'},//备注
        {name:'carrierKey'},//承运商
        {name:'carrierCompany'},//承运商名称
        {name:'vesselType'},//车型
        {name:'vesselNo'},//车牌号
        {name:'driver'},//司机
        {name:'transMethod'},//运输方式
        {name:'vesselDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},//装车时间
        {name:'placeofdischarge'},//卸货地点
        {name:'paymentTerms'},//支付方式
        {name:'incoTerms'},//交货方式
        {name:'placeofloading'},//装车地点
        {name:'placeofdelivery'},//交货地点
        {name:'paymentNotes'},//支付描述
        {name:'deliveryNotes'},//交货描述
        {name:'origincountry'},//原产国
        {name:'destination'},//目的地
        {name:'buyer'},//购买方
        {name:'buyerCompany'},//购买方名称
        {name:'buyerAddress'},//购买方地址
        {name:'buyerContact'},//购买方联系人
        {name:'buyerMobile'},//购买方手机
        {name:'buyerTel'},//购买方电话
        {name:'billto'},//结算方
        {name:'billtoName'},//结算方名称
        {name:'billtoAddress'},//结算方地址
        {name:'billtoContact'},//结算方联系人
        {name:'billtoMobile'},//结算方手机
        {name:'billtoTel'},//结算方电话
        {name:'consigneeAddress'},//收货方地址
        {name:'consigneeContact'},//收货方联系人
        {name:'consigneeMobile'},//收货方手机
        {name:'consigneeTel'},//收货方电话
        {name:'buyerNation'},
        {name:'buyerProvince'},
        {name:'buyerCity'},
        {name:'buyerCounty'},
        {name:'buyerPosition'},
        {name:'buyerFax'},
        {name:'buyerEmail'},
        {name:'billtoNation'},
        {name:'billtoProvince'},
        {name:'billtoCity'},
        {name:'billtoCounty'},
        {name:'billtoPosition'},
        {name:'billtoFax'},
        {name:'billtoEmail'},
        {name:'consigneeNation'},
        {name:'consigneeProvince'},
        {name:'consigneeCity'},
        {name:'consigneeCounty'},
        {name:'consigneePosition'},
        {name:'consigneeFax'},
        {name:'consigneeEmail'},
        {name:'addDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},//添加日期
        {name:'addWho'},//添加人
        {name:'editDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},//修改日期
        {name:'editWho'}//修改人
    ],
    idProperty: 'id'
});

//EXTJS ajax的同步调用
function ajaxSyncCall(value, paramsStr) {   
    var obj;   
    var value;   
    if (window.ActiveXObject) {   
        obj = new ActiveXObject('Microsoft.XMLHTTP');   
    }else if (window.XMLHttpRequest) {   
        obj = new XMLHttpRequest();   
    }   
    obj.open('POST', basePath+'/system/queryCodeDetail.action', false);   
    obj.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');   
    obj.send(paramsStr);   
    var result = Ext.decode(obj.responseText);   
    
    var arr = result.json.data;  
    var desc = ''
    Ext.Array.each(arr, function(name, index, countriesItSelf) {
    	if(name.codeValue == value){
    		desc = name.description;
    	}
	});
    return  desc;
}


Ext.define('Redm.batch.SoGrid', {
    extend: 'Redm.BaseGrid',
    alias : 'widget.sogrid',
    loadMask: true,
    forceLayout:true,
    selModel: Ext.create('Ext.selection.CheckboxModel'),
    buildColumns: function(){
        this.columns = [
		    { header: "SO单号", dataIndex: 'orderKey',width: 100, sortable: true},
		    { header: "货主", dataIndex: 'storerKey', width: 110, sortable: true},
		    { header: "SO类型", dataIndex: 'type', width: 80, sortable: true,
			    renderer: function(value,metadata,record){
					return ajaxSyncCall(value,'codeType=SOTYPE');
                }
            },
		    { header: "SO状态", dataIndex: 'status', width: 110, sortable: true,
                    renderer:this.rendererStatusFunc
            },   
   		    { header: "处理状态", dataIndex: 'opstatus', width: 60, sortable: true,
                    renderer:this.opStatusFunc
            },               
		    { header: "预期发货日期", dataIndex: 'orderDate', width: 120, sortable: true,renderer : Ext.util.Format.dateRenderer('Y-m-d H:i')},
		    { header: "客户订单号", dataIndex: 'orderNumber', width: 110, sortable: true},
//		    { header: "运输到", dataIndex: '', width: 150, sortable: true},
//		    { header: "承运人", dataIndex: '', width: 110, sortable: true},
		    { header: "承运商", dataIndex: 'carrierKey', width: 110, sortable: true},
		    { header: "采购商PO号", dataIndex: 'buyerpo', width: 110, sortable: true}, 
		    { header: "承运商参考号", dataIndex: 'carrierReference', width: 110, sortable: true},
		    { header: "仓库参考号", dataIndex: 'warehouseReference', width: 110, sortable: true},
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
		this.buildStore(basePath + '/batch/doQueryOrdersForAssign.action','StoreSoGrid',20);
    	this.on('itemdblclick',function(grid,record){    //鼠标双击就会跳到另外一个页面
            },this);
        this.callParent(arguments);
    },
    
//发货单状态解析函数
    rendererStatusFunc:function(value)
    {
        var retValue;
        if(value=='0') retValue='新建';
        else if(value=='1') retValue='部分分配';
        else if(value=='2') retValue='全部分配';
        else if(value=='5') retValue='部分分配部分发货';
        else if(value=='6') retValue='部分分配全部发货';
        else if(value=='7') retValue='全部分配部分发货';
        else if(value=='8') retValue='全部分配全部发货';
        else if(value=='9') retValue='关闭';
        //else  retValue=value;
        return retValue;
    },  
     
    opStatusFunc:function(value)
    {
        var retValue;
        if(value=='0') retValue='未上传';
        else if(value=='5') retValue='上传中';
        else if(value=='9') retValue='上传完成';
        else  retValue=value;
        return retValue;
    }
});


Ext.define('Redm.Batch.Allocate',{
	extend: 'Ext.panel.Panel',
    alias : 'widget.batchallocatemanager',
    title:'批量分配',
    layout: 'border',
    initComponent: function(){
    	var me = this;
    	this.items = [this.createPn1Panel(),this.createPn2Panel()];
        this.callParent(arguments);
    },
	
    onSelect: function(){
    	this.sogrid.getStore().load();
    },

    
    onReset: function(){
    	this.pt1f1form.getForm().reset();
    },
	
	//从grid获取主表参数，删除主表和相关明细表记录的方法
	onDelete: function(){
		var me = this;
		var records = this.sogrid.getSelectionModel().getSelection(); 
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
                            me.sogrid.getStore().load();
                        }
                    });
                }
            }
        );
	},

    //多个订单分配
    onOrderMultiAssign:function(){
        var me = this;
		var records = this.sogrid.getSelectionModel().getSelection();
        
		if(records == ""){
			MessageBox.error('错误提示','请选择操作的数据！');
			return;
    	}else{
            var ids = []; 
            Ext.Array.each(records, function(name, index, countriesItSelf) {
                ids.push(name.getData().id);
            });
        
            Ext.getCmp('orderBtn').disable();
            var data = records[0].getData();
			var mask = new Ext.LoadMask(me.getEl(), { 
				msg : 'please wait...' 
			});
			mask.show(); 
		
            Ext.Ajax.request({
			    url: basePath + '/batch/doMultiOrderAssign.action',
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
                        me.sogrid.getStore().load();
                    }
			    },
				timeout: 100000000
			});
    	}
        //分配完成后使能收货按钮
        Ext.getCmp('orderBtn').enable();        
    },
    
    
    //发货按钮，支持多个订单发货
    onMultiShip: function(){
		var me = this;
		var records = this.sogrid.getSelectionModel().getSelection();

        //发货未结束前禁用收货按钮
        Ext.getCmp('orderShipFstBtn').disable();

		if(records == ""){
			MessageBox.error("错误提示","请选择要操作的数据！");
            //返回前使能收货按钮
            Ext.getCmp('orderShipFstBtn').enable();
		 	return;
		} 
		var ids = []; 
		Ext.Array.each(records, function(name, index, countriesItSelf) {
			ids.push(name.getData().id);
		});
		  //先查询是否有该orderKey对应的记录
    	Ext.Ajax.request({
		    url: basePath + '/outbound/doValidateMultiOrdersPickedQty.action',
		    params: {
		        ids: ids
		    },
		    success: function(response){
		        var text = Ext.decode(response.responseText);
		        var success = text.success;
                
                //用字符串表示查询结果 0，表示无记录，1，表示当前数量小于发货数量
                //如果有记录，需要确认。如果继续，则删除现有的记录，并重新生成。否则退出不做操作
                if(text.json.msg=='1'){   
                     Ext.MessageBox.confirm('询问提示', '当前拣货数量小于分配数量，确定要发货吗', 
                        function(btn){
                            if(btn == 'yes'){    
                                var mask = new Ext.LoadMask(me.getEl(), { 
								    msg : 'please wait...' 
							        });
									mask.show(); 
							        Ext.Ajax.request({
							            url: basePath + '/outbound/doMultiOrderShip.action',
							            params: {
							                ids: ids
							            },
							            success: function(response){
							                var text = Ext.decode(response.responseText);
							                var success = text.success;
											mask.hide();
							                MessageBox.show(success, text.json.msg);
							                me.getStore().load();   //可能部分执行成功，无论返回值是否true，都要更新grid状态，
							            },
										timeout: 100000000
							        });  		
                                //发货完成后使能收货按钮
							    Ext.getCmp('orderShipFstBtn').enable();
								Ext.getCmp('orderShipBtn').enable();    
				            }else{
				              	 //发货完成后使能收货按钮
							    Ext.getCmp('orderShipFstBtn').enable();
							    Ext.getCmp('orderShipBtn').enable();    
				            }
                        }
                    ); 
                }else{
                	var mask = new Ext.LoadMask(me.getEl(), { 
				    msg : 'please wait...' 
			        });
					mask.show(); 
			        Ext.Ajax.request({
			            url: basePath + '/outbound/doMultiOrderShip.action',
			            params: {
			                ids: ids
			            },
			            success: function(response){
			                var text = Ext.decode(response.responseText);
			                var success = text.success;
							mask.hide();
			                MessageBox.show(success, text.json.msg);
			                me.sogrid.getStore().load();   //可能部分执行成功，无论返回值是否true，都要更新grid状态，
			            },
						timeout: 100000000
			        }); 
			        //发货完成后使能收货按钮
			        Ext.getCmp('orderShipFstBtn').enable();
                }
		    }
    	})
	},
    
	
    //以上是各种方法，下面开始创建页面
	createPn1Panel: function(){  //创建第一页的TOP panel   继承自 Ext.panel.Panel 
		var me = this;
		this.pn1panel = Ext.create('Ext.panel.Panel',{
			region: 'north',
			border:false,
			height: 240,
			layout: 'border',
			items:[me.createPt1F1Form(),me.createPt1F2Form()]     //创建topform 和 btn panel
		});
		return this.pn1panel;
	},
	
    //底部面板，包括一个grid和一个form 
    createPn2Panel: function(){
    	this.pn2panel = Ext.create('Ext.panel.Panel',{
    		region: 'center',
    		layout: 'border',
    		items: [this.createSoGrid()]
    	});
    	return this.pn2panel;
    },
    
	createPt1F1Form: function(){
		var me = this;
		this.pt1f1form = Ext.create('Ext.form.Panel',{   //创建Top form  继承自 Ext.form.Panel 
    		region: 'center',
    		layout: 'vbox',
    		//此处修改查询tab中上面panel的相对高度；
//            height:280,
    		frame: true,
	        stripeRows : true,
			autoScroll : true,
    		defaults: {
    			xtype: 'fieldcontainer',     //公共属性
    			margin: '9 0 0 5'
    		},
    		items: [
                {
                    layout: 'hbox',
                    defaults: {
                        //xtype: 'combobox',
                        xtype: 'textfield',
                        margin: '9 0 0 5',
                        width: 240,
                        labelWidth: 80
                    },
                    items: [
                        {
                            name:'fromstorerKey',  
                            fieldLabel: '货主',
                            listeners:{
                                blur:function(txt){
                                  var newvalue=Ext.util.Format.uppercase(txt.getValue());
                                  txt.setValue(newvalue);
                                  me.pt1f1form.getForm().findField('tostorerKey').setValue(newvalue);
                                }
                            }                                
                        },
                        {
                            name:'tostorerKey',
                            xtype: 'textfield',
                            fieldLabel: '  ------>',
                            listeners:{
                                blur:function(txt){
                                    txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }
                        },                        
                        {
                            fieldLabel: 'SO编号',
                            name:'fromorderKey',  
                            listeners:{
                                blur:function(txt){
                                  var newvalue=Ext.util.Format.uppercase(txt.getValue());
                                  txt.setValue(newvalue);
                                  me.pt1f1form.getForm().findField('toorderKey').setValue(newvalue);
                                }
                            },                            
                            xtype: 'textfield'
                        },
                        {
                            fieldLabel: '  ------>',
                            name:'toorderKey',  
                            xtype: 'textfield',
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
                        xtype: 'combobox',
                        margin: '5 0 0 5',
                        width: 240,
                        labelWidth: 80
                    },
                    items: [
                        {
                            name:'fromtype',   
                            fieldLabel: '类型',
                            xtype:'codecombo',
                            codeType:'SOTYPE',
                            listeners:{
                                blur:function(txt){
                                  me.pt1f1form.getForm().findField('totype').setValue(txt.getValue());
                                }
                            },                            
                        },
                        {
                            name:'totype',   
                            fieldLabel: '  ------>',
                            xtype:'codecombo',
                            codeType:'SOTYPE'
                        },
                        {
                            fieldLabel: '客户订单号',
                            name:'fromorderNumber',
                            xtype: 'textfield',
                            listeners:{
                                blur:function(txt){
                                  var newvalue=Ext.util.Format.uppercase(txt.getValue());
                                  txt.setValue(newvalue);
                                  me.pt1f1form.getForm().findField('toorderNumber').setValue(newvalue);
                                }
                            }
                        },
                        {
                            fieldLabel: '  ------>',
                            name:'toorderNumber',
                            xtype: 'textfield',
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
                        width: 240,
                        labelWidth: 80
                    },
                    items: [
                        {
                            name:'fromcarrierKey',   
                            fieldLabel: '承运商',
                            listeners:{
                                blur:function(txt){
                                  var newvalue=Ext.util.Format.uppercase(txt.getValue());
                                  txt.setValue(newvalue);
                                  me.pt1f1form.getForm().findField('tocarrierKey').setValue(newvalue);
                                }
                            }
                        },
                        {
                            name:'tocarrierKey',   
                            fieldLabel: '  ------>',
                            listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }
                        },
                        {
                            name:'frombuyerpo',   
                            fieldLabel: '采购商PO号',
                            listeners:{
                                blur:function(txt){
                                  var newvalue=Ext.util.Format.uppercase(txt.getValue());
                                  txt.setValue(newvalue);
                                  me.pt1f1form.getForm().findField('tobuyerpo').setValue(newvalue);
                                }
                            }
                        },
                        {
                            name:'tobuyerpo',   
                            fieldLabel: '  ------>',
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
                        width: 240,
                        labelWidth: 80
                    },
                    items: [
                        {
                            xtype: 'datefield',
                            name: 'fromorderDate',
                            fieldLabel: '创建日期',
                            format:'Y-m-d H:i:s',
                            listeners:{
                                blur:function(txt){
                                  me.pt1f1form.getForm().findField('toorderDate').setValue(txt.getValue());
                                }
                            }
                        },
                        {
                            xtype: 'datefield',
                            name: 'toorderDate',
                            fieldLabel: '  ------>',
                            format:'Y-m-d H:i:s'
                        },
                        {
                            xtype: 'datefield',
                            name: 'dateStart',
                            fieldLabel: '预期发货日期',
                            format:'Y-m-d H:i:s',
                            listeners:{
                                blur:function(txt){
                                  me.pt1f1form.getForm().findField('dateEnd').setValue(txt.getValue());
                                }
                            }
                        },
                        {
                            xtype: 'datefield',
                            name: 'dateEnd',
                            fieldLabel: '  ------>',
                            format:'Y-m-d H:i:s'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults: {
                        xtype: 'textfield',
                        margin: '5 0 0 5',
                        width: 240,
                        labelWidth: 80
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: '仓库参考号',
                            name: 'fromwarehouseReference',
                            listeners:{
                                blur:function(txt){
                                  var newvalue=Ext.util.Format.uppercase(txt.getValue());
                                  txt.setValue(newvalue);
                                  me.pt1f1form.getForm().findField('towarehouseReference').setValue(newvalue);
                                }
                            }
                        },                    
                        {
                            xtype: 'textfield',
                            fieldLabel: '  ------>',
                            name: 'towarehouseReference',
                            listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }
                        },                    
                        {
                            fieldLabel: '运输参考号',
                            xtype: 'textfield'
                        },
                        {
                            fieldLabel: '  ------>',
                            xtype: 'textfield'
                        }
                    ]
                }
            ]
	    })//end for Ext.create
		return this.pt1f1form;
	},   
	
	createPt1F2Form: function(){
    	var me = this;
    	this.pt1f2form = Ext.create('Ext.form.Panel',{  //  创建btn panel ，继承自 Ext.form.Panel
    		region: 'south',
            height: 40,
    		frame: true,
    		defaults: {
    			xtype: 'button',
    			margin: '5 0 0 5'
    		},
            items:[
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
                    text : "分配",
                    iconCls: 'icon-lookat',
                    scope : this,
                    id:'orderBtn',
                    handler:this.onOrderMultiAssign
                }/*,		
				{
                    text : "发货",
                    iconCls: 'icon-lookat',
                    scope : this,
                    id:'orderShipFstBtn',
                    handler:this.onMultiShip
                }	*/	
            ]
    	});
    	return this.pt1f2form;
    },
    
	createSoGrid: function(){     // 创建第一个tab页的grid
    	var me = this;
    	this.sogrid = Ext.create('widget.sogrid',{
    		region: 'center',
    		listeners: {
    			itemdblclick: function(grid,record){
    			}
    		}
    	});
    	this.sogrid.getStore().on('beforeload',function(){    //启动时查询，加载的内容
    		var params = this.sogrid.getStore().getProxy().extraParams;
			var record = me.pt1f1form.getForm().getValues();
			
			var fromstorerKey = record.fromstorerKey
    		var tostorerKey = record.tostorerKey;  
			var fromorderKey = record.fromorderKey
    		var toorderKey = record.toorderKey;  
			var fromtype = record.fromtype
    		var totype = record.totype;  
			var fromorderNumber = record.fromorderNumber
    		var toorderNumber = record.toorderNumber;  
			var fromcarrierKey = record.fromcarrierKey
    		var tocarrierKey = record.tocarrierKey;  
			var frombuyerpo = record.frombuyerpo
    		var tobuyerpo = record.tobuyerpo;  
			var fromorderDate = record.fromorderDate
    		var toorderDate = record.toorderDate;  
			var dateStart = record.dateStart
    		var dateEnd = record.dateEnd;  
			var fromwarehouseReference = record.fromwarehouseReference
    		var towarehouseReference = record.towarehouseReference;  
			
			delete params.fromstorerKey;
			delete params.tostorerKey;
			delete params.fromorderKey;
			delete params.toorderKey;
			delete params.fromtype;
			delete params.totype;
			delete params.fromorderNumber;
			delete params.toorderNumber;
            delete params.fromcarrierKey;
			delete params.tocarrierKey;
			delete params.frombuyerpo;
			delete params.tobuyerpo;
			delete params.fromorderDate;
			delete params.toorderDate;
			delete params.dateStart;
			delete params.dateEnd;
			delete params.fromwarehouseReference;
			delete params.towarehouseReference;
            
			if(fromstorerKey) params.fromstorerKey = fromstorerKey;
			if(tostorerKey) params.tostorerKey = tostorerKey;
			if(fromorderKey) params.fromorderKey = fromorderKey;
			if(toorderKey) params.toorderKey = toorderKey;
			if(fromtype) params.fromtype = fromtype;
			if(totype) params.totype = totype;
			if(fromorderNumber) params.fromorderNumber =fromorderNumber;
			if(toorderNumber) params.toorderNumber = toorderNumber;
			if(fromcarrierKey) params.fromcarrierKey =fromcarrierKey ;
			if(tocarrierKey) params.tocarrierKey = tocarrierKey;
			if(frombuyerpo) params.frombuyerpo = frombuyerpo;
			if(tobuyerpo) params.tobuyerpo = tobuyerpo;
			if(fromorderDate) params.fromorderDate =fromorderDate ;
			if(toorderDate) params.toorderDate =toorderDate ;
			if(dateStart) params.dateStart = dateStart;
			if(dateEnd) params.dateEnd = dateEnd;
			if(fromwarehouseReference) params.fromwarehouseReference = fromwarehouseReference;
			if(towarehouseReference) params.towarehouseReference = towarehouseReference;
            
    	},this);
    	return this.sogrid;
    }
  
});

Ext.onReady(function(){
	Ext.create('Ext.container.Viewport', {
	    layout: 'border',
	    items: [{
	    	xtype:'batchallocatemanager',
	    	region:'center'
	    }]
	});
});