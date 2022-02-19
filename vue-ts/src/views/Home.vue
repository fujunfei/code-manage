<template>
  <div>
    <div>'枚举'：{{flower}}</div>
    <div>"断言"：{{somelenth}}</div>
    <div>"可索引类型接口": {{abcArray[1]}}</div>
    <div>"类": {{greeter.greet()}}</div>
    <div>"泛型"：{{output('hello,泛型')}}</div>
  </div>
  <a-date-picker v-model:value="value1" />
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { Dayjs } from 'dayjs';
export default defineComponent({
  setup() {
    // '枚举'
    enum Color {Red, Green, Blue}
    const flower: Color = Color.Red

    // "断言"
    const someValue: any = '123'
    const somelenth: number = (<string>someValue).length
    console.log(somelenth);
    
    // 普通接口：类型检测、可选、只读等
    interface SquareConfig {
      color?: string;
      width?: number;
    }

    function createSquare(config: SquareConfig): {color: string; area: number} {
      let newSquare = {color: "white", area: 100};
      if (config.color) {
        newSquare.color = config.color;
      }
      if (config.width) {
        newSquare.area = config.width * config.width;
      }
      return newSquare;
    }
    const params = {colors: "black",width:100}
    let mySquare = createSquare(params);
    // let mySquare = createSquare(<SquareConfig>{colors: "black",width:100} );
    console.log(mySquare);

    // "断言"
    interface Cat {
      name: string;
      run(): void;
    }
    interface Fish {
      name: string;
      swim(): void;
    }

    function isFish(animal: Cat | Fish) {
      //这里将animal 断言成Fish对象 强制类型转换，避免运行报错
      console.log((<Fish>animal).swim);
      
      if (typeof (<Fish>animal).swim === 'function') {
          console.log(animal.name);
          return true;
      }
      return false;
    }

    isFish({
      name: 'cat',
      run(){}
    })

    // "可索引类型接口"
    interface someArray {
      [index:number]: string
    }
    const abcArray: someArray = ['1','2','3']

    // 类类型接口
    interface ClockInterface {
      currentTime: Date;
      setTime(d: Date): void;
    }

    class Clock implements ClockInterface {
      currentTime: Date;
      setTime(d: Date) {
        this.currentTime = d;
      }
      constructor(h: number, m: number) {
        this.currentTime = new Date()
      }
    }

    // 类申明
    class Greeter {
      greeting: string;
      constructor(message: string) {
        this.greeting = message;
      }
      greet() {
        return "Hello, " + this.greeting;
      }
    }

    let greeter = new Greeter("my baby!");

    // 函数  默认参数、可选参数
    let myAdd: (baseValue: number, increment: number) => number =
    (x, y) => { return x + y; };
    let myAdd1 = (x: number, y: number): number => { return x + y };

    // 传参带默认值
    function buildName(firstName: string, lastName: string = 'Smith') {
      console.log(firstName + " " + lastName);
      return firstName + " " + lastName;
    }
    buildName("Bob")

    // 泛型类型
    function identity<T>(arg: T): T {
      return arg
    }
    let output: <T>(arg: T) => T = identity
    let output1: {<T>(arg: T): T} = identity


    // 泛型类型 接口
    interface GenericIdentityFn {
      <T>(arg: T): T
    }
    interface GenericIdentityFn1<T> {
      (arg: T): T
    }
    function identity1<T>(arg: T): T {
      return arg
    }
    const output2: GenericIdentityFn = identity1
    const output3: GenericIdentityFn1<number> = identity1

    return {
      value1: ref<Dayjs>(),
      flower,
      somelenth,
      abcArray,
      greeter,
      output
    };
  },
});
</script>