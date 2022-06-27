package ts.ncms.ad.cmmn.security;

import java.sql.ResultSet;
import java.sql.SQLException;

import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import ts.ncms.ad.om.vo.LoginVO;
import egovframework.rte.fdl.security.userdetails.EgovUserDetails;
import egovframework.rte.fdl.security.userdetails.jdbc.EgovUsersByUsernameMapping;

public class UserDetailMapping extends EgovUsersByUsernameMapping {

  private Logger logger = LoggerFactory.getLogger(this.getClass());

  /**
   * @param ds
   * @param usersByUsernameQuery
   */
  public UserDetailMapping(DataSource ds, String usersByUsernameQuery) {
    super(ds, usersByUsernameQuery);
  }

  /* (non-Javadoc)
   * @see egovframework.com.sec.security.userdetails.jdbc.EgovUsersByUsernameMapping#mapRow(java.sql.ResultSet, int)
   */
  @Override
  protected EgovUserDetails mapRow(ResultSet rs, int rownum) throws SQLException {

    LoginVO lv = new LoginVO();

    logger.info(rs.toString());

    System.out.println("=========================================");
    System.out.println("mapRow");
    System.out.println(rs.getString("userId"));
    System.out.println(rs.getString("userNm"));
    System.out.println(rs.getString("userPw"));
    System.out.println(rs.getString("mbLevel"));

    
//    lv.setMbId(rs.getString("mbId"));
//    lv.setMbPw(rs.getString("mbPw"));
//    lv.setMbNm(rs.getString("mbNm"));
//    lv.setMbLevel(rs.getString("mbLevel"));
    
    
    lv.setMbId(rs.getString("userId"));
    lv.setMbPw(rs.getString("userPw"));
    lv.setMbNm(rs.getString("userNm"));
    lv.setMbLevel(rs.getString("mbLevel"));
    
    
    /*String connIp = "0.0.0.0";
    try {
      connIp = CommonUtil.getIpAddr();
    } catch (UnknownHostException e) {
      logger.debug(e.getLocalizedMessage());
    }
    lv.setConnIp(connIp);*/

    //LoginSuccessHandler
    
    
    System.out.println(lv.getMbId());
    System.out.println(lv.getMbPw());
    
    
    return new EgovUserDetails(lv.getMbId(), lv.getMbPw(), true, lv);
  }
}
