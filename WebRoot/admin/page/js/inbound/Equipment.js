//原超改过的transaction.js,svn 节点另存后的文件名是Transaction-104.js
//用于参考存盘


Ext.define('Redm.inventory.Transaction', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.lotmanager',
    title:'本页为功能调试、测试页',
    initComponent: function(){
    	var me = this;
		this.createContextMenuItem();
		
		this.selectCycle = Ext.create('Ext.button.Cycle',{
            prependText: '',
            showText: true,
            scope: this,
            menu: {
                items: [
                    {
                        text: '按货主',
                        checked: true,
                        url:'byStorer'
                    }, 
                    {
                        text: '按SKU',
                        url:'bySku'
                    }, 
                    {
                        text: '按库位',
                        url:'byLoc'
                    }, 
                    {
                        text: '按SKUx库位',
                        url:'bySkuLoc'
                    }, 
                    {
                        text: '按批次',
                        url:'byLot'
                    }, 
                    {
                        text: '按批次x库位xID',
                        url:'byLotLocId'
                    }
                ]
            },
            scope:this,
		    changeHandler: function(cycleBtn, activeItem) {
//		    	this.onSelectClick(activeItem.url);
		    },
		    handler: function(cycleBtn) {
		    	this.onSelectClick(cycleBtn.getActiveItem().url);
		    },
		    toggleSelected: function() {
		    }
		});
		
		this.selectCycle.menu.on('click',function(m,item){
			this.onSelectClick(item.url);
		},this)
		
    	this.form = new Ext.form.FormPanel({
			region: 'west',
			width:350,
			labelWidth : 80,
			frame : true,
			border : false,
			autoScroll :true,
			resizable: true,
			collapsible : true,
			layout: 'anchor',
			buttonAlign:'center',
            defaults: {
                anchor: '100%',
                xtype: 'fieldcontainer',
                layout: 'hbox',
                defaultType: 'textfield',
                combineErrors: true,
                defaults: {
					margins: '0 2 0 6'
                }
            },
            items : [
                {
                    items: [
                        {xtype:'label',text:'',width:60},
                        {xtype:'label',text:'从',flex: 1},
                        {xtype:'label',text:'到',flex: 1}
                    ]
                },
                {
                    items: [
                        {xtype:'label',text:'货主:',width:45},
                        {name: 'storerKey',flex: 1},//listeners:{'change':function(f, e){f.setValue(f.getValue().toUpperCase());}}},
                        {name: 'storerKeyOver',flex: 1}//,listeners:{'change':function(f, e){f.setValue(f.getValue().toUpperCase());}}}
                    ]
                },
                {
                    items: [
                        {xtype:'label',text:'SKU:',width:45},
                        {name: 'sku',flex: 1},//,listeners:{'change':function(f, e){f.setValue(f.getValue().toUpperCase());}}},
                        {name: 'skuOver',flex: 1}//,listeners:{'change':function(f, e){f.setValue(f.getValue().toUpperCase());}}}
                    ]
                },
                {
                    items: [
                        {xtype:'label',text:'库位:',width:45},
                        {name: 'loc',flex: 1},//,listeners:{'change':function(f, e){f.setValue(f.getValue().toUpperCase());}}},
                        {name: 'locOver',flex: 1}//,listeners:{'change':function(f, e){f.setValue(f.getValue().toUpperCase());}}}
                    ]
                },
                {
                    items: [
                        {xtype:'label',text:'批次:',width:45},
                        {name: 'lot',flex: 1},//,listeners:{'change':function(f, e){f.setValue(this.getAllLot(f.getValue()));},scope:this}},
                        {name: 'lotOver',flex: 1}//,listeners:{'change':function(f, e){f.setValue(this.getAllLot(f.getValue()));},scope:this}}
                    ]
                },
                {
                    items: [
                        {xtype:'label',text:'属性 1:',width:45},
                        {xtype:'datefield',name: 'lottable01',format:'Y-m-d H:i:s.u',flex: 1},
                        {xtype:'datefield',name: 'lottable01Over',format:'Y-m-d H:i:s.u',flex: 1}
                    ]
                },
                {
                    items: [
                        {xtype:'label',text:'属性 2:',width:45},
                        {xtype:'datefield',name: 'lottable02',format:'Y-m-d H:i:s.u',flex: 1},
                        {xtype:'datefield',name: 'lottable02Over',format:'Y-m-d H:i:s.u',flex: 1}
                    ]
                },
                {
                    items: [
                        {xtype:'label',text:'属性 3:',width:45},
                        {xtype:'datefield',name: 'lottable03',format:'Y-m-d H:i:s.u',flex: 1},
                        {xtype:'datefield',name: 'lottable03Over',format:'Y-m-d H:i:s.u',flex: 1}
                    ]
                },
                {
                    items: [
                        {xtype:'label',text:'属性 4:',width:45},
                        {name: 'lottable04',flex: 1},
                        {name: 'lottable04Over',flex: 1}
                    ]
                },
                {
                    items: [
                        {xtype:'label',text:'属性 5:',width:45},
                        {name: 'lottable05',flex: 1},
                        {name: 'lottable05Over',flex: 1}
                    ]
                },
                {
                    items: [
                        {xtype:'label',text:'属性 6:',width:45},
                        {name: 'lottable06',flex: 1},
                        {name: 'lottable06Over',flex: 1}
                    ]
                },
                {
                    items: [
                        {xtype:'label',text:'属性 7:',width:45},
                        {name: 'lottable07',flex: 1},
                        {name: 'lottable07Over',flex: 1}
                    ]
                },
                {
                    items: [
                        {xtype:'label',text:'属性 8:',width:45},
                        {name: 'lottable08',flex: 1},
                        {name: 'lottable08Over',flex: 1}
                    ]
                },
                {
                    items: [
                        {xtype:'label',text:'属性 9:',width:45},
                        {name: 'lottable09',flex: 1},
                        {name: 'lottable09Over',flex: 1}
                    ]
                },
                {
                    items: [
                        {xtype:'label',text:'属性10:',width:45},
                        {name: 'lottable10',flex: 1},
                        {name: 'lottable10Over',flex: 1}
                    ]
                },
                {
                    items: [
                        {xtype:'textfield',name: 'id',hidden: true}
                    ]
                }
            ],
            buttons:[
                this.selectCycle,
                {
                    text : "重置",
                    cls : "x-btn-text-icon",
                    scope : this,
                    handler: function(){
                        this.form.getForm().reset();
                    }
                },
                {
                    text : "修改",
                    cls : "x-btn-text-icon",
                    scope : this,
                    handler: this.onUpdate
                }
            ],
			listeners:{
	            render:function(p){
	                p.getEl().on("contextmenu",function(e)
	                {
	                	if(!this.contextMenu)
				    	{
							this.contextMenu = Ext.create('Ext.menu.Menu', {
								items: [
									this.storerAction,
									this.skuAction,
									this.locAction,
									this.skuLocAction,
									this.lotAction,
									this.lotLocIdAction
								]
							});
				    	}
						
						e.preventDefault();
						this.contextMenu.showAt(e.getXY());
	                },this)
	            },scope:this
	        }
		});
    	
    	this.grid = Ext.create('Ext.grid.Panel', {
	        region: 'center',
			resizable: false,
	        viewConfig: {
	            stripeRows: true
	        },
	        listeners: {
	        	itemclick: function(grid,record){
	        		me.form.getForm().loadRecord(record);
	        	}
	        },
	        store: Ext.create('Ext.data.Store', {
    			autoLoad: true,
		        fields: [
					{name:'storerKey'},
					{name:'sku'},
//					{name:'loc'},
					{name:'lot'},
					{name:'qty'},
					{name:'qtyallocated'},
					{name: 'lottable01',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
					{name: 'lottable02',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
					{name: 'lottable03',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
					{name: 'lottable04'},
					{name: 'lottable05'},
					{name: 'lottable06'},
					{name: 'lottable07'},
					{name: 'lottable08'},
					{name: 'lottable09'},
					{name: 'lottable10'},
					{name: 'id'}
				],
				proxy: {
		            type: 'ajax',
		            url: basePath + '/support/queryLottable.action',
		            reader: {type: 'json',root: 'json.data',totalProperty: 'json.totalCount'},
		            actionMethods: { read: 'POST' },
		            simpleSortMode: true
		        }
		    }),
	        columns: [
	        	{ header: "id", dataIndex: 'id', width: 100, sortable: true/*,hidden: true*/},
	       		{ header: "货主", dataIndex: 'storerKey', width: 100, sortable: true},
			    { header: "SKU", dataIndex: 'sku', width: 100, sortable: true},
			    { header: "库位", dataIndex: '', width: 100, sortable: true},  //取消loc
			    { header: "批次", dataIndex: 'lot', width: 100, sortable: true},
			    { header: "数量", dataIndex: 'qty', width: 100, sortable: true},
			    { header: "已分配数量", dataIndex: 'qtyallocated', width: 100, sortable: true},
			    { header: "冻结数量", dataIndex: '', width: 100, sortable: true},
			    { header: "可用数量", dataIndex: '', width: 100, sortable: true},
			    { header: "属性 1", dataIndex: 'lottable01', width: 120, sortable: false,editor:{xtype:'textfield',format:'Y-m-d H:i:s.u'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i')},
	            { header: "属性 2", dataIndex: 'lottable02', width: 120, sortable: false,editor:{xtype:'textfield',format:'Y-m-d H:i'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i')},
	            { header: "属性 3", dataIndex: 'lottable03', width: 120, sortable: false,editor:{xtype:'textfield',format:'Y-m-d H:i'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i')},
	            { header: "属性 4", dataIndex: 'lottable04', width: 100, sortable: false,editor:{xtype:'datefield'}},
	            { header: "属性 5", dataIndex: 'lottable05', width: 100, sortable: false,editor:{xtype:'datefield'}},
	            { header: "属性 6", dataIndex: 'lottable06', width: 100, sortable: false,editor:{xtype:'textfield'}},
	            { header: "属性 7", dataIndex: 'lottable07', width: 100, sortable: false,editor:{xtype:'textfield'}},
	            { header: "属性 8", dataIndex: 'lottable08', width: 100, sortable: false,editor:{xtype:'textfield'}},
	            { header: "属性 9", dataIndex: 'lottable09', width: 100, sortable: false,editor:{xtype:'textfield'}},
	            { header: "属性 10", dataIndex: 'lottable10', width: 100, sortable: false,editor:{xtype:'textfield'}}
			]
    	});
    	
    	this.grid.on({
			render:function(p){
                p.getEl().on("dblclick",this.onDetailGridDbClick,this)
            },scope:this
	    });
	    
		Ext.apply(this,{
			layout: 'border',
    		items: [this.form,this.grid]
    	});
		
        this.callParent(arguments);
	},
	getAllLot:function(val){
		val = (parseFloat(val||0))+"";
		var length = val.length;
		for(var i=0;i<10-length;i++)
		{
			val = '0'+val;
		}
		return val;
	},
	onSelectClick:function(str){
		var lsg = this.grid;
		if(str!='')
		{
			var params = {query:Ext.encode(this.form.form.getValues()),byQuery:str};
			lsg.getStore().getProxy().extraParams = params;
			lsg.store.load();
		}
		
	},
    createContextMenuItem:function(){
    	//创建属于自己也没的右键按钮
    	this.storerAction = Ext.create('Ext.Action', {
			text : "按货主",
			cls : "x-btn-text-icon",
			handler: function(){
				this.onSelectClick('byStorer');
				this.selectCycle.menu.items.getAt(0).setChecked(true);
			},
			scope : this
		});
		this.skuAction = Ext.create('Ext.Action', {
			text : "按SKU",
			cls : "x-btn-text-icon",
			handler: function(){
				this.onSelectClick('bySku');
				this.selectCycle.menu.items.getAt(1).setChecked(true);
			},
			scope : this
		});
		this.locAction = Ext.create('Ext.Action', {
			text : "按库位",
			cls : "x-btn-text-icon",
			handler: function(){
				this.onSelectClick('byLoc');
				this.selectCycle.menu.items.getAt(2).setChecked(true);
			},
			scope : this
		});
		this.skuLocAction = Ext.create('Ext.Action', {
			text : "按SKUx库位",
			cls : "x-btn-text-icon",
			handler: function(){
				this.onSelectClick('bySkuLoc');
				this.selectCycle.menu.items.getAt(3).setChecked(true);
			},
			scope : this
		});
		this.lotAction = Ext.create('Ext.Action', {
			text : "按批次",
			cls : "x-btn-text-icon",
			handler: function(){
				this.onSelectClick('byLot');
				this.selectCycle.menu.items.getAt(4).setChecked(true);
			},
			scope : this
		});
		this.lotLocIdAction = Ext.create('Ext.Action', {
			text : "按批次x库位xID",
			cls : "x-btn-text-icon",
			handler: function(){
				this.onSelectClick('byLotLocId');
				this.selectCycle.menu.items.getAt(5).setChecked(true);
			},
			scope : this
		});
    },
    onDetailGridDbClick:function(){
    	if(this.form.collapsed)
    		this.form.expand();
    	else
    		this.form.collapse();
    },

    
//这是yc最早写的方法，可以新建存盘或者修改。
//注释掉用另外一种方法试试
/*    
    onUpdate: function(){
    	var me = this;
    	var lotForm = this.form.getForm();
    	lotForm.submit({
		    clientValidation: true,
		    url:  basePath + '/support/saveLotValidate.action',
//		    url:  basePath + '/inventory/saveLotValidate.action',
		    params: {},
		    success: function(form, action) {
		    	var success = action.result;
		        MessageBox.show(success, success.json.msg);
		        lotForm.reset();
		        me.grid.getStore().load();
		    },
		    failure: function(form, action) {
		    	var success = action.result;
		        MessageBox.show(success, success.json.msg);
		        lotForm.reset();
		        me.grid.getStore().load();
		    }
		});
    }*/
    
//参考其他代码整理的存盘方法

   onUpdate:function(){
        var me= this;
        var lotForm = this.form.getForm();
    	var lotValues = lotForm.getValues();
        console.log(lotValues);
     	if(!(lotForm.isValid())) return;
    	Ext.Ajax.request({
		    url: basePath + '/support/saveLotValidate.action',
		    params: {
		        storerKey: lotValues.storerKey,
		        sku: lotValues.sku,
		        lot: lotValues.lot,
		        lottable01: lotValues.lottable01,
		        id: lotValues.id
//		        loc: lotValues.loc,    //  lottable表无此字段
//		        id: lotValues.id,
		    },
		    success: function(response){
		        var text = Ext.decode(response.responseText);
		        var success = text.success;
		        MessageBox.show(success, text.json.msg);
		        lotForm.reset();
		        me.grid.getStore().load();
		    }
		});
    
    }

    
});



//第二个验证示例 tree.panel
Ext.define('Redm.inventory.Transaction', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.treemanager',
    title:'本页为功能调试、测试页',
    initComponent: function(){
    	var me = this;
        
        var store = Ext.create('Ext.data.TreeStore', {
        root: 
            {
                expanded: true,
                children: [
                    { 
                        text: "detention", 
                        leaf: true 
                    },
                    { 
                        text: "homework", 
                        expanded: true, 
                        children: [
                            { 
                                text: "book report", 
                                leaf: true 
                            },
                            { 
                                text: "alegrbra", 
                                leaf: true
                            }
                        ] 
                    },
                    { 
                        text: "buy lottery tickets", 
                        leaf: true 
                    }
                ]
            },
        
});

        
        this.panel=Ext.create('Ext.tree.Panel', {
            title: 'Simple Tree',
            width: 400,
            height: 300,
            store: store,
            rootVisible: false,
    listeners: {
            click: {
                element: 'el', //bind to the underlying el property on the panel
                fn: function(node){ 
                console.log('click el'); 
                console.log(node);
//                 var sm=panel.getSelectionModel();       
//                 var sn=sm.getSelectedNodes();       
                },
/*                fn: function(n){ 
                console.log('click el'); 
                if(n!=this.panel.getRootNode()){
                     var pNode = node.parentNode;
                     var id = pNode.id; 
                    var text = pNode.text;
                    var name = pNode.attributes.name; }

                },*/
/*                click : function(node,e){
                        alert(node.id); //node即单击的节点，node.id即节点ID值
                        console.log(node.id);

                }*/
                
                
            },
       /*     dblclick: {
                element: 'body', //bind to the underlying body property on the panel
                fn: function(){ console.log('dblclick body'); }
            }*/
        },
                    
            renderTo: Ext.getBody()
            
        });        
    	 

		Ext.apply(this,{
			layout: 'border',
    		items: [this.panel]
    	});

        this.callParent(arguments);
	},




    
});




//第三个验证示例 combobox级联


Ext.define('SkuType', {
    extend: 'Ext.data.Model',
    fields: [
    	{name:'id'},
		{name:'skuType'},
		{name:'descr'},
		{name:'parentTypeKey'},
		{name:'storerKey'},
		{name:'cartonKey'},
		{name:'packKey'},
		{name:'locGenerate'},
		{name:'lotKey'},
		{name:'putawayStrategyKey'},
		{name:'rotationStrategyKey'},
		{name:'preAllocationStrategyKey'},
		{name:'allocationStrategyKey'},
		{name:'replenishmentStrategyKey'},
		{name:'userDefine1'},
		{name:'userDefine2'},
		{name:'userDefine3'},
		{name:'userDefine4'},
		{name:'userDefine5'},
		{name:'notes'}
    ]
});


Ext.define('Redm.support.PutawayZones', {	
	extend: 'Ext.panel.Panel',
    alias : 'widget.putawayzone',
    layout:'border',
    initComponent: function(){
    	var me = this;
    	this.items = [this.createBtmPanel()];
        /*this.combo1=Ext.create('Ext.form.ComboBox',{
                    layout: 'hbox',
                    defaults: {
                        xtype: 'combobox',
                        margin: '5 0 0 5',
                        width: 300
                    },
                    items: [
                        {
                            fieldLabel: '货主',
                            xtype: 'storercombo',
                            listeners: {
                                change: function(txt,newValue){
                                    txt.setValue(newValue.toUpperCase());
                                },
                                select:function(txt){                //选中触发的事件，可以显示当前字段名称
                                    console.log(txt.getValue())
                                }          
                                
                            },

                            name: 'storerKey'
                        }
                    ]
                });*/
        
        this.callParent(arguments);
    },

    
    //底部面板
    createBtmPanel: function(){
    	this.btmpanel = Ext.create('Ext.panel.Panel',{ 
    		region: 'center',
    		layout: 'border',
    		border: false,
    		items:[this.createBasicForm()]
    	});
    	return this.btmpanel;
    },

    //底部左边面板
    createBasicForm: function(){
    	var me = this;

        var myStore=Ext.create('Ext.data.Store', {
                                autoLoad: true,   //这里必须先load，否则下拉时再load一次，之前加的参数查询结果就被覆盖了。
                                fields: [
                                    {name:'descr'},
                                    {name:'id'}
                                ],
                                proxy: {
                                    type: 'ajax',
                                    url: basePath + '/support/doQuerySkuType.action',    //这里不加查询参数
                                    reader: {type: 'json',root: 'json.data',totalProperty: 'json.totalCount'},
                                    actionMethods: { read: 'POST' },
                                    simpleSortMode: true
                                },
                                //mode:'remote',    //没有看到作用
                                listeners: {
                                    'load':function(sto,recs){
                                        sto.insert(0,new SkuType({    //插入一条记录
                                            descr: '根节点',
                                            id: '0'
                                　　　　}))
                                    //console.log('store load');
                                    },scope:this
                                },
                                select:function(txt){                //选中触发的事件，可以显示当前字段名称
                                }          
                                
                            });
                            
        
    	this.basicform = Ext.create('Ext.form.Panel',{
    		region: 'west',
    		collapsible: true,
    		width:320,
			split: true,
    		frame: true,
    		defaults: {
    			xtype: 'fieldcontainer',
    			margin: '5 0 0 5',
    			frame: false
    		},
    		items: [
                {
                    layout: 'hbox',
                    defaults: {
                        xtype: 'combobox',
                        margin: '5 0 0 5',
                        width: 300
                    },
                    items: [
                        {
                            fieldLabel: '货主',
                            xtype: 'storercombo',
                            listeners: {
                                change: function(txt,newValue){
                                    txt.setValue(newValue.toUpperCase());
                                },
                                select:function(txt){                //选中触发的事件，可以显示当前字段名称
                                    storerKeyValue=txt.getValue();
                                    console.log(storerKeyValue);
                                    myStore.load({params:{storerKey:storerKeyValue}})
                                }          
                                
                            },
                            name: 'storerKey'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults: {
                        xtype: 'combobox',
                        margin: '5 0 0 5',
                        width: 300
                    },
                    items: [
                        {
                            fieldLabel: '区域',
/*                            listeners: {
//待定
                            },*/
                            store:myStore,
                            displayField: 'descr',
                            valueField: 'id',                        
                            name: 'area'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults: {
                        xtype: 'textfield',
                        margin: '5 0 0 5',
                        width: 300
                    },
                    items: [
                        {
                            fieldLabel: '以下是包装和单位测试',
                            lableWidth:280,
                            width:0
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults: {
                    xtype:'packcombo',
                        margin: '5 0 0 5',
                        width: 300
                    },
                    items: [
                        {
                            fieldLabel: '包装',
                            name: 'packKey'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults: {
                        xtype: 'combobox',
                        margin: '5 0 0 5',
                        width: 300
                    },
                    items: [
                        {
                            fieldLabel: '单位',
/*                            listeners: {
//待定
                            },*/
                            store:myStore,
                            displayField: 'descr',
                            valueField: 'id',                        
                            name: 'area'
                        }
                    ]
                }
            ]
    	});
    	return this.basicform;
    }
});




/*
Ext.onReady(function(){
    new Ext.LoadMask('loading-mask', {msg:"打开中，请稍候..."});
    Ext.QuickTips.init();
    
    Ext.widget('viewport', {
        renderTo: Ext.getBody(),
        layout: 'fit',
        items: [Ext.widget('treemanager')]
    });
});

*/


Ext.onReady(function(){
	Ext.create('Ext.container.Viewport', {
	    layout: 'border',
	    items: [{
	    	xtype:'putawayzone',
	    	region:'center'
	    }]
	});
});
