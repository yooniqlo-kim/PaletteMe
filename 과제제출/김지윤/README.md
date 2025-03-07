## TypeScript 기초

### TypeScript란?

- JavaScript의 상위 집합(Superset)
- 타입 안전성을 추가하여 개발을 향상시키고 잠재적인 오류를 방지
- 브라우저에서 직접 실행되지 않으며, 빌드 과정에서 JavaScript로 변환해야 한다.

### 타입 추론(Type Inference) & 명시적 타입 지정(Explicit Type Annotation)

- **타입 추론**: TypeScript는 변수의 값을 기반으로 타입을 자동으로 결정한다.
  ```tsx
  let message = "Hello, TypeScript!"; // string으로 추론됨
  let count = 10; // number로 추론됨
  ```
- **명시적 타입 지정**: 개발자가 직접 타입을 지정하여 코드의 명확성을 높이고 예기치 않은 동작을 방지할 수 있다.
  ```tsx
  let username: string = "JohnDoe";
  let age: number = 25;
  let isActive: boolean = true;
  ```

### 기본 자료형(Primitive Types)

- TypeScript는 `string`, `number`, `boolean`과 같은 기본 타입을 제공한다.

  ```tsx
  let userName = "Max";
  // userName = 34; // 오류 발생
  userName = "John";

  let userAge: number = 30;
  // userAge = "30"; // 오류 발생

  let isUserActive: boolean = true;
  // isUserActive = 1; // 오류 발생
  ```

### TypeScript 컴파일러 실행

TypeScript 파일을 JavaScript로 변환하려면 다음 명령어를 사용:

```
tsc 파일명
```

또는 `npx`를 이용하여 실행:

```
npx tsc 파일명
```

### 유니온 타입(Union Types)

- `|`(or) 연산자를 사용하여 변수에 여러 타입을 지정할 수 있다.
  ```tsx
  let userId: string | number = "123";
  userId = "abc";
  userId = 456; // 유효함
  ```

### 객체 타입(Object Types)

- `object` 타입을 사용하면 객체를 저장할 수 있지만, 특정 구조를 강제하지 않는다.

  ```tsx
  let user: object;

  user = {
    name: "Jiyun",
    age: 23,
    isAdmin: true,
    id: "jiyun123",
  };

  user = {}; // 유효하지만 구조가 정의되지 않음
  ```

- 객체의 구조를 명확하게 지정하려면 명시적인 타입 지정을 사용해야 한다.

  ```tsx
  let user: {
    name: string;
    age: number;
    isAdmin: boolean;
    id: string | number;
  };

  user = {
    name: "Jiyun",
    age: 23,
    isAdmin: true,
    id: "jiyun123",
  };

  user = {}; // 오류 발생: 필요한 속성이 없음
  ```

### 배열 타입(Array Types)

- 배열 타입은 `Array<타입>` 또는 `타입[]` 형태로 정의 가능하다.

  ```tsx
  let hobbies: Array<string>;
  let ages: number[];

  hobbies = ["Sports", "Cooking"];
  // hobbies = [1, 2, 3]; // 오류 발생
  ```

### 함수에 타입 추가

- 함수의 매개변수 및 반환값에 타입을 명시할 수 있다.

  ```tsx
  function greet(name: string): void {
    console.log(`Hello, ${name}`);
  }

  // 반환 타입은 자동 추론 가능하지만, 명시할 수도 있음.
  function add(a: number, b: number): number {
    return a + b;
  }
  ```

### 함수 타입 정의(Function Types)

- 다른 함수를 매개변수로 받을 때 함수의 타입을 지정할 수 있다.
  ```tsx
  function calculate(
    a: number,
    b: number,
    calcFn: (a: number, b: number) => number
  ): number {
    return calcFn(a, b);
  }
  ```

### 커스텀 타입(Custom Types) 생성

- `type` 키워드를 사용하여 사용자 정의 타입을 생성하고 코드의 가독성과 재사용성을 향상시킬 수 있다.

### 함수 타입 별칭(Function Type Alias)

- JavaScript에서 함수는 값이므로, TypeScript에서는 함수의 타입을 별도로 정의 가능하다.

  ```tsx
  type AddFn = (a: number, b: number) => number;

  function calculate(a: number, b: number, calcFn: AddFn) {
    return calcFn(a, b);
  }
  ```

### 유니온 타입 별칭(Union Type Alias)

