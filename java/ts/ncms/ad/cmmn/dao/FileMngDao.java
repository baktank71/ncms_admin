package ts.ncms.ad.cmmn.dao;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;
import ts.ncms.ad.cmmn.sys.exception.NCmsException;

/** 
 * Description  : 첨부파일 Dao
 * System       : cpfms_hp
 * Program ID   : FileMngDao 
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
public class FileMngDao extends EgovAbstractMapper {

	/**
	 * 파일 다운로드 정보 조회(file_id)
	 * @param paramsMap
	 * @param 
	 * @return
	 * @throws IOException 
	 */
	public Map<String, Object> selectFileInfo(Map<String, Object> paramsMap) {
	    return selectOne("file.selectFileInfo", paramsMap);
	}
	
	/**
	 * 파일 다운로드 정보 조회(contents_id)
	 * @param paramsMap
	 * @param 
	 * @return
	 * @throws IOException 
	 */
	public List<Map<String, Object>> selectFileList(Map<String, Object> paramsMap) {
	    return selectList("file.selectFileList", paramsMap);
	}

	/**
	 * 파일 정보 DB 입력
	 * @param paramsMap
	 * @param 
	 * @return
	 * @throws IOException 
	 */
	public int uploadFileData(Map<String, Object> paramsMap) {
	    return insert("file.uploadFileData", paramsMap);
	}
	public int uploadQnaFileData(Map<String, Object> paramsMap) {
	    return insert("file.uploadQnaFileData", paramsMap);
	}

	/**
	 * 파일 정보 DB 삭제
	 * @param paramsMap
	 * @param 
	 * @return
	 * @throws IOException 
	 */
	public int deleteFile(Map<String, Object> paramsMap) {
	    return delete("file.deleteFileData", paramsMap);
	}

}
