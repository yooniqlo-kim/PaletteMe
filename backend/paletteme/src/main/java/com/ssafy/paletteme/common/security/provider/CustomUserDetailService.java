package com.ssafy.paletteme.common.security.provider;

import com.ssafy.paletteme.domain.users.entity.Users;
import com.ssafy.paletteme.domain.users.exception.UserError;
import com.ssafy.paletteme.domain.users.exception.UserException;
import com.ssafy.paletteme.domain.users.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {
    private final UsersRepository usersRepository;

    // User 정보를 조회 및 인증 전 필요한 작업 진행
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Users users = usersRepository.findByLoginId(username)
                .orElseThrow(() -> new BadCredentialsException("ID가 올바르지 않습니다."));

        if(users.getIsActive() != Users.AccountStatus.ACTIVE){
            throw new BadCredentialsException("사용할 수 없는 계정입니다.");
        }

        if(users.getLoginedAt()==null || users.getLoginedAt().isEqual(LocalDate.now())){
            users.increaseAttendance();
        }
        users.updateLoginedAt(LocalDate.now());
        usersRepository.save(users);

        return CustomUserDetails.fromEntity(users);
    }
}
/* AuthenticationManager.authenticate() 과정 중 발생한 예외는
   UsernamePasswordAuthenticationFilter 안의 → unsuccessfulAuthentication()을 호출함.
   즉, Exception Handler로 가지 않음.
*/
