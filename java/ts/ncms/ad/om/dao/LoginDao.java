package ts.ncms.ad.om.dao;

import org.springframework.stereotype.Repository;

import ts.ncms.ad.cmmn.sys.dao.CmmnAbstractMapper;
import ts.ncms.ad.cmmn.sys.exception.NCmsException;
import ts.ncms.ad.om.vo.LoginVO;


@Repository
public class LoginDao extends CmmnAbstractMapper {


	/**
     * 사용자 비밀번호 암호화
     * @param paramsMap
     * @return
     * @throws NCmsException
     */
	public String encryptPw(LoginVO lv) throws NCmsException {
		return selectOne("om.login.encryptPw", lv);
	}

	/**
     * 사용자 로그인 실패 횟수 증가
     * @param lv
     * @return
     * @throws NCmsException
     */
	public void updateLoginFailrCo(LoginVO lv) throws NCmsException {
		update("om.login.updateLoginFailrCo", lv);
	}

	/**
     * 사용자 로그인 실패 정보 업데이트
     * @param lv
     * @return
     * @throws NCmsException
     */
	public void updateLoginFailrInfo(LoginVO lv) throws NCmsException {
		update("om.login.updateLoginFailrInfo", lv);
		
	}

	/**
     * 사용자 로그인 접속 이력 등록
     * @param lv
     * @return
     * @throws NCmsException
     */
	public void insertConnLog(LoginVO lv) throws NCmsException {
		insert("om.login.insertConnLog", lv);
		
	}
	/**
	 * 비밀번호 테스트
	 * @param lv
	 * @return
	 * @throws NCmsException
	 */
	public int updatePassword(LoginVO lv) throws NCmsException {
		return update("om.login.updatePassword", lv);
	}
	
	/**
	 * 사용자 비밀번호 체크
	 * @param lv
	 * @return
	 * @throws NCmsException
	 */
	public int passwordChk(LoginVO lv) throws NCmsException {
		return selectOne("om.login.passwordCheck", lv);
	}
	
}