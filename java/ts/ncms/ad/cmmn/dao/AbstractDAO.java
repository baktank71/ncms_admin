package ts.ncms.ad.cmmn.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import ts.ncms.ad.common.StringUtils;
import egovframework.rte.psl.dataaccess.EgovAbstractMapper;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

public class AbstractDAO extends EgovAbstractMapper {
	// paging for Altibase
	@SuppressWarnings("unchecked") 
	public Map<String, Object> selectPagingList(String queryId, Object params){ 
		
		Map<String,Object> map = (Map<String,Object>) params; 
		PaginationInfo paginationInfo = null; 

		String strPageIndex = StringUtils.nullCheck(map.get("currentPageNo"), "1"); 
		String strPageRow = StringUtils.nullCheck(map.get("recordCount"), "10"); 
		int nPageIndex = 1; 
		int nPageRow = 10;
		int nPageSize = 10;
		
		if(StringUtils.isNumeric(strPageIndex)){
			nPageIndex = Integer.parseInt(strPageIndex); 
		} 		
		if(StringUtils.isNumeric(strPageRow)){
			nPageRow = Integer.parseInt(strPageRow); 
		} 		
		
		paginationInfo = new PaginationInfo(); 
		paginationInfo.setCurrentPageNo(nPageIndex); 
		paginationInfo.setRecordCountPerPage(nPageRow); 
		paginationInfo.setPageSize(nPageSize); 

		int start = paginationInfo.getFirstRecordIndex();
		int end = start + paginationInfo.getRecordCountPerPage();
		
		map.put("START", start+1);		
		map.put("END", end);

		params = map; 

		Map<String,Object> returnMap = new HashMap<String,Object>(); 
		List<Map<String,Object>> list = selectList(queryId,params); 
		if(list.size() == 0){ 
			map = new HashMap<String,Object>(); 
			map.put("totalCount",0); 
			list.add(map); 
			if(paginationInfo != null){ 
				paginationInfo.setTotalRecordCount(0); 
				returnMap.put("paginationInfo", paginationInfo); 
			} 
		} else{ 
			if(paginationInfo != null){ 
				paginationInfo.setTotalRecordCount(Integer.parseInt(list.get(0).get("totalCount").toString())); 
				returnMap.put("paginationInfo", paginationInfo); 
			} 
		} 
		
		returnMap.put("result", list); 
		return returnMap;
	
	}

	// Ajax paging for Altibase
	@SuppressWarnings("unchecked") 
	public Map<String, Object> selectAjaxPagingList(String queryId, Object params){ 
		
		Map<String,Object> map = (Map<String,Object>)params; 
		
		String strPageIndex = StringUtils.nullCheck(map.get("pageIndex"), "1"); 
		String strPageRow = StringUtils.nullCheck(map.get("recordCount"), "10"); 
		int nPageIndex = 1; 
		int nPageRow = 10;
		
		if(StringUtils.isNumeric(strPageIndex)){
			nPageIndex = Integer.parseInt(strPageIndex)-1; 
		} 		
		if(StringUtils.isNumeric(strPageRow)){
			nPageRow = Integer.parseInt(strPageRow); 
		} 		
		map.put("startNum", (nPageIndex * nPageRow) + 1); 
		map.put("recordCount", nPageRow);

		//return selectList(queryId, map);
		Map<String,Object> returnMap = new HashMap<String,Object>(); 
		List<Map<String,Object>> list = selectList(queryId,params); 
		
		if(list.size() == 0){ 
			map = new HashMap<String,Object>(); 
			map.put("totalCount",0); 
			list.add(map); 
		}
		
		returnMap.put("result", list); 
		return returnMap; 
	}

}
