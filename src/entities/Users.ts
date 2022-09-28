import { Column, Entity } from "typeorm";

import { Base } from "./base/Base";

@Entity()
export class Users extends Base {
  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;
}
