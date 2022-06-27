package ts.ncms.ad.cr.dao;

import java.util.Map;

import org.springframework.stereotype.Repository;

import ts.ncms.ad.cmmn.dao.AbstractDAO;
import ts.ncms.ad.cmmn.sys.exception.NCmsException;

/** 
 * Description  : 리콜알리미 DAO
 * System       : cpfms_ha
 * Program ID   : RecallNtcnManageDao
 * Creater      : 박소희
 * Create Date  : 2019. 10. 30.
 * Updater      : 
 * Update Date  :  
 * Update Desc. :  
 * 
 * @version 1.0 
 * @author Copyright (c) 2013 by SOULINFOTECH. All Rights Reserved. 
 */
@Repository
public class RecallNtcnManageDao extends AbstractDAO{

	/**
     * 리콜 알리미 목록
     * @param paramsMap
     * @return
     * @throws NCmsException
     */
	public Map<String, Object> list(Map<String, Object> paramsMap) {
		return selectPagingList("cr.recallNtcn.list", paramsMap);  
		

	}
	
	/**
	 * 리콜 알리미 상세보기
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	public Map<String, Object> detail(Map<String, Object> paramsMap) throws NCmsException {
		return selectOne("cr.recallNtcn.detail", paramsMap);
	}
	
	/**
	 * 해지신청 저장 (flag = "y")
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	public int deleteUser(Map<String, Object> paramsMap) throws NCmsException {
		return update("cr.recallNtcn.deleteUser", paramsMap);
	}
	
	/**
	 * 패스워드 리셋 (생년월일 + 성별)
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	public int resetPassword(Map<String, Object> paramsMap) throws NCmsException {
		return update("cr.recallNtcn.resetPassword", paramsMap);
	}

}