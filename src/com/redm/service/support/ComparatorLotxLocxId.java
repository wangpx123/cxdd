package com.redm.service.support;

import java.util.Comparator;
import java.util.Map;

import com.redm.actions.support.WmsCommon;

public class ComparatorLotxLocxId implements Comparator<Map<String, Object>> {

	@Override
	public int compare(Map<String, Object> o1, Map<String, Object> o2) {
		Float qty1 = WmsCommon.doubleToFloat((Double)o1.get("qty"));
		Float qtyAllo1 = WmsCommon.doubleToFloat((Double)o1.get("qtyallocated"));
		float qtydiff1 = qty1 - qtyAllo1;
		Float qty2 = WmsCommon.doubleToFloat((Double)o2.get("qty"));
		Float qtyAllo2 = WmsCommon.doubleToFloat((Double)o2.get("qtyallocated"));
		float qtydiff2 = qty2 - qtyAllo2;
		return Float.compare(qtydiff1, qtydiff2);
	}

	

}
