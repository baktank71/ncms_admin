package ts.ncms.ad.cmmn.service;

import java.util.Map;

import ts.ncms.ad.cmmn.sys.exception.NCmsException;
/** 
 * Description  : 공통 Service 
 * System       : cpfms_ha 
 * Program ID   : CmmnService 
 * Creater      : 박소희 
 * Create Date  : 2019. 07. 18. 
 * Updater      : 
 * Update Date  :  
 * Update Desc. :  
 * 
 * @version 1.0 
 * @author Copyright (c) 2013 by SOULINFOTECH. All Rights Reserved. 
 */
public interface CmmnService {

	/**
     * 제작사 페이징 목록 총 갯수
     * @param paramsMap
     * @return
     * @throws NCmsException
     */
	public Map<String, Object> selectPrdctList(Map<String, Object> paramsMap) throws NCmsException;

}
