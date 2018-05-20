/******************************************************************

生产 Workshop1.js


*******************************************************************/

//Pn1Grid,store 用具体名称临时用StoreDemo1指代

Ext.define('BOSGrid', {
    extend: 'Ext.data.Model',
    fields: [
        {name:'id'},
        {name:'billno'},
        {name:'orderdate'}
    ],
    idProperty: 'id'
});

Ext.define('BOSDetailGrid', {
    extend: 'Ext.data.Model',
    fields: [
        {name:'id'},
        {name:'billno'},
        {name:'sku'},
        {name:'linenumber'},
        {name:'name'},  
        {name:'model'},
        {name:'specification'},  
        {name:'lot06'}, 
        {name:'thick'}, 
        {name:'width'},
        {name:'length'},   
        {name:'area'},
        {name:'wettability'}
    ],
    idProperty: 'id'
});

// 抽象为 Pn1Grid
Ext.define('Redm.prod.BOSGrid',{
	extend: 'Redm.BaseGrid',
    alias : 'widget.bosgrid',
    autoLoad:false,
    buildColumns: function(){
        this.columns = [
		    { header: "单据号", dataIndex: 'billno', width: 200, sortable: true},
		    { header: "审核日期", dataIndex: 'orderdate',width: 200, sortable: true}
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
		this.buildStore(basePath + '/prod/doQueryBOSInfo1.action','BOSGrid',20);
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

Ext.define('Redm.prod.BOSDetailGrid',{
	extend: 'Redm.BaseGrid',
    alias : 'widget.bosdetailgrid',
    autoLoad:false,
    //selModel:Ext.create('Ext.selection.CheckboxModel', {}),
    buildColumns: function(){
        this.columns = [
		    { header: "单据号", dataIndex: 'billno', width: 130, sortable: true},
		    { header: "行号", dataIndex: 'linenumber', width: 60, sortable: true},
		    { header: "商品", dataIndex: 'sku', width: 120, sortable: true},
		    { header: "品名", dataIndex: 'name', width: 80, sortable: true},
		    { header: "型号", dataIndex: 'model', width: 80, sortable: true},
		    { header: "规格", dataIndex: 'specification', width: 90,sortable: true},
		    { header: "卷号", dataIndex: 'lot06', width: 110, sortable: true},
		    { header: "厚度", dataIndex: 'thick', width: 100, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    { header: "宽幅", dataIndex: 'width', width: 100, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    { header: "卷长", dataIndex: 'length', width: 100, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    { header: "面积", dataIndex: 'area', width: 100, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    { header: "表面处理", dataIndex: 'wettability', width: 100,sortable: true},
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
		this.buildStore(basePath + '/prod/doQueryBOSDetailInfo1.action','BOSDetailGrid',20);
		this.callParent(arguments);
	}

});

//Manager 定义，最外部的容器

Ext.define('Redm.inbound.UnallocateManager',{  //与功能相关的命名
	extend: 'Ext.panel.Panel',   //只有一个panel，需要改为继承 Ext.panel.Panel
    alias : 'widget.unallocatemanager',
    title:'分切车间',
	layout: 'border',
    tabPosition: 'bottom',
    initComponent: function(){
    	var me = this;
    	this.items = [this.createPn1Panel(),this.createPn2Panel(),this.createTopPanel()];
        this.callParent(arguments);
    },

    onSelect: function(){
    	this.pn1grid.getStore().load();
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
                            name:'billno',  
                            fieldLabel: '单据号',
                            labelWidth: 60,
                            listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }                                
                        },
                        {
                            fieldLabel: '卷号',
                            name:'lot06',  
                            labelWidth: 40,
                            xtype: 'textfield'
                        }, {
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
                        },
                        {
                            fieldLabel: '标签数量',
                            name:'num',  
                            labelWidth: 60,
                            width: 120,
                            xtype: 'numberfield',
                            margin: '0 5 0 5',
                            minValue:0,
                            value:3
                        },
                        {
                            xtype:'button',
                            text : "打印标签",
                            width: 80,
                            iconCls: 'icon-printer',
                            handler : me.onprintWorkShop01,
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
    		items:[this.createPn1Grid(),me.createLeftForm()]
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
    	this.pn1grid = Ext.create('widget.bosgrid',{
    		region: 'center',
    		 width: '35%',
    		//主表选中后，明细表grid显示对应的明细表记录
			listeners: {
				itemclick: function(grid,record){
					me.topform.getForm().loadRecord(record);
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
    		
    		var billno = record.billno;
    		var lot06 = record.lot06;
    		delete params.billno;
    		delete params.lot06;
    		if(billno) params.billno = billno;
    		if(lot06) params.lot06 = lot06;
    		
    	},this);
    	return this.pn1grid;
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
    	this.pn2grid = Ext.create('widget.bosdetailgrid',{
    		region: 'center'
            });
    	this.pn2grid.getStore().on('beforeload',function(){
			//var records = me.pn1grid.getSelectionModel().getSelection(); 
            var params = this.pn2grid.getStore().getProxy().extraParams;
			var record = me.topform.getForm().getValues();
			
			//	var data = records[0].getData();
				var billno = record.billno;
                var lot06 = record.lot06;
                
				delete params.billno;
				delete params.lot06;
				if(billno) params.billno = billno;
				if(lot06) params.lot06 = lot06;
				
                
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
                xtype:'unallocatemanager',
                region:'center'
            }
        ]
	});
});