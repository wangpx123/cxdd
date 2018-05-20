/********************************
 * 
 * 文档下载 DocumentDownload.js
 * 
**********************************/
Ext.define('Redm.rules.DocDownload', {	
	extend: 'Ext.panel.Panel',
    alias : 'widget.docdownload',
    title:'文档下载',
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
    
	//底部面板
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
    		height: 80,
    		border: false,
    		listeners:{
	            render:function(p){
	                p.getEl().on("contextmenu",function(e){
	                	me.createContextMenu(e);
	                },me)
	            }
            },
    		items:[this.createBasicForm()]
    	});
    	return this.toppanel;
    },
 
    //导入按钮集合的form
    createBasicForm: function(){
    	var me = this;
    	this.basicForm = Ext.create('Ext.form.Panel',{
    		region: 'center',
    		stripeRows : true,
			autoScroll : true,
			viewConfig : {
				forceFit: true,
				autoFill: true
			},
			xtype:'form',
			frame:true,
			border: false,
			headerPosition: 'bottom',
	        bodyPadding: 1,
	        defaults: {
	        	xtype: 'button',
                hideLabel: true,
	            anchor: '100%',
	            labelWidth: 100
	        },
	        items: [
                {
                   xtype: 'fieldcontainer',
                   layout: 'hbox',
                   defaults: {
                       labelWidth: 60,
                       margin: '5 0 0 5',
                       width: 160,
                       xtype: 'button'
                   },
                   items: [
                        {
		                  	iconCls: 'icon-upload',
		                    text: '下载SO导入模板',
		                    handler: this.onDownLoadOrderExcel,
		                    scope: this
		                },
		                 {
		                  	iconCls: 'icon-upload',
		                    text: '下载ASN导入模板',
		                    handler: this.onDownLoadReceiptExcel,
		                    scope: this
		                },
		                 {
		                  	iconCls: 'icon-upload',
		                    text: '下载货主XML导入模板',
		                    handler: this.onDownLoadStorerXml,
		                    scope: this
		                },
		                 {
		                  	iconCls: 'icon-upload',
		                    text: '下载货主Excel导入模板',
		                    handler: this.onDownLoadStorerExcel,
		                    scope: this
		                },
		                 {
		                  	iconCls: 'icon-upload',
		                    text: '下载商品TXT导入模板',
		                    handler: this.onDownLoadSkuTxt,
		                    scope: this
		                },
		                 {
		                  	iconCls: 'icon-upload',
		                    text: '下载商品Excel导入模板',
		                    handler: this.onDownLoadSkuExcel,
		                    scope: this
		                },
		                 {
		                  	iconCls: 'icon-upload',
		                    text: '下载库位Excel导入模板',
		                    handler: this.onDownLoadLocationExcel,
		                    scope: this
		                }
		                   ]
		                },
		         {
                   xtype: 'fieldcontainer',
                   layout: 'hbox',
                   defaults: {
                       labelWidth: 60,
                       margin: '5 0 0 5',
                       width: 160,
                        xtype: 'button'
                   },
                   items: [
                       	{
		                  	iconCls: 'icon-upload',
		                    text: '下载系统初始化导入模板',
		                    handler: this.onDownLoadSystemDataExcel,
		                    scope: this
		                },
		                 {
		                  	iconCls: 'icon-upload',
		                    text: '下载浏览器',
		                    handler: this.onDownLoadGoogleBrowser,
		                    scope: this
		                }
                   ]
                }
            ]
    	});
    	return this.basicForm;
    },
    
    //下载系统数据Excel导入模板的方法
   onDownLoadSystemDataExcel: function(){	
            window.location.href = basePath+'/template/systemData.xls';
    	},
    	
    //下载浏览器压缩文件的方法
   onDownLoadGoogleBrowser: function(){	
            window.location.href = basePath+'/template/RedMBrowser.rar';
    	},
    	
    //下载OrderExcel导入模板的方法
   onDownLoadOrderExcel: function(){	
      		window.location.href = basePath+'/template/order.xls';
    	},
    	
    //下载ReceiptExcel导入模板的方法
   onDownLoadReceiptExcel: function(){	
      		window.location.href = basePath+'/template/receipt.xls';
    	},
    //下载货主XML导入模板的方法
   onDownLoadStorerXml: function(){	
      		window.location.href = basePath+'/template/storer.zip';
    	},
    	
    //下载货主Excel导入模板的方法
   onDownLoadStorerExcel: function(){	
      		window.location.href = basePath+'/template/storer.xls';
    	},
    	
    //下载商品TXT导入模板的方法
   onDownLoadSkuTxt: function(){	
      		window.location.href = basePath+'/template/sku.zip';
    	},
    	
    //下载商品Excel导入模板的方法
   onDownLoadSkuExcel: function(){	
      		window.location.href = basePath+'/template/sku.xls';
    	},
    
    //下载库位Excel导入模板的方法
   onDownLoadLocationExcel: function(){	
      		window.location.href = basePath+'/template/location.xls';
    	}
    	
	});

Ext.onReady(function(){
	Ext.create('Ext.container.Viewport', {
	    layout: 'border',
	    items: [{
	    	xtype:'docdownload',
	    	region:'center'
	    }]
	});
});