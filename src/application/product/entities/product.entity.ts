import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
  AfterInsert,
  AfterUpdate,
  BeforeRemove,
  AfterLoad,
  ManyToOne,
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import { User } from '../../users/entities/user.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  price: number;

  @Column()
  stock: number;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn({ type: 'date' })
  expiredDate: Date;

  @ManyToOne(() => User, (user) => user.products, { cascade: true })
  author: User;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deletedAt' })
  deletedAt: Date;

  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable({
    name: 'productHasCategories',
    joinColumn: { name: 'productId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'categoryId', referencedColumnName: 'id' },
  })
  categories: Category[];

  categoriesName: string[];

  @AfterInsert()
  afterInsert() {
    // INSERT CATEGORIES RELATIONS HERE
  }

  @AfterUpdate()
  afterUpdate() {
    // UPDATE CATEGORIES RELATIONS HERE
  }

  @BeforeRemove()
  beforeRemove() {
    // REMOVE CATEGORIES RELATIONS HERE
  }

  @AfterLoad()
  afterLoad() {
    if (this.categories) this.categoriesName = this.categories.map((category) => category.name);
  }
}
