package ts.ncms.ad.om.service.impl;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import egovframework.rte.fdl.security.userdetails.util.EgovUserDetailsHelper;
import ts.ncms.ad.cmmn.sys.exception.NCmsException;
import ts.ncms.ad.cmmn.sys.service.CmmnAbstractServiceImpl;
import ts.ncms.ad.om.dao.LoginDao;
import ts.ncms.ad.om.service.LoginService;
import ts.ncms.ad.om.vo.LoginVO;

@Service
public class LoginServiceImpl extends CmmnAbstractServiceImpl implements LoginService {
	
	private static final Logger logger = LoggerFactory.getLogger(LoginServiceImpl.class);
	
	@Autowired
	private LoginDao loginDao;


	@Override
	public String encryptPw(LoginVO lv) throws NCmsException {
		return loginDao.encryptPw(lv);
	}

	@Override
	public void updateLoginFailrCo(LoginVO lv) throws NCmsException {
		loginDao.updateLoginFailrCo(lv);

		// 실패횟수가 5 이상일 경우
		/*if(lv.getLoginFailrCo() > 4) {
			//1. 계정차단
			loginDao.updateLoginFailrInfo(lv);
			//2. 실패 로그 추가
			lv.setLoginKey("am_LOGIN_FAIL");
			String connIp = "0.0.0.0";
			try {
				connIp = CommonUtil.getIpAddr();
			} catch (UnknownHostException e) {
				logger.debug(e.getLocalizedMessage());
			}
			lv.setConnIp(connIp);
	        loginDao.insertConnLog(lv);
		}*/
	}

	@Override
	public void updateLoginInfo(LoginVO lv) throws NCmsException {
		
//		String uid = loginDao.chkPw(lv);
//		if (uid != "") {
//		loginDao.updatePassword(lv);
//		
//		} else {
//			rtl =1;
//		}
//		return rtl;
		
	}

	@Override
	public void insertConnLog(LoginVO lv) throws NCmsException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public int updatePassword(Map<String, Object> paramsMap) throws NCmsException {
		
		LoginVO lv = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();	//로그인 한 사람의 대한 정보
		String userId = lv.getMbId();
		
		if(userId.equals(paramsMap.get("mbId"))) {		
			lv.setMbPwConfirm((String) paramsMap.get("mbPwConfirm"));
			lv.setMbId((String) paramsMap.get("mbId"));
		} else {
			lv = new LoginVO();
			lv.setMbId((String) paramsMap.get("mbId"));
		}


		
		
		int result = loginDao.updatePassword(lv);
		
		return result;
	}
	
	public int passwordCheck(Map<String, Object> paramsMap) throws NCmsException {
		LoginVO lv = new LoginVO();
		lv.setMbId((String) paramsMap.get("mbId"));  //비밀번호 검증
		lv.setMbPw((String) paramsMap.get("mbPw"));  //비밀번호 검증
		
		return loginDao.passwordChk(lv);
		
	}
}