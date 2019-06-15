import { IsExact, assert } from "conditional-type-checks";
import { IntColumn, StringColumn, Table, TableWrapper } from "@";
import { InsertInterface } from "@/querybuilders";

test("InsertInterface has correct shape", () => {
  class UserTable extends Table {
    id = new IntColumn();
    name = new StringColumn();
  }
  type UserTW = TableWrapper<"users", UserTable>;
  type UserInsertInterface = InsertInterface<UserTW>;
  assert<IsExact<UserInsertInterface, { id: number; name: string }>>(true);
});
