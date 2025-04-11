package com.ssafy.paletteme.common.security.resolver;

import com.ssafy.paletteme.common.security.annotation.UserId;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

@Component
public class LoginUserResolver implements HandlerMethodArgumentResolver {
    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        // @UserId가 붙어 있고, 파라미터 타입이 int면 처리
        return parameter.hasParameterAnnotation(UserId.class) &&
                (parameter.getParameterType().equals(int.class) || parameter.getParameterType().equals(Integer.class));
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
                                  NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
        HttpServletRequest request = (HttpServletRequest) webRequest.getNativeRequest();
        Object userId = request.getAttribute("userId");

        UserId annotation = parameter.getParameterAnnotation(UserId.class);
        boolean optional = annotation.optional();

        if (userId == null) {
            if (optional) {
                return null; // 비로그인 허용
            } else {
                throw new IllegalArgumentException("로그인한 사용자만 접근할 수 있습니다.");
            }
        }

        return Integer.parseInt(userId.toString());  // int 타입으로 변환해서 반환
    }
}