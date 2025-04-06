package com.ssafy.paletteme.infrastructure.batch.wrapped;

import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.NonTransientResourceException;
import org.springframework.batch.item.ParseException;
import org.springframework.batch.item.UnexpectedInputException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.Map;

/* @Value: 프로퍼티 값 주입 뿐 아니라, Spring Expression Language (SpEL) 을 지원해줌.
           ExecutionContext, JobParameters, Bean 등에서 동적으로 값을 꺼낼 수 있음.
* */
@Component
@StepScope
public class UserIdReader implements ItemReader<Integer>{
    private final Iterator<Integer> userIdIterator;

    // jobExecution.getExecutionContext().put("topArtistMap", map);
    public UserIdReader(@Value("#{jobExecutionContext['topArtistMap']}") Map<Integer, ?> topArtistMap) {
        this.userIdIterator = new ArrayList<>(topArtistMap.keySet()).iterator();
    }

    @Override
    public Integer read() throws Exception, UnexpectedInputException, ParseException, NonTransientResourceException {
        return userIdIterator.hasNext() ? userIdIterator.next() : null; // null 반환되면 종료
    }
}
