package com.ssafy.paletteme.common.security.provider;

import com.ssafy.paletteme.domain.users.entity.Users;
import com.ssafy.paletteme.domain.users.exception.UserError;
import com.ssafy.paletteme.domain.users.exception.UserException;
import com.ssafy.paletteme.domain.users.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {
    private final UsersRepository usersRepository;

    // User 정보를 조회 및 인증 전 필요한 작업 진행
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users users = usersRepository.findByLoginId(username)
                .orElseThrow(() -> new UserException(UserError.SECURITY_USERS_ID_NOT_MATCH));

        if(users.getIsActive() != Users.AccountStatus.ACTIVE){
            throw new UserException(UserError.SECURITY_USERS_ACCOUNT_SUSPENDED);
        }

        return CustomUserDetails.fromEntity(users);
    }
}
