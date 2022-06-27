package ts.ncms.ad.cr.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;
import ts.ncms.ad.cmmn.dao.AbstractDAO;
import ts.ncms.ad.cmmn.sys.exception.NCmsException;

/** 
 * Description  : 홈페이지 컨텐츠관리 DAO
 * System       : cpfms_ha
 * Program ID   : CrCntntsManageDao
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
public class CrCntntsManageDao extends AbstractDAO{

	/**
     * 컨텐츠관리 목록
     * @param paramsMap
     * @return
     * @throws NCmsException
     */
	public Map<String, Object> list(Map<String, Object> paramsMap) {
		return selectPagingList("cr.cntnts.list", paramsMap);
	}
	
	/**
	 * 컨텐츠 상세보기
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	public Map<String, Object> detail(Map<String, Object> paramsMap) throws NCmsException {
		return selectOne("cr.cntnts.detail", paramsMap);
	}
	
	/**
	 * 컨텐츠 등록하기
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	public int insert(Map<String, Object> paramsMap) throws NCmsException {
		return insert("cr.cntnts.insert", paramsMap);
	}
	
	/**
	 * 컨텐츠 수정하기
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	public int update(Map<String, Object> paramsMap) throws NCmsException {
		return update("cr.cntnts.update", paramsMap);
	}

	/**
	 * 컨텐츠 삭제하기
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	public int delete(Map<String, Object> paramsMap) throws NCmsException {
		return delete("cr.cntnts.delete", paramsMap);
	}
	
	/**
	 * 컨텐츠 상세보기 (파일 리스트)
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	public List<Map<String, Object>> detailFile(Map<String, Object> paramsMap) throws NCmsException {
		return selectList("cr.cntnts.detailFile", paramsMap);
	}

	/**
	 * 공유상태 변경
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	public int updateOpenYn(Map<String, Object> paramsMap) throws NCmsException {
		return update("cr.cntnts.updateOpenYn", paramsMap);
	}
	
}
