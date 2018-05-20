/******************************************************************

出库单上传
K3upload.js


*******************************************************************/

//Pn1Grid,store 用具体名称临时用StoreDemo1指代

Ext.define('Orders', {
    extend: 'Ext.data.Model',
    fields: [
        {name:'id'},
        {name:'orderKey'},
        {name:'status'},
        {name:'opstatus'}
    ],
    idProperty: 'id'
});

Ext.define('DetailTypeGrid', {
    extend: 'Ext.data.Model',
    fields: [
        {name:'id'},
        {name:'orderKey'},
        {name:'sopstatus'},
        {name:'k3key'},
        {name:'k3id'},
        {name:'sourcetrantype'}
    ],
    idProperty: 'id'
});


Ext.define('K3Upload', {
    extend: 'Ext.data.Model',
    fields: [
        {name:'id'},
        {name:'orderKey'},//SO单号
        {name:'opstatus'},
        {name:'k3key'}, 
        {name:'k3id'}, 
        {name:'sourcetrantype'}, 
        {name:'sourceinterid'}, 
        {name:'sourcebillno'}, 
        {name:'sourceentryid'}, 
        {name:'lineNumber'},//行号
        {name:'serialNumber'}, 
        {name:'sku'},      //商品
        {name:'ksku'},      //商品
        {name:'qty'}, 
        {name:'kqty'}, 
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
        {name:'udf5'},//自定义5
        {name:'klottable04'},//批属性4
        {name:'klottable05'},//批属性5
        {name:'klottable06'},//批属性6
        {name:'klottable07'},//批属性7
        {name:'klottable08'},//批属性8
        {name:'klottable09'},//批属性9
        {name:'klottable10'},//批属性10
        {name:'klottable11'},//批属性11
        {name:'klottable12'},//批属性12
        {name:'klottable13'},//批属性13
        {name:'klottable14'},//批属性14
        {name:'klottable15'},//批属性15
        {name:'klottable16'},//批属性16
        {name:'klottable17'},//批属性17
        {name:'klottable18'},//批属性18
        {name:'klottable19'},//批属性19
        {name:'klottable20'},//批属性20
        {name:'kudf1'},//自定义1
        {name:'kudf2'},//自定义2
        {name:'kudf3'},//自定义3
        {name:'kudf4'},//自定义4
        {name:'kudf5'},//自定义5
        {name:'addDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},//添加日期
        {name:'addWho'},//添加人
        {name:'editDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},//修改日期
        {name:'editWho'},//修改人        
        {name:'fdcstockid'},
        {name:'fdcspid'}
    ],
    idProperty: 'id'
});



// 抽象为 Pn1Grid
Ext.define('Redm.outbound.OrdersGrid',{
	extend: 'Redm.BaseGrid',
    alias : 'widget.ordersgrid',
    autoLoad:false,
    buildColumns: function(){
        this.columns = [
		    { header: "SO号", dataIndex: 'orderKey', width: 100, sortable: true},
		    { header: "状态", dataIndex: 'status',width: 80, sortable: true,
                    renderer:this.rendererStatusFunc            
            },
		    { header: "处理状态", dataIndex: 'opstatus',width: 80, sortable: true,
                    renderer:this.opStatusFunc
            } 
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
		this.buildStore(basePath + '/outbound/doQueryK3RelativeOrdersInfo.action','Orders',20);
		this.callParent(arguments);
	},
	onCreate: function(){
   	 	var fatherPanel = this.ownerCt.ownerCt;
   	 	fatherPanel.onGo();
    },
    onDelete: function(){
    	var fatherPanel = this.ownerCt.ownerCt;
   	 	fatherPanel.onGoDelete();
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
            else  retValue='未上传';;
            return retValue;
        }
        
});

// 抽象为 Pn1Fn2grid
Ext.define('Redm.outbound.DetailTypeGrid',{
    extend: 'Redm.BaseGrid',
    alias : 'widget.detailtypegrid',
    autoLoad:false,
    buildColumns: function(){
        this.columns = [
            { header: "SO号", dataIndex: 'orderKey', width: 150, sortable: true},
            { header: "K3源单类型", dataIndex: 'sourcetrantype', width: 80, sortable: true},
            { header: "子类型处理状态", dataIndex: 'sopstatus',width: 150, sortable: true},
            { header: "K3单据号", dataIndex: 'k3key', width: 150, sortable: true},
            { header: "K3id", dataIndex: 'k3id',width: 150, sortable: true}
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
//        this.buildStore(basePath + '/outbound/doQueryK3UploadSubTypeInfo.action','DetailTypeGrid',20);
        this.buildStore(basePath + '/outbound/doQueryK3UploadMaInfo.action','DetailTypeGrid',20);        
        this.callParent(arguments);
    },
    onCreate: function(){
        var fatherPanel = this.ownerCt.ownerCt;
        fatherPanel.onGo();
    },
    onDelete: function(){
        var fatherPanel = this.ownerCt.ownerCt;
        fatherPanel.onGoDelete();
    },
    
    //ASN状态解析函数
    rendererStatusFunc:function(value)
        {
            var retValue;
            if(value=='0') retValue='未上传';
            else if(value=='9') retValue='已上传';
            else  retValue=value;
            return retValue;
        }
});
 

//同一个panel上，抽象为Pn2Grid
Ext.define('Redm.outbound.K3UploadGrid',{
	extend: 'Redm.BaseGrid',
    alias : 'widget.k3uploadgrid',
    autoLoad:false,
//    selModel:Ext.create('Ext.selection.CheckboxModel', {}),
    buildColumns: function(){
        this.columns = [
		    { header: "SO号", dataIndex: 'orderKey', width: 100, sortable: true},
		    { header: "行号", dataIndex: 'lineNumber', width: 60, sortable: true},
		    { header: "序号", dataIndex: 'serialNumber', width: 60, sortable: true},
		    { header: "对比结果", dataIndex: 'opstatus', width: 60, sortable: true,
                renderer:this.rendererStatusFunc     
            },
		    { header: "商品", dataIndex: 'sku', width: 150, sortable: true},
		    { header: "K3商品", dataIndex: 'ksku', width: 150, sortable: true},
//		    { header: "K3单据号", dataIndex: 'k3key', width: 120, sortable: true},
//		    { header: "K3Id", dataIndex: 'k3id', width: 120, sortable: true},
		    { header: "K3源单类型", dataIndex: 'sourcetrantype', width: 120, sortable: true},
		    { header: "K3源单id", dataIndex: 'sourceinterid', width: 120, sortable: true},
		    { header: "K3入库单号", dataIndex: 'sourcebillno', width: 120, sortable: true},
		    { header: "K3入库单行号", dataIndex: 'sourceentryid', width: 60, sortable: true},
		    { header: "长度", dataIndex: 'qty', width: 80, sortable: true},
		    { header: "K3长度", dataIndex: 'kqty', width: 80, sortable: true},
		    { header: '批属性04',dataIndex: 'lottable04',width: 110,sortable: true},
		    { header: 'k3批属性04',dataIndex: 'klottable04',width: 110,sortable: true},
		    { header: '批属性05',dataIndex: 'lottable05',width: 110,sortable: true},
		    { header: 'k3批属性05',dataIndex:'klottable05',width: 110,sortable: true},
		    { header: '批属性06',dataIndex: 'lottable06',width: 110,sortable: true},
		    { header: 'k3批属性06',dataIndex:'klottable06',width: 110,sortable: true},
		    { header: '批属性07',dataIndex: 'lottable07',width: 110,sortable: true},
		    { header: 'k3批属性07',dataIndex:'klottable07',width: 110,sortable: true},
		    { header: '批属性08',dataIndex: 'lottable08',width: 110,sortable: true},
		    { header: 'k3批属性08',dataIndex:'klottable08',width: 110,sortable: true},
		    { header: '批属性09',dataIndex: 'lottable09',width: 110,sortable: true},
		    { header: 'k3批属性09',dataIndex:'klottable09',width: 110,sortable: true},
		    { header: '批属性10',dataIndex: 'lottable10',width: 110,sortable: true},
		    { header: 'k3批属性10',dataIndex:'klottable10',width: 110,sortable: true},
		    { header: '批属性11',dataIndex: 'lottable11',width: 110,sortable: true},
		    { header: 'k3批属性11',dataIndex:'klottable11',width: 110,sortable: true},
		    { header: '批属性12',dataIndex: 'lottable12',width: 110,sortable: true},
		    { header: 'k3批属性12',dataIndex:'klottable12',width: 110,sortable: true},
		    { header: '批属性13',dataIndex: 'lottable13',width: 110,sortable: true},
		    { header: 'k3批属性13',dataIndex:'klottable13',width: 110,sortable: true},
		    { header: '批属性14',dataIndex: 'lottable14',width: 110,sortable: true},
		    { header: 'k3批属性14',dataIndex:'klottable14',width: 110,sortable: true},
		    { header: '批属性15',dataIndex: 'lottable15',width: 110,sortable: true},
		    { header: 'k3批属性15',dataIndex:'klottable15',width: 110,sortable: true},
		    { header: '批属性16',dataIndex: 'lottable16',width: 110,sortable: true},
		    { header: 'k3批属性16',dataIndex:'klottable16',width: 110,sortable: true},
		    { header: '批属性17',dataIndex: 'lottable17',width: 110,sortable: true,hidden:true},
		    { header: 'k3批属性17',dataIndex:'klottable17',width: 110,sortable: true,hidden:true},
		    { header: '批属性18',dataIndex: 'lottable18',width: 110,sortable: true,hidden:true},
		    { header: 'k3批属性18',dataIndex:'klottable18',width: 110,sortable: true,hidden:true},
		    { header: '批属性19',dataIndex: 'lottable19',width: 110,sortable: true,hidden:true},
		    { header: 'k3批属性19',dataIndex:'klottable19',width: 110,sortable: true,hidden:true},
		    { header: '批属性20',dataIndex: 'lottable20',width: 110,sortable: true,hidden:true},
		    { header: 'k3批属性20',dataIndex:'klottable20',width: 110,sortable: true,hidden:true},
		    { header: '自定义1',dataIndex: 'udf1',width: 110,sortable: true},
		    { header: 'k3自定义1',dataIndex: 'kudf1',width: 110,sortable: true},
		    { header: '自定义2',dataIndex: 'udf2',width: 110,sortable: true},
		    { header: 'k3自定义2',dataIndex: 'kudf2',width: 110,sortable: true},
		    { header: '自定义3',dataIndex: 'udf3',width: 110,sortable: true},
		    { header: 'k3自定义3',dataIndex: 'kudf3',width: 110,sortable: true},
		    { header: '自定义4',dataIndex: 'udf4',width: 110,sortable: true},
		    { header: 'k3自定义4',dataIndex: 'kudf4',width: 110,sortable: true},
		    { header: '自定义5',dataIndex: 'udf5',width: 110,sortable: true},
		    { header: 'k3自定义5',dataIndex: 'kudf5',width: 110,sortable: true},
			{ header: "创建时间", dataIndex: 'addDate', width: 140, sortable: true,renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s'),hidden:true},
			{ header: "创建人", dataIndex: 'addWho', width: 140, sortable: true,hidden:true},
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
		this.buildStore(basePath + '/outbound/doQueryK3UploadInfo.action','K3Upload',20);
		this.callParent(arguments);
	},
    
    rendererStatusFunc:function(value)
        {
            var retValue;
            if(value=='0') retValue='<font color=red>不一致</font>';
            else if(value=='1') retValue='<font color=black>一致</font>';
            else  retValue=value;
            return retValue;
        }    
});



//Manager 定义，最外部的容器
Ext.define('Redm.inbound.K3UploadManager',{  //与功能相关的命名
	extend: 'Ext.panel.Panel',   //只有一个panel，需要改为继承 Ext.panel.Panel
    alias : 'widget.k3uploadmanager',
    title:'出库单上传',
	layout: 'border',
    tabPosition: 'bottom',
    initComponent: function(){
    	var me = this;
    	this.createContextMenuOperationItem();   //必须在这里做一次初始化，菜单中的按钮才会启用
    	this.items = [this.createPn1Panel(),this.createPn2Panel(),this.createTopPanel()];
        this.callParent(arguments);
    },

    onSelect: function(){
    	this.pn1grid.getStore().load();
    //	this.pn2grid.getStore().load();
    	this.pn2grid.getStore().removeAll();
    },

    onReset: function(){
    	this.topform.getForm().reset();
    },
    
	onGetCompareData: function(){
		var me = this;
		var records = this.pn1grid.getSelectionModel().getSelection(); 
		if(records == ""){
			MessageBox.error('错误提示','请选择操作的数据！');
			return;
		}
		var data = records[0].getData();
            Ext.Ajax.request({
                url: basePath + '/outbound/doGetCompareData.action',
                params: {
                    orderKey:data.orderKey
                },
                success: function(response){
                    var text = Ext.decode(response.responseText);
                    var success = text.success;
                    MessageBox.show(success, text.json.msg);
                    if(success==true)
                    {
                        me.pn2grid.getStore().load();
                    }
                }
            });
	},
    
	onUploadK3Data: function(){
		var me = this;
		var gridvalues = this.pn1fn2grid.getSelectionModel().getSelection(); 
        var griddata = gridvalues[0].getData();
   		var formValues = this.topform.getForm().getValues();
        
/*		if(records == ""){
			MessageBox.error('错误提示','请选择操作的数据！');
			return;
		}*/
        
        
/*		var data = records[0].getData();
            Ext.Ajax.request({
                url: basePath + '/outbound/doGetCompareData.action',
                params: {
                    orderKey:data.orderKey
                },
                success: function(response){
                    var text = Ext.decode(response.responseText);
                    var success = text.success;
                    MessageBox.show(success, text.json.msg);
                    if(success==true)
                    {
                        me.pn2grid.getStore().load();
                    }
                }
            });*/
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
    		height: 40,
    		items:[this.createTopForm()]
    	});
    	return this.toppanel;
    },
    createContextMenuOperationItem:function(){

 //打印菜单开始   
        this.printOperItem1 = Ext.create('Ext.Action', {  //创建Action
			text : "打印IS",
			cls : "x-btn-text-icon",
			handler: this.onprintWorkShop01,
			scope : this
		});
		this.printOperItem2 = Ext.create('Ext.Action', {
			text : "打印AS",
			cls : "x-btn-text-icon",
            handler: this.onprintWorkShop02,
			scope : this
		});
		this.printOperItem3 = Ext.create('Ext.Action', {
			text : "打印ISWP,WOP",
			cls : "x-btn-text-icon",
            handler: this.onprintWorkShop03,
			scope : this
		});
		this.printOperItem4 = Ext.create('Ext.Action', {
			text : "打印LGF",
			cls : "x-btn-text-icon",
            handler: this.onprintWorkShop04,
			scope : this
		});
		this.printOperItem5 = Ext.create('Ext.Action', {
			text : "打印WW",
			cls : "x-btn-text-icon",
            handler: this.onprintWorkShop05,
			scope : this
		});
		this.printOperItem6 = Ext.create('Ext.Action', {
			text : "打印VXE",
			cls : "x-btn-text-icon",
            handler: this.onprintWorkShop06,
			scope : this
		});
		this.printOperItem7 = Ext.create('Ext.Action', {
			text : "打印DJ",
			cls : "x-btn-text-icon",
            handler: this.onprintWorkShop07,
			scope : this
		});
		this.printOperItem8 = Ext.create('Ext.Action', {
			text : "打印OS,OJ",
			cls : "x-btn-text-icon",
            handler: this.onprintWorkShop08,
			scope : this
		});
        
		this.printAction = Ext.create('Ext.Action', {
			text : "打印COA",
            iconCls: 'icon-printer',
			menu : [
				this.printOperItem1,
				this.printOperItem2,
				this.printOperItem3,
				this.printOperItem4,
				this.printOperItem5,
				this.printOperItem6,
				this.printOperItem7,
				this.printOperItem8
			]
		});
//打印菜单结束        

//导入导出菜单开始
        this.printOperItem9 = Ext.create('Ext.Action', {  //创建Action
			text : "打印标准标签",
			cls : "x-btn-text-icon",
            handler: this.onprintWorkShop09,
			scope : this
		});
		this.printOperItem10 = Ext.create('Ext.Action', {
			text : "打印中性标签",
			cls : "x-btn-text-icon",
            handler: this.onprintWorkShop10,
			scope : this
		});

		this.PrintLabelAction = Ext.create('Ext.Action', {
			text : "打印标签",
            iconCls: 'icon-printer',
			menu : [
				this.printOperItem9,
				this.printOperItem10
				
			]
		});
        
    }, // 菜单初始化结束
   
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
    		region: 'north',
    		frame: true,
    		layout: 'vbox',
    		defaults: {
    			xtype: 'fieldcontainer'
    		},

    		items:[
                {
                    layout: 'hbox',
                    defaults: {
                    	xtype:'button',
                        width: 160,
                        margin: '0 5 0 0',
                        height:23,
                        labelWidth: 40
                    },
                    items: [
                        {
                            boxLabel: '显示所有',
                            xtype: 'checkbox',
                            inputValue:1,
                            margin: '-3 0 0 15',
                            width: 80,
                            name: 'showall'       
                        },
/*                        {
                            boxLabel: '是否显示库存为0',
                            xtype: 'checkbox',
                            inputValue:1,
                             margin: '0 5 0 0 ',
                            name: 'showzero'                
                        },*/           
                        {
                            name:'orderKey',  
                            labelWidth: 50,
                            xtype: 'textfield',
                            fieldLabel: 'SO号',
                            listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }                                
                        },
                        {
                            xtype:'button',
                            text : "查询",
                            width:80,
                            iconCls: 'icon-search',
                            handler: me.onSelect,
                            scope : this
                        },
                        {
                            xtype:'button',
                            text : "重置",
                            width:80,
                            iconCls: 'icon-reset',
                            handler: me.onReset,
                            scope : this
                        },
                        {
                            xtype:'button',
                            text : "比对",
                            width:80,
                            iconCls:'icon-create',
                            handler: me.onGetCompareData,
                            scope : this
                        },
                        {
                            xtype:'button',
                            text : "上传K3",
                            width:80,
                            iconCls:'icon-upload',
                            handler: me.onUploadK3Data,
                            scope : this
                        }
                       // this.printAction,
/*                        {
                            fieldLabel: '标签数量',
                            name:'num',  
                            labelWidth: 60,
                            width: 120,
                            xtype: 'numberfield',
                            margin: '0 5 0 5',
                            minValue:0,
                            value:2
                        },
                        this.PrintLabelAction,
                        {
                            xtype:'button',
                            text : "称重查询",
                            width:80,
                            iconCls: 'icon-search',
                            handler: me.onQueryWeight,
                            scope : this
                        },
                		{
                            xtype:'button',
                            text : "上传重量",
                            width:80,
                            iconCls: 'icon-upload',
                            handler: me.onUploadWeight,
                            scope : this
                        },
                        {
                            xtype:'button',
                            text : "上传单条重量",
                            width:120,
                            iconCls: 'icon-upload',
                            handler: me.onUploadWeightItem,
                            scope : this
                        }*/
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
    		items:[me.createPn1Fn2Grid(),me.createPn1Grid()]
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
    	this.pn1grid = Ext.create('widget.ordersgrid',{
    		region: 'center',
    		 width: '35%',
    		//主表选中后，明细表grid显示对应的明细表记录
			listeners: {
				itemclick: function(grid,record){
					me.topform.getForm().loadRecord(record);
                    me.pn1fn2grid.getStore().load();
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
    		
    		var orderKey= record.orderKey;
    		var showall = record.showall;
            
    		delete params.orderKey;
    		delete params.showall;
    		
            if(orderKey) params.orderKey = orderKey;
    		if(showall) params.showall = showall;
    		
    	},this);
    	return this.pn1grid;
    },
    
       //Grid的创建 ，如果有多个，在同一panel上从左到右排列
    createPn1Fn2Grid: function(){
        var me = this;
        this.pn1fn2grid = Ext.create('widget.detailtypegrid',{
            region: 'east',
            height:'35%',
            width: '65%'    
        });
        //查询选项
        this.pn1fn2grid.getStore().on('beforeload',function(){
            var params = this.pn1fn2grid.getStore().getProxy().extraParams;
            var record = me.topform.getForm().getValues();
            
                var orderKey = record.orderKey;
                delete params.orderKey;
                if(orderKey) params.orderKey = orderKey;
                
        },this);
        return this.pn1fn2grid;
    }, 
    
    createLeftForm: function(){
    	var me = this;
    	this.childdetailform = Ext.create('Ext.form.Panel',{
			xtype:'form',
			region: 'east',
			height:'35%',
			width: '65%',
			frame:true,
			border: false,
			headerPosition: 'bottom',
	        bodyPadding: 1,
	        defaults: {
	        	xtype: 'fieldcontainer',
                hideLabel: true,
	            anchor: '100%',
	            labelWidth: 100
	        },
	        items: []
	    
    	});
    	return this.childdetailform;
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
             height:'50%',
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
    	this.pn2grid = Ext.create('widget.k3uploadgrid',{
    		region: 'center'
            });
    	this.pn2grid.getStore().on('beforeload',function(){
			//var records = me.pn1grid.getSelectionModel().getSelection(); 
            var params = this.pn2grid.getStore().getProxy().extraParams;
			var record = me.topform.getForm().getValues();
				var orderKey = record.orderKey;
				delete params.orderKey;
				if(orderKey) params.orderKey = orderKey;
            },this);
    	return this.pn2grid;
    },

    
      //上传重量
	onUploadWeight: function(){
			Ext.Ajax.request({
			    url: basePath + '/prod/doUploadWeight.action',
			    params: {
			    },		
			    success: function(response){
			       var text = Ext.decode(response.responseText);
			       console.log(text);
			       var success = text.success;
			       console.log(text.json.msg);
		       	   MessageBox.show(success, text.json.msg);
			    }
			});
    },    
    
    //查询重量
    onQueryWeight: function(){
        this.pn1fn2grid.getStore().load();
    },   
    
    //上传单条重量
    onUploadWeightItem: function(){
    	var me = this;
        var records = me.pn1fn2grid.getSelectionModel().getSelection(); 
        if(records == ""){
            MessageBox.error('错误提示','请选择操作的数据！');
            return;
        }else{
        	var data = records[0].getData();
            Ext.Ajax.request({
                url: basePath + '/prod/doSingerUploadWeight.action',
                params: {
                	lottable06:data.lottable06
                },      
                success: function(response){
                   var text = Ext.decode(response.responseText);
                   var success = text.success;
                   me.pn1fn2grid.getStore().load();
                   MessageBox.show(success, text.json.msg);
                }
            });
        }
    },   
/***********************************************************************************************
/ 名称：打印相关信息
/ 位置：
/   
/作者：
/功能描述：
/
*************************************************************************************************/ 
    //打印01
	onprintWorkShop01: function(){
		var me = this;
        var records = me.pn2grid.getSelectionModel().getSelection(); 
		if(records == ""){
    		MessageBox.error('错误提示','请选择操作的数据！');
    		return;
    	}
		else
		{
			var data = records[0].getData();
			console.log(data.weight);
			if(data.weight == 0.0000000000){
				MessageBox.error('错误提示','重量为零！');
                return;
			}
			Ext.Ajax.request({
			    url: basePath + '/prod/printWorkShop01.action',
			    params: {
                    lot06:data.lot06
			    },		
                async: false,				
			    success: function(response){
			        var text = Ext.decode(response.responseText);
		        url = basePath + text.json.path;
			    }
			});
		}	
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
//        }
    },    
        //打印02
	onprintWorkShop02: function(){
		var me = this;
        var records = me.pn2grid.getSelectionModel().getSelection(); 
		if(records == ""){
    		MessageBox.error('错误提示','请选择操作的数据！');
    		return;
    	}
		else
		{
			var data = records[0].getData();
			Ext.Ajax.request({
			    url: basePath + '/prod/printWorkShop02.action',
			    params: {
                    lot06:data.lot06
			    },		
                async: false,				
			    success: function(response){
			        var text = Ext.decode(response.responseText);
		        url = basePath + text.json.path;
			    }
			});
		}	
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
//        }
    },   
       //打印03
	onprintWorkShop03: function(){
		var me = this;
        var records = me.pn2grid.getSelectionModel().getSelection(); 
		if(records == ""){
    		MessageBox.error('错误提示','请选择操作的数据！');
    		return;
    	}
		else
		{
			var data = records[0].getData();
			Ext.Ajax.request({
			    url: basePath + '/prod/printWorkShop03.action',
			    params: {
                    lot06:data.lot06
			    },		
                async: false,				
			    success: function(response){
			        var text = Ext.decode(response.responseText);
		        url = basePath + text.json.path;
			    }
			});
		}	
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
//        }
    },   
    //打印04
	onprintWorkShop04: function(){
		var me = this;
        var records = me.pn2grid.getSelectionModel().getSelection(); 
		if(records == ""){
    		MessageBox.error('错误提示','请选择操作的数据！');
    		return;
    	}
		else
		{
			var data = records[0].getData();
			Ext.Ajax.request({
			    url: basePath + '/prod/printWorkShop04.action',
			    params: {
                    lot06:data.lot06
			    },		
                async: false,				
			    success: function(response){
			        var text = Ext.decode(response.responseText);
		        url = basePath + text.json.path;
			    }
			});
		}	
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
//        }
    },   
       //打印05
	onprintWorkShop05: function(){
		var me = this;
        var records = me.pn2grid.getSelectionModel().getSelection(); 
		if(records == ""){
    		MessageBox.error('错误提示','请选择操作的数据！');
    		return;
    	}
		else
		{
			var data = records[0].getData();
			Ext.Ajax.request({
			    url: basePath + '/prod/printWorkShop05.action',
			    params: {
                    lot06:data.lot06
			    },		
                async: false,				
			    success: function(response){
			        var text = Ext.decode(response.responseText);
		        url = basePath + text.json.path;
			    }
			});
		}	
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
//        }
    },   
       //打印06
	onprintWorkShop06: function(){
		var me = this;
        var records = me.pn2grid.getSelectionModel().getSelection(); 
		if(records == ""){
    		MessageBox.error('错误提示','请选择操作的数据！');
    		return;
    	}
		else
		{
			var data = records[0].getData();
			Ext.Ajax.request({
			    url: basePath + '/prod/printWorkShop06.action',
			    params: {
                    lot06:data.lot06
			    },		
                async: false,				
			    success: function(response){
			        var text = Ext.decode(response.responseText);
		        url = basePath + text.json.path;
			    }
			});
		}	
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
//        }
    },   
       //打印07
	onprintWorkShop07: function(){
		var me = this;
        var records = me.pn2grid.getSelectionModel().getSelection(); 
		if(records == ""){
    		MessageBox.error('错误提示','请选择操作的数据！');
    		return;
    	}
		else
		{
			var data = records[0].getData();
			Ext.Ajax.request({
			    url: basePath + '/prod/printWorkShop07.action',
			    params: {
                    lot06:data.lot06
			    },		
                async: false,				
			    success: function(response){
			        var text = Ext.decode(response.responseText);
		        url = basePath + text.json.path;
			    }
			});
		}	
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
//        }
    },   
       //打印08
	onprintWorkShop08: function(){
		var me = this;
        var records = me.pn2grid.getSelectionModel().getSelection(); 
		if(records == ""){
    		MessageBox.error('错误提示','请选择操作的数据！');
    		return;
    	}
		else
		{
			var data = records[0].getData();
			Ext.Ajax.request({
			    url: basePath + '/prod/printWorkShop08.action',
			    params: {
                    lot06:data.lot06
			    },		
                async: false,				
			    success: function(response){
			        var text = Ext.decode(response.responseText);
		        url = basePath + text.json.path;
			    }
			});
		}	
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
//        }
    },   
        //打印09
	onprintWorkShop09: function(){
		var me = this;
        var records = me.pn2grid.getSelectionModel().getSelection(); 
        var topValues  = me.topform.getForm().getValues();
        
		if(records == ""){
    		MessageBox.error('错误提示','请选择操作的数据！');
    		return;
    	}
		else
		{
			var data = records[0].getData();
            if(0.000==data.weight)
            {
                MessageBox.error('错误提示','尚未称重，不能打印!');
                return;
            }            
			Ext.Ajax.request({
			    url: basePath + '/prod/printWorkShop09.action',
			    params: {
                    num:topValues.num,
                    sku:data.sku,
                    name:data.name,
                    model:data.model,
                    specification:data.specification,
                    qty:data.qty,
                    width:data.width,
                    lot06:data.lot06,
                    lot04:data.lot04,
                    axle:data.axle,
                    weight:data.weight,
                    thick:data.thick,
                    area:data.area,
                    packkey:data.packkey,
                    wettability:data.wettability,
                    qcuser:data.qcuser
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
        //打印10
	onprintWorkShop10: function(){
		var me = this;
        var records = me.pn2grid.getSelectionModel().getSelection(); 
        var topValues  = me.topform.getForm().getValues();
        
		if(records == ""){
    		MessageBox.error('错误提示','请选择操作的数据！');
    		return;
    	}
		else
		{
			var data = records[0].getData();
			Ext.Ajax.request({
			    url: basePath + '/prod/printWorkShop10.action',
			    params: {
                    num:topValues.num,
                    sku:data.sku,
                    name:data.name,
                    model:data.model,
                    specification:data.specification,
                    qty:data.qty,
                    width:data.width,
                    lot06:data.lot06,
                    lot04:data.lot04,
                    axle:data.axle,
                    weight:data.weight,
                    thick:data.thick,
                    area:data.area,
                    packkey:data.packkey,
                    wettability:data.wettability,
                    qcuser:data.qcuser
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
    }
});

Ext.onReady(function(){
	Ext.create('Ext.container.Viewport', {
	    layout: 'border',
	    items: [
            {
                xtype:'k3uploadmanager',
                region:'center'
            }
        ]
	});
});