- 동일한 Union 타입을 반복해서 사용하는 대신 별칭을 정의하여 사용 가능하다.

  ```tsx
  type StringOrNumber = string | number;

  let userId: StringOrNumber = "123";
  userId = 456; // 유효함
  ```

### 객체 타입 별칭(Object Type Alias)

- 객체의 구조를 명확하게 정의하여 일관성을 유지할 수 있다.

  ```tsx
  type User = {
    name: string;
    age: number;
    isAdmin: boolean;
    id: string | number;
  };

  let user: User;

  user = {
    name: "Jiyun",
    age: 23,
    isAdmin: true,
    id: "jiyun123",
  };
  ```

### 객체 타입 정의(Interface)

- `interface`를 사용하면 객체의 구조를 정의할 수 있다다.

  ```tsx
  interface Credentials {
    email: string;
    password: string;
  }

  let creds: Credentials;

  creds = {
    email: "jiyun@gmail.com",
    password: "123",
  };
  ```

### `type` vs `interface`

| 기능                      | `type` 별칭                          | `interface`                             |
| ------------------------- | ------------------------------------ | --------------------------------------- |
| **객체 타입 정의**        | 가능                                 | 가능                                    |
| **Union 타입 지원**       | 가능                                 | 불가능                                  |
| **확장성**                | 불가능 (다시 열 수 없음)             | 가능 (확장 및 병합 가능)                |
| **클래스 구현 가능 여부** | 가능                                 | 가능                                    |
| **추천 사용 사례**        | Union, 기본 타입, 복잡한 조합에 적합 | 객체 구조 및 계약(contract) 정의에 적합 |

### 인터페이스 확장(Extending Interfaces)

- `interface`는 확장이 가능하여 기존 인터페이스에 새로운 속성을 추가할 수 있다.

  ```tsx
  interface Credentials {
    email: string;
    password: string;
  }

  interface Credentials {
    mode: string;
  }

  let creds: Credentials = {
    email: "jiyun@gmail.com",
    password: "123",
    mode: "admin",
  };
  ```

### 타입 병합(Merge Types)

- `type` 별칭을 사용하여 여러 타입을 결합 가능:

  ```tsx
  type Admin = {
    permissions: string[];
  };

  type AppUser = {
    userName: string;
  };

  type AppAdmin = Admin & AppUser;

  let admin: AppAdmin = {
    permissions: ["login"],
    userName: "Jiyun",
  };
  ```

- `interface`를 사용하여 확장 가능:

  ```tsx
  interface Admin {
    permissions: string[];
  }

  interface AppUser {
    userName: string;
  }

  interface AppAdmin extends Admin, AppUser {}

  let admin: AppAdmin = {
    permissions: ["login"],
    userName: "Jiyun",
  };
  ```

### 리터럴 타입(Literal Type)

- 특정 값만 허용하도록 제한할 수 있다.

  ```tsx
  let role: "admin" | "user" | "editor";

  role = "admin";
  role = "user";
  role = "editor";
  // role = "abc"; // 오류 발생
  ```

### 제네릭(Generic Types)

- 제네릭을 사용하면 다양한 데이터 타입을 처리할 수 있는 재사용 가능한 구성 요소를 만들 수 있다.

  ```tsx
  function merge<T, U>(a: T, b: U) {
    return { ...a, ...b };
  }

  const newUser = merge<{ name: string }, { age: number }>(
    { name: "Jiyun" },
    { age: 23 }
  );
  ```

## 타입스크립트를 리액트 프로젝트에 적용하기

### 리액트 프로젝트 생성

타입스크립트 적용한 리액트 프로젝트를 생성하기 위해 다음과 같은 명령어를 터미널에 입력한다.

```bash
npm create vite@latest project-name
```

### Props 타입 지정하기

컴포넌트의 props를 정의할 때 해당 props의 타입을 명시적으로 선언할 수 있다.

```tsx
export default function CourseGoal(props: {
  title: string;
  description: string;
}) {
  return (
    <article>
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <button>Delete</button>
    </article>
  );
}
```

- 또는 구조 분해 할당을 통해 가독성을 높이면서 타입 정의를 할 수 있다.

```tsx
export default function CourseGoal({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <article>
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <button>Delete</button>
    </article>
  );
}
```

### Props 타입을 `type` 또는 `interface`로 저장하기

가독성과 유지 보수성을 위해 props 타입을 `type`이나 `interface`로 저장한다.

```tsx
type CourseGoalProps = {
  title: string;
  description: string;
};

export default function CourseGoal({ title, description }: CourseGoalProps) {
  return (
    <article>
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <button>Delete</button>
    </article>
  );
}
```

