package com.ssafy.paletteme.common.security.annotation;

import java.lang.annotation.*;

@Target(ElementType.PARAMETER)  // 메서드 파라미터에서만 사용 가능
@Retention(RetentionPolicy.RUNTIME)  // 런타임에도 유지됨
@Documented
public @interface UserId {

}
