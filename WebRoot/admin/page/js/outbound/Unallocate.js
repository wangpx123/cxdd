/******************************************************************

取消分配 Unallocate.js


*******************************************************************/

//Pn1Grid,store 用具体名称临时用StoreDemo1指代

Ext.define('StoreSoGrid', {
    extend: 'Ext.data.Model',
    fields: [
        {name:'id'},
        {name:'externorderkey'},
        {name:'orderKey'},  //SO单号
        {name:'type'},      //SO类型
        {name:'ordergroup'}, //订单组别
        {name:'status'},     //SO状态
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
        {name:'buyerAddress1'},//购买方地址
        {name:'buyerContact'},//购买方联系人
        {name:'buyerMobile'},//购买方手机
        {name:'buyerTel'},//购买方电话
        {name:'billto'},//结算方
        {name:'billtoName'},//结算方名称
        {name:'billtoAddress1'},//结算方地址
        {name:'billtoContact'},//结算方联系人
        {name:'billtoMobile'},//结算方手机
        {name:'billtoTel'},//结算方电话
        {name:'consigneeAddress1'},//收货方地址
        {name:'consigneeContact'},//收货方联系人
        {name:'consigneeMobile'},//收货方手机
        {name:'consigneeTel'},//收货方电话
        {name:'addDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},//添加日期
        {name:'addWho'},//添加人
        {name:'editDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},//修改日期
        {name:'editWho'}//修改人
    ],
    idProperty: 'id'
});


Ext.define('StoreSoDetailGrid', {
    extend: 'Ext.data.Model',
    fields: [
        {name:'id'},
        {name:'orderKey'},//SO单号
        {name:'storerKey'},  //货主
        {name:'lineNumber'},//行号
        {name:'status'},  //状态
        {name:'sku'},      //商品
        {name:'altsku'}, //别名
        {name:'name'},     //中文名称
        {name:'packKey'},//包装
        {name:'uom'},//单位
        {name:'descr'},//英文名称
        {name:'qtyOrdered'},//订单数量
        {name:'qtyPreallocated'},//预分配数
        {name:'qtyAllocated'},//分配数量
        {name:'qtyPicked'},//拣货数量
        {name:'qtyShipped'},//发运数量
        {name:'rotationStrategykey'},//周转策略
        {name:'preAllocationStrategyKey'},//预分配策略
        {name:'allocationStrategyKey'},//分配策略
        {name:'lottable01',type:'date',dateFormat : 'Y-m-d H:i:s.u'},//入库日期
        {name:'lottable02',type:'date',dateFormat : 'Y-m-d H:i:s.u'},//生产日期
        {name:'lottable03',type:'date',dateFormat : 'Y-m-d H:i:s.u'},//失效日期
        {name:'lottable04'},//批属性4
        {name:'lottable05'},//批属性5
        {name:'lottable06'},//批属性6
        {name:'lottable07'},//批属性7
        {name:'lottable08'},//批属性8
        {name:'lottable09'},//批属性9
        {name:'lottable10'},//批属性10
        {name:'lottable11'},//批属性11
        {name:'lottable12'},//批属性12
        {name:'lottable13'},//批属性13
        {name:'lottable14'},//批属性14
        {name:'lottable15'},//批属性15
        {name:'lottable16'},//批属性16
        {name:'lottable17'},//批属性17
        {name:'lottable18'},//批属性18
        {name:'lottable19'},//批属性19
        {name:'lottable20'},//批属性20
        {name:'udf1'},//自定义1
        {name:'udf2'},//自定义2
        {name:'udf3'},//自定义3
        {name:'udf4'},//自定义4
        {name:'udf5'}//自定义5
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



// 抽象为 Pn1Grid
Ext.define('Redm.outbound.UnSoGrid',{
	extend: 'Redm.BaseGrid',
    alias : 'widget.unsogrid',
    buildColumns: function(){
        this.columns = [
		    { header: "SO单号", dataIndex: 'orderKey',width: 100, sortable: true},
		    { header: "货主", dataIndex: 'storerKey', width: 110, sortable: true},
		    { header: "SO类型", dataIndex: 'type', width: 120, sortable: true,
			    renderer: function(value,metadata,record){
					return ajaxSyncCall(value,'codeType=SOTYPE');
                }
            },
		    { header: "SO状态", dataIndex: 'status', width: 100, sortable: true,
                    renderer:this.rendererStatusFunc
            },
		    { header: "预期发货日期", dataIndex: 'orderDate', width: 120, sortable: true,renderer : Ext.util.Format.dateRenderer('Y-m-d H:i')},
		    { header: "客户订单号", dataIndex: 'orderNumber', width: 110, sortable: true},
//		    { header: "运输到", dataIndex: '', width: 150, sortable: true},
//		    { header: "承运人", dataIndex: '', width: 110, sortable: true},
		    { header: "承运商", dataIndex: 'carrierKey', width: 110, sortable: true},
		    { header: "采购商PO号", dataIndex: 'buyerpo', width: 110, sortable: true}, 
		    { header: "承运商参考号", dataIndex: 'carrierReference', width: 110, sortable: true},
		    { header: "仓库参考号", dataIndex: 'warehouseReference', width: 110, sortable: true}
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
		this.buildStore(basePath + '/outbound/doQueryUnallocateOrdersInfo.action','StoreSoGrid',20);
		this.callParent(arguments);
	},
//发货单类型解析函数
    rendererTypeFunc:function(value)
        {
            var retValue;
            if(value=='0') retValue='正常';
            else  retValue=value;
            return retValue;
        },  
         
//发货单状态解析函数
    rendererStatusFunc:function(value)
        {
            var retValue;
            if(value=='0') retValue='新建';
            else if(value=='1') retValue='部分分配';
            else if(value=='2') retValue='全部分配';
            else if(value=='5') retValue='部分分配部分发车';
            else if(value=='6') retValue='部分分配全部发车';
            else if(value=='7') retValue='全部分配部分发车';
            else if(value=='8') retValue='全部分配全部发车';
            else if(value=='9') retValue='关闭';
            //else  retValue=value;
            return retValue;
        },  
         
	onCreate: function(){
   	 	var fatherPanel = this.ownerCt.ownerCt;
   	 	fatherPanel.onGo();
    },
    onDelete: function(){
    	var fatherPanel = this.ownerCt.ownerCt;
   	 	fatherPanel.onGoDelete();
    }
});

//同一个panel上，抽象为Pn2Grid

Ext.define('Redm.outbound.UnSoDetailGrid',{
	extend: 'Redm.BaseGrid',
    alias : 'widget.unsodetailgrid',
    autoLoad:false,
    selModel:Ext.create('Ext.selection.CheckboxModel', {}),
    buildColumns: function(){
        this.columns = [
//		    { header: "SO单号", dataIndex: 'orderKey',width: 90, sortable: true},
//		    { header: "货主", dataIndex: 'storerKey', width: 110, sortable: true},
		    { header: "行号", dataIndex: 'lineNumber', width: 60, sortable: true},
		    { header: "商品", dataIndex: 'sku', width: 100, sortable: true},
		    { header: "别名", dataIndex: 'altsku', width: 100, sortable: true},
		    { header: "中文名称", dataIndex: 'name', width: 150, sortable: true},
		    { header: "英文名称", dataIndex: 'descr', width: 150, sortable: true},
		    { header: "状态", dataIndex: 'status', width: 100, sortable: true,
                renderer:this.rendererDetailStatusFunc            
            },
		    { header: "周转策略", dataIndex: 'rotationStrategykey', width: 80, sortable: true},
		    { header: "预分配策略", dataIndex: 'preAllocationStrategyKey', width: 80, sortable: true},
		    { header: "分配策略", dataIndex: 'allocationStrategyKey', width: 80, sortable: true},
		    { header: "包装", dataIndex: 'packKey', width: 80, sortable: true},
		    { header: "单位", dataIndex: 'uom', width: 60, sortable: true},
		    { header: "订单数量", dataIndex: 'qtyOrdered', width: 80, sortable: true},
		    { header: "预分配数", dataIndex: 'qtyPreallocated', width: 80, sortable: true},
		    { header: "分配数量", dataIndex: 'qtyAllocated', width: 80, sortable: true},
		    { header: "发运数量", dataIndex: 'qtyShipped', width: 80, sortable: true},
		    { header: swmslot01,dataIndex: 'lottable01',width: 130,sortable: true,editor:{xtype:'datefield',format:'Y-m-d H:i:s'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},//入库日期
		    { header: swmslot02,dataIndex: 'lottable02',width: 130,sortable: true,editor:{xtype:'datefield',format:'Y-m-d H:i:s'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},//生产日期
		    { header: swmslot03,dataIndex: 'lottable03',width: 130,sortable: true,editor:{xtype:'datefield',format:'Y-m-d H:i:s'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},//失效日期
		    { header: swmslot04,dataIndex: 'lottable04',width: 110,sortable: true},
		    { header: swmslot05,dataIndex: 'lottable05',width: 110,sortable: true},
		    { header: swmslot06,dataIndex: 'lottable06',width: 110,sortable: true},
		    { header: swmslot07,dataIndex: 'lottable07',width: 110,sortable: true},
		    { header: swmslot08,dataIndex: 'lottable08',width: 110,sortable: true},
		    { header: swmslot09,dataIndex: 'lottable09',width: 110,sortable: true},
		    { header: swmslot10,dataIndex: 'lottable10',width: 110,sortable: true},
		    { header: swmslot11,dataIndex: 'lottable11',width: 110,sortable: true},
		    { header: swmslot12,dataIndex: 'lottable12',width: 110,sortable: true},
		    { header: swmslot13,dataIndex: 'lottable13',width: 110,sortable: true},
		    { header: swmslot14,dataIndex: 'lottable14',width: 110,sortable: true},
		    { header: swmslot15,dataIndex: 'lottable15',width: 110,sortable: true},
		    { header: swmslot16,dataIndex: 'lottable16',width: 110,sortable: true},
		    { header: swmslot17,dataIndex: 'lottable17',width: 110,sortable: true,hidden:true},
		    { header: swmslot18,dataIndex: 'lottable18',width: 110,sortable: true,hidden:true},
		    { header: swmslot19,dataIndex: 'lottable19',width: 110,sortable: true,hidden:true},
		    { header: swmslot20,dataIndex: 'lottable20',width: 110,sortable: true,hidden:true},
		    { header: '自定义1',dataIndex: 'udf1',width: 110,sortable: true},
		    { header: '自定义2',dataIndex: 'udf2',width: 110,sortable: true},
		    { header: '自定义3',dataIndex: 'udf3',width: 110,sortable: true},
		    { header: '自定义4',dataIndex: 'udf4',width: 110,sortable: true},
		    { header: '自定义5',dataIndex: 'udf5',width: 110,sortable: true},
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
		var me = this;
		this.buildStore(basePath + '/outbound/doQueryUnallocateOrdersDetailInfo.action','StoreSoDetailGrid',20);
		this.callParent(arguments);
	},

    //明细表状态解析方法
    rendererDetailStatusFunc:function(value)
        {
            var retValue;
            if(value=='0') retValue='新建';
            else if(value=='1') retValue='部分分配完成';
            else if(value=='2') retValue='全部分配完成';
            else  retValue=value;
            return retValue;
        }
});

//Manager 定义，最外部的容器

Ext.define('Redm.inbound.UnallocateManager',{  //与功能相关的命名
	extend: 'Ext.panel.Panel',   //只有一个panel，需要改为继承 Ext.panel.Panel
    alias : 'widget.unallocatemanager',
    title:'取消分配',
	layout: 'border',
    tabPosition: 'bottom',
    initComponent: function(){
    	var me = this;
    	this.items = [this.createPn1Panel(),this.createPn2Panel(),this.createTopPanel()];
        this.callParent(arguments);
    },

    onSelect: function(){
    	this.pn1grid.getStore().load();
    },

    onReset: function(){
    	this.topform.getForm().reset();
    },

    
/************************************************************************************************* 
/组件名称： TopPanel
/创建方法： createPn1Panel
/位置：     位于manager顶部，'center'位置，继承Ext.form.Panel
/内部组件： 内部的组件上下结构，均继承Ext.form.Panel，上中下分别为Btn1,TopForm,Btn2
/           命名为Pn1Grid，Pn12Grid。也可以放一个tabform，
/作者：
/功能描述
/
*************************************************************************************************/ 
    createTopPanel: function(){
    	this.toppanel = Ext.create('Ext.panel.Panel',{
    		region: 'north',
    		layout: 'border',
    		border: false,
    		height: 230,
    		items:[this.createTopForm()]
    	});
    	return this.toppanel;
    },

/************************************************************************************************* 
/组件名称： TopForm
/创建方法： createTopForm
/位置：     位于TopPanel中部，'center'位置，继承Ext.form.Panel
/内部组件： 查询框，输入框，和查询类的按钮
/           
/作者：
/功能描述
/
*************************************************************************************************/     
    createTopForm: function(){
    	var me = this;
    	this.topform = Ext.create('Ext.form.Panel',{
    		region: 'center',
    		frame: true,
    		layout: 'vbox',
            autoScroll:true,
    		defaults: {
    			xtype: 'fieldcontainer',
    			margin: '5 0 0 5'
    		},
    		items:[
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
                            name:'storerKey',  
                            fieldLabel: '货主',
                            listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }                                
                        },
                        {
                            fieldLabel: 'SO编号',
                            name:'orderKey',  
                            xtype: 'textfield'
                        },
                        {
                            name:'type',   
                            fieldLabel: '类型',
                            xtype:'codecombo',
                            codeType:'SOTYPE'
                        },
                        {
                            name:'status',
                            fieldLabel: '状态',
                            xtype:'codecombo',
                            codeType:'SOSTATUS'
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
                            fieldLabel: '客户订单号',
                            name:'orderNumber',
                            xtype: 'textfield',
                            listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }                             
                        },
                        {	
                            fieldLabel:swmslot01,
                            xtype:'datefield',
                            name: 'lottable01',
                            format:'Y-m-d'
                        },
                        {	
                            fieldLabel:swmslot02,
                            xtype:'datefield',
                            name: 'lottable02',
                            format:'Y-m-d'
                        },
                        {	
                            fieldLabel:swmslot03,
                            xtype:'datefield',
                            name: 'lottable03',
                            format:'Y-m-d'
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
                            fieldLabel:swmslot04,
                            name: 'lottable04',
                            listeners:{
                                blur: function(txt){
                                    var lottable04Value= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(lottable04Value);
                                }
                            }
                        },  
                        {	
                            fieldLabel:swmslot05,
                            name: 'lottable05',
                            listeners:{
                                blur: function(txt){
                                    var lottable05Value= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(lottable06Value);
                                }
                            }
                        },  
                        {
                            fieldLabel:swmslot06,
                            name: 'lottable06',
                            listeners:{
                                blur: function(txt){
                                    var lottable06Value= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(lottable06Value);
                                }
                            }                            
                        }, 
                        {
                            fieldLabel:swmslot07,
                            name: 'lottable07',
                            listeners:{
                                blur: function(txt){
                                    var lottable07Value= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(lottable07Value);
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
                            fieldLabel:swmslot08,
                            name: 'lottable08',
                            listeners:{
                                blur: function(txt){
                                    var lottable08Value= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(lottable08Value);
                                    me.top.getForm().findField('lottable08Over').setValue(lottable08Value);
                                }
                            }                            
                        },
                        {
                            fieldLabel:swmslot09,
                            name: 'lottable09',
                            listeners:{
                                blur: function(txt){
                                    var lottable09Value= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(lottable09Value);
                                    me.top.getForm().findField('lottable09Over').setValue(lottable09Value);
                                }
                            }                            
                        },
                        {
                            fieldLabel:swmslot10,
                            name: 'lottable10',
                            listeners:{
                                blur: function(txt){
                                    var lottable10Value= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(lottable10Value);
                                }
                            }                            
                        },
                        {
                            fieldLabel:swmslot11,
                            name: 'lottable11',
                            listeners:{
                                blur: function(txt){
                                    var lottable11Value= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(lottable11Value);
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
                            fieldLabel:swmslot12,
                            name: 'lottable12',
                            listeners:{
                                blur: function(txt){
                                    var lottable12Value= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(lottable12Value);
                                }
                            }                            
                        },
                        {
                            fieldLabel:swmslot13,
                            name: 'lottable13',
                            listeners:{
                                blur: function(txt){
                                    var lottable13Value= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(lottable13Value);
                                }
                            }                            
                        },
                        {
                            fieldLabel:swmslot14,
                            name: 'lottable14',
                            listeners:{
                                blur: function(txt){
                                    var lottable14Value= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(lottable14Value);
                                }
                            }                            
                        },
                        {
                            fieldLabel:swmslot15,
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
                    layout: 'hbox',
                    defaults: {
                        xtype: 'textfield',
                        margin: '5 0 0 5',
                        width: 240,
                        labelWidth: 80
                    },
                    items: [
                        {   
                            fieldLabel:swmslot16,
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
                            fieldLabel:swmslot19,
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
                            name: 'lottable20',
                            hidden:true,
                            listeners:{
                                blur: function(txt){
                                    var lottable20Value= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(lottable20Value);
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
                       xtype: 'textfield',
                       width:80
                   },
                   items: [
                        {
                            xtype:'button',
                            margin: '3 2 3 236',  //控制在行的中间
                            text : "查询",
                            iconCls: 'icon-search',
                            handler: me.onSelect,
                            scope : this
                        },
                        {
                            xtype:'button',
                            margin: '3 2 3 28',
                            text : "重置",
                            iconCls: 'icon-reset',
                            handler: me.onReset,
                            scope : this
                        },
                        {
                            xtype:'button',
                            margin: '3 2 3 28',
                            text : "取消分配",
                            iconCls: 'icon-delete',
                            id:'cancelAllBtn',  
                            handler : me.onDeleteUnallocatedItems,
                            scope:this
                        },
                        {
                            xtype:'button',
                            margin: '3 2 3 28',
                            text : "取消明细",
                            id:'cancelPartBtn',  
                            iconCls: 'icon-delete',
                            handler : me.onDeleteUnallocatedDetailItems,
                            scope:this
                        }
                   ]
                }
            ]
    	});
    	return this.topform;
    },

/************************************************************************************************* 
/ 名称：Pn1Panel
/ 位置：位于中部，'center'位置，内部的组件左右结构，上边有一个或者多个Grid，
/       命名为Pn1Grid，Pn12Grid。也可以放一个tabform，
/作者：
/功能描述：
/
*************************************************************************************************/ 
    createPn1Panel: function(){
    	var me = this;
    	this.pn1panel = Ext.create('Ext.panel.Panel',{
    		layout: 'border',
            region:'center',
    		border: false,
    		items:[this.createPn1Grid()]
    	});
    	return this.pn1panel;
    },
/************************************************************************************************* 
/ 名称：Pn1Grid
/ 位置：位于中部，'center'位置，
/   
/作者：
/功能描述： 创建 unsogrid，显示对应数据
/
*************************************************************************************************/ 
    //Grid的创建 ，如果有多个，在同一panel上从左到右排列
    createPn1Grid: function(){
    	var me = this;
    	this.pn1grid = Ext.create('widget.unsogrid',{
    		region: 'center',
    		//主表选中后，明细表grid显示对应的明细表记录
			listeners: {
				itemclick: function(grid,record){
					me.pn2grid.getStore().load();
				} 
			}    		

    	});
    	
/*      //itemclick的另外一种实现方法
        this.pn1grid.on('itemclick',function(grid,record){
			me.pn2grid.getStore().load();
		},this);    */    
        
    	//查询选项
    	this.pn1grid.getStore().on('beforeload',function(){
    		var params = this.pn1grid.getStore().getProxy().extraParams;
    		var record = me.topform.getForm().getValues();
    		
    		var storerKey = record.storerKey;
    		var orderKey = record.orderKey;
    		var type = record.type;
    		var status = record.status;
    		var orderNumber = record.orderNumber;            
    		
    		delete params.orderKey;
    		delete params.storerKey;
    		delete params.type;
    		delete params.status;
    		delete params.orderNumber;
    		
    		if(orderKey) params.orderKey = orderKey;
    		if(storerKey) params.storerKey = storerKey;
    		if(type) params.type = type;
    		if(status) params.status = status;
    		if(orderNumber) params.orderNumber = orderNumber;
    	},this);
    	return this.pn1grid;
    },

/************************************************************************************************* 
/ 名称：Pn2Panel
/ 位置：manager 上最下边的panel，放置内容同Pn1Panel，内部是左右结构
/       内部组件命名为Pn2Grid，Pn22Grid，或者TabForm   
/作者：
/功能描述： 
/
*************************************************************************************************/     
//Pn2Panel 创建及相关的定义
    createPn2Panel: function(){
    	var me = this;
    	this.pn2panel = Ext.create('Ext.panel.Panel',{
    		layout: 'border',
            region:'south',
    		border: false,
            height:240,
    		items:[this.createPn2Grid()]
    	});
    	return this.pn2panel;
    },

/***********************************************************************************************
/ 名称：Pn2Grid
/ 位置：位于中部，'center'位置，
/   
/作者：
/功能描述： 创建 unsodetailgrid，显示对应数据
/
*************************************************************************************************/ 
    createPn2Grid: function(){
    	var me = this;
    	this.pn2grid = Ext.create('widget.unsodetailgrid',{
    		region: 'center'
            });
    	this.pn2grid.getStore().on('beforeload',function(){
       		var values = me.topform.getForm().getValues();
			var records = me.pn1grid.getSelectionModel().getSelection(); 
            var params = this.pn2grid.getStore().getProxy().extraParams;
            
			if(records != ''){
				var data = records[0].getData();
				var orderKey = data.orderKey;
				var storerKey = data.storerKey;
                var lottable01 = values.lottable01;
                var lottable02 = values.lottable02;
                var lottable03 = values.lottable03;
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

                
				delete params.orderKey;
				delete params.storerKey;
                delete params.lottable01;
                delete params.lottable02;
                delete params.lottable03;
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

				if(orderKey) params.orderKey = orderKey;
				if(storerKey) params.storerKey = storerKey;
                if(lottable01) params.lottable01 = lottable01;
                if(lottable02) params.lottable02 = lottable02;
                if(lottable03) params.lottable03 = lottable03;
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
                }
            },this);
    	return this.pn2grid;
    },
    
    //取消主表记录对应的订单分配结果
    onDeleteUnallocatedItems: function(){
    	var me = this;
    	var records = me.pn1grid.getSelectionModel().getSelection(); 
		var data = records[0].getData();
		var type = data.type
		if(type=='24'){
			if($username!='00000'){
				MessageBox.error('错误提示','当前用户无权操作生产领料取消分配！');
				return;
			}
		} 
        //取消收货结束前禁用按钮
        Ext.getCmp('cancelPartBtn').disable();
        Ext.getCmp('cancelAllBtn').disable();

    	if(records == ""){
    		MessageBox.error('错误提示','请选择操作的数据！');
            //返回前使能收货按钮
            Ext.getCmp('cancelPartBtn').enable();
            Ext.getCmp('cancelAllBtn').enable();              
    		return;
    	}
    	else{
    		Ext.MessageBox.confirm('询问提示', '确定要取消分配吗？', 
    				function(btn){
    					if(btn == 'yes'){
							var mask = new Ext.LoadMask(me.getEl(), { 
								msg : 'please wait...' 
							});
							mask.show(); 
						
    						Ext.Ajax.request(
        						{
        						    url: basePath + '/outbound/doUnallocateSoItems.action',
        						    params: {
        						    	orderKey: data.orderKey
        						    },
        						    success: function(response)
        						    {
        						        var text = Ext.decode(response.responseText);
        						        var success = text.success;
										mask.hide();      
        						        MessageBox.show(success, text.json.msg);
                                    	me.topform.getForm().reset();    //清空查询条件再load
        						        me.pn1grid.getStore().load();
        						        me.pn2grid.getStore().load();
        						    },
									timeout: 100000000
        						}
    						);
    					}
    				}
			); 
    	}
        //收货完成后使能收货按钮
        Ext.getCmp('cancelPartBtn').enable();
        Ext.getCmp('cancelAllBtn').enable();        
    },

    //取消明细表对应的多条记录对应的订单分配结果
    onDeleteUnallocatedDetailItems: function(){
    	var me = this;
    	var records = me.pn2grid.getSelectionModel().getSelection(); 
    	var recordsOrders = me.pn1grid.getSelectionModel().getSelection(); 
		var data2 = recordsOrders[0].getData();
		var type2 = data2.type
		if(type2=='24'){
			if($username!='00000'){
				MessageBox.error('错误提示','当前用户无权操作生产领料取消分配！');
				return;
			}
		} 
        //取消收货结束前禁用按钮
        Ext.getCmp('cancelPartBtn').disable();
        Ext.getCmp('cancelAllBtn').disable();
                
		if(records == ""){
			MessageBox.error("错误提示","请选择要操作的数据！");
            //返回前使能收货按钮
            Ext.getCmp('cancelPartBtn').enable();
            Ext.getCmp('cancelAllBtn').enable();               
		 	return;
		} 
        else
        {
            var ids = []; 
            Ext.Array.each(records, function(name, index, countriesItSelf) {
                ids.push(name.getData().id);
            });
    		Ext.MessageBox.confirm('询问提示', '确定要取消分配吗？', 
    				function(btn){
    					if(btn == 'yes'){ 
							var mask = new Ext.LoadMask(me.getEl(), { 
								msg : 'please wait...' 
							});
							mask.show(); 
                            Ext.Ajax.request({
                                url: basePath + '/outbound/doUnallocateSoDetailItems.action',
                                params: {
                                    ids: ids
                                },
                                success: function(response){
                                    var text = Ext.decode(response.responseText);
                                    var success = text.success;
									mask.hide();
                                    MessageBox.show(success, text.json.msg);
       						        me.pn1grid.getStore().load();
                                    me.pn2grid.getStore().load();
                                },
								timeout: 100000000
                            });  
    					}
    				}
			    );             
        }
        //收货完成后使能收货按钮
        Ext.getCmp('cancelPartBtn').enable();
        Ext.getCmp('cancelAllBtn').enable();        
    },
    
/***********************************************************************************************
/ 名称：其他方法
/ 位置：
/   
/作者：
/功能描述：
/
*************************************************************************************************/ 
//本例暂不使用保存    
    saveStrategyAndDetail: function(){

    }
});

Ext.onReady(function(){
	Ext.create('Ext.container.Viewport', {
	    layout: 'border',
	    items: [
            {
                xtype:'unallocatemanager',
                region:'center'
            }
        ]
	});
});