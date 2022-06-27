package ts.ncms.ad.mp.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import ts.ncms.ad.cmmn.dao.AbstractDAO;
import ts.ncms.ad.cmmn.sys.exception.NCmsException;

/** 
 * Description  : 홈페이지 관리자 [제작자 QnA 게시판관리] DAO
 * System       : cpfms_ha
 * Program ID   : MpQnAManageDao
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
public class MpQnAManageDao extends AbstractDAO {

	/**
	 * QnA 게시판 목록 배포
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	
	public Map<String, Object> list(Map<String, Object> paramsMap) throws NCmsException {
		return selectPagingList("mp.qna.list", paramsMap);
	}
	
	/**
	 * QnA 게시판 상세보기
	 * @param paramsMap
	 * @return
	 * throws NCmsException
	 */
	public Map<String, Object> detail(Map<String, Object> paramsMap) throws NCmsException {
		return selectOne("mp.qna.detail", paramsMap);
	}
	
	/**
	 * QnA 게시판 상세 파일 목록
	 * 
	 * @param contentsId
	 * @return
	 * @throws NCmsException
	 */
	public List<Map<String, Object>> detailFile(Map<String, Object> paramsMap) throws NCmsException {
		return selectList("mp.qna.detailFile", paramsMap);
	}
	
	/**
	 * QnA 답변 달아주기
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	public int answer(Map<String, Object> paramsMap) throws NCmsException {
		return update("mp.qna.answerUpdate", paramsMap);
	}
	
	/**
	 * QnA 해당 게시글 삭제
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	public int delete(Map<String, Object> paramsMap) throws NCmsException {
		return delete("mp.qna.answerDelete", paramsMap);
	}
}