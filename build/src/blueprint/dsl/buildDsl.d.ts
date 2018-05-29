import { PushTest } from "../../common/listener/PushTest";
import { PushRule } from "../../common/listener/support/PushRule";
import { Builder } from "../../spi/build/Builder";
export declare function when(guard1: PushTest, ...guards: PushTest[]): PushRule<Builder>;
export declare function setDefault(builder: Builder): PushRule<Builder>;
