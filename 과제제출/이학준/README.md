## 1. Hadoop 개요
- **Hadoop**: 분산 데이터 저장과 분산 데이터 처리를 지원하는 프레임워크.
- **MapReduce**: Hadoop에서 데이터를 병렬로 처리하기 위한 프로그래밍 모델.
- **Hadoop의 구조**: Hadoop 시스템 위에서 데이터 처리 기술(MapReduce, Spark 등)이 동작하는 방식.



## 2. **YARN (Yet Another Resource Negotiator)**
- Hadoop에서 **CPU, 메모리 같은 리소스를 관리**하고 **작업 스케줄링을 담당하는 프레임워크**.
- **YARN의 역할**
  - **클러스터 리소스 관리**: 여러 노드의 CPU, 메모리 등의 자원을 효율적으로 관리.
  - **작업 스케줄링**: MapReduce, Spark 등의 작업 실행 및 순서 조정.
  - **다양한 엔진 지원**: **Spark, Tez, Flink** 등 다양한 데이터 처리 엔진 실행 가능.



## 3. **Spark vs MapReduce 비교**
| 항목 | MapReduce | Spark |
|------|----------|-------|
| **데이터 처리 방식** | **디스크 기반 처리** (HDFS에서 읽고 씀) | **메모리 기반 처리** (In-Memory Computing) |
| **중간 데이터 저장** | HDFS에 저장 (디스크 I/O 발생) | **RDD (Resilient Distributed Dataset)** 구조를 사용하여 메모리에 유지 |
| **연산 최적화** | 단계별 실행 (Map → Shuffle → Reduce) | DAG(Directed Acyclic Graph) 기반 최적화 |
| **속도** | 비교적 느림 (디스크 I/O 영향) | 빠름 (메모리에서 연산) |
| **사용 사례** | 배치 처리 (Batch Processing) | 실시간 분석 (Real-Time Processing) |

- **MapReduce**는 대량 데이터 배치 처리에 적합하지만, **Spark**는 메모리를 활용하여 훨씬 빠르게 처리 가능.



## 4. **HDFS (Hadoop Distributed File System)**
- **하둡의 파일 저장 시스템**으로, **파일을 여러 블록(Block)으로 나누어 여러 노드(Node)에 분산 저장**.
- **구성 요소**
  - **Node (노드)**: 클러스터를 구성하는 서버 한 대.
    - **네임노드 (NameNode)**: 메타데이터 관리.
    - **데이터노드 (DataNode)**: 실제 데이터 저장.
  - **Block (블록)**: 파일을 나눈 데이터 저장 단위.



## 5. **MapReduce의 Master-Slave 구조**
| Hadoop 버전 | 마스터 (Master) | 슬레이브 (Slave) |
|------------|--------------|---------------|
| **Hadoop 1.x** | JobTracker | TaskTracker |
| **Hadoop 2.x / 3.x** | ResourceManager (YARN) | NodeManager (YARN) |

- Hadoop 1.x에서는 **JobTracker가 리소스 관리 + 작업 스케줄링을 모두 담당**했지만,  
  Hadoop 2.x부터는 **YARN이 리소스를 관리하고, MapReduce는 순수 데이터 처리 역할만 수행**.
- **Master-Slave 개념 유지**:
  - **Master (ResourceManager)**: 클러스터 전체에서 리소스를 관리하고 작업을 할당.
  - **Slave (NodeManager)**: 실제 Map & Reduce 태스크 실행.



## 6. **MapReduce 작업 흐름**
1. **클라이언트가 애플리케이션 실행 요청**.
2. **ResourceManager (RM)**이 **NodeManager (NM)**에게 **Application Master 실행 요청**.
3. **NodeManager는 컨테이너에서 Application Master 실행**.
4. **Application Master가 ResourceManager에 필요한 리소스를 요청**.
5. **Application Master가 NodeManager에게 컨테이너 실행 요청**.
6. **NodeManager가 컨테이너에서 애플리케이션 실행**.
7. **애플리케이션 종료 시, 리소스를 해제**.
<img src = "과제제출/이학준/asset/1.png" width="100%" height="100%">



## 7. **YARN의 리소스 스케줄링 방식**
YARN은 한정된 리소스를 **공정하고 효율적으로 배분**하기 위해 3가지 스케줄러를 제공.

