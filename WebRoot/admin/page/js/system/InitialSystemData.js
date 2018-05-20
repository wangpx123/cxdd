/********************************
 * 
 * 系统数据初始化 InitialSystemData.js
 * 
**********************************/
Ext.define('Redm.system.InitialSystemData', {	
	extend: 'Ext.panel.Panel',
    alias : 'widget.initialsystemdata',
    title:'数据初始化',
    layout:'border',
    initComponent: function(){
    	var me = this;
    	this.tbar = {
	        plugins: new Ext.ux.ToolbarKeyMap(),
	        hidden: true,
	        scope: this,
	        items: []
	    };
    	this.items = [this.createBottomPanel(),this.createTopPanel()];
        this.callParent(arguments);
    },
    
	//创建导入EXCEL面板对话框
	createFormByExcel: function(){
		this.winformByExcel = Ext.create('Ext.window.Window',{
	        autoHeight: true,
			title: '初始化数据导入',
	        height: 110,
			width: 400,
			maximizable: false,
			resizable: false,
	        bodyPadding: '10 10 0',
	        defaults: {
	            anchor: '100%',
	            allowBlank: false,
	            msgTarget: 'side',
	            labelWidth: 60
	        },
            items:[this.createImportFormByExcel()],
			buttons: this.createButtonsByExcel()
   		});		
		this.winformByExcel.on('close',function(){
    		delete this.winformByExcel;
    	},this);		
	    return this.winformByExcel;
	},

    //导入面板上的文本框
    createImportFormByExcel: function(){
    	var me = this;
    	this.importForm = Ext.create('Ext.form.Panel',{
			xtype:'form',
			frame:true,
			headerPosition: 'bottom',
	        autoHeight: true,
	        bodyPadding: '5 2 2 5',
	        items: [
                {
					labelWidth: 60,
                    width: 330,
                    xtype: 'filefield',
                    id: 'filedata',
                    itemId: 'urldata',
                    emptyText: '选择Excel数据文件',
                    fieldLabel: '数据文件',
                    name: 'filedata',
                    buttonText: '',
                    buttonConfig: {
                        iconCls: 'icon-create'
                    }
                }
            ]
    	});
    	return this.importForm;
    },
    
    //导入面板上的按钮
	createButtonsByExcel: function(){
		var buttons = [
            {
                text: '保存',
                scope: this,
                iconCls: 'icon-save',
                handler: this.doSaveImportDataByExcel
            },
            {
                text: '关闭',
                scope: this,
                iconCls: 'icon-cancel',
                handler: function(){
                      this.winformByExcel.close();
            }
            }
        ];
		return buttons;
	},
	
	//导入面板上保存按钮的方法
	doSaveImportDataByExcel: function(){
		var me = this;
		var form = this.importForm.getForm();
        if (form.isValid()) {
            form.submit({
            	url: basePath + '/system/doImportInitialSystemData.action',
            	waitMsg: '正在上传数据，请稍候……',
                success: function(form, action) {
                	if(action.result.success){
                       me.winformByExcel.close();
	                   MessageBox.show(true, action.result.msg);
                       me.gridPanel.getStore().load();
                	}
                },
                failure: function(form, action) {
                    MessageBox.show(false, action.result.msg);
                    me.winformByExcel.close();
                }
            });
        }
	},
	
    //底部Form空面板
    createBottomPanel: function(){
    	this.bottompanel = Ext.create('Ext.panel.Panel',{
    		region: 'center',
    		layout: 'border',
    		border: false,
    		items:[]
    	});
    	return this.bottompanel;
    },
    
    //顶部面板
    createTopPanel: function(){
    	var me = this;
    	this.toppanel = Ext.create('Ext.panel.Panel',{
    		region: 'north',
    		layout: 'border',
    		height: 40,
    		border: false,
    		listeners:{
	            render:function(p){
	                p.getEl().on("contextmenu",function(e){
	                	me.createContextMenu(e);
	                },me)
	            }
            },
    		items:[this.createBtnPanel()]
    	});
    	return this.toppanel;
    },
    
    //顶部导入系统初始化数据面板
    createBtnPanel: function(){
    	var me = this;
    	this.btnpanel = Ext.create('Ext.form.Panel',{
    		region: 'center',
    		frame: true,
    		border: false,
    		defaults: {
    			xtype: 'button'
    		},
    		items:[
                {
                    iconCls: 'icon-upload',
                    text: '导入系统初始化数据',
                    //handler: me.onImport,
					handler: function(){
                        me.createFormByExcel();
                        me.winformByExcel.show();
                    },
                    scope: this
                }
            ]
    	});
    	return this.btnpanel;
    }
	});

Ext.onReady(function(){
	Ext.create('Ext.container.Viewport', {
	    layout: 'border',
	    items: [{
	    	xtype:'initialsystemdata',
	    	region:'center'
	    }]
	});
});