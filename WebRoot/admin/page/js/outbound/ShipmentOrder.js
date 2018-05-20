/**********************************************
发货单 ShipmentOrder.js

***********************************************/

Ext.define('StoreSoGrid', {
    extend: 'Ext.data.Model',
    fields: [
        {name:'id'},
        {name:'externorderkey'},
        {name:'orderKey'},  //SO单号
        {name:'type'},      //SO类型
        {name:'ordergroup'}, //订单组别
        {name:'status'},     //SO状态
		{name:'opstatus'},//处理状态
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
        {name:'otherReference4'},//其他参考号4
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
        {name:'buyerAddress'},//购买方地址
        {name:'buyerContact'},//购买方联系人
        {name:'buyerMobile'},//购买方手机
        {name:'buyerTel'},//购买方电话
        {name:'billto'},//结算方
        {name:'billtoName'},//结算方名称
        {name:'billtoAddress'},//结算方地址
        {name:'billtoContact'},//结算方联系人
        {name:'billtoMobile'},//结算方手机
        {name:'billtoTel'},//结算方电话
        {name:'consigneeAddress'},//收货方地址
        {name:'consigneeContact'},//收货方联系人
        {name:'consigneeMobile'},//收货方手机
        {name:'consigneeTel'},//收货方电话
        {name:'buyerNation'},
        {name:'buyerProvince'},
        {name:'buyerCity'},
        {name:'buyerCounty'},
        {name:'buyerPosition'},
        {name:'buyerFax'},
        {name:'buyerEmail'},
        {name:'billtoNation'},
        {name:'billtoProvince'},
        {name:'billtoCity'},
        {name:'billtoCounty'},
        {name:'billtoPosition'},
        {name:'billtoFax'},
        {name:'billtoEmail'},
        {name:'consigneeNation'},
        {name:'consigneeProvince'},
        {name:'consigneeCity'},
        {name:'consigneeCounty'},
        {name:'consigneePosition'},
        {name:'consigneeFax'},
        {name:'consigneeEmail'},
        
        {name:'carrierAddress'},
        {name:'carrierContact'},
        {name:'carrierMobile'},
        {name:'carrierTel'},
        {name:'carrierNation'},
        {name:'carrierProvince'},
        {name:'carrierCity'},
        {name:'carrierCounty'},
        {name:'carrierPosition'},
        {name:'carrierFax'},
        {name:'carrierEmail'},
        //新增字段;
        {name:'shipper'},
        {name:'checker'},
//        {name:'createWho'},
        
        {name:'addDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},//添加日期
        {name:'addWho'},//添加人
        {name:'editDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},//修改日期
        {name:'editWho'},//修改人
        {name:'descsotype'}
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
        {name:'qtyOrdered',type:'float'},//订单数量
        {name:'qtyUomOrdered',type:'float'},//订单单位数量
        {name:'qtyPreallocated',type:'float'},//预分配数
        {name:'qtyUomPreallocated',type:'float'},//预分配单位数
        {name:'qtyAllocated',type:'float'},//分配数量
        {name:'qtyUomAllocated',type:'float'},//分配单位数量
        {name:'qtyPicked',type:'float'},//拣货数量
        {name:'qtyUomPicked',type:'float'},//拣货单位数量
        {name:'qtyShipped',type:'float'},//发运数量
        {name:'qtyUomShipped',type:'float'},//发运单位数量
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
        {name:'udf5'},//自定义5
        {name:'addDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},//添加日期
        {name:'addWho'},//添加人
        {name:'editDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},//修改日期
        {name:'editWho'}//修改人        
    ],
    idProperty: 'id'
});


Ext.define('StorePickDetailGrid', {
    extend: 'Ext.data.Model',
    fields: [
	        {name:'id'},
	        {name:'orderKey'},
	        {name:'storerKey'},
	        {name:'lineNumber'},
	        {name:'status'},
	        {name:'sku'},
	        {name:'altsku'},
	        {name:'lot'},
	        {name:'loc'},
	        {name:'gid'},
	        {name:'dropid'},
	        {name:'packKey'},
	        {name:'uom'},
	        {name:'uomqty',type:'float'},
	        {name:'qty',type:'float'},
	        {name:'pallet'},
	        {name:'casecnt'},
	        {name:'innerpack'},
	        {name:'qtypicked',type:'float'},
	        {name:'qtyunpicked',type:'float'},
	        {name:'qtymoved',type:'float'},
	        {name:'cartongroup'},
	        {name:'cartontype'},
	        {name:'fromloc'},
	        {name:'toloc'},
	        {name:'doreplenish'},
	        {name:'replenishzone'},
	        {name:'docartonize'},
	        {name:'pickmethod'},
	        {name:'wavekey'},
	        {name:'trackingid'},
	        {name:'picknotes'},
	        {name:'crossdocked'},
	        {name:'description'},
            {name:'lottable01',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
            {name:'lottable02',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
            {name:'lottable03',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
            {name:'lottable04'},
            {name:'lottable05'},
            {name:'lottable06'},
            {name:'lottable07'},
            {name:'lottable08'},
            {name:'lottable09'},
            {name:'lottable10'},
            {name:'lottable11'},
            {name:'lottable12'},
            {name:'lottable13'},
            {name:'lottable14'},
            {name:'lottable15'},
            {name:'lottable16'},
            {name:'lottable17'},
            {name:'lottable18'},
            {name:'lottable19'},
            {name:'lottable20'},
            {name:'udf1'},
            {name:'addDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},//添加日期
            {name:'addWho'}//添加人
    ],
    idProperty: 'id'
});

Ext.define('StoreUnfinishedDetailGrid', {
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
        {name:'qtyOrdered',type:'float'},//订单数量
        {name:'qtyUomOrdered',type:'float'},//订单单位数量
        {name:'qtyPreallocated',type:'float'},//预分配数
        {name:'qtyUomPreallocated',type:'float'},//预分配单位数
        {name:'qtyAllocated',type:'float'},//分配数量
        {name:'qtyUomAllocated',type:'float'},//分配单位数量
        {name:'qtyPicked',type:'float'},//拣货数量
        {name:'qtyUomPicked',type:'float'},//拣货单位数量
        {name:'qtyShipped',type:'float'},//发运数量
        {name:'qtyUomShipped',type:'float'},//发运单位数量
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
        {name:'udf5'},//自定义5
        {name:'addDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},//添加日期
        {name:'addWho'},//添加人
        {name:'editDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},//修改日期
        {name:'editWho'}//修改人        
    ],
    idProperty: 'id'
});



//对应lotxlocxid表，用于手工选择分配的数据
Ext.define('StoreAllocateGrid', {
    extend: 'Ext.data.Model',
    fields: [
         {name:'id'},
         {name:'storerKey'},
         {name:'sku'},
         {name:'lot'},
         {name:'loc'},
         {name:'gid'},
         {name:'status'},
         {name:'qty',type:'float'},
         {name:'qtyallocated',type:'float'},
         {name:'qtypicked',type:'float'},
         {name:'qtyexpected'},
         {name:'qtypickinprocess'},
         {name:'pendingmovein'},
         {name:'pallet'},
         {name:'casecnt'},
         {name:'inner'},
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
         {name:'lottable20'}//批属性20
    ],
    idProperty: 'id'
});

Ext.define('Receipt', {
    extend: 'Ext.data.Model',
    fields: [
		{name:'id'},
		{name:'externReceiptkey'},            
		{name:'receiptKey'},//入库单号
		{name:'type'},//类型
		{name:'status'},//状态
		{name:'orderDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},//创建日期
		{name:'storerKey'},//货主
		{name:'storerDescr'},//货主名称
		{name:'dateStart',type:'date',dateFormat : 'Y-m-d H:i:s.u'},//预期到货日期
		{name:'dateEnd',type:'date',dateFormat : 'Y-m-d H:i:s.u'},//预期到货日期结束
		{name:'receiptgroup'},//订单组别
		{name:'poKey'},//PO号
		{name:'dock'},//收货平台
		{name:'dateReceipted',type:'date',dateFormat : 'Y-m-d H:i:s.u'},//实际到货日期
		{name:'dateReceived',type:'date',dateFormat : 'Y-m-d H:i:s.u'},//入库日期
		{name:'vendorRefence'},//供应商参考号
		{name:'vesselRefence'},//运输参考号
		{name:'otherRefence1'},//其它参考号1
		{name:'otherRefence2'},//其它参考号2
		{name:'otherRefence3'},//其它参考号3
		{name:'otherRefence4'},//其它参考号4
		{name:'udf1'},//自定义1
		{name:'udf2'},//自定义2
		{name:'udf3'},//自定义3
		{name:'udf4'},//自定义4
		{name:'udf5'},//自定义5
		{name:'vesselType'},//车型
		{name:'vesselNo'},//车牌号
		{name:'driver'},//司机
		{name:'vesselDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},//装车时间
		{name:'placeofloading'},//装车地点
		{name:'origincountry'},//原产国
		{name:'placeofdischarge'},//卸货地点
		{name:'placeofdelivery'},//交货地点 
		{name:'destination'},//目的地
		{name:'transMethod'},//运输方式
		{name:'paymentTerms'},//支付方式
		{name:'incoTerms'},//交货方式
		{name:'deliveryNotes'},//交货描述
		{name:'vendor'},//供应商
		{name:'vendorName'},//供应商名称
		{name:'vendorAddress1'},//供应商地址
		{name:'vendorContact'},//联系人
		{name:'vendorMobile'},//手机
		{name:'vendorTel'},//电话
		{name:'shipto'},//收货方
		{name:'shiptoName'},//收货方名称
		{name:'shiptoAddress1'},//收货方地址
		{name:'shiptoContact'},//收货方联系人
		{name:'shiptoMobile'},//收货方手机
		{name:'shiptoTel'},//收货方电话
		{name:'carrier'},//承运商
		{name:'carrierName'},//承运商名称
		{name:'carrierAddress1'},//承运商地址
		{name:'carrierContact'},//承运商联系人
		{name:'carrierMobile'},//承运商手机
		{name:'carrierTel'},//承运商电话
		{name:'notes'},//备注
		{name:'vendorNation'},
		{name:'vendorProvince'},
		{name:'vendorCity'},
		{name:'vendorAddress2'},
		{name:'vendorPosition'},
		{name:'vendorFax'},
		{name:'vendorEmail'},
		{name:'carrierNation'},
		{name:'carrierProvince'},
		{name:'carrierCity'},
		{name:'carrierAddress2'},
		{name:'carrierPosition'},
		{name:'carrierFax'},
		{name:'carrierEmail'},
		{name:'shiptoNation'},
		{name:'shiptoProvince'},
		{name:'shiptoCity'},
		{name:'shiptoAddress2'},
		{name:'shiptoPosition'},
		{name:'shiptoFax'},
		{name:'shiptoEmail'},
        {name:'addDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
        {name:'addWho'},
        {name:'editDate',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
        {name:'editWho'},
        {name:'descasntype'}    
	],
    idProperty: 'id'
});

//库存提取使用
Ext.define('Transaction', {
    extend: 'Ext.data.Model',
    fields: [
		{name:'id'},
		{name:'storerKey'},            
		{name:'sku'},     
		{name:'loc'},
		{name:'lot'},  
		{name:'gid'},  
		{name:'qty',type:'float'},
		{name:'qtyavail',type:'float'},
		{name:'qtyallocated',type:'float'},
		{name:'qtyonhold',type:'float'},
		{name:'lottable01',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
		{name:'lottable02',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
		{name:'lottable03',type:'date',dateFormat : 'Y-m-d H:i:s.u'},
		{name:'lottable04'},
		{name:'lottable05'},
		{name:'lottable06'},
		{name:'lottable07'},
		{name:'lottable08'},
		{name:'lottable09'},
		{name:'lottable10'},
		{name:'lottable11'},
		{name:'lottable12'},
		{name:'lottable13'},
		{name:'lottable14'},
		{name:'lottable15'},
		{name:'lottable16'},
		{name:'lottable17'},
		{name:'lottable18'},
		{name:'lottable19'},
		{name:'lottable20'},
		{name:'name'},     //sku表的字段，通过内连接获取  
		{name:'qtyavailable',type:'float'},     //表中没有，自定义字段
		{name:'status'}     //lli的状态字段
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


Ext.define('Redm.inbound.ReceiptGrid', {
    extend: 'Redm.BaseGrid',
    alias : 'widget.receiptgrid',
    loadMask: true,
    forceLayout:true,
	autoLoad:false,
    buildColumns: function(){
        this.columns = [
		    { header: "ASN编号", dataIndex: 'receiptKey', width: 110, sortable: true},
		    { header: "货主", dataIndex: 'storerKey', width: 80, sortable: true},
		    { header: "PO编号", dataIndex: 'poKey', width: 80, sortable: true},
		    { header: "ASN类型", dataIndex: 'descasntype', width: 80, sortable: true},
		    { header: "ASN状态", dataIndex: 'status', width: 120, sortable: true,
                    renderer:this.rendererStatusFunc
            },
		    { header: "预期到货日期", dataIndex: 'dateStart', width: 120, sortable: true,editor:{xtype:'datefield',format:'Y-m-d H:i'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i')},
		    { header: "入库日期", dataIndex: 'dateReceived', width: 150, sortable: true,editor:{xtype:'datefield',format:'Y-m-d H:i'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i')},
		    { header: "供应商", dataIndex: 'vendor', width: 80, sortable: true},
		    { header: "目的地", dataIndex: 'destination', width: 110, sortable: true},
		    { header: "承运商", dataIndex: 'carrier', width: 80, sortable: true},
		    { header: "供应商参考号", dataIndex: 'vendorRefence', width: 110, sortable: true},
		    { header: "运输参考号", dataIndex: 'vesselRefence', width: 110, sortable: true},
			{ header: "创建时间", dataIndex: 'addDate', width: 140, sortable: true,renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s'),hidden:true},
			{ header: "创建人", dataIndex: 'addWho', width: 140, sortable: true,hidden:true}            
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
    	this.buildStore(basePath+'/inbound/doQueryReceipt.action','Receipt',20); //加载时获取数据
        this.callParent(arguments);
    },

	//ASN类型解析函数
    rendererTypeFunc:function(value)
    {
        var retValue;
        if(value=='0') retValue='正常';
        else  retValue=value;
        return retValue;
    }, 
        
	//ASN状态解析函数
    rendererStatusFunc:function(value)
    {
        var retValue;
        if(value=='0') retValue='新建';
        else if(value=='1') retValue='部分收货';
        else if(value=='2') retValue='全部收货';
        else if(value=='3') retValue='部分收货上架中';
        else if(value=='4') retValue='全部收货上架中';
        else if(value=='5') retValue='部分收货部分上架';
        else if(value=='6') retValue='部分收货全部上架';
        else if(value=='7') retValue='全部收货部分上架';
        else if(value=='8') retValue='全部收货全部上架';
        else if(value=='9') retValue='关闭';
        else  retValue=value;
        return retValue;
    }
});


//按照LotxLocxId提取库存到SO的Grid
Ext.define('Redm.inventory.LliGrid', {
    extend: 'Redm.BaseGrid',
    alias : 'widget.lligrid',
    loadMask: true,
    forceLayout:true,
    autoLoad:false,
    selModel: Ext.create('Ext.selection.CheckboxModel'),    
    buildColumns: function(){
        this.columns = [
		    { header: "SKU", dataIndex: 'sku', width: 140, sortable: true},
		    { header: "库位", dataIndex: 'loc', width: 70, sortable: true},
     		{ header: "ID", dataIndex: 'id', width: 100, sortable: true,hidden:true},
     		{ header: "货主", dataIndex: 'storerKey', width: 50, sortable: true},
		    { header: "数量", dataIndex: 'qty', width: 80, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    { header: "可用数量", dataIndex: 'qtyavail', width: 80, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    { header: "已分配数量", dataIndex: 'qtyallocated', width: 80, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
    		{ header: "托盘号", dataIndex: 'lottable05', width: 80, sortable: true},
		    { header: "成品卷号", dataIndex: 'lottable06', width: 100, sortable: true},
		    { header: "等级", dataIndex: 'lottable07', width: 80, sortable: true},
		    { header: "外观代码", dataIndex: 'lottable08', width: 60, sortable: true},
    		{ header: "表面处理", dataIndex: 'lottable09', width: 100, sortable: true},
//		    { header: "名称", dataIndex: 'name', width: 100, sortable: true},            
//		    { header: "批次", dataIndex: 'lot', width: 100, sortable: true},
//		    { header: "ID", dataIndex: 'gid', width: 100, sortable: true},
		    { header: "状态", dataIndex: 'status', width: 100, sortable: true,
                    renderer:this.rendererStatusFunc
            },
            { header: "收货日期", dataIndex: 'lottable01', width: 130, sortable: false,editor:{xtype:'datefield',format:'Y-m-d H:i:s'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
	        { header: "生产日期", dataIndex: 'lottable02', width: 130, sortable: false,editor:{xtype:'datefield',format:'Y-m-d H:i:s'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
	        { header: "失效日期", dataIndex: 'lottable03', width: 130, sortable: false,editor:{xtype:'datefield',format:'Y-m-d H:i:s'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
		    { header: "生产批号", dataIndex: 'lottable04', width: 100, sortable: true},
		    { header: "规格", dataIndex: 'lottable10', width: 100, sortable: true},
		    { header: "包装形式", dataIndex: 'lottable11', width: 100, sortable: true},
		    { header: "ASN号", dataIndex: 'lottable12', width: 100, sortable: true},
            { header: "反射率", dataIndex: 'lottable13', width: 100, sortable: true},
    		{ header: "极差", dataIndex: 'lottable14', width: 100, sortable: true},
		    { header: "批重量", dataIndex: 'lottable15', width: 100, sortable: true},
		    { header: swmslot16, dataIndex: 'lottable16', width: 100, sortable: true},
		    { header: swmslot17, dataIndex: 'lottable17', width: 100, sortable: true,hidden:true},
            { header: swmslot18, dataIndex: 'lottable18', width: 100, sortable: true,hidden:true},
    		{ header: swmslot19, dataIndex: 'lottable19', width: 100, sortable: true,hidden:true},
		    { header: swmslot20, dataIndex: 'lottable20', width: 100, sortable: true,hidden:true}
		];
		return true;
    },

	buildDockedItems: function(){
		this.dockedItems = [{
	        xtype: 'pagingtoolbar',
	        store: this.store,  
	        dock: 'bottom',
	        displayInfo: true
	    }];
	},
    initComponent: function(){
    	var me = this;
    	this.buildStore(basePath+'/outbound/doQueryTransactionLLI.action','Transaction',20);
        this.callParent(arguments);
    },
//LLI status解析函数
    rendererStatusFunc:function(value)
        {
            var retValue;
            if(value=='0') retValue='正常';
            else  retValue='冻结';
            return retValue;
        }  
});

Ext.define('Redm.outbound.SoGrid', {
    extend: 'Redm.BaseGrid',
    alias : 'widget.sogrid',
    loadMask: true,
    forceLayout:true,
    selModel: Ext.create('Ext.selection.CheckboxModel'),
    buildColumns: function(){
        this.columns = [
		    { header: "SO单号", dataIndex: 'orderKey',width: 100, sortable: true},
		    { header: "货主", dataIndex: 'storerKey', width: 110, sortable: true},
		    { header: "SO类型", dataIndex: 'descsotype', width: 80, sortable: true},
		    { header: "SO状态", dataIndex: 'status', width: 110, sortable: true,
                    renderer:this.rendererStatusFunc
            },   
   		    { header: "处理状态", dataIndex: 'opstatus', width: 60, sortable: true,
                    renderer:this.opStatusFunc
            },               
		    { header: "预期发货日期", dataIndex: 'orderDate', width: 120, sortable: true,renderer : Ext.util.Format.dateRenderer('Y-m-d H:i')},
		    { header: "客户订单号", dataIndex: 'orderNumber', width: 110, sortable: true},
		    { header: "客户公司", dataIndex: 'consigneeCompany', width: 200, sortable: true},
//		    { header: "运输到", dataIndex: '', width: 150, sortable: true},
//		    { header: "承运人", dataIndex: '', width: 110, sortable: true},
		    { header: "承运商", dataIndex: 'carrierKey', width: 110, sortable: true},
		    { header: "采购商PO号", dataIndex: 'buyerpo', width: 110, sortable: true}, 
		    { header: "承运商参考号", dataIndex: 'carrierReference', width: 110, sortable: true},
		    { header: "仓库参考号", dataIndex: 'warehouseReference', width: 110, sortable: true},
			{ header: "创建时间", dataIndex: 'addDate', width: 140, sortable: true,renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s'),hidden:true},
			{ header: "创建人", dataIndex: 'addWho', width: 140, sortable: true,hidden:true},
			{ header: "其他参考号3", dataIndex: 'otherReference3', width: 140, sortable: true,hidden:true},
			{ header: "其他参考号4", dataIndex: 'otherReference4', width: 140, sortable: true,hidden:true},
			
			{ header: "承运人名称", dataIndex: 'carrierCompany', width: 140, sortable: true,hidden:true},
			{ header: "承运人国家", dataIndex: 'carrierNation', width: 140, sortable: true,hidden:true},
			{ header: "承运人省份", dataIndex: 'carrierProvince', width: 140, sortable: true,hidden:true},
			{ header: "承运人城市", dataIndex: 'carrierCity', width: 140, sortable: true,hidden:true},
			{ header: "承运人地区", dataIndex: 'carrierCounty', width: 140, sortable: true,hidden:true},
			{ header: "承运人地址", dataIndex: 'carrierAddress', width: 140, sortable: true,hidden:true},
			{ header: "承运人联系人", dataIndex: 'carrierContact', width: 140, sortable: true,hidden:true},
			{ header: "承运人手机", dataIndex: 'carrierMobile', width: 140, sortable: true,hidden:true},
			{ header: "承运人电话", dataIndex: 'carrierTel', width: 140, sortable: true,hidden:true},		
			{ header: "承运人职务", dataIndex: 'carrierPosition', width: 140, sortable: true,hidden:true},
			{ header: "承运人传真", dataIndex: 'carrierFax', width: 140, sortable: true,hidden:true},
			{ header: "承运人邮箱", dataIndex: 'carrierEmail', width: 140, sortable: true,hidden:true},
			{ header: "发货员", dataIndex: 'shipper', width: 140, sortable: true,hidden:true},
			{ header: "复核员", dataIndex: 'checker', width: 140, sortable: true,hidden:true},
//			{ header: "制单员", dataIndex: 'createWho', width: 140, sortable: true,hidden:true},
			{ header: "externorderkey", dataIndex: 'externorderkey', width: 140, sortable: true,hidden:true}
		];
		return true;
    },

	buildDockedItems: function(){
		var me = this;
		this.dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                items: [
                    {
                        iconCls: 'icon-create',
                        text: '创建',
                        scope: this,
                        handler: this.onCreate
                    },
                    '-',
                    {
                        iconCls: 'icon-delete',
                        itemId: 'delete',
                        text: '删除',
                        scope: this,
                        handler: this.onDelete
                    },
                    '-',
                    {
                        iconCls: 'icon-search',
                        text: '查询',
                        handler: me.onSelect,
                        scope: this
                    },
                    '-',
                    {
                        iconCls: 'icon-reset',
                        text: '重置',
                        handler: this.onReset,
                        scope: this
                    },
                    '-',
                    {
                        iconCls: 'icon-upload',
                        text: '导入',
                        handler: this.onImport,    
                        scope: this
                    },
                    '-',
                    {
                        iconCls: 'icon-lookat',
                        text: '发货',
                        id:'orderShipFstBtn', 
                        handler: this.onMultiShip,    
                        scope: this
                    },
                    '-',
                    ' ',
                    ' ',
                    ' ',
                    ' ',
                    '-',
                    {
                        iconCls: 'icon-upload',
                        text: '<font color=purple>销售出库</font>',
                        handler: this.onGetFromOtherDb,    
                        scope: this
                    },
//                    '-',
//                    {
//                        iconCls: 'icon-upload',
//                        text: '委外出库',
//                        handler: this.onGetSndFromOtherDb,    
//                        scope: this
//                    },
                    '-',
                    ' ',
                    ' ',
                    ' ',
                    ' ',
                    '-',
                    {
                        iconCls: 'icon-upload',
                        text: '<font color=red>涂布小分切</font>',
                        handler: this.onSpreedOutboundToWmsAction,    
                        scope: this
                    }
                    //导出K3待测试;
//                    ,
//                    '-',
//                    ' ',
//                    ' ',
//                    ' ',
//                    ' ',
//                    '-',
//                   {
//                    iconCls: 'icon-upload',
//                    text: '<font color=purple>导出K3数据</font>',
//                    scope: this,
//                    handler: me.onPrintExcelWithK3Data
//                	}
                 ]
            },
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
		this.buildStore(basePath + '/outbound/doQueryOrdersInfo.action','StoreSoGrid',20);
    	this.on('itemdblclick',function(grid,record){    //鼠标双击就会跳到另外一个页面
    		var father = grid.ownerCt.ownerCt.ownerCt;   //
    		father.setActiveTab(1);                           //tab1设置为当前激活的页面
       		father.pt2pn2tabpanel.setActiveTab(0);              //设置为grid界面
    		father.pt2pn1f1form.getForm().loadRecord(record);     
            father.pt2pn1f2form.getForm().loadRecord(record);
            father.pt2pn1f3form.getForm().loadRecord(record);
            father.pt2pn1f4form.getForm().loadRecord(record);
            father.pt2pn1f5form.getForm().loadRecord(record);
            father.pt2pn1f6form.getForm().loadRecord(record);
            father.pt2pn1f9form.getForm().loadRecord(record);
    		father.sodetailgrid.getStore().load();
            father.undetailgrid.getStore().load();
            father.unfinishedpickdetailgrid.getStore().load();
            father.pt2pn2f7grid.getStore().load();
            
            var status=father.pt2pn1f1form.getForm().findField('status').getValue();
            if(status!='0')
            {   //load 时判断如果状态不是0，则只读状态
                father.onSetOrdersReadOnly(true); 
                //关键字段也设置只读
                father.onSetOrdersKeyReadOnly(true); 
            }
            else
            {    //主表除关键字段外，取消只读
                father.onSetOrdersReadOnly(false); 
                //关键字段也设置只读
                father.onSetOrdersKeyReadOnly(true); 
            } 
            
            if(status=='0'||status=='1'||status=='2')
            {   //load 时判断如果状态是0，1，或2可以编辑
                father.onSetActualshipdateReadOnly(false);
            }
            else
            {    //其他情况，不能编辑
                father.onSetActualshipdateReadOnly(true);
            } 
            
            //计算总数量
			var values = father.pt2pn1f1form.getForm().getValues();
			var orderKey = values.orderKey;
			var storerKey = values.storerKey;
			Ext.Ajax.request({
                url: basePath + '/outbound/doQueryOrdersDetailSum.action',
                params: {
                    orderKey:orderKey,
                    storerKey:storerKey
                },
                success: function(response){
                    var text = Ext.decode(response.responseText);
                    var success = text.success;
                    if(0!= text.json.data.length){
                        var qtyorderedsum=text.json.data[0].qtyorderedsum;
                        var qtyshippedsum=text.json.data[0].qtyshippedsum;
                        var var1sum=text.json.data1[0].var1sum;
                        var var2sum=text.json.data1[0].var2sum;
                        var var3sum = text.json.data2[0].var1sum;
                        var var4sum=text.json.data2[0].var2sum;
                        if(null==qtyorderedsum || ""==qtyorderedsum){
                            qtyorderedsum=0;
                        }
                        if(null==qtyshippedsum || ""==qtyshippedsum){
                            qtyshippedsum=0;
                        }
                        if(null==var1sum || ""==var1sum){
                            var1sum=0;
                        }
                        if(null==var2sum || ""==var2sum){
                            var2sum=0;
                        }
                        if(null==var3sum || ""==var3sum){
                            var3sum=0;
                        }
                        if(null==var4sum || ""==var4sum){
                            var4sum=0;
                        }         
                        var ortotalHtml = '<b><font color=green>'+Ext.util.Format.number(qtyorderedsum,'0,000')+'</font></b>';
                        qtyOrderedSum.setText(ortotalHtml);
                        
                        var shtotalHtml = '<b><font color=green>'+Ext.util.Format.number(qtyshippedsum,'0,000')+'</font></b>';
                        qtyShippedSum.setText(shtotalHtml);
                        
                        var var1sumHtml = '<b><font color=green>'+Ext.util.Format.number(var1sum,'0,000')+'</font></b>';
                        qtyAllocatedQtySum.update(var1sumHtml);
                            
                        var var2sumHtml = '<b><font color=green>'+Ext.util.Format.number(var2sum,'0,000')+'</font></b>';
                        qtyAllocatedAreaSum.update(var2sumHtml);
                            
                        var var3sumHtml = '<b><font color=green>'+Ext.util.Format.number(var3sum,'0,000')+'</font></b>';
                        qtyShipOrderedQtySum.update(var3sumHtml);
                            
                        var var4sumHtml = '<b><font color=green>'+Ext.util.Format.number(var4sum,'0,000')+'</font></b>';
                        qtyShipOrderedAreaSum.update(var4sumHtml);
                    }
                }
			}); 
    	},this);
        this.callParent(arguments);
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
            else if(value=='2') retValue='扣账处理完成';
            else if(value=='5') retValue='上传失败';
            else if(value=='9') retValue='上传完成';
            else  retValue='未上传';
            return retValue;
        }, 
        
    //第一个tab页面查询按钮
    onSelect: function(){
    	var father = this.ownerCt.ownerCt;
    	if(!(father.pt1topform.getForm().isValid()))
    	{
		    MessageBox.error('操作提示','请输入必填项！');
		    return;
		}
    	this.getStore().load();
    },

    //第一个tab页面重置按钮，清空查询条件
    onReset: function(){
    	var father = this.ownerCt.ownerCt;
    	father.pt1topform.getForm().reset();
    },
    
    //创建按钮，跳转到第二个tab页面，并清空相关form
    onCreate: function(){
		var father = this.ownerCt.ownerCt;
        //跳转语句需要在这里执行
		father.setActiveTab(1);
        //执行father的onCreate事件
        father.onCreateSo();
	},
   
    //第一个tab页面删除按钮，删除主表选中记录和明细表相关记录
	onDelete: function(){
		var me = this;
		var records = this.getSelectionModel().getSelection(); 
		if(records == ""){
			MessageBox.error('错误提示','请选择操作的数据！');
			return;
		}
		var data = records[0].getData();
        
        Ext.MessageBox.confirm('询问提示', '确定要删除吗？', 
            function(btn){
                if(btn == 'yes'){    
                    Ext.Ajax.request({
                        url: basePath + '/outbound/doDeleteOrders.action',
                        params: {
                            orderKey: data.orderKey
                        },
                        success: function(response){
                            var text = Ext.decode(response.responseText);
                            var success = text.success;
                            MessageBox.show(success, text.json.msg);
                            if(success==true)
                            {
                                me.getStore().load();   //删除成功才重新加载grid
                            }
                        }
                    });
                }
            }
        );
	},

    //POdetail grid面板上的导入按钮
	onImport: function(){
		this.winItems = this.createForm();
		this.winConfig = {
			height: 110,
			width: 400,
			maximizable: false,
			resizable: false,
			title: '发货单信息导入',
			items: this.winItems,
			buttons: this.createButtons()
		};
		this.showWindow();
	},
	
    //导出K3数据
	onPrintExcelWithK3Data: function(){
	 	var father = this.ownerCt.ownerCt;
   		var me = this;
        var fTypeValue='F001';  //表示产品出库
		var orderNumber=father.pt1topform.getForm().findField('orderNumber').getValue();
    	if(orderNumber == ""){
    		MessageBox.error('错误提示','请选择操作的数据！');
    		return;
    	}
    	Ext.Ajax.request({
		    url: basePath + '/outbound/doOutboundToWmsWithExcelAction.action',
		    params: {
		        orderNumber: orderNumber,
		        fType: fTypeValue
		    },
		    success: function(response){
		        var text = Ext.decode(response.responseText);
		        var success = text.success;
//		        console.log(text.json.msg);
//		        console.log(basePath+text.json.path);
		        if(text.json.msg='无明细表记录!'){
		        	MessageBox.error("错误提示",'无明细表记录!');
		        }
		       	else if(text.json.msg='无此记录!'){
		        	MessageBox.error("错误提示",'无此记录!');
		        }
		      	else if(text.json.msg='SO获取找不到明细记录!'){
		        	MessageBox.error("错误提示",'SO获取找不到明细记录!');
		        }
		       	else if(text.json.msg='SO获取找不到单号!'){
		        	MessageBox.error("错误提示",'SO获取找不到单号!');
		        }
		      	else if(text.json.msg='已获取，无须重复操作！'){
		        	MessageBox.error("错误提示",'已获取，无须重复操作！');
		        }
		        else if(text.json.msg='js'){
//		        	console.log(text.json.path);
		        	window.location.href = basePath+text.json.path
		        }
		    }
		});
		//导出excel格式的报表
//		window.location.href = basePath+'/outbound/doOutboundToWmsWithExcelAction.action?string='+orderNumber+","+fTypeValue;
    },
    //从其他数据库获取orders主表明细表信息
	onGetFromOtherDb: function(){
        var father = this.ownerCt.ownerCt;
   		var me = this;
        var fTypeValue='F001';  //表示产品出库

//		var ='SSI140402393';
		var orderNumber=father.pt1topform.getForm().findField('orderNumber').getValue();
        if(''!=orderNumber)
        {
            var mask = new Ext.LoadMask(me.getEl(), { 
                msg : 'please wait...' 
			});
			mask.show();           
            Ext.Ajax.request({
                url: basePath + '/outbound/doGetSoFromOtherDb.action',
                params: {
                    orderNumber: orderNumber,
                    fType:fTypeValue
                },
                success: function(response){
                    var text = Ext.decode(response.responseText);
                    var success = text.success;
                    mask.hide();                    
                    MessageBox.show(success, text.json.msg);
                    if(success==true)
                    {
                        me.getStore().load();
                    }
                },
				timeout: 100000000
            });
        }
        else
        {
            MessageBox.show(false, '请先输入客户订单号！');
        }        
	},    
	
	   //涂布出库
	onSpreedOutboundToWmsAction: function(){
        var father = this.ownerCt.ownerCt;
   		var me = this;
        var fTypeValue='F001';  //表示产品出库

//		var ='SSI140402393';
		var orderNumber=father.pt1topform.getForm().findField('orderNumber').getValue();
        if(''!=orderNumber)
        {
            var mask = new Ext.LoadMask(me.getEl(), { 
                msg : 'please wait...' 
			});
			mask.show();           
            Ext.Ajax.request({
                url: basePath + '/outbound/doSpreedOutboundToWmsAction.action',
                params: {
                    orderNumber: orderNumber,
                    fType:fTypeValue
                },
                success: function(response){
                    var text = Ext.decode(response.responseText);
                    var success = text.success;
                    mask.hide();                    
                    MessageBox.show(success, text.json.msg);
                    if(success==true)
                    {
                        me.getStore().load();
                    }
                },
				timeout: 100000000
            });
        }
        else
        {
            MessageBox.show(false, '请先输入客户订单号！');
        }        
	},    
	
    //其他出库
	onGetSndFromOtherDb: function(){
        var father = this.ownerCt.ownerCt;
   		var me = this;
        var fTypeValue='F002';  //表示委外出库

//		var otherRefence1='SSI140402393';
		var orderNumber=father.pt1topform.getForm().findField('orderNumber').getValue();
        if(''!=orderNumber)
        {
            var mask = new Ext.LoadMask(me.getEl(), { 
                msg : 'please wait...' 
				});
				mask.show();          
            Ext.Ajax.request({
                url: basePath + '/outbound/doGetSoFromOtherDb.action',
                params: {
                    orderNumber:orderNumber,
                    fType:fTypeValue
                },
                success: function(response){
                    var text = Ext.decode(response.responseText);
                    var success = text.success;
                    mask.hide();                    
                    MessageBox.show(success, text.json.msg);
                    if(success==true)
                    {
                        me.getStore().load();
                    }
                },
				timeout: 100000000
            });
        }
        else
        {
            MessageBox.show(false, '请先输入客户订单号！');
        }        
	}, 
    
    //创建导入面板对话框
	createForm: function(){
		var form = Ext.create('Ext.form.Panel', {
	        autoHeight: true,
//	        bodyPadding: '1 10 1 1',
	        width: 400,
	        bodyPadding: '10 10 0',
	        defaults: {
	            anchor: '100%',
	            allowBlank: false,
	            msgTarget: 'side',
	            labelWidth: 60
	        },
	        items: [
                {
                    xtype: 'filefield',
                    id: 'filedata',
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
	    return form;
	},

    //导入面板上的按钮
	createButtons: function(){
		var buttons = [
            {
                text: '保存',
                scope: this,
                iconCls: 'icon-save',
                handler: this.doSaveImportData
            },
            {
                text: '关闭',
                scope: this,
                iconCls: 'icon-cancel',
                handler: this.closeWindow
            }
        ];
		return buttons;
	},

    doSaveImportData: function(){
		var me = this;
		var form = this.winItems.getForm();
        if (form.isValid()) {
            form.submit({
            	url: basePath + '/outbound/importSoData.action',
            	waitMsg: '正在上传数据，请稍候……',
                success: function(form, action) {
                	if(action.result.success){
	            	   	me.closeWindow();
	                   MessageBox.show(true, action.result.msg,function(){
	                   		me.getStore().load();
	                   });
                	}
                },
                failure: function(form, action) {
                	me.closeWindow();
                    MessageBox.show(false, action.result.msg);
                }
            });
        }
	},

    //发货按钮，支持多个订单发货
    onMultiShip: function(){
		var me = this;
		var records = this.getSelectionModel().getSelection();

        //发货未结束前禁用收货按钮
        Ext.getCmp('orderShipFstBtn').disable();
        Ext.getCmp('orderShipBtn').disable();        

		if(records == ""){
			MessageBox.error("错误提示","请选择要操作的数据！");
            //返回前使能收货按钮
            Ext.getCmp('orderShipFstBtn').enable();
            Ext.getCmp('orderShipBtn').enable();                
		 	return;
		}else{
    		Ext.MessageBox.confirm('询问提示', '确定要发货吗？', 
    				function(btn){
    					if(btn == 'yes'){	
    					var ids = []; 
						Ext.Array.each(records, function(name, index, countriesItSelf) {
							ids.push(name.getData().id);
						});
						  //先查询是否有该orderKey对应的记录
				    	Ext.Ajax.request({
						    url: basePath + '/outbound/doValidateMultiOrdersPickedQty.action',
						    params: {
						          ids: ids
						    },
						    success: function(response){
						        var text = Ext.decode(response.responseText);
						        var success = text.success;
				                
				                //用字符串表示查询结果 0，表示无记录，1，表示当前数量小于发货数量
				                //如果有记录，需要确认。如果继续，则删除现有的记录，并重新生成。否则退出不做操作
				                if(text.json.msg=='1'){   
				                     Ext.MessageBox.confirm('询问提示', '当前拣货数量小于分配数量，确定要发货吗', 
				                        function(btn){
				                            if(btn == 'yes'){    
				                              var mask = new Ext.LoadMask(me.getEl(), { 
												    msg : 'please wait...' 
											        });
													mask.show(); 
											        Ext.Ajax.request({
											            url: basePath + '/outbound/doMultiOrderShip.action',
											            params: {
											                ids: ids
											            },
											            success: function(response){
											                var text = Ext.decode(response.responseText);
											                var success = text.success;
															mask.hide();
											                MessageBox.show(success, text.json.msg);
											                me.getStore().load();   //可能部分执行成功，无论返回值是否true，都要更新grid状态，
											            },
														timeout: 100000000
											        });  		
				                                //发货完成后使能收货按钮
											    Ext.getCmp('orderShipFstBtn').enable();
												Ext.getCmp('orderShipBtn').enable();    
								            }else{
								              	 //发货完成后使能收货按钮
											    Ext.getCmp('orderShipFstBtn').enable();
											    Ext.getCmp('orderShipBtn').enable();    
								            }
				                        }
				                    ); 
				                }else{
				                	var mask = new Ext.LoadMask(me.getEl(), { 
								    msg : 'please wait...' 
							        });
									mask.show(); 
							        Ext.Ajax.request({
							            url: basePath + '/outbound/doMultiOrderShip.action',
							            params: {
							                ids: ids
							            },
							            success: function(response){
							                var text = Ext.decode(response.responseText);
							                var success = text.success;
											mask.hide();
							                MessageBox.show(success, text.json.msg);
							                me.getStore().load();   //可能部分执行成功，无论返回值是否true，都要更新grid状态，
							            },
										timeout: 100000000
							        }); 
							        //发货完成后使能收货按钮
							        Ext.getCmp('orderShipFstBtn').enable();
							        Ext.getCmp('orderShipBtn').enable();    
				                }
						    }
				    	})}else{
				     				Ext.getCmp('orderShipFstBtn').enable();
									Ext.getCmp('orderShipBtn').enable();    
				    	}
    				}
			); 
    	
		} 

	}   
});

//GRID面板
Ext.define('Redm.outbound.DetailGrid2',{
    extend: 'Redm.BaseGrid',
    alias : 'widget.detailgrid2',
    loadMask: true,
    forceLayout:true,
    dockedItems: [],
    buildColumns: function(){
        this.columns = [
		    { header: "商品", dataIndex: 'sku', width: 250, sortable: true}
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
        this.buildStore(basePath + '/outbound/doQueryOrdersDetailInfoOnlySku.action','StoreSoDetailGrid',20);
        this.callParent(arguments);
    }
   
});


//so detail grid
Ext.define('Redm.outbound.DetailGrid',{
    extend: 'Redm.BaseGrid',
    alias : 'widget.detailgrid',
    autoLoad: false,   //启动不自动加载数据
    selModel: Ext.create('Ext.selection.CheckboxModel'),
    buildColumns: function(){
        this.columns = [
//		    { header: "SO单号", dataIndex: 'orderKey',width: 90, sortable: true},
//		    { header: "货主", dataIndex: 'storerKey', width: 110, sortable: true},
		    { header: "行号", dataIndex: 'lineNumber', width: 60, sortable: true},
		    { header: "商品", dataIndex: 'sku', width: 100, sortable: true},
		    { header: '规格',dataIndex: 'lottable10',width: 110,sortable: true},
		    { header: "状态", dataIndex: 'status', width: 100, sortable: true,
                    renderer:this.rendererDetailStatusFunc            
            },
            { header: '托盘号',dataIndex: 'lottable05',width: 110,sortable: true},
            { header: '成品卷号',dataIndex: 'lottable06',width: 110,sortable: true},
            { header: '生产批号',dataIndex: 'lottable04',width: 110,sortable: true},
            { header: '等级',dataIndex: 'lottable07',width: 110,sortable: true},
            { header: '批重量',dataIndex: 'lottable15',width: 110,sortable: true},
            { header: '面积',dataIndex: 'udf1',width: 110,sortable: true},
            { header: '表面处理',dataIndex: 'lottable09',width: 110,sortable: true},
//		    { header: "别名", dataIndex: 'altsku', width: 100, sortable: true},
		    { header: "中文名称", dataIndex: 'name', width: 100, sortable: true},
		    { header: "英文名称", dataIndex: 'descr', width: 120, sortable: true,hidden:true},
		    { header: "周转策略", dataIndex: 'rotationStrategykey', width: 80, sortable: true},
		    { header: "预分配策略", dataIndex: 'preAllocationStrategyKey', width: 80, sortable: true},
		    { header: "分配策略", dataIndex: 'allocationStrategyKey', width: 80, sortable: true},
		    { header: "包装", dataIndex: 'packKey', width: 130, sortable: true},
		    { header: "单位", dataIndex: 'uom', width: 60, sortable: true},
		    { header: "订单数量", dataIndex: 'qtyOrdered', width: 80, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    { header: "订单单位数量", dataIndex: 'qtyUomOrdered', width: 80, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    { header: "预分配数", dataIndex: 'qtyPreallocated', width: 80, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    { header: "预分配单位数", dataIndex: 'qtyUomPreallocated', width: 80, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    { header: "分配数量", dataIndex: 'qtyAllocated', width: 80, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    { header: "分配单位数量", dataIndex: 'qtyUomAllocated', width: 80, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    { header: "拣货数量", dataIndex: 'qtyPicked', width: 80, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    { header: "拣货单位数量", dataIndex: 'qtyUomPicked', width: 80, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    { header: "发运数量", dataIndex: 'qtyShipped', width: 80, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    { header: "发运单位数量", dataIndex: 'qtyUomShipped', width: 80, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    { header: '收货日期',dataIndex: 'lottable01',width: 130,sortable: true,editor:{xtype:'datefield',format:'Y-m-d H:i:s'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},//入库日期
		    { header: '生产日期',dataIndex: 'lottable02',width: 130,sortable: true,editor:{xtype:'datefield',format:'Y-m-d H:i:s'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},//生产日期
		    { header: '失效日期',dataIndex: 'lottable03',width: 130,sortable: true,editor:{xtype:'datefield',format:'Y-m-d H:i:s'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},//失效日期
		    { header: '外观代码',dataIndex: 'lottable08',width: 110,sortable: true},
		    { header: '包装形式',dataIndex: 'lottable11',width: 110,sortable: true},
		    { header: 'ASN号',dataIndex: 'lottable12',width: 110,sortable: true},
		    { header: '反射率',dataIndex: 'lottable13',width: 110,sortable: true},
		    { header: '极差',dataIndex: 'lottable14',width: 110,sortable: true},
		    { header: swmslot16,dataIndex: 'lottable16',width: 110,sortable: true},
		    { header: swmslot17,dataIndex: 'lottable17',width: 110,sortable: true,hidden:true},
		    { header: swmslot18,dataIndex: 'lottable18',width: 110,sortable: true,hidden:true},
		    { header: swmslot19,dataIndex: 'lottable19',width: 110,sortable: true,hidden:true},
		    { header: swmslot20,dataIndex: 'lottable20',width: 110,sortable: true,hidden:true},
		    { header: '结算幅宽',dataIndex: 'udf2',width: 110,sortable: true},
		    { header: '结算面积',dataIndex: 'udf3',width: 110,sortable: true},
		    { header: '自定义4',dataIndex: 'udf4',width: 110,sortable: true},
		    { header: '自定义5',dataIndex: 'udf5',width: 110,sortable: true},
		    { header: "id", dataIndex: 'id',hidden: true},
			{ header: "创建时间", dataIndex: 'addDate', width: 140, sortable: true,renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s'),hidden:true},
			{ header: "创建人", dataIndex: 'addWho', width: 140, sortable: true,hidden:true}
		];
		return true;
    },
	buildDockedItems: function(){
		var me = this;
		qtyOrderedPageSum = Ext.create('widget.tbtext',{
			text: '0',
			format: '0,000'
		});
		qtyShippedPageSum = Ext.create('widget.tbtext',{
			text: '0',
			format: '0,000'
		});
		qtyOrderedSum = Ext.create('widget.tbtext',{
			text: '0',
			format: '0,000'
		});
		qtyShippedSum = Ext.create('widget.tbtext',{
			text: '0',
			format: '0,000'
		});
		
		qtyAllocatedQtySum = Ext.create('widget.tbtext',{
			text: '0',
			format: '0,000'
		});
		qtyAllocatedAreaSum = Ext.create('widget.tbtext',{
			text: '0',
			format: '0,000'
		});
		
		qtyShipOrderedQtySum = Ext.create('widget.tbtext',{
			text: '0',
			format: '0,000'
		});
		qtyShipOrderedAreaSum = Ext.create('widget.tbtext',{
			text: '0',
			format: '0,000'
		});
		this.dockedItems = [
            {
                xtype: 'pagingtoolbar',
                store: this.store, 
                dock: 'bottom',
                displayInfo: true,
				items:['-',{
						xtype: 'label',
						forId: 'myFieldId1',
						text: '页订货：'
					},qtyOrderedPageSum,{
						xtype: 'label',
						forId: 'myFieldId2',
						text: '，页发货：'
					},qtyShippedPageSum,
					'-',{
						xtype: 'label',
						forId: 'myFieldId3',
						text: '总订货：'
					},qtyOrderedSum,{
						xtype: 'label',
						forId: 'myFieldId4',
						text: '，总发货：'
					},qtyShippedSum,{
						xtype: 'label',
						forId: 'myFieldId4',
						text: '，总分重：'
					},qtyAllocatedQtySum,{
						xtype: 'label',
						forId: 'myFieldId4',
						text: '，总分面积：'
					},qtyAllocatedAreaSum,{
						xtype: 'label',
						forId: 'myFieldId4',
						text: '，总发重：'
					},qtyShipOrderedQtySum,{
						xtype: 'label',
						forId: 'myFieldId4',
						text: '，总发面积：'
					},qtyShipOrderedAreaSum
				]
            }
        ];
	},
    initComponent: function(){
   		this.buildStore(basePath + '/outbound/doQueryOrdersDetailInfo.action','StoreSoDetailGrid',20);
    	this.on('itemdblclick',function(grid,record){   //有问题，暂未解决
           	var me = this;
    		var father = grid.ownerCt.ownerCt.ownerCt.ownerCt.ownerCt;
    		father.pt2pn2tabpanel.setActiveTab(1);
    		father.sodetailform.getForm().loadRecord(record);
            father.pt2pn2f3grid.getStore().load();       //拣货列表也要根据查询条件加载
            
            var status=father.sodetailform.getForm().findField('status').getValue();
            if(status!='0')
            {   //load 时判断如果状态不是0，则只读状态
                //设置明细表字段只读
                father.onSetDetailReadOnly(true);       
                //关键字段也设置只读
                father.onSetDetailKeyReadOnly(true); 
            }
            else
            {   //因设置后状态一直不变，在加载新建的记录时，需要重新设置取消只读
                //另外，新建时主表或者添加明细记录，需要设置可以编辑，分配完成需要设置只读
                father.onSetDetailReadOnly(false);                
                //关键字段也设置只读
                father.onSetDetailKeyReadOnly(true); 
            }
    	},this);
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

//unfinished detail grid
Ext.define('Redm.outbound.UnfinishedDetailGrid',{
    extend: 'Redm.BaseGrid',
    alias : 'widget.unfinisheddetailgrid',
    autoLoad: false,   //启动不自动加载数据
    //selModel: Ext.create('Ext.selection.CheckboxModel'),
    buildColumns: function(){
        this.columns = [
//		    { header: "SO单号", dataIndex: 'orderKey',width: 90, sortable: true},
//		    { header: "货主", dataIndex: 'storerKey', width: 110, sortable: true},
		    { header: "行号", dataIndex: 'lineNumber', width: 60, sortable: true},
		    { header: "商品", dataIndex: 'sku', width: 100, sortable: true},
//		    { header: "别名", dataIndex: 'altsku', width: 100, sortable: true},
		    { header: "中文名称", dataIndex: 'name', width: 100, sortable: true},
		    { header: "英文名称", dataIndex: 'descr', width: 120, sortable: true},
		    { header: "状态", dataIndex: 'status', width: 100, sortable: true,
                    renderer:this.rendererDetailStatusFunc            
            },
		    { header: "周转策略", dataIndex: 'rotationStrategykey', width: 80, sortable: true},
		    { header: "预分配策略", dataIndex: 'preAllocationStrategyKey', width: 80, sortable: true},
		    { header: "分配策略", dataIndex: 'allocationStrategyKey', width: 80, sortable: true},
		    { header: "包装", dataIndex: 'packKey', width: 130, sortable: true},
		    { header: "单位", dataIndex: 'uom', width: 60, sortable: true},
		    { header: "订单数量", dataIndex: 'qtyOrdered', width: 80, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    { header: "订单单位数量", dataIndex: 'qtyUomOrdered', width: 80, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    { header: "预分配数", dataIndex: 'qtyPreallocated', width: 80, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    { header: "预分配单位数", dataIndex: 'qtyUomPreallocated', width: 80, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    { header: "分配数量", dataIndex: 'qtyAllocated', width: 80, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    { header: "分配单位数量", dataIndex: 'qtyUomAllocated', width: 80, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    { header: "拣货数量", dataIndex: 'qtyPicked', width: 80, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    { header: "拣货单位数量", dataIndex: 'qtyUomPicked', width: 80, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    { header: "发运数量", dataIndex: 'qtyShipped', width: 80, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    { header: "发运单位数量", dataIndex: 'qtyUomShipped', width: 80, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    { header: '收货日期',dataIndex: 'lottable01',width: 130,sortable: true,editor:{xtype:'datefield',format:'Y-m-d H:i:s'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},//入库日期
		    { header: '生产日期',dataIndex: 'lottable02',width: 130,sortable: true,editor:{xtype:'datefield',format:'Y-m-d H:i:s'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},//生产日期
		    { header: '失效日期',dataIndex: 'lottable03',width: 130,sortable: true,editor:{xtype:'datefield',format:'Y-m-d H:i:s'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},//失效日期
		    { header: '生产批号',dataIndex: 'lottable04',width: 110,sortable: true},
		    { header: '托盘号',dataIndex: 'lottable05',width: 110,sortable: true},
		    { header: '成品卷号',dataIndex: 'lottable06',width: 110,sortable: true},
		    { header: '等级',dataIndex: 'lottable07',width: 110,sortable: true},
		    { header: '外观代码',dataIndex: 'lottable08',width: 110,sortable: true},
		    { header: '表面处理',dataIndex: 'lottable09',width: 110,sortable: true},
		    { header: '规格',dataIndex: 'lottable10',width: 110,sortable: true},
		    { header: '包装形式',dataIndex: 'lottable11',width: 110,sortable: true},
		    { header: 'ASN号',dataIndex: 'lottable12',width: 110,sortable: true},
		    { header: '反射率',dataIndex: 'lottable13',width: 110,sortable: true},
		    { header: '极差',dataIndex: 'lottable14',width: 110,sortable: true},
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
		    { header: "id", dataIndex: 'id',hidden: true},
			{ header: "创建时间", dataIndex: 'addDate', width: 140, sortable: true,renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s'),hidden:true},
			{ header: "创建人", dataIndex: 'addWho', width: 140, sortable: true,hidden:true}
		];
		return true;
    },
	buildDockedItems: function(){
/*		var me = this;
		qtyOrderedPageSumUn = Ext.create('widget.tbtext',{
			text: '0',
			format: '0,000'
		});
		qtyShippedPageSumUn = Ext.create('widget.tbtext',{
			text: '0',
			format: '0,000'
		});
		qtyOrderedSumUn = Ext.create('widget.tbtext',{
			text: '0',
			format: '0,000'
		});
		qtyShippedSumUn = Ext.create('widget.tbtext',{
			text: '0',
			format: '0,000'
		});*/
		this.dockedItems = [
            {
                xtype: 'pagingtoolbar',
                store: this.store, 
                dock: 'bottom',
                displayInfo: true//,
			/*	items:['-',{
						xtype: 'label',
						forId: 'myFieldId1',
						text: '本页总订单数量：'
					},qtyOrderedPageSumUn,{
						xtype: 'label',
						forId: 'myFieldId2',
						text: '，本页总发运数量：'
					},qtyShippedPageSumUn,
					'-',{
						xtype: 'label',
						forId: 'myFieldId3',
						text: '总订单数量：'
					},qtyOrderedSumUn,{
						xtype: 'label',
						forId: 'myFieldId4',
						text: '，总发运数量：'
					},qtyShippedSumUn
				]*/
            }
        ];
	},
    initComponent: function(){
   		this.buildStore(basePath + '/outbound/doQueryUnfinishedDetailInfo.action','StoreUnfinishedDetailGrid',20);
    	this.on('itemdblclick',function(grid,record){   //有问题，暂未解决
           	var me = this;
    		var father = grid.ownerCt.ownerCt.ownerCt.ownerCt.ownerCt;
    		//father.pt2pn2tabpanel.setActiveTab(1);
    		//father.sodetailform.getForm().loadRecord(record);
            //father.pt2pn2f3grid.getStore().load();       //拣货列表也要根据查询条件加载
    	},this);
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


//费收相关的grid
Ext.define('Redm.outbound.MoneyGrid',{
	 extend: 'Redm.BaseGrid',
     alias : 'widget.moneygrid',
     buildColumns: function(){
        this.columns = [
		    { header: "序号", dataIndex: '', width: 80, sortable: true},
		    { header: "收费日期", dataIndex: '', width: 110, sortable: true},
		    { header: "收费类型", dataIndex: '', width: 150, sortable: true},
		    { header: "描述", dataIndex: '', width: 110, sortable: true},
		    { header: "id", dataIndex: 'id',hidden: true}
		];
		return true;
    },
	buildToolbar: function(){    //应该是buildDockedItems，后续再改
		var me = this;
		this.dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                items: [
                    {
                        iconCls: 'icon-create',
                        text: '创建',
                        scope: this,
                        handler: this.onCreate
                    },
                    '-',
                    {
                        iconCls: 'icon-update',
                        itemId: 'save',
                        text: '修改',
                        disabled: true,
                        scope: this,
                        handler: this.onEdit
                    },
                    '-',
                    {
                        iconCls: 'icon-delete',
                        itemId: 'delete',
                        text: '删除',
                        disabled: true,
                        scope: this,
                        handler: this.onDelete
                    }
                ]
            },
            {
                xtype: 'pagingtoolbar',
                store: this.store, 
                dock: 'bottom',
                displayInfo: true
            }
        ];
	},
    initComponent: function(){
    	this.callParent(arguments);
    }
	
});

//其他相关的grid
Ext.define('Redm.outbound.OtherGrid',{
	 extend: 'Redm.BaseGrid',
     alias : 'widget.othergrid',
     buildColumns: function(){
        this.columns = [
		    { header: "序号", dataIndex: '', width: 150, sortable: true},
		    { header: "集装箱号", dataIndex: '', width: 110, sortable: true},
		    { header: "类型", dataIndex: '', width: 150, sortable: true},
		    { header: "尺寸", dataIndex: '', width: 110, sortable: true},
		    { header: "铅封号", dataIndex: '', width: 150, sortable: true},
		    { header: "重量", dataIndex: '', width: 110, sortable: true},
		    { header: "备注", dataIndex: '', width: 110, sortable: true},
		    { header: "id", dataIndex: 'id',hidden: true}
		];
		return true;
    },
	buildToolbar: function(){   //应该是buildDockedItems，后续再改
		var me = this;
		this.dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                items: [
                    {
                        iconCls: 'icon-create',
                        text: '创建',
                        scope: this,
                        handler: this.onCreate
                    },
                    '-',
                    {
                        iconCls: 'icon-update',
                        itemId: 'save',
                        text: '修改',
                        disabled: true,
                        scope: this,
                        handler: this.onEdit
                    },
                    '-',
                    {
                        iconCls: 'icon-delete',
                        itemId: 'delete',
                        text: '删除',
                        disabled: true,
                        scope: this,
                        handler: this.onDelete
                    }
                ]
            },
            {
                xtype: 'pagingtoolbar',
                store: this.store, 
                dock: 'bottom',
                displayInfo: true
            }
        ];
	},
    initComponent: function(){
    	this.callParent(arguments);
    }
});

//拣货的grid
Ext.define('Redm.outbound.PickGrid',{
	extend: 'Redm.BaseGrid',
    alias : 'widget.pickgrid',
    autoLoad: false,   //启动不自动加载数据     
    buildColumns: function(){
        this.columns = [
		    { header: "行号", dataIndex: 'lineNumber', width: 70, sortable: true},
		    { header: "状态", dataIndex: 'status', width: 50, sortable: true,
                    renderer:this.rendererPickStatusFunc            
            },
		    { header: "商品", dataIndex: 'sku', width: 100, sortable: true},
//		    { header: "中文名称", dataIndex: 'name', width: 150, sortable: true},
//		    { header: "英文名称", dataIndex: 'desc', width: 150, sortable: true},
		    { header: "批次", dataIndex: 'lot', width: 120, sortable: true},
		    { header: "库位", dataIndex: 'loc', width: 120, sortable: true},
//		    { header: "ID", dataIndex: 'gid', width: 120, sortable: true},
		    { header: "待拣EA数量", dataIndex: 'qty', width: 100, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    { header: "单位", dataIndex: 'description', width: 100, sortable: true},   //改用description显示单位
		    { header: "单位数量", dataIndex: 'uomqty', width: 100, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    //{ header: "已拣EA数量", dataIndex: 'qtypicked', width: 100, sortable: true},
            { header: "收货日期", dataIndex: 'lottable01', width: 130, sortable: false,editor:{xtype:'datefield',format:'Y-m-d H:i:s'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
	        { header: "生产日期", dataIndex: 'lottable02', width: 130, sortable: false,editor:{xtype:'datefield',format:'Y-m-d H:i:s'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
	        { header: "失效日期", dataIndex: 'lottable03', width: 130, sortable: false,editor:{xtype:'datefield',format:'Y-m-d H:i:s'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
		    { header: "生产批号", dataIndex: 'lottable04', width: 100, sortable: true},
    		{ header: "托盘号", dataIndex: 'lottable05', width: 100, sortable: true},
		    { header: "成品卷号", dataIndex: 'lottable06', width: 100, sortable: true},
		    { header: "等级", dataIndex: 'lottable07', width: 100, sortable: true},
		    { header: "外观代码", dataIndex: 'lottable08', width: 100, sortable: true},
    		{ header: "表面处理", dataIndex: 'lottable09', width: 100, sortable: true},
		    { header: "规格", dataIndex: 'lottable10', width: 100, sortable: true},
		    { header: "包装形式", dataIndex: 'lottable11', width: 100, sortable: true},
		    { header: "ASN号", dataIndex: 'lottable12', width: 100, sortable: true},
		    { header: "反射率", dataIndex: 'lottable13', width: 100, sortable: true},
		    { header: swmslot14, dataIndex: 'lottable14', width: 100, sortable: true},
		    { header: swmslot15, dataIndex: 'lottable15', width: 100, sortable: true},
		    { header: swmslot16, dataIndex: 'lottable16', width: 100, sortable: true},
		    { header: swmslot17, dataIndex: 'lottable17', width: 100, sortable: true,hidden:true},
		    { header: swmslot18, dataIndex: 'lottable18', width: 100, sortable: true,hidden:true},
		    { header: swmslot19, dataIndex: 'lottable19', width: 100, sortable: true,hidden:true},
		    { header: swmslot20, dataIndex: 'lottable20', width: 100, sortable: true,hidden:true},
		    { header: "面积", dataIndex: 'udf1', width: 100, sortable: true},
		    { header: "id", dataIndex: '',hidden: true}
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
		this.buildStore(basePath + '/outbound/doQueryPickDetail.action','StorePickDetailGrid',20); 

    	this.on('itemdblclick',function(grid,record){    //鼠标双击就会跳到另外一个页面
    		var father = grid.ownerCt.ownerCt.ownerCt.ownerCt.ownerCt;   //
    		father.pt2pn2tabpanel.setActiveTab(3);       //双击后跳到拣货明细
    		father.pt2pn2f4form.getForm().loadRecord(record);     //拣货明细form，显示选中的记录
    		father.pt2pn2f51form.getForm().loadRecord(record);    //手工分配form，显示选中的form，用于取消分配和重新手工分配

    	},this);

    	this.callParent(arguments);
    },
    //拣货表状态解析方法
    rendererPickStatusFunc:function(value)
        {
            var retValue;
            if(value=='0') retValue='新建';
            else if(value=='4') retValue='部分拣货';  //与RF有关
            else if(value=='5') retValue='全部拣货';  //与RF有关
            else if(value=='9') retValue='完成';
            else  retValue=value;
            return retValue;
        }    
});

//拣货的grid
Ext.define('Redm.outbound.UnFinishedPickDetailGrid',{
	extend: 'Redm.BaseGrid',
    alias : 'widget.unfinishedpickdetailgrid',
    autoLoad: false,   //启动不自动加载数据     
    buildColumns: function(){
        this.columns = [
		    { header: "行号", dataIndex: 'lineNumber', width: 70, sortable: true},
		    { header: "状态", dataIndex: 'status', width: 50, sortable: true,
                    renderer:this.rendererPickStatusFunc            
            },
		    { header: "商品", dataIndex: 'sku', width: 100, sortable: true},
//		    { header: "中文名称", dataIndex: 'name', width: 150, sortable: true},
//		    { header: "英文名称", dataIndex: 'desc', width: 150, sortable: true},
		    { header: "批次", dataIndex: 'lot', width: 120, sortable: true},
		    { header: "库位", dataIndex: 'loc', width: 120, sortable: true},
//		    { header: "ID", dataIndex: 'gid', width: 120, sortable: true},
		    { header: "待拣EA数量", dataIndex: 'qty', width: 100, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    { header: "未拣EA数量", dataIndex: 'qtyunpicked', width: 100, sortable: true,renderer:function(v){
		    	if(v > 0)return '<font color=red>'+v+'</font>';
		    }},
		    { header: "单位", dataIndex: 'description', width: 100, sortable: true},   //改用description显示单位
		    { header: "单位数量", dataIndex: 'uomqty', width: 100, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    //{ header: "已拣EA数量", dataIndex: 'qtypicked', width: 100, sortable: true},
            { header: "收货日期", dataIndex: 'lottable01', width: 130, sortable: false,editor:{xtype:'datefield',format:'Y-m-d H:i:s'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
	        { header: "生产日期", dataIndex: 'lottable02', width: 130, sortable: false,editor:{xtype:'datefield',format:'Y-m-d H:i:s'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
	        { header: "失效日期", dataIndex: 'lottable03', width: 130, sortable: false,editor:{xtype:'datefield',format:'Y-m-d H:i:s'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
		    { header: "生产批号", dataIndex: 'lottable04', width: 100, sortable: true},
    		{ header: "托盘号", dataIndex: 'lottable05', width: 100, sortable: true},
		    { header: "成品卷号", dataIndex: 'lottable06', width: 100, sortable: true},
		    { header: "等级", dataIndex: 'lottable07', width: 100, sortable: true},
		    { header: "外观代码", dataIndex: 'lottable08', width: 100, sortable: true},
    		{ header: "表面处理", dataIndex: 'lottable09', width: 100, sortable: true},
		    { header: "规格", dataIndex: 'lottable10', width: 100, sortable: true},
		    { header: "包装形式", dataIndex: 'lottable11', width: 100, sortable: true},
		    { header: "ASN号", dataIndex: 'lottable12', width: 100, sortable: true},
		    { header: "反射率", dataIndex: 'lottable13', width: 100, sortable: true},
		    { header: swmslot14, dataIndex: 'lottable14', width: 100, sortable: true},
		    { header: swmslot15, dataIndex: 'lottable15', width: 100, sortable: true},
		    { header: swmslot16, dataIndex: 'lottable16', width: 100, sortable: true},
		    { header: swmslot17, dataIndex: 'lottable17', width: 100, sortable: true,hidden:true},
		    { header: swmslot18, dataIndex: 'lottable18', width: 100, sortable: true,hidden:true},
		    { header: swmslot19, dataIndex: 'lottable19', width: 100, sortable: true,hidden:true},
		    { header: swmslot20, dataIndex: 'lottable20', width: 100, sortable: true,hidden:true},
		    { header: "面积", dataIndex: 'udf1', width: 100, sortable: true},
		    { header: "id", dataIndex: '',hidden: true}
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
		this.buildStore(basePath + '/outbound/doQueryUnFinishedPickDetail.action','StorePickDetailGrid',20); 

//    	this.on('itemdblclick',function(grid,record){    //鼠标双击就会跳到另外一个页面
//    		var father = grid.ownerCt.ownerCt.ownerCt.ownerCt.ownerCt;   //
//    		father.pt2pn2tabpanel.setActiveTab(3);       //双击后跳到拣货明细
//    		father.pt2pn2f4form.getForm().loadRecord(record);     //拣货明细form，显示选中的记录
//    		father.pt2pn2f51form.getForm().loadRecord(record);    //手工分配form，显示选中的form，用于取消分配和重新手工分配
//
//    	},this);

    	this.callParent(arguments);
    },
    //拣货表状态解析方法
    rendererPickStatusFunc:function(value)
        {
            var retValue;
            if(value=='0') retValue='新建';
            else if(value=='4') retValue='部分拣货';  //与RF有关
            else if(value=='5') retValue='全部拣货';  //与RF有关
            else if(value=='9') retValue='完成';
            else  retValue=value;
            return retValue;
        }    
});


//人工分配用到的grid
Ext.define('Redm.outbound.AllocateGrid',{
	extend: 'Redm.BaseGrid',
    alias : 'widget.allocategrid',
    autoLoad: false,   //启动不自动加载数据
    selModel: Ext.create('Ext.selection.CheckboxModel'),  
    buildColumns: function(){
        this.columns = [
		    { header: "批次", dataIndex: 'lot', width: 100, sortable: true},
		    { header: "库位", dataIndex: 'loc', width: 100, sortable: true},
		    { header: "可用数量", dataIndex: 'qty', width: 100, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    { header: "已分配数量", dataIndex: 'qtyallocated', width: 90, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    { header: "已捡数量", dataIndex: 'qtypicked', width: 100, sortable: true,renderer:Ext.util.Format.numberRenderer('0.000')},
		    { header: "生产批号", dataIndex: 'lottable04', width: 100, sortable: true},
		    { header: "托盘号", dataIndex: 'lottable05', width: 80, sortable: true},
		    { header: "成品卷号", dataIndex: 'lottable06', width: 100, sortable: true},
		    { header: "收货日期", dataIndex: 'lottable01', width: 100, sortable: false,editor:{xtype:'datefield',format:'Y-m-d H:i:s'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
	        { header: "生产日期", dataIndex: 'lottable02', width: 100, sortable: false,editor:{xtype:'datefield',format:'Y-m-d H:i:s'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
	        { header: "失效日期", dataIndex: 'lottable03', width: 100, sortable: false,editor:{xtype:'datefield',format:'Y-m-d H:i:s'},renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s')},
		    { header: "等级", dataIndex: 'lottable07', width: 80, sortable: true},
		    { header: "外观代码", dataIndex: 'lottable08', width: 60, sortable: true},
    		{ header: "表面处理", dataIndex: 'lottable09', width: 100, sortable: true},
            { header: "规格", dataIndex: 'lottable10', width: 100, sortable: true},
		    { header: "包装形式", dataIndex: 'lottable11', width: 100, sortable: true},
		    { header: "ASN号", dataIndex: 'lottable12', width: 100, sortable: true},
            { header: "反射率", dataIndex: 'lottable13', width: 100, sortable: true},
    		{ header: "极差", dataIndex: 'lottable14', width: 100, sortable: true},
		    { header: "批重量", dataIndex: 'lottable15', width: 100, sortable: true},
		    { header: swmslot16, dataIndex: 'lottable16', width: 100, sortable: true},
		    { header: swmslot17, dataIndex: 'lottable17', width: 100, sortable: true,hidden:true},
            { header: swmslot18, dataIndex: 'lottable18', width: 100, sortable: true,hidden:true},
    		{ header: swmslot19, dataIndex: 'lottable19', width: 100, sortable: true,hidden:true},
		    { header: swmslot20, dataIndex: 'lottable20', width: 100, sortable: true,hidden:true},
		    { header: "id", dataIndex: '',hidden: true}
		];
		return true;
    },
	buildDockedItems: function(){ 
		var me = this;
		qtyCount = Ext.create('widget.tbtext',{
			text: '0',
			format: '0,000'
		});
		qtyAllocatedCount = Ext.create('widget.tbtext',{
			text: '0',
			format: '0,000'
		});
		qtyPickedCount = Ext.create('widget.tbtext',{
			text: '0',
			format: '0,000'
		});
		this.dockedItems = [
            {
                xtype: 'pagingtoolbar',
                store: this.store, 
                dock: 'bottom',
                displayInfo: true,
				items:[ '-',{
						xtype: 'label',
						forId: 'myFieldId1',
						text: '可用总数量：'
					},qtyCount,{
						xtype: 'label',
						forId: 'myFieldId2',
						text: '已分配总数量：'
					},qtyAllocatedCount,{
						xtype: 'label',
						forId: 'myFieldId3',
						text: '已拣总数量：'
					},qtyPickedCount
				]
            }
        ];
	},
    initComponent: function(){
    	this.buildStore(basePath + '/outbound/doQueryLotxlocxidForAllocate.action','StoreAllocateGrid',20); 
		this.on({
			cellclick:{fn:function(grid,record){    //鼠标单击事件
				var selections=grid.getSelectionModel().getSelection();
				var qtyTotal=0;
				var alTotal=0;
				var piTotal=0;
				for(var i=0;i<selections.length;i++){
					var record1=selections[i];
					var qty = record1.get("qty");
					var qtyallocated = record1.get("qtyallocated");
					var qtypicked = record1.get("qtypicked");
					qtyTotal=qtyTotal+qty;
					alTotal=alTotal+qtyallocated;
					piTotal=piTotal+qtypicked;
				};
				var qtyCount=this.dockedItems.items[1].items.items[13];
				var qtyallocatedCount=this.dockedItems.items[1].items.items[15];
				var qtypickedCount=this.dockedItems.items[1].items.items[17];

				var qtytotalHtml = '<b><font color=green>'+Ext.util.Format.number(qtyTotal,'0,000')+'</font></b>';
				qtyCount.setText(qtytotalHtml);

				var altotalHtml = '<b><font color=green>'+Ext.util.Format.number(alTotal,'0,000')+'</font></b>';
				qtyallocatedCount.setText(altotalHtml);
				
				var pitotalHtml = '<b><font color=green>'+Ext.util.Format.number(piTotal,'0,000')+'</font></b>';
				qtypickedCount.setText(pitotalHtml);
			},scope: this},
			select:{fn:function(record){
				var newstore=record.selected.items[0].store;
				var selections=record.getSelection();
				var newpageSize=newstore.pageSize;
				var lastPageSize=newstore.data.length;

				if(selections.length==newpageSize && newpageSize==lastPageSize){
					var qtyTotal = newstore.sum('qty');
					var alTotal = newstore.sum('qtyallocated');
					var piTotal = newstore.sum('qtypicked');
					
					var qtyCount=this.dockedItems.items[1].items.items[13];
					var qtytotalHtml = '<b><font color=green>'+Ext.util.Format.number(qtyTotal,'0,000')+'</font></b>';
					qtyCount.setText(qtytotalHtml);

					var qtyallocatedCount=this.dockedItems.items[1].items.items[15];
					var altotalHtml = '<b><font color=green>'+Ext.util.Format.number(alTotal,'0,000')+'</font></b>';
					qtyallocatedCount.setText(altotalHtml);
					
					var qtypickedCount=this.dockedItems.items[1].items.items[17];
					var pitotalHtml = '<b><font color=green>'+Ext.util.Format.number(piTotal,'0,000')+'</font></b>';
					qtypickedCount.setText(pitotalHtml);
				};
				if(selections.length==lastPageSize && newpageSize!=lastPageSize){
					var qtyTotal = newstore.sum('qty');
					var alTotal = newstore.sum('qtyallocated');
					var piTotal = newstore.sum('qtypicked');
					
					var qtyCount=this.dockedItems.items[1].items.items[13];
					var qtytotalHtml = '<b><font color=green>'+Ext.util.Format.number(qtyTotal,'0,000')+'</font></b>';
					qtyCount.setText(qtytotalHtml);

					var qtyallocatedCount=this.dockedItems.items[1].items.items[15];
					var altotalHtml = '<b><font color=green>'+Ext.util.Format.number(alTotal,'0,000')+'</font></b>';
					qtyallocatedCount.setText(altotalHtml);
					
					var qtypickedCount=this.dockedItems.items[1].items.items[17];
					var pitotalHtml = '<b><font color=green>'+Ext.util.Format.number(piTotal,'0,000')+'</font></b>';
					qtypickedCount.setText(pitotalHtml);
				}
				//console.log(this.dockedItems.items[0].items.items[0].text);//得到是每一行的checkBox的text
			},scope: this},
			deselect:{fn:function(record){
				if(record.getCount()==0){
					var qtyTotal = 0;
					var reTotal = 0;
					var piTotal = 0;
					var qtyCount=this.dockedItems.items[1].items.items[13];
					var qtyallocatedCount=this.dockedItems.items[1].items.items[15];
					var qtypickedCount=this.dockedItems.items[1].items.items[17];

					var qtytotalHtml = '<b><font color=green>'+Ext.util.Format.number(qtyTotal,'0,000')+'</font></b>';
					qtyCount.setText(qtytotalHtml);

					var altotalHtml = '<b><font color=green>'+Ext.util.Format.number(reTotal,'0,000')+'</font></b>';
					qtyallocatedCount.setText(altotalHtml);
					
					var pitotalHtml = '<b><font color=green>'+Ext.util.Format.number(reTotal,'0,000')+'</font></b>';
					qtypickedCount.setText(pitotalHtml);
				};
			},scope: this}
		});
    	this.callParent(arguments);
    }
});

//最外部的容器
Ext.define('Redm.outbound.ShipmentOrder',{
	extend: 'Ext.tab.Panel',
    alias : 'widget.sotab',
    tabPosition: 'bottom',
    title:'发货单',
    
//这里在一个tab上有两个panel    
    initComponent: function(){
        this.createContextMenuOperationItem();   //必须在这里做一次初始化，菜单中的按钮才会启用
    	this.items = [this.createPt1Panel(),this.createPt2Panel()];
    	this.callParent(arguments);
    },
    
    //JS的方法，
    //设置ORDERS表一般字段只读属性（manner：true:只读，false:可以编辑）
    //order_key：配置上只读，货主，新建时可以编辑，其他任何情况下只读
    onSetOrdersReadOnly: function(manner){
        var me=this;
        me.pt2pn1f1form.getForm().findField('type').setReadOnly(manner);  
        me.pt2pn1f1form.getForm().findField('orderDate').setReadOnly(manner);  
        me.pt2pn1f1form.getForm().findField('dateStart').setReadOnly(manner);  
        me.pt2pn1f1form.getForm().findField('dateEnd').setReadOnly(manner);  
        me.pt2pn1f1form.getForm().findField('orderNumber').setReadOnly(manner);  
        me.pt2pn1f1form.getForm().findField('dock').setReadOnly(manner);  
        //me.pt2pn1f1form.getForm().findField('actualshipdate').setReadOnly(manner);  
        me.pt2pn1f1form.getForm().findField('deliveryDate').setReadOnly(manner);  
        me.pt2pn1f1form.getForm().findField('retailReference').setReadOnly(manner);  
        me.pt2pn1f1form.getForm().findField('buyerpo').setReadOnly(manner);  
//        me.pt2pn1f1form.getForm().findField('carrierReference').setReadOnly(manner);  
        me.pt2pn1f1form.getForm().findField('warehouseReference').setReadOnly(manner);  
        me.pt2pn1f1form.getForm().findField('otherReference1').setReadOnly(manner);  
        me.pt2pn1f1form.getForm().findField('otherReference2').setReadOnly(manner);  
        me.pt2pn1f1form.getForm().findField('otherReference3').setReadOnly(manner);  
        me.pt2pn1f1form.getForm().findField('otherReference4').setReadOnly(manner);  
    },

    //设置ORDERS表actualshipdate只读属性（manner：true:只读，false:可以编辑）
    //如果已经发货，则不能修改
    onSetActualshipdateReadOnly: function(manner){
        var me=this;
        me.pt2pn1f1form.getForm().findField('actualshipdate').setReadOnly(manner);  
    },
    
    //设置ORDERS表关键字段只读属性（manner：true:只读，false:可以编辑）
    //关键字段包括货主，货主名称。新建时可以编辑，其他任何情况下只读
    onSetOrdersKeyReadOnly: function(manner){
        var me=this;
        me.pt2pn1f1form.getForm().findField('storerKey').setReadOnly(manner); 
        me.pt2pn1f1form.getForm().findField('storerDescr').setReadOnly(manner);
    },
    
    //设置明细表字段一般字段只读属性（manner：true:只读，false:可以编辑）
    //行号：配置上只读，sku，新建时可以编辑，其他任何情况下只读
    onSetDetailReadOnly: function(manner){
        var me=this;
        me.sodetailform.getForm().findField('packKey').setReadOnly(manner);
        me.sodetailform.getForm().findField('uom').setReadOnly(manner);
        me.sodetailform.getForm().findField('qtyUomOrdered').setReadOnly(manner);
        me.sodetailform.getForm().findField('rotationStrategykey').setReadOnly(manner);         
        me.sodetailform.getForm().findField('preAllocationStrategyKey').setReadOnly(manner);         
        me.sodetailform.getForm().findField('allocationStrategyKey').setReadOnly(manner);         
        me.sodetailform.getForm().findField('lottable01').setReadOnly(manner);         
        me.sodetailform.getForm().findField('lottable02').setReadOnly(manner);         
        me.sodetailform.getForm().findField('lottable03').setReadOnly(manner);         
        me.sodetailform.getForm().findField('lottable04').setReadOnly(manner);         
        me.sodetailform.getForm().findField('lottable05').setReadOnly(manner);         
        me.sodetailform.getForm().findField('lottable06').setReadOnly(manner);         
        me.sodetailform.getForm().findField('lottable07').setReadOnly(manner);         
        me.sodetailform.getForm().findField('lottable08').setReadOnly(manner);         
        me.sodetailform.getForm().findField('lottable09').setReadOnly(manner);         
        me.sodetailform.getForm().findField('lottable10').setReadOnly(manner);
        me.sodetailform.getForm().findField('lottable11').setReadOnly(manner);         
        me.sodetailform.getForm().findField('lottable12').setReadOnly(manner);
        me.sodetailform.getForm().findField('lottable13').setReadOnly(manner);
        me.sodetailform.getForm().findField('lottable14').setReadOnly(manner);         
        me.sodetailform.getForm().findField('lottable15').setReadOnly(manner);
        me.sodetailform.getForm().findField('lottable16').setReadOnly(manner);         
        me.sodetailform.getForm().findField('lottable17').setReadOnly(manner);
        me.sodetailform.getForm().findField('lottable18').setReadOnly(manner);
        me.sodetailform.getForm().findField('lottable19').setReadOnly(manner);         
        me.sodetailform.getForm().findField('lottable20').setReadOnly(manner);
        me.sodetailform.getForm().findField('udf1').setReadOnly(manner);
        me.sodetailform.getForm().findField('udf2').setReadOnly(manner);
        me.sodetailform.getForm().findField('udf3').setReadOnly(manner);
        me.sodetailform.getForm().findField('udf4').setReadOnly(manner);
        me.sodetailform.getForm().findField('udf5').setReadOnly(manner);
    },
    
    //设置明细表关键字段只读属性（manner：true:只读，false:可以编辑）
    //关键字段包括 sku，中文名称，英文名称，别名。 新建时可以编辑，其他任何情况下只读
    onSetDetailKeyReadOnly: function(manner){
        var me=this;
        me.sodetailform.getForm().findField('sku').setReadOnly(manner);  
        me.sodetailform.getForm().findField('name').setReadOnly(manner); 
        me.sodetailform.getForm().findField('descr').setReadOnly(manner);
        me.sodetailform.getForm().findField('altsku').setReadOnly(manner);
    },

    //创建第一个tab页面  ，对应so主表，包括一个 查询的form，和一个grid面板
    createPt1Panel: function(){
    	var me = this;
    	this.pt1panel = Ext.create('Ext.form.Panel',{
    		title: '查询',
    		layout: 'border',
    		border: false,
            items: [this.createSoGrid(),this.createPt1TopForm()]
    	});
    	return this.pt1panel;
    },
    
    createSoGrid: function(){
    	var me = this;
    	this.sogrid = Ext.create('widget.sogrid',{
			region: 'center'
            
// add by xueqi for display in the upper form
/*			listeners: {//    文本框的名称，和columns中的一致，就可以点中record，在对应的文本框显示这一列
				itemclick: function(grid,record){
					me.pt1topform.getForm().loadRecord(record);
				} 查询框不需要显示鼠标点中的字段 
			}*/
			/* listeners:{
		    	'itemcontextmenu':function(view,record,item,index,e,eOpts){
		    		//禁用浏览器的右键相应事件
		    		e.preventDefault();
                    e.stopEvent();
                    
                    var menu = new Ext.menu.Menu({
                    	//控制右键菜单位置
     				   	float:true,
     				     items:[{
	     				    	text:"修改",
	       				      	iconCls:'leaf',
	       				      	handler:function(){
	       				      		//当点击时隐藏右键菜单
	       				      		this.up("menu").hide();
	       				      		alert(record.raw.name);
	       				      	}
     				     	},{
     				     		text:"添加",
	       				      	iconCls:'leaf',
	       				      	handler:function(){
	       				      		this.up("menu").hide();
	       				      		alert("添加");
	       				      	}
     				     	},{
     				     		text:"删除",
	       				      	iconCls:'leaf',
	       				      	handler:function(){
	       				      		this.up("menu").hide();
	       				      		alert("删除");
	       				      	}
     				     	}
     				     ]
                    }).showAt(e.getXY());//让右键菜单跟随鼠标位置
		        }
		    }*/
		});

    	this.sogrid.getStore().on('beforeload',function(store){   //加载前的查询条件
    		var params = store.getProxy().extraParams;
    		var values = this.pt1topform.getForm().getFieldValues();
    		var orderKey = values.orderKey;
    		var storerKey = values.storerKey;
    		var type = values.type;
    		var status = values.status;
    		var orderNumber = values.orderNumber;
    		
    		var carrierKey = values.carrierKey;
    		var buyerpo = values.buyerpo;
    		var otherReference1 = values.otherReference1;
    		var orderDate = Ext.util.Format.date(values.orderDate,'Y-m-d H:i:s');
    		var orderDate1 = Ext.util.Format.date(values.orderDate1,'Y-m-d H:i:s');
    		var otherReference2 = values.otherReference2;
    		var otherReference3 = values.otherReference3;
    		var dateStart = Ext.util.Format.date(values.dateStart,'Y-m-d H:i:s');
    		var dateEnd = Ext.util.Format.date(values.dateEnd,'Y-m-d H:i:s');
    		var DeliveryDate = Ext.util.Format.date(values.DeliveryDate,'Y-m-d H:i:s');
    		var DeliveryDate1 = Ext.util.Format.date(values.DeliveryDate1,'Y-m-d H:i:s');
    		var warehouseReference = values.warehouseReference;
    		
    		var retailReference = values.retailReference;
    		var actualshipdate = Ext.util.Format.date(values.actualshipdate,'Y-m-d H:i:s');
    		var actualshipdate1 = Ext.util.Format.date(values.actualshipdate1,'Y-m-d H:i:s');
    		
    		delete params.orderKey;
    		delete params.storerKey;
    		delete params.type;
    		delete params.status;
    		delete params.orderNumber;
    		
    		delete params.carrierKey;
    		delete params.buyerpo;
    		delete params.otherReference1;
    		delete params.orderDate;
    		delete params.orderDate1;
    		delete params.otherReference2;
    		delete params.otherReference3;
    		delete params.dateStart;
    		delete params.dateEnd;
    		delete params.DeliveryDate;
    		delete params.DeliveryDate1;
    		delete params.warehouseReference;
    		delete params.retailReference;
    		delete params.actualshipdate;
    		delete params.actualshipdate1;
    		
    		if(carrierKey) params.carrierKey = carrierKey;
    		if(buyerpo) params.buyerpo = buyerpo;
    		if(otherReference1) params.otherReference1 = otherReference1;
    		if(orderDate) params.orderDate = orderDate;
    		if(orderDate1) params.orderDate1 = orderDate1;
    		if(otherReference2) params.otherReference2 = otherReference2;
    		if(otherReference3) params.otherReference3 = otherReference3;
    		if(dateStart) params.dateStart = dateStart;
    		if(dateEnd) params.dateEnd = dateEnd;
    		if(DeliveryDate) params.DeliveryDate = DeliveryDate;
    		if(DeliveryDate1) params.DeliveryDate1 = DeliveryDate1;
    		if(warehouseReference) params.warehouseReference = warehouseReference;
    		
    		if(orderKey) params.orderKey = orderKey;
    		if(storerKey) params.storerKey = storerKey;
    		if(type) params.type = type;
    		if(status) params.status = status;
    		if(orderNumber) params.orderNumber = orderNumber;
    		if(retailReference) params.retailReference = retailReference;
    		if(actualshipdate) params.actualshipdate = actualshipdate;
    		if(actualshipdate1) params.actualshipdate1 = actualshipdate1;
    		
    	},this);
        
		return this.sogrid;
    },
    
    createPt1TopForm: function(){
    	this.pt1topform = Ext.create('Ext.form.Panel',{
    		region: 'north',
    		layout: 'vbox',
    		//此处修改查询tab中上面panel的相对高度；
            height:'40%',
    		frame: true,
	        stripeRows : true,
			autoScroll : true,
    		defaults: {
    			xtype: 'fieldcontainer',     //公共属性
    			margin: '9 0 0 5'
    		},
    		items: [
                {
                    layout: 'hbox',
                    defaults: {
                        //xtype: 'combobox',
                        xtype: 'textfield',
                        margin: '9 0 0 5',
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
                            //readOnly:true,
                            fieldLabel: '类型',
                            xtype:'codecombo',
                            codeType:'SOTYPE'
                        },
                        {
                            name:'status',
                            //readOnly:true,
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
                            xtype: 'textfield'
                        },
                        {
                            name:'status',
                            fieldLabel: '采购商'
                        },
                        {
                            fieldLabel: '运输到'
                        },
                        {
                            name:'carrierKey',   
                            readOnly:true,
                            fieldLabel: '承运商'
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
                            name:'buyerpo',   
                            fieldLabel: '采购商PO号'
                        },
                        {
                            name:'otherReference1',   
                            fieldLabel: '其他参考号1'
                        },
                        {
                            xtype: 'datefield',
                            name: 'orderDate',
                            fieldLabel: '创建日期',
                            format:'Y-m-d H:i:s',
                            value: Ext.util.Format.date(new Date((new Date()).valueOf()-7*24*60*60*1000),"Y-m-d"),
                            allowBlank: false
                        },
                        {
                            xtype: 'datefield',
                            name: 'orderDate1',
                            fieldLabel: '  ------>',
                            format:'Y-m-d H:i:s',
                            value:Ext.util.Format.date(new Date(),"Y-m-d"),
                            allowBlank: false
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
                            name:'retailReference',   
                            fieldLabel: '分销商参考号',
                            xtype: 'textfield'
                        },
                        {
                            name:'otherReference2',   
                            fieldLabel: '其他参考号2'
                        },
                        {
                            xtype: 'datefield',
                            name: 'dateStart',
                            fieldLabel: '预期发货日期',
                            format:'Y-m-d H:i:s'
                        },
                        {
                            xtype: 'datefield',
                            name: 'dateEnd',
                            fieldLabel: '  ------>',
                            format:'Y-m-d H:i:s'
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
                            fieldLabel: '运输参考号',
                            xtype: 'textfield'
                        },
                        {
                            name:'otherReference3',   
                            fieldLabel: '其他参考号3'
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: '提货日期',
                            name: 'DeliveryDate',
                            format:'Y-m-d H:i:s'
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: '  ------>',
                            name: 'DeliveryDate1',
                            format:'Y-m-d H:i:s'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults: {
                        //xtype: 'combobox',
                        margin: '5 0 10 5',
                        width: 240,
                        labelWidth: 80
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: '仓库参考号',
                            name: 'warehouseReference'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '收货平台'
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: '实际发货日期',
                            name: 'actualshipdate',
                            format:'Y-m-d H:i:s'
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: '  ------>',
                            name: 'actualshipdate1',
                            format:'Y-m-d H:i:s'
                        }
                    ]
                }
            ]
    	});
    	return this.pt1topform;
    },
    
    
//第二个tab页，分上下两个部分
     createPt2Panel: function(){
    	var me = this;
    	this.pt2panel = Ext.create('Ext.form.Panel',{
    		title: '基本',
    		layout: 'border',
    		tabPosition: 'bottom',
    		items: [me.createPt2Pn1Panel(),me.createPt2Pn2Panel()]  //要改为新的panel
    	});
    	return this.pt2panel;
    },
 
 //在原来基础上新增两个panel面板，这是第2个tab页面，上半部分的panel
 
    createPt2Pn1Panel:function(){
    	var me = this;
        this.pt2pn1panle=Ext.create('Ext.panel.Panel',{
    		region: 'center',
    		layout: 'border',
    		border: false,
    		items: [me.createPt2Pn1TopBtn(),me.createPt2Pn1TabPanel()]
        })
        return this.pt2pn1panle;
    },
    
 //   第二个tab页上部panel上的按钮面板
    createPt2Pn1TopBtn: function(){
    	var me = this;
    	this.pt2pn1topbtn = Ext.create('Ext.form.Panel',{
    		region: 'north',
    		frame: true,
            height:35,
    		defaults: {
    			xtype: 'button'
    		},
    		items: [
                {
                    iconCls: 'icon-create',
                    text: '创建',
                    scope: this,
                    handler: me.onCreateSo
                },
                {
                    iconCls: 'icon-delete',
                    text: '删除',
                    scope: this,
                    handler: me.onDeleteSoAndDetal
                },
                {
                    iconCls: 'icon-save',
                    text: '保存',
                    scope: this,
                    handler: me.saveSo
                },
                this.OperationAction,        //待补充实现
                this.printAction,
                this.ImportExportAction,//,
                {
                    iconCls: 'icon-expand',
                    text: '<font color=purple>邮件发送</font>',
                    scope: this,
                    handler: me.onMailSend
                },
                this.K3UploadAction    //K3专用菜单,不用，先注释掉
                
            ]
    	});
    	return this.pt2pn1topbtn;
    },
   
    createContextMenuOperationItem:function(){
//操作菜单开始

        this.OperationItem1 = Ext.create('Ext.Action', {  //创建Action
			text : "拆分BOM",
			cls : "x-btn-text-icon",
            handler: this.onVoid,
			scope : this
		});
        
		this.OperationItem3 = Ext.create('Ext.Action', {
			text : "分配",
			cls : "x-btn-text-icon",
            handler: this.onOrderAsign,
            id:'orderBtn',  
			scope : this
		});
        
		this.OperationItem4 = Ext.create('Ext.Action', {
			text : "取消预分配",
			cls : "x-btn-text-icon",
            handler: this.onVoid,
			scope : this
		});
        
		this.OperationItem5 = Ext.create('Ext.Action', {
			text : "取消分配",
			cls : "x-btn-text-icon",
            handler: this.onVoid,
			scope : this
		});
        
		this.OperationItem6 = Ext.create('Ext.Action', {
			text : "生成加工单",
			cls : "x-btn-text-icon",
            handler: this.onVoid,
			scope : this
		});

		this.OperationItem7 = Ext.create('Ext.Action', {
			text : "生成库存转移单",
			cls : "x-btn-text-icon",
            handler: this.onVoid,
			scope : this
		});
        
		this.OperationItem8 = Ext.create('Ext.Action', {
			text : "生成WAVE单",
			cls : "x-btn-text-icon",
            handler: this.onVoid,
			scope : this
		});
        
		this.OperationItem9 = Ext.create('Ext.Action', {
			text : "拣货确认",
			cls : "x-btn-text-icon",
            handler: this.onVoid,
			scope : this
		});

		this.OperationItem10 = Ext.create('Ext.Action', {
			text : "发货",
			cls : "x-btn-text-icon",
            handler: this.onOrderShip,
            id:'orderShipBtn',  
			scope : this
		});

		this.OperationItem11 = Ext.create('Ext.Action', {
			text : "取消订单",
			cls : "x-btn-text-icon",
            handler: this.onVoid,
			scope : this
		});

		this.OperationItem12 = Ext.create('Ext.Action', {
			text : "关闭订单",
			cls : "x-btn-text-icon",
            handler: this.onVoid,
			scope : this
		});
        
//		this.OperationItem13 = Ext.create('Ext.Action', {
//			text : "邮件发送",
//			cls : "x-btn-text-icon",
//            handler: this.onMailSend,
//			scope : this
//		});

		this.OperationItem14 = Ext.create('Ext.Action', {
			text : "出库单上传",
			cls : "x-btn-text-icon",
            enabled:false,
           // handler: this.onSaleoutboundToK3,
			scope : this
		});
        
		this.OperationAction = Ext.create('Ext.Action', {
			text : "操作",
            iconCls: 'icon-edit',
			menu : [
				this.OperationItem1,
				this.OperationItem2,
				this.OperationItem3,
				this.OperationItem4,
				this.OperationItem5,
				this.OperationItem6,
				this.OperationItem7,
				this.OperationItem8,
				this.OperationItem9,
				this.OperationItem10,
				this.OperationItem11,
				this.OperationItem12
//				this.OperationItem13
//				this.OperationItem14
			]
		});
//操作菜单结束

 //打印菜单开始   
        this.printOperItem1 = Ext.create('Ext.Action', {  //创建Action
			text : "拣货清单",
			cls : "x-btn-text-icon",
			handler: this.onPrintPickDetailItem,
			scope : this
		});
		this.printOperItem1S = Ext.create('Ext.Action', {  //创建Action
			text : "通道S拣货清单",
			cls : "x-btn-text-icon",
			handler: this.onPrintSPickDetailItem,
			scope : this
		});
		this.printOperItemSection = Ext.create('Ext.Action', {  //创建Action
			text : "按组拣货清单",
			cls : "x-btn-text-icon",
			handler: this.onPrintPickDetailItemBySection,
			scope : this
		});
		this.printOperItem2S = Ext.create('Ext.Action', {  //创建Action
			text : "发货标签(单打)",
			cls : "x-btn-text-icon",
			handler: this.onPrintShippinglableSingle,
			scope : this
		});
		this.printOperItem2SS = Ext.create('Ext.Action', {  //创建Action
			text : "发货标签(连打)",
			cls : "x-btn-text-icon",
			handler: this.onPrintShippinglableContinue,
			scope : this
		});
		this.printOperItem2 = Ext.create('Ext.Action', {
			text : "装箱单",
			cls : "x-btn-text-icon",
            handler: this.onVoid,
			scope : this
		});
		this.printOperItem3 = Ext.create('Ext.Action', {
			text : "销售出库单(明细)",
			cls : "x-btn-text-icon",
            handler: this.onPrintOrdersItem,
			scope : this
		});
		this.printOperItem4 = Ext.create('Ext.Action', {
			text : "销售出库单(汇总)",
			cls : "x-btn-text-icon",
            handler: this.onPrintOrdersSum,
			scope : this
		});
		this.printOperItem3SA4 = Ext.create('Ext.Action', {
			text : "<font color=purple>(A4)销售出库单(明细)</font>",
			cls : "x-btn-text-icon",
            handler: this.onPrintOrdersItemA4,
			scope : this
		});
		this.printOperItem3S = Ext.create('Ext.Action', {
			text : "<font color=purple>(新)销售出库单(明细)</font>",
			cls : "x-btn-text-icon",
            handler: this.onPrintNewOrdersItem,
			scope : this
		});
		this.printOperItem4S = Ext.create('Ext.Action', {
			text : "<font color=purple>(新)销售出库单(汇总)</font>",
			cls : "x-btn-text-icon",
            handler: this.onPrintNewOrdersSum,
			scope : this
		});
		this.printOperItem5 = Ext.create('Ext.Action', {
			text : "阿强快运",
			cls : "x-btn-text-icon",
            handler: this.onPrintSuite01,
			scope : this
		});
		this.printOperItem6 = Ext.create('Ext.Action', {
			text : "海福星",
			cls : "x-btn-text-icon",
            handler: this.onPrintSuite02,
			scope : this
		});
		this.printOperItem7 = Ext.create('Ext.Action', {
			text : "长荣捷运",
			cls : "x-btn-text-icon",
            handler: this.onPrintSuite03,
			scope : this
		});
		this.printOperItem8 = Ext.create('Ext.Action', {
			text : "南北物流",
			cls : "x-btn-text-icon",
            handler: this.onPrintSuite04,
			scope : this
		});
		this.printOperItem9 = Ext.create('Ext.Action', {
			text : "圆通物流",
			cls : "x-btn-text-icon",
            handler: this.onPrintSuite05,
			scope : this
		});
		
		this.printAction = Ext.create('Ext.Action', {
			text : "打印",
            iconCls: 'icon-printer',
			menu : [
				this.printOperItem1,
				this.printOperItem1S,
				this.printOperItemSection,
				this.printOperItem2S,
				this.printOperItem2SS,
				this.printOperItem2,
				this.printOperItem3,
				this.printOperItem4,
				this.printOperItem3SA4,
				this.printOperItem3S,
				this.printOperItem4S,
				this.printOperItem5,
				this.printOperItem6,
				this.printOperItem7,
				this.printOperItem8,
				this.printOperItem9
			]
		}
		
		);
		this.UpdateOutboundItem1 = Ext.create('Ext.Action', {
			text : "<font color=purple>处理已扣账(销售出库单)</font>",
			cls : "x-btn-text-icon",
//            handler: this.onOprOutboundAccoutStatus,
			handler:this.onOprAccoutStatus,
			scope : this
		});
		this.UploadOutboundK3Item1 = Ext.create('Ext.Action', {
			text : "<font color=green>销售出库单上传</font>",
			cls : "x-btn-text-icon",
            handler: this.onSaleoutboundToK3,
			scope : this
		});
		this.UpdateSpreedItem2 = Ext.create('Ext.Action', {
			text : "<font color=purple>处理已扣账(涂布小分切)</font>",
			cls : "x-btn-text-icon",
            handler: this.onOprAccoutStatus,
			scope : this
		});
		this.UploadSpreedK3Item2 = Ext.create('Ext.Action', {
			text : "<font color=green>涂布小分切上传</font>",
			cls : "x-btn-text-icon",
            handler: this.onSpreedOutboundToK3,
			scope : this
		});
		this.K3UploadAction = Ext.create('Ext.Action', {
			text : "<font color=red>上传K3</font>",
            iconCls: 'icon-expand',
			menu : [
				this.UpdateOutboundItem1,
				this.UploadOutboundK3Item1,
				this.UpdateSpreedItem2,
				this.UploadSpreedK3Item2
			]
		}
		
		);
//打印菜单结束        
//导入导出菜单开始
        this.ImportExportItem1 = Ext.create('Ext.Action', {  //创建Action
			text : "从ASN提取",
			cls : "x-btn-text-icon",
            handler:function(){
                        this.creatASNWindowPanel();
                        this.winform.show();
                    },
			scope : this
		});
		this.ImportExportItem2 = Ext.create('Ext.Action', {
			text : "从库存提取",
			cls : "x-btn-text-icon",
            handler:function(){
                this.creatTransactionWindowPanel();
                this.winformtran.show();
            },
			scope : this
		});

		this.ImportExportItem3 = Ext.create('Ext.Action', {
			text : "导入发货数据",
			cls : "x-btn-text-icon",
            handler: this.onVoid,
			scope : this
		});
        
		this.ImportExportItem4 = Ext.create('Ext.Action', {
			text : "导入序列号",
			cls : "x-btn-text-icon",
            handler: this.onVoid,
			scope : this
		});
        
		this.ImportExportItem5 = Ext.create('Ext.Action', {
			text : "导入SO",
			cls : "x-btn-text-icon",
            handler: this.onVoid,
			scope : this
		});
		this.ImportExportItem6 = Ext.create('Ext.Action', {
			text : "导出分配数据",
			cls : "x-btn-text-icon",
            handler: this.onVoid,
			scope : this
		});
		this.ImportExportItem7 = Ext.create('Ext.Action', {
			text : "导出序列号",
			cls : "x-btn-text-icon",
            handler: this.onVoid,
			scope : this
		});
        
		this.ImportExportAction = Ext.create('Ext.Action', {
			text : "导入导出",
            iconCls: 'icon-expand',
			menu : [
				this.ImportExportItem1,
				this.ImportExportItem2,
				this.ImportExportItem3,
				this.ImportExportItem4,
				this.ImportExportItem5,
				this.ImportExportItem6,
				this.ImportExportItem7
			]
		});
        
//导入导出菜单结束        

//动作菜单结束

        this.ActItem1 = Ext.create('Ext.Action', {  //创建Action
			text : "复制收货日期到所有行",
			cls : "x-btn-text-icon",
            handler: this.onVoid,
			scope : this
		});
		this.ActItem2 = Ext.create('Ext.Action', {
			text : "复制收货库位到所有行",
			cls : "x-btn-text-icon",
            handler: this.onVoid,
			scope : this
		});

		this.ActItem3 = Ext.create('Ext.Action', {
			text : "复制收货人员到所有行",
			cls : "x-btn-text-icon",
            handler: this.onVoid,
			scope : this
		});
        
		this.ActAction = Ext.create('Ext.Action', {
			text : "动作",
            iconCls: 'icon-mhistory',
			menu : [
				this.ActItem1,
				this.ActItem2,
				this.ActItem3
			]
		});

//动作菜单结束

//SO下部打印菜单开始
        this.BtmPrintOperItem1 = Ext.create('Ext.Action', {  //创建Action
			text : "拣货标签（单）",
			cls : "x-btn-text-icon",
            handler: this.onVoid,
			scope : this
		});
		this.BtmPrintOperItem2 = Ext.create('Ext.Action', {
			text : "拣货标签（全）",
			cls : "x-btn-text-icon",
            handler: this.onVoid,
			scope : this
		});

		this.BtmPrintOperItem3 = Ext.create('Ext.Action', {
			text : "箱号标签",
			cls : "x-btn-text-icon",
            handler: this.onVoid,
			scope : this
		});
		this.BtmPrintOperItem4 = Ext.create('Ext.Action', {
			text : "箱唛（单）",
			cls : "x-btn-text-icon",
            handler: this.onVoid,
			scope : this
		});
		this.BtmPrintOperItem5 = Ext.create('Ext.Action', {
			text : "箱唛（全）",
			cls : "x-btn-text-icon",
            handler: this.onVoid,
			scope : this
		});
		this.BtmPrintOperItem6 = Ext.create('Ext.Action', {
			text : "箱单（单）",
			cls : "x-btn-text-icon",
            handler: this.onVoid,
			scope : this
		});
		this.BtmPrintOperItem7 = Ext.create('Ext.Action', {
			text : "箱单（全）",
			cls : "x-btn-text-icon",
            handler: this.onVoid,
			scope : this
		});
        
		this.BtmPrintOperAction = Ext.create('Ext.Action', {
			text : "打印",
            iconCls: 'icon-printer',
			menu : [
				this.BtmPrintOperItem1,
				this.BtmPrintOperItem2,
				this.BtmPrintOperItem3,
				this.BtmPrintOperItem4,
				this.BtmPrintOperItem5,
				this.BtmPrintOperItem6,
				this.BtmPrintOperItem7
			]
		})

//SO下部打印菜单结束
        
    }, // 菜单初始化结束

    onVoid:function()
    {
       //空方法
    },

	//创建ASN提取的panel
	creatASNWindowPanel: function(){
    	var me = this;
    	this.winform = Ext.create('Ext.window.Window',{
	    	title: 'ASN查询',
			height: 350,
		    width: 850,
    		layout: 'border',
    		border: false,
            items: [this.creatASNPanel()]
		});
    	this.winform.on('close',function(){
    		delete this.winform;
    	},this);
    	return this.winform;
    },
	
	creatASNPanel:function(){
    	var me = this;
        this.ASNpanle=Ext.create('Ext.panel.Panel',{
    		region: 'center',
    		layout: 'border',
            height:360,
    		border: false,
    		items: [this.createASNForm(),this.creatASNGridPanel()]
        })
        return this.ASNpanle;
    },
	
	//创建ASNForm
	createASNForm: function(){
    	this.ASNform = Ext.create('Ext.form.Panel',{
    		region: 'north',
    		layout: 'vbox',
			autoScroll : true,
    		frame: true,
    		defaults: {
    			xtype: 'fieldcontainer',
    			margin: '5 0 0 5'
    		},
    		items: [
                {
                    layout: 'hbox',
                    defaults: {
                        xtype: 'textfield',
                        margin: '5 0 0 5',
                        width: 200,
                        labelWidth: 60
                    },
                    items: [
						{
                            fieldLabel: 'ASN号',
                            name: 'receiptKey'
                        },
                        {
                            fieldLabel: '货主',
                            name: 'storerKey',
                            listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }                                
                        },
                        {
                            fieldLabel: 'ASN类型',
                            xtype:'codecombo',
                            codeType:'ASNTYPE',
                            name: 'type'
                        },
                        {
                            fieldLabel: 'ASN状态',
                            xtype:'codecombo',
                            codeType:'ASNSTATUS',
                            name: 'status'
                        }
                    ]
                }
            ]
    	});
    	return this.ASNform;
    },

	creatASNGridPanel:function(){
    	var me = this;
        this.ASNpanle=Ext.create('Ext.panel.Panel',{
    		region: 'center',
    		layout: 'border',
    		border: false,
    		items: [this.createASNButton(),this.createASNGrid()]
        })
        return this.ASNpanle;
    },
	
	createASNButton: function(){
    	this.ASNbutton = Ext.create('Ext.form.Panel',{
    		region: 'north',
    		frame: true,
            height:35,
    		defaults: {
    			xtype: 'button'
    		},
    		items: [
                {
                    iconCls: 'icon-search',
                    text: '查询',
                    handler: this.onSelect,          //第一个tab页面查询按钮
                    scope: this
                },
                {
                    iconCls: 'icon-reset',
                    text: '重置',
                    handler: this.onReset,        //第一个tab页面重置按钮，清空查询条件
                    scope: this
                },
                {
                    iconCls: 'icon-save',
                    text: '确定',
                    handler: this.onSubmit,        //第一个tab页面重置按钮，清空查询条件
                    scope: this
                }
            ]
    	});
    	return this.ASNbutton;
    },
	
	//创建ASNGrid
	createASNGrid: function(){
    	this.ASNgrid = Ext.create('widget.receiptgrid',{
			region: 'center'
		});
    	this.ASNgrid.getStore().on('beforeload',function(store){         //初次加载前或查询时的设置
    		var params = store.getProxy().extraParams;
    		var values = this.ASNform.getForm().getFieldValues();
    		var receiptKey = values.receiptKey;
    		var storerKey = values.storerKey;
    		var type = values.type;
    		var status = values.status;
    		
    		delete params.receiptKey;
    		delete params.storerKey;
    		delete params.type;
    		delete params.status;
    		
    		if(receiptKey) params.receiptKey = receiptKey;
    		if(storerKey) params.storerKey = storerKey;
    		if(type) params.type = type;
    		if(status) params.status = status;
    	},this);
            
		return this.ASNgrid;
    },
	
 //从库存提取相关界面   
    	creatTransactionWindowPanel: function(){
    	var me = this;
    	this.winformtran = Ext.create('Ext.window.Window',{
	    	title: '库存余量查询',
			height: 550,
		    width: 1050,
    		layout: 'border',
    		border: false,
            items: [this.creatTransactionPanel()]
		});
    	this.winformtran.on('close',function(){
    		delete this.winformtran;
    	},this);
    	return this.winformtran;
    },
	
	creatTransactionPanel:function(){
    	var me = this;
        this.Transactionpanle=Ext.create('Ext.panel.Panel',{
    		region: 'center',
    		layout: 'border',
            //height:360,
    		border: false,
    		items: [this.createTransactionForm(),this.creatTransactionGridPanel()]
        })
        
        return this.Transactionpanle;
    },
	
	//创建ASNForm
	createTransactionForm: function(){
        var me=this;
    	this.Transactionform = Ext.create('Ext.form.Panel',{
    		region: 'north',
    		layout: 'vbox',
            height:170,
			autoScroll : true,
    		frame: true,
            
            //以下是每个item的公共属性
            defaults: {
                anchor: '100%',
                xtype: 'fieldcontainer',
                layout: 'hbox',
                defaultType: 'textfield',
                combineErrors: true,
                width:1000,
                defaults: {
					margins: '0 2 0 6'
                }
            },
    		items: [
                {
                    items: [
                        {
                            fieldLabel:'货主',
                            labelWidth:60,
                            name: 'storerKey',
                            value:'8080',
                            listeners:{
                                blur: function(txt){
                                    var storerValue=Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(storerValue);
                                } 
                            }                            
                        },
                        {
                            fieldLabel:'商品',
                            labelWidth:60,
                            name: 'sku',
                            listeners:{
                                blur: function(txt){
                                    var skuValue=Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(skuValue);
                                } 
                            }
                        },
                        {
                            fieldLabel:'库位',
                            labelWidth:60,
                            name:'loc',
                            listeners:{
                                blur: function(txt){
                                    var fromlocValue= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(fromlocValue);
                                }
                            }
                        },
                        {	
                            fieldLabel:'收货日期',
                            labelWidth:60,
                            width:191,
                            xtype:'datefield',
                            name: 'lottable01',
                            format:'Y-m-d'
                        },
                        {	
                            fieldLabel:'  --->',
                            labelWidth:60,
                            width:191,
                            xtype:'datefield',
                            name: 'tolottable01',
                            format:'Y-m-d'
                        }                    
                    ]
                },
                {
                    items: [
                        {	
                            fieldLabel:'生产日期',
                            labelWidth:60,
                            width:191,
                            xtype:'datefield',
                            name: 'lottable02',
                            format:'Y-m-d'
                        },
                        {	
                            fieldLabel:'  --->',
                            labelWidth:60,
                            width:191,
                            xtype:'datefield',
                            name: 'tolottable02',
                            format:'Y-m-d'
                        },                        
                        {	
                            fieldLabel:'失效日期',
                            labelWidth:60,
                            width:191,
                            xtype:'datefield',
                            name: 'lottable03',
                            format:'Y-m-d'
                        },
                        {	
                            fieldLabel:'  --->',
                            labelWidth:60,
                            width:191,
                            xtype:'datefield',
                            name: 'tolottable03',
                            format:'Y-m-d'
                        },
                        {	
                            fieldLabel:'生产批号',
                            labelWidth:60,
                            name: 'lottable04',
                            listeners:{
                                blur: function(txt){
                                    var lottable04Value= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(lottable04Value);
                                }
                            }
                        }    
                    ]
                },
                {
                    items: [
                        {	
                            fieldLabel:'托盘号',
                            labelWidth:60,
                            name: 'lottable05',
                            listeners:{
                                blur: function(txt){
                                    var lottable05Value= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(lottable05Value);
                                }
                            }                            
                        },
                        {
                            fieldLabel:'成品卷号',
                            labelWidth:60,
                            name: 'lottable06',
                            listeners:{
                                blur: function(txt){
                                    var lottable06Value= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(lottable06Value);
                                }
                            }                            
                        },
                        {
                            fieldLabel: '等级',
                            xtype:'codecombo',
                            labelWidth:60,
                            width:191,
                            codeType:'CYCLASS',
                            name: 'lottable07'
                        },                        
                        {
                            fieldLabel:'外观代码',
                            labelWidth:60,
                            name: 'lottable08',
                            listeners:{
                                blur: function(txt){
                                    var lottable08Value= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(lottable08Value);
                                    me.top.getForm().findField('lottable08Over').setValue(lottable08Value);
                                }
                            }                            
                        },{
                            fieldLabel:'批重量',
                            labelWidth:60,
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
                    items: [
                        {
                            fieldLabel:'规格',
                            labelWidth:60,
                            name: 'lottable10',
                            listeners:{
                                blur: function(txt){
                                    var lottable10Value= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(lottable10Value);
                                    me.top.getForm().findField('lottable10Over').setValue(lottable10Value);
                                }
                            }                            
                        },
                        {
                            fieldLabel:'包装形式',
                            labelWidth:60,
                            name: 'lottable11',
                            listeners:{
                                blur: function(txt){
                                    var lottable11Value= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(lottable11Value);
                                    me.top.getForm().findField('lottable11Over').setValue(lottable11Value);
                                }
                            }                            
                        },
                        {   
                            fieldLabel:'ASN号',
                            labelWidth:60,
                            name: 'lottable12',
                            listeners:{
                                blur: function(txt){
                                    var lottable12Value= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(lottable12Value);
                                    me.top.getForm().findField('lottable12Over').setValue(lottable12Value);
                                }
                            }                            
                        },
                        {
                            fieldLabel:'反射率',
                            labelWidth:60,
                            name: 'lottable13',
                            listeners:{
                                blur: function(txt){
                                    var lottable13Value= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(lottable13Value);
                                }
                            }                            
                        },
                        {
                            fieldLabel:'极差',
                            labelWidth:60,
                            name: 'lottable14',
                            listeners:{
                                blur: function(txt){
                                    var lottable14Value= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(lottable14Value);
                                }
                            }                            
                        }                        
                    ]
                },
                {
                    items: [
                        {
                            fieldLabel: '表面处理',
                            xtype:'codecombo',
                            labelWidth:60,
                            width:230,
                            codeType:'CYSURFACE',
                            name: 'lottable09'
                        },
                        {
                            fieldLabel:'扣帐状态',
                            labelWidth:60,
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
                            labelWidth:60,
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
                            labelWidth:60,
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
                            boxLabel: '显示所有',
                            xtype: 'checkbox',
                            inputValue:1,
                            margin: '5 0 0 15',
                            name: 'showall'                
                        }                        
                    ]
                },
                {
                    items: [
                        {
                            fieldLabel:swmslot19,
                            labelWidth:60,
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
                            labelWidth:60,
                            hidden:true,
                            name: 'lottable20',
                            listeners:{
                                blur: function(txt){
                                    var lottable20Value= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(lottable20Value);
                                }
                            }                            
                        }
                    ]
                }
			]
    	});
    	return this.Transactionform;
    },

	creatTransactionGridPanel:function(){
    	var me = this;
        this.Transactionpanle=Ext.create('Ext.panel.Panel',{
    		region: 'center',
    		layout: 'border',
    		border: false,
    		items: [this.createTransactionButton(),this.createTransactionGrid()]
        })
        return this.Transactionpanle;
    },
	
	createTransactionButton: function(){
    	this.Transactionbutton = Ext.create('Ext.form.Panel',{
    		region: 'north',
    		frame: true,
            height:35,
    		defaults: {
    			xtype: 'button'
    		},
    		items: [
                {
                        iconCls: 'icon-search',
                        text: '查询',
                        handler: this.onTransactionSelect,      //从库存提取查询按钮
                        scope: this
                },
                {
                        iconCls: 'icon-reset',
                        text: '重置',
                        handler: this.onTransactionReset,       //从库存提取重置按钮，清空查询条件
                        scope: this
                },
                {
                        iconCls: 'icon-save',
                        text: '确定',
                        handler: this.onTransactionSubmit,      //从库存提取提交按钮
                        scope: this
                },
                {
                        iconCls: 'icon-reset',
                        text: '返回',
                        handler: this.onTransactionReturn,      //返回按钮
                        scope: this
                }                
            ]
    	});
    	return this.Transactionbutton;
    },
	
	//创建库存余量Grid
	createTransactionGrid: function(){
    	this.Transactiongrid = Ext.create('widget.lligrid',{
			region: 'center',
            selModel:Ext.create('Ext.selection.CheckboxModel')
		});
    	this.Transactiongrid.getStore().on('beforeload',function(store){         //初次加载前或查询时的设置
    		var params = store.getProxy().extraParams;
    		var values = this.Transactionform.getForm().getFieldValues();
    		var storerKey = values.storerKey;
    		var sku = values.sku;
    		var loc = values.loc;
    		var lottable01 = values.lottable01;
    		var tolottable01 = values.tolottable01;
    		var lottable02 = values.lottable02;
    		var tolottable02 = values.tolottable02;
    		var lottable03 = values.lottable03;
    		var tolottable03 = values.tolottable03;
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
    		var showall = values.showall;

    		delete params.storerKey;
    		delete params.sku;
    		delete params.loc;
    		delete params.lottable01;
    		delete params.tolottable01;
    		delete params.lottable02;
    		delete params.tolottable02;
    		delete params.lottable03;
    		delete params.tolottable03;
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
    		delete params.showall;
            
            if(storerKey) params.storerKey = storerKey;
            if(sku) params.sku = sku;
            if(loc) params.loc = loc;
            if(lottable01) params.lottable01 = lottable01;
            if(tolottable01) params.tolottable01 = tolottable01;
            if(lottable02) params.lottable02 = lottable02;
            if(tolottable02) params.tolottable02 = tolottable02;
            if(lottable03) params.lottable03 = lottable03;
            if(tolottable03) params.tolottable03 = tolottable03;
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
            if(showall) params.showall = showall;
            
    	},this);
		return this.Transactiongrid;
    },
    
	 //第一个tab页面查询按钮
    onSelect: function(){
    	this.ASNgrid.getStore().load();
    },
    
    //从ASN提取用到的按钮前台方法
    onReset: function(){
    	this.ASNform.getForm().reset();
    },
	onSubmit: function(){
		var me=this;
        var datas = this.ASNgrid.getSelectionModel().getSelection();
		
    	if(datas == ''){
    		MessageBox.error('错误提示','请选择数据！');
    		return;
    	}else{
            var data = datas[0].getData();
			var receiptKey = data.receiptKey;
			
			var mask = new Ext.LoadMask(me.getEl(), { 
				msg : 'please wait...' 
			});
			mask.show(); 
			Ext.Ajax.request({
			    url: basePath + '/outbound/importSoFromASN.action',
			    params: {
			    	receiptKey: receiptKey
			    },
			    success: function(response){
			        var text = Ext.decode(response.responseText);
			        var success = text.success;
					mask.hide();
			        MessageBox.show(success, text.json.msg);
                    if(true==success)
                    {
						me.sogrid.getStore().load();
						me.winform.close();
						me.setActiveTab(0);
                    }
			    }
			});
    	} 
	},
	
    //从库存提取用到的按钮前台方法
    onTransactionSelect: function(){
    	this.Transactiongrid.getStore().load();
    },
    
    //从ASN提取用到的按钮前台方法
    onTransactionReset: function(){
    	this.Transactionform.getForm().reset();
    },
    
	onTransactionSubmit: function(){
		var me=this;
        var orderKey=this.pt2pn1f1form.getForm().findField('orderKey').getValue();
        var storerKey=this.pt2pn1f1form.getForm().findField('storerKey').getValue();
        var type=this.pt2pn1f1form.getForm().findField('type').getValue();
        var storerDescr=this.pt2pn1f1form.getForm().findField('storerDescr').getValue();
        var orderNumber=this.pt2pn1f1form.getForm().findField('orderNumber').getValue();

        var consigneeKey=this.pt2pn1f5form.getForm().findField('consigneeKey').getValue();

        var consigneeCompany=this.pt2pn1f5form.getForm().findField('consigneeCompany').getValue();
        var consigneeNation=this.pt2pn1f5form.getForm().findField('consigneeNation').getValue();
        var consigneeProvince=this.pt2pn1f5form.getForm().findField('consigneeProvince').getValue();
        var consigneeCity=this.pt2pn1f5form.getForm().findField('consigneeCity').getValue();
        var consigneeCounty=this.pt2pn1f5form.getForm().findField('consigneeCounty').getValue();
        var consigneeAddress=this.pt2pn1f5form.getForm().findField('consigneeAddress').getValue();
        var consigneeContact=this.pt2pn1f5form.getForm().findField('consigneeContact').getValue();
        var consigneeMobile=this.pt2pn1f5form.getForm().findField('consigneeMobile').getValue();
        var consigneeTel=this.pt2pn1f5form.getForm().findField('consigneeTel').getValue();
        var consigneePosition=this.pt2pn1f5form.getForm().findField('consigneePosition').getValue();
        var consigneeFax=this.pt2pn1f5form.getForm().findField('consigneeFax').getValue();
        var consigneeEmail=this.pt2pn1f5form.getForm().findField('consigneeEmail').getValue();

		var records = me.Transactiongrid.getSelectionModel().getSelection();
		if((records == ""))
        {
			MessageBox.error("错误提示","请选择要操作的数据！");
		 	return;
		} 
        if(""==storerKey)
        {
			MessageBox.error("错误提示","请先输入货主！");
		 	return;
		} 
        
		var ids = []; 
		Ext.Array.each(records, function(name, index, countriesItSelf) {
			ids.push(name.getData().id);
		});
		
        {
			var mask = new Ext.LoadMask(me.getEl(), { 
				msg : 'please wait...' 
			});
			mask.show(); 
			Ext.Ajax.request({
			    url: basePath + '/outbound/importSoFromTransaction.action',
			    params: {
                    ids: ids,
                    orderKey: orderKey,
                    storerKey: storerKey,
                    type:type,
                    storerDescr:storerDescr,
                    orderNumber:orderNumber,
                    
                    consigneeKey:consigneeKey,
                    consigneeCompany:consigneeCompany,
                    consigneeNation:consigneeNation,
                    consigneeProvince:consigneeProvince,
                    consigneeCity:consigneeCity,
                    consigneeCounty:consigneeCounty,
                    consigneeAddress:consigneeAddress,
                    consigneeContact:consigneeContact,
                    consigneeMobile:consigneeMobile,
                    consigneeTel:consigneeTel,
                    consigneePosition:consigneePosition,
                    consigneeFax:consigneeFax,
                    consigneeEmail:consigneeEmail
			    },
			    success: function(response){
			        var text = Ext.decode(response.responseText);
			        var success = text.success;
					mask.hide();
			        MessageBox.show(success, text.json.msg);
                    if(true==success)
                    {
					//	me.sogrid.getStore().load();
					//	me.winformtran.close();
					//	me.setActiveTab(0);
						me.sodetailgrid.getStore().load();
                    }
			    }
			});
    	} 
	},
    

	onTransactionReturn: function(){
		var me=this;
		me.sogrid.getStore().load();
        me.winformtran.close();
        me.setActiveTab(0);
		me.sodetailgrid.getStore().load();
	},

    
    
    //打印检货清单
	onPrintPickDetailItem: function(){
		var me = this;
    	var record = me.pt2pn1f1form.getForm().getFieldValues(); 

    	if(record.orderKey == ""){
    		MessageBox.error('错误提示','请选择操作的数据！');
    		return;
    	}
		else
		{
//			console.log(record.orderKey);
			Ext.Ajax.request({
			    url: basePath + '/outbound/printPickDetail.action',
			    params: {
                    orderKey:record.orderKey
			    },		
                async: false,				
			    success: function(response){
			        var text = Ext.decode(response.responseText);
		        url = basePath + text.json.path;

/*			        me.basicForm.getForm().reset();
			        me.customerForm.getForm().reset();
			        me.clForm.getForm().reset();
			        me.moneyForm.getForm().reset();
			        me.pt2pn1f5form.getForm().reset();
			        me.probookform.getForm().reset();
			        me.childdetailForm.getForm().reset();*/
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
    
     //打印通道S检货清单
	onPrintSPickDetailItem: function(){
		var me = this;
    	var record = me.pt2pn1f1form.getForm().getFieldValues(); 

    	if(record.orderKey == ""){
    		MessageBox.error('错误提示','请选择操作的数据！');
    		return;
    	}
		else
		{
//			console.log(record.orderKey);
			Ext.Ajax.request({
			    url: basePath + '/print/printSPickDetail.action',
			    params: {
                    orderKey:record.orderKey
			    },		
                async: false,				
			    success: function(response){
			        var text = Ext.decode(response.responseText);
		        url = basePath + text.json.path;

/*			        me.basicForm.getForm().reset();
			        me.customerForm.getForm().reset();
			        me.clForm.getForm().reset();
			        me.moneyForm.getForm().reset();
			        me.pt2pn1f5form.getForm().reset();
			        me.probookform.getForm().reset();
			        me.childdetailForm.getForm().reset();*/
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
    
    //打印按组拣货清单
	onPrintPickDetailItemBySection: function(){
		var me = this;
    	var record = me.pt2pn1f1form.getForm().getFieldValues(); 
    	if(record.orderKey == ""){
    		MessageBox.error('错误提示','请选择操作的数据！');
    		return;
    	}
		else
		{
//			console.log(record.orderKey);
			Ext.Ajax.request({
			    url: basePath + '/print/printPickDetailBySection.action',
			    params: {
                    orderKey:record.orderKey
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
    
    //定义打印发货标签(单打)
    onPrintShippinglableSingle: function(){
		var me = this;
    	var record = me.pt2pn1f1form.getForm().getFieldValues(); 

    	if(record.orderKey == ""){
    		MessageBox.error('错误提示','请选择操作的数据！');
    		return;
    	}
		else
		{
//			console.log(record.orderKey);
			Ext.Ajax.request({
			    url: basePath + '/print/printShippinglableSingle.action',
			    params: {
                    orderKey:record.orderKey,
                     type:'single'
			    },		
                async: false,				
			    success: function(response){
			        var text = Ext.decode(response.responseText);
		        url = basePath + text.json.path;

/*			        me.basicForm.getForm().reset();
			        me.customerForm.getForm().reset();
			        me.clForm.getForm().reset();
			        me.moneyForm.getForm().reset();
			        me.pt2pn1f5form.getForm().reset();
			        me.probookform.getForm().reset();
			        me.childdetailForm.getForm().reset();*/
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
    
     //定义打印发货标签(连打)
    onPrintShippinglableContinue: function(){
		var me = this;
    	var record = me.pt2pn1f1form.getForm().getFieldValues(); 

    	if(record.orderKey == ""){
    		MessageBox.error('错误提示','请选择操作的数据！');
    		return;
    	}
		else
		{
//			console.log(record.orderKey);
			Ext.Ajax.request({
			    url: basePath + '/print/printShippinglableSingle.action',
			    params: {
                    orderKey:record.orderKey,
                    type:'continue'
			    },		
                async: false,				
			    success: function(response){
			        var text = Ext.decode(response.responseText);
		        url = basePath + text.json.path;

/*			        me.basicForm.getForm().reset();
			        me.customerForm.getForm().reset();
			        me.clForm.getForm().reset();
			        me.moneyForm.getForm().reset();
			        me.pt2pn1f5form.getForm().reset();
			        me.probookform.getForm().reset();
			        me.childdetailForm.getForm().reset();*/
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

     //打印出库清单明细A4
	onPrintOrdersItemA4: function(){
		var me = this;
    	var record = me.pt2pn1f1form.getForm().getFieldValues(); 

    	if(record.orderKey == ""){
    		MessageBox.error('错误提示','请选择操作的数据！');
    		return;
    	}
		else
		{
//			console.log(record.orderKey);
			Ext.Ajax.request({
			    url: basePath + '/print/doprintOutboundMenuDetailByA4.action',
			    params: {
                    orderKey:record.orderKey
			    },		
                async: false,				
			    success: function(response){
			    var text = Ext.decode(response.responseText);
		        url = basePath + text.json.path;
/*			        me.basicForm.getForm().reset();
			        me.customerForm.getForm().reset();
			        me.clForm.getForm().reset();
			        me.moneyForm.getForm().reset();
			        me.pt2pn1f5form.getForm().reset();
			        me.probookform.getForm().reset();
			        me.childdetailForm.getForm().reset();*/
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
    
    //打印出库清单明细
	onPrintOrdersItem: function(){
		var me = this;
    	var record = me.pt2pn1f1form.getForm().getFieldValues(); 

    	if(record.orderKey == ""){
    		MessageBox.error('错误提示','请选择操作的数据！');
    		return;
    	}
		else
		{
//			console.log(record.orderKey);
			Ext.Ajax.request({
			    url: basePath + '/outbound/printOrdersCt01.action',
			    params: {
                    orderKey:record.orderKey
			    },		
                async: false,				
			    success: function(response){
			    var text = Ext.decode(response.responseText);
		        url = basePath + text.json.path;
/*			        me.basicForm.getForm().reset();
			        me.customerForm.getForm().reset();
			        me.clForm.getForm().reset();
			        me.moneyForm.getForm().reset();
			        me.pt2pn1f5form.getForm().reset();
			        me.probookform.getForm().reset();
			        me.childdetailForm.getForm().reset();*/
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
    
	 //打印出库清单汇总
	onPrintOrdersSum: function(){
		var me = this;
    	var record = me.pt2pn1f1form.getForm().getFieldValues(); 

    	if(record.orderKey == ""){
    		MessageBox.error('错误提示','请选择操作的数据！');
    		return;
    	}
		else
		{
//			console.log(record.orderKey);
			Ext.Ajax.request({
			    url: basePath + '/outbound/printOrdersCtSum.action',
			    params: {
                    orderKey:record.orderKey
			    },		
                async: false,				
			    success: function(response){
			    var text = Ext.decode(response.responseText);
		        url = basePath + text.json.path;

/*			        me.basicForm.getForm().reset();
			        me.customerForm.getForm().reset();
			        me.clForm.getForm().reset();
			        me.moneyForm.getForm().reset();
			        me.pt2pn1f5form.getForm().reset();
			        me.probookform.getForm().reset();
			        me.childdetailForm.getForm().reset();*/
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
    
        //打印出库清单明细
	onPrintNewOrdersItem: function(){
		var me = this;
    	var record = me.pt2pn1f1form.getForm().getFieldValues(); 
		var pt2pn1f1 = this.pt2pn1f1form.getForm();
    	if(!(pt2pn1f1.isValid())) return;
    	if(record.orderKey == ""){
    		MessageBox.error('错误提示','请选择操作的数据！');
    		return;
    	}
		else
		{
//			console.log(record.orderKey);
			Ext.Ajax.request({
			    url: basePath + '/outbound/doPrintNewSaleOutboundDetail.action',
			    params: {
                    orderKey:record.orderKey
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
    
	 //打印出库清单汇总
	onPrintNewOrdersSum: function(){
		var me = this;
    	var record = me.pt2pn1f1form.getForm().getFieldValues(); 
		var pt2pn1f1 = this.pt2pn1f1form.getForm();
    	if(!(pt2pn1f1.isValid())) return;
    	if(record.orderKey == ""){
    		MessageBox.error('错误提示','请选择操作的数据！');
    		return;
    	}
		else
		{
//			console.log(record.orderKey);
			Ext.Ajax.request({
			    url: basePath + '/outbound/doPrintNewSaleOutboundSum.action',
			    params: {
                    orderKey:record.orderKey
			    },		
                async: false,				
			    success: function(response){
			    var text = Ext.decode(response.responseText);
		        url = basePath + text.json.path;

/*			        me.basicForm.getForm().reset();
			        me.customerForm.getForm().reset();
			        me.clForm.getForm().reset();
			        me.moneyForm.getForm().reset();
			        me.pt2pn1f5form.getForm().reset();
			        me.probookform.getForm().reset();
			        me.childdetailForm.getForm().reset();*/
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
    
	 //套打01
	onPrintSuite01: function(){
		var me = this;
    	var record = me.pt2pn1f1form.getForm().getFieldValues(); 

    	if(record.orderKey == ""){
    		MessageBox.error('错误提示','请选择操作的数据！');
    		return;
    	}
		else
		{
//			console.log(record.orderKey);
			Ext.Ajax.request({
			    url: basePath + '/outbound/PrintSuite01.action',
			    params: {
                    orderKey:record.orderKey
			    },		
                async: false,				
			    success: function(response){
			    var text = Ext.decode(response.responseText);
		        url = basePath + text.json.path;

/*			        me.basicForm.getForm().reset();
			        me.customerForm.getForm().reset();
			        me.clForm.getForm().reset();
			        me.moneyForm.getForm().reset();
			        me.pt2pn1f5form.getForm().reset();
			        me.probookform.getForm().reset();
			        me.childdetailForm.getForm().reset();*/
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
    
    //套打02
	onPrintSuite02: function(){
		var me = this;
    	var record = me.pt2pn1f1form.getForm().getFieldValues(); 

    	if(record.orderKey == ""){
    		MessageBox.error('错误提示','请选择操作的数据！');
    		return;
    	}
		else
		{
//			console.log(record.orderKey);
			Ext.Ajax.request({
			    url: basePath + '/outbound/PrintSuite02.action',
			    params: {
                    orderKey:record.orderKey
			    },		
                async: false,				
			    success: function(response){
			    var text = Ext.decode(response.responseText);
		        url = basePath + text.json.path;

/*			        me.basicForm.getForm().reset();
			        me.customerForm.getForm().reset();
			        me.clForm.getForm().reset();
			        me.moneyForm.getForm().reset();
			        me.pt2pn1f5form.getForm().reset();
			        me.probookform.getForm().reset();
			        me.childdetailForm.getForm().reset();*/
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
    
    //套打03
	onPrintSuite03: function(){
		var me = this;
    	var record = me.pt2pn1f1form.getForm().getFieldValues(); 

    	if(record.orderKey == ""){
    		MessageBox.error('错误提示','请选择操作的数据！');
    		return;
    	}
		else
		{
//			console.log(record.orderKey);
			Ext.Ajax.request({
			    url: basePath + '/outbound/PrintSuite03.action',
			    params: {
                    orderKey:record.orderKey
			    },		
                async: false,				
			    success: function(response){
			    var text = Ext.decode(response.responseText);
		        url = basePath + text.json.path;

/*			        me.basicForm.getForm().reset();
			        me.customerForm.getForm().reset();
			        me.clForm.getForm().reset();
			        me.moneyForm.getForm().reset();
			        me.pt2pn1f5form.getForm().reset();
			        me.probookform.getForm().reset();
			        me.childdetailForm.getForm().reset();*/
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
    
        //套打04
	onPrintSuite04: function(){
		var me = this;
    	var record = me.pt2pn1f1form.getForm().getFieldValues(); 

    	if(record.orderKey == ""){
    		MessageBox.error('错误提示','请选择操作的数据！');
    		return;
    	}
		else
		{
//			console.log(record.orderKey);
			Ext.Ajax.request({
			    url: basePath + '/print/PrintSuiteSouthNorth.action',
			    params: {
                    orderKey:record.orderKey
			    },		
                async: false,				
			    success: function(response){
			    var text = Ext.decode(response.responseText);
		        url = basePath + text.json.path;

/*			        me.basicForm.getForm().reset();
			        me.customerForm.getForm().reset();
			        me.clForm.getForm().reset();
			        me.moneyForm.getForm().reset();
			        me.pt2pn1f5form.getForm().reset();
			        me.probookform.getForm().reset();
			        me.childdetailForm.getForm().reset();*/
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
    
         //套打05
	onPrintSuite05: function(){
		var me = this;
    	var record = me.pt2pn1f1form.getForm().getFieldValues(); 

    	if(record.orderKey == ""){
    		MessageBox.error('错误提示','请选择操作的数据！');
    		return;
    	}
		else
		{
//			console.log(record.orderKey);
			Ext.Ajax.request({
			    url: basePath + '/print/PrintSuiteYuanTong.action',
			    params: {
                    orderKey:record.orderKey
			    },		
                async: false,				
			    success: function(response){
			    var text = Ext.decode(response.responseText);
		        url = basePath + text.json.path;

/*			        me.basicForm.getForm().reset();
			        me.customerForm.getForm().reset();
			        me.clForm.getForm().reset();
			        me.moneyForm.getForm().reset();
			        me.pt2pn1f5form.getForm().reset();
			        me.probookform.getForm().reset();
			        me.childdetailForm.getForm().reset();*/
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
    
    //分配
    onOrderAsign:function(){
        var me = this;
        var record = me.pt2pn1f1form.getForm().getFieldValues(); 
        var orderKeyValue=record.orderKey;
        //分配未结束前禁用收货按钮
        Ext.getCmp('orderBtn').disable();
        
    	if(record.orderKey == ""){
    		MessageBox.error('错误提示','请选择操作的数据！');

            //返回前使能收货按钮
            Ext.getCmp('orderBtn').enable();        
    		return;
    	}else{
			var mask = new Ext.LoadMask(me.getEl(), { 
				msg : 'please wait...' 
			});
			mask.show(); 
		
            Ext.Ajax.request({
			    url: basePath + '/outbound/doOrderAsign.action',
			    params: {
			    	orderKey: record.orderKey
			    },
			    success: function(response){
			        var text = Ext.decode(response.responseText);
			        var success = text.success;
					mask.hide();
			        MessageBox.show(success, text.json.msg);
                    if(true==success)
                    {
                        //主表对应的form不能清空，需要单独更新状态
                        me.sodetailform.getForm().reset();   //清空后明细表状态更新问题就不存在了
                        me.sodetailgrid.getStore().load();
                        me.undetailgrid.getStore().load();
                        me.sogrid.getStore().load();

                        //分配完成时，更新主表状态，并 根据主表状态判断是否需要设置主表的字段为只读
                        Ext.Ajax.request({
                            url: basePath + '/outbound/doQueryOrdersStatus.action',
                            params: {
                                orderKey: orderKeyValue
                            },
                            success: function(response){
                                var text = Ext.decode(response.responseText);
                                var success = text.success;
                                if(0 != text.json.data.length)   //receiptKey唯一，应该只有一条记录
                                {
                                    //更新主表状态
                                    var statusValue=text.json.data[0].status;
                                    me.pt2pn1f1form.getForm().findField('status').setValue(statusValue)
                                    if('0'!=statusValue)
                                    {
                                        me.onSetOrdersReadOnly(true);      //根据状态设置是否可以编辑
                                        me.onSetOrdersKeyReadOnly(true); 
                                    }
                                    if(statusValue=='0'||statusValue=='1'||statusValue=='2')
                                    {   //load 时判断如果状态是0，1，或2可以编辑
                                        me.onSetActualshipdateReadOnly(false);
                                    }
                                    else
                                    {    //其他情况，不能编辑
                                        me.onSetActualshipdateReadOnly(true);
                                    }                                     
                                }
                            }
                        });
                    }
			    },
				timeout: 100000000
			});
    	}
        //分配完成后使能收货按钮
        Ext.getCmp('orderBtn').enable();        
    },

    //发货
    onOrderShip:function(){
        var me = this;
        var record = me.pt2pn1f1form.getForm().getFieldValues(); 
        var orderKeyValue=record.orderKey;
		if(record.carrierReference == ""){
    		MessageBox.error('错误提示','承运商参考号不可为空！');
    		return;
    	}
        //发货未结束前禁用收货按钮
        Ext.getCmp('orderShipFstBtn').disable();
        Ext.getCmp('orderShipBtn').disable();
        
    	if(record.orderKey == ""){
    		MessageBox.error('错误提示','请选择操作的数据！');
            //返回前使能收货按钮
            Ext.getCmp('orderShipFstBtn').enable();
            Ext.getCmp('orderShipBtn').enable();            
    		return;
    	}else{
			Ext.Ajax.request({
		    url: basePath + '/outbound/doValidateOrdersPickedQty.action',
		    params: {
		          orderKey: record.orderKey
		    },
		    success: function(response){
		        var text = Ext.decode(response.responseText);
		        var success = text.success;
		         //用字符串表示查询结果 0，表示无记录，1，表示当前数量小于发货数量
                //如果有记录，需要确认。如果继续，则删除现有的记录，并重新生成。否则退出不做操作
               if(text.json.msg=='1')
				{
				    Ext.MessageBox.confirm('询问提示', '当前拣货数量小于分配数量，确定要发货吗', 
                       function(btn){
                            if(btn == 'yes'){    
                            var mask = new Ext.LoadMask(me.getEl(), { 
							   msg : 'please wait...' 
						        });
							mask.show(); 
						    Ext.Ajax.request({
                                url: basePath + '/outbound/doOrderShip.action',
								params: {
								   	orderKey: record.orderKey
								},
								success: function(response){
								    var text = Ext.decode(response.responseText);
								    var success = text.success;
                                    mask.hide();
								    MessageBox.show(success, text.json.msg);
				                    if(true==success)
				                    {
				                        //主表对应的form不能清空，需要单独更新状态
				                        me.sodetailform.getForm().reset();   //清空后明细表状态更新问题就不存在了
				                        me.sodetailgrid.getStore().load();
                                        me.undetailgrid.getStore().load();
				                        me.sogrid.getStore().load();
				
				                        //分配完成时，更新主表状态，并 根据主表状态判断是否需要设置主表的字段为只读
				                        Ext.Ajax.request({
				                            url: basePath + '/outbound/doQueryOrdersStatus.action',
				                            params: {
				                                orderKey: orderKeyValue
				                            },
				                            success: function(response){
				                                var text = Ext.decode(response.responseText);
				                                var success = text.success;
				                                if(0 != text.json.data.length)   //receiptKey唯一，应该只有一条记录
				                                {
				                                    //更新主表状态
				                                    var statusValue=text.json.data[0].status;
				                                    me.pt2pn1f1form.getForm().findField('status').setValue(statusValue)
				                                    if('0'!=statusValue)
				                                    {
				                                        me.onSetOrdersReadOnly(true);      //根据状态设置是否可以编辑
				                                        me.onSetOrdersKeyReadOnly(true); 
				                                    }
                                                    if(statusValue=='0'||statusValue=='1'||statusValue=='2')
                                                    {   //load 时判断如果状态是0，1，或2可以编辑
                                                        me.onSetActualshipdateReadOnly(false);
                                                    }
                                                    else
                                                    {    //其他情况，不能编辑
                                                        me.onSetActualshipdateReadOnly(true);
                                                    }                                                     
				                                }
				                            }
				                        });
				                    }                    
								},
								timeout: 100000000
							});
							Ext.getCmp('orderShipFstBtn').enable();
							Ext.getCmp('orderShipBtn').enable();    
			                }
                            else
                            {
			                            	 //发货完成后使能收货按钮
                                Ext.getCmp('orderShipFstBtn').enable();
								Ext.getCmp('orderShipBtn').enable();    
			                }
                        }
                    ); 
				}
				else
				{
                   var mask = new Ext.LoadMask(me.getEl(), { 
					msg : 'please wait...' 
					});					
   				    mask.show(); 
					Ext.Ajax.request({
				    url: basePath + '/outbound/doOrderShip.action',
				    params: {
				    	orderKey: record.orderKey
				    },
				    success: function(response){
				        var text = Ext.decode(response.responseText);
				        var success = text.success;
						mask.hide();
				        MessageBox.show(success, text.json.msg);
	                    if(true==success)
	                    {
	                        //主表对应的form不能清空，需要单独更新状态
	                        me.sodetailform.getForm().reset();   //清空后明细表状态更新问题就不存在了
	                        me.sodetailgrid.getStore().load();
                            me.undetailgrid.getStore().load();
	                        me.sogrid.getStore().load();
	
	                        //分配完成时，更新主表状态，并 根据主表状态判断是否需要设置主表的字段为只读
	                        Ext.Ajax.request({
	                            url: basePath + '/outbound/doQueryOrdersStatus.action',
	                            params: {
	                                orderKey: orderKeyValue
	                            },
	                            success: function(response){
	                                var text = Ext.decode(response.responseText);
	                                var success = text.success;
	                                if(0 != text.json.data.length)   //receiptKey唯一，应该只有一条记录
	                                {
	                                    //更新主表状态
	                                    var statusValue=text.json.data[0].status;
	                                    me.pt2pn1f1form.getForm().findField('status').setValue(statusValue)
	                                    if('0'!=statusValue)
	                                    {
	                                        me.onSetOrdersReadOnly(true);      //根据状态设置是否可以编辑
	                                        me.onSetOrdersKeyReadOnly(true); 
	                                    }
                                        if(statusValue=='0'||statusValue=='1'||statusValue=='2')
                                        {   //load 时判断如果状态是0，1，或2可以编辑
                                            me.onSetActualshipdateReadOnly(false);
                                        }
                                        else
                                        {    //其他情况，不能编辑
                                            me.onSetActualshipdateReadOnly(true);
                                        }                                                     
	                                }
	                            }
	                        });
	                    }                    
				    },
					timeout: 100000000
                    });
				}
		    }
			})
    	}
        //发货完成后使能收货按钮
        Ext.getCmp('orderShipFstBtn').enable();
        Ext.getCmp('orderShipBtn').enable();
    },    

    //邮件发送
    onMailSend:function(){
    	var me = this;
        var record1 = me.pt2pn1f1form.getForm().getFieldValues(); 
        var record2 = me.pt2pn1f5form.getForm().getFieldValues(); 
        if(record2.consigneeEmail == ""){
        	 MessageBox.error('错误提示','收货人邮箱为空，不可发送');
        	 return;
        }
        else{
	    	Ext.MessageBox.confirm('询问提示', '确认发送邮件吗？', 
	        function(btn){
	            if(btn == 'yes'){    
			      Ext.Ajax.request({
					   url: basePath + '/outbound/doMailSend.action',
					   params: {
					         orderKey: record1.orderKey,
					         consigneeEmail: record2.consigneeEmail,
					         consigneeKey:record2.consigneeKey
					   },
					   success: function(response){
					      var text = Ext.decode(response.responseText);
						  var data = text.json.data;
//				    	  console.log(data);
					      if(!data==''){
					        MessageBox.show("成功提示","邮件发送成功");
					      }else{
					      	MessageBox.show("成功提示","邮件发送失败");
					      }
					    }
				    })
	            }
	        })
	       }
    },   
    
    
    //销售出库单上传
    onSaleoutboundToK3:function(){
        var me = this;
        var record = me.pt2pn1f1form.getForm().getFieldValues(); 
        var orderKeyValue=record.orderKey;    
        //新增type字段，用于在同一个action中区分不同的功能
        var typeValue='21';   //销售出库单上传
    	var pt2pn1f1 = this.pt2pn1f1form.getForm();
    	if(!(pt2pn1f1.isValid())) return;
    	if(record.orderKey == ""){
    		MessageBox.error('错误提示','请选择操作的数据！');
    		return;
    	}
        else
        {
            var mask = new Ext.LoadMask(me.getEl(), { 
                msg : 'please wait...' 
				});
				mask.show();    
                Ext.Ajax.request({
                url: basePath + '/outbound/doOutboundToK3.action',
                params: {
                      orderKey: record.orderKey,
                      type:typeValue
                },
                success: function(response){
                    var text = Ext.decode(response.responseText);
                    var success = text.success;
                    mask.hide();    
                    me.sogrid.getStore().load();
                    MessageBox.show(success, text.json.msg);
                },
                timeout: 100000000
			})
    	}
    },   
    
    //涂布小分切上传;
    onSpreedOutboundToK3:function(){
        var me = this;
        var record = me.pt2pn1f1form.getForm().getFieldValues(); 
        var orderKeyValue=record.orderKey;    
        //新增type字段，用于在同一个action中区分不同的功能
        var typeValue='24';   //涂布上传;
    	var pt2pn1f1 = this.pt2pn1f1form.getForm();
    	if(!(pt2pn1f1.isValid())) return;
    	if(record.orderKey == ""){
    		MessageBox.error('错误提示','请选择操作的数据！');
    		return;
    	}
        else
        {
            var mask = new Ext.LoadMask(me.getEl(), { 
                msg : 'please wait...' 
				});
				mask.show();    
                Ext.Ajax.request({
                url: basePath + '/outbound/doOutboundToK3.action',
                params: {
                      orderKey: record.orderKey,
                      type:typeValue
                },
                success: function(response){
                    var text = Ext.decode(response.responseText);
                    var success = text.success;
                    mask.hide();    
                    me.sogrid.getStore().load();
                    MessageBox.show(success, text.json.msg);
                },
                timeout: 100000000
			})
    	}
    }, 
    
    //扣账操作;
    onOprAccoutStatus:function(){
        var me = this;
        var record = me.pt2pn1f1form.getForm().getFieldValues(); 
        var orderKeyValue=record.orderKey;    
    	if(record.orderKey == ""){
    		MessageBox.error('错误提示','请选择操作的数据！');
    		return;
    	}
        else
        {
            var mask = new Ext.LoadMask(me.getEl(), { 
                msg : 'please wait...' 
				});
				mask.show();    
                Ext.Ajax.request({
                url: basePath + '/outbound/OnUpdateAccountStatus.action',
                params: {
                      orderKey: record.orderKey
                },
                success: function(response){
                    var text = Ext.decode(response.responseText);
                    var success = text.success;
                    mask.hide();    
                    me.sogrid.getStore().load();
                    MessageBox.show(success, text.json.msg);
                },
                timeout: 100000000
			})
    	}
    },   
    
    // 第二个tab页的上半部分，由多个form组成的tab panel
    createPt2Pn1TabPanel: function(){
    	var me = this;
    	this.pt2pn1tabpanel = Ext.create('Ext.tab.Panel',{
//    		tabPosition: 'bottom', 
    		region: 'center',
    		items: [me.createPt2Pn1F1Form(),me.createPt2Pn1F2Form(),me.createPt2Pn1F3Form(),me.createPt2Pn1F4Form(),me.createPt2Pn1F5Form(),me.createPt2Pn1F6Form(),me.createPt2Pn1F7Form(),me.createPt2Pn1F8Form(),me.createPt2Pn1F9Form()]
    	});
    	return this.pt2pn1tabpanel;
    },

    
//第二个tab页的上半部分的f1位置的form    
    createPt2Pn1F1Form: function(){
    	var me = this;
    	this.pt2pn1f1form = Ext.create('Ext.form.Panel',{
			xtype:'form',
			frame:true,
			title:'基本信息',
			stripeRows : true,
			autoScroll : true,
			viewConfig : {
				forceFit: true,
				autoFill: true
			},
			headerPosition: 'bottom',
	        autoHeight: true,
	        bodyPadding: ' 2 2 5',
	        defaults: {
	        	xtype: 'fieldcontainer',
                hideLabel: true,
	            anchor: '100%',
	            labelWidth: 100
	        },
	        items: [
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 80,
                        margin: '0 0 0 10',
                        xtype: 'textfield',
                        width: 240
                    },
                    items: [
                        {
                            name: 'orderKey',
                            fieldLabel: 'SO编号',
                            readOnly:true,
                            allowBlank: false                            
                        },
                        {
                            name: 'type',
                            fieldLabel: 'SO类型',   //目前用不到
                            xtype:'codecombo',
                            codeType:'SOTYPE',
                            value:'0',
                            allowBlank: false                            
                        },
                        {
                            name: 'status',
                            fieldLabel: 'SO状态',
                            readOnly:true,
                            value:'0',   //改为只读，不能修改
                            xtype:'codecombo',
                            codeType:'SOSTATUS',
                            allowBlank: false                            
                        },
                        {
                            name: 'orderDate',
                            fieldLabel: '创建日期',
                            xtype: 'datefield',
                            format:'Y-m-d H:i:s',
                            allowBlank: false                            
//                            value:Ext.util.Format.date(new Date(),"Y-m-d H:i:s")  //这里设置时间默认值，不会变化，需要移到创建的方法中
                        },
                        {
                            name:'id',
                            hidden: true
                        },
                        {
                            name:'opstatus',
                            hidden: true
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 80,
                        margin: '0 0 0 10',
                        xtype: 'textfield',
                        width: 240
                    },
                    items: [
                        {
                            name: 'storerKey',
                            fieldLabel: '货主',
                            allowBlank: false,
                            listeners:{
                                blur: function(txt){
                                    //输入参数，鼠标离开后见检查该商品是否存在
                                    storerKeyValue=Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(storerKeyValue);
                                    skuValue= me.sodetailform.getForm().findField('sku').getValue();
                                    Ext.Ajax.request({
                                        url: basePath + '/support/doValidateStorers.action',
                                        params: {
                                            storerKey:storerKeyValue
                                        },
                                        success: function(response){    //failure属于连不上服务器的情况，后续补充
                                            var text = Ext.decode(response.responseText);
                                            var success = text.success;
                                            if(0 != text.json.data.length)
                                            {
                                                me.pt2pn1f1form.getForm().findField('storerDescr').setValue(text.json.data[0].company);
                                                me.pt2pn1f2form.getForm().findField('placeofloading').setValue(text.json.data[0].city);
                                                
                                                //此处再判断与sku的校验
                                                if((''!=skuValue)&&(''!=storerKeyValue))
                                                {
                                                    Ext.Ajax.request({
                                                        url: basePath + '/support/doValidateSkus.action',
                                                        params: {
                                                            sku:skuValue,
                                                            storerKey:storerKeyValue
                                                        },
                                                        success: function(response){    //failure属于连不上服务器的情况，后续补充
                                                            var text = Ext.decode(response.responseText);
                                                            var success = text.success;
                                                            if(0 != text.json.data.length)   //storerKey与sku唯一，应该只有一条记录
                                                            {
                                                                me.sodetailform.getForm().findField('name').setValue(text.json.data[0].name);
                                                                me.sodetailform.getForm().findField('descr').setValue(text.json.data[0].descr);
                                                            }
                                                            else
                                                            {
                                                                me.sodetailform.getForm().findField('name').setValue('');
                                                                me.sodetailform.getForm().findField('descr').setValue('');
                                                                me.sodetailform.getForm().findField('sku').setValue('');
                                                                //Ext.Msg.alert("错误提示", '货主或者商品不存在')
                                                                MessageBox.show(false, '货主或者商品不存在');
                                                            }
                                                        }
                                                    })
                                                }                                                  
												if(''!=storerKeyValue)
                                                {
													Ext.Ajax.request({
														url: basePath + '/inbound/doQueryLotKey.action',
														params: {
															storerKey:storerKeyValue
														},
														success: function(response){
															var text = Ext.decode(response.responseText);
															var status = text.success;
															if(0==text.json.data.length)
															{
																MessageBox.show(false, '没有相应的记录，请重新输入！');   
															}else{
																//先把11个批属性load过来
																me.sodetailform.getForm().findField('lottable04').setValue(text.json.data[0].socontent04);
																me.sodetailform.getForm().findField('lottable05').setValue(text.json.data[0].socontent05);
																me.sodetailform.getForm().findField('lottable06').setValue(text.json.data[0].socontent06);
																me.sodetailform.getForm().findField('lottable07').setValue(text.json.data[0].socontent07);
																me.sodetailform.getForm().findField('lottable08').setValue(text.json.data[0].socontent08);
																me.sodetailform.getForm().findField('lottable09').setValue(text.json.data[0].socontent09);
																me.sodetailform.getForm().findField('lottable10').setValue(text.json.data[0].socontent10);
																//此处不需要为lottable11设值，因为包装会设置，此处若设值，会将lottable11覆盖
																//me.sodetailform.getForm().findField('lottable11').setValue(text.json.data[0].socontent11);
																me.sodetailform.getForm().findField('lottable13').setValue(text.json.data[0].socontent13);
																me.sodetailform.getForm().findField('lottable14').setValue(text.json.data[0].socontent14);
																me.sodetailform.getForm().findField('lottable15').setValue(text.json.data[0].socontent15);
																	
																//设置是否为必填项
																var format01=text.json.data[0].format01;
																if(format01==2){
																	me.sodetailform.getForm().findField('lottable01').format='Y-m-d';
																}else if(format01==3){
																	me.sodetailform.getForm().findField('lottable01').format='Y-m-d H:i:s';
																}
																var format02=text.json.data[0].format02;
																if(format02==2){
																	me.sodetailform.getForm().findField('lottable02').format='Y-m-d';
																}else if(format02==3){
																	me.sodetailform.getForm().findField('lottable02').format='Y-m-d H:i:s';
																}
																var format03=text.json.data[0].format03;
																if(format03==2){
																	me.sodetailform.getForm().findField('lottable03').format='Y-m-d';
																}else if(format03==3){
																	me.sodetailform.getForm().findField('lottable03').format='Y-m-d H:i:s';
																}
															}
														}       
													});
												}
                                            }
                                            else
                                            {
                                                me.pt2pn1f1form.getForm().findField('storerDescr').setValue('');
                                               MessageBox.show(false,'货主不存在')
                                            }
                                        }
                                    })
                                }                                
                            }
                        },
                        {
                            name: 'storerDescr',
                            fieldLabel: '货主名称',
                            allowBlank: false                            
                        },
                        {
                            name: 'dateStart',
                            fieldLabel: '预期发货日期',
                            xtype: 'datefield',
                            format:'Y-m-d H:i:s',
                            value: Ext.util.Format.date(new Date(),"Y-m-d")     //初始值是当天日期，时分秒自动填0
                        },
                        {name: 'dateEnd',fieldLabel: '------>',xtype: 'datefield',format:'Y-m-d H:i:s'}
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 80,
                        margin: '0 0 0 10',
                        xtype: 'textfield',
                        width: 240
                    },
                    items: [
                        {name: 'orderNumber',fieldLabel: '客户订单号'},
                        {name: 'dock',fieldLabel: '收货平台',xtype: 'combobox'},
                        {
                            name: 'actualshipdate',
                            fieldLabel: '实际发货日期',
                            xtype: 'datefield',
                            format:'Y-m-d H:i:s',
                            value: Ext.util.Format.date(new Date(),"Y-m-d")     //初始值是当天日期，时分秒自动填0
                        },
                        {name: 'deliveryDate',fieldLabel: '提货日期',xtype: 'datefield',format:'Y-m-d H:i:s'}
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 80,
                        margin: '0 0 0 10',
                        xtype: 'textfield',
                        width: 240
                    },
                    items: [
                        {name: 'retailReference',fieldLabel: '分销商参考号'},
                        {name: 'buyerpo',fieldLabel: '采购商PO号'},
                        {name: 'carrierReference',fieldLabel: '承运商参考号'},
                        {name: 'warehouseReference',fieldLabel: '仓库参考号'}
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 80,
                        width : 240,
                        margin: '0 0 0 10',
                        xtype: 'textfield'
                    },
                    items: [
                        {name: 'otherReference1',fieldLabel: '其他参考号1'},
                        {name: 'otherReference2',fieldLabel: '其他参考号2'},
                        {name: 'otherReference3',fieldLabel: '其他参考号3'},
                        {name: 'otherReference4',fieldLabel: '其他参考号4'},
                        {name: 'externorderkey',hidden:true},
                        {
                            xtype:'datefield',    //隐藏字段，放置存盘被清空
                            format:'Y-m-d H:i:s',
                            name: 'addDate',
                            hidden:true
                        },
                        {
                            xtype:'textfield',    //隐藏字段，放置存盘被清空
                            name: 'addWho',
                            hidden:true
                        }                         
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 80,
                        width : 240,
                        margin: '0 0 0 10',
                        xtype: 'textfield'
                    },
                    items: [
//                    	{name: 'createWho', allowBlank: false,fieldLabel: '制单员',xtype:'codecombo', codeType:'ASNACCEPTER'},
                        {name: 'shipper', allowBlank: false,fieldLabel: '发货员',xtype:'codecombo', codeType:'ASNACCEPTER'},
                        {name: 'checker', allowBlank: false,fieldLabel: '复核员',xtype:'codecombo', codeType:'ASNACCEPTER'}
                    ]
                }
            ]
    	});
    	return this.pt2pn1f1form;
    },

//第二个tab页的上半部分的f2位置的form，运输信息   
    createPt2Pn1F2Form: function(){
    	this.pt2pn1f2form = Ext.create('Ext.form.Panel',{
			xtype:'form',
			frame:true,
			headerPosition: 'bottom',
			title:'运输信息',
	        autoHeight: true,
	        bodyPadding: 1,
        	stripeRows : true,
			autoScroll : true,
			viewConfig : {
				forceFit: true,
				autoFill: true
			},
	        defaults: {
	        	xtype: 'fieldcontainer',
                hideLabel: true,
	            anchor: '100%',
	            labelWidth: 100
	        },
	        items: [
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 90,
                        width: 240,
                        margin: '2 0 0 10',
                        xtype: 'textfield'
                    },
                    items: [
                        {name: 'vesselType',fieldLabel: '车型',readOnly:true},
                        {name: 'vesselDate',fieldLabel: '装车时间',xtype: 'datefield',format:'Y-m-d H:i:s'},
                        {name: 'placeofloading',fieldLabel: '装车地点'},
                        {name: 'origincountry',fieldLabel: '原产国',xtype: 'combobox'}
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 90,
                        width: 240,
                        margin: '2 0 0 10',
                        xtype: 'textfield'
                    },
                    items: [
                        {name: 'vesselNo',fieldLabel: '车牌号',readOnly:true},  
                        {name: 'placeofdischarge',fieldLabel: '卸货地点'},
                        {name: 'placeofdelivery',fieldLabel: '交货地点'},  
                        {name: 'destination',fieldLabel: '目的地',xtype: 'combobox'}
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 90,
                        width: 240,
                        margin: '2 0 0 10',
                        xtype: 'textfield'
                    },
                    items: [
                        {name: 'driver',fieldLabel: '司机'},
                        {name: 'paymentTerms',fieldLabel: '支付方式',xtype: 'combobox'},
                        {name: 'paymentNotes',fieldLabel: '支付描述'},
                        {name: 'paymentTerms',fieldLabel: '运输路线',xtype: 'combobox'}
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 90,
                        width: 240,
                        margin: '2 0 0 10',
                        xtype: 'combobox'
                    },
                    items: [
                        {name: 'transMethod',fieldLabel: '运输方式'},
                        {name: 'incoTerms',fieldLabel: '交货方式'},
                        {name: 'deliveryNotes',fieldLabel: '交货描述'}
                    ]
                }
            ]
    	});
    	return this.pt2pn1f2form;
    },

//第二个tab页的上半部分的f3位置的form，采购商信息
    createPt2Pn1F3Form:function(){
        var me=this;
		this.pt2pn1f3form = Ext.create('Ext.form.Panel',{
			xtype:'form',
			frame:true,
			layout: 'vbox',
			headerPosition: 'bottom',
			title:'采购商信息',
        	stripeRows : true,
			autoScroll : true,
			viewConfig : {
				forceFit: true,
				autoFill: true
			},
	        bodyPadding: 1,
	        defaults: {
	        	xtype: 'fieldcontainer',
                hideLabel: true,
	            anchor: '100%',
	            labelWidth: 100
	        },
	        items: [
                {
                    xtype: 'fieldcontainer',
                    frame: false,
                    defaults: {
                        xtype: 'fieldcontainer'
                    },
                    items: [
                        {
                            layout: 'hbox',
                            defaults:{
                                labelWidth: 80,
                                width: 360,
                                margin: '1 0 0 10',
                                xtype: 'textfield'
                            },
                            items: [
                                {
                                    name: 'buyer',
                                    fieldLabel: '采购商',
                                    listeners:{
                                        blur: function(txt){
                                            buyerValue=Ext.util.Format.uppercase(txt.getValue());
                                            txt.setValue(buyerValue);
                                            Ext.Ajax.request({
                                                url: basePath + '/support/doValidateStorers.action',
                                                params: {
                                                    storerKey:buyerValue
                                                },
                                                success: function(response){    //failure属于连不上服务器的情况，后续补充
                                                    var text = Ext.decode(response.responseText);
                                                    var success = text.success;
                                                    if(0 != text.json.data.length)
                                                    {   //缺少很多字段，待补充 qxue
                                                        me.pt2pn1f3form.getForm().findField('buyerCompany').setValue(text.json.data[0].company);
                                                        me.pt2pn1f3form.getForm().findField('buyerAddress').setValue(text.json.data[0].address1);
                                                        me.pt2pn1f3form.getForm().findField('buyerContact').setValue(text.json.data[0].contact);
                                                        me.pt2pn1f3form.getForm().findField('buyerMobile').setValue(text.json.data[0].mobile);
                                                        me.pt2pn1f3form.getForm().findField('buyerTel').setValue(text.json.data[0].tel);
                                                        me.pt2pn1f3form.getForm().findField('buyerNation').setValue(text.json.data[0].nation);
                                                        me.pt2pn1f3form.getForm().findField('buyerProvince').setValue(text.json.data[0].province);
                                                        me.pt2pn1f3form.getForm().findField('buyerCity').setValue(text.json.data[0].city);
                                                        me.pt2pn1f3form.getForm().findField('buyerCounty').setValue(text.json.data[0].county);
                                                        me.pt2pn1f3form.getForm().findField('buyerPosition').setValue(text.json.data[0].position);
                                                        me.pt2pn1f3form.getForm().findField('buyerFax').setValue(text.json.data[0].fax);
                                                        me.pt2pn1f3form.getForm().findField('buyerEmail').setValue(text.json.data[0].email);
                                                    }
                                                }
                                            })                                    
                                        }
                                    }                                 
                                },
                                {name: 'buyerCompany',fieldLabel: '采购商名称',margin: '1 0 0 20'}
                            ]
                        },
                        {
                            layout: 'hbox',
                            defaults:{
                                labelWidth: 80,
                                width: 177,
                                margin: '1 0 0 10',
                                xtype: 'textfield'
                            },
                            items: [
                                {name: 'buyerNation',fieldLabel: '国家'},
                                {name: 'buyerProvince',fieldLabel: '省份'},
                                {name: 'buyerCity',fieldLabel: '城市'},
                                {name: 'buyerCounty',fieldLabel: '县区'}
                            ]    
                        },
                        {
                            layout: 'hbox',
                            defaults:{
                                labelWidth: 80,
                                width: 240,
                                margin: '1 0 0 10',
                                xtype: 'textfield'
                            },
                            items: [
                                {name: 'buyerAddress',fieldLabel: '地址',width: 600}
                            ]
                        },
                        {
                            layout: 'hbox',
                            defaults:{
                                labelWidth: 80,
                                width: 240,
                                margin: '1 0 0 10',
                                xtype: 'textfield'
                            },
                            items: [
                                {name: 'buyerContact',fieldLabel: '联系人'},
                                {name: 'buyerMobile',fieldLabel: '手机'},
                                {name: 'buyerTel',fieldLabel: '电话'}
                            ]
                        },
                        {
                            layout: 'hbox',
                            defaults:{
                                labelWidth: 80,
                                width: 240,
                                margin: '1 0 0 10',
                                xtype: 'textfield'
                            },
                            items: [
                                {name: 'buyerPosition',fieldLabel: '职务'},
                                {name: 'buyerFax',fieldLabel: '传真'},
                                {name: 'buyerEmail',fieldLabel: '邮箱'}
                            ]
                        }
                    ]
                }
            ]
	    });
	    return this.pt2pn1f3form;
	},	

    

//第二个tab页的上半部分的f4位置的form，从商家信息分离出来的    
    createPt2Pn1F4Form:function(){
        var me=this;
		this.pt2pn1f4form = Ext.create('Ext.form.Panel',{
			xtype:'form',
			frame:true,
			layout: 'vbox',
			headerPosition: 'bottom',
			title:'结算方信息',
        	stripeRows : true,
			autoScroll : true,
			viewConfig : {
				forceFit: true,
				autoFill: true
			},
	        bodyPadding: 1,
	        defaults: {
	        	xtype: 'fieldcontainer',
                hideLabel: true,
	            anchor: '100%',
	            labelWidth: 100
	        },
	        items: [
                {
                    xtype: 'fieldcontainer',
                    frame: false,
                    defaults: {
                        xtype: 'fieldcontainer'
                    },
                    items: [
                    { 
                        layout: 'hbox',
                        defaults:{
                            labelWidth: 80,
                            width: 360,
                            margin: '2 0 0 10',
                            xtype: 'textfield'
                        },
                        items: [
                            {
                                name: 'billto',
                                fieldLabel: '结算方',
                                listeners:{
                                    blur: function(txt){
                                        billtoValue=Ext.util.Format.uppercase(txt.getValue());
                                        txt.setValue(billtoValue);
                                        Ext.Ajax.request({
                                            url: basePath + '/support/doValidateStorers.action',
                                            params: {
                                                storerKey:billtoValue
                                            },
                                            success: function(response){    //failure属于连不上服务器的情况，后续补充
                                                var text = Ext.decode(response.responseText);
                                                var success = text.success;
                                                if(0 != text.json.data.length)
                                                {   //缺少很多字段，待补充 qxue
                                                    me.pt2pn1f4form.getForm().findField('billtoName').setValue(text.json.data[0].company);
                                                    me.pt2pn1f4form.getForm().findField('billtoAddress').setValue(text.json.data[0].address1);
                                                    me.pt2pn1f4form.getForm().findField('billtoContact').setValue(text.json.data[0].contact);
                                                    me.pt2pn1f4form.getForm().findField('billtoMobile').setValue(text.json.data[0].mobile);
                                                    me.pt2pn1f4form.getForm().findField('billtoTel').setValue(text.json.data[0].tel);
                                                    me.pt2pn1f4form.getForm().findField('billtoNation').setValue(text.json.data[0].nation);
                                                    me.pt2pn1f4form.getForm().findField('billtoProvince').setValue(text.json.data[0].province);
                                                    me.pt2pn1f4form.getForm().findField('billtoCity').setValue(text.json.data[0].city);
                                                    me.pt2pn1f4form.getForm().findField('billtoCounty').setValue(text.json.data[0].county);
                                                    me.pt2pn1f4form.getForm().findField('billtoPosition').setValue(text.json.data[0].position);
                                                    me.pt2pn1f4form.getForm().findField('billtoFax').setValue(text.json.data[0].fax);
                                                    me.pt2pn1f4form.getForm().findField('billtoEmail').setValue(text.json.data[0].email);
                                                }
                                            }
                                        })                                    
                                    }
                                }                             
                            },
                            {name: 'billtoName',fieldLabel: '结算方名称',margin: '2 0 0 20'}
                        ]
                    },
                    {
                        layout: 'hbox',
                        defaults:{
                            labelWidth: 80,
                            width: 177,
                            margin: '2 0 0 10',
                            xtype: 'textfield'
                        },
                        items: [
                            {name: 'billtoNation',fieldLabel: '国家'},
                            {name: 'billtoProvince',fieldLabel: '省份'},
                            {name: 'billtoCity',fieldLabel: '城市'},
                            {name: 'billtoCounty',fieldLabel: '县区'}
                        ]
                    },
                    {
                        layout: 'hbox',
                        defaults:{
                            labelWidth: 80,
                            width: 240,
                            margin: '2 0 0 10',
                            xtype: 'textfield'
                        },
                        items: [
                            {name: 'billtoAddress',fieldLabel: '地址',width: 600}
                        ]
                    },
                    {
                        layout: 'hbox',
                        defaults:{
                            labelWidth: 80,
                            width: 240,
                            margin: '2 0 0 10',
                            xtype: 'textfield'
                        },
                        items: [
                            {name: 'billtoContact',fieldLabel: '联系人'},
                            {name: 'billtoMobile',fieldLabel: '手机'},
                            {name: 'billtoTel',fieldLabel: '电话'}
                        ]
                    },
                    {
                        layout: 'hbox',
                        defaults:{
                            labelWidth: 80,
                            width: 240,
                            margin: '2 0 0 10',
                            xtype: 'textfield'
                        },
                        items: [
                            {name: 'billtoPosition',fieldLabel: '职务'},
                            {name: 'billtoFax',fieldLabel: '传真'},
                            {name: 'billtoEmail',fieldLabel: '邮箱'}
                        ]
                    }
                    ]
                }
            ]
	    });
	    return this.pt2pn1f4form;
	},	

    
//第二个tab页的上半部分的f5位置的form，从商家信息分离出来的    
    createPt2Pn1F5Form:function(){
        var me=this;
		this.pt2pn1f5form = Ext.create('Ext.form.Panel',{
			xtype:'form',
			frame:true,
			layout: 'vbox',
			headerPosition: 'bottom',
			title:'收货方信息',
        	stripeRows : true,
			autoScroll : true,
			viewConfig : {
				forceFit: true,
				autoFill: true
			},
	        bodyPadding: 1,
	        defaults: {
	        	xtype: 'fieldcontainer',
                hideLabel: true,
	            anchor: '100%',
	            labelWidth: 100
	        },
	        items: [
                {
                    xtype: 'fieldcontainer',
                    frame: false,
                    border: false,
                    defaults: {
                        xtype: 'fieldcontainer'
                    },
                    items: [
                        {
                            layout: 'hbox',
                            defaults:{
                                labelWidth: 80,
                                width: 360,
                                margin: '2 0 0 10',
                                xtype: 'textfield'
                            },
                            items: [
                                {
                                    fieldLabel: '收货方',
                                    name:'consigneeKey',
                                    listeners:{
                                        blur: function(txt){
                                            consigneeKeyValue=Ext.util.Format.uppercase(txt.getValue());
                                            txt.setValue(consigneeKeyValue); 
                                            Ext.Ajax.request({
                                                url: basePath + '/support/doValidateStorers.action',
                                                params: {
                                                    storerKey:consigneeKeyValue
                                                },
                                                success: function(response){    //failure属于连不上服务器的情况，后续补充
                                                    var text = Ext.decode(response.responseText);
                                                    var success = text.success;
                                                    if(0 != text.json.data.length)
                                                    {   //缺少很多字段，待补充 qxue
                                                        me.pt2pn1f5form.getForm().findField('consigneeCompany').setValue(text.json.data[0].company);
                                                        me.pt2pn1f5form.getForm().findField('consigneeAddress').setValue(text.json.data[0].address1);
                                                        me.pt2pn1f5form.getForm().findField('consigneeContact').setValue(text.json.data[0].contact);
                                                        me.pt2pn1f5form.getForm().findField('consigneeMobile').setValue(text.json.data[0].mobile);
                                                        me.pt2pn1f5form.getForm().findField('consigneeTel').setValue(text.json.data[0].tel);
                                                        me.pt2pn1f5form.getForm().findField('consigneeNation').setValue(text.json.data[0].nation);
                                                        me.pt2pn1f5form.getForm().findField('consigneeProvince').setValue(text.json.data[0].province);
                                                        me.pt2pn1f5form.getForm().findField('consigneeCity').setValue(text.json.data[0].city);
                                                        me.pt2pn1f5form.getForm().findField('consigneeCounty').setValue(text.json.data[0].county);
                                                        me.pt2pn1f5form.getForm().findField('consigneePosition').setValue(text.json.data[0].position);
                                                        me.pt2pn1f5form.getForm().findField('consigneeFax').setValue(text.json.data[0].fax);
                                                        me.pt2pn1f5form.getForm().findField('consigneeEmail').setValue(text.json.data[0].email);
                                                        me.pt2pn1f2form.getForm().findField('placeofdelivery').setValue(text.json.data[0].city);
                                                    }
                                                }
                                            })                                    
                                        }
                                    } 
                                },
                                {
                                    fieldLabel: '收货方名称',
                                    name:'consigneeCompany',
                                    margin: '2 0 0 20'
                                }
                            ]
                        },
                        {
                            layout: 'hbox',
                            defaults:{
                                labelWidth: 80,
                                width: 177,
                                margin: '2 0 0 10',
                                xtype: 'textfield'
                            },
                            items: [
                                {name: 'consigneeNation',fieldLabel: '国家'},
                                {name: 'consigneeProvince',fieldLabel: '省份'},
                                {name: 'consigneeCity',fieldLabel: '城市'},
                                {name: 'consigneeCounty',fieldLabel: '县区'}
                            ]    
                        },
                        {
                            layout: 'hbox',
                            defaults:{
                                labelWidth: 80,
                                width: 240,
                                margin: '2 0 0 10',
                                xtype: 'textfield'
                            },
                            items: [
                                {name: 'consigneeAddress',fieldLabel: '地址',width: 600}
                            ]
                        },
                        {
                            layout: 'hbox',
                            defaults:{
                                labelWidth: 80,
                                width: 240,
                                margin: '2 0 0 10',
                                xtype: 'textfield'
                            },
                            items: [
                                {name: 'consigneeContact',fieldLabel: '联系人'},
                                {name: 'consigneeMobile',fieldLabel: '手机'},
                                {name: 'consigneeTel',fieldLabel: '电话'}
                            ]
                        },
                        {
                            layout: 'hbox',
                            defaults:{
                                labelWidth: 80,
                                width: 240,
                                margin: '2 0 0 10',
                                xtype: 'textfield'
                            },
                            items: [
                                {name: 'consigneePosition',fieldLabel: '职务'},
                                {name: 'consigneeFax',fieldLabel: '传真'},
                                {name: 'consigneeEmail',fieldLabel: '邮箱'}
                            ]
                        }
                    ]
                }
            ]
	    });
	    return this.pt2pn1f5form;
	},	

    
//第二个tab页的上半部分的f6位置的form，从商家信息分离出来的    
    createPt2Pn1F6Form:function(){
    	var me=this;
		this.pt2pn1f6form = Ext.create('Ext.form.Panel',{
			xtype:'form',
			frame:true,
			layout: 'vbox',
			headerPosition: 'bottom',
			title:'承运方信息',
        	stripeRows : true,
			autoScroll : true,
			viewConfig : {
				forceFit: true,
				autoFill: true
			},
	        bodyPadding: 1,
	        defaults: {
	        	xtype: 'fieldcontainer',
                hideLabel: true,
	            anchor: '100%',
	            labelWidth: 100
	        },
	        items: [
                {
                    xtype: 'fieldcontainer',
                    frame: false,
                    border: false,
                    defaults: {
                        xtype: 'fieldcontainer'
                    },
                    items: [
                        {
                            layout: 'hbox',
                            defaults:{
                                labelWidth: 80,
                                width: 360,
                                margin: '2 0 0 10',
                                xtype: 'textfield'
                            },
                            items: [
                                {
                                    name: 'carrierKey',
                                    fieldLabel: '承运人',
                                       listeners:{
                                        blur: function(txt){
                                            carrierKeyValue=Ext.util.Format.uppercase(txt.getValue());
                                            txt.setValue(carrierKeyValue); 
                                            Ext.Ajax.request({
                                                url: basePath + '/support/doValidateStorers.action',
                                                params: {
                                                    storerKey:carrierKeyValue
                                                },
                                                success: function(response){    //failure属于连不上服务器的情况，后续补充
                                                    var text = Ext.decode(response.responseText);
                                                    var success = text.success;
                                                    if(0 != text.json.data.length)
                                                    {   //缺少很多字段，待补充 qxue
                                                        me.pt2pn1f6form.getForm().findField('carrierCompany').setValue(text.json.data[0].company);
                                                        me.pt2pn1f6form.getForm().findField('carrierAddress').setValue(text.json.data[0].address1);
                                                        me.pt2pn1f6form.getForm().findField('carrierContact').setValue(text.json.data[0].contact);
                                                        me.pt2pn1f6form.getForm().findField('carrierMobile').setValue(text.json.data[0].mobile);
                                                        me.pt2pn1f6form.getForm().findField('carrierTel').setValue(text.json.data[0].tel);
                                                        me.pt2pn1f6form.getForm().findField('carrierNation').setValue(text.json.data[0].nation);
                                                        me.pt2pn1f6form.getForm().findField('carrierProvince').setValue(text.json.data[0].province);
                                                        me.pt2pn1f6form.getForm().findField('carrierCity').setValue(text.json.data[0].city);
                                                        me.pt2pn1f6form.getForm().findField('carrierCounty').setValue(text.json.data[0].county);
                                                        me.pt2pn1f6form.getForm().findField('carrierPosition').setValue(text.json.data[0].position);
                                                        me.pt2pn1f6form.getForm().findField('carrierFax').setValue(text.json.data[0].fax);
                                                        me.pt2pn1f6form.getForm().findField('carrierEmail').setValue(text.json.data[0].email);
                                                    }
                                                }
                                            })                                    
                                        }
                                    } 
                                },
                                {name: 'carrierCompany',fieldLabel: '承运人名称',margin: '2 0 0 20'}
                            ]
                        },
                        {
                            layout: 'hbox',
                            defaults:{
                                labelWidth: 80,
                                width: 177,
                                margin: '2 0 0 10',
                                xtype: 'textfield'
                            },
                            items: [
                                {name: 'carrierNation',fieldLabel: '国家'},
                                {name: 'carrierProvince',fieldLabel: '省份'},
                                {name: 'carrierCity',fieldLabel: '城市'},
                                {name: 'carrierCounty',fieldLabel: '地区'}
                            ]
                        },
                        {
                            layout: 'hbox',
                            defaults:{
                                labelWidth: 80,
                                width: 240,
                                margin: '2 0 0 10',
                                xtype: 'textfield'
                            },
                            items: [
                                {name: 'carrierAddress',fieldLabel: '地址',width: 600}
                            ]
                        },
                        {
                            layout: 'hbox',
                            defaults:{
                                labelWidth: 80,
                                width: 240,
                                margin: '2 0 0 10',
                                xtype: 'textfield'
                            },
                            items: [
                                {name: 'carrierContact',fieldLabel: '联系人'},
                                {name: 'carrierMobile',fieldLabel: '手机'},
                                {name: 'carrierTel',fieldLabel: '电话'}
                            ]
                        },
                        {
                            layout: 'hbox',
                            defaults:{
                                labelWidth: 80,
                                width: 240,
                                margin: '2 0 0 10',
                                xtype: 'textfield'
                            },
                            items: [
                                {name: 'carrierPosition',fieldLabel: '职务'},
                                {name: 'carrierFax',fieldLabel: '传真'},
                                {name: 'carrierEmail',fieldLabel: '邮箱'}
                            ]
                        }
                    ]
                }
            ]
	    });
	    return this.pt2pn1f6form;
	},	

//第二个tab页的上半部分的f7位置的form    
	createPt2Pn1F7Form: function(){
		var me = this;
		this.pt2pn1f7form = Ext.create('Ext.form.Panel',{
			title:'费收信息',
			frame: true,
        	stripeRows : true,
			autoScroll : true,
			viewConfig : {
				forceFit: true,
				autoFill: true
			},
			layout: 'border',
	        items: [
                {
                    xtype: 'fieldcontainer',
                    frame: false,
                    region: 'west',
                    layout: 'vbox',
                    defaults: {
                        xtype: 'textfield',
                        margin: '10 0 0 5',
                       // labelAlign: 'top',
                       labelWidth: 60,
                        width: 240
                    },
                    items: [
                        {
                            fieldLabel: '收费日期',
                            xtype: 'datefield',
                            margin: '15 0 0 5',
                            format:'Y-m-d H:i:s'
                        },
                        {
                            fieldLabel: '收费类型'  //注意要改combox
                        },
                        {
                            fieldLabel: '描述'
                        }
                    ]
                },
            me.createMoneyGrid()]
	    });
	    return this.pt2pn1f7form;
	},


//第二个tab页的上半部分的f7位置form上的grid
	createMoneyGrid: function(){
		this.moneygrid = Ext.create('widget.moneygrid',{
			region: 'center'
		});
		return this.moneygrid;
	},

//第二个tab页的上半部分的f8位置的form    
	createPt2Pn1F8Form: function(){
		var me = this;
		this.pt2pn1f8form = Ext.create('Ext.form.Panel',{
			title: '其他信息',
			layout: 'border',
			autoScroll : true,
			items: [
            {
				xtype: 'fieldcontainer',
				region: 'west',
				layout: 'vbox',
				defaults: {
					xtype: 'fieldcontainer',
					margin: '1 10 0 3'
				},
				stripeRows : true,
				autoScroll : true,
				viewConfig : {
					forceFit: true,
					autoFill: true
				},
				items: [
                    {
                        layout: 'hbox',
                        defaults: {
                            xtype: 'textfield',
    						margin: '2 0 0 0',   //最终margin是两个之和
    //						labelAlign: 'top',
                            labelWidth: 55
                        },
                        items: [
                            {
                                fieldLabel: '集装箱号'
                            },
                            {  
                                fieldLabel: '类型'
                            }
                        ]
                    },
                    {
                        layout: 'hbox',
                        defaults: {
                            xtype: 'textfield',
    //						margin: '5 0 0 5',
    //						labelAlign: 'top',
                            labelWidth: 55
                        },
                        items: [
                            {
                                fieldLabel: '尺寸'
                            },
                            {
                                fieldLabel: '铅封号'
                            }
                        ]
                    },
                    {
                        layout: 'hbox',
                        defaults: {
                            xtype: 'textfield',
    //						margin: '5 0 0 5',
    //						labelAlign: 'top',
                            labelWidth: 55
                        },
                        items: [
                            {
                                fieldLabel: '总数'
                            },
                            {
                                fieldLabel: '总体积'
                            }
                        ]
                    },
                    {
                        layout: 'hbox',
                        defaults: {
                            xtype: 'textfield',
    //						margin: '5 0 0 5',
    //						labelAlign: 'top',
                            labelWidth: 55
                        },
                        items: [
                            {
                                fieldLabel: '总净重'
                            },
                            {
                                fieldLabel: '总毛重'					
                            }
                        ]
                    },
                    {
                        layout: 'hbox',
                        defaults: {
                            xtype: 'textfield',
    //						margin: '5 0 0 5',
    //						labelAlign: 'top',
                            labelWidth: 55
                        },
                        items: [
                            {
                                fieldLabel: '备注'
                            },
                            {
                                fieldLabel: '重量'
                            }
                        ]
                    }
                ]
			},me.createOtherGrid()]
		});
		return this.pt2pn1f8form;
	},

//第二个tab页的上半部分的f8位置form上的grid
	createOtherGrid: function(){
		this.othergrid = Ext.create('widget.othergrid',{
			region: 'center'
		});
		return this.othergrid;
	},


//第二个tab页上半部分f9位置，自定义，把基本信息中的自定义部分和备注拿过来    
	createPt2Pn1F9Form: function(){
		var me = this;
		this.pt2pn1f9form = Ext.create('Ext.form.Panel',{
			xtype:'form',
			frame:true,
			headerPosition: 'bottom',
			title:'自定义',
	        autoHeight: true,
	        stripeRows : true,
			autoScroll : true,
			viewConfig : {
				forceFit: true,
				autoFill: true
			},
	        bodyPadding: 1,
	        layout: 'vbox',
	        defaults: {
	        	xtype: 'fieldcontainer',
                hideLabel: true,
	            anchor: '100%',
	            labelWidth: 100
	        },
	        items: [
                {
                    xtype: 'fieldcontainer',
                    frame: false,
                    defaults: {
                        xtype: 'fieldcontainer'
                    },
                    items: [
                        {
                            layout: 'hbox',
                            defaults:{
                                labelWidth: 80,
                                width: 240,
                                margin: '2 0 0 10',
                                xtype: 'textfield'
                            },
                            items: [
                                {   
                                    xtype: 'textfield',
                                    name: 'susr1',
                                    fieldLabel: '用户自定义1'
                                },
                                {   
                                    xtype: 'textfield',
                                    name: 'susr2',
                                    fieldLabel: '用户自定义2'
                                },
                                {   
                                    xtype: 'textfield',
                                    name: 'susr3',
                                    fieldLabel: '用户自定义3'
                                },
                                {   
                                	 xtype: 'button',
                                     iconCls: 'icon-create',
      			                     text: '计算',
			                         scope: this,
			                         width: 60,
			                         labelWidth: 40,
			                         handler: this.onComputeSusr
                                },
                                 {   
                                 	 xtype: 'button',
                                     iconCls: 'icon-save',
                                      width: 60,
      			                     text: '保存',
			                         scope: this,
			                         labelWidth: 40,
			                         handler: this.onSaveSusr
                                }
                            ]
                        },
                        {
                            layout: 'hbox',
                            defaults:{
                                labelWidth: 80,
                                width: 240,
                                margin: '2 0 0 10',
                                xtype: 'textfield'
                            },
                            items: [
                                {   
                                    xtype: 'textfield',
                                    name: 'susr4',
                                    fieldLabel: '用户自定义4'
                                },
                                {   
                                    xtype: 'textfield',
                                    name: 'susr5',
                                    fieldLabel: '用户自定义5'
                                },
                                {   
                                    xtype: 'textfield',
                                    name: 'susr10',
                                    fieldLabel: '用户自定义6'
                                }
                            ]    
                        },
                        {
                            layout: 'hbox',
                            defaults:{
                                labelWidth: 90,
                                width: 240,
                                margin: '15 0 0 10',
                                xtype: 'textfield'
                            },
                            items: [
                                {   
                                    xtype: 'textfield',
                                    name: 'susr6',
                                    fieldLabel: '已分配总重量'
                                },
                                {   
                                    xtype: 'textfield',
                                    name: 'susr7',
                                    fieldLabel: '已分配总面积'
                                }
                            ]    
                        },{
                            layout: 'hbox',
                            defaults:{
                                labelWidth: 90,
                                width: 240,
                                margin: '2 0 10 10',
                                xtype: 'textfield'
                            },
                            items: [
                                {   
                                    xtype: 'textfield',
                                    name: 'susr8',
                                    fieldLabel: '已发货总重量'
                                },
                                {   
                                    xtype: 'textfield',
                                    name: 'susr9',
                                    fieldLabel: '已发货总面积'
                                }
                            ]
                        },
                        {
                            layout: 'hbox',
                            defaults:{
                                labelWidth: 80,
                                width: 740,
                                height:45,
                                margin: '2 0 0 10',
                                xtype: 'textfield'
                            },
                            items: [
                                {   
                                    xtype: 'textarea',
                                    name: 'notes',
                                    fieldLabel: '备注'
                                }
                            ]    
                        }
                    ]
                }
            ]
	    });
		return this.pt2pn1f9form;
	},
    
//第2个tab页，下半部分的panel，放一个button面板和一个detailform    
    createPt2Pn2Panel:function(){
    	var me = this;
        this.pt2pn2panle=Ext.create('Ext.panel.Panel',{
    		region: 'south',
    		layout: 'border',
    		//高度百分比，此处设置使得随分辨率的调整自适应浏览器
            height: '60%',
    		border: false,
    		items: [me.createPt2Pn2TopBtn(),me.createPt2Pn2TabPanel()]
        })
        return this.pt2pn2panle;
    },

  //   第二个tab页下部panel上的按钮面板
    createPt2Pn2TopBtn: function(){
    	var me = this;
    	this.pt2pn2topbtn = Ext.create('Ext.form.Panel',{
    		region: 'north',
    		frame: true,
            height: 30,
    		defaults: {
    			xtype: 'button'
    		},
    		items: [
                {
                    iconCls: 'icon-create',
                    text: '添加',
                    scope: this,
                    handler: me.onAddDetail
                },
                {
                    iconCls: 'icon-delete',
                    text: '删除',
                    scope: this,
                    handler: me.onMultiDelete
                },
                this.ActAction,
                this.BtmPrintOperAction,
                {
                    iconCls: 'icon-edit',
                    text: '结算或别型号修改',
                    handler: function(){
                        me.createWinAmendFrom();
                        me.winamendform.queryById('firstLineId').setValue(1);
                        me.winamendform.show();
                    },
                    scope: this
                }                
            ]
    	});
    	return this.pt2pn2topbtn;
    },
   
    
    
 // 第二个tab页的下半部分，是tab.Panel类型创建的，有一个grid和多个form
    createPt2Pn2TabPanel: function(){
    	var me = this;
    	this.pt2pn2tabpanel = Ext.create('Ext.tab.Panel',{
//    		tabPosition: 'bottom',
    		region: 'center',
    		height: '30%',
    		items: [me.createSoDetailGrid(),me.createSoDetailForm(),me.createPt2Pn2F3Grid(),me.createPt2Pn2F4Form(),me.createPt2Pn2F5Panel(),me.createPt2Pn2F6Grid(),me.createPt2Pn2F6PlusGrid(),me.createPt2Pn2F7Panel()]
    	});
    	return this.pt2pn2tabpanel;
    },

//第二个tab页的下半部分的grid部分  Pt2Pn2F1位置Grid
    createSoDetailGrid: function(){
    	var me = this;
        this.sodetailgrid = Ext.create('widget.detailgrid',{
    		title: '列表'
    	});
    	this.sodetailgrid.getStore().on({
			beforeload:{fn:function(store){
				var values = me.pt2pn1f1form.getForm().getValues(); 
				var params = store.getProxy().extraParams;
				var orderKey = values.orderKey;
				var storerKey = values.storerKey;

				delete params.orderKey;
				delete params.storerKey;
				if(orderKey) params.orderKey=orderKey;
				if(storerKey) params.storerKey=storerKey;
			},scope: this},
			//计算本页总数量
			load:{fn:function(store){
				var orTotal = store.sum('qtyOrdered');
				var ortotalHtml = '<b><font color=green>'+Ext.util.Format.number(orTotal,'0,000')+'</font></b>';
				qtyOrderedPageSum.update(ortotalHtml);
				
				var shTotal = store.sum('qtyShipped');
				var shtotalHtml = '<b><font color=green>'+Ext.util.Format.number(shTotal,'0,000')+'</font></b>';
				qtyShippedPageSum.update(shtotalHtml);
			},scope: this}
		});
    	return this.sodetailgrid;
    },

    
//第二个tab页的下半部分的form   Pt2Pn2F2位置Form
    createSoDetailForm: function(){
    	var me = this;
        var skutemp;
        var myStore=Ext.create('Ext.data.Store', {
                                autoLoad: true,   //这里必须先load，否则下拉时再load一次，之前加的参数查询结果就被覆盖了。
                                fields: [
                                    {name:'description'},
                                    {name:'uomCode'}
                                ],
                                proxy: {
                                    type: 'ajax',
                                    url: basePath + '/support/doQuerySkuPack.action',    
                                    reader: {type: 'json',root: 'json.data',totalProperty: 'json.totalCount'},
                                    actionMethods: { read: 'POST' },
                                    simpleSortMode: true
                                }
                                //mode:'remote',    //没有看到作用
                            });
        
    	this.sodetailform = Ext.create('Ext.form.Panel',{
    		title: '明细',
//            region:'center',
    		frame: true,
			autoScroll : true,
    		defaulst: {
    			xtype: 'fieldcontainer'
    		},
    		items: [
                {
    				xtype: 'fieldcontainer',
					layout: 'hbox',
					defaults: {
						xtype: 'textfield',
						margin: '5 0 0 5',
						labelWidth: 70,
						width: 180
					},
					items: [
                        {
                            name:'lineNumber',
                            fieldLabel: '行号',
                            readOnly:true
                        },
                        {
                            name:'status',
                            fieldLabel: '状态',
                            value:'0',
                            readOnly:true,
                            xtype:'codecombo',
                            codeType:'SODSTATUS'
                        },
                        {
                            name:'id',
                            hidden: true
                        },
                        {
                            xtype:'datefield',    //隐藏字段，放置存盘被清空
                            format:'Y-m-d H:i:s',
                            name: 'addDate',
                            hidden:true
                        },
                        {
                            xtype:'textfield',    //隐藏字段，放置存盘被清空
                            name: 'addWho',
                            hidden:true
                        }                         
                    ]
				},
                {
					layout: 'hbox',
					xtype: 'fieldcontainer',
					defaults: {
						xtype: 'textfield',
						margin: '5 0 0 5',
						labelWidth: 70,
						width: 180
					},
					items: [
                        {
                            name:'sku',
                            fieldLabel: '商品',
                            allowBlank: false,  //商品是必填项                     
                            listeners:{
                                focus: function(txt){
                                    skutemp=txt.getValue();
                                },                                   
                                blur: function(txt){
                                    //输入参数，鼠标离开后见检查该商品是否存在
                                    skuValue=Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(skuValue); 
                                    storerKeyValue=me.pt2pn1f1form.getForm().findField('storerKey').getValue();
                                    if(skutemp!=skuValue)
                                    {
                                        if(''!=skuValue)
                                        {
                                            Ext.Ajax.request({
                                                url: basePath + '/support/doValidateSkus.action',
                                                params: {
                                                    sku:skuValue,
                                                    storerKey:storerKeyValue
                                                },
                                                success: function(response){    //failure属于连不上服务器的情况，后续补充
                                                    var text = Ext.decode(response.responseText);
                                                    var success = text.success;
                                                    if(0 != text.json.data.length)
                                                    {
                                                        me.sodetailform.getForm().findField('name').setValue(text.json.data[0].name);
                                                        me.sodetailform.getForm().findField('descr').setValue(text.json.data[0].descr);
                                                        me.sodetailform.getForm().findField('packKey').setValue(text.json.data[0].packKey);
                                                        me.sodetailform.getForm().findField('rotationStrategykey').setValue(text.json.data[0].rotationStrategyKey);  //注意k的大小写
                                                        me.sodetailform.getForm().findField('preAllocationStrategyKey').setValue(text.json.data[0].preAllocationStrategyKey);
                                                        me.sodetailform.getForm().findField('allocationStrategyKey').setValue(text.json.data[0].allocationStrategyKey);
                                                    }
                                                    else
                                                    {
                                                        me.sodetailform.getForm().findField('name').setValue('');
                                                        me.sodetailform.getForm().findField('descr').setValue('');
                                                        me.sodetailform.getForm().findField('sku').setValue('');
                                                        me.sodetailform.getForm().findField('packKey').setValue('');
                                                        me.sodetailform.getForm().findField('uom').setValue('');
                                                        me.sodetailform.getForm().findField('altsku').setValue('');
                                                        me.sodetailform.getForm().findField('rotationStrategykey').setValue('');
                                                        me.sodetailform.getForm().findField('preAllocationStrategyKey').setValue('');
                                                        me.sodetailform.getForm().findField('allocationStrategyKey').setValue('');
                                                        MessageBox.show(false, '商品不存在')
                                                    }
                                                }
                                            })
                                        }
                                    }
                                }
                            }//end listener                             
                        },
                        {
                            name:'altsku',
                            fieldLabel: '别名',
                            listeners:{
                                blur: function(txt){
                                    //输入参数，鼠标离开后见检查该商品是否存在
                                    altskuValue=Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(altskuValue); 
                                    storerKeyValue=me.pt2pn1f1form.getForm().findField('storerKey').getValue();
                                    if(''!=altskuValue)
                                    {
                                        Ext.Ajax.request({
                                            url: basePath + '/support/doValidateAltsku.action',
                                            params: {
                                                altsku:altskuValue,
                                                storerKey:storerKeyValue
                                            },
                                            success: function(response){    //failure属于连不上服务器的情况，后续补充
                                                var text = Ext.decode(response.responseText);
                                                var success = text.success;
                                                if(0 != text.json.data.length)
                                                {
                                                    skuValue=text.json.data[0].sku;
                                                    me.sodetailform.getForm().findField('sku').setValue(skuValue);

                                                    //从sku查中文名称和英文名称
                                                    Ext.Ajax.request({
                                                        url: basePath + '/support/doValidateSkus.action',
                                                        params: {
                                                            sku:skuValue
                                                        },
                                                        success: function(response){    //failure属于连不上服务器的情况，后续补充
                                                            var res = Ext.decode(response.responseText);
                                                            var success = res.success;
                                                            if(0 != res.json.data.length)
                                                            {
                                                                me.sodetailform.getForm().findField('name').setValue(res.json.data[0].name);
                                                                me.sodetailform.getForm().findField('descr').setValue(res.json.data[0].descr);
                                                                me.sodetailform.getForm().findField('rotationStrategykey').setValue(res.json.data[0].rotationStrategyKey);
                                                                me.sodetailform.getForm().findField('preAllocationStrategyKey').setValue(res.json.data[0].preAllocationStrategyKey);
                                                                me.sodetailform.getForm().findField('allocationStrategyKey').setValue(res.json.data[0].allocationStrategyKey);
                                                            }
                                                        }
                                                    })
                                                }
                                                else
                                                {
                                                    me.sodetailform.getForm().findField('sku').setValue('');
                                                    me.sodetailform.getForm().findField('altsku').setValue('');
                                                    me.sodetailform.getForm().findField('name').setValue('');
                                                    me.sodetailform.getForm().findField('descr').setValue('');
                                                    me.sodetailform.getForm().findField('packKey').setValue('');
                                                    me.sodetailform.getForm().findField('rotationStrategykey').setValue('');
                                                    me.sodetailform.getForm().findField('preAllocationStrategyKey').setValue('');
                                                    me.sodetailform.getForm().findField('allocationStrategyKey').setValue('');
                                                    MessageBox.show(false,'商品别名不存在')
                                                }
                                            }
                                        })
                                    }
                                }
                            }//end listener                       
                        },
                        {
                            name:'name',
                            fieldLabel: '中文名称',
                            width: 550
                        }
                    ]
				},
                {
					layout: 'hbox',
					xtype: 'fieldcontainer',
					defaults: {
						xtype: 'textfield',
						labelWidth: 70,
						margin: '5 0 0 5',
						width: 180
					},
					items: [
                        {
                            name:'packKey',
                            xtype:'textfield',
                            fieldLabel: '包装',
                            allowBlank: false,
                            listeners: {   //选中包装后,
                                blur: function(txt){
                                    packKeyValue= Ext.util.Format.uppercase(txt.getValue());
                                    txt.setValue(packKeyValue);
                                    var uomValue=me.sodetailform.getForm().findField('uom').getValue();                                        
                                    var qtyUomOrdered=me.sodetailform.getForm().findField('qtyUomOrdered').getValue();   
                                    if(''!=packKeyValue)
                                    {
                                        Ext.Ajax.request({
                                            url: basePath + '/support/doCheckPack.action',
                                            params: {
                                                packKey:packKeyValue
                                            },
                                                success: function(response){    //failure属于连不上服务器的情况
                                                var text = Ext.decode(response.responseText);
                                                var success = text.success;
                                                if(0 != text.json.data.length)
                                                {
                                                    //包装存在，则loadstore，查询单位的下拉框。
                                                    myStore.load({params:{packKey:packKeyValue}})
                                                    //找到对应的uomQty数量
                                                    if((''!=uomValue)&&(''!=packKeyValue))
                                                    {
                                                        Ext.Ajax.request({
                                                            url: basePath + '/support/doQuerySkuPackQty.action',
                                                            params: {
                                                                uomCode:uomValue,   //需要验证这里查询参数是什么？重点关注qxue
                                                                packKey:packKeyValue
                                                            },
                                                            success: function(response){    //failure属于连不上服务器的情况，后续补充
                                                                var text = Ext.decode(response.responseText);
                                                                var success = text.success;
                                                                if(''!= text.json.data || null != text.json.data)
                                                                {
                                                                    var uomQty=text.json.data;
                                                                    me.sodetailform.getForm().findField('qtyOrdered').setValue(qtyUomOrdered*uomQty);
                                                                }
                                                            }
                                                        })
                                                    }                                              
                                                }
                                                else
                                                {
                                                    me.sodetailform.getForm().findField('packKey').setValue('');
                                                    me.sodetailform.getForm().findField('qtyUomOrdered').setValue('');  //订单数量清空
                                                    MessageBox.show(false, '包装不存在')
                                                }
                                            }
                                        })
                                    }
                                }
/*                               blur: function(txt){
                                    packKeyValue=txt.getValue();
                                    myStore.load({params:{packKey:packKeyValue}})
                                    
                                    var uomValue=me.sodetailform.getForm().findField('packKey').getValue();
                                    if((''!=uomValue)&&(''!=packKeyValue))
                                    {
                                        Ext.Ajax.request({
                                            url: basePath + '/support/doQuerySkuPackQty.action',
                                            params: {
                                                uom:uomValue,
                                                packKey:packKeyValue
                                            },
                                            success: function(response){    //failure属于连不上服务器的情况，后续补充
                                                var text = Ext.decode(response.responseText);
                                                var success = text.success;
                                                if(''!= text.json.data || null != text.json.data)
                                                {
                                                    var uomQty=text.json.data;
                                                    me.sodetailform.getForm().findField('qtyOrdered').setValue(qtyUomOrdered*uomQty);
                                                }
                                            }
                                        })
                                    } 
								}*/
                            }
                        },
                        {
                            name:'uom',
                            fieldLabel: '单位',
                            xtype:'combobox',
                            store:myStore,
                            displayField: 'description',
                            valueField: 'uomCode',
                            //valueField: 'description',
                            width: 180,
                            lastQuery: '',  //解决有时鼠标多点一次的问题
                            allowBlank: false,                                                            
                            listeners: {   //选中包装后,
                                expand : function(){
                                    packKeyValue=me.sodetailform.getForm().findField('packKey').getValue();
                                    myStore.load({params:{packKey:packKeyValue}});
                                },                                
                                blur: function(txt){
                                    var uomValue=txt.getValue();
                                    var qtyUomOrdered=me.sodetailform.getForm().findField('qtyUomOrdered').getValue();
                                    //var qtyUomPreallocated=me.sodetailform.getForm().findField('qtyUomPreallocated').getValue();
                                    //var qtyUomAllocated=me.sodetailform.getForm().findField('qtyUomAllocated').getValue();
                                    //var qtyUomPicked=me.sodetailform.getForm().findField('qtyUomPicked').getValue();
                                    //var qtyUomShipped=me.sodetailform.getForm().findField('qtyUomShipped').getValue();
                                    
                                    var packKeyValue=me.sodetailform.getForm().findField('packKey').getValue();
                                    if((''!=uomValue)&&(''!=packKeyValue))
                                    {
                                        Ext.Ajax.request({
                                            url: basePath + '/support/doQuerySkuPackQty.action',
                                            params: {
                                                uomCode:uomValue,
                                                packKey:packKeyValue
                                            },
                                            success: function(response){    //failure属于连不上服务器的情况，后续补充
                                                var text = Ext.decode(response.responseText);
                                                var success = text.success;
                                                if(''!= text.json.data || null != text.json.data)
                                                {
                                                    var uomQty=text.json.data;
                                                    me.sodetailform.getForm().findField('qtyOrdered').setValue(qtyUomOrdered*uomQty);
                                                }
                                            }
                                        })
                                    } 
                                    //下边几个字段只是显示，没有用
									//me.sodetailform.getForm().findField('qtyPreallocated').setValue(qtyUomPreallocated*uomValue);
									//me.sodetailform.getForm().findField('qtyAllocated').setValue(qtyUomAllocated*uomValue);
									//me.sodetailform.getForm().findField('qtyPicked').setValue(qtyUomPicked*uomValue);
									//me.sodetailform.getForm().findField('qtyShipped').setValue(qtyUomShipped*uomValue);
								}
                            }								
                        },
                        {
                            name:'descr',
                            fieldLabel: '英文名称',
                            width: 550
                        }
                    ]
				},
                {
					layout: 'hbox',
					xtype: 'fieldcontainer',
					defaults: {
						xtype: 'textfield',
						margin: '5 0 0 5',
						labelWidth: 70,
						width: 180
					},
					items: [
                        {
                            xtype:'label',
                            text: '订单数量:',
                            margin: '5 0 0 5',
                            width: 70
                        },
                        {
                            fieldLabel: '',
                            xtype: 'numberfield',
                            minValue:0,
                            decimalPrecision:3,
                            width:105,
                            name:'qtyUomOrdered',
                            allowBlank: false,
                            listeners: {
                                blur: function(txt){
                                    var qtyValue=txt.getValue();
                                    var uomValue=me.sodetailform.getForm().findField('uom').getValue();
                                    var packKeyValue=me.sodetailform.getForm().findField('packKey').getValue();
                                    if((''!=uomValue)&&(''!=packKeyValue))
                                    {
                                        Ext.Ajax.request({
                                            url: basePath + '/support/doQuerySkuPackQty.action',
                                            params: {
                                                uomCode:uomValue,
                                                packKey:packKeyValue
                                            },
                                            success: function(response){    //failure属于连不上服务器的情况，后续补充
                                                var text = Ext.decode(response.responseText);
                                                var success = text.success;
                                                if(''!= text.json.data || null != text.json.data)
                                                {
                                                    var uomQty=text.json.data;
                                                    me.sodetailform.getForm().findField('qtyOrdered').setValue(qtyValue*uomQty);
                                                }
                                            }
                                        })
                                    } 
                                    else
                                    {
                                        me.sodetailform.getForm().findField('qtyUomOrdered').setValue('');
                                        MessageBox.show(false, '请先输入包装和单位');//单位是下拉框，可能有多个空格，不好确定是否为空
                                    }
								}
                            }							
                        },
                        {
                            fieldLabel: '',
                            xtype: 'numberfield',
                            minValue:0,
                            decimalPrecision:3,
                            width:105,
                            readOnly:true,
                            name:'qtyOrdered'   //计算出来的数量
                        },                        
                        {
                            xtype:'label',
                            text: '预分配数:',
                            margin: '5 0 0 5',
                            width: 70
                        },
                        {
                            fieldLabel: '',
                            xtype: 'numberfield',
                            minValue:0,
                            decimalPrecision:3,
                            width:105,
                            name:'qtyUomPreallocated',
                            readOnly:true,
                            listeners: {
                                /*blur: function(txt){
                                    var qtyValue=txt.getValue();
                                    var uomValue=me.sodetailform.getForm().findField('uom').getValue();
									me.sodetailform.getForm().findField('qtyPreallocated').setValue(qtyValue*uomValue);
								}*/
                            }							
                        },
                        {
                            fieldLabel: '',
                            xtype: 'numberfield',
                            minValue:0,
                            decimalPrecision:3,
                            width:105,
                            readOnly:true,
                            name:'qtyPreallocated'   //计算出来的数量
                        },  
                        {
                            xtype:'label',
                            text: '分配数量:',
                            margin: '5 0 0 5',
                            width: 70
                        },
                        {
                            fieldLabel: '',
                            xtype: 'numberfield',
                            minValue:0,
                            decimalPrecision:3,
                            width:105,
                            name:'qtyUomAllocated',
                            readOnly:true,
                            listeners: {
                                /*blur: function(txt){
                                    var qtyValue=txt.getValue();
                                    var uomValue=me.sodetailform.getForm().findField('uom').getValue();
									me.sodetailform.getForm().findField('qtyAllocated').setValue(qtyValue*uomValue);
								}*/
                            }							
                        },
                        {
                            fieldLabel: '',
                            xtype: 'numberfield',
                            minValue:0,
                            decimalPrecision:3,
                            width:105,
                            readOnly:true,
                            name:'qtyAllocated'   //计算出来的数量
                        }
                    ]
				},
                {
					layout: 'hbox',
					xtype: 'fieldcontainer',
					defaults: {
						xtype: 'textfield',
						margin: '5 0 0 5',
						labelWidth: 70,
						width: 180
					},
					items: [
                        {
                            xtype:'label',
                            text: '拣货数量:',
                            margin: '5 0 0 5',
                            width: 70
                        },
                        {
                            fieldLabel: '',
                            xtype: 'numberfield',
                            minValue:0,
                            decimalPrecision:3,
                            width:105,
                            name:'qtyUomPicked',
                            readOnly:true,
                            listeners: {
                                /*blur: function(txt){
                                    var qtyValue=txt.getValue();
                                    var uomValue=me.sodetailform.getForm().findField('uom').getValue();
									me.sodetailform.getForm().findField('qtyPicked').setValue(qtyValue*uomValue);
								}*/
                            }							
                        },
                        {
                            fieldLabel: '',
                            xtype: 'numberfield',
                            minValue:0,
                            decimalPrecision:3,
                            width:105,
                            readOnly:true,
                            name:'qtyPicked'   //计算出来的数量
                        },                        
                        {
                            xtype:'label',
                            text: '发运数量:',
                            margin: '5 0 0 5',
                            width: 70
                        },
                        {
                            fieldLabel: '',
                            xtype: 'numberfield',
                            minValue:0,
                            decimalPrecision:3,
                            width:105,
                            name:'qtyUomShipped',
                            readOnly:true,
                            listeners: {
                                /*blur: function(txt){
                                    var qtyValue=txt.getValue();
                                    var uomValue=me.sodetailform.getForm().findField('uom').getValue();
									me.sodetailform.getForm().findField('qtyShipped').setValue(qtyValue*uomValue);
								}*/
                            }							
                        },
                        {
                            fieldLabel: '',
                            xtype: 'numberfield',
                            minValue:0,
                            decimalPrecision:3,
                            width:105,
                            readOnly:true,
                            name:'qtyShipped'   //计算出来的数量
                        }
                    ]
				},                
                {
					layout: 'hbox',
					xtype: 'fieldcontainer',
					defaults: {
						xtype: 'textfield',
						margin: '5 0 0 5',
						labelWidth: 70,
						width: 180
					},
					items: [
                        {
                            fieldLabel: '周转策略',
                            name: 'rotationStrategykey',
                            allowBlank: false,
                            xtype: 'rotationstrategycombo'
                            //value:'STD'
                        },
                        {
                            fieldLabel: '预分配策略',
                            name: 'preAllocationStrategyKey',
                            allowBlank: false,
                            xtype: 'rotationstrategycombo'
                            //value:'STD'
                        },
                        {
                            fieldLabel: '分配策略',
                            name: 'allocationStrategyKey',
                            allowBlank: false,
                            xtype: 'allocationstrategycombo'
                            //value:'STD'
                        },
                        {
                            name:'lottable01',
                            fieldLabel: swmslot01,//入库日期
                            xtype: 'datefield',
                            format:'Y-m-d H:i:s'     //精确到秒
                        },
                        {
                            name:'lottable02',
                            fieldLabel: swmslot02,//生产日期
                            xtype: 'datefield',
                            format:'Y-m-d H:i:s'     //精确到秒
                        }
                    ]
				},
                {
					layout: 'hbox',
					xtype: 'fieldcontainer',
					defaults: {
						xtype: 'datefield',
						margin: '5 0 0 5',
						labelWidth: 70,
						width: 180
					},
					items: [
                        {
                            name:'lottable03',
                            fieldLabel: swmslot03,//失效日期
                            xtype: 'datefield',
                            format:'Y-m-d H:i:s'     //精确到秒
                        },
                        {
                            name:'lottable04',
                            fieldLabel: swmslot04,
                            xtype: 'textfield',
                            listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }
                        },
                        {
                            name:'lottable05',
                            fieldLabel: swmslot05,
                            xtype: 'textfield',
                            listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }
                            //value:'OK'
                        },
                        {
                            name:'lottable06',
                            fieldLabel: swmslot06,
                            xtype: 'textfield',
                            listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }
                            //value:'AV'
                        },
                        {
                            name:'lottable07',
                            fieldLabel: swmslot07,
                            xtype: 'textfield',
                            listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }
                            //value:'T'
                        }
                    ]
				},
                {
					layout: 'hbox',
					xtype: 'fieldcontainer',
					defaults: {
						xtype: 'textfield',
						margin: '5 0 0 5',
						labelWidth: 70,
						width: 180
					},
					items: [
                        {
                            name:'lottable08',
                            fieldLabel: swmslot08,
                            xtype: 'textfield',
                            listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }
                        },
                        {
                            name:'lottable09',
                            fieldLabel: swmslot09,
                            xtype: 'textfield',
                            listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }
                        },
                        {
                            name:'lottable10',
                            fieldLabel: swmslot10,
                            xtype: 'textfield',
                            listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }
                        },
                        {
                            name:'lottable11',
                            fieldLabel: swmslot11,
                            xtype: 'textfield',
                            listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }
                        },
                        {
                            name:'lottable12',
                            fieldLabel: swmslot12,
                            xtype: 'textfield',
                            listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }
                            //readOnly:true
                        }
                    ]
				},
				{
					layout: 'hbox',
					xtype: 'fieldcontainer',
					defaults: {
						xtype: 'textfield',
						margin: '5 0 0 5',
						labelWidth: 70,
						width: 180
					},
					items: [
                        {
                            name:'lottable13',
                            fieldLabel: swmslot13,
                            xtype: 'textfield',
                            listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }
                        },
                        {
                            name:'lottable14',
                            fieldLabel: swmslot14,
                            xtype: 'textfield',
                            listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }
                        },
                        {
                            name:'lottable15',
                            fieldLabel: swmslot15,
                            xtype: 'textfield',
                            listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }
                        },
                        {
                            name:'lottable16',
                            fieldLabel: swmslot16,
                            xtype: 'textfield',
                            listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }
                        },
                        {
                            name:'lottable17',
                            fieldLabel: swmslot17,
                            hidden:true,
                            xtype: 'textfield',
                            listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }
                        }                        
                    ]
				},
				{
					layout: 'hbox',
					xtype: 'fieldcontainer',
					defaults: {
						xtype: 'textfield',
						margin: '5 0 0 5',
						labelWidth: 70,
						width: 180
					},
					items: [
                        {
                            name:'lottable18',
                            fieldLabel: swmslot18,
                            hidden:true,
                            xtype: 'textfield',
                            listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }
                        },
                        {
                            name:'lottable19',
                            fieldLabel: swmslot19,
                            hidden:true,
                            xtype: 'textfield',
                            listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }
                        },
                        {
                            name:'lottable20',
                            fieldLabel: swmslot20,
                            hidden:true,
                            xtype: 'textfield',
                            listeners:{
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            }
                        }
                    ]
				},                
                {
					layout: 'hbox',
					xtype: 'fieldcontainer',
					defaults: {
						xtype: 'textfield',
						margin: '5 0 0 5',
						labelWidth: 70,
						width: 180
					},
					items: [
                        {
                            name:'udf1',
                            fieldLabel: '面积'
                        },
                        {
                            name:'udf2',
                            fieldLabel: '结算幅宽'
                        },
                        {
                            name:'udf3',
                            fieldLabel: '结算面积'
                        },
                        {
                            name:'udf4',
                            fieldLabel:'自定义4'
                        },
                        {
                            name:'udf5',
                            fieldLabel: '自定义5'
                        }
                    ]
				}//,
/*                {
					layout: 'hbox',
					xtype: 'fieldcontainer',
					defaults: {
						xtype: 'textfield',
						margin: '5 0 0 5',
						labelWidth: 55,
						width: 180
					},
					items: [{
						fieldLabel: '备注',
						width:920
					}]
				}*/  // 暂时隐藏掉
                ]
    	});
    	return this.sodetailform;
    },

    
//第二个tab页的下半部分的grid部分  Pt2Pn2F3位置Grid
    createPt2Pn2F3Grid: function(){
    	var me = this;
        this.pt2pn2f3grid = Ext.create('widget.pickgrid',{
    		title: '拣货列表'
    	});

        //pickdetailgrid的查询条件

   	this.pt2pn2f3grid.getStore().on('beforeload',function(store){
			var params = store.getProxy().extraParams;
            
            //从选中的orderdetail记录中获取行号
			var sodetailRecord = me.sodetailform.getForm().getFieldValues(); 

            if(sodetailRecord != ''){
                var lineNumber = sodetailRecord.lineNumber;
                delete params.lineNumber;
                if(lineNumber) params.lineNumber = lineNumber;
            }
            
            //从basicform中获取orderKey
			var formvalues = me.pt2pn1f1form.getForm().getValues();
			var orderKey = formvalues.orderKey;
			delete params.orderKey;
			if(orderKey) params.orderKey=orderKey;
            
    	},this);
        
    	return this.pt2pn2f3grid;
    },

//第二个tab页的下半部分的form   Pt2Pn2F4位置Form
    createPt2Pn2F4Form: function(){
    	var me = this;
    	this.pt2pn2f4form = Ext.create('Ext.form.Panel',{
    		title: '拣货明细',
//            region:'center',
    		frame: true,
			autoScroll : true,
    		defaulst: {
    			xtype: 'fieldcontainer'
    		},
    		items: [
                {
    				xtype: 'fieldcontainer',
					layout: 'hbox',
					defaults: {
						xtype: 'textfield',
						margin: '5 0 0 5',
						labelWidth: 70,
						width: 180
					},
					items: [
                        {
                            name:'lineNumber',
                            fieldLabel: '行号'
                        },
                        {
                            name:'status',
                            fieldLabel: '状态'
                        }
                    ]
				},
                {
					layout: 'hbox',
					xtype: 'fieldcontainer',
					defaults: {
						xtype: 'textfield',
						margin: '5 0 0 5',
						labelWidth: 70,
						width: 180
					},
					items: [
                        {
                            name:'sku',
                            fieldLabel: '商品'
                        }//,
/*                        {
                            name:'altsku',
                            fieldLabel: '别名'
                        },
                        {
                            name:'name',
                            margin: '5 0 0 190',
                            fieldLabel: '中文名称',
                            width: 350
                        }*/
                    ]
				},
                {
					layout: 'hbox',
					xtype: 'fieldcontainer',
					defaults: {
						xtype: 'textfield',
						margin: '5 0 0 5',
						labelWidth: 70,
						width: 180
					},
					items: [
                        {
                            name:'name',
                            fieldLabel: '中文名称',
                            width: 365
                        }
                    ]
				},
                {
					layout: 'hbox',
					xtype: 'fieldcontainer',
					defaults: {
						xtype: 'textfield',
						labelWidth: 70,
						margin: '5 0 0 5',
						width: 180
					},
					items: [
                        {
                            name:'descr',
                            fieldLabel: '英文名称',
                            width: 365
                        }
                    ]
				},
                {
					layout: 'hbox',
					xtype: 'fieldcontainer',
					defaults: {
						xtype: 'textfield',
						labelWidth: 70,
						margin: '5 0 0 5',
						width: 180
					},
					items: [
                        {
                            name:'lot',
                            fieldLabel: '批次'
                        },
                        {
                            name:'loc',
                            fieldLabel: '库位'
                        },
                        {
                            name:'gid',
                            fieldLabel: 'ID'
                        }
                    ]
				},
                {
					layout: 'hbox',
					xtype: 'fieldcontainer',
					defaults: {
						//xtype: 'textfield',
                        xtype: 'numberfield',
                        minValue:0,
                        decimalPrecision:3,
						margin: '5 0 0 5',
						labelWidth: 70,
						width: 180
					},
					items: [
                        {
                            name:'qty',
                            fieldLabel: '待拣数量'
                        },
                        {
                            name:'qtypicked',
                            fieldLabel: '已拣数量'
                        }
                    ]
				}
                ]
    	});
    	return this.pt2pn2f4form;
    },
    
    
    createPt2Pn2F5Panel: function(){
    	var me = this;
    	this.pt2pn2f5panel = Ext.create('Ext.panel.Panel',{
            title:'手工分配',
            layout:'border',
    		items: [me.createPt2Pn2F51Form(),me.createPt2Pn2F52Grid()]
    	});
    	return  this.pt2pn2f5panel;
    },    
    
    createPt2Pn2F51Form: function(){
    	var me = this;
    	this.pt2pn2f51form = Ext.create('Ext.form.Panel',{
            xtype:'form',
            region:'west',
			viewConfig : {
				forceFit: true,
				autoFill: true
			},            
    		frame: true,
			autoScroll : true,
            width:450,
    		defaults: {
    			xtype: 'fieldcontainer'
    		},
    		items: [
                {
    				xtype: 'fieldcontainer',
					layout: 'hbox',
					defaults: {
						xtype: 'textfield',
						margin: '5 0 0 5',
						labelWidth: 70,
						width: 180
					},
					items: [
                        {
                            name:'lineNumber',
                            fieldLabel: '行号'
                        },
                        {
                            name:'status',
                            fieldLabel: '状态'
                        },
                        {
                            name:'id',
                            hidden:true
                        }
                        
                    ]
				},
                {
					layout: 'hbox',
					xtype: 'fieldcontainer',
					defaults: {
						xtype: 'textfield',
						margin: '5 0 0 5',
						labelWidth: 70,
						width: 180
					},
					items: [
                        {
                            name:'sku',
                            fieldLabel: '商品'
                        }
                    ]
				},
                {
					layout: 'hbox',
					xtype: 'fieldcontainer',
					defaults: {
						xtype: 'textfield',
						margin: '5 0 0 5',
						labelWidth: 70,
						width: 180
					},
					items: [
                        {
                            name:'name',
                            fieldLabel: '中文名称',
                            width: 365
                        }
                    ]
				},
                {
					layout: 'hbox',
					xtype: 'fieldcontainer',
					defaults: {
						xtype: 'textfield',
						labelWidth: 70,
						margin: '5 0 0 5',
						width: 180
					},
					items: [
                        {
                            name:'descr',
                            fieldLabel: '英文名称',
                            width: 365
                        }
                    ]
				},
                {
					layout: 'hbox',
					xtype: 'fieldcontainer',
					defaults: {
						xtype: 'textfield',
						labelWidth: 70,
						margin: '5 0 0 5',
						width: 180
					},
					items: [
                        {
                            name:'lot',
                            fieldLabel: '批次'
                        },
                        {
                            name:'loc',
                            fieldLabel: '库位'
                        }
                    ]
				},
                {
					layout: 'hbox',
					xtype: 'fieldcontainer',
					defaults: {
						xtype: 'textfield',
						labelWidth: 70,
						margin: '5 0 0 5',
						width: 180
					},
					items: [
                        {
                            name:'gid',
                            fieldLabel: 'ID'
                        }
                    ]
				},                
                {
					layout: 'hbox',
					xtype: 'fieldcontainer',
					defaults: {
						//xtype: 'textfield',
                        xtype: 'numberfield',
                        minValue:0,
                        decimalPrecision:3,                        
						margin: '5 0 0 5',
						labelWidth: 70,
						width: 180
					},
					items: [
                        {
                            name:'qty',
                            fieldLabel: '待拣数量'
                        },
                        {
                            name:'qtypicked',
                            fieldLabel: '已拣数量'
                        }
                    ]
				}
            ],
            buttons:[
                {
				    text : "取消拣货",
				    cls : "x-btn-text-icon",
				    scope : this,
                    handler: me.onCancelPickedSku
			    },
                {
				    text : "取消分配",
				    cls : "x-btn-text-icon",
				    scope : this,
                    handler: me.onCancelPickdetail
			    },                {
				    text : "数据查询",
				    cls : "x-btn-text-icon",
				    scope : this,
	               handler: me.onSelectLotxLocxId
			    },
                {
				    text : "人工分配",
				    cls : "x-btn-text-icon",
				    scope : this,
                    handler: me.onAllocatePickdetail
			    }
			]            
    	});
    	return this.pt2pn2f51form;
    },    
    
    createPt2Pn2F52Grid: function(){
    	var me = this;
        this.pt2pn2f52grid = Ext.create('widget.allocategrid',{
            region:'center'
    	});
    	this.pt2pn2f52grid.getStore().on('beforeload',function(store){
        
			var params = store.getProxy().extraParams;
            
            //从basicform中获取storerKey
			var allocateValues = me.pt2pn2f51form.getForm().getValues();
                if(allocateValues != ''){
                    var sku = allocateValues.sku;
                    delete params.sku;
                    if(sku) params.sku = sku;
                }
            //从手工分配form 中获取sku            
			var formValues = me.pt2pn1f1form.getForm().getValues();
                 if(formValues != ''){

                    var storerKey = formValues.storerKey;
                    delete params.storerKey;
                    if(storerKey) params.storerKey = storerKey;                }
    	},this);
    	return this.pt2pn2f52grid;
    },
    
    createPt2Pn2F6Grid: function(){
    	var me = this;
        this.undetailgrid = Ext.create('widget.unfinisheddetailgrid',{
    		title: '未分配完成'
    	});
    	this.undetailgrid.getStore().on({
			beforeload:{fn:function(store){
				var values = me.pt2pn1f1form.getForm().getValues(); 
				var params = store.getProxy().extraParams;
				var orderKey = values.orderKey;
				var storerKey = values.storerKey;

				delete params.orderKey;
				delete params.storerKey;
				if(orderKey) params.orderKey=orderKey;
				if(storerKey) params.storerKey=storerKey;
			},scope: this}//,
			//计算本页总数量
/*			load:{fn:function(store){
				var orTotal = store.sum('qtyOrdered');
				var ortotalHtml = '<b><font color=green>'+Ext.util.Format.number(orTotal,'0,000')+'</font></b>';
				qtyOrderedPageSumUn.update(ortotalHtml);
				
				var shTotal = store.sum('qtyShipped');
				var shtotalHtml = '<b><font color=green>'+Ext.util.Format.number(shTotal,'0,000')+'</font></b>';
				qtyShippedPageSumUn.update(shtotalHtml);
			},scope: this}*/
		});
    	return this.undetailgrid;
    },    
    
    createPt2Pn2F6PlusGrid: function(){
    	var me = this;
        this.unfinishedpickdetailgrid = Ext.create('widget.unfinishedpickdetailgrid',{
    		title: '未拣货完成'
    	});
    	this.unfinishedpickdetailgrid.getStore().on({
			beforeload:{fn:function(store){
				var values = me.pt2pn1f1form.getForm().getValues(); 
				var params = store.getProxy().extraParams;
				var orderKey = values.orderKey;

				delete params.orderKey;
				
				if(orderKey) params.orderKey=orderKey;
			},scope: this}
		});
    	return this.unfinishedpickdetailgrid;
    },  
    
   createPt2Pn2F7Panel: function(){
    	var me = this;
    	this.pt2pn2f7panel = Ext.create('Ext.panel.Panel',{
            title:'结算或别型号修改',
            layout:'border',
    		items: [me.creatept2pn2f7Grid(),me.creatept2pn2f7Form()]
    	});
    	return  this.pt2pn2f7panel;
    },    
    
      //底部GRID
    creatept2pn2f7Grid:function(){
    	var me = this;
    	this.pt2pn2f7grid = Ext.create('widget.detailgrid2',{
			region: 'center',
			listeners: {
    			itemclick: function(grid,record){
    				me.pt2pn2f7form.getForm().loadRecord(record);
    			}
    		}
		});
		this.pt2pn2f7grid.getStore().on('beforeload',function(){
    		var values = me.pt2pn1f1form.getForm().getValues(); 
			var params = this.pt2pn2f7grid.getStore().getProxy().extraParams;
			var orderKey = values.orderKey;
			var storerKey = values.storerKey;

			delete params.orderKey;
			delete params.storerKey;
			if(orderKey) params.orderKey=orderKey;
			if(storerKey) params.storerKey=storerKey;
    	},this);
		return this.pt2pn2f7grid;
    },
    //底部右边FORM
    creatept2pn2f7Form: function(){
    	var me = this;
		this.pt2pn2f7form = Ext.create('Ext.form.Panel',{
			region: 'east',
			frame: true,
			border: false,
			split: true,
			collapsible: true,
			width: '50%',
			defaults: {
				margin: '5 0 0 5',
				xtype: 'fieldcontainer' 
			},
			items: [
                {
                    layout: 'hbox',
                    defaults: {
                        xtype: 'textfield',
                        margin: '5 0 0 5',
                        labelWidth: 60
                    },
                    items: [
                        {
                            fieldLabel: '商品',
                            allowBlank: false,
                            name: 'sku',
                            listeners: {
                                blur:function(txt){
                                  txt.setValue(Ext.util.Format.uppercase(txt.getValue()));
                                }
                            },
                            width: 250
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults: {
                        xtype: 'textfield',
                        margin: '5 0 0 5',
                        labelWidth: 60
                    },
                    items: [
                        {
                            fieldLabel: '结算幅宽',
                            allowBlank: false,
                            name: 'udf2',
                            width: 250
                        } ,{
                    xtype: 'button',
                    iconCls: 'icon-save',
                    scope: this,
                    handler: me.onPt2Pn2f7Save,
                    text: '确定' 
                },
                {
                    xtype: 'button',
                    handler: me.onPt2Pn2f7Reset,
                    scope: this,
                    iconCls: 'icon-reset',
                    text: '重置'
                }
                    ]
                } 
                ,
                {
                    layout: 'hbox',
                    defaults: {
                        xtype: 'textfield',
                        margin: '5 0 0 5',
                        labelWidth: 60
                    },
                    items: [
                        {
                            fieldLabel: '别型号',
                            allowBlank: false,
                            name: 'udf4',
                            width: 250
                        },
                        {
                    xtype: 'button',
                    iconCls: 'icon-save',
                    scope: this,
                    handler: me.onUdf4AmendAndSave,
                    text: '确定' 
                },
                {
                    xtype: 'button',
                    handler: me.onPt2Pn2f7Reset,
                    scope: this,
                    iconCls: 'icon-reset',
                    text: '重置'
                }
                    ]
                }
            ]
		});
		return this.pt2pn2f7form;
	},
	onPt2Pn2f7Save:function(){
		var me = this;
        var orderKeyValue=this.pt2pn1f1form.getForm().findField('orderKey').getValue();
		var sku = me.pt2pn2f7form.getForm().findField('sku').getValue();
		var udf2 = me.pt2pn2f7form.getForm().findField('udf2').getValue();
        if(null==orderKeyValue ||''== orderKeyValue){
		 	MessageBox.error("错误提示","请填写orderKey！");
		 	return;
		}
		if(null==udf2 ||''== udf2){
		 	MessageBox.error("错误提示","请填写结算幅宽！");
		 	return;
		}
		Ext.Ajax.request({
		    url: basePath + '/outbound/doUdf2AndUdf3AmendForCY2.action',
		    params: {
                orderKey:orderKeyValue,
                sku:sku,
		        udf2: udf2
		    },
		    success: function(response){
		        var text = Ext.decode(response.responseText);
		        var success = text.success;
                if(true==success)
                {
                    MessageBox.show(success, text.json.msg);
      		        me.sodetailgrid.getStore().load();
                    me.pt2pn2f7form.getForm().reset();
                }
                else
                {
                    MessageBox.show(success, "更新失败!");
                }
		    }            
        })
},
	onUdf4AmendAndSave:function(){
		var me = this;
        var orderKeyValue=this.pt2pn1f1form.getForm().findField('orderKey').getValue();
		var sku = me.pt2pn2f7form.getForm().findField('sku').getValue();
		var udf4 = me.pt2pn2f7form.getForm().findField('udf4').getValue();
        if(null==orderKeyValue ||''== orderKeyValue){
		 	MessageBox.error("错误提示","请填写orderKey！");
		 	return;
		}
		if(null==udf4 ||''== udf4){
		 	MessageBox.error("错误提示","请填写别型号！");
		 	return;
		}
		Ext.Ajax.request({
		    url: basePath + '/outbound/doUdf4AmendForCY2.action',
		    params: {
                orderKey:orderKeyValue,
                sku:sku,
		        udf4:udf4
		    },
		    success: function(response){
		        var text = Ext.decode(response.responseText);
		        var success = text.success;
                if(true==success)
                {
                    MessageBox.show(success, text.json.msg);
      		        me.sodetailgrid.getStore().load();
                    me.pt2pn2f7form.getForm().reset();
                }
                else
                {
                    MessageBox.show(success, "更新失败!");
                }
		    }            
        })
	},
	onPt2Pn2f7Reset:function(){
		 this.pt2pn2f7form.getForm().reset();
	},
    onCreateSo:function(){
        
        this.pt2pn1f1form.getForm().reset();
		this.setActiveTab(1);
		this.pt2pn1f1form.getForm().reset();
        this.pt2pn1f2form.getForm().reset();
        this.pt2pn1f3form.getForm().reset();
        this.pt2pn1f4form.getForm().reset();
        this.pt2pn1f5form.getForm().reset();
        this.pt2pn1f6form.getForm().reset();
        this.pt2pn1f7form.getForm().reset();
        this.pt2pn1f8form.getForm().reset();
        this.pt2pn1f9form.getForm().reset();
   		this.pt2pn2tabpanel.setActiveTab(1);
        this.sodetailform.getForm().reset();        
        
        //主表创建需要取消只读，待补充 qxue

        //计划在创建时自动加载一个数字
        //规则目前写死，后续考虑修改
        var nameCode='SONUM';
		var typeserail='0';

	    this.teststore = Ext.create('Ext.data.Store', {
	        remoteSort: true,
            autoLoad: true,
            fields: [
                        {name:'number'},
                        {name:'id'}
            ],
	        proxy: {
	            type: 'ajax',
	            url: basePath + '/support/doCreateNumberRules.action?string='+nameCode+','+typeserail,     
	            reader: {type: 'json',root: 'json.data',totalProperty: 'json.totalCount'},
	            actionMethods: { read: 'POST' },
	            simpleSortMode: true
	        },
            //加载数据到store，通过监听事件来设置
            listeners: {
                'load':function(sto,recs){
                    var value=sto.getAt(0).get('number');
                    if(''!=value)
                    {
                        this.pt2pn1f1form.getForm().findField('orderKey').setValue(value); 
                        this.sodetailform.getForm().findField('lineNumber').setValue('1');  
                        this.pt2pn1f9form.getForm().findField('susr1').setValue('聚酯薄膜');  
                        this.pt2pn1f9form.getForm().findField('susr2').setValue('托盘包装');  
                        this.pt2pn1f9form.getForm().findField('susr3').setValue('');  
                        this.pt2pn1f9form.getForm().findField('susr4').setValue('');  
                        this.pt2pn1f9form.getForm().findField('susr4').setValue('');                        
                        //创建时自动设置时间
                        var  timeValue=Ext.util.Format.date(new Date(),"Y-m-d H:i:s");
                        this.pt2pn1f1form.getForm().findField('orderDate').setValue(timeValue); 
                    }
                },scope:this
            }
	    }),

        //创建时改为可以编辑
        this.onSetOrdersReadOnly(false);
        this.onSetOrdersKeyReadOnly(false);
        this.onSetActualshipdateReadOnly(false);
        this.onSetDetailReadOnly(false);
        this.onSetDetailKeyReadOnly(false);
    },
    
    // 计算件数：即托数和卷数以及重量
	onComputeSusr : function() {
		var me = this;
		var record = me.pt2pn1f1form.getForm().getFieldValues(); 
		Ext.Ajax.request({
			url : basePath + '/outbound/doComputeSusr.action',
			params : {
				  orderKey:record.orderKey
			},
			success : function(response) 
            {
				var text = Ext.decode(response.responseText);
				var success = text.success;
				var plnum = text.json.plnum;
				var Rollnum = text.json.Rollnum;
				var weightSum = text.json.weightSum;
				
				var pickedSumCount = text.json.pickedSumCount;
				var pickedSumArea = text.json.pickedSumArea;
				var allocatedSumCount = text.json.allocatedSumCount;
				var allocatedSumArea = text.json.allocatedSumArea;
				
				me.pt2pn1f9form.getForm().findField('susr1').setValue('聚酯薄膜');
				me.pt2pn1f9form.getForm().findField('susr2').setValue('托盘包装');
 				me.pt2pn1f9form.getForm().findField('susr3').setValue(plnum+' 托');  
                me.pt2pn1f9form.getForm().findField('susr4').setValue(Rollnum+' 卷');  
                me.pt2pn1f9form.getForm().findField('susr5').setValue(weightSum+' KG');  
                 
                me.pt2pn1f9form.getForm().findField('susr6').setValue(allocatedSumCount+' KG');  
                me.pt2pn1f9form.getForm().findField('susr7').setValue(allocatedSumArea+' ㎡');  
                me.pt2pn1f9form.getForm().findField('susr8').setValue(pickedSumCount+' KG');  
                me.pt2pn1f9form.getForm().findField('susr9').setValue(pickedSumArea+' ㎡');  
            }
        });
	},
	
	//用户自定义保存
    onSaveSusr: function() {
		var me = this;
		var record = me.pt2pn1f1form.getForm().getFieldValues(); 
		var sku = me.pt2pn1f9form.getForm().findField('susr1').getValue()
		var pack = me.pt2pn1f9form.getForm().findField('susr2').getValue()
		var plnum = me.pt2pn1f9form.getForm().findField('susr3').getValue()
		var Rollnum = me.pt2pn1f9form.getForm().findField('susr4').getValue()
		var weightSum = me.pt2pn1f9form.getForm().findField('susr5').getValue()
		
		var allocatedSumCount = me.pt2pn1f9form.getForm().findField('susr6').getValue()
		var allocatedSumArea = me.pt2pn1f9form.getForm().findField('susr7').getValue()
		var pickedSumCount= me.pt2pn1f9form.getForm().findField('susr8').getValue()
		var pickedSumArea = me.pt2pn1f9form.getForm().findField('susr9').getValue()
		
		Ext.Ajax.request({
			url : basePath + '/outbound/doSaveSusr.action',
			params : {
				  orderKey:record.orderKey,
				  sku:sku,
				  pack:pack,
				  plnum:plnum,
				  Rollnum:Rollnum,
				  weightSum:weightSum,
				  pickedSumCount:pickedSumCount,
				  pickedSumArea:pickedSumArea,
				  allocatedSumCount:allocatedSumCount,
				  allocatedSumArea:allocatedSumArea
			},
			success : function(response) 
            {
				var text = Ext.decode(response.responseText);
				var success = text.success;
				if(1==text.json.msg){
					MessageBox.show(success, "保存成功");
				}else{
					MessageBox.error('错误提示','保存失败');
				}
            }
        });
	},
    //从form获取主表参数，删除主表和相关明细表记录的方法
    onDeleteSoAndDetal: function(){
		var me = this;
    	var record = me.pt2pn1f1form.getForm().getFieldValues(); 
    	if(record.orderKey == ""){
    		MessageBox.error('错误提示','请选择操作的数据！');
    		return;
    	}
        else
        {
        	Ext.MessageBox.confirm('询问提示', '确定要删除吗？', 
    			function(btn){
    				if(btn == 'yes'){    
                        Ext.Ajax.request({
                            url: basePath + '/outbound/doDeleteOrders.action',
                            params: {
                                orderKey: record.orderKey
                            },
                            success: function(response){
                                var text = Ext.decode(response.responseText);
                                var success = text.success;
                                MessageBox.show(success, text.json.msg);
                                if(success==true)    //删除成功才清空相关form
                                {
                                    me.pt2pn1f1form.getForm().reset();
                                    me.pt2pn1f2form.getForm().reset();
                                    me.pt2pn1f3form.getForm().reset();
                                    me.pt2pn1f4form.getForm().reset();
                                    me.pt2pn1f5form.getForm().reset();
                                    me.pt2pn1f6form.getForm().reset();
                                    me.pt2pn1f7form.getForm().reset();
                                    me.pt2pn1f8form.getForm().reset();
                                    me.pt2pn1f9form.getForm().reset();
                                    me.sogrid.getStore().load();
                                    me.sodetailform.getForm().reset();
                                    me.sodetailgrid.getStore().removeAll();
                                    me.undetailgrid.getStore().removeAll();
                                }
                            }
                        });
    				}
                }
			);  
    	}
    },    
    
    onAddDetail: function(){
    	this.sodetailform.getForm().reset();
   		this.pt2pn2tabpanel.setActiveTab(1);        
        
        this.lineNoStore = Ext.create('Ext.data.Store', {
	        remoteSort: true,
            autoLoad: true,
            fields: [
                        {name:'id'},
                        {name:'orderKey'},
                        {name:'lineNumber'}
            ],
	        proxy: {
	            type: 'ajax',
                //添加明细时，根据receiptKey查找。如果找不到，设置为1
	            url: basePath + '/outbound/doCreateOrderDetailLineNumber.action?orderKey='+this.pt2pn1f1form.getForm().findField('orderKey').getValue(),
	            reader: {type: 'json',root: 'json.data',totalProperty: 'json.totalCount'},
	            actionMethods: { read: 'POST' },
	            simpleSortMode: true
	        },
            //加载数据到store，通过监听事件来设置
            listeners: {
                'load':function(sto,recs){
                  if(0!=sto.totalCount)
                    {
                        var value=sto.getAt(0).get('lineNumber');
                        this.sodetailform.getForm().findField('lineNumber').setValue(value);
                    }
                    else
                    {
                        this.sodetailform.getForm().findField('lineNumber').setValue('1');
                    }
                },scope:this
            }
	    });

        //添加明细时改为可以编辑
        this.onSetDetailReadOnly(false);
        this.onSetDetailKeyReadOnly(false);
    },

    //删除明细表多条记录的方法
	onMultiDelete: function(){
		var me = this;
        var orderKeyValue=this.pt2pn1f1form.getForm().findField('orderKey').getValue();
		var records = me.sodetailgrid.getSelectionModel().getSelection();
		if(records == ""){
			MessageBox.error("错误提示","请选择要操作的数据！");
		 	return;
		} 
		var ids = []; 
		Ext.Array.each(records, function(name, index, countriesItSelf) {
			ids.push(name.getData().id);
		});

        Ext.MessageBox.confirm('询问提示', '确定要删除吗？', 
            function(btn){
                if(btn == 'yes'){    
                    Ext.Ajax.request({
                        url: basePath + '/outbound/doMultiDeleteOrderDetail.action',
                        params: {
                            ids: ids
                        },
                        success: function(response){
                            var text = Ext.decode(response.responseText);
                            var success = text.success;
                            MessageBox.show(success, text.json.msg);
                            
                            //保存成功后，需要清空明细表，更新主表状态
                            if(true==success)
                            {
                                //主表对应的form不能清空，需要单独更新状态
                                me.sodetailform.getForm().reset();   //清空后明细表状态更新问题就不存在了
                                me.sodetailgrid.getStore().load();
                                me.undetailgrid.getStore().load();
                                me.sogrid.getStore().load();

                                //保存完成时，更新主表状态，并 根据主表状态判断是否需要设置主表的字段为只读
                                Ext.Ajax.request({
                                    url: basePath + '/outbound/doQueryOrdersStatus.action',
                                    params: {
                                        orderKey: orderKeyValue
                                    },
                                    success: function(response){
                                        var text = Ext.decode(response.responseText);
                                        var success = text.success;
                                        if(0 != text.json.data.length)   //receiptKey唯一，应该只有一条记录
                                        {
                                            //更新主表状态
                                            var statusValue=text.json.data[0].status;
                                            me.pt2pn1f1form.getForm().findField('status').setValue(statusValue)
                                            if('0'!=statusValue)
                                            {
                                                me.onSetOrdersReadOnly(true);      //根据状态设置是否可以编辑
                                                me.onSetOrdersKeyReadOnly(true); 
                                            }
                                            if(statusValue=='0'||statusValue=='1'||statusValue=='2')
                                            {   //load 时判断如果状态是0，1，或2可以编辑
                                                me.onSetActualshipdateReadOnly(false);
                                            }
                                            else
                                            {    //其他情况，不能编辑
                                                me.onSetActualshipdateReadOnly(true);
                                            }                                             
                                        }
                                    }
                                });
                            }                 
                        }
                    });
                }
            }
        );  
    },    
    
//修改结算幅宽和结算面积，长阳专用
    createWinAmendFrom: function(){
    	var me = this;
    	this.winamendform = Ext.create('Ext.window.Window',{
	    	title: '结算或别型号修改',
		    height: 300,
		    width: 250,
		    layout: 'vbox',
	        defaults: {
	        	xtype: 'fieldcontainer'
	        },
	        items: [
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 60,
                        margin: '5 0 0 10',
                        xtype: 'textfield',
                        width: 200
                    },
                    items: [
                        {
                            fieldLabel: '起始行号',
                            itemId: 'firstLineId'
                        }
                    ]
                } ,{
                    layout: 'hbox',
                    defaults:{
                        margin: '0 0 0 10',
                        labelWidth: 60,
                        width: 200,
                        xtype: 'textfield'
                    },
                    items: [
                        {
                        	xtype: 'textfield',
                        	decimalPrecision:3,
                            fieldLabel: '别型号',
                            itemId: 'udf4Id'
                        }
                    ]
                } ,
                {
                    layout: 'hbox',
                    defaults:{
                        margin: '0 0 0 10',
                        labelWidth: 60,
                        width: 200,
                        xtype: 'textfield'
                    },
                    items: [
                        {
                        	xtype: 'numberfield',
                        	decimalPrecision:3,
                            fieldLabel: '结算幅宽',
                            itemId: 'udf2Id'
                        }
                    ]
                },
             /*   {
                    layout: 'hbox',
                    defaults:{
                        margin: '0 0 0 10',
                        labelWidth: 60,
                        width: 200,
                        xtype: 'textfield'
                    },
                    items: [
                        {
                            fieldLabel: '结算面积',
                            itemId: 'udf3Id'
                        }
                    ]
                },*/
                {
                    layout: 'hbox',
                    defaults:{
                        margin: '0 0 0 10',
                        labelWidth: 60,
                        width: 200,
                        xtype: 'textfield'
                    },
                    items: [
                        {
                            fieldLabel: '结束行号',
                            itemId: 'lastLineId'
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        margin: '0 0 0 50',
                        xtype: 'checkbox'
                    },
                    items: [
                        {
                            itemId: 'toLastId',
                            inputValue: true, 
                            boxLabel: '更新至最后一行',
                            listeners:{
                                change:function(txt){
                                    if(true==txt.checked)
                                    {
                                        me.winamendform.queryById('lastLineId').setValue();  
                                        me.winamendform.queryById('lastLineId').disable();  
                                    }
                                    else
                                    {
                                        me.winamendform.queryById('lastLineId').enable();  
                                    }
                                }
                            } 
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 60,
                        width : 80,
                        margin: '0 0 0 20',
                        xtype: 'button'
                    },
                    items: [
                        {
                            text: '确定',
                            handler: me.onUdfAmend,
                            scope: this,
                            margin: '0 0 0 20'
                        },
                        {
                            text: '退出',
                            scope: this,
                            handler: function(){
                                me.winamendform.close();
                            }
                        }
                    ]
                },
                {
                    layout: 'hbox',
                    defaults:{
                        labelWidth: 60,
                      	width:200 ,
                        margin: '0 0 0 20' 
                    },
                    items: [
                        {xtype:'label',text:'注:两者都做单独修改，若两者都有值，默认只修改别型号。'}
                    ]
                }
            ]
    	});
    	this.winamendform.on('close',function(){
    		delete this.winamendform;
    	},this);
    	return this.winamendform;
    
    },

	onUdfAmend: function(){
		var me = this;
        var orderKeyValue=this.pt2pn1f1form.getForm().findField('orderKey').getValue();

		var firstLineValue = me.winamendform.queryById('firstLineId').getValue();
		var udf2Value = me.winamendform.queryById('udf2Id').getValue();
		var udf4Value = me.winamendform.queryById('udf4Id').getValue();
//		var udf3Value = me.winamendform.queryById('udf3Id').getValue();
		var lastLineValue = me.winamendform.queryById('lastLineId').getValue();
		var toLastValue = me.winamendform.queryById('toLastId').getValue();
        var flag = 'UDF4';
        if(null==orderKeyValue ||''== orderKeyValue){
		 	MessageBox.error("错误提示","请填写orderKey！");
		 	return;
		}

        if(((''==lastLineValue)&&(false==toLastValue)))
        {
		 	MessageBox.error("错误提示","请填写结束行");
		 	return;
		}
		//为使用同一方法,定义标志位,两个方法在后台是分开的;
		//为空则修改结算幅宽;
		if(''==udf4Value||null== udf4Value)
        {
		 	flag = 'UDF3'
		}
		Ext.Ajax.request({
		    url: basePath + '/outbound/doUdfAmendForCY.action',
		    params: {
                orderKey:orderKeyValue,
		    	firstLineValue: firstLineValue,
		        udf2Value: udf2Value,
		        udf4Value: udf4Value,
		        flag:flag,
//		        udf3Value: udf3Value,
		        lastLineValue: lastLineValue,
		        toLastValue: toLastValue
		    },
		    success: function(response){
		        var text = Ext.decode(response.responseText);
		        var success = text.success;
                if(true==success)
                {
                    MessageBox.show(success, text.json.msg);
      		        me.sodetailgrid.getStore().load();
                    me.winamendform.close();
                }
                else
                {
                    MessageBox.show(success, "更新失败!");
                }
		    }            
        })
},

    

//参考在transaction-104.js做的例子，重新写保存的方法
//还是保存失败

 /*   saveSo: function(){
    	var me = this;
        var pt2pn1f1form = this.pt2pn1f1form.getForm();
    	pt2pn1f1form.submit({
		    clientValidation: true,
		    url:  basePath + '/outbound/saveOrdersItem.action',
		    params: {},
		    success: function(form, action) {
		    	var success = action.result;
		        MessageBox.show(success, success.json.msg);
		        pt2pn1f1form.reset();
		        me.sogrid.getStore().load();
		        me.sodetailgrid.getStore().load();
		    },
		    failure: function(form, action) {
		    	var success = action.result;
		        MessageBox.show(success, success.json.msg);
		        pt2pn1f1form.reset();
		        me.sogrid.getStore().load();
		        me.sodetailgrid.getStore().load();
		    }
		});
    
    }*/

	saveSo: function(){
		var me = this;
        var orderKeyValue=this.pt2pn1f1form.getForm().findField('orderKey').getValue(); //查询状态用
        
    	var pt2pn1f1 = this.pt2pn1f1form.getForm();
    	var pt2pn1f2 = this.pt2pn1f2form.getForm();
    	var pt2pn1f3 = this.pt2pn1f3form.getForm();
    	var pt2pn1f4 = this.pt2pn1f4form.getForm();
    	var pt2pn1f5 = this.pt2pn1f5form.getForm();
    	var pt2pn1f6 = this.pt2pn1f6form.getForm();
    	var pt2pn1f9 = this.pt2pn1f9form.getForm();
    	var sodetail = this.sodetailform.getForm();
        
    	var pt2pn1f1Values = pt2pn1f1.getValues();
    	var pt2pn1f2Values = pt2pn1f2.getValues();
    	var pt2pn1f3Values = pt2pn1f3.getValues();
    	var pt2pn1f4Values = pt2pn1f4.getValues();
    	var pt2pn1f5Values = pt2pn1f5.getValues();
    	var pt2pn1f6Values = pt2pn1f6.getValues();
    	var pt2pn1f9Values = pt2pn1f9.getValues();
    	var sodetailValues = sodetail.getValues();

    	if(!(pt2pn1f1.isValid())||!(pt2pn1f2.isValid())||!(pt2pn1f3.isValid())||!(pt2pn1f4.isValid())||!(pt2pn1f5.isValid())||!(pt2pn1f6.isValid())||!(sodetail.isValid())||!(pt2pn1f9.isValid())) return;
    	Ext.Ajax.request({
		    url: basePath + '/outbound/saveOrdersItem.action',
		    params: {
                //基本信息
                id: pt2pn1f1Values.id,
                orderKey: pt2pn1f1Values.orderKey,
                orderDate:pt2pn1f1Values.orderDate,
                orderNumber:pt2pn1f1Values.orderNumber,
                type: pt2pn1f1Values.type,
                status: pt2pn1f1Values.status,
                storerKey: pt2pn1f1Values.storerKey,
                storerDescr: pt2pn1f1Values.storerDescr,
                dateStart: pt2pn1f1Values.dateStart,
                dateEnd: pt2pn1f1Values.dateEnd,
                dock: pt2pn1f1Values.dock,
                actualshipdate: pt2pn1f1Values.actualshipdate,
                deliveryDate: pt2pn1f1Values.deliveryDate,
                retailReference: pt2pn1f1Values.retailReference,
                buyerpo: pt2pn1f1Values.buyerpo,
                carrierReference: pt2pn1f1Values.carrierReference,
                warehouseReference: pt2pn1f1Values.warehouseReference,
                otherReference1: pt2pn1f1Values.otherReference1,
                otherReference2: pt2pn1f1Values.otherReference2,
                otherReference3: pt2pn1f1Values.otherReference3,
                otherReference4: pt2pn1f1Values.otherReference4,
                
//                createWho: pt2pn1f1Values.createWho,
                shipper: pt2pn1f1Values.shipper,
                checker: pt2pn1f1Values.checker,
                
                addDate: pt2pn1f1Values.addDate,
                addWho: pt2pn1f1Values.addWho,  
                opstatus:pt2pn1f1Values.opstatus,  
		        externorderkey:pt2pn1f1Values.externorderkey,  
                
                //运输
                vesselType: pt2pn1f2Values.vesselType,
                vesselDate: pt2pn1f2Values.vesselDate,
                placeofloading: pt2pn1f2Values.placeofloading,
                origincountry: pt2pn1f2Values.origincountry,
                vesselNo: pt2pn1f2Values.vesselNo,
                placeofdischarge: pt2pn1f2Values.placeofdischarge,
                placeofdelivery: pt2pn1f2Values.placeofdelivery,
                destination: pt2pn1f2Values.destination,
                driver: pt2pn1f2Values.driver,
                paymentTerms: pt2pn1f2Values.paymentTerms,
                paymentNotes: pt2pn1f2Values.paymentNotes,
                transMethod: pt2pn1f2Values.transMethod,
                incoTerms: pt2pn1f2Values.incoTerms,
                deliveryNotes: pt2pn1f2Values.deliveryNotes,

                //采购商信息
                buyer: pt2pn1f3Values.buyer,
                buyerCompany: pt2pn1f3Values.buyerCompany,
                buyerAddress: pt2pn1f3Values.buyerAddress,
                buyerContact: pt2pn1f3Values.buyerContact,
                buyerMobile: pt2pn1f3Values.buyerMobile,
                buyerTel: pt2pn1f3Values.buyerTel,
                buyerNation: pt2pn1f3Values.buyerNation,
                buyerProvince: pt2pn1f3Values.buyerProvince,
                buyerCity: pt2pn1f3Values.buyerCity,
                buyerCounty: pt2pn1f3Values.buyerCounty,
                buyerPosition: pt2pn1f3Values.buyerPosition,
                buyerFax: pt2pn1f3Values.buyerFax,
                buyerEmail: pt2pn1f3Values.buyerEmail,
                
                //结算方信息
                billto: pt2pn1f4Values.billto,
                billtoName: pt2pn1f4Values.billtoName,
                billtoAddress: pt2pn1f4Values.billtoAddress,
                billtoContact: pt2pn1f4Values.billtoContact,
                billtoMobile: pt2pn1f4Values.billtoMobile,
                billtoTel: pt2pn1f4Values.billtoTel,
                billtoNation: pt2pn1f4Values.billtoNation,
                billtoProvince: pt2pn1f4Values.billtoProvince,
                billtoCity: pt2pn1f4Values.billtoCity,
                billtoCounty: pt2pn1f4Values.billtoCounty,
                billtoPosition: pt2pn1f4Values.billtoPosition,
                billtoFax: pt2pn1f4Values.billtoFax,
                billtoEmail: pt2pn1f4Values.billtoEmail,
 
                //收货方信息
                consigneeKey: pt2pn1f5Values.consigneeKey,
                consigneeCompany: pt2pn1f5Values.consigneeCompany,
                consigneeAddress: pt2pn1f5Values.consigneeAddress,
                consigneeContact: pt2pn1f5Values.consigneeContact,
                consigneeMobile: pt2pn1f5Values.consigneeMobile,
                consigneeTel: pt2pn1f5Values.consigneeTel,
                consigneeNation: pt2pn1f5Values.consigneeNation,
                consigneeProvince: pt2pn1f5Values.consigneeProvince,
                consigneeCity: pt2pn1f5Values.consigneeCity,
                consigneeCounty: pt2pn1f5Values.consigneeCounty,
                consigneePosition: pt2pn1f5Values.consigneePosition,
                consigneeFax: pt2pn1f5Values.consigneeFax,
                consigneeEmail: pt2pn1f5Values.consigneeEmail,
                
                //承运方
                carrierKey: pt2pn1f6Values.carrierKey,
                carrierCompany: pt2pn1f6Values.carrierCompany,
                carrierAddress: pt2pn1f6Values.carrierAddress,
                carrierContact: pt2pn1f6Values.carrierContact,
                carrierMobile: pt2pn1f6Values.carrierMobile,
                carrierTel: pt2pn1f6Values.carrierTel,
                carrierNation: pt2pn1f6Values.carrierNation,
                carrierProvince: pt2pn1f6Values.carrierProvince,
                carrierCity: pt2pn1f6Values.carrierCity,
                carrierCounty: pt2pn1f6Values.carrierCounty,
                carrierPosition: pt2pn1f6Values.carrierPosition,
                carrierFax: pt2pn1f6Values.carrierFax,
                carrierEmail: pt2pn1f6Values.carrierEmail,
                
                //自定义
                susr1: pt2pn1f9Values.susr1,
                susr2: pt2pn1f9Values.susr2,
                susr3: pt2pn1f9Values.susr3,
                susr4: pt2pn1f9Values.susr4,
                susr5: pt2pn1f9Values.susr5,
                notes: pt2pn1f9Values.notes,

                //字段在表中都没有
                
		        //明细表
                detailId:sodetailValues.id,
                lineNumber: sodetailValues.lineNumber,
                dstatus: sodetailValues.status, //防止重复，改名
                sku: sodetailValues.sku,
                altsku: sodetailValues.altsku,
                name: sodetailValues.name,
                packKey: sodetailValues.packKey,
                dstatus: sodetailValues.status,
                uom: sodetailValues.uom,
                descr: sodetailValues.descr,
                qtyOrdered: sodetailValues.qtyOrdered,
                qtyUomOrdered: sodetailValues.qtyUomOrdered,
                qtyPreallocated: sodetailValues.qtyPreallocated,
                qtyUomPreallocated: sodetailValues.qtyUomPreallocated,
                qtyAllocated: sodetailValues.qtyAllocated,
                qtyUomAllocated: sodetailValues.qtyUomAllocated,
                qtyPicked: sodetailValues.qtyPicked,
                qtyUomPicked: sodetailValues.qtyUomPicked,
                qtyShipped: sodetailValues.qtyShipped,
                qtyUomShipped: sodetailValues.qtyUomShipped,
                rotationStrategykey: sodetailValues.rotationStrategykey,
                preAllocationStrategyKey: sodetailValues.preAllocationStrategyKey,
                allocationStrategyKey: sodetailValues.allocationStrategyKey,
                lottable01: sodetailValues.lottable01,
                lottable02: sodetailValues.lottable02,
                lottable03: sodetailValues.lottable03,
                lottable04: sodetailValues.lottable04,
                lottable05: sodetailValues.lottable05,
                lottable06: sodetailValues.lottable06,
                lottable07: sodetailValues.lottable07,
                lottable08: sodetailValues.lottable08,
                lottable09: sodetailValues.lottable09,
                lottable10: sodetailValues.lottable10,
                lottable11: sodetailValues.lottable11,
                lottable12: sodetailValues.lottable12,
                lottable13: sodetailValues.lottable13,
                lottable14: sodetailValues.lottable14,
                lottable15: sodetailValues.lottable15,
                lottable16: sodetailValues.lottable16,
                lottable17: sodetailValues.lottable17,
                lottable18: sodetailValues.lottable18,
                lottable19: sodetailValues.lottable19,
                lottable20: sodetailValues.lottable20,
                udf1: sodetailValues.udf1,
                udf2: sodetailValues.udf2,
                udf3: sodetailValues.udf3,
                udf4: sodetailValues.udf4,
                udf5: sodetailValues.udf5,
                daddDate: sodetailValues.addDate,
                daddWho: sodetailValues.addWho                  
		    },
		    success: function(response){
		        var text = Ext.decode(response.responseText);
		        var success = text.success;
		        MessageBox.show(success, text.json.msg);
                //保存成功后，需要清空明细表，更新主表状态
                if(true==success)
                {
                    //主表对应的form不能清空，需要单独更新状态
                    me.sodetailform.getForm().reset();   //清空后明细表状态更新问题就不存在了
                    me.sodetailgrid.getStore().load();
                    me.undetailgrid.getStore().load();
                    me.sogrid.getStore().load();

                    //保存完成时，更新主表状态，并 根据主表状态判断是否需要设置主表的字段为只读
                    Ext.Ajax.request({
                        url: basePath + '/outbound/doQueryOrdersStatus.action',
                        params: {
                            orderKey: orderKeyValue
                        },
                        success: function(response){
                            var text = Ext.decode(response.responseText);
                            var success = text.success;
                            if(0 != text.json.data.length)   //receiptKey唯一，应该只有一条记录
                            {
                                //更新主表状态
                                var statusValue=text.json.data[0].status;
                                me.pt2pn1f1form.getForm().findField('status').setValue(statusValue)
                                if('0'!=statusValue)
                                {
                                    me.onSetOrdersReadOnly(true);      //根据状态设置是否可以编辑
                                    me.onSetOrdersKeyReadOnly(true); 
                                }
                                if(statusValue=='0'||statusValue=='1'||statusValue=='2')
                                {   //load 时判断如果状态是0，1，或2可以编辑
                                    me.onSetActualshipdateReadOnly(false);
                                }
                                else
                                {    //其他情况，不能编辑
                                    me.onSetActualshipdateReadOnly(true);
                                }                                                     
                            }
                        }
                    });
                }                 
            }
		});
	},
    //以下是取消分配、人工分配相关的方法

    //取消已经拣完的货物，拣货明细还原
	onCancelPickedSku: function(){
		var me = this;
		var pickValues= me.pt2pn2f51form.getForm().getFieldValues();

        Ext.MessageBox.confirm('询问提示', '确定要取消吗？', 
            function(btn){
                if(btn == 'yes'){          
                    Ext.Ajax.request({
                        url: basePath + '/outbound/doCancelPickedSku.action',
                        params: {
                            id: pickValues.id,
							qty:pickValues.qty,
							qtypicked:pickValues.qtypicked
                        },
                        success: function(response){
                            var text = Ext.decode(response.responseText);
                            var success = text.success;
                            MessageBox.show(success, text.json.msg);
                     
                            me.sogrid.getStore().load();
                            me.sodetailform.getForm().reset();
                            me.sodetailgrid.getStore().load();
                            me.undetailgrid.getStore().load();
                        }
                    });
                }
            }
        ); 
    },    
                    
                    
    //取消拣货明细，如果部分已经拣货，需要拆分两条或者多天拣货明细
	onCancelPickdetail: function(){
		var me = this;
		var orderValues= me.pt2pn1f1form.getForm().getFieldValues(); 
    	if((orderValues.orderKey == "")||(orderValues.storerKey == "")){
    		MessageBox.error('错误提示','请选择操作的数据！');
    		return;
    	}       
		var pickValues= me.pt2pn2f51form.getForm().getFieldValues();
    	if((pickValues.lineNumber == "")||(pickValues.sku == "")){
    		MessageBox.error('错误提示','请选择操作的数据！');
    		return;
    	}       

        Ext.MessageBox.confirm('询问提示', '确定要取消吗？', 
            function(btn){
                if(btn == 'yes'){          
                    Ext.Ajax.request({
                        url: basePath + '/outbound/doCancelPickDetail.action',
                        params: {
                            orderKey: orderValues.orderKey,
                            storerKey: orderValues.storerKey,
                            lineNumber: pickValues.lineNumber,
                            id: pickValues.id,
                            sku: pickValues.sku,
							qty:pickValues.qty,
							qtypicked:pickValues.qtypicked
                        },
                        success: function(response){
                            var text = Ext.decode(response.responseText);
                            var success = text.success;
                            MessageBox.show(success, text.json.msg);
                            me.sogrid.getStore().load();
//                          me.sodetailform.getForm().reset();
                            me.sodetailgrid.getStore().load();
                            me.undetailgrid.getStore().load();
                            me.pt2pn2f3grid.getStore().load();     //拣货明细grid重新加载
                        }
                    });
                }
            }
        );          
    },

    //查询库存，只显示可用的
	onSelectLotxLocxId: function(){
		var me = this;
        me.pt2pn2f52grid.getStore().load();
    },
    
    //手工分配
	onAllocatePickdetail: function(){
		var me = this;
		var records = me.pt2pn2f52grid.getSelectionModel().getSelection();
		if(records == ""){
			MessageBox.error("错误提示","请选择要操作的数据！");
		 	return;
		} 
		var ids = []; 
		Ext.Array.each(records, function(name, index, countriesItSelf) {
			ids.push(name.getData().id);
		});

        //主表显示的form
        orderValues = this.pt2pn1f1form.getForm().getFieldValues();
        //手工分配参数的form
        pickValues = this.pt2pn2f51form.getForm().getFieldValues();
        //so明细表form
        sodetailValues = this.sodetailform.getForm().getFieldValues();
        
        //重要参数校验
        if((orderValues.orderKey == "")||(pickValues.lineNumber == "")){
			MessageBox.error("错误提示","SO编号或者行号为空，请检查数据！");
		 	return;
		} 
        
        Ext.MessageBox.confirm('询问提示', '确定手工分配吗？', 
            function(btn){
                if(btn == 'yes'){    
                    Ext.Ajax.request({
                        url: basePath + '/outbound/doHandAllocate.action',
                        params: {
                            ids: ids,
                            orderKey: orderValues.orderKey,
                            lineNumber: pickValues.lineNumber,
                            id: pickValues.id,
                            packKey: sodetailValues.packKey,
                            uom: sodetailValues.uom,
                            qty:pickValues.qty,
                            qtypicked:pickValues.qtypicked,
							lot:pickValues.lot
                        },
                        success: function(response){
                            var text = Ext.decode(response.responseText);
                            var success = text.success;
                            MessageBox.show(success, text.json.msg);
                            me.sodetailgrid.getStore().load();     //orderdetail状态和已分配数量也会发生变化，需要更新
                            me.undetailgrid.getStore().load();
                            me.pt2pn2f3grid.getStore().load();     //拣货明细grid重新加载
                            me.pt2pn2f52grid.getStore().load();   //人工分配完成后可用数量也重新计算一边
                        }
                    });
                }
            }
        );  
    }
});

Ext.onReady(function(){
    new Ext.LoadMask('loading-mask', {msg:"打开中，请稍候..."});
    Ext.QuickTips.init();
    Ext.Ajax.timeout = 600000;  
    Ext.widget('viewport', {
    	id : 'viewportName',
        renderTo: Ext.getBody(),
        layout: 'fit',
        items: [Ext.widget('sotab')]
    });
});