package ts.ncms.ad.mp.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import ts.ncms.ad.cmmn.dao.AbstractDAO;
import ts.ncms.ad.cmmn.sys.exception.NCmsException;

/** 
 * Description  : 홈페이지 관리자 [제작자제출자료 게시판관리] DAO
 * System       : cpfms_ha
 * Program ID   : MpNttManageDao
 * Creater      : 이성훈
 * Create Date  : 2019. 10. 18.
 * Updater      : 
 * Update Date  :  
 * Update Desc. :  
 * 
 * @version 1.0 
 * @author Copyright (c) 2013 by SOULINFOTECH. All Rights Reserved. 
 */
@Repository
public class MpNttManageDao extends AbstractDAO {

	/**
	 * 게시판 목록 뿌리기
	 * 
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	
	public Map<String, Object> list(Map<String, Object> paramsMap) throws NCmsException {
		return selectPagingList("mp.ntt.list", paramsMap);
	}

	/**
	 * 게시판 상세보기
	 * 
	 * @param paramsMap
	 * @return
	 * @throws NCmsException 
	 */
	
	public Map<String, Object> detail(Map<String, Object> paramsMap) throws NCmsException {
		return selectOne("mp.ntt.detail", paramsMap);
	}
	
	/**
	 * 게시판 상세보기 [파일 목록]
	 * 
	 * @param contentsId
	 * @return
	 * @throws NCmsException
	 */
	public List<Map<String, Object>> detailFile(String contentsId) throws NCmsException {
		return selectList("mp.ntt.detailFile", contentsId);
	}
	
	/**
	 * 게시판 상세보기 [이전글, 다음글]		(수정 필수)
	 * 
	 * @param contentsId
	 * @return
	 * @throws NCmsException
	 */
	public Map<String, Object> preNext(Map<String, Object> paramsMap) throws NCmsException {
		return selectOne("mp.ntt.preNext", paramsMap);
	}
	
	
	/**
	 * 체크박스 OpenYN
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	public int updateOpenYn(Map<String, Object> paramsMap) throws NCmsException {
		return update("mp.ntt.updateOpenYn", paramsMap);
	}
	
	/**
	 * 수정하기
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	public int update(Map<String, Object> paramsMap) throws NCmsException {
		return update("mp.ntt.update", paramsMap);
	}	
	/**
	 * 삭제하기
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	
	public int delete(Map<String, Object> paramsMap) throws NCmsException {
		return delete("mp.ntt.delete", paramsMap);
	}
	
	/**
	 * 등록하기
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	
	public int insert(Map<String, Object> paramsMap) throws NCmsException {
		return insert("mp.ntt.insert", paramsMap);
	}
	
}