| 스케줄러 유형 | 특징 |
|--------------|------|
| **FIFO (First In First Out)** | 먼저 제출된 작업이 먼저 실행됨. 단순하지만 비효율적이어서 거의 사용되지 않음. |
| **Capacity Scheduler** | **각 큐(팀)마다 최소 리소스를 보장**하고, **남는 리소스는 공유 가능**. (대기 시간을 줄일 수 있음) |
| **Fair Scheduler** | **모든 작업이 공정하게 리소스를 나눠 가짐**. 실행 시간이 긴 작업이 있더라도 새로운 작업이 빠르게 실행됨. |

**Capacity Scheduler 예시**  
- **클러스터 총 자원: 100GB 메모리, 100 vCore**
  - **팀 A (queueA)** → 40% 보장 (40GB, 40 vCore)
  - **팀 B (queueB)** → 30% 보장 (30GB, 30 vCore)
  - **팀 C (queueC)** → 30% 보장 (30GB, 30 vCore)
- 팀 B가 리소스를 사용하지 않으면, 팀 A나 C가 추가로 사용 가능.
- 팀 B가 다시 작업을 시작하면, 최소 보장된 30%를 다시 확보.

**Fair Scheduler 예시**  
- 기존 작업끼리 리소스를 공평하게 나눔  
  → A: 33%, B: 33%, C: 33%  
- 새로운 작업(D)이 들어오면 재분배  
  → A: 25%, B: 25%, C: 25%, D: 25%  



## 8. **MapReduce 과정 알아보기**

1️. **Input (입력)**  
   - 원본 데이터가 **HDFS 같은 분산 파일 시스템에 저장됨**.  

2️. **Splitting (데이터 분할)**  
   - **입력 데이터를 여러 개의 조각(Chunk)으로 나눔**.  
   - 각 조각(Chunk)은 개별 Mapper에서 처리할 수 있도록 할당됨.  

3️. **Mapping (데이터 변환)**  
   - **Mapper 노드에서 입력 데이터를 (key, value) 형태로 변환**.  
   - 예제: 단어 개수 세기  
     ```
     입력: "Hadoop is fast, Hadoop is scalable"
     출력: ("Hadoop", 1), ("is", 1), ("fast", 1), ("Hadoop", 1), ("is", 1), ("scalable", 1)
     ```
   - **Mapper 노드란?**  
     - Map 작업을 수행하는 각각의 서버.  

4️. **Shuffling (데이터 그룹화)**  
   - **같은 key를 가진 데이터를 그룹화함**.  
   - 위 예제에서 **"Hadoop" 키를 가진 데이터는 한 곳에 모임**  
     ```
     ("Hadoop", [1, 1]), ("is", [1, 1]), ("fast", [1]), ("scalable", [1])
     ```  

5️. **Reducing (데이터 집계/연산)**  
   - **Shuffling을 통해 그룹화된 데이터를 최종적으로 합쳐서 결과 생성**.  
   - 위 예제에서 **단어 개수를 합치는 과정**  
     ```
     ("Hadoop", 2), ("is", 2), ("fast", 1), ("scalable", 1)
     ```
   - 즉, **Shuffling 과정에서 모은 데이터를 줄이는(Reduce) 과정**.  

6️. **Output (출력)**  
   - 최종 결과 데이터를 **HDFS에 저장**.  

<img src = "과제제출/이학준/asset/2.png" width="100%" height="100%">


## 9. **Hadoop 전용 데이터 타입을 사용하는 이유**

 **직렬화(Serialization) & 역직렬화(Deserialization) 지원**  
- **직렬화(Serialization)**:  
  - 객체(Object) → **바이트 스트림(Byte Stream) 변환**  
  - 데이터를 **파일, 네트워크, 데이터베이스 등에 저장**하거나 **전송 가능하도록 변환**  
- **역직렬화(Deserialization)**:  
  - 바이트 스트림(Byte Stream) → **Java 객체(Object)로 복원**  

**Hadoop에서는 직렬화가 필수적인 이유**  
- **Hadoop은 분산 시스템이기 때문에 데이터가 여러 노드 간 네트워크를 통해 전달됨**.  
- 또한 **HDFS(분산 파일 시스템)에 저장될 때도 데이터를 바이트 형태로 변환해야 함**.  
- Java의 기본 데이터 타입(int, String 등)은 Hadoop 환경에서 **직렬화 & 역직렬화에 적합하지 않음** → Hadoop 전용 타입 사용.

