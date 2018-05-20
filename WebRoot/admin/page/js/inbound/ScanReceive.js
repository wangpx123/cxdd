/******************************************************************

生产 Workshop1.js


*******************************************************************/

//Pn1Grid,store 用具体名称临时用StoreDemo1指代

Ext.define('ReceiptDetailGrid', {
    extend: 'Ext.data.Model',
    fields: [
        {name:'id'},            
        {name:'receiptKey'},
        {name:'storerKey'},
        {name:'externReceiptkey'},
        {name:'externLineno'},
        {name:'lineNumber'},//行号
        {name:'status'},//状态
        {name:'dpoKey'},//PO号            
        {name:'poLineno'},//PO行号
        {name:'sku'},//商品
        {name:'altsku'},//别名
        {name:'name'},//中文品名
        {name:'descr'},//英文品名
        {name:'packKey'},//包装
        {name:'uom'},//单位            
        {name:'ti'},//TixHi
        {name:'hi'},
        {name:'qtyUomExpected',type:'float'},//预期单位数量
        {name:'qtyExpected',type:'float'},//预期数量
        {name:'qtyUomReceived',type:'float'},//实收单位数量
        {name:'qtyReceived',type:'float'},//实收数量
        {name:'fromloc'},//收货库位
        {name:'cube'},//体积
        {name:'wgt'},//毛重            
        {name:'toloc'},//上架库位
        {name:'tolot'},//入库批次        
        {name:'conditionCode'},//冻结编码
        {name:'holdReason'},//冻结原因
        {name:'lottable01',type:'date',dateFormat : 'Y-m-d H:i:s.u'},//入库日期
        {name:'lottable02',type:'date',dateFormat : 'Y-m-d H:i:s.u'},//生产日期
        {name:'lottable03',type:'date',dateFormat : 'Y-m-d H:i:s.u'},//失效日期
        {name:'lottable04'},//批属性04            
        {name:'lottable05'},//批属性05
        {name:'lottable06'},//批属性06
        {name:'lottable07'},//批属性07
        {name:'lottable08'},//批属性08
        {name:'lottable09'},//批属性09
        {name:'lottable10'},//批属性10
        {name:'lottable11'},//批属性11
        {name:'lottable12'},//批属性12
        {name:'lottable13'},//批属性13
        {name:'lottable14'},//批属性14
        {name:'lottable15'},//批属性15
        {name:'udf1'},//自定义1
        {name:'udf2'},//自定义2
        {name:'udf3'},//自定义3
        {name:'udf4'},//自定义4
        {name:'udf5'},//自定义5
        {name:'notes'},//备注
        {name:'addDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
        {name:'addWho'},
        {name:'editDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
        {name:'editWho'}    
    ],
    idProperty: 'id'
});

Ext.define('ScanDetailGrid', {
    extend: 'Ext.data.Model',
    fields: [
        {name:'id'},
        {name:'serialNo'},
        {name:'receiptKey'},
        {name:'lineNumber'},
        {name:'status'},  
        {name:'gid'},
        {name:'uom'},  
        {name:'uomqty'}, 
        {name:'scanqty'}, 
        {name:'qty'},
        {name:'udf1'},   
        {name:'scanloc'},
        {name:'addDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
        {name:'addWho'},
        {name:'editDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
        {name:'editWho'}    
    ],
    idProperty: 'id'
});

// 抽象为 Pn1Grid
Ext.define('Redm.inbound.ReceiptDetailGrid',{
    extend: 'Redm.BaseGrid',
    alias : 'widget.receiptdetailgrid',
    autoLoad:false,
    buildColumns: function(){
        this.columns = [
            { header: "行号", dataIndex: 'lineNumber', width: 60, sortable: true},
            { header: "入库单号", dataIndex: 'receiptKey', width: 150, sortable: true},
            { header: "PO编号", dataIndex: 'dpoKey', width: 100, sortable: true},
            { header: "商品", dataIndex: 'sku', width: 110, sortable: true},
//          { header: "别名", dataIndex: 'altsku', width: 110, sortable: true},
            { header: "中文名称", dataIndex: 'name', width: 100, sortable: true},
            { header: "英文名称", dataIndex: 'descr', width: 60, sortable: true},
            { header: "状态", dataIndex: 'status', width: 100, sortable: true,
                    renderer:this.rendererDetailStatusFunc
            },            
//          { header: "冻结码", dataIndex: 'conditionCode', width: 50, sortable: true,
//                    renderer:this.rendererConditionCodeFunc
//            },
//          { header: "冻结原因", dataIndex: 'holdReason', width: 80, sortable: true},
            { header: "包装", dataIndex: 'packKey', width: 130, sortable: true},
            { header: "单位", dataIndex: 'uom', width: 50, sortable: true},
//          { header: "TI", dataIndex: 'ti', width: 30, sortable: true},
//          { header: "HI", dataIndex: 'hi', width: 30, sortable: true},
            { header: "收货库位", dataIndex: 'fromloc', width: 120, sortable: true},
            { header: "上架库位", dataIndex: 'toloc', width: 120, sortable: true},
            { header: "预期单位数量", dataIndex: 'qtyUomExpected', width: 80, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
            { header: "预期数量", dataIndex: 'qtyExpected', width: 80, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
            { header: "实收单位数量", dataIndex: 'qtyUomReceived', width: 80, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
            { header: "实收数量", dataIndex: 'qtyReceived', width: 80, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
            { header: "入库批次", dataIndex: 'tolot', width: 110, sortable: true},
            { header: swmslot01, dataIndex: 'lottable01',width: 130,sortable: true,editor:{xtype:'datefield',format:'Y-m-d H:i:s'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},//入库日期
            { header: swmslot02, dataIndex: 'lottable02',width: 130,sortable: true,editor:{xtype:'datefield',format:'Y-m-d H:i:s'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},//生产日期
            { header: swmslot03, dataIndex: 'lottable03',width: 130,sortable: true,editor:{xtype:'datefield',format:'Y-m-d H:i:s'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},//失效日期
            { header: swmslot04, dataIndex: 'lottable04', width: 110, sortable: true},
            { header: swmslot05, dataIndex: 'lottable05', width: 110, sortable: true},
            { header: swmslot06, dataIndex: 'lottable06', width: 110, sortable: true},
            { header: swmslot07, dataIndex: 'lottable07', width: 110, sortable: true},
            { header: swmslot08, dataIndex: 'lottable08', width: 110, sortable: true},
            { header: swmslot09, dataIndex: 'lottable09', width: 110, sortable: true},
            { header: swmslot10, dataIndex: 'lottable10', width: 110, sortable: true},
            { header: swmslot11, dataIndex: 'lottable11', width: 110, sortable: true},
            { header: swmslot12, dataIndex: 'lottable12', width: 110, sortable: true},
            { header: swmslot13, dataIndex: 'lottable13', width: 110, sortable: true},
            { header: swmslot14, dataIndex: 'lottable14', width: 110, sortable: true},
            { header: swmslot15, dataIndex: 'lottable15', width: 110, sortable: true},
            { header: "PO行号", dataIndex: 'poLineno', width: 50, sortable: true},
            { header: "单价", dataIndex: 'cube', width: 50, sortable: true},       //需要增加单价字段
            { header: "体积", dataIndex: 'cube', width: 50, sortable: true},
            { header: "净重", dataIndex: 'wgt', width: 50, sortable: true},        //需要增加净重字段
            { header: "毛重", dataIndex: 'wgt', width: 50, sortable: true},
            { header: "自定义1", dataIndex: 'udf1', width: 110, sortable: true},
            { header: "自定义2", dataIndex: 'udf2', width: 110, sortable: true},
            { header: "自定义3", dataIndex: 'udf3', width: 110, sortable: true},
            { header: "自定义4", dataIndex: 'udf4', width: 110, sortable: true},
            { header: "自定义5", dataIndex: 'udf5', width: 110, sortable: true},
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
        this.buildStore(basePath + '/inbound/doQueryReceiptDetail.action','ReceiptDetailGrid',20);
        this.callParent(arguments);
    },
    
  rendererDetailStatusFunc:function(value)
        {
            var retValue;
            if(value=='0') retValue='新建';
            else if(value=='4') retValue='部分收货';
            else if(value=='5') retValue='收货完成';
            else  retValue=value;
            return retValue;
        },

//发货单类型解析函数
    rendererTypeFunc:function(value)
        {
            var retValue;
            if(value=='0') retValue='正常';
            else  retValue=value;
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

Ext.define('Redm.prod.ScanDetailGrid',{
    extend: 'Redm.BaseGrid',
    alias : 'widget.scandetailgrid',
    autoLoad:false,
    //selModel:Ext.create('Ext.selection.CheckboxModel', {}),
    buildColumns: function(){
        this.columns = [
            { header: "行号", dataIndex: 'lineNumber', width: 60, sortable: true},
            { header: "入库单号", dataIndex: 'receiptKey', width: 150, sortable: true},
//            { header: "序号", dataIndex: 'serialNo', width: 60, sortable: true},
            { header: "状态", dataIndex: 'status', width: 80, sortable: true, renderer:this.rendererStatusFunc},
            { header: "托盘号", dataIndex: 'gid', width: 130, sortable: true},
            { header: "卷号", dataIndex: 'udf1', width: 130, sortable: true},
            { header: "单位", dataIndex: 'uom', width: 90,sortable: true},
            { header: "数量", dataIndex: 'uomqty', width: 110, sortable: true},
            { header: "扫描库位", dataIndex: 'scanloc', width: 100, sortable: true},
            { header: "卷数", dataIndex: 'qty', width: 100, sortable: true},
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
        this.buildStore(basePath + '/inbound/doQueryScanDetail.action','ScanDetailGrid',20);
        this.callParent(arguments);
    },
    rendererStatusFunc:function(value)
        {
            var retValue;
            if(value=='0') retValue='新建';
            else if(value=='9') retValue='已收货';
            else  retValue=value;
            return retValue;
        }

});

//Manager 定义，最外部的容器

Ext.define('Redm.inbound.ScanReceiveManager',{  //与功能相关的命名
    extend: 'Ext.panel.Panel',   //只有一个panel，需要改为继承 Ext.panel.Panel
    alias : 'widget.scanreceivemanager',
    title:'扫描收货',
    layout: 'border',
    tabPosition: 'bottom',
    initComponent: function(){
        var me = this;
        this.items = [this.createPn1Panel(),this.createPn2Panel(),this.createTopPanel()];
        this.callParent(arguments);
    },

    onSelect: function(){
        this.pn1grid.getStore().load();
        this.topform.getForm().findField('lineNumber').setValue('');
        this.pn2grid.getStore().load();
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
            height: 50,
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
             width: '100%',
            layout: 'vbox',
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
                        labelWidth: 100
                    },
                    items: [
                        {
                            name:'receiptKey',  
                            fieldLabel: '入库单号',
                            labelWidth: 60,
                            listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }                                
                        },
                        {
                            name:'status',  
                            fieldLabel: '状态',
                            labelWidth: 40,
                             width: 150,
                            xtype:'codecombo',
                            codeType:'STATUSTYPE',
                            value:'5'
                        }, 
                         {
                            name:'lineNumber',  
                            fieldLabel: '编号',
                            labelWidth: 60,
                            hidden:true                            
                        }, 
                        	{
                            xtype:'button',
                            text : "查询",
                             width: 60,
                            iconCls: 'icon-search',
                            handler: me.onSelect,
                            scope : this
                        },
                        {
                            xtype:'button',
                            text : "重置",
                            width: 60,
                            iconCls: 'icon-reset',
                            handler: me.onReset,
                            scope : this
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
        this.pn1grid = Ext.create('widget.receiptdetailgrid',{
            region: 'center',
            //主表选中后，明细表grid显示对应的明细表记录
            listeners: {
                itemclick: function(grid,record){
                    me.topform.getForm().loadRecord(record);
                    console.log(record);
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
            var receiptKey = record.receiptKey;
            var status = record.status;
            delete params.receiptKey;
            delete params.status;
            if(receiptKey) params.receiptKey = receiptKey;
            if(status) params.status = status;
        },this);
        return this.pn1grid;
    },
/*     createLeftForm: function(){
        var me = this;
        this.childdetailform = Ext.create('Ext.form.Panel',{
            xtype:'form',
            region: 'east',
            height:'35%',
            width: '50%',
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
    },*/
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
            items:[this.createPn2Grid(),this.createPn2Form()]
        });
        return this.pn2panel;
    },
    createPn2Form: function(){
        var me = this;
        this.dobox1 = Ext.create('Ext.form.Panel',{
            frame: true,
            width:500,
            region:'east',
            defaults: {
                xtype: 'fieldcontainer',
                margin: '20 2 2 2',
                layout: 'hbox'
            },
            items:[
                {
                    defaults: {
                        xtype: 'textfield',
                        width: 200,
                        labelWidth: 60
                    },
                    items:[
                        {
                            fieldLabel: '跟踪号',
                            allowBlank: false,
                            xtype: 'textfield', 
                            width: 150
                        },
                        {
                            xtype: 'checkbox',
                            margin: '2 2 2 10',
                            boxLabel: '逐件扫描',
                            width: 80,
                            disabled: false,
                            listeners: {
                                change: function(ckb,newValue){
                                    var form = me.dobox1.getForm();
                                    var waveKey = form.findField('waveKey');
                                    var boxKey = form.findField('boxKey');
                                    if(newValue == true){
                                        waveKey.setReadOnly(false);
                                        boxKey.focus();
                                    }else{
                                        waveKey.setReadOnly(false);
                                    }
                                }
                            },
                            name: 'locked'
                        },
                        {
                            fieldLabel: '商品代码',
                            allowBlank: false,
                            xtype: 'textfield', 
                            width: 200
                        }
                    ]
                    
                },
                {
                    defaults: {
                        xtype: 'textfield',
                        width: 200,
                        labelWidth: 60
                    },
                    items:[
                        {
                            fieldLabel: '中文描述',
                            width: 212
                        },
                        {
                            margin: '0 0 0 30',
                            fieldLabel: '数量'
                        }
                    ]
                    
                },
                {
                    defaults: {
                        xtype: 'textfield',
                        width: 200,
                        labelWidth: 60
                    },
                    items:[
                        {
                            fieldLabel: '英文描述',
                            width: 212
                        },
                        {
                            margin: '0 0 0 30',
                            fieldLabel: '扫描合计'
                        }
                    ]
                    
                },
                {
                    defaults: {
                        xtype: 'textfield',
                        width: 200,
                        labelWidth: 60
                    },
                    items:[
                        {
                            fieldLabel: '整箱数量',
                            width: 212
                        },
                        {
                            margin: '0 0 0 30',
                            fieldLabel: '已收合计'
                        }
                    ]
                    
                },
                {
                    defaults: {
                        xtype: 'button',
                        margin: '0 0 0 60',
                        width: 80,
                        buttonAlign:'center'
                    },
                    items:[
                        {
                            xtype: 'button', 
                            text: '确认扫描',
                            iconCls: 'icon-edit',   
                            scope: this,
                            handler: function(){
                                var form = me.dobox1.getForm();
                                var p = form.findField('p').getValue();
                                if(!p){
                                    me.onSave1();
                                }
                            }
                        },
                        {
                            xtype: 'button', 
                            text: '打印标签',
                            iconCls: 'icon-printer',
                            handler: function(){
                                var form = me.dobox1.getForm();
                                var orderKey = form.findField('orderKey').getValue();
                                var boxKey = form.findField('boxKey').getValue();
                                if(orderKey == ''){
                                    MessageBox.error('错误提示','单号不可以为空！');
                                    return;
                                }
                                if(boxKey == ''){
                                    MessageBox.error('错误提示','箱号不可以为空！');
                                    return;
                                }
                                Ext.Ajax.request({
                                    url: basePath + '/system/updateBoxStatus.action',
                                    params: {
                                        orderKey: orderKey,
                                        boxKey: boxKey
                                    },
                                    success: function(response){
                                       var text = Ext.decode(response.responseText);
                                       var success = text.success;
                                       MessageBox.show(success,text.json.msg);
                                       form.reset();
                                    }
                                });
                            }
                        },
                        {
                            xtype: 'button', 
                            text: '确认收货',
                            iconCls: 'icon-ok',
                            handler: function(){
                                var form = me.dobox1.getForm();
                                var orderKey = form.findField('orderKey').getValue();
                                var boxKey = form.findField('boxKey').getValue();
                                if(orderKey == ''){
                                    MessageBox.error('错误提示','单号不可以为空！');
                                    return;
                                }
                                if(boxKey == ''){
                                    MessageBox.error('错误提示','箱号不可以为空！');
                                    return;
                                }
                                Ext.Ajax.request({
                                    url: basePath + '/system/updateBoxStatus.action',
                                    params: {
                                        orderKey: orderKey,
                                        boxKey: boxKey
                                    },
                                    success: function(response){
                                       var text = Ext.decode(response.responseText);
                                       var success = text.success;
                                       MessageBox.show(success,text.json.msg);
                                       form.reset();
                                    }
                                });
                            }
                        }
                    ]
                }
            ]
        });
        return this.dobox1;
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
        this.pn2grid = Ext.create('widget.scandetailgrid',{
            region: 'center'
            });
        this.pn2grid.getStore().on('beforeload',function(){
            //var records = me.pn1grid.getSelectionModel().getSelection(); 
            var params = this.pn2grid.getStore().getProxy().extraParams;
            var record = me.topform.getForm().getValues();
            
            var receiptKey = record.receiptKey;
            var lineNumber = record.lineNumber;
            
            delete params.receiptKey;
            delete params.lineNumber;
            
            if(lineNumber) params.lineNumber = lineNumber;
            if(receiptKey) params.receiptKey = receiptKey;
                
            },this);
        return this.pn2grid;
    },

    
    //取消主表记录对应的订单分配结果
    onDeleteUnallocatedItems: function(){
        var me = this;
        var records = me.pn1grid.getSelectionModel().getSelection(); 

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
            var data = records[0].getData();
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
        var topValues  = me.topform.getForm().getValues();
        if(records == ""){
            MessageBox.error('错误提示','请选择操作的数据！');
            return;
        }
        else
        {    
            var data = records[0].getData();
            console.log(data);
            Ext.Ajax.request({
                url: basePath + '/prod/printWorkShop1.action',
                params: {
                    num:topValues.num,
                    lot06:data.lot06,
                    thick:data.thick,
                    width:data.width,
                    length:data.length,
                    model:data.model,
                    spec:data.spec,
                    wettability:data.wettability
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
                xtype:'scanreceivemanager',
                region:'center'
            }
        ]
    });
});