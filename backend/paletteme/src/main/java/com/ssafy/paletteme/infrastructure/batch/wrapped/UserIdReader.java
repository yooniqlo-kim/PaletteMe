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
*/
@Component
@StepScope
public class UserIdReader implements ItemReader<Integer>{
    private final Iterator<Integer> userIdIterator;

    // jobExecution.getExecutionContext()에 저장된 topArtistMap 값을 주입받음
    public UserIdReader(@Value("#{jobExecutionContext['topArtistMap']}") Map<Integer, ?> topArtistMap) {
        this.userIdIterator = new ArrayList<>(topArtistMap.keySet()).iterator();
    }


    // read() 를 통해 하나씩 데이터를 반환하되,
    // chunkSize만큼 모이면 모인 데이터를 processor()에 하나씩 전달
    // 그 결과 리스트를 writer()에 한꺼번에 전달
    @Override
    public Integer read() throws Exception, UnexpectedInputException, ParseException, NonTransientResourceException {
        return userIdIterator.hasNext() ? userIdIterator.next() : null; // null 반환되면 종료
    }
}
