/*************************************************
事件查看

*************************************************/

Ext.define('Event', {
    extend: 'Ext.data.Model',
    fields: [
		{name:'id'},
		{name:'udf1'},
		{name:'udf2'},
		{name:'udf3'},
        {name:'addDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},     
        {name:'addWho'},        
        {name:'editDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},     
        {name:'editWho'}        
	],
    idProperty: 'id'
});

Ext.define('Redm.inventory.EventLogGrid', {
    extend: 'Redm.BaseGrid',
    alias : 'widget.eventloggrid',
    loadMask: true,
    forceLayout:true,
    autoLoad:false,
    buildColumns: function(){
        this.columns = [
//		    { header: "id", dataIndex: 'id', width: 100, sortable: true,hide:true},
		    { header: "用户", dataIndex: 'editWho', width: 100, sortable: true},
		    { header: "自定义1", dataIndex: 'udf1', width: 300, sortable: true},
		    { header: "自定义2", dataIndex: 'udf2', width: 300, sortable: true},
    		{ header: "自定义3", dataIndex: 'udf3', width: 300, sortable: true},
	        { header: "修改时间", dataIndex: 'editDate', width: 120, sortable: false,editor:{xtype:'datefield',format:'Y-m-d H:i:s'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i')}
//	        { header: "创建时间", dataIndex: 'addDate', width: 120, sortable: false,editor:{xtype:'datefield',format:'Y-m-d H:i:s'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i')},
//		    { header: "创建人", dataIndex: 'addWho', width: 100, sortable: true,hide:true}
		];
		return true;
    },

	buildDockedItems: function(){
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
    	this.buildStore(basePath+'/system/doQueryEventLog.action','Event',20);
      this.callParent(arguments);
    },
    
});



//主面板
Ext.define('Redm.support.EventLog', {	
	extend: 'Ext.panel.Panel',
    alias : 'widget.eventlogmanager',
    layout:'border',
    title:'交易日志',   //加上这个title，看上去比较清楚，但会占掉一行，暂不需要
    initComponent: function(){

    	this.items = [/*this.createTopPanel(),*/this.createBtmPanel()];
      this.callParent(arguments);
    },

    //底部面板
    createBtmPanel: function(){
    	this.btmpanel = Ext.create('Ext.panel.Panel',{
    		region: 'center',
    		layout: 'border',
    		items: [this.createEventLogGrid(),this.createTopForm()]
    	});
    	return this.btmpanel;
    },
    
    //底部GRID面板
    createEventLogGrid:function(){
    	var me = this;
    	this.eventloggrid = Ext.create('widget.eventloggrid',{
			region: 'center'
/*			listeners: {//    查询不能显示记录
				itemclick: function(grid,record){
					console.log(record);
					me.top.getForm().loadRecord(record);
				}
			}*/
		});

/*
//according to area.js

		this.warehousegrid.getStore().on('beforeload',function(){
    		var params = this.warehousegrid.getStore().getProxy().extraParams;
    		var record = me.selform.getForm().getValues();
    		
    		var area = record.area;
    		var description = record.description;
    		
			delete params.area;
			delete params.description;
    		
			if(area) params.area = area;
         	if(description) params.description = description;
    	},this);*/
		this.eventloggrid.getStore().on('beforeload',function(){
    		var params = this.eventloggrid.getStore().getProxy().extraParams;
    		var record = me.top.getForm().getValues();

		    var udf1 = record.udf1;
		    var udf2 = record.udf2;
		    var udf3 = record.udf3;
		    var editWho = record.editWho;
            var dStart = record.dStart;
            var dEnd = record.dEnd;

			delete params.udf1;
			delete params.udf2;
			delete params.udf3;
			delete params.editWho;
			delete params.dStart;
			delete params.dEnd;
			
			if(udf1) params.udf1 = udf1;
			if(udf2) params.udf2 = udf2;
			if(udf3) params.udf3 = udf3;
			if(editWho) params.editWho = editWho;
			if(dStart) params.dStart = dStart;
			if(dEnd) params.dEnd = dEnd;

    	},this);
		return this.eventloggrid;
    },
    
    //顶部查询面板
    createTopForm: function(){
        var me=this;
    	this.top = Ext.create('Ext.form.Panel',{

			region: 'north',
			height:120,
			labelWidth : 80,
    		//split: true,      //form 中间的隐藏窗口的按钮，库存部分其他菜单没有，可以统一添加
			frame : true,
			border : false,
			autoScroll :true,
			resizable: true,
			collapsible : true,
			layout: 'anchor',
			buttonAlign:'left',  
            
            //以下是每个item的公共属性
            defaults: {
                anchor: '100%',
                xtype: 'fieldcontainer',
                layout: 'hbox',
                defaultType: 'textfield',
                combineErrors: true,
                width:260,
                defaults:{
					margins: '0 2 0 6'
                }
            },

    		items: [
                //  这是表头
                {
                    items: [
                        {
                            fieldLabel:'自定义1',
                            labelWidth:60,
                            name: 'udf1',
                            listeners:
                            {
                                blur: function(txt){
                                    var udf1Value= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(udf1Value);
                                }                                           
                            }
                        },
                        {
                            fieldLabel:'自定义2',
                            labelWidth:60,
                            name: 'udf2',
                            listeners:{
                                blur: function(txt){
                                    var udf2Value=Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(udf2Value);
                                } 
                            }
                        },
                        {
                            fieldLabel:'自定义3',
                            labelWidth:60,
                            name: 'udf3',
                            listeners:{
                                blur: function(txt){
                                    var udf3Value= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(udf3Value);
                                }
                            }
                        }
                    ]
                },
                {
                    items: [
                        {
                            fieldLabel:'用户',
                            labelWidth:60,
                            name:'editWho',
                            listeners:{
                                blur: function(txt){
                                    var editWhoValue= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(editWhoValue);
                                }
                            }
                        },
                        {	
                            fieldLabel:'修改时间',
                            labelWidth:60,
                            width:191,
                            xtype:'datefield',
                            name: 'dStart',
                            format:'Y-m-d H:i:s'
                        },
                        {	
                            fieldLabel:'  --->',
                            labelWidth:60,
                            width:191,
                            xtype:'datefield',
                            name: 'dEnd',
                            format:'Y-m-d H:i:s'
                        }
                    ]
                }
			],
            buttons:[
                {
				    text : "查询",
				    iconCls: 'icon-search',
				    scope : this,
                    margins: '0 0 0 60',
                    handler: function()
                    {
                        //查询代码在beforeload事件中处理
                        this.eventloggrid.getStore().load();
                    }
			    },
                {
				    text : "重置",
				    iconCls: 'icon-reset',
				    scope : this,
                    margins: '0 0 0 20',
                    handler: function()
                    {
                        this.top.getForm().reset();
                    }
			    }
			]
    	});
    	return this.top;
    }
});

Ext.onReady(function(){
	Ext.create('Ext.container.Viewport', {
	    layout: 'border',
	    items: [{
	    	xtype:'eventlogmanager',
	    	region:'center'
	    }]
	});
});