장점 : 코드를 모듈화하고 재사용성을 높인다.

### `children`의 타입 지정하기

children을 props으로 넘겨주고 싶은 경우 `ReactNode` 타입을 이용한다.

```tsx
import { ReactNode } from "react";

interface CourseGoalProps {
  title: string;
  children: ReactNode;
}

export default function CourseGoal({ title, children }: CourseGoalProps) {
  return (
    <article>
      <div>
        <h2>{title}</h2>
        {children}
      </div>
      <button>Delete</button>
    </article>
  );
}
```

- `ReactNode` : 문자열, 숫자, JSX 등 리액트에서 렌더링할 수 있는 모든 유형에 대한 타입
- `@types/react` 패키지에서 제공된다.

또는, 리액트에서 제공하는 유틸리티 유형인 `PropsWithChildren` 을 사용할 수 있다. `PropsWithChildren`는 `children` prop을 컴포넌트의 props 타입 지정에 자동으로 추가한다.

```tsx
type CourseGoalProps = PropsWithChildren<{ title: string }>;

export default function CourseGoal({ title, children }: CourseGoalProps) {
  return (
    <article>
      <div>
        <h2>{title}</h2>
        {children}
      </div>
      <button>Delete</button>
    </article>
  );
}
```

`PropsWithChildren<T>` 을 사용하면 `children` prop을 수동으로 추가할 필요 없음!

### `key` Prop

- `key` prop은 리스트 렌더링 시 필수적으로 사용되어야 한다.
- 하지만 TypeScript에서 `key` prop에 대해 명시적으로 타입을 정의할 필요는 없다.

### 컴포넌트를 작성하는 다른 방법

함수 표현식이나 화살표 함수를 이용하여 컴포넌트를 정의할 때, React의 `FC`를 사용하여 정의 가능하다.

```tsx
import { type FC, type PropsWithChildren } from "react";

type CourseGoalProps = PropsWithChildren<{ title: string }>;

const CourseGoal: FC<CourseGoalProps> = ({ title, children }) => {
  return (
    <article>
      <div>
        <h2>{title}</h2>
        {children}
      </div>
      <button>Delete</button>
    </article>
  );
};

export default CourseGoal;
```

- `FC` 이란?
  - Functional Component 의 약자로, 함수형 컴포넌트를 타입으로 지정하는데 사용되는 제네릭 타입이다
  - `FC`는 기본적으로 `children`을 포함한 모든 props를 자동으로 처리할 수 있기 때문에, `children`을 별도로 추가할 필요가 없다.
- Note: `FC` 는 함수 선언식과 함께 사용 불가능!
- `FC` 는 최근에는 많이 사용되지 않는 추세라고 한다.

### `useState` 타입스크립트와 함께 작성하기

- `useState` 는 제네릭 함수라서 어떤 타입의 state를 다룰지 지정할 수 있다.
- `useState` 의 초기상태가 primitive 타입일 경우 (string, number 등) 타입스트립트는 타입을 명시적으로 지정해주지 않아도 타입을 추론할 수 있다.
- 하지만 초기 상태가 배열이나 객체일 경우, 타입을 추론할 수 없기 때문에 명시적으로 작성할 필요가 있다.

```tsx
import { useState } from "react";

type CourseGoal = {
  title: string;
  description: string;
  id: number;
};

export default function App() {
  const [goals, setGoals] = useState<CourseGoal[]>([]);

  function handleAddGoal() {
    setGoals((prevGoals) => {
      const newGoal: CourseGoal = {
        id: Math.random(),
        title: "Learn React + TS",
        description: "Learn it in depth",
      };
      return [...prevGoals, newGoal];
    });
  }

  return (
    <main>
      <button onClick={handleAddGoal}>Add Goal</button>
      <ul>
        {goals.map((goal) => (
          <li key={goal.id}>
            <CourseGoal title={goal.title}>
              <p>{goal.description}</p>
            </CourseGoal>
          </li>
        ))}
      </ul>
    </main>
  );
}
```

### 함수를 props으로 넘기기

자식 컴포넌트에 함수를 props으로 전달해야 할 때, 자식 컴포넌트에서는 전달 받는 함수를 타입 정의에 포함시켜야 한다.

```tsx
export default function App() {
  const [goals, setGoals] = useState<CourseGoal[]>([]);

  function handleDeleteGoal(id: number) {
    setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== id));
  }

  return (
    <main>
      <CourseGoalList goals={goals} onDelete={handleDeleteGoal} />
    </main>
  );
}
```

