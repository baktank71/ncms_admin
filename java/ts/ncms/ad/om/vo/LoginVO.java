package ts.ncms.ad.om.vo;

import java.io.Serializable;

public class LoginVO implements Serializable {

	private static final long serialVersionUID = -3033135811557036591L;

	private String mbId;			// 사용자 아이디
	private String mbPw;			// 사용자 비밀번호
	private String mbNm;			// 사용자 이름
	private String mbPwConfirm;	    //새 비밀번호 변경할 시 필수요소
	private String mbLevel;	        //회원 레벨
	
	public String getMbId() {
		return mbId;
	}
	public void setMbId(String mbId) {
		this.mbId = mbId;
	}
	public String getMbPw() {
		return mbPw;
	}
	public void setMbPw(String mbPw) {
		this.mbPw = mbPw;
	}
	public String getMbNm() {
		return mbNm;
	}
	public void setMbNm(String mbNm) {
		this.mbNm = mbNm;
	}
	public String getMbPwConfirm() {
		return mbPwConfirm;
	}
	public void setMbPwConfirm(String mbPwConfirm) {
		this.mbPwConfirm = mbPwConfirm;
	}
	public String getMbLevel() {
		return mbLevel;
	}
	public void setMbLevel(String mbLevel) {
		this.mbLevel = mbLevel;
	}
	@Override
	public String toString() {
		return "LoginVO [mbId=" + mbId + ", mbPw=" + mbPw + ", mbNm=" + mbNm + ", mbPwConfirm=" + mbPwConfirm
				+ ", mbLevel=" + mbLevel + "]";
	}

	
	
	
	

}
