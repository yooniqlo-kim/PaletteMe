package com.ssafy.paletteme.infrastructure.batch.wrapped;

import com.ssafy.paletteme.domain.wrapped.entity.Wrapped;
import com.ssafy.paletteme.domain.wrapped.repository.WrappedRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.item.Chunk;
import org.springframework.batch.item.ItemWriter;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class WrappedStatsWriter implements ItemWriter<WrappedStatsDto> {
    private final WrappedRepository wrappedRepository;
    private static final Logger logger = LoggerFactory.getLogger(WrappedStatsWriter.class);

    @Override
    public void write(Chunk<? extends WrappedStatsDto> chunk) throws Exception {
//        System.out.println("WrappedStatsWriter.write");
//        List<Wrapped> wrappedList = new ArrayList<>();
//
//        for (WrappedStatsDto dto : chunk) {
//            System.out.println(dto.toString());
//            Users user = usersRepository.findById(Long.valueOf(dto.getUserId()))
//                    .orElseThrow(() -> new IllegalArgumentException("해당 유저가 존재하지 않습니다. id = " + dto.getUserId()));
//            Wrapped wrapped = dto.toEntity(user);
//
//            wrappedList.add(wrapped);
//        }
//
//        wrappedRepository.saveAll(wrappedList);

        for (WrappedStatsDto dto : chunk) {
            Wrapped wrapped = dto.toEntity();
            // 디버깅용 로그
            logger.info("Saving wrapped for userId: {}", wrapped.getUserId());

            wrappedRepository.save(wrapped);
        }
    }
}
