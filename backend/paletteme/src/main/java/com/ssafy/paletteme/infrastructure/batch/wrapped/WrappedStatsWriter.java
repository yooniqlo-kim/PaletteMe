package com.ssafy.paletteme.infrastructure.batch.wrapped;

import com.ssafy.paletteme.domain.wrapped.entity.Wrapped;
import com.ssafy.paletteme.domain.wrapped.repository.WrappedRepository;
import com.ssafy.paletteme.infrastructure.batch.wrapped.dto.WrappedStatsDto;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.item.Chunk;
import org.springframework.batch.item.ItemWriter;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.StreamSupport;

@Component
@RequiredArgsConstructor
public class WrappedStatsWriter implements ItemWriter<WrappedStatsDto> {
    private final WrappedRepository wrappedRepository;
    private static final Logger logger = LoggerFactory.getLogger(WrappedStatsWriter.class);

    // Step을 생성할 때 지정한 chunk의 size만큼 데이터가 옴.
    @Override
    public void write(Chunk<? extends WrappedStatsDto> chunk) throws Exception {
        List<Wrapped> entityList = StreamSupport.stream(chunk.spliterator(), false)
                .map(WrappedStatsDto::toEntity)
                .toList();

        logger.info("Saving {} wrapped entities", entityList.size());

        wrappedRepository.saveAll(entityList);
    }
}
