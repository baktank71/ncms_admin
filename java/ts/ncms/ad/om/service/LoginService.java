package ts.ncms.ad.om.service;

import java.util.Map;

import ts.ncms.ad.cmmn.sys.exception.NCmsException;
import ts.ncms.ad.om.vo.LoginVO;

public interface LoginService {
	

	/**
     * 사용자 비밀번호 암호화
     * @param paramsMap
     * @return
     * @throws NCmsException
     */
	public String encryptPw(LoginVO lv) throws NCmsException;
	
	/**
     * 사용자 로그인 실패 횟수 증가
     * @param paramsMap
     * @return
     * @throws NCmsException
     */
	public void updateLoginFailrCo(LoginVO lv) throws NCmsException;

	/**
     * 사용자 로그인 정보 업데이트
     * @param paramsMap
     * @return
     * @throws NCmsException
     */
	public void updateLoginInfo(LoginVO lv) throws NCmsException;

	/**
     * 사용자 로그인 접속 이력 등록
     * @param paramsMap
     * @return
     * @throws NCmsException
     */
	public void insertConnLog(LoginVO lv) throws NCmsException;
	
	/**
	 * 사용자 비밀번호 체크
	 * @param paramsMap
	 * @return
	 * @throws NCmsException
	 */
	public int passwordCheck(Map<String, Object> paramsMap) throws NCmsException;
	
	/**
	 * 사용자 비밀번호 변경
	 * @param paramsMap
	 * @throws NCmsException
	 */
	public int updatePassword(Map<String, Object> paramsMap) throws NCmsException;
	
}