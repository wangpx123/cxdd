/******************************************************************

涂布车间 Workshop3.js

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
        {name:'linenumber'},  
        {name:'sku'},  
        {name:'name'}, 
        {name:'model'}, 
        {name:'specification'},   
        {name:'packkey'},
        {name:'lot04'},
        {name:'lot06'},
        {name:'thick'},
        {name:'width'},
        {name:'qty'},
        {name:'area'},
        //标签上显示ERP部门  2015-08-13
        {name:'dept'},
        //标签上显示ERP入库类型  2015-08-13
        {name:'rtype'},
        {name:'weight'},
        {name:'axle'},
        {name:'wettability'},
        {name:'qcuser'}
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
		    { header: "制单日期", dataIndex: 'orderdate',width: 200, sortable: true}
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
		this.buildStore(basePath + '/prod/doWk3QueryBOSInfo.action','BOSGrid',20);
		this.callParent(arguments);
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
//    selModel:Ext.create('Ext.selection.CheckboxModel', {}),
    buildColumns: function(){
        this.columns = [
		    { header: "单据号", dataIndex: 'billno', width: 130, sortable: true},
		    { header: "行号", dataIndex: 'linenumber', width: 60, sortable: true},
		    { header: "商品", dataIndex: 'sku', width: 120, sortable: true},
		    { header: "品名", dataIndex: 'name', width: 80, sortable: true},
		    { header: "型号", dataIndex: 'model', width: 80, sortable: true},
		    { header: "规格", dataIndex: 'specification', width: 80, sortable: true},
		    { header: "包装形式", dataIndex: 'packkey', width: 80, sortable: true},
		    { header: "批号", dataIndex: 'lot04', width: 120, sortable: true},
		    { header: "卷号", dataIndex: 'lot06', width: 110, sortable: true},
		    { header: "重量", dataIndex: 'weight', width: 100, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    { header: "厚度", dataIndex: 'thick', width: 100, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    { header: "宽幅", dataIndex: 'width', width: 100, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    { header: "卷长", dataIndex: 'qty', width: 100, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    { header: "面积", dataIndex: 'area', width: 100, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    { header: "轴芯", dataIndex: 'axle', width: 100, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    { header: "表面处理", dataIndex: 'wettability', width: 100, sortable: true},
		    { header: "部门", dataIndex: 'dept', width: 100, sortable: true},
		    { header: "入库类型", dataIndex: 'rtype', width: 100, sortable: true},
		    { header: "检验员", dataIndex: 'qcuser', width: 100, sortable: true},
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
		this.buildStore(basePath + '/prod/doQueryWk3BOSDetailInfo.action','BOSDetailGrid',20);
		this.callParent(arguments);
	}

});

//Manager 定义，最外部的容器

Ext.define('Redm.inbound.BOSManager',{  //与功能相关的命名
	extend: 'Ext.panel.Panel',   //只有一个panel，需要改为继承 Ext.panel.Panel
    alias : 'widget.BOSManager',
    title:'涂布车间',
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
    	this.pn2grid.getStore().load();
    },

    onReset: function(){
    	this.topform.getForm().reset();
    },
    
/************************************************************************************************* 
/组件名称： TopPanel
/创建方法： createPn1Panel
/位置：     位于manager顶部，'center'位置，继承Ext.form.Panel
/内部组件： 内部的组件上下结构,子空间包含一个Form;
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
            text : "打印反射涂布",
            cls : "x-btn-text-icon",
            handler: this.onprintWorkShop01,
            scope : this
        });
        this.printOperItem4 = Ext.create('Ext.Action', {  //创建Action
            text : "打印反射涂布(B粒子、P粒子)",
            cls : "x-btn-text-icon",
            handler: this.onprintWorkShop04,
            scope : this
        });
        this.printOperItem5 = Ext.create('Ext.Action', {  //创建Action
            text : "打印反射涂布(D粒子)",
            cls : "x-btn-text-icon",
            handler: this.onprintWorkShop05,
            scope : this
        });
        this.printOperItem2 = Ext.create('Ext.Action', {
            text : "打印扩散涂布",
            cls : "x-btn-text-icon",
            handler: this.onprintWorkShop02,
            scope : this
        });
        this.printOperItem3 = Ext.create('Ext.Action', {
            text : "打印扩散涂布(新增)",
            cls : "x-btn-text-icon",
            handler: this.onprintWorkShop03,
            scope : this
        });
        
 
		this.printAction = Ext.create('Ext.Action', {
			text : "打印涂布COA",
            iconCls: 'icon-printer',
			menu : [
				this.printOperItem1,
				this.printOperItem4,
				this.printOperItem5,
				this.printOperItem2,
				this.printOperItem3

			]
		});
		
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
		
		this.printOperItem11 = Ext.create('Ext.Action', {
			text : "打印片材标准标签",
			cls : "x-btn-text-icon",
            handler: this.onprintWorkShop09Pcs,
			scope : this
		});
		
		this.printOperItem12 = Ext.create('Ext.Action', {
			text : "打印片材中性标签",
			cls : "x-btn-text-icon",
            handler: this.onprintWorkShop10Pcs,
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
		
		this.PrintLabel2Action = Ext.create('Ext.Action', {
			text : "打印片材标签",
            iconCls: 'icon-printer',
			menu : [
				this.printOperItem11,
				this.printOperItem12
				
			]
		});

//SO下部打印菜单结束
        
    },
    
/************************************************************************************************* 
/组件名称： TopForm
/创建方法： createTopForm
/位置：     位于TopPanel中部，'center'位置，继承Ext.form.Panel
/内部组件： 查询框，输入框，和查询类的按钮
*************************************************************************************************/     
    //打印反射涂布;
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
			Ext.Ajax.request({			    
			    url: basePath + '/print/printSpreedReflectToPdf.action',
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
    //打印扩散涂布;
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
			    url: basePath + '/print/printSpreedWideToPdf.action',
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
   
     //打印扩散涂布(新增);
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
			    url: basePath + '/print/printSpreedWideToPdfPlus.action',
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
    
     //打印发射涂布（B、P粒子）;
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
			    url: basePath + '/print/printSpreedReflectToPdfInBP.action',
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
    
     
     //打印发射涂布(D粒子);
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
			    url: basePath + '/print/printSpreedReflectToPdfInD.action',
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
                            name:'billno',  
                            labelWidth: 50,
                            xtype: 'textfield',
                            fieldLabel: '单据号',
                            listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }                                
                        },
                        {
                            fieldLabel: '卷号',
                            name:'lot06',  
                            xtype: 'textfield',
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
                         this.printAction,
                        {
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
                        this.PrintLabel2Action
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
    		items:[me.createPn1Grid()]
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
    		region: 'west',
    		 width: '40%',
    		//主表选中后，明细表grid显示对应的明细表记录
			listeners: {
				itemclick: function(grid,record){
					me.topform.getForm().loadRecord(record);
					me.pn2grid.getStore().load();
				} 
			}    		

    	});
        
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

 /*
  * ******************************************************************
  * 以下是标签打印
  * ******************************************************************
  */   
    
        //打印09
	onprintWorkShop09: function(){
		var me = this;
        var records = me.pn2grid.getSelectionModel().getSelection(); 
        var topValues  = me.topform.getForm().getValues();
        var type = '';
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
			    url: basePath + '/prod/printStdWorkShop09.action',
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
                    rtype:data.rtype,
                    dept:data.dept,
                    qcuser:data.qcuser,
                    type:type
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
    
        //打印09
	onprintWorkShop09Pcs: function(){
		var me = this;
        var records = me.pn2grid.getSelectionModel().getSelection(); 
        var topValues  = me.topform.getForm().getValues();
        var type = 'pcs';
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
			    url: basePath + '/prod/printStdWorkShop09.action',
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
                    rtype:data.rtype,
                    dept:data.dept,
                    qcuser:data.qcuser,
                    type:type
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
	onprintWorkShop10Pcs: function(){
			var me = this;
        var records = me.pn2grid.getSelectionModel().getSelection(); 
        var topValues  = me.topform.getForm().getValues();
         var type = 'pcs';
		if(records == ""){
    		MessageBox.error('错误提示','请选择操作的数据！');
    		return;
    	}
		else
		{
			var data = records[0].getData();
			Ext.Ajax.request({
			    url: basePath + '/prod/printMidWorkShop10.action',
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
                    rtype:data.rtype,
                    dept:data.dept,
                    qcuser:data.qcuser,
                    type:type
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
         var type = '';
		if(records == ""){
    		MessageBox.error('错误提示','请选择操作的数据！');
    		return;
    	}
		else
		{
			var data = records[0].getData();
			Ext.Ajax.request({
			    url: basePath + '/prod/printMidWorkShop10.action',
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
                    rtype:data.rtype,
                    dept:data.dept,
                    qcuser:data.qcuser,
                    type:type
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
                xtype:'BOSManager',
                region:'center'
            }
        ]
	});
});