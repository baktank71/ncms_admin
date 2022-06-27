package ts.ncms.ad.cmmn.dao;

import java.util.Map;

import org.springframework.stereotype.Repository;

import ts.ncms.ad.cmmn.sys.exception.NCmsException;

/** 
 * Description  : 공통 Dao
 * System       : cpfms_hp
 * Program ID   : CmmnDao 
 * Creater      : 박소희 
 * Create Date  : 2019. 07. 18. 
 * Updater      : 
 * Update Date  :  
 * Update Desc. :  
 * 
 * @version 1.0 
 * @author Copyright (c) 2013 by SOULINFOTECH. All Rights Reserved. 
 */
@Repository
public class CmmnDao extends AbstractDAO {

	/**
     * 제작사 페이징 목록
     * @param paramsMap
     * @return
     * @throws NCmsException
     */
	public Map<String, Object> selectPrdctList(Map<String, Object> paramsMap) throws NCmsException {
		return selectAjaxPagingList("cmmn.selectPrdctList", paramsMap);
	}
	
}