`handleDeleteGoal` 함수는 `CourseGoalList` 컴포넌트에 `onDelete`라는 이름의 prop으로 전달한다.

```tsx
type CourseGoalListProps = {
  goals: CourseGoal[];
  onDelete: (id: number) => void;
};

export default function CourseGoalList({
  goals,
  onDelete,
}: CourseGoalListProps) {
  return (
    <ul>
      {goals.map((goal) => (
        <li key={goal.id}>
          <CourseGoal id={goal.id} title={goal.title} onDelete={onDelete}>
            <p>{goal.description}</p>
          </CourseGoal>
        </li>
      ))}
    </ul>
  );
}
```

- `onDelete: (id: number) => void;` : 해당 함수의 구체적 타입 지정해준 부분

### 폼 이벤트 처리하기

- 폼 제출을 처리할 때, `preventDefault()` 함수를 처리하여 페이지 리로드를 방지한다.
- `event` 객체는 이벤트가 발생할 때, 리액트에서 자동으로 넘겨주는데, `event`의 타입을 지정해주지 않으면 오류가 발생한다.
- 해당 이벤트는 폼 제출로부터 발생했기 때문에 이벤트 타입을 `FormEvent`으로 지정할 수 있다.
- `FormEvent` 은 폼 관련 이벤트를 처리할 때 사용하는 제네릭 타입으로, 제네릭을 사용하여 이벤트의 타입을 구체적으로 지정할 수 있다.

```tsx
import { FormEvent } from "react";

export default function NewGoal() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // without type definition, event object has 'any' type
    // since we're using onSubmit prop on form, the type of event is FormEvent
    // but a FormEvent doesn't have to come from the onSubmit prop on form
    // FormEvent is a generic type
    event.preventDefault();

    // built-in class provided by browser
    // to extract the input, we have to put the name prop on it
    new FormData(event.currentTarget);
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>
        <label htmlFor="goal">Your goal</label>
        <input id="goal" type="text" name="goal" />
      </p>
      <p>
        <label htmlFor="summary">Short summary</label>
        <input id="summary" type="text" name="summary" />
      </p>
      <p>
        <button>Add Goal</button>
      </p>
    </form>
  );
}
```

- 이벤트의 타입 `FormEvent<HTMLFormElement>` 은 이 이벤트가 `<form>` 요소에서 발생한다는 것을 명시화한다.
- `HTMLFormElement` 을 명시적으로 지정하지 않으면, `event`의 타입이 `any`로 추론되기 때문에 `event.currentTarget`에 대한 정확한 타입 정보가 제공되지 않는다.
- `HTMLFormElement` 의 존재로 인해 `event.currentTarget`은 `HTMLFormElement`로 추론된다.

### `useRef()` 와 타입스크립트 함께 사용하기

- `useRef()` 을 이용해서도 폼 제출 이벤트를 처리할 수 있다.
- `useRef` 는 `useState`와 같이 제네릭 함수이기 때문에 타입을 명시적으로 지정해줄 수 있다.

```tsx
import { FormEvent, useRef } from "react";

export default function NewGoal() {
  // ref value by default, contains undefined as a dafault starting value
  // put null as an initial value
  // useRef is a generic function
  const goal = useRef<HTMLInputElement>(null);
  const summary = useRef<HTMLInputElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // without type definition, event object has 'any' type
    // since we're using onSubmit prop on form, the type of event is FormEvent
    // but a FormEvent doesn't have to come from the onSubmit prop on form
    // FormEvent is a generic type
    event.preventDefault();

    // handleSubmit will only be executed after the form is submittedn (so use ! after the current)
    // TS doesn't know we will entually connect the input to ref
    const enteredGoal = goal.current!.value;
    const enteredSummary = summary.current!.value;
  }
  // if we define the function inline, TS is able to infer the type
  return (
    <form onSubmit={handleSubmit}>
      <p>
        <label htmlFor="goal">Your goal</label>
        <input id="goal" type="text" name="goal" ref={goal} />
      </p>
      <p>
        <label htmlFor="summary">Short summary</label>
        <input id="summary" type="text" name="summary" ref={summary} />
      </p>
      <p>
        {/* button in a form by default submit the form when the click event happens */}
        <button>Add Goal</button>
      </p>
    </form>
  );
}
```

- 위와 같이 DOM 요소인 `input` 요소에 접근하려면 `HTMLInputElement` 타입을 명시해야 한다.
