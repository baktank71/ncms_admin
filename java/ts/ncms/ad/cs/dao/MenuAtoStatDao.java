package ts.ncms.ad.cs.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import ts.ncms.ad.cmmn.dao.AbstractDAO;
import ts.ncms.ad.cmmn.sys.exception.NCmsException;

/**
 * Description	: 메뉴별 접속통계 Dao
 * System		: cpfms_ha
 * Program ID	: MenuAtoStatDao
 * Creater		: 
 * Create Date	: 2019. 10. 18.
 * Updater		:
 * Update Date	:
 * Update Desc.	:
 * 
 * @version 1.0
 * @author Copyright (c) 2013 by SOULINFOTECH. All Rights Reserved.
 */
@Repository
public class MenuAtoStatDao extends AbstractDAO {

	/**
     * 메뉴별 통계 목록
     * @param paramsMap
     * @return
     * @throws NCmsException
     */
	public List<Map<String, Object>> pvList(Map<String, Object> paramsMap) throws NCmsException {
		return selectList("cs.menuStat.pvList", paramsMap);
	}
	
	/**
     * 통계메뉴명 목록
     * @param paramsMap
     * @return
     * @throws NCmsException
     */
	public Map<String, Object> pvMenuList(Map<String, Object> paramsMap) throws NCmsException {
		return selectPagingList("cs.menuStat.pvMenuList", paramsMap);
	}
	
	/**
	 * 통계메뉴명 상세보기
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	public Map<String, Object> pvMenuDetail(Map<String, Object> paramsMap) throws NCmsException {
		return selectOne("cs.menuStat.pvMenuDetail", paramsMap);
	}

	/**
	 * 통계메뉴명 수정하기
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	public int update(Map<String, Object> paramsMap) throws NCmsException {
		return update("cs.menuStat.update", paramsMap);
	}
	
	/**
	 * 통계메뉴명 등록하기
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	public int insert(Map<String, Object> paramsMap) throws NCmsException {
		return insert("cs.menuStat.insert", paramsMap);
	}

	/**
	 * 통계메뉴명 삭제하기
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	public int delete(Map<String, Object> paramsMap) throws NCmsException {
		return delete("cs.menuStat.delete", paramsMap);
	}
	
	/**
	 * 통계메뉴명 사용상태 변경
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	public int updateUseYn(Map<String, Object> paramsMap) throws NCmsException {
		return update("cs.menuStat.updateUseYn", paramsMap);
	}
	
}
