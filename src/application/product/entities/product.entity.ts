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
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable({
    name: 'product_has_categories',
    joinColumn: { name: 'productId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'categoryId', referencedColumnName: 'id' },
  })
  categories: Category[];

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
}