예제 (Java 기본 타입 vs Hadoop 타입)
```java
// Java 기본 데이터 타입
int count = 1;

// Hadoop 전용 데이터 타입 (IntWritable)
IntWritable one = new IntWritable(1);
```
➡ **Hadoop의 IntWritable은 자동으로 직렬화 & 역직렬화 지원!**  


###  **Hadoop 전용 String 타입 (Text) 사용 이유**  
**Java의 String vs Hadoop의 Text**  
| 특징 | Java String | Hadoop Text |
|------|------------|-------------|
| **인코딩** | UTF-16 사용 | UTF-8 사용 (최적화) |
| **불변성** | 불변 (Immutable) | 변경 가능 (Mutable) |
| **사용 방식** | `String word = "Hadoop"` | `Text word = new Text("Hadoop")` |

**Hadoop에서 `Text`를 사용하는 이유**  
1. **UTF-8 지원**  
   - Hadoop은 **다국어 데이터 처리**가 필요하므로, UTF-8을 지원하는 `Text`가 더 적합.  
2. **메모리 효율성**  
   - `Text`는 **가변(Mutable) 객체**이므로, 새로운 문자열을 만들지 않고 내용만 변경 가능 → 성능 최적화.  

###  정리
| Java 기본 타입 | Hadoop 데이터 타입 | 사용 이유 |
|--------------|----------------|---------|
| `int` | `IntWritable` | 직렬화 & 역직렬화 지원 |
| `long` | `LongWritable` | 네트워크 및 HDFS 저장 최적화 |
| `String` | `Text` | UTF-8 지원 & 가변 객체 |

 **결론:**  
- Hadoop은 **분산 시스템**이므로 데이터 전송과 저장을 위해 **직렬화 & 역직렬화가 필수**.  
- Hadoop 전용 데이터 타입(`IntWritable`, `Text` 등)을 사용하면 **더 빠르고 효율적인 데이터 처리 가능.



## 10. **MapReduce를 통해 친구 추천 구현해보기**

1. Mapper
```
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Mapper;
import java.io.IOException;

public class FriendRecommendationMapper extends Mapper<Object, Text, Text, Text> {
    @Override
    protected void map(Object key, Text value, Context context) throws IOException, InterruptedException {
        String[] parts = value.toString().split("\t"); // 탭 기준으로 나누기
        if (parts.length < 2) return;

        String user = parts[0]; // 사용자 ID
        String[] friends = parts[1].split(","); // 친구 목록

        // 직접 친구 관계 저장
        for (String friend : friends) {
            context.write(new Text(user), new Text(friend)); // (사용자, 친구)
        }

        // 친구 추천을 위한 관계 생성
        for (int i = 0; i < friends.length; i++) {
            for (int j = i + 1; j < friends.length; j++) {
                // (친구1, 친구2) 관계 추가 → 잠재적 친구 추천
                context.write(new Text(friends[i]), new Text(friends[j]));
                context.write(new Text(friends[j]), new Text(friends[i]));
            }
        }
    }
}
```
2. Reducer
```
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Reducer;
import java.io.IOException;
import java.util.*;

public class FriendRecommendationReducer extends Reducer<Text, Text, Text, Text> {
    @Override
    protected void reduce(Text key, Iterable<Text> values, Context context) throws IOException, InterruptedException {
        Set<String> friends = new HashSet<>();
        Map<String, Integer> recommendations = new HashMap<>();

        // 기존 친구 목록과 추천 친구 점수 계산
        for (Text value : values) {
            String friend = value.toString();
            if (friends.contains(friend)) {
                // 직접 친구라면 추천하지 않음
                continue;
            }
            friends.add(friend);

            // 추천 친구 점수 추가
            recommendations.put(friend, recommendations.getOrDefault(friend, 0) + 1);
        }

        // 추천 친구 목록을 점수 기준으로 정렬
        List<Map.Entry<String, Integer>> sortedList = new ArrayList<>(recommendations.entrySet());
        sortedList.sort((a, b) -> b.getValue().compareTo(a.getValue())); // 점수 내림차순 정렬

        // 추천 목록 출력
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < Math.min(sortedList.size(), 5); i++) { // 최대 5명 추천
            sb.append(sortedList.get(i).getKey()).append("(").append(sortedList.get(i).getValue()).append(") ");
        }

        context.write(key, new Text(sb.toString()));
    }
}
```