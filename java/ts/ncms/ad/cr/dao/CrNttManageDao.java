package ts.ncms.ad.cr.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import ts.ncms.ad.cmmn.dao.AbstractDAO;
import ts.ncms.ad.cmmn.sys.exception.NCmsException;

/** 
 * Description  : 홈페이지 관리자 [자동차리콜센터 게시물관리] DAO
 * System       : cpfms_ha
 * Program ID   : CrCntntsManageDao
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
public class CrNttManageDao extends AbstractDAO {

	/**
     * 게시물관리 목록
     * @param paramsMap
     * @return
     * @throws NCmsException
     */
	public Map<String, Object> list(Map<String, Object> paramsMap) throws NCmsException {
		return selectPagingList("cr.ntt.list", paramsMap);
	}
	
	/**
     * 무상점검정비 목록
     * @param paramsMap
     * @return
     * @throws NCmsException
     */
	public Map<String, Object> listGrts(Map<String, Object> paramsMap) throws NCmsException {
		return selectPagingList("cr.ntt.listGrts", paramsMap);
	}

	/**
     * 팝업존 목록
     * @param paramsMap
     * @return
     * @throws NCmsException
     */
	public Map<String, Object> listPopup(Map<String, Object> paramsMap) throws NCmsException {
		return selectPagingList("cr.ntt.listPopup", paramsMap);
	}
	
	/**
	 * 게시물 상세보기
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	public Map<String, Object> detail(Map<String, Object> paramsMap) throws NCmsException {
		return selectOne("cr.ntt.detail", paramsMap);
	}
	
	/**
	 * 게시물 상세보기 (파일 리스트)
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	public List<Map<String, Object>> detailFile(String contentsId) throws NCmsException {
		return selectList("cr.ntt.detailFile", contentsId);
	}
	
	/**
     * 무상점검정비 상세 조회
     * @param paramsMap
     * @return
     * @throws NCmsException
     */
	public Map<String, Object> detailGrts(Map<String, Object> paramsMap) throws NCmsException {
		return selectOne("cr.ntt.detailGrts", paramsMap);
	}
	
	/**
	 * 무상점검정비 상세 조회 파일 첨부
	 * @param gratischeckId
	 * @return
	 * @throws NCmsException
	 */
	public List<Map<String, Object>> infoGrtsFileList(String gratischeckId) throws NCmsException {
		return selectList("cr.ntt.infoGrtsFileList", gratischeckId);
	}
	
	/**
     * 팝업존 상세 조회
     * @param paramsMap
     * @return
     * @throws NCmsException
     */
	public Map<String, Object> detailPopup(Map<String, Object> paramsMap) throws NCmsException {
		return selectOne("cr.ntt.detailPopup", paramsMap);
	}

	/**
	 * 게시물 상세보기의 이전글과 다음글
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	public Map<String, Object> preNext(Map<String, Object> paramsMap) throws NCmsException {
		return selectOne("cr.ntt.preNext", paramsMap);
	}
	public Map<String, Object> preNext2(Map<String, Object> paramsMap) throws NCmsException {
		return selectOne("cr.ntt.preNext2", paramsMap);
	}
	
	/**
	 * 게시물 수정하기
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	public int update(Map<String, Object> paramsMap) throws NCmsException {
		return update("cr.ntt.update", paramsMap);
	}
	
	/**
	 * 게시물 등록하기
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	public int insert(Map<String, Object> paramsMap) throws NCmsException {
		return insert("cr.ntt.insert", paramsMap);
	}

	/**
	 * 게시물 삭제하기
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	public int delete(Map<String, Object> paramsMap) throws NCmsException {
		return delete("cr.ntt.delete", paramsMap);
	}
	
	/**
	 * 게시물 공개상태 변경
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	public int updateOpenYn(Map<String, Object> paramsMap) throws NCmsException {
		return update("cr.ntt.updateOpenYn", paramsMap);
	}
	
	/**
	 * 무상점검수리 공개상태 변경
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	public int updateOpenYnGrts(Map<String, Object> paramsMap) throws NCmsException {
		return update("cr.ntt.updateOpenYnGrts", paramsMap);
	}
	/**
	 * 무상점검수리 sns공유상태 변경
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	public int updateSnsYnGrts(Map<String, Object> paramsMap) throws NCmsException {
		return update("cr.ntt.updateSnsYnGrts", paramsMap);
	}

	/**
	 * 팝업존 Max 가져오기
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	public Object maxPopCount() throws NCmsException {
		return selectOne("cr.ntt.maxPopCount");
	}
	
	/**
	 * 팝업존 Max 변경
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	public int updateMaxPopCount(Map<String, Object> paramsMap) throws NCmsException {
		return update("cr.ntt.updateMaxPopCount", paramsMap);
	}

	/**
	 * 대표 이미지 경로 업데이트
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	public int uploadRepImg(Map<String, Object> paramsMap) throws NCmsException {
		return update("cr.ntt.uploadRepImg", paramsMap);
	}

	/**
	 * 팝업존 배너 이미지 경로 업데이트
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	public int uploadPopImg(Map<String, Object> paramsMap) throws NCmsException {
		return update("cr.ntt.uploadPopImg", paramsMap);
	}

	/**
	 * 팝업존 등록하기
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	public int insertPopup(Map<String, Object> paramsMap) throws NCmsException {
		return insert("cr.ntt.insertPopup", paramsMap);
	}
	
	/**
	 * 팝업존 수정하기
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	public int updatePopup(Map<String, Object> paramsMap) throws NCmsException {
		return update("cr.ntt.updatePopup", paramsMap);
	}

	/**
	 * 팝업존 삭제하기
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	public int deletePopup(Map<String, Object> paramsMap) throws NCmsException {
		return delete("cr.ntt.deletePopup", paramsMap);
	}

	/**
	 * 팝업존 대상 목록 조회
	 * @params paramsMap
	 * @return
	 * @throws NCmsException
	 */
	public Map<String, Object> selectPopupTargetList(Map<String, Object> paramsMap) throws NCmsException {
		return selectAjaxPagingList("cr.ntt.selectPopupTargetList", paramsMap);
	}

	/**
	 * 리콜현황 목록 조회
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	public Map<String, Object> listRcInfo1(Map<String, Object> paramsMap) throws NCmsException {
		return selectPagingList("cr.ntt.listRcInfo1", paramsMap);
	}
	public Map<String, Object> listRcInfo2(Map<String, Object> paramsMap) throws NCmsException {
		return selectPagingList("cr.ntt.listRcInfo2", paramsMap);
	}

	/**
	 * 리콜현황 상세 조회
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	public Map<String, Object> detailRcInfo1(Map<String, Object> paramsMap) throws NCmsException {
		return selectOne("cr.ntt.detailRcInfo1", paramsMap);
	}
	public Map<String, Object> detailRcInfo2(Map<String, Object> paramsMap) throws NCmsException {
		return selectOne("cr.ntt.detailRcInfo2", paramsMap);
	}
	public Map<String, Object> detailRcInfo3(Map<String, Object> paramsMap) throws NCmsException {
		return selectOne("cr.ntt.detailRcInfo3", paramsMap);
	}

	/**
	 * 리콜현황 파일 목록
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	public List<Map<String, Object>> rcInfoFileList1(String recallId) throws NCmsException {
		return selectList("cr.ntt.rcInfoFileList1", recallId);
	}
	public List<Map<String, Object>> rcInfoFileList2(String recallId) throws NCmsException {
		return selectList("cr.ntt.rcInfoFileList2", recallId);
	}
	public List<Map<String, Object>> rcInfoFileList3(String recallId) throws NCmsException {
		return selectList("cr.ntt.rcInfoFileList3", recallId);
	}

	/**
	 * 리콜현황 공개상태 변경
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	public int updateOpenYnRcInfoO(Map<String, Object> paramsMap) throws NCmsException {
		return update("cr.ntt.updateOpenYnRcInfoO", paramsMap);
	}
	public int updateOpenYnRcInfo(Map<String, Object> paramsMap) throws NCmsException {
		return update("cr.ntt.updateOpenYnRcInfo", paramsMap);
	}
	public int updateOpenYnRcInfoC(Map<String, Object> paramsMap) throws NCmsException {
		return update("cr.ntt.updateOpenYnRcInfoC", paramsMap);
	}
	/**
	 * 리콜현황 SNS 공유상태 변경
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	public int updateSnsYnRcInfoO(Map<String, Object> paramsMap) throws NCmsException {
		return update("cr.ntt.updateSnsYnRcInfoO", paramsMap);
	}
	public int updateSnsYnRcInfo(Map<String, Object> paramsMap) throws NCmsException {
		return update("cr.ntt.updateSnsYnRcInfo", paramsMap);
	}
	public int updateSnsYnRcInfoC(Map<String, Object> paramsMap) throws NCmsException {
		return update("cr.ntt.updateSnsYnRcInfoC", paramsMap);
	}

	
	/**
     * 신고내역조회 목록
     * @param paramsMap
     * @return
     * @throws NCmsException
     */
	public Map<String, Object> listSttemnt(Map<String, Object> paramsMap) throws NCmsException {
		return selectPagingList("cr.ntt.listSttemnt", paramsMap);
	}
	
	/**
     * 신고내역조회 상세 조회
     * @param paramsMap
     * @return
     * @throws NCmsException
     */
	public Map<String, Object> selectEptnPetition(Map<String, Object> paramsMap) throws NCmsException {
		return selectOne("cr.ntt.selectEptnPetition", paramsMap);
	}
	public List<Map<String, Object>> selectDefectInfoList(String petitionId) throws NCmsException {
		return selectList("cr.ntt.selectDefectInfoList", petitionId);
	}
	public List<Map<String, Object>> selectDefectInfoDetailList(Map<String, Object> paramsMap) throws NCmsException {
		return selectList("cr.ntt.selectDefectInfoDetailList", paramsMap);
	}
	public Map<String, Object> selectReport(Map<String, Object> paramsMap) throws NCmsException {
		return selectOne("cr.ntt.selectReport", paramsMap);
	}
	public Map<String, Object> selectRecallDis(Map<String, Object> paramsMap) throws NCmsException {
		return selectOne("cr.ntt.selectRecallDis", paramsMap);
	}
	
	/**
	 * 신고내역조회 상세 조회 파일 첨부
	 * @param gratischeckId
	 * @return
	 * @throws NCmsException
	 */
	public List<Map<String, Object>> selectDefectInfoFileList(String petitionId) throws NCmsException {
		return selectList("cr.ntt.selectDefectInfoFileList", petitionId);
	}
	public List<Map<String, Object>> selectReportFileList(String petitionId) throws NCmsException {
		return selectList("cr.ntt.selectReportFileList", petitionId);
	}
	public List<Map<String, Object>> selectRecallDisFileList(String petitionId) throws NCmsException {
		return selectList("cr.ntt.selectRecallDisFileList", petitionId);
	}
	
	/**
	 * 신고내역조회 SNS 공유상태 변경
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	public int updateSnsYnSttemntEP(Map<String, Object> paramsMap) throws NCmsException {
		return update("cr.ntt.updateSnsYnSttemntEP", paramsMap);
	}
	public int updateSnsYnSttemntCMR(Map<String, Object> paramsMap) throws NCmsException {
		return update("cr.ntt.updateSnsYnSttemntCMR", paramsMap);
	}
	public int updateSnsYnSttemntRDM(Map<String, Object> paramsMap) throws NCmsException {
		return update("cr.ntt.updateSnsYnSttemntRDM", paramsMap);
	}
}
