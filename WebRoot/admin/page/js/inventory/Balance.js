Ext.define('Redm.inventory.CountmentManager', {
    extend: 'Redm.BaseTab',
    alias : 'widget.countmentmanager',
    region: 'center',
    initComponent: function(){
    	this.callParent(arguments);
    },
    buildTabList: function(){
    	var listFormConfig = {
    		height:100,
    		items : [{
                items: [{
                	xtype: 'storercombo',
                	name:'storerKey',
                	labelWidth : 80,
                	width:180
                },{
                    name: 'countmentKey',
                    fieldLabel: '盘库单号',
                	labelWidth : 80,
                	width:180
                },{
                	xtype:'datefield',
                    name: 'effectiveDateStr',
                    fieldLabel: '盘库时间',
                    format:'Y-m-d H:i',
                	labelWidth : 80,
                	width:210
                },{
                    xtype:'datefield',
                    name: 'effectiveDateEnd',
                    format:'Y-m-d H:i',
                	width:130
                }]
            },{
                items: [{
                	name: 'type',
                    fieldLabel: '类型',
                	labelWidth : 80,
                	width:180
                },{
                    name: 'countMode',
                    fieldLabel: '方式',
                	labelWidth : 80,
                	width:180
                }]
            }]
    	};
    	
    	var listGridConfig = {
    		store: Ext.create('Ext.data.Store', {
    			autoLoad: false,
    			remoteSort: true,
		        fields: [
					{name:'id'},
					{name:'countmentKey'},
					{name:'storerKey'},
					{name:'effectiveDate',type:'date',dateFormat : 'Y-m-d H:i:s'},
					{name:'status'},
					{name:'type'},
					{name:'countMode'},
					{name:'effectiveStr',type:'date',dateFormat : 'Y-m-d H:i:s'},
					{name:'effectiveEnd',type:'date',dateFormat : 'Y-m-d H:i:s'},
					{name:'locStr'},
					{name:'locEnd'}
				],
				proxy: {
		            type: 'ajax',
//		            url: 'queryCountments.action'
		            url: '',
		            reader: {type: 'json',root: 'json.data',totalProperty: 'json.totalCount'},
		            actionMethods: { read: 'POST' },
		            simpleSortMode: true
		        },
		        sorters:[{property :'countmentKey',direction:'DESC'}]
		    }),
	        columns: [
	        	{ header: "货主", dataIndex: 'storerKey', width: 140, sortable: true},
			    { header: "盘库单号", dataIndex: 'countmentKey', width: 140, sortable: true},
			    { header: "盘库时间", dataIndex: 'effectiveDate', width: 120, sortable: true,renderer : Ext.util.Format.dateRenderer('Y-m-d H:i')},
			    { header: "状态", dataIndex: 'status', width: 140, sortable: true},
			    { header: "类型", dataIndex: 'type', width: 140, sortable: true},
			    { header: "方式", dataIndex: 'countMode', width: 140, sortable: true}
			]
    	}
    	
		return this.createListTab(listFormConfig,listGridConfig);
	},
	buildTabDetail: function(){
		var detailFormConfig = {
			actionUrl:'saveCountment.action',
			orderNo:'countmentKey',
			width:280,
			items : [{
                items: [{
                    name: 'countmentKey',
                    fieldLabel: '盘库单号',
                    allowBlank: false,
                    readOnly:true,
                    flex: 1
                }, {
					xtype: 'storercombo',
					name:'storerKey',
                	fieldLabel:'货主',
                    allowBlank: false,
                    flex: 1
                }]
            },{
                items: [{
                	name: 'type',
                    xtype:'combobox',
                    fieldLabel: '类型',
                    displayField: 'text',
                    valueField: 'value',
                    store:Ext.create('Ext.data.Store', {
					    fields: ['text','value'],
					    data: [{text:'动态盘库',value:'动态盘库'},{text:'静态盘库',value:'静态盘库'}]
					}),
					value: '动态盘库',
					forceSelection: true,
                    flex: 1
                },{
                	name: 'countMode',
                    xtype:'combobox',
                    fieldLabel: '方式',
                    displayField: 'text',
                    valueField: 'value',
                    store:Ext.create('Ext.data.Store', {
					    fields: ['text','value'],
					    data: [{text:'明盘',value:'明盘'},{text:'盲盘',value:'盲盘'}]
					}),
					value: '明盘',
					forceSelection: true,
                    flex: 1
                },{
                	name: 'status',
                    xtype:'combobox',
                    fieldLabel: '状态',
                    displayField: 'text',
                    valueField: 'value',
                    store:Ext.create('Ext.data.Store', {
					    fields: ['text','value'],
					    data: [{text:'初盘',value:'初盘'},{text:'复盘',value:'复盘'}]
					}),
					value: '初盘',
					forceSelection: true,
					readOnly:true,
                    flex: 1
                }]
            },{
                items: [{
                	xtype:'label',
                	text:'盘库时间范围:',
                	margins: '-2 0 0 6'
                }]
            },{
                items: [{
                	xtype:'datefield',
                	format:'Y-m-d H:i',
                    name: 'effectiveStr',
                	margins: '0 0 -2 6',
                    flex: 1
                },{
                	xtype:'datefield',
                	format:'Y-m-d H:i',
                    name: 'effectiveEnd',
                    margins: '0 0 -2 6',
                    flex: 1
                }]
            },{
                items: [{
                	xtype:'label',
                	text:'库位范围:',
                	margins: '-2 0 0 6'
                }]
            },{
                items: [{
                    name: 'locStr',
                	margins: '0 0 -2 6',
                    flex: 1,
                    listeners:{
				    	'change':function(f, e)
				    	{
				    		f.setValue(f.getValue().toUpperCase());
				    		var locEnd = this.detailform.getForm().findField('locEnd');
				    		if(locEnd.getValue()==''){
				    			locEnd.setValue(f.getValue().toUpperCase());
				    		}
				    	},scope:this
				    }
                },{
                    name: 'locEnd',
                    margins: '0 0 -2 6',
                    flex: 1,
                    listeners:{
				    	'change':function(f, e)
				    	{
				    		f.setValue(f.getValue().toUpperCase());
				    	}
				    }
                }]
            },{
                items: [{
                	xtype:'button',
                    text: '生成',
                	margins: '0 0 0 6',
                	handler: this.onCreateCountItems,
                	scope:this
                }]
            },{
				xtype:'hidden',
				name : "id"
			},{
            	xtype:'hidden',
				name : "deleteItems"
			}],
            buttons:[this.createAction,this.cancelAction],
	        listeners:{
	            render:function(p){
	                p.getEl().on("contextmenu",function(e)
	                {
	                	this.createDetailformContextMenu(e);
	                },this)
	            },scope:this
	        }
		};
		
		Ext.define('Countmentdetail', {
		    extend: 'Ext.data.Model',
		    fields: [
	        	{name: 'id'},
	        	{name: 'countmentKey'},
				{name: 'countmentLineNumber'},
				{name: 'sku'},
				{name: 'skuDescription'},
				{name: 'storerKey'},
				{name: 'loc'},
				{name: 'lot'},
				{name: 'qty',type:'int'},
				{name: 'firstQty'},
				{name: 'firstDifferenceQty'},
				{name: 'againQty'},
				{name: 'againDifferenceQty'},
				{name: 'addDate'},
				{name: 'addWho'},
				{name: 'editDate'},
				{name: 'editWho'}
	        ],
		    validations: [
		        {type: 'presence',  field: 'sku'},
		        {type: 'presence',  field: 'loc'},
		        {type: 'presence',  field: 'firstQty'}
		    ]
		});
	    
	    var celledit = Ext.create('Ext.grid.plugin.CellEditing',{
	    	clicksToEdit: 1,
	    	listeners :{
	    		'beforeedit':function(e)
	    		{},scope:this,
	    		edit:function(editor,e)
	    		{
	    			//修改后禁止修改单据 信息
	    			this.setFormReadOnly(this.detailform,true,['countmentKey','status']);
	    			
	    			var rec = e.record;
	    			
	    			var differenceQty = e.value-rec.data.qty;
    				if(e.value==null){
    					differenceQty = "";
    				}
	    			if(e.field =='firstQty'){
	    				rec.set('firstDifferenceQty',differenceQty);
	    			}else if(e.field =='againQty'){
	    				rec.set('againDifferenceQty',differenceQty);
	    			}
	    		}
	    	}
	    });
	    
	    var proStore = Ext.create('Ext.data.Store', {
	        autoLoad: false,
        	fields: [
				{name:'storerKey'},
				{name:'sku'}, 
				{name:'descr'}, 
				{name:'packKey'},
				{name:'uom',defaultValue:'EA'}
			],
	        proxy: {
	            type: 'ajax',
//	            url: basePath + '/basicdata/querySkus.action',
	            url: '',
	            reader: {type: 'json',root: 'json.data',totalProperty: 'json.totalCount'},
	            actionMethods: { read: 'POST' },
	            simpleSortMode: true
	        }
	    })	    
	   	
		var detailGridConfig = {
			plugins: [celledit],
			store: Ext.create('Ext.data.Store', {
		        model:'Countmentdetail',
		        proxy: {
		            type: 'ajax',
//		            url: 'queryCountmentdetails.action',
		            url: '',
		            reader: {type: 'json',root: 'json.data',totalProperty: 'json.totalCount'},
		            actionMethods: { read: 'POST' },
		            simpleSortMode: true
		        },
		        sorters:[{property :'countmentLineNumber',direction:'ASC'}]
		    }),
	        columns: [
	            {
		            header: "Line #",
		            width: 45,
		            dataIndex:'countmentLineNumber',
					sortable: false
		        },
	            { header: "商品  *", dataIndex: 'sku', width: 100,sortable: false	},
				{ header: "商品名称", dataIndex: 'skuDescription', width: 140, sortable: false},
	            { header: "库位 *", dataIndex: 'loc', width: 80, sortable: false},
	            { header: "库存", dataIndex: 'qty', width: 80, sortable: false},
	            { header: "初盘数量*", dataIndex: 'firstQty', width: 80, sortable: false,editor:{xtype:'numberfield',minValue:0,decimalPrecision:0}},
	            { header: "初盘差异", dataIndex: 'firstDifferenceQty', width: 80, sortable: false},
	            { header: "复盘数量", dataIndex: 'againQty', width: 80, sortable: false,editor:{xtype:'numberfield',minValue:0,decimalPrecision:0}},
	            { header: "复盘差异", dataIndex: 'againDifferenceQty', width: 80, sortable: false}
	        ]	        
		};
		
		return this.createDetailTab(detailFormConfig,detailGridConfig);
	},
	createDetailTab:function(formConfig,gridConfig)
	{
		//详细页面中的表单
		formConfig = Ext.apply({
			region: 'west',
			width:540,
			labelWidth : 80,
			frame : true,
			border : false,
			layout: 'anchor',
			autoScroll :true,
			split : true,
			collapsible : true,
            defaults: {
            	labelWidth : 70,
                anchor: '100%',
                xtype: 'fieldcontainer',
                layout: 'hbox',
                defaultType: 'textfield',
                combineErrors: true,
                defaults: {
                	labelAlign : 'top',
                    margins: '-1 2 -2 6'
                }
            },
            buttonAlign:'center',
            buttons:[this.createAction,this.cancelAction]
		},formConfig);
		
		this.detailform = new Ext.form.FormPanel(formConfig);
				
	    
		this.deleteAction = Ext.create('Ext.Action', {
	        text: '删除',
	        disabled: true,
	        handler: this.onRemoveClick,
	        scope: this
	    });
	    
	    this.firstCountAction = Ext.create('Ext.form.ComboBox', {
	        text: '初盘显示',
            displayField: 'text',
            valueField: 'value',
            store:Ext.create('Ext.data.Store', {
			    fields: ['text','value'],
			    data: [{text:'全部',value:'全部'},{text:'差异为0',value:'差异为0'},{text:'差异不为0',value:'差异不为0'}]
			}),
			value: '全部',
			forceSelection: true,
	        width:85,
	        listeners:{
	        	'select':function(e){
	        		this.onCountViewItems("firstDifferenceQty",e.getValue());
	        	},scope: this
	        }
	    });
	    this.againCountAction = Ext.create('Ext.form.ComboBox', {
	        text: '复盘显示',
            displayField: 'text',
            valueField: 'value',
            store:Ext.create('Ext.data.Store', {
			    fields: ['text','value'],
			    data: [{text:'全部',value:'全部'},{text:'差异为0',value:'差异为0'},{text:'差异不为0',value:'差异不为0'}]
			}),
			value: '全部',
			forceSelection: true,
	        width:85,
	        listeners:{
	        	'select':function(e){
	        		this.onCountViewItems("againDifferenceQty",e.getValue());
	        	},scope: this
	        }
	    });
	    
	    var contextMenuGrid = Ext.create('Ext.menu.Menu', {
	        items: [
	            this.deleteAction,
	            this.createAction
	        ]
	    });
	    
		gridConfig = Ext.apply({
	        region: 'center',
			resizable: false,
	        viewConfig: {
	            stripeRows: true
	        },
	        dockedItems:[{
	            xtype: 'toolbar',
	            dock: 'top',
	            items: [
	            	this.deleteAction,'-',
	            	this.createAction,'->',
	            	'初盘显示',
	            	this.firstCountAction,'-',
	            	'复盘显示',
	            	this.againCountAction,'-',
	            	this.printAction
	            ]
            }],
            listeners:{
				'containercontextmenu': function(view, e) {
		            e.stopEvent();
		            contextMenuGrid.showAt(e.getXY());
		            return false;
		        },
		        'containerdblclick': function(view, e) {
		            this.onDetailGridDbClick();
		        },scope:this,
		        'itemcontextmenu': function(view, rec, node, index, e) {
		            e.stopEvent();
		            contextMenuGrid.showAt(e.getXY());
		            return false;
		        }
			}
	    },gridConfig);
	    	
		this.detailgrid =  Ext.create('Ext.grid.Panel', gridConfig);
		
		var edit = this.detailgrid.getPlugin();
	    
	    this.detailTab = new Ext.create('Ext.Panel',{
			title: 'Form',
			itemId:'formTab',
            layout: 'border',
            items:[this.detailform,this.detailgrid]
      	});
      	
		return this.detailTab;
	},
	onDeleteClick: function(){
		var lsg = this.listgrid;
        var selection = lsg.getView().getSelectionModel().getSelection()[0];
        if (selection) {
            this.deleteInfo(selection.data.id,"deleteCountment.action",this);
        }
    },
    setOrderNo: function(){
    	//后台获得序列号，并给表单赋值
    	var me = this;
    	if(me.detailform.form.findField('countmentKey').getValue()=='')
    	{
	    	Ext.Ajax.request({
//			    url: "findNextCountmentKey.action",
			    url: '',
			    success: function(response){
			        var data = Ext.decode(response.responseText);
			        me.detailform.form.setValues({countmentKey:data.json.orderNo});
			    },
			    failure: function(response, opts) {
			    	var data = Ext.decode(response.responseText);
			    }
			});
    	}
    },
    onPrintClick:function(url){
    	var id = this.detailform.form.findField("id").getValue();
    	var orderNo = this.detailform.form.findField(this.detailform.orderNo).getValue();
    	if(id==''){
    		return false;
    	}
    	
    	Ext.Ajax.request({
		    url: url,
		    params:{id:id,orderNo:orderNo},
		    success: function(response){
		        var data = Ext.decode(response.responseText);
		        var locationAddress = window.location.href;
				var attachFilePath = data.json.attachFilePath;
				
//				var url = locationAddress.substring(0,locationAddress.indexOf(Syscfg.getCfg('appPath'))) + Syscfg.getCfg('appPath') +"/upload/files/" + attachFilePath ;
				var url = "";
				window.open(url,"");  
		    },
		    failure: function(response, opts) {
		    	var data = Ext.decode(response.responseText);
		    }
		},this);
    },
    createContextMenuItem:function(){
		this.printCountmentTallyFirstAction = Ext.create('Ext.Action', {
			text : "盘库任务单（初）",
			cls : "x-btn-text-icon",
			handler: function(){
				this.onPrintClick("printCountmentTallyFirst.action");
			},
			scope : this
		});
		this.printCountmentTallyAgainAction = Ext.create('Ext.Action', {
			text : "盘库任务单（复）",
			cls : "x-btn-text-icon",
			handler:  function(){
				this.onPrintClick("printCountmentTallyAgain.action");
			},
			scope : this
		});
		
		this.printCountmentDifferenceFirstAction = Ext.create('Ext.Action', {
			text : "初盘差异报告",
			handler: function(){
				this.onPrintClick("printCountmentDifferenceFirst.action");
			},
			scope : this,
			menu : [
				{
					text:"全部",
					handler: function(){
						this.onPrintClick("printCountmentDifferenceFirst.action");
					},
					scope : this
				},
				{
					text:"有差异",
					handler: function(){
						this.onPrintClick("printCountmentDifferenceFirst.action?firstDifferenceType=HAS");
					},
					scope : this
				},
				{
					text:"无差异",
					handler: function(){
						this.onPrintClick("printCountmentDifferenceFirst.action?firstDifferenceType=NOT");
					},
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
					handler: function(){
						this.onPrintClick("printCountmentDifferenceAgain.action");
					},
					scope : this
				},
				{
					text:"有差异",
					handler: function(){
						this.onPrintClick("printCountmentDifferenceAgain.action?againDifferenceType=HAS");
					},
					scope : this
				},
				{
					text:"无差异",
					handler: function(){
						this.onPrintClick("printCountmentDifferenceAgain.action?againDifferenceType=NOT");
					},
					scope : this
				}
			]
		});
		
		this.printAction = Ext.create('Ext.Action', {
			text : "打印",
			cls : "x-btn-text-icon",
			menu : [
				this.printCountmentTallyFirstAction,
				this.printCountmentTallyAgainAction,
				'-',
				this.printCountmentDifferenceFirstAction,
				this.printCountmentDifferenceAgainAction
			]
		});
    },
    changeMenuDisable:function(){
    	//右键菜单控制
    	var id = this.detailform.getForm().findField('id').getValue()||'';
    	if(id==''){
    		this.createAction.enable();
    		
	        this.deleteAction.enable();
    	}else{
    		this.createAction.enable();
    		
	        this.deleteAction.disable();
    	}
    	
    	this.setFormReadOnly(this.detailform,id!='',['countmentKey','status']);
    },
    createDetailformContextMenu:function(e){
    	if(!this.formContextMenu)
    	{
			this.formContextMenu = Ext.create('Ext.menu.Menu', {
				items: [
					this.createNewAction,
					this.createAction,
					this.cancelAction,
					'-',
					this.printAction
				]
			});
    	}
		
		e.preventDefault();
		this.formContextMenu.showAt(e.getXY());
    },
    onCountViewItems:function(field,val){
		var sto = this.detailgrid.getStore();
		if(val=='全部'){
			sto.filterBy(function(rec){
    			return true;
    		})
		}else if(val=='差异为0'){
			sto.filterBy(function(rec){
    			return rec.get(field)==0;
    		})
		}else if(val=='差异不为0'){
			sto.filterBy(function(rec){
    			return rec.get(field)!=0;
    		})
		}
    },
    onCreateCountItems:function(){
    	var params = this.detailform.getForm().getValues();
    	
    	if(params.storerKey=='')
    	{
    		Ext.Msg.alert("提示信息","请先选择货主!");
    		return false;
    	}
    	
    	if(params.type=='动态盘库'&&(!params.effectiveStr||!params.effectiveEnd)){
    		Ext.Msg.alert("提示信息","请选择盘库时间范围!");
    		return false;
    	}
    	
    	if(params.type=='静态盘库'&&(!params.locStr||!params.locEnd)){
    		Ext.Msg.alert("提示信息","请选择库位范围!");
    		return false;
    	}
    	
		this.detailgrid.store.load({
			params:params,
			callback: function(records, operation, success) {
		        
		    },
		    scope:this
		});
    },
    detailSubmitValid:function(formPanel,gridPanel,submitUrl,success,failure,scope){
    	//商品信息
		var records = gridPanel.getStore().getRange();
		
		//错误提示
		var msg ="";
		var modelValid = true;
		var againCountSize = 0; //0全部位null或空为初盘，againCountSize = records.leagth为复盘，againCountSize != records.leagth为复盘不完整报错。
		Ext.Array.each(records,function(model,index){
			if(!model.isValid())
			{
				modelValid = false;
				msg = "商品明细数据不合法，请注意必填项及录入的数据格式！";
				return false;
			}
			
			var rec = model;
			
			if(rec.data.againQty!=null)
			{
				againCountSize++;
				if(againCountSize!=index+1)
				{
					modelValid = false;
					msg = "商品明细数据不合法，请注意必填项及录入的数据格式！";
				}
			}
			
		});
		
		
		if(!modelValid){
			this.alert(msg, "提示信息");
			return false;
		}
    	
		var status = "初盘";
		if(againCountSize==records.length){
			status = "复盘";
		}
		formPanel.form.setValues({status:status});
		
    	return true;
    }
});

Ext.onReady(function(){
    new Ext.LoadMask('loading-mask', {msg:"打开中，请稍候..."});
    Ext.QuickTips.init();
    
    Ext.widget('viewport', {
        renderTo: Ext.getBody(),
        layout: 'fit',
        items: [Ext.widget('countmentmanager')]
    });
});
