package ts.ncms.ad.cmmn.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import ts.ncms.ad.cmmn.sys.exception.NCmsException;
import ts.ncms.ad.om.service.LoginService;
import ts.ncms.ad.om.vo.LoginVO;

public class PasswordEncoding implements PasswordEncoder {

  private static final Logger logger = LoggerFactory.getLogger(PasswordEncoding.class);

  private PasswordEncoder passwordEncoder;

  @Autowired
  private LoginService amloginService;


  public PasswordEncoding() {
    this.passwordEncoder = new BCryptPasswordEncoder();
  }

  public PasswordEncoding(PasswordEncoder passwordEncoder) {
    this.passwordEncoder = passwordEncoder;
  }

  @Override
  public String encode(CharSequence rawPassword) {
    return passwordEncoder.encode(rawPassword);
  }

  @Override
  public boolean matches(CharSequence rawPassword, String encodedPassword) {

    boolean result = false;
    LoginVO lv = new LoginVO();

    try {
      lv.setMbPw(rawPassword.toString());
      rawPassword = amloginService.encryptPw(lv);
    } catch (NCmsException e) {
      logger.debug(e.getLocalizedMessage());
    }

    if(rawPassword.equals(encodedPassword)) {
      result = true;
    }

    return result;
    //return passwordEncoder.matches(rawPassword.toString(), encodedPassword);
  }

}
