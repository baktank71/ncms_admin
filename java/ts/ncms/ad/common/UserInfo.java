package ts.ncms.ad.common;


import java.io.Serializable;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

public class UserInfo implements Serializable {

	private static final long serialVersionUID = 7695702774678556249L;

	private String mdId       = null;     // 아이디
	private String mbName     = null;     // 성명

	
	public String toString() {
		StringBuffer str = new StringBuffer();

		str.append("+ 성명 : ").append(this.getMbName()).append(" [").append(this.getMdId()).append("]\n");

		return str.toString();
	}

	public UserInfo() {
	}

	/**
	 * 임시로.. ㅡㅡ;
	 * @param req
	 */
	public void init(HttpServletRequest req) {
		HttpSession session = req.getSession();

		this.setMdId((String) session.getAttribute("mb_id"));
		this.setMbName((String)  session.getAttribute("mb_name"));

	}

	public String getMdId() {
		return mdId;
	}

	public void setMdId(String mdId) {
		this.mdId = mdId;
	}

	public String getMbName() {
		return mbName;
	}

	public void setMbName(String mbName) {
		this.mbName = mbName;
	}


}

